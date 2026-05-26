/**
 * @baohaus/ecosystem-events-bao/peer-invalidation
 *
 * Canonical pure dispatcher consumed by every peer-aware consumer of the
 * cross-process ecosystem-events bridge (federation pull cache, federation
 * orchestrator refresh trigger, future peer-keyed subscribers).
 *
 * Decides per event whether the publisher's `originPeerId` resolves to a
 * known peer this consumer cares about, and routes the dispatch:
 *
 *   - **Known publisher peer-id** → invoke `onSurgical(originPeerId)`.
 *   - **Unknown or missing peer-id** → invoke `onFallback(peerId)` for
 *     every known peer if `onFallback` is provided; otherwise the event
 *     is dropped (consumer's policy is "skip rather than thrash").
 *
 * The two distinct semantics are required because:
 *   - The federation pull cache wants invalidate-all on unknown publishers
 *     so the next pull revalidates via etag and short-circuits to 304
 *     when state hasn't changed.
 *   - The federation orchestrator already runs a periodic refreshAll on
 *     a 30 s cadence; firing refreshAll on every unknown event would
 *     amplify the periodic load with no benefit, so it skips.
 *
 * @packageDocumentation
 */

/**
 * Minimal event shape this dispatcher reads. Matches the optional
 * `originPeerId` field on `EcosystemContributionEvent` so any future
 * peer-keyed envelope can flow through the same helper.
 */
export interface PeerKeyedEvent {
  readonly originPeerId?: string;
}

/**
 * Route a peer-keyed ecosystem event to the surgical sink when the
 * publisher's peer-id is known, otherwise fan out through the fallback
 * sink (when supplied) or drop the event.
 */
export function dispatchPeerEvent(
  event: PeerKeyedEvent,
  knownPeerIds: ReadonlySet<string>,
  onSurgical: (peerId: string) => void,
  onFallback?: (peerId: string) => void,
): void {
  const originPeerId = event.originPeerId;
  if (originPeerId !== undefined && knownPeerIds.has(originPeerId)) {
    onSurgical(originPeerId);
    return;
  }
  if (onFallback === undefined) {
    return;
  }
  for (const peerId of knownPeerIds) {
    onFallback(peerId);
  }
}
