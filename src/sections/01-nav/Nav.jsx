import "./nav.css";

export default function Nav() {
  return (
    <header className="site-header" data-site-header="" data-effect="logo-hover">
      <nav className="nav" aria-label="Main">
        <a className="nav__brand" href="/">
          <img className="nav__logo" src="/assets/images/logo/logo-mark.png" alt="" width={96} height={91} />
          <img className="nav__wordmark" src="/assets/images/logo/logo-text.png" alt="" width={336} height={50} />
          <span className="visually-hidden">
            Dexteria home
          </span>
        </a>
        <ul className="nav__links" id="nav-menu" role="list">
          <li>
            <a className="nav__link" href="/#how-it-works">
              How it works
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#features">
              Features
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#app">
              App
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#team">
              Team
            </a>
          </li>
          <li>
            <a className="nav__link" href="/#contact">
              Contact
            </a>
          </li>
          <li className="nav__menu-cta">
            <a className="button" href="/#waitlist">
              Join the waitlist
            </a>
          </li>
        </ul>
        <div className="nav__actions">
          <button type="button" role="switch" className="control nav__calm" aria-checked="false" data-calm-toggle="">
            <span className="nav__calm-track" aria-hidden="true">
              <svg className="nav__calm-tick" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6.5 5 9.5 10 3"></path>
              </svg>
              <span className="nav__calm-thumb"></span>
            </span>
            <span className="nav__calm-label">
              Calm mode
            </span>
          </button>
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
