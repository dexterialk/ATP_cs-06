// Motion mode (Static | Motion in the nav): the single control for motion on the site.
// "Static" is Calm mode: data-calm="on".
//
// Calm  = the ball jumps to its final pose, every effect shows its final state,
//         nothing loops, nothing waits to appear.
// Full  = the choreographed ball and all effects.
//
// Default: Calm when the system asks for reduced motion, otherwise Full.
// The choice is saved in localStorage ("on" / "off") and applied to <html> as
// data-calm="on" | "off". An inline script in each page's <head> applies it
// before first paint; this module keeps it in sync afterwards.

const KEY = "dexteria-calm";
const root = document.documentElement;
const listeners = new Set();

function systemPrefersReduced() {
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

function read() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "on") return true;
    if (saved === "off") return false;
  } catch { /* storage blocked */ }
  return systemPrefersReduced();
}

let calm = read();
root.dataset.calm = calm ? "on" : "off";

export const motion = {
  /** True when Calm mode is on. */
  get calm() { return calm; },

  set(next) {
    next = Boolean(next);
    if (next === calm) return;
    calm = next;
    root.dataset.calm = calm ? "on" : "off";
    try { localStorage.setItem(KEY, calm ? "on" : "off"); } catch { /* storage blocked */ }
    listeners.forEach((fn) => fn(calm));
  },

  toggle() { motion.set(!calm); },

  /** Subscribe to changes. Returns an unsubscribe function. */
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

/**
 * Wires every [data-motion-mode] group: two buttons, data-motion-option="on" (Static) and "off" (Motion).
 * The selected one has aria-pressed="true". Static is the same state as Calm mode (data-calm="on").
 */
export function initCalmToggle(scope = document) {
  scope.querySelectorAll("[data-motion-mode]").forEach((group) => {
    const options = [...group.querySelectorAll("[data-motion-option]")];
    const sync = () => {
      options.forEach((button) => {
        button.setAttribute("aria-pressed", String((button.dataset.motionOption === "on") === motion.calm));
      });
    };
    options.forEach((button) => button.addEventListener("click", () => motion.set(button.dataset.motionOption === "on")));
    sync();
    motion.subscribe(sync);
  });
}
