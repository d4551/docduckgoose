import type { ValidatorContext } from "../context.ts";
import {
  SENSITIVE_KEY_PATTERN,
  STORAGE_KEY_PATTERN,
  UNSAFE_STORAGE_PATTERN,
} from "../patterns.ts";

// .bao-first SSOT cutover (subtask 2): storage + auth key patterns now from .bao fabric patterns.ts
// Eliminated parallel local regex. Full consume, no deletion.

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
