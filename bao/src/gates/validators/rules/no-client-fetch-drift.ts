import type { ValidatorContext } from "../context.ts";
import { BUNDLE_HEADER_PATTERNS, RAW_FETCH_PATTERN } from "../patterns.ts";

// .bao-first SSOT cutover (subtask 2): API bundle header patterns now from .bao fabric patterns.ts
// Eliminated parallel local const. Consume for client API / fetch drift gate.

const fileHeaderIndicatesBundle = async (ctx: ValidatorContext, path: string): Promise<boolean> => {
  if (!path.endsWith(".js")) {
    return false;
  }
  const contents = await ctx.readFile(path);
  const firstLine = contents.split("\n", 1)[0] ?? "";
  return BUNDLE_HEADER_PATTERNS.some((pattern) => pattern.test(firstLine));
};

export const noClientFetchDrift = async (ctx: ValidatorContext): Promise<void> => {
  const allowedFiles = ctx.config.allowedClientFetchFiles ?? new Set<string>();
  const candidates = ctx.clientCodeFiles().filter((path) => !allowedFiles.has(path));
  const scanTargets: string[] = [];
  for (const path of candidates) {
    if (await fileHeaderIndicatesBundle(ctx, path)) {
      continue;
    }
    scanTargets.push(path);
  }
  ctx.failAll(await ctx.findAllMatches(RAW_FETCH_PATTERN, scanTargets), "raw fetch() usage found");
};
