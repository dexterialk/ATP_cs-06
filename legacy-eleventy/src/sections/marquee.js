// 03 Marquee: the visible pause button.
// Hover and focus pausing are pure CSS (marquee.css).

export function initMarquee(marquee) {
  const button = marquee?.querySelector("[data-marquee-pause]");
  if (!button) return;
  button.addEventListener("click", () => {
    const paused = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(paused));
    marquee.classList.toggle("is-paused", paused);
  });
}
