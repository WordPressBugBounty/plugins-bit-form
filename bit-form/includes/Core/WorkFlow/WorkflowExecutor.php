<?php

namespace BitCode\BitForm\Core\WorkFlow;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Admin\Form\AdminFormManager;
use BitCode\BitForm\Core\Database\FormEntryLogModel;
use BitCode\BitForm\Core\Database\FormEntryMetaModel;
use BitCode\BitForm\Core\Database\FormEntryModel;
use BitCode\BitForm\Core\Util\FieldValueHandler;
use BitCode\BitForm\Core\Util\Log;
use BitCode\BitForm\Core\Util\MailNotifier;
use WP_Error;

/**
 * Runs the deferred post-submission work (email notifications + integrations)
 * of a queued workflow, no matter which caller picks it up: the browser-fired
 * bitforms_trigger_workflow request, the per-entry reclaim cron event, or the
 * hourly sweep. Every caller goes through the same atomic claim on the queue
 * log row, so a queued workflow is executed at most once even when several
 * triggers race.
 */
final class WorkflowExecutor
{
  /**
   * A queued row younger than this is presumed still in flight (the browser
   * trigger or the per-entry reclaim event may be about to handle it).
   */
  public const SWEEP_MIN_AGE_MINUTES = 10;

  /**
   * Queued rows older than this are left alone: sending a form's emails days
   * later does more harm than good.
   */
  public const SWEEP_MAX_AGE_HOURS = 48;

  public const SWEEP_BATCH_SIZE = 20;

  /**
   * Cron callback for the per-entry bitforms_reclaim_workflow single event,
   * scheduled when a workflow is queued for the browser-fired trigger.
   */
  public static function reclaim($entryID = 0, $formID = 0, $logID = 0, $queueLogId = 0)
  {
    self::runQueued($entryID, $formID, $logID, $queueLogId, 'reclaim');
  }

  /**
   * Cron callback for the hourly bitforms_reclaim_sweep event: re-runs queued
   * workflows whose browser trigger AND per-entry reclaim event were both lost.
   */
  public static function sweep()
  {
    $entryLog = new FormEntryLogModel();
    $rows = $entryLog->getStaleQueuedWorkflows(self::SWEEP_MIN_AGE_MINUTES, self::SWEEP_MAX_AGE_HOURS, self::SWEEP_BATCH_SIZE);
    if (is_wp_error($rows) || empty($rows)) {
      return;
    }
    foreach ($rows as $row) {
      self::runQueued($row->form_entry_id, $row->form_id, $row->log_id, $row->queue_log_id, 'sweep');
    }
  }

  /**
   * Load the trigger payload for a queued workflow. Lookup order: transient
   * (fast path, consumed on read) -> durable copy in the queue log row
   * (survives transient expiry and object-cache eviction) -> rebuild from the
   * stored entry as a last resort.
   *
   * @return array|null triggerData with array top-level keys, or null
   */
  public static function loadTriggerData($entryID, $formID, $logID, $queueLogId = 0)
  {
    $entryID = absint($entryID);

    $transientData = get_transient("bitform_trigger_transient_{$entryID}");
    if (!empty($transientData)) {
      delete_transient("bitform_trigger_transient_{$entryID}");
      $transientData = is_string($transientData) ? json_decode($transientData, true) : $transientData;
      return (array) $transientData;
    }

    $durable = self::loadTriggerDataFromLog($queueLogId);
    if (!empty($durable)) {
      return $durable;
    }

    return self::rebuildTriggerData($entryID, $formID, $logID);
  }

  /**
   * Durable copy of the trigger payload, stored on the queue log row when the
   * workflow was queued. Survives transient expiry and object-cache eviction.
   *
   * @return array|null triggerData with array top-level keys, or null
   */
  public static function loadTriggerDataFromLog($queueLogId)
  {
    if (empty($queueLogId)) {
      return null;
    }
    $entryLog = new FormEntryLogModel();
    $rows = $entryLog->get('response_obj', ['id' => absint($queueLogId)]);
    if (is_wp_error($rows) || empty($rows[0]->response_obj)) {
      return null;
    }
    $rowObj = json_decode($rows[0]->response_obj, true);
    if (empty($rowObj['trigger'])) {
      return null;
    }
    return self::restoreTriggerTypes($rowObj['trigger']);
  }

