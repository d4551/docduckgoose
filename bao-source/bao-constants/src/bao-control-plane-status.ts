/**
 * Bao control-plane setup-status shared policy constants.
 *
 * Centralizes cache key/channel and minimum clamp values used by
 * setup wizard Bao control-plane status services to avoid literal drift.
 *
 * @shared/constants/bao-control-plane-status
 */

/**
 * Redis key prefix used for Bao control-plane setup-status snapshot entries.
 */
export const BAO_CONTROL_PLANE_STATUS_CACHE_KEY_PREFIX: "bao-control-plane:status" =
  "bao-control-plane:status" as const;

/**
 * Redis lock-key suffix used for Bao control-plane setup-status rebuild locks.
 */
export const BAO_CONTROL_PLANE_STATUS_LOCK_KEY_SUFFIX: "lock" = "lock" as const;

/**
 * Redis pub/sub invalidation channel used by Bao control-plane setup-status snapshots.
 */
export const BAO_CONTROL_PLANE_STATUS_CACHE_INVALIDATION_CHANNEL: "bao-control-plane:status:invalidate" =
  "bao-control-plane:status:invalidate" as const;

/**
 * Minimum in-memory cache TTL accepted by Bao control-plane setup-status snapshots.
 */
export const BAO_CONTROL_PLANE_STATUS_MIN_CACHE_TTL_MS = 0;

/**
 * Minimum timeout accepted by Bao control-plane setup-status network calls.
 */
export const BAO_CONTROL_PLANE_STATUS_MIN_TIMEOUT_MS = 1;

/**
 * Minimum Redis TTL (seconds) accepted by Bao control-plane setup-status snapshots.
 */
export const BAO_CONTROL_PLANE_STATUS_MIN_TTL_SECONDS = 1;

/**
 * Minimum wait duration accepted when setup-status lock acquisition is contended.
 */
export const BAO_CONTROL_PLANE_STATUS_MIN_LOCK_WAIT_MS = 0;

/**
 * Minimum polling interval accepted while waiting on setup-status lock contention.
 */
export const BAO_CONTROL_PLANE_STATUS_MIN_LOCK_POLL_MS = 1;
