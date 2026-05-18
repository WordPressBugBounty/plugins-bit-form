<?php

/**
 * Provides Base Model Class
 */

namespace BitCode\BitForm\Core\Database;

use BitCode\BitForm\Core\Util\FileHandler;

/**
 * Manages entry meta (per-field values) for each form submission.
 */

class FormEntryMetaModel extends Model
{
  protected static $table = 'bitforms_form_entrymeta';

  public function duplicateEntryMeta($data)
  {
    $values[] = $data['duplicateID'];
    $values[] = $data['entryID'];
    $sql = "INSERT INTO $this->table_name (bitforms_form_entry_id,meta_key,meta_value)"
      . ' SELECT %d as bitforms_form_entry_id,meta_key,meta_value'
      . " FROM `$this->table_name` WHERE bitforms_form_entry_id = %d";
    return $this->execute($sql, $values)->getResult();
  }

  public function update(array $data, array $condition)
  {
    $entryID = $condition['bitforms_form_entry_id'];
    if (empty($entryID)) {
      return false;
    }
    // Form entry meta lookup; meta_key/meta_value query required to map dynamic field keys per entry.
    $formEntryMeta = $this->get(
      [
        'meta_key',
        'meta_value',
      ],
      [
        'bitforms_form_entry_id' => $entryID,
      ]
    );
    $oldEntries = [];
    foreach ($formEntryMeta as $oldKey => $oldValue) {
      $oldEntries[$oldValue->meta_key] = $oldValue->meta_value;
    }
    $updatedData = [];
    $oldEntriesKey = array_keys($oldEntries);
    foreach ($data as $upKey => $upValue) {
      $updatedData[$upKey] = is_string($upValue) ?
        $upValue :
        wp_json_encode($upValue);
      if (!in_array($upKey, $oldEntriesKey, true)) {
        $this->insert(
          [
            'bitforms_form_entry_id' => $entryID,
            'meta_key'               => $upKey,
            'meta_value'             => $updatedData[$upKey],
          ]
        );
        unset($data[$upKey]);
      }
    }
    if (empty($data)) {
      return $updatedData;
    }
    $checkCondition = $this->checkCondition($condition);
    if (is_wp_error($checkCondition)) {
      return $checkCondition;
    }
    $case_part = ' ';
    $all_values = [];
    $condition['meta_key'] = array_keys($data);
    foreach ($data as $key => $value) {
      $value = is_string($value) ? $value : wp_json_encode($value);
      $case_part .= "
            WHEN '" . esc_sql($key) . "' THEN " . $this->getFieldFormat($value);
      $all_values[] = $value;
    }
    $formattedCondition = $this->getFormatedCondition($condition);
    if ($formattedCondition) {
      $condition_to_check = $formattedCondition['conditions'];
      $all_values = array_merge($all_values, $formattedCondition['values']);
    } else {
      $condition_to_check = null;
    }

    $sql = "UPDATE $this->table_name
         SET meta_value = ( CASE meta_key
                $case_part
            END
            )";
    $sql .= ' ' . $condition_to_check;
    $status = $this->execute($sql, $all_values)->getResult();
    if (is_wp_error($status) && 'result_empty' !== $status->get_error_code()) {
      return $status;
    }
    return $updatedData;
  }

  public function validQueryCondition($conditions)
  {
    foreach ($conditions as $index => $condition) {
      if (is_object($condition)) {
        if (empty($condition->field) || empty($condition->logic) || empty($condition->val) && !in_array($condition->val, ['0', 0, 0.0], true)) {
          unset($conditions[$index], $conditions[$index + 1]);
        }
      }
    }
    return $conditions;
  }

