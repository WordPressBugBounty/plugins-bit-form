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

$cssFileUrl = BITFORMS_UPLOAD_BASE_URL . '/form-styles/bitform-' . $formID . '.css';
$cssFileUrlFormId = BITFORMS_UPLOAD_BASE_URL . '/form-styles/bitform-' . $formID . '-formid.css';
$customCssSubPath = '/form-styles/bitform-custom-' . $formID . '.css';

wp_register_style('bitform-preview-base-' . $formIdSafe, $cssFileUrl, [], $formUpdateVersion);
wp_register_style('bitform-preview-formid-' . $formIdSafe, $cssFileUrlFormId, [], $formUpdateVersion);
wp_enqueue_style('bitform-preview-base-' . $formIdSafe);
wp_enqueue_style('bitform-preview-formid-' . $formIdSafe);

if (file_exists(BITFORMS_CONTENT_DIR . $customCssSubPath)) {
  wp_register_style('bitform-preview-custom-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $customCssSubPath, [], $formUpdateVersion);
  wp_enqueue_style('bitform-preview-custom-' . $formIdSafe);
}

if (isset($font) && '' !== $font) {
  wp_register_style('bitform-preview-font-' . $formIdSafe, $font, [], $formUpdateVersion);
  wp_enqueue_style('bitform-preview-font-' . $formIdSafe);
}

$previewJsUrl = BITFORMS_UPLOAD_BASE_URL . '/form-scripts/preview-' . $formID . '.js';
$fakeFillerJsUrl = BITFORMS_ASSET_URI . '/bit-fake-filler.min.js';

wp_register_script('bitform-preview-' . $formIdSafe, $previewJsUrl, [], $formUpdateVersion, true);
wp_register_script('bitform-preview-fakefiller-' . $formIdSafe, $fakeFillerJsUrl, [], $formUpdateVersion, true);
wp_enqueue_script('bitform-preview-' . $formIdSafe);
wp_enqueue_script('bitform-preview-fakefiller-' . $formIdSafe);
if (isset($bfGlobals) && '' !== $bfGlobals) {
  wp_add_inline_script('bitform-preview-' . $formIdSafe, (string) $bfGlobals, 'before');
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
    font-family: sans-serif;
  }

  ._frm-bg-b<?php echo esc_html($formID); ?> {
    width: min(961px, 95%);
    margin-block: 100px;
  }

  .bf-dummy-filler-btn {
    position: fixed;
    /* changed from sticky to fixed */
    top: 15px;
    right: 15px;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    z-index: 1000;
  }

  .bf-dummy-filler-btn:hover {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  }

  .bf-dummy-filler-btn:focus {
    outline: 0;
    box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .25);
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
  <button type="button" class="bf-dummy-filler-btn">Fill dummy data</button>
  <?php echo wp_kses($formHTML, EscapingHelper::getFormAllowedHtml(isset($formContent) ? $formContent : null)); ?>

  <div style="position:fixed;top:0;left:0;border:1px solid lightgray;background:#fafafa;padding:10px">
    <?php
function bitforms_readable_filesize($bytes, $decimals = 2)
{
  $sz = 'BKMGTP';
  $factor = floor((strlen($bytes) - 1) / 3);
  return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . ' ' . @$sz[$factor];
}
?>
    <div>Form ID : <?php echo isset($formID) ? esc_html($formID) : ''; ?></div>
    <div>JS size =
      <?php echo esc_html(bitforms_readable_filesize(filesize(BITFORMS_CONTENT_DIR . '/form-scripts/preview-' . $formID . '.js'))); ?>
    </div>
    <div>CSS size =
      <?php echo esc_html(bitforms_readable_filesize(filesize(BITFORMS_CONTENT_DIR . '/form-styles/bitform-' . $formID . '.css'))); ?>
    </div>
  </div>
  <?php wp_print_scripts(); ?>
</body>
<script>
  // Listen for refresh messages
window.addEventListener('message', (e) => {
  if (e.origin === window.location.origin && e.data === 'REFRESH_PREVIEW') {
    window.location.reload()
  }
})
</script>

</html>
