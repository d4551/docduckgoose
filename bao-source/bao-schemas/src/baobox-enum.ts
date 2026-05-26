/**
 * Baobox schema helpers for string enums.
 *
 * Builds a non-empty union of baobox literal schemas so the compiler can
 * validate enum values without unsafe schemas.
 *
 * @shared/schemas/baobox-enum
 */

import type { TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Options supported by this helper. Keep narrow to avoid accidental schema drift.
 */
export type StringEnumSchemaOptions = Partial<{
  title: string;
  description: string;
}>;

/**
 * Build a string enum schema from a non-empty tuple of string literals.
 *
 * @param values - Non-empty tuple of allowed string values.
 * @param options - Optional schema metadata (e.g. `$id`, `description`).
 * @returns Baobox schema that validates a string constrained to `values`.
 */
export function stringEnum<const T extends readonly [string, ...string[]]>(
  values: T,
  options?: StringEnumSchemaOptions,
): TUnion<LiteralTuple<T>> {
  const [first, ...rest] = values;
  const literals: LiteralTuple<T> = [TypeExports.Literal(first)];
  for (const value of rest) {
    literals.push(TypeExports.Literal(value));
  }
  return TypeExports.Union(literals, { ...(options ?? {}) });
}
type LiteralTuple<T extends readonly [string, ...string[]]> = [
  TLiteral<T[number]>,
  ...TLiteral<T[number]>[],
];
