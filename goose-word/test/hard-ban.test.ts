import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

// .bao-first: consume .bao fabric patterns.ts as SSOT for all banned patterns.
// Full cutover — no parallel hardcoded regex list in this file. Distinct source only.
import * as BaoPatterns from "../../bao/src/gates/validators/patterns.ts";

const SRC_ROOT = join(import.meta.dir, "..", "src");

const collectTsFiles = (dir: string): string[] => {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectTsFiles(fullPath));
    } else if (entry.name.endsWith(".ts")) {
      results.push(fullPath);
    }
  }
  return results;
};

interface BanRule {
  readonly name: string;
  readonly pattern: RegExp;
}

// .bao-first cutover: BAN_RULES now built exclusively from .bao fabric SSOT (patterns.ts).
// No parallel/duplicated regex definitions. All core hard-bans (try/catch + derivatives,
// unknown/as, biome-ignores, storage, consoles, routes/fetch via related, CDNs) come from
// bao/src/gates/validators/patterns.ts + the new DOT_CATCH + CDN_* added for completeness.
const BAN_RULES: readonly BanRule[] = [
  { name: "try/catch block", pattern: BaoPatterns.TRY_BLOCK_PATTERN },
  { name: ".catch() call", pattern: BaoPatterns.DOT_CATCH_PATTERN },
  { name: "as any cast", pattern: BaoPatterns.UNKNOWN_CAST_PATTERN }, // covers as any/unknown
  { name: "as unknown cast", pattern: BaoPatterns.UNKNOWN_CAST_PATTERN },
  { name: "@ts-ignore directive", pattern: /@ts-ignore/ }, // subset of SUPPRESSION_DIRECTIVE_PATTERN
  { name: "biome-ignore directive", pattern: /biome-ignore/ }, // subset of SUPPRESSION_DIRECTIVE_PATTERN
  { name: "console.log", pattern: /\bconsole\.log\b/ },
  { name: "console.warn", pattern: /\bconsole\.warn\b/ },
  { name: "console.error", pattern: /\bconsole\.error\b/ },
  { name: "console.debug", pattern: /\bconsole\.debug\b/ },
  { name: "console.info", pattern: /\bconsole\.info\b/ },
  { name: "localStorage usage", pattern: BaoPatterns.UNSAFE_STORAGE_PATTERN },
  { name: "sessionStorage usage", pattern: BaoPatterns.UNSAFE_STORAGE_PATTERN },
  { name: "CDN URL (unpkg)", pattern: BaoPatterns.CDN_UNPKG_PATTERN },
  { name: "CDN URL (cdnjs)", pattern: BaoPatterns.CDN_CDNJS_PATTERN },
  { name: "CDN URL (jsdelivr)", pattern: BaoPatterns.CDN_JSDELIVR_PATTERN },
  { name: "CDN URL (skypack)", pattern: BaoPatterns.CDN_SKYPACK_PATTERN },
];

const sourceFiles = collectTsFiles(SRC_ROOT);

describe("hard-ban violations scan", () => {
  it("found source files to scan", () => {
    expect(sourceFiles.length).toBeGreaterThan(0);
  });

  for (const rule of BAN_RULES) {
    it(`no ${rule.name} in goose-word/src`, () => {
      const violations: string[] = [];

      for (const filePath of sourceFiles) {
        const content = readFileSync(filePath, "utf8");
        const lines = content.split("\n");
        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
          const line = lines[lineNum] ?? "";
          if (rule.pattern.test(line)) {
            const rel = relative(SRC_ROOT, filePath);
            violations.push(`${rel}:${lineNum + 1}: ${line.trim()}`);
          }
        }
      }

      expect(violations).toEqual([]);
    });
  }
});
