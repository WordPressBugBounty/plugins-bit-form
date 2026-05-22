<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

use BitCode\BitForm\Core\Form\FormManager;

class FieldWithChild
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ClassicInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($inputWrapper, $field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);

    return $input;
  }

  private static function field($inputWrapper, $field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    //to be implemented by child classes
    $formManager = FormManager::getInstance($formID);
    $fields = $formManager->getFormContent()->fields;
    $parentChildHTML = '';
    $childFields = isset($field->childFields) ? $field->childFields : [];

    if (in_array($field->typ, ['email', 'password'])) {
      //  if it's email or password field primar field will be inside parent wrapper
      $parentInputHtml = TextField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      $parentChildHTML .= $inputWrapper->childFieldWrapper($parentInputHtml);
      foreach ($childFields as $childFldKey) {
        $fldKey = $childFldKey->fldKey;
        $childField = $fields->$fldKey;

        $input = TextField::init($childField, $fldKey, $field_name . '_confirm', $form_atomic_Cls_map, $formID, $error, $value);
        $parentChildHTML .= $inputWrapper->childFieldWrapper($input);
      }
    } elseif ('name' === $field->typ) {
      $parentFieldValue = '';
      if (isset($field->val)) {
        $value = $field->val;
        if (is_array($value)) {
          $parentFieldValue = (object) $value;
        } elseif (is_string($value) && !empty($value)) {
          $parentFieldValue = json_decode($value);
        }
      }
      //  for name field there will be no primary field just child fields
      foreach ($childFields as $childFldKey) {
        if (!isset($childFldKey->fldKey) || !isset($fields->{$childFldKey->fldKey})) {
          continue;
        }
        $fldKey = $childFldKey->fldKey;
        $childField = $fields->{$fldKey};
        $isDeactive = property_exists($childField, 'isDeactive') && $childField->isDeactive;
        if ($isDeactive) {
          continue;
        }
        $childFieldName = '';
        if (preg_match('/\[([^\]]+)\]/', $childField->fieldName, $matches)) {
          $childFieldName = $matches[1];
        }
        if ($childFieldName && is_object($parentFieldValue) && property_exists($parentFieldValue, $childFieldName)) {
          $childField->val = $parentFieldValue->{$childFieldName};
        }
        $input = TextField::init($childField, $fldKey, $field_name . '_confirm', $form_atomic_Cls_map, $formID, $error, $value);
        $parentChildHTML .= $inputWrapper->childFieldWrapper($input);
      }
    }

    return self::shouldRenderChild($field) ? $inputWrapper->parentFieldWrapper($parentChildHTML) : TextField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
  }

  private static function shouldRenderChild($field)
  {
    return (in_array($field->typ, ['email', 'password']) && property_exists($field, 'confirm') && true === $field->confirm) || ('name' === $field->typ && property_exists($field, 'childFields') && !empty((array) $field->childFields));
  }
}
