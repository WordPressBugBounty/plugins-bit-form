<?php

namespace BitCode\BitForm\Core\WorkFlow;

use BitCode\BitForm\Admin\Form\AdminFormManager;
use BitCode\BitForm\Core\Database\FormEntryMetaModel;
use BitCode\BitForm\Core\Database\WorkFlowModel;
use BitCode\BitForm\Core\Integration\IntegrationHandler;
use BitCode\BitForm\Core\Integration\Integrations;
use BitCode\BitForm\Core\Util\MailNotifier;

final class WorkFlow
{
  private static $_formID;
  private static $_workFlowModel;
  private $_actions;

  private $_user_details;

  public function __construct($formID, $user_details = null)
  {
    static::$_formID = $formID;
    static::$_workFlowModel = new WorkFlowModel();
    $this->_user_details = $user_details;
    $this->_actions = new Actions($formID);
  }

  public function getWorkFlow($workFlowRun, $workFlowType, $workFlowIds = null, $orderColumn = 'id', $workFlowStatus = 1, $workFlowCategories = null)
  {
    if (null === $workFlowIds) {
      $condition = [
        'form_id' => static::$_formID,
      ];
    } else {
      $condition = [
        'id' => $workFlowIds,
      ];
    }
    if (!empty($workFlowRun)) {
      $condition = \array_merge(
        $condition,
        [
          'workflow_run' => $workFlowRun,
        ]
      );
    }
    if (!empty($workFlowType)) {
      if (!is_array($workFlowType)) {
        $workFlowType = [$workFlowType];
      }
      $condition = \array_merge(
        $condition,
        [
          'workflow_type' => $workFlowType,
        ]
      );
    }
    if (!empty($workFlowStatus)) {
      $condition = \array_merge(
        $condition,
        [
          'workflow_status' => $workFlowStatus,
        ]
      );
    }
    // Free/Pro separation: Free only ever processes non-advanced rows. Pro runs its own
    // pass that fetches category 'advanced' (see bitform_process_advanced_workflows).
    // This single chokepoint excludes advanced rows from every execute* lifecycle method.
    $categories = null === $workFlowCategories
      ? apply_filters('bitform_workflow_categories_to_process', ['classic', 'basic'])
      : $workFlowCategories;
    $condition = \array_merge(
      $condition,
      [
        'workflow_category' => $categories,
      ]
    );
    $workFlows = static::$_workFlowModel->get(
      [
        'id',
        'workflow_type',
        'workflow_run',
        'workflow_behaviour',
        'workflow_condition',
        'workflow_info',
        'workflow_category',
        'workflow_name',
        'workflow_order',
        'workflow_status',
      ],
      $condition,
      null,
      null,
      $orderColumn,
      'desc'
    );
    if (empty($workFlows) || is_wp_error($workFlows)) {
      return [];
    }

    return $workFlows;
  }

  public function executeOnLoad($workFlowRun, $fields)
  {
    $workFlows = $this->getWorkFlow(['create_edit', $workFlowRun], ['always', 'onload'], null, 'workflow_order');
    if (empty($workFlows) || is_wp_error($workFlows)) {
      // No classic/basic onload rows. Pro may still apply advanced field show/hide; no-op when inactive.
      return apply_filters('bitform_process_advanced_workflows_onload', [], $workFlowRun, $fields, static::$_formID);
    }
    $workFlows = array_reverse($workFlows);
    $fieldData = Helper::getFieldData($fields);
    $data = $this->runLoadWorkflowFields($workFlows, $fields, $fieldData);
    $fields = $data[0];

    $workFlowReturnable = ['fields' => $fields];
    // Pro advanced pass (field show/hide on load). No-op when no listener (Pro inactive).
    $workFlowReturnable = apply_filters('bitform_process_advanced_workflows_onload', $workFlowReturnable, $workFlowRun, $fields, static::$_formID);
    return $workFlowReturnable;
  }

