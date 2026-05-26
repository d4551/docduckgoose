import type { ValidatorContext } from "../context.ts";
import { stripCodeComments } from "../helpers.ts";
import { UNKNOWN_CAST_PATTERN, UNKNOWN_INGRESS_PATTERN } from "../patterns.ts";

export const noUnknownCasts = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];
  for (const path of ctx
    .policyTsFiles()
    .filter((path) => !ctx.config.allowedUnknownIngressFiles.has(path))) {
    const contents = stripCodeComments(await ctx.readFile(path));
    if (UNKNOWN_CAST_PATTERN.test(contents) || UNKNOWN_INGRESS_PATTERN.test(contents)) {
      violations.push(path);
    }
  }
  ctx.failAll(violations, "as-any/as-unknown/unknown-cast/unknown-ingress type escapes found");
};
