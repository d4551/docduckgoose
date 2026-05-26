import type { ValidatorContext } from "../context.ts";
import { TRY_BLOCK_PATTERN } from "../patterns.ts";

export const noBareTryCatch = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(TRY_BLOCK_PATTERN, ctx.policyTsFiles()),
    "try/catch blocks found (use framework-native error propagation)",
  );
};
