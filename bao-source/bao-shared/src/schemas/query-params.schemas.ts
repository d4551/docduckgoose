/**
 * Shared query parameter schemas.
 *
 * Centralizes strict boolean query flags so API contracts and route guards
 * share one forward-only HTTP boundary. Query strings may arrive as booleans
 * from typed clients or as the literal strings `"true"` / `"false"` from raw
 * URLs. No other aliases are accepted.
 *
 * @packageDocumentation
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Strict boolean query flag schema.
 *
 * Accepts typed booleans and the canonical string literals emitted by HTTP
 * query strings. Lenient aliases such as `1`, `0`, `yes`, and `off` are
 * intentionally rejected.
 */
export const StrictBooleanQueryFlagSchema: Type.TUnion<
  (Type.TBoolean | Type.TLiteral<"true"> | Type.TLiteral<"false">)[]
> = Type.Union([Type.Boolean(), Type.Literal("true"), Type.Literal("false")], {});

/**
 * Static type for a strict boolean query flag.
 */
export type StrictBooleanQueryFlag = Static<typeof StrictBooleanQueryFlagSchema>;

/**
 * Shared empty query schema for routes that do not accept query parameters.
 *
 * Using a single strict schema prevents silent acceptance of undeclared
 * parameters on public health and metadata surfaces.
 */
export const EmptyQuerySchema: Type.TObject<Record<string, never>, never, never> = Type.Object(
  {},
  {
    additionalProperties: false,
  },
);

/**
 * Static type for routes that do not accept query parameters.
 */
export type EmptyQuery = Static<typeof EmptyQuerySchema>;

/**
 * Shared query schema for refresh/bypass-cache toggles.
 */
export const RefreshBypassCacheQuerySchema: Type.TObject<
  {
    readonly refresh: Type.TOptional<
      Type.TUnion<(Type.TBoolean | Type.TLiteral<"true"> | Type.TLiteral<"false">)[]>
    >;
    readonly bypassCache: Type.TOptional<
      Type.TUnion<(Type.TBoolean | Type.TLiteral<"true"> | Type.TLiteral<"false">)[]>
    >;
  },
  never,
  Type.InferOptionalKeys<{
    readonly refresh: Type.TOptional<
      Type.TUnion<(Type.TBoolean | Type.TLiteral<"true"> | Type.TLiteral<"false">)[]>
    >;
    readonly bypassCache: Type.TOptional<
      Type.TUnion<(Type.TBoolean | Type.TLiteral<"true"> | Type.TLiteral<"false">)[]>
    >;
  }>
> = Type.Object(
  {
    refresh: Type.Optional(StrictBooleanQueryFlagSchema),
    bypassCache: Type.Optional(StrictBooleanQueryFlagSchema),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Static type for the shared refresh/bypass-cache query payload.
 */
export type RefreshBypassCacheQuery = Static<typeof RefreshBypassCacheQuerySchema>;
