// Effect "headline-rise": the hero headline words rise into place, then the
// eyebrow, lead, text and buttons fade up. Built with anime.js.
//
// Before this runs, CSS (effects.css) holds the elements in their starting
// pose. In Calm mode, or if the visitor switches Calm on mid-way, everything
// goes straight to its final state.

import { animate, stagger } from "animejs";
import { motion } from "../motion-controller.js";

const seconds = (el) => (parseFloat(el.style.getPropertyValue("--d")) || 0) * 1000;

export default function headlineRise(section) {
  const words = [...section.querySelectorAll(".hero__word > span")];
  const fades = [...section.querySelectorAll(".hero__fade")];
  const animations = [];

  function finish() {
    animations.forEach((a) => a.revert());
    animations.length = 0;
    section.classList.add("fx-done");
  }

  if (motion.calm) { finish(); return; }

  animations.push(
    animate(words, {
      translateY: ["110%", "0%"],
      rotate: [4, 0],
      duration: 1000,
      delay: stagger(100, { start: 250 }),
      ease: "outQuart",
    }),
    animate(fades, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 1000,
      delay: (el) => seconds(el),
      ease: "outQuart",
      onComplete: finish,
    }),
  );

  motion.subscribe((calm) => { if (calm) finish(); });
}
