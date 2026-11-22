// Automated checks for the built site (_site/).
//   npm test        (builds first, then runs this file)
//
// Uses the Chrome installed on this machine (no browser download).
// Brevo is mocked: no real sign-ups are ever sent.
//
// Checks: axe (WCAG 2.2 A/AA), horizontal overflow at 320/768/1440 with and
// without reduced motion, heading structure, image alt, keyboard tab order
// (visible, not hidden under the nav), ball states per section, form
// validation and submission, 200% text reflow. Screenshots go to tests/output/.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = path.join(ROOT, "_site");
const OUT = path.join(ROOT, "tests", "output");
fs.mkdirSync(OUT, { recursive: true });

const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".xml": "application/xml", ".txt": "text/plain" };

const server = http.createServer((req, res) => {
  let file = path.join(SITE, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) { res.writeHead(404, { "content-type": TYPES[".html"] }); return res.end(fs.readFileSync(path.join(SITE, "404.html"))); }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const BASE = `http://localhost:${server.address().port}`;

const browser = await chromium.launch({ channel: "chrome" });
const failures = [];
const fail = (msg) => { failures.push(msg); console.log(`  ✗ ${msg}`); };
const pass = (msg) => console.log(`  ✓ ${msg}`);

async function newPage({ width, height = 900, reducedMotion = "no-preference" }) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion });
  const page = await context.newPage();
  page.on("pageerror", (e) => fail(`JS error at ${width}px: ${e.message}`));
  // Mock Brevo so tests never add real contacts.
  await page.route(/sibforms\.com/, (route) => route.fulfill({
    status: 200, contentType: "application/json", body: '{"success":true}',
    headers: { "access-control-allow-origin": "*" },
  }));
  return { context, page };
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = innerHeight / 2;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
    scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 200));
  });
}

