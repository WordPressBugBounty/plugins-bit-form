<?php

namespace BitCode\BitForm\Core\Util\Translation\Contract;

/**
 * Adapter contract for one multilingual plugin — lookup only. TranslationManager
 * wires the provider to the public filters; a provider hooks nothing on its own.
 *
 * Plugins with a string store additionally implement
 * StringRegistrationProviderInterface; the ones that translate rendered HTML
 * do not, and are not forced into empty method bodies.
 *
 * No strict scalar type hints on hook-reachable methods (translate,
 * getCurrentLanguage) — WP filters can pass null.
 */
interface TranslationProviderInterface
{
  /**
   * Cheap probe: defined()/function_exists()/class_exists() only, no DB access.
   *
   * @return bool
   */
  public static function isAvailable();

  /**
   * Resolved language for the current request, memoized; '' when unknown.
   *
   * @return string
   */
  public function getCurrentLanguage();

  /**
   * `bitform_translate_form_string` delegate.
   *
   * @param mixed $string
   * @param mixed $context stable context key (e.g. "fld-abc-lbl", "msg-content-3")
   * @param mixed $formId
   *
   * @return mixed translated string, or the input unchanged
   */
  public function translate($string, $context = '', $formId = 0);

  /**
   * True when the plugin translates the rendered HTML itself; the manager then
   * skips the string filter on frontend renders to avoid double translation.
   *
   * @return bool
   */
  public function translatesRenderedHtml();

  /**
   * AJAX context: adopt the submitter's page language.
   *
   * @param string $requestLang sanitized bf_lang from the payload, '' if none
   */
  public function onAjaxInit($requestLang);
}
