import type { SchemaError } from "../error/errors.js";
import { Kind } from "../shared/symbols.js";
import { TryParseValue } from "../value/parse.js";
import type { StandardSchemaV1Issue, StandardSchemaV1Props, TSchema } from "./base-types.js";

export type SchemaRecord = TSchema & Record<string, unknown>;
export type LiteralValue = string | number | boolean | bigint;
type TSchemaRuntimeFields = Pick<TSchema, typeof Kind | "params" | "static"> & {
  readonly "~standard": StandardSchemaV1Props<unknown, unknown>;
};

export function isObjectValue(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isSchemaLike(value: unknown): value is TSchema {
  return isObjectValue(value) && typeof value["~kind"] === "string";
}

export function getKind(schema: TSchema): string | undefined {
  const kind = (schema as SchemaRecord)["~kind"];
  return typeof kind === "string" ? kind : undefined;
}

export function hasKind(schema: TSchema, kind: string): boolean {
  return getKind(schema) === kind;
}

export function discardKeys<T extends Record<string, unknown>>(
  value: T | object,
  keys: readonly string[],
): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([key]) => !keys.includes(key)));
}

export function mergeOptions<T extends TSchema>(
  schema: T,
  options: Record<string, unknown> = {},
): T {
  const merged = { ...schema, ...options };
  const kind = merged["~kind"];
  return typeof kind === "string"
    ? (withSchemaFields({ ...merged, "~kind": kind }) as T)
    : (merged as T);
}

function toStandardPath(path: string): readonly PropertyKey[] | undefined {
  if (path === "" || path === "/") {
    return [];
  }

  return path.split(".").map((segment) => {
    const numeric = Number(segment);
    return Number.isInteger(numeric) && `${numeric}` === segment ? numeric : segment;
  });
}

function toStandardIssue(error: SchemaError): StandardSchemaV1Issue {
  return {
    message: error.message,
    path: toStandardPath(error.path),
  };
}

function createStandardProps(schema: TSchema): StandardSchemaV1Props<unknown, unknown> {
  return {
    types: {
      input: undefined,
      output: undefined,
    },
    validate(value) {
      const result = TryParseValue(schema, value);
      return result.success
        ? { value: result.value }
        : { issues: result.errors.map(toStandardIssue) };
    },
    vendor: "baobox",
    version: 1,
  };
}

/**
 * Map baobox `~kind` to JSON Schema `type` discriminator.
 *
 * TypeBox's IsSchema guards (and Elysia's TypeCompiler preflight) require
 * the standard `type` field on built-in schema types. Baobox schemas use
 * `~kind` as their primary discriminator and omit `type` by default. This
 * map stamps the JSON Schema `type` at construction time so schemas are
 * valid for both baobox and TypeBox consumption paths.
 */
const KIND_TO_TYPE: Readonly<Record<string, string>> = {
  String: "string",
  Number: "number",
  Integer: "integer",
  Boolean: "boolean",
  Null: "null",
  Array: "array",
  Object: "object",
  Promise: "Promise",
  Iterator: "Iterator",
  AsyncIterator: "AsyncIterator",
  Void: "void",
  Undefined: "undefined",
  Symbol: "symbol",
};

export function withSchemaFields<T extends Record<string, unknown> & { "~kind": string }>(
  schema: T,
): T & TSchemaRuntimeFields;
export function withSchemaFields<T extends Record<string, unknown>>(schema: T): T {
  const kind = schema["~kind"];
  if (typeof kind !== "string") {
    return schema;
  }

  const base: Record<string, unknown> = {
    ...schema,
    [Kind]: kind,
    params: Array.isArray(schema.params) ? schema.params : [],
    static: "static" in schema ? schema.static : undefined,
  };

  if (!("~standard" in base)) {
    Object.defineProperty(base, "~standard", {
      configurable: true,
      enumerable: false,
      value: createStandardProps(base as TSchema),
      writable: true,
    });
  }

  // Stamp JSON Schema `type` when the kind has a known mapping and the
  // schema doesn't already carry one (e.g. Object sets it in combinator-core).
  if (!("type" in base) || base.type === undefined) {
    const jsonType = KIND_TO_TYPE[kind];
    if (jsonType !== undefined) {
      base.type = jsonType;
    }
  }

  return base as T;
}

export function isLiteralValue(value: unknown): value is LiteralValue {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  );
}

export function getLiteralConst(schema: TSchema): LiteralValue | undefined {
  if (getKind(schema) !== "Literal") {
    return;
  }
  const value = (schema as SchemaRecord).const;
  return isLiteralValue(value) ? value : undefined;
}

export function escapePattern(value: string): string {
  return value.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");
}

export function stripAnchors(pattern: string): string {
  return pattern.startsWith("^") && pattern.endsWith("$") ? pattern.slice(1, -1) : pattern;
}
