const adSelectors = [
  "img[src*='googlesyndication.com']",
  "iframe[src*='googlesyndication.com']",
  ".adsbygoogle",
  ".promotedlink ",
  ".advertisement-block",
  ".top_banner_yand",
  ".side_banner_yand",
  ".videoAdUiClickElement",
  ".cm-vpaid-iframe",
  "._cm-ad-active",
  ".trc-content-sponsored",
  "._cm-native-ad",
  ".trc-content-sponsored",
  "[data-ad-client]",
  "iframe[src*='adtelligent.com']",
  'iframe[id*="google_ads_iframe_"]',
  'iframe[id*="google_ad"]',
  'iframe[id*="aswift_"]',
  'iframe[id*="phathome_"]',
  'iframe[name*="aswift"]',
  "ins.adsbygoogle",
  "div.adsbygoogle",
  'div[id*="yandex"]',
  'div[id*="div-gpt-ad"]',
  "div.promo-block",
  "iframe[src*='mobtrafmag']",
  "a[href*='trafmag.com']",
  "img[src*='trafmag']",
  "div[id*='MarketGid']",
  "div[id*='div-mps-ad*']",
  "[data-google-query-id]",
  "div[data-name='ad wrapper']",
  "div[data-name='adWrapper']",
  "div[data-name='adaptiveConstructorAd']",
  "div[data-ad-id]",
  "div[data-confiant-id='CONFIANT_AD*']",
  "aside[aria-label='advertisement']",
  "a[href*='redirect.trackerado.com'] .thumbBlock",
  "a[rel*='sponsored'] .thumbBlock",
  "iframe[src*='ads']",
  "img[src*='cummerata.link*']",
  "img[src*='oritoee*']",
  "img[alt='ads']",
  "div[data-name='adaptiveConstructorAd']",
];

function replaceAdsInShadowDOM(root, setName) {
  const shadowAdSelectors = adSelectors.join(", ");
  const adsInShadow = root.querySelectorAll(shadowAdSelectors);

  adsInShadow.forEach((ad) => replaceAd(ad, setName));
}

const imageMap = {
  ratio_1_1: chrome.runtime.getURL("images/square.png"),
  ratio_4_3: chrome.runtime.getURL("images/rectangle.png"),
  ratio_16_9: chrome.runtime.getURL("images/wide.png"),
  ratio_1_3: chrome.runtime.getURL("images/skyscraper.png"),
  ratio_4_1: chrome.runtime.getURL("images/leaderboard.png"),
  ratio_8_1: chrome.runtime.getURL("images/leaderboard.png"),
  ratio_10_1: chrome.runtime.getURL("images/leaderboard.png"),
  ratio_3_2: chrome.runtime.getURL("images/rectangle.png"),
  ratio_2_3: chrome.runtime.getURL("images/rectangle.png"),
  half_page: chrome.runtime.getURL("images/half.png"),
  ratio_2_1: chrome.runtime.getURL("images/wide.png"),
  ratio_3_1: chrome.runtime.getURL("images/leaderboard.png"),
  default: chrome.runtime.getURL("images/default.png"),
};

function getUrlForImage(name, setName) {
  const url = `images/${setName}/${name}.png`;
  return chrome.runtime.getURL(url);
}

