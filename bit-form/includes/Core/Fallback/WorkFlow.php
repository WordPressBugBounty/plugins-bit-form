<?php

namespace BitCode\BitForm\Core\Fallback;

use BitCode\BitForm\Core\Database\DB;
use BitCode\BitForm\Core\Database\WorkFlowModel;
use BitCode\BitForm\Core\Util\IpTool;

class WorkFlow
{
  /**
   * Free/Pro conditional-logic separation: backfill workflow_category on existing rows.
   *
   * The DB migration adds the column with DEFAULT 'classic', so every pre-existing row is already
   * classic (= keeps executing in Free exactly as before). Here we only retag rows that the basic
   * field show/hide UI marked as info.type === 'basic'. Existing rows predate the advanced (Pro)
   * feature, so nothing legitimately maps to 'advanced' during this one-time upgrade.
   */
  public function normalizeCategory()
  {
    // Runs on `init` (any request), but the `workflow_category` column is added by a migration gated
    // behind an admin request. Ensure the column exists first (self-heal) so a non-admin/cron first
    // request does not silently no-op and leave rows uncategorized.
    global $wpdb;
    $table = $wpdb->prefix . 'bitforms_workflows';
    if (null === $wpdb->get_var("SHOW COLUMNS FROM `{$table}` LIKE 'workflow_category'")) {
      DB::migrate();
      if (null === $wpdb->get_var("SHOW COLUMNS FROM `{$table}` LIKE 'workflow_category'")) {
        return '';
      }
    }

    $workFlowModel = new WorkFlowModel();
    $workFlows = $workFlowModel->get(
      ['id', 'workflow_info', 'workflow_category'],
      [],
      null,
      null,
      'id'
    );
    if (is_wp_error($workFlows) || count($workFlows) <= 0) {
      return '';
    }
    foreach ($workFlows as $workflow) {
      $info = !empty($workflow->workflow_info) ? \json_decode($workflow->workflow_info) : null;
      $category = (!empty($info) && isset($info->type) && 'basic' === $info->type) ? 'basic' : 'classic';
      if ($category !== $workflow->workflow_category) {
        $workFlowModel->update(
          ['workflow_category' => $category],
          ['id' => $workflow->id]
        );
      }
    }
  }

  public function conditionalLogic()
  {
    $workFlowUpdatedSatus = true;
    $workFlowModel = new WorkFlowModel();
    $workFlows = $workFlowModel->get(
      [
        'id',
        'workflow_behaviour',
        'workflow_condition',
        'workflow_action',
        'workflow_status',
      ],
      [],
      null,
      null,
      'id'
    );
    if (is_wp_error($workFlows) || count($workFlows) <= 0) {
      return '';
    }
    $ipTool = new IpTool();
    $user_details = $ipTool->getUserDetail();

    foreach ($workFlows as $index => $workflow) {
      $decode = \json_decode($workflow->workflow_action);
      $logic = \json_decode($workflow->workflow_condition);
      $beheviour = $workflow->workflow_behaviour;
      $cond = 'cond' === $beheviour ? 'if' : 'always';

      $workFlows[$index]->workflow_condition = [
        'cond_type' => $cond,
        'actions'   => [
          'fields'            => $decode->action ? $decode->action : [],
          'success'           => $decode->successAction ? $decode->successAction : [],
          'failure'           => $decode->validateMsg ? $decode->validateMsg : '',
        ],
      ];
      if ('cond' === $beheviour) {
        $workFlows[$index]->workflow_condition['logics'] = $logic;
      }
      $updatedWorkFlow = wp_json_encode([$workFlows[$index]->workflow_condition]);
      $updated = $workFlowModel->update(
        [
          'workflow_condition' => $updatedWorkFlow,
          'updated_at'         => $user_details['time'],
        ],
        [
          'id' => $workflow->id,
        ]
      );
      if (is_wp_error($updated)) {
        $workFlowUpdatedSatus = false;
        break;
      }
    }
    if ($workFlowUpdatedSatus) {
      global $wpdb;
      // Schema migration: table name interpolation only. $wpdb->prepare() cannot parameterize DDL statements.
      $wpdb->query(
        "ALTER TABLE `{$wpdb->prefix}bitforms_workflows` DROP `workflow_action`"
      );
    }
  }
}
