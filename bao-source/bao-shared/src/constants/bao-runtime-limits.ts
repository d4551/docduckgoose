/**
 * BaoControlPlane limit defaults.
 *
 * Centralizes non-timeout numeric limits used by BaoControlPlane runtime diagnostics so
 * they can be overridden via typed config without scattering magic numbers.
 *
 * @shared/constants/bao-runtime-limits
 */

/**
 * Default maximum concurrency for BaoControlPlane runtime probe execution.
 *
 * This limits parallel external calls (Kubernetes API, GitOps health, Package CRD,
 * BunBuddy fleet, OCI registry) to avoid saturating the runtime.
 */
export const DEFAULT_BAO_RUNTIME_PROBE_CONCURRENCY = 4;

/**
 * Default maximum number of idempotency cache entries retained for BaoControlPlane runtime.
 */
export const DEFAULT_BAO_RUNTIME_IDEMPOTENCY_MAX_ENTRIES = 100;

/**
 * Maximum idempotency key length accepted by BaoControlPlane runtime APIs.
 *
 * Kept bounded to prevent unbounded in-memory key growth in runtime diagnostics.
 */
export const BAO_RUNTIME_IDEMPOTENCY_KEY_MAX_LENGTH = 128;

/**
 * Default additive timeout buffer for BaoControlPlane runtime refresh/ensure operations.
 */
export const DEFAULT_BAO_CONTROL_PLANE_GATE_REQUEST_TIMEOUT_BUFFER_MS = 5_000;

/**
 * Default HTTP timeout for local BaoControlPlane registry status probes.
 */
export const DEFAULT_BAO_CONTROL_PLANE_LOCAL_STATUS_REQUEST_TIMEOUT_MS = 5_000;

/**
 * Default distributed lock TTL in seconds for BaoControlPlane runtime snapshots.
 */
export const DEFAULT_BAO_RUNTIME_DISTRIBUTED_LOCK_TTL_SECONDS = 30;

/**
 * Default retry delay in milliseconds when BaoControlPlane runtime lock acquisition is contended.
 */
export const DEFAULT_BAO_RUNTIME_DISTRIBUTED_LOCK_RETRY_DELAY_MS = 500;

/**
 * Default schedule interval in milliseconds for BaoControlPlane runtime background health checks.
 */
export const DEFAULT_BAO_RUNTIME_HEALTH_CHECK_SCHEDULE_MS = 60_000;

/**
 * Default singleton lease window (seconds) for BaoControlPlane runtime health-check jobs.
 */
export const DEFAULT_BAO_RUNTIME_HEALTH_CHECK_SINGLETON_SECONDS = 60;

/**
 * Default polling interval in milliseconds when waiting for GitOps sync namespace readiness.
 */
export const DEFAULT_BAO_CONTROL_PLANE_GITOPS_NAMESPACE_READY_POLL_MS = 750;
