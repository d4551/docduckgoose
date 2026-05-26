/**
 * Capability ownership entry + policy schemas.
 *
 * @shared/schemas/capability-ownership/entry.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  CapabilityContractsSchema,
  CapabilityDependencySchema,
} from "../capability-registry.schemas.ts";
import { CapabilityOwnershipKindSchema, CapabilityOwnershipStatusSchema } from "./enums.ts";
import { CapabilityOwnershipSourceSchema } from "./source.ts";

/**
 * Schema for policy metadata attached to ownership entries.
 */
export const CapabilityOwnershipEntryPolicySchema: Type.TObject<
  {
    readonly ownerOverridden: Type.TBoolean;
    readonly responsibilityOverridden: Type.TBoolean;
    readonly groupId: Type.TOptional<Type.TString>;
    readonly groupLabel: Type.TOptional<Type.TString>;
  },
  "ownerOverridden" | "responsibilityOverridden",
  Type.InferOptionalKeys<{
    readonly ownerOverridden: Type.TBoolean;
    readonly responsibilityOverridden: Type.TBoolean;
    readonly groupId: Type.TOptional<Type.TString>;
    readonly groupLabel: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    ownerOverridden: Type.Boolean(),
    responsibilityOverridden: Type.Boolean(),
    groupId: Type.Optional(Type.String({ minLength: 1 })),
    groupLabel: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership entry policy metadata.
 */
export type CapabilityOwnershipEntryPolicy = Static<typeof CapabilityOwnershipEntryPolicySchema>;

/**
 * Schema for an ownership entry.
 */
export const CapabilityOwnershipEntrySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    kind: CapabilityOwnershipKindSchema,
    owner: Type.String({ minLength: 1 }),
    responsibility: Type.String({ minLength: 1 }),
    version: Type.String({ minLength: 1 }),
    status: CapabilityOwnershipStatusSchema,
    contracts: CapabilityContractsSchema,
    dependencies: Type.Array(CapabilityDependencySchema),
    source: CapabilityOwnershipSourceSchema,
    observedAt: Type.String({ format: "date-time" }),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    policy: Type.Optional(CapabilityOwnershipEntryPolicySchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership entries.
 */
export type CapabilityOwnershipEntry = Static<typeof CapabilityOwnershipEntrySchema>;
