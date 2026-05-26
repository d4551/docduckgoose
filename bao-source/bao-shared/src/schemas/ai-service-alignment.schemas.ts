/**
 * AI service alignment schemas.
 *
 * Defines contract-first schemas for AI service alignment across
 * local AI libs/plugins/bunbuddies, XR/USD, MCP surfaces, and device stacks.
 *
 * @shared/schemas/ai-service-alignment
 */

import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipFocusMapSchema } from "@baohaus/bao-schemas/capability-ownership/focus";
import type { Static, TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { ALIGNMENT_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH } from "../constants/alignment";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas";
import { AnnotationAlignmentIntentSchema } from "./annotation-alignment.schemas";
import { stringEnum } from "./baobox-enum";
import { RpaTrainingCohesionSummarySchema } from "./rpa.schemas";

// AI Service Alignment Surfaces

/**
 * Supported AI service alignment surfaces.
 */
export const AI_SERVICE_ALIGNMENT_SURFACES: readonly [
  "ai",
  "training",
  "annotation",
  "rpa",
  "automation",
  "xr",
  "usd",
  "mcp",
  "device",
  "driver",
  "drone",
  "robotics",
  "ui",
  "pipeline",
] = [
  "ai",
  "training",
  "annotation",
  "rpa",
  "automation",
  "xr",
  "usd",
  "mcp",
  "device",
  "driver",
  "drone",
  "robotics",
  "ui",
  "pipeline",
] as const;

/**
 * Type-safe alignment surface identifiers.
 */
export type AiServiceAlignmentSurface = (typeof AI_SERVICE_ALIGNMENT_SURFACES)[number];

/**
 * Alignment surface schema.
 */
export const AiServiceAlignmentSurfaceSchema: Type.TUnion<
  [
    Type.TLiteral<
      | "ai"
      | "training"
      | "annotation"
      | "rpa"
      | "automation"
      | "xr"
      | "usd"
      | "mcp"
      | "device"
      | "driver"
      | "drone"
      | "robotics"
      | "ui"
      | "pipeline"
    >,
    ...Type.TLiteral<
      | "ai"
      | "training"
      | "annotation"
      | "rpa"
      | "automation"
      | "xr"
      | "usd"
      | "mcp"
      | "device"
      | "driver"
      | "drone"
      | "robotics"
      | "ui"
      | "pipeline"
    >[],
  ]
> = stringEnum(AI_SERVICE_ALIGNMENT_SURFACES, {
  description: "Service alignment surface identifier",
});

// AI Service Alignment Requests

/**
 * Schema for AI service alignment map requests.
 */
export const AiServiceAlignmentMapRequestSchema: Type.TObject<
  {
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly bypassCache: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly bypassCache: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
    bypassCache: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI service alignment map requests.
 */
export type AiServiceAlignmentMapRequest = Static<typeof AiServiceAlignmentMapRequestSchema>;

/**
 * Schema for AI service alignment refresh requests.
 */
export const AiServiceAlignmentRefreshRequestSchema: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({
        minLength: 1,
        maxLength: ALIGNMENT_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH,
        description: "Idempotency key for refresh requests",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI service alignment refresh requests.
 */
export type AiServiceAlignmentRefreshRequest = Static<
  typeof AiServiceAlignmentRefreshRequestSchema
>;

// AI Service Alignment Provider

/**
 * Schema for AI provider capability metadata.
 */
export const AiServiceAlignmentProviderSchema = Type.Object(
  {
    key: AiProviderHealthKeySchema,
    features: Type.Array(Type.String({ minLength: 1 })),
    libraries: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment provider metadata.
 */
export type AiServiceAlignmentProvider = Static<typeof AiServiceAlignmentProviderSchema>;

// AI Service Alignment Coverage

/**
 * Schema for service coverage inventory (libraries, plugins, bunbuddies, devices).
 */
export const AiServiceAlignmentCoverageSchema: Type.TObject<
  {
    readonly libraries: Type.TArray<Type.TString>;
    readonly libraryCategories: Type.TArray<Type.TString>;
    readonly plugins: Type.TArray<Type.TString>;
    readonly bunbuddies: Type.TArray<Type.TString>;
    readonly drivers: Type.TArray<Type.TString>;
    readonly driverPackages: Type.TArray<Type.TString>;
    readonly devices: Type.TArray<Type.TString>;
    readonly deviceSources: Type.TArray<Type.TString>;
    readonly deviceDriverPackages: Type.TArray<Type.TString>;
    readonly mcpDomains: Type.TArray<Type.TString>;
  },
  | "libraries"
  | "libraryCategories"
  | "plugins"
  | "bunbuddies"
  | "drivers"
  | "driverPackages"
  | "devices"
  | "deviceSources"
  | "deviceDriverPackages"
  | "mcpDomains",
  never
> = Type.Object(
  {
    libraries: Type.Array(Type.String({ minLength: 1 })),
    libraryCategories: Type.Array(Type.String({ minLength: 1 })),
    plugins: Type.Array(Type.String({ minLength: 1 })),
    bunbuddies: Type.Array(Type.String({ minLength: 1 })),
    drivers: Type.Array(Type.String({ minLength: 1 })),
    driverPackages: Type.Array(Type.String({ minLength: 1 })),
    devices: Type.Array(Type.String({ minLength: 1 })),
    deviceSources: Type.Array(Type.String({ minLength: 1 })),
    deviceDriverPackages: Type.Array(Type.String({ minLength: 1 })),
    mcpDomains: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI service coverage inventory.
 */
export type AiServiceAlignmentCoverage = Static<typeof AiServiceAlignmentCoverageSchema>;

// AI Service Alignment Service

/**
 * Schema for AI service alignment entries.
 */
export const AiServiceAlignmentServiceSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    description: Type.Optional(Type.String({ minLength: 1 })),
    intent: Type.Optional(AnnotationAlignmentIntentSchema),
    surfaces: Type.Array(AiServiceAlignmentSurfaceSchema, { minItems: 1 }),
    ownershipGroupId: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Capability ownership group identifier associated with this service",
      }),
    ),
    ownershipDomainId: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Capability ownership domain identifier associated with this service",
      }),
    ),
    ownershipSegmentIds: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: "Capability ownership segment identifiers associated with this service",
      }),
    ),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    providers: Type.Array(AiProviderHealthKeySchema),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    coverage: AiServiceAlignmentCoverageSchema,
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI service alignment entries.
 */
