// Watches every section that declares data-ball-state="<preset>" and reports
// which one is active: the visible section whose centre is nearest the middle
// of the viewport. Works the same scrolling down or up.
//
// A section can change its own state while it is on screen (the pinned steps
// do); a MutationObserver picks that up.

/**
 * @param {(section: HTMLElement, state: string) => void} onActive
 */
export function createRegistry(onActive) {
  // Every top-level block of the page counts; one with no data-ball-state is "none" and hides the ball layer.
  const sections = [...document.querySelectorAll("main > *")];
  const visible = new Set();
  let active = null;
  let activeState = null;
  let frame = 0;

  function pick() {
    frame = 0;
    const middle = innerHeight / 2;
    let best = null;
    let bestDistance = Infinity;
    for (const el of visible) {
      const rect = el.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - middle);
      if (distance < bestDistance) { best = el; bestDistance = distance; }
    }
    if (!best) return;
    const state = best.dataset.ballState || "none";
    if (best !== active || state !== activeState) {
      active = best;
      activeState = state;
      onActive(best, state);
    }
  }

  const schedule = () => { if (!frame) frame = requestAnimationFrame(pick); };

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    pick(); // already batched by the browser; no need to wait for a frame
  }, { threshold: 0 });
  sections.forEach((el) => io.observe(el));

  const mo = new MutationObserver(schedule);
  sections.forEach((el) => mo.observe(el, { attributes: true, attributeFilter: ["data-ball-state", "data-ball-layer"] }));

  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });

  return { refresh: pick, get active() { return active; } };
}
