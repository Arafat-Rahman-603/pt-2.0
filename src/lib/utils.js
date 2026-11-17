/** Tiny className joiner (no dependency). */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Clamp a number between min and max. */
export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/** True for absolute http(s) links. */
export const isExternal = (href = "") => /^https?:\/\//.test(href);

/** "#22d3ee" -> "34,211,238" (for rgba() strings) */
export function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}
