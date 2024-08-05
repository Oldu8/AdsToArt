const defaultImageUrl = chrome.runtime.getURL("icons/default.png");

function replaceAds() {
  const ads = document.querySelectorAll("img, iframe");
  const otherImg =
    "https://media.licdn.com/dms/image/C4D03AQGk4-rslwAaUg/profile-displayphoto-shrink_800_800/0/1566815244907?e=1728518400&v=beta&t=g2-WaR1q3J6h0ahswU3CMo2LOdvKayhlWSgBiJ9y1vc";
  ads.forEach((ad) => {
    // console.log(ad.tagName);
    const parentNode = ad.parentNode;
    const newSpot = document.createElement("img");
    newSpot.src = otherImg;
    newSpot.alt = "AdSwaper Image";
    newSpot.style.minWidth = "100px";
    newSpot.style.width = "160px";
    newSpot.style.minHeight = "200px";
    newSpot.style.height = "160px";
    parentNode.appendChild(newSpot);
  });
}

chrome.storage.sync.get(["enabled"], (result) => {
  if (result.enabled) {
    replaceAds();
  }
});
