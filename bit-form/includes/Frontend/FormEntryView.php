<?php

namespace BitCode\BitForm\Frontend;

use BitCode\BitForm\Core\Util\Render;
use BitCode\BitForm\Frontend\Form\FrontendFormHandler;

class FormEntryView
{
  public static function preview()
  {
    if (!(current_user_can('manage_options') || current_user_can('manage_bitform') || current_user_can('bitform_entry_edit'))) {
      auth_redirect();
      return;
    }
    // Read-only: REQUEST_URI and query params used for view dispatch. Capability check enforced above (line 12).
    $requestUri = isset($_SERVER['REQUEST_URI']) ? esc_url_raw(wp_unslash($_SERVER['REQUEST_URI'])) : '';
    $uri = explode('/', $requestUri);

    $formID = isset($_REQUEST['formId']) ? intval(sanitize_text_field(wp_unslash($_REQUEST['formId']))) : null;
    $entryID = isset($_REQUEST['entryId']) ? intval(sanitize_text_field(wp_unslash($_REQUEST['entryId']))) : null;

    if (!is_array($formID) && !is_array($entryID) && is_numeric($formID) && is_numeric($entryID)) {
      // $formID = $uri[count($uri) - 2];
      // $entryID = $uri[count($uri) - 1];
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
      $formContent = isset($formViewObject->formContent) ? $formViewObject->formContent : null;

      set_transient('bitform_form_preview', true);
      $frontendFormHandler->generateJs($formID, $entryID);
      $title = 'BitForm Entry edit';
      Render::view('views/entry-edit-page', compact('formID', 'title', 'formHTML', 'font', 'bfGlobals', 'formContent'));
    }
  }
}
