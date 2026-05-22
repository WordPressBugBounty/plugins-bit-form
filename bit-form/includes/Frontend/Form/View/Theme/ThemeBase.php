<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme;

use BitCode\BitForm\Frontend\Form\View\Theme\Fields\ButtonField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\CheckBoxField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\CountryField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\CurrencyField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\DecisionBoxField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\DividerField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\DropdownField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\FieldWithChild;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\FileUploadField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\GDPRAgreementField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\HCaptchaField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\HiddenField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\HTMLField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\HtmlSelectField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\ImageField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\ImageSelectField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\PhoneNumberField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\RadioBoxField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\RatingField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\RecaptchaV2Field;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\RepeaterField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\SectionField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\SliderField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\SpacerField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\TextAreaField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\TextField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\TitleField;
use BitCode\BitForm\Frontend\Form\View\Theme\Fields\TurnstileField;

class ThemeBase
{
  private $_nestedLayout;
  private $_formViewerInstance;

  public function inputWrapper($formViewInstance, $rowID)
  {
    $field = $formViewInstance->fields($rowID);
    $field_name = $formViewInstance->getFieldName($rowID);
    $form_atomic_Cls_map = $formViewInstance->getAtomicClaMap();
    $error = $formViewInstance->getError($rowID);
    $value = $formViewInstance->getValue($field_name, $rowID);
    $formID = $formViewInstance->getFormID();
    $this->_nestedLayout = $formViewInstance->getNestedLayout($rowID);
    $this->_formViewerInstance = $formViewInstance;

    // $isHidden = !empty($field->valid->hide) && $field->valid->hide ? 'vis-n' : null;
    $isHidden = !empty($field->valid->hide) && $field->valid->hide ? 'fld-hide' : null;
    // $isReqSym = empty($field->valid->req) ? null : ' <span class="fld-req-symbol">*</span>';
    // $noLabel = ['decision-box', 'html', 'button', 'paypal', 'razorpay', 'recaptcha'];
    // $fieldLbl = "";

    // if (!in_array($field->typ, $noLabel) && isset($field->lbl)) {
    //   $replaceToBackslash = str_replace('$_bf_$', '\\', $field->lbl);
    //   $fieldLbl = FieldValueHandler::replaceSmartTagWithValue($replaceToBackslash);
    // }

    // if (isset($field->ph)) {
    //   $phReplaceToBackslash = str_replace('$_bf_$', '\\', $field->ph);
    //   $field->ph = FieldValueHandler::replaceSmartTagWithValue($phReplaceToBackslash);
    // }

    // $lbl = (!in_array($field->typ, $noLabel) && !isset($field->valid->hideLbl) && isset($field->lbl)) ? "<label class='fld-lbl fld-lbl-$formID' for='$rowID'>" . esc_html($fieldLbl) . $isReqSym . "</label>" : "";

    // $err = (isset($error) && !empty($error)) ? $error : "";
    // $errStyle = !empty($err) ? "style='height: auto'" : "";
    $fieldHTML = $this->getField($field, $rowID, $field_name, $form_atomic_Cls_map, $error, $value, $formID);
    // $errHTML = '';
    //     if ($err || isset($field->err)) {
    //       $errHTML = <<<ERRORHTML
    //         <div class="error-wrapper" $errStyle>
    //           <div id="$rowID-error" class="error-txt">$err</div>
    //         </div>
    // ERRORHTML;
    //     }

    return sprintf('<div class="btcd-fld-itm %1$s %2$s">%3$s</div>', $rowID, $isHidden, $fieldHTML);

    // return $fieldHTML;
  }

  protected function getField($field, $rowID, $field_name, $form_atomic_Cls_map, $error = null, $value = null, $formID = null)
  {
    // Pro-only fields ship in the Bit Form Pro plugin. In the free plugin, we avoid rendering Pro implementations.
    $proMissingHtml = '<div class="bf-pro-field-missing"> <!-- Require Bit Form Pro --> </div>';

    switch ($field->typ) {
      case 'text':
      case 'username':
      case 'number':
      case 'url':
      case 'date':
      case 'datetime-local':
      case 'time':
      case 'month':
      case 'week':
      case 'color':
        return TextField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'password':
      case 'email':
      case 'name':
        return FieldWithChild::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'textarea':
        return TextAreaField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'range':
        return SliderField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'check':
        // return $this->checkBox($field, $rowID, $field_name, $formID, $error, $value);
        return CheckBoxField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'radio':
        // return $this->radioBox($field, $rowID, $field_name, $formID, $error, $value);
        return RadioBoxField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'html-select':
        return HtmlSelectField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'select':
        // return $this->dropDown($field, $rowID, $field_name, $formID, $error, $value);
        return DropdownField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'file-up':
        // return $this->fileUp($field, $rowID, $field_name, $formID, $error, $value);
        return FileUploadField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'recaptcha':
        return RecaptchaV2Field::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'turnstile':
        return TurnstileField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'hcaptcha':
        return HCaptchaField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'decision-box':
        // return $this->decisionBox($field, $rowID, $field_name, $formID, $error, $value);
        return DecisionBoxField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'gdpr':
        return GDPRAgreementField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'html':
        // return $this->html($field, $rowID, $field_name, $formID, $error, $value);
        return HTMLField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'shortcode':
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\ShortcodeField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\ShortcodeField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
      case 'hidden':
        return HiddenField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'paypal':
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\PayPalField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\PayPalField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
      case 'stripe':
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\StripeField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\StripeField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
      case 'mollie':
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\MollieField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\MollieField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
      case 'razorpay':
        // return $this->razorPay($field, $rowID, $field_name, $formID, $error, $value);
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\RazorPayField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\RazorPayField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
        // case 'submit':
        //   return $this->submitBtns($field, $rowID, $field_name, $formID, $error, $value);
      case 'button':
        // return $this->button($field, $rowID, $field_name, $formID, $error, $value);
        return ButtonField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'title':
        // return $this->button($field, $rowID, $field_name, $formID, $error, $value);
        return TitleField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'divider':
        // return $this->button($field, $rowID, $field_name, $formID, $error, $value);
        return DividerField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'spacer':
        return SpacerField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'country':
        return CountryField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'currency':
        return CurrencyField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'phone-number':
        return PhoneNumberField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'advanced-file-up':
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\AdvanceFileUpField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\AdvanceFileUpField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
      case 'image':
        return ImageField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'section':
        return SectionField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $this->_formViewerInstance, $this->_nestedLayout, $error, $value);
      case 'repeater':
        return RepeaterField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $this->_formViewerInstance, $this->_nestedLayout, $error, $value);
      case 'signature':
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\SignatureField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\SignatureField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
      case 'email-otp':
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\EmailOtpField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\EmailOtpField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
      case 'rating':
        return RatingField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'image-select':
        return ImageSelectField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
      case 'advanced-datetime':
        if (class_exists('\BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\AdvanceDateTimeField')) {
          return \BitCode\BitFormPro\Frontend\Form\View\Theme\Fields\AdvanceDateTimeField::init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
        }
        return $proMissingHtml;
      default:
        break;
    }
  }
}
