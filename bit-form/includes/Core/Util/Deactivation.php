<?php

namespace BitCode\BitForm\Core\Util;

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Class handling plugin deactivation.
 *
 * @since 1.0.0
 * @access private
 * @ignore
 */
final class Deactivation
{
  /**
   * Registers functionality through WordPress hooks.
   *
   * @since 1.0.0
   */
  public function register()
  {
    add_action('bitforms_deactivation', [$this, 'deactive']);
  }

  // handle deactivation tasks with multisite support
  public function deactive($network_wide)
  {
    if ($network_wide && \function_exists('is_multisite') && is_multisite()) {
      global $wpdb;
      $blog_ids = $wpdb->get_col("SELECT blog_id FROM $wpdb->blogs");
      foreach ($blog_ids as $blog_id) {
        switch_to_blog($blog_id);
        $this->deactivateOnCurrentBlog();
        restore_current_blog();
      }
    } else {
      $this->deactivateOnCurrentBlog();
    }
  }

  /**
   * Deactivates plugin for a single site
   */
  public function deactivateOnCurrentBlog()
  {
    $routes = get_option('bitforms_routes');
    if ($routes && isset($routes['root'])) {
      $root_page = ['ID' => $routes['root'], 'post_status' => 'draft'];
      wp_update_post($root_page);
    }
    if ($routes && isset($routes['file'])) {
      $file_page = ['ID' => $routes['file'], 'post_status' => 'draft'];
      wp_update_post($file_page);
    }
    flush_rewrite_rules();
  }
}
