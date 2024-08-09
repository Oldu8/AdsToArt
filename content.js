const adSelectors = [
  "img[src*='googlesyndication.com']",
  "iframe[src*='googlesyndication.com']",
  ".adsbygoogle",
  "[data-ad-client]",
  "iframe[src*='adtelligent.com']",
  // Add more selectors as needed
];

const defaultImageUrl = chrome.runtime.getURL("icons/default.png");

const otherImg =
  "https://media.licdn.com/dms/image/C4D03AQGk4-rslwAaUg/profile-displayphoto-shrink_800_800/0/1566815244907?e=1728518400&v=beta&t=g2-WaR1q3J6h0ahswU3CMo2LOdvKayhlWSgBiJ9y1vc";

function findAds() {
  const selectorString = adSelectors.join(", ");
  return document.querySelectorAll(selectorString);
}

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

    const newSpot = document.createElement("img");
    newSpot.src = otherImg;
    newSpot.alt = "AdsToArt Image";

    // Set the size of the replacement image to match the original ad, preserving aspect ratio
    newSpot.style.width = `${adWidth}px`;
    newSpot.style.height = `${adHeight}px`;
    newSpot.style.objectFit = "contain"; // Preserve aspect ratio, image will not be stretched
    newSpot.style.maxWidth = "100%";
    newSpot.style.maxHeight = "100%";

    parentNode.appendChild(newSpot);
    ad.remove(); // Remove the original ad
  }
}

function replaceAds() {
  const ads = findAds();
  ads.forEach((ad) => replaceAd(ad));
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
                nestedAds.forEach((nestedAd) => replaceAd(nestedAd));
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
  replaceAds();
}

chrome.storage.sync.get(["enabled"], (result) => {
  if (result.enabled) {
    observeAds();
  }
});
