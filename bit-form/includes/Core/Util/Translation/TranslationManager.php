<?php

namespace BitCode\BitForm\Core\Util\Translation;

use BitCode\BitForm\Core\Form\FormManager;
use BitCode\BitForm\Core\Util\EscapingHelper;
use BitCode\BitForm\Core\Util\Translation\Contract\StringRegistrationProviderInterface;
use BitCode\BitForm\Core\Util\Translation\Contract\TranslationProviderInterface;

/**
 * Lazy entry point for multilingual support.
 *
 * Detection runs at most once per request from Hooks::init_classes(): the first
 * available provider (WPML > Polylang > TranslatePress, extensible via the
 * `bitform_translation_providers` filter) is wired to the public
 * `bitform_translate_form_string` / `bitform_current_language` filters. With no
 * multilingual plugin active nothing is hooked and rendering is unchanged.
 *
 * Hooks only on a frontend render and on Bit Form's own frontend AJAX actions.
 * Every other admin-ajax request must see source-language content: the builder
 * saves back what it reads, so a translation reaching it overwrites the source.
 *
 * No provider exists for GTranslate (translates rendered HTML, no PHP API) or
 * Loco Translate (gettext catalog only, not user-authored DB content).
 */
final class TranslationManager
{
  /**
   * Frontend AJAX actions, Free and Pro. Pro names are plain strings, so no Pro
   * code needs to be present. Extend via `bitform_translation_frontend_ajax_actions`.
   */
  public const FRONTEND_AJAX_ACTIONS = [
    'bitforms_submit_form',
    'bitforms_entry_update',
    'bitforms_update_form_entry',
    'bitforms_before_submit_validate',
    'bitforms_trigger_workflow',
    'bitforms_onload_added_field_and_property',
    'bitforms_send_email_otp',
    'bitforms_verify_email_otp',
    'bitforms_save_partial_form_progress',
  ];

  /**
   * Active provider, false when none available, null before detection.
   *
   * @var TranslationProviderInterface|false|null
   */
  private static $provider = null;

  /**
   * Contexts already booted this request; the Request::Check() branches overlap.
   *
   * @var array<string,bool>
   */
  private static $booted = [];

  /**
   * Memoized `bitform_translation_enabled`.
   *
   * @var bool|null
   */
  private static $enabled = null;

  /**
   * Sanitized language slug from the AJAX payload, '' when absent/invalid.
   *
   * @var string|null
   */
  private static $requestLang = null;

  /**
   * Per-form translation-enabled memo.
   *
   * @var array<int,bool>
   */
  private static $formEnabledCache = [];

  /**
   * Entry point from Hooks::init_classes().
   *
   * @param string $context 'frontend' | 'ajax' | 'admin'
   */
  public static function boot($context)
  {
    if (isset(self::$booted[$context])) {
      return;
    }
    self::$booted[$context] = true;

    $provider = self::provider();
    if (!$provider || !self::isEnabled()) {
      return;
    }

    if ('admin' === $context) {
      // Also true on admin-ajax, which is where the form-save listener registers.
      // HTML-layer providers have no string store and skip this entirely.
      if ($provider instanceof StringRegistrationProviderInterface) {
        $provider->onAdminInit();
      }
      return;
    }

    // admin-ajax satisfies Request::Check('frontend') too; the 'ajax' context owns it.
    if ('frontend' === $context && wp_doing_ajax()) {
      return;
    }

    if ('ajax' === $context) {
      if (!self::isFrontendAjaxRequest()) {
        return;
      }
      // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only language hint, re-validated by the provider against its own language list.
      $rawLang = isset($_REQUEST['bf_lang']) ? wp_unslash($_REQUEST['bf_lang']) : '';
      self::$requestLang = self::sanitizeLang($rawLang);
      $provider->onAjaxInit(self::$requestLang);
    }

    add_filter('bitform_current_language', [self::class, 'filterCurrentLanguage'], 10, 2);
    // HTML-layer plugins translate the rendered page themselves, so hooking the
    // string filter there double-translates. Their blind spot is AJAX JSON.
    if ('ajax' === $context || !$provider->translatesRenderedHtml()) {
      add_filter('bitform_translate_form_string', [self::class, 'filterTranslate'], 10, 3);
    }
  }

