<?php

/**
 * Compatibility layer for caching / optimization plugins.
 *
 * The frontend needs the inline config (window.bf_globals) and the generated
 * runtime bundle to execute in order. Optimizers that minify, combine, defer or
 * delay JavaScript can reorder or withhold either one. Registers Bit Form's
 * script patterns with each optimizer's exclusion filter, and stamps generic
 * no-optimize attributes as a fallback for those that honor them.
 *
 * Stylesheets need the same protection for a different reason: a form's styles
 * are atomic single-property classes generated per form, so a combiner that
 * reorders them against theme CSS, or an unused-CSS pass that drops the classes
 * it cannot see in the markup, leaves the form unstyled.
 *
 * @since 3.2.2
 */

namespace BitCode\BitForm\Core\Util;

use BitCode\BitForm\Core\Database\FormModel;

if (!defined('ABSPATH')) {
  exit;
}

final class CacheCompat
{
  /** True once a purge is queued for this request. */
  private static $purgeScheduled = false;

  /** Post IDs queued for purging. */
  private static $purgePostIds = [];

  /**
   * Frontend script handle prefixes. bit-form-all-script covers both the free
   * runtime handle (bit-form-all-script-test) and the pro data-view handle.
   */
  private const HANDLE_PREFIXES = [
    'bit-form-all-script',
    'bitform-bf-globals-',
    'bitform-show-picker-bridge',
    'bitforms_recaptcha',
  ];

  /**
   * Frontend style handle prefixes. Covers the generated per-form sheets
   * (bitform-style-15, bitform-style-15-formid, bitform-style-custom-15), the
   * Pro data views (bitform-style-view-3), the page builder widgets and the
   * standalone, conversational and preview views.
   */
  private const STYLE_HANDLE_PREFIXES = [
    'bf-inline-style',
    'bitform-bricks-',
    'bitform-conversational-',
    'bitform-elementor-style',
    'bitform-entry-edit-',
    'bitform-preview-',
    'bitform-standalone-',
    'bitform-style',
  ];

  /** Attributes the optimizers that read markup instead of filters honor. */
  private const NO_OPTIMIZE_ATTRIBUTES = 'data-no-optimize="1" data-no-defer="1" data-no-minify="1" data-cfasync="false" data-jetpack-boost="ignore" nowprocket nitro-exclude ';

