import "./contact.css";

// 12 Contact. Contact words are Sima 02's. The privacy notice lives on its own page (/privacy/), linked from the footer.
const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const SOCIAL = [
  { name: "Instagram", note: "@dexteria.lk", href: "https://www.instagram.com/dexteria.lk?cnvx=MXY1azFmZzFjZ29sMQ==" },
  { name: "Facebook", note: "Dexteria", href: "https://www.facebook.com/profile.php?id=61596224367492&mibextid=ZbWKwL" },
  { name: "LinkedIn", note: "Dexteria", href: "https://www.linkedin.com/in/dexteria-lk-937b31447?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
];

export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__grid container">
        <div className="contact__head">
          <p className="section-label">
            Let’s connect
          </p>
          <h2 id="contact-title">
            Have a question?
          </h2>
          <p className="contact__intro">
            We’d love to hear from you. Reach out to the Dexteria team or follow our journey on social media.
          </p>
        </div>

        <div className="contact__panel">
          <a className="contact__email" href="mailto:dexteria.lk@gmail.com">
            <span className="contact__label">Email</span>
            <span className="contact__address">dexteria.lk@gmail.com</span>
            <span className="contact__go" aria-hidden="true">{ARROW}</span>
          </a>

          <p className="contact__label contact__label--follow" id="contact-follow">Follow Dexteria</p>
          <ul className="contact__social" role="list" aria-labelledby="contact-follow">
            {SOCIAL.map(({ name, note, href }) => (
              <li key={name}>
                <a className="contact__row" href={href} target="_blank" rel="noopener noreferrer">
                  <span className="contact__name">{name}</span>
                  <span className="contact__note">{note}</span>
                  <span className="contact__go" aria-hidden="true">{ARROW}</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
