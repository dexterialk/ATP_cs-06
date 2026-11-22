import "./app-preview.css";

export default function AppPreview() {
  return (
    <section className="app-preview" id="app" aria-labelledby="app-title" data-ball-state="corner" data-effect="reveal hover-lift">
      <div className="container">
        <div className="app-preview__head">
          <p className="section-label reveal">
            App preview
          </p>
          <h2 id="app-title" className="reveal" style={{ "--d": ".1s" }}>
            A first look at the Dexteria app.
          </h2>
          <p className="section-intro reveal" style={{ "--d": ".2s" }}>
            Early prototype screens. The designs will change before launch.
          </p>
        </div>
        <ul className="app-preview__cards" role="list">
          <li className="app-card reveal" style={{ "--d": "0s" }}>
            <figure className="app-card__figure" style={{ "--tilt": "-6deg" }}>
              <img className="app-card__image" src="/assets/images/app/app-squeeze-game.svg" alt="Prototype game screen: squeeze the ball to lift a balloon over rolling hills. Score 120, 8 of 10 squeezes done." width={360} height={720} loading="lazy" decoding="async" />
              <figcaption className="app-card__caption">
                Balloon squeeze game
              </figcaption>
            </figure>
          </li>
          <li className="app-card reveal" style={{ "--d": "0.1s" }}>
            <figure className="app-card__figure" style={{ "--tilt": "4deg" }}>
              <img className="app-card__image" src="/assets/images/app/app-tilt-game.svg" alt="Prototype game screen: tilt the ball to roll a marble along a winding path to a flower. Level 2." width={360} height={720} loading="lazy" decoding="async" />
              <figcaption className="app-card__caption">
                Tilt maze game
              </figcaption>
            </figure>
          </li>
          <li className="app-card reveal" style={{ "--d": "0.2s" }}>
            <figure className="app-card__figure" style={{ "--tilt": "-3deg" }}>
              <img className="app-card__image" src="/assets/images/app/app-session-summary.svg" alt="Prototype summary screen with sample data: session complete, grip pressure 42, 12 squeezes, 8 minutes." width={360} height={720} loading="lazy" decoding="async" />
              <figcaption className="app-card__caption">
                Session summary
              </figcaption>
            </figure>
          </li>
          <li className="app-card reveal" style={{ "--d": "0.30000000000000004s" }}>
            <figure className="app-card__figure" style={{ "--tilt": "6deg" }}>
              <img className="app-card__image" src="/assets/images/app/app-progress.svg" alt="Prototype progress screen with sample data: a line chart of grip pressure from Monday to Sunday reading 36, 38, 37, 40, 41, 42 and 42." width={360} height={720} loading="lazy" decoding="async" />
              <figcaption className="app-card__caption">
                Weekly progress
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </section>
  );
}
