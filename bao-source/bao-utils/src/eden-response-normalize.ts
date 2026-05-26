/**
 * Eden Treaty response normalization for SSR-safe hydration.
 *
 * Eden's treaty client uses a JSON reviver that converts ISO date strings to Date
 * instances. When server-side API calls store that data and JSON serialization runs for the
 * client payload, JSON.stringify converts Date to ISO string. The client then
 * receives strings while the server had Date objects in memory—causing a
 * hydration mismatch when templates render (Date.toString() vs string).
 *
 * This module provides an onResponse handler that parses JSON without the
 * reviver, keeping dates as ISO strings. Use it in the Eden plugin to ensure
 * consistent string timestamps across SSR and client hydration.
 *
 * @baohaus/bao-utils/eden-response-normalize
 */

import { MIME_JSON } from "@baohaus/bao-constants/mime-types";
import { toResultSync } from "./async-result";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Recursively convert Date, Map, and Set instances for JSON-safe serialization.
 *
 * Ensures SSR/client hydration consistency when the source may contain:
 * - Date objects (e.g. from Eden's default reviver)
 * - Map/Set (potential mismatch if any API returns them; JSON.stringify drops entries)
 *
 * @param value - Candidate value.
 * @returns Normalized value: Date→ISO string, Map→plain object, Set→array.
 */
export function normalizeDateValues(value: unknown): unknown {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (value instanceof Map) {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of value) {
      const key = typeof k === "string" ? k : String(k);
      obj[key] = normalizeDateValues(v);
    }
    return obj;
  }
  if (value instanceof Set) {
    return Array.from(value).map((entry) => normalizeDateValues(entry));
  }
  if (Array.isArray(value)) {
    return value.map((entry) => normalizeDateValues(entry));
  }
  if (isRecord(value)) {
    const normalized: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value)) {
      normalized[key] = normalizeDateValues(entry);
    }
    return normalized;
  }
  return value;
}

/**
 * Eden Treaty onResponse handler that normalizes JSON responses for SSR-safe hydration.
 *
 * Parses application/json responses without Eden's date reviver, keeping ISO date
 * strings as strings. Prevents hydration mismatch when server-side API payloads are
 * serialized (Date becomes string) and the client receives different types.
 *
 * Returns undefined for non-JSON or error responses so Eden falls back to its
 * default handling.
 *
 * @param response - Fetch response from Eden request.
 * @returns Normalized parsed object when content-type is application/json and
 *   response is ok; undefined otherwise.
 */
export async function normalizeEdenJsonResponse(response: Response): Promise<unknown> {
  if (!response.ok) {
    return;
  }
  const contentType = response.headers.get("Content-Type")?.trim().split(";")[0]?.trim();
  if (contentType !== MIME_JSON) {
    return;
  }
  const text = await response.clone().text();
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }

  const parsedR = toResultSync(() => JSON.parse(trimmed));
  if (!parsedR.ok) {
    return;
  }

  return normalizeDateValues(parsedR.value);
}
