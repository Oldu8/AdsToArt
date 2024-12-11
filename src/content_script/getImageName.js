import { getRandomImageName } from './functions.js';

export function getRatio(width, height) {
  const ratio = width / height;

  // Handle specific known standard ad sizes first
  if (width === 970 && height === 90) return 'ratio_10_1'; // Leaderboard size
  if (width === 728 && height === 90) return 'ratio_8_1'; // Leaderboard size
  if (width === 300 && height === 250) return 'ratio_4_3'; // Medium rectangle
  if (width === 336 && height === 280) return 'ratio_6_5'; // Large rectangle
  if (width === 300 && height === 600) return 'ratio_2_1'; // Half-page
  if (width === 160 && height === 600) return 'ratio_1_3'; // Wide skyscraper

  // Standard ratio checks
  if (Math.abs(ratio - 1) < 0.05) return 'ratio_1_1'; // Square
  if (Math.abs(ratio - 4 / 3) < 0.05) return 'ratio_4_3'; // Rectangle
  if (Math.abs(ratio - 1 / 3) < 0.05) return 'ratio_1_3'; // Skyscraper
  if (Math.abs(ratio - 10 / 1) < 0.05) return 'ratio_10_1'; // Leaderboard
  if (Math.abs(ratio - 2 / 1) < 0.05) return 'ratio_2_1'; // Widescreen rectangle

  // TODO: maybe we can use this not popular sizes somewhere else ?
  // if (Math.abs(ratio - 4 / 1) < 0.05) return "ratio_4_1"; // Leaderboard
  // if (Math.abs(ratio - 3 / 2) < 0.05) return "ratio_3_2"; // Standard rectangle
  // if (Math.abs(ratio - 2 / 3) < 0.05) return "ratio_2_3"; // Tall rectangle
  // if (Math.abs(ratio - 16 / 9) < 0.05) return "ratio_16_9"; // Widescreen

  return 'default';
}

export function getImageName(width, height) {
  const ratioImage = getRatio(width, height);
  const imageName = getRandomImageName(ratioImage, 4);
  return imageName;
}
