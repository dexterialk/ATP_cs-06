// 07 Key Features: horizontal track on desktop, driven by vertical scroll.
//
// The section's height is set so that scrolling past it moves the track by
// exactly its overflow. Only transform is written on scroll. Previous/Next
// scroll the page to the matching position, so both inputs stay in sync.
// Phones, reduced motion and screens that cannot fit the panel get the
// stacked layout instead.

const PIN_QUERY = "(min-width: 900px) and (min-height: 600px)";

/**
 * @param {HTMLElement|null} section
 * @param {{ reducedMotion?: boolean }} options
 */
export function initFeatures(section, { reducedMotion = false } = {}) {
  if (!section) return null;
  const sticky = section.querySelector(".features__sticky");
  const track = section.querySelector("[data-features-track]");
  const cards = [...section.querySelectorAll("[data-feature]")];
  const prev = section.querySelector("[data-features-prev]");
  const next = section.querySelector("[data-features-next]");
  const current = section.querySelector("[data-features-current]");
  const live = section.querySelector("[data-features-live]");
  const behavior = reducedMotion ? "auto" : "smooth";
  const count = cards.length;
  let pinned = false;
  let distance = 0;  // how far the track moves sideways
  let index = -1;
  let frame = 0;

  const clamp = (i) => Math.max(0, Math.min(count - 1, i));

  function show(i, { announce = false } = {}) {
    i = clamp(i);
    if (i !== index) {
      index = i;
      cards.forEach((card, k) => card.classList.toggle("is-active", k === i));
      prev?.setAttribute("aria-disabled", String(i === 0));
      next?.setAttribute("aria-disabled", String(i === count - 1));
      if (current) current.textContent = String(i + 1);
    }
    if (announce && live) {
      const title = cards[i].querySelector(".feature__title")?.textContent.trim();
      live.textContent = `${title} (${i + 1} of ${count})`;
    }
  }

  function measure() {
    // Reads only; called on resize.
    distance = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
  }

  // The track usually cannot move far enough to put every card at the left
  // edge, so the cards share the travel evenly: card i is active at
  // progress i / (count - 1). Every card gets its own scroll position.
  const stopFor = (i) => (count > 1 ? i / (count - 1) : 0);

  function onScroll() {
    if (!pinned || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = distance ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      const x = progress * distance;
      track.style.transform = `translate3d(${-x}px, 0, 0)`;
      show(Math.round(progress * (count - 1)));
    });
  }

  function goTo(i) {
    i = clamp(i);
    if (pinned) {
      const top = scrollY + section.getBoundingClientRect().top + stopFor(i) * distance;
      scrollTo({ top: Math.ceil(top), behavior });
    } else {
      cards[i].scrollIntoView({ block: "nearest", inline: "nearest", behavior });
    }
    show(i, { announce: true });
  }

  prev?.addEventListener("click", () => { if (index > 0) goTo(index - 1); });
  next?.addEventListener("click", () => { if (index < count - 1) goTo(index + 1); });

  function unpin() {
    pinned = false;
    section.classList.remove("is-pinned");
    section.style.removeProperty("height");
    track.style.removeProperty("transform");
  }

  function updatePin() {
    if (reducedMotion || !window.matchMedia(PIN_QUERY).matches) return unpin();
    section.classList.add("is-pinned");
    track.style.removeProperty("transform");
    measure();
    const fits = sticky.scrollHeight <= sticky.clientHeight + 1;
    if (!fits || distance === 0) return unpin();
    pinned = true;
    section.style.height = `${sticky.clientHeight + distance}px`;
    onScroll();
  }

  let resizeTimer = 0;
  let lastWidth = innerWidth;
  let lastHeight = innerHeight;
  addEventListener("resize", () => {
    if (innerWidth === lastWidth && Math.abs(innerHeight - lastHeight) < 120) return;
    lastWidth = innerWidth;
    lastHeight = innerHeight;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updatePin, 150);
  }, { passive: true });
  addEventListener("scroll", onScroll, { passive: true });
  // Images load lazily; re-measure once they have their size.
  addEventListener("load", updatePin, { once: true });

  show(0);
  updatePin();
  return { goTo, get index() { return index; } };
}
