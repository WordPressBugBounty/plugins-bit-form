<?php

/**
 * Provides IP related functionality
 */

namespace BitCode\BitForm\Core\Util;

final class IpTool
{
  /**
   * Check ip address
   *
   * @return string IP address of current visitor
   */

  /**
   * Stored form of an IP: IPv4 as unsigned number (existing rows), IPv6 as text (numeric form was lossy).
   *
   * @param mixed $ip IP address
   *
   * @return string '' when $ip is not a valid address
   */
  public static function storageValue($ip)
  {
    if (!is_string($ip) || false === filter_var($ip, FILTER_VALIDATE_IP)) {
      return '';
    }
    if (false !== filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
      return sprintf('%u', ip2long($ip));
    }
    $packed = inet_pton($ip);

    return false === $packed ? '' : (string) inet_ntop($packed);
  }

  /**
   * Readable IP for a stored user_ip value.
   *
   * @param mixed $stored Value from user_ip
   *
   * @return string IP address, or '' for empty/lossy pre-3.3.2 IPv6 values
   */
  public static function displayValue($stored)
  {
    $stored = trim((string) $stored);
    if ('' === $stored) {
      return '';
    }
    if (ctype_digit($stored)) {
      return (strlen($stored) <= 10 && (float) $stored <= 4294967295) ? long2ip((int) $stored) : '';
    }

    return false === filter_var($stored, FILTER_VALIDATE_IP) ? '' : $stored;
  }

  /**
   * First valid IP in a client-controlled header value; anything else is rejected (injection guard).
   *
   * @param mixed $value Raw header value
   *
   * @return string IP address, or ''
   */
  public static function extractValidIp($value)
  {
    if (!is_string($value) || '' === $value) {
      return '';
    }

    $ipv4Pattern = '/(?<![\d.])(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:[.](?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}(?![\d.])/';

    foreach (preg_split('/[\s,;]+/', $value) as $part) {
      $part = trim(preg_replace('/^for=/i', '', $part), "\"'");
      if (preg_match('/^\[([^\]]+)\]/', $part, $bracketed)) {
        $part = $bracketed[1];
      }

      if (false !== filter_var($part, FILTER_VALIDATE_IP)) {
        return $part;
      }

      // IPv4 with port, e.g. "203.0.113.7:8080"
      if (preg_match($ipv4Pattern, $part, $match) && false !== filter_var($match[0], FILTER_VALIDATE_IP)) {
        return $match[0];
      }
    }

    return '';
  }

  private static function _checkIP()
  {
    $headers = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED'];
    foreach ($headers as $header) {
      $ip = IpTool::extractValidIp(getenv($header));
      if ('' !== $ip) {
        return $ip;
      }
    }

    return IpTool::extractValidIp(isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '');
  }

  /**
   * Check device info
   *
   * @return void
   */
  private static function _checkDevice()
  {
    if (isset($_SERVER, $_SERVER['HTTP_USER_AGENT'])) {
      $user_agent = sanitize_text_field(wp_unslash($_SERVER['HTTP_USER_AGENT']));
    } else {
      $user_agent = '';
    }
    return IpTool::_getBrowserName($user_agent) . '|' . IpTool::_getOS($user_agent);
  }