  /**
   * Apply onload field-property actions for a set of workflow rows. Extracted so Pro can reuse it
   * for category 'advanced' rows (excluded from Free's getWorkFlow).
   *
   * @return array [$fields, $fieldData]
   */
  public function runLoadWorkflowFields(array $workFlows, $fields, $fieldData)
  {
    foreach ($workFlows as $workFlow) {
      $conditions = json_decode($workFlow->workflow_condition);
      $conditionBehaviour = $workFlow->workflow_behaviour;
      if ('cond' === $conditionBehaviour) {
        foreach ($conditions as $condition) {
          $type = $condition->cond_type;
          if (!empty($condition->actions->fields)) {
            $conditionStatus = false;

            if (!empty($condition->logics)) {
              $logics = $condition->logics;
              $fieldData = Helper::smartFldMargeFormFld($logics, $fieldData);
              $conditionalLogic = new ConditionalLogic($logics, $fieldData);
              $conditionStatus = $conditionalLogic->getConditionStatus();
            }
            if (($conditionStatus && in_array($type, ['if', 'else-if']) || 'else' === $type)) {
              $data = $this->_actions->setFieldProperty($condition->actions->fields, $fieldData, $fields);
              $fields = $data[0];
              $fieldData = $data[1];
              break;
            }
          }
        }
      } elseif ('always' === $conditionBehaviour) {
        if (!empty($conditions[0]->actions->fields)) {
          $data = $this->_actions->setFieldProperty($conditions[0]->actions->fields, $fieldData, $fields);
          $fields = $data[0];
          $fieldData = $data[1];
        }
      }
    }
    return [$fields, $fieldData];
  }

  public function executeOnUserInput($workFlowRun)
  {
    $workFlows = $this->getWorkFlow(['create_edit', $workFlowRun], ['always', 'oninput'], null, 'workflow_order');
    $workFlowReturnable = [];
    if (empty($workFlows) || is_wp_error($workFlows)) {
      return apply_filters('bitform_advanced_oninput_conditions', $workFlowReturnable, $workFlowRun, static::$_formID);
    }
    $onUserInputRun = [];
    foreach ($workFlows as $index => $value) {
      $conditions = json_decode($value->workflow_condition);
      $onUserInputRun['event_type'] = 'on_input';
      $onUserInputRun['conditions'] = $conditions;

      $workFlowReturnable['onfield_input_conditions'][$index] = $onUserInputRun;
    }
    // Pro advanced pass (appends advanced on-input conditions). No-op when no listener.
    $workFlowReturnable = apply_filters('bitform_advanced_oninput_conditions', $workFlowReturnable, $workFlowRun, static::$_formID);
    return $workFlowReturnable;
  }

  public function executeOnValidate($workFlowRun, $fieldData, $fieldValue)
  {
    $workFlows = $this->getWorkFlow(['create_edit', $workFlowRun], 'onvalidate', null, 'workflow_order');
    $workFlowReturnable = [];
    if (!empty($workFlows) && !is_wp_error($workFlows)) {
      $workFlowReturnable = $this->runValidateWorkflow($workFlows, $workFlowReturnable, $fieldData, $fieldValue);
    }
    // Pro advanced pass (advanced validation routing). No-op when no listener.
    $workFlowReturnable = apply_filters('bitform_process_advanced_workflows_onvalidate', $workFlowReturnable, $workFlowRun, $fieldData, $fieldValue, static::$_formID);
    return $workFlowReturnable;
  }

  /**
   * Evaluate onvalidate rows and resolve the failure (validation) message. Extracted so Pro can
   * reuse it for category 'advanced' rows.
   *
   * @return array $workFlowReturnable
   */
  public function runValidateWorkflow(array $workFlows, $workFlowReturnable, $fieldData, $fieldValue)
  {
    foreach ($workFlows as $workFlow) {
      $conditions = json_decode($workFlow->workflow_condition);
      $conditionBehaviour = $workFlow->workflow_behaviour;
      if ('cond' === $conditionBehaviour) {
        foreach ($conditions as $condition) {
          $type = $condition->cond_type;
          if (!empty($condition->actions->failure)) {
            $validateMsg = $condition->actions->failure;
          } else {
            $validateMsg = '{"id":"0"}';
          }
          $conditionStatus = false;
          if (!empty($condition->logics)) {
            $logics = $condition->logics;
            $fieldData = Helper::smartFldMargeFormFld($logics, $fieldData);
            $conditionalLogic = new ConditionalLogic($logics, $fieldData);
            $conditionStatus = $conditionalLogic->getConditionStatus();
          }
          if (($conditionStatus && in_array($type, ['if', 'else-if'])) || 'else' === $type) {
            $workFlowReturnable = $this->_actions->confirmationMessage($workFlowReturnable, $validateMsg, $fieldValue);
            if (empty($workFlowReturnable)) {
              $workFlowReturnable['message'] = '<p>Something error in Form Validation</p>';
            }
            break;
          }
        }
      }
    }
    return $workFlowReturnable;
  }

