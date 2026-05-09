<?php

namespace BitCode\BitForm\Core\Util;

class Render
{
  public static function loadFile($path, $data)
  {
    $file = BITFORMS_PLUGIN_DIR_PATH . $path . '.php';
    extract($data);

    ob_start();

    include $file;

    return ob_get_clean();
  }

  public static function view($path, $data = [])
  {
    $file = BITFORMS_PLUGIN_DIR_PATH . $path . '.php';
    extract($data);

    status_header(200);
    include $file;

    exit(200);
  }
}
