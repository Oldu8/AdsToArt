import { adSelectors } from "./content_script/adSelectors.js";
import { replaceAd } from "./content_script/replaceAd.js";
import {
  replaceAdsInShadowDOM,
  findAndReplaceAds,
} from "./content_script/functions.js";
import { WHITELIST } from "./content_script/defaultWhiteList.js";

// Convert isWhitelisted to an async function
async function isWhitelisted(url) {
  const defaultWhitelist = WHITELIST.some((domain) => url.includes(domain));

  // Return true if domain is in default whitelist
  if (defaultWhitelist) return true;

  // Check in user-defined whitelist asynchronously
  const result = await new Promise((resolve) => {
    chrome.storage.local.get(["whitelist"], (data) => {
      const whitelist = data.whitelist || [];
      console.log("Whitelisted websites:", whitelist); // Console log here
      resolve(whitelist.some((domain) => url.includes(domain)));
    });
  });

  return result;
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

chrome.storage.sync.get(["enabled"], async (result) => {
  const currentURL = window?.location?.hostname;

  // Await the result of isWhitelisted
  const whitelisted = await isWhitelisted(currentURL);

  if (whitelisted) {
    return; // Exit if the site is whitelisted
  }

  if (result.enabled) {
    chrome.storage.sync.get(["selectedSet"], (res) => {
      observeAds(res.selectedSet);
    });
  }
});
