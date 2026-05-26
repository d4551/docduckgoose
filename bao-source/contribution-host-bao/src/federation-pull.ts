/**
 * Canonical federation pull orchestrator.
 *
 * Each Bao app mounts a `/api/v1/ecosystem/contributions/snapshot` endpoint
 * via {@link import("./federation-snapshot.ts").buildFederatedSnapshot} that
 * exposes its 6 contribution-host singletons under the canonical
 * {@link FederatedContributionSnapshot} wire shape. This module is the
 * counterpart consumer: a peer-pull orchestrator that
 *
 *   1. accepts a list of peer endpoints (peerId + base origin) from the
 *      consuming app's config seam (no env reads here),
 *   2. fetches each peer's federated snapshot with `If-None-Match` etag
 *      revalidation (304 short-circuits the body),
 *   3. caches the most recent snapshot per peerId with a TTL plus an
 *      explicit invalidate hook the consumer can wire to the canonical
 *      `@baohaus/ecosystem-events-bao` bus,
 *   4. exposes a {@link mergeFederatedSnapshots} helper that flattens local
 *      + peer snapshots into a single per-surface bucket map stamped with
 *      `originPeerId` and full peer identity so consumers (bao-agent fabric
 *      context, dashboard contribution browser, command palette ecosystem
 *      search) can attribute every registration and resolve peer-hosted
 *      assets without trusting payload-local paths.
 *
 * Pure on the cache layer; the only I/O is the supplied `fetchImpl` (which
 * defaults to globalThis.fetch). No try/catch — failures surface as
 * `Result` discriminators via {@link toResultAsync} so callers handle the
 * peer-down branch via normal control flow.
 *
 * @packageDocumentation
 */
import { toResultAsync } from "@baohaus/bao-utils/async-result";
import {
  FEDERATION_SNAPSHOT_ETAG_HEADER,
  FEDERATION_SNAPSHOT_IF_NONE_MATCH_HEADER,
  FEDERATION_SNAPSHOT_ROUTE_PATH,
  FEDERATION_SNAPSHOT_SCHEMA_VERSION,
  type FederatedContributionSnapshot,
  type FederatedContributionSurfaces,
  type FederatedPeerIdentity,
} from "./federation-wire.ts";

/**
 * Identifying tuple the orchestrator uses to call a peer. `peerId` is the
 * stable per-app identifier (e.g. `"registry"`, `"forge"`,
 * `"bao-ai-gateway"`) used as the cache key + the merged-view bucket key.
 * `origin` is the absolute base URL the orchestrator hits — `${origin}` +
 * `FEDERATION_SNAPSHOT_ROUTE_PATH`.
 */
export interface FederationPullPeerEndpoint {
  readonly peerId: string;
  readonly origin: string;
}

/**
 * Per-peer cache entry. `etag` enables revalidation; `snapshot` is the most
 * recent successful pull. `peerId` matches the request endpoint, NOT the
 * peer-reported `peer.peerId` (the orchestrator never trusts peer-reported
 * identity for cache keys — peer-reported identity is informational only).
 */
interface FederationPullCacheEntry {
  readonly peerId: string;
  readonly etag: string;
  readonly snapshot: FederatedContributionSnapshot;
  readonly fetchedAt: number;
}

/**
 * Orchestrator dependency seam — accepts the fetch implementation + a clock
 * for deterministic tests. `cacheTtlMs` controls the soft expiration window
 * after which a peer's cached snapshot is considered stale and re-fetched
 * even without an invalidate signal.
 */
export type FederationPullFetchImpl = (
  input: URL | RequestInfo,
  init?: RequestInit,
) => Promise<Response>;

export interface FederationPullOptions {
  readonly fetchImpl?: FederationPullFetchImpl;
  readonly now?: () => number;
  readonly cacheTtlMs?: number;
}

const DEFAULT_CACHE_TTL_MS = 30_000;

interface FederationPullCacheState {
  readonly entries: Map<string, FederationPullCacheEntry>;
}

const createCache = (): FederationPullCacheState => ({ entries: new Map() });

/**
 * Public orchestrator surface returned by {@link createFederationPullOrchestrator}.
 *
 * `pullPeer` fetches one peer; `pullAll` fans out across the supplied
 * endpoints. `invalidate` drops the cache entry for a peer (call this from
 * the canonical `ecosystemEventBus` subscriber so cross-process events
 * trigger the next pull to re-fetch fresh data instead of waiting for the
 * TTL).
 */
export interface FederationPullOrchestrator {
  pullPeer(endpoint: FederationPullPeerEndpoint): Promise<FederationPullPeerResult>;
  pullAll(
    endpoints: readonly FederationPullPeerEndpoint[],
  ): Promise<readonly FederationPullPeerResult[]>;
  invalidate(peerId: string): void;
  invalidateAll(): void;
  cachedSnapshots(): readonly FederatedContributionSnapshot[];
}

