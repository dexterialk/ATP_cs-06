# Dexteria Ball: Setup Guide

A floating, squeezable 3D ball for your hero section, built with React and Three.js.

**Files**
- `DexteriaBall.jsx`: the component
- `dexteriaLogoMaps.js`: the logo engraving data (must sit in the same folder as the component)

---

## 1. Install Three.js (pinned version)

```bash
npm install three@0.128.0
```

Newer Three.js versions change how lighting and engraving depth are calculated. Pinning this version keeps the ball looking exactly like the approved prototype.

## 2. Copy the files into your project

```bash
mkdir -p src/components
cp DexteriaBall.jsx dexteriaLogoMaps.js src/components/
```

## 3. Use it in your hero section

```jsx
import DexteriaBall from "./components/DexteriaBall"

// One switch for the whole site: set to false to turn the ball off
const SHOW_BALL = true

export default function Hero() {
  return (
    <section style={{ height: "100svh", width: "100%" }}>
      <DexteriaBall enabled={SHOW_BALL} />
    </section>
  )
}
```

The ball fills whatever box you put it in. Use `100svh` (not `100vh`) for the hero height so the ball doesn't jump when the mobile browser's address bar slides away.

## 4. Run it

```bash
npm run dev      # Vite
npm start        # Create React App
```

### Next.js

Load it client-side only so it doesn't render on the server:

```jsx
import dynamic from "next/dynamic"
const DexteriaBall = dynamic(() => import("./components/DexteriaBall"), { ssr: false })
```

---

## Scrolling behaviour

The ball sits inside your hero, so it scrolls away with the page like any other element. Choose how it reacts while the page is scrolling:

| Setting | Behaviour |
|---|---|
| `pauseOnScroll={true}` (default) | While scrolling, the ball ignores the cursor and squeezes and just floats. It reacts again about 0.2 seconds after scrolling stops. |
| `pauseOnScroll={false}` | Fully interactive the whole time. |

```jsx
<DexteriaBall pauseOnScroll={false} />
```

---

## Mobile

- **Scrolling over the ball:** swiping on it scrolls the page normally and never gets stuck.
- **Squeezing:** press and hold on the ball. If the finger starts scrolling, the squeeze releases cleanly.
- **Battery:** drawing stops when the ball is off-screen or the tab is hidden, and resolution is capped on very sharp screens.
- **Accessibility:** if "reduce motion" is turned on in the device settings, the floating stops but squeezing still works.

---

## Disabling the ball

Three options, from simplest to most thorough:

**1. One prop.** Shows a still ball with no animation and no interaction.

```jsx
<DexteriaBall enabled={false} />
```

**2. Remove it completely.**

```jsx
{SHOW_BALL && <DexteriaBall />}
```

**3. Switch from an environment file.** Turn it off without editing code.

`.env`:
```
VITE_SHOW_BALL=false
```
(use `REACT_APP_SHOW_BALL` for Create React App)

In your code:
```jsx
const SHOW_BALL = import.meta.env.VITE_SHOW_BALL !== "false"
```

For options 1 and 2, the `SHOW_BALL` line in your hero file is the only place to change.

---

## Props reference

All props are optional.

| Prop | Default | What it does |
|---|---|---|
| `enabled` | `true` | `false` = still ball, no animation, no interaction |
| `interactive` | `true` | `false` = floats on its own but ignores cursor and touch |
| `pauseOnScroll` | `true` | Pauses reactions while the page scrolls |
| `logo` | `"d"` | `"d"` for the letter only, `"full"` for the letter plus "dexteria" |
| `color` | `#8C9986` | Ball colour |
| `background` | `#EDEAE2` | Cream by default; `"transparent"` lets your page show through |
| `hint` | `"Press and hold to squeeze"` | Hint text; `""` hides it |
| `logoSpan` | `1.25` | Logo size (smaller number = bigger logo) |
| `engrave` | `1.0` | Engraving depth |
| `buttonDir` | `[0.78, 0.4, 0.48]` | Position of the side button on the ball |
| `className`, `style` | none | Pass through to the outer container |

---

## Changing the logo

The logo is stored as a height map in `dexteriaLogoMaps.js` (512×512 PNG; white is flat, dark is engraved). To use a different logo, replace the base64 strings in that file, or ask Claude to generate new maps from your logo image.

---

## Troubleshooting

- **Ball looks too light or dark compared with your photos:** adjust the lighting rather than the hex colour. Ask Claude to retune it.
- **Engraving too deep or too faint:** change the `engrave` prop.
- **Nothing shows up:** make sure the parent element has a height (for example `100svh`). The ball fills its parent, and a parent with no height collapses to nothing.
- **Blank ball on very old devices:** the component needs WebGL. If it's unavailable, the background shows and the ball is skipped. A console warning will say so.
