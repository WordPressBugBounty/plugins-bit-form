<?php

namespace BitCode\BitForm\API\Route;

use BitCode\BitForm\API\Controller\EntryController;
use BitCode\BitForm\API\Controller\FileController;
use BitCode\BitForm\Core\Database\FormEntryModel;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Server;

class Routes extends WP_REST_Controller
{
  private $entryController;

  protected $namespace;

  protected $rest_base;

  protected $fileController;

  public function __construct()
  {
    $this->namespace = 'bitform';
    $this->rest_base = 'v1';
    $this->entryController = new EntryController();
    $this->fileController = new FileController();
  }

  public function register_routes()
  {
    // OAuth callback endpoints. Must be publicly accessible: third-party OAuth providers
    // redirect to these URLs after authorization. Authorization is enforced inside
    // authRedirect() via wp_safe_redirect() and same-domain validation of the state parameter.
    register_rest_route(
      $this->namespace,
      $this->rest_base . '/oauth-redirect/',
      [
        [
          'method'             => WP_REST_Server::READABLE,
          'callback'           => [$this->entryController, 'authRedirect'],
          'permission_callback'=> '__return_true'
        ]
      ]
    );

    register_rest_route(
      $this->namespace,
      $this->rest_base . '/google/',
      [
        [
          'methods'             => WP_REST_Server::READABLE,
          'callback'            => [$this->entryController, 'authRedirect'],
          'permission_callback' => '__return_true'
        ]

      ]
    );
    register_rest_route(
      $this->namespace,
      $this->rest_base . '/oneDrive/',
      [
        [
          'methods'             => WP_REST_Server::READABLE,
          'callback'            => [$this->entryController, 'authRedirect'],
          'permission_callback' => '__return_true'
        ]

      ]
    );

    register_rest_route(
      $this->namespace,
      $this->rest_base . '/zoho/',
      [
        [
          'methods'             => WP_REST_Server::READABLE,
          'callback'            => [$this->entryController, 'authRedirect'],
          'permission_callback' => '__return_true'
        ]

      ]
    );

    register_rest_route(
      $this->namespace,
      $this->rest_base . '/bitform-file-download/',
      [
        [
          'methods'             => WP_REST_Server::READABLE,
          'callback'            => [$this->fileController, 'handleFileDownload'],
          'permission_callback' => [$this, 'file_download_permissions_check']
        ]
      ]
    );
  }

  public function file_download_permissions_check(WP_REST_Request $request)
  {
    if (!is_user_logged_in()) {
      return new \WP_Error(
        'rest_forbidden',
        __('You do not have permission to access this file.', 'bit-form'),
        ['status' => 401]
      );
    }

    if (current_user_can('manage_options')) {
      return true;
    }

    $formID = absint($request->get_param('formID'));
    $entryID = absint($request->get_param('entryID'));

    if (empty($formID) || empty($entryID)) {
      return new \WP_Error(
        'rest_forbidden',
        __('You do not have permission to access this file.', 'bit-form'),
        ['status' => 403]
      );
    }

    $entryModel = new FormEntryModel();
    $entry = $entryModel->get('id', [
      'id'      => $entryID,
      'form_id' => $formID,
      'user_id' => get_current_user_id(),
    ]);

    if (is_wp_error($entry) || empty($entry)) {
      return new \WP_Error(
        'rest_forbidden',
        __('You do not have permission to access this file.', 'bit-form'),
        ['status' => 403]
      );
    }

    return true;
  }
}
