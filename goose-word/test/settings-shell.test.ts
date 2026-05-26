import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const SETTINGS_SHELL_JS = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "client",
  "settings-shell.js",
);

const js = readFileSync(SETTINGS_SHELL_JS, "utf8");

describe("settings-shell.js wiring", () => {
  it("probes shell health and reacts to viewport", () => {
    expect(js).toContain("gw-device-shell-section");
    expect(js).toContain("data-gw-shell-status");
    expect(js).toContain("badge-success");
    expect(js).toContain("textContent = labels.online");
    expect(js).toContain("gw:viewport");
    expect(js).toContain("gw:settings:sync");
  });

  it("sets htmx busy state on settings swaps", () => {
    expect(js).toContain("htmx:beforeRequest");
    expect(js).toContain("htmx:afterSwap");
    expect(js).toContain("aria-busy");
  });

  it("contains no try/catch or .catch", () => {
    expect(/\btry\s*\{/.test(js)).toBe(false);
    expect(/\.catch\s*\(/.test(js)).toBe(false);
  });
});
