// Effects "hover-lift" and "logo-hover": small hover responses (app cards
// straighten and lift; the nav logo tilts). Off in Calm mode.

import { motion } from "../motion-controller.js";

function toggleClass(name) {
  return function effect(section) {
    const sync = () => section.classList.toggle(name, !motion.calm);
    sync();
    motion.subscribe(sync);
  };
}

export const hoverLift = toggleClass("fx-hover-lift");
export const logoHover = toggleClass("fx-logo-hover");
