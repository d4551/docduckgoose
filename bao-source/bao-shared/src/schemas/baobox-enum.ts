/**
 * Baobox schema helpers for string enums.
 *
 * We prefer `Type.Union([...Type.Literal(...)])` over `Type.Unsafe(...)` so:
 * - baobox can compile the schema for fast runtime validation
 * - Eden/Elysia response validation does not throw `TypeCompilerUnknownTypeError`
 *
 * `Static<>` inference can degrade when mapping over tuples, so this helper uses a
 * typed tuple cast to preserve `Static<>` as a union of string literals.
 *
 * @shared/schemas/baobox-enum
 */

import type { TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Options supported by this helper. Keep narrow to avoid accidental schema drift.
 */
export type StringEnumSchemaOptions = Partial<{
  title: string;
  description: string;
}>;

type LiteralTuple<T extends readonly [string, ...string[]]> = [
  TLiteral<T[number]>,
  ...TLiteral<T[number]>[],
];

/**
 * Build a string enum schema from a non-empty tuple of string literals.
 *
 * @param values - Non-empty tuple of allowed string values.
 * @param options - Optional schema metadata (e.g. `$id`, `description`).
 * @returns baobox schema that validates a string constrained to `values`.
 */
export function stringEnum<const T extends readonly [string, ...string[]]>(
  values: T,
  options?: StringEnumSchemaOptions,
): TUnion<LiteralTuple<T>> {
  const [first, ...rest] = values;
  const literals = [
    Type.Literal(first),
    ...rest.map((value) => Type.Literal(value)),
  ] as LiteralTuple<T>;
  return Type.Union(literals, { ...(options ?? {}) });
}
