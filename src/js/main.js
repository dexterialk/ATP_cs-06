// Starts the page scripts once React has rendered the page.
//
// Sections never import each other or any motion code. The Calm switch, the
// ball choreography (BallLayer) and the section effects (data-effect) are all
// started from here or from the layout; sections only declare data attributes.

import { initCalmToggle } from "../motion/motion-controller.js";
import { startEffects } from "../motion/effects/index.js";
import { initNav } from "../sections/01-nav/nav.js";
import { initWaitlist } from "../sections/10-waitlist/waitlist.js";

export function bootPage() {
  initCalmToggle();
  initNav(document.querySelector("[data-site-header]"));
  initWaitlist(document.querySelector("[data-waitlist-form]"));
  startEffects();
}
