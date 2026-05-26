import { describe, expect, test } from "bun:test";

import { createApiGroupHost } from "./api-group.ts";
import { createFederationOrchestrator, type PeerFetchStatus } from "./federation-orchestrator.ts";
import type { FederationSnapshotHosts } from "./federation-snapshot.ts";
import { buildFederatedSnapshot } from "./federation-snapshot.ts";
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

const REGISTRY_PEER: FederatedPeerIdentity = {
  peerId: "registry",
  displayName: "Registry",
  origin: "http://localhost:3000",
  versionTag: "0.1.0-test",
  capabilityTier: PEER_CAPABILITY_TIER.t2,
};

function buildMockFetch(
  producer: FederationSnapshotHosts,
  peer: FederatedPeerIdentity,
): {
  fetchImpl: typeof fetch;
  calls: { url: string; ifNoneMatch: string | null }[];
} {
  const calls: { url: string; ifNoneMatch: string | null }[] = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input.toString();
    const headers = new Headers(init?.headers);
    const ifNoneMatch = headers.get("if-none-match");
    calls.push({ url, ifNoneMatch });
    const snapshot = await buildFederatedSnapshot({ peer, hosts: producer });
    if (ifNoneMatch === snapshot.etag) {
      return new Response(null, {
        status: 304,
        headers: { etag: snapshot.etag },
      });
    }
    return new Response(JSON.stringify(snapshot), {
      status: 200,
      headers: { etag: snapshot.etag, "content-type": "application/json" },
    });
  };
  return { fetchImpl, calls };
}

