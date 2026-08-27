<?php

/**
 * Get set Form,fields
 */

namespace BitCode\BitForm\Core\Form;

/**
 * FrontendFormManager class
 */

use BitCode\BitForm\Admin\Form\CustomFieldHandler;
use BitCode\BitForm\Admin\Form\Helpers;
use BitCode\BitForm\Core\Database\FormEntryLogModel;
use BitCode\BitForm\Core\Database\FormEntryMetaModel;
use BitCode\BitForm\Core\Database\FormEntryModel;
use BitCode\BitForm\Core\Database\FormModel;
use BitCode\BitForm\Core\Integration\IntegrationHandler;
use BitCode\BitForm\Core\Messages\SuccessMessageHandler;
use BitCode\BitForm\Core\Util\FieldValueHandler;
use BitCode\BitForm\Core\Util\FileHandler;
use BitCode\BitForm\Core\Util\FrontendHelpers;
use BitCode\BitForm\Core\Util\IpTool;
use BitCode\BitForm\Core\Util\Log;
use BitCode\BitForm\Core\Util\Translation\FormContentTranslator;
use BitCode\BitForm\Core\Util\Utilities;
use BitCode\BitForm\Core\WorkFlow\WorkFlow;
use BitCode\BitForm\Core\WorkFlow\WorkFlowHandler;
use BitCode\BitForm\enshrined\svgSanitize\Sanitizer;
use stdClass;
use WP_Error;

class FormManager
{
  // Cache for instances of FormManager by form_id
  private static $formManagerCache = [];

  /**
   * Object-cache group for translated form_content.
   */
  public const TRANSLATION_CACHE_GROUP = 'bitform_translation';

  /**
   * Request-scoped memo of translated form_content JSON, keyed "formId|lang".
   * Static on purpose, unlike $form: the key carries the form id and the
   * language, so an entry cannot be read back for the wrong form.
   *
   * @var array<string,string>
   */
  private static $translatedContentCache = [];

  // Per-instance, never static: a static is shared with every subclass and overwritten by the
  // last-constructed manager, so cached instances would read another form's row.
  protected $form;
  protected $formModel;
  protected $form_id;
  private $_has_upload;
  private $_field_label;
  private $_fields;
  private $_repeaterFields;
  private $_work_flows;
  private $_conf_messages;
  private $_atomic_class_map;
  private $_saveFormAsDraft;

  public function __construct($form_id)
  {
    $this->form_id = $form_id;
    $this->formModel = new FormModel();

    $this->form = $this->formModel->get(
      [
        'id',
        'form_content',
        'form_name',
        'created_at',
        'views',
        'entries',
        'status',
        'builder_helper_state',
        'atomic_class_map',
        'generated_script_page_ids',
      ],
      [
        'id' => $form_id,
      ]
    );
    if (!is_wp_error($this->form)) {
      $atomicClassMap = isset($this->form[0]->atomic_class_map) ? $this->form[0]->atomic_class_map : '';
      $this->_atomic_class_map = json_decode((string) $atomicClassMap);
      $bfMultipleFormsExists = FrontendHelpers::hasMultipleForms();
      if ($bfMultipleFormsExists && isset($this->_atomic_class_map->atomic_class_map_with_form_id)) {
        $this->_atomic_class_map = $this->_atomic_class_map->atomic_class_map_with_form_id;
      } elseif (isset($this->_atomic_class_map->atomic_class_map)) {
        $this->_atomic_class_map = $this->_atomic_class_map->atomic_class_map;
      }
    } else {
      // Log the error if needed
      Log::debug_log('Error fetching form: ' . "Form Id = ($form_id)" . $this->form->get_error_message());
    }
  }

  /**
   * Test hook: clears the request memo of translated form_content.
   */
  public static function resetTranslationMemoForTesting()
  {
    self::$translatedContentCache = [];
  }

  // Static method to get the instance of FormManager
  public static function getInstance($form_id)
  {
    // Check if an instance of FormManager is already cached
    if (!isset(self::$formManagerCache[$form_id])) {
      // Create and cache the FormManager instance if not found
      self::$formManagerCache[$form_id] = new self($form_id);
    }

    // Return the cached instance
    return self::$formManagerCache[$form_id];
  }

  public function isExist()
  {
    return (!$this->form || is_wp_error($this->form)) ? false : true;
  }

  public function checkStatus()
  {
    // Fail closed for a missing form: $this->form is a WP_Error when the lookup
    // found nothing, and the unauthenticated submit endpoints call this before
    // isExist() — indexing it there fatals on any unknown form id.
    if (!$this->isExist()) {
      return false;
    }
    return '1' === $this->form[0]->status ? true : false;
  }

  public function getFieldsContent()
  {
    // Raw on purpose: FormFieldValidator's allowed-option lookup must compare
    // against the source-language config whatever the request language is.
    return $this->form[0]->form_content;
  }

  /**
   * form_content JSON with display strings passed through
   * `bitform_translate_form_string`; the raw string when nothing is hooked.
   * Never persisted back to the row — stored form_content stays source-language.
   * AdminFormManager overrides this to always return raw.
   *
   * @return string
   */
  protected function getEffectiveFormContentJson()
  {
    // $this->form is a WP_Error when the form was not found; indexing it here
    // fataled for callers that pass an unknown or empty form id
    $raw = $this->isExist() ? ($this->form[0]->form_content ?? '') : '';
    $raw = is_string($raw) ? $raw : '';
    if ('' === $raw || !has_filter('bitform_translate_form_string')) {
      return $raw;
    }

    $rowId = isset($this->form[0]->id) ? (int) $this->form[0]->id : (int) $this->form_id;
    $lang = (string) apply_filters('bitform_current_language', '', $rowId);
    $memoKey = $rowId . '|' . $lang;
    if (isset(self::$translatedContentCache[$memoKey])) {
      return self::$translatedContentCache[$memoKey];
    }

    // Content-addressed, so a form save can never serve a stale entry. Edits on
    // the translation side do not change the hash — the TTL bounds those.
    $ttl = (int) apply_filters('bitform_translation_cache_ttl', HOUR_IN_SECONDS, $rowId, $lang);
    $cacheKey = $ttl > 0 ? "form-{$rowId}-{$lang}-" . md5($raw) : '';

    if ('' !== $cacheKey) {
      $cached = wp_cache_get($cacheKey, self::TRANSLATION_CACHE_GROUP);
      if (is_string($cached) && '' !== $cached) {
        self::$translatedContentCache[$memoKey] = $cached;
        return $cached;
      }
    }

    $translated = $raw;
    $decoded = Utilities::jsonObj($raw);
    if ($decoded instanceof stdClass) {
      FormContentTranslator::translate($decoded, $rowId);
      $encoded = wp_json_encode($decoded);
      $translated = is_string($encoded) ? $encoded : $raw;
    }

    if ('' !== $cacheKey) {
      wp_cache_set($cacheKey, $translated, self::TRANSLATION_CACHE_GROUP, $ttl);
    }
    self::$translatedContentCache[$memoKey] = $translated;

    return $translated;
  }

  public function getFont()
  {
    $atomicClassMap = $this->_atomic_class_map;
    $font = isset($atomicClassMap->font) ? $atomicClassMap->font : '';
    return $font;
  }

  public function getStyle()
  {
    $builerState = Utilities::jsonObj($this->isExist() ? ($this->form[0]->builder_helper_state ?? '') : '');
    $style = '';
    $themeVars = $builerState->themeVars ?? null;
    $themeColors = $builerState->themeColors ?? null;

    if (!empty($themeVars)) {
      $style .= ':root {';
      foreach ($themeVars->lgLightThemeVars as $key => $value) {
        $style .= "$key: $value; ";
      }
      $style .= '} ';
    }
    if (!empty($themeColors)) {
      $style .= ' :root {';
      foreach ($themeColors->lightThemeColors as $k => $v) {
        $style .= "$k:$v; ";
      }
      $style .= '} ';
    }

    $field = $builerState->style->lgLightStyles->fields;
    foreach ($field as $value) {
      $classes = $value->classes;
      foreach ($classes as $key => $value) {
        $style .= "{$key} {";
        foreach ($value as $k => $v) {
          $style .= "$k:$v; ";
        }
        $style .= '} ';
      }
    }
    return $style;
  }

  public function getCustomStyle()
  {
    $customCSSPath = BITFORMS_CONTENT_DIR . DIRECTORY_SEPARATOR . 'form-styles' . DIRECTORY_SEPARATOR . "bitform-custom-{$this->form_id}.css";
    return FileHandler::readFile($customCSSPath);
  }

  public function getCustomJS()
  {
    $customJsPath = BITFORMS_CONTENT_DIR . DIRECTORY_SEPARATOR . 'form-scripts' . DIRECTORY_SEPARATOR . "bitform-custom-{$this->form_id}.js";
    return FileHandler::readFile($customJsPath);
  }

  public function getFormContentWithValue($defaultValues = [])
  {
    $form_content = Utilities::jsonObj($this->getEffectiveFormContentJson());
    // this filter just use private purpose
    if (isset($form_content->fields)) {
      $form_content->fields = apply_filters('bitform_dynamic_field_filter', $form_content->fields);
    }
    if (!is_array($defaultValues) || 0 === count($defaultValues)) {
      return $form_content;
    }
    foreach (($form_content->fields ?? []) as $fieldKey => $fieldDetails) {
      // $field_name = empty($fieldDetails->lbl) ? null : \preg_replace('/[\`\~\!\@\#\$\'\.\s\?\+\-\*\&\|\/\\!]/', '_', $fieldDetails->lbl);
      $fieldName = $fieldDetails->fieldName;
      $defaultValue = isset($defaultValues[$fieldName]) ? $defaultValues[$fieldName] : null;
      $defaultValue = isset($defaultValues[$fieldKey]) ? $defaultValues[$fieldKey] : $defaultValue;
      if ((isset($fieldDetails->mul) || 'check' === $fieldDetails->typ) && isset($defaultValue)) {
        // if (is_array($defaultValue)) {
        //     $fieldDetails->val =
        //         wp_json_encode(
        //             array_map('sanitize_text_field', $defaultValue)
        //         );
        // } else {
        //     $fieldDetails->val = sanitize_text_field($defaultValue);
        // }
        if ((isset($fieldDetails->mul) && true === $fieldDetails->mul) || is_array($defaultValue)) {
          $fieldDetails->val = wp_json_encode(array_map('sanitize_text_field', $defaultValue));
        } elseif (!is_array($defaultValue)) {
          $fieldDetails->val = sanitize_text_field($defaultValue);
        }
      } elseif (!is_null($defaultValue)) {
        $fieldDetails->val = self::sanitizeDefaultValue($defaultValue);
      }
    }
    return $form_content;
  }

