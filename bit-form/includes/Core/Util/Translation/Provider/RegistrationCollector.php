<?php

namespace BitCode\BitForm\Core\Util\Translation\Provider;

use BitCode\BitForm\Core\Database\FormModel;
use BitCode\BitForm\Core\Integration\IntegrationHandler;
use BitCode\BitForm\Core\Messages\EmailTemplateHandler;
use BitCode\BitForm\Core\Messages\SuccessMessageHandler;
use BitCode\BitForm\Core\Util\Translation\FormContentTranslator;
use BitCode\BitForm\Core\Util\Translation\TranslationManager;
use BitCode\BitForm\Core\Util\Utilities;

/**
 * Enumerates every translatable string of one form as [context => string] for
 * registration-capable providers. Context namespaces:
 *   fld-*, layout-*, mss-*, conv-*, additional-*  — form_content (walker)
 *   msg-content-{id}                              — success messages table
 *   mail-sub-{id} / mail-body-{id}                — email templates table
 *   redirect-url-{id}                             — redirectPage integrations
 *
 * Admin requests only (form save / translation screens), never on render.
 */
final class RegistrationCollector
{
  /**
   * @param mixed  $formId
   * @param string $rawContent already-loaded form_content JSON, skips the per-form query
   *
   * @return array<string,string>
   */
  public static function collectAllStrings($formId, $rawContent = null)
  {
    $formId = (int) $formId;
    if ($formId <= 0) {
      return [];
    }

    if (!is_string($rawContent)) {
      $form = (new FormModel())->get(['form_content'], ['id' => $formId]);
      $rawContent = (!is_wp_error($form) && isset($form[0]->form_content) && is_string($form[0]->form_content))
        ? $form[0]->form_content
        : '';
    }

    if (!TranslationManager::isFormTranslationEnabled($formId, $rawContent)) {
      return [];
    }

    $strings = [];

    if ('' !== $rawContent) {
      $decoded = Utilities::jsonObj($rawContent);
      if (is_object($decoded)) {
        $strings = FormContentTranslator::collect($decoded);
      }
    }

    $messages = (new SuccessMessageHandler($formId))->getAllMessage();
    if (is_array($messages)) {
      foreach ($messages as $message) {
        if (isset($message->id, $message->message_content) && is_string($message->message_content) && '' !== $message->message_content) {
          $strings["msg-content-{$message->id}"] = $message->message_content;
        }
      }
    }

    $templates = (new EmailTemplateHandler($formId))->getAllTemplate();
    if (is_array($templates)) {
      foreach ($templates as $template) {
        if (!isset($template->id)) {
          continue;
        }
        if (isset($template->sub) && is_string($template->sub) && '' !== $template->sub) {
          $strings["mail-sub-{$template->id}"] = $template->sub;
        }
        if (isset($template->body) && is_string($template->body) && '' !== $template->body) {
          $strings["mail-body-{$template->id}"] = $template->body;
        }
      }
    }

    $redirects = (new IntegrationHandler($formId))->getAllIntegration('form', 'redirectPage');
    if (is_array($redirects)) {
      foreach ($redirects as $redirect) {
        if (!isset($redirect->id)) {
          continue;
        }
        $url = Utilities::jsonObj($redirect->integration_details ?? '')->url ?? '';
        if (is_string($url) && '' !== $url) {
          $strings["redirect-url-{$redirect->id}"] = $url;
        }
      }
    }

    return $strings;
  }
}
