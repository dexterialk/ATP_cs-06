# Nav

## What it shows
Floating pill-shaped navigation fixed at the top: logo, anchor links, a **Calm mode** switch and a dark **Join the waitlist** button. Below 1080px the links move into a **Menu** disclosure (Escape closes it and returns focus). Below 600px the waitlist button moves into the menu.

## Ball state
None (the ball never sits behind the nav).

## Content source
Link list at the top of `nav.njk` (`navLinks`). Logo images in `src/assets/images/logo/`.

## What to edit
- Links: edit `navLinks` in `nav.njk`. Each `href` is `/#section-id` so it works from the legal pages too.
- Menu breakpoint: `1079px` in `nav.css` **and** `DESKTOP` in `nav.js` (keep them the same).
- Calm mode: a `role="switch"` button (`data-calm-toggle`) wired by `src/motion/motion-controller.js`. It replaces the old Pause motion button.
- `nav.js` measures the nav and sets `--nav-h`, so `scroll-padding-top` always clears it (WCAG 2.4.11 Focus Not Obscured).

## Files
- `nav.css`
- `nav.js`
- `nav.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
