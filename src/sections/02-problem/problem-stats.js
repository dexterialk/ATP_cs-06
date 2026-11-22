// Raika 01 (problem stats): count-up stat cards and the word-mask heading.
import { initReveal, initSplit } from "../dx-shared/dx-shared.js";

export function initProblemStats() {
  const root = document.getElementById("problem");
  initReveal(root);
  initSplit(root);
}
