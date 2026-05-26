/**
 * Device diagnostics response schemas.
 *
 * Provides a single source of truth for device diagnostics payloads returned by
 * the API, including bunbuddy provider health and capabilities summaries.
 *
 * @shared/schemas/device-diagnostics.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BunBuddyCapabilitiesSchema } from "./bunbuddy.schemas.ts";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Supported provider statuses for device diagnostics.
 */
export const DEVICE_DIAGNOSTICS_PROVIDER_STATUSES: readonly [
  "healthy",
  "degraded",
  "unreachable",
  "unknown",
] = ["healthy", "degraded", "unreachable", "unknown"] as const;

/**
 * Provider status literal union.
 */
export type DeviceDiagnosticsProviderStatus = (typeof DEVICE_DIAGNOSTICS_PROVIDER_STATUSES)[number];

/**
 * Health indicator for device diagnostics.
 */
export const DeviceDiagnosticsHealthSchema: Type.TUnion<
  (Type.TLiteral<"healthy"> | Type.TLiteral<"degraded"> | Type.TLiteral<"unknown">)[]
> = Type.Union([Type.Literal("healthy"), Type.Literal("degraded"), Type.Literal("unknown")]);

/**
 * Feature availability flags for diagnostics.
 */
export const DeviceDiagnosticsFeaturesSchema: Type.TObject<
  {
    readonly bunbuddies: Type.TBoolean;
    readonly capture: Type.TBoolean;
    readonly assignments: Type.TBoolean;
  },
  "bunbuddies" | "capture" | "assignments",
  never
> = Type.Object({
  bunbuddies: Type.Boolean(),
  capture: Type.Boolean(),
  assignments: Type.Boolean(),
});

/**
 * Status schema for providers.
 */
export const DeviceDiagnosticsProviderStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"healthy" | "degraded" | "unreachable" | "unknown">,
    ...Type.TLiteral<"healthy" | "degraded" | "unreachable" | "unknown">[],
  ]
> = stringEnum(DEVICE_DIAGNOSTICS_PROVIDER_STATUSES, {});

/**
 * BunBuddy provider diagnostics entry.
 */
export const DeviceDiagnosticsProviderSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    status: DeviceDiagnosticsProviderStatusSchema,
    baseUrl: Type.Optional(Type.String()),
    error: Type.Optional(Type.String()),
    diagnostics: Type.Optional(
      Type.Union([Type.Record(Type.String(), JsonValueSchema), Type.Null()]),
    ),
    guidance: Type.Optional(Type.Array(Type.String())),
    capabilitiesError: Type.Optional(Type.String()),
    diagnosticsError: Type.Optional(Type.String()),
    capabilities: Type.Optional(
      Type.Union([Type.Record(Type.String(), JsonValueSchema), Type.Null()]),
    ),
    capabilitiesValid: Type.Optional(Type.Boolean()),
    capabilitiesSummary: Type.Optional(BunBuddyCapabilitiesSchema),
  },
  { additionalProperties: true },
);

/**
 * Device counts within diagnostics payloads.
 */
export const DeviceDiagnosticsCountsSchema: Type.TObject<
  { readonly devices: Type.TNumber; readonly connected: Type.TNumber },
  "devices" | "connected",
  never
> = Type.Object({
  devices: Type.Number(),
  connected: Type.Number(),
});

/**
 * Successful diagnostics payload.
 */
export const DeviceDiagnosticsOkSchema = Type.Object({
  ok: Type.Literal(true),
  health: DeviceDiagnosticsHealthSchema,
  features: DeviceDiagnosticsFeaturesSchema,
  providers: Type.Record(Type.String(), DeviceDiagnosticsProviderSchema),
  counts: DeviceDiagnosticsCountsSchema,
  byType: Type.Record(Type.String(), JsonValueSchema),
  byStatus: Type.Record(Type.String(), JsonValueSchema),
  lastRun: Type.String(),
  timestamp: Type.String(),
});

/**
 * Diagnostics fallback details payload (shared via error envelope).
 */
export const DeviceDiagnosticsErrorDetailsSchema = Type.Object({
  dbReady: Type.Literal(false),
  health: DeviceDiagnosticsHealthSchema,
  features: DeviceDiagnosticsFeaturesSchema,
  providers: Type.Record(Type.String(), DeviceDiagnosticsProviderSchema),
  counts: DeviceDiagnosticsCountsSchema,
  byType: Type.Record(Type.String(), JsonValueSchema),
  byStatus: Type.Record(Type.String(), JsonValueSchema),
  lastRun: Type.String(),
  timestamp: Type.String(),
});

/**
 * Error envelope for diagnostics fallback (db unavailable, etc).
 */
export const DeviceDiagnosticsErrorSchema = Type.Object(
  {
    ok: Type.Literal(false),
    error: Type.String(),
    message: Type.Optional(Type.String()),
    messageKey: Type.Optional(Type.String()),
    details: Type.Optional(DeviceDiagnosticsErrorDetailsSchema),
    code: Type.String(),
    timestamp: Type.Optional(Type.String()),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
    path: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/**
 * Diagnostics response schema union.
 */
export const DeviceDiagnosticsResponseSchema = Type.Union([
  DeviceDiagnosticsOkSchema,
  DeviceDiagnosticsErrorSchema,
]);

/**
 * TypeScript type for diagnostics feature flags.
 */
export type DeviceDiagnosticsFeatures = Static<typeof DeviceDiagnosticsFeaturesSchema>;

/**
 * TypeScript type for diagnostics providers.
 */
export type DeviceDiagnosticsProvider = Static<typeof DeviceDiagnosticsProviderSchema>;

/**
 * TypeScript type for device counts summary.
 */
export type DeviceDiagnosticsCounts = Static<typeof DeviceDiagnosticsCountsSchema>;

/**
 * TypeScript type for successful diagnostics payloads.
 */
export type DeviceDiagnosticsOkResponse = Static<typeof DeviceDiagnosticsOkSchema>;

/**
 * TypeScript type for error details payloads.
 */
export type DeviceDiagnosticsErrorDetails = Static<typeof DeviceDiagnosticsErrorDetailsSchema>;

/**
 * TypeScript type for diagnostics error envelopes.
 */
export type DeviceDiagnosticsErrorResponse = Static<typeof DeviceDiagnosticsErrorSchema>;

/**
 * TypeScript type for the diagnostics response union.
 */
export type DeviceDiagnosticsResponse = Static<typeof DeviceDiagnosticsResponseSchema>;