  public static function register()
  {
    // WP Rocket
    add_filter('rocket_delay_js_exclusions', [self::class, 'appendExclusionsArray']);
    add_filter('rocket_exclude_defer_js', [self::class, 'appendExclusionsArray']);
    add_filter('rocket_exclude_js', [self::class, 'appendExclusionsArray']);
    add_filter('rocket_minify_excluded_external_js', [self::class, 'appendExclusionsArray']);
    add_filter('rocket_excluded_inline_js_content', [self::class, 'appendExclusionsArray']);

    // LiteSpeed Cache
    add_filter('litespeed_optimize_js_excludes', [self::class, 'appendExclusionsArray']);
    add_filter('litespeed_optm_js_defer_exc', [self::class, 'appendExclusionsArray']);

    // Perfmatters
    add_filter('perfmatters_delay_js_exclusions', [self::class, 'appendExclusionsArray']);
    add_filter('perfmatters_defer_js_exclusions', [self::class, 'appendExclusionsArray']);

    // Autoptimize (comma-separated string)
    add_filter('autoptimize_filter_js_exclude', [self::class, 'appendExclusionsString']);

    // SiteGround Optimizer (script handles)
    add_filter('sgo_js_minify_exclude', [self::class, 'appendHandles']);
    add_filter('sgo_javascript_combine_exclude', [self::class, 'appendHandles']);
    add_filter('sgo_js_async_exclude', [self::class, 'appendHandles']);

    // FlyingPress
    add_filter('flying_press_exclude_from_delay:js', [self::class, 'appendExclusionsArray']);
    add_filter('flying_press_exclude_from_defer:js', [self::class, 'appendExclusionsArray']);
    add_filter('flying_press_exclude_from_minify:js', [self::class, 'appendExclusionsArray']);

    // WP Optimize
    add_filter('wp-optimize-minify-default-exclusions', [self::class, 'appendExclusionsArray']);

    // W3 Total Cache (matches the tag and file path; this filter has no handle)
    add_filter('w3tc_minify_js_do_tag_minification', [self::class, 'denyTagMinification'], 10, 3);

    // Hummingbird, at 20 so it runs after Hummingbird's own settings filters at 10.
    // These four carry styles as well as scripts, so they test both handle lists.
    add_filter('wphb_minify_resource', [self::class, 'denyForBitformAsset'], 20, 2);
    add_filter('wphb_combine_resource', [self::class, 'denyForBitformAsset'], 20, 2);
    add_filter('wphb_defer_resource', [self::class, 'denyForBitformAsset'], 20, 2);
    add_filter('wphb_inline_resource', [self::class, 'denyForBitformAsset'], 20, 2);

    // Jetpack Boost, Page Optimize and WordPress.com asset concatenation
    add_filter('js_do_concat', [self::class, 'denyForBitformHandle'], 20, 2);
    add_filter('css_do_concat', [self::class, 'denyForBitformStyleHandle'], 20, 2);

    self::registerStyleFilters();

    // Generic no-optimize attributes on our own script tags
    add_filter('script_loader_tag', [self::class, 'addNoOptimizeAttributes'], 10, 2);
    add_filter('wp_inline_script_attributes', [self::class, 'addInlineNoOptimizeAttributes'], 10, 2);
    add_filter('style_loader_tag', [self::class, 'addStyleNoOptimizeAttributes'], 10, 2);
  }

  /** Stylesheet counterparts of the script exclusion filters above. */
  private static function registerStyleFilters()
  {
    // WP Rocket, including the Remove Unused CSS safelist
    add_filter('rocket_exclude_css', [self::class, 'appendStyleExclusionsArray']);
    add_filter('rocket_exclude_defer_css', [self::class, 'appendStyleExclusionsArray']);
    add_filter('rocket_rucss_safelist', [self::class, 'appendStyleExclusionsArray']);

    // LiteSpeed Cache, including the Unique CSS pass
    add_filter('litespeed_optimize_css_excludes', [self::class, 'appendStyleExclusionsArray']);
    add_filter('litespeed_optm_css_defer_exc', [self::class, 'appendStyleExclusionsArray']);
    add_filter('litespeed_optm_ucss_exc', [self::class, 'appendStyleExclusionsArray']);

    // Perfmatters Used CSS
    add_filter('perfmatters_used_css_excluded_stylesheets', [self::class, 'appendStyleExclusionsArray']);

    // Autoptimize (comma-separated string)
    add_filter('autoptimize_filter_css_exclude', [self::class, 'appendStyleExclusionsString']);

    // SiteGround Optimizer (style handles)
    add_filter('sgo_css_minify_exclude', [self::class, 'appendStyleHandles']);
    add_filter('sgo_css_combine_exclude', [self::class, 'appendStyleHandles']);

    // FlyingPress
    add_filter('flying_press_exclude_from_minify:css', [self::class, 'appendStyleExclusionsArray']);
    add_filter('flying_press_exclude_from_used_css', [self::class, 'appendStyleExclusionsArray']);

    // W3 Total Cache (matches the tag and file path; this filter has no handle)
    add_filter('w3tc_minify_css_do_tag_minification', [self::class, 'denyStyleTagMinification'], 10, 3);
  }

  /** Register the cache purge that runs after a form changes. */
  public static function registerPurgeHooks()
  {
    add_action('bitform_admin_form_changed', [self::class, 'schedulePurge']);
  }

