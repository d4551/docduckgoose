import { describe, expect, test } from "bun:test";

import { createApiGroupHost } from "./api-group.ts";
import { buildFederatedSnapshot, type FederationSnapshotHosts } from "./federation-snapshot.ts";
import {
  FEDERATION_SNAPSHOT_SCHEMA_VERSION,
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

describe("buildFederatedSnapshot", () => {
  test("emits a structurally stable envelope when every surface is empty", async () => {
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts: newHosts(),
      now: () => new Date("2026-05-16T00:00:00.000Z"),
    });
    expect(snapshot.schemaVersion).toBe(FEDERATION_SNAPSHOT_SCHEMA_VERSION);
    expect(snapshot.peer).toEqual(PEER);
    expect(snapshot.snapshotAt).toBe("2026-05-16T00:00:00.000Z");
    expect(snapshot.surfaces.sidebar).toEqual([]);
    expect(snapshot.surfaces.settingsTab).toEqual([]);
    expect(snapshot.surfaces.paletteEntryGroup).toEqual([]);
    expect(snapshot.surfaces.apiGroup).toEqual([]);
    expect(snapshot.surfaces.tileGroup).toEqual([]);
    expect(snapshot.surfaces.topbar).toEqual([]);
    expect(snapshot.surfaces.uiAssetPack).toEqual([]);
    expect(snapshot.etag).toMatch(/^[0-9a-f]{64}$/u);
  });

  test("two identical-state snapshots share an etag", async () => {
    const a = await buildFederatedSnapshot({ peer: PEER, hosts: newHosts() });
    const b = await buildFederatedSnapshot({ peer: PEER, hosts: newHosts() });
    expect(a.etag).toBe(b.etag);
  });

  test("capability filter excludes gated registrations", async () => {
    const hosts = newHosts();
    hosts.settingsTab.register({
      id: "open-tab",
      extensionId: "builtin",
      section: "general",
      position: 0,
      labelKey: "settings.tab.open",
      renderUrl: "/settings/open",
    });
    hosts.settingsTab.register({
      id: "gated-tab",
      extensionId: "builtin",
      section: "general",
      position: 1,
      labelKey: "settings.tab.gated",
      renderUrl: "/settings/gated",
      capabilityRef: "cap:settings:gated",
    });
    const filter = (capabilityRef: string | undefined): boolean => capabilityRef === undefined;
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      capabilityFilter: filter,
    });
    expect(snapshot.surfaces.settingsTab.map((reg) => reg.id)).toEqual(["open-tab"]);
  });

  test("etag changes when contents change", async () => {
    const hosts = newHosts();
    const baseline = await buildFederatedSnapshot({ peer: PEER, hosts });
    hosts.sidebar.register({
      id: "nav-pkgs",
      extensionId: "builtin",
      section: "overview",
      position: 0,
      labelKey: "nav.overview.packages",
      href: "/packages",
      iconName: "package",
    });
    const after = await buildFederatedSnapshot({ peer: PEER, hosts });
    expect(after.etag).not.toBe(baseline.etag);
  });

  test("tenant filter excludes cross-tenant registrations", async () => {
    const hosts = newHosts();
    hosts.settingsTab.register({
      id: "global-tab",
      extensionId: "builtin",
      section: "general",
      position: 0,
      labelKey: "settings.tab.global",
      renderUrl: "/settings/global",
    });
    hosts.settingsTab.register({
      id: "tenant-a-tab",
      extensionId: "builtin",
      tenantId: "tenant-a",
      section: "general",
      position: 1,
      labelKey: "settings.tab.tenantA",
      renderUrl: "/settings/tenant-a",
    });
    hosts.settingsTab.register({
      id: "tenant-b-tab",
      extensionId: "builtin",
      tenantId: "tenant-b",
      section: "general",
      position: 2,
      labelKey: "settings.tab.tenantB",
      renderUrl: "/settings/tenant-b",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
    });
    expect(snapshot.surfaces.settingsTab.map((reg) => reg.id)).toEqual([
      "global-tab",
      "tenant-a-tab",
    ]);
  });

  test("redactCapabilityRef strips capabilityRef from emitted registrations", async () => {
    const hosts = newHosts();
    hosts.sidebar.register({
      id: "gated",
      extensionId: "builtin",
      section: "system",
      position: 0,
      labelKey: "nav.gated",
      href: "/gated",
      iconName: "lock",
      capabilityRef: "cap:admin:gated",
    });
    const open = await buildFederatedSnapshot({ peer: PEER, hosts });
    expect(open.surfaces.sidebar[0]?.capabilityRef).toBe("cap:admin:gated");
    const redacted = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      redactCapabilityRef: true,
    });
    expect(redacted.surfaces.sidebar[0]?.capabilityRef).toBeUndefined();
  });

  test("partial-surface selection populates only requested surfaces", async () => {
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
    hosts.settingsTab.register({
      id: "general-tab",
      extensionId: "builtin",
      section: "general",
      position: 0,
      labelKey: "settings.tab.general",
      renderUrl: "/settings/general",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      selectedSurfaces: new Set(["sidebar"]),
    });
    expect(snapshot.surfaces.sidebar.length).toBe(1);
    expect(snapshot.surfaces.settingsTab).toEqual([]);
    expect(snapshot.surfaces.uiAssetPack).toEqual([]);
  });

  test("ui asset packs federate as the sixth contribution surface", async () => {
    const hosts = newHosts();
    hosts.uiAssetPack.register({
      id: "theme-pack:baohaus-aurora-light",
      extensionId: "baohaus-aurora-light",
      kind: "theme-pack",
      themeId: "baohaus-aurora-light",
      colorScheme: "light",
      daisyUiVersionRange: "^5.0.0",
      stylesheet: "/api/v1/ui-asset-packs/theme-pack:baohaus-aurora-light.css",
    });
    const snapshot = await buildFederatedSnapshot({ peer: PEER, hosts });
    expect(snapshot.surfaces.uiAssetPack.map((reg) => reg.id)).toEqual([
      "theme-pack:baohaus-aurora-light",
    ]);
  });

  test("topbar entries federate as the seventh contribution surface", async () => {
    const hosts = newHosts();
    hosts.topbar.register({
      id: "runtime-status",
      extensionId: "runtime-topbar",
      slot: "end",
      position: 10,
      labelKey: "topbar.runtime.status",
      href: "/status",
    });
    const snapshot = await buildFederatedSnapshot({ peer: PEER, hosts });
    expect(snapshot.surfaces.topbar.map((reg) => reg.id)).toEqual(["runtime-status"]);
  });

  test("partial-surface changes etag when an omitted surface has entries", async () => {
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
    hosts.settingsTab.register({
      id: "general-tab",
      extensionId: "builtin",
      section: "general",
      position: 0,
      labelKey: "settings.tab.general",
      renderUrl: "/settings/general",
    });
    const full = await buildFederatedSnapshot({ peer: PEER, hosts });
    const partial = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      selectedSurfaces: new Set(["sidebar"]),
    });
    expect(partial.etag).not.toBe(full.etag);
  });
});
