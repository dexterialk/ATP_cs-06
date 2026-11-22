// Starts the ball choreography. Called once by BallLayer after the fixed layer
// has rendered. Sections never import anything from here: they only carry
// data-ball-state, data-ball-anchor and data-ball-layer attributes.

import { createLayers } from "./layers.js";
import { createChoreographer } from "./choreographer.js";
import { createRegistry } from "./registry.js";
import { initSlots } from "./slots.js";

/**
 * @param {{ layerEl: HTMLElement, getApi: () => object }} options
 *   getApi returns whichever ball is mounted now (3D ball, or the still image
 *   in Calm mode). Both expose setTransform, setState, setPointerEvents, spin, squeeze.
 */
export function startChoreography({ layerEl, getApi }) {
  const layers = createLayers(layerEl);
  const choreographer = createChoreographer({ layerEl, getApi, layers });

  initSlots(layerEl.querySelector(".ball-stage"), () => choreographer.kick());

  const registry = createRegistry((section, state) => {
    // Sections with no ball preset (and the hero and waitlist, which carry their own ball) fade this layer's ball out.
    const away = state === "none";
    layerEl.classList.toggle("is-away", away);
    getApi()?.setPaused?.(away);
    if (!away) choreographer.setActive(state, section);
  });
  registry.refresh();

  // Buttons that act on the ball. Delegated, so sections hold no motion code.
  const onClick = (event) => {
    if (event.target.closest("[data-ball-spin]")) getApi()?.spin();
    else if (event.target.closest("[data-ball-squeeze]")) getApi()?.squeeze();
  };
  document.addEventListener("click", onClick);

  return {
    /** Call after the ball component was swapped (Calm mode on or off). */
    refresh() { choreographer.reapply(); choreographer.kick(); },
    choreographer,
    registry,
    stop() { document.removeEventListener("click", onClick); },
  };
}
