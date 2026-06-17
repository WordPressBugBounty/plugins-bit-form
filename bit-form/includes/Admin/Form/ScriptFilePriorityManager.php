<?php

namespace BitCode\BitForm\Admin\Form;

class ScriptFilePriorityManager
{
  public static function jsFile()
  {
    /**
     * file load priority
     * first priority status code 100
     *  sub status code link 101,102
     * second priority status code 200
     *  sub status code link 201,202, 203
     * continue..........
     * priority = 100 range for helper file
     * priority = 200 range for field file
     * priority = 300 range for script file
     * priority = 400 range for custom script file
     * priority = 500 range for js init for custom field file
     * priority = 600 range for js init for CDN field file
     * Priority = 700 range for validation js file
     * priority = 800 range for conditional js file
     * @array [fieldType] => [
     *  priority => 'choose one of the priority status code',
     *  filename => 'fileName',
     *  scriptTyp => 'script' or 'init' or 'custom' by default script
     *  source => 'filePath' or 'url' or 'cdn' or className or customClassName by scriptTyp && by default it will be 'filePath'=> 'assets/js/fileName.js'',
     *  fk => 'field key'
     *  field => 'field object'
     * ]

     * final priority
        helper js
        common js
        custom field script js
        init for custom field js
        inti for CDN field js
        validation js
        confirmation js
        conditional js
        submit js
        custom js
     */
    $initSource = '\\BitCode\\BitForm\\Admin\\Form\\InitJs\\';
    $files = [
      'helperScript' => [
        ['priority' => 101, 'filename' => 'bfSelect.min.js'],
        ['priority' => 101, 'filename' => 'bfReset.min.js'],
        ['priority' => 101, 'filename' => 'setBFMsg.min.js'],
        ['priority' => 101, 'filename' => 'bfSplit.min.js'],
        ['priority' => 101, 'filename' => 'scrollToElm.min.js'],
        ['priority' => 101, 'filename' => 'getFldKeyAndRowIndx.min.js'],
        ['priority' => 101, 'filename' => 'moveToFirstErrFld.min.js'],
        ['priority' => 101, 'filename' => 'bfValidationErrMsg.min.js'],
        ['priority' => 101, 'filename' => 'setHiddenFld.min.js'],
        ['priority' => 101, 'filename' => 'submit-form.min.js'],
        ['priority' => 101, 'filename' => 'setStyleProperty.min.js']
      ],

      'text' => [
        ['priority' => 301, 'filename' => 'initTextLengthHelper.min.js', 'paths' => ['valid->minlength', 'valid->maxlength', 'valid->maxword', 'valid->minword']],
      ],
      'textarea' => [
        ['priority' => 301, 'filename' => 'initTextLengthHelper.min.js', 'paths' => ['valid->minlength', 'valid->maxlength', 'valid->maxword', 'valid->minword']],
      ],
      'range' => [
        ['priority' => 301, 'filename' => 'setSliderFieldValue.min.js', 'path' => 'showValue'],
      ],
      'password' => [
        ['priority' => 301, 'filename' => 'initPasswordStrengthHelper.min.js', 'path' => 'valid->validations'],
        ['priority' => 301, 'filename' => 'bfTogglePasswordVisibility.min.js', 'path' => 'config->showPasswordIcon'],
      ],
      'address' => [
        ['priority' => 101, 'filename' => 'observeElm.min.js'],
        ['priority' => 301, 'filename' => 'bit-address-field.min.js'],
        ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
      ],
      'country' => [
        ['priority' => 101, 'filename' => 'observeElm.min.js'],
        ['priority' => 301, 'filename' => 'bit-country-field.min.js'],
        ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
        ['priority' => 101, 'filename' => 'observeElm.min.js'],
      ],
      'currency' => [
        ['priority' => 101, 'filename' => 'observeElm.min.js'],
        ['priority' => 301, 'filename' => 'bit-currency-field.min.js'],
        ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
        ['priority' => 101, 'filename' => 'observeElm.min.js'],
      ],
      'select' => [
        ['priority' => 101, 'filename' => 'observeElm.min.js'],
        ['priority' => 301, 'filename' => 'bit-select-field.min.js'],
        ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
        ['priority' => 101, 'filename' => 'observeElm.min.js'],
      ],
      'file-up' => [
        ['priority' => 301, 'filename' => 'bit-file-up-field.min.js'],
        ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
      ],
      'phone-number' => [
        ['priority' => 101, 'filename' => 'observeElm.min.js'],
        ['priority' => 301, 'filename' => 'bit-phone-number-field.min.js'],
        ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
        // ['priority' => 101, 'filename' => 'observeElm.min.js'],
      ],
      'section' => [
        ['priority' => 101, 'filename' => 'hideChildFldHandle.min.js'],
      ],
      'repeater' => [
        ['priority' => 101, 'filename' => 'hideChildFldHandle.min.js'],
        ['priority' => 102, 'filename' => 'bit-repeater-field.min.js'],
        ['priority' => 701, 'filename' => 'checkRepeatedField.min.js'],
        ['priority' => 701, 'filename' => 'isRepeaterField.min.js'],
        ['priority' => 701, 'filename' => 'getRepeatedIndexes.min.js'],
        ['priority' => 701, 'filename' => 'getIndexesBaseOnConditions.min.js'],
        ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
      ],
      'recaptcha' => [
        ['priority' => 301, 'filename' => 'bit-recaptcha-field.min.js'],
        ['priority' => 302, 'filename' => 'scriptLoader.min.js'],
        ['priority' => 303, 'filename' => 'initRecaptchaFld.min.js'],
      ],
      'hcaptcha' => [
        ['priority' => 301, 'filename' => 'bit-hcaptcha-field.min.js'],
        ['priority' => 302, 'filename' => 'scriptLoader.min.js'],
        ['priority' => 303, 'filename' => 'initHCaptchaFld.min.js'],
      ],
      'turnstile' => [
        ['priority' => 302, 'filename' => 'scriptLoader.min.js'],
        ['priority' => 303, 'filename' => 'initTurnstileFld.min.js'],
      ],
      'decision-box' => [
        ['priority' => 101, 'filename' => 'decisionFldHandle.min.js'],
      ],
      'gdpr' => [
        ['priority' => 101, 'filename' => 'decisionFldHandle.min.js'],
      ],
      'rating' => [
        ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
        ['priority' => 301, 'filename' => 'bit-rating-field.min.js'],
      ],
      'date' => [
        ['priority' => 301, 'filename' => 'bfDateFieldsLogicCheck.min.js'],
        ['priority' => 301, 'filename' => 'bfCalculateDateTimeDifference.min.js'],
        ['priority' => 301, 'filename' => 'bfAddOrSubtractDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfParseDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfFormatDateTime.min.js'],
      ],
      'datetime-local' => [
        ['priority' => 301, 'filename' => 'bfDateFieldsLogicCheck.min.js'],
        ['priority' => 301, 'filename' => 'bfCalculateDateTimeDifference.min.js'],
        ['priority' => 301, 'filename' => 'bfAddOrSubtractDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfParseDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfFormatDateTime.min.js'],
      ],
      'time' => [
        ['priority' => 301, 'filename' => 'bfDateFieldsLogicCheck.min.js'],
        ['priority' => 301, 'filename' => 'bfCalculateDateTimeDifference.min.js'],
        ['priority' => 301, 'filename' => 'bfAddOrSubtractDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfParseDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfFormatDateTime.min.js'],
      ],
      'month' => [
        ['priority' => 301, 'filename' => 'bfDateFieldsLogicCheck.min.js'],
        ['priority' => 301, 'filename' => 'bfCalculateDateTimeDifference.min.js'],
        ['priority' => 301, 'filename' => 'bfAddOrSubtractDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfParseDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfFormatDateTime.min.js'],
      ],
      'week' => [
        ['priority' => 301, 'filename' => 'bfDateFieldsLogicCheck.min.js'],
        ['priority' => 301, 'filename' => 'bfCalculateDateTimeDifference.min.js'],
        ['priority' => 301, 'filename' => 'bfAddOrSubtractDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfParseDateTime.min.js'],
        ['priority' => 301, 'filename' => 'bfFormatDateTime.min.js'],
      ],
    ];

    /**
     * Allow add-on plugins (e.g. Pro) to register additional script files
     * without shipping those files/paths in the wp.org (free) package.
     */
    return apply_filters('bitform_script_file_priority_list', $files);
  }

