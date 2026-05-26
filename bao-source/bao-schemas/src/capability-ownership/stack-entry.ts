/**
 * Capability ownership stack entry schema.
 *
 * Split from `stack.ts` because StackEntry depends on FocusMap, which itself
 * pulls in segments/domains/surfaces. Keeping this in its own module preserves
 * a clean dependency order with no cycles.
 *
 * @shared/schemas/capability-ownership/stack-entry.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipFocusMapSchema } from "./focus.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";

/**
 * Schema for capability ownership stack entries.
 */
export const CapabilityOwnershipStackEntrySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    segmentIds: Type.Array(Type.String({ minLength: 1 })),
    domainIds: Type.Array(Type.String({ minLength: 1 })),
    map: CapabilityOwnershipFocusMapSchema,
    summary: CapabilityOwnershipSummarySchema,
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership stack entries.
 */
export type CapabilityOwnershipStackEntry = Static<typeof CapabilityOwnershipStackEntrySchema>;