  /**
   * Normalize a prefill value into the scalar `val` a field can hold.
   *
   * Composite fields (address, name, …) arrive as associative arrays, which a
   * numeric last-index lookup cannot read.
   *
   * @param mixed $defaultValue
   *
   * @return string
   */
  private static function sanitizeDefaultValue($defaultValue)
  {
    if (is_string($defaultValue)) {
      return sanitize_text_field($defaultValue);
    }

    if (is_scalar($defaultValue)) {
      return sanitize_text_field((string) $defaultValue);
    }

    if (is_object($defaultValue)) {
      $defaultValue = (array) $defaultValue;
    }

    if (!is_array($defaultValue) || 0 === count($defaultValue)) {
      return '';
    }

    // A plain list is a repeated query param — keep the historic "last one wins".
    if (array_keys($defaultValue) === range(0, count($defaultValue) - 1)) {
      $last = end($defaultValue);
      return is_scalar($last) ? sanitize_text_field((string) $last) : (string) wp_json_encode($last);
    }

    // Keyed (composite) value: keep the whole shape, same as the `mul` branch above.
    return (string) wp_json_encode(map_deep($defaultValue, 'sanitize_text_field'));
  }

  public function getFormContent()
  {
    $formContent = Utilities::jsonObj($this->getEffectiveFormContentJson());
    $types = ['check', 'radio', 'select'];
    $filter = false;
    foreach (($formContent->fields ?? []) as $field) {
      if (in_array($field->typ, $types) && property_exists($field, 'customType')) {
        $filter = true;
        break; // reduce unnecessary loop
      }
    }
    if (true === $filter) {
      $updateFields = apply_filters('bitform_dynamic_field_filter', $formContent->fields);
      $formContent->fields = $updateFields;
    }
    return $formContent;
  }

  public function getFormInfo()
  {
    $formContent = json_decode($this->getEffectiveFormContentJson());
    $formInfo = isset($formContent->formInfo) ? $formContent->formInfo : null;
    return $formInfo;
  }

  public function getFormPermission()
  {
    $formContent = json_decode($this->form[0]->form_content);
    $formPermission = isset($formContent->formPermissions) ? $formContent->formPermissions : null;
    return $formPermission;
  }

  public function getFormHelperStates()
  {
    $formHelperStates = json_decode($this->form[0]->builder_helper_state);
    return $formHelperStates;
  }

  public function getAtomicClsMap()
  {
    return $this->_atomic_class_map;
  }

  private function is_json($str)
  {
    $json = json_decode($str);
    return $json && $str !== $json;
  }

  public function getFormData($columnName = '')
  {
    if (empty($columnName)) {
      return null;
    }

    $form = $this->form[0];
    if (!isset($form->{$columnName})) {
      return null;
    }

    $data = $form->{$columnName};
    if ($this->is_json($data)) {
      return json_decode($data);
    }

    return $data;
  }

  public function getFormName()
  {
    return $this->form[0]->form_name;
  }

  public function getFormLayout()
  {
    $formContent = $this->getFormContent();
    return isset($formContent->layout) ? $formContent->layout : new stdClass();
  }

  public function getFormNestedLayout()
  {
    $formContent = $this->getFormContent();
    return isset($formContent->nestedLayout) ? $formContent->nestedLayout : new stdClass();
  }

  private function mergeNestedLayout(&$layout, $nestedLayout)
  {
    foreach ($nestedLayout as $key => $brkpnts) {
      foreach ($brkpnts as $brkpnt=>$nLayout) {
        $layout->{$brkpnt} = array_merge(isset($layout->{$brkpnt}) ? (array) $layout->{$brkpnt} : [], (array) $nLayout);
      }
    }
  }

  public function flatMultistepFormLayout()
  {
    $formLayout = $this->getFormLayout();
    $multistepLayout = new stdClass();
    foreach ($formLayout as $stpLayout) {
      $lyout = $stpLayout->layout;

      foreach ($lyout as $brkpnt=>$fields) {
        $multistepLayout->{$brkpnt} = array_merge($multistepLayout->{$brkpnt} ?? [], $fields);
      }
    }

    return $multistepLayout;
  }

  public function getFlatenFormLayout()
  {
    $layout = $this->getFormLayout();
    $nestedLayout = $this->getFormNestedLayout();
    if ('array' === gettype($layout)) {
      // multi step form layout
      $layout = $this->flatMultistepFormLayout();
    }
    if (!empty((array) $nestedLayout)) {
      $this->mergeNestedLayout($layout, $nestedLayout);
    }

    return $layout;
  }

  /**
   * Union of field keys referenced by ANY breakpoint (lg/md/sm) of the root
   * layout (all steps) plus nested layouts of RENDERED containers.
   *
   * Nested layout entries are gated by their parent key being in the root
   * layout — the renderer (FormViewer) only renders nested children of
   * containers present in the root layout, so a stale nestedLayout entry
   * (parent removed) must not mark its children as rendered.
   *
   * Returns [] when the layout is missing or unparseable — callers MUST
   * fail closed (validate all fields) on an empty result.
   *
   * @return string[]
   */
  public function getLayoutFieldKeys()
  {
    try {
      $layout = $this->getFormLayout();
      $nestedLayout = $this->getFormNestedLayout();
      if ('array' === gettype($layout)) {
        // multi step form layout
        $layout = $this->flatMultistepFormLayout();
      }
    } catch (\Throwable $e) {
      return [];
    }
    $rootKeys = self::collectLayoutKeys($layout);
    if (empty($rootKeys)) {
      return [];
    }
    $keys = array_fill_keys($rootKeys, true);
    if (is_object($nestedLayout) || is_array($nestedLayout)) {
      foreach ($nestedLayout as $parentKey => $nLay) {
        if (!isset($keys[$parentKey])) {
          continue; // stale entry: container no longer rendered
        }
        foreach (self::collectLayoutKeys($nLay) as $nestedKey) {
          $keys[$nestedKey] = true;
        }
      }
    }
    return array_keys($keys);
  }

  /**
   * Collect field keys from every breakpoint of a layout object.
   *
   * @param object $layout layout with ->lg/->md/->sm arrays of {i} items
   *
   * @return string[]
   */
  private static function collectLayoutKeys($layout)
  {
    if (!is_object($layout)) {
      return [];
    }
    $keys = [];
    foreach (['lg', 'md', 'sm'] as $brkpnt) {
      if (!isset($layout->{$brkpnt}) || !is_array($layout->{$brkpnt})) {
        continue;
      }
      foreach ($layout->{$brkpnt} as $item) {
        if (is_object($item) && isset($item->i)) {
          $keys[$item->i] = true;
        }
      }
    }
    return array_keys($keys);
  }

  /**
   * Extract a child field key from a childFields[] entry (stdClass or array shape).
   *
   * @return string|null
   */
  private static function childFldKey($child)
  {
    if (is_object($child) && isset($child->fldKey)) {
      return $child->fldKey;
    }
    if (is_array($child) && isset($child['fldKey'])) {
      return $child['fldKey'];
    }
    return null;
  }

  /**
   * Add childFields of every rendered parent into $renderedKeys (by ref).
   *
   * Several field types keep their children flat in `fields` and NEVER in
   * any layout — Name (first/middle/last), Address (street/city/zip/...),
   * Email and Password (confirm fields). A child is rendered iff its
   * parent is, so each rendered parent's childFields[].fldKey must join
   * the rendered set or their validation would be wrongly skipped.
   *
   * Runs to a fixpoint so expansion is safe regardless of field order or
   * nesting depth.
   *
   * @param array $renderedKeys key => true map, mutated in place
   * @param iterable $fields    fields keyed by field key; each field may be
   *                            a processed array (getFields()) or raw stdClass
   */
  protected static function expandChildFieldKeys(array &$renderedKeys, $fields)
  {
    do {
      $grew = false;
      foreach ($fields as $key => $field) {
        if (!isset($renderedKeys[$key])) {
          continue;
        }
        $childFields = null;
        if (is_object($field) && isset($field->childFields)) {
          $childFields = $field->childFields;
        } elseif (is_array($field) && isset($field['childFields'])) {
          $childFields = $field['childFields'];
        }
        if (empty($childFields) || !is_iterable($childFields)) {
          continue;
        }
        foreach ($childFields as $child) {
          $childKey = self::childFldKey($child);
          if ($childKey && !isset($renderedKeys[$childKey])) {
            $renderedKeys[$childKey] = true;
            $grew = true;
          }
        }
      }
    } while ($grew);
  }

  /**
   * getFields() narrowed to provably-rendered fields: key present in any
   * breakpoint of any step/nested layout, OR a childField of a rendered
   * parent (name/address/email/password children live outside layouts),
   * OR the synthetic GCLID key.
   *
   * SECURITY: fail-closed — if the layout yields no keys, ALL fields are
   * returned (current behavior). Derives exclusively from DB-stored
   * form_content, never from POST, so submitters cannot influence which
   * fields are validated.
   */
  public function getRenderedFields()
  {
    $fields = $this->getFields();
    try {
      $renderedKeys = self::renderedKeyMap($this->getFormLayout(), $this->getFormNestedLayout(), $fields);
    } catch (\Throwable $e) {
      return $fields; // fail-closed: unusable layout validates all fields
    }
    if (null === $renderedKeys) {
      return $fields;
    }
    $rendered = [];
    foreach ($fields as $key => $field) {
      // renderedKeys already includes NON_LAYOUT_FIELD_KEYS (GCLID, ...)
      if (isset($renderedKeys[$key])) {
        $rendered[$key] = $field;
      }
    }
    return $rendered;
  }

  /**
   * Field keys that are legitimately part of a form yet never appear in any
   * layout — synthetic/system fields the renderer always keeps. They must
   * never be flagged as orphan (save guard) or dropped from validation
   * (renderer). Extend this list as new non-layout system fields are added.
   *
   * @var string[]
   */
  protected const NON_LAYOUT_FIELD_KEYS = ['GCLID'];

