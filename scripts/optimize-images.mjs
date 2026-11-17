/**
 * One-off asset pipeline.
 *
 *   node scripts/optimize-images.mjs
 *
 * 1. Chroma-keys the generated 3D avatar (green screen -> transparent WebP).
 * 2. Produces a smoothed, small depth map used by the WebGL portrait shader.
 * 3. Converts every PNG/JPG in public/images/projects to a resized WebP.
 *
 * Source files that are not needed at runtime live in /assets-src.
 */
import sharp from "sharp";
import { readdir, unlink, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "assets-src");
const profileOut = path.join(root, "public/images/profile");
const projectsDir = path.join(root, "public/images/projects");

await mkdir(profileOut, { recursive: true });

/* ── 1. Avatar chroma key ───────────────────────────────── */
async function keyAvatar() {
  const input = path.join(src, "avatar-3d-greenscreen.jpg");
  if (!existsSync(input)) return console.log("skip avatar (no source)");

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const spill = g - Math.max(r, b); // how "green" this pixel is
    // full key above 90, soft edge between 25..90
    let a = 1 - Math.min(1, Math.max(0, (spill - 25) / 65));
    if (a < 0.04) a = 0;
    data[i + 3] = Math.round(a * 255);
    // de-spill: clamp green so edges don't glow green
    if (spill > 0) data[i + 1] = Math.max(r, b) + Math.round(spill * 0.15);
  }

  await sharp(data, { raw: info })
    .resize({ width: 820 })
    .webp({ quality: 86, alphaQuality: 90, effort: 6 })
    .toFile(path.join(profileOut, "avatar-3d.webp"));
  console.log("✓ avatar-3d.webp");
}

/* ── 2. Depth map ───────────────────────────────────────── */
async function depthMap() {
  const input = path.join(src, "avatar-3d-depth.jpg");
  if (!existsSync(input)) return console.log("skip depth (no source)");
  await sharp(input)
    .grayscale()
    .resize({ width: 410 })
    .blur(2.2) // smooth displacement, no stair-stepping
    .webp({ quality: 80 })
    .toFile(path.join(profileOut, "avatar-3d-depth.webp"));
  console.log("✓ avatar-3d-depth.webp");
}

/* ── 3. Project screenshots ─────────────────────────────── */
async function projects() {
  const files = await readdir(projectsDir);
  for (const file of files) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const from = path.join(projectsDir, file);
    const to = path.join(projectsDir, file.replace(/\.(png|jpe?g)$/i, ".webp"));
    await sharp(from)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(to);
    await unlink(from);
    console.log("✓", path.basename(to));
  }
}

await keyAvatar();
await depthMap();
await projects();
