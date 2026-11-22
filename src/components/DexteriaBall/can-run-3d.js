// Real 3D only when the device can handle it: WebGL present and not an obviously low-end phone or laptop.
// Everything else gets the still image of the ball instead.
export function canRun3D() {
  try {
    const nav = navigator;
    if ((nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) || (nav.deviceMemory && nav.deviceMemory <= 2)) return false;
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    return false;
  }
}
