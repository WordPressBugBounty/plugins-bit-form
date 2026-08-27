<?php

namespace BitCode\BitForm\Core\Util\Translation\Provider;

use BitCode\BitForm\Core\Util\Translation\Support\AbstractStringRegistrationProvider;
use BitCode\BitForm\Core\Util\Translation\TranslationManager;
use BitCode\BitForm\Core\Util\Translation\TranslationStringName;

/**
 * WPML adapter (String Translation module).
 *
 * Frontend/AJAX are lookup-only. Register-at-render is WPML's documented top
 * cause of icl_strings bloat, so registration happens on form save
 * (`bitform_form_saved`) and as a backfill when WPML's own screen is opened.
 */
final class WpmlProvider extends AbstractStringRegistrationProvider
{
  public const DOMAIN = 'bit-form';

  /**
   * Per-form hash of the last registered string set. WPML persists registrations,
   * so re-pushing an unchanged form is pure write amplification.
   */
  public const HASH_OPTION = 'bitforms_wpml_string_hashes';

  /**
   * Hash state for the current backfill pass, written back once at the end.
   *
   * @var array<int,string>|null
   */
  private $passHashes = null;

  /** @var bool whether the current pass changed any hash */
  private $passChanged = false;

  /**
   * Hash shouldRegisterForm() just computed, reused instead of hashing twice.
   *
   * @var array{0:int,1:string}|null
   */
  private $pendingHash = null;

  public function registerStrings($formId, array $contextStrings)
  {
    foreach ($contextStrings as $context => $string) {
      do_action('wpml_register_single_string', self::DOMAIN, TranslationStringName::forForm($context, $formId), $string);
    }
  }

  public function onAdminInit()
  {
    add_action('bitform_form_saved', [$this, 'registerFormStrings']);
    add_action('admin_init', [$this, 'maybeRegisterAllForms']);
  }

  public function onAjaxInit($requestLang)
  {
    $lang = $this->getCurrentLanguage();
    if ('' !== $lang) {
      do_action('wpml_switch_language', $lang);
    }
  }

  /**
   * `bitform_form_saved` callback — registers one form's strings.
   *
   * @param mixed $formId
   */
  public function registerFormStrings($formId)
  {
    $formId = (int) $formId;
    $strings = RegistrationCollector::collectAllStrings($formId);
    $this->registerStrings($formId, $strings);

    $hashes = self::hashes();
    $hashes[$formId] = self::hashStrings($strings);
    update_option(self::HASH_OPTION, $hashes, false);
  }

  /**
   * @param string $page
   *
   * @return bool
   */
  protected function isTranslationScreen($page)
  {
    return '' !== $page && false !== strpos($page, 'wpml-string-translation');
  }

  /**
   * Registrations persist and each is a WPML read plus write, so an unchanged
   * form is skipped. The screen reloads on every filter and page change.
   *
   * @param int                  $formId
   * @param array<string,string> $strings
   *
   * @return bool
   */
  protected function shouldRegisterForm($formId, array $strings)
  {
    if (null === $this->passHashes) {
      $this->passHashes = self::hashes();
      $this->passChanged = false;
    }
    $hash = self::hashStrings($strings);
    $this->pendingHash = [$formId, $hash];
    return !isset($this->passHashes[$formId]) || $this->passHashes[$formId] !== $hash;
  }

  /**
   * @param int                  $formId
   * @param array<string,string> $strings
   */
  protected function afterFormRegistered($formId, array $strings)
  {
    $hash = (is_array($this->pendingHash) && $formId === $this->pendingHash[0])
      ? $this->pendingHash[1]
      : self::hashStrings($strings);
    $this->passHashes[$formId] = $hash;
    $this->passChanged = true;
  }

  /**
   * One option write for the whole pass, not one per form.
   */
  protected function afterRegistrationPass()
  {
    if ($this->passChanged && is_array($this->passHashes)) {
      update_option(self::HASH_OPTION, $this->passHashes, false);
    }
    $this->passHashes = null;
    $this->passChanged = false;
    $this->pendingHash = null;
  }

  /**
   * Validated bf_lang, else WPML's current language.
   *
   * @return string
   */
  protected function detectLanguage()
  {
    $requestLang = TranslationManager::getRequestLang();
    if ('' !== $requestLang) {
      $active = apply_filters('wpml_active_languages', null);
      if (is_array($active) && isset($active[$requestLang])) {
        return $requestLang;
      }
    }
    $current = apply_filters('wpml_current_language', null);
    return is_string($current) ? $current : '';
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
    $lang = $this->getCurrentLanguage();
    return apply_filters(
      'wpml_translate_single_string',
      $string,
      self::DOMAIN,
      TranslationStringName::forForm($context, $formId),
      '' !== $lang ? $lang : null
    );
  }

  /**
   * @return array<int,string>
   */
  private static function hashes()
  {
    $hashes = get_option(self::HASH_OPTION, []);
    return is_array($hashes) ? $hashes : [];
  }

  /**
   * @param array<string,string> $strings
   *
   * @return string
   */
  private static function hashStrings(array $strings)
  {
    $encoded = wp_json_encode($strings);
    return md5(is_string($encoded) ? $encoded : serialize($strings));
  }
}
