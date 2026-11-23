# Waitlist

## What it shows
Two columns on desktop (form card, ball slot) that stack on mobile. The card has the label "Get early updates", the heading "Join the waitlist.", a short intro, one email field with a "Join the waitlist ↗" button, and a note linking to the privacy notice.

## Content and method source
Copy and sign-up method come from teammate Sima's waitlist file (Sima 01). The form posts the email straight to Brevo (`EMAIL`, the `email_address_check` honeypot and `locale=en`) with `target="brevoFrame"`, a hidden iframe, so the page does not reload. `waitlist.js` then disables the button for 0.8 s, shows "✓ You're on the list! Thanks for joining Dexteria.", clears the field and re-enables the button.

## Things to know
- The confirmation is shown after a fixed delay. The page cannot read Brevo's reply through the hidden iframe, so it does not know if Brevo accepted the address.
- There is no consent checkbox in this version (it is not in Sima's form). The note links to the privacy notice (`#privacy`).
- After the confirmation appears, the privacy link in the note is replaced by the confirmation text. That is how Sima's script works.

## Ball state
`waitlist`: while the ball is shown, it moves into `.waitlist__ball-slot`.

## What to edit
- Brevo address: the `action` on the form in `Waitlist.jsx`.
- Messages: `waitlist.js`.

## Files
- `Waitlist.jsx`
- `waitlist.css`
- `waitlist.js`

This section must not import files from any other section. Shared styles live in `src/css/`, shared behaviour in `src/js/` and `src/components/`.
