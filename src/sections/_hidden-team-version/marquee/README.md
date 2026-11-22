# Marquee

## What it shows
A continuously scrolling **Move · Mend · Master** band. It pauses on hover, on keyboard focus, with its own visible **Pause** button, and with the nav's Pause motion. It is static under reduced motion. The moving text is `aria-hidden` because it repeats the h1.

## Ball state
`side`: the ball drifts to the right edge.

## Content source
The `words` list in `marquee.njk`.

## What to edit
- Words: `words` in `marquee.njk` (odd entries are drawn as outlines).
- Speed: `--dur-marquee` in `src/css/tokens.css`.
- Pause button behaviour: `marquee.js`.

## Files
- `marquee.css`
- `marquee.js`
- `marquee.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
