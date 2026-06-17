<?php

namespace BitCode\BitForm\Core\Util;

/**
 * Single source of truth for Smart Tag definitions.
 *
 * Each tag is described once with:
 *  - category          : 'static' | 'identity' | 'request' | 'param'
 *  - frontendExposable : may this tag appear in window.bf_globals[formId].smartTags?
 *  - param             : does the resolver need a $customValue argument?
 *  - resolver          : callable($ctx[, $customValue]) returning the resolved string
 *
 * $ctx is the array returned by SmartTags::getPostUserData():
 *   ['user' => WP_User, 'post' => WP_Post|array, 'post_author_info' => WP_User|array]
 *
 * Exposure / cache policy (see security review – Bret Botham reports):
 *  - STATIC  : non-sensitive site/post context. Cache-safe (page cache key is the URL).
 *              Safe to bake at render and expose to the frontend when referenced.
 *  - IDENTITY: PII (admin/user/author). Never auto-exposed to the frontend; resolved
 *              server-side at submit time.
 *  - REQUEST : visitor/time fingerprint (ip, referer, browser, os, time...). MUST NOT be
 *              baked into cacheable HTML; resolved server-side at submit time so the value
 *              reflects the real submitter, not a cached render.
 *  - PARAM   : parametric tags needing a custom argument; resolved on demand only.
 *
 * The resolvers reproduce the exact output of the legacy SmartTags::smartTags() map so
 * every backend caller (email/PDF, integrations, workflow) keeps identical behavior.
 *
 * @since 1.0.0
 */
final class SmartTagRegistry
{
  const CAT_STATIC   = 'static';
  const CAT_IDENTITY = 'identity';
  const CAT_REQUEST  = 'request';
  const CAT_PARAM    = 'param';

  /** @var array<string,array>|null memoized definitions for the current request */
  private static $defs = null;

  /** @var array<string,string>|null memoized parsed user-agent device for the request */
  private static $device = null;

  /**
   * Lazily parse the visitor device once per request.
   * Mirrors legacy smartTags(): explode('|', IpTool::getUserDetail()['device']).
   *
   * @return array{browser:string,os:string}
   */
  private static function device()
  {
    if (null === self::$device) {
      $userDetail = IpTool::getUserDetail();
      $parts = explode('|', isset($userDetail['device']) ? $userDetail['device'] : '');
      self::$device = [
        'browser' => isset($parts[0]) ? $parts[0] : '',
        'os'      => isset($parts[1]) ? $parts[1] : '',
      ];
    }
    return self::$device;
  }

  private static function def($category, $frontendExposable, callable $resolver, $param = false)
  {
    return [
      'category'          => $category,
      'frontendExposable' => $frontendExposable,
      'param'             => $param,
      'resolver'          => $resolver,
    ];
  }

