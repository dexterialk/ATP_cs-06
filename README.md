# Dexteria Smart Ball landing page

## Project overview
The marketing landing page for the **Dexteria Smart Ball**, built by team **CS-06** for the University of Westminster Agile Team Project (ATP), Coursework 1, 2026/27. Dexteria is a home hand-practice kit; this site covers the Smart Ball only. All copy is wellness wording: the product supports physiotherapy and does not replace it, and it makes no diagnostic or treatment claims.

The page runs in this order: hero, problem (stats, a week at home, what goes wrong), why home hand rehabilitation matters, how Dexteria helps (the interactive Smart Ball demo), progress at a glance, features (a scroll-driven ball walkthrough), one app three ways, team, waitlist, contact, footer. A moving word strip repeats after the hero, before the Smart Ball explanation and at the end of the page.

## Tech stack
- React 19.3.1 and React DOM 19.3.1
- Vite ^8.3.8 with @vitejs/plugin-react ^6.3.0
- Three.js 0.128.0 (the 3D ball)
- Anime.js 4.5.0 (scroll progress line and scroll effects)
- Plain CSS with cascade layers (`src/css/layers.css`) and design tokens (`src/css/tokens.css`)

Versions are read from `package.json`.

## Dependencies
| Package | Version | Used for |
|---|---|---|
| `animejs` | `4.5.0` | Anime.js: the scroll progress line (`onScroll`), and the scroll effects in `src/motion/effects/`. |
| `react` | `19.3.1` | React: every page and section is a component. |
| `react-dom` | `19.3.1` | React DOM: mounts the pages (`src/mount.jsx`). |
| `three` | `0.128.0` | Three.js (pinned to r128): the 3D Smart Ball in the hero and the waitlist (`src/components/DexteriaBall/`). Newer versions change the ball's lighting and engraving. |

Dev dependencies:

| Package | Version | Used for |
|---|---|---|
| `@vitejs/plugin-react` | `^6.3.0` | Vite plugin for React (JSX). |
| `vite` | `^8.3.8` | Vite: dev server and production build (multi-page: home, privacy, accessibility, 404). |

## Commands
```bash
npm install
npm run dev       # Vite dev server
npm run build     # production build into dist/
npm run preview   # serve the build
```

## Important modules
- **3D Smart Ball** (`src/components/DexteriaBall/`). A Three.js ball, used in the hero (`src/sections/01-hero/`) and the waitlist (`src/sections/11-waitlist/`) only. A press squeezes it, a drag turns it, the pointer leans it, and it floats slowly. Rendering pauses off screen. Low-end devices and browsers without WebGL get a still image (`public/assets/ball/smart-ball-still.webp`). The logo engraving is a base64 height map in `dexteriaLogoMaps.js`, built from `public/assets/images/logo/logo-removebg-preview.png`. Lines changed in the ball code for the brand colours and the new logo are marked `// CHANGED:` so they can be reverted. See `src/components/DexteriaBall/README.md`.
- **Scroll progress line** (`src/motion/scroll-indicator.js`). A thin line in the bottom-right corner that fills as you scroll, built with Anime.js `onScroll` in `sync` mode, so it follows the scroll position with no transition of its own and works the same under reduced motion.
- **Navigation** (`src/sections/00-nav/`). Floating pill: logo, section links (Problem, About, How It Helps, Features, Team, Contact Us), the **Static | Motion** control and the **Join the waitlist** button. Below 1080px the links move into a **Menu** disclosure (Escape closes it and returns focus). The logo jumps instantly to the top of the page (`logo-to-top.js`).
- **Static | Motion control** (`src/motion/motion-controller.js`). One switch for motion on the site. Static stops the ball float, drift and animations. It defaults to Static when the system asks for reduced motion and is remembered in `localStorage`.
- **Word strip** (`src/components/WordStrip/`). One component, used three times in `src/pages/Home.jsx`.
- **Scroll effects** (`src/motion/effects/`). Reveal on scroll, count-ups and the pinned steps, started from `src/js/main.js`.
- **Colours**. Buttons `#b7bab8` (dark green text on them, 7.66:1), ball `#808475`, logo `#636559`; see `src/css/tokens.css`.

