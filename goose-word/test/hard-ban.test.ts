import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

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

const BAN_RULES: readonly BanRule[] = [
  { name: "try/catch block", pattern: /\btry\s*\{/ },
  { name: ".catch() call", pattern: /\.catch\s*\(/ },
  { name: "as any cast", pattern: /\bas\s+any\b/ },
  { name: "as unknown cast", pattern: /\bas\s+unknown\b/ },
  { name: "@ts-ignore directive", pattern: /@ts-ignore/ },
  { name: "biome-ignore directive", pattern: /biome-ignore/ },
  { name: "console.log", pattern: /\bconsole\.log\b/ },
  { name: "console.warn", pattern: /\bconsole\.warn\b/ },
  { name: "console.error", pattern: /\bconsole\.error\b/ },
  { name: "console.debug", pattern: /\bconsole\.debug\b/ },
  { name: "console.info", pattern: /\bconsole\.info\b/ },
  { name: "localStorage usage", pattern: /\blocalStorage\b/ },
  { name: "sessionStorage usage", pattern: /\bsessionStorage\b/ },
  { name: "CDN URL (unpkg)", pattern: /unpkg\.com/ },
  { name: "CDN URL (cdnjs)", pattern: /cdnjs\.cloudflare\.com/ },
  { name: "CDN URL (jsdelivr)", pattern: /cdn\.jsdelivr\.net/ },
  { name: "CDN URL (skypack)", pattern: /cdn\.skypack\.dev/ },
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
