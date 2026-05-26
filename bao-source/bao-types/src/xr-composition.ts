/**
 * XR composition types derived from schemas.
 *
 * @shared/types/xr-composition.ts
 */

import type {
  XrCompositionArcSchema,
  XrCompositionConfigSchema,
  XrCompositionLayerSchema,
  XrCompositionPlanResponseSchema,
  XrCompositionPlanSchema,
} from "@baohaus/bao-schemas/xr-composition.schemas";
import type { Static } from "@baohaus/baobox/elysia";

/** Inferred type from the XrCompositionArc schema. */
export type XrCompositionArc = Static<typeof XrCompositionArcSchema>;
/** Inferred type from the XrCompositionLayer schema. */
export type XrCompositionLayer = Static<typeof XrCompositionLayerSchema>;
/** Inferred type from the XrCompositionConfig schema. */
export type XrCompositionConfig = Static<typeof XrCompositionConfigSchema>;
/** Inferred type from the XrCompositionPlan schema. */
export type XrCompositionPlan = Static<typeof XrCompositionPlanSchema>;
/** Inferred type from the XrCompositionPlanResponse schema. */
export type XrCompositionPlanResponse = Static<typeof XrCompositionPlanResponseSchema>;
