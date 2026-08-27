<?php

namespace BitCode\BitForm\API\Controller;

use BitCode\BitForm\Core\Database\FormModel;
use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;

class EntryController extends WP_REST_Controller
{
  protected static $form;
  protected $formModel;
  protected $form_id;

  public function __construct()
  {
    $this->formModel = new FormModel();
  }

  // public function oneDriveAuth()
  // {
  //   $state = $_GET['state'];
  //   $code = urlencode($_GET['code']);
  //   // echo $code;
  //   if (wp_redirect($state . '&code=' . $code, 302)) {
  //     exit;
  //   }
  // }

  public function authRedirect(WP_REST_Request $request)
  {
    $state = $request->get_param('state');
    $site_url = $this->getDomain(get_site_url());
    $state_domain = $this->getDomain($state);

    // the refused domain is caller-supplied; echoing it back reflects attacker
    // input into the response of a public endpoint
    if ('' === $state_domain || $site_url !== $state_domain) {
      return new WP_Error('404', 'Invalid redirect URL');
    }

    $params = $request->get_params();
    unset($params['rest_route'], $params['state']);

    $redirect_url = $state . '&' . http_build_query($params);

    if (wp_safe_redirect($redirect_url, 302)) {
      exit;
    }
  }

  private function getDomain($url)
  {
    // these endpoints are public: a missing or non-URL state must not raise
    // notices, it must simply fail the same-origin comparison
    $parsed_url = is_string($url) && '' !== $url ? wp_parse_url($url) : false;
    if (!is_array($parsed_url) || empty($parsed_url['scheme']) || empty($parsed_url['host'])) {
      return '';
    }
    $domain = $parsed_url['scheme'] . '://' . $parsed_url['host'];
    $domain .= empty($parsed_url['port']) ? null : ':' . $parsed_url['port'];
    return $domain;
  }
}