  /**
   * True when $fields (object or array) holds $key.
   *
   * @param object|array $fields
   * @param string       $key
   */
  private static function fieldExists($fields, $key)
  {
    return is_object($fields) ? isset($fields->{$key}) : (is_array($fields) && isset($fields[$key]));
  }

  /**
   * Flatten a raw layout into one object unioning lg/md/sm across all steps.
   * Accepts a single layout object or an array of multi-step entries (each
   * wrapping its layout in ->layout). Shared by the frontend renderer
   * (getRenderedFields) and the admin save/import orphan guard
   * (computeOrphanFieldKeys) so both flatten identically.
   *
   * @param array|object $layout
   *
   * @return object {lg,md,sm} arrays of {i} items
   */
  private static function flattenLayout($layout)
  {
    $flat = new stdClass();
    $flat->lg = [];
    $flat->md = [];
    $flat->sm = [];
    $addLayout = function ($lay) use ($flat) {
      if (!is_object($lay)) {
        return;
      }
      foreach (['lg', 'md', 'sm'] as $brkpnt) {
        if (isset($lay->{$brkpnt}) && is_array($lay->{$brkpnt})) {
          $flat->{$brkpnt} = array_merge($flat->{$brkpnt}, $lay->{$brkpnt});
        }
      }
    };
    if (is_array($layout)) {
      // multi-step: each entry wraps its layout in ->layout
      foreach ($layout as $step) {
        $addLayout(isset($step->layout) ? $step->layout : $step);
      }
    } else {
      $addLayout($layout);
    }
    return $flat;
  }

  /**
   * SINGLE SOURCE OF TRUTH for "which field keys the renderer would show":
   * unions all breakpoints across steps, adds nested-layout children of
   * RENDERED containers only, then expands childFields of rendered parents
   * (name/address/email/password children live outside layouts).
   *
   * Both getRenderedFields (frontend validation) and computeOrphanFieldKeys
   * (admin save guard) route through this so the two can never diverge — a
   * divergence would prune a real field or wrongly validate an orphan.
   *
   * @param array|object $layout       single layout or array of steps
   * @param object|null  $nestedLayout keyed by parent field key
   * @param object|array $fields       form_content->fields
   *
   * @return array<string,true>|null key=>true map, or null when the layout is
   *                                 unusable (callers MUST fail closed)
   */
  protected static function renderedKeyMap($layout, $nestedLayout, $fields)
  {
    // Fail closed on a partial/unloaded multi-step layout: a step with no
    // layout items at all almost always means the layout never finished
    // loading/syncing (not a real "every field on this step was deleted").
    // Treating it as usable would flag that step's real fields as orphan.
    if (is_array($layout)) {
      if (empty($layout)) {
        return null;
      }
      foreach ($layout as $step) {
        $stepLayout = is_object($step) && isset($step->layout) ? $step->layout : $step;
        if (empty(self::collectLayoutKeys(self::flattenLayout($stepLayout)))) {
          return null;
        }
      }
    }
    $flat = self::flattenLayout($layout);
    $rootKeys = self::collectLayoutKeys($flat);
    if (empty($rootKeys)) {
      return null;
    }
    $renderedKeys = array_fill_keys($rootKeys, true);
    // nested children count as rendered only when their container is —
    // matches the renderer, which skips stale nestedLayout entries
    if (is_object($nestedLayout) || is_array($nestedLayout)) {
      foreach ($nestedLayout as $parentKey => $nLay) {
        if (!isset($renderedKeys[$parentKey])) {
          continue;
        }
        foreach (self::collectLayoutKeys($nLay) as $nestedKey) {
          $renderedKeys[$nestedKey] = true;
        }
      }
    }
    self::expandChildFieldKeys($renderedKeys, $fields);
    // synthetic/system fields (e.g. GCLID) live outside every layout; the
    // renderer always keeps them, so they must never count as orphan
    foreach (self::NON_LAYOUT_FIELD_KEYS as $sysKey) {
      if (self::fieldExists($fields, $sysKey)) {
        $renderedKeys[$sysKey] = true;
      }
    }
    return $renderedKeys;
  }

  /**
   * Pure variant of the orphan rule for the admin save/import guard: returns
   * the keys of $fields absent from every layout (children of rendered
   * parents excluded). Uses renderedKeyMap — the exact flattening the
   * renderer uses — so the save guard and the renderer never diverge.
   *
   * @param array|object $layout       single layout or array of steps ({layout} each)
   * @param object|null  $nestedLayout keyed by parent field key
   * @param mixed        $fields       raw form_content->fields (decoded JSON: shape is not guaranteed, hence the runtime guard)
   *
   * @return string[]|null orphan keys to drop, or null when the layout is
   *                       unusable (fail closed: drop nothing)
   */
  public static function computeOrphanFieldKeys($layout, $nestedLayout, $fields)
  {
    if (!is_object($fields) && !is_array($fields)) {
      return null;
    }
    $renderedKeys = self::renderedKeyMap($layout, $nestedLayout, $fields);
    if (null === $renderedKeys) {
      return null; // unusable layout: fail closed, drop nothing
    }
    $orphans = [];
    foreach ($fields as $key => $field) {
      if (!isset($renderedKeys[$key])) {
        $orphans[] = $key;
      }
    }
    return $orphans;
  }

  public function getFieldsBasedOnLayout()
  {
    $layout = $this->getFlatenFormLayout();

    $fieldKeyOrderbasedOnLayout = array_map(function ($fld) {
      return $fld->i;
    }, $layout->lg);
    $orderedFields = [];
    $fields = $this->getFields();

    foreach ($fieldKeyOrderbasedOnLayout as $key) {
      if (array_key_exists($key, $fields)) {
        $orderedFields[$key] = $fields[$key];
      }
    }

    foreach ($fields as $k=>$v) {
      if (!array_key_exists($k, $fieldKeyOrderbasedOnLayout)) {
        $orderedFields[$k] = $fields[$k];
      }
    }

    return $orderedFields;
  }

  public function getFields()
  {
    if (!is_null($this->_fields)) {
      return $this->_fields;
    }
    $form_content = \json_decode($this->form[0]->form_content);
    $layout = $form_content->layout;
    $fields = $form_content->fields;
    $field_details = [];
    foreach ($fields as $key => $field) {
      if ('recaptcha' === $field->typ || 'hcaptcha' === $field->typ) {
        continue;
      }
      // $field_name = empty($field->lbl) ? null : \preg_replace('/[\`\~\!\@\#\$\'\.\s\?\+\-\*\&\|\/\\\!]/', '_', $field->lbl);
      $field_type = $field->typ;
      $field_details[$key]['label'] = !empty($field->lbl) ? $field->lbl : (!empty($field->adminLbl) ? $field->adminLbl : (!empty($field->fieldName) ? $field->fieldName : null));
      $field_details[$key]['type'] = $field_type;
      $field_details[$key]['key'] = $key;
      $field_details[$key]['name'] = isset($field->fieldName) ? $field->fieldName : '';
      if (isset($field->customType)) {
        $field_details[$key]['customType'] = $field->customType;
      }
      // fields with confirm field
      if (isset($field->childFields)) {
        $field_details[$key]['childFields'] = $field->childFields;
      }
      if (isset($field->parentFieldKey)) {
        $field_details[$key]['parentFieldKey'] = $field->parentFieldKey;
        if (isset($field->isDeactive)) {
          $field_details[$key]['isDeactive'] = $field->isDeactive;
        }
      }
      if (isset($field->err)) {
        if (isset($field->err->entryUnique)) {
          $field_details[$key]['entryUnique'] = $field->err->entryUnique;
        }
        if (isset($field->err->userUnique)) {
          $field_details[$key]['userUnique'] = $field->err->userUnique;
        }
      }

      if (isset($field->mul)) {
        $field_details[$key]['mul'] = $field->mul;
      }
      if (in_array($field_type, ['name'])) {
        $field_details[$key]['label'] = $field->adminLbl ?? $field->lbl;
      }
      if ('file-up' === $field_type && isset($field->exts)) {
        $field_details[$key]['valid']['type'] = $field->exts;
      }
      if ('file-up' === $field_type && isset($field->mxUp)) {
        $field_details[$key]['valid']['upload_size'] = (int) $field->mxUp;
      }
      if (isset($field->valid) && !is_null($field->valid)) {
        if (isset($field->valid->req)) {
          $field_details[$key]['valid']['req'] = $field->valid->req;
        }
        if (isset($field->valid->reqMsg)) {
          $field_details[$key]['valid']['reqMsg'] = $field->valid->reqMsg;
        }
        if (isset($field->valid->typMsg)) {
          $field_details[$key]['valid']['typMsg'] = $field->valid->typMsg;
        }
        if (isset($field->valid->hide)) {
          $field_details[$key]['valid']['hide'] = $field->valid->hide;
        }
      }
      if ($this->isRepeatedField($key)) {
        $field_details[$key]['repeated'] = true;
      }
    }
    if ($this->isGCLIDEnabled()) {
      $field_details['GCLID']['name'] = 'GCLID';
      $field_details['GCLID']['adminLbl'] = 'GCLID';
      $field_details['GCLID']['key'] = 'GCLID';
      $field_details['GCLID']['type'] = 'hidden';
    }
    $this->_fields = $field_details;
    return $field_details;
  }

  public function getFieldsKey()
  {
    $form_content = \json_decode($this->form[0]->form_content);
    $fields = $form_content->fields;
    $field_details = [];
    foreach ($fields as $key => $field) {
      if ('recaptcha' === $field->typ || 'hcaptcha' === $field->typ) {
        continue;
      }
      // $field_name = empty($field->lbl) ? null : \preg_replace('/[\`\~\!\@\#\$\'\.\s\?\+\-\*\&\|\/\\\!]/', '_', $field->lbl);
      $field_details[$key] = $key;
    }
    if ($this->isGCLIDEnabled()) {
      $field_details['GCLID'] = 'GCLID';
    }
    return $field_details;
  }

