/**
 * XR experience schemas.
 *
 * Defines TypeBox schemas for XR experience CRUD requests and responses.
 *
 * @shared/schemas/xr-experience
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  XR_EXPERIENCE_CONFIG_TYPES,
  XR_EXPERIENCE_STATUSES,
  XR_EXPERIENCE_VISIBILITIES,
} from "../constants/xr-experience.options.ts";
import {
  XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH,
  XR_EXPERIENCE_NAME_MAX_LENGTH,
  XR_EXPERIENCE_SCHEMA_VERSION_MAX,
  XR_EXPERIENCE_SCHEMA_VERSION_MIN,
} from "../constants/xr-experience.ts";
import { stringEnum } from "./baobox-enum.ts";
import { JsonValueSchema } from "./json.schemas.ts";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";

/**
 * XR experience visibility schema.
 */
export const XrExperienceVisibilitySchema: Type.TUnion<
  [Type.TLiteral<"private" | "team" | "public">, ...Type.TLiteral<"private" | "team" | "public">[]]
> = stringEnum(XR_EXPERIENCE_VISIBILITIES, {
  description: "XR experience visibility",
});

/** Inferred type from the XrExperienceVisibility schema. */
export type XrExperienceVisibility = Static<typeof XrExperienceVisibilitySchema>;

/**
 * XR experience config type schema.
 */
export const XrExperienceConfigTypeSchema: Type.TUnion<
  [
    Type.TLiteral<"generic" | "placement" | "scene" | "composition">,
    ...Type.TLiteral<"generic" | "placement" | "scene" | "composition">[],
  ]
> = stringEnum(XR_EXPERIENCE_CONFIG_TYPES, {
  description: "XR experience config schema identifier",
});

/** Inferred type from the XrExperienceConfigType schema. */
export type XrExperienceConfigType = Static<typeof XrExperienceConfigTypeSchema>;

/**
 * XR experience status schema.
 */
export const XrExperienceStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"draft" | "published" | "archived">,
    ...Type.TLiteral<"draft" | "published" | "archived">[],
  ]
> = stringEnum(XR_EXPERIENCE_STATUSES, {
  description: "XR experience versioning status",
});

/** Inferred type from the XrExperienceStatus schema. */
export type XrExperienceStatus = Static<typeof XrExperienceStatusSchema>;

/**
 * XR experience record schema.
 */
export const XrExperienceSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1, maxLength: XR_EXPERIENCE_NAME_MAX_LENGTH }),
    description: Type.Union([
      Type.String({ maxLength: XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH }),
      Type.Null(),
    ]),
    ownerId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    visibility: XrExperienceVisibilitySchema,
    configType: Type.Union([XrExperienceConfigTypeSchema, Type.Null()]),
    schemaVersion: Type.Integer({
      minimum: XR_EXPERIENCE_SCHEMA_VERSION_MIN,
      maximum: XR_EXPERIENCE_SCHEMA_VERSION_MAX,
    }),
    config: Type.Union([JsonValueSchema, Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
    status: XrExperienceStatusSchema,
    publishedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    version: Type.Integer({ minimum: 0 }),
    hasShareLink: Type.Boolean(),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrExperience schema. */
export type XrExperience = Static<typeof XrExperienceSchema>;

/**
 * XR experience list response schema.
 */
export const XrExperienceListDataSchema = Type.Object(
  {
    experiences: Type.Array(XrExperienceSchema),
    total: Type.Integer({ minimum: 0 }),
    page: Type.Integer({ minimum: 1 }),
    pageSize: Type.Integer({ minimum: 1 }),
    hasMore: Type.Boolean(),
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
export const XrExperienceCreateRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: XR_EXPERIENCE_NAME_MAX_LENGTH }),
    description: Type.Optional(Type.String({ maxLength: XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH })),
    config: Type.Optional(JsonValueSchema),
    visibility: Type.Optional(XrExperienceVisibilitySchema),
    configType: Type.Optional(XrExperienceConfigTypeSchema),
    schemaVersion: Type.Optional(
      Type.Integer({
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
export const XrExperienceUpdateRequestSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1, maxLength: XR_EXPERIENCE_NAME_MAX_LENGTH })),
    description: Type.Optional(Type.String({ maxLength: XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH })),
    config: Type.Optional(JsonValueSchema),
    visibility: Type.Optional(XrExperienceVisibilitySchema),
    configType: Type.Optional(XrExperienceConfigTypeSchema),
    schemaVersion: Type.Optional(
      Type.Integer({
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
export const XrExperienceDeleteDataSchema: Type.TObject<
  { readonly id: Type.TString; readonly deleted: Type.TLiteral<true> },
  "id" | "deleted",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    deleted: Type.Literal(true),
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
