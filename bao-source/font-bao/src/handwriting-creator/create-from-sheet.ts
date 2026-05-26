import opentype from "opentype.js";
import {
  HANDWRITING_CELL_SIZE,
  HANDWRITING_FONT_FAMILY,
  HANDWRITING_GLYPH_ORDER,
  HANDWRITING_GRID_COLUMNS,
} from "./alphabet-spec.ts";

type Point = { readonly x: number; readonly y: number };

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const hashChar = (value: string): number => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const wave = (seed: number, phase: number): number =>
  Math.sin(phase * Math.PI * 2 + seed * 0.17) * 0.08;

const buildHandwrittenPath = (char: string): opentype.Path => {
  const path = new opentype.Path();
  const seed = hashChar(char);
  const upper = char.toUpperCase();
  const width = 520;
  const baseline = 80;
  const capHeight = 420;

  if (char === " ") {
    return path;
  }

  if (char >= "0" && char <= "9") {
    const digit = Number(char);
    const cx = 260;
    const cy = 250;
    const rx = 180 + wave(seed, 0.1) * 40;
    const ry = 220 + wave(seed, 0.2) * 30;
    path.moveTo(cx + rx, cy);
    for (let step = 1; step <= 8; step += 1) {
      const angle = (step / 8) * Math.PI * 2;
      path.lineTo(cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry);
    }
    path.lineTo(cx + rx - 20 - digit * 4, cy - 40);
    return path;
  }

  if (".,!?:-'\"()".includes(char)) {
    const x = 240 + wave(seed, 0.3) * 30;
    const y = char === "." || char === "," ? 60 : 260;
    path.moveTo(x, y);
    path.lineTo(x + 40, y + (char === "!" ? 180 : 20));
    if (char === "?") {
      path.moveTo(180, 320);
      path.quadraticCurveTo(320, 520, 260, 300);
      path.moveTo(250, 80);
      path.lineTo(270, 80);
    }
    return path;
  }

  const isLower = char === char.toLowerCase() && char !== upper;
  const top = isLower ? 280 : 40;
  const height = isLower ? 220 : capHeight;
  const left = 80 + wave(seed, 0.05) * 20;
  const right = width - 80 - wave(seed, 0.15) * 20;

  path.moveTo(left, baseline);
  path.quadraticCurveTo(
    left + wave(seed, 0.2) * 60,
    top + wave(seed, 0.4) * 40,
    lerp(left, right, 0.35),
    top + height * 0.15,
  );
  path.quadraticCurveTo(
    lerp(left, right, 0.65) + wave(seed, 0.55) * 50,
    top + height * 0.55,
    right,
    baseline - 20,
  );

  if ("BDPQR".includes(upper)) {
    path.moveTo(left + 20, top + 20);
    path.quadraticCurveTo(right - 40, top + 40, right - 30, baseline - 120);
    path.quadraticCurveTo(left + 80, baseline - 40, left + 20, baseline - 10);
  }

  if ("acegmnopqrsu".includes(char)) {
    path.moveTo(right - 40, baseline - 10);
    path.quadraticCurveTo(
      left + 60,
      baseline + 80 + wave(seed, 0.7) * 20,
      left + 30,
      baseline - 40,
    );
  }

  if (upper === "T" || upper === "E" || upper === "F") {
    path.moveTo(left, top + 30);
    path.lineTo(right, top + 35 + wave(seed, 0.25) * 10);
  }

  if (upper === "X" || upper === "K") {
    path.moveTo(left, top + 20);
    path.lineTo(right, baseline - 20);
    path.moveTo(right, top + 20);
    path.lineTo(left, baseline - 20);
  }

  return path;
};

const traceBitmapGlyph = (pixels: Uint8Array, width: number, height: number): opentype.Path => {
  const path = new opentype.Path();
  let started = false;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 1) {
      const alpha = pixels[(y * width + x) * 4 + 3] ?? 0;
      if (alpha < 48) {
        continue;
      }
      const px = (x / width) * 520 + 20;
      const py = 460 - (y / height) * 420;
      if (started) {
        path.lineTo(px, py);
      } else {
        path.moveTo(px, py);
        started = true;
      }
    }
  }
  if (!started) {
    return buildHandwrittenPath("?");
  }
  return path;
};

