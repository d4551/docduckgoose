/**
 * Tile-group contribution host — process-local singleton factory.
 *
 * Mounts a typed `TileGroupRegistration` registry on top of the canonical
 * generic factory in `@baohaus/contribution-registry-bao/registry` with
 * the canonical compare order (`position` → `id`) plus a dashboardId-keyed
 * snapshot partition the dashboard composer consumes.
 *
 * Dashboard ids are dynamic (each app composes its own dashboard set),
 * so the partition is a `ReadonlyMap` rather than a literal record.
 *
 * @packageDocumentation
 */

import {
  createContributionRegistry,
  type RegisterResult,
} from "@baohaus/contribution-registry-bao/registry";
import type { TileGroupRegistration } from "@baohaus/contribution-registry-bao/tile-group";

function compareTileGroupRegistrations(a: TileGroupRegistration, b: TileGroupRegistration): number {
  if (a.position !== b.position) {
    return a.position - b.position;
  }
  return a.id.localeCompare(b.id);
}

export interface TileGroupHost {
  readonly register: (registration: TileGroupRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly TileGroupRegistration[];
  readonly snapshotByDashboard: () => ReadonlyMap<string, readonly TileGroupRegistration[]>;
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
}

export function createTileGroupHost(): TileGroupHost {
  const store = createContributionRegistry<TileGroupRegistration>(compareTileGroupRegistrations);

  function snapshotByDashboard(): ReadonlyMap<string, readonly TileGroupRegistration[]> {
    const buckets = new Map<string, TileGroupRegistration[]>();
    for (const reg of store.snapshot()) {
      const existing = buckets.get(reg.dashboardId);
      if (existing) {
        existing.push(reg);
      } else {
        buckets.set(reg.dashboardId, [reg]);
      }
    }
    const frozen = new Map<string, readonly TileGroupRegistration[]>();
    for (const [dashboardId, regs] of buckets) {
      frozen.set(dashboardId, Object.freeze(regs));
    }
    return frozen;
  }

  return {
    register: store.register,
    unregister: store.unregister,
    unregisterByOwner: store.unregisterByOwner,
    snapshot: store.snapshot,
    snapshotByDashboard,
    size: store.size,
    version: store.version,
    resetForTests: store.resetForTests,
  };
}
