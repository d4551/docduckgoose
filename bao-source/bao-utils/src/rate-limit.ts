/**
 * Rate Limit Header Utilities
 *
 * Provides shared helpers for parsing rate limit headers across server and client.
 * Follows the IETF `RateLimit-*` header format.
 *
 * @baohaus/bao-utils/rate-limit
 */

import { MS_PER_SECOND } from "@baohaus/bao-constants/time";

/**
 * Standard rate limit header names.
 */
export const RATE_LIMIT_HEADERS: {
  readonly LIMIT: "RateLimit-Limit";
  readonly REMAINING: "RateLimit-Remaining";
  readonly RESET: "RateLimit-Reset";
  readonly POLICY: "RateLimit-Policy";
  readonly RETRY_AFTER: "Retry-After";
  readonly TOKEN_LIMIT: "RateLimit-Token-Limit";
  readonly TOKEN_REMAINING: "RateLimit-Token-Remaining";
  readonly TOKEN_RESET: "RateLimit-Token-Reset";
} = {
  /** Maximum requests allowed in window. */
  LIMIT: "RateLimit-Limit",
  /** Requests remaining in current window. */
  REMAINING: "RateLimit-Remaining",
  /** Seconds until window resets. */
  RESET: "RateLimit-Reset",
  /** Current policy name/tier. */
  POLICY: "RateLimit-Policy",
  /** Retry-After header for 429 responses */
  RETRY_AFTER: "Retry-After",
  /** Token quota headers (custom). */
  TOKEN_LIMIT: "RateLimit-Token-Limit",
  TOKEN_REMAINING: "RateLimit-Token-Remaining",
  TOKEN_RESET: "RateLimit-Token-Reset",
} as const;

/**
 * Rate limit metadata extracted from response headers.
 */
export interface RateLimitInfo {
  /** Max requests allowed in the window. */
  limit?: number;
  /** Requests remaining in the window. */
  remaining?: number;
  /** Unix timestamp when the window resets (optional, non-standard extension). */
  reset?: number;
  /** Seconds until the window resets. */
  resetAfter?: number;
  /** Seconds to wait before retrying. */
  retryAfter?: number;
  /** Policy identifier (tier). */
  policy?: string;
  /** Max tokens allowed in the quota window. */
  tokenLimit?: number;
  /** Tokens remaining in the quota window. */
  tokenRemaining?: number;
  /** Unix timestamp when token quota resets. */
  tokenReset?: number;
}

type HeaderRecord = Record<string, string | number | undefined>;
type HeaderSource = HeadersInit | HeaderRecord;

/**
 * Normalize a header record to lower-case keys with string values.
 *
 * @param record - Header record to normalize.
 * @returns Normalized header map.
 */
function normalizeHeaderRecord(record: HeaderRecord): Record<string, string> {
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    if (value === undefined) {
      continue;
    }
    normalized[key.toLowerCase()] = String(value);
  }
  return normalized;
}

/**
 * Resolve a header value from Headers or plain records (case-insensitive).
 *
 * @param headers - Headers instance or record.
 * @param key - Header name to lookup.
 * @returns Header value or null.
 */
function getHeaderValue(headers: HeaderSource, key: string): string | null {
  if (headers instanceof Headers) {
    return headers.get(key);
  }

  if (Array.isArray(headers)) {
    const normalized: Record<string, string> = {};
    for (const entry of headers) {
      if (!Array.isArray(entry) || entry.length < 2) {
        continue;
      }
      const [rawKey, rawValue] = entry;
      normalized[String(rawKey).toLowerCase()] = String(rawValue);
    }
    return normalized[key.toLowerCase()] ?? null;
  }

  const normalized = normalizeHeaderRecord(headers);
  return normalized[key.toLowerCase()] ?? null;
}

/**
 * Parse a numeric header value into a number.
 *
 * @param value - Raw header value.
 * @returns Parsed number or undefined.
 */
function parseHeaderNumber(value: string | null): number | undefined {
  if (!value) {
    return;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

/**
 * Parse rate limit headers from a response.
 *
 * @param headers - Response headers (Headers object or record).
 * @returns Parsed rate limit information.
 */
export function parseRateLimitHeaders(headers: HeaderSource): RateLimitInfo {
  const limit = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.LIMIT));
  const remaining = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.REMAINING));
  const resetAfter = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.RESET));
  const retryAfter = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.RETRY_AFTER));
  const policy = getHeaderValue(headers, RATE_LIMIT_HEADERS.POLICY);
  const tokenLimit = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.TOKEN_LIMIT));
  const tokenRemaining = parseHeaderNumber(
    getHeaderValue(headers, RATE_LIMIT_HEADERS.TOKEN_REMAINING),
  );
  const tokenReset = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.TOKEN_RESET));

  return {
    ...(limit === undefined ? {} : { limit }),
    ...(remaining === undefined ? {} : { remaining }),
    ...(resetAfter === undefined ? {} : { resetAfter }),
    ...(retryAfter === undefined ? {} : { retryAfter }),
    ...(policy === null ? {} : { policy }),
    ...(tokenLimit === undefined ? {} : { tokenLimit }),
    ...(tokenRemaining === undefined ? {} : { tokenRemaining }),
    ...(tokenReset === undefined ? {} : { tokenReset }),
  };
}

/**
 * Check if parsed rate limit info contains any values.
 *
 * @param info - Parsed rate limit information.
 * @returns True when at least one field is defined.
 */
export function hasRateLimitInfo(info: RateLimitInfo): boolean {
  return Object.values(info).some((value) => value !== undefined);
}

/**
 * Calculate wait time from rate limit headers.
 *
 * @param headers - Response headers.
 * @returns Milliseconds to wait before retrying, or 0 if unknown.
 */
export function calculateWaitTime(headers: HeaderSource): number {
  const parsed = parseRateLimitHeaders(headers);

  if (parsed.retryAfter !== undefined) {
    return parsed.retryAfter * MS_PER_SECOND;
  }

  if (parsed.resetAfter !== undefined) {
    return parsed.resetAfter * MS_PER_SECOND;
  }

  if (parsed.reset !== undefined) {
    const now = Math.floor(Date.now() / MS_PER_SECOND);
    const waitSeconds = parsed.reset - now;
    return waitSeconds > 0 ? waitSeconds * MS_PER_SECOND : 0;
  }

  return 0;
}
