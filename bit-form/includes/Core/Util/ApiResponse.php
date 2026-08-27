<?php

namespace BitCode\BitForm\Core\Util;

use BitCode\BitForm\Core\Database\FormEntryLogModel;

final class ApiResponse
{
  /**
   * Log API response
   *
   * @param int $logID
   * @param int $integrationId
   * @param array $apiType
   * @param string $responseType
   * @param mixed $apiResponse
   * @param array $entryDetails = [] (optional) - (default: ['formId' => 0, 'entryId' => 0,  'fieldValues' => []])
   *
   * @return bool
   */
  public function apiResponse($logID, $integrationId, $apiType, $responseType, $apiResponse, $entryDetails = [])
  {
    if (!$apiType) {
      return false;
    }

    // An empty response means a failed HTTP call; log it or the failure leaves no trace.
    if (is_wp_error($apiResponse)) {
      $apiResponse = [
        'error_code'  => $apiResponse->get_error_code(),
        'description' => $apiResponse->get_error_message(),
      ];
    } elseif (!$apiResponse && !is_array($apiResponse)) {
      $apiResponse = ['description' => __('Empty response received from the API.', 'bit-form')];
    }

    $apiType = wp_json_encode($apiType);
    $apiResponse = wp_json_encode($apiResponse);

    $ipTool = new IpTool();
    $user_details = $ipTool->getUserDetail();
    $formEntryModel = new FormEntryLogModel();
    $result = $formEntryModel->log_history_insert(
      [
        'log_id'         => $logID,
        'integration_id' => $integrationId,
        'api_type'       => $apiType,
        'response_type'  => $responseType,
        'response_obj'   => $apiResponse,
        'created_at'     => $user_details['time'],
      ]
    );

    $fieldValues = [];

    if (isset($entryDetails['fieldValues']) && $entryDetails['fieldValues']) {
      $fieldValues = $entryDetails['fieldValues'];
    }

    $formId = isset($entryDetails['formId']) && !empty($entryDetails['formId']) ? $entryDetails['formId'] : 0;
    $entryId = isset($entryDetails['entryId']) && !empty($entryDetails['entryId']) ? $entryDetails['entryId'] : 0;

    if ('error' === $responseType) {
      // $this->sendErrorEmail($logID, $integrationId, $apiType, $apiResponse, $entryDetails);
      do_action('bitform_integration_api_response_error', $formId, $entryId, $logID, $integrationId, $apiType, $apiResponse, $fieldValues);
    }

    if ('success' === $responseType) {
      // $this->sendSuccessEmail($logID, $integrationId, $apiType, $apiResponse, $entryDetails);
      do_action('bitform_integration_api_response_success', $formId, $entryId, $logID, $integrationId, $apiType, $apiResponse, $fieldValues);
    }

    return $result;
  }
}
