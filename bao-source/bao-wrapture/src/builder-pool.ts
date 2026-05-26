import { Builder } from "@baohaus/flatbuf-bao/builder";
import { ByteBuffer } from "@baohaus/flatbuf-bao/reader";
/**
 * FlatBuffers Builder pool for high-frequency encode paths.
 *
 * Eliminates per-encode Builder allocation by pooling instances per capacity tier.
 * After `clear()`, a Builder retains its backing buffer, avoiding GC pressure
 * on hot paths like telemetry (10–50 Hz per device) and event streams.
 *
 * Decode helpers use scoped `ByteBuffer` instances so callers keep
 * a consistent acquire/release lifecycle without relying on library internals.
 *
 * @shared/wrapture
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";

import { DecodePool } from "./decode-pool";
import { type VerifyOptions, verifyFlatBuffer } from "./verifier";

const TIER_256 = 256;
const TIER_512 = 512;
const TIER_1024 = 1024;
const TIER_2048 = 2048;
const TIER_4096 = 4096;
const TIER_8192 = 8192;
const TIER_16384 = 16384;

/**
 * Capacity tier for builder pool buckets.
 * Builders are pooled by tier so a 256-byte encode doesn't waste a 8 KiB builder.
 */
const POOL_TIERS = [
  TIER_256,
  TIER_512,
  TIER_1024,
  TIER_2048,
  TIER_4096,
  TIER_8192,
  TIER_16384,
] as const;

type PoolTier = (typeof POOL_TIERS)[number];

/** Per-tier pool of idle builders. */
const builderPools: Map<PoolTier, Builder[]> = new Map<PoolTier, Builder[]>();

/** Maximum idle builders retained per tier. */
const MAX_POOL_SIZE_PER_TIER = 8;

/** Total builders ever created (diagnostic). */
let totalCreated = 0;
/** Total acquire calls satisfied from pool (diagnostic). */
let totalPoolHits = 0;
/** Total acquire calls that allocated a new builder (diagnostic). */
let totalPoolMisses = 0;
/** Total ByteBuffer acquires from pool (diagnostic). */
let bbPoolHits = 0;
/** Total ByteBuffer allocations (diagnostic). */
let bbPoolMisses = 0;

/** Shared decode pool backing ByteBuffer acquire/release. */
const decodePool: DecodePool = new DecodePool();

/**
 * Resolve the pool tier that fits a requested capacity.
 *
 * @param capacity - Minimum builder capacity in bytes.
 * @returns Matching tier or undefined for oversized requests.
 */
function resolveTier(capacity: number): PoolTier | undefined {
  let resolvedTier: PoolTier | undefined;
  for (const tier of POOL_TIERS) {
    if (capacity <= tier) {
      resolvedTier = tier;
      return resolvedTier;
    }
  }

  return resolvedTier;
}

/**
 * Acquire a FlatBuffers Builder from the pool.
 *
 * Returns a cleared, ready-to-use builder. If the pool is empty for the
 * requested tier, a new builder is allocated.
 *
 * @param capacity - Minimum initial capacity in bytes.
 * @returns A cleared Builder instance.
 */
export function acquireBuilder(capacity: number): Builder {
  const tier = resolveTier(capacity);
  if (tier) {
    const pool = builderPools.get(tier);
    if (pool && pool.length > 0) {
      totalPoolHits++;
      const builder = pool.pop();
      if (builder) {
        builder.clear();
        return builder;
      }
    }
  }

  totalPoolMisses++;
  totalCreated++;
  const effectiveCapacity = tier ?? Math.max(capacity, TIER_256);
  return new Builder(effectiveCapacity);
}

/**
 * Release a Builder back to the pool for reuse.
 *
 * Builders beyond `MAX_POOL_SIZE_PER_TIER` are dropped for GC.
 * Always call this after extracting the encoded bytes.
 *
 * @param builder - Builder to return.
 * @param capacity - Original capacity hint used during acquire.
 */
export function releaseBuilder(builder: Builder, capacity: number): void {
  const tier = resolveTier(capacity);
  if (!tier) {
    return;
  }

  let pool = builderPools.get(tier);
  if (!pool) {
    pool = [];
    builderPools.set(tier, pool);
  }

  if (pool.length < MAX_POOL_SIZE_PER_TIER) {
    pool.push(builder);
  }
}

/**
 * Encode using a pooled builder with automatic acquire/release lifecycle.
 *
 * Uses `toResultSync` for deterministic release on callback failure.
 * The callback receives a cleared builder and must return encoded bytes
 * (typically via `builder.asUint8Array().slice()`).
 *
 * @param capacity - Minimum builder capacity in bytes.
 * @param fn - Encoding function that uses the builder and returns bytes.
 * @returns Encoded bytes from the callback.
 */
export function withPooledBuilder(
  capacity: number,
  fn: (builder: Builder) => Uint8Array<ArrayBuffer>,
): Uint8Array<ArrayBuffer> {
  const builder = acquireBuilder(capacity);
  const result = toResultSync(() => fn(builder));
  releaseBuilder(builder, capacity);
  if (!result.ok) {
    throw result.error;
  }
  return result.value;
}

/**
 * Encode using a pooled builder with forceDefaults enabled.
 *
 * When forceDefaults is true, all fields are serialized even when set to their
 * default values. This produces predictable wire sizes for struct-heavy payloads
 * (telemetry, perception) where zero-valued scalars carry semantic meaning.
 *
 * @param capacity - Minimum builder capacity in bytes.
 * @param fn - Encoding function that uses the builder and returns bytes.
 * @returns Encoded bytes from the callback.
 */
