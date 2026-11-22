// Smart Ball component.
//
// Renders the ball and moves it between named poses. It knows nothing about
// page sections: callers say which pose they want, and optionally pass a
// rectangle (from getBoundingClientRect) to centre the ball on.
//
//   const ball = createSmartBall(layerEl, { reducedMotion });
//   ball.setState("hero", { rect });   // anchored pose
//   ball.setState("corner");           // viewport pose from smart-ball.css
//   ball.setState("steps", { rect, step: 1 });
//   ball.spin();                       // one 360-degree rotation
//   ball.setPaused(true);              // stop the idle float
//   ball.renderStill(el);              // static copy, for reduced motion
//   ball.show();                       // reveal the layer once placed
//
// To swap the PNG for a 3D model, replace renderBall() and renderStillImage()
// below (see README.md). Nothing outside this folder needs to change.

export const BALL_STATES = Object.freeze([
  "hero", "side", "behind-panel", "banner", "steps",
  "corner", "paused", "off-screen", "waitlist", "rest",
]);

// How long a state change animates (must match --ball-dur in smart-ball.css).
const SETTLE_MS = 900;
// After that, anchored updates while scrolling use a short, soft follow.
const FOLLOW_DURATION = "0.35s";

/** PNG renderer. Replace this function to render a 3D model instead. */
function renderBall(container, src) {
  const img = document.createElement("img");
  img.className = "smart-ball__img";
  img.src = src;
  img.alt = "";
  img.width = 550;
  img.height = 554;
  img.decoding = "async";
  img.draggable = false;
  img.setAttribute("fetchpriority", "high");
  container.replaceChildren(img);
}

/** Still image for reduced motion (and the no-WebGL fallback for a 3D model). */
function renderStillImage(container, src) {
  const img = document.createElement("img");
  img.className = "smart-ball-still";
  img.src = src;
  img.alt = "";
  img.width = 550;
  img.height = 554;
  img.decoding = "async";
  container.replaceChildren(img);
}

/**
 * @param {HTMLElement} layer  The [data-smart-ball-layer] element.
 * @param {{ src?: string, reducedMotion?: boolean }} options
 */
export function createSmartBall(layer, { src, reducedMotion = false } = {}) {
  const ball = layer?.querySelector("[data-smart-ball]");
  if (!ball) return null;

  const source = src || ball.dataset.src;
  const spinner = ball.querySelector(".smart-ball__spin");
  let state = ball.dataset.state || "hero";
  let changedAt = 0;
  let firstPlacement = true;

  if (!reducedMotion) renderBall(spinner, source);

  spinner.addEventListener("animationend", (event) => {
    if (event.animationName === "smart-ball-spin") spinner.classList.remove("is-spinning");
  });

  function setPosition(rect) {
    if (rect && rect.width > 0 && rect.height > 0) {
      const base = ball.offsetWidth || 440; // layout size, ignores transforms
      const diameter = Math.min(rect.width, rect.height);
      ball.style.setProperty("--x", `${rect.left + rect.width / 2}px`);
      ball.style.setProperty("--y", `${rect.top + rect.height / 2}px`);
      ball.style.setProperty("--s", (diameter / base).toFixed(4));
    } else {
      ball.style.removeProperty("--x");
      ball.style.removeProperty("--y");
      ball.style.removeProperty("--s");
    }
  }

  /**
   * Move to a named pose.
   * @param {string} next  One of BALL_STATES.
   * @param {{ rect?: DOMRect|null, step?: number }} [options]
   */
  function setState(next, { rect = null, step } = {}) {
    if (!BALL_STATES.includes(next)) {
      console.warn(`[smart-ball] Unknown state "${next}"`);
      return;
    }
    const now = performance.now();
    if (next !== state) {
      state = next;
      changedAt = now;
      ball.dataset.state = next;
    }
    if (typeof step === "number") ball.dataset.step = String(step);
    else if (next !== "steps") delete ball.dataset.step;

    if (firstPlacement) {
      // Place the ball without animating from the default pose on page load.
      ball.style.setProperty("--ball-dur", "0s");
      firstPlacement = false;
      requestAnimationFrame(() => requestAnimationFrame(() => ball.style.removeProperty("--ball-dur")));
    } else if (now - changedAt < SETTLE_MS) {
      ball.style.removeProperty("--ball-dur");
    } else {
      ball.style.setProperty("--ball-dur", FOLLOW_DURATION);
    }
    setPosition(rect);
  }

  /** One full 360-degree rotation. Does nothing when reduced motion is on. */
  function spin() {
    if (reducedMotion) return false;
    spinner.classList.remove("is-spinning");
    void spinner.offsetWidth; // restart the animation if it is already running
    spinner.classList.add("is-spinning");
    return true;
  }

  function setPaused(paused) {
    ball.toggleAttribute("data-paused", Boolean(paused));
  }

  function renderStill(container) {
    if (container) renderStillImage(container, source);
  }

  function show() {
    layer.classList.add("is-ready");
  }

  return {
    setState,
    spin,
    setPaused,
    renderStill,
    show,
    get state() { return state; },
  };
}
