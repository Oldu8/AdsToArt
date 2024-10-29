import { getRandomImageName, getUrlForImage } from './functions.js';
import { getRatio } from './getRatio.js';

export function replaceAd(ad, setName) {
  const parentNode = ad.parentNode;
  if (parentNode) {
    const adWidth = ad.offsetWidth;
    const adHeight = ad.offsetHeight;
    let name = getRatio(adWidth, adHeight);

    if (name === 'default') {
      name = getRandomImageName(name, 4);
    }

    const parentWidth = parentNode.offsetWidth;
    const parentHeight = parentNode.offsetHeight;

    if (parentWidth < adWidth / 2 || adWidth == 0) {
      console.log('Skipping image replacement due to small size.');
      return;
    }

    const newImg = createImageElement(
      name,
      setName,
      adWidth,
      adHeight,
      parentWidth,
      parentHeight
    );
    const imageWrapper = document.createElement('div');
    imageWrapper.style.position = 'relative';
    imageWrapper.style.setProperty('width', 'fit-content', 'important');
    imageWrapper.style.height = `${newImg.style.height}`;
    imageWrapper.style.margin = '0 auto';
    imageWrapper.appendChild(newImg);

    const closeButton = createCloseButton(parentNode, imageWrapper);
    imageWrapper.appendChild(closeButton);

    parentNode.appendChild(imageWrapper);
    ad.remove();
  }
}

function createImageElement(
  name,
  setName,
  adWidth,
  adHeight,
  parentWidth,
  parentHeight
) {
  const newImg = document.createElement('img');
  newImg.src = getUrlForImage(name, setName);
  newImg.alt = `${adWidth / adHeight}, ${adWidth}x${adHeight}`;

  let imgWidth = adWidth;
  let imgHeight = adHeight > 0 ? adHeight : 250;

  // Check if parent is more than twice as large as the image
  if (parentWidth >= imgWidth * 2 || parentHeight >= imgHeight * 2) {
    imgWidth = parentWidth;
    imgHeight = parentHeight;
  }

  newImg.style.width = `${imgWidth}px`;
  newImg.style.height = `${imgHeight}px`;
  newImg.style.objectFit = 'contain';
  newImg.style.maxWidth = '100%';
  newImg.style.position = 'relative'; // Ensure proper positioning of the close button

  newImg.onload = function () {
    const naturalHeight = newImg.naturalHeight;
    const naturalWidth = newImg.naturalWidth;

    newImg.style.maxHeight = `${Math.min(naturalHeight, parentHeight)}px`;
    newImg.style.maxWidth = `${Math.min(naturalWidth, parentWidth)}px`;

    newImg.style.overflow = 'hidden';
  };

  return newImg;
}

function createCloseButton(parentNode, imageWrapper) {
  const closeButton = document.createElement('span');
  closeButton.innerHTML = '&#10005;'; // Cross symbol (X)
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
  closeButton.style.color = 'white';
  closeButton.style.padding = '3px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.zIndex = '10'; // Ensure the close button is above the image

  closeButton.addEventListener('click', function () {
    if (parentNode.tagName === 'BODY') {
      imageWrapper.style.display = 'none'; // Hide the ad and image when close button is clicked
    } else {
      parentNode.style.display = 'none'; // Hide the ad and image when close button is clicked
    }
  });

  return closeButton;
}
