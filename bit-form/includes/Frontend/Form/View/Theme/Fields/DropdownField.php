<?php

namespace BitCode\BitForm\Frontend\Form\View\Theme\Fields;

class DropdownField
{
  public static function init($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $inputWrapper = new ClassicInputWrapper($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    $input = self::field($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error, $value);
    return $inputWrapper->wrapper($input);
  }

  private static function field($field, $rowID, $field_name, $form_atomic_Cls_map, $formID, $error = null, $value = null)
  {
    $fh = new ClassicFieldHelpers($field, $rowID, $form_atomic_Cls_map);
    $ph = isset($field->ph) ? $field->ph : '';
    $val = !empty($value) ? $value : $fh->value();
    $val = 'array' === gettype($val) ? ("value='" . implode(',', $val) . "'") : $val;
    $name = $fh->name();
    $req = $fh->required();
    $readonlyCls = isset($field->valid->readonly) ? 'readonly' : '';
    $disabledCls = isset($field->valid->disabled) ? 'disabled' : '';
    $selectedOptImage = '';
    $optionsList = '';
    $activeList = isset($field->config->activeList) ? $field->config->activeList : null;
    $allowCustomOption = apply_filters('bitform_dropdown_allow_custom_option', false, $field);
    $showSearch = !$fh->property_exists_nested($field, 'config->showSearch', false);
    $searchMarkup = '';
    $img = htmlentities("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>");

    $selectedOptImage = apply_filters('bitform_dropdown_selected_opt_image', '', $field, $fh);

    if (property_exists($field, 'optionsList')) {
      foreach ($field->optionsList as $key => $value) {
        $dataIndex = 0;
        $valueArr = (array) $value;
        $listName = array_keys($valueArr)[0];
        $options = array_values($valueArr)[0];

        $optionsList .= sprintf(
          '<ul
            %1$s
            class="%2$s %3$s"
            aria-hidden="true"
            aria-label="Option List"
            data-list="%4$s"
            data-list-index="%5$s"
            tabIndex="-1"
            role="listbox"
          >',
          $fh->getCustomAttributes('option-list'),
          $fh->getAtomicCls('option-list'),
          $fh->getCustomClasses('option-list'),
          $fh->esc_attr($listName),
          $key
        );
        if ($allowCustomOption) {
          $optionsList .= sprintf(
            '<li
              %1$s
              data-index=%2$s
              data-value="create-opt"
              class="option create-opt %3$s"
              role="option"
              aria-selected="false"
              tabIndex="-1"
              style="display: none !important;"
            >
              <span
                %4$s
                class="opt-lbl-wrp %5$s"
              >
                <span
                  %6$s
                  class="opt-lbl %7$s"
                >
                  Create:
                </span>
              </span>
              <span class="opt-prefix"></span>
            </li>',
            $fh->getCustomAttributes('option'),
            $dataIndex,
            $fh->getCustomClasses('option'),
            $fh->getCustomAttributes('opt-lbl-wrp'),
            $fh->getCustomClasses('opt-lbl-wrp'),
            $fh->getCustomAttributes('opt-lbl'),
            $fh->getCustomClasses('opt-lbl')
          );
        }

        foreach ($options as $opt) {
          if (isset($opt->type)) {
            $disableOpt = isset($opt->disabled) ? 'disabled-opt' : '';
            $optionsList .= sprintf(
              '<li
                data-index=%1$s
                %2$s
                class="option opt-group-title %3$s %4$s"
              >
                <span
                  %5$s
                  class="opt-lbl %6$s"
                >
                  %7$s
                </span>
              </li>',
              $dataIndex,
              $fh->getCustomAttributes('option'),
              $fh->getCustomClasses('option'),
              $disableOpt,
              $fh->getCustomAttributes('opt-lbl'),
              $fh->getCustomClasses('opt-lbl'),
              $fh->kses_post($opt->title)
            );
            foreach ($opt->childs as $child) {
              $optVal = isset($child->val) ? $child->val : $child->lbl;
              $disableOpt = (isset($opt->disabled) || isset($child->disabled)) ? 'disabled-opt' : '';
              $optImage = '';
              if (isset($child->img)) {
                $optImage = sprintf(
                  '<img
                    %1$s
                    class="opt-icn %2$s"
                    aria-hidden="true"
                    alt="%3$s"
                    src="%4$s"
                  >',
                  $fh->getCustomAttributes('opt-icn'),
                  $fh->getCustomClasses('opt-icn'),
                  $fh->esc_attr($child->lbl),
                  $fh->esc_url($child->img)
                );
              }
              $optionsList .= sprintf(
                '<li
                  %1$s
                  data-index="%2$s"
                  data-value="%3$s"
                  class="option opt-group-child %4$s %5$s"
                  role="option"
                  aria-selected="false"
                  tabIndex="-1"
                >
                  <span
                    %6$s
                    class="opt-lbl-wrp %7$s"
                  >
                    %8$s
                    <span
                      %9$s
                      class="opt-lbl %10$s"
                    >
                      %11$s
                    </span>
                  </span>
                  <span class="opt-prefix" />
                </li>',
                $fh->getCustomAttributes('option'),
                $dataIndex,
                $fh->esc_attr($optVal),
                $fh->getCustomClasses('option'),
                $disableOpt,
                $fh->getCustomAttributes('opt-lbl-wrp'),
                $fh->getCustomClasses('opt-lbl-wrp'),
                $optImage,
                $fh->getCustomAttributes('opt-lbl'),
                $fh->getCustomClasses('opt-lbl'),
                $fh->kses_post($child->lbl)
              );
            }
          } else {
            $optVal = isset($opt->val) ? $opt->val : $opt->lbl;
            $disableOpt = isset($opt->disabled) ? 'disabled-opt' : '';
            $optImage = '';
            if (isset($opt->img)) {
              $optImage = sprintf(
                '<img
                  %1$s
                  class="opt-icn %2$s"
                  aria-hidden="true"
                  alt="%3$s"
                  src="%4$s"
                >',
                $fh->getCustomAttributes('opt-icn'),
                $fh->getCustomClasses('opt-icn'),
                $fh->esc_attr($opt->lbl),
                $fh->esc_url($opt->img)
              );
            }
            $optionsList .= sprintf(
              '<li
                %1$s
                data-index="%2$s"
                data-value="%3$s"
                class="option %4$s %5$s"
                role="option"
                aria-selected="false"
                tabIndex="-1"
              >
                <span
                  %6$s
                  class="opt-lbl-wrp %7$s"
                >
                  %8$s
                  <span
                    %9$s
                    class="opt-lbl %10$s"
                  >
                    %11$s
                  </span>
                </span>
                <span class="opt-prefix" />
              </li>',
              $fh->getCustomAttributes('option'),
              $dataIndex,
              $fh->esc_attr($optVal),
              $fh->getCustomClasses('option'),
              $disableOpt,
              $fh->getCustomAttributes('opt-lbl-wrp'),
              $fh->getCustomClasses('opt-lbl-wrp'),
              $optImage,
              $fh->getCustomAttributes('opt-lbl'),
              $fh->getCustomClasses('opt-lbl'),
              $fh->kses_post($opt->lbl)
            );
          }
        }
        $optionsList .= '</ul>';
        $dataIndex++;
      }

      $optionsList .= sprintf(
        '<ul
          %1$s
          class="%2$s %3$s active-list"
          aria-hidden="true"
          aria-label="Option List"
          tabIndex="-1"
          role="listbox"
        >
        </ul>',
        $fh->getCustomAttributes('option-list'),
        $fh->getAtomicCls('option-list'),
        $fh->getCustomClasses('option-list')
      );

      $multiChipClass = ($fh->property_exists_nested($field, 'config->multipleSelect', true) && $fh->property_exists_nested($field, 'config->showChip', true)) ? 'multi-chip' : '';

      if ($showSearch) {
        $searchMarkup = sprintf(
          '<div
            %1$s
            class="%2$s %3$s"
          >
            <input
              %4$s
              type="search"
              class="%5$s %6$s"
              placeholder="Search Country"
              aria-label="Search Options"
              aria-hidden="true"
              tabIndex="-1"
              inert
            />
            <svg
              %7$s
              class="%8$s %9$s %10$s"
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
            <button
              %11$s
              type="button"
              aria-label="Clear search"
              class="%12$s %13$s %14$s"
              tabIndex="-1"
            >
              <svg
                width="13"
                height="13"
                role="img"
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
            </button>
          </div>',
          $fh->getCustomAttributes('option-search-wrp'),
          $fh->getAtomicCls('option-search-wrp'),
          $fh->getCustomClasses('option-search-wrp'),
          $fh->getCustomAttributes('opt-search-input'),
          $fh->getAtomicCls('opt-search-input'),
          $fh->getCustomClasses('opt-search-input'),
          $fh->getCustomAttributes('opt-search-icn'),
          $fh->getAtomicCls('icn'),
          $fh->getAtomicCls('opt-search-icn'),
          $fh->getCustomClasses('opt-search-icn'),
          $fh->getCustomAttributes('search-clear-btn'),
          $fh->getAtomicCls('icn'),
          $fh->getAtomicCls('search-clear-btn'),
          $fh->getCustomClasses('search-clear-btn')
        );
      }

      return sprintf(
        '<div class="%1$s %2$s">
          <div
            %3$s
            class="%4$s %5$s %6$s %7$s"
          >
            <input
              %8$s
              %9$s
              type="text"
              title="Dropdown Hidden Input"
              class="%10$s d-none"
              %11$s
              %12$s
              %13$s
            />
            <div
              %14$s
              class="%15$s %16$s"
              role="combobox"
              aria-controls=""
              aria-haspopup="listbox"
              aria-live="assertive"
              aria-expanded="false"
              tabIndex="0"
              aria-label="Dropdown"
            >
              <div
                %17$s
                class="%18$s %19$s"
              >
                %20$s
                <span
                  %21$s
                  aria-label="Selected Option Label"
                  class="%22$s %23$s %24$s"
                >
                  %25$s
                </span>
              </div>
              <div
                %26$s
                class="%27$s %28$s"
              >
                <button
                  %29$s
                  type="button"
                  aria-label="Clear selected option value"
                  class="%30$s %31$s"
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
                </button>
                <div
                  %32$s
                  class="%33$s %34$s"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    title="Down icon"
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
              %35$s
              class="%36$s %37$s"
            >
              <div
                %38$s
                class="%39$s %40$s"
              >
                %41$s
                %42$s
              </div>
            </div>
          </div>
        </div>',
        $fh->getAtomicCls('dpd-fld-container'),         // 1
        $fh->getCustomClasses('dpd-fld-container'),     // 2
        $fh->getCustomAttributes('dpd-fld-wrp'),        // 3
        $fh->getAtomicCls('dpd-fld-wrp'),               // 4
        $fh->getCustomClasses('dpd-fld-wrp'),           // 5
        $readonlyCls,                                   // 6
        $disabledCls,                                   // 7
        $name,                                          // 8
        $req,                                           // 9
        $fh->getAtomicCls('dpd-hidden-input'),          // 10
        $fh->disabled(),                                // 11
        $fh->readonly(),                                // 12
        $val,                                           // 13
        $fh->getCustomAttributes('dpd-wrp'),            // 14
        $fh->getAtomicCls('dpd-wrp'),                   // 15
        $fh->getCustomClasses('dpd-wrp'),               // 16
        $fh->getCustomAttributes('selected-opt-wrp'),   // 17
        $fh->getAtomicCls('selected-opt-wrp'),          // 18
        $fh->getCustomClasses('selected-opt-wrp'),      // 19
        $selectedOptImage,                              // 20
        $fh->getCustomAttributes('selected-opt-lbl'),   // 21
        $fh->getAtomicCls('selected-opt-lbl'),          // 22
        $multiChipClass,                                // 23
        $fh->getCustomClasses('selected-opt-lbl'),      // 24
        $fh->esc_html($ph),                             // 25
        $fh->getCustomAttributes('dpd-btn-wrp'),        // 26
        $fh->getAtomicCls('dpd-btn-wrp'),               // 27
        $fh->getCustomClasses('dpd-btn-wrp'),           // 28
        $fh->getCustomAttributes('selected-opt-clear-btn'), // 29
        $fh->getAtomicCls('selected-opt-clear-btn'),    // 30
        $fh->getCustomClasses('selected-opt-clear-btn'), // 31
        $fh->getCustomAttributes('dpd-down-btn'),       // 32
        $fh->getAtomicCls('dpd-down-btn'),              // 33
        $fh->getCustomClasses('dpd-down-btn'),          // 34
        $fh->getCustomAttributes('option-wrp'),         // 35
        $fh->getAtomicCls('option-wrp'),                // 36
        $fh->getCustomClasses('option-wrp'),            // 37
        $fh->getCustomAttributes('option-inner-wrp'),   // 38
        $fh->getAtomicCls('option-inner-wrp'),          // 39
        $fh->getCustomClasses('option-inner-wrp'),      // 40
        $searchMarkup,                                  // 41
        $optionsList                                    // 42
      );
    }
  }
}
