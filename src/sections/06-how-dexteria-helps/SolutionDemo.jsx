import "../dx-shared/dx-shared.css";
import "./solution-demo.css";

// Raika 04: the solution (hold game). Converted from the teammate's HTML; the section script is in ./solution-demo.js.
export default function SolutionDemo() {
  return (
      <section id="solution" className="dx-ps dx-solution" aria-labelledby="solution-title">
        <svg className="dx-wave-top" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path className="back" d="M0 0h1440v58c-160 40-330 62-520 44S560 30 360 44 90 102 0 86z" />
          <path d="M0 0h1440v34c-190 46-390 58-590 34S470 8 290 26 70 80 0 66z" />
        </svg>
        <div className="dx-wrap">
          <p className="dx-eyebrow dx-eyebrow--light">How Dexteria helps</p>
          <h2 id="solution-title" className="dx-h2 dx-h2--light js-split">Meet the{" "}<em>Smart Ball</em>. Squeeze, play, and watch your hand get stronger.</h2>
          <div className="dx-solution__grid">
            <div className="dx-demo" id="dx-demo">
              <button type="button" className="dx-ball" id="dx-ball" aria-label="Smart Ball. Press and hold to squeeze." aria-pressed="false">
                <span className="dx-ball__ring" aria-hidden="true"></span>
                <span className="dx-ball__body" aria-hidden="true">
                  <span className="dx-ball__shine"></span>
                </span>
              </button>
              <div className="dx-readout">
                <div className="dx-readout__row">
                  <span className="dx-readout__label">Grip</span>
                  <span className="dx-readout__kg" id="dx-kg">0.0<small>{" "}kg</small></span>
                </div>
                <div className="dx-meter dx-meter--game" aria-hidden="true">
                  <span className="dx-meter__fill" id="dx-fill" style={{ transform: "scaleX(0)" }}></span>
                  <span className="dx-meter__zone"></span>
                  <span className="dx-meter__mark" id="dx-mark" style={{ left: "0%" }}></span>
                </div>
                <div className="dx-readout__row">
                  <span className="dx-readout__label">In the zone</span>
                  <span className="dx-readout__val" id="dx-zone">0.0 / 5.0 s</span>
                </div>
                <div className="dx-zonebar" aria-hidden="true">
                  <span className="dx-zonebar__fill" id="dx-zfill" style={{ transform: "scaleX(0)" }}></span>
                </div>
                <svg className="dx-wave" viewBox="0 0 300 80" aria-hidden="true" preserveAspectRatio="none">
                  <path id="dx-wave"></path>
                </svg>
                <div className="dx-readout__row">
                  <span className="dx-readout__label">Tremor</span>
                  <span className="dx-readout__val" id="dx-tremor">—</span>
                </div>
                <div aria-live="polite" id="dx-msg">
                  <p className="dx-hint" id="dx-hint">Mini game: hold the ball (or Space) and keep the marker in the zone for 5 seconds.</p>
                </div>
              </div>
              <p className="dx-demo__note">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" />
                </svg>
                <span>Interactive demo. This is a simulation of how the Smart Ball and app respond. The numbers are illustrative, not real readings.</span>
              </p>
            </div>
            <div className="dx-solution__copy">
              <p className="dx-lead dx-lead--light">A soft, low-cost ball with sensors inside. It connects to the Dexteria app by Bluetooth and turns everyday hand exercises into short games, while it measures what a paper sheet never could.</p>
              <ul className="dx-measures" role="list">
                <li className="dx-measure">
                  <span className="dx-measure__name">Grip strength</span>
                  <span className="dx-measure__desc">How hard you squeeze, in kg</span>
                </li>
                <li className="dx-measure">
                  <span className="dx-measure__name">Sustained grip</span>
                  <span className="dx-measure__desc">How long you can hold it</span>
                </li>
                <li className="dx-measure">
                  <span className="dx-measure__name">Movement</span>
                  <span className="dx-measure__desc">How smoothly your hand moves</span>
                </li>
                <li className="dx-measure">
                  <span className="dx-measure__name">Tremor</span>
                  <span className="dx-measure__desc">How steady your hand is</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  );
}
