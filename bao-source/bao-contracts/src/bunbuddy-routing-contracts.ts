/**
 * BunBuddy routing policy contracts.
 *
 * Shared typed contracts for routing decisions and deterministic failure modes.
 */

import type { BunBuddyKind } from "@baohaus/bao-schemas/bunbuddy.schemas";
import type { BunBuddyRoutingMode } from "@baohaus/bao-schemas/bunbuddy-routing.schemas";

/**
 * Deterministic routing failure modes used by routing policy and clients.
 */
export type RoutingFailureMode =
  | "port_mismatch"
  | "stale_manifest"
  | "all_unhealthy"
  | "policy_rejected";

/**
 * Decision envelope consumed by bunbuddy client calls.
 */
export interface BunBuddyRoutingDecision {
  /** BunBuddy kind for this decision. */
  readonly kind: BunBuddyKind;
  /** Selected base URL. */
  readonly baseUrl: string;
  /** Ordered candidate URLs used for fallback. */
  readonly candidates: readonly string[];
  /** Active routing mode for the selected decision. */
  readonly mode: BunBuddyRoutingMode;
  /** Stable policy hash associated with the decision. */
  readonly policyHash: string;
}