  /**
   * Attempt to take ownership of a queued workflow. The response_type
   * condition makes the claim atomic: whichever caller flips queued ->
   * processing first wins; every later caller gets zero affected rows.
   * The trigger payload is written back so a crash mid-run doesn't lose it.
   *
   * @return bool true when this caller owns the run
   */
  public static function claimQueuedLog($queueLogId, $pickedUpBy, $triggerData = null)
  {
    if (empty($queueLogId)) {
      return false;
    }
    $responseObj = [
      'status'       => 'processing',
      'picked_up_by' => $pickedUpBy,
      'picked_up_at' => current_time('mysql'),
    ];
    if (!empty($triggerData)) {
      $responseObj['trigger'] = $triggerData;
    }
    $entryLog = new FormEntryLogModel();
    $result = $entryLog->update(
      [
        'response_type' => 'processing',
        'response_obj'  => wp_json_encode($responseObj),
      ],
      [
        'id'            => absint($queueLogId),
        'response_type' => 'queued',
      ]
    );
    return !is_wp_error($result);
  }

  public static function markProcessed($queueLogId, $pickedUpBy)
  {
    if (empty($queueLogId)) {
      return;
    }
    $entryLog = new FormEntryLogModel();
    $entryLog->update(
      [
        'response_type' => 'success',
        'response_obj'  => wp_json_encode([
          'status'       => 'processed',
          'picked_up_by' => $pickedUpBy,
          'processed_at' => current_time('mysql'),
        ]),
      ],
      ['id' => absint($queueLogId)]
    );
  }

  /**
   * Run mail notifications + integrations for a workflow trigger payload and
   * mark the queue row processed. Does not send any HTTP response — callers
   * (AJAX endpoint, cron) decide how to report the outcome.
   *
   * @return true|string|WP_Error true, 'optin' when the double-opt-in path ran, or WP_Error
   */
  public static function execute($triggerData, $formID, $entryID, $logID, $queueLogId = 0, $pickedUpBy = 'browser')
  {
    $triggerData = (array) $triggerData;
    if (empty($triggerData)) {
      return new WP_Error('bitform_trigger_empty', __('No trigger data found', 'bit-form'));
    }
    $formID = absint($formID);
    $entryID = absint($entryID);
    $fieldValues = isset($triggerData['fields']) ? (array) $triggerData['fields'] : [];

    if (isset($triggerData['integrationRun']) && !$triggerData['integrationRun']) {
      $entryModel = new FormEntryModel();
      $updatedStatus = $entryModel->update(
        ['status' => 2],
        [
          'form_id' => $formID,
          'id'      => $entryID,
        ]
      );
      if (is_wp_error($updatedStatus)) {
        return $updatedStatus;
      }
      if (!empty($triggerData['dbl_opt_dflt_template'])) {
        do_action('bitform_double_optin_confirmation', isset($triggerData['dbl_opt_donf']) ? $triggerData['dbl_opt_donf'] : null, $triggerData);
      } elseif (!empty($triggerData['dblOptin'])) {
        foreach ($triggerData['dblOptin'] as $value) {
          self::notifySafely($value, $formID, $fieldValues, $entryID, true, $logID);
        }
      }
      self::markProcessed($queueLogId, $pickedUpBy);
      return 'optin';
    }

    if (!empty($triggerData['mail'])) {
      $formManager = new AdminFormManager($formID);
      $formContent = $formManager->getFormContent();
      $fieldValueForMail = FieldValueHandler::formatFieldValueForMail($formContent->fields, $fieldValues);
      foreach ($triggerData['mail'] as $value) {
        self::notifySafely($value, $formID, $fieldValueForMail, $entryID, false, $logID);
      }
    }

    do_action(
      'bitforms_exec_integrations',
      isset($triggerData['integrations']) ? $triggerData['integrations'] : [],
      $fieldValues,
      $formID,
      $entryID,
      $logID
    );

    self::markProcessed($queueLogId, $pickedUpBy);
    return true;
  }

