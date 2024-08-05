document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  chrome.storage.sync.get(["enabled"], (result) => {
    toggle.checked = result.enabled;
  });

  toggle.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    chrome.storage.sync.set({ enabled: isChecked });
  });
});
