<?php

/**
 * Plugin Name: Bit Form
 * Plugin URI:  https://www.bitapps.pro/bit-form
 * Description: Contact Form Builder Plugin: Multi Step Contact Form, Payment Form, Custom Contact Form Plugin by Bit Form
 * Version:     3.1.1
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
define('BITFORMS_VERSION', '3.1.1');
define('BITFORMS_PLUGIN_MAIN_FILE', __FILE__);
define('BITFORMS_REQUIRED_BITFORMPRO_VERSION', '3.1.0');

global $bitforms_db_version;
$bitforms_db_version = '3.0';
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

  $update_url = esc_url(admin_url('plugins.php?plugin_status=upgrade'));
  $required = esc_html(BITFORMS_REQUIRED_BITFORMPRO_VERSION);

  // Keep HTML out of translatable strings to prevent translator HTML injection
  $message = '<strong>' . esc_html__('Bit Form Pro', 'bit-form') . '</strong> '
      . sprintf(
        /* translators: %s: minimum required version number */
        esc_html__('requires an update to version %s or higher for full compatibility.', 'bit-form'),
        '<strong>' . $required . '</strong>'
      )
      . ' <a href="' . $update_url . '">' . esc_html__('Update now', 'bit-form') . '</a>';

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