  /**
   * Queue one cache purge for the end of the request.
   *
   * Collects the page list now and runs the purge on shutdown. Disabled by the
   * bitform_purge_caches_on_form_change filter.
   */
  public static function schedulePurge()
  {
    if (self::$purgeScheduled) {
      return;
    }
    if (!apply_filters('bitform_purge_caches_on_form_change', true)) {
      return;
    }
    self::$purgeScheduled = true;
    self::$purgePostIds = self::collectFormPageIds();
    add_action('shutdown', [self::class, 'purgeCaches'], 100);
  }

  /**
   * Post IDs that have rendered a Bit Form.
   *
   * @return array
   */
  private static function collectFormPageIds()
  {
    $postIds = [];
    try {
      $forms = (new FormModel())->get(['generated_script_page_ids']);
      if (is_wp_error($forms) || !is_array($forms)) {
        return [];
      }
      foreach ($forms as $form) {
        $pages = json_decode(isset($form->generated_script_page_ids) ? $form->generated_script_page_ids : '', true);
        if (!is_array($pages)) {
          continue;
        }
        foreach (array_keys($pages) as $postId) {
          $postId = absint($postId);
          if ($postId) {
            $postIds[] = $postId;
          }
        }
      }
    } catch (\Throwable $err) {
      Log::debug_log('Cache purge page lookup failed: ' . $err->getMessage());
      return [];
    }
    return array_values(array_unique($postIds));
  }

  /**
   * Purge the cached pages that render a Bit Form.
   *
   * Purges page by page, or flushes everything once the page count passes
   * bitform_cache_purge_page_limit.
   */
  public static function purgeCaches()
  {
    $postIds = apply_filters('bitform_cache_purge_post_ids', self::$purgePostIds);
    $postIds = is_array($postIds) ? array_values(array_filter(array_map('absint', $postIds))) : [];

    // No page has rendered a form, so nothing cached can be stale.
    if (empty($postIds)) {
      do_action('bitform_purge_caches', [], 'none');
      return;
    }

    $limit = (int) apply_filters('bitform_cache_purge_page_limit', 50);
    if ($limit > 0 && count($postIds) > $limit) {
      self::purgeEverything();
      do_action('bitform_purge_caches', $postIds, 'everything');
      return;
    }

    $urls = [];
    foreach ($postIds as $postId) {
      $url = get_permalink($postId);
      if (is_string($url) && '' !== $url) {
        $urls[] = $url;
      }
    }

    self::purgePages($postIds, $urls);
    self::purgeWholeCacheForPluginsWithoutPageApi();

    // $mode is 'pages', 'everything' or 'none'.
    do_action('bitform_purge_caches', $postIds, 'pages');
  }

  /**
   * Per-page purge for every caching plugin that exposes one.
   *
   * @param array $postIds
   * @param array $urls
   *
   * @return void
   */
  private static function purgePages($postIds, $urls)
  {
    // WP Rocket
    self::tryPurge(function () use ($postIds) {
      if (function_exists('rocket_clean_post')) {
        foreach ($postIds as $postId) {
          \rocket_clean_post($postId);
        }
      }
    });

    // LiteSpeed Cache
    self::tryPurge(function () use ($postIds) {
      if (has_action('litespeed_purge_post')) {
        foreach ($postIds as $postId) {
          do_action('litespeed_purge_post', $postId);
        }
      }
    });

    // W3 Total Cache
    self::tryPurge(function () use ($postIds) {
      if (function_exists('w3tc_flush_post')) {
        foreach ($postIds as $postId) {
          \w3tc_flush_post($postId);
        }
      }
    });

    // WP Super Cache
    self::tryPurge(function () use ($urls) {
      if (function_exists('wpsc_delete_url_cache')) {
        foreach ($urls as $url) {
          \wpsc_delete_url_cache($url);
        }
      }
    });

    // Cache Enabler
    self::tryPurge(function () use ($postIds) {
      if (class_exists('\Cache_Enabler')) {
        foreach ($postIds as $postId) {
          \Cache_Enabler::clear_page_cache_by_post_id($postId);
        }
      }
    });

    // WP-Optimize
    self::tryPurge(function () use ($postIds) {
      if (class_exists('\WPO_Page_Cache')) {
        foreach ($postIds as $postId) {
          \WPO_Page_Cache::delete_single_post_cache($postId);
        }
      }
    });

    // SiteGround Optimizer
    self::tryPurge(function () use ($urls) {
      if (function_exists('sg_cachepress_purge_cache')) {
        foreach ($urls as $url) {
          \sg_cachepress_purge_cache($url);
        }
      }
    });

    // NitroPack
    self::tryPurge(function () use ($urls) {
      if (function_exists('nitropack_purge_url')) {
        foreach ($urls as $url) {
          \nitropack_purge_url($url);
        }
      }
    });

    // Nginx Helper (server-level FastCGI / Redis page cache)
    self::tryPurge(function () use ($urls) {
      if (defined('NGINX_HELPER_BASENAME') || class_exists('Nginx_Helper')) {
        foreach ($urls as $url) {
          do_action('rt_nginx_helper_purge_url', $url);
        }
      }
    });

    // Elementor stores rendered document HTML in post meta with a 24h TTL.
    self::tryPurge(function () use ($postIds) {
      if (class_exists('\Elementor\Core\Base\Document')) {
        foreach ($postIds as $postId) {
          delete_post_meta($postId, \Elementor\Core\Base\Document::CACHE_META_KEY);
        }
      }
    });
  }