  public function sqlQryGenerateByFldCondition($conditions)
  {
    $dbHelper = new Helper();
    $sql = '';

    $dateQuery = $dbHelper->dateQueryList();

    $validCondtions = $this->validQueryCondition($conditions);
    $safeOperators = ['=', '!=', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE'];

    foreach ($validCondtions as $condition) {
      if (is_object($condition)) {
        $field = sanitize_key($condition->field);
        if (empty($field)) {
          continue;
        }

        if (is_array($condition->val)) {
          $value = $dbHelper->arrValueModifyByLogic($condition->logic, $condition->val);
        } else {
          $value = $dbHelper->strValueModifyByLogic($condition->logic, $condition->val);
        }

        $operator = $dbHelper->convertToSqlOperator($condition->logic);
        if (!in_array($operator, $safeOperators, true)) {
          continue;
        }

        if (!is_array($condition->val) && isset($dateQuery[$condition->val])) {
          $sql .= $dbHelper->fieldQueryByDate($field, $operator, $value, $condition->logic);
        } else {
          if (!is_int($value)) {
            $value = "'" . esc_sql($value) . "'";
          }

          $sql .= "`{$field}` $operator $value";
        }
      } elseif (in_array(strtoupper(trim((string) $condition)), ['AND', 'OR'], true)) {
        $sql .= ' ' . strtoupper(trim((string) $condition));
      }
    }

    return trim($sql);
  }

  public function queryRecount($selectedMeta, $groupedCondition, $orderCondition, $all_values)
  {
    $entry_table = $this->app_db->prefix . 'bitforms_form_entries';
    $sql = 'SELECT count(*) as count FROM (';
    $sql .= "SELECT $selectedMeta FROM `$this->table_name` em";
    $sql .= " INNER JOIN $entry_table e on e.id = em.bitforms_form_entry_id ";
    $sql .= $groupedCondition . $orderCondition;
    $sql .= ') as retrievedData';
    $countResult = $this->execute($sql, $all_values)->getResult();
    return $countResult[0]->count;
  }

  public function selectedEntryMeta($formFields, $fieldCount, $filter = null)
  {
    $all_values = [];
    $formFieldsNames = [];
    $globalFilterString = '';
    $globalFilterValues = [];
    $metaChecker = 0;
    $selectedMeta = '`bitforms_form_entry_id` as entry_id,';
    $selectedMeta .= "e.user_id as '__user_id',";
    $selectedMeta .= "e.user_ip as '__user_ip',";
    $selectedMeta .= "e.status as '__entry_status',";
    $selectedMeta .= "e.user_location as '__user_location',";
    $selectedMeta .= "e.user_device as '__user_device',";
    $selectedMeta .= "e.referer as '__referer',";
    $selectedMeta .= "e.created_at as '__created_at',";
    $selectedMeta .= "e.updated_at as '__updated_at'";

    if ($fieldCount > 0) {
      $selectedMeta .= ',';
    }

    foreach ($formFields as $fieldDetails) {
      $safeFieldKey = sanitize_key($fieldDetails['key']);
      $fieldFormat = $this->getFieldFormat($safeFieldKey);
      $selectedMeta .= "GROUP_CONCAT(
                CASE
                  `meta_key`
                  WHEN '$fieldFormat' THEN `meta_value`
                END
              ) AS '$fieldFormat'";
      $metaChecker += 1;
      $all_values[] = $safeFieldKey;
      $all_values[] = $safeFieldKey;
      $formFieldsNames[] = $safeFieldKey;
      if ($metaChecker < $fieldCount) {
        $selectedMeta .= ',';
      }
      if (!empty($filter['global'])) {
        $globalFilterString .= ' `' . $safeFieldKey . '` LIKE %s ';
        if ($metaChecker < $fieldCount) {
          $globalFilterString .= ' OR ';
        }
        $globalFilterValues[] = '%' . $this->app_db->esc_like($filter['global']) . '%';
      }
    }

    return [
      'selected_meta'        => $selectedMeta,
      'form_fields_names'    => $formFieldsNames,
      'all_values'           => $all_values,
      'global_filter_string' => $globalFilterString,
      'global_filter_values' => $globalFilterValues,
    ];
  }

