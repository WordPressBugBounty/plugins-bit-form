<?php
// This file is included via require_once inside Admin_Bar::RootPage(); $logoUrl is in that method's local scope, not global namespace.
if (!defined('ABSPATH')) {
  exit;
}
if (!defined('BITFORMS_ASSET_URI')) {
  exit;
}

$logoUrl = BITFORMS_ASSET_URI . '/logo-black.svg';

?>

<noscript>You need to enable JavaScript to run this app.</noscript>
<style>
.__root-wrp {
  display: grid;
  place-content: center;
  height: 90vh;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.__root-logo {
  margin-inline: auto;
  border-radius: 8px;
}

.__root-title {
  color: white;
}

.__root-subtitle {
  color: gray;
}
</style>

<div id="btcd-app">
  <div class="__root-wrp">
    <img alt="bitform-logo" class="__root-logo" width="40" src="<?php echo esc_url($logoUrl) ?>">
    <h1 class="__root-title">Welcome to Bit Form.</h1>
    <p class="__root-subtitle">Modern form solution in Wordpress</p>
  </div>
</div>
<script>
const {
  backgroundColor
} = window.getComputedStyle(document.querySelector('#wpadminbar'))
document.querySelector('#wpbody').style.backgroundColor = backgroundColor
document.querySelector('#wpcontent').style.paddingLeft = 0
</script>