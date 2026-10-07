<?php

namespace BitCode\BitForm\Core\Integration\Dropbox;

use BitCode\BitForm\Core\Util\ApiResponse;
use BitCode\BitForm\Core\Util\FileHandler;
use BitCode\BitForm\Core\Util\HttpHelper;
use WP_Error;

class RecordApiHelper
{
  protected $token;
  protected $formId;
  protected $entryId;
  protected $apiBaseUri = 'https://api.dropboxapi.com';
  protected $contentBaseUri = 'https://content.dropboxapi.com';
  protected $errorApiResponse = [];
  protected $successApiResponse = [];

  private $logResponse;

  public function __construct($token, $formId, $entryId)
  {
    $this->token = $token;
    $this->formId = $formId;
    $this->entryId = $entryId;
    $this->logResponse = new ApiResponse();
  }

  public function uploadFile($folder, $filePath)
  {
    if ('' === $filePath) {
      return;
    }
    $filePath = $this->makeFilePath($filePath);
    $body = FileHandler::readFile($filePath);
    if (!$body) {
      return new WP_Error(423, 'Can\'t open file!');
    }

    $apiEndPoint = $this->contentBaseUri . '/2/files/upload';
    $headers = [
      'Authorization'   => 'Bearer ' . $this->token,
      'Content-Type'    => 'application/octet-stream',
      'Dropbox-API-Arg' => wp_json_encode([
        'path'            => $this->normalizePath($folder) . '/' . $this->fileName($filePath),
        'mode'            => 'add',
        'autorename'      => true,
        'mute'            => true,
        'strict_conflict' => false
      ]),
    ];
    return HttpHelper::post($apiEndPoint, $body, $headers);
  }

  public function fileName($filePath)
  {
    return basename($filePath);
  }

  public function normalizePath($path)
  {
    return str_replace('\\', '/', $path);
  }

  public function handleAllFiles($folderWithFile, $actions)
  {
    foreach ($folderWithFile as $folder => $filePath) {
      if ('' === $filePath) {
        continue;
      }
      if (is_array($filePath)) {
        foreach ($filePath as $singleFilePath) {
          if ('' === $singleFilePath) {
            continue;
          }
          $this->uploadAndCleanup($folder, $singleFilePath, $actions);
        }
      } else {
        $this->uploadAndCleanup($folder, $filePath, $actions);
      }
    }
  }

  /**
   * The local copy is the only copy until Dropbox confirms the upload, so a failed
   * upload (expired token, API error, unreadable file) must keep it on disk.
   */
  private function uploadAndCleanup($folder, $filePath, $actions)
  {
    $response = $this->uploadFile($folder, $filePath);
    if ($this->storeInState($response)) {
      $this->deleteFile($filePath, $actions);
    }
  }

  /**
   * @return bool true when Dropbox returned the uploaded file's metadata
   */
  protected function storeInState($response)
  {
    if (isset($response->id)) {
      $this->successApiResponse[] = $response;
      return true;
    }
    $this->errorApiResponse[] = $response;
    return false;
  }

  public function deleteFile($filePath, $actions)
  {
    if (isset($actions->delete_from_wp) && $actions->delete_from_wp) {
      $filePath = $this->makeFilePath($filePath);
      FileHandler::deleteIsFileExists($filePath);
    }
  }

  public function makeFilePath($filePath)
  {
    // Field values arrive as public file URLs (see IntegrationHandler::handleFileUrl),
    // so reduce to the stored file name before resolving against the entry directory.
    $fileName = basename(wp_parse_url($filePath, PHP_URL_PATH) ?: $filePath);
    return realpath(FileHandler::getEntriesFileUploadDir($this->formId, $this->entryId) . DIRECTORY_SEPARATOR . $fileName);
  }

  public function executeRecordApi($integrationId, $logID, $fieldValues, $fieldMap, $actions)
  {
    $folderWithFile = [];
    foreach ($fieldMap as $value) {
      if (!is_null($fieldValues[$value->formField])) {
        $folderWithFile[$value->dropboxFormField] = $fieldValues[$value->formField];
      }
    }
    $this->handleAllFiles($folderWithFile, $actions);

    $entryDetails = [
      'formId'      => $this->formId,
      'entryId'     => $this->entryId,
      'fieldValues' => $fieldValues
    ];

    if (count($this->errorApiResponse) > 0) {
      $this->logResponse->apiResponse($logID, $integrationId, ['type' =>  'record', 'type_name' => 'insert'], 'error', 'Some Files Can\'t Upload For Some Reason. ' . wp_json_encode($this->errorApiResponse), $entryDetails);
    }
    if (count($this->successApiResponse) > 0) {
      $this->logResponse->apiResponse($logID, $integrationId, ['type' =>  'record', 'type_name' => 'insert'], 'success', 'All Files Uploaded. ' . wp_json_encode($this->successApiResponse), $entryDetails);
    }
  }
}