  public static function getAllFldConfs()
  {
    // $contentId = $fieldData['contentId'];
    // $fieldKey = $fieldData['fk'];
    // $field = $fieldData['field'];
    // key is config path, value is field path
    // var is for variable value
    // path is for field path [ for multiple paths]
    // val is for static value
    $configs = [

      'select' => [
        'config'                => (object) [],  // sentinel: blocks raw fldData.config passthrough;
        'fieldKey'              => ['var' => 'fieldKey'],
        'options'               => ['path' => 'optionsList'],
        'placeholder'           => ['path' => 'ph'],
        'classNames'            => ['path' => 'customClasses'],
        'attributes'            => ['path' => 'customAttributes'],
        'defaultValue'          => ['path' => ['val', 'config->defaultValue'], 'val' => ''],
        'separator'             => ['val' => BITFORMS_BF_SEPARATOR],
        'multipleSelect'        => ['path' => 'config->multipleSelect', 'val' => false],
        'showChip'              => ['path' => 'config->showChip', 'val' => false],
        'selectedOptClearable'  => ['path' => 'config->selectedOptClearable', 'val' => true],
        'searchClearable'       => ['path' => 'config->searchClearable', 'val' => true],
        'searchPlaceholder'     => ['path' => 'config->searchPlaceholder', 'val' => ''],
        'activeList'            => ['path' => 'config->activeList', 'val' => 0],
      ],
      'address' => [
        'config'             => (object) [],
        'fieldKey'           => ['var' => 'fieldKey'],
        'contentId'          => ['var' => 'contentId'],
        'assetsURL'          => ['val' => BITFORMS_ROOT_URI . '/static/address/'],
        'fieldName'          => ['path' => 'fieldName'],
        'classNames'         => ['path' => 'customClasses'],
        'attributes'         => ['path' => 'customAttributes'],
        'defaultCountry'     => ['path' => 'config->defaultCountry',     'val' => ''],
        'zipValidation'      => ['path' => 'config->zipValidation',      'val' => 'auto'],
        'zipCustomRegex'     => ['path' => 'config->zipCustomRegex',     'val' => ''],

      ],
      'country' => [
        'config'                    => (object) [],  // sentinel: blocks raw fldData.config passthrough;
        'fieldKey'                  => ['var' => 'fieldKey'],
        'options'                   => ['path' => 'options'],
        'placeholder'               => ['path' => 'ph'],
        'assetsURL'                 => ['val' => BITFORMS_ROOT_URI . '/static/countries/'],
        'classNames'                => ['path' => 'customClasses'],
        'attributes'                => ['path' => 'customAttributes'],
        'defaultValue'              => ['path' => ['val', 'config->defaultValue'], 'val' => ''],
        'selectedCountryClearable'  => ['path' => 'config->selectedCountryClearable', 'val' => true],
        'searchClearable'           => ['path' => 'config->searchClearable', 'val' => true],
        'searchPlaceholder'         => ['path' => 'config->searchPlaceholder', 'val' => ''],
      ],
      'currency' => [
        'config'                    => (object) [],  // sentinel: blocks raw fldData.config
        'fieldKey'                  => ['var' => 'fieldKey'],
        'options'                   => ['path' => 'options'],
        'assetsURL'                 => ['val' => BITFORMS_ROOT_URI . '/static/currencies/'],
        'classNames'                => ['path' => 'customClasses'],
        'attributes'                => ['path' => 'customAttributes'],
        'defaultValue'              => ['path' => ['val', 'config->defaultValue'], 'val' => ''],
        'selectedCurrencyClearable' => ['path' => 'config->selectedCurrencyClearable', 'val' => true],
        'searchClearable'           => ['path' => 'config->searchClearable', 'val' => true],
        'searchPlaceholder'         => ['path' => 'config->searchPlaceholder',       'val' => ''],
      ],
      'phone-number' => [
        'config'                    => (object) [],  // sentinel: blocks raw fldData.config passthrough;
        'fieldKey'                  => ['var' => 'fieldKey'],
        'options'                   => ['path' => 'options'],
        'assetsURL'                 => ['val' => BITFORMS_ROOT_URI . '/static/countries/'],
        'classNames'                => ['path' => 'customClasses'],
        'attributes'                => ['path' => 'customAttributes'],
        'contentId'                 => ['var' => 'contentId'],
        'selectedCountryClearable'  => ['path' => 'config->selectedCountryClearable', 'val' => true],
        'searchClearable'           => ['path' => 'config->searchClearable', 'val' => true],
        'searchPlaceholder'         => ['path' => 'config->searchPlaceholder',       'val' => ''],
      ],
      'file-up' => [
        'config'           => (object) [],  // sentinel: blocks raw fldData.config passthrough;
        'fieldKey'         => ['var' => 'fieldKey'],
        'formID'           => ['var' => 'formId'],
        'maxSizeErrMsg'    => ['path' => ['err->maxSize->msg', 'err->maxSize->dflt']],
        'minFileErrMsg'    => ['path' => ['err->minFile->msg', 'err->minFile->dflt']],
        'maxFileErrMsg'    => ['path' => ['err->maxFile->msg', 'err->maxFile->dflt']],
        'assetsURL'        => ['val' => BITFORMS_ROOT_URI . '/static/file-upload/'],
        'classNames'       => ['path' => 'customClasses'],
        'attributes'       => ['path' => 'customAttributes'],
        'fieldName'        => ['path' => 'fieldName'],
        'contentId'        => ['var' => 'contentId'],
        'multiple'         => ['path' => 'config->multiple',        'val' => false],
        'allowMaxSize'     => ['path' => 'config->allowMaxSize',    'val' => false],
        'maxSize'          => ['path' => 'config->maxSize',         'val' => 0],
        'sizeUnit'         => ['path' => 'config->sizeUnit',        'val' => 'KB'],
        'isItTotalMax'     => ['path' => 'config->isItTotalMax',    'val' => false],
        'allowedFileType'  => ['path' => 'config->allowedFileType', 'val' => ''],
        'minFile'          => ['path' => 'config->minFile',         'val' => 0],
        'maxFile'          => ['path' => 'config->maxFile',         'val' => 0],
        'showSelectStatus' => ['path' => 'config->showSelectStatus', 'val' => false],
        'fileSelectStatus' => ['path' => 'config->fileSelectStatus', 'val' => 'No File Selected'],
        'fileExistMsg'     => ['val' => 'A file already exist'],
        'showFileList'     => ['path' => 'config->showFileList',     'val' => false],
        'showFilePreview'  => ['path' => 'config->showFilePreview',  'val' => false],
        'showFileSize'     => ['path' => 'config->showFileSize',     'val' => false],
        'fileExistMsg'     => ['path' => 'config->fileExistMsg',     'val' => 'A file already exist'],
      ],
      'repeater' => [
        'config'          => (object) [],
        'fieldKey'        => ['var' => 'fieldKey'],
        'fieldName'       => ['path' => 'fieldName'],
        'contentId'       => ['var' => 'contentId'],
        'showAddBtn'      => ['path' => 'addBtn->show',      'val' => false],
        'showAddToEndBtn' => ['path' => 'addToEndBtn->show', 'val' => false],
        'defaultValue'    => ['path' => 'val',               'val' => ''],
      ],
      'rating' => [
        'fieldKey'                     => ['var' => 'fieldKey'],
        'contentId'                    => ['var' => 'contentId'],
        'options'                      => ['path' => 'opt'],
        'selectedRating'               => ['path' => 'selectedRating'],
        'defaultValue'                 => ['path' => ['val', 'config->defaultValue'], 'val'=> ''],
      ],
      'hcaptcha'=> [
        'fieldKey'                     => ['var'=>'fieldKey']
      ],
    ];
    /**
     * Allow add-on plugins to extend field config mappings.
     */
    return apply_filters('bitform_field_config_paths', $configs);
  }

