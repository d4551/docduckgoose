import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

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

const css = readFileSync(APP_CSS_PATH, "utf8");

describe("CSS system toggle coverage", () => {
  it("has @media (prefers-reduced-transparency: reduce) rule", () => {
    expect(css).toContain("prefers-reduced-transparency: reduce");
  });

  it("has @media (prefers-reduced-motion: reduce) rule", () => {
    expect(css).toContain("prefers-reduced-motion: reduce");
  });

  it("has @media (prefers-contrast: more) rule", () => {
    expect(css).toContain("prefers-contrast: more");
  });

  it("has data-power=low rule", () => {
    expect(css).toContain('data-power="low"');
  });

  it("prefers-reduced-transparency disables backdrop-filter", () => {
    const transparencyBlock = css.slice(css.indexOf("prefers-reduced-transparency: reduce"));
    const blockEnd = transparencyBlock.indexOf("}");
    const nextBlockEnd = transparencyBlock.indexOf("}", blockEnd + 1);
    const block = transparencyBlock.slice(0, nextBlockEnd + 1);
    expect(block).toContain("backdrop-filter: none");
  });

  it("data-power=low disables backdrop-filter", () => {
    const powerIndex = css.indexOf('data-power="low"] .bao-glass {');
    expect(powerIndex).toBeGreaterThan(-1);
    const block = css.slice(powerIndex, css.indexOf("}", powerIndex) + 1);
    expect(block).toContain("backdrop-filter: none");
  });

  it("prefers-contrast more increases glass border", () => {
    const contrastIndex = css.indexOf("prefers-contrast: more");
    expect(contrastIndex).toBeGreaterThan(-1);
    const block = css.slice(contrastIndex, css.indexOf("}", contrastIndex + 50) + 1);
    expect(block).toContain("border:");
  });

  it(".bao-glass__content has solid background rule", () => {
    const match = css.match(
      /\.bao-glass__content\s*\{[^}]*background:\s*var\(--bao-glass-bg-solid\)/,
    );
    expect(match).not.toBeNull();
  });
});
