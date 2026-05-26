/**
 * Tile-group contribution host — host-factory tests.
 *
 * @packageDocumentation
 */

import { describe, expect, test } from "bun:test";
import {
  TILE_GROUP_WIDTHS,
  type TileGroupRegistration,
} from "@baohaus/contribution-registry-bao/tile-group";
import { createTileGroupHost } from "./tile-group.ts";

function buildRegistration(
  overrides: Partial<TileGroupRegistration> & Pick<TileGroupRegistration, "id">,
): TileGroupRegistration {
  return {
    extensionId: "test:owner",
    dashboardId: "operations",
    labelKey: "dashboards.tiles.operations",
    position: 0,
    width: TILE_GROUP_WIDTHS.full,
    tiles: [],
    ...overrides,
  };
}

describe("createTileGroupHost", () => {
  test("returns independent process-local hosts", () => {
    const a = createTileGroupHost();
    const b = createTileGroupHost();
    a.register(buildRegistration({ id: "a:tile" }));
    expect(a.size()).toBe(1);
    expect(b.size()).toBe(0);
  });

  test("snapshotByDashboard groups by dashboardId in compare-ordered first-seen order", () => {
    const host = createTileGroupHost();
    host.register(
      buildRegistration({
        id: "ops:b",
        dashboardId: "operations",
        labelKey: "dashboards.tiles.operations",
        position: 100,
      }),
    );
    host.register(
      buildRegistration({
        id: "intel:a",
        dashboardId: "intelligence",
        labelKey: "dashboards.tiles.intelligence",
        position: 50,
      }),
    );
    const grouped = host.snapshotByDashboard();
    expect([...grouped.keys()]).toEqual(["intelligence", "operations"]);
  });
});
