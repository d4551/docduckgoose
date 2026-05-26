import { describe, expect, test } from "bun:test";

import { createApiGroupHost } from "./api-group.ts";
import type { FederationSnapshotHosts } from "./federation-snapshot.ts";
import {
  createFederationSnapshotCache,
  FEDERATION_SNAPSHOT_CACHE_MAX_ENTRIES,
} from "./federation-snapshot-cache.ts";
import { type FederatedPeerIdentity, PEER_CAPABILITY_TIER } from "./federation-wire.ts";
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

describe("createFederationSnapshotCache", () => {
  test("returns the same envelope reference for identical state", async () => {
    const cache = createFederationSnapshotCache();
    const hosts = newHosts();
    const first = await cache.get({ peer: PEER, hosts });
    const second = await cache.get({ peer: PEER, hosts });
    expect(second).toBe(first);
    expect(cache.size()).toBe(1);
  });

  test("rebuilds when a host mutates (version bump)", async () => {
    const cache = createFederationSnapshotCache();
    const hosts = newHosts();
    const baseline = await cache.get({ peer: PEER, hosts });
    hosts.sidebar.register({
      id: "nav-pkgs",
      extensionId: "builtin",
      section: "overview",
      position: 0,
      labelKey: "nav.overview.packages",
      href: "/packages",
      iconName: "package",
    });
    const after = await cache.get({ peer: PEER, hosts });
    expect(after).not.toBe(baseline);
    expect(after.etag).not.toBe(baseline.etag);
    expect(cache.size()).toBe(2);
  });

  test("separate entries per tenantId", async () => {
    const cache = createFederationSnapshotCache();
    const hosts = newHosts();
    const a = await cache.get({ peer: PEER, hosts, tenantId: "tenant-a" });
    const b = await cache.get({ peer: PEER, hosts, tenantId: "tenant-b" });
    expect(a).not.toBe(b);
    expect(cache.size()).toBe(2);
  });

  test("FIFO evicts after FEDERATION_SNAPSHOT_CACHE_MAX_ENTRIES", async () => {
    const cache = createFederationSnapshotCache();
    const hosts = newHosts();
    for (let i = 0; i < FEDERATION_SNAPSHOT_CACHE_MAX_ENTRIES + 4; i += 1) {
      await cache.get({ peer: PEER, hosts, tenantId: `tenant-${i}` });
    }
    expect(cache.size()).toBe(FEDERATION_SNAPSHOT_CACHE_MAX_ENTRIES);
  });
});
