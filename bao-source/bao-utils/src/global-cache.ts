/**
 * Hot-reload-safe global cache utilities.
 *
 * Provides type-safe `globalThis` caching that persists across Bun `--hot` reloads
 * without requiring `declare global { var }` (which mandates lint suppression).
 *
 * All keys are conventionally prefixed `__baohaus` to avoid collisions.
 *
 * @packageDocumentation
 */

/**
 * Typed globalThis scope accessor.
 *
 * Avoids `declare global` by treating globalThis as a string-keyed record.
 */
type GlobalScope = typeof globalThis & Record<string, unknown>;

/**
 * Get or lazily create a globalThis-cached value.
 *
 * Persists across Bun hot reloads. The first call invokes `factory`;
 * subsequent calls return the cached instance.
 *
 * @param key - Global key (must be prefixed `__baohaus`).
 * @param factory - Lazy initializer, invoked only when no cached value exists.
 * @returns Cached or newly created value.
 */
export function getOrCreateGlobal<T>(key: string, factory: () => T): T {
  const scope = globalThis as GlobalScope;
  if (scope[key] === undefined) {
    scope[key] = factory();
  }
  return scope[key] as T;
}

/**
 * Read a globalThis-cached value without creating it.
 *
 * @param key - Global key.
 * @returns Cached value or undefined.
 */
export function getGlobal<T>(key: string): T | undefined {
  const scope = globalThis as GlobalScope;
  return scope[key] as T | undefined;
}

/**
 * Set a globalThis-cached value.
 *
 * @param key - Global key.
 * @param value - Value to cache.
 */
export function setGlobal<T>(key: string, value: T): void {
  const scope = globalThis as GlobalScope;
  scope[key] = value;
}
