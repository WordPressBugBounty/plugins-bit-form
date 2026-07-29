<?php

namespace BitCode\BitForm\Core\WorkFlow;

use BitCode\BitForm\Core\Integration\IntegrationHandler;
use BitCode\BitForm\Core\Messages\SuccessMessageHandler;
use BitCode\BitForm\Core\Util\Utilities;

final class Actions
{
  private static $_formID;

  public function __construct($formId)
  {
    static::$_formID = $formId;
  }

  /**
   * Resolve the field key a workflow action points at.
   *
   * Both arguments come straight out of stored workflow/form JSON, so neither shape is guaranteed
   * — hence the runtime checks rather than type hints.
   *
   * @param mixed $actionDetail one action row decoded from the workflow JSON
   * @param mixed $fieldData    field map keyed by field name
   *
   * @return string|null null when the action points at a field the form no longer has
   */
  private static function resolveFieldKey($actionDetail, $fieldData)
  {
    if (!is_object($actionDetail) || !isset($actionDetail->field) || !\is_array($fieldData)) {
      return null;
    }
    $field = $actionDetail->field;
    if (!\is_string($field) && !\is_int($field)) {
      return null;
    }
    if (!isset($fieldData[$field]) || !\is_array($fieldData[$field]) || !isset($fieldData[$field]['key'])) {
      return null;
    }
    $key = $fieldData[$field]['key'];

    return \is_string($key) || \is_int($key) ? (string) $key : null;
  }

  public function setValue($actionDetail, $fieldData, $fields)
  {
    $fk = self::resolveFieldKey($actionDetail, $fieldData);
    if (null !== $fk && isset($fields->{$fk}) && !empty($actionDetail->val)) {
      $fieldType = isset($fields->{$fk}->typ) ? $fields->{$fk}->typ : '';
      $evalMathExpr = preg_match('/month|date/', (string) $fieldType);
      $fields->{$fk}->val = '';
      $actionValue = Helper::replaceFieldWithValue($actionDetail->val, $fieldData, !(bool) $evalMathExpr);
      $fields->{$fk}->val = $actionValue;
      $fieldData[$actionDetail->field]['value'] = $actionValue;
    }
    return [$fields, $fieldData];
  }

  public function getActionValue($actionDetail, $fieldData, $fields)
  {
    $actionValue = '';
    $fk = self::resolveFieldKey($actionDetail, $fieldData);
    if (null !== $fk && isset($fields->{$fk}) && !empty($actionDetail->val)) {
      $fieldType = isset($fields->{$fk}->typ) ? $fields->{$fk}->typ : '';
      $evalMathExpr = preg_match('/month|date/', (string) $fieldType);
      $fields->{$fk}->val = '';
      $actionValue = Helper::replaceFieldWithValue($actionDetail->val, $fieldData, !(bool) $evalMathExpr);
    }
    return $actionValue;
  }

  public function getActiveListIndex($actionDetail, $fieldData, $fields)
  {
    $activeList = $this->getActionValue($actionDetail, $fieldData, $fields);
    $activeListIndex = 0;
    $fk = self::resolveFieldKey($actionDetail, $fieldData);
    if (null === $fk || !isset($fields->{$fk}->optionsList)) {
      return $activeListIndex;
    }
    $optionsList = $fields->{$fk}->optionsList;
    if (!\is_array($optionsList) && !\is_object($optionsList)) {
      return $activeListIndex;
    }
    foreach ($optionsList as $key => $optionObj) {
      $valueArr = (array) $optionObj;
      if (empty($valueArr)) {
        continue;
      }
      $listName = array_keys($valueArr)[0];
      if ($listName === $activeList) {
        $activeListIndex = $key;
        break;
      }
    }

    return $activeListIndex;
  }

  public function show($fields, $fieldData, $actionDetail)
  {
    $fk = self::resolveFieldKey($actionDetail, $fieldData);
    if (null === $fk || !isset($fields->{$fk})) {
      return;
    }
    Helper::setNestedProperty($fields, "{$fk}->valid->hide", false);
    if (isset($fields->{$fk}->typ) && 'hidden' === $fields->{$fk}->typ) {
      $fields->{$fk}->typ = 'text';
    }
  }