/** Per-peer pull outcome. `kind` discriminator drives downstream branching. */
export type FederationPullPeerResult =
  | {
      readonly kind: "ok";
      readonly peerId: string;
      readonly snapshot: FederatedContributionSnapshot;
      readonly fromCache: boolean;
    }
  | {
      readonly kind: "not-modified";
      readonly peerId: string;
      readonly snapshot: FederatedContributionSnapshot;
    }
  | {
      readonly kind: "schema-rejected";
      readonly peerId: string;
      readonly schemaVersion: number;
    }
  | {
      readonly kind: "peer-down";
      readonly peerId: string;
      readonly reason: string;
    };

function isIndexableObject(value: unknown): value is { readonly [k: string]: unknown } {
  return value !== null && typeof value === "object";
}

function isFederatedContributionSnapshot(value: unknown): value is FederatedContributionSnapshot {
  if (!isIndexableObject(value)) {
    return false;
  }
  if (
    typeof value["schemaVersion"] !== "number" ||
    typeof value["snapshotAt"] !== "string" ||
    typeof value["etag"] !== "string" ||
    !isIndexableObject(value["peer"]) ||
    !isIndexableObject(value["surfaces"])
  ) {
    return false;
  }
  return true;
}

type FederationPullFetchImplSignature = (
  input: URL | RequestInfo,
  init?: RequestInit,
) => Promise<Response>;

async function fetchPeerSnapshot(
  endpoint: FederationPullPeerEndpoint,
  cached: FederationPullCacheEntry | undefined,
  fetchImpl: FederationPullFetchImplSignature,
): Promise<FederationPullPeerResult> {
  const url = new URL(FEDERATION_SNAPSHOT_ROUTE_PATH, endpoint.origin).toString();
  const headers: Record<string, string> = { accept: "application/json" };
  if (cached !== undefined) {
    headers[FEDERATION_SNAPSHOT_IF_NONE_MATCH_HEADER] = cached.etag;
  }
  const responseResult = await toResultAsync(fetchImpl(url, { headers }));
  if (!responseResult.ok) {
    const reason =
      responseResult.error instanceof Error
        ? responseResult.error.message
        : String(responseResult.error);
    return { kind: "peer-down", peerId: endpoint.peerId, reason };
  }
  const response = responseResult.value;
  if (response.status === 304 && cached !== undefined) {
    return {
      kind: "not-modified",
      peerId: endpoint.peerId,
      snapshot: cached.snapshot,
    };
  }
  if (!response.ok) {
    return {
      kind: "peer-down",
      peerId: endpoint.peerId,
      reason: `HTTP ${response.status}`,
    };
  }
  const bodyResult = await toResultAsync(response.json());
  if (!bodyResult.ok) {
    return {
      kind: "peer-down",
      peerId: endpoint.peerId,
      reason: "json-parse-failed",
    };
  }
  const body = bodyResult.value;
  if (!isFederatedContributionSnapshot(body)) {
    return {
      kind: "peer-down",
      peerId: endpoint.peerId,
      reason: "schema-shape-rejected",
    };
  }
  if (body.schemaVersion !== FEDERATION_SNAPSHOT_SCHEMA_VERSION) {
    return {
      kind: "schema-rejected",
      peerId: endpoint.peerId,
      schemaVersion: body.schemaVersion,
    };
  }
  return {
    kind: "ok",
    peerId: endpoint.peerId,
    snapshot: body,
    fromCache: false,
  };
}

/**
 * Construct a per-process orchestrator instance. Single instance per
 * consuming app — instantiate at boot, retain for process lifetime,
 * call `invalidate(peerId)` from the ecosystem-events subscriber.
 */
export function createFederationPullOrchestrator(
  options: FederationPullOptions = {},
): FederationPullOrchestrator {
  const fetchImpl = options.fetchImpl ?? fetch.bind(globalThis);
  const now = options.now ?? Date.now;
  const cacheTtlMs = options.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS;
  const cache = createCache();

  const pullPeer = async (
    endpoint: FederationPullPeerEndpoint,
  ): Promise<FederationPullPeerResult> => {
    const existing = cache.entries.get(endpoint.peerId);
    const fresh = existing !== undefined && now() - existing.fetchedAt < cacheTtlMs;
    if (fresh) {
      return {
        kind: "ok",
        peerId: endpoint.peerId,
        snapshot: existing.snapshot,
        fromCache: true,
      };
    }
    const outcome = await fetchPeerSnapshot(endpoint, existing, fetchImpl);
    if (outcome.kind === "ok") {
      cache.entries.set(endpoint.peerId, {
        peerId: endpoint.peerId,
        etag: outcome.snapshot.etag,
        snapshot: outcome.snapshot,
        fetchedAt: now(),
      });
    } else if (outcome.kind === "not-modified" && existing !== undefined) {
      cache.entries.set(endpoint.peerId, { ...existing, fetchedAt: now() });
    }
    return outcome;
  };

  const pullAll = (endpoints: readonly FederationPullPeerEndpoint[]) =>
    Promise.all(endpoints.map(pullPeer));

  const invalidate = (peerId: string): void => {
    cache.entries.delete(peerId);
  };

  const invalidateAll = (): void => {
    cache.entries.clear();
  };

  const cachedSnapshots = (): readonly FederatedContributionSnapshot[] =>
    Array.from(cache.entries.values()).map((entry) => entry.snapshot);

  return { pullPeer, pullAll, invalidate, invalidateAll, cachedSnapshots };
}