  public function getFieldLabel($forQuery = false)
  {
    if (!is_null($this->_field_label)) {
      return $this->_field_label;
    }
    $form_content = \json_decode($this->form[0]->form_content);
    $fields = $form_content->fields;
    $field_details = [];
    $fieldCounter = 0;
    foreach ($fields as $key => $field) {
      if ('recaptcha' === $field->typ || 'turnstile' === $field->typ || 'html' === $field->typ || 'button' === $field->typ) {
        continue;
      }
      $field_details[$fieldCounter]['name'] = empty($field->lbl) ? null : $field->lbl;
      $field_details[$fieldCounter]['adminLbl'] = empty($field->adminLbl) ? $field_details[$fieldCounter]['name'] : $field->adminLbl;
      $field_details[$fieldCounter]['key'] = $key;
      $field_details[$fieldCounter]['type'] = $field->typ;
      $fieldCounter += 1;
    }
    if ($this->isGCLIDEnabled()) {
      $field_details[$fieldCounter]['name'] = 'GCLID';
      $field_details[$fieldCounter]['adminLbl'] = 'GCLID';
      $field_details[$fieldCounter]['key'] = 'GCLID';
      $field_details[$fieldCounter]['type'] = 'hidden';
      $fieldCounter += 1;
    }
    if (!$forQuery) {
      $field_details = (array) $this->addEntryInfo($field_details, $fieldCounter);
    }
    $this->_field_label = $field_details;
    return $field_details;
  }

  public function getUploadFields()
  {
    if (!is_null($this->_has_upload)) {
      return $this->_has_upload;
    }
    $upload_fields = [];
    $form_field_details = $this->getFields();
    foreach ($form_field_details as $field_name => $__field_detail) {
      if (isset($__field_detail['type']) && ('file-up' === $__field_detail['type'] || 'advanced-file-up' === $__field_detail['type'])) {
        $upload_fields[] = $field_name;
      }
    }
    $this->_has_upload = $upload_fields;
    return $upload_fields;
  }

  public function getSignatureFilePath($blobLink, $form_id, $fieldKey, $entry_id, $imgType)
  {
    $imgTypes = [
      'image/png'     => 'png',
      'image/jpeg'    => 'jpg',
      'image/svg+xml' => 'svg',
    ];
    try {
      if (!isset($imgTypes[$imgType])) {
        throw new \InvalidArgumentException("Unsupported image type: $imgType");
      }
      $parts = explode(',', $blobLink, 2);
      if (2 !== count($parts) || false === ($decoded_image = base64_decode($parts[1]))) {
        throw new \RuntimeException('Invalid or corrupt signature data URI');
      }

      // An attacker-controlled SVG signature is written to a web-served path, so a raw write is a
      // stored-XSS sink. Sanitize with the same enshrined library the upload path uses (FileHandler).
      if ('svg' === $imgTypes[$imgType]) {
        $clean = (new Sanitizer())->sanitize($decoded_image);
        if (false === $clean) {
          throw new \RuntimeException('Invalid or unsafe SVG signature data');
        }
        $decoded_image = $clean;
      }

      $_upload_dir = FileHandler::getEntriesFileUploadDir($form_id, $entry_id);
      FileHandler::createIndexFile($_upload_dir);
      $uniqueId = time() . '-' . bin2hex(\random_bytes(4));
      $filename = "{$entry_id}-{$fieldKey}-{$uniqueId}.{$imgTypes[$imgType]}";
      $fullPath = $_upload_dir . DIRECTORY_SEPARATOR . $filename;
      if (false === file_put_contents($fullPath, $decoded_image)) {
        throw new \RuntimeException("Failed to write image to $fullPath");
      }
      return $filename;
    } catch (\Throwable $e) {
      Log::debug_log("[Signature Error] Form: $form_id, Entry: $entry_id, Field: $fieldKey - " . $e->getMessage());
      return 'signature-failed.png'; // or a default filename if appropriate
    }
  }

  private function entryInsert($user_details)
  {
    $formEntryModel = new FormEntryModel();
    $entryId = $formEntryModel->insert(
      [
        'form_id'     => $this->form_id,
        'user_id'     => $user_details['id'],
        'user_ip'     => $user_details['ip'],
        'user_device' => $user_details['device'],
        'referer'     => $user_details['page'],
        'status'      => $this->_saveFormAsDraft ? 9 : 1,
        'created_at'  => $user_details['time'],
      ]
    );
    return $entryId;
  }

  public function submisionLog($user_details, $entry_id, $type)
  {
    $formEntryLogModel = new FormEntryLogModel();
    $submissionLogData = [
      'user_id'       => $user_details['id'],
      'action_type'   => $type, // create, update
      'log_type'      => 'entry',
      'ip'            => $user_details['ip'],
      'form_entry_id' => $entry_id,
      // encoded: wpdb cannot bind an array, so an array here silently stored an
      // empty string and every submission lost its device info
      'content'       => wp_json_encode(['user_device' => $user_details['device']]),
      'form_id'       => $this->form_id,
      'created_at'    => $user_details['time'],
    ];
    $submissionLogData = apply_filters('bitform_filter_submission_log_data', $submissionLogData, $this->form_id, $type);
    $logId = $formEntryLogModel->form_log_insert(
      $submissionLogData
    );
    return $logId;
  }

  private function isArrayAllKeyInt($InputArray)
  {
    if (!is_array($InputArray)) {
      return false;
    }

    if (count($InputArray) <= 0) {
      return true;
    }

    return array_unique(array_map('is_int', array_keys($InputArray))) === [true];
  }

  public function formatSubmittedData($submitted_data)
  {
    $form_content = $this->getFormContent();
    $form_fields = $form_content->fields;

    foreach ($submitted_data as $key => $value) {
      if (!isset($form_fields->{$key})) {
        continue;
      }
      $field_data = $form_fields->{$key};
      $field_type = $field_data->typ;
      $normalizedParentValue = $this->normalizeSubmittedValue($value);
      $parentFieldName = isset($field_data->fieldName) ? $field_data->fieldName : '';
      // Confirm child of a repeated email/password never persists — the non-repeated
      // path drops it too (the validator collapses the parent to its primary value).
      $isRepeatedConfirmComposite = in_array($field_type, ['email', 'password'], true) && $this->isRepeatedField($key);
      if (!$isRepeatedConfirmComposite && !empty($field_data->childFields) && is_array($field_data->childFields)) {
        foreach ($field_data->childFields as $childFieldRef) {
          $childFieldKey = isset($childFieldRef->fldKey) ? $childFieldRef->fldKey : '';
          if (empty($childFieldKey) || !isset($form_fields->{$childFieldKey})) {
            continue;
          }

          $childFieldData = $form_fields->{$childFieldKey};
          $childFieldName = isset($childFieldData->fieldName) ? $childFieldData->fieldName : '';
          $childFieldName = FieldValueHandler::deriveChildName($childFieldName, $parentFieldName);
          if (empty($childFieldName)) {
            continue;
          }

          $childValue = FieldValueHandler::extractChildValueFromParentValue($normalizedParentValue, $childFieldName, $childFieldKey);
          if (null !== $childValue) {
            $submitted_data[$childFieldKey] = $childValue;
          }
        }
      }

      if ($this->isRepeatedField($key) && in_array($field_type, ['name', 'address', 'email', 'password'])) {
        $normalizedRows = $this->normalizeRepeatedCompositeFieldInput($normalizedParentValue);
        if ($isRepeatedConfirmComposite && is_array($normalizedRows)) {
          // Keep only the primary value per row, matching the non-repeated behavior
          // where a confirm-enabled field collapses to its primary value.
          foreach ($normalizedRows as $rowIndex => $rowValue) {
            if (is_array($rowValue) && array_key_exists('primary', $rowValue)) {
              $normalizedRows[$rowIndex] = $rowValue['primary'];
            }
          }
        }
        $submitted_data[$key] = $normalizedRows;
      }

      if ('select' === $field_type && !empty($field_data->config->multipleSelect)) {
        $valueArr = [];
        if ($this->isRepeatedField($key) && is_array($normalizedParentValue)) {
          foreach ($normalizedParentValue as $index => $v) {
            $valueArr[$index] = explode(BITFORMS_BF_SEPARATOR, $v);
          }
        } else {
          $valueArr = explode(BITFORMS_BF_SEPARATOR, (string) $value);
        }
        $submitted_data[$key] = $valueArr;
      }
    }
    $submitted_data = apply_filters('bitform_filter_format_submitted_data', $submitted_data, $this->form_id);
    return $submitted_data;
  }

  private function normalizeSubmittedValue($value)
  {
    if (!is_string($value)) {
      return $value;
    }

    $decoded = json_decode($value, true);
    return (JSON_ERROR_NONE === json_last_error()) ? $decoded : $value;
  }

  private function addNewFilePathToFiles($form_id, $entry_id, $file_fields = [])
  {
    $common_file_path = Helpers::getFullPathWithEncryptedEntryId($form_id, $entry_id);
    foreach ($_FILES as $field_key => $file_details) {
      if (!($file_fields && in_array($field_key, $file_fields))) {
        continue;
      }

      $isRepeaterFldKey = $this->isRepeatedField($field_key);
      if ($isRepeaterFldKey && isset($file_details['new_name'])) {
        // If 'new_name' is an array (i.e., for repeated fields)
        foreach ($file_details['new_name'] as $slNo => $newFileNamesArray) {
          if (is_array($newFileNamesArray)) {
            foreach ($newFileNamesArray as $newFileName) {
              $filePath = $common_file_path . DIRECTORY_SEPARATOR . $newFileName;
              $_FILES[$field_key]['file_path'][$slNo][] = $filePath;
            }
          } else {
            // Generate the file path for each file
            $filePath = $common_file_path . DIRECTORY_SEPARATOR . $newFileNamesArray;
            $_FILES[$field_key]['file_path'][$slNo] = $filePath;
          }
        }
      } elseif (isset($file_details['new_name'])) {
        // If 'new_name' is an array (i.e., for repeated fields)
        if (is_array($file_details['new_name'])) {
          foreach ($file_details['new_name'] as $slNo => $newFileName) {
            // Generate the file path for each file
            $filePath = $common_file_path . DIRECTORY_SEPARATOR . $newFileName;
            $_FILES[$field_key]['file_path'][$slNo] = $filePath;
          }
        } else {
          $filePath = $common_file_path . DIRECTORY_SEPARATOR . $file_details['new_name'];
          $_FILES[$field_key]['file_path'] = $filePath;
        }
      }
    }
  }