export function withPooledBuilderForceDefaults(
  capacity: number,
  fn: (builder: Builder) => Uint8Array,
): Uint8Array {
  const builder = acquireBuilder(capacity);
  builder.forceDefaults(true);
  const result = toResultSync(() => fn(builder));
  builder.forceDefaults(false);
  releaseBuilder(builder, capacity);
  if (!result.ok) {
    throw result.error;
  }
  return result.value;
}

/**
 * Acquire a ByteBuffer wrapping the given Uint8Array for decode.
 *
 * Allocates a scoped ByteBuffer for decode paths. This avoids mutating
 * FlatBuffers private internals while preserving the shared helper lifecycle.
 *
 * @param data - Raw buffer to wrap.
 * @returns ByteBuffer instance for decode.
 */
export function acquireByteBuffer(data: Uint8Array): ByteBuffer {
  const pooledBuf = decodePool.acquire(data.byteLength);
  if (pooledBuf) {
    bbPoolHits++;
    const u8 = new Uint8Array(pooledBuf);
    u8.set(data);
    return new ByteBuffer(u8);
  }

  bbPoolMisses++;
  return new ByteBuffer(data);
}

/**
 * Release hook for decode ByteBuffer lifecycle.
 *
 * Returns the underlying buffer to the decode pool for reuse.
 *
 * @param bb - ByteBuffer reference.
 */
export function releaseByteBuffer(bb: ByteBuffer): void {
  const bytes = bb.bytes();
  decodePool.release(bytes.buffer as ArrayBuffer);
}

/**
 * Decode using a pooled ByteBuffer with automatic acquire/release lifecycle.
 *
 * @param data - Raw buffer to decode from.
 * @param fn - Decoding function that uses the ByteBuffer.
 * @returns Result from the callback, or null on failure.
 */
export function withPooledByteBuffer<T>(
  data: Uint8Array,
  fn: (bb: ByteBuffer) => T | null,
): T | null {
  const bb = acquireByteBuffer(data);
  const result = toResultSync(() => fn(bb));
  releaseByteBuffer(bb);
  if (!result.ok) {
    throw result.error;
  }
  return result.value;
}

/**
 * Decode using a pooled ByteBuffer with verification before deserialization.
 *
 * Runs {@link verifyFlatBuffer} before constructing the ByteBuffer. Returns
 * `null` when verification fails, preventing out-of-bounds reads on
 * malformed input.
 *
 * @param data - Raw buffer to decode from.
 * @param fn - Decoding function that uses the ByteBuffer.
 * @param verifyOptions - Optional verification constraints.
 * @returns Result from the callback, or null on verification/decode failure.
 */
export function verifiedWithPooledByteBuffer<T>(
  data: ArrayBuffer | Uint8Array | null | undefined,
  fn: (bb: ByteBuffer) => T | null,
  verifyOptions?: VerifyOptions,
): T | null {
  const result = verifyFlatBuffer(data, verifyOptions);
  if (!result.ok) {
    return null;
  }
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data as ArrayBuffer);
  return withPooledByteBuffer(bytes, fn);
}

/**
 * Pre-populate the builder pool to avoid cold-start allocation bursts.
 *
 * Call during server initialization to pre-allocate builders for the most
 * common capacity tiers. Reduces first-request latency spikes.
 *
 * @param tiers - Map of capacity tier to count of builders to pre-allocate.
 */
export function warmUpBuilderPool(
  tiers: Partial<Record<number, number>> = { 256: 4, 512: 4, 1024: 2, 2048: 2 },
): void {
  for (const [tierStr, count] of Object.entries(tiers)) {
    const tier = Number(tierStr);
    if (!count || count <= 0) {
      continue;
    }
    for (let i = 0; i < count; i++) {
      const builder = new Builder(tier);
      totalCreated++;
      releaseBuilder(builder, tier);
    }
  }
}

/**
 * Pool diagnostic snapshot for observability.
 */
export interface BuilderPoolStats {
  /** Total builders ever allocated. */
  totalCreated: number;
  /** Acquire calls satisfied from pool. */
  poolHits: number;
  /** Acquire calls that required new allocation. */
  poolMisses: number;
  /** Hit rate as a fraction (0–1). */
  hitRate: number;
  /** Idle builders per tier. */
  idleByTier: Record<number, number>;
  /** ByteBuffer pool hits. */
  bbPoolHits: number;
  /** ByteBuffer pool misses. */
  bbPoolMisses: number;
  /** ByteBuffer pool hit rate. */
  bbHitRate: number;
  /** Idle ByteBuffers. */
  bbPoolIdle: number;
}

/**
 * Snapshot current pool diagnostics.
 *
 * @returns Pool statistics for monitoring/logging.
 */
export function getBuilderPoolStats(): BuilderPoolStats {
  const totalCalls = totalPoolHits + totalPoolMisses;
  const bbTotalCalls = bbPoolHits + bbPoolMisses;
  const idleByTier: Record<number, number> = {};
  for (const [tier, pool] of builderPools) {
    idleByTier[tier] = pool.length;
  }
  const decodePoolStats = decodePool.stats();
  return {
    totalCreated,
    poolHits: totalPoolHits,
    poolMisses: totalPoolMisses,
    hitRate: totalCalls > 0 ? totalPoolHits / totalCalls : 0,
    idleByTier,
    bbPoolHits,
    bbPoolMisses,
    bbHitRate: bbTotalCalls > 0 ? bbPoolHits / bbTotalCalls : 0,
    bbPoolIdle: decodePoolStats.idle,
  };
}

/**
 * Reset pool state (testing only).
 */
export function resetBuilderPool(): void {
  builderPools.clear();
  totalCreated = 0;
  totalPoolHits = 0;
  totalPoolMisses = 0;
  bbPoolHits = 0;
  bbPoolMisses = 0;
  decodePool.reset();
}