function getRatio(width, height) {
  const ratio = width / height;

  // Handle specific known standard ad sizes first
  if (width === 970 && height === 90) return "ratio_10_1"; // Leaderboard size
  if (width === 728 && height === 90) return "ratio_8_1"; // Leaderboard size
  if (width === 300 && height === 250) return "ratio_4_3"; // Medium rectangle
  if (width === 336 && height === 280) return "ratio_6_5"; // Large rectangle
  if (width === 300 && height === 600) return "ratio_2_1"; // Half-page
  if (width === 160 && height === 600) return "ratio_1_3"; // Wide skyscraper
  if (width === 320 && height === 100) return "ratio_3_1"; // Large mobile banner

  // Standard ratio checks
  if (Math.abs(ratio - 1) < 0.05) return "ratio_1_1"; // Square
  if (Math.abs(ratio - 4 / 3) < 0.05) return "ratio_4_3"; // Rectangle
  if (Math.abs(ratio - 16 / 9) < 0.05) return "ratio_16_9"; // Widescreen
  if (Math.abs(ratio - 1 / 3) < 0.05) return "ratio_1_3"; // Skyscraper
  if (Math.abs(ratio - 4 / 1) < 0.05) return "ratio_4_1"; // Leaderboard
  if (Math.abs(ratio - 10 / 1) < 0.05) return "ratio_10_1"; // Leaderboard
  if (Math.abs(ratio - 3 / 2) < 0.05) return "ratio_3_2"; // Standard rectangle
  if (Math.abs(ratio - 2 / 3) < 0.05) return "ratio_2_3"; // Tall rectangle
  if (Math.abs(ratio - 2 / 1) < 0.05) return "ratio_2_1"; // Widescreen rectangle
  if (Math.abs(ratio - 3 / 1) < 0.05) return "ratio_3_1"; // Extra-wide leaderboard

  return "default";
}

function replaceAd(ad, setName) {
  const parentNode = ad.parentNode;
  if (parentNode) {
    const adWidth = ad.offsetWidth;
    const adHeight = ad.offsetHeight;
    console.log(adWidth, adHeight);
    const name = getRatio(adWidth, adHeight);
    // Get parent dimensions
    const parentWidth = parentNode.offsetWidth;
    const parentHeight = parentNode.offsetHeight;

    // console.log("parent:", parentWidth, parentHeight);
    // console.log("art size:", adWidth, adHeight);
    // console.log(
    //   "should skip ?",
    //   parentWidth < adWidth / 2,
    //   parentHeight < adHeight / 2
    // );
    console.log(parentNode);

    if (parentWidth < adWidth / 2) {
      console.log("Skipping image replacement due to small size.");
      return; // Skip the replacement
    }
    if (adWidth == 0) {
      console.log("Skipping image replacement due to small size.");
      return; // Skip the replacement
    }

    const newImg = document.createElement("img");
    newImg.src = getUrlForImage(name, setName);
    newImg.alt = `${adWidth / adHeight}, ${adWidth}x${adHeight}`;

    // Default image size settings
    let imgWidth = adWidth;
    let imgHeight = adHeight > 0 ? adHeight : 250;

    // Check if parent is more than twice as large as the image
    if (parentWidth >= imgWidth * 2 || parentHeight >= imgHeight * 2) {
      imgWidth = parentWidth;
      imgHeight = parentHeight;
    }

    // Apply styles
    newImg.style.width = `${imgWidth}px`;
    newImg.style.height = `${imgHeight}px`;
    newImg.style.objectFit = "contain"; // Preserve aspect ratio
    newImg.style.maxWidth = "100%";

    newImg.onload = function () {
      const naturalHeight = newImg.naturalHeight;
      const naturalWidth = newImg.naturalWidth;

      // Adjust maxHeight and maxWidth
      newImg.style.maxHeight = `${Math.min(naturalHeight, parentHeight)}px`;
      newImg.style.maxWidth = `${Math.min(naturalWidth, parentWidth)}px`;

      newImg.style.overflow = "hidden";
    };

    parentNode.appendChild(newImg);
    ad.remove();
  }
}

function findAds() {
  return document.querySelectorAll(adSelectors.join(", "));
}

function findAndReplaceAds(setName) {
  const ads = findAds();
  ads.forEach((i) => replaceAd(i, setName));
}

function observeAds(setName) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            adSelectors.forEach((selector) => {
              if (node.matches(selector)) {
                replaceAd(node, setName);
              } else if (node.shadowRoot) {
                replaceAdsInShadowDOM(node.shadowRoot, setName);
              } else {
                const nestedAds = node.querySelectorAll(selector);
                nestedAds.forEach((i) => replaceAd(i, setName));
              }
            });
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial replacement
  findAndReplaceAds(setName);
}

chrome.storage.sync.get(["enabled"], (result) => {
  if (result.enabled) {
    chrome.storage.sync.get(["selectedSet"], (res) => {
      console.log(res.selectedSet);
      observeAds(res.selectedSet);
    });
  }
});
