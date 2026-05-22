<?php

namespace BitCode\BitForm\Frontend\Form\View\Conversational\Fields;

use BitCode\BitForm\Frontend\Form\View\Conversational\DefaultConversationalTheme;

class RepeaterField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $formViewerInstance,  $nestedLayout, $error = null, $value = null)
  {
    $inputWrapper = new ConversationalInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($field, $rowID, $field_name, $formID, $formViewerInstance, $nestedLayout, $form_atomic_Cls_map, $value);
    return $inputWrapper->wrapper($input);
  }

  private static function field($field, $rowID, $field_name, $formID, $formViewerInstance, $nestedLayout, $form_atomic_Cls_map, $value)
  {
    $fieldHelpers = new ConversationalFieldHelpers($formID, $field, $rowID, $form_atomic_Cls_map);

    $addBtnMarkup = '';
    $addToEndBtnMarkup = '';

    if (isset($field->addBtn->show) && $field->addBtn->show) {
      $addBtnPreIcn = $fieldHelpers->icon('addBtnPreIcn', 'rpt-add-btn-pre-i');
      $addBtnSufIcn = $fieldHelpers->icon('addBtnSufIcn', 'rpt-add-btn-suf-i');
      $addBtnMarkup = sprintf(
        ' <button
          %1$s
          class="%2$s"
          type="%3$s"
          data-parent-field-name="%4$s"
          aria-label="Add new row"
        >
          <svg class="%5$s" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"/></svg>
          %6$s
          %7$s
        </button>',
        $fieldHelpers->getCustomAttributes('rpt-add-btn'),
        $fieldHelpers->getConversationalMultiCls('rpt-add-btn') . ' ' . $fieldHelpers->getCustomClasses('rpt-add-btn'),
        $field->addBtn->btnTyp,
        $field->fieldName,
        $fieldHelpers->getConversationalMultiCls('rpt-add-btn-pre-i'),
        $fieldHelpers->kses_post($fieldHelpers->renderHTMR($field->addBtn->txt)),
        $addBtnSufIcn
      );
    };

    if (isset($field->addToEndBtn->show) && $field->addToEndBtn->show) {
      $addToEndBtnPreIcn = $fieldHelpers->icon('addToEndBtnPreIcn', 'add-to-end-btn-pre-i');
      $addToEndBtnSufIcn = $fieldHelpers->icon('addToEndBtnSufIcn', 'add-to-end-btn-suf-i');
      $addToEndBtnMarkup = sprintf(
        ' <div
          %1$s
          class="%2$s"
        >
          <button
            %3$s
            class="%4$s"
            type="%5$s"
            data-parent-field-name="%6$s"
            aria-label="Add new row at end"
          >
            %7$s
            %8$s
            %9$s
          </button>
        </div>',
        $fieldHelpers->getCustomAttributes('add-to-end-btn-wrp'),
        $fieldHelpers->getConversationalMultiCls('add-to-end-btn-wrp') . ' ' . $fieldHelpers->getCustomClasses('add-to-end-btn-wrp'),
        $fieldHelpers->getCustomAttributes('add-to-end-btn'),
        $fieldHelpers->getConversationalMultiCls('add-to-end-btn') . ' ' . $fieldHelpers->getCustomClasses('add-to-end-btn'),
        $field->addToEndBtn->btnTyp,
        $field->fieldName,
        $addToEndBtnPreIcn,
        $fieldHelpers->kses_post($fieldHelpers->renderHTMR($field->addToEndBtn->txt)),
        $addToEndBtnSufIcn
      );
    };

    $removeBtnPreIcn = $fieldHelpers->icon('removeBtnPreIcn', 'rpt-rmv-btn-pre-i');
    $removeBtnSufIcn = $fieldHelpers->icon('removeBtnSufIcn', 'rpt-rmv-btn-suf-i');

    $conversationalTheme = new DefaultConversationalTheme($formViewerInstance->getFormInfo()->conversationalSettings);
    $fieldHtml = '';
    if (isset($nestedLayout->lg)) {
      foreach ($nestedLayout->lg as $row) {
        $fieldHtml .= $conversationalTheme->inputWrapper($formViewerInstance, $row->i, true);
      }
    }

    // role="region" marks each repeater row as a landmark region for screen reader navigation
    // aria-label provides context about the row (dynamically updated by JS when rows change)
    $repeatableWrap = '      
      <div
        ' . $fieldHelpers->getCustomAttributes('rpt-wrp') . '
        class="' . $fieldHelpers->getConversationalMultiCls('rpt-wrp') . ' ' . $fieldHelpers->getCustomClasses('rpt-wrp') . '"
        role="region"
        aria-label="Repeater row"
      >
        <div
          ' . $fieldHelpers->getCustomAttributes('rpt-grid-wrp') . '
          class="' . $fieldHelpers->getConversationalMultiCls('rpt-grid-wrp') . ' ' . $fieldHelpers->getCustomClasses('rpt-grid-wrp') . '"
        >
          <div class="_frm-b' . $formID . ' b' . $formID . '-bf-repeater-grid bf-repeater-grid">
            ' . $fieldHtml . '
          </div>
        </div>
        <div
          ' . $fieldHelpers->getCustomAttributes('pair-btn-wrp') . '
          class="' . $fieldHelpers->getConversationalMultiCls('pair-btn-wrp') . ' ' . $fieldHelpers->getCustomClasses('pair-btn-wrp') . '"
        >
          ' . $addBtnMarkup . '
          <button
            ' . $fieldHelpers->getCustomAttributes('rpt-rmv-btn') . '
            class="' . $fieldHelpers->getConversationalMultiCls('rpt-rmv-btn') . ' ' . $fieldHelpers->getCustomClasses('rpt-rmv-btn') . '"
            type="' . $field->removeBtn->btnTyp . '"
            data-parent-field-name="' . $field->fieldName . '"
            aria-label="Remove this row"
          >
            <svg class="' . $fieldHelpers->getConversationalCls('rpt-rmv-btn-pre-i') . '" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998H5v-2h14z"/></svg>
            ' . $fieldHelpers->renderHTMR($field->removeBtn->txt) . '
            ' . $removeBtnSufIcn . '
          </button>
        </div>
      </div>';

    $repeatedRow = apply_filters('bitform_repeater_repeated_rows', $repeatableWrap, $field);

    // role="group" indicates this is a collection of related form controls
    // aria-labelledby links to the field label for screen reader context
    return sprintf(
      ' <div
          %1$s
          class="%2$s"
        >
          <div
            %3$s
            class="%4$s"
            role="group"
            aria-labelledby="{%5$s}"
            aria-describedby="{%6$s}"
        >
          %7$s
          %8$s
          <input
            type="text"
            class="d-none"
            title="Rpeater Index Hidden Input"
            name="%9$s"
            value=""
            aria-hidden="true"
          />
        </div>
      </div>',
      $fieldHelpers->getCustomAttributes('inp-fld-wrp'),
      $fieldHelpers->getConversationalMultiCls('inp-fld-wrp') . ' ' . $fieldHelpers->getConversationalCls('inner-grid-fld-wrp') . ' ' . $fieldHelpers->getCustomClasses('inp-fld-wrp'),
      $fieldHelpers->getCustomAttributes('rpt-fld-wrp'),
      $fieldHelpers->getConversationalMultiCls('rpt-fld-wrp') . ' ' . $fieldHelpers->getCustomClasses('rpt-fld-wrp'),
      $fieldHelpers->getLabelId(),
      $fieldHelpers->getErrorId(),
      $repeatedRow,
      $addToEndBtnMarkup,
      $fieldHelpers->esc_attr($field->fieldName . '-repeat-index')
    );
  }
}
