/**
 * Cross-process ecosystem event bridge.
 *
 * Lifts the in-process pub/sub bus to a multi-process topology. The
 * bridge bolts onto the local {@link ecosystemEventBus} via two seams:
 *
 *   1. **Outbound** — every event published locally is forwarded to the
 *      transport's `publish` callback after dispatch completes, so the
 *      broker can fan it out to peer processes.
 *   2. **Inbound** — the bridge subscribes to the transport's inbound
 *      stream and dispatches each received event into the local bus
 *      (via {@link dispatchEcosystemEvent}, NOT {@link publish}, so the
 *      bridge does not re-stamp identifiers and does not re-emit on the
 *      outbound side).
 *
 * Loopback prevention runs at two layers. The transport adapter SHOULD
 * drop messages whose `originInstanceId` matches its own at the wire
 * level, but the bridge enforces the same invariant defensively here so
 * a misconfigured transport cannot fan a process's own publish back
 * into its local subscribers. Idempotency tracking holds the most
 * recent `idempotencyKey`s in a bounded LRU so a broker that re-delivers
 * (at-least-once semantics) does not double-dispatch.
 *
 * The transport surface is intentionally minimal — `publish`, `onEvent`,
 * and `close` — so the same bridge plugs into a localhost WebSocket
 * for dev, a `BaoBoss` topic for prod, an in-memory loopback for tests,
 * or any future broker without changing the bridge or the consumer
 * apps.
 *
 * @packageDocumentation
 */

import {
  dispatchEcosystemEvent,
  getLocalInstanceId,
  publish as localPublish,
  subscribe as localSubscribe,
} from "./service.ts";
import {
  ECOSYSTEM_CONTRIBUTION_CHANGE,
  ECOSYSTEM_CONTRIBUTION_SURFACE,
  type EcosystemContributionChange,
  type EcosystemContributionEvent,
  type EcosystemContributionSurface,
  type EcosystemEventUnsubscribe,
} from "./types.ts";

function narrowSurface(value: string): EcosystemContributionSurface | null {
  for (const candidate of Object.values(ECOSYSTEM_CONTRIBUTION_SURFACE)) {
    if (candidate === value) {
      return candidate;
    }
  }
  return null;
}

function narrowChange(value: string): EcosystemContributionChange | null {
  for (const candidate of Object.values(ECOSYSTEM_CONTRIBUTION_CHANGE)) {
    if (candidate === value) {
      return candidate;
    }
  }
  return null;
}

/**
 * Transport adapter the bridge plugs into. Implementations:
 *
 *   - {@link createInMemoryEcosystemTransport} — in-memory loopback
 *     between two bridge instances inside one Bun worker; used by tests
 *     to simulate two processes without a broker.
 *   - `createBaoBossEcosystemTransport(boss, topic)` — production
 *     adapter against `@baohaus/bao-boss` `BaoBoss` (separate module to
 *     keep this package's dep surface minimal).
 *   - localhost WebSocket adapter for dev (separate module).
 *
 * The transport is responsible for:
 *
 *   - Serializing the event to its wire format (the canonical JSON
 *     encoding via {@link encodeEcosystemEvent} / {@link decodeEcosystemEvent}
 *     is offered as a default; transports MAY use their own).
 *   - Delivering inbound events at-least-once.
 *   - Best-effort deduplication of self-loops (the bridge's defensive
 *     check runs after).
 */
export interface EcosystemEventTransport {
  /**
   * Forward an event published locally to the broker. The transport
   * SHOULD return synchronously (the bus dispatch already completed
   * before this is called) or as fast as possible — slow transports
   * delay the publisher's next operation.
   */
  readonly publish: (event: EcosystemContributionEvent) => void | Promise<void>;
  /**
   * Register a callback for inbound events. The bridge wires
   * `dispatchEcosystemEvent` here after wrapping it with the
   * loopback + idempotency filter. Returns an unsubscribe handle the
   * bridge calls during shutdown.
   */
  readonly onEvent: (
    callback: (event: EcosystemContributionEvent) => void,
  ) => EcosystemEventUnsubscribe;
  /**
   * Tear down the transport. Called once during bridge shutdown.
   * Synchronous flush is preferred but not required.
   */
  readonly close: () => void | Promise<void>;
}

/**
 * Capacity of the idempotency-key LRU. Holds the last N event ids the
 * bridge has dispatched so a broker re-delivery within the window is
 * dropped. 1024 is sized for typical contribution-event rates (a
 * `.bao` install fans 5-10 events; sustained churn is rare).
 */
const IDEMPOTENCY_LRU_CAPACITY = 1024;

