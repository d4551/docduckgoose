/**
 * Shared training integration summary types.
 *
 * Defines training integration snapshots used by AI/XR/USD/hardware clients.
 *
 * @shared/types/training-integration.ts
 */

import type {
  TrainingIntegrationAutonomySourcesSchema,
  TrainingIntegrationBunBuddySnapshotSchema,
  TrainingIntegrationBunBuddySummarySchema,
  TrainingIntegrationProvidersSchema,
  TrainingIntegrationSummarySchema,
  TrainingProviderLibraryStatusSchema,
} from "@baohaus/bao-schemas/training-integration.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import type { AiProviderKeyResolved } from "./ai-providers.ts";

/**
 * Training integration provider summary.
 */
export type TrainingIntegrationProviders = Static<typeof TrainingIntegrationProvidersSchema>;

/**
 * Training provider library availability status.
 */
export type TrainingProviderLibraryStatus = Static<typeof TrainingProviderLibraryStatusSchema>;

/**
 * Training provider library status map.
 */
export type TrainingProviderLibraryStatusMap = Record<
  AiProviderKeyResolved,
  TrainingProviderLibraryStatus
>;

/**
 * Training bunbuddy summary included in integration payloads.
 */
export type TrainingIntegrationBunBuddySummary = Static<
  typeof TrainingIntegrationBunBuddySummarySchema
>;

/**
 * Training bunbuddy summary bundle.
 */
export type TrainingIntegrationBunBuddySnapshot = Static<
  typeof TrainingIntegrationBunBuddySnapshotSchema
>;

/**
 * Autonomy training sources snapshot payload.
 */
export type TrainingIntegrationAutonomySources = Static<
  typeof TrainingIntegrationAutonomySourcesSchema
>;

/**
 * Training integration summary payload.
 */
export type TrainingIntegrationSummary = Static<typeof TrainingIntegrationSummarySchema>;
