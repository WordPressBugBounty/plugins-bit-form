<?php

namespace BitCode\BitForm;

use BitCode\BitForm\Core\Util\Log;

if (!\defined('ABSPATH')) {
  exit;
}

class GlobalHelper
{
  /**
   * Get all forms.
   *
   * @return array
   */
  public static function getForms()
  {
    global $wpdb;

    // Direct query: table name interpolation only (no user input). $wpdb->prepare() cannot parameterize table names.
    $allForms = $wpdb->get_results("SELECT forms.id,forms.entries as fm_entries,forms.form_name,forms.status,forms.views,forms.created_at,COUNT(entries.id) as entries
      FROM `{$wpdb->prefix}bitforms_form` as forms
      LEFT JOIN `{$wpdb->prefix}bitforms_form_entries` as entries ON forms.id = entries.form_id
      GROUP BY forms.id");

    if (is_wp_error($allForms)) {
      return $allForms;
    }
    $forms = array_reduce($allForms, function ($carry, $form) {
      $carry[$form->id] = $form->form_name . ' (' . $form->id . ')';
      return $carry;
    }, []);

    if (!empty($forms)) {
      $forms[0] = __('Select a Bitform', 'bit-form');
    }
    return $forms;
  }

  /**
   * Request data formatting.
   *
   * Receives raw data from ajax request and formats it into an object.
   * @param mixed $data
   * @return object
   */
  public static function formatRequestData(): object
  {
    // JSON body from AJAX request; nonce verified upstream by the calling AJAX handler before this method is invoked.
    // wp_unslash only — sanitize_text_field strips HTML tags and would destroy rich-text content (email template bodies).
    $data = isset($_POST['data']) ? wp_unslash($_POST['data']) : null;
    if (null === $data) {
      throw new \InvalidArgumentException('The "data" parameter is required.');
    }

    if (is_array($data)) {
      return (object) $data;
    }
    $userData = $data;
    $result = json_decode($userData);
    if (JSON_ERROR_NONE !== json_last_error()) {
      throw new \InvalidArgumentException('Invalid JSON provided in data.');
    }
    if ('object' !== gettype($result)) {
      $emptyObject = new \stdClass();
      Log::debug_log([
        'message'=> 'Invalid JSON provided in data. Returning empty object.',
        'data'   => $userData,
        'result' => $result,
        'type'   => gettype($result)
      ]);
      return $emptyObject;
    }
    return $result;

    // // Normalize to array
    // if (is_string($userData)) {
    //   $decoded = json_decode($userData, true);
    //   if (JSON_ERROR_NONE !== json_last_error()) {
    //     throw new \InvalidArgumentException('Invalid JSON provided in data.');
    //   }
    //   $userData = $decoded ?? [];
    // } elseif (is_object($userData)) {
    //   $userData = (array) $userData;
    // }

    // if (!is_array($userData)) {
    //   // You may want to throw here instead of returning empty object
    //   return new \stdClass();
    // }

    // // Recursive sanitizer — always returns objects
    // $sanitizeRecursive = function ($value) use (&$sanitizeRecursive) {
    //   if (is_array($value)) {
    //     $clean = new \stdClass();
    //     foreach ($value as $k => $v) {
    //       $clean->$k = $sanitizeRecursive($v);
    //     }
    //     return $clean;
    //   } elseif (is_object($value)) {
    //     $clean = new \stdClass();
    //     foreach ($value as $k => $v) {
    //       $clean->$k = $sanitizeRecursive($v);
    //     }
    //     return $clean;
    //   } else {
    //     return sanitize_text_field($value);
    //   }
    // };

    // return $sanitizeRecursive($userData); // already an object
  }

  public static function requirePostMethod(): void
  {
    if (!isset($_SERVER['REQUEST_METHOD']) || 'POST' !== sanitize_text_field(wp_unslash($_SERVER['REQUEST_METHOD']))) {
      Log::debug_log('Invalid request method. POST required.');
      wp_send_json_error(__('Invalid request method. POST required.', 'bit-form'), 405);
      return;
    }
  }

  public static function sanitize_files_input(array $files): array
  {
    $sanitized = [];
    foreach ($files as $field_key => $file_data) {
      $field_key = sanitize_key((string) $field_key);
      if (!isset($file_data['name'])) {
        continue;
      }
      if (is_array($file_data['name'])) {
        $sanitized[$field_key] = [
          'name'     => array_map(function ($v) {
            return is_array($v) ? array_map('sanitize_file_name', $v) : sanitize_file_name((string) $v);
          }, $file_data['name']),
          'type'     => array_map(function ($v) {
            return is_array($v) ? array_map('sanitize_mime_type', $v) : sanitize_mime_type((string) $v);
          }, $file_data['type']),
          'tmp_name' => array_map(function ($v) {
            return is_array($v) ? array_map('sanitize_text_field', $v) : sanitize_text_field((string) $v);
          }, $file_data['tmp_name']),
          'error'    => array_map(function ($v) {
            return is_array($v) ? array_map('absint', $v) : absint($v);
          }, $file_data['error']),
          'size'     => array_map(function ($v) {
            return is_array($v) ? array_map('absint', $v) : absint($v);
          }, $file_data['size']),
        ];
        if (isset($file_data['full_path'])) {
          $sanitized[$field_key]['full_path'] = array_map(function ($v) {
            return is_array($v) ? array_map('sanitize_text_field', $v) : sanitize_text_field((string) $v);
          }, $file_data['full_path']);
        }
        if (isset($file_data['new_name'])) {
          $sanitized[$field_key]['new_name'] = array_map(function ($v) {
            return is_array($v) ? array_map('sanitize_file_name', $v) : sanitize_file_name((string) $v);
          }, $file_data['new_name']);
        }
        if (isset($file_data['file_path'])) {
          $sanitized[$field_key]['file_path'] = array_map(function ($v) {
            return is_array($v) ? array_map('sanitize_text_field', $v) : sanitize_text_field((string) $v);
          }, $file_data['file_path']);
        }
      } else {
        $sanitized[$field_key] = [
          'name'     => sanitize_file_name($file_data['name']),
          'type'     => sanitize_mime_type($file_data['type']),
          'tmp_name' => sanitize_text_field($file_data['tmp_name']),
          'error'    => absint($file_data['error']),
          'size'     => absint($file_data['size']),
        ];
        if (isset($file_data['full_path'])) {
          $v = $file_data['full_path'];
          $sanitized[$field_key]['full_path'] = is_array($v) ? array_map('sanitize_text_field', $v) : sanitize_text_field($v);
        }
        if (isset($file_data['new_name'])) {
          $v = $file_data['new_name'];
          $sanitized[$field_key]['new_name'] = is_array($v) ? array_map('sanitize_file_name', $v) : sanitize_file_name($v);
        }
        if (isset($file_data['file_path'])) {
          $v = $file_data['file_path'];
          $sanitized[$field_key]['file_path'] = is_array($v) ? array_map('sanitize_text_field', $v) : sanitize_text_field($v);
        }
      }
    }
    return $sanitized;
  }
}
