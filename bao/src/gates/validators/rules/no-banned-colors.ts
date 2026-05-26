import type { ValidatorContext } from "../context.ts";
import { HEX_COLOR_PATTERN } from "../patterns.ts";

export const noBannedColors = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(HEX_COLOR_PATTERN, ctx.htmlFiles()),
    "hardcoded hex colors in HTML templates (use semantic daisyUI tokens)",
  );
};
