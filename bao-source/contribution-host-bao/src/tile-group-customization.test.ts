/**
 * Tile-group host customization semantics — proves the contract
 * required by T-20 user customization (drag/reorder dashboard tiles).
 *
 *   - Position-stable ordering within a dashboard.
 *   - Tie-break on equal position by registration id (deterministic
 *     render order across hot-reload).
 *   - Idempotent re-register from same owner (user drag → re-emit same
 *     id with updated position is allowed, no duplicate-id collision).
 *   - Duplicate id from a DIFFERENT extension owner is rejected
 *     (security: one extension cannot impersonate another).
 *   - Dashboard isolation: a tile registered against dashboard-A never
 *     appears in dashboard-B's snapshot.
 *   - unregisterByOwner removes every registration for that owner
 *     (lifecycle clean-up for `.bao` uninstall).
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
    extensionId: "owner:a",
    dashboardId: "operations",
    labelKey: "dashboards.tiles.operations",
    position: 0,
    width: TILE_GROUP_WIDTHS.full,
    tiles: [],
    ...overrides,
  };
}

describe("tile-group customization — position ordering", () => {
  test("orders tiles within a dashboard ascending by position", () => {
    const host = createTileGroupHost();
    host.register(buildRegistration({ id: "ops:c", position: 200 }));
    host.register(buildRegistration({ id: "ops:a", position: 10 }));
    host.register(buildRegistration({ id: "ops:b", position: 100 }));
    const snapshot = host.snapshotByDashboard().get("operations") ?? [];
    expect(snapshot.map((r) => r.id)).toEqual(["ops:a", "ops:b", "ops:c"]);
  });

  test("equal positions fall back to id-asc tie-break (deterministic across reloads)", () => {
    const host = createTileGroupHost();
    host.register(buildRegistration({ id: "ops:z", position: 50 }));
    host.register(buildRegistration({ id: "ops:a", position: 50 }));
    host.register(buildRegistration({ id: "ops:m", position: 50 }));
    const snapshot = host.snapshotByDashboard().get("operations") ?? [];
    expect(snapshot.map((r) => r.id)).toEqual(["ops:a", "ops:m", "ops:z"]);
  });
});

describe("tile-group customization — drag/reorder mutation", () => {
  test("re-register same id from same owner updates position (drag accepted)", () => {
    const host = createTileGroupHost();
    host.register(buildRegistration({ id: "ops:t1", position: 100 }));
    host.register(buildRegistration({ id: "ops:t2", position: 200 }));
    // User drag: move t2 above t1 by re-registering with lower position.
    const updateResult = host.register(buildRegistration({ id: "ops:t2", position: 50 }));
    expect(updateResult.ok).toBe(true);
    const snapshot = host.snapshotByDashboard().get("operations") ?? [];
    expect(snapshot.map((r) => r.id)).toEqual(["ops:t2", "ops:t1"]);
  });

  test("re-register same id from DIFFERENT owner is rejected (no cross-extension takeover)", () => {
    const host = createTileGroupHost();
    host.register(
      buildRegistration({
        id: "ops:shared",
        extensionId: "owner:a",
        position: 100,
      }),
    );
    const hostile = host.register(
      buildRegistration({
        id: "ops:shared",
        extensionId: "owner:b",
        position: 0,
      }),
    );
    expect(hostile.ok).toBe(false);
    if (hostile.ok) {
      throw new Error("expected duplicate-id rejection");
    }
    expect(hostile.error.kind).toBe("duplicate-id");
    expect(hostile.error.currentOwner).toBe("owner:a");
    expect(hostile.error.attemptedOwner).toBe("owner:b");
    // Original registration unchanged.
    const snapshot = host.snapshotByDashboard().get("operations") ?? [];
    expect(snapshot[0]?.position).toBe(100);
  });
});

describe("tile-group customization — dashboard isolation", () => {
  test("a tile in dashboard-A never appears in dashboard-B's snapshot", () => {
    const host = createTileGroupHost();
    host.register(
      buildRegistration({
        id: "ops:t",
        dashboardId: "operations",
        position: 0,
      }),
    );
    host.register(
      buildRegistration({
        id: "intel:t",
        dashboardId: "intelligence",
        position: 0,
      }),
    );
    const opsSnap = host.snapshotByDashboard().get("operations") ?? [];
    const intelSnap = host.snapshotByDashboard().get("intelligence") ?? [];
    expect(opsSnap.map((r) => r.id)).toEqual(["ops:t"]);
    expect(intelSnap.map((r) => r.id)).toEqual(["intel:t"]);
  });
});

describe("tile-group customization — uninstall lifecycle", () => {
  test("unregisterByOwner removes every registration owned by that extension", () => {
    const host = createTileGroupHost();
    host.register(buildRegistration({ id: "ops:a", extensionId: "owner:x" }));
    host.register(buildRegistration({ id: "ops:b", extensionId: "owner:x" }));
    host.register(buildRegistration({ id: "ops:c", extensionId: "owner:y" }));
    const removed = host.unregisterByOwner("owner:x");
    expect(removed).toBe(2);
    const snapshot = host.snapshotByDashboard().get("operations") ?? [];
    expect(snapshot.map((r) => r.id)).toEqual(["ops:c"]);
  });
});
