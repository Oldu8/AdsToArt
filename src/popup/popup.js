// Get the toggle and set select elements
const toggle = document.getElementById("toggle");
const setSelect = document.getElementById("set-select");
const imageOptions = document.querySelectorAll('input[name="image-set"]');

// Save the enabled state when the toggle is changed
toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

imageOptions.forEach((option) => {
  option.addEventListener("change", () => {
    chrome.storage.sync.set({ selectedSet: option.value });
  });
});

// Load settings from storage
chrome.storage.sync.get(["enabled", "selectedSet"], (result) => {
  toggle.checked = result.enabled ?? true; // Default to enabled

  const selectedSet = result.selectedSet ?? "set_green"; // Default to green set
  const selectedOption = document.querySelector(
    `input[value="${selectedSet}"]`
  );
  if (selectedOption) {
    selectedOption.checked = true;
  }
});

// Save the toggle state when it's changed
toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

document.addEventListener("DOMContentLoaded", () => {
  const selectSetTab = document.getElementById("select-set-tab");
  const whitelistTab = document.getElementById("whitelist-tab");
  const selectSetScreen = document.getElementById("select-set-screen");
  const whitelistScreen = document.getElementById("whitelist-screen");

  selectSetTab.addEventListener("click", () => {
    selectSetTab.classList.add("active");
    whitelistTab.classList.remove("active");
    selectSetScreen.classList.add("active");
    whitelistScreen.classList.remove("active");
  });

  whitelistTab.addEventListener("click", () => {
    whitelistTab.classList.add("active");
    selectSetTab.classList.remove("active");
    whitelistScreen.classList.add("active");
    selectSetScreen.classList.remove("active");
  });
});
