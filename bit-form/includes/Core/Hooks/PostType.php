<?php

namespace BitCode\BitForm\Core\Hooks;

class PostType
{
  public static function registerBitformsPostType()
  {
    $args = [
      'label'               => __('Bitform Pages', 'bit-form'),
      // Internal helper post type (file-download page). Kept out of sitemaps/search/index,
      // but still resolvable for the authenticated download flow (is_singular + permalink).
      'public'              => false,
      'publicly_queryable'  => true,
      'exclude_from_search' => true,
      'show_in_nav_menus'   => false,
      'show_ui'             => true,
      'show_in_menu'        => false,
      'capability_type'     => 'page',
      'hierarchical'        => false,
      'has_archive'         => false,
      'query_var'           => false,
      'rewrite'             => true,
      'supports'            => ['title'],
      'show_in_rest'        => false,
    ];
    register_post_type('bitforms', $args);
  }

  /**
   * Add noindex/nofollow to the internal 'bitforms' helper page. `public => false` already
   * removes it from WP core sitemaps; this guards every reachable URL (incl. third-party SEO
   * plugin sitemaps like Yoast/RankMath and already-indexed URLs) from search-engine indexing.
   */
  public static function noindexBitformsPages($robots)
  {
    if (is_singular('bitforms')) {
      return wp_robots_no_robots($robots);
    }

    return $robots;
  }

  public static function scheduleRewriteFlush()
  {
    set_transient('bitform_flush_rewrite_rules', true, DAY_IN_SECONDS);
  }

  public static function registerCustomPostType()
  {
    if (get_transient('bitform_flush_rewrite_rules')) {
      delete_transient('bitform_flush_rewrite_rules');
      flush_rewrite_rules(false);
    }
    $cpts = get_option('bitform_custom_post_types');
    if (!empty($cpts)) {
      foreach ($cpts as $cpt) {
        if (empty($cpt->name) || strlen($cpt->name) > 20) {
          continue;
        }
        $labels = [
          'name'          => esc_html($cpt->name),
          'singular_name' => esc_html($cpt->singular_label),
          'menu_name'     => esc_html($cpt->menu_name),
        ];
        $args = [
          'labels'             => $labels,
          'public'             => 1 === $cpt->public ? true : false,
          'publicly_queryable' => 1 === $cpt->public_queryable ? true : false,
          'show_ui'            => 1 === $cpt->show_ui ? true : false,
          'show_in_menu'       => 1 === $cpt->show_in_menu ? true : false,
          'query_var'          => true,
          'rewrite'            => ['slug' => $cpt->name],
          'capability_type'    => 'post',
          'has_archive'        => true,
          'hierarchical'       => false,
          'show_in_rest'       => 1 === isset($cpt->show_in_rest) ? true : false,
          'menu_icon'          => $cpt->menu_icon,
          'supports'           => ['title', 'editor', 'author', 'excerpt', 'comments'],
        ];
        register_post_type($cpt->name, $args);
      }
    }
  }
}
