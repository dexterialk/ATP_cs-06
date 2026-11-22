// Effect "reveal": .reveal elements fade up as they enter the viewport.
// Built with anime.js. Anything already on screen shows at once; keyboard
// focus reveals an element straight away; Calm mode shows everything.

import { animate } from "animejs";
import { motion } from "../motion-controller.js";

const seconds = (el) => (parseFloat(el.style.getPropertyValue("--d")) || 0) * 1000;

export default function reveal(section) {
  const items = [...section.querySelectorAll(".reveal")];
  if (!items.length) return;

  const show = (el) => el.classList.add("is-in");

  function play(el) {
    if (motion.calm) return show(el);
    // Set the starting pose first, so the delay never shows the final state early.
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    show(el);
    animate(el, {
      opacity: [0, 1],
      translateY: [32, 0],
      duration: 900,
      delay: seconds(el),
      ease: "outQuart",
      onComplete: () => { el.style.removeProperty("opacity"); el.style.removeProperty("transform"); },
    });
  }

  if (motion.calm || !("IntersectionObserver" in window)) { items.forEach(show); return; }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      play(entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });

  // Read every position first, then write, to avoid forcing layout per item.
  const tops = items.map((el) => el.getBoundingClientRect().top);
  items.forEach((el, i) => { if (tops[i] < innerHeight) play(el); else observer.observe(el); });

  // Keyboard users can tab into content before it scrolls into view.
  section.addEventListener("focusin", (event) => {
    const el = event.target.closest?.(".reveal:not(.is-in)");
    if (el) { show(el); observer.unobserve(el); }
  });

  // Turning Calm on shows whatever is still waiting.
  motion.subscribe((calm) => { if (calm) { items.forEach(show); observer.disconnect(); } });
}
