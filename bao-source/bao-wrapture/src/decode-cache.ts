/**
 * FlatBuffer Decoded Event Cache.
 *
 * Provides a TTL-keyed cache of decoded FlatBuffer event objects to avoid
 * redundant decode operations for frequently polled event streams (e.g.
 * BunBuddy health probes, device telemetry snapshots).
 *
 * Uses an LRU eviction strategy combined with time-based expiry.
 *
 * @packageDocumentation
 */

/**
 * Cache entry wrapping a decoded event.
 */
interface DecodeCacheEntry<T> {
  /** Decoded event value. */
  value: T;
  /** Timestamp of insertion (ms since epoch). */
  insertedAt: number;
  /** TTL for this entry in milliseconds. */
  ttlMs: number;
}

/**
 * Configuration for the decode cache.
 */
export interface DecodeCacheConfig {
  /** Maximum number of entries. Default: 256. */
  maxEntries: number;
  /** Default TTL in milliseconds. Default: 5000. */
  defaultTtlMs: number;
}

/**
 * Default cache configuration.
 */
const DEFAULT_CONFIG: DecodeCacheConfig = {
  maxEntries: 256,
  defaultTtlMs: 5000,
};

/**
 * TTL-keyed decode event cache with LRU eviction.
 *
 * Generic over the decoded event type `T`. Keys are opaque strings
 * (typically a composite of schema name + source identifier).
 */
export class DecodeCache<T> {
  private readonly cache = new Map<string, DecodeCacheEntry<T>>();
  private readonly config: DecodeCacheConfig;

  /** Total cache hits since creation or last reset. */
  private hitCount = 0;

  /** Total cache misses since creation or last reset. */
  private missCount = 0;

  /**
   * Create a new decode cache.
   *
   * @param config - Cache configuration (uses defaults for omitted fields).
   */
  constructor(config: Partial<DecodeCacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Get a cached decoded event.
   *
   * Returns `undefined` if the key is missing or expired. Accessing a
   * valid entry refreshes its LRU position.
   *
   * @param key - Cache key.
   * @returns Cached value or undefined.
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      this.missCount++;
      return;
    }

    if (Date.now() - entry.insertedAt > entry.ttlMs) {
      this.cache.delete(key);
      this.missCount++;
      return;
    }

    this.hitCount++;
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  /**
   * Store a decoded event in the cache.
   *
   * Evicts the oldest entry if capacity is exceeded.
   *
   * @param key - Cache key.
   * @param value - Decoded event value.
   * @param ttlMs - Optional TTL override in milliseconds.
   */
  set(key: string, value: T, ttlMs?: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    while (this.cache.size >= this.config.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey === undefined) {
        break;
      } else {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      insertedAt: Date.now(),
      ttlMs: ttlMs ?? this.config.defaultTtlMs,
    });
  }

  /**
   * Get or compute a decoded event.
   *
   * Returns the cached value if present and fresh. Otherwise, calls the
   * decode function, caches the result, and returns it.
   *
   * @param key - Cache key.
   * @param decodeFn - Function to produce the value on cache miss.
   * @param ttlMs - Optional TTL override.
   * @returns Decoded event value.
   */
  getOrDecode(key: string, decodeFn: () => T, ttlMs?: number): T {
    const cached = this.get(key);
    if (cached !== undefined) {
      return cached;
    }

    const value = decodeFn();
    this.set(key, value, ttlMs);
    return value;
  }

  /**
   * Remove a specific entry.
   *
   * @param key - Cache key to invalidate.
   * @returns True if the entry was found and removed.
   */
  invalidate(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Evict all expired entries.
   *
   * @returns Number of entries evicted.
   */
  sweep(): number {
    const now = Date.now();
    let evicted = 0;

    for (const [key, entry] of this.cache) {
      if (now - entry.insertedAt > entry.ttlMs) {
        this.cache.delete(key);
        evicted++;
      }
    }

    return evicted;
  }

  /**
   * Clear all entries and reset metrics.
   */
  clear(): void {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }

  /** Current number of entries. */
  get size(): number {
    return this.cache.size;
  }

  /** Total cache hits. */
  get hits(): number {
    return this.hitCount;
  }

  /** Total cache misses. */
  get misses(): number {
    return this.missCount;
  }

  /** Cache hit ratio (0–1). */
  get hitRatio(): number {
    const total = this.hitCount + this.missCount;
    return total > 0 ? this.hitCount / total : 0;
  }
}
