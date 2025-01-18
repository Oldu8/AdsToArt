import { getUrlForImage } from './functions.js';
import { getImageName } from './getImageName.js';

export function replaceAd(ad, setName) {
  const parentNode = ad.parentNode;

  if (parentNode) {
    // Check if a close sibling node already has a replaced ad
    if (checkIfCloseNodeReplaced(parentNode, ad)) {
      console.log('Ad already replaced in a close sibling node. Skipping...');
      return null;
    }

    // TODO: вообще это шляпа. Тут надо посмотреть на их соотношение и выбрать самый подходящий слот, а не под одну гребенку
    const adWidth = ad.offsetWidth > 970 ? 970 : ad.offsetWidth;
    const adHeight = ad.offsetHeight > 600 ? 600 : ad.offsetHeight;
    const name = getImageName(adWidth, adHeight);

    const parentWidth =
      parentNode.offsetWidth > 970 ? 970 : parentNode.offsetWidth;

    const parentHeight =
      parentNode.offsetHeight > 600 ? 600 : parentNode.offsetHeight;

    // why we use here parentWidth and not adWidth? need to test
    if (parentWidth < adWidth / 2 || adWidth == 0) {
      console.log('Instead of img should be empty block');
      const emptyBox = createEmptyBox();
      parentNode.appendChild(emptyBox);
      ad.remove();
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
    parentNode.style.minHeight = '90px';
    parentNode.style.minWidth = '90px';
    parentNode.style.height = 'fit-content';
    ad.remove();
  }
}

function checkIfCloseNodeReplaced(parentNode, ad) {
  // Helper function to recursively check up to three levels deep
  function checkNestedNodes(node, depth) {
    if (depth === 0 || !node) return false;

    const children = node.children;
    for (let child of children) {
      // If a node with class 'aa-img' is found, return true
      if (child.classList.contains('aa-img')) {
        console.log('Found a node with a replaced ad.');
        return true;
      }

      // Recursively check the next level
      if (checkNestedNodes(child, depth - 1)) {
        return true;
      }
    }
    return false;
  }

  // Check the current parent's siblings
  const grandParent = parentNode.parentNode;
  if (!grandParent) return false;

  const parentSiblings = grandParent.children;
  for (let sibling of parentSiblings) {
    // Skip the current parent node
    if (sibling === parentNode) continue;

    // Check up to three levels deep for a replaced ad
    if (checkNestedNodes(sibling, 3)) {
      return true;
    }
  }

  return false;
}

function createEmptyBox() {
  const emptyBox = document.createElement('div');
  emptyBox.style.width = '0';
  emptyBox.style.height = '0';
  emptyBox.style.display = 'none';
  return emptyBox;
}

function createImageElement(name, setName, adWidth, adHeight) {
  const newImg = document.createElement('img');
  newImg.src = getUrlForImage(name, setName);
  newImg.alt = `${adWidth / adHeight}, ${adWidth}x${adHeight}`;

  let imgWidth = adWidth;
  let imgHeight = adHeight > 0 ? adHeight : 250;

  newImg.style.width = `${imgWidth}px`;
  newImg.style.height = `${imgHeight}px`;
  newImg.style.minHeight = '90px';
  newImg.style.objectFit = 'contain';
  // newImg.style.maxWidth = '100%';
  newImg.style.position = 'relative';
  newImg.classList.add('aa-img');

  newImg.onload = function () {
    newImg.style.maxHeight = `${newImg.naturalHeight}px`;
    newImg.style.maxWidth = `${newImg.naturalWidth}px`;
    newImg.style.objectFit = 'contain';
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
