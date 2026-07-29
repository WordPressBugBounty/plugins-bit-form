<?php

/**
 * Public helper API for sibling Bit Apps plugins (currently consumed by Bit CRM).
 *
 * Exposed through the `bitform/api/*` filters registered in Core\Hooks\Hooks -
 * consumers should call apply_filters() with a null default instead of touching
 * this class directly, so an absent or older Bit Form can never fatal them.
 */

namespace BitCode\BitForm\Core\Api;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Admin\Form\AdminFormHandler;
use BitCode\BitForm\Admin\Form\AdminFormManager;
use WP_Error;

final class BitFormPublicApi
{
  public const CRM_INTEGRATION_TYPE = 'Bit CRM';

  /**
   * Forms that have a Bit CRM integration attached
   *
   * @return array[]|WP_Error items: {formId, formName, shortcode, createdAt, entriesCount,
   *                          formStatus, integrationId, integrationStatus, urls}
   */
  public static function getCrmIntegratedForms()
  {
    $permission = self::guard();
    if (is_wp_error($permission)) {
      return $permission;
    }

    global $wpdb;
    $rows = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT forms.id, forms.form_name, forms.status as form_status, forms.created_at,
                integ.id as integration_id, integ.status as integration_status,
                COUNT(entries.id) as entries_count
        FROM `{$wpdb->prefix}bitforms_integration` as integ
        INNER JOIN `{$wpdb->prefix}bitforms_form` as forms ON forms.id = integ.form_id
        LEFT JOIN `{$wpdb->prefix}bitforms_form_entries` as entries ON forms.id = entries.form_id
        WHERE integ.integration_type = %s AND integ.category = %s
        GROUP BY forms.id, forms.form_name, forms.status, forms.created_at, integ.id, integ.status",
        self::CRM_INTEGRATION_TYPE,
        'form'
      )
    );

    if (is_null($rows)) {
      return [];
    }

    $forms = [];
    foreach ($rows as $row) {
      $formId = (int) $row->id;
      $forms[] = [
        'formId'            => $formId,
        'formName'          => $row->form_name,
        'shortcode'         => '[bitform id="' . $formId . '"]',
        'createdAt'         => $row->created_at,
        'entriesCount'      => (int) $row->entries_count,
        'formStatus'        => (int) $row->form_status,
        'integrationId'     => (int) $row->integration_id,
        'integrationStatus' => (int) $row->integration_status,
        'urls'              => self::buildUrls($formId),
      ];
    }
    return $forms;
  }

  /**
   * Publish/unpublish a form (controls the form list toggle in Bit CRM)
   *
   * @param int $formId form id
   * @param int $status 1 published, 0 unpublished
   *
   * @return true|WP_Error
   */
  public static function toggleFormStatus($formId, $status)
  {
    $permission = self::guard();
    if (is_wp_error($permission)) {
      return $permission;
    }

    $formId = absint($formId);
    $status = absint($status) ? 1 : 0;
    if (empty($formId)) {
      return new WP_Error('bitform_invalid_args', __('Form id is required', 'bit-form'));
    }
    if (!(new AdminFormManager($formId))->isExist()) {
      return new WP_Error('bitform_not_found', __('Form not found', 'bit-form'));
    }

    // reuse the exact form-status handler the admin Form List uses (user tracking + validation)
    $result = (new AdminFormHandler())->changeFormStatus(
      ['id' => $formId, 'status' => $status ? 'true' : 'false'],
      (object) []
    );
    if (is_wp_error($result)) {
      // a 0-row update means the form already has the requested status - not a failure
      if ('result_empty' === $result->get_error_code()) {
        return true;
      }
      return $result;
    }
    if (!$result) {
      return new WP_Error('bitform_status_failed', __('Failed to change form status', 'bit-form'));
    }
    return true;
  }

  /**
   * Build the URL that opens the Bit Form builder to create a CRM-integrated form.
   *
   * A valid form cannot be built server-side: the builder's theme/style state
   * (themeVars/themeColors/style) is JCOF-encoded output of the React themeProvider,
   * generated in the browser from the template's JS data. So instead of inserting a
   * half-built row (which opens blank), we return a URL that drives the exact same
   * client flow as the template gallery's "Use Template" button. Bit CRM opens it in
   * a new tab; the builder loads the template, sets the title, attaches the Bit CRM
   * integration, and auto-saves. If a same-origin returnUrl is given, the tab then
   * navigates back to Bit CRM; otherwise the user stays in the editor on the new form.
   *
   * The flow is integration-agnostic. To auto-attach an integration to the new form,
   * pass an `integration` descriptor; Bit CRM sends {type: 'Bit CRM', config: {tagIds,
   * newTagTitles}}. Any plugin can drive the same flow with its own integration type.
   *
   * $args:
   *  - title        string  required, max 50 chars
   *  - templateSlug string  optional frontend template slug, default 'contact_form'
   *  - integration      array  optional {type: string, name?: string, config?: array}
   *  - returnUrl        string optional same-origin URL to return to after creation
   *  - closeAfterCreate bool   optional close the tab after save (needs a script-opened
   *                            tab, i.e. window.open); falls back to returnUrl if blocked
   *
   * @return array|WP_Error {createUrl}
   */
  public static function getCreateFormUrl($args)
  {
    $permission = self::guard();
    if (is_wp_error($permission)) {
      return $permission;
    }

    $args = (array) $args;
    $title = isset($args['title']) ? sanitize_text_field($args['title']) : '';
    if ('' === $title) {
      return new WP_Error('bitform_invalid_args', __('Form title is required', 'bit-form'));
    }
    if (strlen($title) > 50) {
      $title = substr($title, 0, 50);
    }
    $slug = empty($args['templateSlug']) ? 'contact_form' : sanitize_text_field($args['templateSlug']);

    // only allow a same-site returnUrl - never an open redirect to another host
    $returnUrl = '';
    if (!empty($args['returnUrl'])) {
      $candidate = esc_url_raw($args['returnUrl']);
      if ($candidate && wp_parse_url($candidate, PHP_URL_HOST) === wp_parse_url(site_url(), PHP_URL_HOST)) {
        $returnUrl = $candidate;
      }
    }

    $integration = '';
    if (!empty($args['integration']) && !empty($args['integration']['type'])) {
      $integration = wp_json_encode($args['integration']);
    }

    $query = array_filter(
      [
        'title'            => $title,
        'template'         => $slug,
        'integration'      => $integration,
        'returnUrl'        => $returnUrl,
        'closeAfterCreate' => empty($args['closeAfterCreate']) ? '' : '1',
      ],
      static function ($value) {
        return '' !== $value;
      }
    );

    // hash route consumed by the React ExternalFormCreate entry (see frontend-dev App.jsx)
    $createUrl = admin_url('admin.php?page=bitform') . '#/create-form?' . http_build_query($query);

    return ['createUrl' => $createUrl];
  }

  /**
   * Admin URLs of a form inside the Bit Form SPA
   *
   * @param int $formId
   *
   * @return array
   */
  public static function buildUrls($formId)
  {
    $formId = absint($formId);
    return [
      'editForm'        => admin_url('admin.php?page=bitform#/form/builder/edit/' . $formId . '/add-fields'),
      // per-integration deep link is index-based in the SPA, so link to the list
      'editIntegration' => admin_url('admin.php?page=bitform#/form/settings/edit/' . $formId . '/integrations'),
      'viewEntries'     => admin_url('admin.php?page=bitform#/form/responses/edit/' . $formId . '/'),
      'preview'         => site_url('/?bitform-form-view=' . $formId),
    ];
  }

  /**
   * Capability gate: never trust the caller's (e.g. Bit CRM REST) context
   *
   * @return true|WP_Error
   */
  private static function guard()
  {
    if (!current_user_can('manage_bitform') && !current_user_can('manage_options')) {
      return new WP_Error('bitform_forbidden', __('Insufficient permissions.', 'bit-form'));
    }
    return true;
  }
}
