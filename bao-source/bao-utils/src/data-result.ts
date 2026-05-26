/**
 * Canonical typed-failure helpers paired with `{ ok, data, error }`-shaped
 * Result envelopes. This is the data-shape sibling of
 * `@baohaus/bao-utils/canonical/result` (which is BaoError-constrained); use
 * this module when callers want an unconstrained `E` discriminant and the
 * `data` field name (audited surfaces).
 *
 * Eliminates parallel implementations in:
 * - `bao-source/src/shared/failure.ts`
 * - `bao-source/flow-dumpling/src/shared/failure.ts`
 * - `bao-source/bao-edge/src/shared/failure.ts`
 *
 * Those modules now re-export from here.
 *
 * @baohaus/bao-utils/data-result
 */

/** Values that can be normalized into a displayable failure message. */
export interface FailureObject {
  readonly message?: string | null;
  readonly commandIndex?: number | null;
  readonly code?: string | null;
  readonly category?: string | null;
  readonly command?: string | null;
  readonly reason?: string | null;
  readonly retryable?: boolean | null;
  readonly correlationId?: string | null;
}

export type FailureValue = Error | string | number | boolean | null | undefined | FailureObject;

/** Success branch of a typed Result. */
export interface SuccessResult<T> {
  ok: true;
  data: T;
}

/** Failure branch of a typed Result. */
export interface FailureResult<E> {
  ok: false;
  error: E;
}

/**
 * Data-shaped typed Result used instead of ad-hoc exception control flow.
 * Sibling shape to `bao-utils/async-result` `TypedResult<T, E>` (which uses
 * the `value` field name); choose `data-result` when audited surfaces require
 * the `data` field and an unconstrained error discriminant.
 */
export type Result<T, E> = SuccessResult<T> | FailureResult<E>;

/**
 * Normalizes a failure value into a stable message for logs + UI envelopes.
 *
 * @param failure Captured failure value.
 * @param fallback Default message when the value lacks any extractable text.
 */
export function normalizeFailureMessage(failure: FailureValue, fallback: string): string {
  if (failure instanceof Error) {
    return failure.message;
  }
  if (
    typeof failure === "object" &&
    failure !== null &&
    typeof failure.message === "string" &&
    failure.message.trim().length > 0
  ) {
    return failure.message;
  }
  if (typeof failure === "string" && failure.trim().length > 0) {
    return failure;
  }
  if (typeof failure === "number" || typeof failure === "boolean") {
    return String(failure);
  }
  return fallback;
}

const isStructuredFailure = (failure: FailureValue): failure is FailureObject => {
  if (
    failure === null ||
    failure === undefined ||
    typeof failure === "string" ||
    typeof failure === "number" ||
    typeof failure === "boolean" ||
    failure instanceof Error
  ) {
    return false;
  }
  return (
    typeof failure.message === "string" ||
    typeof failure.reason === "string" ||
    typeof failure.code === "string" ||
    typeof failure.category === "string" ||
    typeof failure.command === "string" ||
    typeof failure.correlationId === "string"
  );
};

const normalizeCapturedFailure = (failure: FailureValue): FailureValue => {
  if (
    failure instanceof Error ||
    typeof failure === "string" ||
    typeof failure === "number" ||
    typeof failure === "boolean" ||
    failure === null ||
    failure === undefined
  ) {
    return failure;
  }
  if (isStructuredFailure(failure)) {
    return failure;
  }
  return String(failure);
};

/**
 * Captures a (possibly async) operation as a typed Result without exception
 * syntax in callers.
 *
 * @param operation Thunk returning the success value (or a Promise of it).
 * @param mapFailure Maps a normalized failure value into the caller's `E`.
 */
export function captureResult<T, E>(
  operation: () => T | Promise<T>,
  mapFailure: (failure: FailureValue) => E,
): Promise<Result<T, E>> {
  return Promise.resolve()
    .then(operation)
    .then(
      (data): Result<T, E> => ({ ok: true, data }),
      (failure): Result<T, E> => ({
        ok: false,
        error: mapFailure(normalizeCapturedFailure(failure)),
      }),
    );
}

/**
 * Captures an asynchronous operation as a typed Result.
 *
 * @param operation Async thunk returning the success value.
 * @param mapFailure Maps a normalized failure value into the caller's `E`.
 */
export async function captureResultAsync<T, E>(
  operation: () => Promise<T>,
  mapFailure: (failure: FailureValue) => E,
): Promise<Result<T, E>> {
  return Promise.resolve()
    .then(operation)
    .then(
      (data): Result<T, E> => ({ ok: true, data }),
      (failure): Result<T, E> => ({
        ok: false,
        error: mapFailure(normalizeCapturedFailure(failure)),
      }),
    );
}
