import { useRef } from "react";
import { Count, useReveal } from "../vn-shared/vn-shared.jsx";
import "../vn-shared/vn-shared.css";
import "./impact.css";

// Vinuri 03: why home hand rehabilitation matters (four count-up stats).
// Converted from the teammate's React page; the statistics and sources are unchanged.
export default function Impact() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id="impact" className="vn vn-impact" aria-labelledby="impact-title" ref={ref}>
      <div className="vn__box rv">
        <h2 id="impact-title">Why home hand rehabilitation matters</h2>
        <p className="intro">
          Hand function underpins dressing, bathing and eating, yet recovery after stroke is often incomplete and home practice is difficult to sustain. Dexteria is designed around these figures.
        </p>
        <div className="g g4">
          <div className="stat">
            <b><Count to={67} pre="≈" suffix="%" /></b>
            <p><span className="what">of stroke survivors have hand limitations.</span> Everyday jobs like fastening a button or holding a cup can take extra time, effort and patience.</p>
          </div>
          <div className="stat">
            <b><Count to={5} />–<Count to={20} suffix="%" /></b>
            <p><span className="what">fully recover from their hand limitations after 6 months of stroke.</span> For most people, getting the hand back to everyday use is a longer journey that carries on at home.</p>
          </div>
          <div className="stat">
            <b><Count to={13} />–<Count to={140} suffix="%" /></b>
            <p><span className="what">range of adherence to prescribed home exercise.</span> Some people do far less than planned and some do more, so keeping a steady routine on your own is hard.</p>
          </div>
          <div className="stat">
            <b><Count to={4} /></b>
            <p><span className="what">measures tracked every session:</span> grip strength, sustained grip, movement and tremor, so effort and progress can be seen on screen, not guessed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
