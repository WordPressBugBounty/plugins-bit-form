<?php

namespace BitCode\BitForm\Core\Messages;

use BitCode\BitForm\Core\Database\EmailTemplateModel;

final class EmailTemplateHandler
{
  private static $_formID;
  private static $_emailTemplateModel;
  private $_user_details;

  public function __construct($formID, array $user_details = null)
  {
    static::$_formID = $formID;
    static::$_emailTemplateModel = new EmailTemplateModel();
    $this->_user_details = $user_details;
  }

  /**
   * Decode a stored template `config` column into the object shape the admin editor expects.
   *
   * Older versions could persist an empty config as `[]`; decoded, that reaches the React editor
   * as a JS array and setting a key on it throws inside the immutable-draft library. Anything that
   * is not a non-empty object collapses to `{}`.
   *
   * @param mixed $config raw column value (JSON string, already-decoded value, or null)
   *
   * @return object
   */
  public static function normalizeConfig($config)
  {
    if (is_string($config)) {
      $config = json_decode($config);
    }
    if (is_array($config)) {
      $config = (object) $config;
    }

    return is_object($config) ? $config : (object) [];
  }

  public function getAllTemplate($templateID = null, $userID = null)
  {
    $condition = [
      'form_id' => static::$_formID,
    ];
    if (!is_null($templateID)) {
      $condition = array_merge($condition, ['id' => $templateID]);
    }
    if (!is_null($userID)) {
      $condition = array_merge($condition, ['user_id' => $userID]);
    }
    return static::$_emailTemplateModel->get(
      [
        'id',
        'title',
        'sub',
        'body',
        'status',
        'config'
      ],
      $condition
    );
  }

  public function getATemplate($templateID)
  {
    return $this->getAllTemplate($templateID);
  }

  public function saveTemplate($templateDetail)
  {
    return static::$_emailTemplateModel->insert(
      [
        'title'     => $templateDetail->title,
        'sub'       => $templateDetail->sub,
        'body'      => $templateDetail->body,
        'status'    => isset($templateDetail->status) ? (int) $templateDetail->status : 1,
        'config'    => isset($templateDetail->config) ? wp_json_encode($templateDetail->config) : null,
        'form_id'   => static::$_formID,
        'user_id'   => $this->_user_details['id'],
        'user_ip'   => $this->_user_details['ip'],
        'created_at'=> $this->_user_details['time'],
        'updated_at'=> $this->_user_details['time']
      ]
    );
  }

  public function updateTemplate($templateDetail)
  {
    return static::$_emailTemplateModel->update(
      [
        'title'     => $templateDetail->title,
        'sub'       => $templateDetail->sub,
        'body'      => $templateDetail->body,
        'status'    => isset($templateDetail->status) ? (int) $templateDetail->status : 1,
        'config'    => isset($templateDetail->config) ? wp_json_encode($templateDetail->config) : null,
        'form_id'   => static::$_formID,
        'user_id'   => $this->_user_details['id'],
        'user_ip'   => $this->_user_details['ip'],
        'updated_at'=> $this->_user_details['time']
      ],
      [
        'id' => $templateDetail->id
      ]
    );
  }

  public function deleteTemplate($templateID)
  {
    return static::$_emailTemplateModel->delete(
      [
        'id'      => $templateID,
        'form_id' => static::$_formID,
      ]
    );
  }

  public function duplicateTemplate($templateID)
  {
    $templateDetail = static::$_emailTemplateModel->get(
      [
        'id'      => $templateID,
        'form_id' => static::$_formID,
      ]
    );
    if (is_wp_error($templateDetail) || empty($templateDetail)) {
      return $templateDetail;
    }

    $title = empty($templateDetail[0]->title) ? "Duplicate of Template #$templateID" :
    "Duplicate of $templateDetail[0]->title";

    $templateDetail[0]->title = $title;
    return $this->saveTemplate($templateDetail);
  }

  public function duplicateAllTempInAForm($oldFromId)
  {
    $allCols = ['title', 'sub', 'body', 'form_id', 'user_id', 'user_ip', 'created_at', 'updated_at'];
    $dupData = [
      'title',
      'sub',
      'body',
      static::$_formID,
      $this->_user_details['id'],
      $this->_user_details['ip'],
      $this->_user_details['time'],
      $this->_user_details['time']
    ];
    return static::$_emailTemplateModel->duplicate(
      $allCols,
      $dupData,
      ['form_id' => $oldFromId]
    );
  }
}
