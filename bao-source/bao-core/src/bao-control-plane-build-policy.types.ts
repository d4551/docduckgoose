/**
 * Shared types for the BaoControlPlane build planner and instrumentation layer.
 *
 * Consumed by both the build script (`scripts/bao-control-plane/build-images.ts`) and
 * server-side services for cache management and SLO evaluation.
 *
 * @packageDocumentation
 */

/**
 * Content-addressed fingerprint for a single image build specification.
 *
 * Captures every input that can influence the resulting OCI image so that
 * two builds with identical fingerprints produce bit-identical layers.
 */
export interface BuildSpecFingerprint {
  /** Logical image spec name (e.g. `server`, `drone-bunbuddy`). */
  specName: string;

  /** SHA-256 of the Containerfile content. */
  containerfileHash: string;

  /** SHA-256 of the sorted, concatenated context file tree hashes. */
  contextTreeHash: string;

  /** Opaque hash of build-time config (builder flags, platform, env). */
  configHash: string;

  /**
   * Composite fingerprint derived from all fields above.
   *
   * `sha256(specName + containerfileHash + contextTreeHash + configHash)`
   */
  compositeDigest: string;
}

/**
 * Cached result from a previous successful build.
 */
export interface BuildResultCacheEntry {
  /** Fingerprint that produced this build. */
  fingerprint: BuildSpecFingerprint;

  /** OCI manifest digest from the build result. */
  manifestDigest: string;

  /** ISO-8601 timestamp of the build completion. */
  builtAt: string;

  /** Git branch or ref active during the build. */
  branch: string;
}

/**
 * Classification of a single spec within a build plan.
 */
export type BuildPlanEntryAction = "rebuild" | "skip";

/**
 * Single entry in a computed build plan.
 */
export interface BuildPlanEntry {
  /** Image spec name. */
  specName: string;

  /** Computed action for this spec. */
  action: BuildPlanEntryAction;

  /** Current fingerprint for this spec. */
  fingerprint: BuildSpecFingerprint;

  /** Cached entry (present only when `action === 'skip'`). */
  cachedEntry?: BuildResultCacheEntry | undefined;

  /** Human-readable reason for the chosen action. */
  reason: string;
}

/**
 * Complete build plan produced by the planner.
 */
export interface BuildPlan {
  /** All entries, both rebuild and skip. */
  entries: BuildPlanEntry[];

  /** Entries classified as needing a rebuild. */
  changed: BuildPlanEntry[];

  /** Entries classified as skippable (cache hit). */
  skipped: BuildPlanEntry[];

  /** ISO-8601 timestamp when the plan was computed. */
  computedAt: string;

  /** Build mode that produced this plan. */
  mode: BaoControlPlaneBuildMode;
}

/**
 * Supported build modes for the planner.
 */
export type BaoControlPlaneBuildMode = "full" | "changed-only" | "policy";

/**
 * Build planner configuration.
 */
export interface BaoControlPlaneBuildPlannerConfig {
  /** Build mode. Default: `'full'`. */
  mode: BaoControlPlaneBuildMode;

  /**
   * When `true`, a fingerprint mismatch between the cache and current state
   * causes the build to fail rather than triggering a rebuild.
   */
  cacheStrict: boolean;

  /** Maximum parallel build stages. */
  parallelStages: number;

  /** Maximum parallel layer copies. */
  parallelCopies: number;

  /** Skip unchanged specs entirely (no push, no tag). */
  skipWhenUnchanged: boolean;

  /** Path to the persisted planner cache snapshot file. */
  cacheFilePath: string;

  /** Timeout (ms) for git context-listing commands before falling back to filesystem scan. */
  gitContextTimeoutMs: number;
}

/**
 * Build planner metrics snapshot.
 */
export interface BuildPlannerMetrics {
  /** Total specs evaluated. */
  totalSpecs: number;

  /** Specs skipped due to cache hit. */
  cacheHits: number;

  /** Specs rebuilt. */
  rebuilds: number;

  /** Cache hit ratio (0–1). */
  cacheHitRatio: number;

  /** Time spent computing the plan (ms). */
  planComputeMs: number;
}
