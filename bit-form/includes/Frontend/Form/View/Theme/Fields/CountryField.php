<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

class CountryField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ClassicInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    return $inputWrapper->wrapper($input);
  }

  private static function field($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $fieldHelpers = new ClassicFieldHelpers($field, $rowID, $form_atomic_Cls_map);
    $asset_url = BITFORMS_ASSET_URI;
    $img_url = BITFORMS_ASSET_URI . '/../static/countries/';
    $req = $fieldHelpers->required();
    $disabled = $fieldHelpers->disabled();
    $readonly = $fieldHelpers->readonly();
    $name = $fieldHelpers->name();
    $ariaDescribedBy = $fieldHelpers->ariaDescribedBy();
    $ariaRequired = $fieldHelpers->ariaRequired();
    $selectedFlagImage = '';
    $tabIndx = isset($field->disabled) ? -1 : 0;
    $selectedCountryClearable = '';
    $searchPlaceholder = '';
    $searchClearable = '';
    $options = '';
    $readonlyCls = isset($field->readonly) ? 'readonly' : '';
    $disabledCls = isset($field->disabled) ? 'disabled' : '';
    $val = $fieldHelpers->value();

    $selectedItm = null;
    foreach ($field->options as $opt) {
      if (isset($opt->check) && true === $opt->check) {
        $selectedItm = $opt;
        break;
      }
    }
    if ($selectedItm) {
      $img = $img_url . $selectedItm->img;
      $ph = $selectedItm->lbl;
    } else {
      $img = esc_url(includes_url('images/blank.gif'));
      $ph = isset($field->ph) ? $field->ph : '';
    }

    if ($fieldHelpers->property_exists_nested($field, 'config->selectedFlagImage', true)) {
      $img = sprintf(
        '<img
          %1$s
          class="%2$s %3$s"
          aria-hidden="true"
          alt="selected country flag"
          src="%4$s"
        >',
        $fieldHelpers->getCustomAttributes('selected-country-img'),
        $fieldHelpers->getAtomicCls('selected-country-img'),
        $fieldHelpers->getCustomClasses('selected-country-img'),
        $img
      );
    } else {
      $img = '';
    }

    $selectedFlagImage = sprintf(
      '<div class="%1$s">
        %2$s
        <span
          %3$s
          class="%4$s %5$s"
        >
          %6$s
        </span>
      </div>',
      $fieldHelpers->getAtomicCls('selected-country-wrp'),
      $img,
      $fieldHelpers->getCustomAttributes('selected-country-lbl'),
      $fieldHelpers->getAtomicCls('selected-country-lbl'),
      $fieldHelpers->getCustomClasses('selected-country-lbl'),
      $fieldHelpers->esc_html($ph)
    );

    if ($fieldHelpers->property_exists_nested($field, 'config->selectedCountryClearable', true)) {
      $selectedCountryClearable = sprintf(
        '<button
          %1$s
          type="button"
          title="Clear selected country value"
          class="%2$s %3$s"
        >
          <svg
            width="15"
            height="15"
            role="img"
            title="Cross icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>',
        $fieldHelpers->getCustomAttributes('inp-clr-btn'),
        $fieldHelpers->getAtomicCls('inp-clr-btn'),
        $fieldHelpers->getCustomClasses('inp-clr-btn')
      );
    }

    if ($fieldHelpers->property_exists_nested($field, 'config->searchPlaceholder', '', 1)) {
      $searchPlaceholder = "placeholder='{$fieldHelpers->esc_attr($field->config->searchPlaceholder)}'";
    }

    if ($fieldHelpers->property_exists_nested($field, 'config->searchClearable', true)) {
      $searchClearable = sprintf(
        '<button
          %1$s
          type="button"
          title="Clear search"
          class="%2$s %3$s %4$s"
          tabIndex="-1"
        >
          <svg
            width="13"
            height="13"
            role="img"
            title="Cross icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>',
        $fieldHelpers->getCustomAttributes('search-clear-btn'),
        $fieldHelpers->getAtomicCls('icn'),
        $fieldHelpers->getAtomicCls('search-clear-btn'),
        $fieldHelpers->getCustomClasses('search-clear-btn')
      );
    }

    return sprintf(
      '<div class="%1$s">
        <div
          %2$s
          class="%3$s %4$s %5$s %6$s"
        >
          <input
            %7$s
            %8$s
            %9$s
            %10$s
            type="text"
            title="Country Hidden Input"
            class="%11$s d-none"
            %12$s
            %13$s
            %14$s
          />
          <div
            class="%15$s"
            aria-live="assertive"
            aria-label="Select a Country"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded="false"
            tabIndex="%16$s"
          >
            %17$s
            <div class="%18$s">
              %19$s
              <div class="%20$s">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  title="Cross icon"
                  role="img"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
          <div
            %21$s
            class="%22$s %23$s"
          >
            <div class="%24$s">
              <div class="%25$s">
                <input
                  %26$s
                  type="search"
                  class="%27$s %28$s"
                  %29$s
                  autoComplete="country-name"
                  tabIndex="-1"
                />
                <svg
                  %30$s
                  class="%31$s %32$s"
                  aria-hidden="true"
                  width="22"
                  height="22"
                  role="img"
                  title="Search icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                %33$s
              </div>
              <ul
                %34$s
                class="%35$s %36$s"
                tabIndex="-1"
                role="listbox"
                aria-label="country list"
              >
                %37$s
              </ul>
            </div>
          </div>
        </div>
      </div>',
      $fieldHelpers->getAtomicCls('country-fld-container'),    // 1
      $fieldHelpers->getCustomAttributes('country-fld-wrp'),   // 2
      $fieldHelpers->getAtomicCls('country-fld-wrp'),          // 3
      $fieldHelpers->getCustomClasses('country-fld-wrp'),      // 4
      $disabled,                                               // 5
      $readonly,                                               // 6
      $name,                                                   // 7
      $req,                                                    // 8
      $ariaRequired,                                           // 9
      $ariaDescribedBy,                                        // 10
      $fieldHelpers->getAtomicCls('country-hidden-input'),     // 11
      $disabled,                                               // 12
      $readonly,                                               // 13
      $val,                                                    // 14
      $fieldHelpers->getAtomicCls('dpd-wrp'),                  // 15
      $tabIndx,                                                // 16
      $selectedFlagImage,                                      // 17
      $fieldHelpers->getAtomicCls('dpd-btn-wrp'),              // 18
      $selectedCountryClearable,                               // 19
      $fieldHelpers->getAtomicCls('dpd-down-btn'),             // 20
      $fieldHelpers->getCustomAttributes('option-wrp'),        // 21
      $fieldHelpers->getAtomicCls('option-wrp'),               // 22
      $fieldHelpers->getCustomClasses('option-wrp'),           // 23
      $fieldHelpers->getAtomicCls('option-inner-wrp'),         // 24
      $fieldHelpers->getAtomicCls('option-search-wrp'),        // 25
      $fieldHelpers->getCustomAttributes('opt-search-input'),  // 26
      $fieldHelpers->getAtomicCls('opt-search-input'),         // 27
      $fieldHelpers->getCustomClasses('opt-search-input'),     // 28
      $searchPlaceholder,                                      // 29
      $fieldHelpers->getCustomAttributes('opt-search-icn'),    // 30
      $fieldHelpers->getAtomicCls('opt-search-icn'),           // 31
      $fieldHelpers->getCustomClasses('opt-search-icn'),       // 32
      $searchClearable,                                        // 33
      $fieldHelpers->getCustomAttributes('option-list'),       // 34
      $fieldHelpers->getAtomicCls('option-list'),              // 35
      $fieldHelpers->getCustomClasses('option-list'),          // 36
      $options                                                 // 37
    );
  }
}
