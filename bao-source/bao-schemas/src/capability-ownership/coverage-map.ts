/**
 * Capability ownership coverage map schema.
 *
 * @shared/schemas/capability-ownership/coverage-map.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipCoverageSegmentSchema } from "./coverage.ts";
import { CapabilityOwnershipDomainSchema } from "./domain.ts";
import { CapabilityOwnershipFocusSchema } from "./focus.ts";
import { CapabilityOwnershipMatrixSchema } from "./matrix.ts";
import { CapabilityOwnershipMcpSurfaceSchema } from "./mcp-surface.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";
import { CapabilityOwnershipSurfaceSchema } from "./surface.ts";

/**
 * Schema for capability ownership coverage map payloads.
 */
export const CapabilityOwnershipCoverageMapSchema = Type.Object(
  {
    focus: CapabilityOwnershipFocusSchema,
    segments: Type.Array(CapabilityOwnershipCoverageSegmentSchema),
    domains: Type.Array(CapabilityOwnershipDomainSchema),
    surfaces: Type.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: Type.Optional(Type.Array(CapabilityOwnershipMcpSurfaceSchema)),
    matrix: CapabilityOwnershipMatrixSchema,
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership coverage maps.
 */
export type CapabilityOwnershipCoverageMap = Static<typeof CapabilityOwnershipCoverageMapSchema>;
