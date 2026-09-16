<?php

namespace BitCode\BitForm\Core\Util;

use BitCode\BitForm\Admin\Form\Helpers;
use BitCode\BitForm\Core\Form\FormManager;

final class FieldValueHandler
{
  /**
   * @param mixed $stringToReplaceField
   * @param mixed $fieldValues
   * @param mixed $formID
   * @param bool  $stripShortcodesFromValues
   *
   * @return string
   */
  public static function replaceFieldWithValue($stringToReplaceField, $fieldValues, $formID = null, $stripShortcodesFromValues = false)
  {
    if (empty($stringToReplaceField)) {
      return $stringToReplaceField;
    }
    if (!is_string($stringToReplaceField)) {
      $stringToReplaceField = wp_json_encode($stringToReplaceField);
    }
    $fieldValues = $formID ? self::sortValueBasedOnLayout($formID, $fieldValues) : $fieldValues;

    // Must run on the raw template: after substitution an empty field and an empty template
    // are the same empty string.
    $stringToReplaceField = self::resolveConditionalBlocks($stringToReplaceField, $fieldValues, $formID);

    if ($formID) {
      $stringToReplaceField = self::replaceValueOfBf_all_data($stringToReplaceField, $fieldValues, $formID);
      $stringToReplaceField = self::replaceRepeaterFieldValue($stringToReplaceField, $fieldValues, $formID);
    }

    $stringToReplaceField = self::replaceSmartTagWithValue($stringToReplaceField);

    $fieldPattern = '/\${\w[^ ${}]*}/';

    preg_match_all($fieldPattern, $stringToReplaceField, $matchedField);
    if (empty($matchedField)) {
      return $stringToReplaceField;
    }
    $uniqueFieldsInStr = array_unique($matchedField[0]);
    foreach ($uniqueFieldsInStr as $key => $value) {
      $fieldName = substr($value, 2, strlen($value) - 3);
      $fieldValue = null;
      if (isset($fieldValues[$fieldName])) {
        $targetFieldValue = isset($fieldValues[$fieldName]['value']) ? $fieldValues[$fieldName]['value'] : $fieldValues[$fieldName];
        if ('array' === gettype($targetFieldValue) || 'object' === gettype($targetFieldValue)) {
          foreach (self::stripMetaSubfields((array) $targetFieldValue) as $singleTargetVal) {
            if (isset($fieldValue)) {
              if (is_numeric($fieldValue) && is_numeric($singleTargetVal)) {
                $fieldValue = $fieldValue + $singleTargetVal;
              } else {
                $fieldValue = "$fieldValue,  $singleTargetVal";
              }
            } else {
              $fieldValue = $singleTargetVal;
            }
          }
          // $fieldValue = wp_json_encode($targetFieldValue);
        } else {
          $fieldValue = strval($targetFieldValue);
        }
        // Neutralize shortcodes in low-trust submitted values before they are merged into a
        if ($stripShortcodesFromValues && is_string($fieldValue)) {
          $fieldValue = strip_shortcodes($fieldValue);
        }
        $stringToReplaceField = str_replace($value, $fieldValue, $stringToReplaceField);
      } else {
        $stringToReplaceField = str_replace($value, '', $stringToReplaceField);
      }
    }

    // check if the string is a function like : "${_bf_calc(${b27-5}*10)}"
    // TO DO: Implement the function properly
    // if (self::isFunction($stringToReplaceField)) {
    //   $functionName = self::getFunctionName($stringToReplaceField);

    //   switch ($functionName) {
    //     case '_bf_calc':
    //       return self::getFunctionParameter($stringToReplaceField);
    //     case '_bf_count':
    //       return self::getCountValue($stringToReplaceField);
    //     default:
    //       return 0;
    //   }
    // }
    return $stringToReplaceField;
  }

  public static function replaceBackBtnWithPrevPageUrl($stringToReplaceField)
  {
    $prevPageUrl = isset($_SERVER['HTTP_REFERER']) ? esc_url_raw(wp_unslash($_SERVER['HTTP_REFERER'])) : home_url();
    preg_match_all('/\$?\{back_to_view\}/', $stringToReplaceField, $matches);
    $matched = $matches[0];

    if (empty($matched) || !$prevPageUrl) {
      return $stringToReplaceField;
    }

    foreach ($matched as $m) {
      $stringToReplaceField = str_replace($m, $prevPageUrl, $stringToReplaceField);
    }
    return $stringToReplaceField;
  }

  /**
   * Summary of getCountValue - get the count value from the function string "${_bf_count(item-1, item-2)}" => 2
   *
   * @param string $functionString
   * @return int
   */
  private static function getCountValue(string $functionString): int
  {
    $options = self::getFunctionParameter($functionString);
    $option = explode(',', $options);
    return count($option);
  }

  /**
   * Summary of getFunctionParameter - get the function parameter from the function string "${_bf_calc(2*10)}" => 2*10
   *
   * @param string $functionString
   * @return string
   */
  private static function getFunctionParameter(string $functionString): string
  {
    $regexPattern = '/\(([^)]*)\)/';
    preg_match($regexPattern, $functionString, $matches);
    return $matches[1];
  }

  /**
   * Summary of isFunction - check if the string is a function "${_bf_calc(${b27-5}*10)}" or not "${_bf_date}"
   *
   * @param string $functionString
   * @return bool true if the string is a function else false
   */
  private static function isFunction(string $functionString): bool
  {
    $regexPattern = '/\([^)]*\)/';
    return preg_match($regexPattern, $functionString);
  }

  /**
   * Summary of getFunctionName - get the function name from the function string "${_bf_calc(${b27-5}*10)}" => _bf_calc
   *
   * @param string $functionString
   * @return string
   */
  private static function getFunctionName(string $functionString): string
  {
    $regexPattern = '/\b([a-zA-Z_][a-zA-Z0-9_]*)\(/';
    preg_match($regexPattern, $functionString, $matches);
    return $matches[1];
  }

  public static function validateMailArry($emailAddresses, $fieldValues)
  {
    if (!is_array($emailAddresses)) {
      return [FieldValueHandler::replaceFieldWithValue($emailAddresses, $fieldValues)];
    }
    foreach ($emailAddresses as $key => $email) {
      if (!is_email($email)) {
        $email = FieldValueHandler::replaceFieldWithValue($email, $fieldValues);
        if (is_email($email)) {
          $emailAddresses[$key] = $email;
        }
      }
    }
    return $emailAddresses;
  }

