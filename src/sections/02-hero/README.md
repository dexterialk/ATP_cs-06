# Hero

## What it shows
Eyebrow, the h1 **Move. Mend. Master.** (plain text, one per page), the existing tagline and description, the **Be the first to know** button and a small **Spin the ball** control. Drifting orbs and orbiting rings sit behind it.

## Ball state
`hero`: the ball centres on the empty `.hero__ball-slot` with a slow idle float. It spins once on load and again on each **Spin the ball** press.

## Content source
Copy kept from the original single-file site (`dexteria.pages.dev`), except the h1.

## What to edit
- Copy: `hero.njk`.
- Ball size: `.hero__ball-slot` min/max height in `hero.css`.
- The Spin button starts `hidden`. `main.js` shows it and wires it to `ball.spin()` (hidden under reduced motion).
- Orbs and rings carry `motion-loop`, so Pause motion stops them.

## Files
- `hero.css`
- `hero.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
