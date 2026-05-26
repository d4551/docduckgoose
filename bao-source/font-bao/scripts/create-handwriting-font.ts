import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { GOOSE_HANDWRITING_DIR, GOOSE_HANDWRITING_WOFF2 } from "../src/goose-handwriting.ts";
import {
  buildDefaultHandwritingGlyphs,
  buildHandwritingFont,
  encodeFontToWoff2,
  segmentSheetIntoGlyphs,
} from "../src/handwriting-creator/create-from-sheet.ts";

const packageRoot = resolve(import.meta.dir, "..");
const defaultOutDir = join(packageRoot, "dist", "fonts", GOOSE_HANDWRITING_DIR);
const defaultSource = join(packageRoot, "assets", "handwriting-sheet.png");

const readArg = (flag: string): string | undefined => {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return process.argv[index + 1];
};

const outDir = readArg("--out") ?? defaultOutDir;
const sourcePath = readArg("--source");

const glyphPaths =
  sourcePath && existsSync(sourcePath)
    ? await segmentSheetIntoGlyphs(sourcePath)
    : buildDefaultHandwritingGlyphs();

const font = buildHandwritingFont(glyphPaths);
const woff2 = await encodeFontToWoff2(font);
const outputPath = join(outDir, GOOSE_HANDWRITING_WOFF2);

await mkdir(dirname(outputPath), { recursive: true });
await Bun.write(outputPath, woff2);

console.log(`Goose Hand woff2 → ${outputPath}`);
