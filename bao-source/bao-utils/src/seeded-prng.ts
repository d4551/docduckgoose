/**
 * Deterministic sine-based PRNG for server-authoritative simulation, replay
 * verification, and any code path that needs reproducible "random" values
 * without `Math.random()`.
 *
 * Identical `seed` + `worldTimeMs` + `offset` always produce identical output.
 *
 * Algorithm: `sin(seed + t + offset) * 10000`, fractional part only — value in
 * `[0, 1)`.
 *
 * Errors are returned as {@link SyncResult} envelopes (no throws), per the
 * canonical {@link import("./async-result").TypedResult} contract.
 *
 * @baohaus/bao-utils/seeded-prng
 */

import { err, ok, type TypedResult } from "./async-result";

/**
 * Discriminated failure envelope returned by deterministic-collection picks.
 */
export type PrngError =
  | { readonly kind: "empty-collection" }
  | { readonly kind: "index-out-of-bounds"; readonly index: number; readonly length: number };

/**
 * Deterministic seeded pseudo-random number generator.
 *
 * Pure: same inputs → same outputs across processes / machines / replays.
 */
export class SeededPrng {
  constructor(private readonly seed: number) {}

  /**
   * Returns a value in `[0, 1)` for the given world time and per-entity offset.
   */
  next(worldTimeMs: number, offset = 0): number {
    const x = Math.sin(this.seed + worldTimeMs + offset) * 10_000;
    return x - Math.floor(x);
  }

  /**
   * Returns an integer in `[min, max)` for the given world time and offset.
   */
  int(worldTimeMs: number, min: number, max: number, offset = 0): number {
    return Math.floor(this.next(worldTimeMs, offset) * (max - min)) + min;
  }

  /**
   * Deterministically picks an element from an array. Returns an error envelope
   * for empty collections or out-of-bounds index — never throws.
   */
  pick<T>(worldTimeMs: number, arr: readonly T[], offset = 0): TypedResult<T, PrngError> {
    if (arr.length === 0) {
      return err({ kind: "empty-collection" });
    }
    const index = this.int(worldTimeMs, 0, arr.length, offset);
    const value = arr[index];
    if (value === undefined) {
      return err({ kind: "index-out-of-bounds", index, length: arr.length });
    }
    return ok(value);
  }
}

/**
 * Convenience factory for a seeded PRNG.
 */
export function createPrng(seed: number): SeededPrng {
  return new SeededPrng(seed);
}
