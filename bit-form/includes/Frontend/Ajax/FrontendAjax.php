<?php

namespace BitCode\BitForm\Frontend\Ajax;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Admin\Form\Helpers;
use BitCode\BitForm\Core\Database\FormEntryLogModel;
use BitCode\BitForm\Core\Util\FrontendHelpers;
use BitCode\BitForm\Core\Util\Log;
use BitCode\BitForm\Core\Util\Utilities;
use BitCode\BitForm\Core\WorkFlow\WorkflowExecutor;
use BitCode\BitForm\Frontend\Form\FrontendFormManager;

final class FrontendAjax
{
  public function register()
  {
    add_action('wp_ajax_nopriv_bitforms_submit_form', [$this, 'submit_form']);
    add_action('wp_ajax_bitforms_submit_form', [$this, 'submit_form']);
    add_action('wp_ajax_bitforms_entry_update', [$this, 'update_entry']);
    add_action('wp_ajax_nopriv_bitforms_entry_update', [$this, 'update_entry']);
    add_action('wp_ajax_bitforms_update_form_entry', [$this, 'update_entry']);
    add_action('wp_ajax_nopriv_bitforms_update_form_entry', [$this, 'update_entry']);
    add_action('wp_ajax_bitforms_before_submit_validate', [$this, 'beforeSubmittedValidate']);
    add_action('wp_ajax_nopriv_bitforms_before_submit_validate', [$this, 'beforeSubmittedValidate']);
    add_action('wp_ajax_nopriv_bitforms_trigger_workflow', [$this, 'triggerWorkFlow']);
    add_action('wp_ajax_bitforms_trigger_workflow', [$this, 'triggerWorkFlow']);
    add_action('wp_ajax_bitforms_onload_added_field_and_property', [$this, 'addHiddenFieldAndProperty']);
    add_action('wp_ajax_nopriv_bitforms_onload_added_field_and_property', [$this, 'addHiddenFieldAndProperty']);
  }

  public function beforeSubmittedValidate()
  {
    // CSRF verified inside FrontendFormManager::handleSubmission() via verifySubmissionNonce() using HMAC-SHA256 token (Helpers::csrfDecrypted).
    $form_id = isset($_POST['bitforms_id']) ? str_replace('bitforms_', '', sanitize_text_field(wp_unslash($_POST['bitforms_id']))) : '';
    if (empty($form_id)) {
      wp_send_json_error(__('Form ID not found', 'bit-form'), 400);
    }
    $FrontendFormManager = FrontendFormManager::getInstance($form_id);
    if (!$FrontendFormManager->checkStatus()) {
      wp_send_json_error(__('Form is not active', 'bit-form'), 403);
    }
    $FrontendFormManager->fieldNameReplaceOfPost();
    $validateStatus = $FrontendFormManager->beforeSubmittedValidate(false);
    if (is_wp_error($validateStatus)) {
      wp_send_json_error($validateStatus->get_error_message(), 400);
    } else {
      wp_send_json_success($validateStatus);
    }
  }

  public function submit_form()
  {
    Utilities::ignoreUserAbort();
    // CSRF verified inside FrontendFormManager::handleSubmission() via verifySubmissionNonce() using HMAC-SHA256 token (Helpers::csrfDecrypted).
    $form_id = isset($_POST['bitforms_id']) ? str_replace('bitforms_', '', sanitize_text_field(wp_unslash($_POST['bitforms_id']))) : '';
    $FrontendFormManager = FrontendFormManager::getInstance($form_id);
    if (!$FrontendFormManager->checkStatus()) {
      wp_send_json_error(__('Form is not active', 'bit-form'), 403);
    }
    $submitSatus = $FrontendFormManager->handleSubmission();
    if (is_wp_error($submitSatus)) {
      do_action('bitform_submit_error', $form_id, $submitSatus);
      wp_send_json_error($submitSatus->get_error_message(), 400);
    } elseif (true !== $submitSatus && !\is_array($submitSatus)) {
      // Validation failed (e.g. OTP) — $submitSatus is the error message string
      do_action('bitform_submit_error', $form_id, $submitSatus);
      wp_send_json_error(\is_string($submitSatus) ? $submitSatus : __('Validation failed.', 'bit-form'), 400);
    } else {
      wp_send_json_success($submitSatus);
    }
  }

