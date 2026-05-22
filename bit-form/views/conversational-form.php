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
  <?php if (!empty($isPreview)) : ?>
  <style>.bc-live-hidden { display: none !important; }</style>
  <script>window.bf_preview_mode = true;</script>
  <?php endif; ?>
  <?php wp_print_scripts(); ?>
  <?php if (!empty($isPreview)) : ?>
  <script>
  (function() {
    var FID = <?php echo (int) $formID; ?>;
    var pfx = 'bc' + FID + '-';

    function q(sel) { return document.querySelector('.' + pfx + sel); }
    function qa(sel) { return document.querySelectorAll('.' + pfx + sel); }
    function toggle(el, show) { if (el) el.classList.toggle('bc-live-hidden', !show); }
    function setTxt(el, val) { if (el && val !== undefined && val !== null) el.textContent = val; }

    var LAYOUT_CLASSES = ['normal-layout', 'compact-left-layout', 'compact-right-layout', 'padding-left-layout', 'padding-right-layout', 'centered-card-layout'];

    function applyLiveSettings(settings) {
      var nav = settings.navigationSettings || {};
      var stl = settings.stepListObject || {};
      var all = stl.allSteps || {};

      // Visibility toggles
      toggle(q('nav-wrpr'), nav.show !== false);
      toggle(q('progress-lbl-wrpr'), !!nav.showProgressLabel);
      toggle(q('progress-bar-wrpr'), !!nav.showProgressBar);
      toggle(q('branding-wrpr'), nav.showBranding !== false);
      toggle(q('nav-btn-wrpr'), !!nav.showNavigateBtn);

      // Welcome page text content
      var wp = stl.welcomePage || {};
      var titleEl = document.querySelector('.' + pfx + 'welcome-title h2');
      setTxt(titleEl, wp.title);
      // Welcome page rich content (everything between title and button wrapper)
      var welcomeContentEl = q('welcome-content');
      if (welcomeContentEl && wp.content !== undefined) {
        // Find the text node area — insert content after title, before button wrapper
        var btnWrpr = welcomeContentEl.querySelector('.' + pfx + 'step-btn-wrpr');
        var titleWrpr = welcomeContentEl.querySelector('.' + pfx + 'welcome-title');
        // Remove existing text nodes / content nodes between title and button
        var children = Array.from(welcomeContentEl.childNodes);
        children.forEach(function(node) {
          if (node !== titleWrpr && node !== btnWrpr) {
            welcomeContentEl.removeChild(node);
          }
        });
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = wp.content || '';
        var frag = document.createDocumentFragment();
        while (tempDiv.firstChild) frag.appendChild(tempDiv.firstChild);
        welcomeContentEl.insertBefore(frag, btnWrpr);
      }

      // Per-step: button text, hints, layout, image, background
      var wrappers = qa('step-wrapper');
      var fieldKeys = Object.keys(stl).filter(function(k) { return k !== 'allSteps' && k !== 'welcomePage'; });
      var welcomeOffset = (wp.enable) ? 1 : 0;

      Array.prototype.forEach.call(wrappers, function(wrapper, idx) {
        var isWelcome = wrapper.classList.contains(pfx + 'welcome');
        var cfg = isWelcome ? wp : (stl[fieldKeys[idx - welcomeOffset]] || {});

        // Button text (start button on welcome, ok button on steps)
        if (isWelcome) {
          var startBtn = wrapper.querySelector('.' + pfx + 'start-btn');
          if (startBtn) {
            // preserve icon elements, update only text node
            var textNode = Array.from(startBtn.childNodes).find(function(n) { return n.nodeType === 3 && n.textContent.trim(); });
            if (textNode) textNode.textContent = '\n              ' + (cfg.btnTxt || all.btnTxt || 'Start') + '\n              ';
          }
        } else {
          var btnEl = wrapper.querySelector('.' + pfx + 'btn-ok');
          if (btnEl) {
            var textNode = Array.from(btnEl.childNodes).find(function(n) { return n.nodeType === 3 && n.textContent.trim(); });
            if (textNode) textNode.textContent = '\n            ' + (cfg.btnTxt || all.btnTxt || 'OK') + '\n            ';
          }
        }

        // Step hints — rendered as HTML (same as PHP frontend output).
        var hintsEl = wrapper.querySelector('.' + pfx + 'step-hints');
        var hintsVal = cfg.stepHints !== undefined ? cfg.stepHints : all.stepHints;
        if (hintsEl && hintsVal !== undefined && hintsVal !== null) hintsEl.innerHTML = hintsVal;

        // Layout class
        var layout = cfg.layout || all.layout || 'normal-layout';
        LAYOUT_CLASSES.forEach(function(c) { wrapper.classList.remove(c); });
        wrapper.classList.add(layout);

        // Layout image
        var imgEl = wrapper.querySelector('.' + pfx + 'step-img');
        if (imgEl) imgEl.src = cfg.layoutImage || all.layoutImage || '';

        // Show/hide image container based on layout
        var imgCntnr = wrapper.querySelector('.' + pfx + 'step-img-cntnr');
        if (imgCntnr) imgCntnr.style.display = (layout === 'normal-layout' || layout === 'centered-card-layout') ? 'none' : '';

        // Step background — Floating Card redirects to card element; others apply to wrapper.
        var bg = cfg.background || all.background || '';
        var bgColor = typeof bg === 'object' ? (bg['background-color'] || '') : bg;
        var cardEl = wrapper.querySelector('.' + pfx + 'step-content');
        var isRealColor = bgColor && bgColor !== 'transparent';
        if (layout === 'centered-card-layout') {
          wrapper.style.removeProperty('background');
          wrapper.style.removeProperty('background-color');
          if (cardEl) {
            // Only override CSS white fallback when user has a real color set.
            if (isRealColor) cardEl.style.setProperty('background-color', bgColor, 'important');
            else cardEl.style.removeProperty('background-color');
          }
        } else {
          if (cardEl) cardEl.style.removeProperty('background-color');
          if (isRealColor) wrapper.style.setProperty('background-color', bgColor, 'important');
          else wrapper.style.removeProperty('background-color');
        }
      });
    }

    var BF_ALLOWED_ORIGIN = <?php
      $bfParsed = wp_parse_url(get_site_url());
      $bfOrigin = $bfParsed['scheme'] . '://' . $bfParsed['host'];
      if (!empty($bfParsed['port'])) $bfOrigin .= ':' . $bfParsed['port'];
      echo wp_json_encode($bfOrigin);
    ?>;
    window.addEventListener('message', function(e) {
      if (!e.origin || e.origin !== BF_ALLOWED_ORIGIN) return;
      var d = e.data;
      if (!d || !d.__bf) return;

      if (d.type === 'bf:css') {
        var el = document.getElementById('bf-live-preview-css');
        if (!el) {
          el = document.createElement('style');
          el.id = 'bf-live-preview-css';
          document.head.appendChild(el);
        }
        el.textContent = d.css;
      }

      if (d.type === 'bf:settings') {
        applyLiveSettings(d.settings);
      }

      if (d.type === 'bf:navigate') {
        var contentIds = Object.keys(window.bf_globals || {});
        for (var i = 0; i < contentIds.length; i++) {
          var g = window.bf_globals[contentIds[i]];
          var inst = g && g.inits && g.inits.conversational_form;
          if (inst && typeof inst.goToStep === 'function') { inst.goToStep(d.stepIndex); break; }
        }
      }
    });
  })();
  </script>
  <?php endif; ?>
</body>

</html>
