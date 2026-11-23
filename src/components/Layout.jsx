import { lazy, Suspense } from "react";
import Nav from "../sections/00-nav/Nav.jsx";
import Footer from "../sections/13-footer/Footer.jsx";

// The 3D ball (Three.js) is a large download, so it loads after the page.
const BallLayer = lazy(() => import("../motion/choreography/BallLayer.jsx"));

// Shared page shell: skip link, nav, main, footer.
// The fixed Smart Ball layer glides and hovers between sections (it fades out over the hero and the waitlist, which carry their own ball).
export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Suspense fallback={null}>
        <BallLayer />
      </Suspense>
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