  private static function runQueued($entryID, $formID, $logID, $queueLogId, $pickedUpBy)
  {
    $entryID = absint($entryID);
    $formID = absint($formID);
    $logID = absint($logID);
    $queueLogId = absint($queueLogId);
    if (!$entryID || !$formID || !$queueLogId) {
      Log::debug_log("[+] Workflow {$pickedUpBy} skipped: missing entry/form/queue id");
      return;
    }

    // cheap pre-check before touching the transient or attempting the expensive
    // rebuild: on the common path the browser trigger already processed this row
    // and the reclaim event is a duplicate
    $entryLog = new FormEntryLogModel();
    $rows = $entryLog->get('response_type', ['id' => $queueLogId]);
    if (is_wp_error($rows) || empty($rows) || 'queued' !== $rows[0]->response_type) {
      return;
    }

    $triggerData = self::loadTriggerData($entryID, $formID, $logID, $queueLogId);
    if (empty($triggerData)) {
      // flip the row out of the queue so the sweep doesn't retry it forever
      $entryLog = new FormEntryLogModel();
      $entryLog->update(
        [
          'response_type' => 'errors',
          'response_obj'  => wp_json_encode([
            'status'       => 'failed',
            'picked_up_by' => $pickedUpBy,
            'picked_up_at' => current_time('mysql'),
            'error'        => 'trigger data unavailable',
          ]),
        ],
        [
          'id'            => $queueLogId,
          'response_type' => 'queued',
        ]
      );
      Log::debug_log("[+] Workflow {$pickedUpBy} failed: trigger data unavailable for queue row {$queueLogId}");
      return;
    }

    if (!self::claimQueuedLog($queueLogId, $pickedUpBy, $triggerData)) {
      return;
    }

    $result = self::execute($triggerData, $formID, $entryID, $logID, $queueLogId, $pickedUpBy);
    if (is_wp_error($result)) {
      Log::debug_log("[+] Workflow {$pickedUpBy} failed: " . $result->get_error_message());
    }
  }

  /**
   * The durable copy round-trips through JSON as nested assoc arrays, but the
   * mail/double-opt-in consumers (MailNotifier, double-opt-in handlers) read
   * their config with object access — restore those entries to objects.
   */
  private static function restoreTriggerTypes($triggerData)
  {
    $triggerData = (array) $triggerData;
    foreach (['mail', 'dblOptin'] as $mailKey) {
      if (!empty($triggerData[$mailKey]) && is_array($triggerData[$mailKey])) {
        $triggerData[$mailKey] = array_map(
          function ($notifyDetails) {
            return is_array($notifyDetails) ? json_decode(wp_json_encode($notifyDetails)) : $notifyDetails;
          },
          $triggerData[$mailKey]
        );
      }
    }
    if (isset($triggerData['dbl_opt_donf']) && is_array($triggerData['dbl_opt_donf'])) {
      $triggerData['dbl_opt_donf'] = json_decode(wp_json_encode($triggerData['dbl_opt_donf']));
    }
    return $triggerData;
  }

  /**
   * Last-resort payload recovery: re-evaluate the workflow against the stored
   * entry. Conditions are re-run against current form config, so this can
   * drift from the original evaluation — the durable row copy is preferred.
   */
  private static function rebuildTriggerData($entryID, $formID, $logID)
  {
    $formManager = new AdminFormManager($formID);
    if (!$formManager->isExist()) {
      Log::debug_log('provided form does not exists');
      return null;
    }
    $formEntryModel = new FormEntryModel();
    $formEntry = $formEntryModel->get(
      '*',
      [
        'form_id' => $formID,
        'id'      => $entryID,
      ]
    );
    if (!$formEntry || is_wp_error($formEntry)) {
      Log::debug_log('provided form entries does not exists. EntryId=' . $entryID . ', FormId=' . $formID);
      return null;
    }
    $entryMeta = new FormEntryMetaModel();
    $formEntryMeta = $entryMeta->get(
      [
        'meta_key',
        'meta_value',
      ],
      [
        'bitforms_form_entry_id' => $entryID,
      ]
    );
    $entries = [];
    if (!is_wp_error($formEntryMeta) && !empty($formEntryMeta)) {
      foreach ($formEntryMeta as $value) {
        $entries[$value->meta_key] = $value->meta_value;
      }
    }
    $formContent = $formManager->getFormContent();
    $submitted_fields = $formContent->fields;
    foreach ($submitted_fields as $key => $value) {
      if (isset($entries[$key])) {
        $submitted_fields->{$key}->val = $entries[$key];
        $submitted_fields->{$key}->name = $key;
      }
    }

    $workFlowRunHelper = new WorkFlow($formID);
    $workFlowreturnedOnSubmit = $workFlowRunHelper->executeOnSubmit(
      'create',
      $submitted_fields,
      $entries,
      $entryID,
      $logID
    );
    $triggerData = isset($workFlowreturnedOnSubmit['triggerData']) ? (array) $workFlowreturnedOnSubmit['triggerData'] : null;
    if (empty($triggerData)) {
      return null;
    }
    $triggerData['fields'] = $entries;
    return $triggerData;
  }

  private static function notifySafely($notifyDetails, $formID, $fieldValue, $entryID, $isDblOptin, $logID)
  {
    try {
      MailNotifier::notify($notifyDetails, $formID, $fieldValue, $entryID, $isDblOptin, $logID);
    } catch (\Throwable $mailError) {
      Log::debug_log('[+] Workflow mail notification failed: ' . $mailError->getMessage());
    }
  }
}