  /**
   * @return bool whether the current AJAX action is one of Bit Form's frontend endpoints
   */
  public static function isFrontendAjaxRequest()
  {
    // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- action name only, used to scope a read-only display filter.
    $action = isset($_REQUEST['action']) && is_string($_REQUEST['action']) ? sanitize_key(wp_unslash($_REQUEST['action'])) : '';
    if ('' === $action) {
      return false;
    }
    $allowed = apply_filters('bitform_translation_frontend_ajax_actions', self::FRONTEND_AJAX_ACTIONS);
    return is_array($allowed) && in_array($action, $allowed, true);
  }

  /**
   * @return bool memoized `bitform_translation_enabled`
   */
  private static function isEnabled()
  {
    if (null === self::$enabled) {
      self::$enabled = (bool) apply_filters('bitform_translation_enabled', true);
    }
    return self::$enabled;
  }

  /**
   * Detects and memoizes the active provider (once per request).
   *
   * @return TranslationProviderInterface|false
   */
  public static function provider()
  {
    if (null === self::$provider) {
      self::$provider = false;
      $classes = apply_filters('bitform_translation_providers', [
        Provider\WpmlProvider::class,
        Provider\PolylangProvider::class,
        Provider\TranslatePressProvider::class,
      ]);
      foreach ((array) $classes as $class) {
        if (!is_string($class)) {
          continue;
        }
        // Built-ins answer from ProviderProbe, keeping their files off the
        // autoloader on the vast majority of sites. Third-party classes have no
        // probe and are loaded and asked directly.
        if (false === ProviderProbe::isActive($class)) {
          continue;
        }
        if (
          class_exists($class)
          && is_subclass_of($class, TranslationProviderInterface::class)
          && $class::isAvailable()
        ) {
          self::$provider = new $class();
          break;
        }
      }
    }
    return self::$provider;
  }

  /**
   * `bitform_translate_form_string` delegate: enforces the per-form opt-out.
   *
   * @param mixed $string
   * @param mixed $context
   * @param mixed $formId
   *
   * @return mixed
   */
  public static function filterTranslate($string, $context = '', $formId = 0)
  {
    $provider = self::provider();
    if (!$provider || !is_string($string) || '' === $string) {
      return $string;
    }
    if (!self::isFormTranslationEnabled($formId)) {
      return $string;
    }
    $translated = $provider->translate($string, $context, $formId);
    if (!is_string($translated) || $translated === $string) {
      return $string;
    }
    return self::guardTranslation($translated, $string, (string) $context);
  }

  /**
   * Source strings are authored under `manage_bitform`, their translations are
   * not (WPML ships a Translator role). Constrains the contexts that reach
   * privileged sinks; everything else passes through.
   *
   * @param string $translated
   * @param string $source
   * @param string $context
   *
   * @return string
   */
  private static function guardTranslation($translated, $source, $context)
  {
    if (0 === strpos($context, 'redirect-url-')) {
      return self::guardRedirect($translated, $source);
    }
    // A subject is plain text and ends up in a mail header.
    if (0 === strpos($context, 'mail-sub-')) {
      return sanitize_text_field($translated);
    }
    // Message HTML is injected client-side into .msg-content; mail body HTML is
    // delivered to the admin and the submitter.
    $isHtmlSink = 0 === strpos($context, 'msg-content-') || 0 === strpos($context, 'mail-body-');
    if ($isHtmlSink && apply_filters('bitform_translation_sanitize_html', true, $context)) {
      return wp_kses($translated, self::translatedAllowedHtml());
    }
    return $translated;
  }

