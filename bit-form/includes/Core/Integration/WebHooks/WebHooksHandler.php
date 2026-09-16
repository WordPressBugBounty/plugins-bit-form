<?php

/**
 * WebHooks Integration
 *
 */

namespace BitCode\BitForm\Core\Integration\WebHooks;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Core\Integration\IntegrationHandler;
use BitCode\BitForm\Core\Util\ApiResponse as UtilApiResponse;
use BitCode\BitForm\Core\Util\HttpHelper;
use BitCode\BitForm\Core\Util\Utilities;
use BitCode\BitForm\GlobalHelper;

/**
 * Provide functionality for webhooks
 */
class WebHooksHandler
{
  private $formID;
  private $webhookID;

  private $_logResponse;

  public function __construct($webhookID, $formID)
  {
    $this->formID = $formID;
    $this->webhookID = $webhookID;
    $this->_logResponse = new UtilApiResponse();
  }

  /**
   * Helps to register ajax function's with wp
   *
   * @return null
   */
  public static function registerAjax()
  {
    add_action('wp_ajax_bitforms_test_webhook', [__CLASS__, 'testWebhook']);
  }

  public static function testWebhook()
  {
    if (!isset($_REQUEST['_ajax_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_REQUEST['_ajax_nonce'])), 'bitforms_save')) {
      wp_send_json_error(__('Token expired', 'bit-form'), 401);
    }

    GlobalHelper::requirePostMethod();

    try {
      $webhookDetails = GlobalHelper::formatRequestData();
    } catch (\InvalidArgumentException $e) {
      wp_send_json_error($e->getMessage(), 400);
    }

    $details = is_string($webhookDetails) ? (Utilities::jsonObj($webhookDetails)->hookDetails ?? null) : ($webhookDetails->hookDetails ?? null);

    $data = self::urlParserWrapper(isset($details->url) ? $details->url : '');
    if (is_wp_error($data)) {
      wp_send_json_error($data->get_error_message(), 400);
    }

    $params = IntegrationHandler::replaceFieldWithValue($data['params'], []);
    $params['entry_id'] = 'test';

    $response = self::sendRequest($data['url'], isset($details->method) ? $details->method : 'get', $params);
    if (is_wp_error($response)) {
      $errorMessage = $response->get_error_message();
      wp_send_json_error('' === $errorMessage ? __('Unknown error occurred', 'bit-form') : $errorMessage, 400);
    }

    wp_send_json_success(['msg' => 'webhook executed succcessfully', 'response' => $response], 200);
  }

  public function execute(IntegrationHandler $integrationHandler, $integrationDetails, $fieldValues, $entryID, $logID)
  {
    $details = is_string($integrationDetails->integration_details) ? json_decode($integrationDetails->integration_details) : $integrationDetails->integration_details;

    $entryDetails = [
      'formId'      => $this->formID,
      'entryId'     => $entryID,
      'fieldValues' => $fieldValues
    ];

    $data = self::urlParserWrapper(isset($details->url) ? $details->url : '');
    if (is_wp_error($data)) {
      $this->logWebhookResponse($logID, 'errors', $data->get_error_message(), $entryDetails);
      return false;
    }

    $params = IntegrationHandler::replaceFieldWithValue($data['params'], $fieldValues);
    $params['entry_id'] = $entryID;

    $response = self::sendRequest($data['url'], isset($details->method) ? $details->method : 'get', $params);
    $this->logWebhookResponse($logID, is_wp_error($response) ? 'errors' : 'success', $response, $entryDetails);

    return $response;
  }

  /**
   * Dispatches the webhook request with the configured http method.
   *
   * @param  string          $url
   * @param  string          $method
   * @param  array           $params
   * @return mixed|\WP_Error
   */
  private static function sendRequest($url, $method, $params)
  {
    switch (strtoupper($method)) {
      case 'GET':
        return HttpHelper::get($url, $params);

      case 'POST':
        return HttpHelper::post($url, $params);

      default:
        return HttpHelper::request($url, $method, $params);
    }
  }

  private function logWebhookResponse($logID, $status, $response, $entryDetails)
  {
    $this->_logResponse->apiResponse(
      $logID,
      $this->webhookID,
      ['type' => 'record', 'type_name' => 'web hooks'],
      $status,
      $response,
      $entryDetails
    );
  }

  /**
   * Splits a webhook url into the url to call and its query params.
   *
   * @param  mixed           $url url as it comes from the saved integration details
   * @return array|\WP_Error ['url' => string, 'params' => array], or why the url was rejected
   */
  private static function urlParserWrapper($url)
  {
    if (!is_string($url) || '' === trim($url)) {
      return new \WP_Error('bitform_webhook_url_empty', __('Webhook url is empty. Please add a url and try again.', 'bit-form'));
    }

    $parsedURL = wp_parse_url($url);
    if (empty($parsedURL['host'])) {
      return new \WP_Error('bitform_webhook_url_invalid', __('Webhook url is not a valid url.', 'bit-form'));
    }

    $Scheme = isset($parsedURL['scheme']) ? $parsedURL['scheme'] . '://' : null;
    $Usr = isset($parsedURL['user']) ? $parsedURL['user'] : null;
    $Pass = isset($parsedURL['pass']) ? ':' . $parsedURL['pass'] : null;
    $Host = $parsedURL['host'];
    $Port = isset($parsedURL['port']) ? ':' . $parsedURL['port'] : null;
    $Path = isset($parsedURL['path']) ? $parsedURL['path'] : null;
    $Query = isset($parsedURL['query']) ? $parsedURL['query'] : '';
    $Pass = ($Pass || $Usr) ? "$Pass@" : null;

    $cleanURL = "$Scheme$Usr$Pass$Host$Port$Path";
    $params = [];
    foreach (explode('&', $Query) as $keyValue) {
      if (empty($keyValue)) {
        continue;
      }
      $pair = explode('=', $keyValue, 2);
      if (2 !== \count($pair)) {
        continue;
      }
      list($field, $value) = $pair;
      if ('' === trim($value)) {
        continue;
      }
      if (isset($params[$field])) {
        if (\is_array($params[$field])) {
          $params[$field][] = sanitize_text_field(urldecode($value));
        } else {
          $params[$field] = [$params[$field], sanitize_text_field(urldecode($value))];
        }
      } else {
        $params[$field] = sanitize_text_field(urldecode($value));
      }
    }

    if (!wp_http_validate_url($cleanURL)) {
      return new \WP_Error('bitform_webhook_url_rejected', self::urlRejectionReason($cleanURL, $parsedURL));
    }

    return ['url' => $cleanURL, 'params' => $params];
  }

  /**
   * Explains why WordPress refused the url, so the message points at the real cause
   * (internal host, unresolvable dns, blocked port) instead of "url is empty".
   *
   * @param  string $url       url as it was handed to wp_http_validate_url()
   * @param  array  $parsedURL wp_parse_url() output of the original url
   * @return string
   */
  private static function urlRejectionReason($url, $parsedURL)
  {
    $host = isset($parsedURL['host']) ? trim($parsedURL['host'], '.') : '';
    $scheme = isset($parsedURL['scheme']) ? strtolower($parsedURL['scheme']) : '';

    if ('http' !== $scheme && 'https' !== $scheme) {
      return __('Webhook url must start with http:// or https://.', 'bit-form');
    }

    if (isset($parsedURL['user']) || isset($parsedURL['pass'])) {
      return __('Webhook url must not contain a username or password.', 'bit-form');
    }

    if (!filter_var($host, FILTER_VALIDATE_IP) && gethostbyname($host) === $host) {
      /* translators: %s: webhook host name */
      return sprintf(__('The host "%s" could not be resolved from this server. Check the url spelling and the server DNS.', 'bit-form'), $host);
    }

    if (self::validatesAsExternalHost($url)) {
      /* translators: %s: webhook host name */
      return sprintf(__('The host "%s" resolves to a private or local IP address. WordPress blocks requests to internal hosts, allow it with the "http_request_host_is_external" filter.', 'bit-form'), $host);
    }

    if (!empty($parsedURL['port'])) {
      $allowedPorts = apply_filters('http_allowed_safe_ports', [80, 443, 8080], $host, $url);
      if (\is_array($allowedPorts) && !\in_array((int) $parsedURL['port'], $allowedPorts, true)) {
        /* translators: 1: port number, 2: comma separated list of allowed ports */
        return sprintf(__('Port %1$d is not allowed for outgoing requests. WordPress only allows %2$s, extend it with the "http_allowed_safe_ports" filter.', 'bit-form'), (int) $parsedURL['port'], implode(', ', $allowedPorts));
      }
    }

    return __('Webhook url is not a valid url.', 'bit-form');
  }

  /**
   * Re-checks the url while treating the host as external, which tells the local/private
   * IP rejection apart from every other reason wp_http_validate_url() can fail.
   *
   * @param  string $url
   * @return bool
   */
  private static function validatesAsExternalHost($url)
  {
    $allowExternal = function () {
      return true;
    };

    add_filter('http_request_host_is_external', $allowExternal, 99);
    $isValid = (bool) wp_http_validate_url($url);
    remove_filter('http_request_host_is_external', $allowExternal, 99);

    return $isValid;
  }

  private function iterate($array)
  {
    $ar = [];
    if (is_array($array)) {
      foreach ($array as $k => $v) {
        $ar[$k] = str_replace("\'", "'", $v);
      }
    }
    return $ar;
  }
}
