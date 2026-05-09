<?php

namespace BitCode\BitForm\Core\Database;

use BitCode\BitForm\Core\Util\IpTool;

/**
 * Undocumented class
 */

class ApiModel extends Model
{
  public $_wpdb;

  public function __construct()
  {
    global $wpdb;
    $this->_wpdb = $wpdb;
  }

  public function getForm()
  {
    $result = $this->_wpdb->get_results(
      "
            SELECT form_name,id FROM `{$this->_wpdb->prefix}bitforms_form` WHERE `status`=1 order By created_at DESC
            "
    );
    return $result;
  }

  public function getField($id)
  {
    $result = $this->_wpdb->get_results(
      $this->_wpdb->prepare(
        "SELECT form_content,id FROM `{$this->_wpdb->prefix}bitforms_form` WHERE `status`=1 AND `id`=%d",
        $id
      )
    );
    return $result;
  }

  public function editEntry($entryID)
  {
    $result = $this->_wpdb->get_results(
      $this->_wpdb->prepare(
        "SELECT bitforms_form_entry_id,meta_key,meta_value FROM `{$this->_wpdb->prefix}bitforms_form_entrymeta` WHERE `bitforms_form_entry_id`=%d",
        $entryID
      )
    );
    return $result;
  }

  public function entryDelete($entryID)
  {
    $sql = $this->_wpdb->prepare(
      "DELETE FROM `{$this->_wpdb->prefix}bitforms_form_entrymeta` WHERE `bitforms_form_entry_id` = %d",
      $entryID
    );
    $result = $this->_wpdb->query($sql);
    return $result;
  }

  public function findRecord($table_name, $column, $value)
  {
    // Identifiers (table/column) cannot be parameterized with wpdb placeholders.
    // Sanitize identifiers to prevent SQL injection through dynamic identifiers.
    $safeTable = preg_replace('/[^A-Za-z0-9_]/', '', (string) $table_name);
    $safeColumn = preg_replace('/[^A-Za-z0-9_]/', '', (string) $column);
    $table_name = $this->_wpdb->prefix . $safeTable;
    $value = is_scalar($value) ? $value : ''; // Ensure value is scalar for placeholder.
    if ('' === $safeTable || '' === $safeColumn) {
      return [];
    }

    $sql = $this->_wpdb->prepare(
      'SELECT `%1$s` FROM `%2$s` WHERE `%1$s`=%3$s',
      $safeColumn,
      $table_name,
      $value
    );
    return $this->_wpdb->get_results($sql);
  }

  public function noteCreate($formID, $entryID, $note_details)
  {
    $ipTool = new IpTool();
    $user_details = $ipTool->getUserDetail();
    $result = $this->_wpdb->insert(
      "{$this->_wpdb->prefix}bitforms_form_entry_relatedinfo",
      [
        'info_type'    => 'note',
        'info_details' => $note_details,
        'form_id'      => $formID,
        'entry_id'     => $entryID,
        'user_id'      => $user_details['id'],
        'user_ip'      => $user_details['ip'],
        'created_at'   => $user_details['time'],
      ]
    );
    return $result;
  }

  public function noteList()
  {
    $result = $this->_wpdb->get_results("SELECT * FROM `{$this->_wpdb->prefix}bitforms_form_entry_relatedinfo` WHERE `status`=1");
    return $result;
  }

  public function getWorkFlow($formID)
  {
    $result = $this->_wpdb->get_results(
      $this->_wpdb->prepare(
        "SELECT workflow_name,id FROM `{$this->_wpdb->prefix}bitforms_workflows` WHERE `form_id` = %d",
        $formID
      )
    );
    return $result;
  }

  public function noteUpdate($noteID, $note_details)
  {
    $data = ['info_details' => $note_details];
    $result = $this->_wpdb->update(
      "{$this->_wpdb->prefix}bitforms_form_entry_relatedinfo",
      $data,
      [
        'id' => $noteID,
      ]
    );
    return $result;
  }

  public function noteDelete($noteID)
  {
    $sql = $this->_wpdb->prepare(
      "DELETE FROM `{$this->_wpdb->prefix}bitforms_form_entry_relatedinfo` WHERE `id` = %d",
      $noteID
    );
    $result = $this->_wpdb->query($sql);
    return $result;
  }

  public function get_form_value($entryID)
  {
    $sql = $this->_wpdb->prepare(
      "SELECT `meta_key`,`meta_value` FROM `{$this->_wpdb->prefix}bitforms_form_entrymeta` WHERE bitforms_form_entry_id=%d",
      $entryID
    );
    $result = $this->_wpdb->get_results($sql);
    return $result;
  }

  public function logUpdate($updateValue, $logID)
  {
    if (empty($logID)) {
      return false;
    }
    $sql = $this->_wpdb->prepare(
      "UPDATE `{$this->_wpdb->prefix}bitforms_form_entry_log` SET content=%s WHERE id=%d",
      $updateValue,
      $logID
    );
    $result = $this->_wpdb->get_results($sql);
    return $result;
  }

  public function getFormId($formID)
  {
    $sql = $this->_wpdb->prepare(
      "SELECT form_id FROM `{$this->_wpdb->prefix}bitforms_form_entries` WHERE id=%d",
      $formID
    );
    $result = $this->_wpdb->get_results($sql);
    return $result;
  }

  public function getOnSubmitWorkflow($formID)
  {
    $sql = $this->_wpdb->prepare(
      "SELECT `id`, `workflow_name`, `workflow_type`, `workflow_run`, `workflow_behaviour`, `workflow_status` FROM `{$this->_wpdb->prefix}bitforms_workflows` WHERE `form_id`=%d AND `workflow_type`='onsubmit' ORDER BY id DESC",
      $formID
    );
    $result = $this->_wpdb->get_results($sql);
    return $result;
  }
}
