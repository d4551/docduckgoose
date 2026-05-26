import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dir, "..");
const SVG = join(ROOT, "brand", "goose-mark.svg");
const OUT = join(ROOT, "dist", "icons");

mkdirSync(OUT, { recursive: true });

const sizes = [
  { name: "pwa-192", size: 192 },
  { name: "pwa-512", size: 512 },
  { name: "android-mdpi", size: 48 },
  { name: "android-hdpi", size: 72 },
  { name: "android-xhdpi", size: 96 },
  { name: "android-xxhdpi", size: 144 },
  { name: "android-xxxhdpi", size: 192 },
  { name: "ios-1024", size: 1024 },
] as const;

const svgBuffer = await Bun.file(SVG).arrayBuffer();

for (const entry of sizes) {
  const pngPath = join(OUT, `${entry.name}.png`);
  await sharp(Buffer.from(svgBuffer))
    .resize(entry.size, entry.size, { fit: "contain", background: "#0f172a" })
    .png()
    .toFile(pngPath);
  console.log(pngPath);
}

console.log("Brand icons rendered");
