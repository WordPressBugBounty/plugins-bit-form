<?php

/**
 * Bit CRM Integration
 *
 */

namespace BitCode\BitForm\Core\Integration\BitCRM;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Core\Integration\IntegrationHandler;
use BitCode\BitForm\Core\Util\ApiResponse as UtilApiResponse;
use WP_Error;

/**
 * Provide functionality for Bit CRM integration
 */
class BitCRMHandler
{
  public const CRM_PLUGIN_BASENAME = 'bit-crm-sales-marketing-automation/bit-crm-sales-marketing-automation.php';

  private $_formID;

  private $_integrationID;

  public function __construct($integrationID, $fromID)
  {
    $this->_formID = $fromID;
    $this->_integrationID = $integrationID;
  }

  /**
   * Helps to register ajax function's with   wp
   *
   * @return void
   */
  public static function registerAjax()
  {
    add_action('wp_ajax_bitforms_bitcrm_authorize', [__CLASS__, 'bitcrmAuthorize']);
    add_action('wp_ajax_bitforms_bitcrm_fields', [__CLASS__, 'bitcrmFields']);
    add_action('wp_ajax_bitforms_bitcrm_tags', [__CLASS__, 'bitcrmTags']);
  }

  /**
   * Check Bit CRM plugin is active and its lead service is loadable
   */
  public static function checkedExistsBitCRM()
  {
    if (!\function_exists('is_plugin_active')) {
      require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    return is_plugin_active(self::CRM_PLUGIN_BASENAME) && class_exists('\BitApps\Crm\Services\LeadService');
  }

  /**
   * Capability gate for the BitCRM admin AJAX endpoints. Registration is already
   * capability-gated in AjaxService, this is defense-in-depth matching AdminAjax.
   *
   * @return void
   */
  private static function verifyAdminPermission()
  {
    if (!current_user_can('manage_bitform') && !current_user_can('manage_options')) {
      wp_send_json_error(__('Insufficient permissions.', 'bit-form'), 403);
    }
  }

  /**
   * Ajax: respond success if Bit CRM exists
   *
   * @return void
   */
  public static function bitcrmAuthorize()
  {
    if (isset($_REQUEST['_ajax_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_REQUEST['_ajax_nonce'])), 'bitforms_save')) {
      self::verifyAdminPermission();
      if (self::checkedExistsBitCRM()) {
        wp_send_json_success(true);
      } else {
        wp_send_json_error(
          __(
            'Please! Install & activate Bit CRM',
            'bit-form'
          ),
          400
        );
      }
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
   * Ajax: respond with the lead fields (system + custom) of Bit CRM
   *
   * @return void
   */
  public static function bitcrmFields()
  {
    if (isset($_REQUEST['_ajax_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_REQUEST['_ajax_nonce'])), 'bitforms_save')) {
      self::verifyAdminPermission();
      if (!self::checkedExistsBitCRM()) {
        wp_send_json_error(
          __(
            'Bit CRM plugin not found',
            'bit-form'
          ),
          400
        );
      }
      $response['bitcrmFields'] = self::getLeadFields();
      wp_send_json_success($response, 200);
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
   * Ajax: respond with the lead tags of Bit CRM
   *
   * @return void
   */
  public static function bitcrmTags()
  {
    if (isset($_REQUEST['_ajax_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_REQUEST['_ajax_nonce'])), 'bitforms_save')) {
      self::verifyAdminPermission();
      if (!self::checkedExistsBitCRM()) {
        wp_send_json_error(
          __(
            'Bit CRM plugin not found',
            'bit-form'
          ),
          400
        );
      }
      $response['bitcrmTags'] = self::getLeadTags();
      wp_send_json_success($response, 200);
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
   * Fetch normalized lead field list from Bit CRM
   *
   * @return array [{key, label, required, isCustom, fieldId, fieldType}]
   */
  public static function getLeadFields()
  {
    // Bit CRM asks integrators to use the raw service classes (their CrmApi facade
    // is reserved for a future public API), so we call LeadService directly.
    $fields = (new \BitApps\Crm\Services\LeadService())->fields();
    $fieldOptions = [];
    foreach ($fields as $field) {
      $field = (array) $field;
      // section rows are UI group headers in CRM, not mappable fields
      if (isset($field['type']) && 'section' === $field['type']) {
        continue;
      }
      // Group fields (billing/shipping address) are not columns themselves; their
      // mappable columns are the leaf sub-fields (billing_city, shipping_zip, ...).
      if (!empty($field['group_fields']) && is_array($field['group_fields'])) {
        foreach ($field['group_fields'] as $leaf) {
          $option = self::normalizeLeadField((array) $leaf);
          if ($option) {
            $fieldOptions[] = $option;
          }
        }
        continue;
      }
      $option = self::normalizeLeadField($field);
      if ($option) {
        $fieldOptions[] = $option;
      }
    }
    return $fieldOptions;
  }

  /**
   * Normalize one Bit CRM lead field (or address leaf) into a mappable option.
   *
   * @param array $field
   *
   * @return object|null null when the field has no key
   */
  private static function normalizeLeadField($field)
  {
    if (empty($field['field_key'])) {
      return null;
    }
    $required = !empty($field['required']) || !empty($field['is_always_required']);
    // Bit CRM defaults currency, but the form should not force it as a required mapping.
    if ('currency' === $field['field_key']) {
      $required = false;
    }
    return (object) [
      'key'       => $field['field_key'],
      'label'     => isset($field['label']) ? $field['label'] : $field['field_key'],
      'required'  => $required,
      'isCustom'  => !empty($field['is_custom']),
      'fieldId'   => isset($field['id']) ? $field['id'] : null,
      'fieldType' => isset($field['type']) ? $field['type'] : 'text',
    ];
  }

  /**
   * Fetch lead tags from Bit CRM
   *
   * @return array [{id, title}]
   */
  public static function getLeadTags()
  {
    // Use the raw TagService (per Bit CRM's guidance). tagsByModule returns
    // ['success' => bool, 'data' => <Tag collection>] where each row is a Model object.
    $result = (new \BitApps\Crm\Services\TagService())->tagsByModule(['module' => \BitApps\Crm\Model\Lead::MODULE_NAME]);
    $tags = (isset($result['success']) && $result['success'] && isset($result['data'])) ? $result['data'] : [];

    $bitcrmTags = [];
    foreach ($tags as $tag) {
      // Tag rows are WPDatabase Model objects (data in a protected `attributes`
      // bag reachable via magic __get); a plain (array) cast mangles the keys.
      if (is_array($tag)) {
        $id = isset($tag['id']) ? $tag['id'] : null;
        $title = isset($tag['title']) ? $tag['title'] : null;
      } else {
        $id = $tag->id;
        $title = $tag->title;
      }
      if (is_null($id)) {
        continue;
      }
      $bitcrmTags[] = (object) [
        'id'    => $id,
        'title' => $title,
      ];
    }
    return $bitcrmTags;
  }

  public function execute(IntegrationHandler $integrationHandler, $integrationData, $fieldValues, $entryID, $logID)
  {
    $integrationDetails = is_string($integrationData->integration_details) ? json_decode($integrationData->integration_details) : $integrationData->integration_details;

    if (!self::checkedExistsBitCRM()) {
      $error = ['success' => false, 'messages' => 'Bit CRM plugin is not active'];
      (new UtilApiResponse())->apiResponse(
        $logID,
        $this->_integrationID,
        ['type' => 'record', 'type_name' => 'Lead-create'],
        'error',
        $error,
        ['formId' => $this->_formID, 'entryId' => $entryID, 'fieldValues' => $fieldValues]
      );
      return new WP_Error('PLUGIN_NOT_FOUND', __('Bit CRM plugin is not active', 'bit-form'));
    }

    $fieldMap = isset($integrationDetails->field_map) ? $integrationDetails->field_map : [];
    if (empty($fieldMap)) {
      return new WP_Error('REQ_FIELD_EMPTY', __('Field map is required for Bit CRM api', 'bit-form'));
    }

    $recordApiHelper = new RecordApiHelper($this->_integrationID, $logID, $entryID);

    return $recordApiHelper->executeRecordApi(
      $fieldValues,
      $integrationDetails,
      $this->_formID
    );
  }
}
