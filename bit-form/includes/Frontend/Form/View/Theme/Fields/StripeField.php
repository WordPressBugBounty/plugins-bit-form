<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

class StripeField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ClassicInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    return $inputWrapper->wrapper($input);
  }

  private static function field($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $fieldHelpers = new ClassicFieldHelpers($field, $rowID, $form_atomic_Cls_map);

    if ($fieldHelpers->property_exists_nested($field, 'config->linkAuthentication->active', true)) {
      $linkAuthentication = <<<LINK_AUTHENTICATION
        <div class="{$rowID}-stripe-auth-wrp"></div>
LINK_AUTHENTICATION;
    } else {
      $linkAuthentication = '';
    }

    if ($fieldHelpers->property_exists_nested($field, 'config->address->active', true) && $fieldHelpers->property_exists_nested($field, 'config->address->mode', 'billing')) {
      $address = <<<ADDRESS
        <div class="{$rowID}-stripe-addr-wrp"></div>
ADDRESS;
    } else {
      $address = '';
    }

    return <<<STRIPEFIELD
      <div class="{$fieldHelpers->getAtomicCls('stripe-wrp')}">
      <button type="button" class="{$fieldHelpers->getAtomicCls('stripe-btn')}">
      <svg xmlns="http://www.w3.org/2000/svg" class="{$fieldHelpers->getAtomicCls('stripe-icn')}" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
          <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
          <path fill="currentColor" d="M6.936 3.715C8.326 2.567 10.24 2 12.404 2c1.746 0 3.49.275 5.259.981a1 1 0 0 1 .629.929v3.64c0 1.244-1.286 1.916-2.291 1.5c-1.198-.494-2.532-.759-3.597-.759c-.217 0-.386.016-.512.04c-.05.01-.089.02-.12.03c.089.072.25.17.528.29c.309.134.68.263 1.129.416l.061.02c.42.144.892.305 1.367.495c.99.396 2.094.954 2.95 1.882c.885.957 1.445 2.241 1.45 3.954v.003c0 2.065-.835 3.755-2.305 4.904C15.511 21.454 13.542 22 11.34 22a14.62 14.62 0 0 1-5.777-1.21a1 1 0 0 1-.604-.918V16.18c0-1.241 1.297-1.937 2.322-1.47c1.39.636 2.901 1.038 4.059 1.038c.497 0 .761-.073.87-.134a.255.255 0 0 0 .017-.01a.352.352 0 0 0 .005-.062v-.005a.34.34 0 0 0-.04-.05c-.084-.086-.25-.205-.56-.353a13.21 13.21 0 0 0-1.112-.444a146.78 146.78 0 0 0-.22-.08c-.373-.135-.782-.283-1.189-.448c-.973-.395-2.066-.935-2.916-1.81c-.882-.908-1.453-2.127-1.453-3.753c0-2.026.782-3.717 2.194-4.883ZM8.21 5.257c-.918.758-1.467 1.866-1.467 3.34c0 1.104.366 1.824.888 2.361c.555.571 1.334.985 2.233 1.349c.369.15.736.283 1.107.417l.234.085c.437.16.888.329 1.288.519c.713.34 1.74.97 1.74 2.213c0 .375-.083.744-.277 1.077a2.015 2.015 0 0 1-.766.74c-.561.314-1.243.39-1.85.39c-1.373 0-2.957-.408-4.38-.998v2.447c1.503.562 3.001.803 4.38.803c1.898 0 3.388-.473 4.381-1.249c.964-.754 1.537-1.852 1.538-3.327c-.005-1.234-.39-2.03-.92-2.602c-.556-.603-1.334-1.026-2.223-1.382c-.426-.17-.855-.316-1.285-.463l-.047-.017a17.654 17.654 0 0 1-1.278-.473c-.387-.168-.809-.387-1.142-.703c-.362-.344-.634-.819-.634-1.424c0-.72.328-1.323.936-1.683c.52-.308 1.157-.385 1.739-.385c1.203 0 2.597.259 3.888.728V4.608C15.002 4.177 13.717 4 12.404 4c-1.836 0-3.255.481-4.195 1.257Z" />
        </g>
      </svg>
        {$fieldHelpers->kses_post($field->txt)}
        <svg width="25" height="25" class="stripe-btn-spinner d-none" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0"
                xml:space="preserve">
                <path fill="#fff"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                    to="360 50 50" repeatCount="indefinite" />
                </path>
              </svg>
      </button>
      $linkAuthentication
      $address
      <div class="{$fieldHelpers->getAtomicCls('stripe-fld')} d-none"></div>
      </div>
STRIPEFIELD;
  }
}