  private function formatRepeateFieldData($submitted_data, $form_fields)
  {
    $repeaterFields = $this->getRepeaterFields();
    foreach ($repeaterFields as $repeaterFldKey => $repeatedFields) {
      $repeatIndexes = $submitted_data["{$form_fields[$repeaterFldKey]['name']}-repeat-index"];
      $repeatIndexes = explode(',', $repeatIndexes);
      foreach ($repeatedFields as $repeatedField) {
        $oldFileKey = "{$repeatedField}_old";
        if (isset($submitted_data[$oldFileKey]) && is_array($submitted_data[$oldFileKey])) {
          $oldFileValues = $submitted_data[$oldFileKey];
          $oldFileKeys = array_map('strval', array_keys($oldFileValues));
          $repeatIndexKeys = array_map('strval', $repeatIndexes);
          $oldFilesUseRepeatIndexes = empty(array_diff($oldFileKeys, $repeatIndexKeys));
          $normalizedOldFileValues = [];

          foreach ($repeatIndexes as $slNo => $repeatIndex) {
            $oldFileSourceIndex = $oldFilesUseRepeatIndexes ? $repeatIndex : $slNo;
            if (array_key_exists($oldFileSourceIndex, $oldFileValues)) {
              $normalizedOldFileValues[$slNo] = $oldFileValues[$oldFileSourceIndex];
            }
          }

          $submitted_data[$oldFileKey] = $normalizedOldFileValues;
        }
      }

      foreach ($repeatIndexes as $slNo => $repeatIndex) {
        foreach ($repeatedFields as $repeatedField) {
          if (!isset($submitted_data[$repeatedField][$repeatIndex])) {
            continue;
          }
          if (!isset($submitted_data[$repeaterFldKey][$slNo])) {
            $submitted_data[$repeaterFldKey][$slNo] = [];
          }
          if (!isset($submitted_data[$repeaterFldKey][$slNo][$repeatedField])) {
            $submitted_data[$repeaterFldKey][$slNo][$repeatedField] = [];
          }
          $submitted_data[$repeaterFldKey][$slNo][$repeatedField] = $submitted_data[$repeatedField][$repeatIndex];
        }
      }
      foreach ($repeatedFields as $repeatedField) {
        unset($submitted_data[$repeatedField]);
      }
      unset($submitted_data["{$form_fields[$repeaterFldKey]['name']}-repeat-index"]);
    }

    return $submitted_data;
  }

  private function saveEntryMeta($submitted_data, $entry_id)
  {
    $errorInEntryMetaInsert = false;
    $entryMeta = new FormEntryMetaModel();
    foreach ($submitted_data as $key => $value) {
      $value = $submitted_data[$key];
      if (is_string($value)) {
        $value = wp_unslash($value);
      } elseif ($this->isArrayAllKeyInt($value)) {
        $value = wp_json_encode(array_values($value));
      } else {
        $value = wp_json_encode($value);
      }
      // Form entry meta insert; meta_key/meta_value required to store dynamic field data per entry.
      $status = $entryMeta->insert(
        [
          'bitforms_form_entry_id' => $entry_id,
          'meta_key'               => $key,
          'meta_value'             => $value,
        ]
      );
      if (is_wp_error($status)) {
        $errorInEntryMetaInsert = true;
        break;
      }
    }
    return $errorInEntryMetaInsert;
  }

  public function setSaveFormAsDraft()
  {
    $this->_saveFormAsDraft = true;
  }

  public function saveFormEntry($submitted_data)
  {
    // CSRF verified upstream via FrontendFormManager::verifySubmissionNonce() before this method is invoked.
    $submitted_data = $this->formatSubmittedData($submitted_data);
    $submitted_data = apply_filters('bitform_filter_save_form_entry', $submitted_data, $this->form_id);
    $form_content = \json_decode($this->form[0]->form_content);
    do_action('bitform_save_entry', $this, $submitted_data, $this->form_id);
    $key = null;
    $ipTool = new IpTool();
    $fileHandler = new FileHandler();
    $form_fields = $this->getFields();
    $file_fields = $this->getUploadFields();

    foreach ($_FILES as $file_name => $file_details) {
      if ($file_fields && in_array($file_name, $file_fields)) {
        $validation = $fileHandler->validation($file_name, $file_details, $this->form_id);
        if (!empty($validation['error_type']) && !empty($validation['message'])) {
          return new WP_Error($validation['error_type'], esc_html($validation['message']));
        }
      }
    }
    $user_details = $ipTool->getUserDetail();
    $user_details = apply_filters('bitform_filter_user_details', $user_details, $this->form_id);
    $user_details = apply_filters('bitform_filter_save_entry_user_details', $user_details, $this->form_id);

    $form_fields = $this->getFields();
    $submitted_data = $this->passwordEncrypted($submitted_data, $form_fields);
    $submitted_data = $this->formatRepeateFieldData($submitted_data, $form_fields);
    global $wpdb;
    // Direct transaction control; no user input involved.
    $wpdb->query('START TRANSACTION');
    $entry_id = $this->entryInsert($user_details);
    $log_id = null;

    $GLOBALS['bitform_entry_id'] = $entry_id;

    if (is_wp_error($entry_id)) {
      return new WP_Error('insert_error', __('Sorry, Error occurred in saving form entry', 'bit-form'));
    }
    if ($entry_id) {
      $log_id = $this->submisionLog($user_details, $entry_id, 'create', $key);
      if (is_wp_error($log_id)) {
        $wpdb->query('ROLLBACK');
        return new WP_Error('error_entry_log', __('Sorry, error occurred in logging form entry', 'bit-form'));
      }
    }
    if ($entry_id) {
      $submitted_fields = $this->getFormContentWithValue($submitted_data)->fields;
      $workFlowRunHelper = new WorkFlow($this->form_id);

      $workFlowreturnedOnSubmit = $workFlowRunHelper->executeOnSubmit(
        'create',
        $submitted_fields,
        $submitted_data,
        $entry_id,
        $log_id
      );

      if (!empty($workFlowreturnedOnSubmit['fields'])) {
        $submitted_data = $workFlowreturnedOnSubmit['fields'];
      }

      $file_fields = $this->getUploadFields();
      $formFields = $this->getFields();
      $submitted_data = FileHandler::tempDirToUploadDir($submitted_data, $formFields, $this->form_id, $entry_id);
      $fileHandler = new FileHandler();
      foreach ($_FILES as $field_key => $file_details) {
        if ($file_fields && in_array($field_key, $file_fields)) {
          $fileNames = [];
          $repeaterFldKey = $this->isRepeatedField($field_key);
          if ($repeaterFldKey) {
            foreach ($file_details['name'] as $slNo => $fileName) {
              $repeateFileDetails = [
                'name'     => $file_details['name'][$slNo],
                'type'     => $file_details['type'][$slNo],
                'tmp_name' => $file_details['tmp_name'][$slNo],
                'error'    => $file_details['error'][$slNo],
                'size'     => $file_details['size'][$slNo],
              ];
              $fileNames = $fileHandler->moveUploadedFiles($repeateFileDetails, $this->form_id, $entry_id);
              if (!empty($fileNames)) {
                $submitted_data[$repeaterFldKey][$slNo - 1][$field_key] = $fileNames;
                $_FILES[$field_key]['new_name'][$slNo - 1] = $fileNames;
              }
            }
          } else {
            $fileNames = $fileHandler->moveUploadedFiles($file_details, $this->form_id, $entry_id);
            if (!empty($fileNames)) {
              $submitted_data[$field_key] = $fileNames;
              $_FILES[$field_key]['new_name'] = $fileNames;
            }
          }
        }
      }

      // Get the common path for file storage
      $this->addNewFilePathToFiles($this->form_id, $entry_id, $file_fields);

      foreach ($form_content->fields as $key => $field) {
        /* ======== for Signature field ===========*/
        if ('signature' === $field->typ) {
          if (isset($submitted_data[$key])) {
            $fld_data = $submitted_data[$key];
            $img_type = $field->config->imgTyp;
            $submitted_data[$key] = $this->getSignatureFilePath($fld_data, $this->form_id, $key, $entry_id, $img_type);
          }
        }

        //  for Signature field inside reepater
        if ('repeater' === $field->typ) {
          $rptr_data = $submitted_data[$key];
          $formFields = $form_content->fields;
          $this->setSignatureFilePathInRepeater($rptr_data, $key, $formFields, $entry_id, $submitted_data);
        }
      }

      if (!isset($form_content->additional->enabled->submission)) {
        $errorInEntryMetaInsert = $this->saveEntryMeta($submitted_data, $entry_id);
        if ($errorInEntryMetaInsert) {
          do_action('bitform_save_entry_error', $this, $submitted_data, $this->form_id);
          $wpdb->query('ROLLBACK');
          return new WP_Error('insert_error', __('Sorry, Error occured in saving form entry data', 'bit-form'));
        }
        do_action('bitform_after_save_entry_success', $this, $submitted_data, $this->form_id, $entry_id);
      } else {
        $wpdb->query('ROLLBACK');
      }
      $wpdb->query('COMMIT');
      $this->setSubmissionCount();
      $workFlowreturnedOnSubmit['entry_id'] = $entry_id;
      $workFlowreturnedOnSubmit['fields'] = $submitted_data;
      $workFlowreturnedOnSubmit = apply_filters('bitform_filter_return_submit_success', $workFlowreturnedOnSubmit, $this->form_id);

      return $workFlowreturnedOnSubmit;
    }
  }

  /**
   * The signature file name an entry currently points at, '' when it has none.
   */
  private function getStoredSignatureFile($entryMeta, $entryID, $fieldKey)
  {
    $stored = $entryMeta->get(
      'meta_value',
      [
        'bitforms_form_entry_id' => $entryID,
        'meta_key'               => $fieldKey,
      ]
    );
    if (is_wp_error($stored) || 0 === count($stored)) {
      return '';
    }
    $fileName = trim((string) $stored[0]->meta_value);

    // signature-failed.png is a shared placeholder, not this entry's own file.
    return 'signature-failed.png' === $fileName ? '' : $fileName;
  }

  private function setSignatureFilePathInRepeater($repeaterData, $repeaterFieldKey, $formFields, $entry_id, &$submitted_data)
  {
    foreach ($repeaterData as $rptr_entry_index => $rptr_entries) {
      foreach ($rptr_entries as $entry_key => $entry_value) {
        if (!isset($formFields->{$entry_key})) {
          continue;
        }
        $rptr_entry_info = $formFields->{$entry_key};

        if ('signature' === $rptr_entry_info->typ) {
          $imgType = $rptr_entry_info->config->imgTyp;
          $signatureImage = $this->getSignatureFilePath($entry_value, $this->form_id, $repeaterFieldKey, $entry_id, $imgType);
          $submitted_data[$repeaterFieldKey][$rptr_entry_index][$entry_key] = $signatureImage;
        }
      }
    }
  }

