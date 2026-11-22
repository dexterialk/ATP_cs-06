# Progress at a glance (Vinuri 04)

## What it shows
A line chart of eight weeks of example data with three measures to choose from, a gauge against the unaffected hand, and a sessions bar chart.

## Source
Teammate Vinuri, file 04 (progress). The original was a whole brand-guide page written in React with global styles. Converted to React: the markup is in `Progress.jsx`, the styles in `progress.css` (shared rules are in `../vn-shared/vn-shared.css`). The behaviour is React code in the same `.jsx` file. The wording is the teammate's and is unchanged.

## Notes
- Section id: `progress`.
- The data is illustrative and the page says so ("not clinical results").
- Styles are scoped under `.vn` so nothing leaks into the rest of the site.
- The chart reacts to the pointer; the line and gauge draw in when the section scrolls into view.

## Files
- `Progress.jsx`
- `progress.css`

This section must not import files from any other section except the shared folder named above.
