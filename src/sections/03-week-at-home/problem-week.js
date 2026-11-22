// Raika 02 (a week of hours): reveal on scroll and the with / without Dexteria switch.
import { initReveal } from "../dx-shared/dx-shared.js";

export function initProblemWeek() {
  initReveal(document.getElementById("problem-week"));

  const wk = document.getElementById("dx-week");
  if (!wk) return;
  wk.querySelectorAll(".dx-week__toggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const on = btn.dataset.with === "1";
      wk.classList.toggle("dx-week--with", on);
      wk.querySelectorAll(".dx-week__toggle button").forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      document.getElementById("dx-home-n").textContent = on ? "14" : "166";
      document.getElementById("dx-home-l").textContent = on ? "short sessions at home, guided and tracked" : "hours at home, on your own";
      document.getElementById("dx-week-note").textContent = on
        ? "Two short Smart Ball sessions a day, each one saved so the therapist can see exactly how the hand is doing."
        : "At home there’s no one to check if the exercises are done right, or done at all.";
    });
  });
}
