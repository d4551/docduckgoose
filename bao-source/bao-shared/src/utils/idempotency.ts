/**
 * Idempotency key helpers.
 *
 * Provides helpers to build stable idempotency keys with predictable
 * length limits and prefixing.
 *
 * @packageDocumentation
 */

const IDEM_BYTE_LENGTH = 16;
const HEX_PAD_WIDTH = 2;
const HEX_RADIX = 16;

/**
 * Options for generating an idempotency key.
 */
export interface IdempotencyKeyOptions {
  /** Optional prefix to namespace the key. */
  prefix?: string;
  /** Optional stable seed used for deterministic keys. */
  seed?: string;
  /** Optional maximum length (keys longer than this are truncated). */
  maxLength?: number;
}

/**
 * Canonical idempotency header candidates (lowercase).
 */
export const IDEMPOTENCY_HEADER_CANDIDATES: readonly ["idempotency-key", "x-idempotency-key"] = [
  "idempotency-key",
  "x-idempotency-key",
] as const;

/**
 * Normalize an idempotency key to a trimmed string or null.
 *
 * @param value - Candidate idempotency key.
 * @returns Normalized key or null when empty.
 */
export function normalizeIdempotencyKey(value?: string | null): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

/**
 * Generate a random token suitable for idempotency keys.
 *
 * @returns Random token string.
 */
function generateRandomToken(): string {
  if (typeof crypto !== "undefined") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(IDEM_BYTE_LENGTH);
      crypto.getRandomValues(bytes);
      return Array.from(bytes)
        .map((value) => value.toString(HEX_RADIX).padStart(HEX_PAD_WIDTH, "0"))
        .join("");
    }
  }
  return `idem-${Date.now()}-${Math.random().toString(HEX_RADIX).slice(HEX_PAD_WIDTH)}`;
}

/**
 * Normalize an idempotency key token.
 *
 * @param token - Candidate token.
 * @returns Normalized token without surrounding whitespace.
 */
function normalizeToken(token: string): string {
  return token.trim();
}

/**
 * Normalize inbound headers into a `Headers` instance.
 *
 * @param headers - Headers instance or header init payload.
 * @returns Normalized Headers instance.
 */
function normalizeHeaders(
  headers: Headers | HeadersInit | Record<string, string | undefined>,
): Headers {
  if (headers instanceof Headers) {
    return headers;
  }

  if (Array.isArray(headers)) {
    return new Headers(headers);
  }

  const normalized = new Headers();
  for (const [key, value] of Object.entries(headers ?? {})) {
    if (typeof value === "string") {
      normalized.set(key, value);
    }
  }
  return normalized;
}

/**
 * Resolve the idempotency key from request headers.
 *
 * @param headers - Request headers payload.
 * @returns Normalized idempotency key or null when missing.
 */
export function resolveIdempotencyHeaderValue(
  headers: Headers | HeadersInit | Record<string, string | undefined>,
): string | null {
  const normalized = normalizeHeaders(headers);
  for (const key of IDEMPOTENCY_HEADER_CANDIDATES) {
    const value = normalized.get(key);
    if (value?.trim()) {
      return value.trim();
    }
  }
  return null;
}

/**
 * Generate a stable idempotency key string.
 *
 * @param [options] - Optional key configuration.
 * @returns Idempotency key string.
 */
export function generateIdempotencyKey(options: IdempotencyKeyOptions = {}): string {
  const prefix = options.prefix?.trim();
  const seed = options.seed ? normalizeToken(options.seed) : "";
  const token = seed || generateRandomToken();
  const raw = prefix ? `${prefix}:${token}` : token;
  const maxLength = options.maxLength ?? 0;
  if (maxLength > 0 && raw.length > maxLength) {
    return raw.slice(0, maxLength);
  }
  return raw;
}
