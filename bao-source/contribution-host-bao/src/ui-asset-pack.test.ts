import { describe, expect, test } from "bun:test";
import type { UiAssetPackRegistration } from "@baohaus/contribution-registry-bao/ui-asset-pack";

import { createUiAssetPackHost } from "./ui-asset-pack.ts";

describe("createUiAssetPackHost", () => {
  test("stores and buckets the four canonical asset-pack kinds", () => {
    const host = createUiAssetPackHost();
    host.register({
      id: "theme-pack:baohaus-aurora-light",
      extensionId: "baohaus-aurora-light",
      kind: "theme-pack",
      themeId: "baohaus-aurora-light",
      colorScheme: "light",
      daisyUiVersionRange: "^5.0.0",
      stylesheet: "/ui/assets/baohaus-aurora-light.css",
    });
    host.register({
      id: "design-tokens:baohaus-aurora",
      extensionId: "baohaus-aurora",
      kind: "design-tokens",
      tokenSetId: "baohaus-aurora",
      categories: ["spacing", "radius"],
      stylesheet: "/ui/assets/baohaus-aurora-tokens.css",
    });
    host.register({
      id: "motion-preset:baohaus-calm",
      extensionId: "baohaus-calm",
      kind: "motion-preset",
      presetId: "baohaus-calm",
      profile: "calm",
      respectsReducedMotion: true,
      stylesheet: "/ui/assets/baohaus-calm-motion.css",
    });
    host.register({
      id: "density-preset:baohaus-comfortable",
      extensionId: "baohaus-comfortable",
      kind: "density-preset",
      presetId: "baohaus-comfortable",
      density: "comfortable",
      stylesheet: "/ui/assets/baohaus-comfortable-density.css",
    });
    const buckets = host.snapshotByKind();
    expect(buckets["theme-pack"].map((entry) => entry.themeId)).toEqual(["baohaus-aurora-light"]);
    expect(buckets["design-tokens"].map((entry) => entry.tokenSetId)).toEqual(["baohaus-aurora"]);
    expect(buckets["motion-preset"].map((entry) => entry.presetId)).toEqual(["baohaus-calm"]);
    expect(buckets["density-preset"].map((entry) => entry.presetId)).toEqual([
      "baohaus-comfortable",
    ]);
  });

  test("repeated registration by the same owner is idempotent", () => {
    const host = createUiAssetPackHost();
    const registration: UiAssetPackRegistration = {
      id: "theme-pack:baohaus-aurora-light",
      extensionId: "baohaus-aurora-light",
      kind: "theme-pack",
      themeId: "baohaus-aurora-light",
      colorScheme: "light",
      daisyUiVersionRange: "^5.0.0",
      stylesheet: "/ui/assets/baohaus-aurora-light.css",
    };
    expect(host.register(registration).ok).toBe(true);
    expect(host.register(registration).ok).toBe(true);
    expect(host.size()).toBe(1);
  });
});