  public function groupedCondition($condition, $all_values, $fieldConditions, $filter = null, $globalFilterString = '', $globalFilterValues = [])
  {
    $isFldCondition = false;
    $formattedCondition = $this->getFormatedCondition($condition);
    if ($formattedCondition) {
      $groupedCondition = $formattedCondition['conditions'] . 'GROUP BY
            `bitforms_form_entry_id` ';
      $all_values = array_merge($all_values, $formattedCondition['values']);
    } else {
      $groupedCondition = null;
    }
    if (!empty($filter['global']) && !empty($globalFilterString) && !empty($globalFilterValues)) {
      $isFldCondition = true;
      if ($groupedCondition && false !== strpos($groupedCondition, 'HAVING')) {
        $groupedCondition .= ' AND (' . $globalFilterString . ') ';
      } else {
        $groupedCondition .= ' HAVING (' . $globalFilterString . ') ';
      }
      $all_values = array_merge($all_values, $globalFilterValues);
    }

    $sqlQryByFldCondtion = $this->sqlQryGenerateByFldCondition($fieldConditions);

    if (!empty($sqlQryByFldCondtion)) {
      $isFldCondition = true;
      if ($groupedCondition && false !== strpos($groupedCondition, 'HAVING')) {
        $groupedCondition .= ' AND (' . $sqlQryByFldCondtion . ') ';
      } else {
        $groupedCondition .= ' HAVING (' . $sqlQryByFldCondtion . ') ';
      }
    }
    return [
      'groupedCondition' => $groupedCondition,
      'all_values'       => $all_values,
      'isFldCondition'   => $isFldCondition,
    ];
  }

  public function orderCondition($formFieldsNames, $sortBy)
  {
    $orderCondition = null;
    if (!empty($sortBy)) {
      $sortableFieldCount = count($sortBy);
      $sortableFieldChecker = 0;
      if ($sortableFieldCount > 0) {
        $orderCondition .= ' ORDER BY ';
      }
      $orderList = '';
      foreach ($sortBy as $sortableFieldKey => $sortableFieldDetails) {
        $sortableFieldChecker += 1;
        if (in_array($sortableFieldDetails->id, $formFieldsNames, true)) {
          $safeId = sanitize_key($sortableFieldDetails->id);
          $orderList .= " `$safeId` ";
          $orderFollow = $sortableFieldDetails->desc ? ' DESC ' : ' ASC ';
          $orderList .= ' ' . $orderFollow;
          if ($sortableFieldChecker < $sortableFieldCount) {
            $orderList .= ', ';
          }
        }
      }
      if (empty($orderList)) {
        $orderCondition = null;
      } else {
        $orderCondition .= $orderList;
      }
    }
    $orderCondition .= empty($orderCondition) ? ' ORDER BY `bitforms_form_entry_id` DESC ' : ',`bitforms_form_entry_id` DESC ';
    return $orderCondition;
  }

  public function isEntryMetaExist($conditions)
  {
    $existMetaData = $this->get(
      [
        'meta_key',
        'meta_value',
      ],
      $conditions
    );
    if (!is_wp_error($existMetaData) && count($existMetaData) > 0) {
      return true;
    }
    return false;
  }