// ---- 1. axe + overflow + structure, every page × width × motion ----
console.log("\naxe, overflow, headings");
for (const url of ["/", "/privacy/", "/accessibility/", "/404.html"]) {
  for (const width of [320, 768, 1440]) {
    for (const reducedMotion of ["no-preference", "reduce"]) {
      const label = `${url} @${width} ${reducedMotion === "reduce" ? "reduced" : "motion"}`;
      const { context, page } = await newPage({ width, reducedMotion });
      await page.goto(BASE + url, { waitUntil: "networkidle" });
      await scrollThrough(page);
      await page.waitForTimeout(1500); // let .reveal fade-ins finish
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      if (axe.violations.length) {
        for (const v of axe.violations) fail(`${label} axe ${v.id}: ${v.help} (${v.nodes.length}) → ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
      } else pass(`${label}: 0 axe violations (${axe.passes.length} rules passed)`);

      const info = await page.evaluate(() => {
        const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const heads = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
        let skip = null;
        heads.reduce((prev, cur) => { if (cur > prev + 1 && !skip) skip = `h${prev}→h${cur}`; return cur; }, 0);
        const noAlt = [...document.images].filter((i) => !i.hasAttribute("alt")).map((i) => i.src);
        const sectionsWithoutH2 = [...document.querySelectorAll("main section")].filter((s) => s.querySelectorAll(":scope h2").length !== 1 && !s.querySelector("h1")).map((s) => s.id || s.className);
        return { overflow, h1: heads.filter((h) => h === 1).length, skip, noAlt, sectionsWithoutH2 };
      });
      if (info.overflow > 0) fail(`${label}: horizontal overflow ${info.overflow}px`);
      if (info.h1 !== 1) fail(`${label}: ${info.h1} h1 elements`);
      if (info.skip) fail(`${label}: skipped heading level ${info.skip}`);
      if (info.noAlt.length) fail(`${label}: images without alt ${info.noAlt}`);
      if (info.sectionsWithoutH2.length) fail(`${label}: sections without exactly one h2: ${info.sectionsWithoutH2}`);
      if (url === "/" && reducedMotion === "no-preference") await page.screenshot({ path: path.join(OUT, `home-top-${width}.png`) });
      await context.close();
    }
  }
}

// ---- 2. Ball state per section ----
console.log("\nball states (1440px)");
{
  const { context, page } = await newPage({ width: 1440 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const expected = { top: "hero", why: "behind-panel", "how-it-works": "steps", features: "corner", app: "paused", team: "off-screen", waitlist: "waitlist", contact: "rest" };
  for (const [id, state] of Object.entries(expected)) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      const r = el.getBoundingClientRect();
      scrollTo({ top: scrollY + r.top + Math.min(r.height, innerHeight) / 2 - innerHeight / 2 + 10, behavior: "instant" });
    }, id);
    await page.waitForTimeout(1100);
    const got = await page.getAttribute("[data-smart-ball]", "data-state");
    got === state ? pass(`#${id} → ${got}`) : fail(`#${id}: expected ball state ${state}, got ${got}`);
    await page.screenshot({ path: path.join(OUT, `section-${id}-1440.png`) });
  }
  // Marquee and banner (no ids)
  for (const [sel, state] of [[".marquee", "side"], [".banner", "banner"]]) {
    await page.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); scrollTo({ top: scrollY + r.top + r.height / 2 - innerHeight / 2, behavior: "instant" }); }, sel);
    await page.waitForTimeout(1100);
    const got = await page.getAttribute("[data-smart-ball]", "data-state");
    got === state ? pass(`${sel} → ${got}`) : fail(`${sel}: expected ${state}, got ${got}`);
    await page.screenshot({ path: path.join(OUT, `section-${sel.slice(1)}-1440.png`) });
  }
  const pinned = await page.evaluate(() => ({
    steps: document.querySelector("[data-steps]").classList.contains("is-pinned"),
    features: document.querySelector("[data-features]").classList.contains("is-pinned"),
  }));
  pinned.steps ? pass("How It Works pinned at 1440×900") : fail("How It Works not pinned at 1440×900");
  pinned.features ? pass("Key Features pinned at 1440×900") : fail("Key Features not pinned at 1440×900");

  // Next/previous buttons drive the pinned sections.
  for (const [prefix, total] of [["steps", 3], ["features", 5]]) {
    await page.evaluate((p) => document.querySelector(`[data-${p}]`).scrollIntoView({ behavior: "instant" }), prefix);
    await page.waitForTimeout(400);
    for (let i = 1; i < total; i++) {
      await page.click(`[data-${prefix}-next]`);
      await page.waitForTimeout(900);
    }
    const shown = await page.textContent(`[data-${prefix}-current]`);
    shown === String(total) ? pass(`${prefix}: Next reaches ${total}/${total}`) : fail(`${prefix}: after Next ×${total - 1} shows ${shown}`);
    await page.screenshot({ path: path.join(OUT, `pinned-${prefix}-last-1440.png`) });
    await page.click(`[data-${prefix}-prev]`);
    await page.waitForTimeout(900);
    const back = await page.textContent(`[data-${prefix}-current]`);
    back === String(total - 1) ? pass(`${prefix}: Previous goes back to ${back}`) : fail(`${prefix}: Previous shows ${back}`);
  }
  await context.close();
}

// ---- 3. Reduced motion: no pinning, still ball images, no ball layer ----
console.log("\nreduced motion");
for (const width of [320, 1440]) {
  const { context, page } = await newPage({ width, reducedMotion: "reduce" });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const r = await page.evaluate(() => ({
    pinned: document.querySelectorAll(".is-pinned").length,
    layer: getComputedStyle(document.querySelector("[data-smart-ball-layer]")).display,
    stills: document.querySelectorAll(".smart-ball-still").length,
    spinHidden: document.querySelector("[data-ball-spin]").hidden,
    marquee: getComputedStyle(document.querySelector(".marquee__track")).animationName,
  }));
  r.pinned === 0 ? pass(`@${width}: nothing pinned`) : fail(`@${width}: ${r.pinned} pinned sections under reduced motion`);
  r.layer === "none" ? pass(`@${width}: fixed ball layer hidden`) : fail(`@${width}: ball layer display ${r.layer}`);
  r.stills === 2 ? pass(`@${width}: 2 still ball images`) : fail(`@${width}: ${r.stills} still images`);
  r.spinHidden ? pass(`@${width}: Spin control hidden`) : fail(`@${width}: Spin control visible`);
  r.marquee === "none" ? pass(`@${width}: marquee static`) : fail(`@${width}: marquee animation ${r.marquee}`);
  await page.screenshot({ path: path.join(OUT, `reduced-top-${width}.png`) });
  await page.screenshot({ path: path.join(OUT, `reduced-full-${width}.png`), fullPage: true });
  await context.close();
}

