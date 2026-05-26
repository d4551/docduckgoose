import type { ValidatorContext } from "../context.ts";
import { DIRECT_ENV_ACCESS_PATTERN } from "../patterns.ts";

const STRING_LITERAL_PATTERN = /(["'`])(?:\\.|(?!\1).)*\1/g;

const isCommentLine = (line: string): boolean => {
  const trimmed = line.trimStart();
  return trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*");
};

const stripStringLiterals = (line: string): string => line.replace(STRING_LITERAL_PATTERN, "");

const hasDirectEnvAccessInCode = (contents: string): boolean => {
  let inBlockComment = false;
  for (const line of contents.split("\n")) {
    if (line.includes("/*") && !line.includes("*/")) {
      inBlockComment = true;
      continue;
    }
    if (inBlockComment) {
      if (line.includes("*/")) {
        inBlockComment = false;
      }
      continue;
    }
    if (!isCommentLine(line) && DIRECT_ENV_ACCESS_PATTERN.test(stripStringLiterals(line))) {
      return true;
    }
  }
  return false;
};

export const noDirectEnvAccess = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];
  const files = ctx
    .policyTsFiles()
    .filter((path) => !ctx.config.allowedDirectEnvAccessFiles.has(path));
  for (const path of files) {
    if (hasDirectEnvAccessInCode(await ctx.readFile(path))) {
      violations.push(path);
    }
  }
  ctx.failAll(violations, "direct env access found outside approved config modules");
};
