<?php

namespace BitCode\BitForm\Core\Database;

use WP_Error;

/**
 * Undocumented class
 */

class FormEntryLogModel extends Model
{
  protected static $table = 'bitforms_form_log_details';

  public function geLogHistory($form_id, $entry_id)
  {
    $sql = "SELECT * FROM `{$this->app_db->prefix}bitforms_form_entry_log` where form_entry_id=%d AND form_id=%d order By created_at DESC";
    $logs = $this->execute($sql, [$entry_id, $form_id])->getResult();
    $response = ['success' => true, 'data' => [], 'integrations' => []];
    $ids = [];
    foreach ($logs as $log) {
      $ids[] = (int) $log->id;
    }
    if (isset($logs->errors['result_empty'])) {
      wp_send_json($response);
    } else {
      $allLogId = preg_replace('/"/', '', implode(',', $ids));
      $sql2 = "SELECT * FROM `{$this->app_db->prefix}bitforms_form_log_details` WHERE `log_id` IN ($allLogId)";
      $integrations = $this->execute($sql2)->getResult();

      if (isset($integrations->errors['result_empty'])) {
        $integrations = [];
      } else {
        foreach ($logs as $key => $log) {
          foreach ($integrations as $integration) {
            if ($integration->log_id === $log->id) {
              $logs[$key]->integration = true;
            }
          }
        }
      }

      wp_send_json(['success' => true, 'data' => $logs, 'integrations' => $integrations]);
    }
  }

  public function entryLogCheck($entry_id, $integ_id)
  {
    if (is_null($entry_id)) {
      return new WP_Error('empty_data', __('Form data is empty', 'bit-form'));
    }
    $sql = $this->app_db->prepare(
      "SELECT api_type, response_obj FROM `{$this->app_db->prefix}bitforms_form_entry_log` as el JOIN `{$this->app_db->prefix}bitforms_form_log_details` as ld ON ld.log_id = el.id WHERE form_entry_id = %d AND integration_id = %d AND ld.response_type = 'success' ORDER BY el.id DESC LIMIT 1",
      $entry_id,
      $integ_id
    );

    return $this->app_db->get_results($sql);
  }

  public function form_log_insert($data = [])
  {
    if (is_null($data)) {
      return new WP_Error('empty_data', __('Form data is empty', 'bit-form'));
    }
    $result = $this->app_db->insert(
      "{$this->app_db->prefix}bitforms_form_entry_log",
      $data
    );
    return $this->getResult($result);
  }

  public function log_history_insert($data = [])
  {
    if (is_null($data)) {
      return new WP_Error('empty_data', __('Form data is empty', 'bit-form'));
    }
    $result = $this->app_db->insert(
      "{$this->app_db->prefix}bitforms_form_log_details",
      $data
    );
    return $this->getResult($result);
  }

  public function get_form_value($form_id = '')
  {
    $sql = $this->app_db->prepare(
      "SELECT `meta_key`,`meta_value` FROM `{$this->app_db->prefix}bitforms_form_entrymeta` WHERE bitforms_form_entry_id=%d",
      $form_id
    );
    return $this->execute($sql)->getResult();
  }

  /**
   * Queued workflow-trigger rows (response_type 'queued', integration_id 0)
   * whose browser trigger and per-entry reclaim event were both lost, joined
   * to the entry log for the form/entry ids the executor needs.
   */
  public function getStaleQueuedWorkflows($minAgeMinutes, $maxAgeHours, $limit)
  {
    $sql = "SELECT ld.id AS queue_log_id, ld.log_id, el.form_id, el.form_entry_id
      FROM `{$this->app_db->prefix}bitforms_form_log_details` ld
      JOIN `{$this->app_db->prefix}bitforms_form_entry_log` el ON el.id = ld.log_id
      WHERE ld.integration_id = 0
        AND ld.response_type = 'queued'
        AND ld.created_at < DATE_SUB(%s, INTERVAL %d MINUTE)
        AND ld.created_at > DATE_SUB(%s, INTERVAL %d HOUR)
      ORDER BY ld.id ASC
      LIMIT %d";
    $now = current_time('mysql');
    return $this->execute($sql, [$now, absint($minAgeMinutes), $now, absint($maxAgeHours), absint($limit)])->getResult();
  }

  /**
   * Latest execution per integration of a form: last run time plus the
   * response_type of that newest log row. integration_id 0 (workflow queue) excluded.
   */
  public function getIntegrationLastRuns($formId)
  {
    $sql = "SELECT ld.integration_id,
        MAX(ld.created_at) AS lastRun,
        SUBSTRING_INDEX(GROUP_CONCAT(ld.response_type ORDER BY ld.created_at DESC, ld.id DESC), ',', 1) AS lastStatus
      FROM `{$this->app_db->prefix}bitforms_form_log_details` ld
      JOIN `{$this->app_db->prefix}bitforms_form_entry_log` el ON el.id = ld.log_id
      WHERE el.form_id = %d AND ld.integration_id > 0
      GROUP BY ld.integration_id";
    return $this->execute($sql, [absint($formId)])->getResult();
  }

  public function logUpdate($updateValue, $logID)
  {
    if (empty($logID)) {
      return false;
    }
    $sql = $this->app_db->prepare(
      "UPDATE `{$this->app_db->prefix}bitforms_form_entry_log` SET content=%s WHERE id=%d",
      $updateValue,
      $logID
    );
    return $this->execute($sql)->getResult();
  }
}
