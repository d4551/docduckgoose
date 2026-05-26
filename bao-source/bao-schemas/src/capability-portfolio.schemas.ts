/**
 * Capability portfolio shared readiness schemas.
 *
 * Defines shared readiness and device readiness schemas for capability
 * portfolios (drone, robotics) to keep contract responses aligned.
 *
 * @shared/schemas/capability-portfolio
 */

import type { Static, TLiteral, TNumber, TObject, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import {
  CAPABILITY_OWNERSHIP_STATUSES,
  type CapabilityOwnershipStatus,
} from "./capability-ownership.schemas.ts";

// Capability Portfolio Readiness Status

/**
 * Supported readiness status values for portfolio readiness slices.
 */
export const CAPABILITY_PORTFOLIO_READINESS_STATUSES: readonly [
  "healthy",
  "degraded",
  "unavailable",
  "unknown",
] = ["healthy", "degraded", "unavailable", "unknown"] as const;

/**
 * Type-safe readiness status values.
 */
export type CapabilityPortfolioReadinessStatus =
  (typeof CAPABILITY_PORTFOLIO_READINESS_STATUSES)[number];

/**
 * Readiness status schema.
 */
export const CapabilityPortfolioReadinessStatusSchema: TUnion<
  [
    TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">,
    ...TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">[],
  ]
> = stringEnum(CAPABILITY_PORTFOLIO_READINESS_STATUSES, {
  description: "Capability portfolio readiness status",
});

// Device Readiness

const CapabilityPortfolioDeviceByStatusSchema: TObject<
  Record<CapabilityOwnershipStatus, TNumber>,
  CapabilityOwnershipStatus,
  never
> = TypeExports.Object(
  Object.fromEntries(
    CAPABILITY_OWNERSHIP_STATUSES.map((status) => [status, TypeExports.Number({ minimum: 0 })]),
  ) as Record<CapabilityOwnershipStatus, ReturnType<typeof TypeExports.Number>>,
  { additionalProperties: false },
);

/**
 * Device readiness schema for portfolio systems.
 */
export const CapabilityPortfolioDeviceReadinessSchema: TObject<
  {
    readonly status: TUnion<
      [
        TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">,
        ...TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">[],
      ]
    >;
    readonly total: TNumber;
    readonly byStatus: TObject<
      Record<CapabilityOwnershipStatus, TNumber>,
      CapabilityOwnershipStatus,
      never
    >;
  },
  "status" | "byStatus" | "total",
  never
> = TypeExports.Object(
  {
    status: CapabilityPortfolioReadinessStatusSchema,
    total: TypeExports.Number({ minimum: 0 }),
    byStatus: CapabilityPortfolioDeviceByStatusSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for device readiness.
 */
export type CapabilityPortfolioDeviceReadiness = Static<
  typeof CapabilityPortfolioDeviceReadinessSchema
>;
