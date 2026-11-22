# Smart Ball component

One persistent, decorative ball that floats above the page background and below all content. It moves between named poses as the user scrolls.

| File | Job |
| --- | --- |
| `smart-ball.njk` | Markup only: the fixed layer and the wrapper elements. Sets the image source (`ballSrc`). |
| `smart-ball.css` | Poses for every state, the idle float, and the single 360-degree rotation keyframe (`smart-ball-spin`). |
| `smart-ball.js` | Renders the ball and exposes the API below. |

The component knows nothing about sections. `src/js/scroll-controller.js` decides which state to use. `src/js/main.js` decides when to spin.

## API

```js
import { createSmartBall } from "../components/smart-ball/smart-ball.js";

const ball = createSmartBall(layerElement, { reducedMotion });

ball.setState("corner");                     // pose from smart-ball.css
ball.setState("hero", { rect });             // centre on a rectangle (getBoundingClientRect())
ball.setState("steps", { rect, step: 1 });   // How It Works step 0, 1 or 2
ball.spin();                                 // one full 360-degree turn (no-op under reduced motion)
ball.setPaused(true);                        // stop the idle float ("Pause motion")
ball.renderStill(element);                   // static copy for reduced motion / no WebGL
ball.show();                                 // reveal the layer once it has been placed
```

States: `hero`, `side`, `behind-panel`, `banner`, `steps`, `corner`, `paused`, `off-screen`, `waitlist`, `rest`.

## Accessibility rules this component keeps

- The layer is `aria-hidden="true"` and `pointer-events: none`. Images use `alt=""`.
- The ball conveys no information. Everything it "shows" is also in text.
- Only `transform` and `opacity` animate.
- Under `prefers-reduced-motion: reduce` the layer is hidden. `main.js` puts still copies in the hero and waitlist instead, and `spin()` does nothing.
- The ball paints *below* page content (`z-index: 1`), so it never covers text or controls.

## Swapping the PNG for a 3D model

Only files in this folder change.

1. Put the model in `src/assets/ball/smart-ball.glb`. Keep it under 3 MB: use Draco or Meshopt compression and textures of 1024 px or smaller. Keep `smart-ball.png` as the still and fallback image.
2. In `smart-ball.njk`, add `data-model="/src/assets/ball/smart-ball.glb"` to `.smart-ball`. Change the `<link rel="preload">` so it no longer preloads the PNG eagerly.
3. In `smart-ball.js`, replace `renderBall()`:
   - Check WebGL support (`document.createElement("canvas").getContext("webgl2")`). If it is missing, or the model fails to load, call the existing PNG code. That is the static fallback.
   - Otherwise lazy-load the renderer (for example `await import("https://cdn.jsdelivr.net/npm/three@0.170.0/+esm")` plus `GLTFLoader`, or `<model-viewer>`). Create a `<canvas>` inside `.smart-ball__spin` and render the model with a transparent background.
   - Keep `.smart-ball__spin` as the wrapper. For a true 3D turn, make `spin()` rotate the model around its vertical axis over the same `--dur-spin` instead of adding the CSS class. Keep the CSS keyframe for the PNG fallback.
   - Render only while the ball is visible (`IntersectionObserver` or the current state) to save battery.
4. Leave `renderStillImage()` on the PNG. Reduced motion should always get a still image.
5. Run `npm test`. It checks states, reduced motion and keyboard access.

Nothing in `src/sections/` or `src/js/` needs to change. They only call `setState()` and `spin()`.
