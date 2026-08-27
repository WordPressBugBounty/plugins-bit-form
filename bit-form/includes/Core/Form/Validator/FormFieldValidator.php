<?php

namespace BitCode\BitForm\Core\Form\Validator;

use BitCode\BitForm\Core\Database\FormEntryMetaModel;
use BitCode\BitForm\Core\Form\FormManager;
use BitCode\BitForm\Core\Util\FieldValueHandler;
use BitCode\BitForm\Core\WorkFlow\WorkFlow;

final class FormFieldValidator
{
  private $_form_fields = null;
  private $_submitted_fields = null;
  private $_submitted_files = null;
  private $_messages = [];
  private $_entryID = null;
  private $_storedValues = [];

  /**
   * @param int|string|null $entryID the entry being edited, null on a new submission
   */
  public function __construct($form_fields, $submitted_fields, $submitted_files, $entryID = null)
  {
    $this->_form_fields = $form_fields;
    $this->_submitted_fields = $submitted_fields;
    $this->_submitted_files = $submitted_files;
    $this->_entryID = empty($entryID) ? null : $entryID;
    $this->removeUnnecessaryField();
  }

  private function removeUnnecessaryField()
  {
    // CSRF verified upstream via FrontendFormManager::verifySubmissionNonce() before this validator is instantiated.
    if (!isset($_POST)) {
      return;
    }
    // bf_lang is a transport key, not a field; anything left here becomes entry meta.
    unset($_POST['bitforms_token'], $_POST['bitforms_id'], $_POST['bf_lang']);
  }

