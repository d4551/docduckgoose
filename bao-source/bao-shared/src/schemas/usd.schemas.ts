/**
 * OpenUSD TypeBox schemas.
 *
 * Defines structured USD integration payloads for API contracts and hydration.
 *
 * @shared/schemas/usd
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

const UsdJsonValueSchema = Type.Unknown({
  description: "JSON value (string, number, boolean, null, array, or object)",
});

const UsdJsonObjectSchema = Type.Object(
  {},
  {
    additionalProperties: UsdJsonValueSchema,
    description: "JSON object with string keys",
  },
);

/**
 * USD asset DTO schema.
 */
export const UsdAssetDtoSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    format: Type.Union([Type.String(), Type.Null()]),
    fileName: Type.String({ minLength: 1 }),
    mimeType: Type.Union([Type.String(), Type.Null()]),
    storagePath: Type.Union([Type.String(), Type.Null()]),
    storageProvider: Type.Union([Type.String(), Type.Null()]),
    storageBucket: Type.Union([Type.String(), Type.Null()]),
    storageKey: Type.Union([Type.String(), Type.Null()]),
    fileSize: Type.Union([Type.String(), Type.Null()]),
    checksum: Type.Union([Type.String(), Type.Null()]),
    metadata: UsdJsonValueSchema,
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
    arCompatible: Type.Optional(Type.Boolean()),
    glbVariantUrl: Type.Optional(Type.String()),
    arQuicklookUrl: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetDto schema. */
export type UsdAssetDto = Static<typeof UsdAssetDtoSchema>;

/**
 * USD asset list response schema.
 */
export const UsdAssetsResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(UsdAssetDtoSchema),
    total: Type.Integer({ minimum: 0 }),
    limit: Type.Integer({ minimum: 1 }),
    offset: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetsResponse schema. */
export type UsdAssetsResponse = Static<typeof UsdAssetsResponseSchema>;

/**
 * USD asset detail response schema.
 */
export const UsdAssetResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: UsdAssetDtoSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetResponse schema. */
export type UsdAssetResponse = Static<typeof UsdAssetResponseSchema>;

/**
 * USD asset AR viewing URLs schema.
 */
export const UsdAssetArViewingUrlsSchema: Type.TObject<
  {
    readonly usdzUrl: Type.TString;
    readonly glbUrl: Type.TOptional<Type.TString>;
    readonly arCompatible: Type.TBoolean;
    readonly platform: Type.TUnion<
      (
        | Type.TLiteral<"ios-quicklook">
        | Type.TLiteral<"android-scene-viewer">
        | Type.TLiteral<"webxr-ar">
        | Type.TLiteral<"unsupported">
      )[]
    >;
  },
  "arCompatible" | "platform" | "usdzUrl",
  "glbUrl"