interface BoundedKeyCache {
  readonly has: (key: string) => boolean;
  readonly add: (key: string) => void;
  readonly clear: () => void;
}

/**
 * FIFO bounded set: when capacity is reached, the oldest insertion is
 * evicted. JavaScript `Set` preserves insertion order, so the FIFO is
 * implicit. Not a perfect LRU (no recency promotion on hit) but the
 * access pattern here is "see id once, drop dup" — recency promotion
 * adds no value and costs a delete+re-insert per check.
 */
function createBoundedKeyCache(capacity: number): BoundedKeyCache {
  const seen = new Set<string>();
  return {
    has(key: string): boolean {
      return seen.has(key);
    },
    add(key: string): void {
      if (seen.has(key)) {
        return;
      }
      seen.add(key);
      if (seen.size > capacity) {
        const iterator = seen.values();
        const oldest = iterator.next();
        if (!oldest.done) {
          seen.delete(oldest.value);
        }
      }
    },
    clear(): void {
      seen.clear();
    },
  };
}

/**
 * Live bridge handle returned by {@link installCrossProcessBridge}.
 * Each app holds at most one bridge per process; calling install twice
 * without closing the prior bridge throws.
 */
export interface EcosystemEventBridgeHandle {
  /** Tear down the bridge: unsubscribe from local + transport, close transport. */
  readonly close: () => Promise<void>;
  /** Total inbound events received from the transport. */
  readonly inboundCount: () => number;
  /** Total inbound events dropped as loopback (origin matched). */
  readonly loopbackDropCount: () => number;
  /** Total inbound events dropped as duplicates (idempotency-key seen). */
  readonly duplicateDropCount: () => number;
}

let activeBridge: EcosystemEventBridgeHandle | null = null;

/**
 * Wire the in-process bus to a cross-process transport. Returns a
 * handle the host app holds for the lifetime of the process and closes
 * during shutdown. Throws when a bridge is already installed in this
 * process — install / close pairs are 1:1, never overlapped.
 */
export function installCrossProcessBridge(
  transport: EcosystemEventTransport,
): EcosystemEventBridgeHandle {
  if (activeBridge !== null) {
    throw new Error(
      "installCrossProcessBridge: a bridge is already installed in this process; close it before installing a replacement",
    );
  }
  const localInstanceId = getLocalInstanceId();
  const seenKeys = createBoundedKeyCache(IDEMPOTENCY_LRU_CAPACITY);
  let inboundCount = 0;
  let loopbackDropCount = 0;
  let duplicateDropCount = 0;

  const unsubscribeLocal = localSubscribe((event) => {
    if (event.originInstanceId !== localInstanceId) {
      return;
    }
    seenKeys.add(event.idempotencyKey);
    void transport.publish(event);
  });

  const unsubscribeTransport = transport.onEvent((event) => {
    inboundCount += 1;
    if (event.originInstanceId === localInstanceId) {
      loopbackDropCount += 1;
      return;
    }
    if (seenKeys.has(event.idempotencyKey)) {
      duplicateDropCount += 1;
      return;
    }
    seenKeys.add(event.idempotencyKey);
    dispatchEcosystemEvent(event);
  });

  const handle: EcosystemEventBridgeHandle = {
    async close(): Promise<void> {
      unsubscribeLocal();
      unsubscribeTransport();
      seenKeys.clear();
      await transport.close();
      activeBridge = null;
    },
    inboundCount(): number {
      return inboundCount;
    },
    loopbackDropCount(): number {
      return loopbackDropCount;
    },
    duplicateDropCount(): number {
      return duplicateDropCount;
    },
  };
  activeBridge = handle;
  return handle;
}

/**
 * Test-only handle exposing the active bridge for assertion-style
 * inspection. Returns `null` when no bridge is installed. Production
 * callers never need this — they hold the handle returned by
 * {@link installCrossProcessBridge} directly.
 */
export function getActiveBridgeForTests(): EcosystemEventBridgeHandle | null {
  return activeBridge;
}

/**
 * In-memory loopback transport. Two transports created from the same
 * {@link createInMemoryEcosystemTransportPair} factory deliver every
 * outbound event from one to the other's `onEvent` subscribers. Used
 * by tests to simulate two processes inside one Bun worker without a
 * broker. NOT for production use — there is no durability, no
 * cross-process visibility, and no flow control.
 */
export interface InMemoryEcosystemTransportPair {
  readonly a: EcosystemEventTransport;
  readonly b: EcosystemEventTransport;
}

