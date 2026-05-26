/**
 * Capability ownership matrix schemas.
 *
 * @shared/schemas/capability-ownership/matrix.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipKindSchema } from "./enums.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";

/**
 * Schema for capability ownership matrix cells.
 */
export const CapabilityOwnershipMatrixCellSchema = Type.Object(
  {
    kind: CapabilityOwnershipKindSchema,
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership matrix cells.
 */
export type CapabilityOwnershipMatrixCell = Static<typeof CapabilityOwnershipMatrixCellSchema>;

/**
 * Schema for capability ownership matrix rows.
 */
export const CapabilityOwnershipMatrixRowSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    domainIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    summary: CapabilityOwnershipSummarySchema,
    cells: Type.Array(CapabilityOwnershipMatrixCellSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership matrix rows.
 */
export type CapabilityOwnershipMatrixRow = Static<typeof CapabilityOwnershipMatrixRowSchema>;

/**
 * Schema for capability ownership matrix payloads.
 */
export const CapabilityOwnershipMatrixSchema = Type.Object(
  {
    segmentIds: Type.Array(Type.String({ minLength: 1 })),
    kindOrder: Type.Array(CapabilityOwnershipKindSchema),
    rows: Type.Array(CapabilityOwnershipMatrixRowSchema),
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership matrix payloads.
 */
export type CapabilityOwnershipMatrix = Static<typeof CapabilityOwnershipMatrixSchema>;
