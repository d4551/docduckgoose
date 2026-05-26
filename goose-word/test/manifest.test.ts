import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { GOOSE_WORD_CLIENT_ASSETS } from "@baohaus/goose-word-ui-bao/manifest";

const CLIENT_DIR = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "client",
);

describe("GOOSE_WORD_CLIENT_ASSETS manifest integrity", () => {
  const entries = Object.entries(GOOSE_WORD_CLIENT_ASSETS);

  it("manifest has at least one entry", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  for (const [key, filename] of entries) {
    it(`${key} -> ${filename} exists in public/client/`, () => {
      const filePath = join(CLIENT_DIR, filename);
      expect(existsSync(filePath)).toBe(true);
    });
  }

  it("all entries map to .js files", () => {
    for (const [, filename] of entries) {
      expect(filename).toMatch(/\.js$/);
    }
  });
});
