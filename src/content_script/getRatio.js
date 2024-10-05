export function getRatio(width, height) {
  const ratio = width / height;

  // Handle specific known standard ad sizes first
  if (width === 970 && height === 90) return "ratio_10_1"; // Leaderboard size
  if (width === 728 && height === 90) return "ratio_8_1"; // Leaderboard size
  if (width === 300 && height === 250) return "ratio_4_3"; // Medium rectangle
  if (width === 336 && height === 280) return "ratio_6_5"; // Large rectangle
  if (width === 300 && height === 600) return "ratio_2_1"; // Half-page
  if (width === 160 && height === 600) return "ratio_1_3"; // Wide skyscraper
  if (width === 320 && height === 100) return "ratio_3_1"; // Large mobile banner

  // Standard ratio checks
  if (Math.abs(ratio - 1) < 0.05) return "ratio_1_1"; // Square
  if (Math.abs(ratio - 4 / 3) < 0.05) return "ratio_4_3"; // Rectangle
  if (Math.abs(ratio - 16 / 9) < 0.05) return "ratio_16_9"; // Widescreen
  if (Math.abs(ratio - 1 / 3) < 0.05) return "ratio_1_3"; // Skyscraper
  if (Math.abs(ratio - 4 / 1) < 0.05) return "ratio_4_1"; // Leaderboard
  if (Math.abs(ratio - 10 / 1) < 0.05) return "ratio_10_1"; // Leaderboard
  if (Math.abs(ratio - 3 / 2) < 0.05) return "ratio_3_2"; // Standard rectangle
  if (Math.abs(ratio - 2 / 3) < 0.05) return "ratio_2_3"; // Tall rectangle
  if (Math.abs(ratio - 2 / 1) < 0.05) return "ratio_2_1"; // Widescreen rectangle
  if (Math.abs(ratio - 3 / 1) < 0.05) return "ratio_3_1"; // Extra-wide leaderboard

  return "default";
}

export const imageMap = {
  ratio_1_1: chrome.runtime.getURL("images/square.png"),
  ratio_4_3: chrome.runtime.getURL("images/rectangle.png"),
  ratio_16_9: chrome.runtime.getURL("images/wide.png"),
  ratio_1_3: chrome.runtime.getURL("images/skyscraper.png"),
  ratio_4_1: chrome.runtime.getURL("images/leaderboard.png"),
  ratio_8_1: chrome.runtime.getURL("images/leaderboard.png"),
  ratio_10_1: chrome.runtime.getURL("images/leaderboard.png"),
  ratio_3_2: chrome.runtime.getURL("images/rectangle.png"),
  ratio_2_3: chrome.runtime.getURL("images/rectangle.png"),
  half_page: chrome.runtime.getURL("images/half.png"),
  ratio_2_1: chrome.runtime.getURL("images/wide.png"),
  ratio_3_1: chrome.runtime.getURL("images/leaderboard.png"),
  default: chrome.runtime.getURL("images/default.png"),
};
