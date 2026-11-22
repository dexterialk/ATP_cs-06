# Motion

- `motion-controller.js`: the **Static | Motion** control. Static = Calm mode (`data-calm="on"` on `<html>`). Default: Static if the system asks for reduced motion. Saved in `localStorage` (`dexteria-calm`). An inline script in each page's `<head>` applies it before first paint.
- `effects/`: section effects started from `src/js/main.js`. An effect runs for elements with `data-effect="<name>"`: `reveal`, `pinned-steps`, `pinned-features`, `marquee`, `hover-lift`, `logo-hover`.
- `choreography/`: the moving ball layer (registry, presets, choreographer).
- `effects.css`: the keyframes and starting poses for those effects.

The ball layer fades out over sections that have no `data-ball-state`, and in Static mode it is replaced by a still image.
