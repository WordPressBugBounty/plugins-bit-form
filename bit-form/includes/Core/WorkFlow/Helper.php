<?php

namespace BitCode\BitForm\Core\WorkFlow;

use BitCode\BitForm\Core\Integration\IntegrationHandler;
use BitCode\BitForm\Core\Messages\EmailTemplateHandler;
use BitCode\BitForm\Core\Messages\SuccessMessageHandler;
use BitCode\BitForm\Core\Util\FieldValueHandler;
use BitCode\BitForm\Core\Util\SmartTags;
use BitCode\BitForm\Core\Util\Utilities;

final class Helper
{
  public static function getFieldData($fields)
  {
    $fieldData = [];

    foreach ($fields as $fieldKey => $fieldDetail) {
      $value = isset($fieldDetail->val) ? $fieldDetail->val : (isset($fieldDetail->defaultValue) ? $fieldDetail->defaultValue : '');
      $fieldData[$fieldKey] = [
        'key'   => $fieldKey,
        'value' => $value,
        'type'  => $fieldDetail->typ,
      ];
      if (isset($fieldDetail->mul)) {
        $fieldData[$fieldKey] =
            array_merge(
              $fieldData[$fieldKey],
              [
                'mul' => $fieldDetail->mul,
              ]
            );
      }
    }
    return $fieldData;
  }

  public static function smartFldMargeFormFld($logics, $fieldData)
  {
    $fieldKeys = SmartTags::smartTagFieldKeys();

    foreach ($logics as $logic) {
      $removeSpecialStr = ['${', '}', '()'];
      if (isset($logic->field) && in_array(str_replace($removeSpecialStr, '', $logic->field), $fieldKeys)) {
        $field = str_replace($removeSpecialStr, '', $logic->field);

        $fldKey = '${' . $field . '}';
        $customValue = isset($logic->smartKey) ? $logic->smartKey : '';
        $val = SmartTags::getSmartTagValue($field, false, $customValue);

        $fieldData[$fldKey] = [
          'key'   => $fldKey,
          'value' => empty($val) ? '' : $val,
          'type'  => is_string($val) ? 'text' : 'array',
        ];
      }
    }
    return $fieldData;
  }

  public static function replaceFieldWithValue($stringToReplaceField, $fieldValues, $evalMathExpr = true, $formID = null, $stripShortcodesFromValues = false)
  {
    $stringToReplaceField = FieldValueHandler::replaceFieldWithValue($stringToReplaceField, $fieldValues, $formID, $stripShortcodesFromValues);
    if ($evalMathExpr) {
      return self::evalMathExpression($stringToReplaceField);
    }
    return $stringToReplaceField;
  }

  public static function setDefaultSubmitConfirmation($confirmationType, $fieldValue, $formId, $logID = 0, $workFlowRun = null)
  {
    $messageId = 0;
    $returnableData = null;
    $afterSubmit = null;
    $msgDuration = null;
    $integrationHandler = new IntegrationHandler($formId);
    $conditionalActionIds = self::getDefaultSubmitExcludedActionIds($formId, $workFlowRun);
    switch ($confirmationType) {
      case 'successMsg':
        // Standalone confirmation: show the first ENABLED success message without requiring a workflow.
        $successMessageHandler = new SuccessMessageHandler($formId);
        $successMessage = $successMessageHandler->getAllMessage();
        if (!is_wp_error($successMessage) && !empty($successMessage)) {
          foreach ($successMessage as $msg) {
            $msgConfig = Utilities::jsonObj($msg->message_config);
            if (
              isset($msgConfig->status) && empty($msgConfig->status)
              || isset($conditionalActionIds['successMsg'][(string) $msg->id])
            ) {
              continue;
            }
            $returnableData = self::replaceFieldWithValue($msg->message_content, $fieldValue, true, null, true);
            $messageId = $msg->id;
            if (isset($msgConfig->afterSubmit)) {
              $afterSubmit = $msgConfig->afterSubmit;
            }
            if (!empty($msgConfig->autoHide)) {
              $msgDuration = abs(floatval($msgConfig->duration ?? 0) * 1000);
            }
            break;
          }
        }
        break;
      case 'redirectPage':
        $redirectPages = $integrationHandler->getAllIntegration('form', 'redirectPage', 1);
        if (!is_wp_error($redirectPages) && !empty($redirectPages)) {
          foreach ($redirectPages as $redirectPage) {
            if (isset($conditionalActionIds['redirectPage'][(string) $redirectPage->id])) {
              continue;
            }
            $url = Utilities::jsonObj($redirectPage->integration_details ?? '')->url ?? '';
            if (!empty($url)) {
              $url = self::replaceFieldWithValue($url, $fieldValue);
            }
            $returnableData = empty($url) ? '' : esc_url_raw($url);
            break;
          }
        }
        break;
      case 'webHooks':
        // Default redirect/webhook remain workflow-driven for now (revisited in the Redirect/Integration phases).
        break;
      default:
        break;
    }

    return [
      'msg_id'       => $messageId,
      'confirmation' => $returnableData,
      'afterSubmit'  => $afterSubmit,
      'msg_duration' => $msgDuration,
    ];
  }