// ---- 4. Pause motion ----
console.log("\npause motion");
{
  const { context, page } = await newPage({ width: 1440 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.click("[data-motion-toggle]");
  const r = await page.evaluate(() => ({
    pressed: document.querySelector("[data-motion-toggle]").getAttribute("aria-pressed"),
    marquee: getComputedStyle(document.querySelector(".marquee__track")).animationPlayState,
    orb: getComputedStyle(document.querySelector(".hero__orb")).animationPlayState,
    ring: getComputedStyle(document.querySelector(".hero__ring")).animationPlayState,
    float: getComputedStyle(document.querySelector(".smart-ball__float")).animationPlayState,
    saved: localStorage.getItem("dexteria-motion"),
  }));
  const ok = r.pressed === "true" && [r.marquee, r.orb, r.ring, r.float].every((s) => s === "paused") && r.saved === "paused";
  ok ? pass("Pause motion stops marquee, orbs, rings, float and is remembered") : fail(`Pause motion: ${JSON.stringify(r)}`);
  await page.reload({ waitUntil: "networkidle" });
  const after = await page.getAttribute("[data-motion-toggle]", "aria-pressed");
  after === "true" ? pass("Pause motion persists after reload") : fail("Pause motion not restored after reload");
  await context.close();
}

// ---- 5. Keyboard: tab through everything ----
console.log("\nkeyboard");
for (const width of [1440, 320]) {
  for (const reducedMotion of ["no-preference", "reduce"]) {
    const { context, page } = await newPage({ width, height: 800, reducedMotion });
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const seen = [];
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press("Tab");
      await page.evaluate(() => new Promise((done) => {
        // Wait until scrolling (smooth focus scrolling included) settles.
        let last = -1, still = 0;
        const tick = () => { if (scrollY === last && ++still > 6) return done(); if (scrollY !== last) still = 0; last = scrollY; requestAnimationFrame(tick); };
        tick();
      }));
      const f = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const r = el.getBoundingClientRect();
        const nav = document.querySelector(".nav")?.getBoundingClientRect();
        const inNav = !!el.closest(".site-header") || el.matches(".skip-link");
        const cx = Math.min(innerWidth - 1, Math.max(0, r.left + r.width / 2));
        const cy = Math.min(innerHeight - 1, Math.max(0, r.top + r.height / 2));
        const top = document.elementFromPoint(cx, cy);
        const cs = getComputedStyle(el);
        return {
          name: (el.getAttribute("aria-label") || el.textContent || el.id || el.tagName).trim().replace(/\s+/g, " ").slice(0, 40),
          tag: el.tagName,
          inView: r.bottom > 0 && r.top < innerHeight && r.width > 0,
          obscured: !inNav && !(top === el || el.contains(top) || top?.closest("label") === el.labels?.[0]),
          underNav: !inNav && nav && r.top < nav.bottom,
          ring: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2,
          size: [Math.round(r.width), Math.round(r.height)],
          hidden: el.closest("[aria-hidden='true']") !== null,
        };
      });
      if (!f) continue;
      if (seen.length && seen[0].name === f.name && seen.length > 3) break; // wrapped around
      seen.push(f);
    }
    const label = `@${width} ${reducedMotion === "reduce" ? "reduced" : "motion"}`;
    seen[0]?.name === "Skip to main content" ? pass(`${label}: skip link is first`) : fail(`${label}: first focus is "${seen[0]?.name}"`);
    const bad = seen.filter((f) => !f.inView || f.obscured || f.underNav || !f.ring || f.hidden);
    bad.length ? bad.forEach((f) => fail(`${label}: focus problem on "${f.name}" ${JSON.stringify(f)}`))
      : pass(`${label}: ${seen.length} stops, all visible, ringed, not under the nav`);
    const small = seen.filter((f) => f.tag !== "A" && (f.size[0] < 44 || f.size[1] < 44) && f.tag !== "INPUT");
    small.length ? small.forEach((f) => fail(`${label}: target under 44px "${f.name}" ${f.size}`)) : pass(`${label}: all buttons ≥ 44px`);
    if (width === 1440 && reducedMotion === "no-preference") console.log("    order:", seen.map((f) => f.name).join(" → "));
    await context.close();
  }
}