  public function validate($workFlowRun, $formID)
  {
    if (empty($this->_form_fields)) {
      return;
    }
    $hidden_fields = isset($this->_submitted_fields['hidden_fields']) ? $this->_submitted_fields['hidden_fields'] : '';
    unset($this->_submitted_fields['hidden_fields'], $this->_submitted_fields['workflow']);
    foreach ($this->_form_fields as $field_name => $field_data) {
      // Composite child fields (name/address) submit nested under the parent key
      // (e.g. $_POST['<parent>']['first_name']). Resolve the child's own value so the
      // required/type checks below see it, and skip deactivated children entirely.
      if (isset($field_data['parentFieldKey'])) {
        if (!empty($field_data['isDeactive'])) {
          continue;
        }
        $parentData = $this->_form_fields[$field_data['parentFieldKey']] ?? null;
        if (!empty($parentData['repeated'])) {
          // Parent lives inside a repeater: its value is row-transposed below and
          // every row (incl. the confirm match) is validated via validateRepeatedField,
          // so extracting the child here would misread the child-part-first POST shape.
          continue;
        }
        $parentValue = $this->_submitted_fields[$field_data['parentFieldKey']] ?? null;
        if (is_array($parentValue)) {
          $childName = FieldValueHandler::deriveChildName($field_data['name'] ?? '', isset($parentData['name']) ? $parentData['name'] : '');
          $childValue = FieldValueHandler::extractChildValueFromParentValue($parentValue, $childName, $field_name);
          if (null !== $childValue) {
            $this->_submitted_fields[$field_name] = $childValue;
          }
        }
      }
      $submittedFieldData = isset($this->_submitted_fields[$field_name]) ? $this->_submitted_fields[$field_name] : null;

      if (('file-up' === $field_data['type'] || 'advanced-file-up' === $field_data['type']) && isset($this->_submitted_files[$field_name]['name'])) {
        $submittedFieldData = $this->_submitted_files[$field_name]['name'];
      }
      // Composite fields (email/password with confirm, name, address) under a repeater
      // post child-part-first (e.g. $_POST['<field>']['primary'][<row>]). Transpose to
      // row-first so the loop below iterates real row indexes, not child-part names.
      if (
        isset($field_data['repeated']) && $field_data['repeated']
        && is_array($submittedFieldData)
        && in_array($field_data['type'], ['email', 'password', 'name', 'address'], true)
      ) {
        $submittedFieldData = $this->transposeCompositeRows($submittedFieldData);
        $this->_submitted_fields[$field_name] = $submittedFieldData;
      }
      if (isset($field_data['repeated']) && $field_data['repeated'] && is_array($submittedFieldData)) {
        foreach (array_keys($submittedFieldData) as $rowIndex) {
          $this->validateRepeatedField($field_name, $field_data, $hidden_fields, $rowIndex, $formID);
        }
        continue;
      }
      if (isset($this->_submitted_fields[$field_name])) {
        $values = $this->_submitted_fields[$field_name];
        $this->_form_fields[$field_name]['value'] = FieldValueHandler::isEmpty($values) ? null : $values;
      }

      if (
        (isset($field_data['valid']['req'])
            && $field_data['valid']['req']
            && 'file-up' !== $field_data['type']
            && 'advanced-file-up' !== $field_data['type']
            && empty($this->_submitted_fields[$field_name])
            && !$this->keptStoredValue($field_name, $field_data))
            && !is_numeric($this->_submitted_fields[$field_name])
      ) {
        if (false !== strpos($hidden_fields, $field_name)) {
          continue;
        }
        $this->_messages[$field_name] =
            !empty($field_data['valid']['req']['reqMsg'])
            ? $field_data['valid']['req']['reqMsg']
            : $field_data['label'] . __(' is required.', 'bit-form');
        continue;
      } elseif (
        isset($field_data['valid']['req'])
        && $field_data['valid']['req']
        && (
          'file-up' === $field_data['type']
          || 'advanced-file-up' === $field_data['type']
        )
      ) {
        if (false !== strpos($hidden_fields, $field_name)) {
          continue;
        }
        if ('advanced-file-up' === $field_data['type'] && !empty($this->_submitted_fields[$field_name])) {
          continue;
        }
        if ($this->keptStoredValue($field_name, $field_data)) {
          continue;
        }
        if (empty($this->_submitted_files[$field_name]['name'])) {
          $this->_messages[$field_name]
              = !empty($field_data['valid']['req']['reqMsg']) ?
              $field_data['valid']['req']['reqMsg'] :
              $field_data['label'] . __(' is required.', 'bit-form');
          continue;
        }
      } elseif (isset($this->_submitted_fields[$field_name]) && !empty($this->_submitted_fields[$field_name])) {
        switch ($field_data['type']) {
          case 'email': {
            if (!$this->validateEmail($this->_submitted_fields[$field_name])) {
              $this->_messages[$field_name]
                  = !empty($field_data['valid']['typMsg']) ?
                  $field_data['valid']['typMsg'] :
                  $field_data['label'] . __(' should be an email. please provide a valid email address.', 'bit-form');
            }
            $this->validateConfirmField($field_name, $field_data);
            break;
          }
          case 'password': {
            $this->validateConfirmField($field_name, $field_data);
            break;
          }
          case 'address': {
            break;
          }
          case 'time': {
            if (!$this->validateTime($this->_submitted_fields[$field_name])) {
              $this->_messages[$field_name]
                  = !empty($field_data['valid']['typMsg']) ?
                  $field_data['valid']['typMsg'] :
                  $field_data['label'] . __(' should be Time Format', 'bit-form');
            }
            break;
          }
          case 'phone': {
            if (!$this->validatePhone($this->_submitted_fields[$field_name])) {
              $this->_messages[$field_name]
                  = !empty($field_data['valid']['typMsg']) ?
                  $field_data['valid']['typMsg'] :
                  $field_data['label'] . __(' should be a phone number', 'bit-form');
            }
            break;
          }
          case 'number': {
            if (!$this->validateNumber($this->_submitted_fields[$field_name])) {
              $this->_messages[$field_name]
                  = !empty($field_data['valid']['typMsg']) ?
                  $field_data['valid']['typMsg'] :
                  $field_data['label'] . __(' should be a number', 'bit-form');
            }
            break;
          }
          case 'url': {
            if (!$this->validateURL($this->_submitted_fields[$field_name])) {
              $this->_messages[$field_name]
                  = !empty($field_data['valid']['typMsg']) ?
                  $field_data['valid']['typMsg'] :
                  $field_data['label'] . __(' should be an URL', 'bit-form');
            }
            break;
          }
          case 'date': {
            if (!$this->validateDate($this->_submitted_fields[$field_name])) {
              $this->_messages[$field_name]
                  = !empty($field_data['valid']['typMsg']) ?
                  $field_data['valid']['typMsg'] :
                  $field_data['label'] . __(' should be a date', 'bit-form');
            }
            break;
          }
          case 'select':
          case 'html-select':
          case 'check':
          case 'radio': {
            if (!$this->validateOptionField($this->_submitted_fields[$field_name], $field_name, $formID)) {
              $this->_messages[$field_name]
                  = !empty($field_data['valid']['typMsg']) ?
                  $field_data['valid']['typMsg'] :
                  $field_data['label'] . __(' contains invalid option.', 'bit-form');
            }
            break;
          }
          default:
            break;
        }
      }
    }
    $workFlowRunHelper = new WorkFlow($formID);
    $workFlowreturnedOnValidate = $workFlowRunHelper->executeOnValidate(
      $workFlowRun,
      $this->_form_fields,
      $this->_submitted_fields
    );
    if (!empty($workFlowreturnedOnValidate)) {
      $this->_messages['$form'] = $workFlowreturnedOnValidate;
    }

    if (count($this->_messages) > 0) {
      return false;
    } else {
      return true;
    }
  }

