import { describe, expect, test } from "bun:test";

import { createApiGroupHost } from "./api-group.ts";
import { buildFederatedSnapshot, type FederationSnapshotHosts } from "./federation-snapshot.ts";
import { validateFederatedContributionSnapshot } from "./federation-validator.ts";
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

describe("validateFederatedContributionSnapshot", () => {
  test("accepts a freshly-built envelope", async () => {
    const envelope = await buildFederatedSnapshot({
      peer: PEER,
      hosts: newHosts(),
    });
    const result = validateFederatedContributionSnapshot(envelope);
    expect(result.ok).toBe(true);
  });

  test("rejects non-object root", () => {
    const result = validateFederatedContributionSnapshot("not an envelope");
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.path).toBe("$");
    }
  });

  test("rejects unsupported schemaVersion", async () => {
    const envelope = await buildFederatedSnapshot({
      peer: PEER,
      hosts: newHosts(),
    });
    const tampered = { ...envelope, schemaVersion: 999 };
    const result = validateFederatedContributionSnapshot(tampered);
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.path).toBe("schemaVersion");
    }
  });

  test("rejects missing peer.peerId", async () => {
    const envelope = await buildFederatedSnapshot({
      peer: PEER,
      hosts: newHosts(),
    });
    const tampered = { ...envelope, peer: { ...envelope.peer, peerId: "" } };
    const result = validateFederatedContributionSnapshot(tampered);
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.path).toBe("peer.peerId");
    }
  });

  test("rejects unknown capabilityTier", async () => {
    const envelope = await buildFederatedSnapshot({
      peer: PEER,
      hosts: newHosts(),
    });
    const tampered = {
      ...envelope,
      peer: { ...envelope.peer, capabilityTier: "t99" },
    };
    const result = validateFederatedContributionSnapshot(tampered);
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.path).toBe("peer.capabilityTier");
    }
  });

  test("rejects non-array surface bucket", async () => {
    const envelope = await buildFederatedSnapshot({
      peer: PEER,
      hosts: newHosts(),
    });
    const tampered = {
      ...envelope,
      surfaces: { ...envelope.surfaces, sidebar: "not-an-array" },
    };
    const result = validateFederatedContributionSnapshot(tampered);
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.path).toBe("surfaces.sidebar");
    }
  });

  test("rejects missing ui asset-pack surface bucket", async () => {
    const envelope = await buildFederatedSnapshot({
      peer: PEER,
      hosts: newHosts(),
    });
    const { uiAssetPack: _uiAssetPack, ...surfaces } = envelope.surfaces;
    const result = validateFederatedContributionSnapshot({
      ...envelope,
      surfaces,
    });
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.path).toBe("surfaces.uiAssetPack");
    }
  });

  test("envelope is JSON-safe round-trippable", async () => {
    const hosts = newHosts();
    hosts.sidebar.register({
      id: "nav-pkgs",
      extensionId: "builtin",
      section: "overview",
      position: 0,
      labelKey: "nav.overview.packages",
      href: "/packages",
      iconName: "package",
    });
    const original = await buildFederatedSnapshot({ peer: PEER, hosts });
    const round = JSON.parse(JSON.stringify(original));
    expect(round).toEqual(original);
    const result = validateFederatedContributionSnapshot(round);
    expect(result.ok).toBe(true);
  });
});
