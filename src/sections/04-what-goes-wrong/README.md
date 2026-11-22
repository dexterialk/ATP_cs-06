# Problem: three gaps (Raika 03)

## What it shows
Three problem cards that stack as you scroll, then the fix card. The stacking effect is switched off for reduced motion and Calm mode.

## Source
Teammate Raika, file 03 (problem gaps). Converted to React: the markup is in `ProblemGaps.jsx`, the styles in `problem-gaps.css` (shared rules are in `../dx-shared/dx-shared.css`), and the behaviour in `problem-gaps.js` (cards scale as the next one slides over them). The wording is the teammate's and is unchanged.

## Notes
- Section id: `problem-gaps`.
- Renamed from `problem` to avoid a duplicate id.
- This is a scroll animation. It does not move the ball.

## Files
- `ProblemGaps.jsx`
- `problem-gaps.css`
- `problem-gaps.js`

This section must not import files from any other section except the shared folder named above.
