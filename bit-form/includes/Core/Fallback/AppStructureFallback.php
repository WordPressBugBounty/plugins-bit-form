<?php

namespace BitCode\BitForm\Core\Fallback;

use BitCode\BitForm\Core\Util\FileHandler;

class AppStructureFallback
{
  public function ensureIndexFileInUploadDirs()
  {
    $uploadBaseDir = BITFORMS_UPLOAD_DIR;

    if (!is_dir($uploadBaseDir)) {
      return;
    }

    $formDirs = glob($uploadBaseDir . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR);

    foreach ($formDirs as $formDir) {
      FileHandler::createIndexFile($formDir);

      $entryDirs = glob($formDir . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR);

      foreach ($entryDirs as $entryDir) {
        FileHandler::createIndexFile($entryDir);
      }
    }
  }

  /**
   * Flush rewrite rules once after the 'bitforms' post type args changed
   * (public => false, publicly_queryable => true) so the download permalink keeps resolving.
   */
  public function flushRewriteRulesForBitformsCpt()
  {
    flush_rewrite_rules();
  }
}
