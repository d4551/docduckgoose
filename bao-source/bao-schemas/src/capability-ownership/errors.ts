/**
 * Capability ownership error schema.
 *
 * @shared/schemas/capability-ownership/errors.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Schema for ownership map errors.
 */
export const CapabilityOwnershipErrorSchema: Type.TObject<
  {
    readonly scope: Type.TString;
    readonly message: Type.TString;
    readonly code: Type.TOptional<Type.TString>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "scope" | "message",
  Type.InferOptionalKeys<{
    readonly scope: Type.TString;
    readonly message: Type.TString;
    readonly code: Type.TOptional<Type.TString>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  }>
> = Type.Object(
  {
    scope: Type.String({ minLength: 1 }),
    message: Type.String({ minLength: 1 }),
    code: Type.Optional(Type.String({ minLength: 1 })),
    details: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership map errors.
 */
export type CapabilityOwnershipError = Static<typeof CapabilityOwnershipErrorSchema>;