  public function update_entry()
  {
    Utilities::ignoreUserAbort();
    // Entry token validated via Helpers::validateEntryTokenAndUser() or capability check; CSRF covered by HMAC-SHA256 token (Helpers::csrfDecrypted).
    $form_id = isset($_POST['bitforms_id']) ? str_replace('bitforms_', '', sanitize_text_field(wp_unslash($_POST['bitforms_id']))) : '';
    if (empty($form_id)) {
      wp_send_json_error(__('Form ID not found', 'bit-form'), 400);
    }
    $entryId = isset($_REQUEST['entryID']) ? sanitize_text_field(wp_unslash($_REQUEST['entryID'])) : '';
    $entryToken = isset($_REQUEST['entryToken']) ? sanitize_text_field(wp_unslash($_REQUEST['entryToken'])) : '';
    $GLOBALS['bitform_entry_id'] = $entryId;
    if (Helpers::validateEntryTokenAndUser($entryToken, $entryId) || FrontendHelpers::is_current_user_can_access($form_id, 'entryEditAccess')) {
      $FrontendFormManager = FrontendFormManager::getInstance($form_id);
      if (!$FrontendFormManager->checkStatus()) {
        wp_send_json_error(__('Form is not active', 'bit-form'), 403);
      }
      $updateStatus = $FrontendFormManager->handleUpdateEntry();
      if (is_wp_error($updateStatus)) {
        do_action('bitform_update_error', $form_id, $updateStatus);
        wp_send_json_error($updateStatus->get_error_message(), 400);
      } elseif (true !== $updateStatus && !\is_array($updateStatus)) {
        // Validation failed (e.g. OTP) — $updateStatus is the error message string
        do_action('bitform_update_error', $form_id, $updateStatus);
        wp_send_json_error(\is_string($updateStatus) ? $updateStatus : __('Validation failed.', 'bit-form'), 400);
      } else {
        wp_send_json_success($updateStatus);
      }
    } else {
      wp_send_json_error('Entry Token or User is not Authorized', 401);
    }
  }

  public function hiddenFields($formId)
  {
    $tokens = Helpers::csrfEecrypted();
    $fields = [
      [
        'name'  => 'csrf',
        'value' => $tokens['csrf'],
      ],
      [
        'name'  => 't_identity',
        'value' => $tokens['t_identity'],
      ]
    ];
    $frontendFormManger = FrontendFormManager::getInstance($formId);
    if ($frontendFormManger->isHoneypotActive()) {
      $time = time();
      $honeypodFldName = Helpers::honeypotEncryptedToken("_bitforms_{$formId}_{$time}_");
      $fields[] = [
        'name'  => 'b_h_t',
        'value' => $honeypodFldName,
      ];
    }
    return $fields;
  }

  public function hiddenPropeties($formId)
  {
    $properties = [];
    $properties[] = [
      'name'  => 'nonce',
      'value' => wp_create_nonce('bitforms_' . $formId),
    ];
    return $properties;
  }

  public function addHiddenFieldAndProperty()
  {
    Utilities::ignoreUserAbort();
    $rawInput = file_get_contents('php://input');
    if ($rawInput) {
      $request = is_string($rawInput) ? sanitize_text_field($rawInput) : $rawInput;
      $data = is_string($request) ? \json_decode($request) : $request;
      if (!isset($data->formId)) {
        wp_send_json_error('Form Id not found', 400);
      } else {
        $formId = absint($data->formId);
        $frontendFormManager = FrontendFormManager::getInstance($formId);
        if (!$frontendFormManager->isExist() || !$frontendFormManager->checkStatus()) {
          wp_send_json_error(__('Form is not active', 'bit-form'), 403);
        }
        $fields = $this->hiddenFields($formId);
        $properties = $this->hiddenPropeties($formId);
        wp_send_json_success(['hidden_fields'=>$fields, 'hidden_properties'=>$properties]);
      }
    }
  }