  private static function getDefaultSubmitExcludedActionIds($formId, $workFlowRun = null)
  {
    $actionIds = [
      'successMsg'   => [],
      'redirectPage' => [],
      'mailNotify'   => [],
      'integrations' => [],
    ];
    $filteredActionIds = apply_filters(
      'bitform_default_submit_confirmation_excluded_action_ids',
      $actionIds,
      $formId,
      $workFlowRun
    );

    return is_array($filteredActionIds) ? $filteredActionIds : $actionIds;
  }

  public static function getDefaultMailNotifications($formId, $workFlowRun = null)
  {
    $mailData = [];
    $emailTemplateHandler = new EmailTemplateHandler($formId);
    $templates = $emailTemplateHandler->getAllTemplate();
    if (empty($templates) || is_wp_error($templates)) {
      return $mailData;
    }
    $excludedActionIds = self::getDefaultSubmitExcludedActionIds($formId, $workFlowRun);
    $arrayFields = ['to', 'cc', 'bcc', 'replyto', 'attachment', 'mediaAttachment', 'pdfIds'];
    foreach ($templates as $template) {
      $status = isset($template->status) ? (int) $template->status : 1;
      if (
        1 !== $status
        || isset($excludedActionIds['mailNotify'][(string) $template->id])
      ) {
        continue;
      }
      $config = json_decode($template->config);
      $details = new \stdClass();
      $details->id = wp_json_encode(['id' => (string) $template->id]);
      foreach (['to', 'from', 'from_name', 'cc', 'bcc', 'replyto', 'attachment', 'mediaAttachment', 'pdfId', 'pdfIds'] as $key) {
        $details->$key = isset($config->$key) ? $config->$key : (in_array($key, $arrayFields, true) ? [] : '');
      }
      $mailData[] = $details;
    }
    return $mailData;
  }

  public static function getDefaultIntegrations($formId, $workFlowRun = null)
  {
    $integrationIds = [];
    $integrationHandler = new IntegrationHandler($formId);
    $allIntegrations = $integrationHandler->getAllIntegration('form', null, 1);
    if (empty($allIntegrations) || is_wp_error($allIntegrations)) {
      return $integrationIds;
    }
    $excludedActionIds = self::getDefaultSubmitExcludedActionIds($formId, $workFlowRun);
    foreach ($allIntegrations as $integration) {
      if (
        'redirectPage' === $integration->integration_type
        || isset($excludedActionIds['integrations'][(string) $integration->id])
      ) {
        continue;
      }
      // triggerData['integrations'] is a list of GROUPS; each group is an array of JSON id strings
      // (Integrations::executeIntegrations requires is_array() with string members). Wrap each id.
      $integrationIds[] = [wp_json_encode(['id' => (string) $integration->id])];
    }
    return $integrationIds;
  }

  /**
   * Free implementation of the default-submit exclusion filter: any message / redirect / email /
   * integration referenced by a classic/basic onsubmit workflow success action is workflow-gated,
   * so it must NOT be default-executed (Pro adds the advanced-CL ids separately). Registered in Hooks.
   */
  public static function workflowReferencedActionIds($actionIds, $formId, $workFlowRun = null)
  {
    static $cache = [];

    $actionIds = is_array($actionIds) ? $actionIds : [];
    foreach (['successMsg', 'redirectPage', 'mailNotify', 'integrations'] as $bucket) {
      if (empty($actionIds[$bucket]) || !is_array($actionIds[$bucket])) {
        $actionIds[$bucket] = [];
      }
    }

    $cacheKey = (string) $formId . ':' . (string) $workFlowRun;
    if (!isset($cache[$cacheKey])) {
      $workFlow = new WorkFlow($formId);
      $rows = $workFlow->getWorkFlow(['create_edit', $workFlowRun ?? 'create'], ['onsubmit'], null, 'workflow_order');
      $cache[$cacheKey] = self::collectReferencedActionIds(is_wp_error($rows) ? [] : $rows);
    }

    foreach ($cache[$cacheKey] as $bucket => $ids) {
      $actionIds[$bucket] = $actionIds[$bucket] + $ids;
    }
    return $actionIds;
  }

