<?php

namespace BitCode\BitForm\Core\Util;

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Form-aware HTML escaping for Bit Form output.
 *
 * The renderer assembles markup from many small pieces, each escaped at the
 * leaf (esc_attr/esc_url/esc_html/wp_kses_post). The whole-form wp_kses() at
 * echo time exists to satisfy WordPress.Security.EscapeOutput.OutputNotEscaped
 * without stripping legitimate form constructs.
 *
 * Scope of allowed tags/attrs: every tag and attribute observed in the
 * renderer code path, plus a per-render extension that absorbs builder-defined
 * customAttributes keys collected from $formContent.
 */
final class EscapingHelper
{
  /**
   * Universal attributes we allow on every form/structural tag.
   */
  private static function commonAttrs()
  {
    return [
      'id'              => true,
      'class'           => true,
      'style'           => true,
      'title'           => true,
      'role'            => true,
      'tabindex'        => true,
      'hidden'          => true,
      'contenteditable' => true,
      'inert'           => true,
      'dir'             => true,
      'lang'            => true,
    ];
  }

  /**
   * data-* keys actually emitted by the renderer (free + Pro).
   * wp_kses has no wildcard support, so we enumerate.
   */
  private static function dataAttrs()
  {
    return array_fill_keys([
      'data-cl',
      'data-step',
      'data-list',
      'data-list-index',
      'data-index',
      'data-value',
      'data-oopt',
      'data-bf-other-inp',
      'data-num-value',
      'data-indx',
      'data-parent-field-name',
      'data-sitekey',
      'data-theme',
      'data-size',
      'data-appearance',
      'data-language',
      'data-before-interactive-callback',
      'data-after-interactive-callback',
      'data-bf-show-picker',
      'data-bx',
      'data-ck-icn',
    ], true);
  }

  /**
   * aria-* keys actually emitted by the renderer.
   */
  private static function ariaAttrs()
  {
    return array_fill_keys([
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
      'aria-hidden',
      'aria-live',
      'aria-required',
      'aria-invalid',
      'aria-expanded',
      'aria-controls',
      'aria-checked',
      'aria-selected',
      'aria-disabled',
      'aria-pressed',
      'aria-current',
      'aria-owns',
      'aria-haspopup',
    ], true);
  }

