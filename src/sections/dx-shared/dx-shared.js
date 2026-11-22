// Helpers shared by the Raika problem and solution sections: reduced-motion check,
// count-up numbers, reveal on scroll, and the word-mask heading reveal.
// Behaviour is the same as the teammate's original scripts; each helper is now
// given the section it should work on instead of scanning the whole page.

import { motion } from "../../motion/motion-controller.js";

/** True when the visitor asked for less motion (system setting or Calm mode). */
export function prefersReduced() {
  return motion.calm || Boolean(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function countUp(el, reduce) {
  const to = parseFloat(el.dataset.to);
  const dec = parseInt(el.dataset.dec || "0", 10);
  if (reduce) { el.textContent = to.toFixed(dec); return; }
  let t0 = null;
  function tick(t) {
    t0 = t0 || t;
    const p = Math.min((t - t0) / 1400, 1);
    el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/** Fade in `.js-reveal` blocks inside `root` when they scroll into view; count up `.js-count` numbers. */
export function initReveal(root) {
  if (!root) return;
  const reduce = prefersReduced();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("is-in");
      el.querySelectorAll(".dx-stat").forEach((s) => s.classList.add("is-in"));
      el.querySelectorAll(".js-count").forEach((c) => countUp(c, reduce));
      io.unobserve(el);
    });
  }, { threshold: 0.25 });
  root.querySelectorAll(".js-reveal").forEach((el) => io.observe(el));
}

/** Split `.js-split` headings inside `root` into words that slide up when the heading scrolls into view. */
export function initSplit(root) {
  if (!root) return;
  root.querySelectorAll(".js-split").forEach((el) => {
    let n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span");
            w.className = "dx-w";
            const i = document.createElement("span");
            i.style.setProperty("--d", n++);
            i.textContent = part;
            w.appendChild(i);
            frag.appendChild(w);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) {
          walk(c);
        }
      });
    })(el);
    el.classList.add("dx-split");
    const o = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { el.classList.add("is-in"); o.disconnect(); }
    }, { threshold: 0.4 });
    o.observe(el);
  });
}
