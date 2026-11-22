# How It Works

## What it shows
Three steps: **Squeeze the ball**, **Connect over Bluetooth**, **See progress in the app**. On screens tall enough (560px+) with motion allowed, the panel pins for three screens of scrolling and shows one step at a time. **Previous step** / **Next step** buttons (44px+) do the same by scrolling the page, so scroll and buttons stay in sync. Otherwise (reduced motion, short screens, 200% text) it is a plain list of three cards.

## Ball state
`steps`: the ball centres on `.steps__ball-slot` and moves between three positions as the step changes (`data-step` offsets in `smart-ball.css`).

## Content source
The `steps` list at the top of `how-it-works.njk`.

## What to edit
- Copy: `steps` in `how-it-works.njk`. Adding a step works automatically (`--steps-count`).
- Pinning rules: `PIN_MIN_HEIGHT` and the fit check in `how-it-works.js`.
- Sticky positioning never captures the wheel or keyboard focus. Button-driven changes are announced through a polite live region.

## Files
- `how-it-works.css`
- `how-it-works.js`
- `how-it-works.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