> = Type.Object(
  {
    usdzUrl: Type.String({ minLength: 1 }),
    glbUrl: Type.Optional(Type.String({ minLength: 1 })),
    arCompatible: Type.Boolean(),
    platform: Type.Union([
      Type.Literal("ios-quicklook"),
      Type.Literal("android-scene-viewer"),
      Type.Literal("webxr-ar"),
      Type.Literal("unsupported"),
    ]),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetArViewingUrls schema. */
export type UsdAssetArViewingUrls = Static<typeof UsdAssetArViewingUrlsSchema>;

/**
 * USD asset AR viewing URLs response schema.
 */
export const UsdAssetArViewingUrlsResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<
      {
        readonly usdzUrl: Type.TString;
        readonly glbUrl: Type.TOptional<Type.TString>;
        readonly arCompatible: Type.TBoolean;
        readonly platform: Type.TUnion<
          (
            | Type.TLiteral<"ios-quicklook">
            | Type.TLiteral<"android-scene-viewer">
            | Type.TLiteral<"webxr-ar">
            | Type.TLiteral<"unsupported">
          )[]
        >;
      },
      "arCompatible" | "platform" | "usdzUrl",
      "glbUrl"
    >;
  },
  "ok" | "data",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    data: UsdAssetArViewingUrlsSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetArViewingUrlsResponse schema. */
export type UsdAssetArViewingUrlsResponse = Static<typeof UsdAssetArViewingUrlsResponseSchema>;

/**
 * USD asset validation result schema.
 */
export const UsdValidationProfileSchema: Type.TUnion<
  (Type.TLiteral<"arkit"> | Type.TLiteral<"visionos"> | Type.TLiteral<"web">)[]
> = Type.Union([Type.Literal("arkit"), Type.Literal("visionos"), Type.Literal("web")], {});

/**
 * USD texture validation metrics schema.
 */
export const UsdValidationTextureMetricsSchema: Type.TObject<
  {
    readonly count: Type.TInteger;
    readonly maxDimension: Type.TInteger;
    readonly totalMemoryBytes: Type.TInteger;
    readonly largestTexture: Type.TOptional<
      Type.TObject<
        {
          readonly name: Type.TString;
          readonly width: Type.TInteger;
          readonly height: Type.TInteger;
          readonly memoryBytes: Type.TInteger;
        },
        "name" | "width" | "height" | "memoryBytes",
        never
      >
    >;
  },
  "count" | "maxDimension" | "totalMemoryBytes",
  "largestTexture"
> = Type.Object(
  {
    count: Type.Integer({ minimum: 0 }),
    maxDimension: Type.Integer({ minimum: 0 }),
    totalMemoryBytes: Type.Integer({ minimum: 0 }),
    largestTexture: Type.Optional(
      Type.Object(
        {
          name: Type.String({ minLength: 1 }),
          width: Type.Integer({ minimum: 1 }),
          height: Type.Integer({ minimum: 1 }),
          memoryBytes: Type.Integer({ minimum: 1 }),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/**
 * USD validation metrics schema.
 */
export const UsdValidationMetricsSchema: Type.TObject<
  {
    readonly textures: Type.TObject<
      {
        readonly count: Type.TInteger;
        readonly maxDimension: Type.TInteger;
        readonly totalMemoryBytes: Type.TInteger;
        readonly largestTexture: Type.TOptional<
          Type.TObject<
            {
              readonly name: Type.TString;
              readonly width: Type.TInteger;
              readonly height: Type.TInteger;
              readonly memoryBytes: Type.TInteger;
            },
            "name" | "width" | "height" | "memoryBytes",
            never
          >
        >;
      },
      "count" | "maxDimension" | "totalMemoryBytes",
      "largestTexture"
    >;
  },
  "textures",
  never
> = Type.Object(
  {
    textures: UsdValidationTextureMetricsSchema,
  },
  { additionalProperties: false },
);

/**
 * USD asset validation result schema.
 */
export const UsdValidationResultSchema = Type.Object(
  {
    compatible: Type.Boolean(),
    warnings: Type.Array(Type.String()),
    errors: Type.Array(Type.String()),
    profile: Type.Optional(UsdValidationProfileSchema),
    metrics: Type.Optional(UsdValidationMetricsSchema),
    checkedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdValidationResult schema. */
export type UsdValidationResult = Static<typeof UsdValidationResultSchema>;

/** Inferred type from the UsdValidationProfile schema. */
export type UsdValidationProfile = Static<typeof UsdValidationProfileSchema>;

/** Inferred type from the UsdValidationTextureMetrics schema. */
export type UsdValidationTextureMetrics = Static<typeof UsdValidationTextureMetricsSchema>;

/** Inferred type from the UsdValidationMetrics schema. */
export type UsdValidationMetrics = Static<typeof UsdValidationMetricsSchema>;

/**
 * USD asset validation response schema.
 */
export const UsdValidationResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: UsdValidationResultSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdValidationResponse schema. */
export type UsdValidationResponse = Static<typeof UsdValidationResponseSchema>;

/**
 * USD scan session queue response schema.
 */
export const UsdScanSessionQueueResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    asset: Type.Optional(UsdAssetDtoSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdScanSessionQueueResponse schema. */
export type UsdScanSessionQueueResponse = Static<typeof UsdScanSessionQueueResponseSchema>;

/**
 * USD scan session job status response schema.
 */
export const UsdScanSessionJobStatusResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly job: Type.TObject<
      {
        readonly id: Type.TString;
        readonly state: Type.TString;
        readonly createdOn: Type.TString;
        readonly startedOn: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly completedOn: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly output: Type.TUnion<(Type.TNull | Type.TRecord<Type.TString, Type.TUnknown>)[]>;
      },
      "id" | "startedOn" | "completedOn" | "output" | "state" | "createdOn",
      never
    >;
  },
  "ok" | "job",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    job: Type.Object(
      {
        id: Type.String({ minLength: 1 }),
        state: Type.String({ minLength: 1 }),
        createdOn: Type.String({ format: "date-time" }),
        startedOn: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
        completedOn: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
        output: Type.Union([Type.Record(Type.String(), UsdJsonValueSchema), Type.Null()]),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdScanSessionJobStatusResponse schema. */
export type UsdScanSessionJobStatusResponse = Static<typeof UsdScanSessionJobStatusResponseSchema>;

/**
 * USD asset list query schema.
 */
export const UsdAssetListQuerySchema: Type.TObject<
  {
    readonly search: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly search: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    search: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
    offset: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetListQuery schema. */
export type UsdAssetListQuery = Static<typeof UsdAssetListQuerySchema>;

/**
 * USD scan session import request schema.
 */
export const UsdScanSessionRequestSchema: Type.TObject<
  {
    readonly sessionId: Type.TString;
    readonly name: Type.TOptional<Type.TString>;
    readonly format: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  "sessionId",
  Type.InferOptionalKeys<{
    readonly sessionId: Type.TString;
    readonly name: Type.TOptional<Type.TString>;
    readonly format: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    sessionId: Type.String({ minLength: 1 }),
    name: Type.Optional(Type.String({ minLength: 1 })),
    format: Type.Optional(Type.String({ minLength: 1 })),
    metadata: Type.Optional(UsdJsonObjectSchema),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdScanSessionRequest schema. */
export type UsdScanSessionRequest = Static<typeof UsdScanSessionRequestSchema>;
