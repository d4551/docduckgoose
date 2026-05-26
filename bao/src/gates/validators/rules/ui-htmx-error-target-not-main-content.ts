/**
 * `ui-htmx-error-target-not-main-content`
 *
 * Mutating forms must surface validation/server errors in a dedicated live
 * alert region — not in the shell-wide `#main-content` target. Re-rendering
 * the entire main content on a failed submit blows away the form, scroll
 * position, and partially-typed inputs.
 *
 * This rule fails when any `hx-target-error` points at the shell main-content
 * id (literal `#main-content` or the `MAIN_CONTENT_ID` constant). The
 * canonical pattern is:
 *
 *   <div id="my-form-errors" role="alert" aria-live="polite" class="empty:hidden"></div>
 *   <form ... hx-target-error="#my-form-errors">…</form>
 *
 * Phase-1.2 migration target. Replaces the lenient acceptance in
 * `htmx-form-contracts` (which currently treats `#main-content` as valid).
 */

import type { ValidatorContext } from "../context.ts";

const TARGET_ERROR_PATTERN = /hx-target-error="(?<value>[^"]+)"/gu;

const isMainContentTarget = (value: string): boolean => {
  if (value === "#main-content") {
    return true;
  }
  // Template-string variants — `#${MAIN_CONTENT_ID}` resolves to `#main-content`.
  if (value.includes("MAIN_CONTENT_ID")) {
    return true;
  }
  return false;
};

const extractLineNumber = (contents: string, matchIndex: number): number =>
  contents.slice(0, matchIndex).split("\n").length;

export const uiHtmxErrorTargetNotMainContent = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];

  for (const path of ctx.htmlFiles()) {
    const contents = await ctx.readFile(path);
    for (const match of contents.matchAll(TARGET_ERROR_PATTERN)) {
      const value = match.groups?.value;
      if (typeof value !== "string") {
        continue;
      }
      if (isMainContentTarget(value)) {
        const line = extractLineNumber(contents, match.index ?? 0);
        violations.push(
          `${path}:${line} hx-target-error points at "${value}" — use a per-form #<form>-errors live region instead`,
        );
      }
    }
  }

  ctx.failAll(violations, "hx-target-error must not target shell main-content");
};
