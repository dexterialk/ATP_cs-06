import "../dx-shared/dx-shared.css";
import "./problem-stats.css";

// Raika 01: the problem (stats). Converted from the teammate's HTML; the section script is in ./problem-stats.js.
export default function ProblemStats() {
  return (
      <section id="problem" className="dx-ps dx-problem" aria-labelledby="problem-title">
        <div className="dx-wrap">
          <p className="dx-eyebrow">The problem</p>
          <h2 id="problem-title" className="dx-h2 js-split">Our hands hold our independence.{" "}<em>Getting them back</em>{" "}happens mostly at home, alone.</h2>
          <p className="dx-lead">Holding a cup. Fastening a button. Turning a key. After a stroke, a hand injury or with fine motor difficulties, the smallest tasks become the hardest. Recovery needs daily practice, and almost all of it happens at home.</p>
          <ul className="dx-stats js-reveal" role="list">
            <li className="dx-stat dx-stat--ink">
              <span className="dx-stat__num"><span className="js-count" data-to="12.2" data-dec="1">0</span>M</span>
              <span className="dx-stat__label">new strokes worldwide every year<small>Many survivors go home with a hand that no longer does what they ask.</small></span>
              <div className="dx-stat__viz">
                <div className="dx-viz-pulse"><span className="dx-viz-pulse__dot" aria-hidden="true"></span>That’s about one every 3 seconds.</div>
              </div>
            </li>
            <li className="dx-stat dx-stat--sage">
              <span className="dx-stat__num"><span className="js-count" data-to="1">0</span>{" "}in 4</span>
              <span className="dx-stat__label">injuries seen in emergency departments are to the hand or wrist</span>
              <div className="dx-stat__viz">
                <div className="dx-viz-bars dx-viz-bars--4" aria-hidden="true">
                  <span className="on" style={{ "--i": "0" }}></span>
                  <span className="" style={{ "--i": "1" }}></span>
                  <span className="" style={{ "--i": "2" }}></span>
                  <span className="" style={{ "--i": "3" }}></span>
                </div>
              </div>
            </li>
            <li className="dx-stat dx-stat--cream">
              <span className="dx-stat__num"><span className="js-count" data-to="4.6" data-dec="1">0</span>%</span>
              <span className="dx-stat__label">of adults over 65 live with essential tremor, making fine hand tasks like writing and eating hard</span>
              <div className="dx-stat__viz">
                <svg className="dx-viz-tremor" viewBox="0 0 220 46" aria-hidden="true">
                  <path d="M0.0 23.0 L2.8 33.7 L5.5 30.5 L8.2 15.3 L11.0 9.7 L13.8 22.5 L16.5 35.2 L19.2 30.4 L22.0 17.3 L24.8 14.4 L27.5 22.5 L30.3 28.8 L33.0 26.7 L35.8 20.2 L38.5 17.3 L41.2 22.3 L44.0 30.4 L46.8 29.4 L49.5 17.7 L52.2 11.0 L55.0 21.3 L57.8 35.1 L60.5 32.3 L63.2 17.2 L66.0 11.7 L68.8 21.3 L71.5 30.6 L74.2 28.2 L77.0 20.4 L79.8 17.6 L82.5 22.0 L85.2 28.0 L88.0 27.9 L90.8 19.9 L93.5 13.8 L96.2 20.6 L99.0 33.1 L101.8 32.7 L104.5 18.2 L107.2 10.2 L110.0 19.8 L112.7 32.2 L115.5 30.6 L118.2 20.2 L121.0 16.1 L123.8 21.3 L126.5 27.3 L129.2 27.1 L132.0 21.3 L134.8 16.6 L137.5 20.5 L140.2 30.1 L143.0 31.5 L145.8 19.9 L148.5 10.8 L151.2 18.5 L154.0 32.6 L156.8 32.9 L159.5 20.4 L162.2 13.7 L165.0 19.9 L167.8 28.0 L170.5 27.9 L173.2 21.9 L176.0 18.1 L178.8 20.8 L181.5 27.5 L184.2 29.4 L187.0 21.5 L189.8 13.2 L192.5 18.1 L195.2 31.3 L198.0 33.8 L200.8 21.3 L203.5 11.9 L206.2 18.1 L209.0 29.1 L211.8 29.9 L214.5 22.3 L217.2 17.7 L220.0 20.5" />
                </svg>
              </div>
            </li>
            <li className="dx-stat dx-stat--amber">
              <span className="dx-stat__num"><span className="dx-stat__pre">As little as</span><span className="js-count" data-to="13">0</span>%</span>
              <span className="dx-stat__label">of prescribed home hand practice actually gets done</span>
              <div className="dx-stat__viz">
                <div className="dx-viz-bars " aria-hidden="true">
                  <span className="on" style={{ "--i": "0" }}></span>
                  <span className="" style={{ "--i": "1" }}></span>
                  <span className="" style={{ "--i": "2" }}></span>
                  <span className="" style={{ "--i": "3" }}></span>
                  <span className="" style={{ "--i": "4" }}></span>
                  <span className="" style={{ "--i": "5" }}></span>
                  <span className="" style={{ "--i": "6" }}></span>
                  <span className="" style={{ "--i": "7" }}></span>
                  <span className="" style={{ "--i": "8" }}></span>
                  <span className="" style={{ "--i": "9" }}></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
  );
}