  public function isExistDoubleOptin($data)
  {
    $data['integrationRun'] = true;
    if (has_action('bitform_double_optin_confirmation')) {
      $activeDoubleOpt = (new IntegrationHandler(static::$_formID))->getAllIntegration('double-opt-in', 'double-opt-in', 1);

      if (!is_wp_error($activeDoubleOpt) && count($activeDoubleOpt) > 0) {
        $dplOptinDetails = json_decode($activeDoubleOpt[0]->integration_details);
        if (isset($dplOptinDetails->disable_loggin_user) && !is_user_logged_in() || !isset($dplOptinDetails->disable_loggin_user)) {
          $data['integrationRun'] = false;
          $data['integrationDetails'] = $activeDoubleOpt[0];
          $data['dflt_template'] = isset($dplOptinDetails->dflt_temp) ? true : false;
        }
      }
    }
    return $data;
  }

  public function executeOnSubmit($workFlowRun, $fields, $fieldValue, $entryID, $logID, $workflowsIds = null)
  {
    $workFlows = $this->getWorkFlow(['create_edit', $workFlowRun], ['onsubmit'], $workflowsIds, 'workflow_order');
    $workFlowReturnable = [];
    $workFlowReturnable = $this->isExistDoubleOptin($workFlowReturnable);
    if (empty($workFlows) || is_wp_error($workFlows)) {
      $defaultConfimation = Helper::setDefaultSubmitConfirmation('successMsg', $fieldValue, static::$_formID, 0, $workFlowRun);
      if (empty($defaultConfimation['confirmation'])) {
        $workFlowReturnable['message'] = 'edit' !== $workFlowRun ? __('Form Submitted Successfully', 'bit-form')
        : __('Entry Updated Successfully', 'bit-form');
        $workFlowReturnable['msg_id'] = 0;
      } else {
        $workFlowReturnable['message'] = $defaultConfimation['confirmation'];
        $workFlowReturnable['msg_id'] = $defaultConfimation['msg_id'];
      }
      if (!empty($defaultConfimation['afterSubmit'])) {
        $workFlowReturnable['afterSubmit'] = $defaultConfimation['afterSubmit'];
      }
      if (!empty($defaultConfimation['msg_duration'])) {
        $workFlowReturnable['msg_duration'] = $defaultConfimation['msg_duration'];
      }
      $workFlowReturnable['dflt_message'] = true;
      $defaultConfimation = Helper::setDefaultSubmitConfirmation('redirectPage', $fieldValue, static::$_formID, 0, $workFlowRun);

      $workFlowReturnable['redirectPage'] = $defaultConfimation['confirmation'];
      $isCronOK = !defined('DOING_CRON') && wp_doing_ajax() && (!defined('DISABLE_WP_CRON') || (defined('DISABLE_WP_CRON') && DISABLE_WP_CRON));
      if ($isCronOK) {
        $gmt_time = microtime(true);
        $lock = get_transient('doing_cron');
        if ($lock > $gmt_time + 10 * MINUTE_IN_SECONDS) {
          $lock = 0;
        }
        if ($lock + WP_CRON_LOCK_TIMEOUT > $gmt_time) {
          $isCronOK = false;
        }
      }
      $data = [
        'mail'         => Helper::getDefaultMailNotifications(static::$_formID, $workFlowRun),
        'integrations' => Helper::getDefaultIntegrations(static::$_formID, $workFlowRun),
        'entryID'      => $entryID,
        'logID'        => $logID,
        'formID'       => static::$_formID,
      ];
      $workFlowReturnable['triggerData'] = $data;
      $workFlowReturnable['cron'] = $isCronOK;
      if (!$isCronOK) {
        $workFlowReturnable['cronNotOk'] = [$entryID, $logID];
      }
      // Pro advanced pass: even with no classic/basic rows, advanced (Pro) rows may add confirmation/redirect/mail/integration.
      $workFlowReturnable = apply_filters('bitform_process_advanced_workflows', $workFlowReturnable, $workFlowRun, $fields, $fieldValue, $entryID, $logID, static::$_formID);
      return $this->suppressFallbackMessageOnRedirect($workFlowReturnable);
    }

    $fieldData = Helper::getFieldData($fields);

    $isCronOK = !defined('DOING_CRON') && wp_doing_ajax() && (!defined('DISABLE_WP_CRON') || (defined('DISABLE_WP_CRON') && DISABLE_WP_CRON));
    if ($isCronOK) {
      // From wp spawn_cron()
      $gmt_time = microtime(true);
      $lock = get_transient('doing_cron');
      if ($lock > $gmt_time + 10 * MINUTE_IN_SECONDS) {
        $lock = 0;
      }
      if ($lock + WP_CRON_LOCK_TIMEOUT > $gmt_time) {
        $isCronOK = false;
      }
    }

    $onFormSuccessActionDefault = [
      'workFlowReturnable' => $workFlowReturnable,
      'mailData'           => [],
      'dblOptin'           => [],
      'integrationsToExc'  => [],
      'isWebHookQueued'    => false,
    ];

    $onFormSuccessActionDefault = $this->runSubmitWorkflowActions($workFlows, $onFormSuccessActionDefault, $fieldData, $fieldValue, $entryID);
    if (isset($onFormSuccessActionDefault['workFlowReturnable']['fields'])) {
      $fieldValue = $onFormSuccessActionDefault['workFlowReturnable']['fields'];
    }
    $workFlowReturnable = $onFormSuccessActionDefault['workFlowReturnable'];
    $integrationsToExc = $onFormSuccessActionDefault['integrationsToExc'];
    if (empty($workFlowReturnable['message'])) {
      $defaultConfimation = Helper::setDefaultSubmitConfirmation('successMsg', $fieldValue, static::$_formID, $logID, $workFlowRun);
      $workFlowReturnable['message'] = $defaultConfimation['confirmation'];
      $workFlowReturnable['msg_id'] = $defaultConfimation['msg_id'];

      if (empty($defaultConfimation['confirmation'])) {
        $workFlowReturnable['message'] = 'edit' !== $workFlowRun ? __('Form Submitted Successfully', 'bit-form')
        : __('Entry Updated Successfully', 'bit-form');
        $workFlowReturnable['msg_id'] = 0;
      }
      if (!empty($defaultConfimation['afterSubmit'])) {
        $workFlowReturnable['afterSubmit'] = $defaultConfimation['afterSubmit'];
      }
      if (!empty($defaultConfimation['msg_duration'])) {
        $workFlowReturnable['msg_duration'] = $defaultConfimation['msg_duration'];
      }
      $workFlowReturnable['dflt_message'] = true;
    }
    if (empty($workFlowReturnable['redirectPage'])) {
      $defaultConfimation = Helper::setDefaultSubmitConfirmation('redirectPage', $fieldValue, static::$_formID, $logID, $workFlowRun);

      $workFlowReturnable['redirectPage'] = $defaultConfimation['confirmation'];
    }
    // Default-execute every enabled email/integration NOT gated by a workflow (classic/basic/advanced).
    // getDefault* exclude ids referenced by workflows (Free filter) and advanced CL (Pro filter), so the
    // workflow-queued actions above are not duplicated and gated actions are not run unconditionally.
    $data = [
      'mail'         => array_merge($onFormSuccessActionDefault['mailData'], Helper::getDefaultMailNotifications(static::$_formID, $workFlowRun)),
      'dblOptin'     => $onFormSuccessActionDefault['dblOptin'],
      'integrations' => array_merge($integrationsToExc, Helper::getDefaultIntegrations(static::$_formID, $workFlowRun)),
      'entryID'      => $entryID,
      'logID'        => $logID,
      'formID'       => static::$_formID,
    ];
    $workFlowReturnable['triggerData'] = $data;
    if ($isCronOK) {
      $workFlowReturnable['cron'] = true;
    } else {
      $workFlowReturnable['cron'] = false;
    }
    // }
    // Pro advanced pass: queries category 'advanced' rows and merges/overrides confirmation, redirect, mail and integrations.
    $workFlowReturnable = apply_filters('bitform_process_advanced_workflows', $workFlowReturnable, $workFlowRun, $fields, $fieldValue, $entryID, $logID, static::$_formID);
    return $this->suppressFallbackMessageOnRedirect($workFlowReturnable);
  }

