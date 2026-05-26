/**
 * End-to-end coverage for the canonical `theme-pack` install lifecycle.
 *
 * Proves that a `.bao` theme-pack install routes through:
 *   1. ThemePackTargetHandler.install(target) → asset-pack registry
 *   2. ecosystemEventBus.publish() → stamps originPeerId from setLocalPeerId
 *   3. bus subscribers see the stamped event with correct surface + change
 *      discriminants and the same peer-id the consumer pinned at boot.
 *
 * This is the unit-level proof of the hot-load fanout chain that the
 * federation-pull subscriber + federation-orchestrator-boot use to
 * surgically invalidate one peer's cache entry per T-19.
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
import { ThemePackTargetHandler } from "../src/theme-pack.ts";

const TEST_PEER_ID = "test-peer-runtime";

const VALID_THEME_TARGET = {
  kind: "theme-pack" as const,
  target: "baohaus-light-installable",
  themeId: "baohaus-light",
  colorScheme: "light" as const,
  daisyUiVersionRange: ">=5.0.0 <6.0.0",
  stylesheet: "assets/baohaus-light.css",
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
  uiAssetPackRegistry.unregisterByOwner(VALID_THEME_TARGET.target);
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
  uiAssetPackRegistry.unregisterByOwner(VALID_THEME_TARGET.target);
  resetForTests();
});

describe("ThemePackTargetHandler — install fanout", () => {
  it("registers a theme-pack and publishes an install event stamped with originPeerId", async () => {
    const handler = new ThemePackTargetHandler(testLogger);
    const result = await handler.install(VALID_THEME_TARGET);

    expect(result.ok).toBe(true);

    const themes = uiAssetPackRegistry
      .snapshot()
      .filter((reg) => reg.kind === "theme-pack" && reg.extensionId === VALID_THEME_TARGET.target);
    expect(themes.length).toBe(1);
    const themeEntry = themes[0];
    if (themeEntry === undefined || themeEntry.kind !== "theme-pack") {
      throw new Error("theme-pack registration missing after install");
    }
    expect(themeEntry.themeId).toBe(VALID_THEME_TARGET.themeId);
    expect(themeEntry.colorScheme).toBe(VALID_THEME_TARGET.colorScheme);
    expect(themeEntry.stylesheet).toBe(VALID_THEME_TARGET.stylesheet);

    expect(captured.length).toBe(1);
    const event = captured[0];
    if (event === undefined) {
      throw new Error("no event captured");
    }
    expect(event.surface).toBe(ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack);
    expect(event.change).toBe(ECOSYSTEM_CONTRIBUTION_CHANGE.installed);
    expect(event.extensionId).toBe(VALID_THEME_TARGET.target);
    expect(event.originPeerId).toBe(TEST_PEER_ID);
    expect(event.publishedAt.length).toBeGreaterThan(0);
    expect(event.idempotencyKey.length).toBeGreaterThan(0);
    expect(loggerEvents.some((entry) => entry.includes("Theme-pack installed"))).toBe(true);
  });

  it("rejects an invalid kind without touching the registry or bus", async () => {
    const handler = new ThemePackTargetHandler(testLogger);
    const result = await handler.install({
      ...VALID_THEME_TARGET,
      kind: "not-theme-pack",
    });
    expect(result.ok).toBe(false);
    expect(captured.length).toBe(0);
    const themes = uiAssetPackRegistry
      .snapshot()
      .filter((reg) => reg.kind === "theme-pack" && reg.extensionId === VALID_THEME_TARGET.target);
    expect(themes.length).toBe(0);
  });

  it("uninstall publishes a stamped uninstalled event and removes the registration", async () => {
    const handler = new ThemePackTargetHandler(testLogger);
    await handler.install(VALID_THEME_TARGET);
    captured = [];

    const result = await handler.uninstall(VALID_THEME_TARGET);
    expect(result.ok).toBe(true);

    expect(captured.length).toBe(1);
    const event = captured[0];
    if (event === undefined) {
      throw new Error("no uninstall event captured");
    }
    expect(event.surface).toBe(ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack);
    expect(event.change).toBe(ECOSYSTEM_CONTRIBUTION_CHANGE.uninstalled);
    expect(event.originPeerId).toBe(TEST_PEER_ID);

    const themes = uiAssetPackRegistry
      .snapshot()
      .filter((reg) => reg.kind === "theme-pack" && reg.extensionId === VALID_THEME_TARGET.target);
    expect(themes.length).toBe(0);
  });
});
