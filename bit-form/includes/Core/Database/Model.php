<?php

/**
 * Provides Base Model Class
 */

namespace BitCode\BitForm\Core\Database;

/**
 * Undocumented class
 */

use BitCode\BitForm\Core\Util\Log;
use WP_Error;

class Model
{
  protected static $table;
  protected static $primary_key;
  protected $app_db;
  protected $table_name;
  protected $db_response;

  /**
   * Undocumented function
   */
  public function __construct()
  {
    global $wpdb;
    $this->app_db = $wpdb;
    $this->table_name = $wpdb->prefix . static::$table;
  }

  /**
   * Insert a row
   *
   * @return mixed insert id on success, WP_Error on failure
   */
  public function insert($data = [])
  {
    if (is_null($data)) {
      return new WP_Error('empty_data', 'Form data is empty');
    }
    $result = $this->app_db->insert(
      $this->table_name,
      $data
    );
    return $this->getResult($result);
  }

  /**
   * Undocumented function
   *
   * @param string|string[] $item
   * @param array           $condition
   *
   * @return mixed
   */
  public function get($item = '*', $condition = [], $limit = null, $offset = null, $order_by = null, $order_follow = null)
  {
    static $tableExistsCache = [];
    if (!isset($tableExistsCache[$this->table_name])) {
      $tableExistsCache[$this->table_name] = !is_null(
        $this->app_db->get_var(
          $this->app_db->prepare('SHOW TABLES LIKE %s', $this->table_name)
        )
      );
    }
    if (!$tableExistsCache[$this->table_name]) {
      return [];
    }
    if (\is_array($item)) {
      $column_to_select = implode(',', $item);
    } else {
      $column_to_select = $item;
    }
    $checkCondition = $this->checkCondition($condition);
    if (is_wp_error($checkCondition)) {
      return $checkCondition;
    }
    $order = null;
    if (!\is_null($order_by)) {
      $order_follow = \is_null($order_follow) ? 'ASC' : $order_follow;
      $direction = \is_string($order_follow) ? strtoupper(trim($order_follow)) : '';
      if ($this->isSafeConditionIdentifier($order_by) && \in_array($direction, ['ASC', 'DESC'], true)) {
        $order .= ' ORDER BY ' . $this->quoteIdentifier($order_by) . ' ' . $direction;
      } else {
        Log::debug_log([
          'message'      => 'Model::get() ignored an unsafe ORDER BY',
          'table'        => $this->table_name,
          'order_by'     => $order_by,
          'order_follow' => $order_follow,
        ]);
      }
    }
    $paginate = null;
    if (!\is_null($limit)) {
      $limit = \intval($limit);
      $paginate .= " LIMIT $limit ";
    }
    if (!\is_null($offset)) {
      $offset = \intval($offset);
      $paginate .= " OFFSET  $offset ";
    }
    if (empty($condition)) {
      $sql = "SELECT $column_to_select FROM `$this->table_name` $order $paginate";
      $all_values = null;
    } else {
      $formatted_conditions = $this->getFormatedCondition($condition);
      if ($formatted_conditions) {
        $condition_to_check = $formatted_conditions['conditions'];
        $all_values = $formatted_conditions['values'];
      } else {
        $condition_to_check = null;
        $all_values = null;
      }
      $sql = "SELECT $column_to_select FROM `$this->table_name`"
          . $condition_to_check . $order . $paginate;
    }
    return $this->execute($sql, $all_values)->getResult();
  }

  /**
   * Undocumented function
   *
   * @param string $item
   * @param array  $condition
   *
   * @return void
   */
  public function count($condition = null)
  {
    $checkCondition = $this->checkCondition($condition);
    if (is_wp_error($checkCondition)) {
      return $checkCondition;
    }
    if (empty($condition)) {
      $result = $this->app_db->query(
        "SELECT COUNT(*) FROM `$this->table_name`"
      );
    } else {
      $formatted_conditions = $this->getFormatedCondition($condition);
      if ($formatted_conditions) {
        $condition_to_check = $formatted_conditions['conditions'];
        $all_values = $formatted_conditions['values'];
      } else {
        $condition_to_check = null;
        $all_values = null;
      }
      $result = $this->app_db->query(
        $this->app_db->prepare(
          "SELECT COUNT(*) as count FROM `{$this->table_name}`"
              . $condition_to_check,
          $all_values
        )
      );
    }
    if (!$result) {
      if ($this->app_db->last_error) {
        return new WP_Error('db_error', $this->app_db->last_error);
      }
      return new WP_Error('db_error', 'Result is empty');
    } else {
      return $this->app_db->last_result;
    }
  }

