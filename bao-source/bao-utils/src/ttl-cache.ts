/**
 * Generic in-memory TTL cache factory.
 *
 * Produces typed per-shape caches for hot read paths. Each cache instance
 * owns its own `Map<string, Slot<T>>` so the value type is fixed at
 * construction — no top-type casts, no shared global slot map.
 *
 * Unlike {@link ./global-cache | global-cache}, entries expire after a
 * configurable TTL and the cache is not pinned to `globalThis`. Use this
 * when callers want short-lived memoization of computed values; use
 * `global-cache` when callers want hot-reload-safe singleton retention.
 *
 * @packageDocumentation
 */

const DEFAULT_TTL_MS = 5_000;

interface Slot<T> {
  readonly value: T;
  readonly expiresAt: number;
}

function readSlot<T>(slots: Map<string, Slot<T>>, key: string): T | undefined {
  const slot = slots.get(key);
  if (slot === undefined) {
    return undefined;
  }
  if (Date.now() > slot.expiresAt) {
    slots.delete(key);
    return undefined;
  }
  return slot.value;
}

function writeSlot<T>(slots: Map<string, Slot<T>>, key: string, value: T, ttlMs: number): void {
  slots.set(key, { value, expiresAt: Date.now() + ttlMs });
}

/**
 * Asynchronous TTL cache with lazy compute and prefix invalidation.
 */
export interface TtlCache<T> {
  /** Read a cached value or undefined when missing/expired. */
  get(key: string): T | undefined;
  /** Replace the cached value for a key with an optional per-call TTL. */
  set(key: string, value: T, ttlMs?: number): void;
  /** Return the cached value or lazily compute, store, and return it. */
  getOrSet(key: string, compute: () => Promise<T>, ttlMs?: number): Promise<T>;
  /** Delete every key whose name starts with the given prefix. */
  invalidatePrefix(prefix: string): void;
  /** Drop all entries. */
  clear(): void;
}

/**
 * Synchronous TTL cache with lazy compute.
 */
export interface SyncTtlCache<T> {
  /** Read a cached value or undefined when missing/expired. */
  get(key: string): T | undefined;
  /** Replace the cached value for a key with an optional per-call TTL. */
  set(key: string, value: T, ttlMs?: number): void;
  /** Return the cached value or synchronously compute, store, and return it. */
  getOrCompute(key: string, compute: () => T, ttlMs?: number): T;
  /** Drop all entries. */
  clear(): void;
}

/**
 * Create a typed asynchronous TTL cache.
 *
 * @typeParam T - Value shape carried by the cache.
 * @param defaultTtlMs - Default time-to-live in milliseconds (defaults to 5_000).
 * @returns A new cache instance scoped to type `T`.
 */
export function createTtlCache<T>(defaultTtlMs: number = DEFAULT_TTL_MS): TtlCache<T> {
  const slots = new Map<string, Slot<T>>();

  return {
    get(key: string): T | undefined {
      return readSlot(slots, key);
    },
    set(key: string, value: T, ttlMs?: number): void {
      writeSlot(slots, key, value, ttlMs ?? defaultTtlMs);
    },
    async getOrSet(key: string, compute: () => Promise<T>, ttlMs?: number): Promise<T> {
      const cached = readSlot(slots, key);
      if (cached !== undefined) {
        return cached;
      }
      const value = await compute();
      writeSlot(slots, key, value, ttlMs ?? defaultTtlMs);
      return value;
    },
    invalidatePrefix(prefix: string): void {
      for (const key of slots.keys()) {
        if (key.startsWith(prefix)) {
          slots.delete(key);
        }
      }
    },
    clear(): void {
      slots.clear();
    },
  };
}

/**
 * Create a typed synchronous TTL cache.
 *
 * @typeParam T - Value shape carried by the cache.
 * @param defaultTtlMs - Default time-to-live in milliseconds (defaults to 5_000).
 * @returns A new cache instance scoped to type `T`.
 */
export function createSyncTtlCache<T>(defaultTtlMs: number = DEFAULT_TTL_MS): SyncTtlCache<T> {
  const slots = new Map<string, Slot<T>>();

  return {
    get(key: string): T | undefined {
      return readSlot(slots, key);
    },
    set(key: string, value: T, ttlMs?: number): void {
      writeSlot(slots, key, value, ttlMs ?? defaultTtlMs);
    },
    getOrCompute(key: string, compute: () => T, ttlMs?: number): T {
      const cached = readSlot(slots, key);
      if (cached !== undefined) {
        return cached;
      }
      const value = compute();
      writeSlot(slots, key, value, ttlMs ?? defaultTtlMs);
      return value;
    },
    clear(): void {
      slots.clear();
    },
  };
}

export { DEFAULT_TTL_MS };