  /**
   * Get browser name
   *
   * @link https://stackoverflow.com/questions/18070154/get-operating-system-info
   *
   * @param string $user_agent $_SERVER['HTTP_USER_AGENT']
   *
   * @return void
   */
  private static function _getBrowserName($user_agent)
  {
    // Make case insensitive.
    $t = strtolower($user_agent);

    // If the string *starts* with the string, strpos returns 0 (i.e., FALSE). Do a ghetto hack and start with a space.
    // "[strpos()] may return Boolean FALSE, but may also return a non-Boolean value which evaluates to FALSE."
    //     http://php.net/manual/en/function.strpos.php
    $t = ' ' . $t;

    // Humans / Regular Users
    if (strpos($t, 'opera') || strpos($t, 'opr/')) {
      return 'Opera';
    } elseif (strpos($t, 'edge')) {
      return 'Edge';
    } elseif (strpos($t, 'Edg')) {
      return 'Edge';
    } elseif (strpos($t, 'chrome')) {
      return 'Chrome';
    } elseif (strpos($t, 'safari')) {
      return 'Safari';
    } elseif (strpos($t, 'firefox')) {
      return 'Firefox';
    } elseif (strpos($t, 'msie') || strpos($t, 'trident/7')) {
      return 'Internet Explorer';
    } elseif (strpos($t, 'google')) {
      return 'Googlebot';
    } elseif (strpos($t, 'bing')) {
      return 'Bingbot';
    } elseif (strpos($t, 'slurp')) {
      return 'Yahoo! Slurp';
    } elseif (strpos($t, 'duckduckgo')) {
      return 'DuckDuckBot';
    } elseif (strpos($t, 'baidu')) {
      return 'Baidu';
    } elseif (strpos($t, 'yandex')) {
      return 'Yandex';
    } elseif (strpos($t, 'sogou')) {
      return 'Sogou';
    } elseif (strpos($t, 'exabot')) {
      return 'Exabot';
    } elseif (strpos($t, 'msn')) {
      return 'MSN';
    }

    // Common Tools and Bots
    elseif (strpos($t, 'mj12bot')) {
      return 'Majestic';
    } elseif (strpos($t, 'ahrefs')) {
      return 'Ahrefs';
    } elseif (strpos($t, 'semrush')) {
      return 'SEMRush';
    } elseif (strpos($t, 'rogerbot') || strpos($t, 'dotbot')) {
      return 'Moz';
    } elseif (strpos($t, 'frog') || strpos($t, 'screaming')) {
      return 'Screaming Frog';
    } elseif (strpos($t, 'facebook')) {
      return 'Facebook';
    } elseif (strpos($t, 'pinterest')) {
      return 'Pinterest';
    } elseif (
      strpos($t, 'crawler') || strpos($t, 'api')
      || strpos($t, 'spider') || strpos($t, 'http')
      || strpos($t, 'bot') || strpos($t, 'archive')
      || strpos($t, 'info') || strpos($t, 'data')
    ) {
      return 'Bot';
    }

    return 'Other (Unknown)';
  }

