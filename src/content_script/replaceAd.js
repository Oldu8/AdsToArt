import { getUrlForImage } from './functions.js';
import { getImageName } from './getImageName.js';

const replacedNodes = [];

// Получить родителя узла на заданной глубине
function getAncestorNode(node, depth = 1) {
  let current = node;
  for (let i = 0; i < depth; i++) {
    if (current.parentNode) {
      current = current.parentNode;
    } else {
      break;
    }
  }
  return current;
}

// Проверить, слишком ли близко узел к уже заменённым
function isNodeTooClose(newNode, maxDistance = 50) {
  const newRect = newNode.getBoundingClientRect();

  for (const { rect } of replacedNodes) {
    // Проверяем горизонтальную и вертикальную близость
    const dx = Math.abs(
      rect.left + rect.width / 2 - (newRect.left + newRect.width / 2)
    );
    const dy = Math.abs(
      rect.top + rect.height / 2 - (newRect.top + newRect.height / 2)
    );

    // Если узлы слишком близко, возвращаем true
    if (dx < maxDistance && dy < maxDistance) {
      return true;
    }
  }

  return false;
}

// Проверить, есть ли уже заменённый узел в родителе
function isParentAlreadyReplaced(newNode, maxDepth = 3) {
  for (let depth = 1; depth <= maxDepth; depth++) {
    const ancestor = getAncestorNode(newNode, depth);
    if (replacedNodes.some(({ node }) => node === ancestor)) {
      return true;
    }
  }
  return false;
}

// Проверить, есть ли уже заменённый узел среди соседей
function isSiblingAlreadyReplaced(node) {
  const parent = node.parentNode;
  if (!parent) return false;

  const siblings = Array.from(parent.children);
  return siblings.some((sibling) => sibling.dataset.replaced);
}

// Добавить узел в хранилище заменённых
function addReplacedNode(newNode) {
  replacedNodes.push({
    node: newNode,
    rect: newNode.getBoundingClientRect(),
  });
  console.log('Node added to replacedNodes:', newNode);
}

// Traverse DOM upward to find the nearest ancestor with a non-zero width.
// Used when the ad element itself has no rendered dimensions (script was blocked).
function getEffectiveWidth(element) {
  let node = element.parentNode;
  while (node && node.tagName !== 'BODY') {
    if (node.offsetWidth > 0) return Math.min(node.offsetWidth, 970);
    node = node.parentNode;
  }
  return Math.min(window.innerWidth || 0, 970);
}

export function replaceAd(ad, setName) {
  const parentNode = ad.parentNode;
  if (!parentNode) return;

  if (
    isSiblingAlreadyReplaced(ad) ||
    isParentAlreadyReplaced(ad) ||
    isNodeTooClose(ad)
  ) {
    return null;
  }

  let adWidth = Math.min(ad.offsetWidth, 970);
  let adHeight = Math.min(ad.offsetHeight, 600);

  // When ad script was blocked by DNR the element has no rendered dimensions.
  // Traverse up the DOM to find a usable width.
  if (adWidth === 0) {
    adWidth = getEffectiveWidth(ad);
    // Still nothing — element is truly invisible. Leave it in the DOM
    // so the delayed retry can pick it up once the layout settles.
    if (adWidth === 0) return;
  }
  if (adHeight === 0) adHeight = 250;

  // If the ad declared a larger width than the container can show,
  // cap it to the container width instead of skipping entirely.
  const effectiveParentWidth = getEffectiveWidth(ad);
  if (effectiveParentWidth > 0 && adWidth > effectiveParentWidth) {
    adWidth = effectiveParentWidth;
  }

  const name = getImageName(adWidth, adHeight);
  const newImg = createImageElement(name, setName, adWidth, adHeight);

  makeStyles(newImg, parentNode);
  ad.remove();
  addReplacedNode(newImg);
}

function makeStyles(newImg, parentNode) {
  const imageWrapper = document.createElement('div');
  imageWrapper.style.position = 'relative';
  imageWrapper.style.setProperty('width', 'fit-content', 'important');
  imageWrapper.style.height = `${newImg.style.height}`;
  imageWrapper.style.margin = '0 auto';
  imageWrapper.dataset.replaced = true;

  imageWrapper.appendChild(newImg);

  const closeButton = createCloseButton(parentNode, imageWrapper);
  imageWrapper.appendChild(closeButton);

  parentNode.appendChild(imageWrapper);
  parentNode.style.minHeight = '90px';
  parentNode.style.minWidth = '90px';
  parentNode.style.height = 'fit-content';
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
  newImg.style.maxWidth = '100%';
  newImg.style.height = `${imgHeight}px`;
  newImg.style.minHeight = '90px';
  newImg.style.objectFit = 'contain';
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
