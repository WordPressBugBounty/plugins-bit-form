<?php

namespace BitCode\BitForm\Frontend\Form\View;

use BitCode\BitForm\Admin\Form\Helpers;
use BitCode\BitForm\Core\Util\EscapingHelper;
use BitCode\BitForm\Core\Util\FieldValueHandler;
use BitCode\BitForm\Core\Util\FrontendHelpers;

class FieldHelpers
{
  private $_fld;
  private $_fk;
  private $_form_atomic_Cls_map;
  private $_formID;

  public function __construct($field, $fk, $form_atomic_Cls_map = null, $formID = null)
  {
    $this->_fld = $field;
    $this->_fk = $fk;
    $this->_form_atomic_Cls_map = $form_atomic_Cls_map;
    $this->_formID = $formID;
  }

  public function getCustomAttributes($element)
  {
    if ($this->property_exists_nested($this->_fld, "customAttributes->{$element}")) {
      $attrString = '';
      $customAttributs = $this->_fld->customAttributes->{$element};

      foreach ($customAttributs as $attr) {
        if (!isset($attr->key) || !EscapingHelper::isSafeAttributeKey((string) $attr->key)) {
          continue;
        }
        $attrString .= " {$this->esc_attr($attr->key)}='{$this->esc_attr($attr->value)}'";
      }
      return $attrString;
    }
    return '';
  }

  public function getCustomClasses($element)
  {
    if ($this->property_exists_nested($this->_fld, "customClasses->{$element}")) {
      return $this->esc_attr($this->_fld->customClasses->{$element});
    }
    return '';
  }

  public function renderHTMR($content)
  {
    $safeContent = Helpers::sanitizeUserHTML($content);
    return $safeContent;
  }

  public function getAtomicCls($element)
  {
    $meaningfulElementClass = "bf-{$this->getMeaningfullElementClass($element)}";
    if (empty($this->_fld) && empty($this->_fk)) {
      if (property_exists($this->_form_atomic_Cls_map, ".$element")) {
        $getAtomicCls = $this->_form_atomic_Cls_map->{".$element"};
        return implode(' ', $getAtomicCls) . " {$element} {$meaningfulElementClass}";
      }
      return "$element {$meaningfulElementClass}";
    }
    if ('advanced-file-up' === $this->_fld->typ && isset($this->_form_atomic_Cls_map->{".$element"})) {
      $getAtomicCls = $this->_form_atomic_Cls_map->{".$element"};
      return implode(' ', $getAtomicCls) . " {$this->_fk}-{$element} {$meaningfulElementClass}";
    }
    $fieldElementCls = ".{$this->_fk}-{$element}";
    $formId = explode('-', $this->_fk)[0]; // exmp: b12-10 => $formId = b12
    // $formElementCls = ".{$element}-" . $formId;
    $formElementCls = ".{$formId}-" . $element;

    if (isset($this->_form_atomic_Cls_map->{$fieldElementCls})) {
      $formElementAtomicClsString = '';
      if (property_exists($this->_form_atomic_Cls_map, $formElementCls)) {
        $formElementAtomicClsArray = $this->_form_atomic_Cls_map->{$formElementCls};
        $formElementAtomicClsString = implode(' ', $formElementAtomicClsArray);
      }
      $getAtomicCls = $this->_form_atomic_Cls_map->{$fieldElementCls};
      return implode(' ', $getAtomicCls) . " {$formElementAtomicClsString} {$this->_fk}-{$element} {$formId}-{$element} bf-{$element} {$meaningfulElementClass}";
    }
    return "{$this->_fk}-{$element} {$formId}-{$element} bf-{$element} {$meaningfulElementClass}";
  }