  /** Whether an edit kept this field's stored file/signature — `_old` is believed only where it matches the entry. */
  private function keptStoredValue($field_name, $field_data, $rowIndex = null)
  {
    if (null === $this->_entryID) {
      return false;
    }
    $type = isset($field_data['type']) ? $field_data['type'] : '';
    if (!in_array($type, ['file-up', 'advanced-file-up', 'signature'], true)) {
      return false;
    }
    $oldKey = $field_name . '_old';
    if (!isset($this->_submitted_fields[$oldKey])) {
      return false;
    }
    $submitted = $this->_submitted_fields;
    if (null !== $rowIndex) {
      if (!is_array($submitted[$oldKey]) || !isset($submitted[$oldKey][$rowIndex])) {
        return false;
      }
      $submitted = [$oldKey => $submitted[$oldKey][$rowIndex]];
    }
    $retained = FieldValueHandler::retainedOldValues($submitted, $field_name);
    if (empty($retained)) {
      return false;
    }

    return !empty(array_intersect($retained, $this->getStoredValues($field_name)));
  }

  /**
   * The values this entry holds for a field, flattened to a list of file names.
   */
  private function getStoredValues($field_name)
  {
    if (array_key_exists($field_name, $this->_storedValues)) {
      return $this->_storedValues[$field_name];
    }
    $this->_storedValues[$field_name] = [];

    $entryMeta = new FormEntryMetaModel();
    $stored = $entryMeta->get(
      'meta_value',
      [
        'bitforms_form_entry_id' => $this->_entryID,
        'meta_key'               => $field_name,
      ]
    );
    if (!is_wp_error($stored) && count($stored) > 0) {
      // Stored the same shapes `_old` arrives in: JSON list, comma list, bare name.
      $this->_storedValues[$field_name] = FieldValueHandler::retainedOldValues(
        [$field_name . '_old' => $stored[0]->meta_value],
        $field_name
      );
    }

    return $this->_storedValues[$field_name];
  }

