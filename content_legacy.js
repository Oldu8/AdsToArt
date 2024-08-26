const adSelectors = [
  "img[src*='googlesyndication.com']",
  "iframe[src*='googlesyndication.com']",
  ".adsbygoogle",
  ".advertisement-block",
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
  "[data-google-query-id]",
];

function replaceAdsInShadowDOM(root) {
  const shadowAdSelectors = adSelectors.join(", ");
  const adsInShadow = root.querySelectorAll(shadowAdSelectors);

  adsInShadow.forEach((ad) => replaceAd(ad));
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

function replaceAd(ad) {
  const parentNode = ad.parentNode;
  if (parentNode) {
    const adWidth = ad.offsetWidth;
    const adHeight = ad.offsetHeight;
    const ratio = getRatio(adWidth, adHeight);

    const newImg = document.createElement("img");
    newImg.src = imageMap[ratio];
    newImg.style.width = `${adWidth}px`;
    newImg.style.height = `${adHeight}px`;
    newImg.alt = `${adWidth / adHeight}, ${adWidth}x${adHeight}`;
    newImg.style.objectFit = "contain"; // Preserve aspect ratio, image will not be stretched
    newImg.style.maxWidth = "100%";
    newImg.style.maxHeight = "100%";

    parentNode.appendChild(newImg);
    ad.remove();
  }
}

function replaceAds() {
  const ads = findAds();

  ads.forEach((ad) => {
    const width = ad.clientWidth;
    const height = ad.clientHeight;
    const ratio = getRatio(width, height);
    const newImg = document.createElement("img");
    newImg.src = imageMap[ratio] || imageMap["default"];
    newImg.style.width = `${width}px`;
    newImg.style.height = `${height}px`;

    ad.replaceWith(newImg);
  });
}

function findAds() {
  return document.querySelectorAll(adSelectors.join(", "));
}

function findAndReplaceAds() {
  const ads = findAds();
  ads.forEach(replaceAd);
}

function observeAds() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            adSelectors.forEach((selector) => {
              if (node.matches(selector)) {
                replaceAd(node);
              } else if (node.shadowRoot) {
                replaceAdsInShadowDOM(node.shadowRoot);
              } else {
                const nestedAds = node.querySelectorAll(selector);
                nestedAds.forEach(replaceAd);
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
  findAndReplaceAds();
}

chrome.storage.sync.get(["enabled"], (result) => {
  if (result.enabled) {
    chrome.storage.sync.get(["selectedSet"], (res) => {
      console.log(res.selectedSet);
      observeAds(res.selectedSet);
    });
  }
});
