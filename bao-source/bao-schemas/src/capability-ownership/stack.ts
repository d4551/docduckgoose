/**
 * Capability ownership stack schemas (summary, stack map, stack entry).
 *
 * StackEntry depends on FocusMap, so it lives in `stack-entry.ts` to avoid
 * cycles. This module contains the stack summary and the stack map.
 *
 * @shared/schemas/capability-ownership/stack.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipMcpSurfaceSummarySchema } from "./mcp-surface.ts";
import { CapabilityOwnershipSegmentSchema } from "./segment.ts";

/**
 * Schema for capability ownership stack summary.
 */
export const CapabilityOwnershipStackSummarySchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly segments: Type.TInteger;
    readonly owners: Type.TInteger;
    readonly responsibilities: Type.TInteger;
    readonly kinds: Type.TInteger;
  },
  "total" | "segments" | "owners" | "responsibilities" | "kinds",
  never
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    segments: Type.Integer({ minimum: 0 }),
    owners: Type.Integer({ minimum: 0 }),
    responsibilities: Type.Integer({ minimum: 0 }),
    kinds: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership stack summary.
 */
export type CapabilityOwnershipStackSummary = Static<typeof CapabilityOwnershipStackSummarySchema>;

/**
 * Schema for capability ownership stack map payloads.
 */
export const CapabilityOwnershipStackMapSchema = Type.Object(
  {
    segmentIds: Type.Array(Type.String({ minLength: 1 })),
    segments: Type.Array(CapabilityOwnershipSegmentSchema),
    summary: CapabilityOwnershipStackSummarySchema,
    mcpSummary: Type.Optional(CapabilityOwnershipMcpSurfaceSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership stack map payloads.
 */
export type CapabilityOwnershipStackMap = Static<typeof CapabilityOwnershipStackMapSchema>;
