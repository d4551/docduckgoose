import type { ValidatorContext } from "../context.ts";
import { DEBUG_MARKER_PATTERN } from "../patterns.ts";

/** Self-referential exclusions: patterns.ts defines the marker terms; this rule file matches its own name. */
const SELF_REFERENTIAL_PATHS = new Set([
  "src/gates/validators/patterns.ts",
  "src/gates/validators/rules/no-debug-markers.ts",
]);

export const noDebugMarkers = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(
      DEBUG_MARKER_PATTERN,
      ctx.srcFiles().filter((path) => !SELF_REFERENTIAL_PATHS.has(path)),
    ),
    "debug markers found",
  );
};
