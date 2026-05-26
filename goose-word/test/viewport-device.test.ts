import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const VIEWPORT_DEVICE_JS_PATH = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "client",
  "viewport-device.js",
);

const js = readFileSync(VIEWPORT_DEVICE_JS_PATH, "utf8");

describe("viewport-device.js correctness", () => {
  it("detects standard Screen Orientation API types", () => {
    expect(js).toContain("portrait-primary");
    expect(js).toContain("landscape-primary");
    expect(js).toContain("landscape-secondary");
    expect(js).toContain("portrait-secondary");
  });

  it("classifies ios android embedded and desktop devices", () => {
    expect(js).toContain('"ios"');
    expect(js).toContain('"android"');
    expect(js).toContain('"embedded"');
    expect(js).toContain('"desktop"');
    expect(js).toContain("Raspberry Pi");
  });

  it("reacts to orientation and resize changes", () => {
    expect(js).toContain("(orientation: landscape)");
    expect(js).toContain("orientationchange");
    expect(js).toContain("resize");
    expect(js).toContain("gw:viewport");
  });

  it("derives form factor from visual viewport / innerWidth not screen.width", () => {
    expect(js).toContain("readLayoutDims");
    expect(js).toContain("window.innerWidth");
    expect(js).not.toMatch(/detectFormFactor[\s\S]*Math\.min\(screen\.width/);
  });

  it("prefers matchMedia orientation before screen.orientation.type", () => {
    const readOrientationIndex = js.indexOf("const readOrientation");
    const landscapeMqIndex = js.indexOf(
      "landscapeMq.matches && !portraitMq.matches",
      readOrientationIndex,
    );
    const screenTypeIndex = js.indexOf("screenOrientation.type", readOrientationIndex);
    expect(landscapeMqIndex).toBeGreaterThan(readOrientationIndex);
    expect(screenTypeIndex).toBeGreaterThan(landscapeMqIndex);
  });

  it("reads viewport breakpoints from design tokens", () => {
    expect(js).toContain("--gw-viewport-compact-max-width");
    expect(js).toContain("--gw-viewport-tablet-min-dim");
    expect(js).toContain("--gw-viewport-desktop-min-width");
    expect(js).toContain("--gw-viewport-embedded-max-screen");
    expect(js).not.toContain("(max-width: 420px)");
  });

  it("contains no try keyword", () => {
    expect(/\btry\s*\{/.test(js)).toBe(false);
  });

  it("contains no catch keyword", () => {
    expect(/\bcatch\s*\(/.test(js)).toBe(false);
  });

  it("contains no .catch() calls", () => {
    expect(/\.catch\s*\(/.test(js)).toBe(false);
  });

  it("contains no console logging", () => {
    expect(js).not.toMatch(/\bconsole\.(log|warn|error|debug)\b/);
  });
});
