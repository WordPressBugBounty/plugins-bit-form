<?php

/**
 * Bit CRM Record Api
 *
 */

namespace BitCode\BitForm\Core\Integration\BitCRM;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Core\Util\ApiResponse as UtilApiResponse;

/**
 * Provide functionality for lead insert into Bit CRM
 */
class RecordApiHelper
{
  private $_integrationID;

  private $_logID;

  private $_logResponse;

  private $_entryID;

  public function __construct($integId, $logID, $entryID)
  {
    $this->_integrationID = $integId;
    $this->_logID = $logID;
    $this->_logResponse = new UtilApiResponse();
    $this->_entryID = $entryID;
  }

  /**
   * Build the LeadService payload and create the lead
   *
   * @param array  $fieldValues        submitted field values (smart tags already merged)
   * @param object $integrationDetails decoded integration_details JSON
   * @param int    $formId             current form id
   *
   * @return array LeadService result ['success' => bool, ...]
   */
  public function executeRecordApi($fieldValues, $integrationDetails, $formId)
  {
    $fieldMap = $integrationDetails->field_map;
    $crmFieldMeta = $this->crmFieldMeta($integrationDetails);

    $systemDefinedFieldsValues = [];
    $customFieldsValues = [];
    $skippedFields = [];

    foreach ($fieldMap as $fieldPair) {
      if (empty($fieldPair->crmFormField)) {
        continue;
      }
      if ('custom' === $fieldPair->formField && isset($fieldPair->customValue)) {
        $value = $fieldPair->customValue;
      } else {
        $value = isset($fieldValues[$fieldPair->formField]) ? $fieldValues[$fieldPair->formField] : null;
      }
      if (is_null($value) || '' === $value || (is_array($value) && 0 === count($value))) {
        continue;
      }

      if (!isset($crmFieldMeta[$fieldPair->crmFormField])) {
        // mapped field no longer exists in CRM (e.g. CRM Pro deactivated) - drop, don't fail the lead
        $skippedFields[] = $fieldPair->crmFormField;
        continue;
      }

      $meta = $crmFieldMeta[$fieldPair->crmFormField];
      if (!empty($meta->isCustom)) {
        // Multi-value custom fields (multi-select, checkbox) must be stored JSON-encoded:
        // Bit CRM decodes field_value with JSON::is() on read, so an array round-trips as
        // an array. Single values stay plain strings.
        $customFieldsValues[$fieldPair->crmFormField] = [
          'field_id'    => $meta->fieldId,
          'field_value' => is_array($value) ? wp_json_encode(array_values($value)) : (string) $value,
        ];
      } else {
        // System columns are scalar; join a multi-value form field into a readable string.
        $systemDefinedFieldsValues[$fieldPair->crmFormField] = is_array($value) ? implode(', ', $value) : (string) $value;
      }
    }

    $payload = ['systemDefinedFieldsValues' => $systemDefinedFieldsValues];

    if (!empty($customFieldsValues)) {
      $payload['customFieldsValues'] = $customFieldsValues;
    }
    if (!empty($integrationDetails->tagIds)) {
      $payload['tagIds'] = array_map('intval', (array) $integrationDetails->tagIds);
    }
    if (!empty($integrationDetails->newTagTitles)) {
      $payload['newTagTitles'] = array_map('strval', (array) $integrationDetails->newTagTitles);
    }

    $recordApiResponse = (new \BitApps\Crm\Services\LeadService())->store($payload);

    if (!empty($skippedFields)) {
      $recordApiResponse['skipped_fields'] = 'Unknown Bit CRM field(s) skipped: ' . implode(', ', $skippedFields);
    }

    $entryDetails = [
      'formId'      => $formId,
      'entryId'     => $this->_entryID,
      'fieldValues' => $fieldValues
    ];

    if (!empty($recordApiResponse['success'])) {
      $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => 'record', 'type_name' => 'Lead-create'], 'success', $recordApiResponse, $entryDetails);
    } else {
      $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => 'record', 'type_name' => 'Lead-create'], 'error', $recordApiResponse, $entryDetails);
    }
    return $recordApiResponse;
  }

  /**
   * Authoritative CRM field metadata keyed by field key. Live fetch first
   * (fresh isCustom/fieldId), saved crmFields snapshot as fallback.
   *
   * @return array<string, object>
   */
  private function crmFieldMeta($integrationDetails)
  {
    $fields = [];
    try {
      $fields = BitCRMHandler::getLeadFields();
    } catch (\Throwable $th) {
      $fields = [];
    }
    if (empty($fields) && !empty($integrationDetails->crmFields)) {
      $fields = $integrationDetails->crmFields;
    }

    $meta = [];
    foreach ($fields as $field) {
      $meta[$field->key] = $field;
    }
    return $meta;
  }
}
