// Starts every section effect. An effect runs only for elements that carry
// data-effect="<name>" (several names may be listed, separated by spaces).
// Sections never import effect files; they only declare the attribute.

import "../effects.css";
import headlineRise from "./headline-rise.js";
import drift from "./drift.js";
import marquee from "./marquee.js";
import reveal from "./reveal.js";
import pinnedSteps from "./pinned-steps.js";
import pinnedFeatures from "./pinned-features.js";
import { hoverLift, logoHover } from "./hover-lift.js";

const EFFECTS = {
  "headline-rise": headlineRise,
  "drift": drift,
  "marquee": marquee,
  "reveal": reveal,
  "pinned-steps": pinnedSteps,
  "pinned-features": pinnedFeatures,
  "hover-lift": hoverLift,
  "logo-hover": logoHover,
};

export function startEffects(scope = document) {
  scope.querySelectorAll("[data-effect]").forEach((el) => {
    el.dataset.effect.split(/\s+/).filter(Boolean).forEach((name) => {
      const effect = EFFECTS[name];
      if (effect) effect(el);
      else console.warn(`[effects] Unknown effect "${name}"`);
    });
  });
}
