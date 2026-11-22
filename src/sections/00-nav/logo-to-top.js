// The logo in the top-left corner: on the home page a click jumps to the very top at once (no smooth scrolling).
// Elsewhere (privacy, accessibility, 404) it stays an ordinary link to the home page.

export function initLogoToTop() {
  const brand = document.querySelector(".nav__brand");
  if (!brand) return;
  brand.addEventListener("click", (event) => {
    if (location.pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    // "instant" beats the page's smooth-scroll setting, so the jump is immediate.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (location.hash) history.replaceState(null, "", location.pathname);
  });
}
