/**
 * XR experience schemas.
 *
 * Defines TypeBox schemas for XR experience CRUD requests and responses.
 *
 * @shared/schemas/xr-experience
 */

import {
  XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH,
  XR_EXPERIENCE_NAME_MAX_LENGTH,
  XR_EXPERIENCE_SCHEMA_VERSION_MAX,
  XR_EXPERIENCE_SCHEMA_VERSION_MIN,
} from "@baohaus/bao-constants/xr-experience";
import {
  XR_EXPERIENCE_CONFIG_TYPES,
  XR_EXPERIENCE_STATUSES,
  XR_EXPERIENCE_VISIBILITIES,
} from "@baohaus/bao-constants/xr-experience.options";
import type { Static, TLiteral, TObject, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { JsonValueSchema } from "./json.schemas.ts";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";

/**
 * XR experience visibility schema.
 */
export const XrExperienceVisibilitySchema: TUnion<
  [TLiteral<"private" | "team" | "public">, ...TLiteral<"private" | "team" | "public">[]]
> = stringEnum(XR_EXPERIENCE_VISIBILITIES, {
  description: "XR experience visibility",
});

/** Inferred type from the XrExperienceVisibility schema. */
export type XrExperienceVisibility = Static<typeof XrExperienceVisibilitySchema>;

/**
 * XR experience config type schema.
 */
export const XrExperienceConfigTypeSchema: TUnion<
  [
    TLiteral<"generic" | "placement" | "scene" | "composition">,
    ...TLiteral<"generic" | "placement" | "scene" | "composition">[],
  ]
> = stringEnum(XR_EXPERIENCE_CONFIG_TYPES, {
  description: "XR experience config schema identifier",
});

/** Inferred type from the XrExperienceConfigType schema. */
export type XrExperienceConfigType = Static<typeof XrExperienceConfigTypeSchema>;

/**
 * XR experience status schema.
 */
export const XrExperienceStatusSchema: TUnion<
  [TLiteral<"draft" | "published" | "archived">, ...TLiteral<"draft" | "published" | "archived">[]]
> = stringEnum(XR_EXPERIENCE_STATUSES, {
  description: "XR experience versioning status",
});

/** Inferred type from the XrExperienceStatus schema. */
export type XrExperienceStatus = Static<typeof XrExperienceStatusSchema>;

/**
 * XR experience record schema.
 */
export const XrExperienceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1, maxLength: XR_EXPERIENCE_NAME_MAX_LENGTH }),
    description: TypeExports.Union([
      TypeExports.String({ maxLength: XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH }),
      TypeExports.Null(),
    ]),
    ownerId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    visibility: XrExperienceVisibilitySchema,
    configType: TypeExports.Union([XrExperienceConfigTypeSchema, TypeExports.Null()]),
    schemaVersion: TypeExports.Integer({
      minimum: XR_EXPERIENCE_SCHEMA_VERSION_MIN,
      maximum: XR_EXPERIENCE_SCHEMA_VERSION_MAX,
    }),
    config: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
    status: XrExperienceStatusSchema,
    publishedAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    version: TypeExports.Integer({ minimum: 0 }),
    hasShareLink: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperience schema. */
export type XrExperience = Static<typeof XrExperienceSchema>;

/**
 * XR experience list response schema.
 */
export const XrExperienceListDataSchema = TypeExports.Object(
  {
    experiences: TypeExports.Array(XrExperienceSchema),
    total: TypeExports.Integer({ minimum: 0 }),
    page: TypeExports.Integer({ minimum: 1 }),
    pageSize: TypeExports.Integer({ minimum: 1 }),
    hasMore: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceListData schema. */
export type XrExperienceListData = Static<typeof XrExperienceListDataSchema>;

/**
 * XR experience list response schema.
 */
export const XrExperienceListResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceListDataSchema,
  {
    description: "XR experience list response envelope.",
  },
);

/** Inferred type from the XrExperienceListResponse schema. */
export type XrExperienceListResponse = Static<typeof XrExperienceListResponseSchema>;

/**
 * XR experience response schema.
 */
export const XrExperienceResponseSchema = enhancedSuccessWithDataSchema(XrExperienceSchema, {
  description: "XR experience response envelope.",
});

/** Inferred type from the XrExperienceResponse schema. */
export type XrExperienceResponse = Static<typeof XrExperienceResponseSchema>;

/**
 * XR experience create request schema.
 */
export const XrExperienceCreateRequestSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1, maxLength: XR_EXPERIENCE_NAME_MAX_LENGTH }),
    description: TypeExports.Optional(
      TypeExports.String({ maxLength: XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH }),
    ),
    config: TypeExports.Optional(JsonValueSchema),
    visibility: TypeExports.Optional(XrExperienceVisibilitySchema),
    configType: TypeExports.Optional(XrExperienceConfigTypeSchema),
    schemaVersion: TypeExports.Optional(
      TypeExports.Integer({
        minimum: XR_EXPERIENCE_SCHEMA_VERSION_MIN,
        maximum: XR_EXPERIENCE_SCHEMA_VERSION_MAX,
        default: XR_EXPERIENCE_SCHEMA_VERSION_MIN,
      }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceCreateRequest schema. */
export type XrExperienceCreateRequest = Static<typeof XrExperienceCreateRequestSchema>;

/**
 * XR experience update request schema.
 */
export const XrExperienceUpdateRequestSchema = TypeExports.Object(
  {
    name: TypeExports.Optional(
      TypeExports.String({ minLength: 1, maxLength: XR_EXPERIENCE_NAME_MAX_LENGTH }),
    ),
    description: TypeExports.Optional(
      TypeExports.String({ maxLength: XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH }),
    ),
    config: TypeExports.Optional(JsonValueSchema),
    visibility: TypeExports.Optional(XrExperienceVisibilitySchema),
    configType: TypeExports.Optional(XrExperienceConfigTypeSchema),
    schemaVersion: TypeExports.Optional(
      TypeExports.Integer({
        minimum: XR_EXPERIENCE_SCHEMA_VERSION_MIN,
        maximum: XR_EXPERIENCE_SCHEMA_VERSION_MAX,
      }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceUpdateRequest schema. */
export type XrExperienceUpdateRequest = Static<typeof XrExperienceUpdateRequestSchema>;

/**
 * XR experience deletion response schema.
 */
export const XrExperienceDeleteDataSchema: TObject<
  { readonly id: TString; readonly deleted: TLiteral<true> },
  "id" | "deleted",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    deleted: TypeExports.Literal(true),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperienceDeleteData schema. */
export type XrExperienceDeleteData = Static<typeof XrExperienceDeleteDataSchema>;

/**
 * XR experience deletion response schema.
 */
export const XrExperienceDeleteResponseSchema = enhancedSuccessWithDataSchema(
  XrExperienceDeleteDataSchema,
  {
    description: "XR experience deletion response envelope.",
  },
);

/** Inferred type from the XrExperienceDeleteResponse schema. */
export type XrExperienceDeleteResponse = Static<typeof XrExperienceDeleteResponseSchema>;