  public function getMeaningfullElementClass($element)
  {
    $elementTitleMap = [
      'fld-wrp'                               => 'field-wrapper',
      'lbl-wrp'                               => 'label-wrapper',
      'lbl'                                   => 'label',
      'lbl-pre-i'                             => 'label-prefix-icon',
      'lbl-suf-i'                             => 'label-suffix-icon',
      'sub-titl'                              => 'subtitle',
      'sub-titl-pre-i'                        => 'subtitle-prefix-icon',
      'sub-titl-suf-i'                        => 'subtitle-suffix-icon',
      'fld'                                   => 'field',
      'pre-i'                                 => 'field-prefix-icon',
      'suf-i'                                 => 'field-suffix-icon',
      'hlp-txt'                               => 'helper-text-container',
      'hlp-txt-pre-i'                         => 'helper-text-prefix-icon',
      'hlp-txt-suf-i'                         => 'helper-text-suffix-icon',
      'err-msg'                               => 'error-messages-container',
      'err-txt-pre-i'                         => 'error-text-prefix-icon',
      'err-txt-suf-i'                         => 'error-text-suffix-icon',
      'currency-fld-wrp'                      => 'currency-field-wrapper',
      'btn'                                   => 'button',
      'btn-pre-i'                             => 'button-prefix-icon',
      'btn-suf-i'                             => 'button-suffix-icon',
      'other-inp'                             => 'other-option-input',
      'inp-wrp'                               => 'input-wrapper',
      'inp-wrp .filepond--panel-root'         => 'item-panel-wrapper',
      'inp-wrp .filepond--item-panel'         => 'item-panel',
      'inp-wrp .filepond--file-action-button' => 'file-action-button',
      'inp-wrp .filepond--file'               => 'file',
      'inp-wrp .filepond--drop-label'         => 'drop-label',
      'inp-wrp .filepond--label-action'       => 'label-action',
      'option-list'                           => 'option-list',
      'option-list .option'                   => 'option',
      'option-list .opt-lbl-wrp'              => 'option-label-container',
      'option-list .opt-icn'                  => 'option-icon',
      'option-list .opt-lbl'                  => 'option-label',
      'option-list .opt-suffix'               => 'option-suffix',
      'option-list .opt-prefix'               => 'option-prefix',
      'divider'                               => 'divider',
      'bx'                                    => 'box',
      'stripe-btn'                            => 'stripe-button',
      'stripe-icn'                            => 'stripe-icon',
      'stripe-pay-btn'                        => 'stripe-pay-button',
      'rating-img'                            => 'rating-image',
      'rating-msg'                            => 'rating-message',
      'req-smbl'                              => 'asterisk-symbol',
      '_frm-bg'                               => 'form-wrapper',
      '_frm'                                  => 'form-container',
    ];

    if (isset($elementTitleMap[$element])) {
      return $elementTitleMap[$element];
    }

    // Fallback: convert hyphenated element key to meaningful class
    // e.g., 'fld-wrp' => 'fld wrp' => join with '-' after expanding abbreviations
    $abbreviations = [
      'fld'   => 'field',
      'wrp'   => 'wrapper',
      'lbl'   => 'label',
      'pre'   => 'prefix',
      'suf'   => 'suffix',
      'i'     => 'icon',
      'titl'  => 'title',
      'sub'   => 'sub',
      'hlp'   => 'helper',
      'txt'   => 'text',
      'err'   => 'error',
      'msg'   => 'message',
      'btn'   => 'button',
      'inp'   => 'input',
      'opt'   => 'option',
      'icn'   => 'icon',
      'img'   => 'image',
      'smbl'  => 'symbol',
      'req'   => 'required',
      'frm'   => 'form',
      'bg'    => 'background',
    ];

    $splitElements = explode('-', $element);
    $meaningfulParts = [];

    foreach ($splitElements as $part) {
      $cleanPart = ltrim($part, '_');
      $meaningfulParts[] = isset($abbreviations[$cleanPart]) ? $abbreviations[$cleanPart] : $cleanPart;
    }

    return implode('-', $meaningfulParts);
  }

  public function replaceToBackSlash($str)
  {
    $phReplaceToBackslash = str_replace('$_bf_$', '\\', $str); // Replace React inputs value "$_bf_$" to '\\'
    return FieldValueHandler::replaceSmartTagWithValue($phReplaceToBackslash);
  }

