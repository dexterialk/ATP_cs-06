import "./contact-privacy.css";

export default function ContactPrivacy() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title" data-ball-state="rest" data-effect="reveal">
      <div className="contact__grid container">
        <div className="contact__details">
          <p className="section-label reveal">
            Your voice matters
          </p>
          <h2 id="contact-title" className="reveal" style={{ "--d": ".1s" }}>
            Contact and privacy
          </h2>
          <p className="contact__intro reveal" style={{ "--d": ".2s" }}>
            We’re building something meaningful, and we’d love to hear from you. Share your thoughts and help us shape what comes next.
          </p>
          <dl className="contact__list reveal" style={{ "--d": ".3s" }}>
            <div>
              <dt>
                Email
              </dt>
              <dd>
                <a href="mailto:hello@example.com">
                  hello@example.com
                </a>
              </dd>
            </div>
            <div>
              <dt>
                Who we are
              </dt>
              <dd>
                Team{" "}
                <span translate="no">
                  CS-06
                </span>
                , Agile Team Project, University of Westminster
              </dd>
            </div>
          </dl>
        </div>
        <div className="contact__privacy reveal" style={{ "--d": ".2s" }}>
          <h3>
            Your privacy, in short
          </h3>
          <ul className="contact__points">
            <li>
              We only collect your email address, and only with your consent.
            </li>
            <li>
              We use it to send Dexteria updates. We never sell it.
            </li>
            <li>
              Our email provider, Brevo, stores it securely for us.
            </li>
            <li>
              You can unsubscribe, or ask us to see or delete your data, at any time.
            </li>
          </ul>
          <p className="contact__law">
            We follow UK GDPR and Sri Lanka’s Personal Data Protection Act No.{"\u00a0"}9 of 2022.
          </p>
          <a className="button" href="/privacy/">
            Read the full privacy notice
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17 17 7M7 7h10v10"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
