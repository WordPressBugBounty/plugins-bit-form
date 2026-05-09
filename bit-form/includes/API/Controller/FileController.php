<?php

namespace BitCode\BitForm\API\Controller;

use BitCode\BitForm\Core\Database\FormEntryModel;
use BitCode\BitForm\Core\Util\FileHandler;
use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;

class FileController extends WP_REST_Controller
{
  public function handleFileDownload(WP_REST_Request $request)
  {
    $params = $request->get_params();
    $formID = isset($params['formID']) ? absint($params['formID']) : 0;
    if (empty($formID)) {
      return new WP_Error('invalid_form_id', 'Invalid or missing formID parameter', ['status' => 400, 'success' => false]);
    }

    $entryID = isset($params['entryID']) ? absint($params['entryID']) : 0;
    if (empty($entryID)) {
      return new WP_Error('invalid_entry_id', 'Invalid or missing entryID parameter', ['status' => 400, 'success' => false]);
    }

    $fileName = isset($params['fileID']) ? sanitize_file_name((string) $params['fileID']) : '';
    if (empty($fileName)) {
      return new WP_Error('invalid_file_id', 'Invalid or missing fileID parameter', ['status' => 400, 'success' => false]);
    }

    $filePath = $this->getValidatedFilePath($formID, $entryID, $fileName);
    if (is_wp_error($filePath)) {
      return $filePath;
    }

    if (!$this->isValidEntryFileRequest($formID, $entryID)) {
      return new WP_Error('file_not_found', 'File not found.', ['status' => 404, 'success' => false]);
    }

    $forceDownload = isset($params['download']) && 'true' === strtolower(sanitize_text_field((string) $params['download']));

    $this->serveFile($filePath, $forceDownload);
  }

  private function getValidatedFilePath($formID, $entryID, $fileName)
  {
    $baseDir = FileHandler::getEntriesFileUploadDir($formID, $entryID);
    $baseDirRealPath = realpath($baseDir);

    if (empty($baseDirRealPath) || !is_dir($baseDirRealPath)) {
      return new WP_Error('file_not_found', 'File not found.', ['status' => 404, 'success' => false]);
    }

    $filePath = $baseDirRealPath . DIRECTORY_SEPARATOR . $fileName;
    $realFilePath = realpath($filePath);

    if (empty($realFilePath) || !is_file($realFilePath) || !is_readable($realFilePath)) {
      return new WP_Error('file_not_found', 'File not found.', ['status' => 404, 'success' => false]);
    }

    $normalizedBaseDir = trailingslashit(wp_normalize_path($baseDirRealPath));
    $normalizedFilePath = wp_normalize_path($realFilePath);

    if (0 !== strpos($normalizedFilePath, $normalizedBaseDir)) {
      return new WP_Error('invalid_file_path', 'Invalid file path.', ['status' => 400, 'success' => false]);
    }

    return $realFilePath;
  }

  private function isValidEntryFileRequest($formID, $entryID)
  {
    $entryModel = new FormEntryModel();
    $entry = $entryModel->get(
      'id',
      [
        'id'      => $entryID,
        'form_id' => $formID,
      ]
    );

    return !is_wp_error($entry) && !empty($entry);
  }

  private function serveFile($filePath, $forceDownload = false)
  {
    $fileName = wp_basename($filePath);
    $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $fileInfo = wp_check_filetype($fileName);
    $contentType = !empty($fileInfo['type']) ? $fileInfo['type'] : 'application/octet-stream';

    $safeTextPreviewExtensions = [
      'csv',
      'json',
      'md',
      'txt',
    ];
    $safeMediaPreviewExtensions = [
      'pdf',
      'jpg',
      'jpeg',
      'png',
      'gif',
      'webp',
    ];
    $allowInlineTextPreview = !$forceDownload && in_array($extension, $safeTextPreviewExtensions, true);
    $allowInlineMediaPreview = !$forceDownload && in_array($extension, $safeMediaPreviewExtensions, true);
    $allowInlinePreview = $allowInlineTextPreview || $allowInlineMediaPreview;

    if ($allowInlineTextPreview) {
      $contentType = 'text/plain; charset=' . get_option('blog_charset', 'UTF-8');
    } elseif (!$allowInlineMediaPreview) {
      $contentType = 'application/octet-stream';
    }

    if (!headers_sent()) {
      if (function_exists('nocache_headers')) {
        nocache_headers();
      }

      header('X-Content-Type-Options: nosniff');
      header('X-Frame-Options: SAMEORIGIN');
      header('Referrer-Policy: same-origin');
      header('Content-Description: File Transfer');
      header('Content-Length: ' . filesize($filePath));
      header('Content-Transfer-Encoding: binary');
      header('Accept-Ranges: none');

      if (!$allowInlinePreview) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . rawurlencode($fileName) . '"; filename*=UTF-8\'\'' . rawurlencode($fileName));
      } else {
        header('Content-Type: ' . $contentType);
        header('Content-Disposition: inline; filename="' . rawurlencode($fileName) . '"; filename*=UTF-8\'\'' . rawurlencode($fileName));
      }
    }

    while (ob_get_level() > 0) {
      ob_end_clean();
    }

    flush();
    // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_readfile -- Streaming binary download; WP_Filesystem has no streaming equivalent and get_contents() would load entire file into memory.
    readfile($filePath);
    exit;
  }
}
