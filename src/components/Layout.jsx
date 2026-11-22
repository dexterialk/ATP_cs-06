import BallLayer from "../motion/choreography/BallLayer.jsx";
import Nav from "../sections/01-nav/Nav.jsx";
import Footer from "../sections/12-footer/Footer.jsx";

// Shared page shell: skip link, nav, main, footer.
export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <BallLayer />
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
