/**
 * End-to-end coverage for the 3 remaining UI-fabric install handlers
 * (theme-pack covered separately). Mirrors the theme-pack contract:
 *
 *   - Handler.install(target) → asset-pack-registry registration
 *   - ecosystemEventBus.publish() fires a uiAssetPack/installed event
 *     stamped with originPeerId from setLocalPeerId
 *   - Handler.uninstall(target) removes the registration and publishes
 *     a uiAssetPack/uninstalled event
 *   - Invalid kind is rejected without touching the registry or bus
 *
 * Together with theme-pack-install.test.ts, this gives the four
 * first-party UI/UX install kinds full hot-load fanout proof.
 */

import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import {
  ecosystemEventBus,
  resetForTests,
  setLocalPeerId,
} from "@baohaus/ecosystem-events-bao/service";
import {
  ECOSYSTEM_CONTRIBUTION_CHANGE,
  ECOSYSTEM_CONTRIBUTION_SURFACE,
  type EcosystemContributionEvent,
  type EcosystemEventUnsubscribe,
} from "@baohaus/ecosystem-events-bao/types";
import { uiAssetPackRegistry } from "../src/asset-pack-registry.ts";
import { DensityPresetTargetHandler } from "../src/density-preset.ts";
import { DesignTokensTargetHandler } from "../src/design-tokens.ts";
import { MotionPresetTargetHandler } from "../src/motion-preset.ts";

const TEST_PEER_ID = "test-ui-fabric-peer";

const DESIGN_TOKENS_TARGET = {
  kind: "design-tokens" as const,
  target: "baohaus-base-tokens",
  tokenSetId: "baohaus-base",
  categories: ["spacing", "radius", "shadow"] as const,
  stylesheet: "assets/tokens.css",
};

const MOTION_PRESET_TARGET = {
  kind: "motion-preset" as const,
  target: "baohaus-calm",
  presetId: "baohaus-calm",
  profile: "calm" as const,
  respectsReducedMotion: true,
  stylesheet: "assets/motion.css",
};

const DENSITY_PRESET_TARGET = {
  kind: "density-preset" as const,
  target: "baohaus-comfortable",
  presetId: "baohaus-comfortable",
  density: "comfortable" as const,
  stylesheet: "assets/density.css",
};

let captured: EcosystemContributionEvent[] = [];
let unsubscribe: EcosystemEventUnsubscribe | null = null;
let loggerEvents: string[] = [];

const testLogger = {
  info: (message: string) => {
    loggerEvents.push(`info:${message}`);
  },
  warn: (message: string) => {
    loggerEvents.push(`warn:${message}`);
  },
  error: (message: string) => {
    loggerEvents.push(`error:${message}`);
  },
};

beforeEach(() => {
  resetForTests();
  uiAssetPackRegistry.unregisterByOwner(DESIGN_TOKENS_TARGET.target);
  uiAssetPackRegistry.unregisterByOwner(MOTION_PRESET_TARGET.target);
  uiAssetPackRegistry.unregisterByOwner(DENSITY_PRESET_TARGET.target);
  captured = [];
  loggerEvents = [];
  setLocalPeerId(TEST_PEER_ID);
  unsubscribe = ecosystemEventBus.subscribe((event) => {
    captured.push(event);
  });
});

afterEach(() => {
  unsubscribe?.();
  unsubscribe = null;
  uiAssetPackRegistry.unregisterByOwner(DESIGN_TOKENS_TARGET.target);
  uiAssetPackRegistry.unregisterByOwner(MOTION_PRESET_TARGET.target);
  uiAssetPackRegistry.unregisterByOwner(DENSITY_PRESET_TARGET.target);
  resetForTests();
});

describe("DesignTokensTargetHandler — install fanout", () => {
  it("registers tokens and publishes a stamped installed event", async () => {
    const handler = new DesignTokensTargetHandler(testLogger);
    const result = await handler.install(DESIGN_TOKENS_TARGET);
    expect(result.ok).toBe(true);
    const entries = uiAssetPackRegistry
      .snapshot()
      .filter(
        (reg) => reg.kind === "design-tokens" && reg.extensionId === DESIGN_TOKENS_TARGET.target,
      );
    expect(entries.length).toBe(1);
    const entry = entries[0];
    if (entry === undefined || entry.kind !== "design-tokens") {
      throw new Error("design-tokens registration missing");
    }
    expect(entry.tokenSetId).toBe(DESIGN_TOKENS_TARGET.tokenSetId);
    expect(entry.categories).toEqual([...DESIGN_TOKENS_TARGET.categories]);
    expect(captured.length).toBe(1);
    const event = captured[0];
    if (event === undefined) throw new Error("no event");
    expect(event.surface).toBe(ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack);
    expect(event.change).toBe(ECOSYSTEM_CONTRIBUTION_CHANGE.installed);
    expect(event.originPeerId).toBe(TEST_PEER_ID);
    expect(loggerEvents.some((entry) => entry.includes("Design-tokens installed"))).toBe(true);
  });

  it("rejects invalid kind without touching the registry or bus", async () => {
    const handler = new DesignTokensTargetHandler(testLogger);
    const result = await handler.install({ ...DESIGN_TOKENS_TARGET, kind: "not-design-tokens" });
    expect(result.ok).toBe(false);
    expect(captured.length).toBe(0);
  });
});

