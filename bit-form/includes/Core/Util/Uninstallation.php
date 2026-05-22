<?php

namespace BitCode\BitForm\Core\Util;

if (!defined('ABSPATH')) {
  exit;
}
use WP_Site;

/**
 * Class handling plugin uninstallation.
 *
 * @since 1.0.0
 * @access private
 * @ignore
 */
final class Uninstallation
{
  /**
   * Registers functionality through WordPress hooks.
   *
   * @since 1.0.0
   */
  public function register()
  {
    add_action('bitforms_uninstall', [self::class, 'uninstall']);
    add_action('wp_uninitialize_site', [$this, 'uninitializeSite']);
  }

  /**
   * Will run on deletion of plugin from plugin page.
   * N.B: this method must have to be static otherwise will not run in deletion
   *
   */
  public static function uninstall()
  {
    flush_rewrite_rules();
    if (is_multisite()) {
      $sites = get_sites(['fields' => 'ids', 'network_id' => get_current_network_id()]);
      foreach ($sites as $site) {
        switch_to_blog($site);
        self::deleteFromCurrentSite();
        restore_current_blog();
      }
    } else {
      self::deleteFromCurrentSite();
    }
  }

  public static function deleteFromCurrentSite()
  {
    $routes = get_option('bitforms_routes');
    if ($routes && isset($routes['root'])) {
      wp_delete_post($routes['root']);
      wp_delete_post($routes['file']);
    }

    $data = get_option('bitform_app_config');
    if ($data && isset($data->delete_table) && $data->delete_table) {
      self::dropTables();
    }
    self::deleteOptions();
  }

  public function uninitializeSite(WP_Site $oldSite)
  {
    switch_to_blog($oldSite->blog_id);
    self::dropTables();
    restore_current_blog();
  }

  public static function dropTables()
  {
    global $wpdb;
    $tableArray = [
      'bitforms_email_template',
      'bitforms_form',
      'bitforms_form_entries',
      'bitforms_form_entrymeta',
      'bitforms_form_entry_log',
      'bitforms_form_log_details',
      'bitforms_integration',
      'bitforms_reports',
      'bitforms_success_messages',
      'bitforms_workflows',
      'bitforms_form_entry_relatedinfo',
      'bitforms_form_v1',
      'bitforms_success_messages_v1',
      'bitforms_workflows_v1',
    ];

    foreach ($tableArray as $tablename) {
      $wpdb->query($wpdb->prepare('DROP TABLE IF EXISTS `%1s`', $wpdb->prefix . $tablename));
    }
  }

  public static function deleteOptions()
  {
    global $wpdb;
    $pluginOptions = [
      'bitform_app_config',
      'bitform_app_settings',
      'bitforms_routes',
      'bitforms_db_version',
      'bitforms_installed',
      'bitforms_version',
      'bitforms_routes',
      'bitform_secret_api_key',
      'bitforms_migrated_to_v2',
      'bitforms_migrating_to_v2',
      'bitforms_changelog_version',
      'bitforms_hide_announcement',
      'bitforms_hide_cashback',
      'bitform_csrf_secret',
      'bitform_form_update_version',
      'bitforms_salt',
    ];

    $placeholders = implode(',', array_fill(0, count($pluginOptions), '%s'));
    $wpdb->query(
      $wpdb->prepare(
        'DELETE FROM `' . $wpdb->prefix . 'options` WHERE option_name IN (' . $placeholders . ')',
        ...$pluginOptions
      )
    );
  }
}
