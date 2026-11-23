// Starts the page scripts once React has rendered the page.
//
// Sections never import each other or any motion code. The Calm switch, the
// ball choreography (BallLayer) and the section effects (data-effect) are all
// started from here or from the layout; sections only declare data attributes.
// The teammates' sections each export one init function that wires up their
// own behaviour; they only touch their own section.

import { initCalmToggle } from "../motion/motion-controller.js";
import { startEffects } from "../motion/effects/index.js";
import { initLogoToTop } from "../sections/00-nav/logo-to-top.js";
import { initNav } from "../sections/00-nav/nav.js";
import { initWaitlist } from "../sections/11-waitlist/waitlist.js";
import { initProblemStats } from "../sections/02-problem/problem-stats.js";
import { initProblemWeek } from "../sections/03-week-at-home/problem-week.js";
import { initProblemGaps } from "../sections/04-what-goes-wrong/problem-gaps.js";
import { initSolutionDemo } from "../sections/06-how-dexteria-helps/solution-demo.js";
import { initSolutionModes } from "../sections/09-app-three-ways/solution-modes.js";

export function bootPage() {
  initCalmToggle();
  initNav(document.querySelector("[data-site-header]"));
  initWaitlist();
  startEffects();
  initLogoToTop();

  // Teammate sections (only present on the home page; each init checks for its own elements).
  initProblemStats();
  initProblemWeek();
  initProblemGaps();
  initSolutionDemo();
  initSolutionModes();
}
