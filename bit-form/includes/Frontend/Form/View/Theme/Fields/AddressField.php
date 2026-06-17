<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

use BitCode\BitForm\Core\Form\FormManager;

class AddressField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ClassicInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);

    if (!property_exists($field, 'childFields') || empty((array) $field->childFields)) {
      return $inputWrapper->wrapper('');
    }

    $formManager = FormManager::getInstance($formID);
    $fields      = $formManager->getFormContent()->fields;
    $childFields = $field->childFields;

    $parentChildHTML = '';

    foreach ($childFields as $childFldKey) {
      if (!isset($childFldKey->fldKey) || !isset($fields->{$childFldKey->fldKey})) {
        continue;
      }

      $fldKey     = $childFldKey->fldKey;
      $childField = $fields->{$fldKey};
      $isDeactive = property_exists($childField, 'isDeactive') && $childField->isDeactive;

      if ($isDeactive) {
        continue;
      }

      preg_match('/\[(\w+)\]$/', $childField->fieldName, $matches);
      $subFieldName = $matches[1] ?? '';
      $colSpan      = property_exists($childField, 'colSpan') ? (int) $childField->colSpan : 12;

      if ('country' === $childField->typ) {
        $input = CountryField::init($childField, $fldKey, $field_name . '_address', $form_atomic_Cls_map, $formID, $error, $value);
      } else {
        $input = TextField::init($childField, $fldKey, $field_name . '_address', $form_atomic_Cls_map, $formID, $error, $value);
      }

      $parentChildHTML .= $inputWrapper->childFieldWrapper($input, $subFieldName, $colSpan, $fldKey);
    }

    $parentHtml = $inputWrapper->parentFieldWrapper($parentChildHTML);

    return $inputWrapper->wrapper($parentHtml);
  }
}
