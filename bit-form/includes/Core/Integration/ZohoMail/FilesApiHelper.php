<?php

/**
 * ZohoMail Files Api
 *
 */

namespace BitCode\BitForm\Core\Integration\ZohoMail;

use BitCode\BitForm\Core\Util\FileHandler;
use BitCode\BitForm\Core\Util\HttpHelper;

/**
 * Provide functionality for Upload files
 */
final class FilesApiHelper
{
  private $_defaultHeader;
  private $_payloadBoundary;
  private $_basepath;

  public function __construct($tokenDetails, $formID, $entryID)
  {
    $this->_payloadBoundary = wp_generate_password(24);
    $this->_defaultHeader['Authorization'] = "Zoho-oauthtoken {$tokenDetails->access_token}";
    $this->_defaultHeader['Content-Type'] = 'application/octet-stream; boundary=' . $this->_payloadBoundary;
    $this->_basepath = FileHandler::getEntriesFileUploadDir($formID, $entryID) . DIRECTORY_SEPARATOR;
  }

  public function uploadFiles($files, $accountId, $dataCenter)
  {
    $files = self::normalizeFileNames($files);
    $uploadFileEndpoint = "https://mail.zoho.{$dataCenter}/api/accounts/{$accountId}/messages/attachments";

    $payload = '';

    if (file_exists("{$this->_basepath}{$files}")) {
      $uploadFileEndpoint .= '?fileName=' . basename("{$this->_basepath}{$files}");
      $payload .= '--' . $this->_payloadBoundary;
      $payload .= "\r\n";
      $payload .= 'Content-Disposition: form-data; Content-Transfer-Encoding: binary; name="' . 'file' .
          '"; fileName="' . basename("{$this->_basepath}{$files}") . '"' . "\r\n";
      $payload .= "\r\n";
      $payload .= file_get_contents("{$this->_basepath}{$files}");
      $payload .= "\r\n";
      $payload .= '--' . $this->_payloadBoundary . '--';

      $uploadResponse = HttpHelper::post($uploadFileEndpoint, $payload, $this->_defaultHeader);

      return $uploadResponse;
    }
  }

  /**
   * Field values may arrive as public file URLs (see IntegrationHandler::handleFileUrl),
   * so reduce each to the stored file name before resolving against the entry directory.
   *
   * @param mixed $files file name(s) or URL(s)
   *
   * @return mixed
   */
  private static function normalizeFileNames($files)
  {
    if (is_array($files)) {
      return array_map([__CLASS__, 'normalizeFileNames'], $files);
    }
    return is_string($files) ? basename(wp_parse_url($files, PHP_URL_PATH) ?: $files) : $files;
  }
}
