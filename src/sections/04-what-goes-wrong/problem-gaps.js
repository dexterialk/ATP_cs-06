// Raika 03 (gaps): the stacking problem cards shrink slightly as the next card slides over them.
import { prefersReduced } from "../dx-shared/dx-shared.js";

export function initProblemGaps() {
  const list = document.getElementById("dx-stack");
  if (!list || prefersReduced()) return;
  const items = [].slice.call(list.children);
  let raf = 0;
  function update() {
    raf = 0;
    items.forEach((li, i) => {
      const card = li.firstElementChild;
      const next = items[i + 1];
      if (!next) return;
      const top = parseFloat(getComputedStyle(li).top) || 0;
      const h = card.offsetHeight;
      const p = Math.min(1, Math.max(0, (top + h - next.getBoundingClientRect().top) / h));
      card.style.transform = "scale(" + (1 - p * 0.06) + ")";
      card.style.filter = "brightness(" + (1 - p * 0.12) + ")";
    });
  }
  function on() { if (!raf) raf = requestAnimationFrame(update); }
  update();
  addEventListener("scroll", on, { passive: true });
  addEventListener("resize", on);
}
