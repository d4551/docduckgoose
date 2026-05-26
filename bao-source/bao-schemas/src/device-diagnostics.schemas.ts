/**
 * Device diagnostics response schemas.
 *
 * Provides a single source of truth for device diagnostics payloads returned by
 * the API, including bunbuddy provider health and capabilities summaries.
 *
 * @shared/schemas/device-diagnostics.ts
 */

import type { Static, TBoolean, TLiteral, TNumber, TObject, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
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
export const DeviceDiagnosticsHealthSchema: TUnion<
  (TLiteral<"healthy"> | TLiteral<"degraded"> | TLiteral<"unknown">)[]
> = TypeExports.Union([
  TypeExports.Literal("healthy"),
  TypeExports.Literal("degraded"),
  TypeExports.Literal("unknown"),
]);

/**
 * Feature availability flags for diagnostics.
 */
export const DeviceDiagnosticsFeaturesSchema: TObject<
  {
    readonly bunbuddies: TBoolean;
    readonly capture: TBoolean;
    readonly assignments: TBoolean;
  },
  "bunbuddies" | "capture" | "assignments",
  never
> = TypeExports.Object({
  bunbuddies: TypeExports.Boolean(),
  capture: TypeExports.Boolean(),
  assignments: TypeExports.Boolean(),
});

/**
 * Status schema for providers.
 */
export const DeviceDiagnosticsProviderStatusSchema: TUnion<
  [
    TLiteral<"healthy" | "degraded" | "unreachable" | "unknown">,
    ...TLiteral<"healthy" | "degraded" | "unreachable" | "unknown">[],
  ]
> = stringEnum(DEVICE_DIAGNOSTICS_PROVIDER_STATUSES, {});

/**
 * BunBuddy provider diagnostics entry.
 */
export const DeviceDiagnosticsProviderSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    status: DeviceDiagnosticsProviderStatusSchema,
    baseUrl: TypeExports.Optional(TypeExports.String()),
    error: TypeExports.Optional(TypeExports.String()),
    diagnostics: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Record(TypeExports.String(), JsonValueSchema),
        TypeExports.Null(),
      ]),
    ),
    guidance: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    capabilitiesError: TypeExports.Optional(TypeExports.String()),
    diagnosticsError: TypeExports.Optional(TypeExports.String()),
    capabilities: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Record(TypeExports.String(), JsonValueSchema),
        TypeExports.Null(),
      ]),
    ),
    capabilitiesValid: TypeExports.Optional(TypeExports.Boolean()),
    capabilitiesSummary: TypeExports.Optional(BunBuddyCapabilitiesSchema),
  },
  { additionalProperties: true },
);

/**
 * Device counts within diagnostics payloads.
 */
export const DeviceDiagnosticsCountsSchema: TObject<
  { readonly devices: TNumber; readonly connected: TNumber },
  "devices" | "connected",
  never
> = TypeExports.Object({
  devices: TypeExports.Number(),
  connected: TypeExports.Number(),
});

/**
 * Successful diagnostics payload.
 */
export const DeviceDiagnosticsOkSchema = TypeExports.Object({
  ok: TypeExports.Literal(true),
  health: DeviceDiagnosticsHealthSchema,
  features: DeviceDiagnosticsFeaturesSchema,
  providers: TypeExports.Record(TypeExports.String(), DeviceDiagnosticsProviderSchema),
  counts: DeviceDiagnosticsCountsSchema,
  byType: TypeExports.Record(TypeExports.String(), JsonValueSchema),
  byStatus: TypeExports.Record(TypeExports.String(), JsonValueSchema),
  lastRun: TypeExports.String(),
  timestamp: TypeExports.String(),
});

/**
 * Diagnostics fallback details payload (shared via error envelope).
 */
export const DeviceDiagnosticsErrorDetailsSchema = TypeExports.Object({
  dbReady: TypeExports.Literal(false),
  health: DeviceDiagnosticsHealthSchema,
  features: DeviceDiagnosticsFeaturesSchema,
  providers: TypeExports.Record(TypeExports.String(), DeviceDiagnosticsProviderSchema),
  counts: DeviceDiagnosticsCountsSchema,
  byType: TypeExports.Record(TypeExports.String(), JsonValueSchema),
  byStatus: TypeExports.Record(TypeExports.String(), JsonValueSchema),
  lastRun: TypeExports.String(),
  timestamp: TypeExports.String(),
});

/**
 * Error envelope for diagnostics fallback (db unavailable, etc).
 */
export const DeviceDiagnosticsErrorSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(false),
    error: TypeExports.String(),
    message: TypeExports.Optional(TypeExports.String()),
    messageKey: TypeExports.Optional(TypeExports.String()),
    details: TypeExports.Optional(DeviceDiagnosticsErrorDetailsSchema),
    code: TypeExports.String(),
    timestamp: TypeExports.Optional(TypeExports.String()),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
    path: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

/**
 * Diagnostics response schema union.
 */
export const DeviceDiagnosticsResponseSchema = TypeExports.Union([
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
