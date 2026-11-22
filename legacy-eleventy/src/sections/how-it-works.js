// 06 How It Works: pinned steps driven by scroll, plus Previous/Next buttons.
//
// Pinning only turns on when motion is allowed and the panel fits on screen
// (so 200% text or a short landscape phone gets the plain list instead).
// The buttons scroll the page to the step, so scroll and buttons always agree.

const PIN_MIN_HEIGHT = 560;

/**
 * @param {HTMLElement|null} section
 * @param {{ reducedMotion?: boolean, onChange?: (index: number) => void }} options
 */
export function initSteps(section, { reducedMotion = false, onChange } = {}) {
  if (!section) return null;
  const items = [...section.querySelectorAll("[data-step]")];
  const prev = section.querySelector("[data-steps-prev]");
  const next = section.querySelector("[data-steps-next]");
  const current = section.querySelector("[data-steps-current]");
  const live = section.querySelector("[data-steps-live]");
  const sticky = section.querySelector(".steps__sticky");
  const count = items.length;
  const behavior = reducedMotion ? "auto" : "smooth";
  let index = -1;
  let pinned = false;
  let frame = 0;

  const clamp = (i) => Math.max(0, Math.min(count - 1, i));

  function show(i, { announce = false } = {}) {
    i = clamp(i);
    if (i !== index) {
      index = i;
      items.forEach((item, k) => {
        item.classList.toggle("is-active", k === i);
        if (k === i) item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
      });
      prev?.setAttribute("aria-disabled", String(i === 0));
      next?.setAttribute("aria-disabled", String(i === count - 1));
      if (current) current.textContent = String(i + 1);
      onChange?.(i);
    }
    if (announce && live) {
      const title = items[i].querySelector(".step__title")?.textContent.trim();
      live.textContent = `${title} (${i + 1} of ${count})`;
    }
  }

  // Scroll distance the pinned panel travels, and how far through it we are.
  function travel() {
    const rect = section.getBoundingClientRect();
    return { rect, distance: Math.max(0, rect.height - innerHeight) };
  }

  function onScroll() {
    if (!pinned || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const { rect, distance } = travel();
      const progress = distance ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      show(Math.floor(progress * count * 0.9999));
    });
  }

  function goTo(i) {
    i = clamp(i);
    if (pinned) {
      const { rect, distance } = travel();
      scrollTo({ top: scrollY + rect.top + distance * ((i + 0.5) / count), behavior });
    } else {
      items[i].scrollIntoView({ block: "nearest", behavior });
    }
    show(i, { announce: true });
  }

  prev?.addEventListener("click", () => { if (index > 0) goTo(index - 1); });
  next?.addEventListener("click", () => { if (index < count - 1) goTo(index + 1); });

  function updatePin() {
    const wanted = !reducedMotion && innerHeight >= PIN_MIN_HEIGHT;
    section.classList.toggle("is-pinned", wanted);
    pinned = wanted && sticky.scrollHeight <= sticky.clientHeight + 1;
    if (wanted && !pinned) section.classList.remove("is-pinned");
    onScroll();
  }

  let resizeTimer = 0;
  let lastWidth = innerWidth;
  let lastHeight = innerHeight;
  addEventListener("resize", () => {
    // Ignore small height changes from mobile browser toolbars.
    if (innerWidth === lastWidth && Math.abs(innerHeight - lastHeight) < 120) return;
    lastWidth = innerWidth;
    lastHeight = innerHeight;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updatePin, 150);
  }, { passive: true });
  addEventListener("scroll", onScroll, { passive: true });

  show(0);
  updatePin();
  return { goTo, get index() { return index; } };
}
