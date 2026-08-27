<?php

namespace BitCode\BitForm\Core\Util\Translation\Support;

use BitCode\BitForm\Core\Database\FormModel;
use BitCode\BitForm\Core\Util\Translation\Contract\StringRegistrationProviderInterface;
use BitCode\BitForm\Core\Util\Translation\Provider\RegistrationCollector;

/**
 * Base for adapters that push strings into a plugin-owned store (WPML, Polylang).
 *
 * The pass below is shared because its guard is: `admin_init` also fires on
 * admin-ajax.php before any auth check, so without it a logged-out request with
 * the right ?page enumerates every form. One copy cannot drift from another.
 */
abstract class AbstractStringRegistrationProvider extends AbstractTranslationProvider implements StringRegistrationProviderInterface
{
  /**
   * `admin_init` callback: register every form's strings on the plugin's own
   * translation screen.
   */
  final public function maybeRegisterAllForms()
  {
    if (wp_doing_ajax() || !static::currentUserCanManage()) {
      return;
    }
    if (!$this->isTranslationScreen(self::currentPage())) {
      return;
    }

    // One query for every form, not one per form.
    $forms = (new FormModel())->get(['id', 'form_content']);
    if (is_wp_error($forms) || !is_array($forms)) {
      return;
    }

    foreach ($forms as $form) {
      if (!isset($form->id)) {
        continue;
      }
      $formId = (int) $form->id;
      $content = isset($form->form_content) && is_string($form->form_content) ? $form->form_content : '';
      $strings = RegistrationCollector::collectAllStrings($formId, $content);
      if (!$this->shouldRegisterForm($formId, $strings)) {
        continue;
      }
      $this->registerStrings($formId, $strings);
      $this->afterFormRegistered($formId, $strings);
    }

    $this->afterRegistrationPass();
  }

  /**
   * Mirrors AdminAjax's gate — custom capability mappings can leave an admin
   * without `manage_bitform`.
   *
   * @return bool
   */
  protected static function currentUserCanManage()
  {
    return current_user_can('manage_bitform') || current_user_can('manage_options');
  }

  /**
   * @param string $page the `page` query var, '' when absent
   *
   * @return bool
   */
  abstract protected function isTranslationScreen($page);

  /**
   * Default suits a store held in per-request memory. Override where
   * registrations persist and re-pushing an unchanged form is wasted writes.
   *
   * @param int                  $formId
   * @param array<string,string> $strings
   *
   * @return bool
   */
  protected function shouldRegisterForm($formId, array $strings)
  {
    return true;
  }

  /**
   * @param int                  $formId
   * @param array<string,string> $strings
   */
  protected function afterFormRegistered($formId, array $strings)
  {
  }

  /**
   * Runs once after the pass, for providers that batch a write.
   */
  protected function afterRegistrationPass()
  {
  }

  /**
   * @return string
   */
  private static function currentPage()
  {
    // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- page check only.
    return isset($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : '';
  }
}