  /**
   * The full registry. Order matches the legacy smartTags() map so callers that
   * iterate the full array receive the same key order.
   *
   * @return array<string,array>
   */
  public static function definitions()
  {
    if (null !== self::$defs) {
      return self::$defs;
    }

    $S = self::CAT_STATIC;
    $I = self::CAT_IDENTITY;
    $R = self::CAT_REQUEST;
    $P = self::CAT_PARAM;

    $defs = [
      // ---- REQUEST / time (not frontend-exposable; resolve at submit) ----
      '_bf_current_time'       => self::def($R, false, fn ($c) => wp_date('Y-m-d H:i:s')),

      // ---- IDENTITY ----
      '_bf_admin_email'        => self::def($I, false, fn ($c) => get_bloginfo('admin_email')),

      // ---- STATIC date constants (cache-tolerable, non-sensitive) ----
      '_bf_date_default'       => self::def($S, true, fn ($c) => wp_date(get_option('date_format'))),
      '_bf_date.m/d/y'         => self::def($S, true, fn ($c) => wp_date('m/d/y')),
      '_bf_date.d/m/y'         => self::def($S, true, fn ($c) => wp_date('d/m/y')),
      '_bf_date.y/m/d'         => self::def($S, true, fn ($c) => wp_date('y/m/d')),
      '_bf_date.Y-m-d'         => self::def($S, true, fn ($c) => wp_date('Y-m-d')),
      '_bf_date.d-M, Y'        => self::def($S, true, fn ($c) => wp_date('d-M, Y')),

      // ---- REQUEST / time ----
      '_bf_time'               => self::def($R, false, fn ($c) => wp_date(get_option('time_format'))),
      '_bf_weekday'            => self::def($R, false, fn ($c) => wp_date('l')),
      '_bf_http_referer_url'   => self::def($R, false, fn ($c) => isset($_SERVER['HTTP_REFERER']) ? esc_url_raw(wp_unslash($_SERVER['HTTP_REFERER'])) : ''),
      '_bf_ip_address'         => self::def($R, false, fn ($c) => IpTool::getIP()),
      '_bf_browser_name'       => self::def($R, false, fn ($c) => self::device()['browser']),
      '_bf_operating_system'   => self::def($R, false, fn ($c) => self::device()['os']),

      // ---- STATIC ----
      '_bf_random_digit'       => self::def($S, true, fn ($c) => uniqid()),

      // ---- IDENTITY (current user PII) ----
      '_bf_user_id'            => self::def($I, false, fn ($c) => isset($c['user']->ID) ? strval($c['user']->ID) : ' '),
      '_bf_user_first_name'    => self::def($I, false, fn ($c) => isset($c['user']->first_name) ? $c['user']->first_name : ' '),
      '_bf_user_last_name'     => self::def($I, false, fn ($c) => isset($c['user']->last_name) ? $c['user']->last_name : ' '),
      '_bf_user_display_name'  => self::def($I, false, fn ($c) => isset($c['user']->display_name) ? $c['user']->display_name : ' '),
      '_bf_user_nice_name'     => self::def($I, false, fn ($c) => isset($c['user']->user_nicename) ? $c['user']->user_nicename : ' '),
      '_bf_user_login_name'    => self::def($I, false, fn ($c) => isset($c['user']->user_login) ? $c['user']->user_login : ' '),
      '_bf_user_email'         => self::def($I, false, fn ($c) => isset($c['user']->user_email) ? $c['user']->user_email : ' '),
      '_bf_user_url'           => self::def($I, false, fn ($c) => isset($c['user']->user_url) ? $c['user']->user_url : ' '),
      '_bf_current_user_role'  => self::def($I, false, fn ($c) => isset($c['user']->current_user_role) ? $c['user']->current_user_role : ' '),

      // ---- IDENTITY (post author PII) ----
      '_bf_author_id'          => self::def($I, false, fn ($c) => isset($c['post_author_info']->ID) ? strval($c['post_author_info']->ID) : ' '),
      '_bf_author_display'     => self::def($I, false, fn ($c) => isset($c['post_author_info']->display_name) ? $c['post_author_info']->display_name : ' '),
      '_bf_author_email'       => self::def($I, false, fn ($c) => isset($c['post_author_info']->user_email) ? $c['post_author_info']->user_email : ' '),

      // ---- STATIC (site) ----
      '_bf_site_title'         => self::def($S, true, fn ($c) => get_bloginfo('name')),
      '_bf_site_description'   => self::def($S, true, fn ($c) => get_bloginfo('description')),
      '_bf_site_url'           => self::def($S, true, fn ($c) => get_bloginfo('url')),
      '_bf_wp_local_codes'     => self::def($S, true, fn ($c) => get_bloginfo('language')),
      '_bf_separator'          => self::def($S, true, fn ($c) => BITFORMS_BF_SEPARATOR),

      // ---- STATIC (post context; cache-safe per URL) ----
      '_bf_post_id'            => self::def($S, true, fn ($c) => (isset($c['post']) && is_object($c['post'])) ? strval($c['post']->ID) : ''),
      '_bf_post_name'          => self::def($S, true, fn ($c) => (isset($c['post']) && is_object($c['post'])) ? $c['post']->post_name : ''),
      '_bf_post_title'         => self::def($S, true, fn ($c) => (isset($c['post']) && is_object($c['post'])) ? $c['post']->post_title : ''),
      '_bf_post_date'          => self::def($S, true, fn ($c) => (isset($c['post']) && is_object($c['post'])) ? $c['post']->post_date : ''),
      // editorial-workflow timestamp: resolves server-side but never auto-exposed to frontend
      '_bf_post_modified_date' => self::def($S, false, fn ($c) => (isset($c['post']) && is_object($c['post'])) ? $c['post']->post_modified : ''),
      '_bf_post_url'           => self::def($S, true, fn ($c) => (isset($c['post']) && is_object($c['post'])) ? strval(get_permalink($c['post']->ID)) : ''),

      // ---- IDENTITY / REQUEST tail ----
      '_bf_is_user_logged_in'  => self::def($I, false, fn ($c) => is_user_logged_in() ? 'logged_in' : 'logged_out'),
      '_bf_entry_id'           => self::def($R, false, function ($c) {
        global $bitform_entry_id;
        return $bitform_entry_id ? $bitform_entry_id : '';
      }),
      '_bf_back_view'          => self::def($R, false, function ($c) {
        global $wp;
        return home_url($wp->request);
      }),

      // ---- PARAM (resolved on demand only; never in the base map) ----
      '_bf_query_param'        => self::def($R, false, fn ($c, $v) => (isset($_GET[$v]) && is_string($_GET[$v])) ? sanitize_text_field(urldecode(wp_unslash($_GET[$v]))) : '', true),
      '_bf_user_meta_key'      => self::def($I, false, function ($c, $v) {
        $user = wp_get_current_user();
        $metaValue = get_user_meta($user->ID, $v, true);
        return ($metaValue && is_string($metaValue)) ? $metaValue : '';
      }, true),
      '_bf_custom_date_format' => self::def($S, false, fn ($c, $v) => '' === $v ? '' : wp_date($v), true),
    ];

    /**
     * Allow add-ons (e.g. Bit Form Pro) to register additional smart tags without
     * hardcoding them in core. Each definition must follow the structure above.
     *
     * @param array<string,array> $defs
     */
    self::$defs = apply_filters('bitform_smarttag_definitions', $defs);

    return self::$defs;
  }

