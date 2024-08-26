// Get the toggle and set select elements
const toggle = document.getElementById("toggle");
const setSelect = document.getElementById("set-select");

// Load the saved settings when the popup is opened
chrome.storage.sync.get(["enabled", "selectedSet"], (result) => {
  toggle.checked = result.enabled ?? true; // Default to enabled
  setSelect.value = result.selectedSet ?? "green"; // Default to green set
});

// Save the enabled state when the toggle is changed
toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

// Save the selected image set when the dropdown selection is changed
setSelect.addEventListener("change", () => {
  chrome.storage.sync.set({ selectedSet: setSelect.value });
});
