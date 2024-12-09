import { adSelectors } from './adSelectors.js';
import { replaceAd } from './replaceAd.js';

export function replaceAdsInShadowDOM(root, setName) {
  const shadowAdSelectors = adSelectors.join(', ');
  const adsInShadow = root.querySelectorAll(shadowAdSelectors);
  adsInShadow.forEach((ad) => replaceAd(ad, setName));
}

export function getUrlForImage(name, setName) {
  const url = `images/${setName}/${name}.png`;
  return chrome.runtime.getURL(url);
}

export function getRandomImageName(baseName, count = 4) {
  const randomIndex = Math.floor(Math.random() * count) + 1;
  console.log('img number is:', randomIndex);
  return `${baseName}_v${randomIndex}`;
}

function findAds() {
  return document.querySelectorAll(adSelectors.join(', '));
}

// move to function file
export function findAndReplaceAds(setName) {
  const ads = findAds();
  ads.forEach((i) => replaceAd(i, setName));
}
