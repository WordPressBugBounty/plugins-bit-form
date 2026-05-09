<?php

namespace BitCode\BitForm\Widgets;

use BitCode\BitForm\GlobalHelper;

if (!defined('ABSPATH')) {
  exit;
}

/**
 * BitformBricksWidget class.
 *
 * @package BitCode\BitForm\Widgets
 *
 * @since
 *
 * @version
 *
 * @description
 * This class is used to create a Bitform widget for Bricks Builder.
 * It extends the \Bricks\Element class and implements the necessary methods to register the widget.
 *
 * @see https://academy.bricksbuilder.io/article/create-your-own-elements/
 */
class BitformBricksWidget extends \Bricks\Element
{
  public $category = 'general';
  public $name = 'Bit Form';
  public $icon = 'ti-layout-cta-left';

  public $tag = 'form';

  public function get_label()
  {
    return esc_html__('Bit Form', 'bit-form');
  }

  public function get_keywords()
  {
    return [
      'bitform',
      'bitforms',
      'form',
      'bitform widget',
      'form widget',
      'contact forms',
      'bricks form',
      'bit form',
      'form builder',
      'shortcode',
    ];
  }

  // Set builder controls
  public function set_controls()
  {
    $options = [];
    if (is_callable([GlobalHelper::class, 'getForms'])) {
      $forms = GlobalHelper::getForms();
      if (is_array($forms)) {
        $options = $forms;
      }
    }
    $this->controls['form-list'] = [
      'label'       => esc_html__('Form list', 'bit-form'),
      'type'        => 'select',
      'options'     => $options,
      'inline'      => true,
      'clearable'   => false,
    ];
  }

  public function enqueue_scripts()
  {
    // for custom script
  }

  private function getStyleContent($formId)
  {
    if (!file_exists(BITFORMS_CONTENT_DIR . DIRECTORY_SEPARATOR . 'form-styles')) {
      return '';
    }
    $cssFile = BITFORMS_CONTENT_DIR . DIRECTORY_SEPARATOR . 'form-styles' . DIRECTORY_SEPARATOR . "bitform-{$formId}-formid" . '.css';
    if (!file_exists($cssFile)) {
      return '';
    }
    $style = file_get_contents($cssFile);
    return false === $style ? '' : (string) $style;
  }

  public function render()
  {
    $rootAttributes = (string) $this->render_attributes('_root');
    $allowedRootHtml = [
      'div' => [
        'id'       => true,
        'class'    => true,
        'style'    => true,
        'data-*'   => true,
        'aria-*'   => true,
        'role'     => true,
        'tabindex' => true,
      ],
    ];
    echo wp_kses('<div ' . $rootAttributes . '>', $allowedRootHtml);

    if (empty($this->settings['form-list'])) {
      echo wp_kses_post(
        $this->render_element_placeholder([
          'icon-class'  => esc_attr($this->icon),
          'title'       => esc_html__('No form selected', 'bit-form'),
          'description' => esc_html__('Please select a form from the Form List available in the Bit Form element settings.', 'bit-form'),

          // Legacy attribute
          'text'        => esc_html__('No form selected', 'bit-form'),
        ])
      );
    }

    if (!empty($this->settings['form-list'])) {
      $formId = $this->settings['form-list'];
      $cssContent = $this->getStyleContent($formId);
      if ('' !== $cssContent) {
        $styleHandle = 'bitform-bricks-' . sanitize_key((string) $formId);
        if (!wp_style_is($styleHandle, 'registered')) {
          wp_register_style($styleHandle, false, [], BITFORMS_VERSION);
        }
        if (!wp_style_is($styleHandle, 'enqueued')) {
          wp_enqueue_style($styleHandle);
        }
        wp_add_inline_style($styleHandle, $cssContent);
      }
      echo do_shortcode('[bitform id="' . esc_attr($formId) . '"]');
    }

    echo '</div>';
  }
}
