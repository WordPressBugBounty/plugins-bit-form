<?php

namespace BitCode\BitForm\Core\Util\Translation\Provider;

use BitCode\BitForm\Core\Util\Translation\Support\AbstractTranslationProvider;
use BitCode\BitForm\Core\Util\Translation\TranslationManager;

/**
 * TranslatePress adapter.
 *
 * TP translates the rendered HTML itself, so the manager keeps the string
 * filter off the render path to avoid translating twice. TP's blind spot is
 * Bit Form's AJAX JSON, which is translated here.
 *
 * No string store, so AbstractStringRegistrationProvider is not extended.
 *
 * Known limitation: client-side validation messages live in the inline
 * bf_globals JSON and depend on TP's dynamic-translation setting.
 */
final class TranslatePressProvider extends AbstractTranslationProvider
{
  public function translatesRenderedHtml()
  {
    return true;
  }

  /**
   * Validated bf_lang, else TP's current language. Locale-style codes, e.g. de_DE.
   *
   * @return string
   */
  protected function detectLanguage()
  {
    $requestLang = TranslationManager::getRequestLang();
    if ('' !== $requestLang && in_array($requestLang, self::knownLanguages(), true)) {
      return $requestLang;
    }
    if (function_exists('trp_get_current_language')) {
      $current = trp_get_current_language();
      if (is_string($current) && '' !== $current) {
        return $current;
      }
    }
    if (isset($GLOBALS['TRP_LANGUAGE']) && is_string($GLOBALS['TRP_LANGUAGE'])) {
      return $GLOBALS['TRP_LANGUAGE'];
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
    if (!function_exists('trp_translate')) {
      return $string;
    }
    $lang = $this->getCurrentLanguage();
    if ('' === $lang) {
      return $string;
    }
    // Third argument must stay false: TP's default wraps output in
    // <span data-no-translation>, which would corrupt the JSON response.
    return trp_translate($string, $lang, false);
  }

  /**
   * TP's configured language codes. Empty when they cannot be read, which makes
   * an unverifiable bf_lang fall through to TP's own current language rather
   * than being trusted.
   *
   * @return string[]
   */
  private static function knownLanguages()
  {
    $settings = get_option('trp_settings');
    if (!is_array($settings) || empty($settings['translation-languages']) || !is_array($settings['translation-languages'])) {
      return [];
    }
    return array_values(array_filter($settings['translation-languages'], 'is_string'));
  }
}
