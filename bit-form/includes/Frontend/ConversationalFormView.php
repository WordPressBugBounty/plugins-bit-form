<?php

namespace BitCode\BitForm\Frontend;

use BitCode\BitForm\Core\Database\FormModel;
use BitCode\BitForm\Core\Form\FormManager;
use BitCode\BitForm\Core\Util\Render;
use BitCode\BitForm\Frontend\Form\FrontendFormHandler;
use BitCode\BitForm\Frontend\Form\View\Conversational\ConversationalHelpers;

class ConversationalFormView
{
  public static function preview()
  {
    // Read-only: REQUEST_URI used to extract form ID from URL path for view dispatch. No state mutation.
    $requestUri = isset($_SERVER['REQUEST_URI']) ? esc_url_raw(wp_unslash($_SERVER['REQUEST_URI'])) : '';
    $uri = explode('/', $requestUri);

    if (is_array($uri) && count($uri) > 0) {
      $formID = $uri[count($uri) - 1];
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

      if (defined('BITAPPS_DEV') && BITAPPS_DEV) {
        set_transient('bitform_form_preview', true);
        $frontendFormHandler->generateJs($formID);
        $title = 'BitForm Preview page';
        Render::view('views/preview-page', compact('formID', 'title', 'formHTML', 'font', 'bfGlobals', 'formContent'));
      }
    }
  }

  private static function getCustomUrlFormId()
  {
    $urlMap = get_transient('bitform_conversational_url_map');
    if (false === $urlMap) {
      $urlMap = self::buildConversationalUrlMap();
      set_transient('bitform_conversational_url_map', $urlMap, DAY_IN_SECONDS);
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

  private static function buildConversationalUrlMap()
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
      if (empty($formContent->formInfo->conversationalSettings->enable)) {
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

  public static function conversationalFormView()
  {
    if (is_admin()) {
      return;
    }
    // Read-only: form ID and preview flag from query string for conversational form dispatch. No state mutation.
    $formID = isset($_GET['bit-conversational-form']) ? sanitize_text_field(wp_unslash($_GET['bit-conversational-form'])) : '';
    $formType = 'conversational';
    if (empty($formID)) {
      $formID = self::getCustomUrlFormId();
    }

    if (empty($formID)) {
      return '';
    }

    $formID = intval($formID);

    $isPreview = isset($_GET['bf_preview']);

    // ConversationalHelpers::setPreviewMode($isPreview);

    $attr = ['type'=> $formType, 'form_id' => $formID, 'form_preview' => true];

    $FormManager = FormManager::getInstance($formID);
    $formContent = $FormManager->getFormContent();
    if (empty($formContent->formInfo->conversationalSettings->enable)) {
      return;
    }

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
    $frontendFormHandler->generateJs($formID, null, $formType);
    $title = 'Bit Form';
    Render::view('views/conversational-form', compact('formID', 'title', 'formHTML', 'font', 'bfGlobals', 'isPreview', 'formContent'));

    exit(200);
  }
}
