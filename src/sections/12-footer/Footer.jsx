import "./footer.css";

export default function Footer() {
  return (
    <div className="footer container" data-ball-state="rest">
      <a className="footer__brand" href="/">
        <img className="footer__logo" src="/assets/images/logo/logo-mark.png" alt="" width={96} height={91} loading="lazy" />
        <img className="footer__wordmark" src="/assets/images/logo/logo-text.png" alt="" width={336} height={50} loading="lazy" />
        <span className="visually-hidden">
          Dexteria home
        </span>
      </a>
      <p className="footer__slogan">
        Move. Mend. Master.
      </p>
      <nav aria-label="Legal">
        <ul className="footer__links" role="list">
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
      <p className="footer__copy">
        © 2026 Dexteria · Team{" "}
        <span translate="no">
          CS-06
        </span>
      </p>
    </div>
  );
}