  /**
   * Form-specific tags + attributes layered on top of wp_kses_allowed_html('post').
   */
  private static function formExtras()
  {
    $common = self::commonAttrs();
    $data = self::dataAttrs();
    $aria = self::ariaAttrs();
    $shared = array_merge($common, $data, $aria);

    $svgChildAttrs = array_merge($common, [
      'd'               => true,
      'points'          => true,
      'x'               => true,
      'y'               => true,
      'x1'              => true,
      'y1'              => true,
      'x2'              => true,
      'y2'              => true,
      'cx'              => true,
      'cy'              => true,
      'r'               => true,
      'rx'              => true,
      'ry'              => true,
      'fill'            => true,
      'fill-rule'       => true,
      'fillrule'        => true,
      'stroke'          => true,
      'stroke-width'    => true,
      'stroke-linecap'  => true,
      'stroke-linejoin' => true,
      'stroke-dasharray'=> true,
      'href'            => true,
      'xlink:href'      => true,
      'transform'       => true,
      'viewbox'         => true,
    ]);

    return [
      // Form tags
      'form' => array_merge($shared, [
        'action'       => true,
        'method'       => true,
        'enctype'      => true,
        'novalidate'   => true,
        'target'       => true,
        'name'         => true,
        'autocomplete' => true,
      ]),
      'input' => array_merge($shared, [
        'name'           => true,
        'type'           => true,
        'value'          => true,
        'required'       => true,
        'disabled'       => true,
        'readonly'       => true,
        'placeholder'    => true,
        'min'            => true,
        'max'            => true,
        'step'           => true,
        'inputmode'      => true,
        'list'           => true,
        'accept'         => true,
        'multiple'       => true,
        'checked'        => true,
        'autocomplete'   => true,
        'autofocus'      => true,
        'maxlength'      => true,
        'minlength'      => true,
        'pattern'        => true,
        'size'           => true,
        'src'            => true,
        'alt'            => true,
        'width'          => true,
        'height'         => true,
        'capture'        => true,
        'form'           => true,
        'formaction'     => true,
        'formmethod'     => true,
        'formnovalidate' => true,
        'formtarget'     => true,
        'dirname'        => true,
      ]),
      'textarea' => array_merge($shared, [
        'name'        => true,
        'placeholder' => true,
        'required'    => true,
        'disabled'    => true,
        'readonly'    => true,
        'rows'        => true,
        'cols'        => true,
        'autocomplete'=> true,
        'maxlength'   => true,
        'minlength'   => true,
        'wrap'        => true,
      ]),
      'select' => array_merge($shared, [
        'name'         => true,
        'disabled'     => true,
        'readonly'     => true,
        'multiple'     => true,
        'required'     => true,
        'size'         => true,
        'autocomplete' => true,
      ]),
      'option' => array_merge($shared, [
        'value'    => true,
        'selected' => true,
        'disabled' => true,
        'label'    => true,
      ]),
      'optgroup' => array_merge($shared, [
        'label'    => true,
        'disabled' => true,
      ]),
      'datalist' => $shared,
      'fieldset' => array_merge($shared, ['disabled' => true, 'name' => true, 'form' => true]),
      'legend'   => $shared,
      'output'   => array_merge($shared, ['for' => true, 'name' => true, 'form' => true]),
      'progress' => array_merge($shared, ['value' => true, 'max' => true]),
      'meter'    => array_merge($shared, ['value' => true, 'min' => true, 'max' => true, 'low' => true, 'high' => true, 'optimum' => true]),
      'button'   => array_merge($shared, [
        'type'           => true,
        'name'           => true,
        'value'          => true,
        'disabled'       => true,
        'autofocus'      => true,
        'form'           => true,
        'formaction'     => true,
        'formmethod'     => true,
        'formnovalidate' => true,
        'formtarget'     => true,
      ]),
      'label' => array_merge($shared, [
        'for' => true,
      ]),

      // SVG
      'svg' => array_merge($shared, [
        'xmlns'               => true,
        'xmlns:xlink'         => true,
        'viewbox'             => true,
        'width'               => true,
        'height'              => true,
        'fill'                => true,
        'stroke'              => true,
        'stroke-width'        => true,
        'stroke-linecap'      => true,
        'stroke-linejoin'     => true,
        'enable-background'   => true,
        'xml:space'           => true,
        'preserveaspectratio' => true,
        'version'             => true,
        'baseprofile'         => true,
      ]),
      'g'                => $svgChildAttrs,
      'path'             => $svgChildAttrs,
      'polyline'         => $svgChildAttrs,
      'polygon'          => $svgChildAttrs,
      'line'             => $svgChildAttrs,
      'circle'           => $svgChildAttrs,
      'ellipse'          => $svgChildAttrs,
      'rect'             => array_merge($svgChildAttrs, ['width' => true, 'height' => true]),
      'use'              => $svgChildAttrs,
      'symbol'           => $svgChildAttrs,
      'defs'             => $svgChildAttrs,
      'desc'             => $svgChildAttrs,
      'animatetransform' => array_merge($common, [
        'attributename' => true,
        'attributetype' => true,
        'type'          => true,
        'dur'           => true,
        'from'          => true,
        'to'            => true,
        'repeatcount'   => true,
        'begin'         => true,
        'end'           => true,
        'values'        => true,
        'keytimes'      => true,
        'calcmode'      => true,
        'additive'      => true,
        'fill'          => true,
      ]),
      'animate'  => array_merge($common, [
        'attributename' => true,
        'attributetype' => true,
        'dur'           => true,
        'from'          => true,
        'to'            => true,
        'repeatcount'   => true,
        'begin'         => true,
        'end'           => true,
        'values'        => true,
        'keytimes'      => true,
        'calcmode'      => true,
        'fill'          => true,
      ]),

      // Media + structural extras (override 'post' attrs to add data-*/aria-* + extras)
      'div'     => $shared,
      'span'    => $shared,
      'section' => $shared,
      'ul'      => $shared,
      'ol'      => $shared,
      'li'      => $shared,
      'p'       => $shared,
      'a'       => array_merge($shared, [
        'href'     => true,
        'target'   => true,
        'rel'      => true,
        'download' => true,
        'name'     => true,
      ]),
      'img' => array_merge($shared, [
        'src'      => true,
        'alt'      => true,
        'width'    => true,
        'height'   => true,
        'srcset'   => true,
        'sizes'    => true,
        'loading'  => true,
        'decoding' => true,
      ]),
      'picture' => $shared,
      'source'  => array_merge($common, ['src' => true, 'srcset' => true, 'media' => true, 'type' => true, 'sizes' => true]),
      'iframe'  => array_merge($shared, ['src' => true, 'name' => true, 'width' => true, 'height' => true, 'allow' => true, 'allowfullscreen' => true, 'sandbox' => true, 'referrerpolicy' => true, 'loading' => true]),
      'canvas'  => array_merge($shared, ['width' => true, 'height' => true]),
      'h1'      => $shared,
      'h2'      => $shared,
      'h3'      => $shared,
      'h4'      => $shared,
      'h5'      => $shared,
      'h6'      => $shared,
      'br'      => $common,
      'hr'      => $common,

      // bf_globals + show-picker bridge are emitted via wp_add_inline_script,
      // so they never travel through kses. The remaining inline <script> tag
      // surfaced by kses is TurnstileField's interaction-only callback block,
      // which defines globally-named functions Cloudflare's widget invokes.
      // Allow only the id attribute; content is server-controlled.
      'script' => ['id' => true],
    ];
  }

