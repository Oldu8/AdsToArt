const defaultImageUrl = chrome.runtime.getURL("icons/default.png");

function replaceAds() {
  const ads = document.querySelectorAll("img, iframe");
  ads.forEach((ad) => {
    if (ad.tagName === "IMG") {
      ad.src = defaultImageUrl;
    } else if (ad.tagName === "IFRAME") {
      ad.src = "";
    }
  });
}

chrome.storage.sync.get(["enabled"], (result) => {
  if (result.enabled) {
    replaceAds();
  }
});
