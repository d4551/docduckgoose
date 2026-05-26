import type { ValidatorContext } from "../context.ts";
import { ARBITRARY_SPACING_PATTERN } from "../patterns.ts";

export const noArbitrarySpacing = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(ARBITRARY_SPACING_PATTERN, ctx.htmlFiles()),
    "arbitrary spacing values found",
  );
};