  /**
   * Undocumented function
   *
   * @param array $data_to_update
   * @param array $condition
   *
   * @return mixed affected-row count on success, WP_Error on failure or when no row matched
   */
  public function update(array $data, array $condition)
  {
    if (
      !\is_null($data)
      && \is_array($data)
      && array_keys($data) !== range(0, count($data) - 1)
    ) {
      $data_to_update = $data;
    } else {
      return new WP_Error(
        'update_error',
        'Nothing to update'
      );
    }
    $update_condition = (!\is_null($condition) &&
        array_keys($condition) !== range(0, count($condition) - 1)) ? $condition : null;
    $result = $this->app_db->update(
      $this->table_name,
      $data_to_update,
      $update_condition
    );
    return $this->getResult($result);
  }

  /**
   * Undocumented function
   *
   * @param array $data_to_update
   * @param array $condition
   *
   * @return void
   */
  public function bulkUpdate(array $data = null, array $condition = null)
  {
    if (
      !\is_null($data)
      && \is_array($data)
      && array_keys($data) !== range(0, count($data) - 1)
    ) {
      $data_to_update = $data;
    } else {
      return new WP_Error(
        'update_error',
        'Nothing to update'
      );
    }

    $update_fields = '';
    $all_values = [];
    $index_checker = 0;
    $data_count = count($data_to_update) - 1;
    foreach ($data_to_update as $field_name => $field_value) {
      $update_fields .= $field_name . ' = ' . $this->getFieldFormat($field_value);
      if ($index_checker < $data_count) {
        $update_fields .= ',';
      }
      $index_checker = $index_checker + 1;
      $all_values[] = $field_value;
    }
    $update_condition = (!\is_null($condition) &&
        array_keys($condition) !== range(0, count($condition) - 1)) ? $condition : null;
    $formatted_conditions = $this->getFormatedCondition($update_condition);
    if ($formatted_conditions) {
      $condition_to_check = $formatted_conditions['conditions'];
      $all_values = array_merge($all_values, $formatted_conditions['values']);
    } else {
      $condition_to_check = null;
    }
    $result = $this->app_db->query(
      $this->app_db->prepare(
        "UPDATE `{$this->table_name}` SET $update_fields $condition_to_check",
        $all_values
      )
    );
    return $this->getResult($result);
  }

  /**
   * Duplicate's row
   *
   * @param array $data_to_update
   * @param array $condition
   *
   * @return void
   */
  public function duplicate(array $columns, array $duplicate, array $condition)
  {
    if (!(!\is_null($columns)
        && \is_array($columns)
        && array_keys($columns) === range(0, count($columns) - 1)
        && !\is_null($duplicate)
        && \is_array($duplicate)
        && array_keys($duplicate) === range(0, count($duplicate) - 1))) {
      return new WP_Error(
        'duplicate_error',
        'Nothing to duplicate'
      );
    }

    $dupCol = '';
    $insCol = \implode(',', $columns);
    $all_values = [];
    $data_count = count($duplicate) - 1;
    foreach ($duplicate as $dupKey => $dupColName) {
      if (in_array($dupColName, $columns)) {
        $dupCol .= $dupColName;
      } else {
        $dupCol .= $this->getFieldFormat($dupColName);
        $all_values[] = $dupColName;
      }
      if ($dupKey < $data_count) {
        $dupCol .= ',';
      }
    }
    $condition_to_check = null;
    $update_condition = (!\is_null($condition) &&
        array_keys($condition) !== range(0, count($condition) - 1)) ? $condition : null;
    $formatted_conditions = $this->getFormatedCondition($update_condition);
    if ($formatted_conditions) {
      $condition_to_check = $formatted_conditions['conditions'];
      $all_values = array_merge($all_values, $formatted_conditions['values']);
    }
    $query = "INSERT INTO `{$this->table_name}` ($insCol)
        SELECT $dupCol FROM `{$this->table_name}` $condition_to_check";
    $this->execute($query, $all_values);
    return $this->getResult();
  }

  public function trash(array $condition = null)
  {
    if (
      !\is_null($condition)
      && \is_array($condition)
      && array_keys($condition) !== range(0, count($condition) - 1)
    ) {
      $delete_condition = $condition;
    } else {
      return new WP_Error(
        'deletion_error',
        'At least 1 condition needed'
      );
    }
    $update_condition = (!\is_null($condition) &&
        array_keys($condition) !== range(0, count($condition) - 1)) ? $condition : null;
    $result = $this->app_db->update(
      $this->table_name,
      $data_to_update,
      $update_condition
    );
    return $this->getResult($result);
  }

