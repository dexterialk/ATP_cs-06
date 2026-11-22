# Footer

## What it shows
Logo, the slogan, links to the privacy notice and accessibility statement, and the copyright line. Rendered inside the `<footer>` shell in `src/_includes/base.njk`.

## Ball state
`rest` (same as Contact, so the ball stays settled at the very bottom).

## Content source
`site.year` and `site.team` in `src/_data/site.json`.

## What to edit
- Links and text: `footer.njk`.
- Year: `year` in `src/_data/site.json`.

## Files
- `footer.css`
- `footer.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
