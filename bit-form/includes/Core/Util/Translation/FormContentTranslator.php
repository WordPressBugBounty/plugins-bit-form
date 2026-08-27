<?php

namespace BitCode\BitForm\Core\Util\Translation;

/**
 * Whitelist-driven walker over the decoded form_content object, shared by
 * translate() (applies `bitform_translate_form_string` in place) and collect()
 * (enumerates [context => string] for provider registration).
 *
 * Context keys are stable: property path first, id/key last ("fld-lbl-{fieldKey}").
 * Option and valid/err contexts stay in JSON-path order — indices stacked onto a
 * dash-containing field key would make the segment boundaries ambiguous.
 *
 * Never translated: option values, field keys and types, anything unlisted. An
 * option label translates only when the option has an explicit value; otherwise
 * the label *is* the submitted value and translating it breaks stored entries.
 */
final class FormContentTranslator
{
  /**
   * Flat per-field string properties.
   */
  public const FIELD_PROPS = [
    'lbl',
    'subtitle',
    'helperTxt',
    'ph',
    'title',
    'txt',
    'btnTxt',
    'otherOptLbl',
    'otherInpPh',
    'alt',
    'content',
  ];

  /**
   * Nested per-field property chains ending in a string.
   */
  public const FIELD_NESTED = [
    ['info', 'content'],
    ['info', 'lbl'],
    ['addBtn', 'txt'],
    ['addToEndBtn', 'txt'],
    ['removeBtn', 'txt'],
    ['config', 'searchPlaceholder'],
    // EmailOtp (Pro). A waitTxt translation should keep the literal
    // ${bf_resend_countdown} token; the renderer appends it when dropped.
    ['config', 'sendBtnTxt'],
    ['config', 'verifyBtnTxt'],
    ['config', 'waitTxt'],
  ];

  /**
   * User-authored message leaves relative to additional->settings. Explicit
   * paths only: additional also carries flags that must never be touched.
   */
  public const ADDITIONAL_MESSAGES = [
    ['is_login', 'message'],
    ['empty_submission', 'message'],
    ['messages', 'entry_limit_message'],
    ['messages', 'entry_limit_per_user_message'],
  ];

  /**
   * String props translated on conversational step-settings objects.
   */
  public const CONVERSATIONAL_STEP_PROPS = ['title', 'btnTxt', 'nextBtnTxt', 'stepHints', 'content'];

  /**
   * Applies `bitform_translate_form_string` to every whitelisted string, in place.
   *
   * @param mixed $formContent decoded form_content (stdClass); non-objects are ignored
   * @param int   $formID
   */
  public static function translate($formContent, $formID)
  {
    self::walk($formContent, function ($string, $context) use ($formID) {
      $out = apply_filters('bitform_translate_form_string', $string, $context, $formID);
      return (is_string($out) && '' !== $out) ? $out : $string;
    });
  }

  /**
   * Returns every whitelisted string as [context => string]. No mutation.
   *
   * @param mixed $formContent decoded form_content (stdClass); non-objects yield []
   *
   * @return array<string,string>
   */
  public static function collect($formContent)
  {
    $strings = [];
    self::walk($formContent, function ($string, $context) use (&$strings) {
      $strings[$context] = $string;
      return null; // no write-back
    });
    return $strings;
  }

  /**
   * @param mixed    $formContent decoded form_content; anything non-object is ignored
   * @param callable $visitor     fn($string, $context): ?string — non-null return is written back
   */
  private static function walk($formContent, $visitor)
  {
    if (!is_object($formContent)) {
      return;
    }

    if (isset($formContent->fields) && (is_object($formContent->fields) || is_array($formContent->fields))) {
      foreach ($formContent->fields as $fieldKey => $field) {
        self::walkField($field, (string) $fieldKey, $visitor);
      }
    }

    self::walkLayoutSteps($formContent, $visitor);

    if (isset($formContent->formInfo) && is_object($formContent->formInfo)) {
      self::walkFormInfo($formContent->formInfo, $visitor);
    }

    self::walkAdditional($formContent, $visitor);
  }

