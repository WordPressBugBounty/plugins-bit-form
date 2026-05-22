<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

use BitCode\BitForm\Core\Util\FrontendHelpers;

class DecisionBoxField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ClassicInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    return $inputWrapper->wrapper($input, true);
  }

  private static function field($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $fieldHelpers = new ClassicFieldHelpers($field, $rowID, $form_atomic_Cls_map);

    $suggestions = '';
    $req = $fieldHelpers->required();
    $disabled = '';
    $readonly = '';
    $name = $fieldHelpers->name();
    $value = '';
    $ariaDescribedBy = $fieldHelpers->ariaDescribedBy();
    $ariaRequired = $fieldHelpers->ariaRequired();
    // Get dynamic label ID to link the checkbox group to its label for screen readers
    $labelId = $fieldHelpers->getLabelId();
    $bfFrontendFormIds = FrontendHelpers::$bfFrontendFormIds;
    $contentCount = count($bfFrontendFormIds);
    if ($fieldHelpers->property_exists_nested($field, 'msg->checked')) {
      $value = "value='{$field->msg->checked}'";
    }
    $checked = '';

    if ($fieldHelpers->property_exists_nested($field, 'valid->disabled', true)) {
      $disabled = 'disabled';
    }

    if ($fieldHelpers->property_exists_nested($field, 'valid->checked', true) || $fieldHelpers->isChecked()) {
      $checked = 'checked';
    }

    if ($fieldHelpers->property_exists_nested($field, 'valid->readonly', true)) {
      $readonly = 'readonly';
    }

    $lbl = '';
    if (isset($field->lbl) && !empty($field->lbl)) {
      $lbl = $field->lbl;
    } elseif ($fieldHelpers->property_exists_nested($field, 'info->lbl') && !empty($field->info->lbl)) {
      $lbl = $field->info->lbl;
    }

    return sprintf(
      '<div
        %1$s
        class="%2$s %3$s"
        role="group"
        aria-labelledby="%4$s"
        %5$s
      >
        <svg class="%6$s" aria-hidden="true">
          <symbol id="%7$s-ck-svg" viewBox="0 0 12 10">
            <polyline
              class="%8$s"
              points="1.5 6 4.5 9 10.5 1"
            ></polyline>
          </symbol>
        </svg>

        <div
          %9$s
          class="%10$s %11$s"
        >
          <input
            id="%12$s-%13$s-decision"
            type="checkbox"
            class="%14$s"
            %15$s
            %16$s
            %17$s
            %18$s
            %19$s
            %20$s
            %21$s
          />
          <label
            %22$s
            data-cl
            for="%23$s-%24$s-decision"
            class="%25$s"
          >
            <span
              %26$s
              data-bx
              class="%27$s %28$s"
            >
              <svg width="12" height="10" viewBox="0 0 12 10" class="%29$s" aria-hidden="true">
                <use data-ck-icn href="#%30$s-ck-svg" class="%31$s" />
              </svg>
            </span>
            <span
              %32$s
              class="%33$s %34$s"
            >
              %35$s
            </span>
          </label>
        </div>
      </div>',
      $fieldHelpers->getCustomAttributes('cc'),                   // 1
      $fieldHelpers->getAtomicCls('cc'),                          // 2
      $fieldHelpers->getCustomClasses('cc'),                      // 3
      $labelId,                                                   // 4
      $ariaDescribedBy,                                           // 5
      $fieldHelpers->getAtomicCls('cks'),                         // 6
      $rowID,                                                     // 7
      $fieldHelpers->getAtomicCls('ck-svgline'),                  // 8
      $fieldHelpers->getCustomAttributes('cw'),                   // 9
      $fieldHelpers->getAtomicCls('cw'),                          // 10
      $fieldHelpers->getCustomClasses('cw'),                      // 11
      $rowID,                                                     // 12
      $contentCount,                                              // 13
      $fieldHelpers->getAtomicCls('ci'),                          // 14
      $disabled,                                                  // 15
      $readonly,                                                  // 16
      $req,                                                       // 17
      $ariaRequired,                                              // 18
      $name,                                                      // 19
      $checked,                                                   // 20
      $value,                                                     // 21
      $fieldHelpers->getCustomAttributes('cl'),                   // 22
      $rowID,                                                     // 23
      $contentCount,                                              // 24
      $fieldHelpers->getAtomicCls('cl'),                          // 25
      $fieldHelpers->getCustomAttributes('bx'),                   // 26
      $fieldHelpers->getAtomicCls('bx'),                          // 27
      $fieldHelpers->getAtomicCls('bx'),                          // 28
      $fieldHelpers->getAtomicCls('svgwrp'),                      // 29
      $rowID,                                                     // 30
      $fieldHelpers->getAtomicCls('ck-icn'),                      // 31
      $fieldHelpers->getCustomAttributes('ct'),                   // 32
      $fieldHelpers->getAtomicCls('ct'),                          // 33
      $fieldHelpers->getCustomClasses('ct'),                      // 34
      $fieldHelpers->kses_post($fieldHelpers->renderHTMR($lbl))   // 35
    );
  }
}
