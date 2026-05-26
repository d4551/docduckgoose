/**
 * XR review schemas.
 *
 * Defines TypeBox schemas for XR review/annotation workflows tied to XR experiences.
 *
 * @shared/schemas/xr-review.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TInteger,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";

/**
 * XR review record schema.
 */
export const XrReviewSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    experienceId: TypeExports.String({ minLength: 1 }),
    sessionId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    description: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    contextType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    coordinateSpace: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    annotations: TypeExports.Optional(TypeExports.Array(TypeExports.Unknown())),
    annotationCount: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    createdBy: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrReview schema. */
export type XrReview = Static<typeof XrReviewSchema>;

/**
 * XR review create request payload.
 */
export const XrReviewCreateRequestSchema = TypeExports.Object(
  {
    sessionId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    description: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    contextType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    coordinateSpace: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    annotations: TypeExports.Optional(TypeExports.Array(TypeExports.Unknown())),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrReviewCreateRequest schema. */
export type XrReviewCreateRequest = Static<typeof XrReviewCreateRequestSchema>;

/**
 * XR review list request payload.
 */
export const XrReviewListRequestSchema: TObject<
  {
    readonly sessionId: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
    readonly offset: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly sessionId: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
    readonly offset: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    sessionId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    offset: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrReviewListRequest schema. */
export type XrReviewListRequest = Static<typeof XrReviewListRequestSchema>;

/**
 * XR review response schema.
 */
export const XrReviewResponseDataSchema = TypeExports.Object(
  { review: XrReviewSchema },
  { additionalProperties: false },
);

/** Inferred type from the XrReviewResponseData schema. */
export type XrReviewResponseData = Static<typeof XrReviewResponseDataSchema>;

/**
 * XR review response schema.
 */
export const XrReviewResponseSchema = enhancedSuccessWithDataSchema(XrReviewResponseDataSchema, {
  description: "XR review response envelope.",
});

/** Inferred type from the XrReviewResponse schema. */
export type XrReviewResponse = Static<typeof XrReviewResponseSchema>;

/**
 * XR review list response schema.
 */
export const XrReviewListResponseDataSchema = TypeExports.Object(
  {
    reviews: TypeExports.Array(XrReviewSchema),
    total: TypeExports.Integer({ minimum: 0 }),
    limit: TypeExports.Integer({ minimum: 1 }),
    offset: TypeExports.Integer({ minimum: 0 }),
    hasMore: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrReviewListResponseData schema. */
export type XrReviewListResponseData = Static<typeof XrReviewListResponseDataSchema>;

/**
 * XR review list response schema.
 */
export const XrReviewListResponseSchema = enhancedSuccessWithDataSchema(
  XrReviewListResponseDataSchema,
  {
    description: "XR review list response envelope.",
  },
);

/** Inferred type from the XrReviewListResponse schema. */
export type XrReviewListResponse = Static<typeof XrReviewListResponseSchema>;
