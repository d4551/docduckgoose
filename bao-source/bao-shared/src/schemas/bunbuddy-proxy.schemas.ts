/**
 * BunBuddy proxy request/response schemas.
 *
 * Defines contract-first payloads for proxying bunbuddy operations through
 * the Elysia API while preserving typed inputs and outputs.
 *
 * @shared/schemas/bunbuddy-proxy.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * BunBuddy proxy query value schema.
 */
export const BunBuddyProxyQueryValueSchema: Type.TUnion<
  (
    | Type.TString
    | Type.TArray<Type.TString>
    | Type.TBoolean
    | Type.TNumber
    | Type.TArray<Type.TNumber>
    | Type.TArray<Type.TBoolean>
  )[]
> = Type.Union([
  Type.String(),
  Type.Number(),
  Type.Boolean(),
  Type.Array(Type.String()),
  Type.Array(Type.Number()),
  Type.Array(Type.Boolean()),
]);

/**
 * BunBuddy proxy query schema.
 */
export const BunBuddyProxyQuerySchema: Type.TRecord<
  Type.TString,
  Type.TUnion<
    (
      | Type.TString
      | Type.TArray<Type.TString>
      | Type.TBoolean
      | Type.TNumber
      | Type.TArray<Type.TNumber>
      | Type.TArray<Type.TBoolean>
    )[]
  >
> = Type.Record(Type.String(), BunBuddyProxyQueryValueSchema, {});

/**
 * BunBuddy proxy params schema.
 */
export const BunBuddyProxyParamsSchema: Type.TRecord<Type.TString, Type.TString> = Type.Record(
  Type.String(),
  Type.String(),
  {},
);

/**
 * BunBuddy proxy request schema.
 */
export const BunBuddyProxyRequestSchema = Type.Object(
  {
    operation: Type.Optional(Type.String({ minLength: 1 })),
    contractKey: Type.Optional(Type.String({ minLength: 1 })),
    params: Type.Optional(BunBuddyProxyParamsSchema),
    query: Type.Optional(BunBuddyProxyQuerySchema),
    body: Type.Optional(Type.Unknown()),
    timeoutMs: Type.Optional(Type.Number()),
    preferredBaseUrl: Type.Optional(Type.String({ minLength: 1 })),
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
export const BunBuddyProxyContractSchema: Type.TObject<
  { readonly key: Type.TString; readonly method: Type.TString; readonly path: Type.TString },
  "key" | "method" | "path",
  never
> = Type.Object(
  {
    key: Type.String({ minLength: 1 }),
    method: Type.String({ minLength: 1 }),
    path: Type.String({ minLength: 1 }),
  },
  {},
);

/**
 * BunBuddy proxy success response schema.
 */
export const BunBuddyProxySuccessResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    status: Type.Integer(),
    baseUrl: Type.String({ minLength: 1 }),
    contract: BunBuddyProxyContractSchema,
    data: Type.Optional(Type.Union([Type.Unknown(), Type.Null()])),
    text: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    timestamp: Type.String({ minLength: 1 }),
  },
  {},
);

/**
 * TypeScript type for bunbuddy proxy success responses.
 */
export type BunBuddyProxySuccessResponse = Static<typeof BunBuddyProxySuccessResponseSchema>;
