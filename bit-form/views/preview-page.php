<?php

// This file is included via Render::view() using extract(); all variables below are in the calling method's local scope, not global namespace.

use BitCode\BitForm\Core\Util\EscapingHelper;

if (!defined('ABSPATH')) {
  exit;
}
if (!defined('BITFORMS_ASSET_URI')) {
  exit;
}

function bitforms_readable_filesize($bytes, $decimals = 2)
{
  $sz = 'BKMGTP';
  $factor = floor((strlen($bytes) - 1) / 3);
  return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . ' ' . @$sz[$factor];
}

$formUpdateVersion = get_option('bitform_form_update_version');
$formIdSafe = sanitize_key((string) $formID);

$cssFileUrl = BITFORMS_UPLOAD_BASE_URL . '/form-styles/bitform-' . $formID . '.css';
$cssFileUrlFormId = BITFORMS_UPLOAD_BASE_URL . '/form-styles/bitform-' . $formID . '-formid.css';
$customCssSubPath = '/form-styles/bitform-custom-' . $formID . '.css';

wp_register_style('bitform-preview-base-' . $formIdSafe, $cssFileUrl, [], $formUpdateVersion);
wp_register_style('bitform-preview-formid-' . $formIdSafe, $cssFileUrlFormId, [], $formUpdateVersion);
wp_enqueue_style('bitform-preview-base-' . $formIdSafe);
wp_enqueue_style('bitform-preview-formid-' . $formIdSafe);

$customCssRegistered = false;
if (file_exists(BITFORMS_CONTENT_DIR . $customCssSubPath)) {
  wp_register_style('bitform-preview-custom-' . $formIdSafe, BITFORMS_UPLOAD_BASE_URL . $customCssSubPath, [], $formUpdateVersion);
  wp_enqueue_style('bitform-preview-custom-' . $formIdSafe);
  $customCssRegistered = true;
}

if (isset($font) && '' !== $font) {
  wp_register_style('bitform-preview-font-' . $formIdSafe, $font, [], $formUpdateVersion);
  wp_enqueue_style('bitform-preview-font-' . $formIdSafe);
}

