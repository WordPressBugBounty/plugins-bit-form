<?php

/**
 * Telegram Record Api
 *
 */

namespace BitCode\BitForm\Core\Integration\Telegram;

use BitCode\BitForm\Core\Util\ApiResponse as UtilApiResponse;
use BitCode\BitForm\Core\Util\FieldValueHandler;
use BitCode\BitForm\Core\Util\HttpHelper;
use WP_Error;

/**
 * Provide functionality for Record insert,upsert
 */
class RecordApiHelper
{
  /** Telegram caption cap; a longer body must go as its own sendMessage (limit 4096). */
  private const CAPTION_LIMIT = 1024;

  private $_defaultHeader;
  private $_integrationID;
  private $_logID;
  private $_logResponse;
  private $_entryID;
  private $_apiEndPoint;

  public function __construct($apiEndPoint, $integId, $logID, $entryID)
  {
    $this->_defaultHeader['Content-Type'] = 'application/x-www-form-urlencoded';
    $this->_integrationID = $integId;
    $this->_logID = $logID;
    $this->_logResponse = new UtilApiResponse();
    $this->_entryID = $entryID;
    $this->_apiEndPoint = $apiEndPoint;
  }

  public function sendMessages($data)
  {
    $insertRecordEndpoint = $this->_apiEndPoint . '/sendMessage';
    return HttpHelper::post($insertRecordEndpoint, $data, $this->_defaultHeader);
  }

