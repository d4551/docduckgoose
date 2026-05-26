/**
 * Capability ownership enum schemas (kind + status).
 *
 * @shared/schemas/capability-ownership/enums.ts
 */

import type { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "../baobox-enum.ts";

// Capability Ownership Kind

/**
 * Supported ownership entry kinds.
 */
export const CAPABILITY_OWNERSHIP_KINDS: readonly [
  "plugin",
  "bunbuddy",
  "library",
  "driver",
  "device",
  "bao",
] = ["plugin", "bunbuddy", "library", "driver", "device", "bao"] as const;

/**
 * Type-safe ownership kind enumeration.
 */
export type CapabilityOwnershipKind = (typeof CAPABILITY_OWNERSHIP_KINDS)[number];

/**
 * Capability ownership kind schema.
 */
export const CapabilityOwnershipKindSchema: Type.TUnion<
  [
    Type.TLiteral<"plugin" | "bunbuddy" | "library" | "driver" | "device" | "bao">,
    ...Type.TLiteral<"plugin" | "bunbuddy" | "library" | "driver" | "device" | "bao">[],
  ]
> = stringEnum(CAPABILITY_OWNERSHIP_KINDS, {
  description: "Type of ownership entry",
});

// Capability Ownership Status

/**
 * Supported ownership status values.
 */
export const CAPABILITY_OWNERSHIP_STATUSES: readonly [
  "registered",
  "healthy",
  "degraded",
  "unavailable",
  "available",
  "unreachable",
  "not-configured",
] = [
  "registered",
  "healthy",
  "degraded",
  "unavailable",
  "available",
  "unreachable",
  "not-configured",
] as const;

/**
 * Type-safe ownership status enumeration.
 */
export type CapabilityOwnershipStatus = (typeof CAPABILITY_OWNERSHIP_STATUSES)[number];

/**
 * Capability ownership status schema.
 */
export const CapabilityOwnershipStatusSchema: Type.TUnion<
  [
    Type.TLiteral<
      | "registered"
      | "healthy"
      | "degraded"
      | "unavailable"
      | "available"
      | "unreachable"
      | "not-configured"
    >,
    ...Type.TLiteral<
      | "registered"
      | "healthy"
      | "degraded"
      | "unavailable"
      | "available"
      | "unreachable"
      | "not-configured"
    >[],
  ]
> = stringEnum(CAPABILITY_OWNERSHIP_STATUSES, {
  description: "Health/availability status",
});