// ---- 6. Mobile menu: open, Escape, focus returns ----
console.log("\nmobile menu");
{
  const { context, page } = await newPage({ width: 375 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.click("[data-nav-toggle]");
  const open = await page.isVisible("#nav-menu");
  await page.screenshot({ path: path.join(OUT, "menu-open-375.png") });
  await page.keyboard.press("Escape");
  const r = await page.evaluate(() => ({ expanded: document.querySelector("[data-nav-toggle]").getAttribute("aria-expanded"), focus: document.activeElement.matches("[data-nav-toggle]") }));
  open && r.expanded === "false" && r.focus ? pass("menu opens, Escape closes and returns focus") : fail(`menu: open=${open} ${JSON.stringify(r)}`);
  await context.close();
}

// ---- 7. Form ----
console.log("\nwaitlist form");
{
  const { context, page } = await newPage({ width: 768 });
  let posted = null;
  await page.route(/sibforms\.com/, (route) => { posted = route.request().postData(); route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}', headers: { "access-control-allow-origin": "*" } }); });
  await page.goto(BASE + "/#waitlist", { waitUntil: "networkidle" });
  await page.click(".waitlist-form__submit");
  let r = await page.evaluate(() => ({
    focus: document.activeElement.id,
    emailInvalid: document.querySelector("#waitlist-email").getAttribute("aria-invalid"),
    consentInvalid: document.querySelector("#waitlist-consent").getAttribute("aria-invalid"),
    emailError: document.querySelector("#waitlist-email-error").textContent,
    status: document.querySelector("[data-form-status]").textContent,
  }));
  r.focus === "waitlist-email" && r.emailInvalid === "true" && r.consentInvalid === "true" && r.emailError && !posted
    ? pass(`empty submit: errors shown, focus on email, nothing sent ("${r.status}")`) : fail(`empty submit: ${JSON.stringify(r)}`);
  await page.screenshot({ path: path.join(OUT, "form-errors-768.png") });
  await page.fill("#waitlist-email", "  test@example.com  ");
  await page.keyboard.press("Enter");
  r = await page.evaluate(() => document.activeElement.id);
  r === "waitlist-consent" && !posted ? pass("valid email without consent: focus moves to consent, nothing sent") : fail(`consent check: focus ${r}, posted=${!!posted}`);
  await page.check("#waitlist-consent");
  await page.click(".waitlist-form__submit");
  await page.waitForSelector('[data-form-status][data-tone="success"]', { timeout: 3000 }).catch(() => {});
  const status = await page.textContent("[data-form-status]");
  posted && posted.includes("test@example.com") && !posted.includes("  test") && status.includes("on the list")
    ? pass(`valid submit: trimmed email sent to (mocked) Brevo, success shown`) : fail(`valid submit: status="${status}" posted=${posted?.slice(0, 200)}`);
  await page.screenshot({ path: path.join(OUT, "form-success-768.png") });

  // Failure path
  await page.unroute(/sibforms\.com/);
  await page.route(/sibforms\.com/, (route) => route.abort());
  await page.fill("#waitlist-email", "test@example.com");
  await page.check("#waitlist-consent");
  await page.click(".waitlist-form__submit");
  await page.waitForSelector('[data-form-status][data-tone="error"]', { timeout: 3000 }).catch(() => {});
  const err = await page.textContent("[data-form-status]");
  err.includes("could not add you") ? pass("network failure shows an error message") : fail(`failure path: "${err}"`);
  await context.close();
}

// ---- 8. 200% text: reflow ----
console.log("\n200% text");
for (const width of [320, 640]) {
  const { context, page } = await newPage({ width, height: 700 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  await page.evaluate(() => dispatchEvent(new Event("resize")));
  await page.waitForTimeout(500);
  await scrollThrough(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  overflow <= 0 ? pass(`@${width} with 200% text: no horizontal scroll`) : fail(`@${width} with 200% text: overflow ${overflow}px`);
  await page.screenshot({ path: path.join(OUT, `text200-${width}.png`), fullPage: true });
  await context.close();
}

await browser.close();
server.close();
console.log(failures.length ? `\n${failures.length} problem(s) found.` : "\nAll checks passed.");
process.exit(failures.length ? 1 : 0);
