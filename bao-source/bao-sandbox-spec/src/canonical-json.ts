/**
 * Deterministic canonical-JSON serialization for signing.
 *
 * Cohesion plan §3.4 — `CapabilityGrant.signature` is a detached signature
 * over the canonical-JSON serialization of the grant with the `signature`
 * field omitted. The serializer guarantees:
 *
 * - Object keys are emitted in `Array.prototype.sort` (lexicographic UTF-16)
 *   order at every nesting level.
 * - Array order is preserved.
 * - No extraneous whitespace, no trailing commas, no JSON5 extensions.
 * - The exact set of legal JSON primitive types — `string | number | boolean
 *   | null | object | array`. Numbers MUST be finite; `NaN`/`Infinity` are
 *   rejected because they have no JSON representation and would silently
 *   diverge between signer and verifier.
 * - `undefined` properties are dropped (consistent with JSON.stringify).
 *
 * The output is wire-stable: identical input always produces an identical
 * byte string regardless of the input object's property-declaration order,
 * so signature verification is reproducible across runtimes.
 *
 * @module @baohaus/bao-sandbox-spec/canonical-json
 */

export type CanonicalJsonValue =
  | string
  | number
  | boolean
  | null
  | readonly CanonicalJsonValue[]
  | { readonly [key: string]: CanonicalJsonValue | undefined };

export interface CanonicalJsonOk {
  readonly ok: true;
  readonly value: string;
}

export interface CanonicalJsonError {
  readonly ok: false;
  readonly path: string;
  readonly reason: "non-finite-number" | "unsupported-type" | "cyclic-reference";
}

export type CanonicalJsonResult = CanonicalJsonOk | CanonicalJsonError;

function isPlainRecord(
  value: CanonicalJsonValue,
): value is { readonly [key: string]: CanonicalJsonValue | undefined } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function serializePrimitive(value: string | number | boolean | null): CanonicalJsonResult {
  if (typeof value === "number" && !Number.isFinite(value)) {
    return { ok: false, path: "", reason: "non-finite-number" };
  }
  return { ok: true, value: JSON.stringify(value) };
}

function serializeNode(
  value: CanonicalJsonValue,
  path: string,
  seen: WeakSet<object>,
): CanonicalJsonResult {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return serializePrimitive(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return { ok: false, path, reason: "non-finite-number" };
    }
    return { ok: true, value: JSON.stringify(value) };
  }
  if (Array.isArray(value)) {
    if (seen.has(value)) {
      return { ok: false, path, reason: "cyclic-reference" };
    }
    seen.add(value);
    const parts: string[] = [];
    for (let index = 0; index < value.length; index += 1) {
      const childPath = `${path}[${index}]`;
      const child = value[index];
      if (child === undefined) {
        parts.push("null");
        continue;
      }
      const childResult = serializeNode(child, childPath, seen);
      if (!childResult.ok) {
        return childResult;
      }
      parts.push(childResult.value);
    }
    return { ok: true, value: `[${parts.join(",")}]` };
  }
  if (isPlainRecord(value)) {
    if (seen.has(value)) {
      return { ok: false, path, reason: "cyclic-reference" };
    }
    seen.add(value);
    const keys = Object.keys(value).sort();
    const parts: string[] = [];
    for (const key of keys) {
      const child = value[key];
      if (child === undefined) {
        continue;
      }
      const childResult = serializeNode(child, path.length === 0 ? key : `${path}.${key}`, seen);
      if (!childResult.ok) {
        return childResult;
      }
      parts.push(`${JSON.stringify(key)}:${childResult.value}`);
    }
    return { ok: true, value: `{${parts.join(",")}}` };
  }
  return { ok: false, path, reason: "unsupported-type" };
}

/**
 * Serialize {@link value} as canonical JSON suitable for signing.
 *
 * Returns a discriminated `Result` — `ok: true` carries the wire string,
 * `ok: false` carries the path + reason so the caller can present a
 * structured error without `try/catch`.
 */
export function canonicalJsonStringify(value: CanonicalJsonValue): CanonicalJsonResult {
  return serializeNode(value, "", new WeakSet());
}

/** UTF-8 encode helper used by the grant signer; returns a fresh Uint8Array. */
export function canonicalJsonToUtf8(value: CanonicalJsonValue): CanonicalJsonResult & {
  readonly bytes?: Uint8Array;
} {
  const result = canonicalJsonStringify(value);
  if (!result.ok) {
    return result;
  }
  return { ...result, bytes: new TextEncoder().encode(result.value) };
}

export { isPlainRecord as __isPlainRecord };
