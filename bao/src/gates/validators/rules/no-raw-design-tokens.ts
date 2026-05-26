import type { ValidatorContext } from "../context.ts";
import { DESIGN_TOKEN_FILE_PATTERN, RAW_PALETTE_PATTERN } from "../patterns.ts";

/** Test fixtures intentionally contain bad patterns for validation testing. */
const TEST_FILE_PATTERN = /(^|\/)tests?\//;

export const noRawDesignTokens = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(
      RAW_PALETTE_PATTERN,
      ctx.collectFiles(DESIGN_TOKEN_FILE_PATTERN).filter((path) => !TEST_FILE_PATTERN.test(path)),
    ),
    "raw palette design tokens found",
  );
};
