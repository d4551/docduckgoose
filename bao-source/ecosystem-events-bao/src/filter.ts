/**
 * Per-subscriber event filter.
 *
 * Pure decision function called by every SSE sink before re-rendering
 * the contribution fragment. Returns `true` when the event applies to
 * the connection's `(surface, tenantId, userId)` scope, `false`
 * otherwise.
 *
 * The bus broadcasts unconditionally; this filter owns scope reduction
 * so multi-tenant deployments cannot leak install events across
 * tenants and per-user capability-reevaluation events do not wake
 * unrelated users' tabs.
 *
 * @packageDocumentation
 */

import type {
  EcosystemContributionEvent,
  EcosystemContributionSurface,
  SubscriberScope,
} from "./types.ts";

/**
 * Decide whether `event` should fan out to a subscriber with the given
 * scope, given the surface they care about.
 *
 * Decision rules (applied in order; first false-match short-circuits):
 *
 * 1. **Surface match.** `event.surface` must equal `expectedSurface`.
 *    A sidebar sink does not re-render on a settings-tab event.
 * 2. **Tenant scope.** When `event.tenantId` is set, the subscriber's
 *    `tenantId` must equal it. When `event.tenantId` is absent the
 *    event is tenant-broadcast and every subscriber proceeds. An
 *    anonymous subscriber (`tenantId === null`) sees only
 *    tenant-broadcast events.
 * 3. **User scope.** When `event.userId` is set, the subscriber's
 *    `userId` must equal it. When `event.userId` is absent the event
 *    is user-broadcast. Anonymous subscribers see only user-broadcast
 *    events.
 *
 * @param event - Published contribution event.
 * @param scope - Subscriber scope captured at SSE-open time.
 * @param expectedSurface - The surface this sink renders for.
 * @returns `true` when the event should trigger a re-render.
 */
export function shouldDeliverEvent(
  event: EcosystemContributionEvent,
  scope: SubscriberScope,
  expectedSurface: EcosystemContributionSurface,
): boolean {
  if (event.surface !== expectedSurface) {
    return false;
  }
  if (event.tenantId !== undefined && event.tenantId !== scope.tenantId) {
    return false;
  }
  if (event.userId !== undefined && event.userId !== scope.userId) {
    return false;
  }
  return true;
}
