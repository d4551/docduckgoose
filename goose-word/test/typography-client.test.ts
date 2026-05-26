import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const TYPOGRAPHY_JS = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "client",
  "typography.js",
);

const js = readFileSync(TYPOGRAPHY_JS, "utf8");

describe("typography.js font controls", () => {
  it("filters and favorites editor fonts through preferences", () => {
    expect(js).toContain("data-gw-font-filter");
    expect(js).toContain("filterFonts");
    expect(js).toContain("favoriteEditorFonts");
    expect(js).toContain("data-gw-font-favorite");
  });
});
