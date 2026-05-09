<?php

namespace BitCode\BitForm\Frontend;

use BitCode\BitForm\Core\Database\FormModel;
use BitCode\BitForm\Core\Form\FormManager;
use BitCode\BitForm\Core\Util\Render;
use BitCode\BitForm\Frontend\Form\FrontendFormHandler;

class StandaloneFormView
{
  public static function preview()
  {
    if (!(current_user_can('manage_options') || current_user_can('manage_bitform'))) {
      auth_redirect();
      return;
    }
    // $requestUri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '';
    // ('Request URI: ' . $requestUri);
    // $uri = explode('/', rtrim($requestUri, '/'));
    // Read-only: form ID from query string for view dispatch. No state mutation.
    $formID = isset($_REQUEST['bitform-form-view']) && is_scalar($_REQUEST['bitform-form-view']) ? intval(sanitize_text_field(wp_unslash($_REQUEST['bitform-form-view']))) : null;
    if (!is_array($formID) && is_numeric($formID)) {
      $attr = ['form_id' => $formID, 'form_preview' => true];

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
      $frontendFormHandler->generateJs($formID);
      $title = 'BitForm Preview page';
      Render::view('views/preview-page', compact('formID', 'title', 'formHTML', 'font', 'bfGlobals', 'formContent'));
    }
  }

  private static function getCustomUrlFormId()
  {
    $urlMap = get_transient('bitform_standalone_url_map');
    if (false === $urlMap) {
      $urlMap = self::buildStandaloneUrlMap();
      set_transient('bitform_standalone_url_map', $urlMap, DAY_IN_SECONDS);
    }

    if (empty($urlMap)) {
      return null;
    }

    $currentUrl = get_site_url() . (isset($_SERVER['REQUEST_URI']) ? esc_url_raw(wp_unslash($_SERVER['REQUEST_URI'])) : '');
    $parsedCurrentUrl = wp_parse_url($currentUrl);

    foreach ($urlMap as $formID => $customUrlSlug) {
      $customUrl = get_site_url() . '/' . $customUrlSlug;
      $parsedCustomUrl = wp_parse_url($customUrl);
      $pathMatched = isset($parsedCustomUrl['path']) && $parsedCustomUrl['path'] === ($parsedCurrentUrl['path'] ?? '');
      if (!$pathMatched) {
        continue;
      }
      if (!isset($parsedCustomUrl['query'])) {
        return $formID;
      }
      parse_str($parsedCustomUrl['query'], $parsedCustomQueries);
      parse_str($parsedCurrentUrl['query'] ?? '', $parsedCurrentQueries);
      if (empty(array_diff_assoc($parsedCustomQueries, $parsedCurrentQueries))) {
        return $formID;
      }
    }

    return null;
  }

  private static function buildStandaloneUrlMap()
  {
    $formModel = new FormModel();
    $forms = $formModel->get(['id', 'form_content']);
    $urlMap = [];
    if (is_wp_error($forms) || !is_array($forms)) {
      return $urlMap;
    }
    foreach ($forms as $form) {
      $formContent = json_decode($form->form_content);
      if (empty($formContent->formInfo->standaloneSettings->active)) {
        continue;
      }
      $standaloneSettings = $formContent->formInfo->standaloneSettings;
      if (empty($standaloneSettings->customUrl)) {
        continue;
      }
      $urlMap[$form->id] = $standaloneSettings->customUrl;
    }
    return $urlMap;
  }

  public static function standaloneFormView()
  {
    if (is_admin()) {
      return;
    }
    // Read-only: form ID from query string for standalone view dispatch. No state mutation.
    $hasBitFormParam = isset($_GET['bit-form']);
    $formID = isset($_GET['bit-form']) ? sanitize_text_field(wp_unslash($_GET['bit-form'])) : '';

    if (empty($formID)) {
      $formID = self::getCustomUrlFormId();
    }

    if (empty($formID)) {
      return '';
    }

    $formID = intval($formID);
    $attr = ['form_id' => $formID, 'form_preview' => true];

    $FormManager = FormManager::getInstance($formID);
    $formContent = $FormManager->getFormContent();
    if (empty($formContent->formInfo->standaloneSettings->active)) {
      return;
    }

    $standaloneSettings = $formContent->formInfo->standaloneSettings;

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
    $frontendFormHandler->generateJs($formID);
    $title = !empty($standaloneSettings->pageTitle) ? $standaloneSettings->pageTitle : 'Bit Form';
    Render::view('views/standalone-form', compact('formID', 'title', 'formHTML', 'font', 'bfGlobals', 'formContent'));

    exit(200);
  }
}
