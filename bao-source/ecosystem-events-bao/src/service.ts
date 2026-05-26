/**
 * In-process ecosystem contribution event bus.
 *
 * Singleton publish/subscribe service consumed by every Bao app's
 * contribution target-handlers on the publish side (sidebar install,
 * settings-tab install, palette-entry-group install, api-group install,
 * tile-group install, capability re-eval) and by the SSR SSE sinks on
 * the subscribe side.
 *
 * Listeners are invoked synchronously inside {@link publish} so the SSE
 * sink can flush fragments before the install handler's response is
 * generated. A listener exception propagates to the publish caller per
 * the "no try/catch sprawl" hard ban — consumers wrap their listeners
 * with `toResultAsync` (from `@baohaus/bao-utils/async-result`) when
 * they need isolation, and the bus stays a thin dispatcher.
 *
 * Cross-process fanout is intentionally out-of-scope for this module
 * (`@baohaus/bao-boss/topics` `ecosystem.contribution-changed` is the
 * canonical wire-format identifier when a future bridge is added).
 *
 * @packageDocumentation
 */

import type {
  EcosystemContributionEvent,
  EcosystemContributionListener,
  EcosystemEventUnsubscribe,
} from "./types.ts";

const listeners = new Set<EcosystemContributionListener>();

/**
 * Process-stable instance identifier — set once at module load to a
 * cryptographically-strong random value. The cross-process bridge
 * stamps every outbound event with this id and drops any inbound event
 * whose `originInstanceId` matches (loopback prevention).
 *
 * Held as a module-scoped `let` so {@link resetForTests} can rotate it
 * between test runs that simulate multiple processes inside one Bun
 * worker — every other reader goes through {@link getLocalInstanceId}.
 */
let localInstanceId: string = crypto.randomUUID();

/**
 * Stable peer-id literal pinned at boot via {@link setLocalPeerId}.
 * Stamped onto every outbound event as `originPeerId` so cross-peer
 * subscribers (e.g. `federation-pull` in `bao-runtime`) can invalidate
 * one peer's cache entry surgically. Distinct from `localInstanceId`
 * (random UUID per process for loopback dedup) — `localPeerId` survives
 * process restart and identifies the logical publisher.
 */
let localPeerId: string | null = null;

/** Read the current process's instance id. */
export function getLocalInstanceId(): string {
  return localInstanceId;
}

/** Read the current process's pinned peer-id (null if unset). */
export function getLocalPeerId(): string | null {
  return localPeerId;
}

/**
 * Pin the peer-id literal for this process. Called once at boot from
 * `install-boot-with-baoboss` with the consumer app's `appName`. Idempotent
 * — repeat calls with the same value are a no-op; calls with a different
 * value rotate the pin (used in tests).
 */
export function setLocalPeerId(peerId: string): void {
  localPeerId = peerId;
}

/**
 * Fan an event out to every subscribed listener. Iteration is over a
 * shallow snapshot so listeners that unsubscribe during dispatch do not
 * disturb the in-flight loop.
 */
export function dispatchEcosystemEvent(event: EcosystemContributionEvent): void {
  const snapshot = Array.from(listeners);
  for (const listener of snapshot) {
    listener(event);
  }
}

/**
 * Caller-supplied input to {@link publish}. Stamps for `publishedAt`,
 * `originInstanceId`, and `idempotencyKey` are filled by the publisher
 * when omitted — the cross-process bridge supplies them explicitly so
 * the same identifiers survive the round-trip across the broker and
 * the loopback-prevention check sees a stable origin.
 */
export type EcosystemEventInput = Omit<
  EcosystemContributionEvent,
  "publishedAt" | "originInstanceId" | "idempotencyKey"
> &
  Partial<Pick<EcosystemContributionEvent, "publishedAt" | "originInstanceId" | "idempotencyKey">>;

/**
 * Publish a contribution-change event. Stamps the event with
 * `publishedAt` (system clock), `originInstanceId` (this process), and
 * `idempotencyKey` (random UUID) when the caller omits them, then
 * dispatches synchronously to every subscriber. Returns nothing —
 * publishers do not learn how many listeners received the event (use
 * {@link listenerCount} for tests).
 *
 * The `tenantId` / `userId` scope fields are conditionally spread so
 * absent values stay absent on the wire under `exactOptionalPropertyTypes`.
 */
export function publish(input: EcosystemEventInput): void {
  const event: EcosystemContributionEvent = {
    surface: input.surface,
    change: input.change,
    extensionId: input.extensionId,
    publishedAt: input.publishedAt ?? new Date().toISOString(),
    originInstanceId: input.originInstanceId ?? localInstanceId,
    idempotencyKey: input.idempotencyKey ?? crypto.randomUUID(),
    ...(input.tenantId === undefined ? {} : { tenantId: input.tenantId }),
    ...(input.userId === undefined ? {} : { userId: input.userId }),
    ...(input.originPeerId !== undefined
      ? { originPeerId: input.originPeerId }
      : localPeerId !== null
        ? { originPeerId: localPeerId }
        : {}),
  };
  dispatchEcosystemEvent(event);
}

/**
 * Subscribe to contribution-change events. The unsubscribe handle is
 * backed by `Set.delete` so calling it more than once is a natural
 * no-op without an extra guard layer.
 */
export function subscribe(listener: EcosystemContributionListener): EcosystemEventUnsubscribe {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Drop every subscriber AND rotate the local instance id. Used
 * exclusively by test suites — production callers never need to clear
 * the singleton because subscribers already unsubscribe deterministically
 * when their SSE connection closes. The instance-id rotation lets a
 * single Bun worker simulate multiple processes across distinct test
 * runs without leaking the prior id into bridge loopback checks.
 */
export function resetForTests(): void {
  listeners.clear();
  localInstanceId = crypto.randomUUID();
  localPeerId = null;
}

/** Current subscriber count. Returns 0 when no subscribers are registered. */
export function listenerCount(): number {
  return listeners.size;
}

/**
 * Process-scoped ecosystem event bus singleton. Exposed as a frozen
 * record of function references so callers cannot reassign the
 * dispatcher.
 */
export const ecosystemEventBus = Object.freeze({
  publish,
  subscribe,
  resetForTests,
  listenerCount,
});

export type EcosystemEventBus = typeof ecosystemEventBus;