  /**
   * Full flush for caching plugins that expose no per-page purge API.
   *
   * Each call is a no-op unless that plugin is installed. Disabled by the
   * bitform_cache_full_purge_fallback filter.
   *
   * @return void
   */
  private static function purgeWholeCacheForPluginsWithoutPageApi()
  {
    if (!apply_filters('bitform_cache_full_purge_fallback', true)) {
      return;
    }

    // FlyingPress
    self::tryPurge(function () {
      if (class_exists('\FlyingPress\Purge')) {
        \FlyingPress\Purge::purge_everything();
      }
    });

    // Breeze
    self::tryPurge(function () {
      if (class_exists('\Breeze_PurgeCache')) {
        \Breeze_PurgeCache::breeze_cache_flush();
      }
    });

    // Hummingbird
    self::tryPurge(function () {
      if (has_action('wphb_clear_page_cache')) {
        do_action('wphb_clear_page_cache');
      }
    });

    // Swift Performance
    self::tryPurge(function () {
      if (class_exists('\Swift_Performance_Cache')) {
        \Swift_Performance_Cache::clear_all_cache();
      }
    });

    // Comet Cache
    self::tryPurge(function () {
      if (class_exists('\comet_cache')) {
        \comet_cache::clear();
      }
    });

    // WP Fastest Cache
    self::tryPurge(function () {
      if (class_exists('WpFastestCache')) {
        do_action('wpfc_clear_all_cache', true);
      }
    });

    // WP Engine
    self::tryPurge(function () {
      if (class_exists('\WpeCommon')) {
        \WpeCommon::purge_varnish_cache();
      }
    });
  }