  public static function multiStepFiles()
  {
    return [
      ['priority' => 201, 'filename' => 'customFieldsReset.min.js'],
      ['priority' => 201, 'filename' => 'isFormValidatedWithoutError.min.js'],
      ['priority' => 202, 'filename' => 'saveFormProgress.min.js'],
      ['priority' => 700, 'filename' => 'bit-multi-step-form.min.js'],
    ];
  }

  public static function conversationalFormFiles()
  {
    return [
      ['priority' => 202, 'filename' => 'saveFormProgress.min.js'],
      ['priority' => 700, 'filename' => 'bit-conversational-form.min.js'],
      ['priority' => 700, 'filename' => 'handleConversationalFormMsg.min.js'],
    ];
  }

  public static function frontendScriptFile()
  {
    return [
      'observeElm'            => ['priority' => 101, 'filename' => 'observeElm.min.js'],
      'hidden-token-field'    => ['priority' => 300, 'filename' => 'hidden-token-field.min.js'],
    ];
  }

  public static function validationAndOtherScriptFile()
  {
    $files = [
      'confirmFldMatch'                  => ['priority' => 701, 'filename' => 'confirmFldMatch.min.js'],
      'checkFldValidation'               => ['priority' => 701, 'filename' => 'checkFldValidation.min.js'],
      // 'checkMinMaxOptions'               => ['priority' => 702, 'filename' => 'checkMinMaxOptions.min.js'],
      // 'bfDatetimeFldValidation'          => ['priority' => 702, 'filename' => 'bfDatetimeFldValidation.min.js'],
      'bfParseDateTime'                  => ['priority' => 301, 'filename' => 'bfParseDateTime.min.js'],
      'checkMinMaxValue'                 => ['priority' => 702, 'filename' => 'checkMinMaxValue.min.js'],
      'textLengthValidation'             => ['priority' => 702, 'filename' => 'textLengthValidation.min.js'],
      'customOptionValidation'           => ['priority' => 702, 'filename' => 'customOptionValidation.min.js'],
      'dcsnbxFldValidation'              => ['priority' => 702, 'filename' => 'dcsnbxFldValidation.min.js'],
      'emailFldValidation'               => ['priority' => 702, 'filename' => 'emailFldValidation.min.js'],
      'fileupFldValidation'              => ['priority' => 702, 'filename' => 'fileupFldValidation.min.js'],
      'advanceFileupFldValidation'       => ['priority' => 702, 'filename' => 'advanceFileUpFldValidation.min.js'],
      'phoneNumberFldValidation'         => ['priority' => 702, 'filename' => 'phoneNumberFldValidation.min.js'],
      'currencyFldValidation'            => ['priority' => 702, 'filename' => 'currencyFldValidation.min.js'],
      'addressZipFldValidation'          => ['priority' => 702, 'filename' => 'addressZipFldValidation.min.js'],
      'generateBackslashPattern'         => ['priority' => 700, 'filename' => 'generateBackslashPattern.min.js'],
      // 'nmbrFldValidation'                => ['priority' => 702, 'filename' => 'nmbrFldValidation.min.js'],
      // 'regexPatternValidation'           => ['priority' => 701, 'filename' => 'regexPatternValidation.min.js'], // load before generateBackslashPattern file, then load  regexPatternValidation
      'inputMaskValidation'              => ['priority' => 701, 'filename' => 'inputMaskValidation.min.js'], // load before generateBackslashPattern file, then load  inputMaskValidation
      'bit-input-mask'                   => ['priority' => 701, 'filename' => 'bit-input-mask.min.js'], // load before generateBackslashPattern file, then load  bit-input-mask
      'setBitInputMaskToInput'           => ['priority' => 702, 'filename' => 'setBitInputMaskToInput.min.js'], // load before generateBackslashPattern file, then load  setBitInputMaskToInput
      'requiredFldValidation'            => ['priority' => 700, 'filename' => 'requiredFldValidation.min.js'],
      'urlFldValidation'                 => ['priority' => 702, 'filename' => 'urlFldValidation.min.js'],
      'validation'                       => ['priority' => 705, 'filename' => 'validateForm.min.js'], // last priority for validation script
      'conditionalLogic'                 => ['priority' => 705, 'filename' => 'bit-conditionals.min.js'], // last priority for validation script
      'resetPlaceholders'                => ['priority' => 201, 'filename' => 'resetPlaceholders.min.js'],
      'bfResetDefaultValue'              => ['priority' => 201, 'filename' => 'bfResetDefaultValue.min.js'],
      'validateFocusLost'                => ['priority' => 706, 'filename' => 'validate-focus.min.js'], // last priority for validation script
    ];

    /**
     * Allow add-on plugins to register additional validation scripts.
     */
    return apply_filters('bitform_validation_and_other_script_files', $files);
  }

