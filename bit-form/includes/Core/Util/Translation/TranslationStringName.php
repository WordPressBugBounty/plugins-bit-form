<?php

namespace BitCode\BitForm\Core\Util\Translation;

/**
 * The single rule for turning a context key into a store-facing string name.
 *
 * Separate-table contexts (msg/mail/redirect) are already globally unique;
 * form_content contexts are unique only within their form, so they carry a
 * "-form-{id}" suffix. Every registering provider must agree on this, otherwise
 * one form's strings land under two different names in the same store.
 */
final class TranslationStringName
{
  /**
   * @param mixed $context
   * @param mixed $formId
   *
   * @return string
   */
  public static function forForm($context, $formId)
  {
    $context = (string) $context;
    if (preg_match('/^(msg|mail|redirect)-/', $context)) {
      return $context;
    }
    return $context . '-form-' . (int) $formId;
  }
}
