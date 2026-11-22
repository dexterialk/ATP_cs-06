import "./hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title" data-ball-state="hero" data-effect="headline-rise drift">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--a motion-loop"></div>
        <div className="hero__orb hero__orb--b motion-loop"></div>
        <div className="hero__orb hero__orb--c motion-loop"></div>
        <div className="hero__ring motion-loop"></div>
        <div className="hero__ring hero__ring--inner motion-loop"></div>
      </div>
      <div className="hero__inner container">
        <p className="eyebrow hero__fade" style={{ "--d": ".1s" }}>
          A new chapter is taking shape
        </p>
        <h1 className="hero__title" id="hero-title">
          <span className="hero__word">
            <span style={{ "--i": "0" }}>
              Move.
            </span>
          </span>
          <span className="hero__word accent">
            <span style={{ "--i": "1" }}>
              Mend.
            </span>
          </span>
          <span className="hero__word">
            <span style={{ "--i": "2" }}>
              Master.
            </span>
          </span>
        </h1>
        <div className="hero__ball-slot" aria-hidden="true" data-ball-anchor=""></div>
        <p className="hero__lead hero__fade" style={{ "--d": ".7s" }}>
          Small movements.{" "}
          <span className="accent">
            Meaningful progress.
          </span>
        </p>
        <p className="hero__description hero__fade" style={{ "--d": ".85s" }}>
          Something new is coming to the world of hand dexterity. A little more movement, a little more possibility.
        </p>
        <div className="hero__actions hero__fade" style={{ "--d": "1s" }}>
          <a href="#waitlist" className="button">
            Be the first to know
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17 17 7M7 7h10v10"></path>
            </svg>
          </a>
          <button type="button" className="control hero__spin" data-ball-spin="">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 12a8 8 0 1 1-2.34-5.66"></path>
              <path d="M20 4v5h-5"></path>
            </svg>
            Spin the ball
          </button>
          <button type="button" className="control hero__squeeze" data-ball-squeeze="">
            Squeeze the ball
          </button>
        </div>
      </div>
    </section>
  );
}
