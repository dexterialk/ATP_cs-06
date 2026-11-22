# Dexteria landing page: Smart Ball

Single-product landing page for the Dexteria Smart Ball, a squeezable ball with sealed electronics that measures grip pressure and movement for home hand practice.
Team CS-06, University of Westminster Agile Team Project, Coursework 1, 2026/27.

Built with React and [Vite](https://vite.dev). Each section is its own folder with its JSX, CSS, JS and README. `src/pages/Home.jsx` assembles them in order. The hero ball is `src/components/DexteriaBall/` (Three.js r128, pinned to `three@0.128.0`, moved on scroll by `ScrollBall.jsx` using `motion`). The old Eleventy source is kept in `legacy-eleventy/` and can be deleted.

## Commands

```bash
npm install
npm run dev      # local server with hot reload
npm run build    # builds to dist/
npm run preview  # serves dist/
```

**Deploy (Cloudflare Pages):** build command `npm run build`, output directory `dist`.

`npm test` (`tests/check.mjs`) still targets the old Eleventy output and its ball states, and needs updating before use.

## Structure

```
index.njk                  assembles sections in order, nothing else
privacy.njk                full privacy notice           → /privacy/
accessibility.njk          accessibility statement       → /accessibility/
404.njk, sitemap.njk
eleventy.config.js
src/
  _includes/base.njk       head, meta, favicon, skip link, footer shell
  _data/site.json          title, description, URL, contact email, team, year
  css/tokens.css           colours, type scale, spacing, motion durations
  css/base.css             reset, typography, buttons, focus, reduced motion
  css/pages.css            long-form text pages
  js/main.js               boots the page, wires modules together
  js/scroll-controller.js  maps scroll position to ball states
  js/reduced-motion.js     reads the preference once, exposes one flag
  js/reveal.js             fade-in on scroll (skipped under reduced motion)
  components/smart-ball/   the ball (see its README for the 3D swap)
  sections/01-nav … 12-footer
  assets/images, assets/ball
public/                    favicon, icons, social preview, robots.txt
tests/check.mjs
```

**How CSS is loaded:** each section starts with `{% css %}…{% endcss %}`. Eleventy gathers every section's CSS into one hashed file in `_site/bundle/`. Cascade layers (`tokens, base, component, sections, page`, declared in `base.njk`) keep the order predictable.

**How the ball works:** every section root has `data-ball-state="…"`. The section that crosses the middle of the viewport sets the state. If an element has `data-ball-anchor="<state>"`, the ball centres on it and follows it. Otherwise it uses the pose in `smart-ball.css`.

| Section | Ball state |
| --- | --- |
| Hero | `hero`: large, centred, idle float, spins on load and on "Spin the ball" |
| Marquee | `side` |
| Problem | `behind-panel`: the panel slides over it |
| Banner | `banner`: rises from behind the strip |
| How It Works | `steps`: moves between three positions |
| Key Features | `corner` |
| App Preview | `paused` |
| Team | `off-screen` |
| Waitlist | `waitlist`: expands from the corner, spins once |
| Contact, Footer | `rest` |

## Accessibility summary

Checked with `npm test` at 320, 768 and 1440 px, with and without reduced motion, on every page. Results: 0 axe violations (WCAG 2.2 A/AA and best practice), no horizontal scrolling (also with 200% text at 320 and 640 px), one h1, no skipped headings, keyboard tab order (skip link first, every stop visible, ringed and clear of the nav), buttons of 44 px or more, mobile menu Escape and focus return, form errors and status messages, Pause motion, and reduced motion. Text colours and contrast ratios are listed in `src/css/tokens.css`.

Still to test by hand: a real screen reader (NVDA or VoiceOver), iOS Safari and Low Power Mode, and a Lighthouse run once the real images are in.

## Placeholder assets still needed

| Asset | Where | Notes |
| --- | --- | --- |
| Smart Ball 3D model (`.glb`) | `src/assets/ball/` | Under 3 MB. Current PNG (179 KB) works until then. See the component README. |
| Better ball PNG (optional) | `src/assets/ball/smart-ball.png` | Transparent, about 1000 px square, under 300 KB. The current one is 550 px and its shadow is baked in, so it shows when the ball spins. |
| Licensed problem-section photo | `src/assets/images/problem/` | Older adult or hand rehabilitation at home. Record the licence. Update the alt text. |
| Prototype app screenshots ×4 | `src/assets/images/app/` | 1:2 portrait. Update the alt text with what each shows. |
| Game and graph pictures ×5 | `src/assets/images/features/` | 4:3. The alt text must keep the data shown. |
| Team photos, names, roles | `src/assets/images/team/`, `09-team/team.njk` | 400×400. Get consent from each person. |
| Social preview image | `public/social-preview.png` | 1200×630. A draft made from the ball and logo is in place; replace it with a designed version if you have one. |
| Contact email | `src/_data/site.json` | Currently `hello@example.com`. |
