const addCurrentTabBtn = document.getElementById("add-current-tab");
const addManuallyBtn = document.getElementById("add-manually");
const manualInput = document.getElementById("manual-input");
const whitelistList = document.getElementById("whitelist-list");

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
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        editDomain(index);
      });

      // Create Remove button
      const removeButton = document.createElement("button");
      removeButton.className = "whitelist-remove";
      removeButton.textContent = "Remove";
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
