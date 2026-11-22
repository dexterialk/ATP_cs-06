export default function Accessibility() {
  return (
    <article className="prose-page">
      <div className="prose">
        <h1>
          Accessibility statement
        </h1>
        <p className="updated">
          Last reviewed:{" "}
          <time dateTime="2026-11-21">
            21 November 2026
          </time>
        </p>
        <p className="lead">
          We want everyone to be able to use the Dexteria website, including people who use a keyboard, a screen reader, magnification or reduced motion. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.
        </p>
        <h2>
          What you can do on this site
        </h2>
        <ul>
          <li>
            Use every link, button and form field with a keyboard alone.
          </li>
          <li>
            Skip straight to the main content with the first link on the page.
          </li>
          <li>
            Stop the floating shapes, scroll effects and the ball’s movement with the{" "}
            <strong>
              Calm mode
            </strong>
            {" "}switch at the top of the page. The scrolling slogan also has its own Pause button.
          </li>
          <li>
            Turn on “reduce motion” in your device settings to remove scroll effects. The page then shows everything as a simple, still layout.
          </li>
          <li>
            Zoom text to 200% and use the site on screens as narrow as 320 pixels without scrolling sideways.
          </li>
        </ul>
        <h2>
          How we tested it
        </h2>
        <p>
          We checked the site with automated testing (axe), keyboard-only navigation, reduced-motion settings and screen widths of 320, 768 and 1440 pixels, and we checked every text colour against WCAG contrast requirements.
        </p>
        <h2>
          Known limitations
        </h2>
        <ul>
          <li>
            Some pictures are placeholders until the final photos and app screens are ready. Their descriptions explain what each one shows.
          </li>
          <li>
            The animated Smart Ball is decorative. It carries no information that is not also given in text.
          </li>
        </ul>
        <h2>
          Tell us about a problem
        </h2>
        <p>
          If something on this site does not work for you, email{" "}
          <a href="mailto:hello@example.com">
            hello@example.com
          </a>
          . Tell us the page and what happened, and we will try to fix it.
        </p>
        <p>
          <a href="/">
            Back to the Dexteria home page
          </a>
        </p>
      </div>
    </article>
  );
}