  /** Whether a key exists in the registry. */
  public static function has($key)
  {
    $defs = self::definitions();
    return isset($defs[$key]);
  }

  /** Whether a key is a parametric tag. */
  public static function isParam($key)
  {
    $defs = self::definitions();
    return isset($defs[$key]) && $defs[$key]['param'];
  }

  /** Category of a key, or null when unknown. */
  public static function category($key)
  {
    $defs = self::definitions();
    return isset($defs[$key]) ? $defs[$key]['category'] : null;
  }

  /** Whether a key may be emitted into the frontend bf_globals smartTags object. */
  public static function isFrontendExposable($key)
  {
    $defs = self::definitions();
    return isset($defs[$key]) && $defs[$key]['frontendExposable'] && !$defs[$key]['param'];
  }

  /**
   * Resolve a single tag value from the registry.
   *
   * @param string $key
   * @param array  $ctx        getPostUserData() result
   * @param string $customValue parametric argument (for PARAM tags)
   * @return string
   */
  public static function resolve($key, $ctx, $customValue = '')
  {
    $defs = self::definitions();
    if (!isset($defs[$key])) {
      return '';
    }
    $resolver = $defs[$key]['resolver'];
    return $defs[$key]['param'] ? $resolver($ctx, $customValue) : $resolver($ctx);
  }
}
