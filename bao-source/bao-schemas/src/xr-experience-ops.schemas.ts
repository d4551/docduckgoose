/**
 * XR experience operational schemas (publish/revisions/assets/share).
 *
 * Defines TypeBox schemas for XR experience operations that sit alongside the core
 * CRUD schemas in {@link ./xr-experience.schemas.ts}. These endpoints are consumed
 * by server-rendered HTML pages and should remain end-to-end type-safe via Elysia + Eden.
 *
 * @shared/schemas/xr-experience-ops
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TIntersect,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TSchema,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";
import { UsdAssetDtoSchema } from "./usd.schemas.ts";
import { XrExperienceSchema } from "./xr-experience.schemas.ts";

/**
 * Workflow response returned by XR publish/unpublish/archive endpoints.
 */
export const XrExperienceWorkflowResponseDataSchema = TypeExports.Object(
  { experience: XrExperienceSchema },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceWorkflowResponseData schema. */
export type XrExperienceWorkflowResponseData = Static<
  typeof XrExperienceWorkflowResponseDataSchema
>;

/**
 * Workflow response returned by XR publish/unpublish/archive endpoints.
 */
export const XrExperienceWorkflowResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceWorkflowResponseDataSchema,
  {
    description: "XR experience workflow response envelope.",
  },
);

/** Inferred type from the XrExperienceWorkflowResponse schema. */
export type XrExperienceWorkflowResponse = Static<typeof XrExperienceWorkflowResponseSchema>;

/**
 * XR experience revision summary entry returned by history endpoints.
 */
export const XrExperienceRevisionSummarySchema: TObject<
  {
    readonly id: TString;
    readonly version: TInteger;
    readonly name: TString;
    readonly description: TUnion<(TString | TNull)[]>;
    readonly configType: TString;
    readonly schemaVersion: TInteger;
    readonly changeNote: TUnion<(TString | TNull)[]>;
    readonly changedBy: TUnion<(TString | TNull)[]>;
    readonly createdAt: TString;
  },
  | "name"
  | "id"
  | "description"
  | "configType"
  | "schemaVersion"
  | "createdAt"
  | "version"
  | "changeNote"
  | "changedBy",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    version: TypeExports.Integer({ minimum: 0 }),
    name: TypeExports.String({ minLength: 1 }),
    description: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    configType: TypeExports.String({ minLength: 1 }),
    schemaVersion: TypeExports.Integer({ minimum: 0 }),
    changeNote: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    changedBy: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceRevisionSummary schema. */
export type XrExperienceRevisionSummary = Static<typeof XrExperienceRevisionSummarySchema>;

/**
 * XR experience revision detail entry (includes config).
 */
export const XrExperienceRevisionDetailSchema: TIntersect<
  (
    | TObject<
        {
          readonly id: TString;
          readonly version: TInteger;
          readonly name: TString;
          readonly description: TUnion<(TString | TNull)[]>;
          readonly configType: TString;
          readonly schemaVersion: TInteger;
          readonly changeNote: TUnion<(TString | TNull)[]>;
          readonly changedBy: TUnion<(TString | TNull)[]>;
          readonly createdAt: TString;
        },
        | "name"
        | "id"
        | "description"
        | "configType"
        | "schemaVersion"
        | "createdAt"
        | "version"
        | "changeNote"
        | "changedBy",
        never
      >
    | TObject<{ readonly config: TUnion<(TUnknown | TNull)[]> }, "config", never>
  )[]