  public static function replaceSmartTagWithValue($contentWithSmartTag)
  {
    $fieldPattern = '/(\${_[^{]*?)(?=\})}/';
    $matchPattern = preg_match_all($fieldPattern, $contentWithSmartTag, $matchedField);
    if (!$matchPattern) {
      return $contentWithSmartTag;
    }

    $ajaxRequest = false;
    // Read-only action name check for routing; CSRF verified upstream in the form submission flow via verifySubmissionNonce().
    if (isset($_REQUEST['action']) && 'bitforms_trigger_workflow' === sanitize_text_field(wp_unslash($_REQUEST['action']))) {
      $ajaxRequest = true;
    }

    foreach (array_unique($matchedField[0]) as $value) {
      $fieldName = trim(substr($value, 2, strlen($value) - 3));

      $matches = preg_match('/\("*([^\)]+"*)\)/', $value, $matchCustomFormat);

      $customValue = '';
      if ($matches) {
        $removeQuote = ["'", '"'];
        $customValue = str_replace($removeQuote, '', $matchCustomFormat[1]);
        $fieldName = str_replace($matchCustomFormat[0], '', $fieldName);
      }

      $tagFieldValues = SmartTags::getSmartTagValue($fieldName, $ajaxRequest, $customValue);

      $contentWithSmartTag = str_replace($value, $tagFieldValues, $contentWithSmartTag);
    }
    return $contentWithSmartTag;
  }

  public static function isEmpty($val)
  {
    if (empty($val) && !in_array($val, ['0', 0, 0.0], true)) {
      return true;
    }
    return false;
  }

  /**
   * Whether a resolved value renders as nothing.
   *
   * Stricter than isEmpty(): whitespace-only is blank (some smart-tag resolvers return a
   * single space), so is an all-blank array. `0` / `'0'` never are.
   *
   * @param mixed $val
   *
   * @return bool
   */
  public static function isBlank($val)
  {
    if (null === $val || false === $val) {
      return true;
    }
    if (is_object($val)) {
      $val = (array) $val;
    }
    if (is_array($val)) {
      foreach ($val as $key => $item) {
        // Composite meta sub-values (_latitude, …) never render on their own.
        if (is_string($key) && 0 === strpos($key, '_')) {
          continue;
        }
        if (!self::isBlank($item)) {
          return false;
        }
      }
      return true;
    }
    if (!is_scalar($val)) {
      return true;
    }

    return '' === trim(str_replace("\xc2\xa0", '', (string) $val));
  }

  /**
   * Resolve `${bf_if:…}` … `${bf_endif}` template blocks.
   *
   * Syntax, operators and traps: docs/template-conditional-blocks.md.
   *
   * @param string $content
   * @param array  $fieldValues
   * @param mixed  $formID     needed to reach repeater rows; without it a child key reads blank
   *
   * @return string
   */
  private static function resolveConditionalBlocks($content, $fieldValues, $formID = null)
  {
    if (false === strpos($content, '${bf_if') && false === strpos($content, '${bf_unless')) {
      return self::stripConditionalBlockTags($content);
    }

    $conditionValues = $fieldValues;
    if ($formID) {
      $formManager = FormManager::getInstance($formID);
      // Repeater children have no top-level key; flatten the rows in, real values still win.
      $conditionValues = array_merge(self::restructureRepeaterData($fieldValues, $formManager), $fieldValues);
    }

    // Matches a block whose body holds no further opener, i.e. the innermost one.
    $innerMost = '/\$\{bf_(if|if_any|if_all|unless):([^{}$]*)\}((?:(?!\$\{bf_(?:if|if_any|if_all|unless):)[\s\S])*?)\$\{bf_endif\}/';

    // Bounded so a malformed template can never spin here.
    for ($pass = 0; $pass < 200; $pass++) {
      $resolved = preg_replace_callback($innerMost, function ($matches) use ($conditionValues) {
        $branches = preg_split('/\$\{bf_else\}/', $matches[3], 2);
        $truthy = isset($branches[0]) ? $branches[0] : '';
        $falsy = isset($branches[1]) ? $branches[1] : '';

        return self::evaluateBlockCondition($matches[1], $matches[2], $conditionValues) ? $truthy : $falsy;
      }, $content, -1, $replacedCount);

      if (null === $resolved) {
        break;  // preg failure (e.g. backtrack limit): leave the content untouched
      }
      $content = $resolved;
      if (!$replacedCount) {
        break;
      }
    }

    return self::stripConditionalBlockTags($content);
  }

  /**
   * @param string $type       if|if_any|if_all|unless
   * @param string $rawKeys    comma separated conditions
   * @param array  $fieldValues
   *
   * @return bool
   */
  private static function evaluateBlockCondition($type, $rawKeys, $fieldValues)
  {
    $conditions = array_filter(array_map('trim', explode(',', (string) $rawKeys)), function ($condition) {
      return '' !== $condition;
    });
    if (empty($conditions)) {
      return false;
    }

    $results = [];
    foreach ($conditions as $condition) {
      $results[] = self::conditionHolds($condition, $fieldValues);
    }

    if ('if_all' === $type) {
      return !in_array(false, $results, true);
    }
    if ('unless' === $type) {
      return !in_array(true, $results, true);
    }

    return in_array(true, $results, true);
  }

  /**
   * `key`, or `key operator value`.
   *
   * @param string $condition
   * @param array  $fieldValues
   *
   * @return bool
   */
  private static function conditionHolds($condition, $fieldValues)
  {
    $operators = self::blockOperators();
    // Longest name first, or `not_equal` reads as `equal`. Field keys never contain a space.
    $pattern = '/^(\S+)\s+(' . implode('|', $operators) . ')(?:\s+([\s\S]*))?$/';

    if (!preg_match($pattern, trim($condition), $parts)) {
      return !self::isBlank(self::conditionValue(trim($condition), $fieldValues));
    }

    $value = self::conditionValue($parts[1], $fieldValues);
    $operator = $parts[2];
    $expected = isset($parts[3]) ? trim($parts[3]) : '';

    if ('null' === $operator) {
      return self::isBlank($value);
    }
    if ('not_null' === $operator) {
      return !self::isBlank($value);
    }

    // Multi-value fields and repeater children arrive as a list.
    $candidates = is_array($value) || is_object($value) ? self::stripMetaSubfields((array) $value) : [$value];
    $negated = in_array($operator, ['not_equal', 'not_contain'], true);
    foreach ($candidates as $candidate) {
      if (is_array($candidate) || is_object($candidate)) {
        continue;
      }
      // compareValue answers the positive form, so one match settles either case: it satisfies
      // `contain` and rules out `not_contain`.
      if (self::compareValue($operator, (string) $candidate, $expected)) {
        return !$negated;
      }
    }

    return $negated;
  }

