/**
 * AI provider health types.
 *
 * Shared circuit breaker and failover health metadata for AI providers.
 *
 * @shared/types/ai-provider-health.ts
 */

import type { AiProviderKeyResolved } from "./ai-providers.ts";

/**
 * AI providers included in health reporting.
 */
export type AiProviderHealthKey = AiProviderKeyResolved;

/**
 * Circuit breaker state for an AI provider.
 */
export type CircuitState = "closed" | "open" | "half_open";

/**
 * Provider health status for API responses.
 */
export interface ProviderHealthStatus {
  /** Circuit breaker state. */
  state: CircuitState;
  /** Whether the provider can accept traffic right now. */
  available: boolean;
  /** Number of failures in the active failure window. */
  failureCount: number;
  /** ISO timestamp of most recent failure. */
  lastFailure: string | null;
  /** ISO timestamp of most recent success. */
  lastSuccess: string | null;
  /** ISO timestamp of the next retry window (if circuit is open). */
  nextAttemptAt: string | null;
}

/**
 * Aggregated provider health snapshot.
 */
export interface ProvidersHealthResponse {
  /** Provider health status keyed by provider. */
  providers: Record<AiProviderHealthKey, ProviderHealthStatus>;
  /** ISO timestamp for when the snapshot was captured. */
  timestamp: string;
}

/**
 * Failover summary returned by the health endpoint.
 */
export interface AiProviderFailoverSummary {
  /** Whether failover is possible with current configuration. */
  available: boolean;
  /** Number of configured providers eligible for failover. */
  configuredProviders: number;
  /** Ordered list of providers participating in failover decisions. */
  providers: AiProviderHealthKey[];
}

/**
 * AI provider health endpoint response payload.
 */
export interface AiProviderHealthResponse {
  /** Whether the health lookup succeeded. */
  ok: boolean;
  /** Circuit breaker health snapshot. */
  health: ProvidersHealthResponse;
  /** Failover availability summary. */
  failover: AiProviderFailoverSummary;
  /** Recommended provider based on current configuration. */
  recommendedProvider: AiProviderHealthKey | null;
}
