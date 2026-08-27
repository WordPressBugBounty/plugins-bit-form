<?php

namespace BitCode\BitForm\Core\Util\Translation;

/**
 * Presence checks for the built-in providers, in one small file the manager can
 * load instead of every provider class. Each provider's isAvailable() delegates
 * here, so a rule has exactly one home.
 *
 * `::class` in the match arms is a compile-time string and does not autoload.
 */
final class ProviderProbe
{
  /**
   * @param mixed $class
   *
   * @return bool|null null when $class is not a built-in provider
   */
  public static function isActive($class)
  {
    switch ($class) {
      case Provider\WpmlProvider::class:
        return defined('ICL_SITEPRESS_VERSION');

      case Provider\PolylangProvider::class:
        return function_exists('pll__');

      case Provider\TranslatePressProvider::class:
        return class_exists('TRP_Translate_Press') || function_exists('trp_translate');
    }
    return null;
  }
}
