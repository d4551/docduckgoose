/**
 * Safe JSON parsing helper.
 *
 * Provides a single implementation for safely parsing JSON strings with
 * prototype-pollution protection. Intended for use in both server and
 * client contexts (no Node-only APIs).
 *
 * @baohaus/bao-utils/safe-json-parse
 */

import { toResultSync } from "./async-result.ts";

const DANGEROUS_KEYS: Set<unknown> = new Set(["__proto__", "constructor", "prototype"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeObject<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((entry) => sanitizeObject(entry)) as T;
  }

  const output: Record<string, unknown> = {};
  if (!isRecord(obj)) {
    return obj;
  }
  for (const key of Object.keys(obj)) {
    if (DANGEROUS_KEYS.has(key)) {
      continue;
    }
    output[key] = sanitizeObject(obj[key]);
  }
  return output as T;
}

/**
 * Safely parse JSON with prototype pollution protection.
 *
 * T - Expected parsed payload type.
 * @param input - JSON string to parse.
 * @param defaultValue - Value returned on parse failure or unsafe input.
 * @returns Parsed value or the default.
 */
export function safeJsonParse<T = unknown>(
  input: string | null | undefined,
  defaultValue: T | null = null,
): T | null {
  if (!input || typeof input !== "string") {
    return defaultValue;
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return defaultValue;
  }

  const result = toResultSync<unknown>(() => JSON.parse(trimmed));
  if (!result.ok) {
    return defaultValue;
  }

  return sanitizeObject<T>(result.value as T);
}
