/**
 * Feature flag snapshot types.
 *
 * Defines shared shapes for feature flag snapshots delivered to clients and
 * used across server-side feature flag evaluation.
 *
 * @shared/types/feature-flags.ts
 */

/**
 * Feature flag snapshot returned by the system API.
 */
export interface FeatureFlagSnapshot {
  /** Flattened boolean flags keyed by dot-path. */
  flags: Record<string, boolean>;
  /** ISO timestamp of the snapshot. */
  updatedAt: string;
  /** Config sections scanned for flags. */
  sources: string[];
}

/**
 * Response envelope for feature flag snapshots.
 */
export interface FeatureFlagsResponse extends FeatureFlagSnapshot {
  /** Indicates success. */
  ok: boolean;
}