  public function getEntryMeta($formFields, $entries, $limit = null, $offset = null, $filter = null, $sortBy = null, $fieldConditions = null, $dateBetweenFilter = null)
  {
    $entry_table = $this->app_db->prefix . 'bitforms_form_entries';
    $fieldCount = count($formFields);
    $getSelectedMetaFldValue = $this->selectedEntryMeta($formFields, $fieldCount, $filter);
    $selectedMeta = $getSelectedMetaFldValue['selected_meta'];
    $formFieldsNames = $getSelectedMetaFldValue['form_fields_names'];
    $all_values = $getSelectedMetaFldValue['all_values'];
    $globalFilterString = $getSelectedMetaFldValue['global_filter_string'];
    $globalFilterValues = $getSelectedMetaFldValue['global_filter_values'];
    $entryIDs = [];
    $entryCount = count($entries);
    foreach ($entries as $entryDetail) {
      $entryIDs[] = $entryDetail->id ?? $entryDetail;
    }
    if (empty($entryIDs)) {
      return [
        'count'   => 0,
        'entries' => [],
      ];
    }
    $condition['bitforms_form_entry_id'] = $entryIDs;
    $group = $this->groupedCondition($condition, $all_values, $fieldConditions, $filter, $globalFilterString, $globalFilterValues);
    $groupedCondition = $group['groupedCondition'];
    $all_values = $group['all_values'];
    $isFldCondition = $group['isFldCondition'];
    $orderCondition = $this->orderCondition($formFieldsNames, (array) $sortBy);

    $paginate = null;
    if (!is_null($limit)) {
      $limit = intval($limit);
      $paginate .= " LIMIT $limit ";
    }
    if (!is_null($offset)) {
      $offset = intval($offset);
      $paginate .= " OFFSET $offset ";
    }

    $sql = "SELECT $selectedMeta FROM `$this->table_name` em";
    $sql .= " INNER JOIN $entry_table e on e.id = em.bitforms_form_entry_id ";
    if ($dateBetweenFilter) {
      $startDate = sanitize_text_field($dateBetweenFilter->start_date ?? '');
      $endDate = sanitize_text_field($dateBetweenFilter->end_date ?? '');

      if ($startDate && $endDate) {
        $sql .= $this->app_db->prepare(' AND e.created_at BETWEEN %s AND %s', $startDate . ' 00:00:00', $endDate . ' 23:59:59');
      } elseif ($startDate) {
        $sql .= $this->app_db->prepare(' AND e.created_at >= %s', $startDate . ' 00:00:00');
      } elseif ($endDate) {
        $sql .= $this->app_db->prepare(' AND e.created_at <= %s', $endDate . ' 23:59:59');
      }
    }
    $sql .= $groupedCondition . $orderCondition . $paginate;
    $result = $this->execute($sql, $all_values)->getResult();
    if (is_wp_error($result)) {
      return [
        'count'   => 0,
        'entries' => [],
        'error'   => $result->get_error_message()
      ];
    }
    if ($isFldCondition) {
      $entryCount = $this->queryRecount($selectedMeta, $groupedCondition, $orderCondition, $all_values);
    }
    $resultedEntries = [
      'count'   => $entryCount,
      'entries' => $result,
    ];
    return $resultedEntries;
  }

  public function getSingleEntryMeta($formFields, $entryId)
  {
    $entry_table = $this->app_db->prefix . 'bitforms_form_entries';
    $fieldCount = count($formFields);
    $getSelectedMetaFldValue = $this->selectedEntryMeta($formFields, $fieldCount);
    $selectedMeta = $getSelectedMetaFldValue['selected_meta'];
    $formFieldsNames = $getSelectedMetaFldValue['form_fields_names'];
    $all_values = $getSelectedMetaFldValue['all_values'];
    $condition['bitforms_form_entry_id'] = [$entryId];
    $group = $this->groupedCondition($condition, $all_values, []);
    $groupedCondition = $group['groupedCondition'];
    $all_values = $group['all_values'];
    $orderCondition = $this->orderCondition($formFieldsNames, null);
    $sql = "SELECT $selectedMeta FROM `$this->table_name` em";
    $sql .= " INNER JOIN $entry_table e on e.id = em.bitforms_form_entry_id ";
    $sql .= $groupedCondition . $orderCondition;
    $result = $this->execute($sql, $all_values)->getResult();

    if (is_wp_error($result)) {
      return [];
    }
    return $result;
  }

  private static function csvInjectionPrevent($value)
  {
    $formula = ['=', '-', '+', '@', "\t", "\r"];
    $valueFilter = preg_replace('/[\]["]/i', '', $value);
    if (in_array(substr($value, 0, 1), $formula, true)) {
      $valueFilter = "'" . trim($valueFilter);
    }

    return $valueFilter;
  }

