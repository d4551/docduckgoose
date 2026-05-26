import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const SPECULAR_JS_PATH = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "client",
  "glass-specular.js",
);

const js = readFileSync(SPECULAR_JS_PATH, "utf8");

describe("glass-specular.js correctness", () => {
  it("POINTER_CLAMP is set to 6", () => {
    expect(js).toMatch(/const\s+POINTER_CLAMP\s*=\s*6\s*;/);
  });

  it("TILT_CLAMP is set to 3", () => {
    expect(js).toMatch(/const\s+TILT_CLAMP\s*=\s*3\s*;/);
  });

  it("contains no try keyword", () => {
    const tryPattern = /\btry\s*\{/g;
    expect(tryPattern.test(js)).toBe(false);
  });

  it("contains no catch keyword", () => {
    const catchPattern = /\bcatch\s*\(/g;
    expect(catchPattern.test(js)).toBe(false);
  });

  it("contains no .catch() calls", () => {
    const dotCatchPattern = /\.catch\s*\(/g;
    expect(dotCatchPattern.test(js)).toBe(false);
  });

  it("contains no console.log calls", () => {
    expect(js).not.toMatch(/\bconsole\.log\b/);
  });

  it("contains no console.warn calls", () => {
    expect(js).not.toMatch(/\bconsole\.warn\b/);
  });

  it("contains no console.error calls", () => {
    expect(js).not.toMatch(/\bconsole\.error\b/);
  });

  it("contains no console.debug calls", () => {
    expect(js).not.toMatch(/\bconsole\.debug\b/);
  });

  it("respects prefers-reduced-motion via motionQuery", () => {
    expect(js).toContain("prefers-reduced-motion: reduce");
    expect(js).toContain("motionQuery.matches");
  });

  it("removes specular properties when motion is reduced", () => {
    expect(js).toContain('removeProperty("--bao-glass-spec-x")');
    expect(js).toContain('removeProperty("--bao-glass-spec-y")');
  });

  it("listens for device orientation events", () => {
    expect(js).toContain("deviceorientation");
  });

  it("uses requestAnimationFrame for scheduling", () => {
    expect(js).toContain("requestAnimationFrame");
  });
});
