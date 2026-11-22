# Banner

## What it shows
A wide dark strip introducing the Smart Ball. The ball rises from behind it.

## Ball state
`banner`: the ball centres on `.banner__ball-slot`, whose bottom quarter sits behind the strip.

## Content source
Product description from the brief (grip pressure and movement only).

## What to edit
- Copy: `banner.njk`.
- How far the ball peeks out: the `0.75` / `0.25` factors in `banner.css`.
- Under reduced motion the reserved space collapses.

## Files
- `banner.css`
- `banner.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
