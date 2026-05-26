/**
 * FlatBuffer Decode-Side ByteBuffer Pool.
 *
 * Provides a pool of pre-allocated `ByteBuffer`-compatible `Uint8Array` buffers
 * for zero-copy FlatBuffer decoding. Complements the encode-side pool in
 * `builder-pool.ts` by avoiding repeated allocation on the decode path.
 *
 * Tiered allocation supports small (1 KiB), medium (16 KiB), and large
 * (256 KiB) decode buffers.
 *
 * @packageDocumentation
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";
/**
 * Decode buffer size tier.
 */
export type DecodeBufferTier = "small" | "medium" | "large";

/**
 * Size in bytes for each tier.
 */
const TIER_SIZES: Record<DecodeBufferTier, number> = {
  small: 1024,
  medium: 16_384,
  large: 262_144,
};

/**
 * Maximum pool capacity per tier to prevent unbounded memory growth.
 */
const MAX_POOL_SIZE_PER_TIER = 32;

/**
 * Internal pool storage keyed by tier.
 */
const pools: Record<DecodeBufferTier, Uint8Array[]> = {
  small: [],
  medium: [],
  large: [],
};

/**
 * Pool utilization metrics.
 */
export interface DecodePoolMetrics {
  /** Total buffers acquired. */
  acquires: number;
  /** Buffers returned from pool (cache hit). */
  hits: number;
  /** Buffers freshly allocated (cache miss). */
  misses: number;
  /** Buffers returned to pool. */
  releases: number;
  /** Buffers discarded due to full pool. */
  discards: number;
}

const metrics: DecodePoolMetrics = {
  acquires: 0,
  hits: 0,
  misses: 0,
  releases: 0,
  discards: 0,
};

/**
 * Select the appropriate tier for a given byte length.
 *
 * @param byteLength - Required buffer size.
 * @returns Matching tier, or undefined if too large for any tier.
 */
function selectTier(byteLength: number): DecodeBufferTier | undefined {
  let tier: DecodeBufferTier | undefined;
  if (byteLength <= TIER_SIZES.small) {
    tier = "small";
  } else if (byteLength <= TIER_SIZES.medium) {
    tier = "medium";
  } else if (byteLength <= TIER_SIZES.large) {
    tier = "large";
  }
  return tier;
}

/**
 * Acquire a decode buffer from the pool.
 *
 * Returns a pooled buffer when available, or allocates a new one.
 * The buffer is guaranteed to be at least `byteLength` bytes.
 *
 * @param byteLength - Minimum buffer size required.
 * @returns Uint8Array buffer.
 */
export function acquireDecodeBuffer(byteLength: number): Uint8Array {
  metrics.acquires++;
  const tier = selectTier(byteLength);

  if (tier) {
    const pooled = pools[tier].pop();
    if (pooled) {
      metrics.hits++;
      return pooled;
    }
  }

  metrics.misses++;
  const size = tier ? TIER_SIZES[tier] : byteLength;
  return new Uint8Array(size);
}

/**
 * Release a decode buffer back to the pool.
 *
 * Buffers that exceed the maximum pool capacity are discarded.
 *
 * @param buffer - Buffer to return.
 */
export function releaseDecodeBuffer(buffer: Uint8Array): void {
  const tier = selectTier(buffer.byteLength);
  if (!tier) {
    metrics.discards++;
    return;
  }

  if (pools[tier].length >= MAX_POOL_SIZE_PER_TIER) {
    metrics.discards++;
    return;
  }

  metrics.releases++;
  pools[tier].push(buffer);
}

/**
 * Execute a function with a pooled decode buffer.
 *
 * Acquires a buffer, passes it to the callback, and releases it after
 * the callback completes or throws.
 *
 * @param byteLength - Required buffer size.
 * @param fn - Callback receiving the decode buffer.
 * @returns Result of the callback.
 */
export function withPooledDecodeBuffer<T>(byteLength: number, fn: (buffer: Uint8Array) => T): T {
  const buffer = acquireDecodeBuffer(byteLength);
  const result = toResultSync(() => fn(buffer));
  releaseDecodeBuffer(buffer);
  if (!result.ok) {
    throw result.error;
  }
  return result.value;
}

/**
 * Get current pool metrics.
 *
 * @returns Snapshot of pool utilization metrics.
 */
export function getDecodePoolMetrics(): DecodePoolMetrics {
  return { ...metrics };
}

/**
 * Reset pool state and metrics. Intended for testing only.
 */
export function resetDecodePool(): void {
  pools.small.length = 0;
  pools.medium.length = 0;
  pools.large.length = 0;
  metrics.acquires = 0;
  metrics.hits = 0;
  metrics.misses = 0;
  metrics.releases = 0;
  metrics.discards = 0;
}

/**
 * Class-based wrapper for the decode buffer pool.
 *
 * Used by `builder-pool.ts` to acquire/release ArrayBuffers for
 * zero-copy FlatBuffer decoding. Delegates to the module-level
 * pool functions.
 */
export class DecodePool {
  /**
   * Acquire a pooled ArrayBuffer of at least `byteLength` bytes.
   *
   * @param byteLength - Minimum buffer size.
   * @returns Pooled buffer, or null if byteLength exceeds the largest tier.
   */
  acquire(byteLength: number): ArrayBuffer | null {
    const tier = selectTier(byteLength);
    if (!tier) {
      return null;
    }
    const buf = acquireDecodeBuffer(byteLength);
    return buf.buffer as ArrayBuffer;
  }

  /**
   * Release an ArrayBuffer back to the pool.
   *
   * @param buf - Buffer to return.
   */
  release(buf: ArrayBuffer): void {
    releaseDecodeBuffer(new Uint8Array(buf));
  }

  /** Get current pool metrics. */
  getMetrics(): DecodePoolMetrics {
    return getDecodePoolMetrics();
  }

  /**
   * Snapshot decode pool occupancy.
   *
   * @returns Idle buffer counts across all tiers.
   */
  stats(): { idle: number } {
    return {
      idle: pools.small.length + pools.medium.length + pools.large.length,
    };
  }

  /** Reset pool state. Intended for testing. */
  reset(): void {
    resetDecodePool();
  }
}
