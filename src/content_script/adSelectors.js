export const adSelectors = [
  // by id
  '[id^="dclk-studio-creative"]',
  '[id^="ad_unit"]',
  '[id^="google_ads_iframe_"]',
  '[id^="yandex_rtb"]',
  '[id^="aswift_"]',

  // by class
  '[class^="AdsBanner-module__item"]',
  '.adsbygoogle',
  '.promotedlink',
  '.advertisement-block',
  '.top_banner_yand',
  '.side_banner_yand',
  '.videoAdUiClickElement',
  '.cm-vpaid-iframe',
  '._cm-ad-active',
  '.trc-content-sponsored',
  '._cm-native-ad',
  '.ym-video--player',
  '.content-ad-block',
  '.adv',
  '.ad-header',
  '.bannerAd',
  '.adsonSidebar',
  '.ad--inview',
  '.GoogleActiveViewElement',
  '.adv-slot_adtag',
  '.AdsBanner-module',
  '.SidebarAds_main',
  '.inart-ad',
  '.needsclick',

  // by data attribute
  '[data-google-query-id]',
  '[data-ad-client]',
  '[data-ad-id]',

  // img tags
  "img[src*='googlesyndication.com']",
  "img[src*='trafmag']",
  "img[src*='cummerata.link']",
  "img[src*='googlesyndication']",
  "img[src*='oritoee']",
  "img[alt='ads']",
  "img[alt='Advertisement']",

  // iframe tags
  "iframe[src*='googlesyndication.com']",
  "iframe[src*='googleads']",
  "iframe[src*='adtelligent.com']",
  'iframe[id*="google_ads_iframe_"]',
  'iframe[id*="google_ad"]',
  'iframe[id*="aswift_"]',
  'iframe[id*="phathome_"]',
  'iframe[id*="ad_iframe"]',
  'iframe[title*="advertisement"]',
  'iframe[name*="aswift"]',
  "iframe[src*='ads']",
  "iframe[src*='mobtrafmag']",

  // a tags
  "a[href*='trafmag.com']",
  "a[href*='redirect.trackerado.com'] .thumbBlock",
  "a[href*='smartadserver']",
  "a[href*='/AVServe/']",
  "a[href*='adclick']",
  "a[id*='aw0']",
  "a[rel*='sponsored'] .thumbBlock",

  // other tags
  "article[class='Advertisement']",
  "aside[aria-label='advertisement']",
  'ins.adsbygoogle',

  // div tags
  "div[data-name='adaptiveConstructorAd']",
  "div[data-name='data-google-av-adk']",
  "div[data-name='data-google-av-flags']",
  "div[data-name='data-google-query-id']",
  "div[data-name='adWrapper']",
  'div[data-freestar-ad]',
  "div[data-name='ad wrapper']",
  "div[data-bidder='direct']",
  "div[data-name='adWrapper']",
  "div[data-name='adaptiveConstructorAd']",
  'div[data-ad-id]',
  "div[data-confiant-id*='CONFIANT_AD']",
  "div[id*='MarketGid']",
  "div[id*='div-mps-ad']",
  'div.adsbygoogle',
  'div[id*="yandex"]',
  'div[id*="google_ad"]',
  'div[id*="_fs-ad-iframe-container"]',
  'div[id*="sidebar-ad"]',
  'div[id^="yandex_rtb"]',
  'div[class*="AdsBanner-module"]',
  'div[class*="TagAd_main"]',
  'div[id*="div-gpt-ad"]',
  'div.promo-block',
];

// ^= selects elements with attribute values that start with the specified string.
// $= selects elements with attribute values that end with the specified string.
// *= selects elements with attribute values that contain the specified string.
