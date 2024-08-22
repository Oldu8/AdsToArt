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
  "1:1": chrome.runtime.getURL("images/square.png"),
  "4:3": chrome.runtime.getURL("images/rectangle.png"),
  "16:9": chrome.runtime.getURL("images/wide.png"),
  "1:3": chrome.runtime.getURL("images/skyscraper.png"),
  "4:1": chrome.runtime.getURL("images/leaderboard.png"),
  "8:1": chrome.runtime.getURL("images/leaderboard.png"),
  "1:2": chrome.runtime.getURL("images/half.png"),
  default: chrome.runtime.getURL("images/half.png"),
};

function getRatio(width, height) {
  const ratio = width / height;

  // Handle specific known standard ad sizes first
  if (width === 970 && height === 90) return "4:1"; // Leaderboard size
  if (width === 728 && height === 90) return "8:1"; // Leaderboard size
  if (width === 300 && height === 250) return "4:3"; // Medium rectangle
  if (width === 336 && height === 280) return "6:5"; // Large rectangle
  if (width === 300 && height === 600) {
    console.log("Half-page - zalypa blyad" + width + " " + height);
    return "1:2"; // Half-page
  } // Half-page
  if (width === 160 && height === 600) return "1:3"; // Wide skyscraper
  if (width === 320 && height === 100) return "3.2:1"; // Large mobile banner

  // Handle more general aspect ratios with a small margin for error
  if (Math.abs(ratio - 1) < 0.05) return "1:1"; // Square
  if (Math.abs(ratio - 4 / 3) < 0.05) return "4:3"; // Rectangle
  if (Math.abs(ratio - 16 / 9) < 0.05) return "16:9"; // Widescreen
  if (Math.abs(ratio - 1 / 3) < 0.05) return "1:3"; // Skyscraper
  if (Math.abs(ratio - 4 / 1) < 0.05) return "4:1"; // Leaderboard

  // Fallback ratio for unknown sizes
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
    observeAds();
  }
});
