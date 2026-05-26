import { type ExternalTypeBoxSchema, isIngestedTypeBoxSchema } from "../interop/typebox.js";
import type { TypeValidatorEntry } from "../shared/registries.js";
import {
  RuntimeContext,
  type RuntimeContextArg,
  resolveRuntimeContext,
} from "../shared/runtime-context.js";
import { schemaKind } from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";
import type { Static } from "../type/static-types.js";
import { checkCollectionKind } from "./check-collections.js";
import { checkExtensionKind } from "./check-extensions.js";
import { checkPrimitiveKind } from "./check-primitives.js";

/** Options for the Check function */
export interface ValueCheckOptions {
  coerce?: boolean;
  context?: RuntimeContext;
}

function resolveCheckContext(context?: RuntimeContextArg): RuntimeContext {
  return resolveRuntimeContext(context);
}

function isTSchemaCompatible(schema: unknown): schema is TSchema {
  if (typeof schema !== "object" || schema === null) {
    return false;
  }
  return "~kind" in schema || isIngestedTypeBoxSchema(schema);
}

/** Validate a value against a schema, returning a type guard */
export function Check<T extends TSchema | ExternalTypeBoxSchema>(
  schema: T,
  value: unknown,
  options?: ValueCheckOptions | RuntimeContext,
): value is Static<T> {
  if (!isTSchemaCompatible(schema)) {
    return false;
  }
  return CheckInternal(schema, value, new Map(), resolveCheckContext(options));
}

/** Type guard: is this value already a fully resolved RuntimeContext? */
function isRuntimeContext(value: RuntimeContextArg): value is RuntimeContext {
  return value !== undefined && typeof value === "object" && value instanceof RuntimeContext;
}

/** @internal Recursive validation core */
export function CheckInternal(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  context?: RuntimeContextArg,
): boolean {
  // Avoid re-resolving context on recursive calls — if already a RuntimeContext, use directly
  const runtimeContext = isRuntimeContext(context) ? context : resolveCheckContext(context);
  const kind = schemaKind(schema);

  const primitiveResult = checkPrimitiveKind(kind, schema, value, runtimeContext);
  if (primitiveResult !== undefined) {
    return primitiveResult;
  }

  const collectionResult = checkCollectionKind(
    kind,
    schema,
    value,
    refs,
    (nextSchema, nextValue, nextRefs) =>
      CheckInternal(nextSchema, nextValue, nextRefs, runtimeContext),
  );
  if (collectionResult !== undefined) {
    return collectionResult;
  }

  const extensionResult = checkExtensionKind(
    kind,
    schema,
    value,
    refs,
    (nextSchema, nextValue, nextRefs) =>
      CheckInternal(nextSchema, nextValue, nextRefs, runtimeContext),
  );
  if (extensionResult !== undefined) {
    return extensionResult;
  }

  const entry: TypeValidatorEntry | undefined = runtimeContext.typeRegistry.get(kind ?? "");
  if (typeof entry === "function") {
    return entry(schema, value);
  }
  return entry !== undefined && typeof entry === "object" ? entry.check(schema, value) : false;
}
