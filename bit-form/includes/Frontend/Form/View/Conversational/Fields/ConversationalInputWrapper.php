<?php

namespace BitCode\BitForm\Frontend\Form\View\Conversational\Fields;

use BitCode\BitForm\Core\Util\FrontendHelpers;
use BitCode\BitForm\Frontend\Form\View\InputWrapper;

class ConversationalInputWrapper extends InputWrapper
{
  private $_fieldData;
  private $_fieldKey;
  private $_error;
  private $_fieldHelpers;

  public function __construct($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    parent::__construct($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $this->_fieldData = $field;
    $this->_fieldKey = $rowID;
    $this->_error = $error;
    $this->_fieldHelpers = new ConversationalFieldHelpers($formID, $field, $rowID, $form_atomic_Cls_map);
  }

  public function wrapper($field, $noLabel = false, $noErrMsg = false)
  {
    $labelWrapper = !$noLabel ? $this->labelWrapper() : '';
    $helperText = $this->helperText();
    $error = !$noErrMsg ? $this->errorMessages() : '';
    $inputWrapper = sprintf(
      '<div 
	      %1$s
	      class="%2$s %3$s"
	    > 
      
      %4$s
      <div 
        %5$s
        class="%6$s %7$s"
      > 
        %8$s
        %9$s
	        %10$s
	      </div>
	    </div>',
      $this->_fieldHelpers->getCustomAttributes('fld-wrp'), // 1
      $this->_fieldHelpers->getConversationalCls('fld-wrp'), // 2
      $this->_fieldHelpers->getCustomClasses('fld-wrp'), // 3
      $labelWrapper, // 4
      $this->_fieldHelpers->getCustomAttributes('inp-wrp'), // 5
      $this->_fieldHelpers->getConversationalCls('inp-wrp'), // 6
      $this->_fieldHelpers->getCustomClasses('inp-wrp'), // 7
      $field, // 8
      $helperText, // 9
      $error // 10
    );

    return $inputWrapper;
  }

  private function labelWrapper()
  {
    $_label = '';
    $_lblPreIcn = $this->conversationalIcon('lblPreIcn', 'lbl-pre-i');
    $_lblSufIcn = $this->conversationalIcon('lblSufIcn', 'lbl-suf-i');
    $_reqPre = '';
    $_reqPost = '';
    $_lbl = '';
    $_subtitle = '';
    $_subtitleText = '';
    $_subtitlePreIcn = $this->conversationalIcon('subTlePreIcn', 'sub-titl-pre-i');
    $_subtitlePostIcn = $this->conversationalIcon('subTleSufIcn', 'sub-titl-suf-i');
    if (property_exists($this->_fieldData, 'lbl')) {
      $replaceToBackSlash = $this->_fieldHelpers->replaceToBackSlash($this->_fieldData->lbl);
      $_lbl = wp_kses_post($this->_fieldHelpers->renderHTMR($replaceToBackSlash));
    }

    if (property_exists($this->_fieldData, 'subtitle')) {
      $replaceToBackSlash = $this->_fieldHelpers->replaceToBackSlash($this->_fieldData->subtitle);
      $_subtitleText = wp_kses_post($this->_fieldHelpers->renderHTMR($replaceToBackSlash));
    }

    // for pre required icon
    // aria-hidden="true" hides the asterisk from screen readers since the input
    // already has aria-required="true" which properly announces the required state.
    if (
      $this->_fieldHelpers->property_exists_nested($this->_fieldData, 'valid->req')
      && $this->_fieldHelpers->property_exists_nested($this->_fieldData, 'valid->reqShow', true)
      && $this->_fieldHelpers->property_exists_nested($this->_fieldData, 'valid->reqPos', 'before')
    ) {
      $_reqPre = sprintf(
        '<span 
	        %1$s
	        class="%2$s %3$s" 
          aria-hidden="true"
        >
	        *
	      </span>',
        $this->_fieldHelpers->getCustomAttributes('req-smbl'),
        $this->_fieldHelpers->getConversationalCls('req-smbl'),
        $this->_fieldHelpers->getCustomClasses('req-smbl')
      );
    }
    // for post required icon
    // Same as pre required icon - hide from assistive technology to prevent redundancy.
    if (
      $this->_fieldHelpers->property_exists_nested($this->_fieldData, 'valid->req')
      && $this->_fieldHelpers->property_exists_nested($this->_fieldData, 'valid->reqShow', true)
      && $this->_fieldHelpers->property_exists_nested($this->_fieldData, 'valid->reqPos', 'before', 1)
    ) {
      $_reqPost = sprintf(
        '<span 
	        %1$s
	        class="%2$s %3$s" 
          aria-hidden="true"
        >
	        *
	      </span>',
        $this->_fieldHelpers->getCustomAttributes('req-smbl'),
        $this->_fieldHelpers->getConversationalCls('req-smbl'),
        $this->_fieldHelpers->getCustomClasses('req-smbl')
      );
    }

    // for Label
    if (
      property_exists($this->_fieldData, 'lbl')
      // && isset($this->_fieldData->valid->hideLbl)
      // && $this->_fieldData->valid->hideLbl !== true
    ) {
      $bfFrontendFormIds = FrontendHelpers::$bfFrontendFormIds;
      $contentCount = count($bfFrontendFormIds);
      $labelId = $this->_fieldHelpers->getLabelId();
      $_label = sprintf(
        '<label 
          id="%1$s"
	        %2$s 
	        class="%3$s %4$s"
          for="%5$s-%6$s">
          %7$s
          %8$s
          %9$s
          %10$s
	        %11$s
	      </label>',
        $labelId, // 1
        $this->_fieldHelpers->getCustomAttributes('lbl'), // 2
        $this->_fieldHelpers->getConversationalMultiCls('lbl'), // 3
        $this->_fieldHelpers->getCustomClasses('lbl'), // 4
        $this->_fieldKey, // 5
        $contentCount, // 6
        $_reqPre, // 7
        $_lblPreIcn, // 8
        $_lbl, // 9
        $_lblSufIcn, // 10
        $_reqPost // 11
      );
    }

    // for subtitle
    if (property_exists($this->_fieldData, 'subtitle') && $this->_fieldData->subtitleHide) {
      $_subtitle = sprintf(
        '<div 
	        %1$s
	        class="%2$s %3$s" 
      >
        %4$s
        %5$s
	        %6$s
	      </div>',
        $this->_fieldHelpers->getCustomAttributes('sub-titl'),
        $this->_fieldHelpers->getConversationalMultiCls('sub-titl'),
        $this->_fieldHelpers->getCustomClasses('sub-titl'),
        $_subtitlePreIcn,
        $_subtitleText,
        $_subtitlePostIcn
      );
    }
    return sprintf(
      '      <div 
	        %1$s
	        class="%2$s %3$s" 
      >
	        %4$s
	        %5$s
	      </div>',
      $this->_fieldHelpers->getCustomAttributes('lbl-wrp'),
      $this->_fieldHelpers->getConversationalCls('lbl-wrp'),
      $this->_fieldHelpers->getCustomClasses('lbl-wrp'),
      $_label,
      $_subtitle
    );
  }

  private function helperText()
  {
    $_helperTxtPreIcn = $this->conversationalIcon('hlpPreIcn', 'hlp-txt-pre-i');
    $_helperTxtSufIcn = $this->conversationalIcon('hlpSufIcn', 'hlp-txt-suf-i');
    $_helperTxt = '';

    if (isset($this->_fieldData->helperTxt)) {
      $_helperTxt = wp_kses_post($this->_fieldHelpers->renderHTMR($this->_fieldData->helperTxt));
    }

    if (property_exists($this->_fieldData, 'helperTxt') && $this->_fieldData->helperTxt) {
      $helperTextId = $this->_fieldHelpers->getHelperTextId();
      $_helperTxt = sprintf(
        '<div 
          id="%1$s"
	        %2$s
          class="%3$s %4$s" 
        >
          %5$s
	        %6$s
	        %7$s
	      </div>',
        $helperTextId,
        $this->_fieldHelpers->getCustomAttributes('hlp-txt'),
        $this->_fieldHelpers->getConversationalMultiCls('hlp-txt'),
        $this->_fieldHelpers->getCustomClasses('hlp-txt'),
        $_helperTxtPreIcn,
        $_helperTxt,
        $_helperTxtSufIcn
      );
    }

    // for helper text
    return $_helperTxt;
  }

  public function errorMessages()
  {
    $_errorPreIcn = $this->conversationalIcon('errPreIcn', 'err-txt-pre-i');
    $_errorSufIcn = $this->conversationalIcon('errSufIcn', 'err-txt-suf-i');
    $_error = '';
    $_style = 'opacity: 0 !important; height: 0px !important;';

    if ($this->_error) {
      $_error = wp_kses_post($this->_error);
      $_style = 'margin-top: 5px !important; height: 9px !important;';
    }

    $errorId = $this->_fieldHelpers->getErrorId();
    $errMsgStart = '';
    $errMsgEnd = '';
    $msgStyle = "style='display: none !important;'";
    $errMsgAtomicCls = $this->_fieldHelpers->getConversationalMultiCls('err-msg');
    $errMsgCustomCls = $this->_fieldHelpers->getCustomClasses('err-msg');
    $errMsgCustomAttr = $this->_fieldHelpers->getCustomAttributes('err-msg');
    if (!(empty($_errorPreIcn) && empty($_errorSufIcn))) {
      $errMsgStart = "<div {$errMsgCustomAttr} class='{$errMsgAtomicCls} {$errMsgCustomCls}' {$msgStyle}>";
      $errMsgEnd = '</div>';
      $msgStyle = '';
      $errMsgAtomicCls = '';
      $errMsgCustomCls = '';
      $errMsgCustomAttr = '';
    }

    return sprintf(
      '<div class="%1$s" role="alert" aria-atomic="true" aria-live="assertive"  style="%2$s">
        <div class="%3$s">
          %4$s
          %5$s
          <div id="%6$s" %7$s %8$s class="%9$s %10$s %11$s %12$s " %13$s>
            %14$s
          </div>
          %15$s
          %16$s
        </div>
	    </div>',
      $this->_fieldHelpers->getConversationalMultiCls('err-wrp'), // 1
      $_style, // 2
      $this->_fieldHelpers->getConversationalCls('err-inner'), // 3
      $errMsgStart, // 4
      $_errorPreIcn, // 5
      $errorId, // 6
      $this->_fieldHelpers->getCustomAttributes('err-txt'), // 7
      $errMsgCustomAttr, // 8
      $errMsgAtomicCls, // 9
      $errMsgCustomCls, // 10
      $this->_fieldHelpers->getConversationalMultiCls('err-txt'), // 11
      $this->_fieldHelpers->getCustomClasses('err-txt'), // 12
      $msgStyle, // 13
      $_error, // 14
      $_errorSufIcn, // 15
      $errMsgEnd // 16
    );
  }

  public function conversationalIcon($icnPropName, $element)
  {
    if ($this->_fieldHelpers->property_exists_nested($this->_fieldData, $icnPropName, '', 1)) {
      return sprintf(
        '<img
          %1$s
          class="%2$s %3$s"
          src="%4$s"
          alt=""
          aria-hidden="true"
        />
	',
        $this->_fieldHelpers->getCustomAttributes($element),
        $this->_fieldHelpers->getConversationalCls($element),
        $this->_fieldHelpers->getCustomClasses($element),
        $this->_fieldHelpers->esc_url($this->_fieldData->{$icnPropName})
      );
    }
    return '';
  }

  /**
   * Get the field helpers instance for external access
   * @return ConversationalFieldHelpers
   */
  public function getFieldHelpers()
  {
    return $this->_fieldHelpers;
  }
}