  /**
   * @param $element @exmp $element = 'fld-wrp'
   */
  public function icon($icnPropName, $element)
  {
    $hasIconImg = $this->property_exists_nested($this->_fld, $icnPropName, '', 1);
    $showPasswordIcon = $this->property_exists_nested($this->_fld, 'typ', 'password')
      && $this->property_exists_nested($this->_fld, 'config->showPasswordIcon', true);
    // For password suffix, render a shared suffix wrapper that can contain both
    // show/hide SVG and the configured suffix image (in this order).
    if ('suf-i' === $element && ($hasIconImg || $showPasswordIcon)) {
      $toggleButton = '';
      $suffixIconImg = '';
      if ($showPasswordIcon) {
        $fieldKey = $this->esc_attr($this->_fk);
        $toggleBtnId = "bf-pw-showhide-btn-{$fieldKey}";
        $toggleSlashId = "bf-pw-eye-{$fieldKey}";
        $toggleButton = '<button id="' . $toggleBtnId . '" class="show-hide-password-btn" data-fldkey="' . $fieldKey . '" type="button" title="Show password" aria-label="Show password" aria-pressed="false" style="height: 20px; width: 20px; cursor: pointer; border: none; background: none; padding: 0; margin: 0; outline: none;">'
          . '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="20">'
          . '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />'
          . '<circle cx="12" cy="12" r="3" />'
          . '<path d="M20 4l-16 16" id="' . $toggleSlashId . '" style="display: none;"/>'
          . '</svg>'
          . '</button>';
      }

      if ($hasIconImg) {
        $suffixIconImg = '<img'
          . $this->getCustomAttributes($element)
          . ' src="' . $this->esc_url($this->_fld->{$icnPropName}) . '"'
          . ' alt=""'
          . ' aria-hidden="true"'
          . '/>';
      }
      if ($toggleButton) {
        return '<div class="' . $this->getAtomicCls($element) . ' ' . $this->getCustomClasses($element) . '">'
          . $toggleButton
          . $suffixIconImg
          . '</div>';
      }
    }

    if ($hasIconImg) {
      return '<img'
        . $this->getCustomAttributes($element)
        . ' class="' . $this->getAtomicCls($element) . ' ' . $this->getCustomClasses($element) . '"'
        . ' src="' . $this->esc_url($this->_fld->{$icnPropName}) . '"'
        . ' alt=""'
        . ' aria-hidden="true"'
        . '/>';
    }
    return '';
  }

  public function property_exists_nested($obj, $path = '', $valToCheck = null, $checkNegativeVal = 0)
  {
    $path = explode('->', $path);
    $current = $obj;
    foreach ($path as $key) {
      if (is_object($current)) {
        if (property_exists($current, $key)) {
          $current = $current->{$key};
        } else {
          return false;
        }
      } else {
        break;
      }
    }
    if (isset($valToCheck)) {
      if ($checkNegativeVal) {
        return $current !== $valToCheck;
      }
      return $current === $valToCheck;
    }
    return true;
  }

  public function required()
  {
    if ($this->property_exists_nested($this->_fld, 'valid->req', true) && $this->property_exists_nested($this->_fld, 'err->req->show', true)) {
      return 'required';
    }

    return '';
  }

  public function disabled()
  {
    if ($this->property_exists_nested($this->_fld, 'valid->disabled', true)) {
      return 'disabled';
    }
    return '';
  }

  public function mn()
  {
    if ($this->property_exists_nested($this->_fld, 'mn', '', 1)) {
      return "min='{$this->esc_attr($this->_fld->mn)}'";
    }
    return '';
  }

  public function mx()
  {
    if ($this->property_exists_nested($this->_fld, 'mx', '', 1)) {
      return "max='{$this->esc_attr($this->_fld->mx)}'";
    }
    return '';
  }

  public function minlength()
  {
    if ($this->property_exists_nested($this->_fld, 'valid->minlength', '', 1)) {
      return "minlength='{$this->esc_attr($this->_fld->valid->minlength)}'";
    }
    return '';
  }

  public function maxlength()
  {
    if ($this->property_exists_nested($this->_fld, 'valid->maxlength', '', 1)) {
      return "maxlength='{$this->esc_attr($this->_fld->valid->maxlength)}'";
    }
    return '';
  }

  public function maxword()
  {
    if ($this->property_exists_nested($this->_fld, 'valid->maxword', '', 1)) {
      return "data-maxword='{$this->esc_attr($this->_fld->valid->maxword)}'";
    }
    return '';
  }

  public function minword()
  {
    if ($this->property_exists_nested($this->_fld, 'valid->minword', '', 1)) {
      return "data-minword='{$this->esc_attr($this->_fld->valid->minword)}'";
    }
    return '';
  }

  public function inputMode()
  {
    if ($this->property_exists_nested($this->_fld, 'inputMode', '', 1)) {
      return "inputMode='{$this->esc_attr($this->_fld->inputMode)}'";
    }
    return '';
  }

  public function readonly()
  {
    if ($this->property_exists_nested($this->_fld, 'readonly', true)) {
      return 'readonly';
    }
    if ($this->property_exists_nested($this->_fld, 'valid->readonly', true)) {
      return 'readonly';
    }
    return '';
  }

  public function placeholder()
  {
    if ($this->property_exists_nested($this->_fld, 'ph', '', 1)) {
      return "placeholder='{$this->esc_attr($this->replaceToBackSlash($this->_fld->ph))}'";
    }
    return '';
  }

  /**
   * @param $str
   * for attribute value
   * @return string
   */
  public function esc_attr($str)
  {
    return esc_attr($str);
  }

  /**
   * @param $str
   * for html content that don't need any html markup
   * @return string
   */
  public function esc_html($str)
  {
    return esc_html($str);
  }

