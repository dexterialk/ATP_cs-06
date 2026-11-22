// Raika 07 (three modes): reveal on scroll (the Squeeze, Sync, See progress steps) and the word-mask heading.
import { initReveal, initSplit } from "../dx-shared/dx-shared.js";

export function initSolutionModes() {
  const root = document.getElementById("solution-modes");
  initReveal(root); // without this the steps row stays at opacity 0 and shows as a blank gap
  initSplit(root);
}
