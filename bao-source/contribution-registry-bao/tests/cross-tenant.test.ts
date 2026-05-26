/**
 * Cross-tenant isolation invariants for the contribution registry.
 *
 * Block 14 of the cycle-3 plan asserts that registrations issued under
 * one `tenantId` must never appear in a snapshot taken for a different
 * `tenantId`. This file is the canonical test gate for that invariant
 * across every surface that consumes
 * {@link createContributionRegistry} (sidebar, settings-tab,
 * palette-entry-group, api-group, tile-group).
 *
 * @packageDocumentation
 */

import { describe, expect, it } from "bun:test";
import { createContributionRegistry } from "../src/registry.ts";
import type { TileGroupRegistration } from "../src/tile-group.ts";
import { TILE_GROUP_WIDTHS } from "../src/tile-group.ts";

const fixture = (
  overrides: Partial<TileGroupRegistration> & Pick<TileGroupRegistration, "id">,
): TileGroupRegistration => ({
  extensionId: "test-ext",
  dashboardId: "crm",
  position: 0,
  tiles: [
    {
      id: `${overrides.id}-tile-1`,
      labelKey: "test.tile",
      width: TILE_GROUP_WIDTHS.wide,
      renderUrl: `/dashboards/crm/sections/${overrides.id}/tile-1`,
    },
  ],
  ...overrides,
});

const compare = (a: TileGroupRegistration, b: TileGroupRegistration): number => {
  if (a.dashboardId !== b.dashboardId) {
    return a.dashboardId.localeCompare(b.dashboardId);
  }
  if (a.position !== b.position) {
    return a.position - b.position;
  }
  return a.id.localeCompare(b.id);
};

describe("contribution-registry tenant isolation", () => {
  it("snapshot({ tenantId: A }) returns A entries + globals, never B entries", () => {
    const registry = createContributionRegistry<TileGroupRegistration>(compare);

    registry.register(fixture({ id: "global-tile", tenantId: null, position: 0 }));
    registry.register(fixture({ id: "tenant-a-tile", tenantId: "tenant-A", position: 1 }));
    registry.register(fixture({ id: "tenant-b-tile", tenantId: "tenant-B", position: 2 }));

    const snapshotA = registry.snapshot({ tenantId: "tenant-A" });
    const snapshotB = registry.snapshot({ tenantId: "tenant-B" });

    expect(snapshotA.map((entry) => entry.id)).toEqual(["global-tile", "tenant-a-tile"]);
    expect(snapshotB.map((entry) => entry.id)).toEqual(["global-tile", "tenant-b-tile"]);
    expect(snapshotA.some((entry) => entry.tenantId === "tenant-B")).toBe(false);
    expect(snapshotB.some((entry) => entry.tenantId === "tenant-A")).toBe(false);
  });

  it("snapshot() with no options returns the global view (every tenant)", () => {
    const registry = createContributionRegistry<TileGroupRegistration>(compare);
    registry.register(fixture({ id: "g", tenantId: null, position: 0 }));
    registry.register(fixture({ id: "a", tenantId: "tenant-A", position: 1 }));
    registry.register(fixture({ id: "b", tenantId: "tenant-B", position: 2 }));

    const ids = registry.snapshot().map((entry) => entry.id);
    expect(ids).toEqual(["g", "a", "b"]);
  });

  it("registrations without an explicit tenantId default to global visibility", () => {
    const registry = createContributionRegistry<TileGroupRegistration>(compare);
    registry.register(fixture({ id: "no-tenant", position: 0 }));

    expect(registry.snapshot({ tenantId: "tenant-A" }).length).toBe(1);
    expect(registry.snapshot({ tenantId: "tenant-B" }).length).toBe(1);
  });

  it("snapshot({ tenantId: null }) returns the global view", () => {
    const registry = createContributionRegistry<TileGroupRegistration>(compare);
    registry.register(fixture({ id: "g", tenantId: null, position: 0 }));
    registry.register(fixture({ id: "a", tenantId: "tenant-A", position: 1 }));

    expect(registry.snapshot({ tenantId: null }).map((entry) => entry.id)).toEqual(["g", "a"]);
  });
});
