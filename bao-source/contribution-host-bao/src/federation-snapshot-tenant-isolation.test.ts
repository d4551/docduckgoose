/**
 * Cross-tenant isolation security tests for the canonical federation
 * snapshot builder. Closes the T-21 multi-tenancy gap:
 *
 *   - A request scoped to tenant-A MUST NOT emit registrations scoped to
 *     tenant-B (cross-tenant leakage = info-disclosure CVE).
 *   - tenantId=null on the registration means GLOBAL (visible to every
 *     tenant scope) — not "no tenant" exclusion.
 *   - scopeTenantId=undefined disables filtering entirely; admin-only
 *     codepath. scopeTenantId=null still filters out cross-tenant rows
 *     and emits only globals (a logged-in user without an active org
 *     should never see another org's contributions).
 *   - Isolation is enforced across EVERY surface (sidebar, settings-tab,
 *     palette-entry-group, api-group, tile-group, ui-asset-pack), not just
 *     settingsTab.
 *   - Capability gating + tenant gating compose with AND semantics — a
 *     gated registration in tenant-B is doubly rejected for a tenant-A
 *     viewer regardless of capability filter.
 */

import { describe, expect, test } from "bun:test";

import { createApiGroupHost } from "./api-group.ts";
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

const PEER: FederatedPeerIdentity = {
  peerId: "bao-runtime",
  displayName: ".bao Runtime",
  origin: "http://localhost:3010",
  versionTag: "0.1.0-test",
  capabilityTier: PEER_CAPABILITY_TIER.t2,
};

describe("federation snapshot tenant isolation — cross-tenant leakage", () => {
  test("tenant-A scope NEVER sees tenant-B settings-tab registrations", async () => {
    const hosts = newHosts();
    hosts.settingsTab.register({
      id: "global-tab",
      extensionId: "builtin",
      section: "general",
      position: 0,
      labelKey: "tab.global",
      renderUrl: "/g",
    });
    hosts.settingsTab.register({
      id: "tenant-a-tab",
      extensionId: "builtin",
      tenantId: "tenant-a",
      section: "general",
      position: 1,
      labelKey: "tab.a",
      renderUrl: "/a",
    });
    hosts.settingsTab.register({
      id: "tenant-b-tab",
      extensionId: "builtin",
      tenantId: "tenant-b",
      section: "general",
      position: 2,
      labelKey: "tab.b",
      renderUrl: "/b",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
    });
    const ids = snapshot.surfaces.settingsTab.map((reg) => reg.id);
    expect(ids).toContain("global-tab");
    expect(ids).toContain("tenant-a-tab");
    expect(ids).not.toContain("tenant-b-tab");
  });

  test("scopeTenantId=null emits ONLY globals — never cross-tenant rows", async () => {
    const hosts = newHosts();
    hosts.settingsTab.register({
      id: "global",
      extensionId: "b",
      section: "general",
      position: 0,
      labelKey: "g",
      renderUrl: "/g",
    });
    hosts.settingsTab.register({
      id: "scoped-a",
      extensionId: "b",
      tenantId: "tenant-a",
      section: "general",
      position: 1,
      labelKey: "a",
      renderUrl: "/a",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: null,
    });
    const ids = snapshot.surfaces.settingsTab.map((reg) => reg.id);
    expect(ids).toContain("global");
    expect(ids).not.toContain("scoped-a");
  });

  test("scopeTenantId=undefined disables filtering (admin codepath)", async () => {
    const hosts = newHosts();
    hosts.settingsTab.register({
      id: "global",
      extensionId: "b",
      section: "general",
      position: 0,
      labelKey: "g",
      renderUrl: "/g",
    });
    hosts.settingsTab.register({
      id: "scoped-a",
      extensionId: "b",
      tenantId: "tenant-a",
      section: "general",
      position: 1,
      labelKey: "a",
      renderUrl: "/a",
    });
    hosts.settingsTab.register({
      id: "scoped-b",
      extensionId: "b",
      tenantId: "tenant-b",
      section: "general",
      position: 2,
      labelKey: "b",
      renderUrl: "/b",
    });
    const snapshot = await buildFederatedSnapshot({ peer: PEER, hosts });
    const ids = snapshot.surfaces.settingsTab.map((reg) => reg.id);
    expect(ids).toContain("global");
    expect(ids).toContain("scoped-a");
    expect(ids).toContain("scoped-b");
  });
});

