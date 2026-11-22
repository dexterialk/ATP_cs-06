# Impact: why home hand rehabilitation matters (Vinuri 03)

## What it shows
Four statistics with sources that count up when they scroll into view.

## Source
Teammate Vinuri, file 03 (impact). The original was a whole brand-guide page written in React with global styles. Converted to React: the markup is in `Impact.jsx`, the styles in `impact.css` (shared rules are in `../vn-shared/vn-shared.css`). The behaviour is React code in the same `.jsx` file. The wording is the teammate's and is unchanged.

## Notes
- Section id: `impact`.
- Only the impact section was used; the brand-guide page around it was left out.
- Styles are scoped under `.vn` so nothing leaks into the rest of the site.
- The statistics and sources (Kwakkel et al., 2019; Neibling et al., 2021) are the teammate's. Check them before launch.
- The fourth card lists tremor as a measure. Confirm the Smart Ball measures it before launch.

## Files
- `Impact.jsx`
- `impact.css`

This section must not import files from any other section except the shared folder named above.
