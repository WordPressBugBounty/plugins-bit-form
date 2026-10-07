<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

use BitCode\BitForm\Admin\Form\Helpers;

class ImageField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $fieldHelpers = new ClassicFieldHelpers($field, $rowID, $form_atomic_Cls_map);
    // an empty (or legacy 0) size means "auto", so the attribute is left out
    $imgWidth = self::getSize($field, 'width');
    $imgHeight = self::getSize($field, 'height');

    $imgSrc = Helpers::property_exists_nested($field, 'bg_img', '', 1) ? $field->bg_img : '';
    $alt = Helpers::property_exists_nested($field, 'alt', '', 1) ? $field->alt : '';

    $sizeAttrs = '';
    if ($imgWidth) {
      $sizeAttrs .= ' width="' . $fieldHelpers->esc_attr($imgWidth) . '"';
    }
    if ($imgHeight) {
      $sizeAttrs .= ' height="' . $fieldHelpers->esc_attr($imgHeight) . '"';
    }

    $img = sprintf(
      '<img
        %1$s
        class="%2$s %3$s"
        src="%4$s"
        alt="%5$s"
        %6$s
        style="%7$s"
      />',
      $fieldHelpers->getCustomAttributes('img'),
      $fieldHelpers->getAtomicCls('img'),
      $fieldHelpers->getCustomClasses('img'),
      $fieldHelpers->esc_url($imgSrc),
      $fieldHelpers->esc_attr($alt),
      $sizeAttrs,
      self::getImgInlineStyle($imgWidth, $imgHeight)
    );

    return sprintf(
      '<div
        %1$s
        class="%2$s %3$s"
        style="%4$s"
      >
        %5$s
      </div>',
      $fieldHelpers->getCustomAttributes('fld-wrp'),
      $fieldHelpers->getAtomicCls('fld-wrp'),
      $fieldHelpers->getCustomClasses('fld-wrp'),
      self::getWrapperInlineStyle($imgWidth, $imgHeight),
      $img
    );
  }

  /**
   * @param object $field
   * @param string $prop  width|height
   * @return int 0 when the size is empty/auto
   */
  private static function getSize($field, $prop)
  {
    if (!Helpers::property_exists_nested($field, $prop) || !is_numeric($field->{$prop})) {
      return 0;
    }
    return max(0, intval($field->{$prop}));
  }

  /**
   * Saved builder CSS pins the wrapper to the configured px size and stretches the img to
   * 100%/100% !important, so a wide image overflows (or squashes) narrow forms. Width becomes
   * a maximum and height follows the aspect ratio; on wide forms it still renders at its size.
   * vertical-align drops the inline descender gap now that the wrapper height is auto.
   *
   * @param int $imgWidth
   * @param int $imgHeight
   * @return string
   */
  private static function getImgInlineStyle($imgWidth, $imgHeight)
  {
    $style = 'max-width:100%;vertical-align:top;';
    if ($imgWidth) {
      return $style . 'width:' . $imgWidth . 'px;height:auto !important;';
    }
    if ($imgHeight) {
      // height-only: the attribute alone loses to the saved CSS, and contain keeps the
      // aspect ratio if max-width has to narrow it
      return $style . 'width:auto;height:' . $imgHeight . 'px !important;object-fit:contain;';
    }
    return $style . 'width:auto;height:auto !important;';
  }

  /**
   * @param int $imgWidth
   * @param int $imgHeight
   * @return string
   */
  private static function getWrapperInlineStyle($imgWidth, $imgHeight)
  {
    $style = 'max-width:100%;height:auto;';
    // older saves wrote 0px for an emptied size, which collapsed the wrapper
    if (!$imgWidth) {
      $style .= 'width:auto;';
    }
    if (!$imgHeight) {
      $style .= 'max-height:none;';
    }
    return $style;
  }
}
