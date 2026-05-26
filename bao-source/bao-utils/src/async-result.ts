/**
 * Async result helpers for safe execution through Result values.
 *
 * Canonical Result module for the codebase. Replaces exception handling at call
 * sites per ADR 2026-01-28.
 *
 * @baohaus/bao-utils/async-result
 */

/**
 * Result type for async operations.
 */
export type ResultErrorInput =
  | Error
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | { readonly message?: string };

export type AsyncResult<T> = { ok: true; value: T } | { ok: false; error: ResultErrorInput };

/**
 * Result type for synchronous operations.
 */
export type SyncResult<T> = { ok: true; value: T } | { ok: false; error: ResultErrorInput };

/**
 * Two-generic typed envelope for callers that need a domain-specific error union
 * on the failure branch (instead of the default `ResultErrorInput` shape).
 *
 * Canonical for any package that previously hand-rolled
 * `type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }`.
 * Pair with {@link ok} and {@link err} from this module.
 */
export type TypedResult<T, E> = { ok: true; value: T } | { ok: false; error: E };

/**
 * Result with match, isErr, and isOk methods.
 * Compatible with match-style and isErr/isOk call sites.
 */
export type WithMatch<T, E> = ({ ok: true; value: T } | { ok: false; error: E }) & {
  match<ROk, RErr>(onOk: (value: T) => ROk, onErr: (error: E) => RErr): ROk | RErr;
  isErr(): this is { ok: false; error: E };
  isOk(): this is { ok: true; value: T };
};

/** Promise resolving to a match-capable result value. */
export type ResultPromise<T, E> = Promise<WithMatch<T, E>>;

function addMatch<T, E>(result: { ok: true; value: T } | { ok: false; error: E }): WithMatch<T, E> {
  const r = result;
  const matched: WithMatch<T, E> = Object.assign(result, {
    match<ROk, RErr>(onOk: (value: T) => ROk, onErr: (error: E) => RErr): ROk | RErr {
      return r.ok ? onOk(r.value) : onErr(r.error);
    },
    isErr(this: { ok: true; value: T } | { ok: false; error: E }): this is { ok: false; error: E } {
      return !this.ok;
    },
    isOk(this: { ok: true; value: T } | { ok: false; error: E }): this is { ok: true; value: T } {
      return this.ok;
    },
  });

  return matched;
}

function hasStringMessage(value: unknown): value is { readonly message: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  );
}

/**
 * Normalize an unknown error value into an Error instance.
 *
 * @param error - Unknown error value.
 * @returns Normalized Error instance.
 */
export function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  if (hasStringMessage(error)) {
    return new Error(error.message);
  }
  return new Error(typeof error === "string" ? error : String(error));
}

/**
 * Wrap a promise in an AsyncResult with optional error mapping.
 *
 * T - Promise result type.
 * E - Error type when mapper is provided.
 * @param promise - Promise to wrap.
 * @param mapper - Optional error mapper; when provided, error branch is typed as E.
 * @returns Promise resolving to result wrapper.
 */
/** Wrap a promise in an AsyncResult, keeping the error typed as `unknown`. */
export function toResultAsync<T>(promise: Promise<T>): ResultPromise<T, ResultErrorInput>;
/** Wrap a promise in an AsyncResult, mapping rejected values through the provided mapper. */
export function toResultAsync<T, E>(
  promise: Promise<T>,
  mapper: (error: ResultErrorInput) => E,
): ResultPromise<T, E>;
/** @internal Implementation signature for toResultAsync overloads. */
export function toResultAsync<T, E>(
  promise: Promise<T>,
  mapper?: (error: ResultErrorInput) => E,
): ResultPromise<T, E> | ResultPromise<T, ResultErrorInput> {
  if (mapper) {
    const result: ResultPromise<T, E> = promise.then(
      (value) => addMatch({ ok: true as const, value }),
      (error) =>
        addMatch({
          ok: false as const,
          error: mapper(error),
        }),
    );
    return result;
  }

  const result: ResultPromise<T, ResultErrorInput> = promise.then(
    (value) => addMatch({ ok: true as const, value }),
    (error) => addMatch({ ok: false as const, error }),
  );
  return result;
}

