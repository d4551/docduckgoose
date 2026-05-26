/**
 * Capability ownership coverage segment schema.
 *
 * @shared/schemas/capability-ownership/coverage.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipKindSchema } from "./enums.ts";
import { CapabilityOwnershipMatrixCellSchema } from "./matrix.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";
import { CapabilityOwnershipSurfaceSchema } from "./surface.ts";

/**
 * Schema for coverage segment payloads (entries omitted).
 */
export const CapabilityOwnershipCoverageSegmentSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    domainIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    groupIds: Type.Array(Type.String({ minLength: 1 })),
    kinds: Type.Optional(Type.Array(CapabilityOwnershipKindSchema)),
    summary: CapabilityOwnershipSummarySchema,
    surfaces: Type.Array(CapabilityOwnershipSurfaceSchema),
    kindSummary: Type.Array(CapabilityOwnershipMatrixCellSchema),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for coverage segment payloads.
 */
export type CapabilityOwnershipCoverageSegment = Static<
  typeof CapabilityOwnershipCoverageSegmentSchema
>;