  public function passwordEncrypted($updatedValue, $form_fields)
  {
    $integrationHandler = new IntegrationHandler($this->form_id);
    $formIntegrations = $integrationHandler->getAllIntegration('wp_user_auth', 'wp_auth', 1);
    if (!isset($formIntegrations->errors['result_empty'])) {
      foreach ($form_fields as $field) {
        if (array_key_exists($field['key'], $updatedValue) && 'password' === $field['type']) {
          $updatedValue[$field['key']] = '**** (encrypted)';
        }
      }
    }
    return $updatedValue;
  }

  private function normalizeOldFileValues($stored_files, $old_values)
  {
    $stored_files = is_array($stored_files) ? $stored_files : [];
    if (!is_array($old_values)) {
      $old_values_string = trim((string) $old_values);
      $decoded_old_values = json_decode($old_values_string, true);
      $old_values = is_array($decoded_old_values) ? $decoded_old_values : explode(',', $old_values_string);
    }

    $normalized_values = [];
    foreach ($old_values as $value) {
      if (!is_string($value) && !is_numeric($value)) {
        continue;
      }

      $trimmed_value = trim((string) $value);
      if ('' === $trimmed_value) {
        continue;
      }

      if (in_array($trimmed_value, $stored_files, true)) {
        $normalized_values[] = $trimmed_value;
      }
    }

    return array_values(array_unique($normalized_values));
  }

