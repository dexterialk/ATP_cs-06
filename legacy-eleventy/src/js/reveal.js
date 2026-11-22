// Fades .reveal elements in as they enter the viewport.
// Skipped entirely under reduced motion: the content is simply shown.

export function initReveal({ reducedMotion = false } = {}) {
  const items = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window) || items.length === 0) return;

  document.documentElement.classList.add("js-reveal");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });

  // Read every position first, then write, to avoid forcing layout per item.
  const tops = [...items].map((el) => el.getBoundingClientRect().top);
  items.forEach((el, i) => {
    // Anything already on screen shows at once.
    if (tops[i] < innerHeight) el.classList.add("is-in");
    else observer.observe(el);
  });

  // Keyboard users can tab into content before it scrolls into view.
  document.addEventListener("focusin", (event) => {
    event.target.closest?.(".reveal:not(.is-in)")?.classList.add("is-in");
  });
}
