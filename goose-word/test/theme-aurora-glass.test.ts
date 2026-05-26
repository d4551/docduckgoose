import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const DAISY_CSS_PATH = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "styles",
  "goose-daisy.css",
);

const TOKENS_CSS_PATH = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "baohaus-design-tokens-aurora-bao",
  "assets",
  "baohaus-aurora-tokens.css",
);

const APP_CSS_PATH = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "styles",
  "goose-app.css",
);

describe("bao-aurora-glass theme wiring", () => {
  const daisyCss = readFileSync(DAISY_CSS_PATH, "utf8");
  const tokensCss = readFileSync(TOKENS_CSS_PATH, "utf8");
  const appCss = readFileSync(APP_CSS_PATH, "utf8");

  it("goose-daisy.css defines daisy theme selector for bao-aurora-glass", () => {
    expect(daisyCss).toMatch(/\[data-theme=bao-aurora-glass\]/);
    expect(daisyCss).toMatch(
      /\[data-theme=bao-aurora-glass\][^{]*\{[^}]*--color-base-100:(?:color-mix|oklch\([^)]*\/)/,
    );
  });

  it("aurora tokens override --bao-glass-* when glass theme is active", () => {
    expect(tokensCss).toContain('[data-theme="bao-aurora-glass"]');
    expect(tokensCss).toMatch(/\[data-theme="bao-aurora-glass"\][^{]*\{[^}]*--bao-glass-blur:/);
  });

  it("goose-app routes panel surfaces through --gw-surface-* aliases", () => {
    expect(appCss).toContain("--gw-surface-bg: var(--bao-glass-bg)");
    expect(appCss).toContain("var(--gw-surface-bg, var(--color-base-100))");
  });

  it("goose-app keeps aurora themes on light palette under prefers-color-scheme dark", () => {
    expect(appCss).toContain("@media (prefers-color-scheme: dark)");
    expect(appCss).toContain('html[data-theme="bao-aurora-glass"]');
    expect(appCss).toMatch(
      /html\[data-theme="bao-aurora-glass"\][^{]*\{[^}]*--color-base-100:\s*color-mix/,
    );
  });
});
