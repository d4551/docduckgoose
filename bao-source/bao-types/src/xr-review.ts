/**
 * XR review types derived from schemas.
 *
 * @shared/types/xr-review.ts
 */

import type {
  XrReviewCreateRequestSchema,
  XrReviewListRequestSchema,
  XrReviewListResponseSchema,
  XrReviewResponseSchema,
  XrReviewSchema,
} from "@baohaus/bao-schemas/xr-review.schemas";
import type { Static } from "@baohaus/baobox/elysia";

/** Inferred type from the XrReview schema. */
export type XrReview = Static<typeof XrReviewSchema>;
/** Inferred type from the XrReviewCreateRequest schema. */
export type XrReviewCreateRequest = Static<typeof XrReviewCreateRequestSchema>;
/** Inferred type from the XrReviewListRequest schema. */
export type XrReviewListRequest = Static<typeof XrReviewListRequestSchema>;
/** Inferred type from the XrReviewResponse schema. */
export type XrReviewResponse = Static<typeof XrReviewResponseSchema>;
/** Inferred type from the XrReviewListResponse schema. */
export type XrReviewListResponse = Static<typeof XrReviewListResponseSchema>;
