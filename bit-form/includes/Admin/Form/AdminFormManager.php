<?php

/**
 * Get set Form,fields
 */

namespace BitCode\BitForm\Admin\Form;

/**
 * FrontendFormManager class
 */
use BitCode\BitForm\Core\Form\FormManager;

final class AdminFormManager extends FormManager
{
  public function __construct($form_id)
  {
    parent::__construct($form_id);
  }

  /**
   * Pinned to raw: the builder saves back what it reads, so a translated string
   * reaching it would overwrite the stored source language.
   *
   * @return string
   */
  protected function getEffectiveFormContentJson()
  {
    // $this->form is a WP_Error when the form was not found; indexing it here
    // fataled for callers that pass an unknown or empty form id
    $raw = $this->isExist() ? ($this->form[0]->form_content ?? '') : '';
    return is_string($raw) ? $raw : '';
  }

  public function getFormMetaData()
  {
    if (!$this->isExist()) {
      return [
        'created_at' => null,
        'views'      => null,
        'entries'    => null,
        'status'     => null
      ];
    }

    return [
      'created_at' => $this->form[0]->created_at,
      'views'      => $this->form[0]->views,
      'entries'    => $this->form[0]->entries,
      'status'     => $this->form[0]->status
    ];
  }
}