  public function delete(array $condition = null)
  {
    if (
      !\is_null($condition)
      && \is_array($condition)
      && array_keys($condition) !== range(0, count($condition) - 1)
    ) {
      $delete_condition = $condition;
    } else {
      return new WP_Error(
        'deletion_error',
        'At least 1 condition needed'
      );
    }
    $result = $this->app_db->delete(
      $this->table_name,
      $delete_condition
    );
    return $this->getResult($result);
  }

  public function bulkDelete(array $condition = null)
  {
    if (
      !\is_null($condition)
      && \is_array($condition)
      && array_keys($condition) !== range(0, count($condition) - 1)
    ) {
      $delete_condition = $condition;
    } else {
      return new WP_Error(
        'deletion_error',
        'At least 1 condition needed'
      );
    }
    // $formatted_conditions = $this->getFormatedCondition($delete_condition, $check_operator);
    $formatted_conditions = $this->getFormatedCondition($delete_condition);
    if ($formatted_conditions) {
      $condition_to_check = $formatted_conditions['conditions'];
      $all_values = $formatted_conditions['values'];
    } else {
      $condition_to_check = null;
      return new WP_Error(
        'deletion_error',
        'At least 1 condition needed'
      );
    }
    $result = $this->app_db->query(
      $this->app_db->prepare(
        "DELETE FROM `{$this->table_name}` $condition_to_check",
        $all_values
      )
    );
    return $this->getResult($result);
  }

  protected function getFieldFormat($value)
  {
    return ('integer' === gettype($value)) ?
        '%d' : (('double' === gettype($value)) ? '%f' : '%s');
  }

