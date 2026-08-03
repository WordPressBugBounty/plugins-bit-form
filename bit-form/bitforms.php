<?php

/**
 * Plugin Name: Bit Form
 * Plugin URI:  https://www.bitapps.pro/bit-form
 * Description: Contact Form Builder Plugin: Multi Step Contact Form, Payment Form, Custom Contact Form Plugin by Bit Form
 * Version:     3.2.2
 * Author:      Contact Form Builder - Bit Form
 * Author URI:  https://www.bitapps.pro
 * Text Domain: bit-form
 * Requires at least: 6.4
 * Requires PHP: 7.4
 * Domain Path: /languages
 * License: GPLv2 or later
 */

/***
 * If try to direct access  plugin folder it will Exit
 **/
if (!defined('ABSPATH')) {
  exit;
}

// Define most essential constants.
define('BITFORMS_VERSION', '3.2.2');
define('BITFORMS_PLUGIN_MAIN_FILE', __FILE__);
define('BITFORMS_REQUIRED_BITFORMPRO_VERSION', '3.2.1');

global $bitforms_db_version;
$bitforms_db_version = '3.2';
define('BITFORMS_DB_VERSION', $bitforms_db_version);
define('BITFORMS_REQUIRED_WP_VERSION', '5.1');
define('BITFORMS_REQUIRED_PHP_VERSION', '7.4');
define('BITFORMS_API_VERSION', '1.0');

if (version_compare(PHP_VERSION, '5.6.0', '>=')) {
  require_once plugin_dir_path(__FILE__) . 'includes/loader.php';
}

/**
 * Handles plugin activation.
 *
 * Throws an error if the plugin is activated on an older version than PHP 5.6.
 */
function bitforms_activate_plugin($network_wide)
{
  if (version_compare(PHP_VERSION, '5.6.0', '<')) {
    wp_die(
      'Bit Form requires PHP version 5.6 or higher.',
      'Error Activating'
    );
  }

  do_action('bitforms_activation', $network_wide);
}

register_activation_hook(__FILE__, 'bitforms_activate_plugin');

/**
 * Handles plugin deactivation.
 */
function bitforms_deactivate_plugin($network_wide)
{
  if (version_compare(PHP_VERSION, '5.6.0', '<')) {
    return;
  }

  do_action('bitforms_deactivation', $network_wide);
}

register_deactivation_hook(__FILE__, 'bitforms_deactivate_plugin');

/**
 * Handles plugin uninstall.
 *
 * @access private
 */
function bitforms_uninstall_plugin()
{
  if (version_compare(PHP_VERSION, '5.6.0', '<')) {
    return;
  }

  do_action('bitforms_uninstall');
}
register_uninstall_hook(__FILE__, 'bitforms_uninstall_plugin');

add_action('plugins_loaded', 'bitforms_check_pro_version');

function bitforms_check_pro_version()
{
  if (!defined('BITFORMPRO_VERSION')) {
    return;
  }
  if (!version_compare(BITFORMPRO_VERSION, BITFORMS_REQUIRED_BITFORMPRO_VERSION, '>=')) {
    add_action('admin_notices', 'bitformsProUpgradeNotice');
  }
}

function bitformsProUpgradeNotice()
{
  // user meta calls safe here — admin_notices fires well after user initialisation
  $dismissed_for = get_user_meta(get_current_user_id(), 'bitforms_dismiss_pro_upgrade_notice', true);
  if (BITFORMS_REQUIRED_BITFORMPRO_VERSION === $dismissed_for) {
    return;
  }

  // "Update now" routes through bitforms_force_pro_update_check(), which busts the cached
  // update data before handing off to WordPress core's native plugin-update flow
  // (Plugin_Upgrader: maintenance mode, filesystem creds, rollback UI). Going straight to
  if (current_user_can('update_plugins')) {
    $update_url = wp_nonce_url(
      admin_url('admin-post.php?action=bitforms_force_pro_update_check'),
      'bitforms_force_pro_update_check'
    );
  } else {
    // Users who cannot update plugins: send them to the Updates screen with a forced
    // refresh so Bit Form Pro's Updater re-checks and stages the update for detection.
    $update_url = self_admin_url('update-core.php?force-check=1');
  }
  $required = esc_html(BITFORMS_REQUIRED_BITFORMPRO_VERSION);

  // Keep HTML out of translatable strings to prevent translator HTML injection
  $message = '<strong>' . esc_html__('Bit Form Pro', 'bit-form') . '</strong> '
      . sprintf(
        /* translators: %s: minimum required version number */
        esc_html__('requires an update to version %s or higher for full compatibility.', 'bit-form'),
        '<strong>' . $required . '</strong>'
      )
      . ' <a href="' . esc_url($update_url) . '">' . esc_html__('Update now', 'bit-form') . '</a>';

  wp_admin_notice(
    $message,
    [
      'type'               => 'error',
      'dismissible'        => true,
      'additional_classes' => ['bitforms-pro-upgrade-notice'],
      'attributes'         => [
        'data-nonce'    => wp_create_nonce('bitforms_dismiss_pro_notice'),
        'data-ajax-url' => esc_url(admin_url('admin-ajax.php')),
      ],
      'paragraph_wrap'     => true,
    ]
  );

  // Script at footer — avoids mid-page inline script
  add_action('admin_footer', 'bitformsProUpgradeNoticeScript');
}

add_action('admin_post_bitforms_force_pro_update_check', 'bitforms_force_pro_update_check');

/**
 * Force a fresh Bit Form Pro update check, then hand off to core's plugin upgrader.
 */
function bitforms_force_pro_update_check()
{
  if (!current_user_can('update_plugins')) {
    wp_die(
      esc_html__('You are not allowed to update plugins on this site.', 'bit-form'),
      esc_html__('Bit Form', 'bit-form'),
      ['response' => 403]
    );
  }
  check_admin_referer('bitforms_force_pro_update_check');

  $pro_plugin_file = 'bitformpro/bitformpro.php';

  // Drop Bit Form Pro's cached version lookup.
  delete_option(md5(sanitize_key('bitformpro') . '_plugin_info'));
  delete_site_transient('bitformpro_api_request_' . md5(serialize('bitformpro')));
  delete_site_transient('update_plugins');

  // Let Pro (or any add-on) flush additional update caches without another Free release.
  do_action('bitforms_force_pro_update_check');

  if (function_exists('wp_update_plugins')) {
    wp_update_plugins();
  }

  // Build the URL with add_query_arg()
  $upgrade_url = add_query_arg(
    [
      'action'   => 'upgrade-plugin',
      'plugin'   => $pro_plugin_file,
      '_wpnonce' => wp_create_nonce('upgrade-plugin_' . $pro_plugin_file),
    ],
    self_admin_url('update.php')
  );

  wp_safe_redirect($upgrade_url);
  exit;
}

function bitformsProUpgradeNoticeScript()
{
  ?>
    <script>
    (function () {
        var notice = document.querySelector('.bitforms-pro-upgrade-notice');
        if (!notice) return;
        notice.addEventListener('click', function (e) {
            if (!e.target.classList.contains('notice-dismiss')) return;
            var fd = new FormData();
            fd.append('action', 'bitforms_dismiss_pro_notice');
            fd.append('nonce', notice.dataset.nonce);
            fetch(notice.dataset.ajaxUrl, { method: 'POST', credentials: 'same-origin', body: fd });
        });
    }());
    </script>
    <?php
}
