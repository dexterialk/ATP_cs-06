// Maps scroll progress to Smart Ball states.
//
// Any element with data-ball-state="<state>" is a trigger. The trigger that
// spans the middle of the viewport decides the ball's state. If an element
// with data-ball-anchor="<state>" exists, the ball is centred on it and
// follows it while scrolling; otherwise the ball uses the pose in
// smart-ball.css.
//
// Uses IntersectionObserver for state changes, and at most one
// getBoundingClientRect() per animation frame for the anchored state.
// Never writes layout properties; the ball only receives transforms.

/**
 * @param {ReturnType<import("../components/smart-ball/smart-ball.js").createSmartBall>} ball
 * @param {{ onStateEnter?: (state: string) => void }} options
 */
export function createScrollController(ball, { onStateEnter } = {}) {
  const triggers = [...document.querySelectorAll("[data-ball-state]")];
  const anchors = new Map(
    [...document.querySelectorAll("[data-ball-anchor]")].map((el) => [el.dataset.ballAnchor, el]),
  );
  const options = {}; // extra per-state options, e.g. { steps: { step: 1 } }
  const visible = new Set();
  let current = null;
  let frame = 0;

  function apply() {
    frame = 0;
    if (!current) return;
    const anchor = anchors.get(current);
    const rect = anchor ? anchor.getBoundingClientRect() : null;
    ball.setState(current, { rect, ...options[current] });
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(apply);
  }

  function enter(state) {
    current = state;
    apply();
    onStateEnter?.(state);
  }

  // A one-pixel band across the middle of the viewport.
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    // Last visible trigger in document order wins (handles nested triggers).
    const active = triggers.filter((t) => visible.has(t)).pop();
    if (active && active.dataset.ballState !== current) enter(active.dataset.ballState);
  }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });

  triggers.forEach((t) => observer.observe(t));

  const onScroll = () => { if (anchors.has(current)) schedule(); };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", schedule, { passive: true });

  return {
    get state() { return current; },
    /** Merge options for a state (e.g. the active step) and re-apply if active. */
    setOption(state, value) {
      options[state] = { ...options[state], ...value };
      if (state === current) schedule();
    },
    destroy() {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", schedule);
    },
  };
}
