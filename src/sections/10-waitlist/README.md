# Waitlist

## What it shows
Two columns on desktop (form card, ball) that stack on mobile. The form has an email field and a required consent checkbox with the privacy notice link next to it. Both have visible labels and "(required)" in text. Errors appear inline, linked with `aria-describedby`, and focus moves to the first error. A polite live region gives sending/success/error status. The submit button shows a spinner and keeps its label.

## Ball state
`waitlist`: the ball expands from the bottom-right corner into `.waitlist__ball-slot` and spins once (`spin()`, the same rotation as the hero) each time the section enters view.

## Content source
Heading, intro and note kept from the original site. Brevo form action kept unchanged.

## What to edit
- Brevo: `brevoAction` in `waitlist.njk`. `waitlist.js` posts with `fetch` to `action?isAjax=1`. Brevo answers JSON and allows the site's origin, so success and failure are real, not guessed. The hidden iframe from the old site is gone. Without JavaScript the form posts normally.
- Brevo answers `success:true` even to an empty email, so `waitlist.js` validates first.
- Consent: the checkbox has no `name`, so Brevo does not receive it, but the form cannot be sent without it. To store consent in Brevo, add a boolean attribute (e.g. `OPT_IN`) to the Brevo form and give the checkbox `name="OPT_IN" value="1"`.
- Messages: `MESSAGES` in `waitlist.js`.

## Files
- `waitlist.css`
- `waitlist.js`
- `waitlist.njk`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
