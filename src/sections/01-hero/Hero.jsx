import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { canRun3D } from "../../components/DexteriaBall/can-run-3d.js";
import "./hero.css";

// The 3D ball (Three.js) is a large download, so it loads after the text and the still image are on screen.
const DexteriaBall = lazy(() => import("../../components/DexteriaBall/DexteriaBall.jsx"));

const STILL = "/assets/ball/smart-ball-still.webp";

export default function Hero() {
  const heroRef = useRef(null);
  const shadowRef = useRef(null);
  const ballRef = useRef(null);
  const [use3D] = useState(canRun3D);
  const [ready, setReady] = useState(false);

  // The ground shadow belongs to the hero only: it fades out as the hero scrolls away and is never drawn again further down.
  // Scroll work is one write of one custom property per animation frame (no layout reads).
  useEffect(() => {
    const hero = heroRef.current;
    const shadow = shadowRef.current;
    if (!hero || !shadow) return;
    let frame = 0;
    let span = 1;
    const measure = () => { span = Math.max(1, hero.offsetHeight * 0.55); };
    const update = () => {
      frame = 0;
      shadow.style.setProperty("--p", Math.min(1, Math.max(0, window.scrollY / span)).toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    // Decorative CSS motion pauses while the hero is off screen.
    const io = new IntersectionObserver(([entry]) => { hero.dataset.visible = String(entry.isIntersecting); });
    io.observe(hero);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      io.disconnect();
    };
  }, []);

  // The shadow breathes with the ball's float: smaller and fainter when the ball is high.
  const lastBob = useRef(0);
  const onBob = (b) => {
    if (Math.abs(b - lastBob.current) < 0.003) return;
    lastBob.current = b;
    shadowRef.current?.style.setProperty("--bob", b.toFixed(3));
  };

  return (
    <section ref={heroRef} className="hero" id="top" aria-labelledby="hero-title" data-visible="true">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow"></div>
      </div>

      <div className="hero__stage">
        <h1 className="hero__title" id="hero-title">
          <span className="visually-hidden">Dexteria Smart Ball. </span>
          <span className="hero__line hero__line--1">Small movements.</span>
          <span className="hero__line hero__line--2">Meaningful progress.</span>
        </h1>

        <figure className="hero__ball">
          {/* Decorative 3D scene: hidden from assistive tech. The still image below carries the name. */}
          <div className="hero__canvas" aria-hidden="true">
            {use3D && (
              <Suspense fallback={null}>
                <DexteriaBall
                  ref={ballRef}
                  className="hero__webgl"
                  style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
                  color="#808475" /* CHANGED: brand ball colour */
                  logoSpan={0.85} /* CHANGED: small logo, as in the reference picture */
                  logoOffset={[-0.1, -0.12]} /* CHANGED: low and slightly left, as in the reference */
                  engrave={0.2} /* CHANGED: shallow print instead of deep engraving */
                  background="transparent"
                  logo="d"
                  hint=""
                  fallbackSrc={STILL}
                  shadow={false}
                  dragRotate
                  floatAmp={0.09}
                  maxPixelRatio={1.5}
                  onBob={onBob}
                  onReady={() => { ballRef.current?.setPointerEvents(true); setReady(true); }} /* only the ball's own disc takes the pointer */
                />
              </Suspense>
            )}
          </div>
          <img
            className={`hero__still${use3D && ready ? " is-hidden" : ""}`}
            src={STILL}
            alt="Dexteria Smart Ball"
            width="1440"
            height="960"
            fetchPriority="high"
            decoding="async"
            draggable="false"
          />
          <figcaption className="visually-hidden">Drag the ball to turn it.</figcaption>

          {use3D && (
            <button type="button" className="hero__spin" aria-label="Spin the ball" onClick={() => ballRef.current?.spin()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 12a8 8 0 1 1-2.34-5.66"></path>
                <path d="M20 4v5h-5"></path>
              </svg>
            </button>
          )}
        </figure>

        <p className="hero__description">
          Something new is coming to the world of hand dexterity. A little more movement, a little more possibility.
        </p>
        <div className="hero__actions">
          <a href="#waitlist" className="button button--light">
            Join now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17 17 7M7 7h10v10"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Ground shadow: a separate element, only in the hero, fading out as the hero scrolls away. */}
      <div ref={shadowRef} className="hero__shadow" aria-hidden="true"></div>
    </section>
  );
}
