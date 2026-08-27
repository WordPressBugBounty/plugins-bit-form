<?php

/**
 * ZohoMail Integration
 *
 */

namespace BitCode\BitForm\Core\Integration\ZohoMail;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Core\Integration\IntegrationHandler;
use BitCode\BitForm\Core\Util\HttpHelper;
use BitCode\BitForm\Core\Util\IpTool;
use BitCode\BitForm\GlobalHelper;
use WP_Error;

/**
 * Provide functionality for ZohoCrm integration
 */
class ZohoMailHandler
{
  private $_formID;
  private $_integrationID;

  public function __construct($integrationID, $fromID)
  {
    $this->_formID = $fromID;
    $this->_integrationID = $integrationID;
  }

  /**
   * Helps to register ajax function's with wp
   *
   * @return null
   */
  public static function registerAjax()
  {
    add_action('wp_ajax_bitforms_zmail_generate_token', [__CLASS__, 'generateTokens']);
  }

  /**
   * Process ajax request for generate_token
   *
   * @return JSON zoho crm api response and status
   */
  public static function generateTokens()
  {
    if (isset($_REQUEST['_ajax_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_REQUEST['_ajax_nonce'])), 'bitforms_save')) {
      $authorizationHeader = null;

      GlobalHelper::requirePostMethod();

      try {
        $requestsParams = GlobalHelper::formatRequestData();
      } catch (\InvalidArgumentException $e) {
        wp_send_json_error($e->getMessage(), 400);
      }

      if (
        empty($requestsParams->{'accounts-server'})
        || empty($requestsParams->dataCenter)
        || empty($requestsParams->clientId)
        || empty($requestsParams->clientSecret)
        || empty($requestsParams->redirectURI)
        || empty($requestsParams->code)
      ) {
        wp_send_json_error(
          __(
            'Requested parameter is empty',
            'bit-form'
          ),
          400
        );
      }

      $apiEndpoint = \urldecode($requestsParams->{'accounts-server'}) . '/oauth/v2/token';
      $requestParams = [
        'grant_type'    => 'authorization_code',
        'client_id'     => $requestsParams->clientId,
        'client_secret' => $requestsParams->clientSecret,
        'redirect_uri'  => \urldecode($requestsParams->redirectURI),
        'code'          => $requestsParams->code
      ];
      $apiResponse = HttpHelper::post($apiEndpoint, $requestParams);

      // Validate the token exchange before using the token: reading access_token
      // off an error response fatals.
      if (is_wp_error($apiResponse) || !empty($apiResponse->error) || empty($apiResponse->access_token)) {
        wp_send_json_error(
          empty($apiResponse->error) ? 'Unknown' : $apiResponse->error,
          400
        );
      }

      // https, not http: the WP HTTP API drops the Authorization header on a
      // redirect, so an http:// call reaches Zoho as INVALID_OAUTHTOKEN.
      $accountIdEndpoint = "https://mail.zoho.{$requestsParams->dataCenter}/api/accounts";
      $authorizationHeader['Authorization'] = "Zoho-oauthtoken {$apiResponse->access_token}";
      $accountResponse = HttpHelper::get($accountIdEndpoint, null, $authorizationHeader);

      // On success `data` is a list of accounts; on failure it is an object
      // ({errorCode:...}), so check the shape before reading the account.
      $account = null;
      if (!is_wp_error($accountResponse) && isset($accountResponse->data) && is_array($accountResponse->data)) {
        $account = reset($accountResponse->data);
      }

      if (empty($account) || empty($account->accountId)) {
        $reason = __('Could not read the Zoho Mail account for this token', 'bit-form');
        if (is_wp_error($accountResponse)) {
          $reason = $accountResponse->get_error_message();
        } elseif (!empty($accountResponse->data->errorCode)) {
          $reason = $accountResponse->data->errorCode;
        } elseif (!empty($accountResponse->status->description)) {
          $reason = $accountResponse->status->description;
        }
        wp_send_json_error($reason, 400);
      }

      $apiResponse->accountId = $account->accountId;
      $apiResponse->accountEmail = isset($account->primaryEmailAddress) ? $account->primaryEmailAddress : '';
      $apiResponse->generates_on = \time();
      wp_send_json_success($apiResponse, 200);
    } else {
      wp_send_json_error(
        __(
          'Token expired',
          'bit-form'
        ),
        401
      );
    }
  }

  /**
   * Helps to refresh zoho crm access_token
   *
   * @param  object $apiData Contains required data for refresh access token
   * @return string|boolean  $tokenDetails API token details
   */
  protected static function _refreshAccessToken($apiData)
  {
    if (
      empty($apiData->dataCenter)
      || empty($apiData->clientId)
      || empty($apiData->clientSecret)
      || empty($apiData->tokenDetails)
    ) {
      return false;
    }
    $tokenDetails = $apiData->tokenDetails;

    $dataCenter = $apiData->dataCenter;
    $apiEndpoint = "https://accounts.zoho.{$dataCenter}/oauth/v2/token";
    $requestParams = [
      'grant_type'    => 'refresh_token',
      'client_id'     => $apiData->clientId,
      'client_secret' => $apiData->clientSecret,
      'refresh_token' => $tokenDetails->refresh_token,
    ];

    $apiResponse = HttpHelper::post($apiEndpoint, $requestParams);
    if (is_wp_error($apiResponse) || !empty($apiResponse->error)) {
      return false;
    }
    $tokenDetails->generates_on = \time();
    $tokenDetails->access_token = $apiResponse->access_token;
    return $tokenDetails;
  }

  /**
   * Save updated access_token to avoid unnecessary token generation
   *
   * @param integer $fromID        ID of Integration related form
   * @param integer $integrationID ID of Zoho crm Integration
   * @param object $tokenDetails  refreshed token info
   *
   * @return null
   */
  protected static function _saveRefreshedToken($formID, $integrationID, $tokenDetails, $others = null)
  {
    if (empty($formID) || empty($integrationID)) {
      return;
    }

    $integrationHandler = new IntegrationHandler($formID, IpTool::getUserDetail());
    $zmailDetails = $integrationHandler->getAIntegration($integrationID);

    if (is_wp_error($zmailDetails)) {
      return;
    }
    $newDetails = json_decode($zmailDetails[0]->integration_details);

    $newDetails->tokenDetails = $tokenDetails;

    $integrationHandler->updateIntegration($integrationID, $zmailDetails[0]->integration_name, 'Zoho Mail', wp_json_encode($newDetails), 'form');
  }

  public function execute(IntegrationHandler $integrationHandler, $integrationData, $fieldValues, $entryID, $logID)
  {
    $integrationDetails = is_string($integrationData->integration_details) ? json_decode($integrationData->integration_details) : $integrationData->integration_details;

    $tokenDetails = $integrationDetails->tokenDetails;

    if (empty($tokenDetails)) {
      return new WP_Error('REQ_FIELD_EMPTY', __('module, fields are required for zoho mail api', 'bit-form'));
    }

    $requiredParams = null;
    if ((intval($tokenDetails->generates_on) + (55 * 60)) < time()) {
      $requiredParams['clientId'] = $integrationDetails->clientId;
      $requiredParams['clientSecret'] = $integrationDetails->clientSecret;
      $requiredParams['dataCenter'] = $integrationDetails->dataCenter;
      $requiredParams['tokenDetails'] = $tokenDetails;
      $newTokenDetails = ZohoMailHandler::_refreshAccessToken((object)$requiredParams);
      if ($newTokenDetails) {
        ZohoMailHandler::_saveRefreshedToken($this->_formID, $this->_integrationID, $newTokenDetails);
        $tokenDetails = $newTokenDetails;
      }
    }
    // $actions = $integrationDetails->actions;
    $recordApiHelper = new RecordApiHelper($tokenDetails, $this->_integrationID, $logID);

    $zmailApiResponse = $recordApiHelper->executeRecordApi(
      $integrationDetails,
      $fieldValues,
      $this->_formID,
      $entryID
    );

    return $zmailApiResponse;
  }
}
