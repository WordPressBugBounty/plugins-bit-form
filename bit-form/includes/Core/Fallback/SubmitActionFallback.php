<?php

namespace BitCode\BitForm\Core\Fallback;

use BitCode\BitForm\Core\Database\DB;
use BitCode\BitForm\Core\Database\EmailTemplateModel;
use BitCode\BitForm\Core\Database\IntegrationModel;
use BitCode\BitForm\Core\Database\SuccessMessageModel;
use BitCode\BitForm\Core\Database\WorkFlowModel;
use BitCode\BitForm\Core\WorkFlow\Helper;

/**
 * Backward-compat migration for the workflow-decoupling refactor.
 *
 * Before the refactor, confirmation messages / redirects / email notifications / integrations ran
 * ONLY when referenced by an active classic workflow. After the refactor they execute by default
 * (no conditional logic). To preserve existing forms, any such feature that is NOT referenced by an
 * active classic/basic onsubmit workflow (or referenced only by inactive workflows) is deactivated
 * here (status = 0). Runs once for existing installs only (FallBack skips fresh installs); idempotent.
 */
class SubmitActionFallback
{
  private const MIGRATED_OPTION = 'bitform_orphan_submit_action_migrated';

  public function deactivateOrphanActions()
  {
    if (get_option(self::MIGRATED_OPTION)) {
      return;
    }

    // This fallback runs on `init` (any request), but the schema migration that adds
    // `workflow_category` is gated behind an admin (`manage_options`) request. If a non-admin /
    // cron / frontend request reaches here first, the column is absent and the referenced-ids
    // query below would return a WP_Error — which, treated as "nothing referenced", would wrongly
    // deactivate every action. Ensure the schema exists first; if it still cannot be created, bail
    // WITHOUT marking migrated so a later (admin) request retries.
    if (!$this->workflowCategoryColumnReady()) {
      return;
    }

    $referenced = $this->activeWorkflowReferencedIds();
    // A query error here must NOT be interpreted as "nothing is referenced" — abort and retry later.
    if (null === $referenced) {
      return;
    }

    $this->deactivateMessages($referenced['successMsg']);
    $this->deactivateIntegrations($referenced['redirectPage'], $referenced['integrations']);
    $this->deactivateEmailTemplates($referenced['mailNotify']);

    update_option(self::MIGRATED_OPTION, true, false);
  }

  /**
   * Guarantee the `workflow_category` column exists before the migration reads it. Tries to run the
   * schema migration once if the column is missing (self-healing regardless of who serves the
   * request). Returns false if the column still cannot be found.
   */
  private function workflowCategoryColumnReady()
  {
    if ($this->hasWorkflowCategoryColumn()) {
      return true;
    }
    // Column missing: run the schema migration now (idempotent) instead of waiting for an admin hit.
    DB::migrate();
    return $this->hasWorkflowCategoryColumn();
  }

  private function hasWorkflowCategoryColumn()
  {
    global $wpdb;
    $table = $wpdb->prefix . 'bitforms_workflows';
    // Table/column name interpolation only — SHOW COLUMNS cannot be parameterized via prepare().
    return null !== $wpdb->get_var("SHOW COLUMNS FROM `{$table}` LIKE 'workflow_category'");
  }

  /**
   * Ids referenced by ANY ACTIVE classic/basic workflow success action (global, ids are unique).
   * Not limited to onsubmit: integrations/emails can also be referenced by delete workflows
   * (executeOnDelete runs webhooks/mail) — a feature used by any active workflow must stay active.
   *
   * @return array|null keyed action ids, or null when the query errored (caller must abort)
   */
  private function activeWorkflowReferencedIds()
  {
    $rows = (new WorkFlowModel())->get(
      ['id', 'workflow_condition'],
      [
        'workflow_status'   => 1,
        'workflow_category' => ['classic'],
      ]
    );
    if (is_wp_error($rows)) {
      // 'result_empty' just means no active classic workflows exist — that is a valid empty set,
      // not a failure. Any other error means we cannot trust the reference list; abort.
      return 'result_empty' === $rows->get_error_code() ? Helper::collectReferencedActionIds([]) : null;
    }
    return Helper::collectReferencedActionIds($rows);
  }

  private function deactivateMessages($referencedMsgIds)
  {
    $model = new SuccessMessageModel();
    $messages = $model->get(['id', 'message_config'], []);
    if (empty($messages) || is_wp_error($messages)) {
      return;
    }
    foreach ($messages as $message) {
      if (isset($referencedMsgIds[(string) $message->id])) {
        continue;
      }
      $config = !empty($message->message_config) ? json_decode($message->message_config) : null;
      if (!is_object($config)) {
        $config = new \stdClass();
      }
      if (isset($config->status) && 0 === (int) $config->status) {
        continue;
      }
      $config->status = 0;
      $model->update(['message_config' => wp_json_encode($config)], ['id' => $message->id]);
    }
  }

  private function deactivateIntegrations($referencedRedirectIds, $referencedIntegIds)
  {
    $model = new IntegrationModel();
    $integrations = $model->get(['id', 'integration_type', 'status'], ['category' => 'form']);
    if (empty($integrations) || is_wp_error($integrations)) {
      return;
    }
    foreach ($integrations as $integration) {
      $referenced = 'redirectPage' === $integration->integration_type ? $referencedRedirectIds : $referencedIntegIds;
      if (isset($referenced[(string) $integration->id]) || 0 === (int) $integration->status) {
        continue;
      }
      $model->update(['status' => 0], ['id' => $integration->id]);
    }
  }

  private function deactivateEmailTemplates($referencedMailIds)
  {
    $model = new EmailTemplateModel();
    $templates = $model->get(['id', 'status'], []);
    if (empty($templates) || is_wp_error($templates)) {
      return;
    }
    foreach ($templates as $template) {
      if (isset($referencedMailIds[(string) $template->id]) || 0 === (int) $template->status) {
        continue;
      }
      $model->update(['status' => 0], ['id' => $template->id]);
    }
  }
}
