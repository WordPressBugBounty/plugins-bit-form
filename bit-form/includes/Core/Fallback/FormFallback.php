<?php

namespace BitCode\BitForm\Core\Fallback;

use BitCode\BitForm\Admin\Form\AdminFormHandler;
use BitCode\BitForm\Core\Database\DB;
use BitCode\BitForm\Core\Database\FormModel;
use BitCode\BitForm\Core\Form\FormHandler;
use BitCode\BitForm\Core\Form\FormManager;
use BitCode\BitForm\Core\Migration\MigrateForms;
use BitCode\BitForm\Core\Migration\MigrationHelper;

final class FormFallback
{
  public function resetJsGeneratedPageIds()
  {
    $formModel = new FormModel();
    $formModel->update(
      [
        'generated_script_page_ids' => wp_json_encode((object) []),
      ],
      [
        'status' => 1
      ]
    );
  }

  /**
   * Name/Address children renamed with their parent before 3.3.2 kept the old prefix, so their
   * inputs posted away from the parent and its entry value saved empty. Safe to re-run: only
   * forms whose names actually change are written.
   *
   * @return void
   */
  public function syncCompositeChildNames()
  {
    $formModel = new FormModel();
    $forms = $formModel->get(
      ['id', 'form_content'],
      [
        'form_content' => ['operator' => 'LIKE', 'value' => '%"childFields"%'],
      ]
    );
    if (is_wp_error($forms) || !is_array($forms)) {
      return;
    }
    foreach ($forms as $form) {
      $formContent = json_decode($form->form_content ?? '');
      if (!is_object($formContent) || !isset($formContent->fields)) {
        continue;
      }
      if (!FormManager::syncCompositeChildNames($formContent->fields)) {
        continue;
      }
      $encoded = wp_json_encode($formContent);
      if (!is_string($encoded)) {
        continue;
      }
      $formModel->update(['form_content' => $encoded], ['id' => $form->id]);
    }
  }

  public function v1formMigragion()
  {
    $olderVersion = get_option('bitforms_version');
    $isMigratedToV2 = get_option('bitforms_migrated_to_v2');
    $isMigratingToV2 = get_option('bitforms_migrating_to_v2');
    if (!$isMigratedToV2 && !$isMigratingToV2 && $olderVersion) {
      $formHandler = FormHandler::getInstance();
      if (!$formHandler->admin) {
        $formHandler->admin = new AdminFormHandler();
      }
      $formHandler->admin->startMigrationProcess();
      update_option('bitforms_db_version', '2.0');
      DB::migrate();
      $migrateFormsHandler = new MigrateForms();
      $all_forms = $migrateFormsHandler->migrateToV2();
      foreach ($all_forms as $form) {
        $formatFormData = MigrationHelper::formatFormData($form);
        $formHandler->admin->updateForm(null, $formatFormData);
      }
    }
  }
}