  /**
   * Returns the default allowed HTML tags map for form output.
   * Filterable via 'bitforms_allowed_html_tags'.
   *
   * @return array<string, array<string, bool>> wp_kses-compatible map
   */
  public static function getAllowedHtmlTags()
  {
    $base = wp_kses_allowed_html('post');
    $extras = self::formExtras();

    foreach ($extras as $tag => $attrs) {
      $base[$tag] = isset($base[$tag]) && is_array($base[$tag])
        ? array_merge($base[$tag], $attrs)
        : $attrs;
    }

    /**
     * Filter the form-output allowlist.
     *
     * @param array       $base        wp_kses allowed HTML map
     * @param object|null $formContent Decoded form content (fields, buttons, layout)
     */
    $allowed = apply_filters('bitforms_allowed_html_tags', $base, null);
    return is_array($allowed) ? $allowed : $base;
  }

  /**
   * Sanitizes assembled form HTML using a form-aware allowlist that includes
   * builder-defined customAttributes keys collected from the form definition.
   *
   * NOTE: prefer calling `wp_kses($html, EscapingHelper::getFormAllowedHtml($formContent))`
   * directly at echo sites — Plugin Check / PHPCS only recognizes the literal
   * `wp_kses` / `esc_*` tokens as escape functions. This wrapper exists for
   * non-PCP-scanned callers.
   *
   * @param string      $html        Assembled form HTML
   * @param object|null $formContent Decoded form content (object with ->fields, ->buttons, etc.)
   * @return string Sanitized HTML
   */
  public static function ksesFormOutput($html, $formContent = null)
  {
    return wp_kses($html, self::getFormAllowedHtml($formContent));
  }

  /**
   * Back-compat wrapper.
   */
  public static function ksesFormOutputDefault($html)
  {
    return wp_kses($html, self::getAllowedHtmlTags());
  }

