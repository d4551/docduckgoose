import type { ValidatorContext } from "../context.ts";
import { checkSwapLine } from "../helpers.ts";

export const htmxSwapCompleteness = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];

  for (const path of ctx.htmlFiles()) {
    const lines = (await ctx.readFile(path)).split("\n");

    for (let i = 0; i < lines.length; i += 1) {
      if (checkSwapLine(lines, i)) {
        violations.push(`${path}:${i + 1}`);
      }
    }
  }

  ctx.failAll(violations, "hx-get/post with hx-target but missing hx-swap");
};
