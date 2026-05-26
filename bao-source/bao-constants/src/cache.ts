/**
 * Centralized cache configuration defaults.
 *
 * SSOT for cache-related magic numbers to avoid scattering across services.
 *
 * @shared/constants/cache
 */

import { SECONDS_PER_HOUR } from "./time";

/**
 * Canonical default cache configuration values.
 *
 * Centralized so L1 size, cleanup cadence, and TTL defaults live in one
 * place instead of being duplicated across cache service constructors.
 */
export const CACHE_CONFIG: {
  readonly maxKeysDefault: 10000;
  readonly checkPeriodSecondsDefault: 60;
  readonly l1DefaultTtlSeconds: 600;
  readonly redisDefaultTtlSeconds: typeof SECONDS_PER_HOUR;
} = {
  /** Default maximum number of keys in L1 cache. */
  maxKeysDefault: 10_000,
  /** Default cleanup check period in seconds. */
  checkPeriodSecondsDefault: 60,
  /** Default L1 cache TTL in seconds. */
  l1DefaultTtlSeconds: 600,
  /** Default Redis cache TTL in seconds. */
  redisDefaultTtlSeconds: SECONDS_PER_HOUR,
} as const;