  /**
   * Build allowed-HTML map extended with customAttribute keys from $formContent.
   * Public so echo sites can pass the result directly to `wp_kses()` and satisfy
   * Plugin Check's `WordPress.Security.EscapeOutput.OutputNotEscaped` sniff.
   *
   * @param object|null $formContent
   * @return array
   */
  public static function getFormAllowedHtml($formContent = null)
  {
    $base = wp_kses_allowed_html('post');
    $extras = self::formExtras();

    foreach ($extras as $tag => $attrs) {
      $base[$tag] = isset($base[$tag]) && is_array($base[$tag])
        ? array_merge($base[$tag], $attrs)
        : $attrs;
    }

    $customKeys = self::collectCustomAttributeKeys($formContent);

    if (!empty($customKeys)) {
      // Broadcast to every tag we render through (bounded set).
      $broadcastTags = [
        'div', 'span', 'section', 'ul', 'ol', 'li', 'p', 'a',
        'form', 'input', 'textarea', 'select', 'option', 'optgroup',
        'datalist', 'fieldset', 'legend', 'output', 'progress', 'meter',
        'button', 'label', 'img', 'picture', 'iframe', 'canvas',
        'svg', 'g', 'path', 'polyline', 'polygon', 'line', 'circle',
        'ellipse', 'rect', 'use', 'symbol',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      ];
      foreach ($broadcastTags as $tag) {
        if (!isset($base[$tag]) || !is_array($base[$tag])) {
          continue;
        }
        foreach ($customKeys as $key) {
          $base[$tag][$key] = true;
        }
      }
    }

    /**
     * @param array       $base        wp_kses allowed HTML map
     * @param object|null $formContent Decoded form content
     */
    $allowed = apply_filters('bitforms_allowed_html_tags', $base, $formContent);
    return is_array($allowed) ? $allowed : $base;
  }

  /**
   * Walk $formContent->fields and ->buttons, collect every custom-attribute key,
   * filter out unsafe shapes (event handlers, malformed names, reserved keys).
   *
   * @return string[] Unique safe attribute keys
   */
  private static function collectCustomAttributeKeys($formContent)
  {
    if (!is_object($formContent)) {
      return [];
    }

    $keys = [];

    if (isset($formContent->fields) && (is_object($formContent->fields) || is_array($formContent->fields))) {
      foreach ((array) $formContent->fields as $field) {
        self::collectKeysFromCustomAttrs($field, $keys);
      }
    }

    if (isset($formContent->buttons)) {
      self::collectKeysFromCustomAttrs($formContent->buttons, $keys);
    }

    return array_keys($keys);
  }

  private static function collectKeysFromCustomAttrs($field, array &$keys)
  {
    if (!is_object($field) || !isset($field->customAttributes)) {
      return;
    }
    $customAttributes = $field->customAttributes;
    if (!is_object($customAttributes) && !is_array($customAttributes)) {
      return;
    }
    foreach ((array) $customAttributes as $element => $attrList) {
      if (!is_array($attrList) && !is_object($attrList)) {
        continue;
      }
      foreach ((array) $attrList as $attr) {
        if (!is_object($attr) || !isset($attr->key)) {
          continue;
        }
        $key = (string) $attr->key;
        if (self::isSafeAttributeKey($key)) {
          $keys[strtolower($key)] = true;
        }
      }
    }
  }

  /**
   * Reject event-handler attributes, namespace-injection attempts, and any key
   * not matching a conservative HTML attribute-name shape.
   */
  public static function isSafeAttributeKey($key)
  {
    if (!is_string($key) || '' === $key) {
      return false;
    }
    if (preg_match('/^on/i', $key)) {
      return false;
    }
    $reserved = ['xmlns', 'xmlns:xlink', 'xlink:href'];
    if (in_array(strtolower($key), $reserved, true)) {
      return false;
    }
    return (bool) preg_match('/^[A-Za-z_:][A-Za-z0-9_:.\-]*$/', $key);
  }
}
