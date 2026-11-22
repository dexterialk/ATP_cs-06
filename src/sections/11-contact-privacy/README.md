# Contact and privacy

## What it shows
Contact details, a short privacy summary, and a link to the full notice at `/privacy/`.

## Ball state
`rest`: the ball rests in the bottom-right corner.

## Content source
Intro copy kept from the original "Your voice matters" section. Email and team name come from `src/_data/site.json`.

## What to edit
- Contact email: `contactEmail` in `src/_data/site.json` (**currently a placeholder**: `hello@example.com`).
- Privacy summary: `contact-privacy.njk`. Keep it consistent with `privacy.njk` at the project root.

## Files
- `contact-privacy.css`
- `contact-privacy.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
