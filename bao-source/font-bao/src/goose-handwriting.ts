import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import {
  buildDefaultHandwritingGlyphs,
  buildHandwritingFont,
  encodeFontToWoff2,
  segmentSheetIntoGlyphs,
} from "../handwriting-creator/create-from-sheet.ts";
import {
  HANDWRITING_FONT_DIR,
  HANDWRITING_FONT_FAMILY,
} from "./handwriting-creator/alphabet-spec.ts";

export const GOOSE_HANDWRITING_FAMILY = HANDWRITING_FONT_FAMILY;
export const GOOSE_HANDWRITING_DIR = HANDWRITING_FONT_DIR;
export const GOOSE_HANDWRITING_WOFF2 = "goose-hand-latin-400-normal.woff2";

export const GOOSE_HANDWRITING = {
  name: GOOSE_HANDWRITING_DIR,
  family: GOOSE_HANDWRITING_FAMILY,
  weights: [400] as const,
  styles: ["normal"] as const,
};
