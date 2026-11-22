// Raika 04 (solution): word-mask heading and the Smart Ball hold game (a simulation, not real readings).
import { initSplit } from "../dx-shared/dx-shared.js";

export function initSolutionDemo() {
  initSplit(document.getElementById("solution"));

  const demo = document.getElementById("dx-demo");
  const ball = document.getElementById("dx-ball");
  const kgEl = document.getElementById("dx-kg");
  const fill = document.getElementById("dx-fill");
  const mark = document.getElementById("dx-mark");
  const zoneEl = document.getElementById("dx-zone");
  const zfill = document.getElementById("dx-zfill");
  const tremEl = document.getElementById("dx-tremor");
  const msg = document.getElementById("dx-msg");
  const wave = document.getElementById("dx-wave");
  if (!demo || !ball || !msg || !wave) return;

  const TARGET = 14.2, ZONE = [0.5, 0.8], GOAL = 5;
  const c = { holding: false, grip: 0, shown: 0, held: 0, zone: 0, phase: 0, won: false, inZone: false, kg: 0, last: 0, pulse: 0 };
  let lastMsg = "";

  function buzz(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { /* not supported */ } }
  function setMsg(html) {
    if (html !== lastMsg) {
      msg.innerHTML = html;
      lastMsg = html;
      const again = document.getElementById("dx-again");
      if (again) again.addEventListener("click", reset);
    }
  }
  function reset() { c.zone = 0; c.won = false; c.inZone = false; c.kg = 0; lastMsg = ""; }

  function tick(t) {
    const dt = c.last ? Math.min((t - c.last) / 1000, 0.05) : 0;
    c.last = t;
    c.grip += ((c.holding ? 0.95 : 0) - c.grip) * Math.min(1, (c.holding ? 0.7 : 1.6) * dt);
    c.held = c.holding ? c.held + dt : 0;
    c.phase += dt * 9;
    const steady = Math.min(1, c.held / 3);
    c.shown = Math.max(0, Math.min(1, c.grip + (c.holding ? Math.sin(c.phase * 1.7) * 0.025 * (1 - steady) : 0)));
    if (!c.won) {
      const inZ = c.shown >= ZONE[0] && c.shown <= ZONE[1];
      if (inZ && !c.inZone) buzz(15);
      c.inZone = inZ;
      c.zone = inZ ? c.zone + dt : Math.max(0, c.zone - dt * 0.6);
      if (inZ && c.holding && (c.pulse += dt) > 0.35) { c.pulse = 0; buzz(6); }
      if (c.zone >= GOAL) { c.zone = GOAL; c.won = true; c.kg = c.shown * TARGET; c.inZone = false; buzz([40, 60, 40]); }
    }
    const amp = c.holding ? 14 * (1 - steady) + 2 : 9;
    let d = "";
    for (let i = 0; i <= 60; i++) {
      const x = i / 60 * 300;
      const y = 40 + Math.sin(i * 0.9 + c.phase) * amp * (0.6 + 0.4 * Math.sin(i * 0.31 + c.phase * 0.5));
      d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    }
    wave.setAttribute("d", d);
    ball.style.setProperty("--g", c.shown);
    demo.classList.toggle("is-zone", c.inZone);
    fill.style.transform = "scaleX(" + c.shown + ")";
    mark.style.left = (c.shown * 100) + "%";
    kgEl.innerHTML = (c.shown * TARGET).toFixed(1) + "<small> kg</small>";
    zoneEl.textContent = c.zone.toFixed(1) + " / 5.0 s";
    zfill.style.transform = "scaleX(" + (c.zone / GOAL) + ")";
    tremEl.textContent = !c.holding ? "—" : steady > 0.85 ? "Steady" : steady > 0.4 ? "Settling" : "Shaky";
    if (c.won) {
      setMsg('<div class="dx-win"><span><b>Nice hold!</b><span>About ' + c.kg.toFixed(1) + ' kg, steady for 5 seconds.</span></span><button type="button" class="dx-again" id="dx-again">Play again</button></div>');
    } else {
      setMsg('<p class="dx-hint">' + (c.holding
        ? (c.inZone ? "In the zone. Keep it there…" : (c.shown > ZONE[1] ? "Too hard! Ease off a little." : "Squeeze a bit harder…"))
        : "Mini game: hold the ball (or Space) and keep the marker in the zone for 5 seconds.") + "</p>");
    }
    requestAnimationFrame(tick);
  }

  function start() { if (c.holding) return; c.holding = true; ball.classList.add("is-held"); ball.setAttribute("aria-pressed", "true"); buzz(12); }
  function stop() { c.holding = false; ball.classList.remove("is-held"); ball.setAttribute("aria-pressed", "false"); }

  ball.addEventListener("pointerdown", (e) => { if (ball.setPointerCapture) ball.setPointerCapture(e.pointerId); start(); });
  ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((ev) => ball.addEventListener(ev, stop));
  ball.addEventListener("keydown", (e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); start(); } });
  ball.addEventListener("keyup", (e) => { if (e.key === " " || e.key === "Enter") stop(); });
  ball.addEventListener("contextmenu", (e) => e.preventDefault());
  requestAnimationFrame(tick);
}
