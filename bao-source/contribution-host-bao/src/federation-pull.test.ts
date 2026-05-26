import { describe, expect, test } from "bun:test";

import { createApiGroupHost } from "./api-group.ts";
import { mergeFederatedSnapshots } from "./federation-pull.ts";
import { buildFederatedSnapshot, type FederationSnapshotHosts } from "./federation-snapshot.ts";
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

function peer(peerId: string): FederatedPeerIdentity {
  return {
    peerId,
    displayName: peerId,
    origin: `https://${peerId}.bao.test`,
    versionTag: "0.1.0-test",
    capabilityTier: PEER_CAPABILITY_TIER.t2,
  };
}

describe("mergeFederatedSnapshots", () => {
  test("stamps ui asset packs with their origin peer", async () => {
    const runtimeHosts = newHosts();
    runtimeHosts.uiAssetPack.register({
      id: "theme-pack:local",
      extensionId: "local-theme",
      kind: "theme-pack",
      themeId: "local",
      colorScheme: "light",
      daisyUiVersionRange: "^5.0.0",
      stylesheet: "/ui/assets/local.css",
    });
    const registryHosts = newHosts();
    registryHosts.uiAssetPack.register({
      id: "theme-pack:registry",
      extensionId: "registry-theme",
      kind: "theme-pack",
      themeId: "registry",
      colorScheme: "dark",
      daisyUiVersionRange: "^5.0.0",
      stylesheet: "/ui/assets/registry.css",
    });
    const local = await buildFederatedSnapshot({
      peer: peer("bao-runtime"),
      hosts: runtimeHosts,
    });
    const remote = await buildFederatedSnapshot({
      peer: peer("registry"),
      hosts: registryHosts,
    });
    const merged = mergeFederatedSnapshots([local, remote]);
    expect(
      merged.uiAssetPack.map((entry) => ({
        originPeerId: entry.originPeerId,
        origin: entry.originPeer.origin,
        id: entry.registration.id,
      })),
    ).toEqual([
      {
        originPeerId: "bao-runtime",
        origin: "https://bao-runtime.bao.test",
        id: "theme-pack:local",
      },
      {
        originPeerId: "registry",
        origin: "https://registry.bao.test",
        id: "theme-pack:registry",
      },
    ]);
  });

  test("remote sidebar contribution appears, mutates, and disappears across re-pulls (L1.i)", async () => {
    const remoteHosts = newHosts();
    const remotePeer = peer("remote-bao");

    remoteHosts.sidebar.register({
      id: "remote.sidebar.dashboards",
      extensionId: "remote-ext",
      section: "workspace",
      position: 5,
      labelKey: "remote.dashboards.label",
      href: "/remote/dashboards",
    });

    const firstPull = await buildFederatedSnapshot({
      peer: remotePeer,
      hosts: remoteHosts,
    });
    const firstMerge = mergeFederatedSnapshots([firstPull]);
    expect(
      firstMerge.sidebar.map((entry) => ({
        originPeerId: entry.originPeerId,
        id: entry.registration.id,
        position: entry.registration.position,
      })),
    ).toEqual([
      {
        originPeerId: "remote-bao",
        id: "remote.sidebar.dashboards",
        position: 5,
      },
    ]);

    remoteHosts.sidebar.register({
      id: "remote.sidebar.dashboards",
      extensionId: "remote-ext",
      section: "workspace",
      position: 12,
      labelKey: "remote.dashboards.label.v2",
      href: "/remote/dashboards-v2",
    });

    const mutatePull = await buildFederatedSnapshot({
      peer: remotePeer,
      hosts: remoteHosts,
    });
    const mutateMerge = mergeFederatedSnapshots([mutatePull]);
    expect(mutateMerge.sidebar.length).toBe(1);
    expect(mutateMerge.sidebar[0]?.registration.position).toBe(12);
    expect(mutateMerge.sidebar[0]?.registration.href).toBe("/remote/dashboards-v2");
    expect(mutateMerge.sidebar[0]?.registration.labelKey).toBe("remote.dashboards.label.v2");

    remoteHosts.sidebar.unregister("remote.sidebar.dashboards");
    const removedPull = await buildFederatedSnapshot({
      peer: remotePeer,
      hosts: remoteHosts,
    });
    const removedMerge = mergeFederatedSnapshots([removedPull]);
    expect(removedMerge.sidebar).toEqual([]);
  });

  test("multi-peer merge preserves origin stamps and order (L1.i)", async () => {
    const localHosts = newHosts();
    localHosts.sidebar.register({
      id: "local.sidebar.home",
      extensionId: "local-ext",
      section: "workspace",
      position: 1,
      labelKey: "local.home.label",
      href: "/home",
    });
    const remoteHosts = newHosts();
    remoteHosts.sidebar.register({
      id: "remote.sidebar.tools",
      extensionId: "remote-ext",
      section: "workspace",
      position: 2,
      labelKey: "remote.tools.label",
      href: "/tools",
    });

    const localSnap = await buildFederatedSnapshot({
      peer: peer("bao-runtime"),
      hosts: localHosts,
    });
    const remoteSnap = await buildFederatedSnapshot({
      peer: peer("registry"),
      hosts: remoteHosts,
    });
    const merged = mergeFederatedSnapshots([localSnap, remoteSnap]);
    const stamped = merged.sidebar.map((entry) => ({
      peer: entry.originPeerId,
      id: entry.registration.id,
    }));
    expect(stamped).toEqual([
      { peer: "bao-runtime", id: "local.sidebar.home" },
      { peer: "registry", id: "remote.sidebar.tools" },
    ]);
  });
});
