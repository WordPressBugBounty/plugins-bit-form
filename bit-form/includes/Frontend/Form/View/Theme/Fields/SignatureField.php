<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

use BitCode\BitForm\Core\Util\FrontendHelpers;

class SignatureField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ClassicInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($field, $rowID, $form_atomic_Cls_map, $value);
    return $inputWrapper->wrapper($input);
  }

  private static function field($field, $rowID, $form_atomic_Cls_map, $value)
  {
    $fieldHelpers = new ClassicFieldHelpers($field, $rowID, $form_atomic_Cls_map);

    $name = $fieldHelpers->name();
    $req = $fieldHelpers->required();

    $clrBtnContent = '';
    $undoBtnContent = '';
    $redoBtnContent = '';

    $bfFrontendFormIds = FrontendHelpers::$bfFrontendFormIds;
    $contentCount = count($bfFrontendFormIds);

    $clrBtnPreIcn = $fieldHelpers->icon('clrPreIcn', 'clr-btn-pre-i');
    $clrBtnSufIcn = $fieldHelpers->icon('clrSufIcn', 'clr-btn-suf-i');
    $undoBtnPreIcn = $fieldHelpers->icon('undoPreIcn', 'undo-btn-pre-i');
    $undoBtnSufIcn = $fieldHelpers->icon('undoSufIcn', 'undo-btn-suf-i');
    $redoBtnPreIcn = $fieldHelpers->icon('redoPreIcn', 'redo-btn-pre-i');
    $redoBtnSufIcn = $fieldHelpers->icon('redoSufIcn', 'redo-btn-suf-i');

    if (property_exists($field, 'clrBtnHide') && !$field->clrBtnHide) {
      $clrBtnContent = <<<CLRBTN
      <button
        aria-label="Signature pad clear button"
        class="{$fieldHelpers->getAtomicCls('clr-btn')} {$fieldHelpers->getCustomClasses('clr-btn')}"
        type="button"
        {$fieldHelpers->getCustomAttributes('clr-btn')}
      >
        {$clrBtnPreIcn}
        {$field->clrBtn}
        {$clrBtnSufIcn}
      </button>
    
CLRBTN;
    }

    if (property_exists($field, 'undoBtnHide') && !$field->undoBtnHide) {
      $undoBtnContent = <<<UNDOBTN
        <button
          aria-label="Signature pad undo button"
          class="{$fieldHelpers->getAtomicCls('undo-btn')} {$fieldHelpers->getCustomClasses('undo-btn')}"
          type="button"
          {$fieldHelpers->getCustomAttributes('undo-btn')}
        >
          {$undoBtnPreIcn}  
          {$field->undoBtn}
          {$undoBtnSufIcn}
        </button>
UNDOBTN;
    }

    if (property_exists($field, 'redoBtnHide') && !$field->redoBtnHide) {
      $redoBtnContent = <<<REDOBTN
        <button
          aria-label="Signature pad redo button"
          class="{$fieldHelpers->getAtomicCls('redo-btn')} {$fieldHelpers->getCustomClasses('redo-btn')}"
          type="button"
          {$fieldHelpers->getCustomAttributes('redo-btn')}
        >
          {$redoBtnPreIcn}  
          {$field->redoBtn}
          {$redoBtnSufIcn}
        </button>
REDOBTN;
    }

    return <<<SIGNATUREFIELD
    <div 
      {$fieldHelpers->getCustomAttributes('inp-fld-wrp')}
      class="{$fieldHelpers->getAtomicCls('inp-fld-wrp')} {$fieldHelpers->getCustomClasses('inp-fld-wrp')}"
    >
      <input
        type="text"
        {$name}
        class="d-none {$rowID}-signature-fld bf-signature-hidden-input"
        {$req}
        value=""
      />
      <canvas
        tabindex="0"
        aria-label="Signature pad"
        id="{$rowID}-{$contentCount}"
        class="{$fieldHelpers->getAtomicCls('signature-pad')} {$fieldHelpers->getCustomClasses('signature-pad')}"
        {$fieldHelpers->getCustomAttributes('signature-pad')}
      >
      </canvas>

      <div aria-label="Signature pad control buttons" class="{$fieldHelpers->getAtomicCls('ctrl')} {$fieldHelpers->getCustomClasses('ctrl')}">
        {$clrBtnContent}
        {$undoBtnContent}
        {$redoBtnContent}
      </div>

      <iframe class="{$fieldHelpers->getAtomicCls('signature-iframe')}"></iframe>
    </div>
SIGNATUREFIELD;
  }
}
