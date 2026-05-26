/**
 * Capability ownership category + category-map schemas.
 *
 * @shared/schemas/capability-ownership/category.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipKindSchema } from "./enums.ts";
import { CapabilityOwnershipMcpSurfaceSummarySchema } from "./mcp-surface.ts";
import { CapabilityOwnershipStackSummarySchema } from "./stack.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";
import { CapabilityOwnershipSurfaceSummarySchema } from "./surface.ts";

/**
 * Schema for capability ownership category entries.
 */
export const CapabilityOwnershipCategorySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    kinds: Type.Array(CapabilityOwnershipKindSchema),
    domainIds: Type.Array(Type.String({ minLength: 1 })),
    groupIds: Type.Array(Type.String({ minLength: 1 })),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    surfaceSummary: Type.Optional(CapabilityOwnershipSurfaceSummarySchema),
    mcpSummary: Type.Optional(CapabilityOwnershipMcpSurfaceSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership category entries.
 */
export type CapabilityOwnershipCategory = Static<typeof CapabilityOwnershipCategorySchema>;

/**
 * Schema for capability ownership category maps.
 */
export const CapabilityOwnershipCategoryMapSchema = Type.Object(
  {
    categoryIds: Type.Array(Type.String({ minLength: 1 })),
    categories: Type.Array(CapabilityOwnershipCategorySchema),
    summary: CapabilityOwnershipSummarySchema,
    stack: CapabilityOwnershipStackSummarySchema,
    surfaceSummary: Type.Optional(CapabilityOwnershipSurfaceSummarySchema),
    mcpSummary: Type.Optional(CapabilityOwnershipMcpSurfaceSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership category maps.
 */
export type CapabilityOwnershipCategoryMap = Static<typeof CapabilityOwnershipCategoryMapSchema>;