  private static function unescapeString($str)
  {
    if (is_string($str) && '' !== $str) {
      $decoded = json_decode('"' . str_replace('"', '\\"', $str) . '"');
      return (null !== $decoded) ? $decoded : $str;
    }
    return $str;
  }

  private static function formatRepeaterValue($rawValue, $fieldMap)
  {
    if (empty($rawValue)) {
      return '';
    }
    $rows = [];
    preg_match_all('/\{([^}]+)\}/', $rawValue, $matches);

    foreach ($matches[1] as $row) {
      $pairs = explode(',', $row);
      $formattedPairs = [];

      foreach ($pairs as $pair) {
        if (false === strpos($pair, ':')) {
          continue;
        }
        [$childKey, $value] = explode(':', $pair, 2);
        $childKey = trim($childKey);
        $value = trim($value);

        // Get label from fieldMap or use key
        $label = $fieldMap[$childKey]['adminLbl'] ?? $childKey;
        $formattedPairs[] = "$label: " . self::unescapeString($value);
      }

      $rows[] = implode(', ', $formattedPairs);
    }

    return implode('; ', $rows);
  }

  public function getExportEntry($formFields, $entries, $formId, $fieldLabels, $limit = null, $sortBy = null, $sortByField = null, $offset = null, $entryConditions = null)
  {
    $entry_table = $this->app_db->prefix . 'bitforms_form_entries';
    $selectedEntryMeta = '`bitforms_form_entry_id` as entry_id,';
    $selectedEntryMeta .= 'e.user_id as `__user_id`,';
    $selectedEntryMeta .= 'e.status as `__entry_status`,';
    $selectedEntryMeta .= 'e.user_ip as `__user_ip`,';
    $selectedEntryMeta .= 'e.user_location as `__user_location`,';
    $selectedEntryMeta .= 'e.user_device as `__user_device`,';
    $selectedEntryMeta .= 'e.referer as `__referer`,';
    $selectedEntryMeta .= 'e.created_at as `__created_at`,';
    $selectedEntryMeta .= 'e.updated_at as `__updated_at`,';
    $metaChecker = 0;

    $entryInfo = [
      '__user_id',
      '__user_ip', /* '__user_location', */
      '__user_device',
      '__entry_status',
      '__referer',
      '__created_at',
      '__updated_at'
    ];
    $all_values = [];
    if ([] === $formFields) {
      return [
        'count'   => 0,
        'entries' => [],
      ];
    }
    $fieldCount = count($formFields) - count(array_intersect($formFields, $entryInfo));
    $formFieldsNames = [];
    foreach ($formFields as $fldKey) {
      $formFieldsNames[] = $fldKey;
      if (in_array($fldKey, $entryInfo, true)) {
        continue;
      }
      $fieldFormat = $this->getFieldFormat($fldKey);
      $selectedEntryMeta .= "GROUP_CONCAT(
                CASE
                  `meta_key`
                  WHEN '$fieldFormat' THEN `meta_value`
                END
              ) AS '$fieldFormat'";
      $metaChecker += 1;
      $all_values[] = $fldKey;
      $all_values[] = $fldKey;
      if ($metaChecker < $fieldCount) {
        $selectedEntryMeta .= ',';
      }
    }
    $entryIDs = [];
    foreach ($entries as $entryDetail) {
      $entryIDs[] = $entryDetail->id;
    }
    if (empty($entryIDs)) {
      return [
        'count'   => 0,
        'entries' => [],
      ];
    }
    $condition['bitforms_form_entry_id'] = $entryIDs;
    $grpCon = $this->groupedCondition($condition, $all_values, $entryConditions);
    $groupedCondition = $grpCon['groupedCondition'];
    $all_values = $grpCon['all_values'];

    $order = 'DESC' === $sortBy ? 'DESC ' : 'ASC ';
    $validSortFields = array_column($fieldLabels, 'key');
    $orderField = (!is_null($sortByField) && in_array($sortByField, $validSortFields, true))
      ? '`' . sanitize_key($sortByField) . '`'
      : '`bitforms_form_entry_id`';