  /**
   * Restriction/entry-limit messages in additional->settings, whitelisted leaves only.
   *
   * @param object   $formContent
   * @param callable $visitor
   */
  private static function walkAdditional($formContent, $visitor)
  {
    if (!isset($formContent->additional->settings) || !is_object($formContent->additional->settings)) {
      return;
    }
    $settings = $formContent->additional->settings;
    foreach (self::ADDITIONAL_MESSAGES as $chain) {
      $owner = $settings;
      $last = count($chain) - 1;
      foreach ($chain as $i => $prop) {
        if ($i === $last) {
          self::visitLeaf($owner, $prop, 'additional-' . implode('-', $chain), $visitor);
          break;
        }
        if (!isset($owner->{$prop}) || !is_object($owner->{$prop})) {
          break;
        }
        $owner = $owner->{$prop};
      }
    }
  }

  /**
   * @param mixed    $field    anything non-object is ignored
   * @param string   $fieldKey
   * @param callable $visitor
   */
  private static function walkField($field, $fieldKey, $visitor)
  {
    if (!is_object($field)) {
      return;
    }

    foreach (self::FIELD_PROPS as $prop) {
      self::visitLeaf($field, $prop, "fld-{$prop}-{$fieldKey}", $visitor);
    }

    foreach (self::FIELD_NESTED as $chain) {
      $owner = $field;
      $last = count($chain) - 1;
      foreach ($chain as $i => $prop) {
        if ($i === $last) {
          self::visitLeaf($owner, $prop, 'fld-' . implode('-', $chain) . "-{$fieldKey}", $visitor);
          break;
        }
        if (!isset($owner->{$prop}) || !is_object($owner->{$prop})) {
          break;
        }
        $owner = $owner->{$prop};
      }
    }

    if (isset($field->opt)) {
      self::walkOptions($field->opt, "fld-{$fieldKey}-opt", $visitor);
    }

    if (isset($field->optionsList) && (is_array($field->optionsList) || is_object($field->optionsList))) {
      foreach ($field->optionsList as $listIndex => $list) {
        // Each list entry holds a single property: {listName: [options...]}.
        if (!is_object($list) && !is_array($list)) {
          continue;
        }
        foreach ((array) $list as $options) {
          self::walkOptions($options, "fld-{$fieldKey}-optlist-{$listIndex}", $visitor);
          break; // the first (only) property is the options array
        }
      }
    }

    if (isset($field->suggestions)) {
      self::walkOptions($field->suggestions, "fld-{$fieldKey}-suggestion", $visitor);
    }

    if (isset($field->valid) && is_object($field->valid)) {
      self::walkMessageLeaves($field->valid, "fld-{$fieldKey}-valid", $visitor, ['/Msg$/']);
    }

    if (isset($field->err) && is_object($field->err)) {
      self::walkMessageLeaves($field->err, "fld-{$fieldKey}-err", $visitor, ['/^(msg|dflt)$/']);
    }
  }

  /**
   * Walks flat options, optgroups with childs, and suggestions. Optgroup titles
   * are display-only and always translated.
   *
   * @param mixed    $options
   * @param string   $contextBase
   * @param callable $visitor
   */
  private static function walkOptions($options, $contextBase, $visitor)
  {
    if (!is_array($options) && !is_object($options)) {
      return;
    }

    foreach ($options as $index => $opt) {
      if (!is_object($opt)) {
        continue;
      }

      if (isset($opt->type, $opt->childs)) {
        self::visitLeaf($opt, 'title', "{$contextBase}-{$index}-title", $visitor);
        self::walkOptions($opt->childs, "{$contextBase}-{$index}-child", $visitor);
        continue;
      }

      $hasExplicitValue = (isset($opt->val) && '' !== $opt->val) || (isset($opt->value) && '' !== $opt->value);
      if (!$hasExplicitValue) {
        // Label doubles as the submitted value here — must stay source-language.
        continue;
      }
      self::visitLeaf($opt, 'lbl', "{$contextBase}-{$index}-lbl", $visitor);
      self::visitLeaf($opt, 'label', "{$contextBase}-{$index}-label", $visitor);
    }
  }

