import type { ValidatorContext } from "../context.ts";
import { CATCH_BLOCK_PATTERN, DOT_CATCH_PATTERN, TRY_BLOCK_PATTERN } from "../patterns.ts";

export const noBareTryCatch = async (ctx: ValidatorContext): Promise<void> => {
  const files = ctx.policyTsFiles();
  const matches = [
    ...(await ctx.findAllMatches(TRY_BLOCK_PATTERN, files)),
    ...(await ctx.findAllMatches(CATCH_BLOCK_PATTERN, files)),
    ...(await ctx.findAllMatches(DOT_CATCH_PATTERN, files)),
  ];
  ctx.failAll(matches, "try/catch blocks found (use framework-native error propagation)");
};
