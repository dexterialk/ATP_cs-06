// Moves the ball toward the active preset, a little further each frame.
//
//   current += (target - current) * (1 - Math.exp(-k * dt))
//
// k is one constant for every preset (--ball-damping in tokens.css), and dt is
// the real time since the last frame, so the motion feels the same at 60 Hz
// and 144 Hz. The ball always starts from wherever it is now, so any preset can
// follow any other without hard-coded pairs.
//
// The loop only runs while something is still moving. Scrolling and resizing
// wake it up again (anchored presets follow their section as it scrolls).

import { PRESETS } from "./model-states.js";
import { resolveTarget } from "./slots.js";
import { motion } from "../motion-controller.js";

const KEYS = ["x", "y", "scale", "rx", "ry", "rz"];
const EPSILON = { x: 0.1, y: 0.1, scale: 0.0005, rx: 0.0005, ry: 0.0005, rz: 0.0005 };

function readDamping() {
  const k = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ball-damping"));
  return Number.isFinite(k) && k > 0 ? k : 8;
}

/**
 * @param {{ layerEl: HTMLElement, getApi: () => object, layers: { setLayer: Function } }} deps
 */
export function createChoreographer({ layerEl, getApi, layers }) {
  let name = null;
  let anchor = null;
  let layerOverride = null;
  let current = null;
  let frame = 0;
  let last = 0;
  let k = readDamping();

  function apply() {
    getApi()?.setTransform(current);
    if (!layerEl.classList.contains("is-ready")) layerEl.classList.add("is-ready");
  }

  function step(now) {
    frame = 0;
    if (!name) return;
    const target = resolveTarget(name, anchor);
    if (!current || motion.calm) {
      current = { ...target };
      apply();
      return;
    }
    const dt = Math.min(0.1, Math.max(0.001, (now - last) / 1000));
    last = now;
    const alpha = 1 - Math.exp(-k * dt);
    let moving = false;
    for (const key of KEYS) {
      const diff = target[key] - current[key];
      if (Math.abs(diff) > EPSILON[key]) {
        current[key] += diff * alpha;
        moving = true;
      } else {
        current[key] = target[key];
      }
    }
    apply();
    if (moving) frame = requestAnimationFrame(step);
  }

  /** Start (or keep) the loop running. */
  function kick() {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(step);
  }

  /** Make a preset the target. `section` supplies the anchor and layer override. */
  function setActive(presetName, section) {
    if (!PRESETS[presetName]) {
      console.warn(`[choreographer] Unknown ball state "${presetName}"`);
      return;
    }
    name = presetName;
    anchor = section?.querySelector("[data-ball-anchor]") || null;
    layerOverride = section?.dataset.ballLayer || null;
    reapply();
    kick();
  }

  /** Push the preset's state, layer and pointer setting to the current ball. */
  function reapply() {
    if (!name) return;
    const preset = PRESETS[name];
    layers.setLayer(layerOverride || preset.layer);
    const api = getApi();
    api?.setState(name);
    api?.setPointerEvents(preset.pointer && !motion.calm);
    if (current) apply();
  }

  addEventListener("scroll", kick, { passive: true });
  addEventListener("resize", () => { k = readDamping(); kick(); }, { passive: true });
  motion.subscribe(() => { reapply(); kick(); });

  return {
    setActive,
    reapply,
    kick,
    get state() { return name; },
    get current() { return current; },
  };
}