  /**
   * Extract the message / redirect / email / integration ids referenced by workflow-row success
   * actions, grouped into the four exclusion buckets. Shared by the runtime default-submit filter
   * and the one-time orphan-deactivation migration (SubmitActionFallback).
   *
   * @param array $rows workflow rows each having a ->workflow_condition JSON string
   *
   * @return array{successMsg:array,redirectPage:array,mailNotify:array,integrations:array}
   */
  public static function collectReferencedActionIds($rows)
  {
    $referenced = ['successMsg' => [], 'redirectPage' => [], 'mailNotify' => [], 'integrations' => []];
    if (empty($rows) || !is_array($rows)) {
      return $referenced;
    }
    foreach ($rows as $row) {
      $conditions = json_decode($row->workflow_condition ?? '');
      if (empty($conditions) || !is_array($conditions)) {
        continue;
      }
      foreach ($conditions as $condition) {
        if (empty($condition->actions->success)) {
          continue;
        }
        foreach ($condition->actions->success as $success) {
          if (empty($success->type) || empty($success->details->id)) {
            continue;
          }
          $bucket = self::actionExclusionBucket($success->type);
          if (null === $bucket) {
            continue;
          }
          foreach (self::extractActionIds($success->details->id) as $id) {
            $referenced[$bucket][$id] = true;
          }
        }
      }
    }
    return $referenced;
  }

  private static function actionExclusionBucket($type)
  {
    switch ($type) {
      case 'successMsg':
        return 'successMsg';
      case 'redirectPage':
        return 'redirectPage';
      case 'mailNotify':
        return 'mailNotify';
      case 'integ':
      case 'webHooks':
        return 'integrations';
      default:
        return null;
    }
  }

  private static function extractActionIds($detailId)
  {
    $ids = [];
    $items = is_array($detailId) ? $detailId : [$detailId];
    foreach ($items as $item) {
      if (!is_string($item)) {
        continue;
      }
      $decoded = json_decode($item);
      if (isset($decoded->id)) {
        $ids[] = (string) $decoded->id;
      }
    }
    return $ids;
  }

  /**
   * @deprecated misspelled duplicate of calculate(); kept because it is public API. Same
   *             divide-by-zero guard so an external caller cannot fatal either.
   */
  public static function calculte($firstOperand, $secondOperand, $operator)
  {
    return self::calculate($firstOperand, $secondOperand, $operator);
  }

  public static function filterMailContentType()
  {
    return 'text/html';
  }

  public static function evalMathExpression($stringWithFieldValue)
  {
    $mathExpr = $stringWithFieldValue;
    if (empty($mathExpr) || !\is_scalar($mathExpr)) {
      return $stringWithFieldValue;
    }
    $mathExpr = (string) $mathExpr;

    // The operand/operator checks below only look at \w+ runs and operator runs, so any other
    // character was invisible to them. A quoted date ('2020-10-10') therefore passed as a
    // subtraction chain and its quotes later surfaced as a bogus operator token. Require the whole
    // string to be made of things a formula can contain.
    if (1 !== preg_match('#^[0-9.+\-*/^()\[\]{}\s]+$#', $mathExpr)) {
      return $stringWithFieldValue;
    }

    // A bare date is not a subtraction: 2020-10-10 must stay a date, not become 2000.
    if (1 === preg_match('/^\s*\d{4}-\d{1,2}-\d{1,2}\s*$/', $mathExpr)) {
      return $stringWithFieldValue;
    }

    preg_match_all('/[\+\-\*\/\s]+/', $mathExpr, $isMathExpr);
    if (empty($isMathExpr[0])) {
      return $stringWithFieldValue;
    }
    preg_match_all('/\w+/', $mathExpr, $exprValues);
    if (empty($exprValues[0])) {
      return $stringWithFieldValue;
    }
    foreach ($exprValues[0] as $opreands) {
      if (!is_numeric($opreands)) {
        return $stringWithFieldValue;
      }
    }
    $validOperator = ['+', '-', '*', '^', '/'];
    foreach ($isMathExpr[0] as $value) {
      if (!in_array(trim($value), $validOperator)) {
        return $stringWithFieldValue;
      }
    }
    $mathExpr = str_replace(' ', '', $mathExpr);
    $mathExpr = preg_replace('/\{|\[|\(/', '(', $mathExpr);
    $mathExpr = preg_replace('/\}|\]/', ')', $mathExpr);
    $calculated = self::infixToPostfixEvalute($mathExpr);
    if (!is_null($calculated) && isset($calculated[0])) {
      return (string) $calculated[0];
    }

    return (string) $stringWithFieldValue;
  }

