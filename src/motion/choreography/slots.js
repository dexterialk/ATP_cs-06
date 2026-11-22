// Works out where the ball should be for a preset.
//
// If the active section contains [data-ball-anchor], the ball is fitted inside
// that element's bounding box (keeping its round shape). Otherwise the
// preset's own position is used. Viewport metrics are cached and refreshed
// on resize (debounced); the anchor box is read live because anchors move
// with the page while it scrolls.

import { PRESETS } from "./model-states.js";

// Ball geometry. These mirror the camera set-up in DexteriaBall.jsx: at the
// stage's aspect ratio the ball's rendered diameter is a fixed share of the
// stage height.
const TAN_HALF_FOV = Math.tan((14 * Math.PI) / 180);
const MIN_CAMERA_Z = 5.6;

let metrics = { vw: innerWidth, vh: innerHeight, base: 300 };

function measure(stage) {
  const vw = document.documentElement.clientWidth || innerWidth;
  const vh = innerHeight;
  const w = stage?.offsetWidth || 720;
  const h = stage?.offsetHeight || 480;
  const z = Math.max(MIN_CAMERA_Z, 2 / (TAN_HALF_FOV * (w / h)));
  metrics = { vw, vh, base: h / (z * TAN_HALF_FOV) }; // base = diameter at scale 1
}

/** Measures now and again, debounced, after every resize. */
export function initSlots(stage, onResize) {
  measure(stage);
  let timer = 0;
  addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => { measure(stage); onResize(); }, 120);
  }, { passive: true });
}

/**
 * Target transform for a preset, relative to the viewport centre.
 * @param {string} name          preset name
 * @param {Element|null} anchor  the active section's [data-ball-anchor], if any
 * @returns {{x:number,y:number,scale:number,rx:number,ry:number,rz:number}}
 */
export function resolveTarget(name, anchor) {
  const p = PRESETS[name];
  const { vw, vh, base } = metrics;
  const rad = (deg = 0) => (deg * Math.PI) / 180;
  const rotation = { rx: rad(p.rx), ry: rad(p.ry), rz: p.rz || 0 };

  const rect = anchor?.getBoundingClientRect();
  if (rect && rect.width > 0 && rect.height > 0) {
    const diameter = Math.min(rect.width, rect.height) * (p.fit ?? 1);
    return {
      x: rect.left + rect.width / 2 + (p.dx || 0) * rect.width - vw / 2,
      y: rect.top + rect.height / 2 - vh / 2,
      scale: diameter / base,
      ...rotation,
    };
  }

  // No anchor: use the preset's own position. Never wider than 80% of the viewport.
  const scale = Math.min(p.scale, (vw * 0.8) / base);
  return { x: p.x * vw, y: p.y * vh, scale, ...rotation };
}
