/**
 * Coverage for the canonical asset-pack target-kind discriminator.
 * Used by boot-time auto-install paths to filter manifest targets
 * routed through the four UI/UX handlers.
 */

import { describe, expect, it } from "bun:test";
import { ASSET_PACK_TARGET_KINDS, isAssetPackKind } from "../src/asset-pack-kinds.ts";

describe("ASSET_PACK_TARGET_KINDS", () => {
  it("names exactly four canonical UI/UX kinds", () => {
    expect(Object.keys(ASSET_PACK_TARGET_KINDS).sort()).toEqual([
      "densityPreset",
      "designTokens",
      "motionPreset",
      "themePack",
    ]);
    expect(ASSET_PACK_TARGET_KINDS.themePack).toBe("theme-pack");
    expect(ASSET_PACK_TARGET_KINDS.designTokens).toBe("design-tokens");
    expect(ASSET_PACK_TARGET_KINDS.motionPreset).toBe("motion-preset");
    expect(ASSET_PACK_TARGET_KINDS.densityPreset).toBe("density-preset");
  });
});

describe("isAssetPackKind", () => {
  it("accepts every canonical asset-pack kind", () => {
    expect(isAssetPackKind("theme-pack")).toBe(true);
    expect(isAssetPackKind("design-tokens")).toBe(true);
    expect(isAssetPackKind("motion-preset")).toBe(true);
    expect(isAssetPackKind("density-preset")).toBe(true);
  });

  it("rejects non-asset-pack target kinds", () => {
    expect(isAssetPackKind("htmx-extension")).toBe(false);
    expect(isAssetPackKind("sidebar")).toBe(false);
    expect(isAssetPackKind("bao-package")).toBe(false);
    expect(isAssetPackKind("")).toBe(false);
    expect(isAssetPackKind("THEME-PACK")).toBe(false);
  });
});
