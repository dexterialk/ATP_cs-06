import "./footer.css";

// 13 Footer. Flat, at the very bottom. The contact email comes first; then links to the Privacy notice and
// Accessibility statement pages, the three social platforms, the wellness disclaimer and the copyright line.
const SOCIAL = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/dexteria.lk?cnvx=MXY1azFmZzFjZ29sMQ==",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61596224367492&mibextid=ZbWKwL",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/dexteria-lk-937b31447?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <div className="footer container">
      <div className="footer__top">
        <a className="footer__brand" href="/" aria-label="Dexteria home">
          <img className="footer__logo" src="/assets/images/logo/logo-mark.png" alt="" width={96} height={91} loading="lazy" />
          <img className="footer__wordmark" src="/assets/images/logo/logo-text.png" alt="" width={336} height={50} loading="lazy" />
        </a>
        <p className="footer__contact">
          <span className="footer__contact-label">Contact us</span>
          <a className="footer__email" href="mailto:dexteria.lk@gmail.com">
            dexteria.lk@gmail.com
          </a>
        </p>
      </div>
      <div className="footer__row">
        <nav aria-label="Footer">
          <ul className="footer__links" role="list">
            <li>
              <a href="/#contact">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy/">
                Privacy notice
              </a>
            </li>
            <li>
              <a href="/accessibility/">
                Accessibility statement
              </a>
            </li>
          </ul>
        </nav>
        <ul className="footer__social" role="list">
          {SOCIAL.map(({ name, href, icon }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Dexteria on ${name} (opens in a new tab)`} title={name}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icon}
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="footer__disclaimer">
        Dexteria is a wellness tool, not a medical device, and does not diagnose or treat any condition. It supports physiotherapy and does not replace it.
      </p>
      <p className="footer__copy">
        © 2026 Dexteria
      </p>
    </div>
  );
}