  public function triggerWorkFlow()
  {
    Utilities::ignoreUserAbort();

    $rawInput = file_get_contents('php://input');

    if (!$rawInput) {
      Log::debug_log('No Input data found');
      wp_send_json_error('Invalid Request', 400);
    }
    // The raw body is JSON — sanitize_text_field on the whole string can mangle
    // the payload. Individual values are validated/absint-ed below instead.
    $request = Utilities::jsonObj($rawInput);
    if (!isset($request->id, $request->cronNotOk)) {
      Log::debug_log('Cron Not Ok data not found');
      wp_send_json_error('Cron Not Ok data found', 400);
    }
    $formID = absint(str_replace('bitforms_', '', sanitize_text_field($request->id)));
    $frontendFormManager = FrontendFormManager::getInstance($formID);
    if (!$frontendFormManager->isExist() || !$frontendFormManager->checkStatus()) {
      Log::debug_log('Inactive or non-existent form for workflow trigger. FormID=' . $formID);
      wp_send_json_error(['message' => 'Form is not active'], 403);
    }
    $cronNotOk = $request->cronNotOk;

    // Validate and sanitize entry ID and log ID
    if (!isset($cronNotOk[0]) || !is_numeric($cronNotOk[0]) || !isset($cronNotOk[1]) || !is_numeric($cronNotOk[1])) {
      Log::debug_log('Invalid cronNotOk data for formID=' . $formID);
      wp_send_json_error(['message' => 'Invalid request data'], 400);
    }

    $entryID = absint($cronNotOk[0]);
    $logID = absint($cronNotOk[1]);
    $queueLogId = isset($cronNotOk[2]) && is_numeric($cronNotOk[2]) ? absint($cronNotOk[2]) : 0;
    $GLOBALS['bitform_entry_id'] = $entryID;

    // Quick admin check to allow retry of workflows
    $isAdmin = false;
    if (is_user_logged_in()) {
      $user = wp_get_current_user();
      $isAdmin = in_array('administrator', $user->roles) || current_user_can('manage_bitform');
    }

    // Check if already picked up (skip for administrators to allow retries)
    if (!$isAdmin) {
      if ($queueLogId) {
        $entryLog = new FormEntryLogModel();
        $queueudEntry = $entryLog->get('response_obj', ['id' => $queueLogId]);
        if (!is_wp_error($queueudEntry) && !empty($queueudEntry)) {
          // status lives in the row JSON; a plain substring check would false-match
          // user field values stored alongside it in the durable trigger copy
          $rowObj = json_decode(isset($queueudEntry[0]->response_obj) ? $queueudEntry[0]->response_obj : '', true);
          $rowStatus = isset($rowObj['status']) ? $rowObj['status'] : '';
          if (in_array($rowStatus, ['processed', 'processing', 'failed'], true)) {
            Log::debug_log('Cron Not Ok[2] Already Processed');
            wp_send_json_error();
          }
        } else {
          Log::debug_log('Cron Not Ok[2] Query Entry data not found');
          wp_send_json_error();
        }
      } else {
        Log::debug_log('Cron Not Ok[2](Log Id) data not found');
        wp_send_json_error();
      }
    } else {
      Log::debug_log('Admin bypass: Skipping "already processed" check for workflow retry');
    }

    // SECURITY CHECK: Validate trigger token using helper function
    $validation = Helpers::validateWorkflowTriggerToken($request, $formID);

    if (!$validation['valid']) {
      wp_send_json_error(['message' => $validation['error']], 403);
    }

    // Use validated trigger data if available (prevents transient overwrite bug);
    // otherwise fall back to transient -> durable log-row copy -> rebuild
    $triggerData = !empty($validation['triggerData'])
      ? (array) $validation['triggerData']
      : WorkflowExecutor::loadTriggerData($entryID, $formID, $logID, $queueLogId);

    if (empty($triggerData)) {
      Log::debug_log('No Trigger Data Found');
      wp_send_json_success();
    }

    // Atomic claim: if the reclaim cron (or a duplicate request) already picked
    // this run up, do not execute it a second time. Admin retries bypass.
    $claimed = WorkflowExecutor::claimQueuedLog($queueLogId, 'browser', $triggerData);
    if (!$claimed && !$isAdmin) {
      Log::debug_log('Workflow already claimed by another trigger');
      wp_send_json_error();
    }

    $result = WorkflowExecutor::execute($triggerData, $formID, $entryID, $logID, $queueLogId, 'browser');
    if (is_wp_error($result)) {
      wp_send_json_error($result->get_error_message(), 411);
    }

    wp_send_json_success();
  }
}
