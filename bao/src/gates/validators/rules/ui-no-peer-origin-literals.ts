/**
 * `ui-no-peer-origin-literals`
 *
 * Cross-app URL composition must flow through
 * `@baohaus/bao-config/ecosystem-urls` (the canonical builder seam).
 * Direct `https://*.bao.haus/...` URL literals in implementation paths
 * fragment the ecosystem-link contract and bypass per-env origin resolution.
 *
 * Exempt:
 *   - `bao-source/bao-config/src/ecosystem-urls.ts` (the canonical seam)
 *   - `bao-source/bao-config/src/ecosystem-links.config.ts` (env reader)
 *   - any `*.md` documentation, fixtures, or test files
 *   - generated artifacts under `dist/`, `build/`, `.generated/`
 */

import type { ValidatorContext } from "../context.ts";

const PEER_ORIGIN_LITERAL_PATTERN = /https?:\/\/[a-zA-Z0-9.-]+\.bao\.haus(?:\/[^\s"'`]*)?/g;

const ALLOWED_PATH_SUFFIXES: readonly string[] = [
  "bao-source/bao-config/src/ecosystem-urls.ts",
  "bao-source/bao-config/src/ecosystem-links.config.ts",
];

const isAllowedFile = (path: string): boolean => {
  if (path.endsWith(".md") || path.endsWith(".test.ts") || path.endsWith(".test.tsx")) {
    return true;
  }
  if (path.includes("/dist/") || path.includes("/build/") || path.includes("/.generated/")) {
    return true;
  }
  return ALLOWED_PATH_SUFFIXES.some((suffix) => path.endsWith(suffix));
};

const extractLineNumber = (contents: string, matchIndex: number): number =>
  contents.slice(0, matchIndex).split("\n").length;

export const uiNoPeerOriginLiterals = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];

  for (const path of ctx.srcFiles()) {
    if (isAllowedFile(path)) {
      continue;
    }
    const contents = await ctx.readFile(path);
    for (const match of contents.matchAll(PEER_ORIGIN_LITERAL_PATTERN)) {
      const line = extractLineNumber(contents, match.index ?? 0);
      violations.push(
        `${path}:${line} literal bao.haus URL "${match[0]}" — compose via @baohaus/bao-config/ecosystem-urls helpers`,
      );
    }
  }

  ctx.failAll(violations, "peer-origin URL literals must flow through ecosystem-urls helpers");
};
