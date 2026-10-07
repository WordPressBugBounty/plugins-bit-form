<?php

namespace BitCode\BitForm\Core\WorkFlow;

/**
 * Evaluates workflow conditions on date-like fields.
 *
 * The builder saves date condition values quoted ('2026-01-01') so the math evaluator does not
 * turn them into a subtraction, and the submitted value arrives in the field's own shape (Y-m-d,
 * H:i, Y-Www, Y-m, or a flatpickr format for advanced-datetime). Comparing those raw strings never
 * matched, so both sides are reduced to a sortable number first. Keep the semantics in step with
 * bit-helpers/src/bfDateFieldsLogicCheck.js, which runs the same rules in the browser.
 */
final class DateConditionComparator
{
  public const DATE_TYPES = ['date', 'time', 'datetime-local', 'week', 'month', 'advanced-datetime'];

  // flatpickr token => DateTime::createFromFormat() token. null = no parseable equivalent.
  private const FLATPICKR_TOKENS = [
    'd' => 'd',
    'D' => 'D',
    'l' => 'l',
    'j' => 'j',
    'J' => 'jS',
    'w' => '?',
    'W' => null,
    'F' => 'F',
    'm' => 'm',
    'n' => 'n',
    'M' => 'M',
    'U' => 'U',
    'u' => null,
    'y' => 'y',
    'Y' => 'Y',
    'Z' => null,
    'H' => 'H',
    // flatpickr's h is the unpadded 12-hour clock and G the padded one, the reverse of PHP.
    'h' => 'g',
    'G' => 'h',
    'i' => 'i',
    'S' => 's',
    's' => 's',
    'K' => 'A',
  ];

  private const COMPARABLE_LOGICS = ['equal', 'not_equal', 'greater', 'less', 'greater_or_equal', 'less_or_equal', 'between', 'contain', 'not_contain'];

  /**
   * @param mixed $type field type
   *
   * @return bool
   */
  public static function isDateType($type)
  {
    return is_string($type) && in_array($type, self::DATE_TYPES, true);
  }

  /**
   * The format an advanced-datetime field actually posts. With Enable Time on and a date-only
   * Value Format, the runtime appends a time token (bit-advanced-datetime-field.js) so the picked
   * time is not silently dropped; mirror that here so the posted value still parses.
   *
   * @param mixed $config field config object/array
   *
   * @return string flatpickr format
   */
  public static function advancedValueFormat($config)
  {
    $config = is_array($config) ? (object) $config : $config;
    $format = is_object($config) && !empty($config->dateFormat) && is_string($config->dateFormat) ? $config->dateFormat : 'Y-m-d';
    if (is_object($config) && !empty($config->enableTime) && !self::hasTimeToken($format)) {
      $format .= !empty($config->time_24hr) ? ' H:i' : ' h:i K';
    }
    return $format;
  }

  /**
   * @param string $format flatpickr format
   *
   * @return bool
   */
  public static function hasTimeToken($format)
  {
    // Strip escaped characters first: "\h" is a literal h, not an hour.
    return 1 === preg_match('/[HhGiSsK]/', (string) preg_replace('/\\\\./', '', (string) $format));
  }

