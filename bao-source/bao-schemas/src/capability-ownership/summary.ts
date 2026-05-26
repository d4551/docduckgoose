/**
 * Capability ownership summary count schema.
 *
 * @shared/schemas/capability-ownership/summary.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Schema for ownership summary counts.
 */
export const CapabilityOwnershipSummarySchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly byKind: Type.TObject<
      {
        readonly plugin: Type.TInteger;
        readonly bunbuddy: Type.TInteger;
        readonly library: Type.TInteger;
        readonly driver: Type.TInteger;
        readonly device: Type.TInteger;
        readonly bao: Type.TInteger;
      },
      "plugin" | "bunbuddy" | "library" | "driver" | "device" | "bao",
      never
    >;
    readonly byStatus: Type.TObject<
      {
        readonly registered: Type.TInteger;
        readonly healthy: Type.TInteger;
        readonly degraded: Type.TInteger;
        readonly unavailable: Type.TInteger;
        readonly available: Type.TInteger;
        readonly unreachable: Type.TInteger;
        readonly "not-configured": Type.TInteger;
      },
      | "registered"
      | "healthy"
      | "degraded"
      | "unavailable"
      | "available"
      | "unreachable"
      | "not-configured",
      never
    >;
  },
  "byKind" | "byStatus" | "total",
  never
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    // NOTE: TypeBox's `Type.Record` with a union-of-literals key schema collapses to
    // `Record<never, ...>` for Static<> typing, which breaks downstream indexing.
    // Use explicit objects to preserve strong typing across UI + services.
    byKind: Type.Object(
      {
        plugin: Type.Integer({ minimum: 0 }),
        bunbuddy: Type.Integer({ minimum: 0 }),
        library: Type.Integer({ minimum: 0 }),
        driver: Type.Integer({ minimum: 0 }),
        device: Type.Integer({ minimum: 0 }),
        bao: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    byStatus: Type.Object(
      {
        registered: Type.Integer({ minimum: 0 }),
        healthy: Type.Integer({ minimum: 0 }),
        degraded: Type.Integer({ minimum: 0 }),
        unavailable: Type.Integer({ minimum: 0 }),
        available: Type.Integer({ minimum: 0 }),
        unreachable: Type.Integer({ minimum: 0 }),
        "not-configured": Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership summary counts.
 */
export type CapabilityOwnershipSummary = Static<typeof CapabilityOwnershipSummarySchema>;
