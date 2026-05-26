/**
 * OpenUSD TypeBox schemas.
 *
 * Defines structured USD integration payloads for API contracts and hydration.
 *
 * @shared/schemas/usd
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

const UsdJsonValueSchema = TypeExports.Unknown({
  description: "JSON value (string, number, boolean, null, array, or object)",
});

const UsdJsonObjectSchema = TypeExports.Object(
  {},
  {
    additionalProperties: UsdJsonValueSchema,
    description: "JSON object with string keys",
  },
);

/**
 * USD asset DTO schema.
 */
export const UsdAssetDtoSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    format: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    fileName: TypeExports.String({ minLength: 1 }),
    mimeType: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storagePath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storageProvider: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storageBucket: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storageKey: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    fileSize: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    checksum: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    metadata: UsdJsonValueSchema,
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
    arCompatible: TypeExports.Optional(TypeExports.Boolean()),
    glbVariantUrl: TypeExports.Optional(TypeExports.String()),
    arQuicklookUrl: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetDto schema. */
export type UsdAssetDto = Static<typeof UsdAssetDtoSchema>;

/**
 * USD asset list response schema.
 */
export const UsdAssetsResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(UsdAssetDtoSchema),
    total: TypeExports.Integer({ minimum: 0 }),
    limit: TypeExports.Integer({ minimum: 1 }),
    offset: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetsResponse schema. */
export type UsdAssetsResponse = Static<typeof UsdAssetsResponseSchema>;

/**
 * USD asset detail response schema.
 */
export const UsdAssetResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: UsdAssetDtoSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetResponse schema. */
export type UsdAssetResponse = Static<typeof UsdAssetResponseSchema>;

/**
 * USD asset AR viewing URLs schema.
 */
export const UsdAssetArViewingUrlsSchema: TObject<
  {
    readonly usdzUrl: TString;
    readonly glbUrl: TOptional<TString>;
    readonly arCompatible: TBoolean;
    readonly platform: TUnion<
      (
        | TLiteral<"ios-quicklook">
        | TLiteral<"android-scene-viewer">
        | TLiteral<"webxr-ar">
        | TLiteral<"unsupported">
      )[]
    >;
  },
  "arCompatible" | "platform" | "usdzUrl",
  "glbUrl"
