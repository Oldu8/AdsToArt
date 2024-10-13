import { adSelectors } from "./adSelectors.js";
import { replaceAd } from "./replaceAd.js";

export function replaceAdsInShadowDOM(root, setName) {
  const shadowAdSelectors = adSelectors.join(", ");
  const adsInShadow = root.querySelectorAll(shadowAdSelectors);

  adsInShadow.forEach((ad) => replaceAd(ad, setName));
}

export function getUrlForImage(name, setName) {
  // console.log(name, setName);
  const url = `images/${setName}/${name}.png`;
  return chrome.runtime.getURL(url);
}

export function getRandomImageName(baseName, count) {
  const randomIndex = Math.floor(Math.random() * count) + 1;
  return `${baseName}_${randomIndex}`;
}

function findAds() {
  return document.querySelectorAll(adSelectors.join(", "));
}

// move to function file
export function findAndReplaceAds(setName) {
  const ads = findAds();
  ads.forEach((i) => replaceAd(i, setName));
}