  /**
   * Flush every installed caching plugin's whole cache.
   *
   * @return void
   */
  private static function purgeEverything()
  {
    self::tryPurge(function () {
      if (function_exists('rocket_clean_domain')) {
        \rocket_clean_domain();
      }
    });
    self::tryPurge(function () {
      if (has_action('litespeed_purge_all')) {
        do_action('litespeed_purge_all');
      }
    });
    self::tryPurge(function () {
      if (function_exists('w3tc_flush_all')) {
        \w3tc_flush_all();
      }
    });
    self::tryPurge(function () {
      if (function_exists('wp_cache_clear_cache')) {
        is_multisite() ? \wp_cache_clear_cache(get_current_blog_id()) : \wp_cache_clear_cache();
      }
    });
    self::tryPurge(function () {
      if (class_exists('\Cache_Enabler')) {
        \Cache_Enabler::clear_complete_cache();
      }
    });
    self::tryPurge(function () {
      if (class_exists('\WPO_Page_Cache')) {
        \WPO_Page_Cache::instance()->purge();
      }
    });
    self::tryPurge(function () {
      if (function_exists('sg_cachepress_purge_everything')) {
        \sg_cachepress_purge_everything();
      }
    });
    self::tryPurge(function () {
      if (function_exists('nitropack_purge')) {
        \nitropack_purge();
      }
    });
    self::tryPurge(function () {
      if (defined('NGINX_HELPER_BASENAME') || class_exists('Nginx_Helper')) {
        do_action('rt_nginx_helper_purge_all');
      }
    });
    // Elementor's document cache, CSS files and asset data.
    self::tryPurge(function () {
      if (class_exists('\Elementor\Plugin')) {
        \Elementor\Plugin::$instance->files_manager->clear_cache();
      }
    });

    self::purgeWholeCacheForPluginsWithoutPageApi();
  }

  /**
   * Run one purge, swallowing third-party failures.
   *
   * @param callable $purge
   *
   * @return void
   */
  private static function tryPurge($purge)
  {
    try {
      $purge();
    } catch (\Throwable $err) {
      Log::debug_log('Cache purge failed: ' . $err->getMessage());
    }
  }

  /**
   * Substrings optimizers match against a script's URL, handle or inline body.
   *
   * @return array
   */
  public static function exclusionPatterns()
  {
    $patterns = [
      'bf_globals',            // inline config content
      'bitform',               // handles + generated file names (bitform-js-*, bitforms_*)
      'bitforms/form-scripts', // uploads path of the generated runtime bundle
      'bit-form-all-script',   // runtime bundle handle
    ];
    $filtered = apply_filters('bitform_cache_exclusion_patterns', $patterns);
    return is_array($filtered) ? $filtered : $patterns;
  }

  /**
   * Substrings optimizers match against a stylesheet's URL or tag.
   *
   * @return array
   */
  public static function styleExclusionPatterns()
  {
    $patterns = [
      'bitform',              // handles + generated file names (bitform-15-formid.css)
      'bitforms/form-styles', // uploads path of the generated stylesheets
    ];
    $filtered = apply_filters('bitform_cache_style_exclusion_patterns', $patterns);
    return is_array($filtered) ? $filtered : $patterns;
  }

  /**
   * Append script patterns to an array-based optimizer filter. Typed loosely
   * because optimizers pass mixed shapes through these filters.
   *
   * @param mixed $exclusions
   *
   * @return mixed
   */
  public static function appendExclusionsArray($exclusions)
  {
    return self::mergePatternsIntoArray($exclusions, self::exclusionPatterns());
  }

  /**
   * Append style patterns to an array-based optimizer filter.
   *
   * @param mixed $exclusions
   *
   * @return mixed
   */
  public static function appendStyleExclusionsArray($exclusions)
  {
    return self::mergePatternsIntoArray($exclusions, self::styleExclusionPatterns());
  }

  /**
   * Append script patterns to a comma-separated string filter (Autoptimize).
   *
   * @param mixed $exclusions
   *
   * @return mixed
   */
  public static function appendExclusionsString($exclusions)
  {
    return self::mergePatternsIntoString($exclusions, self::exclusionPatterns());
  }

  /**
   * Append style patterns to a comma-separated string filter (Autoptimize).
   *
   * @param mixed $exclusions
   *
   * @return mixed
   */
  public static function appendStyleExclusionsString($exclusions)
  {
    return self::mergePatternsIntoString($exclusions, self::styleExclusionPatterns());
  }

  /**
   * @param mixed $exclusions
   * @param array $patterns
   *
   * @return mixed
   */
  private static function mergePatternsIntoArray($exclusions, $patterns)
  {
    if (!is_array($exclusions)) {
      return $exclusions;
    }
    return array_values(array_unique(array_merge($exclusions, $patterns)));
  }

