<?php

namespace BitCode\BitForm\Core\Util\Translation\Provider;

use BitCode\BitForm\Core\Util\Translation\Support\AbstractStringRegistrationProvider;
use BitCode\BitForm\Core\Util\Translation\TranslationManager;
use BitCode\BitForm\Core\Util\Translation\TranslationStringName;

/**
 * Polylang adapter; the free version suffices.
 *
 * pll_register_string() keeps its registry in memory per request, so strings
 * appear in Languages → Translations only if registered during that request.
 * Registration is gated to page=mlang_strings (render and save postback) and
 * stays off every other request. Frontend/AJAX translate by source lookup.
 */
final class PolylangProvider extends AbstractStringRegistrationProvider
{
  public const GROUP = 'Bit Form';

  public function registerStrings($formId, array $contextStrings)
  {
    if (!function_exists('pll_register_string')) {
      return;
    }
    foreach ($contextStrings as $context => $string) {
      $context = (string) $context;
      // Multiline editor for HTML bodies: messages, mail body, content props.
      $multiline = (bool) preg_match('/^(?:msg-content-|mail-body-)|(?:^|-)content(?:-|$)/', $context);
      pll_register_string(TranslationStringName::forForm($context, $formId), $string, self::GROUP, $multiline);
    }
  }

  public function onAdminInit()
  {
    add_action('admin_init', [$this, 'maybeRegisterAllForms']);
  }

  public function onAjaxInit($requestLang)
  {
    $slug = $this->getCurrentLanguage();
    if ('' === $slug || !function_exists('PLL')) {
      return;
    }
    // PLL() is $GLOBALS['polylang'], null until Polylang bootstraps. Blind
    // dereference fatals the public submit endpoint.
    $pll = PLL();
    if (!is_object($pll) || !isset($pll->model) || !is_object($pll->model) || !method_exists($pll->model, 'get_language')) {
      return;
    }
    $language = $pll->model->get_language($slug);
    if (!is_object($language) || empty($language->locale)) {
      return;
    }
    // Adopt the submitter's locale so gettext defaults localize too.
    if (switch_to_locale($language->locale)) {
      add_action('shutdown', [__CLASS__, 'restoreLocale'], 1);
    }
  }

  /**
   * `shutdown` callback — wrapper so the action returns nothing.
   */
  public static function restoreLocale()
  {
    restore_previous_locale();
  }

  /**
   * Polylang's registry is per-request memory, so every form re-registers on
   * every screen load — the base default is right and nothing is overridden.
   *
   * @param string $page
   *
   * @return bool
   */
  protected function isTranslationScreen($page)
  {
    return 'mlang_strings' === $page;
  }

  /**
   * Validated bf_lang → Polylang's documented `lang` var → pll_current_language.
   *
   * @return string
   */
  protected function detectLanguage()
  {
    $candidates = [TranslationManager::getRequestLang()];
    // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Polylang's documented AJAX language var, read-only.
    $candidates[] = TranslationManager::sanitizeLang(isset($_REQUEST['lang']) ? wp_unslash($_REQUEST['lang']) : '');

    if (function_exists('pll_languages_list')) {
      $known = pll_languages_list(['fields' => 'slug']);
      if (is_array($known)) {
        foreach ($candidates as $candidate) {
          if ('' !== $candidate && in_array($candidate, $known, true)) {
            return $candidate;
          }
        }
      }
    }
    if (function_exists('pll_current_language')) {
      $current = pll_current_language('slug');
      return is_string($current) ? $current : '';
    }
    return '';
  }

  /**
   * @param string $string
   * @param string $context
   * @param int    $formId
   *
   * @return mixed
   */
  protected function lookup($string, $context, $formId)
  {
    if (!function_exists('pll_translate_string')) {
      return $string;
    }
    $lang = $this->getCurrentLanguage();
    return '' === $lang ? $string : pll_translate_string($string, $lang);
  }
}
