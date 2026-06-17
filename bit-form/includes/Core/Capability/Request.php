<?php

namespace BitCode\BitForm\Core\Capability;

use BitCode\BitForm\Core\Util\FileDownloadProvider;

final class Request
{
  public static function Check($type)
  {
    switch ($type) {
      case 'admin':
        return is_admin();

      case 'ajax':
        return defined('DOING_AJAX');

      case 'cron':
        return defined('DOING_CRON');

      case 'api':
        return defined('REST_REQUEST');

      case 'frontend':
        return (!is_admin() || defined('DOING_AJAX')) && !defined('DOING_CRON');
    }
  }

  public static function isPluginPage()
  {
    // Plain permalinks put the file route in the query string (?post_type=bitforms&p=ID),
    // pretty permalinks put it in the path (/bitforms/bitforms-file/). Match both, otherwise
    // the download handler/shortcode never registers on plain-permalink sites.
    $routes = get_option('bitforms_routes');
    $fileRouteId = isset($routes['file']) ? (int) $routes['file'] : 0;

    // Plain permalink: ?p=ID (post) or ?page_id=ID, with post_type=bitforms.
    // Read-only: query vars inspected to detect plugin-managed URL. No state change.
    if (!empty($fileRouteId)) {
      $reqPostId = 0;
      if (isset($_GET['p']) && !is_array($_GET['p'])) {
        $reqPostId = (int) $_GET['p'];
      } elseif (isset($_GET['page_id']) && !is_array($_GET['page_id'])) {
        $reqPostId = (int) $_GET['page_id'];
      }
      if ($reqPostId === $fileRouteId) {
        return true;
      }
    }

    // Pretty permalink: compare request path against the download URL path.
    $downloadUrl = FileDownloadProvider::getBaseDownloadURL();
    $downloadPath = wp_parse_url($downloadUrl, PHP_URL_PATH);
    // Read-only: REQUEST_URI parsed to check if current request targets a plugin-managed URL. No state change.
    $reqPath = isset($_SERVER['REQUEST_URI']) ? wp_parse_url(wp_unslash($_SERVER['REQUEST_URI']), PHP_URL_PATH) : '';
    if (empty($downloadPath) || empty($reqPath)) {
      return false;
    }

    return untrailingslashit($downloadPath) === untrailingslashit($reqPath);
  }
}
