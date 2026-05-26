import type { ValidatorContext } from "../context.ts";

const VAR_DECL_PATTERN = /(^|\n)\s*var\s+/;

export const noTdzRisks = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];

  for (const path of ctx.policyTsFiles()) {
    const contents = await ctx.readFile(path);
    if (VAR_DECL_PATTERN.test(contents)) {
      violations.push(`${path}: var declarations are forbidden (TDZ risk)`);
    }
  }

  ctx.failAll(violations, "no-tdz-risks violations");
};
