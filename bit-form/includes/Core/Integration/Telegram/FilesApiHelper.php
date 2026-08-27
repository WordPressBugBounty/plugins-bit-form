<?php

/**
 * Telegram Files Api
 *
 */

namespace BitCode\BitForm\Core\Integration\Telegram;

use BitCode\BitForm\Core\Util\FileHandler;
use WP_Error;

/**
 * Provide functionality for Upload files
 */
final class FilesApiHelper
{
  /** sendMediaGroup accepts 2-10 items per call. */
  private const MEDIA_GROUP_LIMIT = 10;

  private $_defaultHeader;
  private $_payloadBoundary;
  private $_basepath;

  /**
   *
   * @param Integer $formID  ID of the form, for which integration is executing
   * @param Integer $entryID Current submission ID
   */
  public function __construct($formID, $entryID)
  {
    // No special chars: the boundary is echoed in the header and every part delimiter.
    $this->_payloadBoundary = 'BitFormBoundary' . wp_generate_password(24, false);
    $this->_defaultHeader['Content-Type'] = 'multipart/form-data; boundary=' . $this->_payloadBoundary;
    $this->_basepath = FileHandler::getEntriesFileUploadDir($formID, $entryID) . DIRECTORY_SEPARATOR;
  }

  /**
   * Helps to execute upload files api
   *
   * @param string $apiEndPoint Telegram API base URL
   * @param array  $data        Data to pass to API
   *
   * @return string|WP_Error Telegram API response body
   */
  public function uploadFiles($apiEndPoint, $data)
  {
    $filePath = $this->resolveFilePath($data['photo']);
    if (is_null($filePath)) {
      return new WP_Error(
        'TELEGRAM_FILE_NOT_FOUND',
        /* translators: %s: uploaded file reference */
        sprintf(__('Telegram attachment could not be read: %s', 'bit-form'), (string) $data['photo'])
      );
    }

    $mimeType = mime_content_type($filePath);
    $mimeType = $mimeType ? $mimeType : 'application/octet-stream';
    $param = self::classifyMime($mimeType);

    switch ($param) {
      case 'photo':
        $apiMethod = '/sendPhoto';
        break;

      case 'audio':
        $apiMethod = '/sendAudio';
        break;

      case 'video':
        $apiMethod = '/sendVideo';
        break;

      default:
        $apiMethod = '/sendDocument';
        break;
    }
    $uploadFileEndpoint = $apiEndPoint . $apiMethod;

    unset($data['photo']);

    $files = [
      $param => [
        'path' => $filePath,
        'mime' => $mimeType,
      ],
    ];

    return $this->post($uploadFileEndpoint, $data, $files);
  }

  /**
   * Split attachment URLs into batches Telegram will accept.
   *
   * sendMediaGroup takes at most ten items and the group must be type-compatible:
   * photo and video may share one, documents may not, audio may not. Bucket order
   * follows first appearance, so a single-type upload behaves as before.
   *
   * @param array $urls Stored attachment URLs
   *
   * @return array List of batches; each batch is a list of
   *               ['url' => string, 'path' => string, 'mime' => string, 'kind' => string].
   *               Unreadable files are dropped.
   */
  public function buildMediaBatches($urls)
  {
    $buckets = [];

    foreach ($urls as $url) {
      $filePath = $this->resolveFilePath($url);
      if (is_null($filePath)) {
        continue;
      }

      $mimeType = mime_content_type($filePath);
      $mimeType = $mimeType ? $mimeType : 'application/octet-stream';
      $kind = self::classifyMime($mimeType);
      // photo and video are the only pair Telegram lets share a media group
      $bucket = ('photo' === $kind || 'video' === $kind) ? 'visual' : $kind;

      $buckets[$bucket][] = [
        'url'  => $url,
        'path' => $filePath,
        'mime' => $mimeType,
        'kind' => $kind,
      ];
    }

    $batches = [];
    foreach ($buckets as $items) {
      foreach (array_chunk($items, self::MEDIA_GROUP_LIMIT) as $chunk) {
        $batches[] = $chunk;
      }
    }

    return $batches;
  }

