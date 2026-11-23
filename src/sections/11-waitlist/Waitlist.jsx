import { lazy, Suspense, useRef, useState } from "react";
import { canRun3D } from "../../components/DexteriaBall/can-run-3d.js";
import "./waitlist.css";

// The same Smart Ball as the hero: press to squeeze it, drag to turn it. It loads after the page, and low-end
// devices or browsers without WebGL get a still image instead.
const DexteriaBall = lazy(() => import("../../components/DexteriaBall/DexteriaBall.jsx"));
const STILL = "/assets/ball/smart-ball-still.webp";

// 11 Waitlist. Copy and sign-up method are Sima 01's: the form posts the email straight to
// Brevo through a hidden iframe, and waitlist.js shows the confirmation.
export default function Waitlist() {
  const ballRef = useRef(null);
  const [use3D] = useState(canRun3D);
  const [ready, setReady] = useState(false);
  return (
    <section className="waitlist" id="waitlist" aria-labelledby="waitlist-title">
      <div className="waitlist__grid container">
        <div className="waitlist__card">
          <p className="section-label">
            Get early updates
          </p>
          <h2 id="waitlist-title">
            Join the waitlist.
          </h2>
          <p className="waitlist__intro">
            Be among the first to hear about Dexteria. Join the waitlist for project updates, sneak peeks, and launch news.
          </p>

          <iframe name="brevoFrame" style={{ display: "none" }} title="Sign-up response (hidden)" aria-hidden="true"></iframe>

          <form
            className="waitlist-form"
            id="subscribeForm"
            target="brevoFrame"
            action="https://6ec1d46d.sibforms.com/serve/MUIFAJWNJEXXtna4lcIcAmjiBqu5yMNruBEqPBRUJu54dW1T4kMIRlMEmnWcOMlRXI_z4a1KK2NR8Jicr7MtVgkpdLmnQZru33xuxbXnMsHh4fm0fKhqxl7r_qMDRmoYwf7yzJ-IGJjpBM4U0M5rUBrEP_qEl1V5FG8NxMpH35aRboN3Z2lsudNfRqSiEdjcfXOWCL_zib1m42ny2Q=="
            method="POST"
          >
            <input className="field__input" type="email" id="email" name="EMAIL" placeholder="Your email address" aria-label="Your email address" aria-describedby="formNote" autoComplete="email" required />
            <input type="text" name="email_address_check" defaultValue="" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="locale" defaultValue="en" />
            <button type="submit" className="button waitlist-form__submit">
              Join the waitlist ↗
            </button>
          </form>

          <p className="waitlist__note" id="formNote" role="status" aria-live="polite">
            No spam. Just updates worth opening.{" "}
            <a href="/privacy/">Privacy notice</a>.
          </p>
        </div>

        <figure className="waitlist__ball">
          <div className="waitlist__canvas" aria-hidden="true">
            {use3D && (
              <Suspense fallback={null}>
                <DexteriaBall
                  ref={ballRef}
                  style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
                  color="#808475" /* CHANGED: brand ball colour */
                  logoSpan={0.85} /* CHANGED: small logo, as in the reference picture */
                  logoOffset={[-0.1, -0.12]} /* CHANGED: low and slightly left, as in the reference */
                  engrave={0.2} /* CHANGED: shallow print instead of deep engraving */
                  background="transparent"
                  logo="d"
                  hint=""
                  fallbackSrc={STILL}
                  shadow={false}
                  dragRotate
                  floatAmp={0.07}
                  maxPixelRatio={1.5}
                  onReady={() => { ballRef.current?.setPointerEvents(true); setReady(true); }}
                />
              </Suspense>
            )}
          </div>
          <img
            className={`waitlist__still${use3D && ready ? " is-hidden" : ""}`}
            src={STILL}
            alt="Dexteria Smart Ball"
            width="1440"
            height="960"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <figcaption className="visually-hidden">Press and hold the ball to squeeze it, or drag to turn it.</figcaption>
        </figure>
      </div>
    </section>
  );
}
