/**
 * Server-side federation snapshot cache.
 *
 * The collector is O(n) over every registration on every request plus
 * an O(n) SHA-256 over the serialized surfaces. Under federation load
 * (multiple peers + multiple browser tabs revalidating via SSE) the
 * snapshot endpoint becomes the runtime's hottest read path. This cache
 * keys precomputed envelopes by the tuple of (per-surface version
 * counters + tenantId + selectedSurfaces + redactCapabilityRef) so that
 * lookup is O(1) whenever the local hosts have not mutated between
 * requests.
 *
 * Eviction policy is fixed-size FIFO with a sane upper bound — federation
 * routes only need a handful of variants live at once (one per tenant
 * per partial-surface profile). The cache deliberately does NOT
 * implement LRU since the access pattern is uniform and FIFO is cheaper.
 *
 * @packageDocumentation
 */

import {
  buildFederatedSnapshot,
  type FederationSnapshotHosts,
  type FederationSnapshotInput,
} from "./federation-snapshot.ts";
import type { FederatedContributionSnapshot, FederationSurfaceKey } from "./federation-wire.ts";

/**
 * Maximum cached entries. Federation read load typically holds 1–5
 * variants warm at once (one per tenant per partial-surface profile).
 * Capped to bound memory footprint without LRU complexity.
 */
export const FEDERATION_SNAPSHOT_CACHE_MAX_ENTRIES = 32 as const;

export interface FederationSnapshotCache {
  readonly get: (input: FederationSnapshotInput) => Promise<FederatedContributionSnapshot>;
  readonly size: () => number;
  readonly clearForTests: () => void;
}

function buildCacheKey(input: FederationSnapshotInput): string {
  const v = input.hosts;
  const surfaceSelection =
    input.selectedSurfaces === undefined
      ? "*"
      : Array.from(input.selectedSurfaces).sort().join(",");
  const tenantId = input.tenantId ?? "*";
  const redact = input.redactCapabilityRef === true ? "1" : "0";
  const versions = [
    v.sidebar.version(),
    v.settingsTab.version(),
    v.paletteEntryGroup.version(),
    v.apiGroup.version(),
    v.tileGroup.version(),
    v.uiAssetPack.version(),
  ].join(":");
  return [
    input.peer.peerId,
    input.peer.versionTag,
    versions,
    tenantId,
    redact,
    surfaceSelection,
  ].join("|");
}

/**
 * Build a federation snapshot cache for the supplied hosts. The cache
 * is bound to the hosts via `version()` so callers do NOT need to
 * notify it of mutations — the next snapshot request observes the
 * bumped version and rebuilds.
 */
export function createFederationSnapshotCache(): FederationSnapshotCache {
  const entries = new Map<string, FederatedContributionSnapshot>();

  const get = async (input: FederationSnapshotInput): Promise<FederatedContributionSnapshot> => {
    const key = buildCacheKey(input);
    const cached = entries.get(key);
    if (cached !== undefined) {
      return cached;
    }
    const snapshot = await buildFederatedSnapshot(input);
    entries.set(key, snapshot);
    while (entries.size > FEDERATION_SNAPSHOT_CACHE_MAX_ENTRIES) {
      const oldestKey = entries.keys().next().value;
      if (oldestKey === undefined) {
        break;
      }
      entries.delete(oldestKey);
    }
    return snapshot;
  };

  const size = (): number => entries.size;

  const clearForTests = (): void => {
    entries.clear();
  };

  return { get, size, clearForTests };
}

/**
 * Single-process default cache used by per-app snapshot routes. Each
 * app's route imports this singleton and passes the local
 * {@link FederationSnapshotHosts} on every call. Cache state lives for
 * the lifetime of the process; restart-on-deploy invalidates everything,
 * matching the existing static-asset cache-bust pattern.
 */
let processCache: FederationSnapshotCache | undefined;

export function getProcessFederationSnapshotCache(): FederationSnapshotCache {
  if (processCache === undefined) {
    processCache = createFederationSnapshotCache();
  }
  return processCache;
}

/**
 * Test-only — re-initialize the process-wide cache so per-test state
 * does not bleed.
 */
export function resetProcessFederationSnapshotCacheForTests(): void {
  processCache = createFederationSnapshotCache();
}

export type { FederationSnapshotHosts, FederationSnapshotInput, FederationSurfaceKey };
