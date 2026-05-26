import type { ValidatorContext } from "../context.ts";
import { stripCodeComments } from "../helpers.ts";
import { HARDCODED_ATTRIBUTE_STRING_PATTERN, HARDCODED_USER_STRING_PATTERN } from "../patterns.ts";

export const noHardcodedUserStrings = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];

  for (const path of ctx.htmlFiles()) {
    const contents = stripCodeComments(await ctx.readFile(path));

    if (
      HARDCODED_USER_STRING_PATTERN.test(contents) ||
      HARDCODED_ATTRIBUTE_STRING_PATTERN.test(contents)
    ) {
      violations.push(path);
    }
  }

  ctx.failAll(violations, "possible hardcoded user-facing strings");
};
