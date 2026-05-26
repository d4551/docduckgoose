import type { ValidatorContext } from "../context.ts";
import { stripCodeComments } from "../helpers.ts";
import { INLINE_STYLE_PATTERN, LOCAL_STYLE_PATTERN } from "../patterns.ts";

export const noLocalStyles = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];

  for (const path of ctx.htmlFiles()) {
    const contents = stripCodeComments(await ctx.readFile(path));
    if (LOCAL_STYLE_PATTERN.test(contents) || INLINE_STYLE_PATTERN.test(contents)) {
      violations.push(path);
    }
  }

  ctx.failAll(violations, "local or inline styles found");
};