  public function updateFormEntry($updatedValue, $formID, $entryID)
  {
    // CSRF / entry-token verified upstream via FrontendFormManager::handleUpdateEntry() before this method is invoked.
    $updatedValue = $this->formatSubmittedData($updatedValue);
    $updatedValue = apply_filters('bitform_filter_update_form_entry', $updatedValue, $this->form_id);
    do_action('bitform_update_entry', $this, $updatedValue, $formID, $entryID);
    $form_content = $this->getFormContent();
    if (isset($form_content->additional->enabled->submission)) {
      // Run workflow but skip DB/meta update
      $workFlowRunHelper = new WorkFlow($formID);
      $fieldsWithValue = $this->getFormContentWithValue($updatedValue)->fields;
      $workFlowreturnedOnSubmit = $workFlowRunHelper->executeOnSubmit(
        'edit',
        $fieldsWithValue,
        $updatedValue,
        $entryID,
        0
      );
      if (empty($workFlowreturnedOnSubmit['message'])) {
        $workFlowreturnedOnSubmit['message'] = __('Entry update skipped due to submission restriction.', 'bit-form');
      }
      $workFlowreturnedOnSubmit['entry_id'] = $entryID;
      $workFlowreturnedOnSubmit = apply_filters('bitform_filter_return_edit_success', $workFlowreturnedOnSubmit, $this->form_id);
      return $workFlowreturnedOnSubmit;
    }

    $formEntryModel = new FormEntryModel();
    $formEntryLogModel = new FormEntryLogModel();
    $formOldData = $formEntryLogModel->get_form_value($entryID);
    $key = null;
    $entryMeta = new FormEntryMetaModel();
    $ipTool = new IpTool();
    $user_details = $ipTool->getUserDetail();
    $user_details = apply_filters('bitform_filter_user_details', $user_details, $this->form_id);
    $user_details = apply_filters('bitform_filter_update_entry_user_details', $user_details, $this->form_id);

    $form_fields = $this->getFields();

    $updatedValue = $this->passwordEncrypted($updatedValue, $form_fields);
    $updatedValue = $this->formatRepeateFieldData($updatedValue, $form_fields);
    $field_map = [];
    foreach ($formOldData as $index => $data) {
      foreach ($form_fields as $field_key => $field) {
        if ($data->meta_key === $field['key']) {
          $field_map[$field_key] = $field['key'];
        }
      }
    }

    $geResult = $formEntryModel->get('status', ['form_id' => $formID, 'id' => $entryID]);
    if (is_wp_error($geResult) || empty($geResult)) {
      return new WP_Error('empty_form', __('provided form entries does not exists', 'bit-form'));
    }
    $oldEntry = $geResult[0];
    $formEntry = $formEntryModel->update(
      [
        'status'      => ('9' === $oldEntry->status && !$this->_saveFormAsDraft) ? 1 : $oldEntry->status,
        'updated_at'  => $user_details['time'],
      ],
      [
        'form_id' => $formID,
        'id'      => $entryID,
      ]
    );

    if (is_wp_error($formEntry) && 'result_empty' !== $formEntry->get_error_code()) {
      return new WP_Error('entry_update_failed', __('Sorry, error occurred in updating form entry', 'bit-form'));
    }

    $log_id = $this->submisionLog($user_details, $entryID, 'update');
    $formFields = $this->getFields();
    $updatedValue = FileHandler::tempDirToUploadDir($updatedValue, $formFields, $this->form_id, $entryID);
    $file_fields = $this->getUploadFields();
    if (count($file_fields) > 0) {
      $fileHandler = new FileHandler();
      foreach ($_FILES as $file_name => $file_details) {
        if ($file_fields && in_array($file_name, $file_fields)) {
          $validation = $fileHandler->validation($file_name, $file_details, $this->form_id);
          if (!empty($validation['error_type']) && !empty($validation['message'])) {
            return new WP_Error($validation['error_type'], esc_html($validation['message']));
          }
        }
      }
      if (is_object($updatedValue)) {
        $updatedValue = (array) $updatedValue;
      }
      foreach ($file_fields as $field_key) {
        $repeaterFldKey = $this->isRepeatedField($field_key);
        if (isset($updatedValue[$field_key . '_old'])) {
          // Handle file deletion for repeater fields
          if ($repeaterFldKey) {
            // Form entry meta lookup; meta_key/meta_value query required to retrieve repeater field data by entry.
            $repeaterExistData = $entryMeta->get(
              'meta_value',
              [
                'bitforms_form_entry_id' => $entryID,
                'meta_key'               => $repeaterFldKey,
              ]
            );
            if (!is_wp_error($repeaterExistData)) {
              // restructor json
              $repeaterExistData = json_decode($repeaterExistData[0]->meta_value, true);
              $repeaterExistFiles = [];
              $repeaterDeleted_files = [];
              $repeaterFiles_old = [];
              $submittedRepeaterOldFiles = is_array($updatedValue[$field_key . '_old']) ? $updatedValue[$field_key . '_old'] : [];
              foreach ($repeaterExistData as $index => $repeaterRow) {
                $repeaterExistFiles[$index] = [];
                if (isset($repeaterRow[$field_key]) && !empty($repeaterRow[$field_key]) && is_string($repeaterRow[$field_key])) {
                  $repeaterExistFiles[$index] = json_decode($repeaterRow[$field_key], true);
                }
                if (isset($repeaterRow[$field_key]) && !empty($repeaterRow[$field_key]) && is_array($repeaterRow[$field_key])) {
                  $repeaterExistFiles[$index] = $repeaterRow[$field_key];
                }
                if (!is_array($repeaterExistFiles[$index])) {
                  $repeaterExistFiles[$index] = [];
                }
                $oldFileInputExists = array_key_exists($index, $submittedRepeaterOldFiles);
                $repeaterRowExists = $oldFileInputExists || (isset($updatedValue[$repeaterFldKey][$index]) && is_array($updatedValue[$repeaterFldKey][$index]));
                $oldFileValues = ($repeaterRowExists && $oldFileInputExists) ? $submittedRepeaterOldFiles[$index] : [];
                $repeaterFiles_old[$index] = $this->normalizeOldFileValues($repeaterExistFiles[$index], $oldFileValues);
                $repeaterDeleted_files[$index] = array_diff($repeaterExistFiles[$index], $repeaterFiles_old[$index]);
                $repeaterFiles_old[$index] = array_values(array_diff($repeaterFiles_old[$index], $repeaterDeleted_files[$index]));
                $fileHandler->deleteFiles($formID, $entryID, $repeaterDeleted_files[$index]);
                if ($repeaterRowExists) {
                  if (!isset($updatedValue[$repeaterFldKey][$index]) || !is_array($updatedValue[$repeaterFldKey][$index])) {
                    $updatedValue[$repeaterFldKey][$index] = [];
                  }
                  $updatedValue[$repeaterFldKey][$index][$field_key] = $repeaterFiles_old[$index];
                }
              }
            }
          } else {
            // Handle file deletion for non-repeater fields; meta_key/meta_value lookup required to identify stored file paths per entry.
            $file_exists = $entryMeta->get(
              'meta_value',
              [
                'bitforms_form_entry_id' => $entryID,
                'meta_key'               => $field_key,
              ]
            );
            if (!is_wp_error($file_exists) && count($file_exists) > 0) {
              $files_in_db = json_decode($file_exists[0]->meta_value, true);
              if (!is_array($files_in_db)) {
                $files_in_db = [];
              }
              $retained_files = $this->normalizeOldFileValues($files_in_db, empty($updatedValue[$field_key . '_old']) ? [] : $updatedValue[$field_key . '_old']);
              $deleted_files = array_diff($files_in_db, $retained_files);
              $retained_files = array_values(array_diff($retained_files, $deleted_files));
              if (count($deleted_files) > 0) {
                $fileHandler->deleteFiles($formID, $entryID, $deleted_files);
              }
              $updatedValue[$field_key] = $retained_files;
            }
          }
        }
        if (!empty($_FILES[$field_key]['name'])) {
          if ($repeaterFldKey) {
            // Handle repeater field files
            $file_details = $_FILES[$field_key];
            foreach ($file_details['name'] as $index => $file) {
              $old_meta_value = [];
              // Retrieve existing old files for this specific repeater index
              if (isset($repeaterFiles_old[$index - 1]) && count($repeaterFiles_old[$index - 1]) > 0) {
                $old_meta_value = $repeaterFiles_old[$index - 1];
                // json format causing issue with repeater file in mail attachment as it's sending broken url(for multistep and abandonment form)
                // $updatedValue[$repeaterFldKey][$index - 1][$field_key] = wp_json_encode($old_meta_value);
                $updatedValue[$repeaterFldKey][$index - 1][$field_key] = $old_meta_value;
              }
              $repeateFileDetails = [
                'name'     => $file_details['name'][$index],
                'type'     => $file_details['type'][$index],
                'tmp_name' => $file_details['tmp_name'][$index],
                'error'    => $file_details['error'][$index],
                'size'     => $file_details['size'][$index],
              ];
              $meta_value = $fileHandler->moveUploadedFiles($repeateFileDetails, $formID, $entryID, $index);
              if (!empty($meta_value)) {
                $mergedMetaValueWithOld = array_merge($old_meta_value, (array) $meta_value);
                // json format causing issue with repeater file in mail attachment as it's sending broken url(for multistep and abandonment form)
                // $updatedValue[$repeaterFldKey][$index - 1][$field_key] = wp_json_encode($mergedMetaValueWithOld);
                $updatedValue[$repeaterFldKey][$index - 1][$field_key] = $mergedMetaValueWithOld;

                $_FILES[$field_key]['new_name'][$index - 1] = $mergedMetaValueWithOld;
                // $_FILES[$field_key]['file_path'][$index - 1] = $common_file_path . DIRECTORY_SEPARATOR . $meta_value;
              }
            }
          } else {
            // Handle non-repeater field files
            $meta_value = $fileHandler->moveUploadedFiles($_FILES[$field_key], $formID, $entryID);
            if (!empty($meta_value)) {
              $_FILES[$field_key]['new_name'] = $meta_value;
              if (isset($updatedValue[$field_key . '_old']) && !is_wp_error($file_exists) && count($file_exists) > 0) {
                $meta_value = empty($retained_files) ? $meta_value : array_merge($meta_value, $retained_files);
                $updatedValue[$field_key] = $meta_value;
              } else {
                $updatedValue[$field_key] = $meta_value;
              }
            }
          }
        }
      }

      // Get the common file path to avoid repetitive calculation
      $this->addNewFilePathToFiles($formID, $entryID, $file_fields);
    }

    if (is_object($updatedValue)) {
      $updatedValue = (array) $updatedValue;
    }
    if (isset($updatedValue['_ajax_nonce'], $_REQUEST['g-recaptcha-response']) && sanitize_text_field(wp_unslash($_REQUEST['g-recaptcha-response']))) {
      unset($updatedValue['_ajax_nonce'], $_REQUEST['g-recaptcha-response']);
    }

    $toUpdateValues = [];
    foreach ($form_fields as $field) {
      if (isset($updatedValue[$field['key']])) {
        $toUpdateValues[$field['key']] = $updatedValue[$field['key']];
      }
    }
    $form_content = \json_decode($this->form[0]->form_content);

    $replacedSignatureFiles = [];

    foreach ($form_content->fields as $key => $field) {
      if ('signature' === $field->typ) {
        $fld_data = isset($updatedValue[$key]) ? $updatedValue[$key] : '';
        $img_type = isset($field->config->imgTyp) ? $field->config->imgTyp : 'image/png';
        $storedSignature = $this->getStoredSignatureFile($entryMeta, $entryID, $key);
        if (is_string($fld_data) && 0 === strpos($fld_data, 'data:')) {
          $toUpdateValues[$key] = $this->getSignatureFilePath($fld_data, $this->form_id, $key, $entryID, $img_type);
          if ('' !== $storedSignature && $storedSignature !== $toUpdateValues[$key]) {
            $replacedSignatureFiles[] = $storedSignature;
          }
        } elseif (isset($updatedValue[$key . '_old'])) {
          // Nothing drawn: `_old` only confirms the stored file was kept, so write that back.
          $retained = FieldValueHandler::retainedOldValues($updatedValue, $key);
          $keepsStored = '' !== $storedSignature && in_array($storedSignature, $retained, true);
          $toUpdateValues[$key] = $keepsStored ? $storedSignature : '';
          if (!$keepsStored && '' !== $storedSignature) {
            $replacedSignatureFiles[] = $storedSignature;
          }
        } else {
          // No signature and no `_old` marker: leave what is stored alone.
          unset($toUpdateValues[$key]);
        }
      }

      //  for Signature field inside reepater
      if ('repeater' === $field->typ && isset($updatedValue[$key]) && is_array($updatedValue[$key])) {
        $rptr_data = $updatedValue[$key];
        $formFields = $form_content->fields;
        $this->setSignatureFilePathInRepeater($rptr_data, $key, $formFields, $entryID, $toUpdateValues);
      }
    }

    $workFlowRunHelper = new WorkFlow($formID);
    $workFlowreturnedOnSubmit = $workFlowRunHelper->executeOnSubmit(
      'edit',
      $this->getFormContentWithValue($toUpdateValues)->fields,
      $toUpdateValues,
      $entryID,
      $log_id
    );

    if (!empty($workFlowreturnedOnSubmit['fields'])) {
      $updatedValue = $workFlowreturnedOnSubmit['fields'];
    }

    $formEntryMetaUpdateStatus = $entryMeta->update(
      $toUpdateValues,
      [
        'bitforms_form_entry_id' => $entryID,
      ]
    );
    if (is_wp_error($formEntryMetaUpdateStatus) || isset($newFileInsertStatus) && is_wp_error($newFileInsertStatus)) {
      do_action('bitform_update_entry_error', $this, $toUpdateValues, $formEntryMetaUpdateStatus, $this->form_id);
      return $formEntryMetaUpdateStatus;
    }
    // Deleted only now the entry points elsewhere, so a failed update strands nothing.
    if (!empty($replacedSignatureFiles)) {
      (new FileHandler())->deleteFiles($formID, $entryID, $replacedSignatureFiles);
    }
    $toUpdateValues = array_merge($formEntryMetaUpdateStatus, ['entry_id' => $entryID]);
    do_action('bitform_after_update_entry_success', $this, $toUpdateValues, $formID, $entryID);
    if (empty($workFlowreturnedOnSubmit['message'])) {
      $workFlowreturnedOnSubmit['message'] = __('Entry Updated Successfully', 'bit-form');
    }
    $customFieldHandler = new CustomFieldHandler();
    $toUpdateValues = $customFieldHandler->updatedData($form_fields, $toUpdateValues);

    $workFlowreturnedOnSubmit['updatedData'] = $toUpdateValues;
    $counter = 0;
    for ($i = 0; $i < count($formOldData); $i++) {
      if (array_key_exists($formOldData[$i]->meta_key . '_old', $toUpdateValues)) {
        unset($toUpdateValues[$formOldData[$i]->meta_key . '_old']);
      }
      if (in_array($formOldData[$i]->meta_key, $file_fields)) {
        if (
          empty($_FILES[$formOldData[$i]->meta_key]['name'])
          || (is_array($_FILES[$formOldData[$i]->meta_key]['name'])
              && 1 === count($_FILES[$formOldData[$i]->meta_key]['name'])
              && empty($_FILES[$formOldData[$i]->meta_key]['name'][0]))
        ) {
          unset($toUpdateValues[$formOldData[$i]->meta_key]);
          continue;
        }
        if (is_array($_FILES[$formOldData[$i]->meta_key]['name']) && !in_array($_FILES[$formOldData[$i]->meta_key]['name'], json_decode($formOldData[$i]->meta_value))) {
          $sanitized_names = array_map('sanitize_file_name', array_map('wp_unslash', (array) $_FILES[$formOldData[$i]->meta_key]['name']));
          $key[$i] = '${' . $formOldData[$i]->meta_key . '} file was Updated  To ' . wp_json_encode($sanitized_names);
        } elseif (!is_array($_FILES[$formOldData[$i]->meta_key]['name']) && !in_array($_FILES[$formOldData[$i]->meta_key]['name'], json_decode($formOldData[$i]->meta_value))) {
          $key[$i] = '${' . $formOldData[$i]->meta_key . '} file was Updated  To ' . sanitize_file_name(wp_unslash($_FILES[$formOldData[$i]->meta_key]['name']));
        }
        unset($toUpdateValues[$formOldData[$i]->meta_key]);
      } elseif (isset($toUpdateValues[$formOldData[$i]->meta_key])) {
        if (is_array($toUpdateValues[$formOldData[$i]->meta_key])) {
          if (json_decode($formOldData[$i]->meta_value) !== $toUpdateValues[$formOldData[$i]->meta_key]) {
            $key[$i] = '${' . $formOldData[$i]->meta_key . '} was Updated From ' . implode(',', json_decode($formOldData[$i]->meta_value)) . ' To ' . implode(',', $toUpdateValues[$formOldData[$i]->meta_key]);
          }
        } elseif (is_string($toUpdateValues[$formOldData[$i]->meta_key]) && !FieldValueHandler::isEmpty($toUpdateValues[$formOldData[$i]->meta_key])) {
          if ($formOldData[$i]->meta_value !== $toUpdateValues[$formOldData[$i]->meta_key]) {
            $key[$i] = '${' . $formOldData[$i]->meta_key . '} was Updated' . ($formOldData[$i]->meta_value ? ' From ' . $formOldData[$i]->meta_value : '') . ' To ' . $toUpdateValues[$formOldData[$i]->meta_key];
          }
        }
      }
      $counter++;
    }

    $newField = array_keys(array_diff_key($formEntryMetaUpdateStatus, $field_map));
    for ($i = 0; $i < count($newField); $i++) {
      if (is_array($toUpdateValues[$newField[$i]]) && !empty($toUpdateValues[$newField[$i]])) {
        $key[$counter + $i] = '${' . $newField[$i] . '} Updated To ' . implode(',', $toUpdateValues[$newField[$i]]);
      } elseif (is_string($newField[$i]) && !FieldValueHandler::isEmpty($toUpdateValues[$newField[$i]])) {
        $key[$counter + $i] = '${' . $newField[$i] . '} Updated To ' . $toUpdateValues[$newField[$i]];
      }
    }
    if (null !== $key) {
      $logUpdate = implode('b::f', (array) $key);
      $formEntryLogUpdate = $formEntryLogModel->logUpdate($logUpdate, $log_id);
    }
    $workFlowreturnedOnSubmit['entry_id'] = $entryID;
    $workFlowreturnedOnSubmit = apply_filters('bitform_filter_return_edit_success', $workFlowreturnedOnSubmit, $this->form_id);

    return $workFlowreturnedOnSubmit;
  }

