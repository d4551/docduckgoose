import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const TOKENS_CSS = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "baohaus-design-tokens-aurora-bao",
  "assets",
  "baohaus-aurora-tokens.css",
);

const css = readFileSync(TOKENS_CSS, "utf8");

describe("viewport design tokens", () => {
  it("defines goose-word viewport SSOT variables", () => {
    expect(css).toContain("--gw-viewport-compact-max-width:");
    expect(css).toContain("--gw-viewport-compact-max-height:");
    expect(css).toContain("--gw-viewport-tablet-min-dim:");
    expect(css).toContain("--gw-viewport-desktop-min-width:");
    expect(css).toContain("--gw-viewport-embedded-max-screen:");
  });
});
