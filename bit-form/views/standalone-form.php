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
$customCSSPath = "/form-styles/bitform-custom-{$formID}.css";
$standaloneCSSPath = "/form-styles/bitform-standalone-{$formID}.css";

wp_register_style('bitform-standalone-base-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $baseCSSPath, [], $formUpdateVersion);
wp_enqueue_style('bitform-standalone-base-' . $formIdSafe);

if (file_exists(BITFORMS_CONTENT_DIR . $customCSSPath)) {
  wp_register_style('bitform-standalone-custom-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $customCSSPath, [], $formUpdateVersion);
  wp_enqueue_style('bitform-standalone-custom-' . $formIdSafe);
}

if (file_exists(BITFORMS_CONTENT_DIR . $standaloneCSSPath)) {
  wp_register_style('bitform-standalone-extra-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $standaloneCSSPath, [], $formUpdateVersion);
  wp_enqueue_style('bitform-standalone-extra-' . $formIdSafe);
}

if (isset($font) && '' !== $font) {
  wp_register_style('bitform-standalone-font-' . $formIdSafe, $font, [], $formUpdateVersion);
  wp_enqueue_style('bitform-standalone-font-' . $formIdSafe);
}

$previewJsPath = BITFORMS_UPLOAD_BASE_URL . '/form-scripts/preview-' . $formID . '.js';
wp_register_script('bitform-standalone-' . $formIdSafe, $previewJsPath, [], $formUpdateVersion, true);
wp_enqueue_script('bitform-standalone-' . $formIdSafe);
if (isset($bfGlobals) && '' !== $bfGlobals) {
  wp_add_inline_script('bitform-standalone-' . $formIdSafe, (string) $bfGlobals, 'before');
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
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .standalone-form-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .standalone-form-wrapper {
    width: 40%;
    /* Additional styling for the container, if needed */
  }

  @media (max-width: 575.98px) {
    .standalone-form-wrapper {
      width: 100%;
    }
  }

  ._frm-bg-b<?php echo esc_html($formID); ?> {
    width: 100%;
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
  <div class="standalone-form-container">
    <div class="standalone-form-wrapper">
      <?php echo wp_kses($formHTML, EscapingHelper::getFormAllowedHtml(isset($formContent) ? $formContent : null)); ?>
    </div>
  </div>

  <?php wp_print_scripts(); ?>
</body>

</html>