  public function getRepeaterFields()
  {
    if (!is_null($this->_repeaterFields)) {
      return $this->_repeaterFields;
    }
    $repeaterFields = [];
    $form_content = \json_decode($this->form[0]->form_content);
    $fields = $form_content->fields;
    $nestedLayouts = !empty($form_content->nestedLayout) ? $form_content->nestedLayout : [];
    foreach ($nestedLayouts as $fieldKey => $repeatLayout) {
      if ('repeater' !== $fields->{$fieldKey}->typ) {
        continue;
      }
      $repeaterFields[$fieldKey] = [];
      foreach ($repeatLayout->lg as $fieldLayoutData) {
        $repeaterFields[$fieldKey][] = $fieldLayoutData->i;
      }
    }
    $this->_repeaterFields = $repeaterFields;
    return $repeaterFields;
  }

  public function isRepeatedField($fieldKey)
  {
    $repeatedFields = $this->getRepeaterFields();
    foreach ($repeatedFields as $repeaterKey => $repeaterFields) {
      if (in_array($fieldKey, $repeaterFields)) {
        return $repeaterKey;
      }
    }
    return false;
  }

  public function getParentRepeaterField($fieldKey)
  {
    $repeatedFields = $this->getRepeaterFields();
    foreach ($repeatedFields as $repeaterKey => $repeaterFields) {
      if (in_array($fieldKey, $repeaterFields)) {
        return $repeaterKey;
      }
    }
    return null;
  }

  public function isRepeaterField($fieldKey)
  {
    $repeatedFields = $this->getRepeaterFields();
    if (array_key_exists($fieldKey, $repeatedFields)) {
      return true;
    }
    return false;
  }

  public function fieldNameReplaceOfPost()
  {
    // CSRF verified upstream before this method is called; $_POST/$_FILES are being normalized (field key remapping), not reading new user input.
    $fields = $this->getFields();
    foreach ($fields as $fieldKey => $fieldData) {
      if (array_key_exists('name', $fieldData)) {
        $fldName = $fieldData['name'];
        $catchChildFldNamePattern = '/\[(.*?)\]/';
        // catching the child field name for confirm field, name field's child
        // preg_match_all($catchChildFldNamePattern, $fldName, $matches);
        $fldName = preg_replace($catchChildFldNamePattern, '', $fldName);
        $fldName = str_replace(['.', ' '], '_', $fldName);
        if (!empty($fldName)) {
          if (array_key_exists($fldName, $_POST)) {
            $temp = $this->sanitize_text_recursive($_POST[$fldName]);
            unset($_POST[$fldName]);
            $_POST[$fieldKey] = $temp;
          } elseif (array_key_exists($fieldKey, $_POST)) {
            $_POST[$fieldKey] = $this->sanitize_text_recursive($_POST[$fieldKey]);
          } elseif (array_key_exists($fldName, $_FILES)) {
            $temp = $this->sanitize_text_recursive($_FILES[$fldName], false);
            unset($_FILES[$fldName]);
            $_FILES[$fieldKey] = $temp;
          } elseif (array_key_exists($fieldKey, $_FILES)) {
            $_FILES[$fieldKey] = $this->sanitize_text_recursive($_FILES[$fieldKey], false);
          }
          // Convert _session_id suffix (used by email-otp and similar fields)
          if (array_key_exists($fldName . '_session_id', $_POST)) {
            $temp = sanitize_text_field(wp_unslash($_POST[$fldName . '_session_id']));
            unset($_POST[$fldName . '_session_id']);
            $_POST[$fieldKey . '_session_id'] = $temp;
          }
        }
      }
    }
  }

  private function sanitize_text_recursive($input, $unslash = true)
  {
    if (is_array($input)) {
      return array_map(fn ($item) => $this->sanitize_text_recursive($item, $unslash), $input);
    }

    return sanitize_text_field($unslash ? wp_unslash($input) : $input);
  }

  private function normalizeRepeatedCompositeFieldInput($value)
  {
    if (!is_array($value) || empty($value)) {
      return $value;
    }

    $hasNestedArray = false;
    foreach ($value as $childValues) {
      if (!is_array($childValues)) {
        return $value;
      }
      $hasNestedArray = true;
    }

    if (!$hasNestedArray) {
      return $value;
    }

    $formattedValue = [];
    foreach ($value as $childKey => $childValues) {
      foreach ($childValues as $repeatIndex => $repeatValue) {
        if (!isset($formattedValue[$repeatIndex]) || !is_array($formattedValue[$repeatIndex])) {
          $formattedValue[$repeatIndex] = [];
        }
        $formattedValue[$repeatIndex][$childKey] = $repeatValue;
      }
    }

    return $formattedValue;
  }

  public function setSubmissionCount($countStep = 1)
  {
    $update_status = $this->formModel->update(
      [
        'entries' => intval($this->form[0]->entries) + $countStep,
      ],
      [
        'id' => $this->form_id,
      ]
    );
  }

  public function resetSubmissionCount($countStep)
  {
    $update_status = $this->formModel->update(
      [
        'entries' => intval($countStep),
      ],
      [
        'id' => $this->form_id,
      ]
    );
  }

  public function getCaptchaSettings()
  {
    $formContents = $this->getFormContent();
    $fieldStr = wp_json_encode($formContents->fields);
    if (false !== strpos($fieldStr, '"typ":"recaptcha"')) {
      return true;
    }
  }

  public function getTurnstileSettings()
  {
    $formContents = $this->getFormContent();
    $fieldStr = wp_json_encode($formContents->fields);
    if (false !== strpos($fieldStr, '"typ":"turnstile"')) {
      return true;
    }
  }

  public function isFieldTypeExist($fieldType)
  {
    $formContents = $this->getFormContent();
    $fieldStr = wp_json_encode($formContents->fields);
    if (false !== strpos($fieldStr, '"typ":"' . $fieldType . '"')) {
      return true;
    }
  }

  public function getCaptchaV3Settings()
  {
    $formContents = $this->getFormContent();
    if (!empty($formContents->additional->enabled) && !empty($formContents->additional->enabled->recaptchav3)) {
      return $formContents->additional->settings->recaptchav3;
    }
    return false;
  }

  // public function getSuccessMessageMarkups() {
  //   if (is_null($this->_work_flows)) {
  //     $workFlowManager = new WorkFlowHandler($this->form_id);
  //     $this->_work_flows = $workFlowManager->getAllworkFlow();
  //   }

  //   $ids = [];
  //   foreach ($this->_work_flows as $msgItem) {
  //     foreach ($msgItem['conditions'] as $condition) {
  //       if (isset($condition->actions->success)) {
  //         foreach ($condition->actions->success as $msg) {
  //           if ('successMsg' === $msg->type && isset($msg->details->id)) {
  //             $msgDetailsId = $msg->details->id;
  //             $idObj = json_decode(stripslashes($msgDetailsId));
  //             if (is_object($idObj) && !empty($idObj->id)) {
  //               array_push($ids, $idObj->id);
  //             }
  //           }
  //         }
  //       }
  //       if (isset($condition->actions->failure)) {
  //         $idObj = json_decode(stripslashes($condition->actions->failure));
  //         if (is_object($idObj) && !empty($idObj->id)) {
  //           array_push($ids, $idObj->id);
  //         }
  //       }
  //     }
  //   }
  //   $ids = array_unique($ids);
  //   if (is_null($this->_conf_messages)) {
  //     $successMsgHandler = new SuccessMessageHandler($this->form_id);
  //     $this->_conf_messages = $successMsgHandler->getMessages($ids);
  //   }

  //   $messageMarkups = '';
  //   if (is_wp_error($this->_conf_messages)) {
  //     return $messageMarkups;
  //   }

  //   foreach ($this->_conf_messages as $key => $msgItem) {
  //     $messageMarkups .= $this->messageMarkup($msgItem->id);
  //   }

  //   return $messageMarkups;
  // }

  //   private function messageMarkup($msgId) {
  //     return <<<SUCCESSMSG
  //             <div role="dialog" aria-hidden="true" data-modal-backdrop="true" class="{$this->getAtomicCls("msg-container-{$msgId}")} deactive2 test">
  //               <div role="button" class="{$this->getAtomicCls("msg-background-{$msgId}")} msg-backdrop">
  //                 <div class="bf-notification-message {$this->getAtomicCls("msg-content-{$msgId}")}">
  //                   <button class="{$this->getAtomicCls("close-{$msgId}")} bf-msg-close" type="button">
  //                     <svg class="{$this->getAtomicCls("close-icn-{$msgId}")}" viewBox="0 0 30 30">
  //                       <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" x1="4" y1="3.88" x2="26" y2="26.12"></line>
  //                       <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" x1="26" y1="3.88" x2="4" y2="26.12"></line>
  //                     </svg>
  //                   </button>
  //                   <div class="msg-content"></div>
  //                 </div>
  //               </div>
  //             </div>
  // SUCCESSMSG;
  //   }

  public function getAtomicCls($element)
  {
    $atomicClassMap = $this->getAtomicClsMap();
    if (is_object($atomicClassMap) && property_exists($atomicClassMap, ".$element")) {
      $getAtomicCls = $atomicClassMap->{".$element"};
      return implode(' ', $getAtomicCls) . " $element";
    }
    return $element;
  }

  public function isGCLIDEnabled()
  {
    $formContents = $this->getFormContent();
    if (isset($formContents->additional->enabled->captureGCLID) && $formContents->additional->enabled->captureGCLID) {
      return true;
    }
    return false;
  }

  protected function addEntryInfo($field_details, $counter)
  {
    $infos = [
      '__user_id'      => __('User', 'bit-form'),
      '__entry_status' => __('Status', 'bit-form'),
      //'__user_location' => __(''),
      '__referer'     => __('Refer URL', 'bit-form'),
      '__user_device' => __('Device', 'bit-form'),
      '__user_ip'     => __('IP address', 'bit-form'),
      '__created_at'  => __('Created Time', 'bit-form'),
      '__updated_at'  => __('Modified Time', 'bit-form'),
    ];
    foreach ($infos as $key => $value) {
      $field_details[$counter]['name'] = $value;
      $field_details[$counter]['key'] = $key;
      $field_details[$counter]['type'] = 'sys';
      $counter = $counter + 1;
    }

    return $field_details;
  }
}