  /**
   * The renderer's allowlist minus <script>, which it carries only for a
   * server-emitted Turnstile block.
   *
   * @return array<string,array<string,bool>>
   */
  private static function translatedAllowedHtml()
  {
    $allowed = EscapingHelper::getAllowedHtmlTags();
    unset($allowed['script'], $allowed['style']);
    return $allowed;
  }

  /**
   * A translated redirect localizes the path, it does not leave the site.
   * Off-host targets fall back to the source.
   *
   * @param string $translated
   * @param string $source
   *
   * @return string
   */
  private static function guardRedirect($translated, $source)
  {
    $host = wp_parse_url($translated, PHP_URL_HOST);
    if (empty($host)) {
      return $translated; // relative — same site
    }
    $allowed = array_filter([
      wp_parse_url($source, PHP_URL_HOST),
      wp_parse_url(home_url(), PHP_URL_HOST),
    ]);
    $allowed = apply_filters('bitform_translation_allowed_redirect_hosts', $allowed, $source);
    if (!is_array($allowed)) {
      return $source;
    }
    return in_array(strtolower($host), array_map('strtolower', array_filter($allowed, 'is_string')), true) ? $translated : $source;
  }

  /**
   * `bitform_current_language` delegate.
   *
   * @param mixed $lang
   * @param mixed $formId
   *
   * @return mixed
   */
  public static function filterCurrentLanguage($lang = '', $formId = 0)
  {
    $provider = self::provider();
    if (!$provider) {
      return $lang;
    }
    $resolved = (string) $provider->getCurrentLanguage();
    return '' !== $resolved ? $resolved : $lang;
  }

  /**
   * Per-form opt-out: form_content->additional->settings->translation->disabled,
   * overridable via the `bitform_form_translation_enabled` filter.
   *
   * @param mixed  $formId
   * @param string $rawContent already-loaded form_content JSON, skips the FormManager lookup
   *
   * @return bool
   */
  public static function isFormTranslationEnabled($formId, $rawContent = null)
  {
    $formId = (int) $formId;
    if ($formId <= 0) {
      return true;
    }
    if (!isset(self::$formEnabledCache[$formId])) {
      $enabled = true;
      if (is_string($rawContent)) {
        $raw = $rawContent;
      } else {
        $formManager = FormManager::getInstance($formId);
        $raw = $formManager->isExist() ? $formManager->getFieldsContent() : '';
      }
      // Cheap pre-check: forms without a translation settings block skip the decode.
      if (is_string($raw) && false !== strpos($raw, '"translation"')) {
        $decoded = json_decode($raw);
        if (is_object($decoded) && !empty($decoded->additional->settings->translation->disabled)) {
          $enabled = false;
        }
      }
      self::$formEnabledCache[$formId] = (bool) apply_filters('bitform_form_translation_enabled', $enabled, $formId);
    }
    return self::$formEnabledCache[$formId];
  }

  /**
   * @return string sanitized bf_lang from the AJAX payload, '' if none
   */
  public static function getRequestLang()
  {
    return null === self::$requestLang ? '' : self::$requestLang;
  }

  /**
   * Accepts slugs like "en", "pt-br", "zh_CN"; anything else becomes ''.
   * Providers re-validate against their own language list where they have one.
   *
   * @param mixed $lang
   *
   * @return string
   */
  public static function sanitizeLang($lang)
  {
    if (!is_string($lang) || '' === $lang || strlen($lang) > 20) {
      return '';
    }
    return preg_match('/^[a-z]{2,3}([_-][A-Za-z0-9]{2,10}){0,2}$/', $lang) ? $lang : '';
  }

  /**
   * Test hook: clears all memoized state.
   */
  public static function resetForTesting()
  {
    self::$provider = null;
    self::$requestLang = null;
    self::$formEnabledCache = [];
    self::$booted = [];
    self::$enabled = null;
  }
}
