import { Get } from "./pointer.js";
import {
  DecodePointerToken,
  IsArray,
  IsObject,
  IsSchema,
  IsSchemaObject,
  Keys,
  type XSchema,
} from "./shared.js";

function matchHash(schema: XSchema, ref: URL): XSchema | undefined {
  let result: XSchema | undefined;
  if (ref.href.endsWith("#")) {
    result = schema;
  } else if (ref.hash.startsWith("#")) {
    const value = Get(schema, decodeURIComponent(DecodePointerToken(ref.hash.slice(1))));
    result = IsSchema(value) ? value : undefined;
  }
  return result;
}

function matchId(schema: Record<string, unknown>, base: URL, ref: URL): XSchema | undefined {
  let result: XSchema | undefined;
  const id = schema.$id;
  if (typeof id !== "string") {
    return result;
  }
  if (id === ref.hash) {
    result = schema;
    return result;
  }
  const absoluteId = new URL(id, base.href);
  const absoluteRef = new URL(ref.href, base.href);
  if (absoluteId.pathname === absoluteRef.pathname) {
    result = ref.hash.startsWith("#") ? matchHash(schema, ref) : schema;
  }
  return result;
}

function matchAnchor(schema: Record<string, unknown>, base: URL, ref: URL): XSchema | undefined {
  let result: XSchema | undefined;
  const anchor = schema.$anchor;
  if (typeof anchor !== "string") {
    return result;
  }
  const absoluteAnchor = new URL(`#${anchor}`, base.href);
  const absoluteRef = new URL(ref.href, base.href);
  if (absoluteAnchor.href === absoluteRef.href) {
    result = schema;
  }
  return result;
}

function match(schema: Record<string, unknown>, base: URL, ref: URL): XSchema | undefined {
  return matchId(schema, base, ref) ?? matchAnchor(schema, base, ref) ?? matchHash(schema, ref);
}

function fromArray(values: unknown[], base: URL, ref: URL): XSchema | undefined {
  let result: XSchema | undefined;
  for (const value of values) {
    const found = fromValue(value, base, ref);
    if (found !== undefined) {
      result = found;
      break;
    }
  }
  return result;
}

function fromObject(schema: Record<string, unknown>, base: URL, ref: URL): XSchema | undefined {
  let result: XSchema | undefined;
  for (const key of Keys(schema)) {
    const found = fromValue(schema[key], base, ref);
    if (found !== undefined) {
      result = found;
      break;
    }
  }
  return result;
}

function fromValue(value: unknown, base: URL, ref: URL): XSchema | undefined {
  let result: XSchema | undefined;
  const nextId = IsSchemaObject(value) ? value.$id : undefined;
  const nextBase = typeof nextId === "string" ? new URL(nextId, base.href) : base;
  if (IsSchemaObject(value)) {
    const found = match(value, nextBase, ref);
    if (found !== undefined) {
      result = found;
      return result;
    }
  }
  if (IsArray(value)) {
    result = fromArray(value, nextBase, ref);
    return result;
  }
  if (IsObject(value)) {
    result = fromObject(value, nextBase, ref);
    return result;
  }
  return result;
}

export function Ref(schema: XSchema, ref: string): XSchema | undefined {
  const defaultBase = new URL("http://unknown");
  const initialId = IsSchemaObject(schema) ? schema.$id : undefined;
  const initialBase =
    typeof initialId === "string" ? new URL(initialId, defaultBase.href) : defaultBase;
  const targetRef = new URL(ref, initialBase.href);
  return fromValue(schema, initialBase, targetRef);
}

export const Resolve: { Ref: typeof Ref } = {
  Ref,
};
