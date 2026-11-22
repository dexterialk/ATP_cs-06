import { useEffect, useRef, useState } from "react";
import { prefersReduced } from "../dx-shared/dx-shared.js";

/** Number that counts up from 0 when it scrolls into view (shows the final value straight away for reduced motion). */
export function Count({ to, pre = "", suffix = "" }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const calm = prefersReduced();
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (calm) { setV(to); return; }
      const t0 = performance.now();
      const f = (n) => {
        const k = Math.min(1, (n - t0) / 1400);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{pre + v + suffix}</span>;
}

/** Adds the `in` class to `.rv` blocks inside the ref'd element when they scroll into view. */
export function useReveal(ref) {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    ref.current?.querySelectorAll(".rv").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [ref]);
}
