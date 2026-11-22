// Named ball presets. A section picks one with data-ball-state="<name>".
//
//   x, y      resting position as a fraction of the viewport, from its centre
//             (0.5 = half a viewport width to the right / height down).
//             Ignored when the section has a [data-ball-anchor]; then the ball
//             is fitted into that box instead.
//   scale     size multiplier for the ball's base size.
//   fit       with an anchor: fraction of the anchor box the ball fills.
//   dx        with an anchor: horizontal shift as a fraction of the anchor width.
//   ry, rx, rz  rotation offsets in degrees (rz turns the container, rx and ry
//             turn the ball itself).
//   layer     'back' (behind section content) or 'front' (above it).
//   pointer   true only when the visitor can press and hold the ball.

export const PRESETS = Object.freeze({
  "hero":            { x: 0,     y: 0,    scale: 1,    fit: 0.85, layer: "front", pointer: true },
  "dock-left":       { x: -0.3,  y: 0,    scale: 0.75, ry: 25,    layer: "back",  pointer: false },
  "dock-right":      { x: 0.3,   y: 0,    scale: 0.75, ry: -25,   layer: "back",  pointer: false },
  "behind":          { x: 0,     y: 0,    scale: 1.1,             layer: "back",  pointer: false },
  "rise-from-under": { x: 0,     y: 0.1,  scale: 0.9,  fit: 1,    layer: "back",  pointer: false },
  "step-1":          { x: 0.2,   y: 0,    scale: 0.8,  fit: 0.9, dx: -0.12, ry: -24, layer: "back", pointer: false },
  "step-2":          { x: 0.2,   y: 0,    scale: 0.8,  fit: 0.9, dx: 0,     ry: 0,   layer: "back", pointer: false },
  "step-3":          { x: 0.2,   y: 0,    scale: 0.8,  fit: 0.9, dx: 0.12,  ry: 24,  layer: "back", pointer: false },
  "corner":          { x: 0.36,  y: 0.3,  scale: 0.55, ry: -18,   layer: "back",  pointer: false },
  "waitlist":        { x: 0.25,  y: 0,    scale: 1,    fit: 0.95, layer: "back",  pointer: false },
  "team-hidden":     { x: 0.85,  y: 0.2,  scale: 0.6,             layer: "back",  pointer: false },
  "rest":            { x: 0.36,  y: 0.32, scale: 0.45, ry: -18,   layer: "back",  pointer: false },
});

export const DEFAULT_PRESET = "hero";
