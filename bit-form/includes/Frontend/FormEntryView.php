<?php

namespace BitCode\BitForm\Frontend;

use BitCode\BitForm\Core\Util\Render;
use BitCode\BitForm\Frontend\Form\FrontendFormHandler;

class FormEntryView
{
  public static function preview()
  {
    $requestUri = $_SERVER['REQUEST_URI'];
    $uri = explode('/', $requestUri);

    if (is_array($uri) && count($uri) > 0) {
      $formID = $uri[count($uri) - 2];
      $entryID = $uri[count($uri) - 1];
      $attr = ['form_id' => $formID, 'entry_id' => $entryID, 'form_preview' => true];

      $frontendFormHandler = new FrontendFormHandler();
      $formViewObject = $frontendFormHandler->handleFrontendRenderRequest($attr);
      if ('string' === gettype($formViewObject)) {
        Render::view('views/form-not-found');
        exit;
      }

      $formHTML = $formViewObject->html;
      $font = $formViewObject->font;
      $bfGlobals = $formViewObject->bfGlobals;

      set_transient('bitform_form_preview', true);
      $frontendFormHandler->generateJs($formID, $entryID);
      $title = 'BitForm Entry edit';
      Render::view('views/entry-edit-page', compact('formID', 'title', 'formHTML', 'font', 'bfGlobals'));
    }
  }
}