wp_register_style('bitform-preview-outfit', 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap', [], null);
wp_enqueue_style('bitform-preview-outfit');

$previewJsUrl = BITFORMS_UPLOAD_BASE_URL . '/form-scripts/preview-' . $formID . '.js';
$fakeFillerJsUrl = BITFORMS_ASSET_URI . '/bit-fake-filler.min.js';
$previewPageJsUrl = BITFORMS_ASSET_URI . '/bit-preview-page.min.js';

wp_register_script('bitform-preview-' . $formIdSafe, $previewJsUrl, [], $formUpdateVersion, true);
wp_register_script('bitform-preview-fakefiller-' . $formIdSafe, $fakeFillerJsUrl, [], $formUpdateVersion, true);
wp_register_script('bitform-preview-page-' . $formIdSafe, $previewPageJsUrl, [], $formUpdateVersion, true);
wp_enqueue_script('bitform-preview-' . $formIdSafe);
wp_enqueue_script('bitform-preview-fakefiller-' . $formIdSafe);
wp_enqueue_script('bitform-preview-page-' . $formIdSafe);

if (isset($bfGlobals) && '' !== $bfGlobals) {
  wp_add_inline_script('bitform-preview-' . $formIdSafe, (string) $bfGlobals, 'before');
}

$jsSize = bitforms_readable_filesize(filesize(BITFORMS_CONTENT_DIR . '/form-scripts/preview-' . $formID . '.js'));
$cssSize = bitforms_readable_filesize(filesize(BITFORMS_CONTENT_DIR . '/form-styles/bitform-' . $formID . '.css'));
$shortcode = '[bitform id="' . $formID . '"]';

$cssUrlsForJs = [$cssFileUrl . '?bfv=' . $formUpdateVersion];
if ($customCssRegistered) {
  $cssUrlsForJs[] = BITFORMS_UPLOAD_BASE_URL . $customCssSubPath . '?bfv=' . $formUpdateVersion;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($title) ? esc_html($title) : 'Form Preview - Bit Form'; ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <style>
    :root {
      --bf-primary: #1C2B41;
      --bf-primary-light: #2D3E56;
      --bf-accent: #1A73E8;
      --bf-tertiary: #3c4b6d;
      --bf-accent-hover: #1557B0;
      --bf-border: #E2E8F0;
      --bf-text: #334155;
      --bf-text-muted: #64748B;
      --bf-bg: #F8FAFC;
      --bf-white: #FFFFFF;
      --bf-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
      --bf-shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.06);
      --bf-radius: 10px;
      --bf-radius-sm: 6px;
      --bf-transition: 0.2s ease;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      min-height: 100vh;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--bf-bg);
      color: var(--bf-text);
    }

    /* Header Container */
    .bf-preview-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--bf-white);
      border-bottom: 1px solid var(--bf-border);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    /* Row 1: Logo + Shortcode */
    .bf-header-row-1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      border-bottom: 1px solid var(--bf-border);
    }

    .bf-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }

    .bf-logo svg {
      height: 32px;
      width: auto;
    }

    .bf-shortcode-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bf-bg);
      border: 1px solid var(--bf-border);
      border-radius: var(--bf-radius-sm);
      padding: 6px 10px 6px 14px;
    }

    .bf-shortcode-text {
      font-size: 13px;
      font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
      color: var(--bf-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 145px;
    }

    .bf-copy-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      background: var(--bf-white);
      border-radius: 4px;
      cursor: pointer;
      transition: all var(--bf-transition);
      color: var(--bf-text-muted);
      flex-shrink: 0;
    }

    .bf-copy-btn:hover {
      color: var(--bf-accent);
      background: var(--bf-white);
    }

    .bf-copy-btn.copied {
      color: #10B981;
    }

    .bf-copy-btn svg {
      width: 16px;
      height: 16px;
    }

    /* Row 2: Form Info + Breakpoints + Fill Button */
    .bf-header-row-2 {
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 24px;
      padding: 10px 24px;
      background: var(--bf-bg);
    }

    .bf-form-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .bf-info-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--bf-text-muted);
    }

    .bf-info-label {
      font-weight: 500;
      color: var(--bf-text);
    }

    .bf-info-value {
      color: var(--bf-accent);
      font-weight: 600;
    }

    .bf-info-separator {
      width: 1px;
      height: 20px;
      background: var(--bf-border);
    }

    .bf-breakpoint-wrapper{
      display: flex;
      align-items: center;
      border: 1px solid var(--bf-border);
      border-radius: var(--bf-radius-sm);
    }
    .bf-breakpoint-btns {
      display: flex;
      align-items: center;
      background: var(--bf-white);
      padding: 4px;
      gap: 2px;
      border-radius: var(--bf-radius-sm);
      /* border: 1px solid var(--bf-border); */
    }

    .bf-breakpoint-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 32px;
      border: none;
      background: transparent;
      border-radius: 4px;
      cursor: pointer;
      transition: all var(--bf-transition);
      color: var(--bf-text-muted);
    }

    .bf-breakpoint-btn:hover {
      background: var(--bf-bg);
      color: var(--bf-text);
    }

    .bf-breakpoint-btn.active {
      background: var(--bf-tertiary);
      color: var(--bf-white);
    }

    .bf-breakpoint-btn svg {
      width: 18px;
      height: 18px;
    }

    .bf-width-input-wrap {
      display: flex;
      align-items: center;
      background: var(--bf-white);
      gap: 4px;
      /* border: 1px solid var(--bf-border); */
      padding: 4px;
      padding-right: 10px;
      border-radius: var(--bf-radius-sm);
      font-size: 13px;
      color: var(--bf-text);
    }

    .bf-width-input {
      width: 35px;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      color: var(--bf-text);
      text-align: right;
      height: 32px;
      outline: none;
    }

    .bf-width-input::-webkit-inner-spin-button,
    .bf-width-input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .bf-width-unit {
      color: var(--bf-text-muted);
      font-weight: 400;
    }

    .bf-fill-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      color: var(--bf-text);
      background: var(--bf-white);
      border: 1px solid var(--bf-border);
      border-radius: var(--bf-radius-sm);
      cursor: pointer;
      transition: all var(--bf-transition);
      white-space: nowrap;
    }

    .bf-fill-btn:hover {
      background: var(--bf-accent);
      border-color: var(--bf-accent);
      color: var(--bf-white);
    }

    .bf-fill-btn:active {
      transform: scale(0.98);
    }

    /* Preview Container */
    .bf-preview-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 24px;
      min-height: calc(100vh - 120px);
    }

    .bf-preview-frame {
      background: var(--bf-white);
      border-radius: var(--bf-radius);
      box-shadow: var(--bf-shadow);
      padding: 32px;
      transition: max-width 0.3s ease;
      max-width: 1440px;
      width: 100%;
      margin: 0 auto;
    }

    /* Tooltip */
    .bf-tooltip {
      position: fixed;
      padding: 6px 12px;
      background: var(--bf-primary);
      color: var(--bf-white);
      font-size: 12px;
      border-radius: 4px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 10000;
      white-space: nowrap;
    }

    .bf-tooltip.show {
      opacity: 1;
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: var(--bf-bg);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--bf-border);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--bf-text-muted);
    }

    /* Responsive Header */
    @media (max-width: 768px) {
      .bf-header-row-2 {
        flex-wrap: wrap;
        gap: 12px;
      }
      .bf-form-info {
        width: 100%;
        justify-content: center;
      }
      .bf-info-separator {
        display: none;
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

<body data-bf-css-urls='<?php echo wp_json_encode($cssUrlsForJs); ?>'>
  <!-- Header -->
  <header class="bf-preview-header">
    <!-- Row 1: Logo + Shortcode Copy -->
    <div class="bf-header-row-1">
      <a href="#" class="bf-logo">
        <svg width="130" height="32" viewBox="0 0 724 151" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="151" height="151" rx="25" fill="#17283F"/>
          <rect x="0.397917" y="0.397917" width="150.204" height="150.204" rx="24.6021" stroke="white" stroke-opacity="0.2" stroke-width="0.795833"/>
          <g filter="url(#filter0_d_1447_2831)">
            <path d="M95.5985 71.9012C97.2082 72.4377 98.639 72.7954 99.8909 73.3319C107.581 76.7299 112.41 82.4529 114.02 90.5009C115.987 99.8008 112.589 108.564 104.541 114.466C100.07 117.685 95.062 119.116 89.5176 119.116C81.6482 119.116 73.7789 119.295 65.7306 119.295C64.6575 119.295 63.5844 118.937 62.6902 118.401C61.0805 117.327 60.7228 115.897 61.2594 114.108C61.7959 112.499 63.0479 111.426 65.0152 111.247C69.4865 111.247 73.7789 111.247 78.2501 111.247C82.5425 111.247 86.8349 111.247 91.1273 111.247C98.9967 111.247 105.793 104.272 106.151 96.4027C106.508 88.3548 100.606 81.5587 92.9158 79.9491C92.5581 79.9491 92.2004 79.9491 91.8427 79.9491C84.5098 79.9491 77.177 79.9491 69.8442 79.9491C69.6653 79.9491 69.4865 79.9491 69.1288 79.9491C69.1288 81.5587 69.1288 83.1683 69.1288 84.9567C69.1288 86.7452 69.1288 88.5336 69.1288 90.3221C69.1288 91.2163 69.3076 91.574 70.3807 91.574C74.852 91.574 79.3232 91.574 83.6156 91.574C84.331 91.574 85.0464 91.2163 85.5829 90.6798C88.8022 87.9971 91.6638 88.5336 93.9889 89.9644C97.0293 92.1105 97.7447 95.5085 96.3139 98.7277C94.5254 102.305 89.1599 103.557 86.1195 100.695C85.2252 99.8008 84.331 99.4431 83.0791 99.4431C77.177 99.4431 71.275 99.4431 65.3729 99.4431C62.6902 99.4431 61.2594 98.0123 61.2594 95.3297C61.2594 88.7125 61.2594 82.2741 61.2594 75.6569C61.2594 72.9742 62.1536 71.7223 65.0152 71.5435C69.3076 71.3646 73.6 71.3646 77.8924 71.3646C87.5503 71.3646 94.8831 62.959 93.4523 53.3014C92.3792 46.6842 87.1926 41.8554 81.2906 40.4246C79.8598 40.067 78.4289 40.067 76.9981 40.067C66.8037 40.067 56.4304 39.8881 46.236 40.067C43.911 40.067 41.5859 38.0997 41.5859 35.7747C41.5859 33.4497 43.7321 31.6613 46.236 31.6613C52.4957 31.6613 58.7555 31.6613 65.0152 31.6613C69.3076 31.6613 73.6 31.6613 77.8924 31.6613C88.6234 31.8402 98.1024 38.6362 101.143 49.3668C103.289 56.8783 101.679 63.8532 97.0293 70.2916C96.3139 70.8281 95.9562 71.1858 95.5985 71.9012Z" fill="#F54756"/>
            <path d="M49.4506 59.922C49.4506 60.8162 49.4506 61.3527 49.4506 62.0681C49.4506 76.5545 49.4506 91.0408 49.4506 105.527C49.4506 108.567 49.4506 111.608 49.4506 114.827C49.4506 118.404 46.7678 120.192 43.3697 118.94C41.5812 118.225 41.4023 116.437 41.4023 114.827C41.4023 109.641 41.4023 104.633 41.4023 99.4465C41.4023 85.6755 41.4023 71.9045 41.4023 58.1335C41.4023 57.2393 41.4024 56.5239 41.5812 55.6297C41.7601 53.4836 43.3697 52.2317 45.337 52.2317C53.5641 52.2317 61.7912 52.2317 70.1971 52.2317C71.2702 52.2317 71.9856 52.2317 72.8799 51.3375C74.8472 49.0125 78.7819 49.3702 80.3916 50.0856C83.0743 51.5163 84.5051 54.0201 84.3263 56.8816C83.9686 59.7431 82.0012 62.0681 79.1396 62.7835C76.6357 63.4988 74.4895 62.4258 72.5222 60.8162C72.1645 60.4585 71.8068 60.2797 71.2702 60.1008C63.9374 59.7431 56.9623 59.922 49.4506 59.922Z" fill="#F54756"/>
          </g>
          <g clip-path="url(#clip0_1447_2831)">
            <path d="M261.894 98.1632C261.894 113.5 248.6 123.862 227.829 123.862H194.595C190.857 123.862 187.533 120.546 187.533 116.401V38.0609C187.533 33.5015 191.272 29.771 195.842 29.771H226.583C245.692 29.771 257.324 38.8899 257.324 53.3974C257.324 63.7598 251.508 72.0498 241.123 74.9513C255.247 77.4382 261.894 86.5572 261.894 98.1632ZM198.334 39.3044V71.6353H224.09C238.63 71.6353 246.939 65.0033 246.939 54.6409C246.939 45.5219 238.63 39.3044 225.337 39.3044H198.334ZM251.093 96.9197C251.093 86.5572 242.369 80.7542 227.414 80.7542H198.334V113.914H227.414C242.369 113.914 251.093 106.868 251.093 96.9197ZM281.419 35.5739C281.419 31.429 284.327 28.5275 288.481 28.5275C292.635 28.5275 295.543 31.429 295.543 35.5739C295.543 39.3044 292.22 42.6204 288.481 42.6204C284.327 42.6204 281.419 39.3044 281.419 35.5739ZM293.881 65.0033V118.474C293.881 121.375 291.389 123.862 288.481 123.862C285.573 123.862 283.496 121.375 283.496 118.474V65.0033C283.496 62.1018 285.573 59.6148 288.481 59.6148C291.389 59.6148 293.881 62.1018 293.881 65.0033ZM416.431 47.1799V71.2208H450.911C453.225 71.2208 455.444 72.1379 457.08 73.7703C458.716 75.4027 459.635 77.6167 459.635 79.9252C459.635 82.2338 458.716 84.4478 457.08 86.0802C455.444 87.7126 453.225 88.6297 450.911 88.6297H416.431V114.329C416.431 119.303 412.277 123.862 406.877 123.862C401.891 123.862 397.737 119.303 397.737 114.329V35.9884C397.737 32.6725 400.23 29.771 403.553 29.771H457.143C459.456 29.771 461.675 30.688 463.311 32.3205C464.947 33.9529 465.867 36.1669 465.867 38.4754C465.867 40.784 464.947 42.998 463.311 44.6304C461.675 46.2628 459.456 47.1799 457.143 47.1799H416.431ZM547.289 90.7022C547.289 111.013 532.75 125.52 512.394 125.52C491.623 125.52 477.083 111.013 477.083 90.7022C477.083 70.3918 491.623 56.2988 512.394 56.2988C532.75 56.2988 547.289 70.3918 547.289 90.7022ZM529.011 90.7022C529.011 79.9252 522.364 72.4643 512.394 72.4643C502.008 72.4643 495.362 79.9252 495.362 90.7022C495.362 101.479 502.008 108.94 512.394 108.94C522.364 108.94 529.011 101.479 529.011 90.7022ZM601.71 66.2468C601.71 70.3918 598.802 73.7078 595.063 74.5368C588.001 76.1948 582.6 79.0962 578.446 83.6557V114.743C578.446 119.717 574.292 123.448 569.307 123.448C564.322 123.862 560.168 119.717 560.168 114.743V67.0758C560.168 62.1018 564.322 57.9568 569.722 57.9568H578.446V65.4178C581.77 62.1018 585.924 59.6148 590.909 58.3713C596.309 56.7133 601.71 60.8583 601.71 66.2468ZM723.844 86.9717V114.743C723.844 119.717 719.69 123.862 714.705 123.862C709.72 123.862 705.566 119.717 705.566 114.743V86.9717C705.566 77.0238 700.165 72.4643 692.272 72.4643C687.287 72.4643 682.302 74.1223 677.732 79.5107L678.148 86.1427V114.743C678.148 119.717 674.409 123.862 669.424 123.862C664.023 123.862 660.285 119.717 660.285 114.743V86.1427C660.285 75.7803 654.884 72.4643 647.822 72.4643C642.006 72.4643 637.021 74.9513 632.867 80.3397V114.743C632.867 119.717 628.712 123.862 623.727 123.862C618.742 123.862 614.588 119.717 614.588 114.743V65.8323C614.588 61.2728 618.327 57.9568 622.896 57.9568H632.867V62.1018C637.436 58.3713 642.421 56.2988 650.314 56.2988C659.038 56.2988 666.516 58.7858 671.501 64.5888C677.732 58.7858 684.794 56.2988 693.518 56.2988C711.382 56.2988 723.844 67.0758 723.844 86.9717ZM358.687 48.0089C358.687 45.5219 356.61 43.4494 354.118 43.4494H334.593V52.5684H354.118C356.61 52.5684 358.687 50.4959 358.687 48.0089Z" fill="#17283F"/>
            <path d="M359.519 113.499C356.196 114.743 352.042 115.572 348.303 115.572C339.164 115.572 334.594 111.012 334.594 99.8206V41.3764C334.594 38.4749 332.101 35.9879 329.193 35.9879C326.286 35.9879 323.793 38.4749 323.793 41.3764V99.8206C324.208 116.815 331.686 125.52 347.472 125.52L354.534 124.691C358.273 124.276 360.766 120.546 359.935 116.815L359.519 113.499Z" fill="#17283F"/>
          </g>
          <defs>
            <filter id="filter0_d_1447_2831" x="41.2528" y="31.6613" width="74.3605" height="88.8738" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="0.448652" dy="0.598203"/>
              <feGaussianBlur stdDeviation="0.299101"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1447_2831"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1447_2831" result="shape"/>
            </filter>
            <clipPath id="clip0_1447_2831">
              <rect width="536.311" height="96.9925" fill="white" transform="translate(187.533 28.5275)"/>
            </clipPath>
          </defs>
        </svg>
      </a>

      <div class="bf-shortcode-wrap">
        <span class="bf-shortcode-text" id="bf-shortcode"><?php echo esc_html($shortcode); ?></span>
        <button type="button" class="bf-copy-btn" id="bf-copy-btn" title="Copy shortcode">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Row 2: Form Info + Breakpoints + Fill Button -->
    <div class="bf-header-row-2">
      <div class="bf-form-info">
        <div class="bf-info-item">
          <span class="bf-info-label">Form ID:</span>
          <span class="bf-info-value"><?php echo esc_html($formID); ?></span>
        </div>
        <div class="bf-info-separator"></div>
        <div class="bf-info-item">
          <span class="bf-info-label">JS Size:</span>
          <span class="bf-info-value"><?php echo esc_html($jsSize); ?></span>
        </div>
        <div class="bf-info-separator"></div>
        <div class="bf-info-item">
          <span class="bf-info-label">CSS Size:</span>
          <span class="bf-info-value"><?php echo esc_html($cssSize); ?></span>
        </div>
      </div>

      <div class="bf-breakpoint-wrapper">
        <div class="bf-breakpoint-btns">
          <!-- Mobile -->
          <button type="button" class="bf-breakpoint-btn" data-breakpoint="mobile" data-width="570" title="Mobile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </button>
          <!-- Tablet -->
          <button type="button" class="bf-breakpoint-btn" data-breakpoint="tablet" data-width="960" title="Tablet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </button>
          <!-- Desktop -->
          <button type="button" class="bf-breakpoint-btn active" data-breakpoint="desktop" data-width="1440" title="Desktop">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </button>
        </div>
        <div class="bf-width-input-wrap">
          <input type="number" class="bf-width-input" id="bf-width-input" value="1440" min="320" max="1920">
          <span class="bf-width-unit">px</span>
        </div>
    </div>

      <button type="button" class="bf-fill-btn bf-dummy-filler-btn">
        Fill Form with Dummy Data
      </button>
    </div>
  </header>

  <!-- Preview Container -->
  <main class="bf-preview-container">
    <div class="bf-preview-frame" id="bf-preview-frame">
      <?php echo wp_kses($formHTML, EscapingHelper::getFormAllowedHtml(isset($formContent) ? $formContent : null)); ?>
    </div>
  </main>

  <!-- Tooltip -->
  <div class="bf-tooltip" id="bf-tooltip"></div>

  <?php wp_print_scripts(); ?>
  <script>
    window.addEventListener('message', (e) => {
      if (e.origin === window.location.origin && e.data === 'REFRESH_PREVIEW') {
        window.location.reload()
      }
    })
  </script>
</body>

</html>
