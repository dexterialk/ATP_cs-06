import "./key-features.css";

export default function KeyFeatures() {
  return (
    <section className="features" id="key-features" aria-labelledby="features-title" data-features="" data-ball-state="corner" data-effect="pinned-features">
      <div className="features__sticky">
        <div className="features__head container">
          <div>
            <p className="section-label">
              Key features
            </p>
            <h2 id="features-title">
              Made for everyday practice.
            </h2>
          </div>
          <div className="features__controls">
            <button type="button" className="control" data-features-prev="" aria-disabled="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
              Previous feature
            </button>
            <p className="features__status" aria-hidden="true">
              <span data-features-current="">
                1
              </span>
              {" "}/ 5
            </p>
            <button type="button" className="control" data-features-next="">
              Next feature
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </div>
          <p className="visually-hidden" aria-live="polite" data-features-live=""></p>
        </div>
        <div className="features__viewport">
          <ol className="features__track" role="list" data-features-track="">
            <li className="feature" data-feature="">
              <img className="feature__image" src="/assets/images/features/grip-number.svg" alt="Example app card with sample data: today's grip pressure is 42, up 3 from the last session, with a small chart of the last seven sessions rising from 34 to 42." width={480} height={360} loading="lazy" decoding="async" />
              <div className="feature__body">
                <h3 className="feature__title">
                  Your grip pressure, as a number
                </h3>
                <p className="feature__text">
                  After each session, the app shows your grip pressure as a single number, so small changes are easy to spot.
                </p>
              </div>
            </li>
            <li className="feature" data-feature="">
              <img className="feature__image" src="/assets/images/features/hand-compare.svg" alt="Example chart with sample data: two bars compare grip pressure. The unaffected hand is 100 percent; the practising hand is 71 percent of it." width={480} height={360} loading="lazy" decoding="async" />
              <div className="feature__body">
                <h3 className="feature__title">
                  Compare with your other hand
                </h3>
                <p className="feature__text">
                  See how your practising hand is doing next to your unaffected hand, shown as a percentage of its grip.
                </p>
              </div>
            </li>
            <li className="feature" data-feature="">
              <img className="feature__image" src="/assets/images/features/games.svg" alt="Example game screen: a balloon rises as you squeeze the ball, and you hold it level with a dashed target line." width={480} height={360} loading="lazy" decoding="async" />
              <div className="feature__body">
                <h3 className="feature__title">
                  Squeeze and movement games
                </h3>
                <p className="feature__text">
                  Short games turn squeezes, holds and tilts into play, which makes regular practice easier to keep up.
                </p>
              </div>
            </li>
            <li className="feature" data-feature="">
              <img className="feature__image" src="/assets/images/features/clinician.svg" alt="Example settings card with sample values chosen by a clinician: difficulty level 3 of 5, hold for 5 seconds, 10 repetitions." width={480} height={360} loading="lazy" decoding="async" />
              <div className="feature__body">
                <h3 className="feature__title">
                  Difficulty set by your clinician
                </h3>
                <p className="feature__text">
                  Your clinician can set how hard each exercise is, so the games match the practice plan you agreed together.
                </p>
              </div>
            </li>
            <li className="feature" data-feature="">
              <img className="feature__image" src="/assets/images/features/offline.svg" alt="Example list of three practice sessions saved while offline, each marked as waiting to sync." width={480} height={360} loading="lazy" decoding="async" />
              <div className="feature__body">
                <h3 className="feature__title">
                  Saves automatically offline
                </h3>
                <p className="feature__text">
                  No signal? Sessions save automatically and sync to the app when you are back online.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
