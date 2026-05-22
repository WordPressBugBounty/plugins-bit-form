<?php

// This file is included via Render::view() using extract(); all variables below are in the calling method's local scope, not global namespace.

use BitCode\BitForm\Core\Util\EscapingHelper;

if (!defined('ABSPATH')) {
  exit;
}
if (!defined('BITFORMS_ASSET_URI')) {
  exit;
}

$formUpdateVersion = get_option('bitform_form_update_version');
$formIdSafe = sanitize_key((string) $formID);

$bitformCssUrl = BITFORMS_UPLOAD_BASE_URL . '/form-styles/bitform-' . $formID . '.css';
$bitformFormIdCssUrl = BITFORMS_UPLOAD_BASE_URL . '/form-styles/bitform-' . $formID . '-formid.css';
$customCssSubPath = "/form-styles/bitform-custom-{$formID}.css";

wp_register_style('bitform-entry-edit-base-' . $formIdSafe, $bitformCssUrl, [], $formUpdateVersion);
wp_register_style('bitform-entry-edit-formid-' . $formIdSafe, $bitformFormIdCssUrl, [], $formUpdateVersion);
wp_enqueue_style('bitform-entry-edit-base-' . $formIdSafe);
wp_enqueue_style('bitform-entry-edit-formid-' . $formIdSafe);

if (file_exists(BITFORMS_CONTENT_DIR . $customCssSubPath)) {
  wp_register_style('bitform-entry-edit-custom-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $customCssSubPath, [], $formUpdateVersion);
  wp_enqueue_style('bitform-entry-edit-custom-' . $formIdSafe);
}

if (isset($font) && '' !== $font) {
  wp_register_style('bitform-entry-edit-font-' . $formIdSafe, $font, [], $formUpdateVersion);
  wp_enqueue_style('bitform-entry-edit-font-' . $formIdSafe);
}

$previewJsPath = BITFORMS_UPLOAD_BASE_URL . '/form-scripts/preview-' . $formID . '.js';
wp_register_script('bitform-entry-edit-' . $formIdSafe, $previewJsPath, [], $formUpdateVersion, true);
wp_enqueue_script('bitform-entry-edit-' . $formIdSafe);
if (isset($bfGlobals) && '' !== $bfGlobals) {
  wp_add_inline_script('bitform-entry-edit-' . $formIdSafe, (string) $bfGlobals, 'before');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($title) ? esc_html($title) : ''; ?></title>
  <style>
  html,
  body {
    min-height: 100%;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* background-color: #f1f1f1; */
  }

  ._frm-bg-b<?php echo esc_html($formID); ?> {
    width: 600px;
    margin-block: 100px;
  }
  </style>
  <?php if (isset($font) && '' !== $font) : ?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <?php endif; ?>
  <?php 
    wp_enqueue_emoji_styles();
    wp_print_styles(); 
  ?>
</head>

<body>
  <?php echo wp_kses($formHTML, EscapingHelper::getFormAllowedHtml(isset($formContent) ? $formContent : null)); ?>

  <?php wp_print_scripts(); ?>
</body>

</html>
