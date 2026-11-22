// The ball lives on one of two stacking layers:
//   back  = behind section content (sections with an opaque background hide it)
//   front = above section content (hero only, so the ball can be pressed)
//
// Changing layer fades the ball out, switches the layer, and fades it back in.
// The two halves together take --ball-layer-fade (about 300 ms). In Calm mode
// the switch is immediate.

import { motion } from "../motion-controller.js";

export function createLayers(layerEl) {
  let current = layerEl.dataset.layer || "back";
  let token = 0;

  function fadeMs() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--ball-layer-fade").trim();
    const ms = parseFloat(raw);
    return Number.isFinite(ms) ? (raw.endsWith("ms") ? ms : ms * 1000) : 300;
  }

  /** @param {"back"|"front"} next */
  function setLayer(next) {
    if (next === current) return;
    current = next;
    const mine = ++token;
    const stage = layerEl.querySelector(".ball-stage");
    // Calm mode, and the very first placement, switch immediately.
    if (motion.calm || !stage || !layerEl.classList.contains("is-ready")) {
      layerEl.dataset.layer = next;
      stage?.classList.remove("is-fading");
      return;
    }
    stage.classList.add("is-fading"); // opacity -> 0 over half the fade time
    setTimeout(() => {
      if (mine !== token) return; // a newer change took over
      layerEl.dataset.layer = next;
      layerEl.querySelector(".ball-stage")?.classList.remove("is-fading"); // opacity -> 1
    }, fadeMs() / 2);
  }

  return { setLayer, get layer() { return current; } };
}
