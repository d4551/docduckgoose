/**
 * Safe JSON parsing helper.
 *
 * Provides a single implementation for safely parsing JSON strings with
 * prototype-pollution protection. Intended for use in both server and
 * client contexts (no Node-only APIs).
 *
 * @shared/utils/safe-json-parse
 */

import { getErrorMessage, toResultSync } from "@baohaus/bao-utils/async-result";
import { createLogger } from "../logger/browser.js";

const logger: ReturnType<typeof createLogger> = createLogger("SafeJsonParse");

const DANGEROUS_KEYS: Set<unknown> = new Set(["__proto__", "constructor", "prototype"]);

function sanitizeObject<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((entry) => sanitizeObject(entry)) as T;
  }

  const output: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    if (DANGEROUS_KEYS.has(key)) {
      continue;
    }
    output[key] = sanitizeObject(Reflect.get(obj, key));
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
    logger.error("JSON parse failed", {
      error: getErrorMessage(result.error),
      inputLength: input.length,
    });
    return defaultValue;
  }

  return sanitizeObject<T>(result.value as T);
}
