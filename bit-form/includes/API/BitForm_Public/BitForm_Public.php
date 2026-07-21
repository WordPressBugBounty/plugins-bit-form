<?php

namespace BitCode\BitForm\API\BitForm_Public;

use BitCode\BitForm\Core\Database\ApiModel;
use BitCode\BitForm\Core\Util\Utilities;

class BitForm_Public
{
  public static function getForms()
  {
    $db = new ApiModel();
    $forms = $db->getForm();
    return $forms;
  }

  public static function getFields($formId)
  {
    $db = new ApiModel();
    $formData = $db->getField($formId);
    if (!empty($formData)) {
      $unset_types = ['paypal', 'razorpay', 'stripe', 'recaptcha', 'hcaptcha'];
      $formRow = Utilities::firstRow($formData);
      $formContent = Utilities::jsonObj($formRow->form_content ?? '');
      if (!$formContent || !isset($formContent->fields)) {
        return (object) [];
      }
      foreach ($formContent->fields as $key => $field) {
        if (in_array($field->typ, $unset_types)) {
          unset($formContent->fields->{$key});
        }
      }
      return $formContent->fields;
    }
    return (object) [];
  }
}
