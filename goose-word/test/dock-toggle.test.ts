import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const DOCK_TOGGLE_JS = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "client",
  "dock-toggle.js",
);

const js = readFileSync(DOCK_TOGGLE_JS, "utf8");

describe("dock-toggle.js", () => {
  it("toggles dock with Control+Shift+D and defaults shown", () => {
    expect(js).toContain("ctrlKey");
    expect(js).toContain("shiftKey");
    expect(js).toContain('event.key.toLowerCase() === "d"');
    expect(js).toContain("data-gw-dock-toggle");
    expect(js).toContain("aria-pressed");
    expect(js).toContain("setDockHidden(false)");
  });

  it("contains no try/catch, .catch, localStorage, or sessionStorage", () => {
    expect(/\btry\s*\{/.test(js)).toBe(false);
    expect(/\bcatch\s*\(/.test(js)).toBe(false);
    expect(/\.catch\s*\(/.test(js)).toBe(false);
    expect(js).not.toContain("localStorage");
    expect(js).not.toContain("sessionStorage");
  });
});