  /**
   * @return string[] operator names, longest first
   */
  private static function blockOperators()
  {
    return [
      'greater_or_equal',
      'less_or_equal',
      'not_contain',
      'start_with',
      'not_equal',
      'not_null',
      'end_with',
      'contain',
      'greater',
      'equal',
      'less',
      'null',
    ];
  }

  /**
   * @param string $key         field key, or a `_bf_*` smart tag
   * @param array  $fieldValues
   *
   * @return mixed
   */
  private static function conditionValue($key, $fieldValues)
  {
    if (0 === strpos($key, '_')) {
      return SmartTags::getSmartTagValue($key, false, '');
    }
    $value = isset($fieldValues[$key]) ? $fieldValues[$key] : null;
    if (is_array($value) && isset($value['value'])) {
      $value = $value['value'];
    }

    return $value;
  }

  /**
   * @param string $operator
   * @param string $value    the submitted value
   * @param string $expected the value written in the template
   *
   * @return bool
   */
  private static function compareValue($operator, $value, $expected)
  {
    switch ($operator) {
      case 'equal':
      case 'not_equal':
        return 0 === strcasecmp(trim($value), $expected);
      case 'contain':
      case 'not_contain':
        return '' !== $expected && false !== stripos($value, $expected);
      case 'start_with':
        return '' !== $expected && 0 === stripos($value, $expected);
      case 'end_with':
        return '' !== $expected && 0 === strcasecmp($expected, (string) substr($value, -strlen($expected)));
      case 'greater':
        return self::isNumericPair($value, $expected) && (float) $value > (float) $expected;
      case 'less':
        return self::isNumericPair($value, $expected) && (float) $value < (float) $expected;
      case 'greater_or_equal':
        return self::isNumericPair($value, $expected) && (float) $value >= (float) $expected;
      case 'less_or_equal':
        return self::isNumericPair($value, $expected) && (float) $value <= (float) $expected;
      default:
        return false;
    }
  }

  /**
   * @param string $value
   * @param string $expected
   *
   * @return bool both sides compare as numbers
   */
  private static function isNumericPair($value, $expected)
  {
    return is_numeric(trim($value)) && is_numeric($expected);
  }

  /**
   * Drop leftover block tags so an unbalanced template never leaks them into the output.
   *
   * @param string $content
   *
   * @return string
   */
  private static function stripConditionalBlockTags($content)
  {
    return preg_replace('/\$\{bf_(?:if|if_any|if_all|unless):[^{}$]*\}|\$\{bf_(?:else|endif)\}/', '', $content);
  }

  /**
   * Values a field kept on an entry edit, posted as `<fieldKey>_old` instead of resubmitted.
   *
   * @param mixed  $postData submitted data, keyed by field key
   * @param string $fieldKey
   *
   * @return array retained values, empty when the field kept nothing
   */
  public static function retainedOldValues($postData, $fieldKey)
  {
    if (!is_array($postData) || !isset($postData[$fieldKey . '_old'])) {
      return [];
    }
    return self::flattenOldValues($postData[$fieldKey . '_old']);
  }

  private static function flattenOldValues($value)
  {
    if (is_object($value)) {
      $value = (array) $value;
    }
    if (!is_array($value)) {
      if (!is_string($value) && !is_numeric($value)) {
        return [];
      }
      $value = trim((string) $value);
      if ('' === $value) {
        return [];
      }
      // A repeater posts one JSON list per row, so a list can arrive nested.
      $decoded = json_decode($value, true);
      if (!is_array($decoded)) {
        $retained = [];
        foreach (explode(',', $value) as $item) {
          $item = trim($item);
          if ('' !== $item) {
            $retained[] = $item;
          }
        }
        return $retained;
      }
      $value = $decoded;
    }

    $retained = [];
    foreach ($value as $item) {
      $retained = array_merge($retained, self::flattenOldValues($item));
    }
    return $retained;
  }

  public static function formatFieldValueForMail($fields, $fieldValues = [])
  {
    $formattedFldValues = $fieldValues;
    $file_upload_types = Helpers::$file_upload_types;
    $repeated_array_type_data_fields = Helpers::$repeated_array_type_data_fields;
    foreach ($fields as $fldKey => $fldData) {
      if (in_array($fldData->typ, $file_upload_types)) {
        continue;
      }
      if (is_array($fieldValues) && array_key_exists($fldKey, $fieldValues)) {
        $value = $fieldValues[$fldKey];
        // if (is_array($value)) {
        //   $formattedFldValues[$fldKey] = htmlspecialchars(implode(', ', $value));
        // } else {
        //   $formattedFldValues[$fldKey] = htmlspecialchars($value);
        // }

        // TODO: this code are temporary commented, need to change and remove the comment

        // if (is_array($value)) {
        //   $arrValue = '';
        //   foreach ($value as $v) {
        //     if (is_array($v)) {
        //       foreach ($v as $k1 => $v1) {
        //         if (array_key_exists($k1, $repeaterFieldKey)) {
        //           $oldValue = $repeaterFieldKey[$k1];
        //           if (is_array($v1) && in_array($fields->{$k1}->typ, $repeated_array_type_data_fields)) {
        //             $newValues = '[' . implode(', ', $v1) . '] ';
        //             if (!preg_match('/\[.*\]/', $oldValue)) {
        //               $oldValue = '[' . $oldValue . '] ';
        //             }
        //           } else {
        //             $newValues = $v1;
        //           }
        //           $repeaterFieldKey[$k1] = $oldValue . ', ' . $newValues;
        //         } else {
        //           if (!empty($v1) && is_array($v1)) {
        //             $repeaterFieldKey[$k1] = htmlspecialchars(implode(', ', $v1));
        //           } else {
        //             $repeaterFieldKey[$k1] = htmlspecialchars($v1);
        //           }
        //         }
        //       }
        //     } else {
        //       $arrValue .= $v . ', ';
        //     }
        //   }
        //   $formattedFldValues[$fldKey] = htmlspecialchars(rtrim($arrValue, ', '));
        //   $arrValue = '';
        // } else {
        //   $formattedFldValues[$fldKey] = htmlspecialchars($value);
        // }
        if ('textarea' === $fldData->typ) {
          $formattedFldValues[$fldKey] = nl2br(htmlspecialchars($value));
        }
        if ('date' === $fldData->typ && !empty($value)) {
          $formattedFldValues[$fldKey] = date_i18n(get_option('date_format'), strtotime(htmlspecialchars($value)));
        }
      }
    }

    $merge_values = array_merge($fieldValues, $formattedFldValues);
    // $merge_values = array_merge($merge_values, $repeaterFieldKey);

    return $merge_values;
  }

