/**
 * Unit tests for the canonical `TileGroupRegistration` shape and its
 * interaction with the generic contribution registry factory.
 *
 * @packageDocumentation
 */

import { describe, expect, it } from "bun:test";
import { createContributionRegistry } from "../src/registry.ts";
import { TILE_GROUP_WIDTHS, type TileGroupRegistration } from "../src/tile-group.ts";

const fixture = (
  overrides: Partial<TileGroupRegistration> & Pick<TileGroupRegistration, "id">,
): TileGroupRegistration => ({
  extensionId: "fixture",
  dashboardId: "crm",
  position: 0,
  tiles: [
    {
      id: `${overrides.id}-tile-1`,
      labelKey: "dashboards.crm.tile.activity",
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

describe("TileGroupRegistration via contribution-registry", () => {
  it("registers a tile group and returns an order-stable snapshot", () => {
    const registry = createContributionRegistry<TileGroupRegistration>(compare);

    expect(registry.register(fixture({ id: "crm-activity", position: 1 })).ok).toBe(true);
    expect(registry.register(fixture({ id: "crm-pipeline", position: 0 })).ok).toBe(true);

    const snapshot = registry.snapshot();
    expect(snapshot.map((entry) => entry.id)).toEqual(["crm-pipeline", "crm-activity"]);
  });

  it("rejects a duplicate id from a different extensionId", () => {
    const registry = createContributionRegistry<TileGroupRegistration>(compare);
    registry.register(fixture({ id: "crm-activity", extensionId: "owner-a" }));

    const result = registry.register(fixture({ id: "crm-activity", extensionId: "owner-b" }));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe("duplicate-id");
      expect(result.error.currentOwner).toBe("owner-a");
      expect(result.error.attemptedOwner).toBe("owner-b");
    }
  });

  it("clears every registration belonging to a single owner", () => {
    const registry = createContributionRegistry<TileGroupRegistration>(compare);
    registry.register(fixture({ id: "crm-a", extensionId: "ext-1" }));
    registry.register(fixture({ id: "crm-b", extensionId: "ext-1" }));
    registry.register(fixture({ id: "crm-c", extensionId: "ext-2" }));

    expect(registry.unregisterByOwner("ext-1")).toBe(2);
    expect(registry.snapshot().map((entry) => entry.id)).toEqual(["crm-c"]);
  });

  it("preserves the canonical tile width tokens", () => {
    expect(TILE_GROUP_WIDTHS.narrow).toBe("narrow");
    expect(TILE_GROUP_WIDTHS.wide).toBe("wide");
    expect(TILE_GROUP_WIDTHS.full).toBe("full");
  });
});