  /**
   * @param string $logic          condition operator
   * @param mixed  $fieldValue     submitted value
   * @param mixed  $conditionValue condition value (quoted string, or {min,max} for between)
   * @param string $type           field type
   * @param string $format         flatpickr value format (advanced-datetime only)
   *
   * @return bool|null null when the operator is not a date comparison, so the caller keeps its
   *                   generic behaviour
   */
  public static function compare($logic, $fieldValue, $conditionValue, $type, $format = '')
  {
    $logic = strtolower((string) $logic);
    if ('null' === $logic) {
      return self::isEmptyValue($fieldValue);
    }
    if ('not_null' === $logic) {
      return !self::isEmptyValue($fieldValue);
    }
    if (!in_array($logic, self::COMPARABLE_LOGICS, true)) {
      return null;
    }

    $rawFieldValue = self::stripQuotes(self::scalarValue($fieldValue));
    $fieldDates = self::parseValues($rawFieldValue, $type, $format);

    if ('between' === $logic) {
      list($min, $max) = self::betweenBounds($conditionValue, $type, $format);
      if (empty($fieldDates) || null === $min || null === $max) {
        return false;
      }
      foreach ($fieldDates as $date) {
        if ($date < $min || $date > $max) {
          return false;
        }
      }
      return true;
    }

    $rawConditionValue = self::stripQuotes(self::scalarValue($conditionValue));
    $target = self::parse($rawConditionValue, $type, $format);

    if (in_array($logic, ['equal', 'not_equal', 'contain', 'not_contain'], true)) {
      $matches = null !== $target
        ? in_array($target, $fieldDates, true)
        : '' !== $rawConditionValue && $rawFieldValue === $rawConditionValue;
      if (!$matches && in_array($logic, ['contain', 'not_contain'], true)) {
        $matches = '' !== $rawConditionValue && false !== stripos($rawFieldValue, $rawConditionValue);
      }
      return in_array($logic, ['equal', 'contain'], true) ? $matches : !$matches;
    }

    if (null === $target || empty($fieldDates)) {
      return false;
    }
    // A range or multi-date selection satisfies an ordering only when every picked date does.
    foreach ($fieldDates as $date) {
      if (!self::satisfiesOrder($logic, $date, $target)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Reduce one date-like string to a sortable number.
   *
   * @param string $value  unquoted value
   * @param string $type   field type
   * @param string $format flatpickr value format (advanced-datetime only)
   *
   * @return float|int|null null when the value cannot be read as this type
   */
  public static function parse($value, $type, $format = '')
  {
    $value = trim((string) $value);
    if ('' === $value) {
      return null;
    }

    switch ($type) {
      case 'time':
        if (1 === preg_match('/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/', $value, $match)) {
          return (int) $match[1] * 3600 + (int) $match[2] * 60 + (int) ($match[3] ?? 0);
        }
        return null;

      case 'month':
        if (1 === preg_match('/^(\d{4})-(\d{1,2})$/', $value, $match) && (int) $match[2] >= 1 && (int) $match[2] <= 12) {
          return (int) $match[1] * 12 + (int) $match[2] - 1;
        }
        return null;

      case 'week':
        if (1 === preg_match('/^(\d{4})-?W(\d{1,2})$/i', $value, $match) && (int) $match[2] >= 1 && (int) $match[2] <= 53) {
          return (int) $match[1] * 100 + (int) $match[2];
        }
        return null;

      case 'advanced-datetime':
        // ISO first: flatpickr's own parser is lenient and reads "2025-03-15" against d/m/Y as
        // day 20, so the browser tries ISO first too and both sides must agree.
        $timestamp = self::parseIso($value);
        return null !== $timestamp ? $timestamp : self::parseWithFlatpickrFormat($value, (string) $format);

      default:
        return self::parseIso($value);
    }
  }

  /**
   * Convert a flatpickr format to a DateTime::createFromFormat() format.
   *
   * @param string $format flatpickr format
   *
   * @return string|null null when the format holds a token PHP cannot parse
   */
  public static function flatpickrToPhpFormat($format)
  {
    $format = (string) $format;
    if ('' === $format) {
      return null;
    }
    $phpFormat = '';
    $length = strlen($format);
    for ($i = 0; $i < $length; $i++) {
      $char = $format[$i];
      if ('\\' === $char) {
        $i++;
        if ($i < $length) {
          $phpFormat .= '\\' . $format[$i];
        }
        continue;
      }
      if (array_key_exists($char, self::FLATPICKR_TOKENS)) {
        if (null === self::FLATPICKR_TOKENS[$char]) {
          return null;
        }
        $phpFormat .= self::FLATPICKR_TOKENS[$char];
        continue;
      }
      // Any other letter is a format character to PHP but a literal to flatpickr.
      $phpFormat .= ctype_alpha($char) ? '\\' . $char : $char;
    }
    return $phpFormat;
  }

  private static function parseWithFlatpickrFormat($value, $format)
  {
    $phpFormat = self::flatpickrToPhpFormat($format);
    if (null === $phpFormat) {
      return null;
    }
    // '!' zeroes every unparsed part, so a date-only format means midnight on both sides.
    $date = \DateTime::createFromFormat('!' . $phpFormat, $value, new \DateTimeZone('UTC'));
    if (false === $date) {
      return null;
    }
    $errors = \DateTime::getLastErrors();
    if (is_array($errors) && ($errors['warning_count'] > 0 || $errors['error_count'] > 0)) {
      return null;
    }
    return $date->getTimestamp();
  }

  private static function parseIso($value)
  {
    if (1 !== preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/', $value, $match)) {
      return null;
    }
    if (!checkdate((int) $match[2], (int) $match[3], (int) $match[1])) {
      return null;
    }
    return gmmktime((int) ($match[4] ?? 0), (int) ($match[5] ?? 0), (int) ($match[6] ?? 0), (int) $match[2], (int) $match[3], (int) $match[1]);
  }

  /**
   * Split a submitted value into its dates. advanced-datetime in range mode posts
   * "A to B" and in multiple mode "A, B"; the format itself may contain ", " (F j, Y), so
   * segments are re-joined until each one parses.
   *
   * @return array<int|float>
   */
  private static function parseValues($value, $type, $format)
  {
    $single = self::parse($value, $type, $format);
    if (null !== $single) {
      return [$single];
    }
    if ('advanced-datetime' !== $type || '' === $value) {
      return [];
    }
    foreach ([' to ', ','] as $separator) {
      $parts = explode($separator, $value);
      if (count($parts) < 2) {
        continue;
      }
      $dates = [];
      $buffer = null;
      foreach ($parts as $part) {
        $buffer = null === $buffer ? $part : $buffer . $separator . $part;
        $parsed = self::parse($buffer, $type, $format);
        if (null !== $parsed) {
          $dates[] = $parsed;
          $buffer = null;
        }
      }
      if (null === $buffer) {
        return $dates;
      }
    }
    return [];
  }

  private static function betweenBounds($conditionValue, $type, $format)
  {
    $bounds = is_string($conditionValue) ? json_decode($conditionValue) : $conditionValue;
    if (is_array($bounds)) {
      $bounds = (object) $bounds;
    }
    if (!is_object($bounds)) {
      return [null, null];
    }
    $min = isset($bounds->min) ? self::parse(self::stripQuotes(self::scalarValue($bounds->min)), $type, $format) : null;
    $max = isset($bounds->max) ? self::parse(self::stripQuotes(self::scalarValue($bounds->max)), $type, $format) : null;
    return [$min, $max];
  }

  private static function satisfiesOrder($logic, $date, $target)
  {
    switch ($logic) {
      case 'greater':
        return $date > $target;
      case 'less':
        return $date < $target;
      case 'greater_or_equal':
        return $date >= $target;
      case 'less_or_equal':
        return $date <= $target;
      default:
        return false;
    }
  }

  private static function isEmptyValue($value)
  {
    return '' === self::stripQuotes(self::scalarValue($value));
  }

  private static function scalarValue($value)
  {
    if (is_array($value)) {
      $value = reset($value);
    }
    return is_scalar($value) ? (string) $value : '';
  }

  private static function stripQuotes($value)
  {
    return trim(preg_replace('/^\s*[\'"]|[\'"]\s*$/', '', (string) $value));
  }
}
