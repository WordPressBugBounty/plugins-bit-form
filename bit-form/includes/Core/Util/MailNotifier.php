<?php

namespace BitCode\BitForm\Core\Util;

if (!defined('ABSPATH')) {
  exit;
}

use BitCode\BitForm\Admin\Form\Helpers;
use BitCode\BitForm\Core\Database\FormEntryMetaModel;
use BitCode\BitForm\Core\Form\FormManager;
use BitCode\BitForm\Core\Messages\EmailTemplateHandler;

final class MailNotifier
{
  public static function notify($notifyDetails, $formID, $fieldValue, $entryID, $isDblOptin = false, $logId = '')
  {
    $apiResponse = new ApiResponse();
    $formManager = FormManager::getInstance($formID);
    $entryDetails = ['formId' => $formID, 'entryId' => $entryID, 'fieldValues' => $fieldValue];
    $emailTemplateHandler = new EmailTemplateHandler($formID);
    $attachments = [];
    $tempPdfLinks = [];
    if (is_string($notifyDetails->id)) {
      $mailTemplateID = Utilities::jsonObj($notifyDetails->id)->id ?? null;
      $mailTemplate = $emailTemplateHandler->getATemplate($mailTemplateID);
      if (!is_wp_error($mailTemplate)) {
        // Honor template enable/disable: a disabled email template is never sent.
        if (isset($mailTemplate[0]->status) && empty($mailTemplate[0]->status)) {
          return;
        }
        $mailTo = FieldValueHandler::validateMailArry($notifyDetails->to, $fieldValue);
        // Conditional email routing (Pro): add recipients resolved from value-based rules in the template config.
        $mailTo = apply_filters('bitform_email_conditional_routing', $mailTo, $mailTemplate[0], $fieldValue, $formID);
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
            $headerFromName = !empty($notifyDetails->from_name) ? $notifyDetails->from_name : explode('@', $fromMail[0])[0];
            $mailHeaders[] = "FROM: $headerFromName " . '<' . sanitize_email($fromMail[0]) . '>';
            $from_mail = $fromMail[0];
          }
          (new MailConfig())->sendMail(['from_name' => $from_name, 'from_email' => $from_mail]);
          // Translate before smart-tag replacement. One language per submission,
          // shared by the admin and submitter emails.
          $mailSubjectTemplate = (string) apply_filters(
            'bitform_translate_form_string',
            (string) $mailTemplate[0]->sub,
            'mail-sub-' . $mailTemplateID,
            $formID
          );
          $mailSubject = FieldValueHandler::replaceFieldWithValue($mailSubjectTemplate, $fieldValue, $formID);

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

          $mailBody = (string) apply_filters(
            'bitform_translate_form_string',
            (string) $mailTemplate[0]->body,
            'mail-body-' . $mailTemplateID,
            $formID
          );
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
          // PDF generation is a Pro feature; Pro hooks this filter and returns the generated
          // file path(s) — an array (one per configured template), or a single path string
          // from Pro versions that predate multi-PDF. Generated here (not before the
          // template/recipient checks) so disabled templates and empty recipients never
          // generate PDFs — and never leak temp files.
          $tempPdfLinks = apply_filters('bitform_generate_pdf_attachment', [], $notifyDetails, $entryDetails, $logId);
          $tempPdfLinks = is_array($tempPdfLinks) ? $tempPdfLinks : [$tempPdfLinks];
          $tempPdfLinks = array_values(array_unique(array_filter($tempPdfLinks, static function ($pdfPath) {
            return !empty($pdfPath) && is_string($pdfPath) && file_exists($pdfPath);
          })));
          $attachments = array_merge($attachments, $tempPdfLinks);
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
          // WordPress Media Library attachments (stored as attachment IDs in the template config).
          if (!empty($notifyDetails->mediaAttachment)) {
            $mediaIds = is_array($notifyDetails->mediaAttachment) ? $notifyDetails->mediaAttachment : [$notifyDetails->mediaAttachment];
            foreach ($mediaIds as $mediaId) {
              $mediaPath = get_attached_file(absint($mediaId));
              if ($mediaPath && file_exists($mediaPath)) {
                $attachments[] = $mediaPath;
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
          $fromNameCb = null;
          if (!empty($from_name)) {
            $fromNameCb = static function () use ($from_name) {
              return $from_name;
            };
            add_filter('wp_mail_from_name', $fromNameCb);
          }
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
          if (null !== $fromNameCb) {
            remove_filter('wp_mail_from_name', $fromNameCb);
          }
          if (!empty($cidMap)) {
            remove_action('phpmailer_init', $embedCb);
          }
        }
      }
    }

    foreach ($tempPdfLinks as $tempPdfLink) {
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
