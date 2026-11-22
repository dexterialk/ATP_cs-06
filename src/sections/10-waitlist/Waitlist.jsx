import "./waitlist.css";

export default function Waitlist() {
  return (
    <section className="waitlist" id="waitlist" aria-labelledby="waitlist-title" data-ball-state="waitlist">
      <div className="waitlist__grid container">
        <div className="waitlist__card">
          <p className="section-label">
            Something worth waiting for
          </p>
          <h2 id="waitlist-title">
            Stay in the loop.
          </h2>
          <p className="waitlist__intro">
            Be part of the journey. Subscribe for updates, sneak peeks, and the official Dexteria launch.
          </p>
          <form className="waitlist-form" action="https://6ec1d46d.sibforms.com/serve/MUIFAJWNJEXXtna4lcIcAmjiBqu5yMNruBEqPBRUJu54dW1T4kMIRlMEmnWcOMlRXI_z4a1KK2NR8Jicr7MtVgkpdLmnQZru33xuxbXnMsHh4fm0fKhqxl7r_qMDRmoYwf7yzJ-IGJjpBM4U0M5rUBrEP_qEl1V5FG8NxMpH35aRboN3Z2lsudNfRqSiEdjcfXOWCL_zib1m42ny2Q==" method="post" data-waitlist-form="">
            <div className="field">
              <label className="field__label" htmlFor="waitlist-email">
                Email address{" "}
                <span className="field__required">
                  (required)
                </span>
              </label>
              <input className="field__input" id="waitlist-email" name="EMAIL" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck="false" required aria-describedby="waitlist-email-error" />
              <p className="field__error" id="waitlist-email-error" data-error-for="waitlist-email"></p>
            </div>
            <div className="field field--check">
              <div className="check">
                <input className="check__input" id="waitlist-consent" type="checkbox" required aria-describedby="waitlist-consent-error" data-consent="" />
                <label className="check__label" htmlFor="waitlist-consent">
                  I agree to Dexteria storing my email address to send me launch updates. I can unsubscribe at any time.{" "}
                  <span className="field__required">
                    (required)
                  </span>
                </label>
              </div>
              <p className="field__help">
                Read our{" "}
                <a href="/privacy/">
                  privacy notice
                </a>
                {" "}to see how we use and protect your data.
              </p>
              <p className="field__error" id="waitlist-consent-error" data-error-for="waitlist-consent"></p>
            </div>
            <div className="waitlist-form__trap" aria-hidden="true">
              <label htmlFor="waitlist-check">
                Leave this field empty
              </label>
              <input id="waitlist-check" type="text" name="email_address_check" defaultValue="" tabIndex={-1} autoComplete="off" />
            </div>
            <input type="hidden" name="locale" defaultValue="en" />
            <button type="submit" className="button waitlist-form__submit">
              <span className="waitlist-form__spinner" aria-hidden="true"></span>
              Subscribe
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10"></path>
              </svg>
            </button>
            <p className="waitlist-form__status" role="status" aria-live="polite" data-form-status=""></p>
          </form>
          <p className="waitlist__note">
            No spam. Just updates worth opening.
          </p>
        </div>
        <div className="waitlist__ball-slot" aria-hidden="true" data-ball-anchor=""></div>
      </div>
    </section>
  );
}
