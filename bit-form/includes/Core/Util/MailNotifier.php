<?php

namespace BitCode\BitForm\Core\Util;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Admin\Form\Helpers;
use BitCode\BitForm\Core\Database\FormEntryMetaModel;
use BitCode\BitForm\Core\Form\FormManager;
use BitCode\BitForm\Core\Messages\EmailTemplateHandler;
use BitCode\BitForm\Core\Messages\PdfTemplateHandler;

final class MailNotifier
{
  public static function notify($notifyDetails, $formID, $fieldValue, $entryID, $isDblOptin = false, $logId = '')
  {
    $apiResponse = new ApiResponse();
    $formManager = FormManager::getInstance($formID);
    $entryDetails = ['formId' => $formID, 'entryId' => $entryID, 'fieldValues' => $fieldValue];
    $emailTemplateHandler = new EmailTemplateHandler($formID);
    $attachments = [];
    $tempPdfLink = '';
    $pdfPassForEmail = '';
    if (!empty($notifyDetails->pdfId) && is_string($notifyDetails->pdfId)) {
      $pdfTemplateID = json_decode($notifyDetails->pdfId)->id;
      $pdfTemplateHandler = new PdfTemplateHandler($formID);

      $pdfTemplate = $pdfTemplateHandler->getById($pdfTemplateID);

      // Bail out if the template lookup failed (WP_Error) or returned no row.
      // Without this guard json_decode($pdfTemplate[0]->setting) fatals and the whole email is lost.
      if (is_wp_error($pdfTemplate) || empty($pdfTemplate[0]) || !isset($pdfTemplate[0]->setting)) {
        $apiResponse->apiResponse($logId, '', ['type' => 'record', 'type_name' => 'pdf'], 'errors', 'PDF template not found, skipping PDF attachment.', $entryDetails);
        Log::debug_log([
          'status'          => 'error',
          'code'            => 'pdf_template_not_found',
          'message'         => 'PDF template not found, skipping PDF attachment',
          'inputDetails'    => [
            'notifyDetails' => $notifyDetails,
            'formID'        => $formID,
            'entryID'       => $entryID,
            'pdfTemplateID' => $pdfTemplateID,
          ],
          'responseDetails' => is_wp_error($pdfTemplate) ? $pdfTemplate->get_error_message() : 'empty result',
        ]);
      } else {
        $pdfSetting = json_decode($pdfTemplate[0]->setting);

        $path = BITFORMS_CONTENT_DIR . DIRECTORY_SEPARATOR . 'pdf';
        // $fileName = 'bit-form-pdf-' . $formID . '-' . $entryID;

        if (!is_dir($path)) {
          wp_mkdir_p($path);
        }

        if (class_exists('\BitCode\BitFormPro\Admin\AppSetting\Pdf')) {
          $serverPath = Helpers::getFullPathWithEncryptedEntryId($formID, $entryID);
          $webPath = Helpers::getWebPathWithEncryptedEntryId($formID, $entryID);

          if (isset($pdfSetting->password)) {
            if (isset($pdfSetting->password->static) && $pdfSetting->password->static && !empty($pdfSetting->password->pass)) {
              $pass = FieldValueHandler::replaceFieldWithValue($pdfSetting->password->pass, $fieldValue);
              $pdfSetting->password->pass = $pass;
            } elseif (isset($pdfSetting->password->dynamic)) {
              $pass = Helpers::PDFPassHash($entryID);
              $pdfSetting->password->pass = $pass;
            }
          }
          if (isset($pdfSetting->pdfFileName)) {
            $pdfSetting->pdfFileName = FieldValueHandler::replaceFieldWithValue($pdfSetting->pdfFileName, $fieldValue);
            // allow developers to modify PDF filename
            $pdfSetting->pdfFileName = apply_filters(
              'bitform_filter_pdf_filename',
              $pdfSetting->pdfFileName,
              [
                'form_id'      => $formID,
                'entry_id'     => $entryID,
                'field_values' => $fieldValue,
                'pdf_setting'  => $pdfSetting,
                'template'     => $pdfTemplate[0] ?? null,
              ]
            );
          }

          $fieldValue['entry_id'] = $entryID;

          $pdfBody = FieldValueHandler::replaceFieldWithValue($pdfTemplate[0]->body, $fieldValue, $formID);
          $pdfBody = FieldValueHandler::changeImagePathInHTMLString($pdfBody, $serverPath);
          $pdfBody = FieldValueHandler::changeHrefPathInHTMLString($pdfBody, $webPath);  // replace anchor tag href with constructed weburl

          // allow developers to modify PDF body
          $pdfBody = apply_filters(
            'bitform_filter_pdf_body',
            $pdfBody,
            [
              'form_id'      => $formID,
              'entry_id'     => $entryID,
              'field_values' => $fieldValue,
              'pdf_setting'  => $pdfSetting,
              'template'     => $pdfTemplate[0] ?? null,
            ]
          );

          $generatedPdf = \BitCode\BitFormPro\Admin\AppSetting\Pdf::getInstance()->generator($pdfSetting, $pdfBody, $path, $entryID, 'F');

          if (!is_wp_error($generatedPdf) && file_exists($generatedPdf)) {
            $attachments[] = $generatedPdf;
            $tempPdfLink = $generatedPdf;
            $apiResponse->apiResponse($logId, '', ['type' =>  'record', 'type_name' => 'pdf'], 'success', 'PDF successfully generated.', $entryDetails);
            Log::debug_log([
              'status'          => 'success',
              'code'            => 'pdf_generated',
              'message'         => 'PDF successfully generated',
              'inputDetails'    => [
                'notifyDetails' => $notifyDetails,
                'formID'        => $formID,
                'entryID'       => $entryID,
                'isDblOptin'    => $isDblOptin,
                'logId'         => $logId
              ],
              'responseDetails' => $generatedPdf
            ]);
          } else {
            $apiResponse->apiResponse($logId, '', ['type' =>  'record', 'type_name' => 'pdf'], 'errors', 'Error in generating PDF.', $entryDetails);
            Log::debug_log([
              'status'          => 'error',
              'code'            => 'pdf_generation_error',
              'message'         => 'Error in generating PDF',
              'inputDetails'    => [
                'notifyDetails' => $notifyDetails,
                'formID'        => $formID,
                'entryID'       => $entryID,
                'isDblOptin'    => $isDblOptin,
                'logId'         => $logId
              ],
              'responseDetails' => $generatedPdf->get_error_message()
            ]);
          }
        }
      }
    }

    if (is_string($notifyDetails->id)) {
      $mailTemplateID = json_decode($notifyDetails->id)->id;
      $mailTemplate = $emailTemplateHandler->getATemplate($mailTemplateID);
      if (!is_wp_error($mailTemplate)) {
        $mailTo = FieldValueHandler::validateMailArry($notifyDetails->to, $fieldValue);
        if (!empty($mailTo)) {
          $from_name = '';
          if (isset($notifyDetails->from_name) && !empty($notifyDetails->from_name)) {
            $from_name = $notifyDetails->from_name;
          }
          $mailHeaders = [
            // 'Content-Type: text/html; charset=UTF-8',
            // $embeddedMailHeader
          ];
          $from_mail = '';
          if (!empty($notifyDetails->from)) {
            $fromMail = FieldValueHandler::validateMailArry($notifyDetails->from, $fieldValue);
            $headerFromName = !empty($notifyDetails->fromName) ? $notifyDetails->fromName : explode('@', $fromMail[0])[0];
            $mailHeaders[] = "FROM: $headerFromName " . '<' . sanitize_email($fromMail[0]) . '>';
            $from_mail = $fromMail[0];
          }
          (new MailConfig())->sendMail(['from_name' => $from_name, 'from_email' => $from_mail]);
          $mailSubject = FieldValueHandler::replaceFieldWithValue($mailTemplate[0]->sub, $fieldValue, $formID);

          // allow developers to modify email subject
          $mailSubject = apply_filters(
            'bitform_filter_email_subject',
            $mailSubject,
            [
              'form_id'         => $formID,
              'entry_id'        => $entryID,
              'field_values'    => $fieldValue,
              'template'        => $mailTemplate[0] ?? null,
              'is_double_optin' => (bool) $isDblOptin,
            ]
          );

          $mailBody = $mailTemplate[0]->body;
          if (class_exists('\BitCode\BitFormPro\Admin\DownloadFile')) {
            $downloadFile = new \BitCode\BitFormPro\Admin\DownloadFile();
            $mailBody = $downloadFile->replacePdfShortCodeToLink($mailBody, $formID, $entryID);
            $mailBody = $downloadFile->replaceShortCodeToPdfPassword($mailBody, $formID, $entryID);
          }

          $mailBody = FieldValueHandler::replaceFieldWithValue($mailBody, $fieldValue, $formID);
          // Signature images: embed inline (cid:) so they render for non-logged-in recipients.
          // Must run before changeImagePathInHTMLString so the src is still the raw filename.
          $cidMap = [];
          $sigBasePath = FileHandler::getEntriesFileUploadDir($formID, $entryID) . DIRECTORY_SEPARATOR;
          $mailBody = self::embedSignatureImages($mailBody, $formManager, $fieldValue, $sigBasePath, $cidMap);
          $webUrl = Helpers::getWebPathWithEncryptedEntryId($formID, $entryID);
          $mailBody = FieldValueHandler::changeImagePathInHTMLString($mailBody, $webUrl);
          $mailBody = FieldValueHandler::changeHrefPathInHTMLString($mailBody, $webUrl);  // replace anchor tag href with constructed weburl

          // allow developers to modify email body
          $mailBody = apply_filters(
            'bitform_filter_email_body',
            $mailBody,
            [
              'form_id'         => $formID,
              'entry_id'        => $entryID,
              'field_values'    => $fieldValue,
              'template'        => $mailTemplate[0] ?? null,
              'is_double_optin' => (bool) $isDblOptin,
            ]
          );
          if (!empty($notifyDetails->replyto)) {
            $mailReplyTo = FieldValueHandler::validateMailArry($notifyDetails->replyto, $fieldValue);
            if (is_array($mailReplyTo)) {
              foreach ($mailReplyTo as $key => $emailAddress) {
                $mailHeaders[] = 'Reply-To: ' . explode('@', $emailAddress)[0] . '<' . sanitize_email($emailAddress) . '>';
              }
            } else {
              $mailHeaders[] = 'Reply-To: ' . explode('@', $mailReplyTo)[0] . '<' . sanitize_email($mailReplyTo) . '>';
            }
          }
          $oldMailBody = $mailBody;
          $data = [];
          if ($isDblOptin && true === has_filter('bitform_email_body_text')) {
            $urlParams = $formID . '_' . $entryID . '_' . $logId;
            $data = apply_filters('bitform_email_body_text', $mailBody, $urlParams);
            $mailBody = $data['mailbody'];
          }

          if (!empty($notifyDetails->bcc)) {
            $mailBCC = FieldValueHandler::validateMailArry($notifyDetails->bcc, $fieldValue);
            if (is_array($mailBCC)) {
              foreach ($mailBCC as $key => $emailAddress) {
                $mailHeaders[] = 'Bcc: ' . sanitize_email($emailAddress);
              }
            } else {
              $mailHeaders[] = 'Bcc: ' . sanitize_email($mailBCC);
            }
          }
          if (!empty($notifyDetails->cc)) {
            $mailCC = FieldValueHandler::validateMailArry($notifyDetails->cc, $fieldValue);
            if (is_array($mailCC)) {
              foreach ($mailCC as $key => $emailAddress) {
                $mailHeaders[] = 'Cc: ' . sanitize_email($emailAddress);
              }
            } else {
              $mailHeaders[] = 'Cc: ' . sanitize_email($mailCC);
            }
          }
          if (!empty($notifyDetails->attachment)) {
            $fileFldKeys = $notifyDetails->attachment;
            $fileBasePath = FileHandler::getEntriesFileUploadDir($formID, $entryID) . DIRECTORY_SEPARATOR;

            // Normalize to array for consistent processing
            $fileFldKeys = is_array($fileFldKeys) ? $fileFldKeys : [$fileFldKeys];

            foreach ($fileFldKeys as $fldKey) {
              $repeaterFieldKey = $formManager->isRepeatedField($fldKey);

              if ($repeaterFieldKey) {
                // Handle repeated file field
                FileHandler::processRepeaterAttachment(
                  $repeaterFieldKey,
                  $fldKey,
                  $fieldValue,
                  $fileBasePath,
                  $attachments
                );
              } else {
                // Handle regular file field
                FileHandler::processRegularAttachment(
                  $fldKey,
                  $fieldValue,
                  $fileBasePath,
                  $attachments
                );
              }
            }
          }
          $mailBody = stripcslashes($mailBody);
          $mailSubject = stripcslashes($mailSubject);
          $embedCb = static function ($phpmailer) use ($cidMap) {
            foreach ($cidMap as $cid => $info) {
              try {
                $phpmailer->addEmbeddedImage($info['path'], $cid, $info['name']);
              } catch (\Throwable $e) {
                Log::debug_log("[Signature Embed] failed for {$info['path']} - " . $e->getMessage());
              }
            }
          };
          if (!empty($cidMap)) {
            add_action('phpmailer_init', $embedCb);
          }
          add_filter('wp_mail_content_type', [self::class, 'filterMailContentType']);
          $status = wp_mail($mailTo, $mailSubject, $mailBody, $mailHeaders, $attachments);

          if (!$status) {
            Log::debug_log([
              'status'          => 'error',
              'code'            => 'mail_not_sent',
              'message'         => 'Mail not sent',
              'inputDetails'    => [
                'to'            => $mailTo,
                'subject'       => $mailSubject,
                'body'          => $mailBody,
                'headers'       => $mailHeaders,
                'attachments'   => $attachments,
                'notifyDetails' => $notifyDetails,
                'formID'        => $formID,
                'entryID'       => $entryID,
                'isDblOptin'    => $isDblOptin,
                'logId'         => $logId
              ],
              'responseDetails' => $status
            ]);
            $apiResponse->apiResponse($logId, '', ['type' =>  'record', 'type_name' => 'smtp'], 'errors', 'Mail dose not send successfully', $entryDetails);
          } else {
            Log::debug_log([
              'status'          => 'success',
              'code'            => 'mail_sent',
              'message'         => 'Mail successfully sent',
              'inputDetails'    => [
                'to'            => $mailTo,
                'subject'       => $mailSubject,
                'body'          => $mailBody,
                'headers'       => $mailHeaders,
                'attachments'   => $attachments,
                'notifyDetails' => $notifyDetails,
                'formID'        => $formID,
                'entryID'       => $entryID,
                'isDblOptin'    => $isDblOptin,
                'logId'         => $logId
              ],
              'responseDetails' => $status
            ]);
            $apiResponse->apiResponse($logId, '', ['type' =>  'record', 'type_name' => 'smtp'], 'success', 'Mail successfully send.', $entryDetails);
          }
          if ($status && $isDblOptin && false !== strpos($oldMailBody, 'entry_confirmation_url')) {
            $entryMeta = new FormEntryMetaModel();
            $apiResponse->apiResponse($logId, '', ['type' =>  'record', 'type_name' => 'smtp'], 'success', 'Mail successfully send.', $entryDetails);
            // Form entry meta insert; meta_key/meta_value required to store dynamic field data per entry.
            $entryMeta->insert(
              [
                'bitforms_form_entry_id' => $entryID,
                'meta_key'               => 'entry_confirm_activation',
                'meta_value'             => $data['token']
              ]
            );
          }
          remove_filter('wp_mail_content_type', [self::class, 'filterMailContentType']);
          if (!empty($cidMap)) {
            remove_action('phpmailer_init', $embedCb);
          }
        }
      }
    }

    if (!empty($tempPdfLink)) {
      wp_delete_file($tempPdfLink);
    }
  }

