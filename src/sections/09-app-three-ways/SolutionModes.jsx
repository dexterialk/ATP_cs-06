import "../dx-shared/dx-shared.css";
import "./solution-modes.css";

// Raika 07: the solution (three modes). Converted from the teammate's HTML; the section script is in ./solution-modes.js.
export default function SolutionModes() {
  return (
      <section id="solution-modes" className="dx-ps dx-solution" aria-labelledby="solution-modes-title">
        <div className="dx-wrap">
          <ol className="dx-steps js-reveal">
            <li className="dx-step" style={{ "--i": "0" }}>
              <span className="dx-step__n" aria-hidden="true">1</span>
              <h3 className="dx-step__t">Squeeze</h3>
              <p className="dx-step__d">Play a short game with the Smart Ball, guided by voice.</p>
            </li>
            <li className="dx-step" style={{ "--i": "1" }}>
              <span className="dx-step__n" aria-hidden="true">2</span>
              <h3 className="dx-step__t">Sync</h3>
              <p className="dx-step__d">Results save automatically, even offline.</p>
            </li>
            <li className="dx-step" style={{ "--i": "2" }}>
              <span className="dx-step__n" aria-hidden="true">3</span>
              <h3 className="dx-step__t">See progress</h3>
              <p className="dx-step__d">Track your hand against your other hand, week by week.</p>
            </li>
          </ol>
          <h3 className="dx-h3 dx-h3--light js-split">One app, three ways to use it</h3>
          <ul className="dx-modes" role="list">
            <li className="dx-mode">
              <div className="dx-mode__shot">
                <img src="/assets/images/problem-solution/patient.png" alt="Dexteria patient app showing today's games and grip progress" loading="lazy" width={390} height={844} />
              </div>
              <p className="dx-mode__who">For patients</p>
              <h4 className="dx-mode__t">Practice that feels like a game</h4>
              <p className="dx-mode__p">Squeeze-controlled games, spoken instructions and big buttons. Progress shown as a % of your other hand.</p>
            </li>
            <li className="dx-mode">
              <div className="dx-mode__shot">
                <img src="/assets/images/problem-solution/clinician.png" alt="Dexteria clinician screen showing a patient's grip strength of 14.2 kg and progress to goal" loading="lazy" width={390} height={844} />
              </div>
              <p className="dx-mode__who">For clinicians</p>
              <h4 className="dx-mode__t">Real numbers between visits</h4>
              <p className="dx-mode__p">See grip, tremor and adherence, set goals and difficulty, and share reports, with the patient’s consent.</p>
            </li>
            <li className="dx-mode">
              <div className="dx-mode__shot">
                <img src="/assets/images/problem-solution/caregiver.png" alt="Dexteria caregiver screen showing today's practice two of three done" loading="lazy" width={390} height={844} />
              </div>
              <p className="dx-mode__who">For caregivers</p>
              <h4 className="dx-mode__t">Peace of mind at home</h4>
              <p className="dx-mode__p">Know if today’s session is done, get missed-session alerts and send gentle reminders.</p>
            </li>
          </ul>
        </div>
      </section>
  );
}
