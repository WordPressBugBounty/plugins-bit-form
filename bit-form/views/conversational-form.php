<?php

// This file is included via Render::view() using extract(); all variables below are in the calling method's local scope, not global namespace.

use BitCode\BitForm\Core\Util\EscapingHelper;

if (!defined('ABSPATH')) {
  exit;
}
if (!defined('BITFORMS_ASSET_URI')) {
  exit;
}

$formUpdateVersion = get_option('bit-form_form_update_version');
$formIdSafe = sanitize_key((string) $formID);

$baseCSSPath = "/form-styles/bitform-{$formID}.css";
$baseConversationalCSSPath = "/form-styles/bitform-conversational-{$formID}.css";
$customCSSPath = "/form-styles/bitform-custom-{$formID}.css";
$standaloneCSSPath = "/form-styles/bitform-standalone-{$formID}.css";

wp_register_style('bitform-conversational-base-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $baseCSSPath, [], $formUpdateVersion);
wp_register_style('bitform-conversational-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $baseConversationalCSSPath, [], $formUpdateVersion);
wp_enqueue_style('bitform-conversational-base-' . $formIdSafe);
wp_enqueue_style('bitform-conversational-' . $formIdSafe);

if (file_exists(BITFORMS_CONTENT_DIR . $customCSSPath)) {
  wp_register_style('bitform-conversational-custom-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $customCSSPath, [], $formUpdateVersion);
  wp_enqueue_style('bitform-conversational-custom-' . $formIdSafe);
}

if (file_exists(BITFORMS_CONTENT_DIR . $standaloneCSSPath)) {
  wp_register_style('bitform-conversational-standalone-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $standaloneCSSPath, [], $formUpdateVersion);
  wp_enqueue_style('bitform-conversational-standalone-' . $formIdSafe);
}

if (isset($font) && '' !== $font) {
  wp_register_style('bitform-conversational-font-' . $formIdSafe, $font, [], $formUpdateVersion);
  wp_enqueue_style('bitform-conversational-font-' . $formIdSafe);
}

$conversationalJsPath = BITFORMS_UPLOAD_BASE_URL . '/form-scripts/bitform-conversational-' . $formID . '.js';
wp_register_script('bitform-conversational-' . $formIdSafe, $conversationalJsPath, [], $formUpdateVersion, true);
wp_enqueue_script('bitform-conversational-' . $formIdSafe);
if (isset($bfGlobals) && '' !== $bfGlobals) {
  wp_add_inline_script('bitform-conversational-' . $formIdSafe, (string) $bfGlobals, 'before');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($title) ? esc_html($title) : 'Conversational Form'; ?></title>
  <style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body.bit-conversational-form {
    height: 100vh;
    overflow: hidden;
  }

  @media (max-width: 575.98px) {
    .standalone-form-wrapper {
      width: 100%;
    }
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

<body class="bit-conversational-form">
  <?php echo wp_kses($formHTML, EscapingHelper::getFormAllowedHtml(isset($formContent) ? $formContent : null)); ?>
  <?php wp_print_scripts(); ?>
</body>

</html>
