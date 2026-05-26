/**
 * Device diagnostics normalization helpers.
 *
 * Converts diagnostics API envelopes into a stable UI-friendly view model.
 *
 * @baohaus/bao-utils/device-diagnostics
 */

import type {
  DeviceDiagnosticsCounts,
  DeviceDiagnosticsErrorDetails,
  DeviceDiagnosticsOkResponse,
  DeviceDiagnosticsProvider,
  DeviceDiagnosticsResponse,
} from "@baohaus/bao-schemas/device-diagnostics.schemas";
import {
  DeviceDiagnosticsErrorDetailsSchema,
  type DeviceDiagnosticsFeatures,
  type DeviceDiagnosticsProviderStatus,
} from "@baohaus/bao-schemas/device-diagnostics.schemas";
import { Check } from "@baohaus/baobox/value";

/**
 * Normalized diagnostics view payload for UI consumption.
 */
export interface DeviceDiagnosticsView {
  /** Whether diagnostics were returned successfully. */
  ok: boolean;
  /** Database readiness flag when available. */
  dbReady: boolean;
  /** Health indicator. */
  health: DeviceDiagnosticsOkResponse["health"];
  /** Diagnostics feature flags. */
  features: DeviceDiagnosticsFeatures;
  /** BunBuddy provider map. */
  providers: Record<string, DeviceDiagnosticsProvider>;
  /** Device counts for diagnostics. */
  counts: DeviceDiagnosticsCounts;
  /** Diagnostics summary by type. */
  byType: Record<string, unknown>;
  /** Diagnostics summary by status. */
  byStatus: Record<string, unknown>;
  /** Last diagnostics run time. */
  lastRun: string;
  /** Snapshot timestamp. */
  timestamp: string;
  /** Optional error message for fallback responses. */
  error?: string;
  /** Optional error code for fallback responses. */
  code?: string;
}

/**
 * Normalize diagnostics error details from a response envelope.
 *
 * @param details - Candidate details value.
 * @returns Parsed diagnostics details or null.
 */
export function normalizeDeviceDiagnosticsErrorDetails(
  details: unknown,
): DeviceDiagnosticsErrorDetails | null {
  if (!Check(DeviceDiagnosticsErrorDetailsSchema, details)) {
    return null;
  }
  return details as DeviceDiagnosticsErrorDetails;
}

/**
 * Normalize diagnostics response payloads into a stable view model.
 *
 * @param response - Raw diagnostics response.
 * @returns Normalized diagnostics view or null.
 */
export function normalizeDeviceDiagnosticsResponse(
  response: DeviceDiagnosticsResponse | null,
): DeviceDiagnosticsView | null {
  if (!response) {
    return null;
  }
  if (response.ok) {
    return {
      ok: true,
      dbReady: true,
      health: response.health,
      features: response.features,
      providers: response.providers,
      counts: response.counts,
      byType: response.byType,
      byStatus: response.byStatus,
      lastRun: response.lastRun,
      timestamp: response.timestamp,
    };
  }

  const details = normalizeDeviceDiagnosticsErrorDetails(response.details);
  if (!details) {
    return null;
  }
  return {
    ok: false,
    dbReady: false,
    health: details.health,
    features: details.features,
    providers: details.providers,
    counts: details.counts,
    byType: details.byType,
    byStatus: details.byStatus,
    lastRun: details.lastRun,
    timestamp: details.timestamp,
    error: response.error,
    code: response.code,
  };
}

/**
 * Convert diagnostics provider status to a normalized label for UI use.
 *
 * @param status - Provider status.
 * @returns Normalized status value.
 */
export function normalizeDeviceDiagnosticsProviderStatus(
  status?: DeviceDiagnosticsProviderStatus,
): DeviceDiagnosticsProviderStatus {
  if (!status) {
    return "unknown";
  }
  return status;
}
