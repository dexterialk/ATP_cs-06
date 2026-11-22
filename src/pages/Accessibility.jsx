export default function Accessibility() {
  return (
    <article className="prose-page">
      <div className="prose">
        <h1>
          Accessibility statement
        </h1>
        <p className="updated">
          Last reviewed:{" "}
          <time dateTime="2026-11-23">
            23 November 2026
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
            Choose <strong>Static</strong> in the <strong>Static | Motion</strong> control at the top of the page to stop the ball’s floating, the background drift and the scroll effects. Your choice is remembered.
          </li>
          <li>
            Turn on “reduce motion” in your device settings and the page starts in Static mode, as a simple, still layout.
          </li>
          <li>
            Zoom text to 200% and use the site on screens as narrow as 320 pixels without scrolling sideways.
          </li>
          <li>
            Spin the Smart Ball in the top section with the keyboard-friendly “Spin the ball” button, and read a text description of every picture.
          </li>
          <li>
            See a clear focus outline on every link, button and form field, and read text that meets WCAG AA colour contrast.
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
            The hero and waitlist balls can be squeezed and turned by pointer or touch only. A keyboard user can use the “Spin the ball” button, and the games in the Smart Ball section can be played with the Space key.
          </li>
          <li>
            The scroll-driven Smart Ball walkthrough moves as you scroll. Its chapter buttons jump to each part, and the Static control turns the effects off.
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
          <a href="mailto:dexteria.lk@gmail.com">
            dexteria.lk@gmail.com
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
