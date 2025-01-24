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

export function replaceAd(ad, setName) {
  const parentNode = ad.parentNode;
  console.log(parentNode);

  if (parentNode) {
    if (
      isSiblingAlreadyReplaced(ad) ||
      isParentAlreadyReplaced(ad) ||
      isNodeTooClose(ad)
    ) {
      console.log(
        'Ad is too close to an existing replaced node or parent/sibling already replaced. Skipping...'
      );
      return null;
    }

    const adWidth = ad.offsetWidth > 970 ? 970 : ad.offsetWidth;
    const adHeight = ad.offsetHeight > 600 ? 600 : ad.offsetHeight;
    const name = getImageName(adWidth, adHeight);

    const parentWidth =
      parentNode.offsetWidth > 970 ? 970 : parentNode.offsetWidth;
    const parentHeight =
      parentNode.offsetHeight > 600 ? 600 : parentNode.offsetHeight;

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

    makeStyles(newImg, parentNode);

    ad.remove();

    addReplacedNode(newImg);
  }
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
