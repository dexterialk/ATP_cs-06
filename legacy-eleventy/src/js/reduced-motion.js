// Reads the user's reduced-motion preference once and exposes a single flag.
//
// CSS handles live changes to the setting through
// @media (prefers-reduced-motion). The JavaScript behaviour (pinning, ball
// movement) follows the value at page load. A reload picks up a new setting.

const query = typeof window !== "undefined" && window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)")
  : null;

export const prefersReducedMotion = Boolean(query?.matches);
