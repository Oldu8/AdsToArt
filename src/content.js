import { adSelectors } from "./content_script/adSelectors.js";
import { replaceAd } from "./content_script/replaceAd.js";
import {
  replaceAdsInShadowDOM,
  findAndReplaceAds,
} from "./content_script/functions.js";
import { WHITELIST } from "./content_script/defaultWhiteList.js";

function isWhitelisted(url) {
  const defaultWhitelist = WHITELIST.some((domain) => url.includes(domain));
  return defaultWhitelist;
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

  findAndReplaceAds(setName);
}

chrome.storage.sync.get(["enabled"], (result) => {
  const currentURL = window?.location?.hostname;

  if (isWhitelisted(currentURL)) {
    return;
  }

  if (result.enabled) {
    chrome.storage.sync.get(["selectedSet"], (res) => {
      observeAds(res.selectedSet);
    });
  }
});