  public function validateRepeatedField($field_name, $field_data, $hidden_fields, $rowIndex, $formID)
  {
    // Repeated composite child fields are stored per row under the parent key
    // (e.g. $_POST['<parent>'][$rowIndex]['first_name']). Resolve the child's row value
    // so the per-row checks operate on it; skip deactivated children.
    if (isset($field_data['parentFieldKey'])) {
      if (!empty($field_data['isDeactive'])) {
        return true;
      }
      $parentData = $this->_form_fields[$field_data['parentFieldKey']] ?? null;
      $parentRowValue = $this->_submitted_fields[$field_data['parentFieldKey']][$rowIndex] ?? null;
      if (is_array($parentRowValue)) {
        $childName = FieldValueHandler::deriveChildName($field_data['name'] ?? '', isset($parentData['name']) ? $parentData['name'] : '');
        $childValue = FieldValueHandler::extractChildValueFromParentValue($parentRowValue, $childName, $field_name);
        if (null !== $childValue) {
          $this->_submitted_fields[$field_name][$rowIndex] = $childValue;
        }
      }
    }
    if (isset($this->_submitted_fields[$field_name][$rowIndex])) {
      $values = $this->_submitted_fields[$field_name][$rowIndex];
      $this->_form_fields[$field_name]['value'] = FieldValueHandler::isEmpty($values) ? null : $values;
    }
    $messageKey = $field_name . '[' . $rowIndex . ']';

    if (
      (isset($field_data['valid']['req'])
          && $field_data['valid']['req']
          && 'file-up' !== $field_data['type']
          && 'advanced-file-up' !== $field_data['type']
          && empty($this->_submitted_fields[$field_name][$rowIndex])
          && !$this->keptStoredValue($field_name, $field_data, $rowIndex))
    ) {
      if (false !== strpos($hidden_fields, $field_name)) {
        return true;
      }
      $this->_messages[$messageKey] =
          !empty($field_data['valid']['req']['reqMsg'])
          ? $field_data['valid']['req']['reqMsg']
          : $field_data['label'] . __(' is required.', 'bit-form');
      return false;
    } elseif (
      isset($field_data['valid']['req'])
      && $field_data['valid']['req']
      && (
        'file-up' === $field_data['type']
        || 'advanced-file-up' === $field_data['type']
      )
    ) {
      if (false !== strpos($hidden_fields, $field_name)) {
        return true;
      }
      if ($this->keptStoredValue($field_name, $field_data, $rowIndex)) {
        return true;
      }
      if (empty($this->_submitted_files[$field_name]['name'][$rowIndex])) {
        $this->_messages[$messageKey]
            = !empty($field_data['valid']['req']['reqMsg']) ?
            $field_data['valid']['req']['reqMsg'] :
            $field_data['label'] . __(' is required.', 'bit-form');
        return false;
      }
    } elseif (isset($this->_submitted_fields[$field_name][$rowIndex]) && !empty($this->_submitted_fields[$field_name][$rowIndex])) {
      switch ($field_data['type']) {
        case 'email': {
          if (!$this->validateEmail($this->_submitted_fields[$field_name][$rowIndex])) {
            $this->_messages[$messageKey]
                = !empty($field_data['valid']['typMsg']) ?
                $field_data['valid']['typMsg'] :
                $field_data['label'] . __(' should be an email. please provide a valid email address.', 'bit-form');
          }
          $this->validateConfirmFieldRow($field_name, $field_data, $rowIndex);
          break;
        }
        case 'password': {
          $this->validateConfirmFieldRow($field_name, $field_data, $rowIndex);
          break;
        }
        case 'time': {
          if (!$this->validateTime($this->_submitted_fields[$field_name][$rowIndex])) {
            $this->_messages[$messageKey]
                = !empty($field_data['valid']['typMsg']) ?
                $field_data['valid']['typMsg'] :
                $field_data['label'] . __(' should be Time Format', 'bit-form');
          }
          break;
        }
        case 'phone': {
          if (!$this->validatePhone($this->_submitted_fields[$field_name][$rowIndex])) {
            $this->_messages[$messageKey]
                = !empty($field_data['valid']['typMsg']) ?
                $field_data['valid']['typMsg'] :
                $field_data['label'] . __(' should be a phone number', 'bit-form');
          }
          break;
        }
        case 'number': {
          if (!$this->validateNumber($this->_submitted_fields[$field_name][$rowIndex])) {
            $this->_messages[$messageKey]
                = !empty($field_data['valid']['typMsg']) ?
                $field_data['valid']['typMsg'] :
                $field_data['label'] . __(' should be a number', 'bit-form');
          }
          break;
        }
        case 'url': {
          if (!$this->validateURL($this->_submitted_fields[$field_name][$rowIndex])) {
            $this->_messages[$messageKey]
                = !empty($field_data['valid']['typMsg']) ?
                $field_data['valid']['typMsg'] :
                $field_data['label'] . __(' should be an URL', 'bit-form');
          }
          break;
        }
        case 'date': {
          if (!$this->validateDate($this->_submitted_fields[$field_name][$rowIndex])) {
            $this->_messages[$messageKey]
                = !empty($field_data['valid']['typMsg']) ?
                $field_data['valid']['typMsg'] :
                $field_data['label'] . __(' should be a date', 'bit-form');
          }
          break;
        }
        case 'select':
        case 'html-select':
        case 'check':
        case 'radio': {
          if (!$this->validateOptionField($this->_submitted_fields[$field_name][$rowIndex], $field_name, $formID)) {
            $this->_messages[$messageKey]
                = !empty($field_data['valid']['typMsg']) ?
                $field_data['valid']['typMsg'] :
                $field_data['label'] . __(' contains invalid option.', 'bit-form');
          }
          break;
        }
        default:
          break;
      }
    }
  }

  public function getMessage()
  {
    return $this->_messages;
  }

