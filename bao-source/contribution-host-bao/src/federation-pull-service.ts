/**
 * Per-host federation pull singleton factory.
 *
 * Hoists the duplicated forge/registry/gateway/runtime peer-pull wiring into
 * one implementation: orchestrator + HMAC bearer fetch + ecosystem bus
 * invalidation. Each app supplies `localPeerId`, peer origin resolvers, and
 * an HMAC secret seam (no direct env reads here).
 *
 * @packageDocumentation
 */

import { dispatchPeerEvent } from "@baohaus/ecosystem-events-bao/peer-invalidation";
import { ecosystemEventBus } from "@baohaus/ecosystem-events-bao/service";
import type { EcosystemContributionEvent } from "@baohaus/ecosystem-events-bao/types";
import {
  createFederationPullOrchestrator,
  type FederationPullFetchImpl,
  type FederationPullOrchestrator,
  type FederationPullPeerEndpoint,
  type MergedFederatedSurfaces,
  mergeFederatedSnapshots,
} from "./federation-pull.ts";
import { mintFederationServiceToken } from "./federation-service-token.ts";

export interface FederationPullPeerOriginResolver {
  readonly peerId: string;
  readonly resolveOrigin: () => string | null;
}

export interface CreateEcosystemFederationPullServiceOptions {
  readonly localPeerId: string;
  readonly peerOriginResolvers: readonly FederationPullPeerOriginResolver[];
  readonly resolveHmacSecret: () => string;
}

export interface EcosystemFederationPullService {
  readonly localPeerId: string;
  loadFederatedSurfaces(): Promise<MergedFederatedSurfaces>;
  shutdown(): void;
  configureFetchImplForTests(impl: FederationPullFetchImpl | null): void;
}

interface FederationPullServiceState {
  readonly orchestrator: FederationPullOrchestrator;
  readonly unsubscribe: () => void;
}

function buildPeerEndpoints(
  resolvers: readonly FederationPullPeerOriginResolver[],
): readonly FederationPullPeerEndpoint[] {
  const out: FederationPullPeerEndpoint[] = [];
  for (const entry of resolvers) {
    const origin = entry.resolveOrigin();
    if (origin !== null && origin.length > 0) {
      out.push({ peerId: entry.peerId, origin });
    }
  }
  return out;
}

function resolvePeerAudienceForUrl(
  url: string,
  resolvers: readonly FederationPullPeerOriginResolver[],
): string | null {
  for (const entry of resolvers) {
    const origin = entry.resolveOrigin();
    if (origin !== null && origin.length > 0 && url.startsWith(origin)) {
      return entry.peerId;
    }
  }
  return null;
}

export function createEcosystemFederationPullService(
  options: CreateEcosystemFederationPullServiceOptions,
): EcosystemFederationPullService {
  const { localPeerId, peerOriginResolvers, resolveHmacSecret } = options;
  let state: FederationPullServiceState | null = null;
  let fetchImplForTests: FederationPullFetchImpl | null = null;

  const federationPullFetch: FederationPullFetchImpl = async (input, init) => {
    const downstream = fetchImplForTests ?? fetch;
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const audience = resolvePeerAudienceForUrl(url, peerOriginResolvers);
    if (audience === null) {
      return downstream(input, init);
    }
    const secret = resolveHmacSecret();
    if (secret.length === 0) {
      return downstream(input, init);
    }
    const token = await mintFederationServiceToken({
      audiencePeerId: audience,
      issuerPeerId: localPeerId,
      secret,
    });
    if (token === null) {
      return downstream(input, init);
    }
    const headers = new Headers(init?.headers);
    headers.set("authorization", `Bearer ${token}`);
    return downstream(input, { ...init, headers });
  };

  const buildState = (): FederationPullServiceState => {
    const orchestrator = createFederationPullOrchestrator({
      fetchImpl: federationPullFetch,
    });
    const knownPeerIds = new Set(peerOriginResolvers.map((entry) => entry.peerId));
    const invalidate = (peerId: string): void => {
      orchestrator.invalidate(peerId);
    };
    const unsubscribe = ecosystemEventBus.subscribe((event: EcosystemContributionEvent) => {
      dispatchPeerEvent(event, knownPeerIds, invalidate, invalidate);
    });
    return { orchestrator, unsubscribe };
  };

  const ensureState = (): FederationPullServiceState => {
    if (state === null) {
      state = buildState();
    }
    return state;
  };

  return {
    localPeerId,
    async loadFederatedSurfaces(): Promise<MergedFederatedSurfaces> {
      const { orchestrator } = ensureState();
      const peerResults = await orchestrator.pullAll(buildPeerEndpoints(peerOriginResolvers));
      const peerSnapshots = peerResults
        .map((result) => {
          if (result.kind === "ok" || result.kind === "not-modified") {
            return result.snapshot;
          }
          return null;
        })
        .filter((snapshot) => snapshot !== null);
      return mergeFederatedSnapshots(peerSnapshots);
    },
    shutdown(): void {
      if (state === null) {
        return;
      }
      state.unsubscribe();
      state.orchestrator.invalidateAll();
      state = null;
    },
    configureFetchImplForTests(impl: FederationPullFetchImpl | null): void {
      fetchImplForTests = impl;
      if (state !== null) {
        state.unsubscribe();
        state.orchestrator.invalidateAll();
        state = null;
      }
    },
  };
}