  /**
   * When only a redirect is configured (no confirmation message), skip the hardcoded
   * fallback message so the frontend redirects immediately instead of flashing it.
   * Only the fallback ever has dflt_message with msg_id 0; configured messages always
   * carry a DB msg_id. Message is blanked ('' not unset) so maybeSetCronForIntegration
   * still forwards hidden_fields/msg_id, and dflt_message is kept so the WP-registration
   * success-message override in FrontendFormManager still applies.
   */
  private function suppressFallbackMessageOnRedirect($workFlowReturnable)
  {
    if (
      !empty($workFlowReturnable['dflt_message'])
      && empty($workFlowReturnable['msg_id'])
      && !empty($workFlowReturnable['redirectPage'])
    ) {
      $workFlowReturnable['message'] = '';
    }
    return $workFlowReturnable;
  }

  /**
   * Evaluate a set of onsubmit workflow rows and accumulate their success actions.
   * Extracted from executeOnSubmit so BitForm Pro can reuse the exact same evaluation/action
   * pipeline for category 'advanced' rows (which Free's getWorkFlow excludes).
   *
   * @param array $workFlows                  rows from getWorkFlow()
   * @param array $onFormSuccessActionDefault accumulator: workFlowReturnable, mailData, dblOptin, integrationsToExc, isWebHookQueued
   * @param array $fieldData                  result of Helper::getFieldData($fields)
   *
   * @return array updated $onFormSuccessActionDefault (latest field values under ['workFlowReturnable']['fields'])
   */
  public function runSubmitWorkflowActions(array $workFlows, array $onFormSuccessActionDefault, $fieldData, $fieldValue, $entryID)
  {
    foreach ($workFlows as $workFlow) {
      $conditions = json_decode($workFlow->workflow_condition);

      $conditionBehaviour = $workFlow->workflow_behaviour;
      if ('cond' === $conditionBehaviour) {
        foreach ($conditions as $condition) {
          $type = $condition->cond_type;
          if (!empty($condition->actions)) {
            $actions = $condition->actions;
            $conditionStatus = false;
            if (!empty($condition->logics)) {
              $logics = $condition->logics;
              $fieldData = Helper::smartFldMargeFormFld($logics, $fieldData);
              $conditionalLogic = new ConditionalLogic($logics, $fieldData);
              $conditionStatus = $conditionalLogic->getConditionStatus();
            }
            $conditionStatus = apply_filters('bitform_filter_workflow_condition_status', $conditionStatus, $condition, $fieldData, $this::$_formID);

            if (($conditionStatus && in_array($type, ['if', 'else-if'])) || 'else' === $type) {
              $fieldValue = $this->_actions->setOnSubmitSetFieldValue($actions->fields, $fieldValue);
              $onFormSuccessActionDefault = $this->_actions->setOnFormSuccess($onFormSuccessActionDefault, $actions->success, $fieldValue, $entryID);
              $onFormSuccessActionDefault['workFlowReturnable']['fields'] = $fieldValue;
              break;
            }
          }
        }
      } elseif ('always' === $conditionBehaviour) {
        $actions = $conditions[0]->actions;
        $fieldValue = $this->_actions->setOnSubmitSetFieldValue($actions->fields, $fieldValue);
        $onFormSuccessActionDefault = $this->_actions->setOnFormSuccess($onFormSuccessActionDefault, $actions->success, $fieldValue, $entryID);
        $onFormSuccessActionDefault['workFlowReturnable']['fields'] = $fieldValue;
      }
    }
    return $onFormSuccessActionDefault;
  }