describe("createFederationOrchestrator", () => {
  test("federates a registry sidebar registration into runtime hosts", async () => {
    const producer = newHosts();
    producer.sidebar.register({
      id: "registry:packages",
      extensionId: "builtin",
      section: "develop",
      position: 0,
      labelKey: "registry.nav.packages",
      href: "/packages",
    });
    const runtimeHosts = newHosts();
    const { fetchImpl, calls } = buildMockFetch(producer, REGISTRY_PEER);
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    const status = await orchestrator.refreshPeer("registry");
    expect(status.kind).toBe("served");
    const merged = runtimeHosts.sidebar.snapshot();
    expect(merged.length).toBe(1);
    expect(merged[0]?.id).toBe("federation:registry:registry:packages");
    expect(merged[0]?.extensionId).toBe("federation:registry:builtin");
    expect(merged[0]?.section).toBe("develop");
    expect(merged[0]?.labelKey).toBe("registry.nav.packages");
    expect(calls.length).toBe(1);
    expect(calls[0]?.ifNoneMatch).toBeNull();
  });

  test("federates a registry topbar registration into runtime hosts", async () => {
    const producer = newHosts();
    producer.topbar.register({
      id: "registry:status",
      extensionId: "builtin",
      slot: "end",
      position: 10,
      labelKey: "registry.topbar.status",
      href: "/status",
    });
    const runtimeHosts = newHosts();
    const { fetchImpl } = buildMockFetch(producer, REGISTRY_PEER);
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    const status = await orchestrator.refreshPeer("registry");
    expect(status.kind).toBe("served");
    const merged = runtimeHosts.topbar.snapshot();
    expect(merged.length).toBe(1);
    expect(merged[0]?.id).toBe("federation:registry:registry:status");
    expect(merged[0]?.extensionId).toBe("federation:registry:builtin");
    expect(merged[0]?.slot).toBe("end");
    expect(merged[0]?.labelKey).toBe("registry.topbar.status");
  });

  test("sends If-None-Match on second refresh and gets 304", async () => {
    const producer = newHosts();
    producer.sidebar.register({
      id: "registry:packages",
      extensionId: "builtin",
      section: "develop",
      position: 0,
      labelKey: "registry.nav.packages",
      href: "/packages",
    });
    const runtimeHosts = newHosts();
    const { fetchImpl, calls } = buildMockFetch(producer, REGISTRY_PEER);
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    const first = await orchestrator.refreshPeer("registry");
    expect(first.kind).toBe("served");
    const second = await orchestrator.refreshPeer("registry");
    expect(second.kind).toBe("not-modified");
    expect(calls.length).toBe(2);
    expect(calls[1]?.ifNoneMatch).not.toBeNull();
    expect(runtimeHosts.sidebar.size()).toBe(1);
  });

  test("dropPeer removes all federated registrations from local hosts", async () => {
    const producer = newHosts();
    producer.sidebar.register({
      id: "registry:packages",
      extensionId: "builtin",
      section: "develop",
      position: 0,
      labelKey: "registry.nav.packages",
      href: "/packages",
    });
    producer.settingsTab.register({
      id: "registry:apis",
      extensionId: "builtin",
      section: "apis",
      position: 0,
      labelKey: "registry.tab.apis",
      contentUrl: "/settings/tabs/apis",
    });
    producer.topbar.register({
      id: "registry:status",
      extensionId: "builtin",
      slot: "end",
      position: 10,
      labelKey: "registry.topbar.status",
    });
    const runtimeHosts = newHosts();
    const { fetchImpl } = buildMockFetch(producer, REGISTRY_PEER);
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    await orchestrator.refreshPeer("registry");
    expect(runtimeHosts.sidebar.size()).toBe(1);
    expect(runtimeHosts.settingsTab.size()).toBe(1);
    expect(runtimeHosts.topbar.size()).toBe(1);
    const removed = orchestrator.dropPeer("registry");
    expect(removed).toBe(3);
    expect(runtimeHosts.sidebar.size()).toBe(0);
    expect(runtimeHosts.settingsTab.size()).toBe(0);
    expect(runtimeHosts.topbar.size()).toBe(0);
  });

  test("re-merges fresh snapshot after producer registration change", async () => {
    const producer = newHosts();
    producer.sidebar.register({
      id: "registry:packages",
      extensionId: "builtin",
      section: "develop",
      position: 0,
      labelKey: "registry.nav.packages",
      href: "/packages",
    });
    const runtimeHosts = newHosts();
    const { fetchImpl } = buildMockFetch(producer, REGISTRY_PEER);
    const statusEvents: PeerFetchStatus[] = [];
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
      onPeerStatus: (_peerId, status) => statusEvents.push(status),
    });
    await orchestrator.refreshPeer("registry");
    producer.sidebar.register({
      id: "registry:publish",
      extensionId: "builtin",
      section: "develop",
      position: 1,
      labelKey: "registry.nav.publish",
      href: "/publish",
    });
    const refreshed = await orchestrator.refreshPeer("registry");
    expect(refreshed.kind).toBe("served");
    expect(runtimeHosts.sidebar.size()).toBe(2);
    const ids = runtimeHosts.sidebar.snapshot().map((r) => r.id);
    expect(ids).toContain("federation:registry:registry:packages");
    expect(ids).toContain("federation:registry:registry:publish");
    expect(statusEvents.length).toBe(2);
  });

  test("rejects 401 cleanly and does not mount registrations", async () => {
    const runtimeHosts = newHosts();
    const fetchImpl: typeof fetch = async () => new Response(null, { status: 401 });
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    const status = await orchestrator.refreshPeer("registry");
    expect(status.kind).toBe("unauthenticated");
    expect(runtimeHosts.sidebar.size()).toBe(0);
  });

  test("schema-rejects malformed envelope", async () => {
    const runtimeHosts = newHosts();
    const fetchImpl: typeof fetch = async () =>
      new Response(JSON.stringify({ broken: true }), {
        status: 200,
        headers: { etag: "deadbeef", "content-type": "application/json" },
      });
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    const status = await orchestrator.refreshPeer("registry");
    expect(status.kind).toBe("schema-rejected");
    expect(runtimeHosts.sidebar.size()).toBe(0);
  });

  test("refreshAll fans out across multiple peers", async () => {
    const registryProducer = newHosts();
    registryProducer.sidebar.register({
      id: "registry:packages",
      extensionId: "builtin",
      section: "develop",
      position: 0,
      labelKey: "registry.nav.packages",
      href: "/packages",
    });
    const forgeProducer = newHosts();
    forgeProducer.sidebar.register({
      id: "forge:repos",
      extensionId: "builtin",
      section: "develop",
      position: 1,
      labelKey: "forge.nav.repos",
      href: "/repos",
    });
    const runtimeHosts = newHosts();
    const fetchImpl: typeof fetch = async (input) => {
      const url = typeof input === "string" ? input : input.toString();
      const peer = url.includes("3002")
        ? {
            producer: forgeProducer,
            identity: {
              ...REGISTRY_PEER,
              peerId: "forge",
              origin: "http://localhost:3002",
              displayName: "Forge",
            },
          }
        : { producer: registryProducer, identity: REGISTRY_PEER };
      const snapshot = await buildFederatedSnapshot({
        peer: peer.identity,
        hosts: peer.producer,
      });
      return new Response(JSON.stringify(snapshot), {
        status: 200,
        headers: { etag: snapshot.etag, "content-type": "application/json" },
      });
    };
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
        {
          peerId: "forge",
          origin: "http://localhost:3002",
          displayName: "Forge",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    const results = await orchestrator.refreshAll();
    expect(results.get("registry")?.kind).toBe("served");
    expect(results.get("forge")?.kind).toBe("served");
    expect(runtimeHosts.sidebar.size()).toBe(2);
  });

  test("federates a peer theme-pack ui-asset-pack into runtime hosts", async () => {
    const producer = newHosts();
    producer.uiAssetPack.register({
      id: "theme-pack:registry-aurora",
      extensionId: "baohaus-registry-theme",
      kind: "theme-pack",
      themeId: "registry-aurora",
      colorScheme: "light",
      daisyUiVersionRange: ">=5.0.0 <6.0.0",
      stylesheet: "/api/v1/ui-asset-packs/theme-pack:registry-aurora.css",
    });
    const runtimeHosts = newHosts();
    const { fetchImpl } = buildMockFetch(producer, REGISTRY_PEER);
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    const status = await orchestrator.refreshPeer("registry");
    expect(status.kind).toBe("served");
    const merged = runtimeHosts.uiAssetPack.snapshot();
    expect(merged.length).toBe(1);
    const entry = merged[0];
    expect(entry?.id).toBe("federation:registry:theme-pack:registry-aurora");
    expect(entry?.extensionId).toBe("federation:registry:baohaus-registry-theme");
    expect(entry?.kind).toBe("theme-pack");
    if (entry?.kind === "theme-pack") {
      expect(entry.themeId).toBe("registry-aurora");
      expect(entry.colorScheme).toBe("light");
    }
  });

  test("federates a peer design-tokens ui-asset-pack with categories", async () => {
    const producer = newHosts();
    producer.uiAssetPack.register({
      id: "design-tokens:registry-aurora",
      extensionId: "baohaus-registry-tokens",
      kind: "design-tokens",
      tokenSetId: "registry-aurora",
      categories: ["spacing", "radius", "typography"],
      stylesheet: "/api/v1/ui-asset-packs/design-tokens:registry-aurora.css",
    });
    const runtimeHosts = newHosts();
    const { fetchImpl } = buildMockFetch(producer, REGISTRY_PEER);
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    await orchestrator.refreshPeer("registry");
    const merged = runtimeHosts.uiAssetPack.snapshot();
    expect(merged.length).toBe(1);
    const entry = merged[0];
    expect(entry?.kind).toBe("design-tokens");
    if (entry?.kind === "design-tokens") {
      expect(entry.tokenSetId).toBe("registry-aurora");
      expect(entry.categories).toEqual(["spacing", "radius", "typography"]);
    }
  });

  test("unmounts federated ui-asset-pack registrations on peer-loss refresh", async () => {
    const producer = newHosts();
    producer.uiAssetPack.register({
      id: "theme-pack:transient",
      extensionId: "transient-theme",
      kind: "theme-pack",
      themeId: "transient",
      colorScheme: "dark",
      daisyUiVersionRange: ">=5.0.0 <6.0.0",
      stylesheet: "/api/v1/ui-asset-packs/theme-pack:transient.css",
    });
    const runtimeHosts = newHosts();
    const { fetchImpl } = buildMockFetch(producer, REGISTRY_PEER);
    const orchestrator = createFederationOrchestrator({
      endpoints: [
        {
          peerId: "registry",
          origin: "http://localhost:3000",
          displayName: "Registry",
        },
      ],
      localHosts: runtimeHosts,
      fetchImpl,
    });
    await orchestrator.refreshPeer("registry");
    expect(runtimeHosts.uiAssetPack.size()).toBe(1);
    producer.uiAssetPack.unregisterByOwner("transient-theme");
    await orchestrator.refreshPeer("registry");
    expect(runtimeHosts.uiAssetPack.size()).toBe(0);
  });
});
