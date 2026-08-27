<?php

/**
 * WooCommerce Record Api
 *
 */

namespace BitCode\BitForm\Core\Integration\WooCommerce;

use BitCode\BitForm\Core\Database\FormEntryLogModel;
use BitCode\BitForm\Core\Util\ApiResponse as UtilApiResponse;
use BitCode\BitForm\Core\Util\FileHandler;
use WC_Product_Download;
use WP_Error;

/**
 * Provide functionality for Record insert,upsert
 */
class RecordApiHelper
{
  private $_integrationID;

  private $_logID;

  private $_logResponse;

  public function __construct($integId, $logID)
  {
    $this->_integrationID = $integId;
    $this->_logID = $logID;
    $this->_logResponse = new UtilApiResponse();
  }

  public function executeRecordApi($formID, $entryID, $module, $fieldValues, $fieldMap, $uploadFieldMap, $required)
  {
    $entryDetails = [
      'formId'      => $formID,
      'entryId'     => $entryID,
      'fieldValues' => $fieldValues
    ];
    $fieldData = [];
    foreach ($fieldMap as $fieldPair) {
      if (!empty($fieldPair->wcField) && !empty($fieldPair->formField)) {
        if ('custom' === $fieldPair->formField && isset($fieldPair->customValue)) {
          $fieldData[$fieldPair->wcField] = $fieldPair->customValue;
        } else {
          $fieldData[$fieldPair->wcField] = $fieldValues[$fieldPair->formField];
        }

        if (in_array($fieldPair->wcField, $required) && empty($fieldValues[$fieldPair->formField])) {
          /* translators: %1$s: field name, %2$s: WooCommerce module name. */
          $error = new WP_Error('REQ_FIELD_EMPTY', wp_sprintf(__('%1$s is required for woocommerce %2$s', 'bit-form'), $fieldPair->wcField, $module));
          $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => $module, 'type_name' => 'create'], 'validation', $error, $entryDetails);
          return $error;
        }
      }
    }

    $model = new FormEntryLogModel();
    $result = $model->entryLogCheck($entryID, $this->_integrationID);

    $entry_type = 'create';

    if (count($result) && !isset($result->errors['result_empty'])) {
      $entry_type = 'edit';
      $api_type = json_decode($result[0]->api_type);

      if ($api_type->type === $module) {
        $id = $result[0]->response_obj;
      }
    }

    if ('product' === $module) {
      if (!empty($fieldData['tags_input'])) {
        $tags = explode(',', $fieldData['tags_input']);
        unset($fieldData['tags_input']);
      }

      if (!empty($fieldData['post_category'])) {
        $categories = explode(',', $fieldData['post_category']);
        unset($fieldData['post_category']);
      }

      if (!empty($fieldData['_regular_price'])) {
        $price = $fieldData['_regular_price'];
      }

      if (!empty($fieldData['_sale_price'])) {
        $price = $fieldData['_sale_price'];
      }

      if (!empty($fieldData['product_type'])) {
        $product_type = $fieldData['product_type'];
        if ('external' === $product_type && !empty($fieldData['_product_url'])) {
          $product_type = 'external';
        } else {
          $product_type = 'simple';
          unset($fieldData['_product_url'], $fieldData['_button_text']);
        }
        unset($fieldData['product_type']);
      }

      $post_fields = [
        'post_content', 'post_title', 'post_status', 'post_type', 'comment_status', 'post_password', 'menu_order', 'post_excerpt', 'post_date', 'post_date_gmt'
      ];

      $post_inputs = array_intersect_key($fieldData, array_flip($post_fields));
      $meta_inputs = array_diff_key($fieldData, array_flip($post_fields));

      $fieldData = $post_inputs;
      $fieldData['post_type'] = $module;
      $fieldData['meta_input'] = $meta_inputs;

      if (!empty($fieldData['post_date']) || !empty($fieldData['post_date_gmt'])) {
        $fieldData['post_status'] = 'future';
      }

      if (isset($id)) {
        $fieldData['ID'] = $id;
      }

      $product_id = wp_insert_post($fieldData);

      if (isset($product_type)) {
        wp_set_object_terms($product_id, $product_type, 'product_type');
      }

      if (isset($price)) {
        update_post_meta($product_id, '_price', $price);
      }

      if (isset($categories)) {
        wp_set_object_terms($product_id, $categories, 'product_cat');
      }

      if (isset($tags)) {
        wp_set_object_terms($product_id, $tags, 'product_tag');
      }

      if (is_wp_error($product_id) || !$product_id) {
        $response = is_wp_error($product_id) ? $product_id->get_error_message() : 'error';
        return $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => 'product', 'type_name' => $entry_type], 'error', $response, $entryDetails);
      } else {
        $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => 'product', 'type_name' => $entry_type], 'success', $product_id, $entryDetails);
      }
    }

    if ('customer' === $module) {
      $user_fields = ['user_pass', 'user_login', 'user_nicename', 'user_url', 'user_email', 'display_name', 'nickname', 'first_name', 'last_name', 'description', 'locale'];

      $user_inputs = array_intersect_key($fieldData, array_flip($user_fields));
      $meta_inputs = array_diff_key($fieldData, array_flip($user_fields));

      $fieldData = $user_inputs;
      $fieldData['role'] = $module;

      if (isset($id)) {
        $fieldData['ID'] = $id;
      }

      $user_id = wp_insert_user($fieldData);

      if (is_wp_error($user_id) || !$user_id) {
        $response = is_wp_error($user_id) ? $user_id->get_error_message() : 'error';
        return $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => 'customer', 'type_name' => $entry_type], 'error', $response, $entryDetails);
      } else {
        $this->_logResponse->apiResponse($this->_logID, $this->_integrationID, ['type' => 'customer', 'type_name' => $entry_type], 'success', $user_id, $entryDetails);
      }

      foreach ($meta_inputs as $metaKey => $metaValue) {
        update_user_meta($user_id, $metaKey, $metaValue);
      }

      // Fires WooCommerce core hook so other WC extensions can react to the customer update.
      do_action('woocommerce_update_customer',  $user_id);
    }

    $flag = null;
    if (isset($product_id)) {
      $basepath = FileHandler::getEntriesFileUploadDir($formID, $entryID) . DIRECTORY_SEPARATOR;

      foreach ($uploadFieldMap as $uploadField) {
        if (!empty($uploadField->formField) && !empty($uploadField->wcField)) {
          if ('product_image' === $uploadField->wcField) {
            $flag = 0;
          }
          if ('product_gallery' === $uploadField->wcField) {
            $flag = 1;
          }
          if ('downloadable_files' === $uploadField->wcField) {
            $flag = 2;
          }

          $attach_ids = '';

          if (!empty($fieldValues[$uploadField->formField])) {
            $uplaodFiles = $fieldValues[$uploadField->formField];
            if ('string' === gettype($fieldValues[$uploadField->formField])) {
              $decoded = json_decode($fieldValues[$uploadField->formField]);
              $uplaodFiles = is_null($decoded) ? $uplaodFiles : $decoded;
            }
            // Field values may arrive as public file URLs (see IntegrationHandler::handleFileUrl),
            // so reduce each to the stored file name before resolving against the entry directory.
            if (is_array($uplaodFiles)) {
              foreach ($uplaodFiles as $singleFile) {
                $singleFile = basename(wp_parse_url($singleFile, PHP_URL_PATH) ?: $singleFile);
                $url = $basepath . $singleFile;
                $attach_id = $this->attach_product_attachments($product_id, $flag, $url, $singleFile);
                if (1 === $flag && $attach_id) {
                  $attach_ids .= ',' . $attach_id;
                }
              }
            } else {
              $filename = basename(wp_parse_url($uplaodFiles, PHP_URL_PATH) ?: $uplaodFiles);
              $url = $basepath . $filename;
              $this->attach_product_attachments($product_id, $flag, $url, $filename);
            }
          }

          if (1 === $flag) {
            update_post_meta($product_id, '_product_image_gallery', $attach_ids);
          }
        }
      }
    }
  }

  public function upload_attachment($product_id, $url)
  {
    require_once ABSPATH . 'wp-admin/includes/image.php';

    $image_data = self::readImageData($url);
    if (empty($image_data)) {
      return null;
    }

    $image_name = basename(wp_parse_url($url, PHP_URL_PATH) ?: $url);

    $upload_dir = wp_upload_dir();
    $unique_file_name = wp_unique_filename($upload_dir['path'], $image_name);
    $filename = basename($unique_file_name);

    if (wp_mkdir_p($upload_dir['path'])) {
      $file = $upload_dir['path'] . '/' . $filename;
    } else {
      $file = $upload_dir['basedir'] . '/' . $filename;
    }
    file_put_contents($file, $image_data);

    $wp_filetype = wp_check_filetype($filename, null);

    $attachment = [
      'post_mime_type' => $wp_filetype['type'],
      'post_title'     => sanitize_file_name($filename),
      'post_content'   => '',
      'post_status'    => 'inherit'
    ];

    $attach_id = wp_insert_attachment($attachment, $file, $product_id);

    $attach_data = wp_generate_attachment_metadata($attach_id, $file);

    wp_update_attachment_metadata($attach_id, $attach_data);

    return $attach_id;
  }

  /**
   * Read a mapped image, preferring the local file over any network request.
   *
   * The mapped value is an absolute path inside the entry's upload directory, so
   * an HTTP fetch never resolved it: both wp_remote_get() and wp_safe_remote_get()
   * reject a schemeless URL.
   *
   * @param string $url Absolute path, uploads URL, or external URL
   *
   * @return string|null Raw image bytes, or null when it can't be read
   */
  private static function readImageData($url)
  {
    $localPath = self::resolveLocalUploadPath($url);

    if (!is_null($localPath)) {
      $contents = file_get_contents($localPath);
      return false === $contents ? null : $contents;
    }

    if (!self::isSafeRemoteUrl($url)) {
      return null;
    }

    $response = wp_safe_remote_get($url);
    if (is_wp_error($response) || 200 !== wp_remote_retrieve_response_code($response)) {
      return null;
    }

    $body = wp_remote_retrieve_body($response);

    return '' === $body ? null : $body;
  }

  /**
   * Whether a remote URL is safe to fetch from a submitted value.
   *
   * The ranges wp_safe_remote_get() rejects depend on the WordPress version —
   * link-local 169.254.0.0/16 (cloud metadata) reached core's list long after
   * 6.5, which the plugin still supports. Checked here for one behaviour on
   * every version; wp_safe_remote_get() still runs afterwards.
   *
   * DNS rebinding stays open: pinning the request to the resolved address is
   * not something the WP HTTP API exposes.
   *
   * @param string $url
   *
   * @return bool
   */
  private static function isSafeRemoteUrl($url)
  {
    $parts = wp_parse_url($url);

    if (empty($parts['host']) || empty($parts['scheme'])) {
      return false;
    }
    if (!\in_array(strtolower($parts['scheme']), ['http', 'https'], true)) {
      return false;
    }
    if (isset($parts['user']) || isset($parts['pass'])) {
      return false;
    }
    if (isset($parts['port']) && !\in_array((int) $parts['port'], [80, 443, 8080], true)) {
      return false;
    }

    $host = trim($parts['host'], '[].');

    if (filter_var($host, FILTER_VALIDATE_IP)) {
      $ip = $host;
    } else {
      $ip = gethostbyname($host);
      // gethostbyname() returns the host unchanged when it cannot resolve
      if ($ip === $host) {
        return false;
      }
    }

    // NO_PRIV covers 10/8, 172.16/12, 192.168/16, fc00::/7;
    // NO_RES covers 0/8, 127/8, 169.254/16, 240/4, ::1, fe80::/10.
    if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
      return false;
    }

    // 100.64.0.0/10 (CGNAT) and 224.0.0.0/4 (multicast): missed by both flags.
    $octets = array_map('intval', explode('.', $ip));
    if (4 === \count($octets)) {
      if ((100 === $octets[0] && 64 <= $octets[1] && 127 >= $octets[1])
        || (224 <= $octets[0] && 239 >= $octets[0])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Resolve a mapped value to a readable file inside this site's uploads directory.
   *
   * Takes an absolute filesystem path (what the field mapping passes) or a URL
   * under the uploads base. Anything escaping the uploads directory returns null
   * and is treated as remote.
   *
   * @param mixed $url Mapped submission value; not guaranteed to be a string
   *
   * @return string|null Absolute readable path, or null
   */
  private static function resolveLocalUploadPath($url)
  {
    if (!is_string($url) || '' === $url) {
      return null;
    }

    $uploads = wp_upload_dir();
    if (!empty($uploads['error']) || empty($uploads['basedir'])) {
      return null;
    }

    $baseDir = realpath($uploads['basedir']);
    if (false === $baseDir) {
      return null;
    }
    $baseDir = wp_normalize_path($baseDir);

    $scheme = wp_parse_url($url, PHP_URL_SCHEME);
    $candidate = null;

    if (empty($scheme)) {
      // how the mapped value actually arrives
      $candidate = $url;
    } elseif (!empty($uploads['baseurl'])) {
      // defensive: a caller passing the file's public URL instead
      $basePath = wp_parse_url($uploads['baseurl'], PHP_URL_PATH);
      $urlPath = wp_parse_url($url, PHP_URL_PATH);
      $baseHost = wp_parse_url($uploads['baseurl'], PHP_URL_HOST);
      $host = wp_parse_url($url, PHP_URL_HOST);

      if (
        !empty($basePath) && !empty($urlPath) && !empty($host)
        && strtolower($host) === strtolower((string) $baseHost)
      ) {
        $basePath = rtrim($basePath, '/') . '/';
        if (0 === strpos($urlPath, $basePath)) {
          $candidate = $uploads['basedir'] . DIRECTORY_SEPARATOR . rawurldecode(substr($urlPath, \strlen($basePath)));
        }
      }
    }

    if (is_null($candidate)) {
      return null;
    }

    $resolved = realpath($candidate);
    if (false === $resolved) {
      return null;
    }
    $resolved = wp_normalize_path($resolved);

    // realpath() collapsed any traversal; confirm it stayed inside
    if (0 !== strpos($resolved, rtrim($baseDir, '/') . '/')) {
      return null;
    }

    return is_file($resolved) && is_readable($resolved) ? $resolved : null;
  }

  public function attach_product_attachments($product_id, $flag, $url, $filename)
  {
    $attach_id = $this->upload_attachment($product_id, $url);
    if (0 === $flag) {
      set_post_thumbnail($product_id, $attach_id);
    }

    if (1 === $flag) {
      return $attach_id;
    }

    if (2 === $flag) {
      $this->attach_downloadable_attachments($product_id, $url, $filename);
    }
  }

  public function attach_downloadable_attachments($product_id, $url, $filename)
  {
    if ('yes' !== get_post_meta($product_id, '_downloadable', true)) {
      return false;
    }

    require_once dirname(WC_PLUGIN_FILE) . '/includes/wc-product-functions.php';

    $attach_id = $this->upload_attachment($product_id, $url);
    $download_id = md5($url);
    $file_url = wp_get_attachment_url($attach_id);

    $pd_object = new WC_Product_Download();
    $pd_object->set_id($download_id);
    $pd_object->set_name($filename);
    $pd_object->set_file($file_url);

    $product = wc_get_product($product_id);

    $downloads = $product->get_downloads();
    $downloads[$download_id] = $pd_object;

    $product->set_downloads($downloads);
    $product->save();
  }
}