  /**
   * Recurses a structure translating string leaves whose key matches a pattern.
   *
   * @param object|array $node
   * @param string       $contextBase
   * @param callable     $visitor
   * @param string[]     $keyPatterns
   */
  private static function walkMessageLeaves($node, $contextBase, $visitor, $keyPatterns)
  {
    foreach ($node as $key => $value) {
      $context = "{$contextBase}-{$key}";
      if (is_object($value) || is_array($value)) {
        self::walkMessageLeaves($value, $context, $visitor, $keyPatterns);
        continue;
      }
      if (!is_string($value) || !is_object($node)) {
        continue;
      }
      foreach ($keyPatterns as $pattern) {
        if (preg_match($pattern, (string) $key)) {
          self::visitLeaf($node, (string) $key, $context, $visitor);
          break;
        }
      }
    }
  }

  /**
   * Multi-step: layout[N]->settings->lbl / ->subtitle (step headers).
   *
   * @param object   $formContent
   * @param callable $visitor
   */
  private static function walkLayoutSteps($formContent, $visitor)
  {
    if (!isset($formContent->layout) || !is_array($formContent->layout)) {
      return;
    }
    foreach ($formContent->layout as $index => $step) {
      if (!is_object($step) || !isset($step->settings) || !is_object($step->settings)) {
        continue;
      }
      self::visitLeaf($step->settings, 'lbl', "layout-settings-lbl-{$index}", $visitor);
      self::visitLeaf($step->settings, 'subtitle', "layout-settings-subtitle-{$index}", $visitor);
    }
  }

  /**
   * formInfo: multi-step prev/next button texts + conversational settings.
   *
   * @param object   $formInfo
   * @param callable $visitor
   */
  private static function walkFormInfo($formInfo, $visitor)
  {
    if (isset($formInfo->multiStepSettings->btnSettings) && is_object($formInfo->multiStepSettings->btnSettings)) {
      foreach ($formInfo->multiStepSettings->btnSettings as $btnKey => $btn) {
        if (is_object($btn)) {
          self::visitLeaf($btn, 'txt', "mss-btn-txt-{$btnKey}", $visitor);
        }
      }
    }

    if (isset($formInfo->conversationalSettings) && is_object($formInfo->conversationalSettings)) {
      $conv = $formInfo->conversationalSettings;

      if (isset($conv->stepListObject) && is_object($conv->stepListObject)) {
        foreach ($conv->stepListObject as $stepKey => $stepSettings) {
          if (!is_object($stepSettings)) {
            continue;
          }
          foreach (self::CONVERSATIONAL_STEP_PROPS as $prop) {
            self::visitLeaf($stepSettings, $prop, "conv-{$prop}-{$stepKey}", $visitor);
          }
        }
      }

      if (isset($conv->navigationSettings) && is_object($conv->navigationSettings)) {
        self::visitLeaf($conv->navigationSettings, 'progressLabel', 'conv-nav-progressLabel', $visitor);
      }
    }
  }

  /**
   * Visits one string property; writes back the visitor's non-null return.
   *
   * @param object   $owner
   * @param string   $prop
   * @param string   $context
   * @param callable $visitor
   */
  private static function visitLeaf($owner, $prop, $context, $visitor)
  {
    if (!isset($owner->{$prop}) || !is_string($owner->{$prop}) || '' === trim($owner->{$prop})) {
      return;
    }
    $result = $visitor($owner->{$prop}, $context);
    if (is_string($result)) {
      $owner->{$prop} = $result;
    }
  }
}