  public function executeRecordApi($integrationDetails, $fieldValues, $formID, $entryID)
  {
    // Without $formID, ${bf_all_data} and the repeater tags resolve to ''.
    $msg = FieldValueHandler::replaceFieldWithValue($integrationDetails->body, $fieldValues, $formID);
    $messagesBody = self::normalizeMessageBody($msg, $integrationDetails->parse_mode);
    $type = 'insert';

    $files = self::collectAttachments($integrationDetails, $fieldValues);
    $responses = [];

    // Ride along as the caption when it fits, so users still get one notification.
    $caption = '';
    if (!empty($files) && '' !== trim($messagesBody) && mb_strlen($messagesBody) <= self::CAPTION_LIMIT) {
      $caption = $messagesBody;
      $messagesBody = '';
    }

    if ('' !== trim($messagesBody)) {
      $responses[] = $this->sendMessages([
        'chat_id'    => $integrationDetails->chat_id,
        'text'       => $messagesBody,
        'parse_mode' => $integrationDetails->parse_mode,
      ]);
    }

    if (!empty($files)) {
      $filesApiHelper = new FilesApiHelper($formID, $entryID);
      // ten items max per group, and incompatible types cannot share one
      $batches = $filesApiHelper->buildMediaBatches(array_values($files));

      if (empty($batches)) {
        // the body was folded into the caption above — don't lose it too
        if ('' !== trim($caption)) {
          $responses[] = $this->sendMessages([
            'chat_id'    => $integrationDetails->chat_id,
            'text'       => $caption,
            'parse_mode' => $integrationDetails->parse_mode,
          ]);
        }
        $responses[] = new WP_Error('TELEGRAM_FILE_NOT_FOUND', __('None of the Telegram attachments could be read.', 'bit-form'));
      }

      foreach ($batches as $index => $batch) {
        // first send only, or the body repeats once per batch
        $batchCaption = 0 === $index ? $caption : '';

        if (1 === count($batch)) {
          // uploadFiles() picks sendPhoto/sendAudio/sendVideo/sendDocument by MIME
          $responses[] = $filesApiHelper->uploadFiles($this->_apiEndPoint, [
            'chat_id'    => $integrationDetails->chat_id,
            'parse_mode' => $integrationDetails->parse_mode,
            'caption'    => $batchCaption,
            'photo'      => $batch[0]['url'],
          ]);
          continue;
        }

        $responses[] = $filesApiHelper->uploadMultipleFiles($this->_apiEndPoint, [
          'chat_id'    => $integrationDetails->chat_id,
          'parse_mode' => $integrationDetails->parse_mode,
          'caption'    => $batchCaption,
          'media'      => $batch,
        ]);
      }
    }

    if (empty($responses)) {
      $responses[] = new WP_Error('TELEGRAM_EMPTY_REQUEST', __('Telegram integration has nothing to send: message body and attachments are both empty.', 'bit-form'));
    }

    $entryDetails = [
      'formId'      => $formID,
      'entryId'     => $entryID,
      'fieldValues' => $fieldValues
    ];

    $failure = null;
    $decoded = [];

    foreach ($responses as $response) {
      $response = self::decodeResponse($response);
      $decoded[] = $response;

      if (is_null($failure) && !self::isSuccessful($response)) {
        $failure = $response;
      }
    }

    $recordApiResponse = 1 === count($decoded) ? $decoded[0] : $decoded;

    if (is_null($failure)) {
      $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => 'record', 'type_name' => $type], 'success', $recordApiResponse, $entryDetails);
      return $recordApiResponse;
    }

    $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => 'record', 'type_name' => $type], 'error', self::describeFailure($failure), $entryDetails);

    return $failure instanceof WP_Error ? $failure : $recordApiResponse;
  }

  /**
   * Collect the mapped attachment file URLs out of the submitted values.
   *
   * @return array
   */
  private static function collectAttachments($integrationDetails, $fieldValues)
  {
    if (empty($integrationDetails->actions->attachments)) {
      return [];
    }

    $attachment = (array) $integrationDetails->actions->attachments;
    $files = [];

    foreach ($fieldValues as $fieldKey => $fieldValue) {
      if (!in_array($fieldKey, $attachment)) {
        continue;
      }
      if (is_array($fieldValue)) {
        $files = array_merge($files, $fieldValue);
      } elseif (!empty($fieldValue)) {
        $files[] = $fieldValue;
      }
    }

    return array_values(array_filter($files, function ($file) {
      return is_string($file) && '' !== $file;
    }));
  }

  /**
   * Telegram's HTML parse mode allows only a small tag whitelist; <p>/<br> are not
   * in it and fail the call with "Unsupported start tag".
   *
   * @return string
   */
  private static function normalizeMessageBody($msg, $parseMode)
  {
    if (!is_string($msg)) {
      return '';
    }

    $msg = self::normalizeAnchors($msg);
    $msg = self::flattenTableMarkup($msg);
    $msg = self::flattenListMarkup($msg);

    $msg = preg_replace('#<br\s*/?>#i', "\n", $msg);
    $msg = preg_replace('#</p>\s*<p[^>]*>#i', "\n\n", $msg);
    $msg = preg_replace('#</?p[^>]*>#i', '', $msg);

    if ('HTML' !== strtoupper((string) $parseMode)) {
      return self::tidyWhitespace(wp_strip_all_tags($msg));
    }

    return self::tidyWhitespace(wp_kses($msg, [
      'b'          => [],
      'strong'     => [],
      'i'          => [],
      'em'         => [],
      'u'          => [],
      'ins'        => [],
      's'          => [],
      'strike'     => [],
      'del'        => [],
      'a'          => ['href' => []],
      'code'       => ['class' => []],
      'pre'        => [],
      'span'       => ['class' => []],
      'tg-spoiler' => [],
      'blockquote' => [],
    ]));
  }

  /**
   * FieldValueHandler::anchorMarkup() wraps list values in an <a href>, so a checkbox
   * option becomes href="Option 2" and Telegram fails the message on the bad protocol.
   *
   * @param string $msg
   *
   * @return string
   */
  private static function normalizeAnchors($msg)
  {
    if (false === stripos($msg, '<a')) {
      return $msg;
    }

    return preg_replace_callback(
      '#<a\b[^>]*href\s*=\s*([\'"])(.*?)\1[^>]*>(.*?)</a>#is',
      function ($matches) {
        $href = trim(html_entity_decode($matches[2], ENT_QUOTES));
        $text = $matches[3];

        if (!preg_match('#^(?:https?://|tg://|mailto:)#i', $href)) {
          return $text;
        }

        return '<a href="' . esc_url($href) . '">' . $text . '</a>';
      },
      $msg
    );
  }

  /**
   * ${bf_all_data} renders an HTML <table>, which Telegram rejects. Turn each row
   * into a "Label: value" (or "a | b | c") line instead.
   *
   * @param string $msg
   *
   * @return string
   */
  private static function flattenTableMarkup($msg)
  {
    if (false === stripos($msg, '<table')) {
      return $msg;
    }

    // Innermost table first: repeater sub-tables sit inside a parent cell.
    $innerMostTable = '#<table[^>]*>((?:(?!<table[^>]*>).)*?)</table>#is';
    $guard = 0;

    while ($guard++ < 20 && preg_match($innerMostTable, $msg)) {
      $msg = preg_replace_callback($innerMostTable, function ($matches) {
        return "\n" . self::flattenTableRows($matches[1]);
      }, $msg, 1);
    }

    // Unbalanced markup must not reach Telegram as tags.
    return preg_replace('#</?(?:table|thead|tbody|tfoot|tr|th|td)[^>]*>#i', "\n", $msg);
  }

  /**
   * @param string $tableHtml
   *
   * @return string
   */
  private static function flattenTableRows($tableHtml)
  {
    preg_match_all('#<tr[^>]*>(.*?)</tr>#is', $tableHtml, $rows);
    $lines = [];

    foreach ($rows[1] as $row) {
      preg_match_all('#<t[dh][^>]*>(.*?)</t[dh]>#is', $row, $cellMatches);
      $cells = [];

      foreach ($cellMatches[1] as $cell) {
        $cell = preg_replace('#</li>\s*<li[^>]*>#i', ', ', $cell);
        $cell = preg_replace('#</?(?:ul|ol|li)[^>]*>#i', ' ', $cell);
        $cell = preg_replace('#<br\s*/?>#i', ', ', $cell);
        // Keep newlines: an already-flattened nested table lives inside this cell.
        $cell = preg_replace('#[ \t\r]+#', ' ', $cell);
        $cells[] = trim($cell);
      }

      if (empty($cells) || '' === trim(implode('', $cells))) {
        continue;
      }

      $lines[] = 2 === count($cells) ? "{$cells[0]}: {$cells[1]}" : implode(' | ', $cells);
    }

    return empty($lines) ? '' : implode("\n", $lines) . "\n";
  }

  /**
   * @param string $msg
   *
   * @return string
   */
  private static function flattenListMarkup($msg)
  {
    $msg = preg_replace('#<li[^>]*>#i', '• ', $msg);
    $msg = preg_replace('#</li>#i', "\n", $msg);

    return preg_replace('#</?(?:ul|ol)[^>]*>#i', "\n", $msg);
  }

  /**
   * @param string $msg
   *
   * @return string
   */
  private static function tidyWhitespace($msg)
  {
    $msg = preg_replace('#[ \t]+\n#', "\n", $msg);
    $msg = preg_replace('#\n[ \t]+#', "\n", $msg);
    $msg = preg_replace('#\n{3,}#', "\n\n", $msg);

    return trim($msg);
  }

  /**
   * @return mixed WP_Error, decoded object/array, or the raw body
   */
  private static function decodeResponse($response)
  {
    if (is_wp_error($response)) {
      return $response;
    }

    if (is_string($response)) {
      $json = json_decode($response);
      return is_null($json) ? $response : $json;
    }

    return $response;
  }

  private static function isSuccessful($response)
  {
    if (is_wp_error($response) || empty($response)) {
      return false;
    }

    return is_object($response) && isset($response->ok) && $response->ok;
  }

  /**
   * Never hand a falsy value to the logger: ApiResponse::apiResponse() drops the row.
   *
   * @return mixed
   */
  private static function describeFailure($failure)
  {
    if (is_wp_error($failure)) {
      return [
        'ok'          => false,
        'error_code'  => $failure->get_error_code(),
        'description' => $failure->get_error_message(),
      ];
    }

    if (empty($failure)) {
      return [
        'ok'          => false,
        'error_code'  => 'TELEGRAM_EMPTY_RESPONSE',
        'description' => __('Telegram returned an empty response.', 'bit-form'),
      ];
    }

    return $failure;
  }
}
