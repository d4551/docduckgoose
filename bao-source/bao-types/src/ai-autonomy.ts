/**
 * AI autonomy orchestration type contracts.
 *
 * Defines runtime-agnostic contracts for autonomous routing, tool policy,
 * and orchestration state transitions shared by server services.
 *
 * @shared/types/ai-autonomy
 */

/**
 * Canonical autonomy workflow states.
 */
export type AutonomyJobState =
  | "planned"
  | "running"
  | "waiting_tool"
  | "retrying"
  | "succeeded"
  | "failed"
  | "cancelled";

/**
 * Canonical failure reasons for autonomous execution.
 */
export type AutonomyFailureReason =
  | "policy_blocked"
  | "provider_unavailable"
  | "provider_timeout"
  | "provider_error"
  | "budget_exceeded"
  | "tool_not_allowed"
  | "tool_depth_exceeded"
  | "tool_call_limit_exceeded"
  | "context_too_large"
  | "validation_failed"
  | "cancelled"
  | "unknown";

/**
 * Provider/model candidate available for autonomous routing.
 */
export interface ProviderRouteCandidate {
  /** Provider key (for example `azure`, `nim`, `ollama`). */
  provider: string;
  /** Concrete model identifier. */
  model: string;
  /** Estimated median latency in milliseconds. */
  latencyMs: number | null;
  /** Estimated USD cost per 1k tokens. */
  costPer1kTokensUsd: number | null;
  /** Capability tokens supported by the candidate. */
  capabilities: string[];
  /** Safety confidence score in the range 0..1. */
  safetyScore: number | null;
  /** Runtime availability state. */
  availability: "online" | "degraded" | "offline";
  /** Whether this route can execute fully offline. */
  offlineCapable: boolean;
}

/**
 * Constraints applied when routing an autonomy request.
 */
export interface ProviderRouteConstraints {
  /** Optional p95-style latency budget in milliseconds. */
  latencyBudgetMs?: number;
  /** Optional maximum cost per 1k tokens in USD. */
  maxCostPer1kTokensUsd?: number;
  /** Required capability keys that must be present. */
  requiredCapabilities?: string[];
  /** Minimum safety score threshold in the range 0..1. */
  minSafetyScore?: number;
  /** Restrict to online/degraded candidates when true. */
  requireReachable?: boolean;
  /** Provider preference order (highest priority first). */
  preferredProviders?: string[];
  /** Force offline-capable routes when true. */
  offlineRequested?: boolean;
}

/**
 * Router decision payload for an autonomy request.
 */
export interface ProviderRouteDecision {
  /** Ordered candidates after policy/ranking. */
  orderedCandidates: ProviderRouteCandidate[];
  /** Chosen candidate, or null when none satisfy constraints. */
  selected: ProviderRouteCandidate | null;
  /** Human-readable decision reasons. */
  reasons: string[];
}

/**
 * Execution budget for autonomous tool calls.
 */
export interface ToolExecutionBudget {
  /** Maximum nested tool-call depth allowed. */
  maxDepth: number;
  /** Maximum total tool invocations allowed for one autonomy job. */
  maxCalls: number;
  /** Maximum wall-clock execution time for the tool phase. */
  maxDurationMs: number;
  /** Optional hard cap for tool-phase external cost in USD. */
  maxCostUsd?: number;
}

/**
 * Mutable autonomy job progress counters used for policy checks.
 */
export interface ToolExecutionProgress {
  /** Current nested depth level (0-based). */
  depth: number;
  /** Number of tool calls already executed. */
  calls: number;
  /** Time spent in milliseconds for tool execution so far. */
  durationMs: number;
  /** Cost accrued in USD so far. */
  costUsd?: number;
}
