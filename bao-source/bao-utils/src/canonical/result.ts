/**
 * Canonical `Result<Ok, Err>` discriminated union for BaoError-flavored
 * call sites. This is the dedicated cohesion-plan §0.4 result shape that
 * pairs with `@baohaus/bao-utils/canonical/bao-error`.
 *
 * Design notes:
 * - The Err branch defaults to `BaoError` so callers compose naturally
 *   with the canonical error surface.
 * - This module is intentionally small and dependency-free aside from the
 *   sibling `bao-error` import. Generic async wrappers, mappers, and folds
 *   live in `@baohaus/bao-utils/async-result` and
 *   `@baohaus/bao-utils/result-helpers`. This module is the canonical
 *   *typed* pairing of `Result` with `BaoError`.
 * - Successful payload field is `data` (NOT `value`) — matches every
 *   downstream consumer's expected `Ok<T>` shape.
 *
 * @baohaus/bao-utils/canonical/result
 */

import type { BaoError } from "./bao-error";

/** Successful result branch carrying a payload. */
export type CanonicalOk<T> = {
  readonly ok: true;
  readonly data: T;
};

/** Failure result branch carrying a typed error. */
export type CanonicalErr<E extends BaoError = BaoError> = {
  readonly ok: false;
  readonly error: E;
};

/**
 * Discriminated union over success / failure with a `BaoError`-typed error
 * branch. Matches by the `ok` discriminator at every call site.
 */
export type Result<T, E extends BaoError = BaoError> = CanonicalErr<E> | CanonicalOk<T>;

/** Alias for the success branch of a canonical `Result`. */
export type Ok<T> = CanonicalOk<T>;

/** Alias for the failure branch of a canonical `Result`. */
export type Err<E extends BaoError = BaoError> = CanonicalErr<E>;

/** Construct an Ok result. */
export function okResult<T>(data: T): CanonicalOk<T> {
  return { data, ok: true };
}

/** Construct an Err result. */
export function errResult<E extends BaoError>(error: E): CanonicalErr<E> {
  return { error, ok: false };
}

/** Short-form Ok constructor. Synonym of {@link okResult}. */
export function ok<T>(data: T): CanonicalOk<T> {
  return { data, ok: true };
}

/** Short-form Err constructor. Synonym of {@link errResult}. */
export function err<E extends BaoError>(error: E): CanonicalErr<E> {
  return { error, ok: false };
}

/** Type guard narrowing a `Result` to its Ok branch. */
export function isOk<T, E extends BaoError>(result: Result<T, E>): result is CanonicalOk<T> {
  return result.ok;
}

/** Type guard narrowing a `Result` to its Err branch. */
export function isErr<T, E extends BaoError>(result: Result<T, E>): result is CanonicalErr<E> {
  return !result.ok;
}
