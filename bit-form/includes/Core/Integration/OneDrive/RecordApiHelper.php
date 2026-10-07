<?php

namespace BitCode\BitForm\Core\Integration\OneDrive;

use BitCode\BitForm\Core\Util\ApiResponse;
use BitCode\BitForm\Core\Util\FileHandler;
use WP_Error;

class RecordApiHelper
{
  protected $token;
  protected $formId;
  protected $entryId;
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

  public function uploadFile($folder, $filePath, $folderId, $parentId)
  {
    if ('' === $filePath) {
      return;
    }

    $filePath = $this->makeFilePath($filePath);
    if (is_null($parentId)) {
      $parentId = $folderId;
    }
    $ids = explode('!', $folderId);
    if (count($ids) < 1) {
      return new WP_Error(400, 'Invalid folderId format.');
    }
    if ('' === $filePath) {
      return false;
    }
    $body = FileHandler::readFile($filePath);
    if (!$body) {
      return new WP_Error(423, 'Can\'t open or read file!');
    }
    $apiEndpoint = 'https://api.onedrive.com/v1.0/drives/' . $ids[0] . '/items/' . $parentId . ':/' . basename($filePath) . ':/content';
    $headers = [
      'Authorization' => 'Bearer ' . $this->token,
      'Content-Type'  => 'application/octet-stream',
      'Prefer'        => 'respond-async',
      'X-HTTP-Method' => 'PUT'
    ];
    $args = [
      'body'    => $body,
      'headers' => $headers,
      'timeout' => 30,
      'method'  => 'PUT',
    ];
    $response = wp_remote_request($apiEndpoint, $args);
    $responseBody = wp_remote_retrieve_body($response);
    return json_decode($responseBody);
  }

  public function handleAllFiles($folderWithFile, $actions, $folderId, $parentId)
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
          $this->uploadAndCleanup($folder, $singleFilePath, $actions, $folderId, $parentId);
        }
      } else {
        $this->uploadAndCleanup($folder, $filePath, $actions, $folderId, $parentId);
      }
    }
  }

  /**
   * The local copy is the only copy until OneDrive confirms the upload, so a failed
   * upload (expired token, API error, unreadable file) must keep it on disk.
   */
  private function uploadAndCleanup($folder, $filePath, $actions, $folderId, $parentId)
  {
    $response = $this->uploadFile($folder, $filePath, $folderId, $parentId);
    if ($this->storeInState($response)) {
      $this->deleteFile($filePath, $actions);
    }
  }

  /**
   * @return bool true when OneDrive returned the uploaded item's metadata
   */
  protected function storeInState($response)
  {
    $response = is_string($response) ? json_decode($response) : $response;
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
    return FileHandler::getEntriesFileUploadDir($this->formId, $this->entryId) . DIRECTORY_SEPARATOR . $fileName;
  }

  public function executeRecordApi($integrationId, $logID,  $fieldValues, $fieldMap, $actions, $folderId, $parentId, $formId)
  {
    $folderWithFile = [];
    $actionsAttachments = explode(',', "$actions->attachments");

    if (is_array($actionsAttachments)) {
      foreach ($actionsAttachments as $actionAttachment) {
        if (empty($fieldValues[$actionAttachment])) {
          continue;
        }
        $files = is_array($fieldValues[$actionAttachment]) ? $fieldValues[$actionAttachment] : [$fieldValues[$actionAttachment]];
        foreach ($files as $value) {
          $folderWithFile[] = ["$actionAttachment" => $value];
        }
      }
      $this->handleAllFiles($folderWithFile, $actions, $folderId, $parentId);
    }

    $entryDetails = [
      'formId'      => $formId,
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
