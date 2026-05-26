import { type JsonValue, parseJsonSafe } from "./parse.ts";
import { settle } from "./settle.ts";

export type JsonObject = { readonly [key: string]: JsonValue };

export function isPlainObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readStringField(obj: JsonObject, key: string): string | undefined {
  if (!Reflect.has(obj, key)) {
    return undefined;
  }
  const value = Reflect.get(obj, key);
  return typeof value === "string" ? value : undefined;
}

export async function parseJsonTextToValue(
  text: string,
): Promise<{ readonly ok: true; readonly value: JsonValue } | { readonly ok: false }> {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return { ok: false };
  }
  const settled = await settle(Promise.resolve(parseJsonSafe(trimmed)));
  if (!settled.ok) {
    return { ok: false };
  }
  const parsed = settled.value;
  if (!parsed.ok) {
    return { ok: false };
  }
  return { ok: true, value: parsed.value };
}

export async function parseJsonObjectFromText(text: string): Promise<JsonObject | undefined> {
  const parsed = await parseJsonTextToValue(text);
  if (!parsed.ok) {
    return undefined;
  }
  return isPlainObject(parsed.value) ? parsed.value : undefined;
}
