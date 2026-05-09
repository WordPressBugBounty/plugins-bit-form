<?php

namespace BitCode\BitForm\Core\Util;

if (!defined('ABSPATH')) {
  exit;
}

final class FileDownloadProvider
{
  private function isAuthorizedFileRequest($formID, $entryID)
  {
    if (!is_user_logged_in()) {
      return false;
    }

    $currentUserId = get_current_user_id();
    if (empty($currentUserId)) {
      return false;
    }

    // If a nonce is provided, verify it. If it's missing/invalid, fall back to an ownership/capability check.
    $nonce = isset($_GET['nonce']) && is_scalar($_GET['nonce']) ? sanitize_text_field(wp_unslash((string) $_GET['nonce'])) : '';
    $nonceAction = 'bitforms_file_download_' . $formID . '_' . $entryID;
    if (!empty($nonce) && wp_verify_nonce($nonce, $nonceAction)) {
      return true;
    }

    // Capability bypass.
    if (current_user_can('manage_bitform') || current_user_can('manage_options')) {
      return true;
    }

    // Ownership check: non-admin users may only download their own entry files.
    $entryModel = new \BitCode\BitForm\Core\Database\FormEntryModel();
    $entry = $entryModel->get(
      'id',
      [
        'id'      => $entryID,
        'form_id' => $formID,
        'user_id' => $currentUserId,
      ]
    );

    return !is_wp_error($entry) && !empty($entry);
  }

  public function register()
  {
    add_action('template_redirect', [$this, 'authCheckandFrceDownloadHelper']);
    add_shortcode('bitforms-frontend-file', [$this, 'handleFileDownload']);
  }

  public function handleFileDownload()
  {
    // File download: form/entry/file IDs read from query string; authorization enforced via isAuthorizedFileRequest() below.
    if (!isset($_GET['formID']) || !isset($_GET['entryID']) || !isset($_GET['fileID'])) {
      global $wp_query;
      $wp_query->set_404();
      status_header(404);
      get_template_part(404);
      exit();
    }
    $formID = intval(sanitize_text_field(wp_unslash($_GET['formID'])));
    $entryID = intval(sanitize_text_field(wp_unslash($_GET['entryID'])));
    $fileID = sanitize_file_name(wp_unslash($_GET['fileID']));
    if (!$this->isAuthorizedFileRequest($formID, $entryID)) {
      $this->show404();
    }

    $filePath = FileHandler::getEntriesFileUploadDir($formID, $entryID) . DIRECTORY_SEPARATOR . $fileID;

    if (is_readable($filePath)) {
      $this->fileDownloadORView($filePath, true);
    } else {
      $this->show404();
    }
  }

  public static function getBaseDownloadURL()
  {
    $routes = get_option('bitforms_routes');
    if (isset($routes['file'])) {
      $file_page = get_post($routes['file']);
      if (empty($file_page)) {
        $file_route_id = wp_insert_post(
          [
            'post_name'      => 'bitforms-file',
            'comment_status' => 'closed',
            'ping_status'    => 'closed',
            'post_content'   => '<!-- wp:shortcode -->[bitforms-frontend-file /]<!-- /wp:shortcode -->',
            'post_status'    => 'publish',
            'post_type'      => 'bitforms'
          ]
        );
        $routes['file'] = $file_route_id;
        update_option('bitforms_routes', $routes);
        $file_page_slug = get_post_permalink($file_route_id);
      } else {
        $file_page_slug = get_post_permalink($file_page->ID);
      }
    } else {
      $file_route_id = wp_insert_post(
        [
          'post_name'      => 'bitforms-file',
          'comment_status' => 'closed',
          'ping_status'    => 'closed',
          'post_content'   => '<!-- wp:shortcode -->[bitforms-frontend-file /]<!-- /wp:shortcode -->',
          'post_status'    => 'publish',
          'post_type'      => 'bitforms'
        ]
      );
      $route_value = [];
      $route_value['file'] = $file_route_id;
      update_option('bitforms_routes', $route_value);
      $file_page_slug = get_post_permalink($file_route_id);
    }

    return $file_page_slug;
  }

  public function authCheckandFrceDownloadHelper()
  {
    if (!is_singular('bitforms')) {
      return;
    }
    global $post;
    if (!empty($post->post_content)) {
      $shortCodeRegex = get_shortcode_regex();
      preg_match_all('/' . $shortCodeRegex . '/', $post->post_content, $regexMatchGroups);
      if (!empty($regexMatchGroups[2]) && in_array('bitforms-frontend-file', $regexMatchGroups[2]) && is_user_logged_in()) {
        $file = $this->isRequestedFileExists();
        if ($file) {
          $this->fileDownloadORView($file, isset($_GET['download']));
        } else {
          $this->show404();
        }
      } else {
        auth_redirect();
      }
    }
  }

  private function show404()
  {
    global $wp_query;
    $wp_query->set_404();
    status_header(404);
    get_template_part(404);
    exit();
  }

  private function isRequestedFileExists()
  {
    // File download: IDs read from query string; authorization enforced via isAuthorizedFileRequest() below.
    if (!isset($_GET['formID']) || !isset($_GET['entryID']) || !isset($_GET['fileID'])) {
      return false;
    }
    $formID = intval(sanitize_text_field(wp_unslash($_GET['formID'])));
    $entryID = intval(sanitize_text_field(wp_unslash($_GET['entryID'])));
    $fileID = sanitize_file_name(wp_unslash($_GET['fileID']));

    if (!$this->isAuthorizedFileRequest($formID, $entryID)) {
      return false;
    }

    $filePath = FileHandler::getEntriesFileUploadDir($formID, $entryID) . DIRECTORY_SEPARATOR . $fileID;
    if (is_readable($filePath)) {
      return $filePath;
    }

    return false;
  }

  private function fileDownloadORView($filePath, $forceDownload = false)
  {
    if ($forceDownload) {
      header('Content-Type: application/force-download');
      header('Content-Type: application/octet-stream');
      header('Content-Type: application/download');
      header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
    } else {
      $fileInfo = wp_check_filetype($filePath);
      $content_types = 'text/plain';
      if ($fileInfo['type'] && $fileInfo['ext']) {
        $content_types = $fileInfo['type'];
        $ext = $fileInfo['ext'];
        if (in_array($ext, ['txt', 'php', 'html', 'xhtml', 'json'], true)) {
          $content_types = 'text/plain';
        }
      }
      header('Content-Disposition:filename="' . basename($filePath) . '"');
      header("Content-Type: $content_types");
    }
    header('Content-Description: File Transfer');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filePath));
    header('Content-Transfer-Encoding: binary ');
    flush();
    // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_readfile -- Streaming binary download; WP_Filesystem has no streaming equivalent and get_contents() would load entire file into memory.
    readfile($filePath);
    die();
  }
}