  public static function changeHrefPathInHTMLString($html_body, $path)
  {
    if (empty($html_body) || empty($path)) {
      return $html_body;
    }

    return preg_replace_callback(
      '/<a\s+[^>]*href=[\'"]([^\'"]+)[\'"][^>]*>/i',
      function ($matches) use ($path) {
        $href = $matches[1];

        if (filter_var($href, FILTER_VALIDATE_URL)) {
          return $matches[0];
        }

        if (preg_match('/^(mailto:|tel:|javascript:|#)/i', $href)) {
          return $matches[0];
        }
        if (preg_match('/\$?\{back_to_view\}/', $matches[0])) {
          return $matches[0];
        }

        $fullPath = rtrim($path, '/') . '/' . ltrim($href, '/');

        return str_replace(
          $href,
          htmlspecialchars($fullPath, ENT_QUOTES),
          $matches[0]
        );
      },
      $html_body
    );
  }

  public static function changeImagePathInHTMLString($html_body, $path)
  {
    if (empty($html_body) || empty($path)) {
      return $html_body;
    }

    $allowedMimeTypes = [
      'jpg'  => ['image/jpeg', 'image/pjpeg'],
      'jpeg' => ['image/jpeg', 'image/pjpeg'],
      'png'  => ['image/png'],
      'svg'  => ['image/svg+xml']
    ];

    return preg_replace_callback(
      '/<img\s+[^>]*src=[\'"]([^\'"]*)[\'"][^>]*>/i',
      function ($matches) use ($path, $allowedMimeTypes) {
        $src = $matches[1];

        // Already-embedded inline images (cid:) must be left untouched.
        if (0 === stripos($src, 'cid:')) {
          return $matches[0];
        }

        if (filter_var($src, FILTER_VALIDATE_URL)) {
          return $matches[0];
        }

        if (!trim($src)) {
          return '';
        }

        $fullPath = rtrim($path, '/') . '/' . ltrim($src, '/');

        $extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));

        if (!preg_match('/^(http|https):\/\//', $fullPath)) {
          if (!file_exists($fullPath) || !isset($allowedMimeTypes[$extension])) {
            Log::debug_log([
              'status'  => 'error',
              'code'    => 'file_not_found',
              'message' => "File not found or unsupported file type: $fullPath",
            ]);
            return '';
          } else {
            Log::debug_log([
              'status'  => 'success',
              'code'    => 'file_found',
              'message' => "File Found => location: {$fullPath}"
            ]);
          }
          $mimeType = mime_content_type($fullPath);
          if (!in_array($mimeType, $allowedMimeTypes[$extension], true)) {
            Log::debug_log([
              'status'  => 'error',
              'code'    => 'unsupported_file_type',
              'message' => "Unsupported file type: $mimeType for file: $fullPath",
            ]);
            return '';
          }
        }

        return str_replace($src, htmlspecialchars($fullPath, ENT_QUOTES), $matches[0]);
      },
      $html_body
    );
  }

  public static function sortValueBasedOnLayout($formId, $fieldValues)
  {
    $formManager = FormManager::getInstance($formId);
    $formLayout = $formManager->getFlatenFormLayout();  // returns all layouts (lg, md, sm)
    // A form saved without a layout (or a minimal/legacy form_content) has no ->lg
    $lgLayout = isset($formLayout->lg) ? (array) $formLayout->lg : [];
    $fieldKeyOrderbasedOnLayout = array_filter(array_map(function ($fld) {
      return isset($fld->i) ? $fld->i : null;
    }, $lgLayout), function ($key) {
      return !is_null($key);
    });
    $ordered = [];

    foreach ($fieldKeyOrderbasedOnLayout as $key) {
      if (array_key_exists($key, $fieldValues)) {
        $ordered[$key] = $fieldValues[$key];
      }
    }

    foreach ($fieldValues as $k=>$v) {
      if (!array_key_exists($k, $fieldKeyOrderbasedOnLayout)) {
        $ordered[$k] = $fieldValues[$k];
      }
    }
    return $ordered;
  }

  public static function replaceValueOfBf_all_data($stringToReplaceField, $fieldValues, $formId)
  {
    // $pattern = '/\$\{bf_all_data\}/'; // Corrected escaping
    $pattern = '/\$\{bf_all_data(?:\.onlyValues)?\}/'; // Corrected escaping

    preg_match_all($pattern, $stringToReplaceField, $matches);
    $matchesArray = $matches[0] ?? [];
    if (count($matchesArray) > 0) {
      $formManager = FormManager::getInstance($formId);
      $formFields = $formManager->getFields();
      $orderedFormFields = $formManager->getFieldsBasedOnLayout();  // ordered form fields based on layout(lg) order
      foreach ($matchesArray as $match) {
        // Each tag binds from the untouched submitted values: reusing a filtered result would
        // let the first tag in a template starve the second.
        switch ($match) {
          case '${bf_all_data}':
            $boundValues = self::bindFormData($orderedFormFields, $fieldValues, $formId);
            $table = self::generateTable($boundValues, $orderedFormFields, $formId);
            $stringToReplaceField = str_replace('${bf_all_data}', $table, $stringToReplaceField);
            break;

          case '${bf_all_data.onlyValues}':
            $boundValues = self::bindFormData($orderedFormFields, $fieldValues, $formId, true);
            $table = self::generateTable($boundValues, $orderedFormFields, $formId);
            $stringToReplaceField = str_replace('${bf_all_data.onlyValues}', $table, $stringToReplaceField);
            break;
          default:
            Log::debug_log([
              'status'  => 'error',
              'code'    => 'unknown_placeholder',
              'message' => "Unknown placeholder: $match",
            ]);
            break;
        }
      }
    }
    return $stringToReplaceField;
  }

  /**
   * Ensures an <img> tag with a style attribute exists in the input.
   *
   * Behavior:
   * - If the input is just an image filename (e.g., "1.png"), returns a complete <img> tag with the default style.
   * - If the input is HTML with <img> tags:
   *   - If any <img> has a style, returns the HTML as-is.
   *   - If <img> exists without style, adds the default style to the first one found.
   *   - If no <img> tag or image file is found, returns the input unchanged.
   *
   * @param string $input        Image filename or HTML string.
   * @param string $defaultStyle Optional. The CSS style to apply if missing. Default: 'max-width: 100%; height: auto;'.
   *
   * @return string Modified HTML string with styled <img> tag if needed.
   */
  private static function ensureImgWithStyle($input, $defaultStyle = 'max-width: 100%; height: auto;')
  {
    $imgTagWithStylePattern = '/<img\b[^>]*\bstyle\s*=\s*["\'][^"\']*["\'][^>]*>/i';
    $imgTagPattern = '/<img\b[^>]*>/i';
    $filePattern = '/\.(jpg|jpeg|png|gif|webp)$/i';

    if (preg_match($filePattern, trim($input)) && !preg_match('/<img\b/i', $input)) {
      return '<img src="' . htmlspecialchars(trim($input)) . '" style="' . $defaultStyle . '" />';
    }

    if (preg_match($imgTagWithStylePattern, $input)) {
      // <img> already has style, return as is
      return $input;
    } elseif (preg_match($imgTagPattern, $input, $match)) {
      // <img> without style, add style
      $updatedImg = preg_replace('/<img\b(.*?)(\/?)>/i', '<img$1 style="' . $defaultStyle . '" $2>', $match[0]);
      return str_replace($match[0], $updatedImg, $input);
    } else {
      // No <img> tag found, return input
      return $input;
    }
  }

  private static function orderRepeaterData($repeaterFldKey, $repeaterData, $formId)
  {
    if (!$formId) {
      return $repeaterData;
    }

    $formManager = FormManager::getInstance($formId);
    $nestedLayout = $formManager->getFormNestedLayout();
    $repeaterLayout = $nestedLayout->{$repeaterFldKey}->lg;
    $orderedFldKey = array_map(function ($fld) {
      return $fld->i;
    }, $repeaterLayout);

    $orderedRepeaterData = [];
    foreach ($repeaterData as $rptr) {
      $orderedFlds = [];
      foreach ($orderedFldKey as $k) {
        if (array_key_exists($k, $rptr)) {
          $orderedFlds[$k] = $rptr[$k];
        }
      }

      foreach ($rptr as $ky => $v) {
        if (!array_key_exists($ky, $orderedFldKey)) {
          $orderedFlds[$ky] = $v;
        }
      }

      $orderedRepeaterData[] = $orderedFlds;
    }
    return $orderedRepeaterData;
  }

  private static function bindFormData($formFields, $formData, $formId, $isOnlyValues = false)
  {
    $entryID = isset($formData['entry_id']) ? $formData['entry_id'] : null;
    return array_reduce(array_keys($formFields), function ($filteredData, $key) use ($formFields, $formData, $isOnlyValues, $formId) {
      $field = $formFields[$key];

      $fieldNewData = $filteredData;

      $ignoreFields = ['button', 'recaptcha', 'html', 'divider', 'spacer', 'section', 'turnstile', 'hcaptcha', 'image'];

      $arrayValueFldType = ['check', 'select', 'image-select'];

      if (in_array($field['type'], $ignoreFields)) {
        return $fieldNewData;
      }

      // Skip processing for hidden or empty fields only when $isOnlyValues is true
      if ($isOnlyValues) {
        // Blank means empty string, null, or an array with nothing in it (unchecked
        // checkbox group, file field with no upload). 0 is a real value.
        if (!isset($formData[$key]) || self::isBlank($formData[$key])) {
          return $fieldNewData;
        }

        if (isset($field['valid']['hide']) && $field['valid']['hide']) {
          return $fieldNewData;
        }
      }

      if (isset($formData[$key]) && !array_key_exists('parentFieldKey', $field)) {
        if ('repeater' === $field['type']) {
          $repeater_data = is_string($formData[$key]) ? json_decode($formData[$key], true) : $formData[$key];
          // ordering repeater field according to nested repeater layout
          $repeater_data = self::orderRepeaterData($key, $repeater_data, $formId);
          if ($isOnlyValues) {
            $repeater_data = array_filter($repeater_data, function ($sub) {
              return array_filter($sub, fn ($value) => '' !== $value);
            });
          }
          $fieldNewData[$key] = $repeater_data;
        } elseif ('signature' === $field['type']) {
          if ('signature-failed.png' !== $formData[$key]) {
            $file_path = strpos($formData[$key], '/') ? $formData[$key] : $formData[$key];
            $newPath = $file_path;
            $fieldNewData[$key] = self::ensureImgWithStyle($newPath, 'max-width: 100%; height: auto;');
          }
        } elseif (in_array($field['type'], $arrayValueFldType)) {
          $v = is_string($formData[$key]) ? json_decode($formData[$key], true) : $formData[$key];
          $fieldNewData[$key] = $v && is_array($v) ? implode(', ', $v) : $formData[$key];
        } else {
          $fieldNewData[$key] = $formData[$key];
        }
      }

      return $fieldNewData;
    }, []);
  }

  private static function generateTable($fieldValues, $formFields, $formId = null)
  {
    if (empty($fieldValues)) {
      Log::debug_log([
        'status'     => 'error',
        'code'       => 'no_fields_found',
        'type'       => 'bf_all_data',
        'message'    => 'No fields found for bf_all_data',
        'fields'     => $fieldValues,
        'formFields' => $formFields,
      ]);
      return '<p>No data available.</p>';
    }

    $table = "<table style='font-family: arial, sans-serif; border-collapse: collapse; width: 100%;'>";

    foreach ($fieldValues as $fk => $value) {
      $value = self::decodeIfJson($value);
      $fieldName = self::getLabel($formFields, $fk) ?? $fk;
      $fieldType = $formFields[$fk]['type'];
      $table .= "<tr>
              <td style='border: 1px solid #dddddd; text-align: left; padding: 8px; font-weight: bold;'>{$fieldName}</td>
              <td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>";

      if (is_array($value)) {
        if ('repeater' === $fieldType) {
          $table .= "<table style='width: 100%; border-collapse: collapse;'>";

          $subKeys = self::repeaterColumnKeys($value, $fk, $formId);

          $table .= '<tr>';
          foreach ($subKeys as $subKey) {
            $subLabel = self::getLabel($formFields, $subKey) ?? $subKey;
            $table .= "<th style='border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;'>" . $subLabel . '</th>';
          }
          $table .= '</tr>';

          foreach ($value as $row) {
            if (!is_array($row)) {
              continue;
            }
            $table .= '<tr>';
            // Walk the shared column list so a row missing a conditionally hidden
            // sub-field still lines up with the header.
            foreach ($subKeys as $subKey) {
              $subValue = array_key_exists($subKey, $row) ? $row[$subKey] : '';
              $subFieldType = self::getFldType($subKey, $formFields);
              if (is_array($subValue)) {
                if (self::isCompositeFieldType($subFieldType)) {
                  $subValue = self::joinCompositeFieldValue($subValue, $subFieldType);
                } else {
                  $subValue = self::unorderedAnchorListMarkup($subValue);
                }

                // $subValue = implode(', ', array_map(function ($v) {
                //   if (self::isFileTypeValue($v)) {
                //     return self::anchorMarkup($v);
                //     // if (self::isImageTypeValue($v)) {
                //     //   return "<img src='{$v}' alt='{$v}' width='250'/>";
                //     // } else {
                //     //   return "<a href='{$v}' rel='noopener noreferrer' target='_blank' style='color:blue'>{$v}</a>";
                //     // }
                //   } else {
                //     return $v;
                //   }
                // }, $subValue));
              } else {
                if (self::isFileTypeValue($subValue)) {
                  if ('signature' === $subFieldType) {
                    if ('signature-failed.png' === $subValue) {
                      $subValue = '';
                    } else {
                      $subValue = "<img src='{$subValue}' alt='{$subValue}' width='250'/>";
                    }
                  }
                } else {
                  $subValue = $subValue;
                }
              }

              $table .= "<td style='border: 1px solid #dddddd; padding: 8px;'>" . $subValue . '</td>';
            }
            $table .= '</tr>';
          }
          $table .= '</table>';
        } elseif ('file-up' === $fieldType || 'advanced-file-up' === $fieldType) {
          if (is_array($value)) {
            $table .= self::unorderedAnchorListMarkup($value);
          }
        } elseif (self::isCompositeFieldType($fieldType)) {
          $table .= self::joinCompositeFieldValue($value, $fieldType);
        } elseif ('signature' === $fieldType) {
          // A signature arrives here wrapped in a one-item list; the failed-capture
          // placeholder renders nothing.
          $signature = reset($value);
          if (false !== $signature && 'signature-failed.png' !== $signature) {
            $table .= self::imgMarkup($signature);
          }
        }
      } else {
        $table .= $value;
      }

      $table .= '</td></tr>';
    }

    $table .= '</table>';

    return $table;
  }

  private static function unorderedAnchorListMarkup($list)
  {
    $ul = "<ul style='list-style-type: none; padding: 0; margin:0'>";
    foreach ($list as $v) {
      $ul .= '<li >' . self::anchorMarkup($v) . '</li>';
    }
    $ul .= '</ul>';
    return $ul;
  }

  private static function imgMarkup($filename)
  {
    if (!is_scalar($filename)) {
      return '';
    }
    $filename = (string) $filename;

    return "<img src='" . self::escFileHref($filename) . "' alt='" . esc_attr($filename) . "' width='250'/>";
  }

  private static function anchorMarkup($filename)
  {
    if (!is_scalar($filename)) {
      return '';
    }
    $filename = (string) $filename;

    return "<a  href='" . self::escFileHref($filename) . "' rel='noopener noreferrer' target='_blank' style='color:blue'>" . esc_html($filename) . '</a>';
  }

  /** Escape a file reference for an href/src. Not esc_url(): it rewrites a bare file name to `http://<name>`. */
  private static function escFileHref($value)
  {
    return esc_attr(wp_kses_bad_protocol($value, wp_allowed_protocols()));
  }

  public static function replaceRepeaterFieldValue($stringToReplaceField, $fieldValues, $formID)
  {
    if (!is_string($stringToReplaceField) || empty($stringToReplaceField)) {
      return $stringToReplaceField; // Return as-is if nothing to replace
    }

    $formManager = FormManager::getInstance($formID);
    $formFields = $formManager->getFieldsBasedOnLayout();  // ordered form fields based on layout(lg) order

    // Find all placeholders like ${field_key} example: ${b27-5}
    preg_match_all('/\$\{(b\d+-\d+)\}/', $stringToReplaceField, $matches);

    if (empty($matches[1])) {
      return $stringToReplaceField;
    }
    // Clean field data
    // $dataCleaning = self::removeEmptyValues($fieldValues);
    $flatFieldData = self::restructureRepeaterData($fieldValues, $formManager);
    // generate table for repeater fields
    foreach ($matches[1] as $fk) {
      $repeaterFieldKey = $fk;
      $fieldType = isset($formFields[$repeaterFieldKey]['type']) && !empty($formFields[$repeaterFieldKey]['type']) ? $formFields[$repeaterFieldKey]['type'] : null;
      if ('repeater' === $fieldType) {
        $repeaterMarkup = self::repeaterFieldTable($fieldValues[$repeaterFieldKey] ?? [], $formFields, $repeaterFieldKey, $formID);
        $stringToReplaceField = str_replace('${' . $fk . '}', $repeaterMarkup, $stringToReplaceField);
      } else {
        if ('signature' === $fieldType) {
          $stringToReplaceField = self::replaceImgTagForRepeatedSignature($stringToReplaceField, $flatFieldData[$repeaterFieldKey], $repeaterFieldKey);
        }
        $repeaterFieldData = self::safeFlatString(
          $flatFieldData[$repeaterFieldKey] ?? '',
          $fieldType,
          $repeaterFieldKey,
          $flatFieldData,
          $formFields
        );

        $stringToReplaceField = str_replace('${' . $fk . '}', $repeaterFieldData, $stringToReplaceField);
      }
    }
    return $stringToReplaceField;
  }

  private static function replaceImgTagForRepeatedSignature($stringToReplaceField, $repeaterValue, $fldKey)
  {
    $data = self::decodeIfJson($repeaterValue);
    if (!is_string($stringToReplaceField) || empty($stringToReplaceField) || empty($fldKey)) {
      return $stringToReplaceField;
    }

    $pattern = '/<img\s+[^>]*src=[\'"]([^\'"]*' . preg_quote($fldKey, '/') . '[^\'"]*)[\'"][^>]*>/i';

    if (!preg_match($pattern, $stringToReplaceField)) {
      return $stringToReplaceField;
    }

    $values = [];
    $appendValue = function ($value) use (&$values) {
      if (is_array($value)) {
        foreach ($value as $item) {
          if (is_string($item) && '' !== trim($item) && 'signature-failed.png' !== $item) {
            $values[] = $item;
          }
        }
        return;
      }

      if (is_string($value) && '' !== trim($value) && 'signature-failed.png' !== $value) {
        $values[] = $value;
      }
    };

    $appendValue($data);

    if (empty($values)) {
      return preg_replace($pattern, '', $stringToReplaceField);
    }

    return preg_replace_callback($pattern, function ($matches) use ($values) {
      $imgTags = array_map(function ($value) use ($matches) {
        $src = htmlspecialchars($value, ENT_QUOTES);
        $alt = htmlspecialchars($value, ENT_QUOTES);

        $tag = $matches[0];
        $tag = preg_replace('/\bsrc\s*=\s*([\'"])(.*?)\1/i', 'src="' . $src . '"', $tag);

        if (preg_match('/\balt\s*=\s*([\'"])(.*?)\1/i', $tag)) {
          $tag = preg_replace('/\balt\s*=\s*([\'"])(.*?)\1/i', 'alt="' . $alt . '"', $tag);
        } else {
          $tag = preg_replace('/<img\b/i', '<img alt="' . $alt . '"', $tag, 1);
        }

        return $tag;
      }, $values);

      return implode('', $imgTags);
    }, $stringToReplaceField);
  }

  /**
   * Restructures repeater field data to maintain original structure while
   * aggregating nested repeater values into top-level indexed arrays.
   *
   * @param array $data Original field data structure
   * @return array Restructured data with aggregated arrays
   */
  public static function restructureRepeaterData(array $data, $formManagerInstance): array
  {
    $result = $data;
    // topkey === field Key  topValue === field value
    foreach ($data as $topKey => $topValue) {
      if ($formManagerInstance->isRepeaterField($topKey)) {
        $topValue = self::decodeIfJson($topValue);
        //assigning the converted value to repeater field
        $result[$topKey] = $topValue;
        // topvalue here is repeater field value;
        // entryIndex repeater field key , entry == repeater field value
        foreach ($topValue as $entryIndex => $entry) {
          if (!is_array($entry)) {
            continue;
          }
          foreach ($entry as $subKey => $subValue) {
            if (!isset($result[$subKey]) || !is_array($result[$subKey])) {
              $result[$subKey] = [];
            }
            // Handle nested arrays within entries
            $result[$subKey][$entryIndex] = $subValue;
          }
        }
      }
    }
    return $result;
  }

  /**
   * Return decoded data if incoming data is stringified and if it's a plain string (e.g "John Doe") it returns the plain string
   *
   * @param mixed $data
   * @return mixed
   */
  private static function decodeIfJson($data)
  {
    if (!is_string($data)) {
      return $data;
    }

    $decoded = json_decode($data, true);

    return (JSON_ERROR_NONE === json_last_error()) ? $decoded : $data;
  }

  /**
   * Safely converts any type of form value(Specially Repeater Field Value) to string.
   *
   * @param mixed $data
   * @param string $fldType
   * @param string|null $fieldKey
   * @param array|null $allFieldData
   * @param array|null $formFields
   * @return string
   */
  public static function safeFlatString($data, $fldType, $fieldKey = null, $allFieldData = null, $formFields = null): string
  {
    $newData = self::decodeIfJson($data);

    if (is_array($newData)) {
      if (self::isCompositeFieldType($fldType)) {
        return self::joinCompositeFieldValue($newData, $fldType);
      }
      return implode(', ', array_map(function ($item) use ($fldType, $fieldKey, $allFieldData, $formFields) {
        return is_array($item)
        ? '[' . implode(', ', array_map(function ($itm) use ($fldType) {
          if (in_array($fldType, ['advanced-file-up', 'file-up']) || self::isFileTypeValue($itm)) {
            return self::anchorMarkup($itm);
            // if (self::isImageTypeValue($itm)) {
            //   return "<img src='{$itm}' alt='{$itm}' width='250'/>";
            // } else {
            //   return "<a href='{$itm}' rel='noopener noreferrer' target='_blank' style='color:blue'>{$itm}</a>";
            // }
          } else {
            return $itm;
          }
        }, $item)) . ']'
        : self::safeFlatString($item, $fldType, $fieldKey, $allFieldData, $formFields);
      }, $newData));
    }

    if (is_object($data)) {
      return method_exists($data, '__toString') ? (string) $data : (json_encode($data) ?: '');
    }

    if (is_null($data)) {
      return '';
    }

    if (self::isFileTypeValue($data)) {
      if ('signature-failed.png' === $data) {
        return '';
      }
    }

    if (in_array($fldType, ['file-up', 'advanced-file-up'])) {
      return self::anchorMarkup($newData);
    }
    if ('signature' === $fldType) {
      return self::imgMarkup($newData);
    }

    return (string) $data;
  }

  private static function removeEmptyValues($fieldData)
  {
    if (!is_array($fieldData)) {
      return $fieldData;
    }
    // Remove empty values from the array
    return array_filter($fieldData, function ($value) {
      // Check if the value is 0
      if (0 === $value) {
        return '0';
      }
      return !empty($value);
    });
  }

  /**
   * Gets the field type by field key
   *
   * @param string $fldKey
   * @param mixed $formField
   * @return string
   */
  private static function getFldType($fldKey, $formFields)
  {
    if (array_key_exists($fldKey, $formFields)) {
      return $formFields[$fldKey]['type'];
    }
  }

  private static function isCompositeFieldType($fieldType)
  {
    return in_array($fieldType, ['name', 'address'], true);
  }

  /**
   * Removes internal/meta subfields (keys prefixed with "_", e.g. the address
   * field's _latitude / _longitude) so they never leak into human-readable
   * output (entry views, emails, SmartTags, PDF, exports).
   *
   * @param mixed $value
   * @return mixed
   */
  private static function stripMetaSubfields($value)
  {
    if (!is_array($value)) {
      return $value;
    }
    foreach (array_keys($value) as $key) {
      if (is_string($key) && '' !== $key && '_' === $key[0]) {
        unset($value[$key]);
      }
    }
    return $value;
  }

  private static function joinCompositeFieldValue($value, $fieldType)
  {
    if (!is_array($value)) {
      return (string) $value;
    }

    $value = self::stripMetaSubfields($value);

    $parts = [];
    array_walk_recursive($value, function ($item) use (&$parts) {
      if (is_null($item)) {
        return;
      }

      $item = (string) $item;
      if ('' === trim($item) && '0' !== $item) {
        return;
      }

      $parts[] = $item;
    });

    return implode('address' === $fieldType ? ', ' : ' ', $parts);
  }

  /**
  * Return true is it's file type value by checking with extension
  *
  * @param string $filename
  * @return boolean
  */
  private static function isFileTypeValue($fileName)
  {
    if (!is_string($fileName)) {
      return false;
    }
    $ext = pathinfo($fileName, PATHINFO_EXTENSION);

    if ('other' !== FileHandler::getFileTypeByExtension($ext)) {
      return true;
    }
  }

  /**
  * Return true is it's image type value by checking with extension
  *
  * @param string $filename
  * @return boolean
  */
  private static function isImageTypeValue($fileName)
  {
    if (!is_string($fileName)) {
      return false;
    }
    $ext = pathinfo($fileName, PATHINFO_EXTENSION);

    if ('image' === FileHandler::getFileTypeByExtension($ext)) {
      return true;
    }
  }

  /**
   * Collect the column keys of a repeater table as the union of every row's keys,
   * not just the first row's. Conditional logic can hide a sub-field in one row and
   * show it in the next; keying off row 0 alone drops that column's header and
   * shifts every later row's cells. Ordering follows the repeater's own nested
   * layout when the form id is known, with any leftover keys appended.
   *
   * @param array $rows
   * @param string $repeaterFieldKey
   * @param int|string|null $formId
   * @return array
   */
  private static function repeaterColumnKeys($rows, $repeaterFieldKey, $formId = null)
  {
    $present = [];
    foreach ($rows as $row) {
      if (!is_array($row)) {
        continue;
      }
      foreach (array_keys($row) as $subKey) {
        $present[$subKey] = true;
      }
    }

    if (empty($present)) {
      return [];
    }

    $ordered = [];
    if ($formId) {
      $nestedLayout = FormManager::getInstance($formId)->getFormNestedLayout();
      $repeaterLayout = isset($nestedLayout->{$repeaterFieldKey}->lg) ? $nestedLayout->{$repeaterFieldKey}->lg : [];
      foreach ((array) $repeaterLayout as $fld) {
        $subKey = isset($fld->i) ? $fld->i : null;
        if ($subKey && isset($present[$subKey])) {
          $ordered[] = $subKey;
          unset($present[$subKey]);
        }
      }
    }

    return array_merge($ordered, array_keys($present));
  }

  private static function repeaterFieldTable($repeaterFieldData, $formFields, $repeaterFieldKey, $formId = null)
  {
    $repeaterFieldData = self::decodeIfJson($repeaterFieldData);

    if (!is_array($repeaterFieldData) || !isset($repeaterFieldData[0]) || !is_array($repeaterFieldData[0])) {
      return ''; // Safely return empty if not a valid repeater structure
    }
    $table = "<table style='font-family: arial, sans-serif; border-collapse: collapse; width: 100%;'>";
    // $table .= '<tr>';
    // $table .= '<th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">' . self::getLabel($formFields, $repeaterFieldKey) . '</th>';
    // $table .= '</tr>';
    // $table .= '<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">';
    // $table .= '<table style="width: 100%; border-collapse: collapse;">';

    $headers = self::repeaterColumnKeys($repeaterFieldData, $repeaterFieldKey, $formId);
    $table .= '<tr>';  // open tr (for column header)
    foreach ($headers as $fk) {
      $table .= '<th style="border: 1px solid #dddddd; padding: 8px; ">' . self::getLabel($formFields, $fk) . '</th>';
    }
    $table .= '</tr>';  // close tr (for column header)

    foreach ($repeaterFieldData as $row) {
      if (!is_array($row)) {
        continue;
      }
      $table .= '<tr>';  // open tr (for table data row)
      // Walk the column list, not the row's own keys, so a sub-field hidden by
      // conditional logic in this row renders an empty cell instead of shifting
      // every following cell one column to the left.
      foreach ($headers as $k) {
        $value = array_key_exists($k, $row) ? $row[$k] : '';
        $fldTyp = self::getFldType($k, $formFields);
        if (is_array($value)) {
          if (in_array($fldTyp, ['advanced-file-up', 'file-up'])) {
            $newValue = self::unorderedAnchorListMarkup($value);
          } elseif (self::isCompositeFieldType($fldTyp)) {
            $newValue = self::joinCompositeFieldValue($value, $fldTyp);
          } else {
            $newValue = implode(', ', $value);
          }
        } else {
          if (self::isFileTypeValue($value)) {
            $newValue = 'signature-failed.png' === $value
              ? ''
              : (self::isImageTypeValue($value)
              ? "<img src='{$value}' alt='{$value}' width='250'/>"
              : "<a href='{$value}' rel='noopener noreferrer' target='_blank' style='color:blue'>{$value}</a>");
          } else {
            $newValue = $value;
          }
        }

        $table .= '<td style="border: 1px solid #dddddd; padding: 8px;">' . $newValue . '</td>';
      }
      $table .= '</tr>';  // close tr (for table data row)
    }
    // $table .= '</table>';

    // $table .= '</td>';
    $table .= '</table>';

    return $table;
  }

  private static function getLabel($formFields, $key)
  {
    return $formFields[$key]['label'] ?? $key;
  }

  /**
   * Derive a composite child field's key name from its bracketed HTML name.
   * e.g. childFieldName "name[first_name]" with parent "name" => "first_name".
   * Falls back to the bracket contents when the parent name is empty.
   */
  public static function deriveChildName($childFieldName, $parentFieldName)
  {
    $childFieldName = (string) $childFieldName;
    if (preg_match('/\[(.*?)\]/', $childFieldName, $matches)) {
      return $matches[1];
    }

    return str_replace(['[', ']', (string) $parentFieldName], '', $childFieldName);
  }

  /**
   * Pull a child value out of a parent composite field's nested submitted value.
   * Looks up by the derived child name first, then by the child field key.
   * Returns null when no match is found.
   */
  public static function extractChildValueFromParentValue($parentValue, $childName, $childKey)
  {
    if (is_object($parentValue)) {
      $parentValue = (array) $parentValue;
    }

    if (!is_array($parentValue)) {
      return null;
    }

    if (array_key_exists($childName, $parentValue)) {
      return $parentValue[$childName];
    }

    if (array_key_exists($childKey, $parentValue)) {
      return $parentValue[$childKey];
    }

    return null;
  }
}
