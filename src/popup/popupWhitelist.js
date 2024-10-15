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
    whitelist.forEach((domain) => {
      const listItem = document.createElement("div");
      listItem.className = "whitelist-item";
      listItem.textContent = domain;
      whitelistList.appendChild(listItem);
    });
  });
}

// Load whitelist on screen load
document.addEventListener("DOMContentLoaded", displayWhitelist);
