<?php

namespace BitCode\BitForm\Frontend\Form\View\Conversational\Fields;

use BitCode\BitForm\Core\Util\FrontendHelpers;

class TextField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ConversationalInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($formID, $field, $rowID, $form_atomic_Cls_map, $value);
    return $inputWrapper->wrapper($input);
  }

  private static function field($formID, $field, $rowID, $form_atomic_Cls_map, $value)
  {
    $fieldHelpers = new ConversationalFieldHelpers($formID, $field, $rowID, $form_atomic_Cls_map);

    $prefixIcn = $fieldHelpers->icon('prefixIcn', 'pre-i');
    $suffixIcn = $fieldHelpers->icon('suffixIcn', 'suf-i');
    $req = $fieldHelpers->required();
    $disabled = $fieldHelpers->disabled();
    $readonly = $fieldHelpers->readonly();
    $inputMode = apply_filters('bitform_field_inputmode_attr', '', $field);
    $name = $fieldHelpers->name();
    $ac = $fieldHelpers->autocomplete();
    $mx = apply_filters('bitform_field_max_attr', '', $field);
    $mn = apply_filters('bitform_field_min_attr', '', $field);
    $minlength = $fieldHelpers->minlength();
    $maxlength = $fieldHelpers->maxlength();
    $maxword = $fieldHelpers->maxword();
    $minword = $fieldHelpers->minword();
    $ph = $fieldHelpers->placeholder();
    $value = $fieldHelpers->value();
    $ariaDescribedBy = $fieldHelpers->ariaDescribedBy();
    $ariaRequired = $fieldHelpers->ariaRequired();
    $list = '';
    $bfFrontendFormIds = FrontendHelpers::$bfFrontendFormIds;
    $contentCount = count($bfFrontendFormIds);
    $sugg = apply_filters('bitform_field_suggestions_datalist', '', $field, $rowID, $contentCount);

    if (property_exists($field, 'suggestions') && count($field->suggestions) > 0) {
      $list = "list='{$rowID}-{$contentCount}-datalist'";
    }

    $inputWrapperCustomAttributes = $fieldHelpers->getCustomAttributes('inp-fld-wrp');
    $inputWrapperClass = $fieldHelpers->getConversationalCls('inp-fld-wrp') . ' ' . $fieldHelpers->getCustomClasses('inp-fld-wrp');
    $fieldCustomAttributes = $fieldHelpers->getCustomAttributes('fld');
    $fieldClass = $fieldHelpers->getConversationalCls('focus-elm') . ' ' . $fieldHelpers->getConversationalMultiCls('fld') . ' ' . $fieldHelpers->getCustomClasses('fld');
    $id = "{$rowID}-{$contentCount}";

    return '<div
      ' . $inputWrapperCustomAttributes . '
      class="' . $inputWrapperClass . '"
    >
      <input
        ' . $fieldCustomAttributes . '
        id="' . $id . '"
        ' . $list . '
        class="' . $fieldClass . '"
        type="' . $field->typ . '"
        ' . $req . '
        ' . $ariaRequired . '
        ' . $ariaDescribedBy . '
        ' . $disabled . '
        ' . $readonly . '
        ' . $ph . '
        ' . $mn . '
        ' . $mx . '
        ' . $minlength . '
        ' . $maxlength . '
        ' . $maxword . '
        ' . $minword . '
        ' . $ac . '
        ' . $inputMode . '
        ' . $name . '
        ' . $value . '
      />
      ' . $prefixIcn . '
      ' . $suffixIcn . '
    </div>
    ' . $sugg;
  }
}