  public function executeOnDelete(AdminFormManager $formManager, $formID, $deletedIds)
  {
    $workFlows = $this->getWorkFlow(['delete'], 'delete');
    $workFlowReturnable = [];
    if (empty($workFlows) || is_wp_error($workFlows) || empty($deletedIds)) {
      return [];
    }
    if (!$formManager instanceof AdminFormManager) {
      $formManager = new AdminFormManager($formID);
    }
    $returnableEntries = $deletedIds;
    $formFields = $formManager->getFieldLabel();
    $entryMeta = new FormEntryMetaModel();
    $entries = $entryMeta->getEntryMeta(
      $formFields,
      $deletedIds
    );
    if (is_wp_error($entries) || empty($entries['entries'])) {
      return $entries;
    }
    foreach ($entries['entries'] as $entry) {
      $fieldValue = (array) $entry;
      unset($fieldValue['entry_id']);
      $fields = $formManager->getFormContentWithValue($fieldValue)->fields;
      $fieldData = Helper::getFieldData($fields);

      foreach ($workFlows as $workFlow) {
        $workFlowBlock = json_decode($workFlow->workflow_condition);
        // $conditions = $workFlowBlock->logics;
        // $actions = $workFlowBlock->actions;
        $conditionBehaviour = $workFlow->workflow_behaviour;

        if ('cond' === $conditionBehaviour) {
          foreach ($workFlowBlock as $condition) {
            $actions = $condition->actions;
            $type = $condition->cond_type;
            $logics = $condition->logics;
            $fieldData = Helper::smartFldMargeFormFld($logics, $fieldData);
            $conditionalLogic = new ConditionalLogic($logics, $fieldData);
            $conditionStatus = $conditionalLogic->getConditionStatus();

            $conditionStatus = apply_filters('bitform_filter_workflow_condition_status', $conditionStatus, $condition, $fieldData, $this::$_formID);

            if (($conditionStatus && in_array($type, ['if', 'else-if'])) || 'else' === $type) {
              $isExists = \array_search($entry->entry_id, $returnableEntries);
              if (!empty($actions->avoid_delete) && false !== $isExists) {
                unset($returnableEntries[$isExists]);
                $returnableEntries = array_values($returnableEntries);
              } elseif (false === $isExists) {
                $returnableEntries[] = $entry->entry_id;
              }
              if (!empty($actions->success)) {
                foreach ($actions->success as $successActionDetail) {
                  switch ($successActionDetail->type) {
                    case 'webHooks':
                      if (!empty($successActionDetail->details->id)) {
                        $webHooks = $successActionDetail->details->id;
                        Integrations::executeIntegrations($webHooks, $fieldValue, static::$_formID);
                      }
                      break;
                    case 'mailNotify':
                      if (!empty($successActionDetail->details->id)) {
                        MailNotifier::notify($successActionDetail->details, static::$_formID, $fieldValue, $entry->entry_id);
                      }
                      break;
                    default:
                      break;
                  }
                }
              }
              break;
            }
          }
        } elseif ('always' === $conditionBehaviour) {
          $actions = $workFlowBlock[0]->actions;
          $isExists = \array_search($entry->entry_id, $returnableEntries);
          if (!empty($actions->avoid_delete) && false !== $isExists) {
            unset($returnableEntries[$isExists]);
            $returnableEntries = array_values($returnableEntries);
          } elseif (false === $isExists) {
            $returnableEntries[] = $entry->entry_id;
          }
          if (!empty($actions->success)) {
            foreach ($actions->success as $successActionDetail) {
              switch ($successActionDetail->type) {
                case 'webHooks':
                  if (!empty($successActionDetail->details->id)) {
                    $webHooks = $successActionDetail->details->id;
                    Integrations::executeIntegrations($webHooks, $fieldValue, static::$_formID);
                  }
                  break;
                case 'mailNotify':
                  if (!empty($successActionDetail->details->id)) {
                    MailNotifier::notify($successActionDetail->details, static::$_formID, $fieldValue, $entry->entry_id);
                  }
                  break;
                default:
                  break;
              }
            }
          }
        }
      }
    }
    // }
    $workFlowReturnable['entries'] = array_values($returnableEntries);
    return $workFlowReturnable;
  }
}
