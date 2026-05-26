/**
 * Hardware summary API response types.
 *
 * Defines the aggregated hardware summary payload returned by
 * `GET /api/v1/hardware/summary` for UI dashboards.
 *
 * @shared/types/hardware-summary.ts
 */

import {
  HardwareStatusEnvelopeSchema,
  HardwareSummaryResponseSchema,
} from "@baohaus/bao-schemas/hardware-summary.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
import { isRecord } from "./internal/record.js";

/**
 * Generic envelope for hardware status payloads.
 */
export type HardwareStatusEnvelope = Static<typeof HardwareStatusEnvelopeSchema>;

/**
 * Aggregated hardware summary response payload.
 */
export type HardwareSummaryResponse = Static<typeof HardwareSummaryResponseSchema>;

/**
 * Runtime guard for {@link HardwareStatusEnvelope}.
 *
 * @param value - Candidate payload.
 * @returns True when value matches {@link HardwareStatusEnvelope}.
 */
export function isHardwareStatusEnvelope(value: unknown): value is HardwareStatusEnvelope {
  return Check(HardwareStatusEnvelopeSchema, value);
}

/**
 * Runtime guard for {@link HardwareSummaryResponse}.
 *
 * @param value - Candidate payload.
 * @returns True when value matches {@link HardwareSummaryResponse}.
 */
export function isHardwareSummaryResponse(value: unknown): value is HardwareSummaryResponse {
  if (!isRecord(value)) {
    return false;
  }
  return Check(HardwareSummaryResponseSchema, value);
}
