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

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TObject,
  TOptional,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Strict boolean query flag schema.
 *
 * Accepts typed booleans and the canonical string literals emitted by HTTP
 * query strings. Lenient aliases such as `1`, `0`, `yes`, and `off` are
 * intentionally rejected.
 */
export const StrictBooleanQueryFlagSchema: TUnion<
  (TBoolean | TLiteral<"true"> | TLiteral<"false">)[]
> = TypeExports.Union(
  [TypeExports.Boolean(), TypeExports.Literal("true"), TypeExports.Literal("false")],
  {},
);

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
export const EmptyQuerySchema: TObject<Record<string, never>, never, never> = TypeExports.Object(
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
export const RefreshBypassCacheQuerySchema: TObject<
  {
    readonly refresh: TOptional<TUnion<(TBoolean | TLiteral<"true"> | TLiteral<"false">)[]>>;
    readonly bypassCache: TOptional<TUnion<(TBoolean | TLiteral<"true"> | TLiteral<"false">)[]>>;
  },
  never,
  InferOptionalKeys<{
    readonly refresh: TOptional<TUnion<(TBoolean | TLiteral<"true"> | TLiteral<"false">)[]>>;
    readonly bypassCache: TOptional<TUnion<(TBoolean | TLiteral<"true"> | TLiteral<"false">)[]>>;
  }>
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(StrictBooleanQueryFlagSchema),
    bypassCache: TypeExports.Optional(StrictBooleanQueryFlagSchema),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Static type for the shared refresh/bypass-cache query payload.
 */
export type RefreshBypassCacheQuery = Static<typeof RefreshBypassCacheQuerySchema>;
