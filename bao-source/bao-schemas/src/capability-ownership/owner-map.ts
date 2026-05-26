/**
 * Capability ownership owner-map schemas.
 *
 * @shared/schemas/capability-ownership/owner-map.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";
import { CapabilityOwnershipSurfaceSchema } from "./surface.ts";

/**
 * Schema for ownership owner map sections.
 */
export const CapabilityOwnershipOwnerMapSectionSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    domainIds: Type.Array(Type.String({ minLength: 1 })),
    groupIds: Type.Array(Type.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    surfaces: Type.Array(CapabilityOwnershipSurfaceSchema),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership owner map sections.
 */
export type CapabilityOwnershipOwnerMapSection = Static<
  typeof CapabilityOwnershipOwnerMapSectionSchema
>;

/**
 * Schema for ownership owner maps.
 */
export const CapabilityOwnershipOwnerMapSchema = Type.Object(
  {
    sections: Type.Array(CapabilityOwnershipOwnerMapSectionSchema),
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership owner maps.
 */
export type CapabilityOwnershipOwnerMap = Static<typeof CapabilityOwnershipOwnerMapSchema>;

/**
 * Schema for ownership owner-map matrix rows.
 */
export const CapabilityOwnershipOwnerMapMatrixRowSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    domainIds: Type.Array(Type.String({ minLength: 1 })),
    groupIds: Type.Array(Type.String({ minLength: 1 })),
    segmentIds: Type.Array(Type.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership owner-map matrix rows.
 */
export type CapabilityOwnershipOwnerMapMatrixRow = Static<
  typeof CapabilityOwnershipOwnerMapMatrixRowSchema
>;

/**
 * Schema for ownership owner-map matrices.
 */
export const CapabilityOwnershipOwnerMapMatrixSchema = Type.Object(
  {
    segmentIds: Type.Array(Type.String({ minLength: 1 })),
    rows: Type.Array(CapabilityOwnershipOwnerMapMatrixRowSchema),
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership owner-map matrices.
 */
export type CapabilityOwnershipOwnerMapMatrix = Static<
  typeof CapabilityOwnershipOwnerMapMatrixSchema
>;
