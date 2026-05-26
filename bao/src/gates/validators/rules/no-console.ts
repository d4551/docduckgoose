import type { ValidatorContext } from "../context.ts";
import { CONSOLE_PATTERN } from "../patterns.ts";

export const noConsole = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(CONSOLE_PATTERN, ctx.policyTsFiles()),
    "console output statements found",
  );
};
