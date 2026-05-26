import type { ValidatorContext } from "../context.ts";
import { SUPPRESSION_DIRECTIVE_PATTERN } from "../patterns.ts";

export const noTsIgnore = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(SUPPRESSION_DIRECTIVE_PATTERN, ctx.policyTsFiles()),
    "TypeScript or Biome suppression directives found",
  );
};
