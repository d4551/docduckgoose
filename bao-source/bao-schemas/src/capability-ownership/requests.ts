/**
 * Capability ownership request schemas.
 *
 * @shared/schemas/capability-ownership/requests.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Schema for capability ownership map requests.
 */
export const CapabilityOwnershipMapRequestSchema: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership map requests.
 */
export type CapabilityOwnershipMapRequest = Static<typeof CapabilityOwnershipMapRequestSchema>;

/**
 * Schema for capability ownership focus requests.
 */
export const CapabilityOwnershipFocusRequestSchema: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership focus requests.
 */
export type CapabilityOwnershipFocusRequest = Static<typeof CapabilityOwnershipFocusRequestSchema>;

/**
 * Schema for capability ownership coverage requests.
 */
export const CapabilityOwnershipCoverageRequestSchema: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership coverage requests.
 */
export type CapabilityOwnershipCoverageRequest = Static<
  typeof CapabilityOwnershipCoverageRequestSchema
>;

/**
 * Schema for capability ownership refresh requests.
 */
export const CapabilityOwnershipRefreshRequestSchema: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership refresh requests.
 */
export type CapabilityOwnershipRefreshRequest = Static<
  typeof CapabilityOwnershipRefreshRequestSchema
>;
