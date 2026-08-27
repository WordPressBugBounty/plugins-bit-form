<?php

namespace BitCode\BitForm\Core\Util\Translation\Contract;

/**
 * Optional half of the provider contract, for plugins that keep their own
 * string store (WPML, Polylang). HTML-layer plugins discover strings from the
 * rendered page and implement only TranslationProviderInterface.
 *
 * TranslationManager checks `instanceof` before calling onAdminInit().
 */
interface StringRegistrationProviderInterface
{
  /**
   * Admin context: attach registration hooks (form save, translation screens).
   */
  public function onAdminInit();

  /**
   * Push [contextKey => sourceString] for one form into the plugin's store.
   *
   * @param mixed                $formId
   * @param array<string,string> $contextStrings
   */
  public function registerStrings($formId, array $contextStrings);
}
