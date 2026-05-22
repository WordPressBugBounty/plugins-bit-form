<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

use BitCode\BitForm\Frontend\Form\View\FieldHelpers;

class ClassicFieldHelpers extends FieldHelpers
{
  public function __construct($field, $fk, $form_atomic_Cls_map = null, $formID = null)
  {
    parent::__construct($field, $fk, $form_atomic_Cls_map, $formID);
  }
}