  /**
   * @param mixed $exclusions
   * @param array $patterns
   *
   * @return mixed
   */
  private static function mergePatternsIntoString($exclusions, $patterns)
  {
    if (!is_string($exclusions)) {
      return $exclusions;
    }
    $parts = array_filter(array_map('trim', explode(',', $exclusions)));
    $parts = array_unique(array_merge($parts, $patterns));
    return implode(',', $parts);
  }

  /**
   * Append script handles to a handle-based filter (SiteGround).
   *
   * SiteGround matches exact handle names and our per-form inline handles are
   * dynamic (bitform-bf-globals-bitforms_15_123_1), so scan the registered
   * queue rather than passing prefixes, which it would not match.
   *
   * @param mixed $handles
   *
   * @return mixed
   */
  public static function appendHandles($handles)
  {
    return self::mergeRegisteredHandles($handles, self::HANDLE_PREFIXES, wp_scripts());
  }

  /**
   * Append style handles to a handle-based filter (SiteGround).
   *
   * @param mixed $handles
   *
   * @return mixed
   */
  public static function appendStyleHandles($handles)
  {
    return self::mergeRegisteredHandles($handles, self::STYLE_HANDLE_PREFIXES, wp_styles());
  }

  /**
   * @param mixed $handles
   * @param array $prefixes
   * @param mixed $registry  a WP_Scripts or WP_Styles instance
   *
   * @return mixed
   */
  private static function mergeRegisteredHandles($handles, $prefixes, $registry)
  {
    if (!is_array($handles)) {
      return $handles;
    }
    $bitformHandles = $prefixes;
    if (is_object($registry) && !empty($registry->registered)) {
      foreach (array_keys($registry->registered) as $registeredHandle) {
        if (self::hasPrefix($registeredHandle, $prefixes)) {
          $bitformHandles[] = $registeredHandle;
        }
      }
    }
    return array_values(array_unique(array_merge($handles, $bitformHandles)));
  }

  /**
   * Whether a script handle belongs to Bit Form's frontend runtime.
   *
   * @param mixed $handle
   *
   * @return bool
   */
  private static function isBitformHandle($handle)
  {
    return self::hasPrefix($handle, self::HANDLE_PREFIXES);
  }

  /**
   * Whether a style handle belongs to a Bit Form stylesheet.
   *
   * @param mixed $handle
   *
   * @return bool
   */
  private static function isBitformStyleHandle($handle)
  {
    return self::hasPrefix($handle, self::STYLE_HANDLE_PREFIXES);
  }

