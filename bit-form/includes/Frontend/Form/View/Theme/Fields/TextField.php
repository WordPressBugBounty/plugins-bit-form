<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

use BitCode\BitForm\Core\Util\FrontendHelpers;

class TextField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ClassicInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($field, $rowID, $form_atomic_Cls_map, $value, $formID);
    return $inputWrapper->wrapper($input);
  }

  private static function field($field, $rowID, $form_atomic_Cls_map, $value, $formID = null)
  {
    $fieldHelpers = new ClassicFieldHelpers($field, $rowID, $form_atomic_Cls_map, $formID);

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

    $showPickerAttr = self::showPickerAttr($field);

    if (property_exists($field, 'suggestions') && count($field->suggestions) > 0) {
      $list = "list='{$rowID}-{$contentCount}-datalist'";
    }

    return sprintf(
      '<div %1$s class="%2$s %3$s">
        <input
          %4$s
          id="%5$s"
          %6$s
          class="%7$s %8$s"
          type="%9$s"
          %10$s
          %11$s
          %12$s
          %13$s
          %14$s
          %15$s
          %16$s
          %17$s
          %18$s
          %19$s
          %20$s
          %21$s
          %22$s
          %23$s
          %24$s
          %25$s
          %26$s
        />
        %27$s
        %28$s
      </div>
      %29$s',
      $fieldHelpers->getCustomAttributes('inp-fld-wrp'),
      $fieldHelpers->getAtomicCls('inp-fld-wrp'),
      $fieldHelpers->getCustomClasses('inp-fld-wrp'),
      $fieldHelpers->getCustomAttributes('fld'),
      "{$rowID}-{$contentCount}",
      $list,
      $fieldHelpers->getAtomicCls('fld'),
      $fieldHelpers->getCustomClasses('fld'),
      esc_attr($field->typ),
      $req,
      $ariaRequired,
      $ariaDescribedBy,
      $disabled,
      $readonly,
      $ph,
      $mn,
      $mx,
      $minlength,
      $maxlength,
      $maxword,
      $minword,
      $ac,
      $inputMode,
      $name,
      $value,
      $showPickerAttr,
      $prefixIcn,
      $suffixIcn,
      $sugg
    );
  }

  private static function showPickerAttr($field)
  {
    $dateType = ['date', 'datetime-local', 'month', 'time', 'week'];
    if (in_array($field->typ, $dateType, true)) {
      return 'data-bf-show-picker="1"';
    }
    return '';
  }
}
