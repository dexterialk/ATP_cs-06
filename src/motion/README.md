# Motion

- `motion-controller.js`: the **Static | Motion** control. Static = Calm mode (`data-calm="on"` on `<html>`). Default: Static if the system asks for reduced motion. Saved in `localStorage` (`dexteria-calm`). An inline script in each page's `<head>` applies it before first paint.
- `scroll-indicator.js`: the scroll progress line (Anime.js `onScroll`).
- `effects/`: section effects started from `src/js/main.js`. An effect runs for elements with `data-effect="<name>"`: `reveal`, `pinned-steps`, `pinned-features`, `marquee`, `hover-lift`, `logo-hover`.
- `effects.css`: the keyframes and starting poses for those effects.
- `ball-visibility.js`: shows or hides the earlier ball-and-scroll sections kept in `src/sections/_hidden-team-version/`.

The old fixed, scroll-moving ball layer (`choreography/`) was removed: the 3D ball now lives only in the hero and the waitlist.