describe("MotionPresetTargetHandler — install fanout", () => {
  it("registers preset and publishes a stamped installed event", async () => {
    const handler = new MotionPresetTargetHandler(testLogger);
    const result = await handler.install(MOTION_PRESET_TARGET);
    expect(result.ok).toBe(true);
    const entries = uiAssetPackRegistry
      .snapshot()
      .filter(
        (reg) => reg.kind === "motion-preset" && reg.extensionId === MOTION_PRESET_TARGET.target,
      );
    expect(entries.length).toBe(1);
    const entry = entries[0];
    if (entry === undefined || entry.kind !== "motion-preset") {
      throw new Error("motion-preset registration missing");
    }
    expect(entry.presetId).toBe(MOTION_PRESET_TARGET.presetId);
    expect(entry.profile).toBe("calm");
    expect(captured.length).toBe(1);
    const event = captured[0];
    if (event === undefined) throw new Error("no event");
    expect(event.surface).toBe(ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack);
    expect(event.change).toBe(ECOSYSTEM_CONTRIBUTION_CHANGE.installed);
    expect(event.originPeerId).toBe(TEST_PEER_ID);
    expect(loggerEvents.some((entry) => entry.includes("Motion-preset installed"))).toBe(true);
  });

  it("rejects motion preset that does not respect reduced-motion", async () => {
    const handler = new MotionPresetTargetHandler(testLogger);
    const result = await handler.install({
      ...MOTION_PRESET_TARGET,
      respectsReducedMotion: false,
    });
    expect(result.ok).toBe(false);
    expect(captured.length).toBe(0);
  });
});

describe("DensityPresetTargetHandler — install fanout", () => {
  it("registers preset and publishes a stamped installed event", async () => {
    const handler = new DensityPresetTargetHandler(testLogger);
    const result = await handler.install(DENSITY_PRESET_TARGET);
    expect(result.ok).toBe(true);
    const entries = uiAssetPackRegistry
      .snapshot()
      .filter(
        (reg) => reg.kind === "density-preset" && reg.extensionId === DENSITY_PRESET_TARGET.target,
      );
    expect(entries.length).toBe(1);
    const entry = entries[0];
    if (entry === undefined || entry.kind !== "density-preset") {
      throw new Error("density-preset registration missing");
    }
    expect(entry.presetId).toBe(DENSITY_PRESET_TARGET.presetId);
    expect(entry.density).toBe("comfortable");
    expect(captured.length).toBe(1);
    const event = captured[0];
    if (event === undefined) throw new Error("no event");
    expect(event.surface).toBe(ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack);
    expect(event.change).toBe(ECOSYSTEM_CONTRIBUTION_CHANGE.installed);
    expect(event.originPeerId).toBe(TEST_PEER_ID);
    expect(loggerEvents.some((entry) => entry.includes("Density-preset installed"))).toBe(true);
  });

  it("uninstall removes the registration and publishes a stamped uninstalled event", async () => {
    const handler = new DensityPresetTargetHandler(testLogger);
    await handler.install(DENSITY_PRESET_TARGET);
    captured = [];
    const result = await handler.uninstall(DENSITY_PRESET_TARGET);
    expect(result.ok).toBe(true);
    const entries = uiAssetPackRegistry
      .snapshot()
      .filter(
        (reg) => reg.kind === "density-preset" && reg.extensionId === DENSITY_PRESET_TARGET.target,
      );
    expect(entries.length).toBe(0);
    expect(captured.length).toBe(1);
    const event = captured[0];
    if (event === undefined) throw new Error("no uninstall event");
    expect(event.change).toBe(ECOSYSTEM_CONTRIBUTION_CHANGE.uninstalled);
    expect(event.originPeerId).toBe(TEST_PEER_ID);
  });
});
