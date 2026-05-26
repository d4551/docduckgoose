/**
 * Training readiness snapshot types.
 *
 * Subset of training integration state consumed by RPA MCP tools and
 * handoff REST routes for deterministic preview behavior.
 *
 * @shared/types/training-readiness
 */

/**
 * Cooldown/retry posture for training handoff.
 */
export interface TrainingReadinessCooldownPosture {
  /** Whether a retry is recommended after resolving blocking conditions. */
  retryable: boolean;
}

/**
 * Training readiness snapshot for RPA↔training handoff context.
 *
 * Derived from TrainingIntegrationSummary and RpaTrainingCohesionSummary.
 * Injected into handoff preview/start tools and REST endpoints.
 */
export interface TrainingReadinessSnapshot {
  /** Whether training handoff is enabled. */
  enabled: boolean;
  /** Primary blocking reason when handoff is blocked. */
  blockedReason?: string | null;
  /** Ownership-related constraints or errors. */
  ownershipLimits?: string[] | null;
  /** Autonomy-related constraints or errors. */
  autonomyLimits?: string[] | null;
  /** Retry posture when blocked. */
  cooldownRetryPosture?: TrainingReadinessCooldownPosture | null;
}