  private function validateConfirmField($field_name, $field_data)
  {
    if (is_array($this->_submitted_fields[$field_name])) {
      $primaryValue = $this->_submitted_fields[$field_name]['primary'];
      $confirmValue = $this->_submitted_fields[$field_name]['confirm'];
      $confirmFieldKey = $field_data['childFields'][0]->fldKey ?? null;
      $confirmFldData = $this->_form_fields[$confirmFieldKey] ?? null;
      if (!$this->matchConfirmation($primaryValue, $confirmValue)) {
        if ($confirmFldData && !$confirmFldData['isDeactive']) {
          $this->_messages[$confirmFieldKey]
               = !empty($confirmFldData['valid']['confMsg']) ?
               $confirmFldData['valid']['confMsg'] :
                __('The entered values do not match.', 'bit-form');
        }
      } else {
        if (!isset($field_data['parentFieldKey'])) {
          $_POST[$field_name] = $primaryValue;
        }
      }
    }
  }

  /**
   * Transpose a repeated composite field's submitted value from child-part-first
   * ([<part>][<row>] — how the frontend posts it) to row-first ([<row>][<part>]).
   * Returns the value unchanged when it is already row-first (numeric top-level
   * keys) or is not a composite child-first shape.
   */
  private function transposeCompositeRows($value)
  {
    if (!is_array($value) || empty($value)) {
      return $value;
    }
    foreach ($value as $childKey => $childValues) {
      if (is_int($childKey) || ctype_digit((string) $childKey) || !is_array($childValues)) {
        return $value;
      }
    }
    $rows = [];
    foreach ($value as $childKey => $childValues) {
      foreach ($childValues as $rowIndex => $rowValue) {
        $rows[$rowIndex][$childKey] = $rowValue;
      }
    }
    return $rows;
  }

  /**
   * Per-row confirm match for repeated email/password fields. The row value is
   * ['primary' => ..., 'confirm' => ...] after transposeCompositeRows().
   */
  private function validateConfirmFieldRow($field_name, $field_data, $rowIndex)
  {
    $rowValue = $this->_submitted_fields[$field_name][$rowIndex] ?? null;
    if (!is_array($rowValue) || !array_key_exists('confirm', $rowValue)) {
      return;
    }
    $confirmFieldKey = $field_data['childFields'][0]->fldKey ?? null;
    $confirmFldData = $this->_form_fields[$confirmFieldKey] ?? null;
    if (!$this->matchConfirmation($rowValue['primary'] ?? null, $rowValue['confirm'])) {
      if ($confirmFldData && empty($confirmFldData['isDeactive'])) {
        $this->_messages[$confirmFieldKey . '[' . $rowIndex . ']']
            = !empty($confirmFldData['valid']['confMsg']) ?
            $confirmFldData['valid']['confMsg'] :
            __('The entered values do not match.', 'bit-form');
      }
    }
  }

  private function validateEmail($value)
  {
    if (is_array($value)) {
      $value = $value['primary'] ?? null;
    }

    if (!is_string($value)) {
      return false;
    }
    $validEmailPattern = "/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";

    return 1 === preg_match($validEmailPattern, $value);
  }

  private function matchConfirmation($value, $confirmValue)
  {
    return $value === $confirmValue;
  }

  private function validateTime($value)
  {
    return preg_match('/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/', $value);
  }

  private function validatePhone($value)
  {
    return preg_match('/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/', $value);
  }

  private function validateNumber($value)
  {
    return preg_match('/^(\+|-)?\d+(\.)?\d*$/', $value);
  }

  private function validateURL($value)
  {
    if (false === strpos($value, '://')) {
      $value = 'http://' . $value; // Add scheme if missing
    }
    $urlParts = wp_parse_url($value);
    if (isset($urlParts['host'])) {
      if (function_exists('idn_to_ascii')) {
        $asciiHost = idn_to_ascii($urlParts['host'], IDNA_DEFAULT, INTL_IDNA_VARIANT_UTS46);
        if (false !== $asciiHost) {
          $urlParts['host'] = $asciiHost;
        }
      }
      $value = (isset($urlParts['scheme']) ? $urlParts['scheme'] . '://' : '') .
               $urlParts['host'] .
               (isset($urlParts['path']) ? $urlParts['path'] : '');
    }
    return false !== filter_var($value, FILTER_VALIDATE_URL);
  }

  private function validateDate($value)
  {
    $date = date_create_from_format('Y-m-d', $value);
    return $date && $date->format('Y-m-d') === $value;
  }

