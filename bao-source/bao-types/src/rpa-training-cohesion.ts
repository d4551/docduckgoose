/**
 * RPA training cohesion summary types.
 *
 * Defines shared payloads describing the RPA-to-training cohesion readiness.
 *
 * @shared/types/rpa-training-cohesion
 */

import type { RpaTrainingCohesionSummarySchema } from "@baohaus/bao-schemas/rpa.schemas";
import type { Static } from "@baohaus/baobox/elysia";

/**
 * RPA training cohesion summary payload.
 */
export type RpaTrainingCohesionSummary = Static<typeof RpaTrainingCohesionSummarySchema>;
