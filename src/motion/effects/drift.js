// Effect "drift": the hero's floating orbs and orbiting rings.
// In Calm mode they stay where they are.

import { motion } from "../motion-controller.js";

export default function drift(section) {
  const sync = () => section.classList.toggle("fx-drift", !motion.calm);
  sync();
  motion.subscribe(sync);
}
