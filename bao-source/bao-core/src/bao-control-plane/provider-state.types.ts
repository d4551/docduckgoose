/**
 * BaoControlPlane provider state shared types.
 *
 * Canonical shape for provider state consumed by scripts and server.
 * Single source of truth for requestedProvider, resolvedProvider,
 * autoResolutionReason, privilegedOwnerStatus, bootstrapMode.
 *
 * @packageDocumentation
 */

/** Availability/version state for the privileged host runtime owner. */
export type BaoControlPlanePrivilegedOwnerStatus = "available" | "unavailable" | "version-mismatch";

/** Canonical bootstrap mode derived from resolved provider. */
export type BaoControlPlaneBootstrapMode = "attached" | "bootstrap-kind" | "bootstrap-direct";

/**
 * Canonical provider state shape from local-cluster summary.
 *
 * Artifact and consumers both use `autoResolutionReason`.
 */
export interface BaoControlPlaneProviderStateShape {
  requestedProvider: string | null;
  resolvedProvider: string | null;
  /** Stable auto-resolution reason when the provider differs from the request. */
  autoResolutionReason: string | null;
  privilegedOwnerStatus: BaoControlPlanePrivilegedOwnerStatus | null;
  bootstrapMode: BaoControlPlaneBootstrapMode;
}
