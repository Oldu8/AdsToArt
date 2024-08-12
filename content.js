const adSelectors = [
  "img[src*='googlesyndication.com']",
  "iframe[src*='googlesyndication.com']",
  ".adsbygoogle",
  "[data-ad-client]",
  "iframe[src*='adtelligent.com']",
  'iframe[id*="google_ads_iframe_"]',
  'iframe[id*="google_ad"]',
  'iframe[id*="aswift"]',
  // Add more selectors as needed
];

// const otherImg =
//   "https://media.licdn.com/dms/image/C4D03AQGk4-rslwAaUg/profile-displayphoto-shrink_800_800/0/1566815244907?e=1728518400&v=beta&t=g2-WaR1q3J6h0ahswU3CMo2LOdvKayhlWSgBiJ9y1vc";

const imageMap = {
  "1:1": chrome.runtime.getURL("images/square.png"),
  "4:3": chrome.runtime.getURL("images/rectangle.png"),
  "16:9": chrome.runtime.getURL("images/wide.png"),
  "1:3": chrome.runtime.getURL("images/skyscraper.png"),
  "4:1": chrome.runtime.getURL("images/leaderboard.png"),
  default: chrome.runtime.getURL("images/default.png"), // Use default image
};

function getRatio(width, height) {
  const ratio = width / height;
  if (Math.abs(ratio - 1) < 0.1) return "1:1";
  if (Math.abs(ratio - 4 / 3) < 0.1) return "4:3";
  if (Math.abs(ratio - 16 / 9) < 0.1) return "16:9";
  if (Math.abs(ratio - 1 / 3) < 0.1) return "1:3";
  if (Math.abs(ratio - 4 / 1) < 0.1) return "4:1";
  return "default"; // Fallback ratio
}
// function findAds() {
//   const selectorString = adSelectors.join(", ");
//   return document.querySelectorAll(selectorString);
// }

// function replaceAds() {
//   const ads = findAds();

//   console.log(ads);

//   ads.forEach((ad) => {
//     console.log(ad.tagName);
//     const parentNode = ad.parentNode;
//     const newSpot = document.createElement("img");
//     newSpot.src = otherImg;
//     newSpot.alt = "AdsToArt Image";
//     newSpot.style.minWidth = "100px";
//     newSpot.style.width = "160px";
//     newSpot.style.minHeight = "200px";
//     newSpot.style.height = "160px";
//     parentNode.appendChild(newSpot);
//   });
// }

function replaceAd(ad) {
  const parentNode = ad.parentNode;
  if (parentNode) {
    const adWidth = ad.offsetWidth;
    const adHeight = ad.offsetHeight;
    const ratio = getRatio(adWidth, adHeight);

    const newImg = document.createElement("img");
    newImg.src = imageMap[ratio];
    newImg.alt = "AdsToArt Image";

    // Set the size of the replacement image to match the original ad, preserving aspect ratio
    newImg.style.width = `${adWidth}px`;
    newImg.style.height = `${adHeight}px`;
    newImg.style.objectFit = "contain"; // Preserve aspect ratio, image will not be stretched
    newImg.style.maxWidth = "100%";
    newImg.style.maxHeight = "100%";

    ad.replaceWith(newImg); // Replace ad with new image
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
            // Element node
            adSelectors.forEach((selector) => {
              if (node.matches(selector)) {
                replaceAd(node);
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