  public static function validationScriptFileMapping($fieldType)
  {
    $textTypeField = ['text', 'password', 'username', 'color'];
    if (in_array($fieldType, $textTypeField)) {
      $fieldType = 'text';
    }
    $fields =
      [
        'text' => [
          'bit-input-mask' => [
            'paths' => ['valid->inputMask'],
          ],
          'inputMaskValidation' => [
            'paths'        => ['valid->inputMask'],
            'dependencies' => [
              'generateBackslashPattern',
              'validation',
            ]
          ],
          'setBitInputMaskToInput' => [
            'paths'        => ['valid->inputMask'],
            'dependencies' => [
              'bit-input-mask'
            ]
          ],
          'textLengthValidation' => [
            'paths' => ['valid->minlength', 'valid->maxlength', 'valid->minword', 'valid->maxword']
          ],
          'confirmFldMatch' => [
            'paths' => ['parentFieldKey'],
          ]

        ],
        'textarea' => [
          'bit-input-mask' => [
            'paths' => ['valid->inputMask'],
          ],
          'inputMaskValidation' => [
            'paths'        => ['valid->inputMask'],
            'dependencies' => [
              'generateBackslashPattern',
              'validation',
            ]
          ],
          'setBitInputMaskToInput' => [
            'paths'        => ['valid->inputMask'],
            'dependencies' => [
              'bit-input-mask'
            ]
          ],
          'textLengthValidation' => [
            'paths' => ['valid->minlength', 'valid->maxlength', 'valid->minword', 'valid->maxword']
          ]
        ],
        'email' => [
          'emailFldValidation' => [
            'paths'        => ['err->invalid->show'],
            'dependencies' => [
              'generateBackslashPattern'
            ]
          ],
          'confirmFldMatch' => [
            'paths' => ['parentFieldKey'],
          ]
        ],
        'number' => [
          'nmbrFldValidation' => [
            'paths' => ['mn', 'mx']
          ]
        ],
        'range' => [
          'checkMinMaxValue' => [
            'paths' => ['mn', 'mx']
          ]
        ],
        'url' => [
          'urlFldValidation' => [
            'paths'        => ['err->invalid->show'],
            'dependencies' => [
              'generateBackslashPattern'
            ]
          ],
          'bit-input-mask' => [
            'paths' => ['valid->inputMask'],
          ],
          'inputMaskValidation' => [
            'paths'        => ['valid->inputMask'],
            'dependencies' => [
              'generateBackslashPattern',
              'validation',
            ]
          ],
          'setBitInputMaskToInput' => [
            'paths'        => ['valid->inputMask'],
            'dependencies' => [
              'bit-input-mask'
            ]
          ]
        ],
        'decision-box' => [
          'dcsnbxFldValidation' => [
            'paths' => ['valid->req']
          ]
        ],
        'gdpr' => [
          'dcsnbxFldValidation' => [
            'paths' => ['valid->req']
          ]
        ],
        'file-up' => [
          'fileupFldValidation' => [
            'paths' => ['valid->req']
          ]
        ],
        'phone-number' => [
          'phoneNumberFldValidation' => [
            'paths'        => ['err->invalid->show'],
          ]
        ],
        'address' => [
          'addressZipFldValidation' => [
            'paths'        => ['config->zipValidation'],
            'dependencies' => [
              'validation',
            ]
          ]
        ],
      ];
    $mapping = isset($fields[$fieldType]) ? $fields[$fieldType] : [];

    /**
     * Allow pro add-ons to extend/override mapping per field type.
     */
    return apply_filters('bitform_field_validation_script_file_mapping', $mapping, $fieldType);
  }
}