  public static function infixToPostfixEvalute($expression)
  {
    $operatorStack = [];
    $outputQueue = [];
    $numTemp = null;
    for ($strIndex = 0; $strIndex < strlen($expression); $strIndex++) {
      $token = $expression[$strIndex];
      if ('+' === $token || '-' === $token || '*' === $token || '/' === $token || '^' === $token || '(' === $token || ')' === $token) {
        if (!is_null($numTemp)) {
          $outputQueue[] = $numTemp;
          $numTemp = null;
        }
        $stackSize = count($operatorStack);
        if ($stackSize) {
          $stackTop = $operatorStack[$stackSize - 1];
        }
        if ('(' === $token) {
          $operatorStack[] = $token;
        } elseif (')' === $token) {
          // An unbalanced ')' used to read $operatorStack[-1] and warn on every iteration; treat
          // the expression as non-arithmetic instead.
          if (empty($operatorStack)) {
            return null;
          }
          while ('(' !== $operatorStack[count($operatorStack) - 1]) {
            $outputQueue[] = array_pop($operatorStack);
            if (empty($operatorStack)) {
              return null;
            }
            if ('(' === $operatorStack[count($operatorStack) - 1]) {
              array_pop($operatorStack);
              break;
            }
          }
        } elseif (isset($stackTop) && self::operatorPrecedence($token) > self::operatorPrecedence($stackTop)) {
          $operatorStack[] = $token;
        } elseif ('^' !== $token && $stackSize) {
          $operatorStack[$stackSize - 1] = $token;
          $outputQueue[] = $stackTop;
        } else {
          $operatorStack[] = $token;
        }
        continue;
      }
      $numTemp .= $token;
      if ($strIndex === strlen($expression) - 1 && !is_null($numTemp)) {
        $outputQueue[] = $numTemp;
      }
    }

    if (!is_null($operatorStack)) {
      $outputQueue = array_merge($outputQueue, array_reverse($operatorStack));
    }
    $resultStack = [];
    foreach ($outputQueue as $value) {
      if (is_numeric($value)) {
        $resultStack[] = $value;
        continue;
      }
      // A token that is neither a number nor a real operator means the input was never an
      // expression — e.g. a quoted date whose quotes accumulated into a token like "'2020".
      // Bail out so evalMathExpression() returns the caller's string untouched; pushing the
      // failure onto the stack would end up blanking that string.
      if (!\in_array($value, ['+', '-', '*', '/', '^'], true) || count($resultStack) < 2) {
        return null;
      }
      $secondOperand = array_pop($resultStack);
      $firstOperand = array_pop($resultStack);
      $calculated = self::calculate($firstOperand, $secondOperand, $value);
      if (\is_null($calculated)) {
        return null;
      }
      $resultStack[] = $calculated;
    }
    return $resultStack;
  }

  public static function operatorPrecedence($operator)
  {
    $precedence = [
      '+' => 2,
      '-' => 2,
      '*' => 3,
      '/' => 3,
      '^' => 4,
    ];

    return isset($precedence[$operator]) ? $precedence[$operator] : 0;
  }

  /**
   * Apply one arithmetic operator.
   *
   * @param mixed  $firstOperand
   * @param mixed  $secondOperand
   * @param string $operator
   *
   * @return float|int|null null on unknown operator, non-numeric operand, or division by zero
   */
  public static function calculate($firstOperand, $secondOperand, $operator)
  {
    if (!is_numeric($firstOperand) || !is_numeric($secondOperand)) {
      return null;
    }
    $firstOperand = $firstOperand + 0;
    $secondOperand = $secondOperand + 0;

    switch ($operator) {
      case '+':
        return $firstOperand + $secondOperand;
      case '-':
        return $firstOperand - $secondOperand;
      case '*':
        return $firstOperand * $secondOperand;
      case '/':
        return 0 == $secondOperand ? null : $firstOperand / $secondOperand;
      case '^':
        return $firstOperand ** $secondOperand;
    }

    return null;
  }

  /**
   * Recursively sets a nested property in a given object.
   *
   * This function takes an object, a string path representing nested properties
   * (e.g., "fk->valid->hide"), and a value to assign. It ensures that all
   * intermediate properties exist as objects before setting the final value.
   *
   * @param object $object The main object where properties should be set.
   * @param string $path The nested property path, with keys separated by "->".
   * @param mixed $value The value to assign to the final property.
   *
   * @return void
   */
  public static function setNestedProperty(&$object, $path, $value)
  {
    $keys = explode('->', $path);
    $key = array_shift($keys);

    if (!isset($object->$key) || !is_object($object->$key)) {
      $object->$key = new \stdClass();
    }

    if (!empty($keys)) {
      self::setNestedProperty($object->$key, implode('->', $keys), $value);
    } else {
      $object->$key = $value;
    }
  }
}
