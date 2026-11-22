import "./nav.css";

export default function Nav() {
  return (
    <header className="site-header" data-site-header="" data-effect="logo-hover">
      <nav className="nav" aria-label="Main">
        <a className="nav__brand" href="/" aria-label="Dexteria home">
          <img className="nav__logo" src="/assets/images/logo/logo-mark.png" alt="" width={96} height={91} />
          <img className="nav__wordmark" src="/assets/images/logo/logo-text.png" alt="" width={336} height={50} />
        </a>
        <ul className="nav__links" id="nav-menu" role="list">
          <li>
            <a className="nav__link" href="/#problem">
              Problem
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#solution">
              About
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#progress">
              How It Helps
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#features">
              Features
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#team">
              Team
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#contact">
              Contact Us
            </a>
          </li>
          <li className="nav__menu-cta">
            <a className="button" href="/#waitlist">
              Join the waitlist
            </a>
          </li>
        </ul>
        <div className="nav__actions">
          <div className="nav__mode" role="group" aria-label="Page motion" data-motion-mode="">
            <button type="button" className="nav__mode-option" aria-pressed="false" data-motion-option="on">
              Static
            </button>
            <button type="button" className="nav__mode-option" aria-pressed="true" data-motion-option="off">
              Motion
            </button>
          </div>
          <a className="button nav__cta" href="/#waitlist">
            Join the waitlist
          </a>
          <button type="button" className="control nav__toggle" aria-expanded="false" aria-controls="nav-menu" data-nav-toggle="">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            </svg>
            Menu
          </button>
        </div>
      </nav>
    </header>
  );
}
