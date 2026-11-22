import "./contact.css";

// 11 Contact. Contact words are Sima 02's. The privacy notice lives on its own page (/privacy/), linked from the footer.
export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__inner container">
        <p className="section-label">
          Let’s connect
        </p>
        <h2 id="contact-title">
          Have a question?
        </h2>
        <p className="contact__intro">
          We’d love to hear from you. Reach out to the Dexteria team or follow our journey on social media.
        </p>
        <dl className="contact__list">
          <div>
            <dt>
              Email
            </dt>
            <dd>
              <a href="mailto:dexteria.lk@gmail.com">
                dexteria.lk@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt>
              Follow Dexteria
            </dt>
            <dd>
              <ul className="contact__social" role="list">
                <li>
                  <a href="https://www.instagram.com/dexteria.lk?cnvx=MXY1azFmZzFjZ29sMQ==" target="_blank" rel="noopener noreferrer">
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/profile.php?id=61596224367492&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                    Facebook ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/dexteria-lk-937b31447?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