export type AiServiceAlignmentService = Static<typeof AiServiceAlignmentServiceSchema>;

// AI Service Alignment Summary

/**
 * Schema for alignment summary counts.
 */
export const AiServiceAlignmentSummarySchema = Type.Object(
  {
    services: Type.Integer({ minimum: 0 }),
    providers: Type.Integer({ minimum: 0 }),
    // NOTE: Use explicit objects instead of `Type.Record(union, ...)` to preserve
    // strong Static<> typing across UI indexing.
    byIntent: Type.Object(
      {
        chat: Type.Integer({ minimum: 0 }),
        embeddings: Type.Integer({ minimum: 0 }),
        images: Type.Integer({ minimum: 0 }),
        models: Type.Integer({ minimum: 0 }),
        training: Type.Integer({ minimum: 0 }),
        download: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    bySurface: Type.Object(
      {
        ai: Type.Integer({ minimum: 0 }),
        training: Type.Integer({ minimum: 0 }),
        annotation: Type.Integer({ minimum: 0 }),
        rpa: Type.Integer({ minimum: 0 }),
        automation: Type.Integer({ minimum: 0 }),
        xr: Type.Integer({ minimum: 0 }),
        usd: Type.Integer({ minimum: 0 }),
        mcp: Type.Integer({ minimum: 0 }),
        device: Type.Integer({ minimum: 0 }),
        driver: Type.Integer({ minimum: 0 }),
        drone: Type.Integer({ minimum: 0 }),
        robotics: Type.Integer({ minimum: 0 }),
        ui: Type.Integer({ minimum: 0 }),
        pipeline: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    bySegment: Type.Optional(
      Type.Record(Type.String({ minLength: 1 }), Type.Integer({ minimum: 0 })),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment summary counts.
 */
export type AiServiceAlignmentSummary = Static<typeof AiServiceAlignmentSummarySchema>;

// AI Service Alignment Errors

/**
 * Schema for alignment error entries.
 */
export const AiServiceAlignmentErrorSchema: Type.TObject<
  {
    readonly scope: Type.TString;
    readonly message: Type.TString;
    readonly code: Type.TOptional<Type.TString>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "scope" | "message",
  Type.InferOptionalKeys<{
    readonly scope: Type.TString;
    readonly message: Type.TString;
    readonly code: Type.TOptional<Type.TString>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  }>
> = Type.Object(
  {
    scope: Type.String({ minLength: 1 }),
    message: Type.String({ minLength: 1 }),
    code: Type.Optional(Type.String({ minLength: 1 })),
    details: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment error entries.
 */
export type AiServiceAlignmentError = Static<typeof AiServiceAlignmentErrorSchema>;

// AI Service Alignment Cohesion

/**
 * Schema for AI/training/RPA cohesion status.
 */
export const AiServiceAlignmentCohesionStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"ready">
    | Type.TLiteral<"degraded">
    | Type.TLiteral<"blocked">
    | Type.TLiteral<"disabled">
  )[]
> = Type.Union(
  [
    Type.Literal("ready"),
    Type.Literal("degraded"),
    Type.Literal("blocked"),
    Type.Literal("disabled"),
  ],
  { description: "AI/training/RPA cohesion status" },
);

/**
 * TypeScript type for AI/training/RPA cohesion status.
 */
export type AiServiceAlignmentCohesionStatus = Static<
  typeof AiServiceAlignmentCohesionStatusSchema
>;

/**
 * Schema for AI/training/RPA cohesion summary.
 */
export const AiServiceAlignmentCohesionSchema: TSchema = Type.Object(
  {
    status: AiServiceAlignmentCohesionStatusSchema,
    timestamp: Type.String({ format: "date-time" }),
    reasonCodes: Type.Array(Type.String({ minLength: 1 })),
    reasonCount: Type.Integer({ minimum: 0 }),
    trainingEnabled: Type.Boolean(),
    rpaTrainingEnabled: Type.Boolean(),
    trainingProvidersEnabled: Type.Integer({ minimum: 0 }),
    trainingBunBuddiesReady: Type.Optional(Type.Integer({ minimum: 0 })),
    rpaTraining: Type.Optional(RpaTrainingCohesionSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI/training/RPA cohesion summary.
 */
export type AiServiceAlignmentCohesion = Static<typeof AiServiceAlignmentCohesionSchema>;

// AI Service Alignment Responses

/**
 * Schema for AI service alignment map responses.
 */
export const AiServiceAlignmentMapResponseSchema: TSchema = Type.Object(
  {
    ok: Type.Literal(true),
    services: Type.Array(AiServiceAlignmentServiceSchema),
    providers: Type.Array(AiServiceAlignmentProviderSchema),
    summary: AiServiceAlignmentSummarySchema,
    ownership: Type.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    cohesion: Type.Optional(AiServiceAlignmentCohesionSchema),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    errors: Type.Optional(Type.Array(AiServiceAlignmentErrorSchema)),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI service alignment map responses.
 */
export type AiServiceAlignmentMapResponse = Static<typeof AiServiceAlignmentMapResponseSchema>;

/**
 * Schema for AI service alignment refresh responses.
 */
export const AiServiceAlignmentRefreshResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly refreshed: Type.TBoolean;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "queued" | "timestamp" | "ok" | "jobId" | "refreshed",
  "correlationId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    refreshed: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI service alignment refresh responses.
 */
export type AiServiceAlignmentRefreshResponse = Static<
  typeof AiServiceAlignmentRefreshResponseSchema
>;