> = TypeExports.Intersect(
  [
    XrExperienceRevisionSummarySchema,
    TypeExports.Object({
      config: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
    }),
  ],
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceRevisionDetail schema. */
export type XrExperienceRevisionDetail = Static<typeof XrExperienceRevisionDetailSchema>;

/**
 * Revision history response for an experience.
 */
export const XrExperienceRevisionListResponseDataSchema: TObject<
  {
    readonly revisions: TArray<
      TObject<
        {
          readonly id: TString;
          readonly version: TInteger;
          readonly name: TString;
          readonly description: TUnion<(TString | TNull)[]>;
          readonly configType: TString;
          readonly schemaVersion: TInteger;
          readonly changeNote: TUnion<(TString | TNull)[]>;
          readonly changedBy: TUnion<(TString | TNull)[]>;
          readonly createdAt: TString;
        },
        | "name"
        | "id"
        | "description"
        | "configType"
        | "schemaVersion"
        | "createdAt"
        | "version"
        | "changeNote"
        | "changedBy",
        never
      >
    >;
    readonly total: TInteger;
    readonly limit: TInteger;
    readonly offset: TInteger;
    readonly hasMore: TBoolean;
  },
  "revisions" | "total" | "limit" | "offset" | "hasMore",
  never
> = TypeExports.Object(
  {
    revisions: TypeExports.Array(XrExperienceRevisionSummarySchema),
    total: TypeExports.Integer({ minimum: 0 }),
    limit: TypeExports.Integer({ minimum: 1 }),
    offset: TypeExports.Integer({ minimum: 0 }),
    hasMore: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceRevisionListResponseData schema. */
export type XrExperienceRevisionListResponseData = Static<
  typeof XrExperienceRevisionListResponseDataSchema
>;

/**
 * Revision history response for an experience.
 */
export const XrExperienceRevisionListResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceRevisionListResponseDataSchema,
  {
    description: "XR experience revision list response envelope.",
  },
);

/** Inferred type from the XrExperienceRevisionListResponse schema. */
export type XrExperienceRevisionListResponse = Static<
  typeof XrExperienceRevisionListResponseSchema
>;

/**
 * Single revision response.
 */
export const XrExperienceRevisionResponseDataSchema: TObject<
  {
    readonly revision: TIntersect<
      (
        | TObject<
            {
              readonly id: TString;
              readonly version: TInteger;
              readonly name: TString;
              readonly description: TUnion<(TString | TNull)[]>;
              readonly configType: TString;
              readonly schemaVersion: TInteger;
              readonly changeNote: TUnion<(TString | TNull)[]>;
              readonly changedBy: TUnion<(TString | TNull)[]>;
              readonly createdAt: TString;
            },
            | "description"
            | "name"
            | "id"
            | "configType"
            | "schemaVersion"
            | "createdAt"
            | "version"
            | "changeNote"
            | "changedBy",
            never
          >
        | TObject<{ readonly config: TUnion<(TUnknown | TNull)[]> }, "config", never>
      )[]
    >;
  },
  "revision",
  never
> = TypeExports.Object(
  { revision: XrExperienceRevisionDetailSchema },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceRevisionResponseData schema. */
export type XrExperienceRevisionResponseData = Static<
  typeof XrExperienceRevisionResponseDataSchema
>;

/**
 * Single revision response.
 */
export const XrExperienceRevisionResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceRevisionResponseDataSchema,
  {
    description: "XR experience revision response envelope.",
  },
);

/** Inferred type from the XrExperienceRevisionResponse schema. */
export type XrExperienceRevisionResponse = Static<typeof XrExperienceRevisionResponseSchema>;

/**
 * Restore revision response.
 */
export const XrExperienceRestoreRevisionResponseDataSchema = TypeExports.Object(
  {
    experience: XrExperienceSchema,
    restoredFromVersion: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceRestoreRevisionResponseData schema. */
export type XrExperienceRestoreRevisionResponseData = Static<
  typeof XrExperienceRestoreRevisionResponseDataSchema
>;

/**
 * Restore revision response.
 */
export const XrExperienceRestoreRevisionResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceRestoreRevisionResponseDataSchema,
  {
    description: "XR experience restore revision response envelope.",
  },
);

/** Inferred type from the XrExperienceRestoreRevisionResponse schema. */
export type XrExperienceRestoreRevisionResponse = Static<
  typeof XrExperienceRestoreRevisionResponseSchema
>;

/**
 * Revision comparison diff payload.
 */
export const XrExperienceRevisionDiffSchema: TObject<
  {
    readonly versionA: TInteger;
    readonly versionB: TInteger;
    readonly changes: TArray<
      TObject<
        {
          readonly field: TString;
          readonly oldValue: TUnknown;
          readonly newValue: TUnknown;
        },
        "field" | "oldValue" | "newValue",
        never
      >
    >;
  },
  "changes" | "versionA" | "versionB",
  never
> = TypeExports.Object(
  {
    versionA: TypeExports.Integer({ minimum: 0 }),
    versionB: TypeExports.Integer({ minimum: 0 }),
    changes: TypeExports.Array(
      TypeExports.Object(
        {
          field: TypeExports.String({ minLength: 1 }),
          oldValue: JsonValueSchema,
          newValue: JsonValueSchema,
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceRevisionDiff schema. */
export type XrExperienceRevisionDiff = Static<typeof XrExperienceRevisionDiffSchema>;

/**
 * Revision comparison response.
 */
export const XrExperienceRevisionCompareResponseDataSchema: TObject<
  {
    readonly diff: TObject<
      {
        readonly versionA: TInteger;
        readonly versionB: TInteger;
        readonly changes: TArray<
          TObject<
            {
              readonly field: TString;
              readonly oldValue: TUnknown;
              readonly newValue: TUnknown;
            },
            "field" | "oldValue" | "newValue",
            never
          >
        >;
      },
      "changes" | "versionA" | "versionB",
      never
    >;
  },
  "diff",
  never
> = TypeExports.Object({ diff: XrExperienceRevisionDiffSchema }, { additionalProperties: false });

/** Inferred type from the XrExperienceRevisionCompareResponseData schema. */
export type XrExperienceRevisionCompareResponseData = Static<
  typeof XrExperienceRevisionCompareResponseDataSchema
>;

/**
 * Revision comparison response.
 */
export const XrExperienceRevisionCompareResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceRevisionCompareResponseDataSchema,
  {
    description: "XR experience revision compare response envelope.",
  },
);

/** Inferred type from the XrExperienceRevisionCompareResponse schema. */
export type XrExperienceRevisionCompareResponse = Static<
  typeof XrExperienceRevisionCompareResponseSchema
>;

/**
 * USD asset metadata nested within XR experience asset links.
 */
export const XrExperienceAssetUsdSchema: TObject<
  {
    readonly id: TString;
    readonly name: TString;
    readonly format: TUnion<(TString | TNull)[]>;
    readonly fileName: TString;
    readonly mimeType: TUnion<(TString | TNull)[]>;
    readonly storagePath: TUnion<(TString | TNull)[]>;
    readonly fileSize: TUnion<(TNumber | TNull)[]>;
    readonly checksum: TUnion<(TString | TNull)[]>;
  },
  "format" | "mimeType" | "storagePath" | "fileSize" | "checksum" | "id" | "name" | "fileName",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    format: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    fileName: TypeExports.String({ minLength: 1 }),
    mimeType: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storagePath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    fileSize: TypeExports.Union([TypeExports.Number(), TypeExports.Null()]),
    checksum: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * XR experience asset DTO returned by list endpoints (includes nested USD metadata).
 */
export const XrExperienceAssetDtoSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    experienceId: TypeExports.String({ minLength: 1 }),
    usdAssetId: TypeExports.String({ minLength: 1 }),
    role: TypeExports.String({ minLength: 1 }),
    displayOrder: TypeExports.Integer({ minimum: 0 }),
    transform: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
    metadata: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
    asset: XrExperienceAssetUsdSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceAssetDto schema. */
export type XrExperienceAssetDto = Static<typeof XrExperienceAssetDtoSchema>;

/**
 * Response for listing assets linked to an XR experience.
 */
export const XrExperienceAssetsListResponseDataSchema = TypeExports.Object(
  { assets: TypeExports.Array(XrExperienceAssetDtoSchema) },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceAssetsListResponseData schema. */
export type XrExperienceAssetsListResponseData = Static<
  typeof XrExperienceAssetsListResponseDataSchema
>;

/**
 * Response for listing assets linked to an XR experience.
 */
export const XrExperienceAssetsListResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceAssetsListResponseDataSchema,
  {
    description: "XR experience assets list response envelope.",
  },
);

/** Inferred type from the XrExperienceAssetsListResponse schema. */
export type XrExperienceAssetsListResponse = Static<typeof XrExperienceAssetsListResponseSchema>;

/**
 * XR experience asset link record returned by mutation endpoints.
 */
export const XrExperienceAssetLinkSchema: TObject<
  {
    readonly id: TString;
    readonly experienceId: TString;
    readonly usdAssetId: TString;
    readonly role: TString;
    readonly displayOrder: TInteger;
    readonly transform: TUnion<(TUnknown | TNull)[]>;
    readonly metadata: TUnion<(TUnknown | TNull)[]>;
    readonly createdAt: TString;
    readonly updatedAt: TString;
  },
  | "transform"
  | "metadata"
  | "id"
  | "experienceId"
  | "usdAssetId"
  | "role"
  | "displayOrder"
  | "createdAt"
  | "updatedAt",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    experienceId: TypeExports.String({ minLength: 1 }),
    usdAssetId: TypeExports.String({ minLength: 1 }),
    role: TypeExports.String({ minLength: 1 }),
    displayOrder: TypeExports.Integer({ minimum: 0 }),
    transform: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
    metadata: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceAssetLink schema. */
export type XrExperienceAssetLink = Static<typeof XrExperienceAssetLinkSchema>;

/**
 * Response for linking/updating an asset link.
 */
export const XrExperienceAssetLinkResponseDataSchema: TObject<
  {
    readonly asset: TObject<
      {
        readonly id: TString;
        readonly experienceId: TString;
        readonly usdAssetId: TString;
        readonly role: TString;
        readonly displayOrder: TInteger;
        readonly transform: TUnion<(TUnknown | TNull)[]>;
        readonly metadata: TUnion<(TUnknown | TNull)[]>;
        readonly createdAt: TString;
        readonly updatedAt: TString;
      },
      | "transform"
      | "metadata"
      | "id"
      | "experienceId"
      | "usdAssetId"
      | "role"
      | "displayOrder"
      | "createdAt"
      | "updatedAt",
      never
    >;
  },
  "asset",
  never
> = TypeExports.Object({ asset: XrExperienceAssetLinkSchema }, { additionalProperties: false });

/** Inferred type from the XrExperienceAssetLinkResponseData schema. */
export type XrExperienceAssetLinkResponseData = Static<
  typeof XrExperienceAssetLinkResponseDataSchema
>;

/**
 * Response for linking/updating an asset link.
 */
export const XrExperienceAssetLinkResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceAssetLinkResponseDataSchema,
  {
    description: "XR experience asset link response envelope.",
  },
);

/** Inferred type from the XrExperienceAssetLinkResponse schema. */
export type XrExperienceAssetLinkResponse = Static<typeof XrExperienceAssetLinkResponseSchema>;

/**
 * Response for unlinking/removing an asset link.
 */
export const XrExperienceAssetUnlinkResponseDataSchema: TObject<
  { readonly assetId: TString; readonly unlinked: TLiteral<true> },
  "unlinked" | "assetId",
  never
> = TypeExports.Object(
  {
    assetId: TypeExports.String({ minLength: 1 }),
    unlinked: TypeExports.Literal(true),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceAssetUnlinkResponseData schema. */
export type XrExperienceAssetUnlinkResponseData = Static<
  typeof XrExperienceAssetUnlinkResponseDataSchema
>;

/**
 * Response for unlinking/removing an asset link.
 */
export const XrExperienceAssetUnlinkResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceAssetUnlinkResponseDataSchema,
  {
    description: "XR experience asset unlink response envelope.",
  },
);

/** Inferred type from the XrExperienceAssetUnlinkResponse schema. */
export type XrExperienceAssetUnlinkResponse = Static<typeof XrExperienceAssetUnlinkResponseSchema>;

/**
 * Response for importing a USD asset from a scan session and linking it to an experience.
 */
export const XrExperienceAssetFromScanResponseDataSchema = TypeExports.Object(
  {
    usdAsset: UsdAssetDtoSchema,
    link: XrExperienceAssetLinkSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceAssetFromScanResponseData schema. */
export type XrExperienceAssetFromScanResponseData = Static<
  typeof XrExperienceAssetFromScanResponseDataSchema
>;

/**
 * Response for importing a USD asset from a scan session and linking it to an experience.
 */
export const XrExperienceAssetFromScanResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceAssetFromScanResponseDataSchema,
  {
    description: "XR experience asset-from-scan response envelope.",
  },
);

/** Inferred type from the XrExperienceAssetFromScanResponse schema. */
export type XrExperienceAssetFromScanResponse = Static<
  typeof XrExperienceAssetFromScanResponseSchema
>;

/**
 * Share link payload returned when generating a link.
 */
export const XrExperienceShareLinkSchema: TObject<
  {
    readonly token: TString;
    readonly shareUrl: TString;
    readonly expiresAt: TUnion<(TString | TNull)[]>;
  },
  "expiresAt" | "token" | "shareUrl",
  never
> = TypeExports.Object(
  {
    token: TypeExports.String({ minLength: 1 }),
    shareUrl: TypeExports.String({ minLength: 1 }),
    expiresAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceShareLink schema. */
export type XrExperienceShareLink = Static<typeof XrExperienceShareLinkSchema>;

/**
 * Build a share response payload wrapper.
 *
 * @param shareSchema - Canonical share payload schema.
 * @returns Response data schema with a single `share` field.
 */
function createXrExperienceShareResponseDataSchema<TShareSchema extends TSchema>(
  shareSchema: TShareSchema,
) {
  return TypeExports.Object({ share: shareSchema }, { additionalProperties: false });
}

/**
 * Response returned when generating a share link.
 */
export const XrExperienceGenerateShareLinkResponseDataSchema =
  createXrExperienceShareResponseDataSchema(XrExperienceShareLinkSchema);

/** Inferred type from the XrExperienceGenerateShareLinkResponseData schema. */
export type XrExperienceGenerateShareLinkResponseData = Static<
  typeof XrExperienceGenerateShareLinkResponseDataSchema
>;

/**
 * Response returned when generating a share link.
 */
export const XrExperienceGenerateShareLinkResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceGenerateShareLinkResponseDataSchema,
  {
    description: "XR experience generate-share-link response envelope.",
  },
);

/** Inferred type from the XrExperienceGenerateShareLinkResponse schema. */
export type XrExperienceGenerateShareLinkResponse = Static<
  typeof XrExperienceGenerateShareLinkResponseSchema
>;

/**
 * Share link info payload returned by GET share endpoint.
 */
export const XrExperienceShareLinkInfoSchema: TObject<
  {
    readonly hasShareLink: TBoolean;
    readonly shareUrl: TOptional<TString>;
    readonly expiresAt: TOptional<TUnion<(TString | TNull)[]>>;
    readonly isExpired: TOptional<TBoolean>;
  },
  "hasShareLink",
  InferOptionalKeys<{
    readonly hasShareLink: TBoolean;
    readonly shareUrl: TOptional<TString>;
    readonly expiresAt: TOptional<TUnion<(TString | TNull)[]>>;
    readonly isExpired: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    hasShareLink: TypeExports.Boolean(),
    shareUrl: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    expiresAt: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    ),
    isExpired: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceShareLinkInfo schema. */
export type XrExperienceShareLinkInfo = Static<typeof XrExperienceShareLinkInfoSchema>;

/**
 * Response returned for share link info.
 */
export const XrExperienceShareLinkInfoResponseDataSchema =
  createXrExperienceShareResponseDataSchema(XrExperienceShareLinkInfoSchema);

/** Inferred type from the XrExperienceShareLinkInfoResponseData schema. */
export type XrExperienceShareLinkInfoResponseData = Static<
  typeof XrExperienceShareLinkInfoResponseDataSchema
>;

/**
 * Response returned for share link info.
 */
export const XrExperienceShareLinkInfoResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceShareLinkInfoResponseDataSchema,
  {
    description: "XR experience share-link-info response envelope.",
  },
);

/** Inferred type from the XrExperienceShareLinkInfoResponse schema. */
export type XrExperienceShareLinkInfoResponse = Static<
  typeof XrExperienceShareLinkInfoResponseSchema
>;

/**
 * Response returned when revoking a share link.
 */
export const XrExperienceRevokeShareLinkResponseDataSchema: TObject<
  { readonly revoked: TLiteral<true> },
  "revoked",
  never
> = TypeExports.Object({ revoked: TypeExports.Literal(true) }, { additionalProperties: false });

/** Inferred type from the XrExperienceRevokeShareLinkResponseData schema. */
export type XrExperienceRevokeShareLinkResponseData = Static<
  typeof XrExperienceRevokeShareLinkResponseDataSchema
>;

/**
 * Response returned when revoking a share link.
 */
export const XrExperienceRevokeShareLinkResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceRevokeShareLinkResponseDataSchema,
  {
    description: "XR experience revoke-share-link response envelope.",
  },
);

/** Inferred type from the XrExperienceRevokeShareLinkResponse schema. */
export type XrExperienceRevokeShareLinkResponse = Static<
  typeof XrExperienceRevokeShareLinkResponseSchema
>;