/**
 * Execute a sync/async function and capture promise rejections as Result values.
 *
 * @param fn - Operation to execute.
 * @returns Result wrapper.
 */
export function toResult<T>(fn: () => T | Promise<T>): Promise<AsyncResult<T>> {
  return Promise.resolve()
    .then(fn)
    .then(
      (value) => ({ ok: true as const, value }),
      (error) => ({ ok: false as const, error }),
    );
}

/**
 * Convert a promise into an {@link AsyncResult} without throwing.
 * Alias for the common pattern of awaiting {@link toResultAsync} without error mapping.
 *
 * T - Promise resolution type.
 * @param promise - Promise to resolve.
 * @returns Result object with either value or error.
 */
export async function toAsyncResult<T>(promise: Promise<T>): Promise<AsyncResult<T>> {
  const r = await toResultAsync(promise);
  return r;
}

/**
 * Settle a promise into a Result envelope with the error branch normalized to
 * an {@link Error} instance via {@link normalizeError}. Used by managed-interval
 * + managed-polling-lifecycle to log structured failure events without ever
 * letting a rejected promise bubble.
 *
 * Never throws. Same shape as {@link toAsyncResult} but with a guaranteed
 * `Error`-typed failure branch.
 *
 * @param promise - Promise to settle.
 * @returns SyncResult with success value or normalized Error.
 */
export async function settleAsync<T>(promise: Promise<T>): Promise<SyncResult<T>> {
  return promise.then(
    (value): SyncResult<T> => ({ ok: true as const, value }),
    (error): SyncResult<T> => ({ ok: false as const, error: normalizeError(error) }),
  );
}

/**
 * Execute a synchronous function and return its value as a result.
 *
 * @param fn - Operation to execute.
 * @returns Result wrapper.
 */
/** Execute a synchronous function and keep the error branch typed as `unknown`. */
export function toResultSync<T>(fn: () => T): WithMatch<T, ResultErrorInput>;
/** Execute a synchronous function with a mapped error branch type. */
export function toResultSync<T, E extends ResultErrorInput>(
  fn: () => T,
  mapper: (error: ResultErrorInput) => E,
): WithMatch<T, E>;
/** @internal Implementation signature for toResultSync overloads. */
export function toResultSync<T, E extends ResultErrorInput>(
  fn: () => T,
  mapper?: (error: ResultErrorInput) => E,
): WithMatch<T, E> | WithMatch<T, ResultErrorInput> {
  try {
    const value = fn();
    if (mapper) {
      return addMatch<T, E>({ ok: true, value });
    }
    return addMatch<T, ResultErrorInput>({ ok: true, value });
  } catch (error) {
    const normalized = normalizeError(error);
    if (mapper) {
      return addMatch<T, E>({ ok: false, error: mapper(normalized) });
    }
    return addMatch<T, ResultErrorInput>({ ok: false, error: normalized });
  }
}

/**
 * Create a success result.
 *
 * T - Value type.
 * @param value - Success value.
 * @returns Success result.
 */
export function ok<T>(value: T): { ok: true; value: T } {
  return { ok: true as const, value };
}

/**
 * Create an error result.
 *
 * E - Error type.
 * @param error - Error value.
 * @returns Error result.
 */
export function err<E>(error: E): { ok: false; error: E } {
  return { ok: false as const, error };
}

/**
 * Normalize an unknown error into a message string.
 *
 * @param error - Error to normalize.
 * @returns Message string.
 */
export function getErrorMessage(error: ResultErrorInput): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (hasStringMessage(error)) {
    return error.message;
  }
  if (error === null || error === undefined) {
    return "Unknown error";
  }
  return String(error);
}
