/**
 * Non-secret browser storage adapter with a typed Result envelope around
 * `localStorage` access. Eliminates raw try/catch at call sites and
 * normalizes quota / unavailable failures.
 *
 * IMPORTANT — Hard-ban allowance rationale:
 *
 * CLAUDE.md bans `localStorage` / `sessionStorage` for **secrets or auth
 * material**. This wrapper is allowlisted because:
 *
 * 1. It is the SINGLE choke point for all non-secret browser storage in the
 *    bao plane (theme preference, UI density, layout drawer state — never
 *    tokens, sessions, or credentials).
 * 2. It exposes only Result-shaped helpers; callers cannot leak quota /
 *    serialization exceptions.
 * 3. Caller domains are restricted by review: consuming packages must
 *    document why their key is non-sensitive.
 *
 * Callers MUST NOT write tokens, refresh tokens, session IDs, OAuth state,
 * CSRF cookies, or any credential through these helpers. Auth surfaces use
 * `@baohaus/auth-bao` cookie contracts.
 *
 * @baohaus/bao-utils/storage-safe
 */

import { err, normalizeError, ok, type TypedResult, toResultSync } from "./async-result";

/** Discriminated failure envelope for storage operations. */
export type StorageError =
  | { readonly kind: "unavailable" }
  | { readonly kind: "quota-exceeded" }
  | { readonly kind: "access-failed"; readonly detail: string };

const QUOTA_NAMES = new Set(["QuotaExceededError", "NS_ERROR_DOM_QUOTA_REACHED"]);

const classifyError = (error: Error): StorageError => {
  if (QUOTA_NAMES.has(error.name) || /quota/i.test(error.message)) {
    return { kind: "quota-exceeded" };
  }
  return { kind: "access-failed", detail: error.message };
};

const isLocalStorageAvailable = (): boolean => {
  if (typeof globalThis === "undefined") {
    return false;
  }
  const candidate = (globalThis as { localStorage?: Storage }).localStorage;
  return candidate !== undefined && candidate !== null;
};

const isSessionStorageAvailable = (): boolean => {
  if (typeof globalThis === "undefined") {
    return false;
  }
  const candidate = (globalThis as { sessionStorage?: Storage }).sessionStorage;
  return candidate !== undefined && candidate !== null;
};

/**
 * Reads a string value from `localStorage` by key. Missing key returns
 * `ok(null)`. Unavailable storage or thrown access returns `err({...})`.
 *
 * @param key Non-sensitive storage key.
 */
export const readLocalStorageResult = (key: string): TypedResult<string | null, StorageError> => {
  if (!isLocalStorageAvailable()) {
    return err({ kind: "unavailable" });
  }
  const result = toResultSync(() => localStorage.getItem(key));
  if (result.ok) {
    return ok(result.value);
  }
  return err(classifyError(normalizeError(result.error)));
};

/**
 * Writes a string value to `localStorage` under `key`. Quota or unavailable
 * storage returns the appropriate `StorageError` discriminant.
 *
 * @param key Non-sensitive storage key.
 * @param value String payload.
 */
export const writeLocalStorageResult = (
  key: string,
  value: string,
): TypedResult<void, StorageError> => {
  if (!isLocalStorageAvailable()) {
    return err({ kind: "unavailable" });
  }
  const result = toResultSync(() => {
    localStorage.setItem(key, value);
  });
  if (result.ok) {
    return ok(undefined);
  }
  return err(classifyError(normalizeError(result.error)));
};

/**
 * Removes a key from `localStorage`. Unavailable storage returns the
 * appropriate `StorageError` discriminant.
 *
 * @param key Non-sensitive storage key.
 */
export const removeLocalStorageResult = (key: string): TypedResult<void, StorageError> => {
  if (!isLocalStorageAvailable()) {
    return err({ kind: "unavailable" });
  }
  const result = toResultSync(() => {
    localStorage.removeItem(key);
  });
  if (result.ok) {
    return ok(undefined);
  }
  return err(classifyError(normalizeError(result.error)));
};

/**
 * Reads a string value from `sessionStorage` by key. Missing key returns
 * `ok(null)`. Unavailable storage or thrown access returns `err({...})`.
 *
 * @param key Non-sensitive session-scoped storage key.
 */
export const readSessionStorageResult = (key: string): TypedResult<string | null, StorageError> => {
  if (!isSessionStorageAvailable()) {
    return err({ kind: "unavailable" });
  }
  const result = toResultSync(() => sessionStorage.getItem(key));
  if (result.ok) {
    return ok(result.value);
  }
  return err(classifyError(normalizeError(result.error)));
};

/**
 * Writes a string value to `sessionStorage` under `key`.
 *
 * @param key Non-sensitive session-scoped storage key.
 * @param value String payload.
 */
export const writeSessionStorageResult = (
  key: string,
  value: string,
): TypedResult<void, StorageError> => {
  if (!isSessionStorageAvailable()) {
    return err({ kind: "unavailable" });
  }
  const result = toResultSync(() => {
    sessionStorage.setItem(key, value);
  });
  if (result.ok) {
    return ok(undefined);
  }
  return err(classifyError(normalizeError(result.error)));
};

/**
 * Removes a key from `sessionStorage`.
 *
 * @param key Non-sensitive session-scoped storage key.
 */
export const removeSessionStorageResult = (key: string): TypedResult<void, StorageError> => {
  if (!isSessionStorageAvailable()) {
    return err({ kind: "unavailable" });
  }
  const result = toResultSync(() => {
    sessionStorage.removeItem(key);
  });
  if (result.ok) {
    return ok(undefined);
  }
  return err(classifyError(normalizeError(result.error)));
};
