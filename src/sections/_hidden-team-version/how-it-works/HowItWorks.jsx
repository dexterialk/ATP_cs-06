import "./how-it-works.css";

export default function HowItWorks() {
  return (
    <section className="steps" id="how-it-works" aria-labelledby="steps-title" data-steps="" data-ball-state="step-1" data-effect="pinned-steps" style={{ "--steps-count": "3" }}>
      <div className="steps__sticky">
        <div className="steps__inner container">
          <div className="steps__main">
            <p className="section-label">
              How it works
            </p>
            <h2 id="steps-title">
              Three steps from squeeze to progress.
            </h2>
            <ol className="steps__list" role="list">
              <li className="step is-active" data-step="" aria-current="step">
                <span className="step__number" aria-hidden="true">
                  01
                </span>
                <h3 className="step__title">
                  <span className="visually-hidden">
                    Step 1:{" "}
                  </span>
                  Squeeze the ball
                </h3>
                <p className="step__text">
                  Hold the Smart Ball and squeeze, release and move it as your practice plan suggests. Sensors sealed inside record grip pressure and movement.
                </p>
              </li>
              <li className="step" data-step="">
                <span className="step__number" aria-hidden="true">
                  02
                </span>
                <h3 className="step__title">
                  <span className="visually-hidden">
                    Step 2:{" "}
                  </span>
                  Connect over Bluetooth
                </h3>
                <p className="step__text">
                  The ball pairs with the Dexteria app on your phone or tablet over Bluetooth. Each session transfers on its own, with nothing to plug in.
                </p>
              </li>
              <li className="step" data-step="">
                <span className="step__number" aria-hidden="true">
                  03
                </span>
                <h3 className="step__title">
                  <span className="visually-hidden">
                    Step 3:{" "}
                  </span>
                  See progress in the app
                </h3>
                <p className="step__text">
                  After each session the app shows your grip pressure as a number and a simple chart, so you and your clinician can see how practice is going.
                </p>
              </li>
            </ol>
            <div className="steps__controls">
              <button type="button" className="control" data-steps-prev="" aria-disabled="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6"></path>
                </svg>
                Previous step
              </button>
              <p className="steps__status" aria-hidden="true">
                <span data-steps-current="">
                  1
                </span>
                {" "}/ 3
              </p>
              <button type="button" className="control" data-steps-next="">
                Next step
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </button>
            </div>
            <p className="visually-hidden" aria-live="polite" data-steps-live=""></p>
          </div>
          <div className="steps__ball-slot" aria-hidden="true" data-ball-anchor=""></div>
        </div>
      </div>
    </section>
  );
}
