/**
 * Shared hardware integration summary types.
 *
 * Defines the hardware integration capability snapshot surfaced to AI/XR clients.
 *
 * @shared/types/hardware-integration.ts
 */

import {
  HardwareIntegrationResponseSchema,
  HardwareIntegrationSummarySchema,
} from "@baohaus/bao-schemas/hardware-integration.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
import { isRecord } from "./internal/record.js";

/**
 * Hardware integration capability summary payload.
 */
export type HardwareIntegrationSummary = Static<typeof HardwareIntegrationSummarySchema>;

/** Inferred type from the HardwareIntegrationResponse schema. */
export type HardwareIntegrationResponse = Static<typeof HardwareIntegrationResponseSchema>;

/**
 * Runtime guard for {@link HardwareIntegrationSummary}.
 *
 * @param value - Candidate payload value.
 * @returns True when value matches {@link HardwareIntegrationSummary}.
 */
export function isHardwareIntegrationSummary(value: unknown): value is HardwareIntegrationSummary {
  return Check(HardwareIntegrationSummarySchema, value);
}

/**
 * Runtime guard for {@link HardwareIntegrationResponse}.
 *
 * @param value - Candidate payload value.
 * @returns True when value matches {@link HardwareIntegrationResponse}.
 */
export function isHardwareIntegrationResponse(
  value: unknown,
): value is HardwareIntegrationResponse {
  if (!isRecord(value)) {
    return false;
  }
  return Check(HardwareIntegrationResponseSchema, value);
}