  public function setFieldProperty($actions, $fieldData, $fields)
  {
    if (empty($actions)) {
      return [$fields, $fieldData];
    }
    foreach ($actions as $actionDetail) {
      // resolveFieldKey() must run *before* $fields is indexed: the old condition built the
      // dynamic property name from $fieldData[...]['key'] inside its own isset(), so the missing
      // key warned before isset() ever got a chance to short-circuit.
      $fk = self::resolveFieldKey($actionDetail, $fieldData);
      if (null === $fk || empty($actionDetail->action) || !isset($fields->{$fk}) || empty($fields->{$fk})) {
        continue;
      }
      switch ($actionDetail->action) {
        case 'value':
          $data = $this->setValue($actionDetail, $fieldData, $fields);
          $fields = $data[0];
          $fieldData = $data[1];
          break;
        case 'hide':
          Helper::setNestedProperty($fields, "{$fk}->valid->hide", true);
          break;
        case 'disable':
          Helper::setNestedProperty($fields, "{$fk}->valid->disabled", true);
          break;
        case 'show':
          $this->show($fields, $fieldData, $actionDetail);
          break;
        case 'enable':
          Helper::setNestedProperty($fields, "{$fk}->valid->disabled", false);
          break;
        case 'readonly':
          Helper::setNestedProperty($fields, "{$fk}->valid->readonly", true);
          break;
        case 'writeable':
          Helper::setNestedProperty($fields, "{$fk}->valid->readonly", false);
          break;
        case 'required':
          Helper::setNestedProperty($fields, "{$fk}->valid->required", true);
          break;
        case 'limit':
          Helper::setNestedProperty($fields, "{$fk}->valid->limit", true);
          break;
        case 'min':
          Helper::setNestedProperty($fields, "{$fk}->valid->min", true);
          break;
        case 'max':
          Helper::setNestedProperty($fields, "{$fk}->valid->max", true);
          break;
        case 'activelist':
          // setNestedProperty() creates the intermediate `valid`/`config` object when a legacy
          // field JSON does not carry one; the direct writes here used to auto-vivify it and
          // emit an undefined-property warning on every run.
          Helper::setNestedProperty($fields, "{$fk}->config->activeList", $this->getActiveListIndex($actionDetail, $fieldData, $fields));
          break;
        case 'lbl':
        case 'ct':
          $fields->{$fk}->lbl = $this->getActionValue($actionDetail, $fieldData, $fields);
          break;
        case 'sub-titl':
          $fields->{$fk}->subtitle = $this->getActionValue($actionDetail, $fieldData, $fields);
          break;
        case 'hlp-txt':
          $fields->{$fk}->helperTxt = $this->getActionValue($actionDetail, $fieldData, $fields);
          break;
        case 'placeholder':
          $fields->{$fk}->ph = $this->getActionValue($actionDetail, $fieldData, $fields);
          break;
        case 'title':
          $fields->{$fk}->title = $this->getActionValue($actionDetail, $fieldData, $fields);
          break;
      }
    }
    return [$fields, $fieldData];
  }

  public function setOnSubmitSetFieldValue($actions, $fieldValue)
  {
    if (empty($actions)) {
      return $fieldValue;
    }
    foreach ($actions as $actionDetail) {
      if (!empty($actionDetail->action) && !empty($actionDetail->field)) {
        switch ($actionDetail->action) {
          case 'value':
            if (!empty($actionDetail->val)) {
              $fieldValue[$actionDetail->field] = '';
              $actionValue = Helper::replaceFieldWithValue($actionDetail->val, $fieldValue);
              $fieldValue[$actionDetail->field] = $actionValue;
            }
            break;
        }
      }
    }
    return $fieldValue;
  }

