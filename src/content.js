import { inlineAdSelectors, overlayAdSelectors } from './content_script/adSelectors.js';
import { replaceAd } from './content_script/replaceAd.js';
import { hideAd, isModalOrPopup } from './content_script/overlayUtils.js';
import {
  replaceAdsInShadowDOM,
  findAndReplaceAds,
} from './content_script/functions.js';
import { WHITELIST } from './content_script/defaultWhiteList.js';

const inlineSelector = inlineAdSelectors.join(', ');
const overlaySelector = overlayAdSelectors.join(', ');

function processNode(node, setName) {
  if (node.dataset.aaProcessed) return;
  node.dataset.aaProcessed = 'true';

  if (overlayAdSelectors.some((sel) => node.matches(sel)) || isModalOrPopup(node)) {
    hideAd(node);
  } else {
    replaceAd(node, setName);
  }
}

async function isWhitelisted(url) {
  const defaultWhitelist = WHITELIST.some((domain) => url.includes(domain));
  if (defaultWhitelist) return true;

  const result = await new Promise((resolve) => {
    chrome.storage.local.get(['whitelist'], (data) => {
      const whitelist = data.whitelist || [];
      resolve(whitelist.some((domain) => url.includes(domain)));
    });
  });

  return result;
}

function observeAds(setName) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(({ type, addedNodes }) => {
      if (type !== 'childList') return;
      addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;

        if (node.matches(inlineSelector) || node.matches(overlaySelector)) {
          processNode(node, setName);
          return;
        }

        if (node.shadowRoot) {
          replaceAdsInShadowDOM(node.shadowRoot, setName);
          return;
        }

        node.querySelectorAll(inlineSelector).forEach((el) => replaceAd(el, setName));
        node.querySelectorAll(overlaySelector).forEach((el) => hideAd(el));
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  findAndReplaceAds(setName);
  document.querySelectorAll(overlaySelector).forEach((el) => hideAd(el));

  // Retry after layout settles — catches elements that had no dimensions
  // at initial scan time (ad script blocked, lazy rendering, etc.)
  setTimeout(() => {
    findAndReplaceAds(setName);
    document.querySelectorAll(overlaySelector).forEach((el) => hideAd(el));
  }, 1500);
}

chrome.storage.sync.get(['enabled', 'selectedSet'], async (result) => {
  const currentURL = window?.location?.hostname;
  const whitelisted = await isWhitelisted(currentURL);

  if (whitelisted) return;

  const isEnabled = result.enabled ?? true;
  const selectedSet = result.selectedSet ?? 'set_space';

  if (isEnabled) {
    observeAds(selectedSet);
  }
});
