/**
 * XR experience operational schemas (publish/revisions/assets/share).
 *
 * Defines TypeBox schemas for XR experience operations that sit alongside the core
 * CRUD schemas in {@link ./xr-experience.schemas.ts}. These endpoints are consumed
 * by server-rendered HTML pages and should remain end-to-end type-safe via Elysia + Eden.
 *
 * @shared/schemas/xr-experience-ops
 */

import type { Static, TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";
import { UsdAssetDtoSchema } from "./usd.schemas.ts";
import { XrExperienceSchema } from "./xr-experience.schemas.ts";

/**
 * Workflow response returned by XR publish/unpublish/archive endpoints.
 */
export const XrExperienceWorkflowResponseDataSchema = Type.Object(
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
export const XrExperienceRevisionSummarySchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly version: Type.TInteger;
    readonly name: Type.TString;
    readonly description: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly configType: Type.TString;
    readonly schemaVersion: Type.TInteger;
    readonly changeNote: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly changedBy: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly createdAt: Type.TString;
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
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    version: Type.Integer({ minimum: 0 }),
    name: Type.String({ minLength: 1 }),
    description: Type.Union([Type.String(), Type.Null()]),
    configType: Type.String({ minLength: 1 }),
    schemaVersion: Type.Integer({ minimum: 0 }),
    changeNote: Type.Union([Type.String(), Type.Null()]),
    changedBy: Type.Union([Type.String(), Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceRevisionSummary schema. */
export type XrExperienceRevisionSummary = Static<typeof XrExperienceRevisionSummarySchema>;

/**
 * XR experience revision detail entry (includes config).
 */
export const XrExperienceRevisionDetailSchema: Type.TIntersect<
  (
    | Type.TObject<
        {
          readonly id: Type.TString;
          readonly version: Type.TInteger;
          readonly name: Type.TString;
          readonly description: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly configType: Type.TString;
          readonly schemaVersion: Type.TInteger;
          readonly changeNote: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly changedBy: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly createdAt: Type.TString;
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
    | Type.TObject<
        { readonly config: Type.TUnion<(Type.TUnknown | Type.TNull)[]> },
        "config",
        never
      >
  )[]
> = Type.Intersect(
  [
    XrExperienceRevisionSummarySchema,
    Type.Object({
      config: Type.Union([JsonValueSchema, Type.Null()]),
    }),
  ],
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceRevisionDetail schema. */
export type XrExperienceRevisionDetail = Static<typeof XrExperienceRevisionDetailSchema>;

/**
 * Revision history response for an experience.
 */
export const XrExperienceRevisionListResponseDataSchema: Type.TObject<
  {
    readonly revisions: Type.TArray<
      Type.TObject<
        {
          readonly id: Type.TString;
          readonly version: Type.TInteger;
          readonly name: Type.TString;
          readonly description: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly configType: Type.TString;
          readonly schemaVersion: Type.TInteger;
          readonly changeNote: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly changedBy: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly createdAt: Type.TString;
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
    readonly total: Type.TInteger;
    readonly limit: Type.TInteger;
    readonly offset: Type.TInteger;
    readonly hasMore: Type.TBoolean;
  },
  "revisions" | "total" | "limit" | "offset" | "hasMore",
  never
> = Type.Object(
  {
    revisions: Type.Array(XrExperienceRevisionSummarySchema),
    total: Type.Integer({ minimum: 0 }),
    limit: Type.Integer({ minimum: 1 }),
    offset: Type.Integer({ minimum: 0 }),
    hasMore: Type.Boolean(),
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
export const XrExperienceRevisionResponseDataSchema: Type.TObject<
  {
    readonly revision: Type.TIntersect<
      (
        | Type.TObject<
            {
              readonly id: Type.TString;
              readonly version: Type.TInteger;
              readonly name: Type.TString;
              readonly description: Type.TUnion<(Type.TString | Type.TNull)[]>;
              readonly configType: Type.TString;
              readonly schemaVersion: Type.TInteger;
              readonly changeNote: Type.TUnion<(Type.TString | Type.TNull)[]>;
              readonly changedBy: Type.TUnion<(Type.TString | Type.TNull)[]>;
              readonly createdAt: Type.TString;
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
        | Type.TObject<
            { readonly config: Type.TUnion<(Type.TUnknown | Type.TNull)[]> },
            "config",
            never
          >
      )[]
    >;
  },
  "revision",
  never
> = Type.Object({ revision: XrExperienceRevisionDetailSchema }, { additionalProperties: false });

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
export const XrExperienceRestoreRevisionResponseDataSchema = Type.Object(
  {
    experience: XrExperienceSchema,
    restoredFromVersion: Type.Integer({ minimum: 0 }),
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
export const XrExperienceRevisionDiffSchema: Type.TObject<
  {
    readonly versionA: Type.TInteger;
    readonly versionB: Type.TInteger;
    readonly changes: Type.TArray<
      Type.TObject<
        {
          readonly field: Type.TString;
          readonly oldValue: Type.TUnknown;
          readonly newValue: Type.TUnknown;
        },
        "field" | "oldValue" | "newValue",
        never
      >
    >;
  },
  "changes" | "versionA" | "versionB",
  never
> = Type.Object(
  {
    versionA: Type.Integer({ minimum: 0 }),
    versionB: Type.Integer({ minimum: 0 }),
    changes: Type.Array(
      Type.Object(
        {
          field: Type.String({ minLength: 1 }),
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
export const XrExperienceRevisionCompareResponseDataSchema: Type.TObject<
  {
    readonly diff: Type.TObject<
      {
        readonly versionA: Type.TInteger;
        readonly versionB: Type.TInteger;
        readonly changes: Type.TArray<
          Type.TObject<
            {
              readonly field: Type.TString;
              readonly oldValue: Type.TUnknown;
              readonly newValue: Type.TUnknown;
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
> = Type.Object({ diff: XrExperienceRevisionDiffSchema }, { additionalProperties: false });

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
export const XrExperienceAssetUsdSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly name: Type.TString;
    readonly format: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly fileName: Type.TString;
    readonly mimeType: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly storagePath: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly fileSize: Type.TUnion<(Type.TNumber | Type.TNull)[]>;
    readonly checksum: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "format" | "mimeType" | "storagePath" | "fileSize" | "checksum" | "id" | "name" | "fileName",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    format: Type.Union([Type.String(), Type.Null()]),
    fileName: Type.String({ minLength: 1 }),
    mimeType: Type.Union([Type.String(), Type.Null()]),
    storagePath: Type.Union([Type.String(), Type.Null()]),
    fileSize: Type.Union([Type.Number(), Type.Null()]),
    checksum: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * XR experience asset DTO returned by list endpoints (includes nested USD metadata).
 */
export const XrExperienceAssetDtoSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    experienceId: Type.String({ minLength: 1 }),
    usdAssetId: Type.String({ minLength: 1 }),
    role: Type.String({ minLength: 1 }),
    displayOrder: Type.Integer({ minimum: 0 }),
    transform: Type.Union([JsonValueSchema, Type.Null()]),
    metadata: Type.Union([JsonValueSchema, Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
    asset: XrExperienceAssetUsdSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceAssetDto schema. */
export type XrExperienceAssetDto = Static<typeof XrExperienceAssetDtoSchema>;

/**
 * Response for listing assets linked to an XR experience.
 */
export const XrExperienceAssetsListResponseDataSchema = Type.Object(
  { assets: Type.Array(XrExperienceAssetDtoSchema) },
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
export const XrExperienceAssetLinkSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly experienceId: Type.TString;
    readonly usdAssetId: Type.TString;
    readonly role: Type.TString;
    readonly displayOrder: Type.TInteger;
    readonly transform: Type.TUnion<(Type.TUnknown | Type.TNull)[]>;
    readonly metadata: Type.TUnion<(Type.TUnknown | Type.TNull)[]>;
    readonly createdAt: Type.TString;
    readonly updatedAt: Type.TString;
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
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    experienceId: Type.String({ minLength: 1 }),
    usdAssetId: Type.String({ minLength: 1 }),
    role: Type.String({ minLength: 1 }),
    displayOrder: Type.Integer({ minimum: 0 }),
    transform: Type.Union([JsonValueSchema, Type.Null()]),
    metadata: Type.Union([JsonValueSchema, Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceAssetLink schema. */
export type XrExperienceAssetLink = Static<typeof XrExperienceAssetLinkSchema>;

/**
 * Response for linking/updating an asset link.
 */
export const XrExperienceAssetLinkResponseDataSchema: Type.TObject<
  {
    readonly asset: Type.TObject<
      {
        readonly id: Type.TString;
        readonly experienceId: Type.TString;
        readonly usdAssetId: Type.TString;
        readonly role: Type.TString;
        readonly displayOrder: Type.TInteger;
        readonly transform: Type.TUnion<(Type.TUnknown | Type.TNull)[]>;
        readonly metadata: Type.TUnion<(Type.TUnknown | Type.TNull)[]>;
        readonly createdAt: Type.TString;
        readonly updatedAt: Type.TString;
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
> = Type.Object({ asset: XrExperienceAssetLinkSchema }, { additionalProperties: false });

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
export const XrExperienceAssetUnlinkResponseDataSchema: Type.TObject<
  { readonly assetId: Type.TString; readonly unlinked: Type.TLiteral<true> },
  "unlinked" | "assetId",
  never
> = Type.Object(
  {
    assetId: Type.String({ minLength: 1 }),
    unlinked: Type.Literal(true),
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
export const XrExperienceAssetFromScanResponseDataSchema = Type.Object(
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
export const XrExperienceShareLinkSchema: Type.TObject<
  {
    readonly token: Type.TString;
    readonly shareUrl: Type.TString;
    readonly expiresAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "expiresAt" | "token" | "shareUrl",
  never
> = Type.Object(
  {
    token: Type.String({ minLength: 1 }),
    shareUrl: Type.String({ minLength: 1 }),
    expiresAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
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
  return Type.Object({ share: shareSchema }, { additionalProperties: false });
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
export const XrExperienceShareLinkInfoSchema: Type.TObject<
  {
    readonly hasShareLink: Type.TBoolean;
    readonly shareUrl: Type.TOptional<Type.TString>;
    readonly expiresAt: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly isExpired: Type.TOptional<Type.TBoolean>;
  },
  "hasShareLink",
  Type.InferOptionalKeys<{
    readonly hasShareLink: Type.TBoolean;
    readonly shareUrl: Type.TOptional<Type.TString>;
    readonly expiresAt: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly isExpired: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    hasShareLink: Type.Boolean(),
    shareUrl: Type.Optional(Type.String({ minLength: 1 })),
    expiresAt: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    isExpired: Type.Optional(Type.Boolean()),
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
export const XrExperienceRevokeShareLinkResponseDataSchema: Type.TObject<
  { readonly revoked: Type.TLiteral<true> },
  "revoked",
  never
> = Type.Object({ revoked: Type.Literal(true) }, { additionalProperties: false });

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