export function createInMemoryEcosystemTransportPair(): InMemoryEcosystemTransportPair {
  const aSubscribers = new Set<(event: EcosystemContributionEvent) => void>();
  const bSubscribers = new Set<(event: EcosystemContributionEvent) => void>();

  const a: EcosystemEventTransport = {
    publish(event) {
      for (const subscriber of Array.from(bSubscribers)) {
        subscriber(event);
      }
    },
    onEvent(callback) {
      aSubscribers.add(callback);
      return () => {
        aSubscribers.delete(callback);
      };
    },
    close() {
      aSubscribers.clear();
    },
  };
  const b: EcosystemEventTransport = {
    publish(event) {
      for (const subscriber of Array.from(aSubscribers)) {
        subscriber(event);
      }
    },
    onEvent(callback) {
      bSubscribers.add(callback);
      return () => {
        bSubscribers.delete(callback);
      };
    },
    close() {
      bSubscribers.clear();
    },
  };
  return { a, b };
}

/**
 * Canonical JSON encoder for the ecosystem event wire format. Stable
 * field order so a broker that hashes or signs the payload sees a
 * deterministic shape. Optional scope fields are omitted (not
 * serialized as `null`) to match the in-process event shape under
 * `exactOptionalPropertyTypes`.
 */
export function encodeEcosystemEvent(event: EcosystemContributionEvent): string {
  const payload: Record<string, string> = {
    surface: event.surface,
    change: event.change,
    extensionId: event.extensionId,
    publishedAt: event.publishedAt,
    originInstanceId: event.originInstanceId,
    idempotencyKey: event.idempotencyKey,
  };
  if (event.tenantId !== undefined) {
    payload.tenantId = event.tenantId;
  }
  if (event.userId !== undefined) {
    payload.userId = event.userId;
  }
  if (event.originPeerId !== undefined) {
    payload.originPeerId = event.originPeerId;
  }
  return JSON.stringify(payload);
}

/**
 * Canonical JSON decoder. Returns `null` when the payload is malformed
 * (missing required fields, non-string types) so the transport adapter
 * can drop the message and increment its parse-error counter without
 * throwing.
 */
export function decodeEcosystemEvent(wire: string): EcosystemContributionEvent | null {
  const parsed = JSON.parse(wire);
  if (typeof parsed !== "object" || parsed === null) {
    return null;
  }
  if (
    !("surface" in parsed) ||
    !("change" in parsed) ||
    !("extensionId" in parsed) ||
    !("publishedAt" in parsed) ||
    !("originInstanceId" in parsed) ||
    !("idempotencyKey" in parsed)
  ) {
    return null;
  }
  const surface: unknown = parsed.surface;
  const change: unknown = parsed.change;
  const extensionId: unknown = parsed.extensionId;
  const publishedAt: unknown = parsed.publishedAt;
  const originInstanceId: unknown = parsed.originInstanceId;
  const idempotencyKey: unknown = parsed.idempotencyKey;
  if (
    typeof surface !== "string" ||
    typeof change !== "string" ||
    typeof extensionId !== "string" ||
    typeof publishedAt !== "string" ||
    typeof originInstanceId !== "string" ||
    typeof idempotencyKey !== "string"
  ) {
    return null;
  }
  const tenantId: unknown = "tenantId" in parsed ? parsed.tenantId : undefined;
  const userId: unknown = "userId" in parsed ? parsed.userId : undefined;
  const originPeerId: unknown = "originPeerId" in parsed ? parsed.originPeerId : undefined;
  if (tenantId !== undefined && typeof tenantId !== "string") {
    return null;
  }
  if (userId !== undefined && typeof userId !== "string") {
    return null;
  }
  if (originPeerId !== undefined && typeof originPeerId !== "string") {
    return null;
  }
  const narrowedSurface = narrowSurface(surface);
  const narrowedChange = narrowChange(change);
  if (narrowedSurface === null || narrowedChange === null) {
    return null;
  }
  return {
    surface: narrowedSurface,
    change: narrowedChange,
    extensionId,
    publishedAt,
    originInstanceId,
    idempotencyKey,
    ...(tenantId === undefined ? {} : { tenantId }),
    ...(userId === undefined ? {} : { userId }),
    ...(originPeerId === undefined ? {} : { originPeerId }),
  };
}

/**
 * Test-only — drop the active bridge handle without going through the
 * normal close flow. Used to recover from a failed install in a test
 * setup hook so the next test can install fresh.
 */
export function resetActiveBridgeForTests(): void {
  activeBridge = null;
}

/** Convenience export aligning with the other module surfaces. */
export { getLocalInstanceId, localPublish };
