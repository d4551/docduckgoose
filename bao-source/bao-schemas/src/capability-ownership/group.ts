/**
 * Capability ownership group schema.
 *
 * @shared/schemas/capability-ownership/group.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipEntrySchema } from "./entry.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";

/**
 * Schema for grouped ownership entries.
 */
export const CapabilityOwnershipGroupSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    entries: Type.Array(CapabilityOwnershipEntrySchema),
    summary: CapabilityOwnershipSummarySchema,
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership group payloads.
 */
export type CapabilityOwnershipGroup = Static<typeof CapabilityOwnershipGroupSchema>;
