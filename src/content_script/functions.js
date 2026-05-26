import { inlineAdSelectors, overlayAdSelectors } from './adSelectors.js';
import { replaceAd } from './replaceAd.js';
import { hideAd } from './overlayUtils.js';

export function replaceAdsInShadowDOM(root, setName) {
  root.querySelectorAll(inlineAdSelectors.join(', ')).forEach((ad) => replaceAd(ad, setName));
  root.querySelectorAll(overlayAdSelectors.join(', ')).forEach((ad) => hideAd(ad));
}

export function getUrlForImage(name, setName) {
  const url = `images/${setName}/${name}.png`;
  return chrome.runtime.getURL(url);
}

export function getRandomImageName(baseName, count = 4) {
  const randomIndex = Math.floor(Math.random() * count) + 1;
  return `${baseName}_v${randomIndex}`;
}

function findAds() {
  return document.querySelectorAll(inlineAdSelectors.join(', '));
}

// move to function file
export function findAndReplaceAds(setName) {
  const ads = findAds();
  ads.forEach((i) => replaceAd(i, setName));
}
