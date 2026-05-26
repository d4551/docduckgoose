import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

// .bao-first SSOT cutover (subtask 2): API route literal patterns now consume from .bao fabric
// (DIRECT_ROUTE_PATTERN in patterns.ts). Eliminated parallel local array. Matches hard-ban precedent.
// Full cutover for API, no .bao deletion.

import { DIRECT_ROUTE_PATTERN } from "../../bao/src/gates/validators/patterns.ts";

const SRC_ROOT = join(import.meta.dir, "..", "src");
const ROUTES_FILE = join(SRC_ROOT, "config", "routes.ts");

const ROUTE_LITERAL_PATTERNS = [DIRECT_ROUTE_PATTERN];

const collectTsFiles = (dir: string): string[] => {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectTsFiles(fullPath));
    } else if (entry.name.endsWith(".ts") && fullPath !== ROUTES_FILE) {
      results.push(fullPath);
    }
  }
  return results;
};

describe("no route literals outside config/routes.ts", () => {
  const sourceFiles = collectTsFiles(SRC_ROOT);

  it("found source files to scan", () => {
    expect(sourceFiles.length).toBeGreaterThan(0);
  });

  it("no raw route path strings in source files", () => {
    const violations: string[] = [];

    for (const filePath of sourceFiles) {
      const content = readFileSync(filePath, "utf8");
      const lines = content.split("\n");
      for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        const line = lines[lineNum] ?? "";
        for (const pattern of ROUTE_LITERAL_PATTERNS) {
          if (pattern.test(line)) {
            const rel = relative(SRC_ROOT, filePath);
            violations.push(`${rel}:${lineNum + 1}: ${line.trim()}`);
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