  /**
   * @param $str
   * for textarea content
   * @return string
   */
  public function esc_textarea($str)
  {
    return esc_textarea($str);
  }

  /**
   * @param $str
   * for url
   * @return string
   */
  public function esc_url($str)
  {
    return esc_url($str);
  }

  /**
   * @param $str
   * for content that needs html markup but escapes all scripts
   * @return string
   */
  public function kses_post($str)
  {
    return wp_kses_post($str);
  }

  public function name()
  {
    if ($this->property_exists_nested($this->_fld, 'fieldName', '', 1)) {
      if ($this->property_exists_nested($this->_fld, 'typ', 'check')) {
        return "name='{$this->esc_attr($this->_fld->fieldName)}[]'";
      }
      if ($this->property_exists_nested($this->_fld, 'typ', 'file-up') && $this->property_exists_nested($this->_fld, 'config->multiple', true)) {
        return "name='{$this->esc_attr($this->_fld->fieldName)}[]'";
      }
      if (
        $this->property_exists_nested($this->_fld, 'typ', 'image-select')
        && $this->property_exists_nested($this->_fld, 'inpType', 'checkbox')
      ) {
        return "name='{$this->esc_attr($this->_fld->fieldName)}[]'";
      }
      return "name='{$this->esc_attr($this->_fld->fieldName)}'";
    }
    return '';
  }

  public function value()
  {
    $val = '';
    if ($this->property_exists_nested($this->_fld, 'val', '', 1)) {
      $val = $this->_fld->val;
    } elseif ($this->property_exists_nested($this->_fld, 'defaultValue', '', 1)) {
      $val = FieldValueHandler::replaceSmartTagWithValue($this->_fld->defaultValue);
    }
    if (isset($val) && '' !== $val && 'textarea' !== $this->_fld->typ) {
      return "value='{$this->esc_attr($val)}'";
    }
    return $val;
  }

  public function autoComplete()
  {
    if ($this->property_exists_nested($this->_fld, 'ac', '', 1)) {
      return "autocomplete='{$this->esc_attr($this->_fld->ac)}'";
    }
    return '';
  }

  // getter & setter function for $_fk
  public function getFk()
  {
    return $this->_fk;
  }

  public function setFk($fk)
  {
    $this->_fk = $fk;
  }

  public function getFieldKeyWithContentCount()
  {
    $bfFrontendFormIds = FrontendHelpers::$bfFrontendFormIds;
    $contentCount = count($bfFrontendFormIds);
    return "{$this->_fk}-{$contentCount}";
  }

  public function isChecked()
  {
    if (!isset($this->_fld->val)) {
      return false;
    }
    $checked = false;
    $msg = $this->_fld->msg;
    foreach ($msg as $status => $value) {
      if ($value === $this->_fld->val) {
        if ('checked' === $status) {
          $checked = true;
          break;
        }
      }
    }

    return $checked;
  }

  /**
   * Get error message container ID for accessibility
   * @return string
   */
  public function getErrorId()
  {
    return "{$this->_fk}-err-txt";
  }

  /**
   * Get helper text container ID for accessibility
   * @return string
   */
  public function getHelperTextId()
  {
    return "{$this->_fk}-hlp-txt";
  }

  /**
   * Get label ID for accessibility (aria-labelledby)
   * @return string
   */
  public function getLabelId()
  {
    $bfFrontendFormIds = FrontendHelpers::$bfFrontendFormIds;
    $contentCount = count($bfFrontendFormIds);
    return "{$this->_fk}-{$contentCount}-lbl";
  }

  /**
   * Check if field has helper text
   * @return bool
   */
  public function hasHelperText()
  {
    return $this->property_exists_nested($this->_fld, 'helperTxt', '', 1);
  }

  /**
   * Generate aria-describedby attribute linking to helper text and error message
   * @return string
   */
  public function ariaDescribedBy()
  {
    $ids = [];
    if ($this->hasHelperText()) {
      $ids[] = $this->getHelperTextId();
    }
    // Always include error ID so it can be announced when errors appear
    $ids[] = $this->getErrorId();

    return !empty($ids) ? 'aria-describedby="' . implode(' ', $ids) . '"' : '';
  }

  /**
   * Generate aria-required attribute for required fields
   * @return string
   */
  public function ariaRequired()
  {
    if ($this->property_exists_nested($this->_fld, 'valid->req', true)) {
      return 'aria-required="true"';
    }
    return '';
  }

  /**
   * Get the field data object
   * @return object
   */
  public function getFieldData()
  {
    return $this->_fld;
  }
}
