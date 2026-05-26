/**
 * Canonical recovery-strategy tokens used by error-boundary consumers to decide
 * what to do after a failure has been classified.
 *
 * Adopted from the navi error-boundary design.
 *
 * - `retry-immediate`: replay the operation with no delay.
 * - `retry-backoff`: replay with exponential backoff (see
 *   `@baohaus/circuit-breaker-bao/retry`).
 * - `use-fallback-model`: hand off to a secondary model via
 *   `@baohaus/ai-model-core/fallback-chain` (when added).
 * - `degrade-gracefully`: return a partial / simplified result.
 * - `circuit-break`: open the circuit breaker for the surface.
 * - `load-balance`: redistribute the load across siblings.
 * - `skip-operation`: drop the operation; continue.
 *
 * @baohaus/bao-utils/recovery-strategy
 */

export const RECOVERY_STRATEGY = {
  RetryImmediate: "retry-immediate",
  RetryBackoff: "retry-backoff",
  UseFallbackModel: "use-fallback-model",
  DegradeGracefully: "degrade-gracefully",
  CircuitBreak: "circuit-break",
  LoadBalance: "load-balance",
  SkipOperation: "skip-operation",
} as const;

export type RecoveryStrategy = (typeof RECOVERY_STRATEGY)[keyof typeof RECOVERY_STRATEGY];
