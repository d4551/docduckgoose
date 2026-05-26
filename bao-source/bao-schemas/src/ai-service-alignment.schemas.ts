/**
 * AI service alignment schemas.
 *
 * Defines contract-first schemas for AI service alignment across
 * local AI libs/plugins/bunbuddies, XR/USD, MCP surfaces, and device stacks.
 *
 * @shared/schemas/ai-service-alignment
 */

import { ALIGNMENT_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH } from "@baohaus/bao-constants/alignment";
import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TRecord,
  TSchema,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";
import { AnnotationAlignmentIntentSchema } from "./annotation-alignment.schemas.ts";
import { stringEnum } from "./baobox-enum.ts";
import {
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipFocusMapSchema,
} from "./capability-ownership.schemas.ts";
import { RpaTrainingCohesionSummarySchema } from "./rpa.schemas.ts";

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
export const AiServiceAlignmentSurfaceSchema: TUnion<
  [
    TLiteral<
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
    ...TLiteral<
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
export const AiServiceAlignmentMapRequestSchema: TObject<
  {
    readonly refresh: TOptional<TBoolean>;
    readonly bypassCache: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly refresh: TOptional<TBoolean>;
    readonly bypassCache: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(TypeExports.Boolean()),
    bypassCache: TypeExports.Optional(TypeExports.Boolean()),
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
export const AiServiceAlignmentRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
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
export const AiServiceAlignmentProviderSchema = TypeExports.Object(
  {
    key: AiProviderHealthKeySchema,
    features: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    libraries: TypeExports.Array(TypeExports.String({ minLength: 1 })),
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
export const AiServiceAlignmentCoverageSchema: TObject<
  {
    readonly libraries: TArray<TString>;
    readonly libraryCategories: TArray<TString>;
    readonly plugins: TArray<TString>;
    readonly bunbuddies: TArray<TString>;
    readonly drivers: TArray<TString>;
    readonly driverPackages: TArray<TString>;
    readonly devices: TArray<TString>;
    readonly deviceSources: TArray<TString>;
    readonly deviceDriverPackages: TArray<TString>;
    readonly mcpDomains: TArray<TString>;
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
> = TypeExports.Object(
  {
    libraries: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    libraryCategories: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    plugins: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    bunbuddies: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    drivers: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    driverPackages: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    devices: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    deviceSources: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    deviceDriverPackages: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    mcpDomains: TypeExports.Array(TypeExports.String({ minLength: 1 })),
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
export const AiServiceAlignmentServiceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    description: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    intent: TypeExports.Optional(AnnotationAlignmentIntentSchema),
    surfaces: TypeExports.Array(AiServiceAlignmentSurfaceSchema, { minItems: 1 }),
    ownershipGroupId: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Capability ownership group identifier associated with this service",
      }),
    ),
    ownershipDomainId: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Capability ownership domain identifier associated with this service",
      }),
    ),
    ownershipSegmentIds: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Capability ownership segment identifiers associated with this service",
      }),
    ),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    providers: TypeExports.Array(AiProviderHealthKeySchema),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    coverage: AiServiceAlignmentCoverageSchema,
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
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
export const AiServiceAlignmentSummarySchema = TypeExports.Object(
  {
    services: TypeExports.Integer({ minimum: 0 }),
    providers: TypeExports.Integer({ minimum: 0 }),
    // NOTE: Use explicit objects instead of `TypeExports.Record(union, ...)` to preserve
    // strong Static<> typing across UI indexing.
    byIntent: TypeExports.Object(
      {
        chat: TypeExports.Integer({ minimum: 0 }),
        embeddings: TypeExports.Integer({ minimum: 0 }),
        images: TypeExports.Integer({ minimum: 0 }),
        models: TypeExports.Integer({ minimum: 0 }),
        training: TypeExports.Integer({ minimum: 0 }),
        download: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    bySurface: TypeExports.Object(
      {
        ai: TypeExports.Integer({ minimum: 0 }),
        training: TypeExports.Integer({ minimum: 0 }),
        annotation: TypeExports.Integer({ minimum: 0 }),
        rpa: TypeExports.Integer({ minimum: 0 }),
        automation: TypeExports.Integer({ minimum: 0 }),
        xr: TypeExports.Integer({ minimum: 0 }),
        usd: TypeExports.Integer({ minimum: 0 }),
        mcp: TypeExports.Integer({ minimum: 0 }),
        device: TypeExports.Integer({ minimum: 0 }),
        driver: TypeExports.Integer({ minimum: 0 }),
        drone: TypeExports.Integer({ minimum: 0 }),
        robotics: TypeExports.Integer({ minimum: 0 }),
        ui: TypeExports.Integer({ minimum: 0 }),
        pipeline: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    bySegment: TypeExports.Optional(
      TypeExports.Record(TypeExports.String({ minLength: 1 }), TypeExports.Integer({ minimum: 0 })),
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
export const AiServiceAlignmentErrorSchema: TObject<
  {
    readonly scope: TString;
    readonly message: TString;
    readonly code: TOptional<TString>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  },
  "scope" | "message",
  InferOptionalKeys<{
    readonly scope: TString;
    readonly message: TString;
    readonly code: TOptional<TString>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  }>
> = TypeExports.Object(
  {
    scope: TypeExports.String({ minLength: 1 }),
    message: TypeExports.String({ minLength: 1 }),
    code: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    details: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
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
export const AiServiceAlignmentCohesionStatusSchema: TUnion<
  (TLiteral<"ready"> | TLiteral<"degraded"> | TLiteral<"blocked"> | TLiteral<"disabled">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("ready"),
    TypeExports.Literal("degraded"),
    TypeExports.Literal("blocked"),
    TypeExports.Literal("disabled"),
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
export const AiServiceAlignmentCohesionSchema: TSchema = TypeExports.Object(
  {
    status: AiServiceAlignmentCohesionStatusSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    reasonCodes: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    reasonCount: TypeExports.Integer({ minimum: 0 }),
    trainingEnabled: TypeExports.Boolean(),
    rpaTrainingEnabled: TypeExports.Boolean(),
    trainingProvidersEnabled: TypeExports.Integer({ minimum: 0 }),
    trainingBunBuddiesReady: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    rpaTraining: TypeExports.Optional(RpaTrainingCohesionSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI/training/RPA cohesion summary.
 */
export interface AiServiceAlignmentCohesion {
  status: AiServiceAlignmentCohesionStatus;
  timestamp: string;
  reasonCodes: string[];
  reasonCount: number;
  trainingEnabled: boolean;
  rpaTrainingEnabled: boolean;
  trainingProvidersEnabled: number;
  trainingBunBuddiesReady?: number;
  rpaTraining?: Static<typeof RpaTrainingCohesionSummarySchema>;
}

// AI Service Alignment Responses

/**
 * Schema for AI service alignment map responses.
 */
export const AiServiceAlignmentMapResponseSchema: TSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    services: TypeExports.Array(AiServiceAlignmentServiceSchema),
    providers: TypeExports.Array(AiServiceAlignmentProviderSchema),
    summary: AiServiceAlignmentSummarySchema,
    ownership: TypeExports.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    cohesion: TypeExports.Optional(AiServiceAlignmentCohesionSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(AiServiceAlignmentErrorSchema)),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI service alignment map responses.
 */
export interface AiServiceAlignmentMapResponse {
  ok: true;
  services: AiServiceAlignmentService[];
  providers: AiServiceAlignmentProvider[];
  summary: AiServiceAlignmentSummary;
  ownership?: Static<typeof CapabilityOwnershipFocusMapSchema>;
  ownershipErrors?: Static<typeof CapabilityOwnershipErrorSchema>[];
  ownershipTimestamp?: string;
  cohesion?: AiServiceAlignmentCohesion;
  timestamp: string;
  correlationId?: string;
  errors?: AiServiceAlignmentError[];
  metadata?: Record<string, unknown>;
}

/**
 * Schema for AI service alignment refresh responses.
 */
export const AiServiceAlignmentRefreshResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly queued: TBoolean;
    readonly jobId: TUnion<(TString | TNull)[]>;
    readonly refreshed: TBoolean;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
  },
  "queued" | "timestamp" | "ok" | "jobId" | "refreshed",
  "correlationId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    refreshed: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for AI service alignment refresh responses.
 */
export type AiServiceAlignmentRefreshResponse = Static<
  typeof AiServiceAlignmentRefreshResponseSchema
>;
