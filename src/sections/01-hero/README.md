# Hero

## What it shows
The page h1 as a typographic lockup: **Small movements.** (cream, behind the ball) and **Meaningful progress.** (brand accent green, slightly smaller, slightly wider), a large draggable 3D Smart Ball between them, the supporting paragraph and one **Join now** button (links to `#waitlist`). Background: deep green melting into the cream page, brand colours only, with a faint sage glow behind the ball.

## Ball
`DexteriaBall` (`src/components/DexteriaBall/`) with `dragRotate`, `floatAmp`, `maxPixelRatio={1.5}` and its own shadow switched off. Drag turns it (with inertia, then it settles back), the pointer leans it, it floats slowly. Rendering pauses off screen. The 3D code loads lazily; until then (and on low-end devices or without WebGL) a still image, `public/assets/ball/smart-ball-still.webp`, is shown with the alt text "Dexteria Smart Ball".

The small round **Spin the ball** icon button sits at the ball's lower right (faint until hover or focus). Hidden in Static mode.

## Ground shadow
`.hero__shadow` is a separate element inside the hero only. `Hero.jsx` writes `--p` (scroll progress, one write per frame) and `--bob` (ball height); the shadow fades out by about half a hero height of scrolling. Nothing else on the page draws a shadow.

## Motion mode
The nav's **Static | Motion** control sets `data-calm` on `<html>`. Static stops the ball's float and sway, the glow drift and the entrance animation, and hides the spin button; dragging still works. Default follows `prefers-reduced-motion`.

## What to edit
- Copy: `Hero.jsx`.
- Ball size: `--ball-d` in `hero.css`. How far it rises into line 1: `--ball-overlap`.
- Type fit: `--r1` and `--r2` are the measured widths of the two lines in ems (Manrope 800, -0.045em). If the copy or font changes, re-measure and update them; the lines then span the screen again at every width.
- Gradient: `.hero__bg`. Text sits only on the dark part, so keep the light part below the button.
