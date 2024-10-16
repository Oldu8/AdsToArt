const addCurrentTabBtn = document.getElementById("add-current-tab");
const addManuallyBtn = document.getElementById("add-manually");
const manualInput = document.getElementById("manual-input");
const whitelistList = document.getElementById("whitelist-list");

// SVG icons as strings
const pencilIcon = `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 306.637 306.637" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"></path> <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>`;

const trashIcon = `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60.167 60.167" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M54.5,11.667H39.88V3.91c0-2.156-1.754-3.91-3.91-3.91H24.196c-2.156,0-3.91,1.754-3.91,3.91v7.756H5.667 c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.042v40.5c0,3.309,2.691,6,6,6h32.75c3.309,0,6-2.691,6-6v-40.5H54.5c0.552,0,1-0.448,1-1 S55.052,11.667,54.5,11.667z M22.286,3.91c0-1.053,0.857-1.91,1.91-1.91H35.97c1.053,0,1.91,0.857,1.91,1.91v7.756H22.286V3.91z M50.458,54.167c0,2.206-1.794,4-4,4h-32.75c-2.206,0-4-1.794-4-4v-40.5h40.75V54.167z M38.255,46.153V22.847c0-0.552,0.448-1,1-1 s1,0.448,1,1v23.306c0,0.552-0.448,1-1,1S38.255,46.706,38.255,46.153z M29.083,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1 v23.306c0,0.552-0.448,1-1,1S29.083,46.706,29.083,46.153z M19.911,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1v23.306 c0,0.552-0.448,1-1,1S19.911,46.706,19.911,46.153z"></path> </g></svg>`;

// Toggle manual input display
addManuallyBtn.addEventListener("click", () => {
  manualInput.style.display =
    manualInput.style.display === "none" ? "block" : "none";
});

// Add current tab's domain to the whitelist
addCurrentTabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const url = new URL(tabs[0].url);
      console.log(url);
      const domain = getDomainFromUrl(url.hostname);
      addToWhitelist(domain);
    }
  });
});

// Add manually entered domain to the whitelist
manualInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && manualInput.value.trim() !== "") {
    const domain = getDomainFromUrl(manualInput.value);
    addToWhitelist(domain);
    manualInput.value = "";
  }
});

function getDomainFromUrl(url) {
  // Extract the domain from the URL
  return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];
}

function addToWhitelist(domain) {
  console.log(domain);
  chrome.storage.local.get(["whitelist"], (result) => {
    const whitelist = result.whitelist || [];
    if (!whitelist.includes(domain)) {
      whitelist.push(domain);
      chrome.storage.local.set({ whitelist }, () => {
        displayWhitelist();
      });
    }
  });
}

export function displayWhitelist() {
  chrome.storage.local.get(["whitelist"], (result) => {
    const whitelist = result.whitelist || [];
    whitelistList.innerHTML = ""; // Clear existing list

    whitelist.forEach((domain, index) => {
      const listItem = document.createElement("div");
      listItem.className = "whitelist-item";

      // Add the number before the domain
      const number = document.createElement("span");
      number.className = "whitelist-number";
      number.textContent = `${index + 1}. `;

      // Add the domain text
      const domainText = document.createElement("span");
      domainText.className = "whitelist-domain";
      domainText.textContent = domain;

      const textWrapper = document.createElement("div");
      textWrapper.appendChild(number);
      textWrapper.appendChild(domainText);

      // Create Edit button
      const editButton = document.createElement("button");
      editButton.className = "whitelist-edit";
      editButton.innerHTML = pencilIcon; // Set SVG as button content
      editButton.addEventListener("click", () => {
        editDomain(index);
      });

      // Create Remove button
      const removeButton = document.createElement("button");
      removeButton.className = "whitelist-remove";
      removeButton.innerHTML = trashIcon; // Set SVG as button content
      removeButton.addEventListener("click", () => {
        removeFromWhitelist(index);
      });

      const controlsWrapper = document.createElement("div");
      controlsWrapper.className = "whitelist-controls";
      controlsWrapper.appendChild(editButton);
      controlsWrapper.appendChild(removeButton);

      // Append all elements to listItem
      listItem.appendChild(textWrapper);
      listItem.appendChild(controlsWrapper);
      whitelistList.appendChild(listItem);
    });
  });
}

// Function to edit a domain
function editDomain(index) {
  chrome.storage.local.get(["whitelist"], (result) => {
    const whitelist = result.whitelist || [];
    const newDomain = prompt("Edit domain:", whitelist[index]);
    if (newDomain && newDomain !== whitelist[index]) {
      whitelist[index] = newDomain;
      chrome.storage.local.set({ whitelist }, displayWhitelist);
    }
  });
}

// Function to remove a domain from the whitelist
function removeFromWhitelist(index) {
  chrome.storage.local.get(["whitelist"], (result) => {
    const whitelist = result.whitelist || [];
    whitelist.splice(index, 1);
    chrome.storage.local.set({ whitelist }, displayWhitelist);
  });
}

// Load whitelist on screen load
document.addEventListener("DOMContentLoaded", displayWhitelist);
