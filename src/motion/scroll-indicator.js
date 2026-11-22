// A scroll progress indicator: a thin line in the bottom-right corner that fills as the
// reader scrolls down the page, like a slim scroll bar. Built with Anime.js onScroll
// (https://animejs.com/documentation/events/onscroll). No text, dots or boxes.
//
// "sync: true" ties the fill straight to the scroll position, so there is no easing or transition of its own.
// That makes it behave the same with prefers-reduced-motion or Static mode: it still shows progress, it just
// never animates by itself.

import { animate, onScroll } from "animejs";

export function initScrollIndicator() {
  const fill = document.querySelector("[data-scroll-fill]");
  if (!fill) return;
  animate(fill, {
    scaleY: [0, 1],
    ease: "linear",
    autoplay: onScroll({
      target: document.body,
      enter: "top top",       // 0% when the top of the page reaches the top of the window
      leave: "bottom bottom", // 100% when the bottom of the page reaches the bottom of the window
      sync: true,
    }),
  });
}
