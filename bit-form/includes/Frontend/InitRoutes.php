<?php

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Frontend\CustomRoutes;
use BitCode\BitForm\Frontend\FormEntryView;
use BitCode\BitForm\Frontend\StandaloneFormView;

$bitforms_routes = new CustomRoutes();
// $bitforms_routes->add('bitform-form-view/([0-9]+)/?', [StandaloneFormView::class, 'preview']);
// $bitforms_routes->add('bitform-form-entry-edit/([0-9]+)/?([0-9]+)/?', [FormEntryView::class, 'preview']);

// if (class_exists('\BitCode\BitFormPro\Admin\DownloadFile')) {
//   $routes->add('bitform-download-file', [\BitCode\BitFormPro\Admin\DownloadFile::class, 'download']); // for all users
//   $routes->add('bitform-download-pdf', [\BitCode\BitFormPro\Admin\DownloadFile::class, 'adminDownloadPDF']); // for admin users
// }

add_action('template_redirect', function () {
  // form preview
  // url structure = siteurl/?bitform-form-view=2
  if (isset($_REQUEST['bitform-form-view'])) {
    StandaloneFormView::preview();
    exit;
  }

  // form entry edit
  // url structure = siteurl/?bitform-form-entry-edit=1&formid=3&entryid=23
  if (isset($_REQUEST['bitform-form-entry-edit'], $_REQUEST['formId'], $_REQUEST['entryId']) && 1 === intval(sanitize_text_field(wp_unslash($_REQUEST['bitform-form-entry-edit'])))) {
    FormEntryView::preview();
    exit;
  }

  //pdf file preview
  //url structure = siteurl/?bitform-download-pdf=1&formID=1&pdftemp=1&entryId=35
  if (
    (isset($_REQUEST['bitform-download-pdf'], $_REQUEST['formID'], $_REQUEST['pdftemp'],$_REQUEST['entryId']) ||
      isset($_REQUEST['bitform-download-file'], $_REQUEST['token']))
     && class_exists('\BitCode\BitFormPro\Admin\DownloadFile')) {
    // admin download pdf
    if (1 === intval(sanitize_text_field(wp_unslash($_REQUEST['bitform-download-pdf']))) && !isset($_REQUEST['bitform-download-file'])) {
      \BitCode\BitFormPro\Admin\DownloadFile::adminDownloadPDF();
      exit;
    }

    // all user
    if (1 === intval(sanitize_text_field(wp_unslash($_REQUEST['bitform-download-file']))) && !isset($_REQUEST['bitform-download-pdf'])) {
      \BitCode\BitFormPro\Admin\DownloadFile::download();
      exit;
    }
  }
});