export const buildGlyphPathFromChar = (char: string): opentype.Path => buildHandwrittenPath(char);

export const buildGlyphPathFromCell = (
  pixels: Uint8Array,
  width: number,
  height: number,
  char: string,
): opentype.Path => {
  const traced = traceBitmapGlyph(pixels, width, height);
  if (traced.commands.length === 0) {
    return buildHandwrittenPath(char);
  }
  return traced;
};

export const buildHandwritingFont = (
  glyphPaths: ReadonlyMap<string, opentype.Path>,
): opentype.Font => {
  const notdef = new opentype.Path();
  notdef.moveTo(100, 0);
  notdef.lineTo(500, 0);
  notdef.lineTo(500, 500);
  notdef.lineTo(100, 500);
  notdef.close();

  const glyphs: opentype.Glyph[] = [
    new opentype.Glyph({
      name: ".notdef",
      unicode: 0,
      advanceWidth: 600,
      path: notdef,
    }),
  ];

  for (const char of HANDWRITING_GLYPH_ORDER) {
    if (char === " ") {
      glyphs.push(
        new opentype.Glyph({
          name: "space",
          unicode: 32,
          advanceWidth: 260,
          path: new opentype.Path(),
        }),
      );
      continue;
    }
    const path = glyphPaths.get(char) ?? buildHandwrittenPath(char);
    glyphs.push(
      new opentype.Glyph({
        name: `uni${char.charCodeAt(0).toString(16).toUpperCase()}`,
        unicode: char.charCodeAt(0),
        advanceWidth: 560 + wave(hashChar(char), 0.9) * 40,
        path,
      }),
    );
  }

  return new opentype.Font({
    familyName: HANDWRITING_FONT_FAMILY,
    styleName: "Regular",
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    glyphs,
  });
};

export const segmentSheetIntoGlyphs = async (
  sheetPath: string,
): Promise<Map<string, opentype.Path>> => {
  const sharp = (await import("sharp")).default;
  const image = sharp(sheetPath).ensureAlpha();
  const metadata = await image.metadata();
  const width = metadata.width ?? HANDWRITING_GRID_COLUMNS * HANDWRITING_CELL_SIZE;
  const height = metadata.height ?? 512;
  const cellWidth = Math.floor(width / HANDWRITING_GRID_COLUMNS);
  const cellHeight = Math.floor(
    height / Math.ceil(HANDWRITING_GLYPH_ORDER.length / HANDWRITING_GRID_COLUMNS),
  );
  const raw = await image.raw().toBuffer();
  const glyphPaths = new Map<string, opentype.Path>();

  for (let index = 0; index < HANDWRITING_GLYPH_ORDER.length; index += 1) {
    const char = HANDWRITING_GLYPH_ORDER[index];
    if (char === " ") {
      continue;
    }
    const col = index % HANDWRITING_GRID_COLUMNS;
    const row = Math.floor(index / HANDWRITING_GRID_COLUMNS);
    const left = col * cellWidth;
    const top = row * cellHeight;
    const cell = await sharp(raw, {
      raw: { width, height, channels: 4 },
    })
      .extract({ left, top, width: cellWidth, height: cellHeight })
      .raw()
      .toBuffer({ resolveWithObject: true });
    glyphPaths.set(
      char,
      buildGlyphPathFromCell(cell.data, cell.info.width, cell.info.height, char),
    );
  }

  return glyphPaths;
};

export const buildDefaultHandwritingGlyphs = (): Map<string, opentype.Path> => {
  const glyphPaths = new Map<string, opentype.Path>();
  for (const char of HANDWRITING_GLYPH_ORDER) {
    if (char === " ") {
      continue;
    }
    glyphPaths.set(char, buildHandwrittenPath(char));
  }
  return glyphPaths;
};

export const encodeFontToWoff2 = async (font: opentype.Font): Promise<Uint8Array> => {
  const ttf = font.toArrayBuffer();
  const wawoff2 = await import("wawoff2");
  const compressed = await wawoff2.compress(Buffer.from(ttf));
  return new Uint8Array(compressed);
};
