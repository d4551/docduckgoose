/**
 * Log Redaction Presets
 *
 * Provides reusable sensitive-key patterns for scrubbing PII, secrets,
 * and credentials from log metadata before output. Used by all logger
 * implementations (server, bunbuddy, client, scripts) to guarantee
 * no accidental secret leakage in structured log entries.
 *
 * @packageDocumentation
 */

// Sensitive Key Patterns

/**
 * Patterns matching keys that commonly hold secrets or PII.
 *
 * Tested case-insensitively against object keys during redaction.
 * Covers: passwords, tokens, API keys, secrets, authorization headers,
 * credit cards, SSNs, session IDs, cookies, and private keys.
 */
export const SENSITIVE_KEY_PATTERNS: readonly RegExp[] = [
  /password/i,
  /passwd/i,
  /secret/i,
  /token/i,
  /api[_-]?key/i,
  /access[_-]?key/i,
  /auth/i,
  /credential/i,
  /private[_-]?key/i,
  /certificate/i,
  /ssn/i,
  /social[_-]?security/i,
  /credit[_-]?card/i,
  /card[_-]?number/i,
  /cvv/i,
  /cookie/i,
  /session[_-]?id/i,
  /jwt/i,
  /bearer/i,
  /x-api-key/i,
  /connection[_-]?string/i,
  /database[_-]?url/i,
  /redis[_-]?url/i,
];

/** Sentinel value used to replace redacted fields. */
export const REDACTED_SENTINEL = "[REDACTED]";

/** Default maximum redaction depth to prevent cycles. */
export const REDACTION_MAX_DEPTH = 6;

// Redaction Function

/**
 * Redact sensitive keys from a metadata object for safe logging.
 *
 * Performs a recursive walk of the input, replacing values whose keys match
 * any {@link SENSITIVE_KEY_PATTERNS} entry with {@link REDACTED_SENTINEL}.
 * Handles circular references and limits recursion depth.
 *
 * @param metadata - Arbitrary metadata payload to sanitize.
 * @param maxDepth - Maximum recursion depth (default: {@link REDACTION_MAX_DEPTH}).
 * @returns Sanitized copy of the metadata (original is not mutated).
 *
 * @example
 * ```ts
 * const safe = redactLogMetadata({ user: 'alice', password: 's3cr3t' });
 * // { user: 'alice', password: '[REDACTED]' }
 * ```
 */
export function redactLogMetadata(
  metadata: Record<string, unknown>,
  maxDepth: number = REDACTION_MAX_DEPTH,
): Record<string, unknown> {
  const seen = new WeakSet<object>();

  function shouldRedact(key: string): boolean {
    return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key));
  }

  function isRedactableRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function walkArray(input: unknown[], depth: number): unknown[] {
    const nextDepth = depth - 1;
    return input.map((entry) => walk(entry, nextDepth));
  }

  function walkRecord(record: Record<string, unknown>, depth: number): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};
    const nextDepth = depth - 1;

    for (const [key, entry] of Object.entries(record)) {
      sanitized[key] = shouldRedact(key) ? REDACTED_SENTINEL : walk(entry, nextDepth);
    }

    return sanitized;
  }

  function visitNonObjectValue(input: unknown, depth: number): unknown | undefined {
    let value: unknown | undefined;
    if (input === null || input === undefined) {
      return input;
    }
    if (typeof input === "string" || typeof input === "number" || typeof input === "boolean") {
      value = input;
      return value;
    }
    if (typeof input === "bigint") {
      value = input.toString();
      return value;
    }
    if (input instanceof Date) {
      value = input.toISOString();
      return value;
    }
    if (depth <= 0) {
      value = REDACTED_SENTINEL;
      return value;
    }
    if (typeof input === "object" && seen.has(input)) {
      value = "[Circular]";
      return value;
    }
    return value;
  }

  function walk(input: unknown, depth: number): unknown {
    const directResult = visitNonObjectValue(input, depth);
    if (directResult !== undefined) {
      return directResult;
    }

    if (typeof input !== "object" || isRedactableRecord(input) === false) {
      return String(input);
    }
    seen.add(input);
    if (Array.isArray(input)) {
      return walkArray(input, depth);
    }
    return walkRecord(input, depth);
  }

  return walkRecord(metadata, maxDepth);
}