  /**
   * Provide Operating System Information of User
   *
   * @link https://stackoverflow.com/questions/18070154/get-operating-system-info
   *
   * @return void
   */
  private static function _getOS($user_agent)
  {
    $ros[] = ['Windows XP', 'Windows XP', false];
    $ros[] = ['Windows NT 5.1|Windows NT5.1', 'Windows XP', true];
    $ros[] = ['Windows 2000', 'Windows 2000', false];
    $ros[] = ['Windows NT 5.0', 'Windows 2000', false];
    $ros[] = ['Windows NT 4.0|WinNT4.0', 'Windows NT', true];
    $ros[] = ['Windows NT 5.2', 'Windows Server 2003', false];
    $ros[] = ['Windows NT 6.0', 'Windows Vista', false];
    $ros[] = ['Windows NT 7.0', 'Windows 7', false];
    $ros[] = ['Windows CE', 'Windows CE', false];
    $ros[] = ['(media center pc).([0-9]{1,2}\.[0-9]{1,2})', 'Windows Media Center', true];
    $ros[] = ['(win)([0-9]{1,2}\.[0-9x]{1,2})', 'Windows', true];
    $ros[] = ['(win)([0-9]{2})', 'Windows', true];
    $ros[] = ['(windows)([0-9x]{2})', 'Windows', true];
    // Doesn't seem like these are necessary...not totally sure though..
    //$ros[] = array('(winnt)([0-9]{1,2}\.[0-9]{1,2}){0,1}', 'Windows NT');
    //$ros[] = array('(windows nt)(([0-9]{1,2}\.[0-9]{1,2}){0,1})', 'Windows NT'); // fix by bg
    $ros[] = ['Windows ME', 'Windows ME', false];
    $ros[] = ['Win 9x 4.90', 'Windows ME', false];
    $ros[] = ['Windows 98|Win98', 'Windows 98', true];
    $ros[] = ['Windows 95', 'Windows 95', false];
    $ros[] = ['(windows)([0-9]{1,2}\.[0-9]{1,2})', 'Windows', true];
    $ros[] = ['win32', 'Windows', false];
    $ros[] = ['(java)([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2})', 'Java', true];
    $ros[] = ['(Solaris)([0-9]{1,2}\.[0-9x]{1,2}){0,1}', 'Solaris', true];
    $ros[] = ['dos x86', 'DOS', false];
    $ros[] = ['unix', 'Unix', false];
    //Android
    $ros[] = ['SM', 'Samsung', false];
    $ros[] = ['HTC', 'HTC', false];
    $ros[] = ['LG', 'LG', false];
    $ros[] = ['Microsoft', 'Microsoft', false];
    $ros[] = ['Pixel', 'Pixel', false];
    $ros[] = ['MI', 'Xiaomi', false];
    $ros[] = ['Xiaomi', 'Xiaomi', false];
    $ros[] = ['Android', 'Android', false];
    $ros[] = ['android', 'Android', false];

    //iPhone
    $ros[] = ['iPhone', 'iPhone', false];

    $ros[] = ['Mac OS X', 'Mac OS X', false];
    $ros[] = ['Mac OS X Puma', 'Mac OS X 10.1[^0-9]', true];
    $ros[] = ['Mac_PowerPC', 'Macintosh PowerPC', false];
    $ros[] = ['(mac|Macintosh)', 'Mac OS', true];
    $ros[] = ['(sunos)([0-9]{1,2}\.[0-9]{1,2}){0,1}', 'SunOS', true];
    $ros[] = ['(beos)([0-9]{1,2}\.[0-9]{1,2}){0,1}', 'BeOS', true];
    $ros[] = ['(risc os)([0-9]{1,2}\.[0-9]{1,2})', 'RISC OS', true];
    $ros[] = ['os\/2', 'OS/2', true];
    $ros[] = ['freebsd', 'FreeBSD', false];
    $ros[] = ['openbsd', 'OpenBSD', false];
    $ros[] = ['netbsd', 'NetBSD', false];
    $ros[] = ['irix', 'IRIX', false];
    $ros[] = ['plan9', 'Plan9', false];
    $ros[] = ['osf', 'OSF', false];
    $ros[] = ['aix', 'AIX', false];
    $ros[] = ['GNU Hurd', 'GNU Hurd', false];
    $ros[] = ['(fedora)', 'Linux - Fedora', true];
    $ros[] = ['(kubuntu)', 'Linux - Kubuntu', true];
    $ros[] = ['(ubuntu)', 'Linux - Ubuntu', true];
    $ros[] = ['(debian)', 'Linux - Debian', true];
    $ros[] = ['(CentOS)', 'Linux - CentOS', true];
    $ros[] = ['(Mandriva).([0-9]{1,3}(\.[0-9]{1,3})?(\.[0-9]{1,3})?)', 'Linux - Mandriva', true];
    $ros[] = ['(SUSE).([0-9]{1,3}(\.[0-9]{1,3})?(\.[0-9]{1,3})?)', 'Linux - SUSE', true];
    $ros[] = ['(Dropline)', 'Linux - Slackware (Dropline GNOME)', true];
    $ros[] = ['(ASPLinux)', 'Linux - ASPLinux', true];
    $ros[] = ['(Red Hat)', 'Linux - Red Hat', true];
    // Loads of Linux machines will be detected as unix.
    // Actually, all of the linux machines I've checked have the 'X11' in the User Agent.
    //$ros[] = array('X11', 'Unix');
    $ros[] = ['(linux)', 'Linux', true];
    $ros[] = ['(amigaos)([0-9]{1,2}\.[0-9]{1,2})', 'AmigaOS', true];
    $ros[] = ['amiga-aweb', 'AmigaOS', false];
    $ros[] = ['amiga', 'Amiga', false];
    $ros[] = ['AvantGo', 'PalmOS', false];
    //$ros[] = array('(Linux)([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3}(rel\.[0-9]{1,2}){0,1}-([0-9]{1,2}) i([0-9]{1})86){1}', 'Linux');
    //$ros[] = array('(Linux)([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3}(rel\.[0-9]{1,2}){0,1} i([0-9]{1}86)){1}', 'Linux');
    //$ros[] = array('(Linux)([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3}(rel\.[0-9]{1,2}){0,1})', 'Linux');
    $ros[] = ['[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3}', 'Linux', true];
    $ros[] = ['(webtv)/([0-9]{1,2}\.[0-9]{1,2})', 'WebTV', true];
    $ros[] = ['Dreamcast', 'Dreamcast OS', false];
    $ros[] = ['GetRight', 'Windows', false];
    $ros[] = ['go!zilla', 'Windows', false];
    $ros[] = ['gozilla', 'Windows', false];
    $ros[] = ['gulliver', 'Windows', false];
    $ros[] = ['ia archiver', 'Windows', false];
    $ros[] = ['NetPositive', 'Windows', false];
    $ros[] = ['mass downloader', 'Windows', false];
    $ros[] = ['microsoft', 'Windows', false];
    $ros[] = ['offline explorer', 'Windows', false];
    $ros[] = ['teleport', 'Windows', false];
    $ros[] = ['web downloader', 'Windows', false];
    $ros[] = ['webcapture', 'Windows', false];
    $ros[] = ['webcollage', 'Windows', false];
    $ros[] = ['webcopier', 'Windows', false];
    $ros[] = ['webstripper', 'Windows', false];
    $ros[] = ['webzip', 'Windows', false];
    $ros[] = ['wget', 'Windows', false];
    $ros[] = ['Java', 'Unknown', false];
    $ros[] = ['flashget', 'Windows', false];
    // delete next line if the script show not the right OS
    //$ros[] = array('(PHP)/([0-9]{1,2}.[0-9]{1,2})', 'PHP');
    $ros[] = ['MS FrontPage', 'Windows', false];
    $ros[] = ['(msproxy)/([0-9]{1,2}\.[0-9]{1,2})', 'Windows', true];
    $ros[] = ['(msie)([0-9]{1,2}\.[0-9]{1,2})', 'Windows', true];
    $ros[] = ['libwww-perl', 'Unix', false];
    $ros[] = ['UP.Browser', 'Windows CE', false];
    $ros[] = ['NetAnts', 'Windows', false];
    $ros[] = ['Android', 'Android', false];
    $file = count($ros);
    $os = '';
    for ($n = 0; $n < $file; $n++) {
      $isRegex = isset($ros[$n][2]) && true === $ros[$n][2];
      $pattern = $ros[$n][0];

      if ($isRegex) {
        if (@preg_match('/' . $pattern . '/i', $user_agent)) {
          $os = $ros[$n][1];
          break;
        }
      } else {
        if (false !== stripos($user_agent, $pattern)) {
          $os = $ros[$n][1];
          break;
        }
      }
    }
    return trim($os);
  }

  /**
   * Set user details ip,cdevice, user_id, user's visited page, current mysql formatted time
   *
   * @return array of user details
   */
  private static function _setUserDetail()
  {
    $referer = wp_get_referer();
    $user_details['ip'] = IpTool::storageValue(IpTool::_checkIP());
    $user_details['device'] = IpTool::_checkDevice();
    $user_details['id'] = get_current_user_id();
    $user_details['page'] = $referer ? $referer : '';
    $user_details['time'] = current_time('mysql');

    return $user_details;
  }

  /**
   * Provide user details
   *
   * @return array user details array
   */
  public static function getUserDetail()
  {
    return IpTool::_setUserDetail();
  }

  /**
   * Provide user IP address
   *
   * @return string IP address, or ''
   */
  public static function getIP()
  {
    return IpTool::_checkIP();
  }
}
