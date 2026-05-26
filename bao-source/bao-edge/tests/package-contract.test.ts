import { describe, expect, test } from "bun:test";
import { readdirSync } from "node:fs";
import { join } from "node:path";

interface ExportEntry {
  readonly bun: string;
  readonly import: string;
  readonly types: string;
  readonly default: string;
}

interface PackageJson {
  readonly name: string;
  readonly scripts: Record<string, string>;
  readonly exports: Record<string, ExportEntry>;
  readonly files: readonly string[];
}

async function packageJson(): Promise<PackageJson> {
  return Bun.file(new URL("../package.json", import.meta.url)).json();
}

function sourceFileCount(directory: string): number {
  return readdirSync(directory, { withFileTypes: true }).reduce((count, entry) => {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      return count + sourceFileCount(entryPath);
    }
    return entry.name.endsWith(".ts") ? count + 1 : count;
  }, 0);
}

describe("package contract", () => {
  test("ships built dist exports and keeps source fixtures active", async () => {
    const pkg = await packageJson();
    expect(pkg.name).toBe("@baohaus/bao-edge");
    expect(pkg.scripts.test).toBe("bun test");
    expect(pkg.files.includes("dist")).toBe(true);
    expect(sourceFileCount(new URL("../src", import.meta.url).pathname)).toBeGreaterThan(0);

    for (const entry of Object.values(pkg.exports)) {
      expect(entry.bun.startsWith("./dist/")).toBe(true);
      expect(entry.import.startsWith("./dist/")).toBe(true);
      expect(entry.default.startsWith("./dist/")).toBe(true);
      expect(entry.types.startsWith("./dist/")).toBe(true);
      expect(entry.bun.endsWith(".js")).toBe(true);
      expect(entry.types.endsWith(".d.ts")).toBe(true);
    }
  });
});