> = TypeExports.Object(
  {
    usdzUrl: TypeExports.String({ minLength: 1 }),
    glbUrl: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    arCompatible: TypeExports.Boolean(),
    platform: TypeExports.Union([
      TypeExports.Literal("ios-quicklook"),
      TypeExports.Literal("android-scene-viewer"),
      TypeExports.Literal("webxr-ar"),
      TypeExports.Literal("unsupported"),
    ]),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetArViewingUrls schema. */
export type UsdAssetArViewingUrls = Static<typeof UsdAssetArViewingUrlsSchema>;

/**
 * USD asset AR viewing URLs response schema.
 */
export const UsdAssetArViewingUrlsResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: TObject<
      {
        readonly usdzUrl: TString;
        readonly glbUrl: TOptional<TString>;
        readonly arCompatible: TBoolean;
        readonly platform: TUnion<
          (
            | TLiteral<"ios-quicklook">
            | TLiteral<"android-scene-viewer">
            | TLiteral<"webxr-ar">
            | TLiteral<"unsupported">
          )[]
        >;
      },
      "arCompatible" | "platform" | "usdzUrl",
      "glbUrl"
    >;
  },
  "ok" | "data",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: UsdAssetArViewingUrlsSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetArViewingUrlsResponse schema. */
export type UsdAssetArViewingUrlsResponse = Static<typeof UsdAssetArViewingUrlsResponseSchema>;

/**
 * USD asset validation result schema.
 */
export const UsdValidationProfileSchema: TUnion<
  (TLiteral<"arkit"> | TLiteral<"visionos"> | TLiteral<"web">)[]
> = TypeExports.Union(
  [TypeExports.Literal("arkit"), TypeExports.Literal("visionos"), TypeExports.Literal("web")],
  {},
);

/**
 * USD texture validation metrics schema.
 */
export const UsdValidationTextureMetricsSchema: TObject<
  {
    readonly count: TInteger;
    readonly maxDimension: TInteger;
    readonly totalMemoryBytes: TInteger;
    readonly largestTexture: TOptional<
      TObject<
        {
          readonly name: TString;
          readonly width: TInteger;
          readonly height: TInteger;
          readonly memoryBytes: TInteger;
        },
        "name" | "width" | "height" | "memoryBytes",
        never
      >
    >;
  },
  "count" | "maxDimension" | "totalMemoryBytes",
  "largestTexture"
> = TypeExports.Object(
  {
    count: TypeExports.Integer({ minimum: 0 }),
    maxDimension: TypeExports.Integer({ minimum: 0 }),
    totalMemoryBytes: TypeExports.Integer({ minimum: 0 }),
    largestTexture: TypeExports.Optional(
      TypeExports.Object(
        {
          name: TypeExports.String({ minLength: 1 }),
          width: TypeExports.Integer({ minimum: 1 }),
          height: TypeExports.Integer({ minimum: 1 }),
          memoryBytes: TypeExports.Integer({ minimum: 1 }),
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
export const UsdValidationMetricsSchema: TObject<
  {
    readonly textures: TObject<
      {
        readonly count: TInteger;
        readonly maxDimension: TInteger;
        readonly totalMemoryBytes: TInteger;
        readonly largestTexture: TOptional<
          TObject<
            {
              readonly name: TString;
              readonly width: TInteger;
              readonly height: TInteger;
              readonly memoryBytes: TInteger;
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
> = TypeExports.Object(
  {
    textures: UsdValidationTextureMetricsSchema,
  },
  { additionalProperties: false },
);

/**
 * USD asset validation result schema.
 */
export const UsdValidationResultSchema = TypeExports.Object(
  {
    compatible: TypeExports.Boolean(),
    warnings: TypeExports.Array(TypeExports.String()),
    errors: TypeExports.Array(TypeExports.String()),
    profile: TypeExports.Optional(UsdValidationProfileSchema),
    metrics: TypeExports.Optional(UsdValidationMetricsSchema),
    checkedAt: TypeExports.String({ format: "date-time" }),
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
export const UsdValidationResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: UsdValidationResultSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdValidationResponse schema. */
export type UsdValidationResponse = Static<typeof UsdValidationResponseSchema>;

/**
 * USD scan session queue response schema.
 */
export const UsdScanSessionQueueResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    asset: TypeExports.Optional(UsdAssetDtoSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdScanSessionQueueResponse schema. */
export type UsdScanSessionQueueResponse = Static<typeof UsdScanSessionQueueResponseSchema>;

/**
 * USD scan session job status response schema.
 */
export const UsdScanSessionJobStatusResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly job: TObject<
      {
        readonly id: TString;
        readonly state: TString;
        readonly createdOn: TString;
        readonly startedOn: TUnion<(TString | TNull)[]>;
        readonly completedOn: TUnion<(TString | TNull)[]>;
        readonly output: TUnion<(TNull | TRecord<TString, TUnknown>)[]>;
      },
      "id" | "startedOn" | "completedOn" | "output" | "state" | "createdOn",
      never
    >;
  },
  "ok" | "job",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    job: TypeExports.Object(
      {
        id: TypeExports.String({ minLength: 1 }),
        state: TypeExports.String({ minLength: 1 }),
        createdOn: TypeExports.String({ format: "date-time" }),
        startedOn: TypeExports.Union([
          TypeExports.String({ format: "date-time" }),
          TypeExports.Null(),
        ]),
        completedOn: TypeExports.Union([
          TypeExports.String({ format: "date-time" }),
          TypeExports.Null(),
        ]),
        output: TypeExports.Union([
          TypeExports.Record(TypeExports.String(), UsdJsonValueSchema),
          TypeExports.Null(),
        ]),
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
export const UsdAssetListQuerySchema: TObject<
  {
    readonly search: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
    readonly offset: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly search: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
    readonly offset: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    search: TypeExports.Optional(TypeExports.String()),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    offset: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAssetListQuery schema. */
export type UsdAssetListQuery = Static<typeof UsdAssetListQuerySchema>;

/**
 * USD scan session import request schema.
 */
export const UsdScanSessionRequestSchema: TObject<
  {
    readonly sessionId: TString;
    readonly name: TOptional<TString>;
    readonly format: TOptional<TString>;
    readonly metadata: TOptional<TObject<Record<string, never>, never, never>>;
    readonly idempotencyKey: TOptional<TString>;
  },
  "sessionId",
  InferOptionalKeys<{
    readonly sessionId: TString;
    readonly name: TOptional<TString>;
    readonly format: TOptional<TString>;
    readonly metadata: TOptional<TObject<Record<string, never>, never, never>>;
    readonly idempotencyKey: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    sessionId: TypeExports.String({ minLength: 1 }),
    name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    format: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    metadata: TypeExports.Optional(UsdJsonObjectSchema),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdScanSessionRequest schema. */
export type UsdScanSessionRequest = Static<typeof UsdScanSessionRequestSchema>;