  public static function filterMailContentType()
  {
    return 'text/html; charset=UTF-8';
  }

  /**
   * Rewrite signature <img> tags to inline cid: references and collect the files
   * to embed. Only signature-field images that are local & readable are embedded;
   * external URLs and non-signature images are left untouched. When the form has
   * no signature (or none is in the body) $cidMap stays empty and nothing changes.
   */
  private static function embedSignatureImages($html, $formManager, $fieldValue, $baseDir, &$cidMap)
  {
    if (empty($html)) {
      return $html;
    }

    // Collect signature filenames for this entry.
    $sigFiles = [];
    foreach ($formManager->getFields() as $key => $detail) {
      if (!isset($detail['type']) || 'signature' !== $detail['type']) {
        continue;
      }
      $val = isset($fieldValue[$key]) ? $fieldValue[$key] : '';
      foreach ((array) $val as $fn) {
        $fn = is_string($fn) ? trim($fn) : '';
        if ('' !== $fn && 'signature-failed.png' !== $fn) {
          $sigFiles[basename($fn)] = true;
        }
      }
    }
    if (empty($sigFiles)) {
      return $html;
    }

    return preg_replace_callback(
      '/<img\s+[^>]*src=[\'"]([^\'"]+)[\'"][^>]*>/i',
      function ($m) use ($baseDir, $sigFiles, &$cidMap) {
        $src = $m[1];
        if (filter_var($src, FILTER_VALIDATE_URL)) {
          return $m[0]; // external URL, leave as-is
        }
        $name = basename($src);
        if (!isset($sigFiles[$name])) {
          return $m[0]; // not a signature image
        }
        $file = $baseDir . $name;
        if (!is_readable($file)) {
          return $m[0];
        }
        $cid = 'bfsig_' . md5($file);
        $cidMap[$cid] = ['path' => $file, 'name' => $name];

        // Replace only the src attribute value (leave alt untouched).
        return preg_replace(
          '/(src=[\'"])' . preg_quote($src, '/') . '([\'"])/i',
          '${1}cid:' . $cid . '${2}',
          $m[0],
          1
        );
      },
      $html
    );
  }
}