describe("federation snapshot tenant isolation — every surface enforces", () => {
  test("sidebar enforces tenant isolation", async () => {
    const hosts = newHosts();
    hosts.sidebar.register({
      id: "nav-a",
      extensionId: "b",
      tenantId: "tenant-a",
      section: "overview",
      position: 0,
      labelKey: "a",
      href: "/a",
      iconName: "i",
    });
    hosts.sidebar.register({
      id: "nav-b",
      extensionId: "b",
      tenantId: "tenant-b",
      section: "overview",
      position: 1,
      labelKey: "b",
      href: "/b",
      iconName: "i",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
    });
    const ids = snapshot.surfaces.sidebar.map((reg) => reg.id);
    expect(ids).toContain("nav-a");
    expect(ids).not.toContain("nav-b");
  });

  test("palette-entry-group enforces tenant isolation", async () => {
    const hosts = newHosts();
    hosts.paletteEntryGroup.register({
      id: "pal-a",
      extensionId: "b",
      tenantId: "tenant-a",
      groupId: "g",
      position: 0,
      entries: [{ id: "e-a", labelKey: "a", action: { kind: "navigate", href: "/a" } }],
    });
    hosts.paletteEntryGroup.register({
      id: "pal-b",
      extensionId: "b",
      tenantId: "tenant-b",
      groupId: "g",
      position: 1,
      entries: [{ id: "e-b", labelKey: "b", action: { kind: "navigate", href: "/b" } }],
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
    });
    const ids = snapshot.surfaces.paletteEntryGroup.map((reg) => reg.id);
    expect(ids).toContain("pal-a");
    expect(ids).not.toContain("pal-b");
  });

  test("api-group enforces tenant isolation", async () => {
    const hosts = newHosts();
    hosts.apiGroup.register({
      id: "api-a",
      extensionId: "b",
      tenantId: "tenant-a",
      serviceId: "svc-a",
      labelKey: "a",
      specUrl: "/a/openapi.json",
    });
    hosts.apiGroup.register({
      id: "api-b",
      extensionId: "b",
      tenantId: "tenant-b",
      serviceId: "svc-b",
      labelKey: "b",
      specUrl: "/b/openapi.json",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
    });
    const ids = snapshot.surfaces.apiGroup.map((reg) => reg.id);
    expect(ids).toContain("api-a");
    expect(ids).not.toContain("api-b");
  });

  test("tile-group enforces tenant isolation", async () => {
    const hosts = newHosts();
    hosts.tileGroup.register({
      id: "tile-a",
      extensionId: "b",
      tenantId: "tenant-a",
      dashboardId: "d",
      position: 0,
      labelKey: "a",
      renderUrl: "/a",
    });
    hosts.tileGroup.register({
      id: "tile-b",
      extensionId: "b",
      tenantId: "tenant-b",
      dashboardId: "d",
      position: 1,
      labelKey: "b",
      renderUrl: "/b",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
    });
    const ids = snapshot.surfaces.tileGroup.map((reg) => reg.id);
    expect(ids).toContain("tile-a");
    expect(ids).not.toContain("tile-b");
  });

  test("topbar enforces tenant isolation", async () => {
    const hosts = newHosts();
    hosts.topbar.register({
      id: "topbar-a",
      extensionId: "a",
      tenantId: "tenant-a",
      slot: "end",
      position: 0,
      labelKey: "topbar.a",
    });
    hosts.topbar.register({
      id: "topbar-b",
      extensionId: "b",
      tenantId: "tenant-b",
      slot: "end",
      position: 1,
      labelKey: "topbar.b",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
    });
    const ids = snapshot.surfaces.topbar.map((reg) => reg.id);
    expect(ids).toContain("topbar-a");
    expect(ids).not.toContain("topbar-b");
  });

  test("ui-asset-pack enforces tenant isolation", async () => {
    const hosts = newHosts();
    hosts.uiAssetPack.register({
      id: "theme-pack:tenant-a",
      extensionId: "tenant-a-theme",
      tenantId: "tenant-a",
      kind: "theme-pack",
      themeId: "tenant-a",
      colorScheme: "light",
      daisyUiVersionRange: "^5.0.0",
      stylesheet: "/ui/assets/tenant-a.css",
    });
    hosts.uiAssetPack.register({
      id: "theme-pack:tenant-b",
      extensionId: "tenant-b-theme",
      tenantId: "tenant-b",
      kind: "theme-pack",
      themeId: "tenant-b",
      colorScheme: "dark",
      daisyUiVersionRange: "^5.0.0",
      stylesheet: "/ui/assets/tenant-b.css",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
    });
    const ids = snapshot.surfaces.uiAssetPack.map((reg) => reg.id);
    expect(ids).toContain("theme-pack:tenant-a");
    expect(ids).not.toContain("theme-pack:tenant-b");
  });
});

describe("federation snapshot tenant isolation — composes with capability gating", () => {
  test("cross-tenant gated registration is rejected even when capability would admit", async () => {
    const hosts = newHosts();
    hosts.sidebar.register({
      id: "gated-tenant-b",
      extensionId: "b",
      tenantId: "tenant-b",
      section: "system",
      position: 0,
      labelKey: "gb",
      href: "/g",
      iconName: "lock",
      capabilityRef: "cap:admin:gated",
    });
    const snapshot = await buildFederatedSnapshot({
      peer: PEER,
      hosts,
      tenantId: "tenant-a",
      capabilityFilter: () => true,
    });
    const ids = snapshot.surfaces.sidebar.map((reg) => reg.id);
    expect(ids).not.toContain("gated-tenant-b");
  });
});
