import type { ValidatorContext } from "../context.ts";
import { RETIRED_PATTERN } from "../patterns.ts";

/** patterns.ts defines the retired patterns — self-referential false positive if scanned. */
const PATTERN_DEFINITION_PATH = "src/gates/validators/patterns.ts";

export const noRetiredPatterns = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(
      RETIRED_PATTERN,
      ctx.srcFiles().filter((path) => path !== PATTERN_DEFINITION_PATH),
    ),
    "retired daisyUI v4 or config patterns found",
  );
};
