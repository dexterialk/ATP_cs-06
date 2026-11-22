# App Preview

## What it shows
Four tilted prototype screens with no phone frame. They straighten and lift on hover and fade in as they enter view.

## Ball state
`paused`: the ball rests, without floating, in the bottom-left corner.

## Content source
The `screens` list in `app-preview.njk`. **Screens are placeholders.**

## What to edit
- Screens: replace the SVGs in `src/assets/images/app/` (1:2 portrait, about 720×1440, WebP or PNG under 150 KB each). Update `alt` to describe what each prototype shows, including any numbers.
- Tilt: the `tilt` value per screen.

## Files
- `app-preview.css`
- `app-preview.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
