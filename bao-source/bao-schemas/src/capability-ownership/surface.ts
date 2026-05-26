/**
 * Capability ownership surface schemas.
 *
 * @shared/schemas/capability-ownership/surface.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipKindSchema } from "./enums.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";

/**
 * Schema for ownership surface summaries (group + kind slice).
 */
export const CapabilityOwnershipSurfaceSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    groupId: Type.String({ minLength: 1 }),
    groupLabel: Type.String({ minLength: 1 }),
    domainIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    segmentIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    kind: CapabilityOwnershipKindSchema,
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership surface payloads.
 */
export type CapabilityOwnershipSurface = Static<typeof CapabilityOwnershipSurfaceSchema>;

/**
 * Schema for ownership surface summary counts.
 */
export const CapabilityOwnershipSurfaceSummarySchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly surfaces: Type.TInteger;
    readonly groups: Type.TInteger;
    readonly kinds: Type.TInteger;
    readonly owners: Type.TInteger;
    readonly responsibilities: Type.TInteger;
    readonly domains: Type.TInteger;
  },
  "total" | "surfaces" | "groups" | "kinds" | "owners" | "responsibilities" | "domains",
  never
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    surfaces: Type.Integer({ minimum: 0 }),
    groups: Type.Integer({ minimum: 0 }),
    kinds: Type.Integer({ minimum: 0 }),
    owners: Type.Integer({ minimum: 0 }),
    responsibilities: Type.Integer({ minimum: 0 }),
    domains: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership surface summary payloads.
 */
export type CapabilityOwnershipSurfaceSummary = Static<
  typeof CapabilityOwnershipSurfaceSummarySchema
>;