    $orderCondition = "ORDER BY $orderField $order ";
    $limitClause = '';
    if (!is_null($limit)) {
      $limitInt = intval($limit);
      $limitClause = " LIMIT $limitInt ";
      if (!is_null($offset)) {
        $offsetInt = intval($offset);
        $limitClause .= " OFFSET $offsetInt ";
      }
    }

    $this->app_db->query('SET SESSION group_concat_max_len = 10000');
    $sql = "SELECT $selectedEntryMeta FROM `$this->table_name` em";
    $sql .= " INNER JOIN $entry_table e on e.id = em.bitforms_form_entry_id ";
    $sql .= $groupedCondition . $orderCondition . $limitClause;
    $result = $this->execute($sql, $all_values)->getResult();
    if (is_wp_error($result)) {
      return new \WP_Error('db_error', 'Internal server error');
    }

    $allData = [];
    $entryStatus = [
      '0' => 'Read',
      '1' => 'Unread',
      '2' => 'Unconfirmed',
      '3' => 'Confirmed',
      '9' => 'Draft',
    ];
    $userIds = array_unique(array_filter(
      array_map(static fn ($row) => (int) $row->__user_id, (array) $result),
      static fn ($id) => $id > 0
    ));
    $userNames = [];
    if (!empty($userIds)) {
      $users = get_users(['include' => $userIds, 'fields' => ['ID', 'display_name']]);
      foreach ($users as $user) {
        $userNames[$user->ID] = $user->display_name;
      }
    }
    foreach ($result as $key => $value) {
      foreach ($formFieldsNames as $formFieldName) {
        $allData[$key]['entry_id'] = preg_replace('/[\]["]/i', '', $value->entry_id);
        if ('__user_id' === $formFieldName && intval($value->$formFieldName) > 0) {
          $allData[$key][$formFieldName] = $userNames[$value->$formFieldName] ?? '';
        } elseif ('__user_ip' === $formFieldName) {
          $allData[$key][$formFieldName] = long2ip((int) $value->$formFieldName);
        } elseif ('__entry_status' === $formFieldName) {
          $allData[$key][$formFieldName] = $entryStatus[$value->{$formFieldName}] ?? '';
        } else {
          $allData[$key][$formFieldName] = preg_replace('/[\]["]/i', '', $value->$formFieldName);
        }
      }
    }

    $fieldMap = [];
    $repeaterFields = [];
    $fileFields = [];
    $downloadableFieldType = ['file-up', 'signature', 'advanced-file-up'];

    foreach ($fieldLabels as $field) {
      $key = $field['key'];
      $fieldMap[$key] = $field;
      if ('repeater' === $field['type']) {
        $repeaterFields[] = $key;
      } elseif (in_array($field['type'], $downloadableFieldType, true)) {
        $fileFields[] = $key;
      }
    }

    foreach ($allData as &$entry) {
      foreach ($entry as $key => &$value) {
        if (is_string($value)) {
          $value = self::csvInjectionPrevent(self::unescapeString($value));
        }
        if (in_array($key, $repeaterFields, true)) {
          $value = self::formatRepeaterValue($value, $fieldMap);
        }
      }
      unset($value);
    }
    unset($entry, $value);

    foreach ($allData as &$entry) {
      $entryId = $entry['entry_id'];
      $_upload_dir = FileHandler::getEntriesFileUploadDir($formId, $entryId);
      foreach ($fileFields as $fileKey) {
        if (empty($entry[$fileKey])) {
          continue;
        }
        $fileIds = explode(',', $entry[$fileKey]);
        $urls = [];
        foreach ($fileIds as $fileId) {
          $path = "bitforms/bitforms-file/?formID=$formId&entryID=$entryId&fileID=$fileId";
          if (file_exists($_upload_dir . DIRECTORY_SEPARATOR . $fileId)) {
            $urls[] = site_url($path);
          }
        }
        $entry[$fileKey] = implode(',', $urls);
      }
    }
    unset($entry);

    return $allData;
  }
}
