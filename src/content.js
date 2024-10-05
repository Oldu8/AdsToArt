import { adSelectors } from "./content_script/selectors.js";
import { replaceAd } from "./content_script/replaceAd.js";
import { replaceAdsInShadowDOM } from "./content_script/functions.js";

function findAds() {
  return document.querySelectorAll(adSelectors.join(", "));
}

// move to function file
function findAndReplaceAds(setName) {
  const ads = findAds();
  ads.forEach((i) => replaceAd(i, setName));
}

// leave it here
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

/// leave it here
chrome.storage.sync.get(["enabled"], (result) => {
  if (result.enabled) {
    chrome.storage.sync.get(["selectedSet"], (res) => {
      observeAds(res.selectedSet);
    });
  }
});
