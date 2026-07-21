<?php

namespace BitCode\BitForm\Core\Util;

use BitCode\BitForm\Admin\Form\Helpers;

final class Utilities
{
  public static function isPro()
  {
    // IMPORTANT:
    // For wp.org (free) distribution we treat "Pro" as "Pro addon is installed/active".
    // License enforcement must live inside the Pro addon, not in the free plugin.
    return class_exists('BitCode\\BitFormPro\\Plugin');
  }

  /**
   * Kept for backward compatibility where the free plugin needs to know if a Pro
   * license is marked active. Prefer checking license inside the Pro addon.
   */
  public static function isProLicensed(): bool
  {
    if (!self::isPro()) {
      return false;
    }
    if (class_exists('BitCode\\BitFormPro\\Core\\Util\\LicenseHelper')) {
      return \BitCode\BitFormPro\Core\Util\LicenseHelper::hasValidLicense();
    }
    $integrateData = get_option('bitformpro_integrate_key_data');

    return !empty($integrateData)
      && is_array($integrateData)
      && !empty($integrateData['status'])
      && 'success' === $integrateData['status'];
  }

  public static function getRealPath($dir, $name)
  {
    if (!isset($dir)) {
      return false;
    }
    $directories = array_diff(scandir($dir), ['..', '.']);
    $name = strtolower($name);

    foreach ($directories as $directory) {
      $dirLower = strtolower($directory);
      if ($dirLower === $name) {
        return $directory;
      }
    }

    return false;
  }

  public static function getFileNameExceptExtension($filename)
  {
    $path_parts = pathinfo($filename);
    return $path_parts['filename'];
  }

  public static function styleGenerator($styleObj, $important = false)
  {
    if (is_array($styleObj)) {
      $styleObj = json_decode(wp_json_encode($styleObj));
    }
    $important = $important ? '!important' : '';
    $classes = array_keys((array) $styleObj);
    $css = '';
    foreach ($classes as $class) {
      $css .= $class;
      $props = (array) $styleObj->{$class};
      $propsKeys = array_keys($props);
      $styleObject = '{';
      foreach ($propsKeys as $property) {
        $value = $props[$property];
        if (empty($value)) {
          continue;
        }
        if (is_object($value)) {
          continue;
        }
        $styleObject .= "{$property}:{$value}{$important};";
      }
      $styleObject = rtrim($styleObject, ';');
      $styleObject .= '}';
      $css .= $styleObject;
    }

    return $css;
  }

  public static function convertToCSS(array $styles): string
  {
    $css = '';

    foreach ($styles as $selector => $properties) {
      $css .= "$selector{";

      // Check if the properties are an array, meaning it's a nested rule (e.g., media queries, keyframes)
      if (is_array($properties)) {
        // If it's a nested array (media query or keyframe), recursively handle it
        foreach ($properties as $property => $value) {
          if (is_array($value)) {
            // Recursively process nested arrays (media queries, keyframes, etc.)
            $css .= self::convertToCSS([$property => $value]);
          } else {
            // Regular CSS property
            $css .= "$property:$value;";
          }
        }
      }

      $css .= '}';
    }

    return $css;
  }

  public static function appendCSS($formId, $css, $mode = 'a')
  {
    $fileName = '';
    $path = '';
    $path = 'form-styles';
    $fileName = "bitform-{$formId}.css";
    Helpers::saveFile($path, $fileName, $css, $mode);
    $fileName = "bitform-{$formId}-formid.css";
    Helpers::saveFile($path, $fileName, $css, $mode);
  }

  /**
   * First row of a Model/get() style result, or null when the lookup failed
   * (WP_Error), returned an empty set, or has no index 0. Prevents
   * "Attempt to read property on null" when dereferencing $result[0]->col.
   *
   * @param mixed $result
   * @return object|null
   */
  public static function firstRow($result)
  {
    if (is_wp_error($result) || empty($result) || !isset($result[0])) {
      return null;
    }
    return $result[0];
  }

  /**
   * Decode a JSON string to an object, guaranteed to return object|null so
   * downstream `$obj->prop ?? default` reads never emit an undefined-property
   * warning. Returns null for non-strings, empty strings and malformed JSON.
   *
   * @param mixed $json
   * @return object|null
   */
  public static function jsonObj($json)
  {
    if (!is_string($json) || '' === $json) {
      return null;
    }
    $decoded = json_decode($json);
    return is_object($decoded) ? $decoded : null;
  }

  public static function duplicateDbTable($oldTableName, $newTableName)
  {
    global $wpdb;
    $oldTable = "{$wpdb->prefix}bitforms_{$oldTableName}";
    $newTable = "{$wpdb->prefix}bitforms_{$newTableName}";
    // Schema operation: table name interpolation only (no user input). $wpdb->prepare() cannot parameterize DDL statements.
    $wpdb->query("CREATE TABLE IF NOT EXISTS `{$newTable}` LIKE `{$oldTable}`");
    $wpdb->query("INSERT INTO `{$newTable}` SELECT * FROM `{$oldTable}`");
  }
}
