# Key Features

## What it shows
Five features, each with a picture. On desktop (900px+ wide, 600px+ tall, motion allowed) the panel pins and vertical scrolling moves a horizontal track. **Previous feature** / **Next feature** buttons scroll to each card. On phones the cards stack; with reduced motion they form a grid.

## Ball state
`corner`: the ball peeks in from the bottom-right corner while the features change.

## Content source
The `features` list at the top of `key-features.njk`. **Images are placeholders with sample data.**

## What to edit
- Copy and images: `features` in `key-features.njk`.
- Pictures: replace the SVGs in `src/assets/images/features/` (4:3, about 960×720). Each picture's data must stay in its `alt` text (or in the card text), e.g. the numbers on a chart.
- Pin rules: `PIN_QUERY` in `key-features.js`. Each card gets an equal share of the scroll distance.

## Files
- `key-features.css`
- `key-features.js`
- `key-features.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
