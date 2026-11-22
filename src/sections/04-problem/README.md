# Problem

## What it shows
A full-viewport dark panel that slides up over the ball. It holds a photo and wellness copy about keeping up home practice and about clinicians lacking information between sessions. It ends with the note that Dexteria supports physiotherapy and does not replace it.

## Ball state
`behind-panel`: the ball drops below the viewport. The opaque panel (above the ball layer) covers it as it scrolls in.

## Content source
New copy written for this section (wellness wording, no diagnostic or treatment claims). **The image is a placeholder.**

## What to edit
- Copy: `problem.njk`.
- Photo: replace `src/assets/images/problem/problem-placeholder.svg` with the licensed photo (JPG or WebP, about 800×1000, under 200 KB). Update `src`, `width`/`height` and the **alt text** to describe the real photo, e.g. *"An older woman squeezing a soft ball at her kitchen table"*. Record the licence in the root README.

## Files
- `problem.css`
- `problem.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
