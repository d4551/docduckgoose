/**
 * Capability ownership segment schemas.
 *
 * @shared/schemas/capability-ownership/segment.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipEntrySchema } from "./entry.ts";
import { CapabilityOwnershipKindSchema } from "./enums.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";
import { CapabilityOwnershipSurfaceSchema } from "./surface.ts";

/**
 * Schema for ownership segments (targeted slices across groups/kinds).
 */
export const CapabilityOwnershipSegmentSummarySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    domainIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    groupIds: Type.Array(Type.String({ minLength: 1 })),
    kinds: Type.Optional(Type.Array(CapabilityOwnershipKindSchema)),
    summary: CapabilityOwnershipSummarySchema,
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership segment summary payloads.
 */
export type CapabilityOwnershipSegmentSummary = Static<
  typeof CapabilityOwnershipSegmentSummarySchema
>;

/**
 * Schema for ownership segments (targeted slices across groups/kinds).
 */
export const CapabilityOwnershipSegmentSchema = Type.Object(
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
    entries: Type.Optional(Type.Array(CapabilityOwnershipEntrySchema)),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership segments.
 */
export type CapabilityOwnershipSegment = Static<typeof CapabilityOwnershipSegmentSchema>;
