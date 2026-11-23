import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo-img.png";
import wordmark from "./assets/logotext-img.png";
import ball from "./assets/smart-ball.jpg";
import pose from "./assets/dexteria-motion.jpg";

const LINKS = [["Impact", "#impact"], ["Progress", "#progress"], ["Brand", "#logo"], ["Colour", "#colour"], ["Typography", "#type"], ["Motion", "#motion"], ["Voice", "#voice"]];

/* ---------- Brand pieces ---------- */
const Mark = ({ big }) => <span className={"mark" + (big ? " big" : "")}><img src={logo} alt="" /></span>;
const Word = ({ big }) => <span className={"word" + (big ? " big" : "")} role="img" aria-label="Dexteria" />;
const Lockup = () => <span className="brand"><Mark /><Word /></span>;
const Sec = ({ id, title, intro, children }) => (
  <section id={id} className="wrap sec rv"><h2>{title}</h2><p className="intro">{intro}</p>{children}</section>
);

/* Counts up to `to` the first time it scrolls into view. */
function Count({ to, pre = "", suffix = "" }) {
  const ref = useRef(), [v, setV] = useState(0);
  useEffect(() => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (calm) return setV(to);
      const t0 = performance.now();
      const tick = n => {
        const k = Math.min(1, (n - t0) / 1400);
        setV(Math.round(to * (1 - (1 - k) ** 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{pre + v + suffix}</span>;
}

/* ---------- Navigation ---------- */
function Nav() {
  const [open, setOpen] = useState(false), [dark, setDark] = useState(false), [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(([, u]) => { const n = document.querySelector(u); if (n) io.observe(n); });
    return () => io.disconnect();
  }, []);
  const toggleTheme = () => { setDark(!dark); document.documentElement.dataset.theme = dark ? "light" : "dark"; };
  return (
    <header>
      <div className="wrap">
        <nav>
          <a href="#top" aria-label="Dexteria home"><Lockup /></a>
          <div className="links">
            {LINKS.map(([t, u]) => <a key={u} href={u} className={active === u ? "on" : ""}>{t}</a>)}
          </div>
          <button className="btn ghost" onClick={toggleTheme}>{dark ? "Light mode" : "Dark mode"}</button>
          <button className="btn ghost menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
        </nav>
        <div className={"drawer" + (open ? " open" : "")}>
          {LINKS.map(([t, u]) => <a key={u} href={u} onClick={() => setOpen(false)}>{t}</a>)}
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
// Space reserved for the 3D model: put your canvas or <model-viewer> inside .gl. The chips float above it.
function ModelSlot() {
  const move = e => {
    const b = e.currentTarget.getBoundingClientRect(), s = e.currentTarget.style;
    s.setProperty("--px", ((e.clientX - b.left) / b.width - .5) * 2);
    s.setProperty("--py", ((e.clientY - b.top) / b.height - .5) * 2);
  };
  return (
    <div className="stage" id="model" onPointerMove={move}>
      {[0, 1, 2].map(i => <span key={i} className="ring" style={{ "--i": i }} />)}
      <div className="gl"><div className="empty"><Mark big /><p>Space reserved for the 3D model</p></div></div>
      <div className="chip a"><small>Grip, compared with unaffected hand</small><b><Count to={82} suffix="%" /></b></div>
      <div className="chip b">
        <small>Tremor</small><b>Steady</b>
        <svg viewBox="0 0 96 24" aria-hidden="true"><path d="M0 12 Q8 2 16 12 T32 12 T48 12 T64 12 T80 12 T96 12" /></svg>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <main id="top" className="wrap hero">
      <div>
        <h1>
          <span className="ln"><i style={{ "--i": 0 }}>Small movements.</i></span>
          <span className="ln"><i style={{ "--i": 1 }}>Meaningful progress.</i></span>
        </h1>
        <svg className="ul" viewBox="0 0 400 14" aria-hidden="true"><path pathLength="1" d="M2 8 C60 2 140 14 220 6 S340 4 398 9" /></svg>
        <p className="sub">A home-based hand rehabilitation system that guides structured exercises and gives physiotherapists measurable progress between clinic sessions.</p>
        <div className="btns">
          <a className="btn" href="#progress" style={{ padding: "16px 28px", fontSize: 15 }}>See an example report</a>
          <a className="btn ghost" href="#logo" style={{ padding: "15px 24px", fontSize: 15 }}>View the brand</a>
        </div>
        <p className="meta">Measures grip strength, sustained grip, movement and tremor. Supports physiotherapy and never replaces it.</p>
      </div>
      <ModelSlot />
    </main>
  );
}

/* ---------- Stats ---------- */
const STATS = [
  [<Count to={67} pre="≈" suffix="%" />, "of stroke survivors have upper-limb limitations", "Kwakkel et al., 2019"],
  [<><Count to={5} />–<Count to={20} suffix="%" /></>, "fully recover the upper limb six months after stroke", "Kwakkel et al., 2019"],
  [<><Count to={13} />–<Count to={140} suffix="%" /></>, "range of adherence to prescribed home exercise doses", "Neibling et al., 2021"],
  [<Count to={4} />, "measures tracked: grip strength, sustained grip, movement and tremor", "Dexteria Smart Ball"],
];

const Impact = () => (
  <Sec id="impact" title="Why home hand rehabilitation matters"
    intro="Hand function underpins dressing, bathing and eating, yet recovery after stroke is often incomplete and home practice is difficult to sustain. Dexteria is designed around these figures.">
    <div className="g g4">
      {STATS.map(([n, label, src], i) => (
        <div className="stat" key={i}><b>{n}</b><p>{label}</p><small>{src}</small></div>
      ))}
    </div>
  </Sec>
);

/* ---------- Progress charts (example data) ---------- */
const MEASURES = [
  { name: "Grip pressure", unit: "units", data: [22, 26, 31, 35, 41, 46, 52, 58], base: 80 },
  { name: "Sustained hold", unit: "seconds", data: [3, 4, 5, 7, 8, 10, 12, 14], base: 20 },
  { name: "Steadiness", unit: "points", data: [48, 52, 58, 63, 69, 74, 80, 85], base: 95 },
];
const SESSIONS = [4, 5, 5, 6, 7, 6, 7, 7];

function Progress() {
  const [t, setT] = useState(0), [hover, setHover] = useState(7);
  const { unit, data: d, base } = MEASURES[t];
  const W = 600, H = 240, L = 44, B = 30, max = base * 1.15, C = 326.7, pct = Math.round(d[7] / base * 100);
  const x = i => L + i * (W - L - 16) / 7;
  const y = v => H - B - v / max * (H - B - 14);
  const line = "M" + d.map((v, i) => x(i) + "," + y(v)).join(" L");
  const onMove = e => {
    const b = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - b.left) / b.width * W - L) / ((W - L - 16) / 7));
    setHover(Math.max(0, Math.min(7, i)));
  };
  return (
    <Sec id="progress" title="Progress at a glance"
      intro="Each session is recorded and compared with the person’s unaffected hand, so patients and physiotherapists can see change week by week. Select a measure, then hover over the chart.">
      <div className="pg">
        <div className="card">
          <div className="tabs" role="tablist">
            {MEASURES.map((m, i) => (
              <button key={m.name} role="tab" aria-selected={t === i} className="tab" onClick={() => { setT(i); setHover(7); }}>{m.name}</button>
            ))}
          </div>
          <p className="rd" aria-live="polite">Week {hover + 1}: {d[hover]} {unit}, {Math.round(d[hover] / base * 100)}% of the unaffected hand</p>
          <svg className="chart" key={t} viewBox={`0 0 ${W} ${H}`} onPointerMove={onMove} role="img" aria-label="Line chart of weekly progress">
            {[0, .25, .5, .75, 1].map(f => (
              <g key={f}>
                <line x1={L} x2={W - 16} y1={y(max * f)} y2={y(max * f)} stroke="var(--line)" />
                <text x={L - 8} y={y(max * f) + 4} textAnchor="end">{Math.round(max * f)}</text>
              </g>
            ))}
            {d.map((_, i) => <text key={i} x={x(i)} y={H - 8} textAnchor="middle">W{i + 1}</text>)}
            <line x1={L} x2={W - 16} y1={y(base)} y2={y(base)} stroke="var(--gold)" strokeWidth="2" strokeDasharray="6 5" />
            <text x={W - 16} y={y(base) - 7} textAnchor="end">Unaffected hand</text>
            <line x1={x(hover)} x2={x(hover)} y1="14" y2={H - B} stroke="var(--sage)" strokeDasharray="3 4" />
            <path className="draw" pathLength="1" d={line} fill="none" stroke="var(--sage)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {d.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={i === hover ? 7 : 4} fill={i === hover ? "var(--gold)" : "var(--sage)"} />)}
          </svg>
        </div>
        <div className="side">
          <div className="card">
            <h3>Against unaffected hand</h3>
            <div className="gauge" key={"g" + t}>
              <svg viewBox="0 0 120 120" width="150" height="150">
                <circle cx="60" cy="60" r="52" stroke="var(--soft)" />
                <circle cx="60" cy="60" r="52" stroke="var(--sage)" transform="rotate(-90 60 60)"
                  style={{ strokeDasharray: C, "--c": C, strokeDashoffset: C * (1 - pct / 100), animation: "gauge 1.3s var(--e) both" }} />
              </svg>
              <b><Count to={pct} suffix="%" /></b>
            </div>
          </div>
          <div className="card">
            <h3>Sessions completed</h3><p>Out of 7 prescribed each week</p>
            <div className="bars">
              {SESSIONS.map((v, i) => <div key={i} className="barx" style={{ "--i": i, height: v / 7 * 100 + "%" }} title={`Week ${i + 1}: ${v} of 7`} />)}
            </div>
          </div>
        </div>
      </div>
      <p className="fine">Illustrative example data, not clinical results. Grip values are relative units until the ball is calibrated against a reference dynamometer.</p>
    </Sec>
  );
}

/* ---------- Brand guide ---------- */
const Logo = () => (
  <Sec id="logo" title="Logo"
    intro="The mark combines an open hand with the letter D. Use the full lockup wherever space allows, and the mark alone for small spaces such as app icons. Leave clear space equal to the height of the D on every side.">
    <div className="g g5">
      {[["#F0ECE3", "#1C2A20", "Lockup on cream"], ["#1C2A20", "#F0ECE3", "Lockup on forest"], ["#829080", "#1C2A20", "Lockup on sage"]].map(([bg, fg, label]) => (
        <div key={label}><div className="tile" style={{ "--b": bg, "--wc": fg }}><Lockup /></div><p className="cap2">{label}</p></div>
      ))}
      <div><div className="tile"><Mark big /></div><p className="cap2">Mark</p></div>
      <div><div className="tile"><Word big /></div><p className="cap2">Wordmark</p></div>
    </div>
  </Sec>
);

function InUse() {
  const tilt = (e, rx, ry) => { e.currentTarget.style.setProperty("--rx", rx + "deg"); e.currentTarget.style.setProperty("--ry", ry + "deg"); };
  const onMove = e => {
    const b = e.currentTarget.getBoundingClientRect();
    tilt(e, -((e.clientY - b.top) / b.height - .5) * 8, ((e.clientX - b.left) / b.width - .5) * 8);
  };
  return (
    <Sec id="inuse" title="Brand in use"
      intro="The identity carries through to the Smart Ball and the companion app, with the same forest, sage and cream palette. Move over an image to tilt it.">
      <div className="g g2">
        {[[ball, "Smart Ball, concept render"], [pose, "Dexteria Motion pose screen, planned, concept render"]].map(([src, cap]) => (
          <div key={cap}>
            <div className="shot" onPointerMove={onMove} onPointerLeave={e => tilt(e, 0, 0)}><img src={src} alt={cap} /></div>
            <p className="cap2">{cap}</p>
          </div>
        ))}
      </div>
    </Sec>
  );
}

const MAIN = [["Cream", "#F0ECE3", "Page background"], ["Forest", "#1C2A20", "Text, buttons"], ["Sage", "#829080", "Accent, headline"], ["Gold", "#C9A55A", "Focus, highlights"]];
const AUX = [["Surface", "#FBF9F4"], ["Stone", "#E8E3D8"], ["Mist", "#DCE2D8"]];

function Colour() {
  const [copied, setCopied] = useState("");
  const swatch = ([name, hex, use]) => (
    <button key={hex} className="sw" onClick={() => { navigator.clipboard?.writeText(hex).catch(() => {}); setCopied(hex); }}>
      <span style={{ "--c": hex }} /><b>{name}</b><em>{hex}{use && <><br />{use}</>}</em>
    </button>
  );
  return (
    <Sec id="colour" title="Colour"
      intro={copied ? `${copied} has been copied. Select any swatch to copy its code.` : "A calm, natural palette that feels clinical without feeling cold. Forest and cream carry the page, sage and gold are used sparingly. Select a swatch to copy its code."}>
      <div className="g g4">{MAIN.map(swatch)}</div>
      <div className="g g3" style={{ marginTop: 12 }}>{AUX.map(swatch)}</div>
    </Sec>
  );
}

const SCALE = [
  ["Display, Manrope 600, 64/68", { font: "600 clamp(36px,6vw,64px)/1.05 var(--fd)", letterSpacing: "-.035em" }],
  ["Heading, Manrope 600, 32/38", { font: "600 32px/1.2 var(--fd)", letterSpacing: "-.025em" }],
  ["Body, DM Sans 400, 17/28", { font: "400 17px/1.65 var(--fb)" }],
  ["Caption, DM Sans 500, 13/20", { font: "500 13px/1.5 var(--fb)" }],
];

function Type() {
  const [text, setText] = useState("Small movements.");
  return (
    <Sec id="type" title="Typography"
      intro="Manrope gives headlines a rounded, confident voice. DM Sans keeps body text open and easy to read, including for people with reduced vision. Type below to test.">
      <input className="tester" aria-label="Test text" value={text} onChange={e => setText(e.target.value)} />
      {SCALE.map(([label, style]) => (
        <div className="row" key={label}><small>{label}</small><span style={style}>{text || "Small movements."}</span></div>
      ))}
    </Sec>
  );
}

const Components = () => (
  <Sec id="components" title="Components and shape"
    intro="Rounded shapes and generous spacing keep the interface gentle. Buttons are fully rounded, cards use an 18 px radius, and large buttons and targets suit reduced grip and fine motor control.">
    <div className="demo">
      <button className="btn">Primary</button>
      <button className="btn ghost">Secondary</button>
      <input className="tester" style={{ width: 240, margin: 0 }} placeholder="Text field" aria-label="Text field" />
      <span className="pill">Status label</span>
    </div>
    <div className="g g3" style={{ marginTop: 22 }}>
      <div className="card"><h3>Card</h3><p>18 px radius, one-pixel outline, no heavy shadows.</p></div>
      <div className="card" style={{ background: "var(--soft)" }}><h3>Tinted card</h3><p>Mist background for supporting information.</p></div>
      <div className="card" style={{ borderColor: "var(--gold)", borderWidth: 2 }}><h3>Focus</h3><p>Gold marks focus and the current selection.</p></div>
    </div>
    <div className="sp">
      {[4, 8, 16, 24, 40, 64].map(n => <div key={n} style={{ flex: n }}><i style={{ height: n }} />{n} px</div>)}
    </div>
  </Sec>
);

function Motion() {
  const [k, setK] = useState(0); // changing the key replays every animation
  return (
    <Sec id="motion" title="Motion"
      intro="Motion is calm and purposeful. Headlines rise into place, progress draws itself, and feedback pulses outward like a squeeze. All motion is removed when a device requests reduced motion.">
      <div className="g g3" key={k}>
        <div className="card">
          <div className="demo2"><span className="ln" style={{ font: "600 26px var(--fd)" }}><i style={{ "--i": 0 }}>Small movements.</i></span></div>
          <h3>Rise</h3><p>Text slides up from a mask, one line at a time.</p>
        </div>
        <div className="card">
          <div className="demo2"><svg viewBox="0 0 200 20" width="80%"><path className="dpath" pathLength="1" d="M2 12 C40 2 80 20 120 10 S180 6 198 12" style={{ animationDelay: "0s" }} /></svg></div>
          <h3>Draw</h3><p>Lines and charts draw themselves to show change.</p>
        </div>
        <div className="card">
          <div className="demo2">
            {[0, 1, 2].map(i => <span key={i} className="ring" style={{ "--i": i, width: 70, margin: "-35px 0 0 -35px" }} />)}
            <Mark />
          </div>
          <h3>Pulse</h3><p>Rings spread outward like a squeeze.</p>
        </div>
      </div>
      <button className="btn ghost" style={{ marginTop: 14 }} onClick={() => setK(k + 1)}>Replay animations</button>
      <p className="fine">Easing: cubic-bezier(0.2, 0.8, 0.2, 1). Durations: 0.6 to 1.5 seconds.</p>
    </Sec>
  );
}

const VOICE = [
  ["Clear", "Use short sentences and everyday words.", "Complete today’s session.", "Crush your workout!"],
  ["Calm", "Encourage steady progress, not intensity.", "Well done. Your grip is steadier.", "You’re on fire!"],
  ["Respectful", "Support the clinician, never replace them.", "Share this report with your physiotherapist.", "Skip the clinic."],
];

const Voice = () => (
  <Sec id="voice" title="Voice"
    intro="Dexteria speaks plainly, calmly and with respect. Instructions are short, written in sentence case, and never rush or pressure the person.">
    <div className="g g3">
      {VOICE.map(([title, desc, say, avoid]) => (
        <div className="card" key={title}>
          <h3>{title}</h3><p>{desc}</p>
          <p className="do">Say: {say}</p><p className="do dont">Avoid: {avoid}</p>
        </div>
      ))}
    </div>
  </Sec>
);

/* ---------- App ---------- */
function ScrollBar() {
  const ref = useRef();
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      ref.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return <i className="bar" ref={ref} />;
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.setProperty("--w", `url(${wordmark})`); // wordmark is used as a colour mask
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .12 });
    document.querySelectorAll(".rv").forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
  return (
    <>
      <ScrollBar /><Nav /><Hero /><Impact /><Progress /><Logo /><InUse />
      <Colour /><Type /><Components /><Motion /><Voice />
    </>
  );
}
