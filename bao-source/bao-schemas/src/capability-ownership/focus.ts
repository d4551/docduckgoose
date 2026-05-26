/**
 * Capability ownership focus + focus-map schemas.
 *
 * @shared/schemas/capability-ownership/focus.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipCategoryMapSchema } from "./category.ts";
import { CapabilityOwnershipDomainSchema } from "./domain.ts";
import { CapabilityOwnershipHighlightsSchema } from "./highlights.ts";
import { CapabilityOwnershipMcpSurfaceSchema } from "./mcp-surface.ts";
import { CapabilityOwnershipSegmentSchema } from "./segment.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";
import { CapabilityOwnershipSurfaceSchema } from "./surface.ts";

/**
 * Schema for capability ownership focus metadata.
 */
export const CapabilityOwnershipFocusSchema: Type.TObject<
  { readonly segmentIds: Type.TArray<Type.TString>; readonly domainIds: Type.TArray<Type.TString> },
  "domainIds" | "segmentIds",
  never
> = Type.Object(
  {
    segmentIds: Type.Array(Type.String({ minLength: 1 })),
    domainIds: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership focus metadata.
 */
export type CapabilityOwnershipFocus = Static<typeof CapabilityOwnershipFocusSchema>;

/**
 * Schema for capability ownership focus map payloads.
 */
export const CapabilityOwnershipFocusMapSchema = Type.Object(
  {
    focus: CapabilityOwnershipFocusSchema,
    segments: Type.Array(CapabilityOwnershipSegmentSchema),
    domains: Type.Array(CapabilityOwnershipDomainSchema),
    surfaces: Type.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: Type.Optional(Type.Array(CapabilityOwnershipMcpSurfaceSchema)),
    categoryMap: Type.Optional(CapabilityOwnershipCategoryMapSchema),
    highlights: Type.Optional(CapabilityOwnershipHighlightsSchema),
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership focus maps.
 */
export type CapabilityOwnershipFocusMap = Static<typeof CapabilityOwnershipFocusMapSchema>;
