<?php

namespace BitCode\BitForm\Core\Util\Translation\Support;

use BitCode\BitForm\Core\Util\Translation\Contract\TranslationProviderInterface;
use BitCode\BitForm\Core\Util\Translation\ProviderProbe;

/**
 * Shared plumbing for the built-in adapters: memoize the language, refuse
 * non-strings, fall back to the source. Subclasses supply only the two calls
 * that differ per plugin.
 *
 * Implementing TranslationProviderInterface directly is still supported.
 */
abstract class AbstractTranslationProvider implements TranslationProviderInterface
{
  /** @var string|null resolved language; '' is resolved, null is "not asked yet" */
  private $lang = null;

  /**
   * A third-party subclass has no probe arm and must override this.
   *
   * @return bool
   */
  public static function isAvailable()
  {
    $probe = ProviderProbe::isActive(static::class);
    return null === $probe ? false : (bool) $probe;
  }

  /**
   * @return string
   */
  final public function getCurrentLanguage()
  {
    if (null === $this->lang) {
      $lang = $this->detectLanguage();
      // null is this memo's "not asked yet", so it must not be stored.
      $this->lang = is_string($lang) ? $lang : '';
    }
    return $this->lang;
  }

  /**
   * `bitform_translate_form_string` delegate; hook-reachable, so the input is
   * whatever a filter passed.
   *
   * @param mixed $string
   * @param mixed $context
   * @param mixed $formId
   *
   * @return mixed
   */
  final public function translate($string, $context = '', $formId = 0)
  {
    if (!is_string($string) || '' === $string) {
      return $string;
    }
    $translated = $this->lookup($string, (string) $context, (int) $formId);
    // Empty means "no translation stored", not "translates to empty".
    return is_string($translated) && '' !== $translated ? $translated : $string;
  }

  /**
   * @return bool
   */
  public function translatesRenderedHtml()
  {
    return false;
  }

  /**
   * No-op for providers whose lookup takes the language explicitly.
   *
   * @param string $requestLang
   */
  public function onAjaxInit($requestLang)
  {
  }

  /**
   * Called once per request; '' when the plugin has no language for it.
   *
   * @return mixed a language code; anything else is normalized to ''
   */
  abstract protected function detectLanguage();

  /**
   * Ask the plugin for this string. Return the source, or anything empty, to
   * mean "not translated".
   *
   * @param string $string  non-empty source string
   * @param string $context stable context key
   * @param int    $formId
   *
   * @return mixed
   */
  abstract protected function lookup($string, $context, $formId);
}
