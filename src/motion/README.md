# Motion system

All motion lives here. Sections only declare data attributes; they never import motion code.

## Calm mode
`motion-controller.js` holds the one Full / Calm switch. Default: Calm if the system asks for reduced motion, otherwise Full. Saved in `localStorage` (`dexteria-calm`: `on` / `off`) and applied as `data-calm` on `<html>` (an inline script in each page's `<head>` sets it before first paint). The nav switch is any `[data-calm-toggle]` button with `role="switch"`.

In Calm mode the ball is a still image (`public/assets/ball/smart-ball.png`) that jumps to each preset, nothing loops, and every effect shows its final state.

## The ball (`choreography/`)
One persistent fixed layer (`BallLayer.jsx`, mounted by `components/Layout.jsx`). `aria-hidden`, `pointer-events: none`; only the hero preset turns pointer events on, and only for the ball's own disc.

| Attribute | On | Meaning |
|---|---|---|
| `data-ball-state="<preset>"` | a section | which preset the ball uses while that section is active |
| `data-ball-anchor` | an element inside that section | fit the ball inside this box instead of the preset position |
| `data-ball-layer="back" or "front"` | a section | override the preset's layer |

- `model-states.js`: the presets (`hero`, `dock-left`, `dock-right`, `behind`, `rise-from-under`, `step-1`..`step-3`, `corner`, `waitlist`, `team-hidden`, `rest`). Add or tune presets here.
- `slots.js`: anchor measurement and fitting; metrics refresh on a debounced resize.
- `choreographer.js`: `current += (target - current) * (1 - Math.exp(-k * dt))`. One constant, `--ball-damping` in `src/css/tokens.css`, shared by every preset. Any preset can follow any other.
- `registry.js`: the active section is the visible one whose centre is nearest the middle of the viewport, in either scroll direction. A section can change its own `data-ball-state` while on screen (the pinned steps do).
- `layers.js`: `back` / `front` switch with a fade out, switch, fade in (`--ball-layer-fade`, 300 ms).
- Buttons: `[data-ball-spin]` calls `spin()`; `[data-ball-squeeze]` calls `squeeze()` (the keyboard way to press and hold).

`DexteriaBall` API (ref): `setTransform({x,y,scale,rx,ry,rz})`, `setState(name)`, `setPointerEvents(on)`, `spin()`, `squeeze()`.

## Effects (`effects/`)
One file per effect. An effect runs only for elements with `data-effect="<name>"` (names separated by spaces). Keyframes and starting poses are in `effects.css`; effect files add and remove classes.

`headline-rise` and `reveal` use anime.js (4.5.0). The others are `drift`, `marquee`, `pinned-steps`, `pinned-features`, `hover-lift`, `logo-hover`.