  /**
   * Send one type-compatible batch of at most ten files as a media group.
   *
   * @param string $apiEndPoint Telegram API base URL
   * @param array  $data        chat_id, parse_mode, caption, and `media`: one
   *                            batch from buildMediaBatches()
   *
   * @return string|WP_Error Telegram API response body
   */
  public function uploadMultipleFiles($apiEndPoint, $data)
  {
    $uploadMultipleFileEndpoint = $apiEndPoint . '/sendMediaGroup';
    $postFields = ['chat_id' => $data['chat_id']];
    $parseMode = empty($data['parse_mode']) ? 'HTML' : $data['parse_mode'];
    $caption = isset($data['caption']) ? $data['caption'] : '';
    $media = [];
    $files = [];

    foreach ($data['media'] as $key => $item) {
      $attachName = "file{$key}";
      $mediaItem = [
        'type'  => $item['kind'],
        'media' => "attach://{$attachName}",
      ];

      // Telegram shows the album caption from the first item only.
      if (empty($media) && '' !== $caption) {
        $mediaItem['caption'] = $caption;
        $mediaItem['parse_mode'] = $parseMode;
      }

      $media[] = $mediaItem;
      $files[$attachName] = [
        'path' => $item['path'],
        'mime' => $item['mime'],
      ];
    }

    if (empty($media)) {
      return new WP_Error('TELEGRAM_FILE_NOT_FOUND', __('None of the Telegram attachments could be read.', 'bit-form'));
    }

    $postFields['media'] = wp_json_encode($media);

    return $this->post($uploadMultipleFileEndpoint, $postFields, $files);
  }

  /**
   * Telegram's media type for a MIME type; also the sendX endpoint suffix.
   *
   * @param string $mimeType
   *
   * @return string photo|audio|video|document
   */
  private static function classifyMime($mimeType)
  {
    $group = strtok($mimeType, '/');

    switch ($group) {
      case 'image':
        return 'photo';

      case 'audio':
        return 'audio';

      case 'video':
        return 'video';

      default:
        return 'document';
    }
  }

  /**
   * Post a hand-built multipart/form-data payload.
   *
   * wp_remote_post() runs array bodies through http_build_query(), which flattens a
   * \CURLFile into params and never uploads it, so the body is encoded here.
   *
   * @param string $endpoint
   * @param array  $fields   Scalar form fields
   * @param array  $files    [name => ['path' => ..., 'mime' => ...]]
   *
   * @return string|WP_Error
   */
  private function post($endpoint, $fields, $files)
  {
    $payload = $this->buildMultipartBody($fields, $files);
    if (is_wp_error($payload)) {
      return $payload;
    }

    $response = wp_remote_post($endpoint, [
      'body'    => $payload,
      'timeout' => 30,
      'headers' => $this->_defaultHeader,
    ]);

    if (is_wp_error($response)) {
      return $response;
    }

    return wp_remote_retrieve_body($response);
  }

  /**
   * @return string|WP_Error
   */
  private function buildMultipartBody($fields, $files)
  {
    $boundary = $this->_payloadBoundary;
    $payload = '';

    foreach ($fields as $name => $value) {
      if (is_null($value) || '' === $value || is_array($value) || is_object($value)) {
        continue;
      }
      $payload .= "--{$boundary}\r\n";
      $payload .= "Content-Disposition: form-data; name=\"{$name}\"\r\n\r\n";
      $payload .= $value . "\r\n";
    }

    foreach ($files as $name => $file) {
      $contents = file_get_contents($file['path']);
      if (false === $contents) {
        return new WP_Error(
          'TELEGRAM_FILE_NOT_FOUND',
          /* translators: %s: attachment file path */
          sprintf(__('Telegram attachment could not be read: %s', 'bit-form'), $file['path'])
        );
      }
      $filename = basename($file['path']);
      $payload .= "--{$boundary}\r\n";
      $payload .= "Content-Disposition: form-data; name=\"{$name}\"; filename=\"{$filename}\"\r\n";
      $payload .= "Content-Type: {$file['mime']}\r\n\r\n";
      $payload .= $contents . "\r\n";
    }

    $payload .= "--{$boundary}--\r\n";

    return $payload;
  }

  /**
   * Map a stored attachment URL back to its file inside this entry's upload dir.
   *
   * @param mixed $url
   *
   * @return string|null Absolute readable path, or null when it can't be resolved
   */
  private function resolveFilePath($url)
  {
    if (!is_string($url) || '' === $url) {
      return null;
    }

    $filename = $this->getFileNameWithExtension(rawurldecode($url));
    if (is_null($filename) || !FileHandler::isSafeFileName($filename)) {
      return null;
    }

    $filePath = $this->_basepath . $filename;

    return is_readable($filePath) && is_file($filePath) ? $filePath : null;
  }

  private function getFileNameWithExtension($url)
  {
    $fileName = basename(strtok($url, '?'));
    return false !== strpos($fileName, '.') ? $fileName : null;
  }
}