/**
 * Per-surface merged bucket where every entry remembers its origin peer.
 * Consumers (bao-agent fabric context, dashboard, palette) iterate the
 * buckets without caring which peer contributed which entry; the
 * `originPeerId` and `originPeer` are preserved on each entry for
 * attribution chips, audit, and peer-hosted asset resolution.
 */
export interface MergedFederatedRegistration<T> {
  readonly originPeerId: string;
  readonly originPeer: FederatedPeerIdentity;
  readonly registration: T;
}

export interface MergedFederatedSurfaces {
  readonly sidebar: readonly MergedFederatedRegistration<
    FederatedContributionSurfaces["sidebar"][number]
  >[];
  readonly settingsTab: readonly MergedFederatedRegistration<
    FederatedContributionSurfaces["settingsTab"][number]
  >[];
  readonly paletteEntryGroup: readonly MergedFederatedRegistration<
    FederatedContributionSurfaces["paletteEntryGroup"][number]
  >[];
  readonly apiGroup: readonly MergedFederatedRegistration<
    FederatedContributionSurfaces["apiGroup"][number]
  >[];
  readonly tileGroup: readonly MergedFederatedRegistration<
    FederatedContributionSurfaces["tileGroup"][number]
  >[];
  readonly topbar: readonly MergedFederatedRegistration<
    FederatedContributionSurfaces["topbar"][number]
  >[];
  readonly uiAssetPack: readonly MergedFederatedRegistration<
    FederatedContributionSurfaces["uiAssetPack"][number]
  >[];
}

/**
 * Flatten an array of {@link FederatedContributionSnapshot} (typically the
 * local snapshot + every peer snapshot) into a single per-surface bucket
 * map. The returned shape is JSON-safe and stamped with `originPeerId`
 * and `originPeer` per entry so consumers can render attribution chips and
 * resolve peer-hosted asset routes.
 *
 * Order is stable: snapshots are merged in the supplied order; within each
 * snapshot the upstream `host.snapshot()` order is preserved.
 */
export function mergeFederatedSnapshots(
  snapshots: readonly FederatedContributionSnapshot[],
): MergedFederatedSurfaces {
  const sidebar: MergedFederatedRegistration<FederatedContributionSurfaces["sidebar"][number]>[] =
    [];
  const settingsTab: MergedFederatedRegistration<
    FederatedContributionSurfaces["settingsTab"][number]
  >[] = [];
  const paletteEntryGroup: MergedFederatedRegistration<
    FederatedContributionSurfaces["paletteEntryGroup"][number]
  >[] = [];
  const apiGroup: MergedFederatedRegistration<FederatedContributionSurfaces["apiGroup"][number]>[] =
    [];
  const tileGroup: MergedFederatedRegistration<
    FederatedContributionSurfaces["tileGroup"][number]
  >[] = [];
  const topbar: MergedFederatedRegistration<FederatedContributionSurfaces["topbar"][number]>[] = [];
  const uiAssetPack: MergedFederatedRegistration<
    FederatedContributionSurfaces["uiAssetPack"][number]
  >[] = [];
  for (const snapshot of snapshots) {
    const originPeer = snapshot.peer;
    const peerId = originPeer.peerId;
    for (const reg of snapshot.surfaces.sidebar) {
      sidebar.push({ originPeerId: peerId, originPeer, registration: reg });
    }
    for (const reg of snapshot.surfaces.settingsTab) {
      settingsTab.push({ originPeerId: peerId, originPeer, registration: reg });
    }
    for (const reg of snapshot.surfaces.paletteEntryGroup) {
      paletteEntryGroup.push({
        originPeerId: peerId,
        originPeer,
        registration: reg,
      });
    }
    for (const reg of snapshot.surfaces.apiGroup) {
      apiGroup.push({ originPeerId: peerId, originPeer, registration: reg });
    }
    for (const reg of snapshot.surfaces.tileGroup) {
      tileGroup.push({ originPeerId: peerId, originPeer, registration: reg });
    }
    for (const reg of snapshot.surfaces.topbar) {
      topbar.push({ originPeerId: peerId, originPeer, registration: reg });
    }
    for (const reg of snapshot.surfaces.uiAssetPack) {
      uiAssetPack.push({ originPeerId: peerId, originPeer, registration: reg });
    }
  }
  return {
    sidebar,
    settingsTab,
    paletteEntryGroup,
    apiGroup,
    tileGroup,
    topbar,
    uiAssetPack,
  };
}