## Project structure
Generated from the file system.

```text
dexteria-site/
|-- accessibility/
|   `-- index.html
|-- privacy/
|   `-- index.html
|-- public/
|   |-- assets/
|   |   |-- ball/
|   |   |   |-- smart-ball-still.webp
|   |   |   `-- smart-ball.png
|   |   `-- images/
|   |       |-- app/
|   |       |   |-- app-progress.svg
|   |       |   |-- app-session-summary.svg
|   |       |   |-- app-squeeze-game.svg
|   |       |   `-- app-tilt-game.svg
|   |       |-- features/
|   |       |   |-- clinician.svg
|   |       |   |-- games.svg
|   |       |   |-- grip-number.svg
|   |       |   |-- hand-compare.svg
|   |       |   `-- offline.svg
|   |       |-- logo/
|   |       |   |-- logo-mark.png
|   |       |   |-- logo-removebg-preview.png
|   |       |   `-- logo-text.png
|   |       |-- problem-solution/
|   |       |   |-- caregiver.png
|   |       |   |-- clinician.png
|   |       |   `-- patient.png
|   |       `-- team/
|   |           `-- avatar-placeholder.svg
|   |-- dexteria/
|   |   `-- v51/
|   |       |-- d/   (133 .webp files)
|   |       `-- m/   (133 .webp files)
|   |-- fonts/
|   |   |-- archivo-ext.woff2
|   |   `-- archivo-latin.woff2
|   |-- team/
|   |   |-- placeholder.webp
|   |   |-- raiqa.webp
|   |   |-- safiya.webp
|   |   |-- sima.webp
|   |   |-- vinuri.webp
|   |   `-- zaina.webp
|   |-- apple-touch-icon.png
|   |-- favicon.ico
|   |-- icon-192.png
|   |-- robots.txt
|   `-- social-preview.png
|-- src/
|   |-- components/
|   |   |-- DexteriaBall/
|   |   |   |-- can-run-3d.js
|   |   |   |-- DexteriaBall.jsx
|   |   |   |-- dexteriaLogoMaps.js
|   |   |   `-- README.md
|   |   |-- WordStrip/
|   |   |   |-- word-strip.css
|   |   |   `-- WordStrip.jsx
|   |   `-- Layout.jsx
|   |-- css/
|   |   |-- base.css
|   |   |-- layers.css
|   |   |-- pages.css
|   |   `-- tokens.css
|   |-- entries/
|   |   |-- accessibility.jsx
|   |   |-- home.jsx
|   |   |-- not-found.jsx
|   |   `-- privacy.jsx
|   |-- js/
|   |   `-- main.js
|   |-- motion/
|   |   |-- effects/
|   |   |   |-- hover-lift.js
|   |   |   |-- index.js
|   |   |   |-- marquee.js
|   |   |   |-- pinned-features.js
|   |   |   |-- pinned-steps.js
|   |   |   `-- reveal.js
|   |   |-- ball-visibility.js
|   |   |-- effects.css
|   |   |-- motion-controller.js
|   |   |-- README.md
|   |   `-- scroll-indicator.js
|   |-- pages/
|   |   |-- Accessibility.jsx
|   |   |-- Home.jsx
|   |   |-- NotFound.jsx
|   |   `-- Privacy.jsx
|   |-- sections/
|   |   |-- 00-nav/
|   |   |   |-- logo-to-top.js
|   |   |   |-- nav.css
|   |   |   |-- nav.js
|   |   |   |-- Nav.jsx
|   |   |   `-- README.md
|   |   |-- 01-hero/
|   |   |   |-- hero.css
|   |   |   |-- Hero.jsx
|   |   |   `-- README.md
|   |   |-- 02-problem/
|   |   |   |-- problem-stats.css
|   |   |   |-- problem-stats.js
|   |   |   |-- ProblemStats.jsx
|   |   |   `-- README.md
|   |   |-- 03-week-at-home/
|   |   |   |-- problem-week.css
|   |   |   |-- problem-week.js
|   |   |   |-- ProblemWeek.jsx
|   |   |   `-- README.md
|   |   |-- 04-what-goes-wrong/
|   |   |   |-- problem-gaps.css
|   |   |   |-- problem-gaps.js
|   |   |   |-- ProblemGaps.jsx
|   |   |   `-- README.md
|   |   |-- 05-why-it-matters/
|   |   |   |-- impact.css
|   |   |   |-- Impact.jsx
|   |   |   `-- README.md
|   |   |-- 06-how-dexteria-helps/
|   |   |   |-- README.md
|   |   |   |-- solution-demo.css
|   |   |   |-- solution-demo.js
|   |   |   `-- SolutionDemo.jsx
|   |   |-- 07-progress/
|   |   |   |-- progress.css
|   |   |   |-- Progress.jsx
|   |   |   `-- README.md
|   |   |-- 08-features/
|   |   |   |-- anchors.js
|   |   |   |-- archivo.css
|   |   |   |-- Features.jsx
|   |   |   `-- features.module.css
|   |   |-- 09-app-three-ways/
|   |   |   |-- README.md
|   |   |   |-- solution-modes.css
|   |   |   |-- solution-modes.js
|   |   |   `-- SolutionModes.jsx
|   |   |-- 10-team/
|   |   |   |-- Team.jsx
|   |   |   `-- team.module.css
|   |   |-- 11-waitlist/
|   |   |   |-- README.md
|   |   |   |-- waitlist.css
|   |   |   |-- waitlist.js
|   |   |   `-- Waitlist.jsx
|   |   |-- 12-contact/
|   |   |   |-- contact.css
|   |   |   |-- Contact.jsx
|   |   |   `-- README.md
|   |   |-- 13-footer/
|   |   |   |-- footer.css
|   |   |   |-- Footer.jsx
|   |   |   `-- README.md
|   |   |-- _hidden-team-version/
|   |   |   |-- app-preview/
|   |   |   |   |-- app-preview.css
|   |   |   |   |-- AppPreview.jsx
|   |   |   |   `-- README.md
|   |   |   |-- banner/
|   |   |   |   |-- banner.css
|   |   |   |   |-- Banner.jsx
|   |   |   |   `-- README.md
|   |   |   |-- how-it-works/
|   |   |   |   |-- how-it-works.css
|   |   |   |   |-- HowItWorks.jsx
|   |   |   |   `-- README.md
|   |   |   |-- key-features/
|   |   |   |   |-- key-features.css
|   |   |   |   |-- KeyFeatures.jsx
|   |   |   |   `-- README.md
|   |   |   |-- marquee/
|   |   |   |   |-- marquee.css
|   |   |   |   |-- Marquee.jsx
|   |   |   |   `-- README.md
|   |   |   `-- team/
|   |   |       |-- README.md
|   |   |       |-- team.css
|   |   |       `-- Team.jsx
|   |   |-- dx-shared/
|   |   |   |-- dx-shared.css
|   |   |   |-- dx-shared.js
|   |   |   `-- README.md
|   |   `-- vn-shared/
|   |       |-- README.md
|   |       |-- vn-shared.css
|   |       `-- vn-shared.jsx
|   `-- mount.jsx
|-- .gitignore
|-- .npmrc
|-- 404.html
|-- AGENTS.md
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
`-- vite.config.js
```

## Sections still to be added
_Space for sections to be added later (for example: testing notes, deployment, licences, change log)._