  private function validateOptionField($value, $fieldKey, $formID)
  {
    if (FieldValueHandler::isEmpty($value)) {
      return true;
    }

    $fieldDetails = $this->getFieldDetails($fieldKey, $formID);
    if (empty($fieldDetails) || empty($fieldDetails->typ)) {
      return true;
    }

    if ($this->allowCustomOption($fieldDetails)) {
      return true;
    }

    $allowedOptions = $this->getAllowedOptionValues($fieldDetails);
    if (empty($allowedOptions)) {
      return true;
    }

    $submittedValues = $this->normalizeSubmittedOptionValues($value);
    if (empty($submittedValues)) {
      return true;
    }

    $allowedOptions = array_map([$this, 'normalizeOptionValueForComparison'], $allowedOptions);

    foreach ($submittedValues as $submittedValue) {
      if (!in_array($this->normalizeOptionValueForComparison($submittedValue), $allowedOptions, true)) {
        return false;
      }
    }

    return true;
  }

  private function getFieldDetails($fieldKey, $formID)
  {
    $form = FormManager::getInstance($formID);
    $content = $form->getFieldsContent();
    $decodedContent = json_decode($content);
    $fields = (is_object($decodedContent) && isset($decodedContent->fields)) ? $decodedContent->fields : null;

    return isset($fields->{$fieldKey}) ? $fields->{$fieldKey} : null;
  }

  private function allowCustomOption($fieldDetails)
  {
    if (in_array($fieldDetails->typ, ['check', 'radio'], true)) {
      return !empty($fieldDetails->addOtherOpt);
    }

    if (in_array($fieldDetails->typ, ['select', 'html-select'], true)) {
      return !empty($fieldDetails->config->allowCustomOption);
    }

    return false;
  }

  private function getAllowedOptionValues($fieldDetails)
  {
    if (in_array($fieldDetails->typ, ['check', 'radio', 'html-select'], true)) {
      return $this->flattenOptions(isset($fieldDetails->opt) ? $fieldDetails->opt : []);
    }

    if (!in_array($fieldDetails->typ, ['select'], true) || empty($fieldDetails->optionsList)) {
      return [];
    }

    // A dropdown can hold multiple option lists. Conditional logic (WorkFlow Actions)
    // switches the runtime active list based on other fields, but the stored
    // config->activeList only reflects the builder default. The server cannot reliably
    // know which list was active at submit time, so accept any value present in ANY list.
    $optionsList = is_array($fieldDetails->optionsList) ? $fieldDetails->optionsList : (array) $fieldDetails->optionsList;

    $allowedOptions = [];
    foreach ($optionsList as $list) {
      $list = (array) $list;
      if (empty($list)) {
        continue;
      }
      $options = array_values($list)[0];
      $allowedOptions = array_merge($allowedOptions, $this->flattenOptions($options));
    }

    return $allowedOptions;
  }

  private function flattenOptions($options)
  {
    $flatOptions = [];
    $options = is_array($options) ? $options : (array) $options;

    foreach ($options as $option) {
      if (empty($option)) {
        continue;
      }

      $option = (object) $option;
      if (isset($option->type, $option->childs)) {
        $flatOptions = array_merge($flatOptions, $this->flattenOptions($option->childs));
        continue;
      }

      if (isset($option->val) || isset($option->lbl)) {
        $flatOptions[] = (string) (isset($option->val) ? $option->val : $option->lbl);
      }
    }

    return $flatOptions;
  }

  private function normalizeSubmittedOptionValues($value)
  {
    if (is_array($value)) {
      return array_map('strval', array_filter($value, static function ($item) {
        return !FieldValueHandler::isEmpty($item);
      }));
    }

    if (is_string($value) && false !== strpos($value, BITFORMS_BF_SEPARATOR)) {
      return array_map('strval', array_filter(explode(BITFORMS_BF_SEPARATOR, $value), static function ($item) {
        return !FieldValueHandler::isEmpty($item);
      }));
    }

    return [(string) $value];
  }

  private function normalizeOptionValueForComparison($value)
  {
    $value = sanitize_text_field((string) $value);
    $value = html_entity_decode($value, ENT_QUOTES, 'UTF-8');
    $value = preg_replace('/\s+/u', ' ', $value);

    return trim((string) $value);
  }
}
