import type { ValidatorContext } from "../context.ts";
import {
  CDN_CDNJS_PATTERN,
  CDN_JSDELIVR_PATTERN,
  CDN_SKYPACK_PATTERN,
  CDN_UNPKG_PATTERN,
  RETIRED_PATTERN,
} from "../patterns.ts";

/** patterns.ts defines the retired patterns — self-referential false positive if scanned. */
const PATTERN_DEFINITION_PATH = "src/gates/validators/patterns.ts";

export const noRetiredPatterns = async (ctx: ValidatorContext): Promise<void> => {
  const files = ctx.srcFiles().filter((path) => path !== PATTERN_DEFINITION_PATH);
  const matches = [
    ...(await ctx.findAllMatches(RETIRED_PATTERN, files)),
    ...(await ctx.findAllMatches(CDN_UNPKG_PATTERN, files)),
    ...(await ctx.findAllMatches(CDN_CDNJS_PATTERN, files)),
    ...(await ctx.findAllMatches(CDN_JSDELIVR_PATTERN, files)),
    ...(await ctx.findAllMatches(CDN_SKYPACK_PATTERN, files)),
  ];
  ctx.failAll(matches, "retired daisyUI v4, config, or CDN patterns found");
};
