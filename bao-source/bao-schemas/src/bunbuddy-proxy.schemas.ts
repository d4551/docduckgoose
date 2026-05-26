/**
 * BunBuddy proxy request/response schemas.
 *
 * Defines contract-first payloads for proxying bunbuddy operations through
 * the Elysia API while preserving typed inputs and outputs.
 *
 * @shared/schemas/bunbuddy-proxy.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TNumber,
  TObject,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * BunBuddy proxy query value schema.
 */
export const BunBuddyProxyQueryValueSchema: TUnion<
  (TString | TArray<TString> | TBoolean | TNumber | TArray<TNumber> | TArray<TBoolean>)[]
> = TypeExports.Union([
  TypeExports.String(),
  TypeExports.Number(),
  TypeExports.Boolean(),
  TypeExports.Array(TypeExports.String()),
  TypeExports.Array(TypeExports.Number()),
  TypeExports.Array(TypeExports.Boolean()),
]);

/**
 * BunBuddy proxy query schema.
 */
export const BunBuddyProxyQuerySchema: TRecord<
  TString,
  TUnion<(TString | TArray<TString> | TBoolean | TNumber | TArray<TNumber> | TArray<TBoolean>)[]>
> = TypeExports.Record(TypeExports.String(), BunBuddyProxyQueryValueSchema, {});

/**
 * BunBuddy proxy params schema.
 */
export const BunBuddyProxyParamsSchema: TRecord<TString, TString> = TypeExports.Record(
  TypeExports.String(),
  TypeExports.String(),
  {},
);

/**
 * BunBuddy proxy request schema.
 */
export const BunBuddyProxyRequestSchema = TypeExports.Object(
  {
    operation: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    contractKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    params: TypeExports.Optional(BunBuddyProxyParamsSchema),
    query: TypeExports.Optional(BunBuddyProxyQuerySchema),
    body: TypeExports.Optional(TypeExports.Unknown()),
    timeoutMs: TypeExports.Optional(TypeExports.Number()),
    preferredBaseUrl: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy proxy requests.
 */
export type BunBuddyProxyRequest = Static<typeof BunBuddyProxyRequestSchema>;

/**
 * BunBuddy proxy contract descriptor schema.
 */
export const BunBuddyProxyContractSchema: TObject<
  { readonly key: TString; readonly method: TString; readonly path: TString },
  "key" | "method" | "path",
  never
> = TypeExports.Object(
  {
    key: TypeExports.String({ minLength: 1 }),
    method: TypeExports.String({ minLength: 1 }),
    path: TypeExports.String({ minLength: 1 }),
  },
  {},
);

/**
 * BunBuddy proxy success response schema.
 */
export const BunBuddyProxySuccessResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    status: TypeExports.Integer(),
    baseUrl: TypeExports.String({ minLength: 1 }),
    contract: BunBuddyProxyContractSchema,
    data: TypeExports.Optional(TypeExports.Union([TypeExports.Unknown(), TypeExports.Null()])),
    text: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    timestamp: TypeExports.String({ minLength: 1 }),
  },
  {},
);

/**
 * TypeScript type for bunbuddy proxy success responses.
 */
export type BunBuddyProxySuccessResponse = Static<typeof BunBuddyProxySuccessResponseSchema>;