  /**
   * @param mixed $handle
   * @param array $prefixes
   *
   * @return bool
   */
  private static function hasPrefix($handle, $prefixes)
  {
    if (!is_string($handle) || '' === $handle) {
      return false;
    }
    foreach ($prefixes as $prefix) {
      if (0 === strpos($handle, $prefix)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Whether a tag or file path carries one of the given exclusion patterns.
   *
   * @param mixed $value
   * @param array $patterns
   *
   * @return bool
   */
  private static function matchesAnyPattern($value, $patterns)
  {
    if (!is_string($value) || '' === $value) {
      return false;
    }
    foreach ($patterns as $pattern) {
      if (is_string($pattern) && '' !== $pattern && false !== strpos($value, $pattern)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Return false for Bit Form script handles on boolean, handle-keyed optimizer
   * filters (js_do_concat).
   *
   * @param mixed $value
   * @param mixed $handle
   *
   * @return mixed
   */
  public static function denyForBitformHandle($value, $handle = '')
  {
    return self::isBitformHandle($handle) ? false : $value;
  }

  /**
   * Same, for style handles (css_do_concat).
   *
   * @param mixed $value
   * @param mixed $handle
   *
   * @return mixed
   */
  public static function denyForBitformStyleHandle($value, $handle = '')
  {
    return self::isBitformStyleHandle($handle) ? false : $value;
  }

  /**
   * Same, for filters that carry scripts and styles through one hook
   * (Hummingbird's minify/combine/defer/inline).
   *
   * @param mixed $value
   * @param mixed $handle
   *
   * @return mixed
   */
  public static function denyForBitformAsset($value, $handle = '')
  {
    return self::isBitformHandle($handle) || self::isBitformStyleHandle($handle) ? false : $value;
  }

  /**
   * Deny W3 Total Cache tag minification for Bit Form scripts.
   *
   * @param mixed $doMinification
   * @param mixed $scriptTag
   * @param mixed $file
   *
   * @return mixed
   */
  public static function denyTagMinification($doMinification, $scriptTag = '', $file = '')
  {
    if (self::matchesAnyPattern($scriptTag, self::exclusionPatterns())
      || self::matchesAnyPattern($file, self::exclusionPatterns())) {
      return false;
    }
    return $doMinification;
  }

  /**
   * Deny W3 Total Cache tag minification for Bit Form stylesheets.
   *
   * @param mixed $doMinification
   * @param mixed $styleTag
   * @param mixed $file
   *
   * @return mixed
   */
  public static function denyStyleTagMinification($doMinification, $styleTag = '', $file = '')
  {
    if (self::matchesAnyPattern($styleTag, self::styleExclusionPatterns())
      || self::matchesAnyPattern($file, self::styleExclusionPatterns())) {
      return false;
    }
    return $doMinification;
  }

  /**
   * Stamp exclusion attributes on Bit Form <script src> tags. Honored by
   * Cloudflare Rocket Loader, WP Rocket, LiteSpeed, FlyingPress, Breeze,
   * NitroPack (nitro-exclude) and Jetpack Boost (data-jetpack-boost).
   *
   * @param mixed $tag
   * @param mixed $handle
   *
   * @return mixed
   */
  public static function addNoOptimizeAttributes($tag, $handle)
  {
    if (!is_string($tag) || !self::isBitformHandle($handle)) {
      return $tag;
    }
    if (false !== strpos($tag, 'data-no-optimize')) {
      return $tag;
    }
    return str_replace('<script ', '<script ' . self::NO_OPTIMIZE_ATTRIBUTES, $tag);
  }

  /**
   * Stamp the same attributes on Bit Form stylesheet tags. Covers both the
   * <link> a registered sheet prints and the <style> an inline-only handle
   * prints, since optimizers read either one.
   *
   * @param mixed $tag
   * @param mixed $handle
   *
   * @return mixed
   */
  public static function addStyleNoOptimizeAttributes($tag, $handle)
  {
    if (!is_string($tag) || !self::isBitformStyleHandle($handle)) {
      return $tag;
    }
    if (false !== strpos($tag, 'data-no-optimize')) {
      return $tag;
    }
    $tag = str_replace('<link ', '<link ' . self::NO_OPTIMIZE_ATTRIBUTES, $tag);
    return str_replace('<style ', '<style ' . self::NO_OPTIMIZE_ATTRIBUTES, $tag);
  }

  /**
   * Same attributes for wp_add_inline_script fragments, which never pass
   * through script_loader_tag. WP 6.3+.
   *
   * @param mixed $attributes
   * @param mixed $data
   *
   * @return mixed
   */
  public static function addInlineNoOptimizeAttributes($attributes, $data = '')
  {
    if (!is_array($attributes)) {
      return $attributes;
    }
    $id = isset($attributes['id']) ? $attributes['id'] : '';
    $isBitformInline = (is_string($id) && 0 === strpos($id, 'bitform'))
      || (is_string($data) && false !== strpos($data, 'bf_globals'));
    if ($isBitformInline) {
      $attributes['data-no-optimize'] = '1';
      $attributes['data-no-defer'] = '1';
      $attributes['data-no-minify'] = '1';
      $attributes['data-cfasync'] = 'false';
      $attributes['data-jetpack-boost'] = 'ignore';
      $attributes['nowprocket'] = true;
      $attributes['nitro-exclude'] = true;
    }
    return $attributes;
  }
}
