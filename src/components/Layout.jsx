import Nav from "../sections/00-nav/Nav.jsx";
import Footer from "../sections/13-footer/Footer.jsx";

// Shared page shell: skip link, nav, main, footer.
// The 3D ball lives only in the hero and the waitlist sections; there is no fixed, scroll-moving ball layer any more.
export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      {/* Scroll progress line: decorative, so hidden from assistive tech. Filled by src/motion/scroll-indicator.js. */}
      <div className="scroll-line" aria-hidden="true">
        <span className="scroll-line__fill" data-scroll-fill=""></span>
      </div>
      <Nav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <Footer />
      </footer>
    </>
  );
}
