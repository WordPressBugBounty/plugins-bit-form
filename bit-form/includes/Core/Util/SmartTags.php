<?php

namespace BitCode\BitForm\Core\Util;

/**
 * Class handling SmartTags
 *
 * @since 1.0.0
 */

final class SmartTags
{
  /**
   * All valid smart tag keys.
   *
   * Now derived from the single-source-of-truth registry. Note: the legacy hardcoded
   * list contained '_bf_user_email' twice; the registry returns it once. All known
   * consumers gate via in_array(), so membership is unchanged.
   *
   * @return string[]
   */
  public static function smartTagFieldKeys()
  {
    return array_keys(SmartTagRegistry::definitions());
  }

  public static function getPostUserData($referer = false)
  {
    $post = [];
    if (($referer || FrontendHelpers::isAjaxRequest()) && isset($_SERVER['HTTP_REFERER'])) {
      $postId = url_to_postid(esc_url_raw(wp_unslash($_SERVER['HTTP_REFERER'])));
    } else {
      $postId = url_to_postid(isset($_SERVER['REQUEST_URI']) ? esc_url_raw(wp_unslash($_SERVER['REQUEST_URI'])) : '');
    }

    if ($postId) {
      $post = get_post($postId, 'OBJECT');
    }

    $user = wp_get_current_user();

    $user_roles = $user->roles;

    if (!is_wp_error($user_roles) && count($user_roles) > 0) {
      $user->current_user_role = $user_roles[0];
    }

    $postAuthorInfo = [];
    if (isset($post->post_author)) {
      $postAuthorInfo = get_user_by('ID', $post->post_author);
    }

    return ['user' => $user, 'post' => $post, 'post_author_info' => $postAuthorInfo];
  }

  /**
   * Inject a parametric ("custom") smart tag value into a resolved smart-tag map.
   *
   * Kept for backward compatibility. Delegates to the registry's parametric resolvers.
   * Behavior preserved: empty $customValue leaves the map unchanged; non-parametric or
   * unknown keys (e.g. the no-op function keys _bf_count/_bf_calc/...) are returned as-is.
   *
   * @param array  $smartTags
   * @param string $key
   * @param string $customValue
   * @return array
   */
  public static function setCustomSmartKeyValue($smartTags, $key, $customValue)
  {
    if (empty($customValue)) {
      return $smartTags;
    }
    if (SmartTagRegistry::isParam($key)) {
      $ctx = ['user' => wp_get_current_user(), 'post' => [], 'post_author_info' => []];
      $smartTags[$key] = SmartTagRegistry::resolve($key, $ctx, $customValue);
    }
    return $smartTags;
  }

  /**
   * Build the full resolved smart-tag map for the given context.
   *
   * Output is identical to the legacy implementation: every non-parametric tag is
   * resolved (in registry order); a parametric tag is injected only when explicitly
   * requested via $key (matching the old setCustomSmartKeyValue behavior).
   *
   * @param array  $data        getPostUserData() result
   * @param string $key         optional parametric tag to inject
   * @param string $customValue argument for the parametric tag
   * @return array<string,string>
   */
  public static function smartTags($data, $key = '', $customValue = '')
  {
    $defs = SmartTagRegistry::definitions();
    $smartTags = [];
    foreach ($defs as $tagKey => $def) {
      if ($def['param']) {
        continue; // parametric tags are absent from the base map (legacy parity)
      }
      $smartTags[$tagKey] = SmartTagRegistry::resolve($tagKey, $data);
    }

    if ('' !== $key && SmartTagRegistry::isParam($key)) {
      $smartTags = static::setCustomSmartKeyValue($smartTags, $key, $customValue);
    }
    return $smartTags;
  }

  /**
   * Resolve a single smart tag value.
   *
   * Lazy: resolves only the requested tag instead of rebuilding the whole map.
   *
   * NOTE: $isReferer is intentionally NOT type-hinted. Integration handlers
   * (org + pro ACF/MetaBox/Pods) call this as getSmartTagValue($tag, $data) passing
   * the post/user context array as the second argument; a non-empty array is truthy
   * and routes to referer-mode getPostUserData(true). Do not tighten this signature.
   *
   * @param string $key
   * @param mixed  $isReferer
   * @param string $customValue
   * @return string|null null when the key is unknown
   */
  public static function getSmartTagValue($key, $isReferer = false, $customValue = '')
  {
    if (!SmartTagRegistry::has($key)) {
      return;
    }

    // Parametric tags with no argument resolved to '' under the legacy flow.
    if (SmartTagRegistry::isParam($key) && empty($customValue)) {
      return '';
    }

    $data = self::getPostUserData($isReferer);
    return SmartTagRegistry::resolve($key, $data, $customValue);
  }
}
