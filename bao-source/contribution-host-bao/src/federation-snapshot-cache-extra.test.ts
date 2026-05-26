/**
 * Gap-fill coverage for `federation-snapshot-cache.ts` — adds the
 * variants the original test file omits: redactCapabilityRef key
 * separation, selectedSurfaces partial-fetch key separation, and
 * process-singleton accessor behavior.
 */

import { describe, expect, test } from "bun:test";

import { createApiGroupHost } from "./api-group.ts";
import type { FederationSnapshotHosts } from "./federation-snapshot.ts";
import {
  createFederationSnapshotCache,
  getProcessFederationSnapshotCache,
  resetProcessFederationSnapshotCacheForTests,
} from "./federation-snapshot-cache.ts";
import {
  FEDERATION_SURFACE_KEY,
  type FederatedPeerIdentity,
  PEER_CAPABILITY_TIER,
} from "./federation-wire.ts";
import { createPaletteEntryGroupHost } from "./palette-entry-group.ts";
import { createSettingsTabHost } from "./settings-tab.ts";
import { createSidebarHost } from "./sidebar.ts";
import { createTileGroupHost } from "./tile-group.ts";
import { createTopbarHost } from "./topbar.ts";
import { createUiAssetPackHost } from "./ui-asset-pack.ts";

function newHosts(): FederationSnapshotHosts {
  return {
    sidebar: createSidebarHost(),
    settingsTab: createSettingsTabHost(),
    paletteEntryGroup: createPaletteEntryGroupHost(),
    apiGroup: createApiGroupHost(),
    tileGroup: createTileGroupHost(),
    topbar: createTopbarHost(),
    uiAssetPack: createUiAssetPackHost(),
  };
}

const PEER: FederatedPeerIdentity = {
  peerId: "bao-runtime",
  displayName: ".bao Runtime",
  origin: "http://localhost:3010",
  versionTag: "0.1.0-test",
  capabilityTier: PEER_CAPABILITY_TIER.t2,
};

describe("federation-snapshot-cache — redactCapabilityRef key separation", () => {
  test("redact=true and redact=false produce distinct cache entries", async () => {
    const cache = createFederationSnapshotCache();
    const hosts = newHosts();
    const open = await cache.get({
      peer: PEER,
      hosts,
      redactCapabilityRef: false,
    });
    const redacted = await cache.get({
      peer: PEER,
      hosts,
      redactCapabilityRef: true,
    });
    expect(open).not.toBe(redacted);
    expect(cache.size()).toBe(2);
  });
});

describe("federation-snapshot-cache — selectedSurfaces key separation", () => {
  test("different selectedSurfaces produce distinct cache entries", async () => {
    const cache = createFederationSnapshotCache();
    const hosts = newHosts();
    const sidebarOnly = await cache.get({
      peer: PEER,
      hosts,
      selectedSurfaces: new Set([FEDERATION_SURFACE_KEY.sidebar]),
    });
    const settingsOnly = await cache.get({
      peer: PEER,
      hosts,
      selectedSurfaces: new Set([FEDERATION_SURFACE_KEY.settingsTab]),
    });
    expect(sidebarOnly).not.toBe(settingsOnly);
    expect(cache.size()).toBe(2);
  });

  test("selectedSurfaces with same set members in different insertion order still hits same key", async () => {
    const cache = createFederationSnapshotCache();
    const hosts = newHosts();
    const setA = new Set<(typeof FEDERATION_SURFACE_KEY)[keyof typeof FEDERATION_SURFACE_KEY]>([
      FEDERATION_SURFACE_KEY.sidebar,
      FEDERATION_SURFACE_KEY.apiGroup,
    ]);
    const setB = new Set<(typeof FEDERATION_SURFACE_KEY)[keyof typeof FEDERATION_SURFACE_KEY]>([
      FEDERATION_SURFACE_KEY.apiGroup,
      FEDERATION_SURFACE_KEY.sidebar,
    ]);
    const first = await cache.get({
      peer: PEER,
      hosts,
      selectedSurfaces: setA,
    });
    const second = await cache.get({
      peer: PEER,
      hosts,
      selectedSurfaces: setB,
    });
    expect(second).toBe(first);
    expect(cache.size()).toBe(1);
  });

  test("partial-fetch and full-fetch are distinct entries", async () => {
    const cache = createFederationSnapshotCache();
    const hosts = newHosts();
    const full = await cache.get({ peer: PEER, hosts });
    const partial = await cache.get({
      peer: PEER,
      hosts,
      selectedSurfaces: new Set([FEDERATION_SURFACE_KEY.sidebar]),
    });
    expect(partial).not.toBe(full);
    expect(cache.size()).toBe(2);
  });
});

describe("federation-snapshot-cache — process singleton", () => {
  test("getProcessFederationSnapshotCache returns same instance across calls", () => {
    resetProcessFederationSnapshotCacheForTests();
    const a = getProcessFederationSnapshotCache();
    const b = getProcessFederationSnapshotCache();
    expect(a).toBe(b);
  });

  test("resetProcessFederationSnapshotCacheForTests installs a fresh instance", () => {
    const a = getProcessFederationSnapshotCache();
    resetProcessFederationSnapshotCacheForTests();
    const b = getProcessFederationSnapshotCache();
    expect(b).not.toBe(a);
  });

  test("singleton accumulates entries across calls (no implicit clear)", async () => {
    resetProcessFederationSnapshotCacheForTests();
    const cache = getProcessFederationSnapshotCache();
    const hosts = newHosts();
    await cache.get({ peer: PEER, hosts });
    await cache.get({ peer: PEER, hosts, tenantId: "tenant-z" });
    expect(cache.size()).toBe(2);
  });
});
