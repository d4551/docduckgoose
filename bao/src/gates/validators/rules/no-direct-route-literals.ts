import type { ValidatorContext } from "../context.ts";
import { DIRECT_ROUTE_PATTERN } from "../patterns.ts";

/** Lines starting with these prefixes are comments. */
const isCommentLine = (line: string): boolean => {
  const trimmed = line.trimStart();
  return trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*");
};

/** Scan non-comment code lines for route literal matches. */
const hasNonCommentRouteMatch = (contents: string): boolean => {
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
    if (!isCommentLine(line) && DIRECT_ROUTE_PATTERN.test(line)) {
      return true;
    }
  }
  return false;
};

export const noDirectRouteLiterals = async (ctx: ValidatorContext): Promise<void> => {
  const routeExclusion = ctx.config.routeExclusionPath ?? "src/config/routes.ts";
  const files = ctx.srcFiles().filter((path) => !path.endsWith(routeExclusion));
  const violations: string[] = [];

  for (const path of files) {
    if (hasNonCommentRouteMatch(await ctx.readFile(path))) {
      violations.push(path);
    }
  }

  ctx.failAll(violations, "direct route literals found outside config/routes.ts");
};