  public function setOnFormSuccess($data, $actions, $fieldValue, $entryID)
  {
    if (empty($actions)) {
      return $data;
    }

    foreach ($actions as $successActionDetail) {
      $id = $successActionDetail->details->id;
      if (!empty($id)) {
        switch ($successActionDetail->type) {
          case 'successMsg':
            $data['workFlowReturnable'] = $this->confirmationMessage($data['workFlowReturnable'], $id, $fieldValue, $entryID);
            break;
          case 'redirectPage':
            $data['workFlowReturnable'] = $this->redirectPage($data['workFlowReturnable'], $id, $fieldValue);
            break;
          case 'webHooks':
            if (!$data['isWebHookQueued']) {
              $data['isWebHookQueued'] = true;
            }
            $data['integrationsToExc'][] = $id;
            break;
          case 'mailNotify':
            $data['mailData'][] = $successActionDetail->details;
            break;
          case 'dblOptin':
            $data['dblOptin'][] = $successActionDetail->details;
            break;
          case 'integ':
            $data['integrationsToExc'][] = $id;
            break;
          default:
            break;
        }
      }
    }
    return $data;
  }

  public function confirmationMessage($workFlowReturnable, $successActionDetailId, $fieldValue, $entryID = null)
  {
    $id = Utilities::jsonObj($successActionDetailId)->id ?? null;
    $messageHandler = new SuccessMessageHandler(static::$_formID);
    $message = $messageHandler->getAMessage($id);
    if (!is_wp_error($message) && !empty($message)) {
      $msgConfig = Utilities::jsonObj($message[0]->message_config ?? '');
      // Honor enable/disable: a disabled confirmation message is skipped so the default confirmation applies.
      if (isset($msgConfig->status) && empty($msgConfig->status)) {
        return $workFlowReturnable;
      }
      $messageContent = $message[0]->message_content;

      // replace pdf link and password
      if (class_exists('\BitCode\BitFormPro\Admin\DownloadFile') && !empty($entryID)) {
        $downloadFile = new \BitCode\BitFormPro\Admin\DownloadFile();
        $messageContent = $downloadFile->replacePdfShortCodeToLink($messageContent, static::$_formID, $entryID);
        $messageContent = $downloadFile->replaceShortCodeToPdfPassword($messageContent, static::$_formID, $entryID);
      }

      $workFlowReturnable['message'] = Helper::replaceFieldWithValue($messageContent, $fieldValue, true, static::$_formID, true);
      if (!empty($workFlowReturnable['message'])) {
        $workFlowReturnable['message'] = do_shortcode($workFlowReturnable['message']);
      }
      $workFlowReturnable['msg_id'] = $message[0]->id;
      $msgConfig = Utilities::jsonObj($message[0]->message_config ?? '');
      if (!empty($msgConfig->autoHide)) {
        $workFlowReturnable['msg_duration'] = abs(floatval($msgConfig->duration ?? 0) * 1000);
      }
      // expose the form's after-submission behaviour ('reset' | 'hide' | 'keep') to the frontend
      if (isset($msgConfig->afterSubmit)) {
        $workFlowReturnable['afterSubmit'] = $msgConfig->afterSubmit;
      }
    }
    return $workFlowReturnable;
  }

  public function redirectPage($workFlowReturnable, $successActionDetailId, $fieldValue)
  {
    $id = Utilities::jsonObj($successActionDetailId)->id ?? null;
    $integrationHandler = new IntegrationHandler(static::$_formID);
    $redirectPage = $integrationHandler->getAIntegration($id, 'form', 'redirectPage');
    if (!is_wp_error($redirectPage) && !empty($redirectPage)) {
      // Honor enable/disable: a disabled redirect is skipped.
      if (isset($redirectPage[0]->status) && empty($redirectPage[0]->status)) {
        return $workFlowReturnable;
      }
      $url = Utilities::jsonObj($redirectPage[0]->integration_details ?? '')->url ?? '';
      if (!empty($url)) {
        $url = Helper::replaceFieldWithValue($url, $fieldValue);
      }
      $workFlowReturnable['redirectPage'] = empty($url) ? false : esc_url_raw($url);
    }
    return $workFlowReturnable;
  }
}