  /**
   *
   * @param mixed $identifier
   *
   * @return bool
   */
  protected function isSafeConditionIdentifier($identifier)
  {
    if (!\is_string($identifier)) {
      return false;
    }
    $identifier = trim($identifier);
    if ('' === $identifier) {
      return false;
    }

    // A condition column may be table-qualified and backtick-quoted — the multi-table JOIN DELETE
    // in FormEntryModel::bulkDelete() *must* pass `wp_bitforms_form_entries`.`id`, because a bare
    // `id` is ambiguous across the two joined tables. Validate each segment on its own.
    $parts = explode('.', $identifier);
    if (count($parts) > 2) {
      return false;
    }
    foreach ($parts as $part) {
      $part = trim($part);
      if (\strlen($part) > 1 && '`' === $part[0] && '`' === substr($part, -1)) {
        $part = substr($part, 1, -1);
      }
      if (1 !== preg_match('/^[A-Za-z_][A-Za-z0-9_]*$/', $part)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Backtick-quote a validated identifier, leaving an already-quoted or table-qualified one alone.
   * Only ever call this on a value isSafeConditionIdentifier() has approved.
   *
   * @param string $identifier
   *
   * @return string
   */
  protected function quoteIdentifier($identifier)
  {
    $identifier = trim($identifier);
    if (false !== strpos($identifier, '`') || false !== strpos($identifier, '.')) {
      return $identifier;
    }

    return '`' . $identifier . '`';
  }

  /**
   * @param mixed $operator
   *
   * @return bool
   */
  protected function isSafeConditionOperator($operator)
  {
    static $allowed = ['=', '!=', '<>', '<', '>', '<=', '>=', 'LIKE', 'NOT LIKE', 'IN', 'NOT IN', 'IS', 'IS NOT'];

    return \is_string($operator) && \in_array(strtoupper(trim($operator)), $allowed, true);
  }

  /**
   * A WHERE that matches nothing. Keeps a placeholder so the caller's
   * $wpdb->prepare($sql, $values) still has something to bind.
   *
   * @return array
   */
  private function impossibleCondition()
  {
    return [
      'conditions' => ' WHERE 1=%d ',
      'values'     => [0],
    ];
  }

  protected function getFormatedCondition($condition, $check_operator = null, $join_operator = ' AND ')
  {
    if (\is_null($condition)) {
      return false;
    }
    $no_condition = count($condition);
    $index_checker = 0;
    $condition_to_check = ' WHERE ';
    $all_values = [];
    foreach ($condition as $key => $value) {
      if (!$this->isSafeConditionIdentifier($key)) {
        return $this->impossibleCondition();
      }
      $value_type = '';
      if (is_array($value)) {
        // Check for raw SQL values first
        if (isset($value['raw'])) {
          if (!\is_string($value['raw'])) {
            return $this->impossibleCondition();
          }
          $set_check_operator = isset($value['operator']) ? $value['operator'] : '=';
          $value_type = $value['raw']; // Use raw SQL directly
          // Don't add to $all_values since it's raw SQL
        } elseif (isset($value['operator'])) {
          // logic for operator arrays
          $set_check_operator = $value['operator'];
          $value_type .= $this->getFieldFormat($value['value']);
          $all_values[] = $value['value'];
        } else {
          // logic for IN conditions
          $set_check_operator = \is_null($check_operator) ? 'in' : $check_operator;
          $value_type .= ' ( ';
          $value_index_checker = 0;
          $value_count = count($value) - 1;
          foreach ($value as $condKey => $condValue) {
            $value_type .= $this->getFieldFormat($condValue);
            $all_values[] = $condValue;
            if ($value_index_checker < $value_count) {
              $value_type .= ', ';
            }
            $value_index_checker = $value_index_checker + 1;
          }
          $value_type .= ' )';
        }
      } else {
        // logic for simple values
        $set_check_operator = \is_null($check_operator) ? '=' : $check_operator;
        $value_type .= $this->getFieldFormat($value);
        $all_values[] = $value;
      }
      if (!$this->isSafeConditionOperator($set_check_operator)) {
        return $this->impossibleCondition();
      }
      $condition_to_check = $condition_to_check . $key . " $set_check_operator " . $value_type;
      if ($index_checker < $no_condition - 1) {
        $condition_to_check = $condition_to_check . " $join_operator ";
      }
      $index_checker = $index_checker + 1;
    }
    return [
      'conditions' => $condition_to_check,
      'values'     => $all_values
    ];
  }

  /**
   * @param array $values values about to be bound by $wpdb->prepare()
   *
   * @return string|null the offending PHP type, or null when every value is bindable
   */
  private function findUnbindableValue(array $values)
  {
    foreach ($values as $value) {
      if (!is_scalar($value) && !is_null($value)) {
        return \gettype($value);
      }
    }

    return null;
  }

  protected function checkCondition(array $condition)
  {
    if (!is_null($condition) && array_keys($condition) === range(0, count($condition) - 1)) {
      return new WP_Error(
        'get_condition',
        'Require ASSOC_ARRAY but found N_ARRAY'
      );
    }
    return true;
  }

  protected function execute($sql, $values = null)
  {
    // Clear the previous call's outcome before running a new query, so a failure can never be
    // read back by whatever this instance is used for next.
    $this->db_response = null;
    if (is_null($values)) {
      $preparedQuery = $sql;
    } else {
      $invalid = $this->findUnbindableValue((array) $values);
      if (null !== $invalid) {
        Log::debug_log([
          'message' => 'Model::execute() received an unbindable condition value',
          'table'   => $this->table_name,
          'type'    => $invalid,
          'sql'     => $sql,
        ]);
        $this->db_response = new WP_Error('invalid_query_value', 'Query value must be scalar, ' . $invalid . ' given');

        return $this;
      }
      $preparedQuery = $this->app_db->prepare($sql, $values);
    }
    // echo " Q S " . $preparedQuery . " Q  EE";
    if (empty($preparedQuery)) {
      $this->db_response = new WP_Error('null_query', 'prepared query is empty');
    } else {
      $this->db_response = false !== stripos($preparedQuery, 'DELETE') ? $this->app_db->query($preparedQuery)
          : $this->app_db->get_results($preparedQuery, OBJECT_K);
    }
    // print_r($this->app_db->last_query);
    return $this;
  }

  protected function getResult($db_response = null)
  {
    // The caller's own result wins. $db_response is an instance property that only execute()
    // writes, and models are reused (AdminFormHandler keeps a static FormModel for the whole
    // request), so letting the property override an explicitly passed result made insert() and
    // update() report the outcome of some earlier, unrelated query on the same object.
    // Without this fallback, execute()->getResult() (which passes no argument) never sees the
    // query it just ran and every read returns 'result_empty'.
    if (null === $db_response) {
      $db_response = $this->db_response;
    }

    if (is_wp_error($db_response)) {
      return $db_response;
    }
    if (!empty($this->app_db->last_error)) {
      return new WP_Error('db_error', $this->app_db->last_error);
    }
    if (!$db_response) {
      if ($this->app_db->num_rows > 0) {
        $response = $this->app_db->num_rows;
      }
      if (is_wp_error($db_response)) {
        $response = $db_response;
      }
      $response = new WP_Error('result_empty', 'Result is empty');
    } elseif (is_array($this->app_db->last_result) && !empty($this->app_db->last_result)) {
      $response = $this->app_db->last_result;
    } elseif ($this->app_db->insert_id) {
      $response = $this->app_db->insert_id;
    } else {
      $response = $db_response;
    }
    $this->app_db->flush();
    return $response;
  }

  /**
   * Get last inserted id
   *
   * @return int
   */
  public function lastId()
  {
    $sql = "SELECT id FROM `{$this->table_name}`
    ORDER BY id DESC LIMIT 1";
    $result = $this->execute($sql)->getResult();
    if (is_wp_error($result)) {
      return 0;
    }
    return $result[0]->id;
  }
}
