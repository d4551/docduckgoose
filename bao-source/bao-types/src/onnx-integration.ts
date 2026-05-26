/**
 * Shared ONNX integration summary types.
 *
 * Defines the ONNX integration snapshot surfaced to AI/XR/USD/hardware clients
 * for coordinating inference and offline readiness decisions.
 *
 * @shared/types/onnx-integration.ts
 */

import {
  type OnnxIntegrationCapabilities,
  type OnnxIntegrationModelSummary,
  OnnxIntegrationSummarySchema,
} from "@baohaus/bao-schemas/onnx-integration.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
import { isRecord } from "./internal/record.js";

/**
 * Summary of available ONNX models for integration payloads.
 */
export type { OnnxIntegrationCapabilities, OnnxIntegrationModelSummary };

/**
 * ONNX capabilities payload returned by the integration summary.
 */
/**
 * ONNX integration capability summary payload.
 */
export type OnnxIntegrationSummary = Static<typeof OnnxIntegrationSummarySchema>;

/**
 * Runtime guard for {@link OnnxIntegrationSummary}.
 *
 * @param value - Candidate payload value.
 * @returns True when value matches {@link OnnxIntegrationSummary}.
 */
export function isOnnxIntegrationSummary(value: unknown): value is OnnxIntegrationSummary {
  if (!isRecord(value)) {
    return false;
  }
  return Check(OnnxIntegrationSummarySchema, value);
}
