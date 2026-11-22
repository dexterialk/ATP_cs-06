// Effect "marquee": the scrolling Move · Mend · Master band and its pause button.
// Hover and focus pausing are pure CSS. In Calm mode the band is static.

import { motion } from "../motion-controller.js";

export default function marquee(section) {
  const button = section.querySelector("[data-marquee-pause]");
  button?.addEventListener("click", () => {
    const paused = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(paused));
    section.classList.toggle("is-paused", paused);
  });

  const sync = () => section.classList.toggle("fx-marquee", !motion.calm);
  sync();
  motion.subscribe(sync);
}
