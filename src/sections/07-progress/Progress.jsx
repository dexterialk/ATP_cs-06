import { useRef, useState } from "react";
import { Count, useReveal } from "../vn-shared/vn-shared.jsx";
import "../vn-shared/vn-shared.css";
import "./progress.css";

// Vinuri 04: progress at a glance (illustrative example data, not clinical results).
// Converted from the teammate's React page; the data and wording are unchanged.
const MEASURES = [
  ["Grip pressure", "units", [22, 26, 31, 35, 41, 46, 52, 58], 80],
  ["Sustained hold", "seconds", [3, 4, 5, 7, 8, 10, 12, 14], 20],
  ["Steadiness", "points", [48, 52, 58, 63, 69, 74, 80, 85], 95],
];
const SESSIONS = [4, 5, 5, 6, 7, 6, 7, 7];

export default function Progress() {
  const ref = useRef(null);
  useReveal(ref);
  const [t, setT] = useState(0);
  const [hv, setHv] = useState(7);
  const [, unit, d, base] = MEASURES[t];
  const W = 600, H = 240, L = 44, B = 30, C = 326.7;
  const max = base * 1.15;
  const pct = Math.round(d[7] / base * 100);
  const x = (i) => L + i * (W - L - 16) / 7;
  const y = (v) => H - B - v / max * (H - B - 14);
  const line = "M" + d.map((v, i) => x(i) + "," + y(v)).join(" L");
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    setHv(Math.max(0, Math.min(7, Math.round(((e.clientX - b.left) / b.width * W - L) / ((W - L - 16) / 7)))));
  };

  return (
    <section id="progress" className="vn vn-progress" aria-labelledby="progress-title" ref={ref}>
      <div className="vn__box rv">
        <h2 id="progress-title">Progress at a glance</h2>
        <p className="intro">
          Each session is recorded and compared with the person’s unaffected hand, so patients and physiotherapists can see change week by week. Select a measure, then hover over the chart.
        </p>
        <div className="pg">
          <div className="card">
            <div className="tabs" role="tablist">
              {MEASURES.map(([n], i) => (
                <button key={n} type="button" role="tab" aria-selected={t === i} className="tab" onClick={() => { setT(i); setHv(7); }}>{n}</button>
              ))}
            </div>
            <p className="rd" aria-live="polite">{`Week ${hv + 1}: ${d[hv]} ${unit}, ${Math.round(d[hv] / base * 100)}% of the unaffected hand`}</p>
            <svg className="chart" key={t} viewBox={`0 0 ${W} ${H}`} onPointerMove={move} role="img" aria-label="Line chart of weekly progress">
              {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                <g key={f}>
                  <line x1={L} x2={W - 16} y1={y(max * f)} y2={y(max * f)} stroke="var(--line)" />
                  <text x={L - 8} y={y(max * f) + 4} textAnchor="end">{Math.round(max * f)}</text>
                </g>
              ))}
              {d.map((_, i) => (
                <text key={i} x={x(i)} y={H - 8} textAnchor="middle">{"W" + (i + 1)}</text>
              ))}
              <line x1={L} x2={W - 16} y1={y(base)} y2={y(base)} stroke="var(--gold)" strokeWidth={2} strokeDasharray="6 5" />
              <text x={W - 16} y={y(base) - 7} textAnchor="end">Unaffected hand</text>
              <line x1={x(hv)} x2={x(hv)} y1={14} y2={H - B} stroke="var(--sage)" strokeDasharray="3 4" />
              <path className="draw" pathLength={1} d={line} fill="none" stroke="var(--sage)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              {d.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r={i === hv ? 7 : 4} fill={i === hv ? "var(--gold)" : "var(--sage)"} />
              ))}
            </svg>
          </div>
          <div className="side">
            <div className="card">
              <h3>Against unaffected hand</h3>
              <div className="gauge" key={"g" + t}>
                <svg viewBox="0 0 120 120" width={150} height={150}>
                  <circle cx={60} cy={60} r={52} stroke="var(--soft)" />
                  <circle cx={60} cy={60} r={52} stroke="var(--sage)" transform="rotate(-90 60 60)"
                    style={{ strokeDasharray: C, "--c": C, strokeDashoffset: C * (1 - pct / 100), animation: "vn-gauge 1.3s var(--e) both" }} />
                </svg>
                <b><Count to={pct} suffix="%" /></b>
              </div>
            </div>
            <div className="card">
              <h3>Sessions completed</h3>
              <p>Out of 7 prescribed each week</p>
              <div className="bars">
                {SESSIONS.map((v, i) => (
                  <div key={i} className="barx" style={{ "--i": i, height: v / 7 * 100 + "%" }} title={`Week ${i + 1}: ${v} of 7`} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="fine">
          Illustrative example data, not clinical results.
        </p>
      </div>
    </section>
  );
}
