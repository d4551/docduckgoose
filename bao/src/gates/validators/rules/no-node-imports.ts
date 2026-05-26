import type { ValidatorContext } from "../context.ts";
import { NODE_IMPORT_PATTERN } from "../patterns.ts";

export const noNodeImports = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    await ctx.findAllMatches(NODE_IMPORT_PATTERN, ctx.clientCodeFiles()),
    "node: imports found in client code (use browser-native APIs)",
  );
};
