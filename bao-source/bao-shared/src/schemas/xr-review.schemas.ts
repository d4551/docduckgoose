/**
 * XR review schemas.
 *
 * Defines TypeBox schemas for XR review/annotation workflows tied to XR experiences.
 *
 * @shared/schemas/xr-review.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";

/**
 * XR review record schema.
 */
export const XrReviewSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    experienceId: Type.String({ minLength: 1 }),
    sessionId: Type.Optional(Type.String({ minLength: 1 })),
    name: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String({ minLength: 1 })),
    contextType: Type.Optional(Type.String({ minLength: 1 })),
    coordinateSpace: Type.Optional(Type.String({ minLength: 1 })),
    annotations: Type.Optional(Type.Array(Type.Unknown())),
    annotationCount: Type.Optional(Type.Integer({ minimum: 0 })),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    createdBy: Type.Optional(Type.String({ minLength: 1 })),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrReview schema. */
export type XrReview = Static<typeof XrReviewSchema>;

/**
 * XR review create request payload.
 */
export const XrReviewCreateRequestSchema = Type.Object(
  {
    sessionId: Type.Optional(Type.String({ minLength: 1 })),
    name: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String({ minLength: 1 })),
    contextType: Type.Optional(Type.String({ minLength: 1 })),
    coordinateSpace: Type.Optional(Type.String({ minLength: 1 })),
    annotations: Type.Optional(Type.Array(Type.Unknown())),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrReviewCreateRequest schema. */
export type XrReviewCreateRequest = Static<typeof XrReviewCreateRequestSchema>;

/**
 * XR review list request payload.
 */
export const XrReviewListRequestSchema: Type.TObject<
  {
    readonly sessionId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly sessionId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    sessionId: Type.Optional(Type.String({ minLength: 1 })),
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
    offset: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrReviewListRequest schema. */
export type XrReviewListRequest = Static<typeof XrReviewListRequestSchema>;

/**
 * XR review response schema.
 */
export const XrReviewResponseDataSchema = Type.Object(
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
export const XrReviewListResponseDataSchema = Type.Object(
  {
    reviews: Type.Array(XrReviewSchema),
    total: Type.Integer({ minimum: 0 }),
    limit: Type.Integer({ minimum: 1 }),
    offset: Type.Integer({ minimum: 0 }),
    hasMore: Type.Boolean(),
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
