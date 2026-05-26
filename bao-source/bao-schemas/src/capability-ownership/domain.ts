/**
 * Capability ownership domain schema.
 *
 * @shared/schemas/capability-ownership/domain.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";

/**
 * Schema for ownership domain summaries.
 */
export const CapabilityOwnershipDomainSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    groupIds: Type.Array(Type.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership domain payloads.
 */
export type CapabilityOwnershipDomain = Static<typeof CapabilityOwnershipDomainSchema>;
