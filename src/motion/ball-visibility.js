// Shows or hides the earlier ball-and-scroll sections kept in src/sections/_hidden-team-version (the fixed,
// scroll-moving ball layer itself has been removed). Those sections (hero, marquee, banner,
// how it works, key features, app preview, team).
//
// false = the code stays in the project but is hidden: the ball layer is not mounted and the
//         sections are rendered inside a `hidden` wrapper, so nothing shows and nothing takes space.
// true  = the original ball and scroll animations come back.
//
// The team will decide how these look later. Flip this one value to bring them back.
export const SHOW_BALL_MOTION = false;
