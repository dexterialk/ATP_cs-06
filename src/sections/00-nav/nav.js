// 01 Nav: mobile disclosure menu and nav height. (The Calm mode switch lives in src/motion.)
// Disclosure pattern per WAI-ARIA APG: a button with aria-expanded.

const DESKTOP = "(min-width: 1080px)"; // keep in sync with nav.css

/**
 * @param {HTMLElement|null} header
 */
export function initNav(header) {
  if (!header) return;
  const nav = header.querySelector(".nav");
  const toggle = header.querySelector("[data-nav-toggle]");
  const menu = header.querySelector("#nav-menu");
  const desktop = window.matchMedia(DESKTOP);
  header.classList.add("is-enhanced"); // CSS only hides links once this script runs

  // ---- Menu ----
  const isOpen = () => toggle?.getAttribute("aria-expanded") === "true";
  function setOpen(open, { returnFocus = false } = {}) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    if (!open && returnFocus) toggle.focus();
  }

  toggle?.addEventListener("click", () => setOpen(!isOpen()));
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      event.preventDefault();
      setOpen(false, { returnFocus: true });
    }
  });
  // Close when focus or a click leaves the nav.
  header.addEventListener("focusout", (event) => {
    if (isOpen() && event.relatedTarget && !header.contains(event.relatedTarget)) setOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  desktop.addEventListener("change", () => setOpen(false));

  // ---- Keep scroll-padding equal to the nav height (text zoom, wrapping) ----
  if (nav && "ResizeObserver" in window) {
    new ResizeObserver(([entry]) => {
      const height = Math.ceil(entry.borderBoxSize?.[0]?.blockSize ?? nav.offsetHeight);
      document.documentElement.style.setProperty("--nav-h", `${height}px`);
    }).observe(nav);
  }
}
