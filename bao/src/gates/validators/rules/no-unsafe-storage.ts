import type { ValidatorContext } from "../context.ts";
import { UNSAFE_STORAGE_PATTERN } from "../patterns.ts";

const STORAGE_KEY_PATTERN =
  /\b(?:localStorage|sessionStorage)\s*\.\s*(?:getItem|setItem|removeItem)\s*\(\s*(["'`])(?<key>[^"'`]+)\1/g;
const SENSITIVE_KEY_PATTERN = /\b(?:auth|bearer|credential|jwt|password|secret|session|token)\b/i;

const collectStorageKeyViolations = (
  contents: string,
  path: string,
  allowedKeys: ReadonlySet<string>,
): string[] => {
  const violations: string[] = [];
  for (const match of contents.matchAll(STORAGE_KEY_PATTERN)) {
    const key = match.groups?.key;
    if (key !== undefined && (!allowedKeys.has(key) || SENSITIVE_KEY_PATTERN.test(key))) {
      violations.push(`${path}: ${key}`);
    }
  }
  return violations;
};

export const noUnsafeStorage = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];
  const allowedKeys = ctx.config.allowedClientStorageKeys ?? new Set<string>();

  for (const path of ctx.clientCodeFiles()) {
    const contents = await ctx.readFile(path);
    if (!UNSAFE_STORAGE_PATTERN.test(contents)) {
      continue;
    }
    if (!ctx.config.allowedClientStorageFiles.has(path)) {
      violations.push(path);
      continue;
    }
    violations.push(...collectStorageKeyViolations(contents, path, allowedKeys));
  }

  ctx.failAll(violations, "unsafe client storage found");
};
