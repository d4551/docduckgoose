/**
 * Canonical cross-app deep-link URL builders.
 *
 * Each app in the Baohaus ecosystem (registry, forge, bao-runtime, Bao AI
 * Gateway, bao-agent web chat) owns its own route-constants module. This module
 * composes a peer-app origin (resolved by the consuming app's config seam
 * — never by reading env here) with the peer's canonical route, producing
 * absolute URLs suitable for cross-origin anchors.
 *
 * Single allowlisted seam for peer-origin URL composition. Implementation
 * paths must NOT concatenate `https://...bao.haus/...` strings inline; the
 * `ui-no-peer-origin-literals` validator gates regressions.
 *
 * @packageDocumentation
 */

/**
 * Absolute origin (`scheme://host[:port]`) of a peer Baohaus app, or `null`
 * when the consuming app has not configured the peer.
 *
 * Consumers pass the value resolved by their own config seam (e.g.
 * `bao-runtime/src/platform/config/ecosystem-links.config.ts` reads the
 * `BAO_RUNTIME_REGISTRY_ORIGIN` env var and returns `null` on missing /
 * unsafe schemes). This module never touches env.
 */
export type PeerOrigin = string | null;

/** Composed peer URL, or `null` when the origin is unconfigured. */
export type PeerUrl = string | null;

/**
 * Strip a trailing slash from an origin so path concatenation produces
 * `origin + path` exactly (without `//` collisions).
 *
 * @param origin - Resolved peer origin, e.g. `https://registry.bao.haus/`.
 * @returns Origin with at most one trailing slash removed.
 */
function normaliseOrigin(origin: string): string {
  return origin.endsWith("/") ? origin.slice(0, -1) : origin;
}

/**
 * Compose a peer URL from a resolved origin and a path that already begins
 * with `/`. Returns `null` when the origin is `null` (peer unconfigured).
 *
 * @param origin - Resolved peer origin or `null`.
 * @param path - Path with leading slash (canonical from the peer's route-constants module).
 * @returns Absolute URL, or `null` when the peer is unconfigured.
 */
function composePeerUrl(origin: PeerOrigin, path: string): PeerUrl {
  if (origin === null) {
    return null;
  }
  return `${normaliseOrigin(origin)}${path}`;
}

/**
 * Build a registry package-detail URL.
 *
 * @param registryOrigin - Resolved registry origin (from the consuming app's config seam).
 * @param namespace - Package namespace slug.
 * @param name - Package name slug.
 * @returns Absolute URL or `null` when registry origin is unconfigured.
 */
export function buildRegistryPackageUrl(
  registryOrigin: PeerOrigin,
  namespace: string,
  name: string,
): PeerUrl {
  return composePeerUrl(
    registryOrigin,
    `/packages/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
}

/**
 * Build a registry package-release URL.
 *
 * @param registryOrigin - Resolved registry origin.
 * @param namespace - Package namespace slug.
 * @param name - Package name slug.
 * @param version - Semver version string.
 * @returns Absolute URL or `null` when registry origin is unconfigured.
 */
export function buildRegistryPackageReleaseUrl(
  registryOrigin: PeerOrigin,
  namespace: string,
  name: string,
  version: string,
): PeerUrl {
  return composePeerUrl(
    registryOrigin,
    `/packages/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/v/${encodeURIComponent(version)}`,
  );
}

/**
 * Build a forge repository-detail URL.
 *
 * @param forgeOrigin - Resolved forge origin.
 * @param namespace - Forge namespace slug.
 * @param slug - Forge repository slug.
 * @returns Absolute URL or `null` when forge origin is unconfigured.
 */
export function buildForgeRepoUrl(
  forgeOrigin: PeerOrigin,
  namespace: string,
  slug: string,
): PeerUrl {
  return composePeerUrl(
    forgeOrigin,
    `/repos/${encodeURIComponent(namespace)}/${encodeURIComponent(slug)}`,
  );
}

/**
 * Build a deep link into the bao-runtime admin surface.
 *
 * @param runtimeOrigin - Resolved bao-runtime origin.
 * @param path - Canonical bao-runtime path beginning with `/` (sourced from `@baohaus/bao-config/htmx-routes` `HTMX_ROUTES`).
 * @returns Absolute URL or `null` when runtime origin is unconfigured.
 */
export function buildRuntimeAdminUrl(runtimeOrigin: PeerOrigin, path: string): PeerUrl {
  if (!path.startsWith("/")) {
    return null;
  }
  return composePeerUrl(runtimeOrigin, path);
}

/**
 * Build a deep link into the Bao AI Gateway admin surface.
 *
 * @param baoAiGatewayOrigin - Resolved Bao AI Gateway origin.
 * @param path - Path under the gateway `/admin/ui/...` surface, beginning with `/`.
 * @returns Absolute URL or `null` when the gateway origin is unconfigured.
 */
export function buildBaoAiGatewayAdminUrl(baoAiGatewayOrigin: PeerOrigin, path: string): PeerUrl {
  if (!path.startsWith("/")) {
    return null;
  }
  return composePeerUrl(baoAiGatewayOrigin, path);
}

/**
 * Build a Bao AI Gateway provider-upstream admin URL.
 *
 * @param baoAiGatewayOrigin - Resolved Bao AI Gateway origin.
 * @param providerKey - Provider key selected in bao-runtime.
 * @returns Absolute URL or `null` when the gateway origin is unconfigured.
 */
export function buildBaoAiGatewayProviderUpstreamUrl(
  baoAiGatewayOrigin: PeerOrigin,
  providerKey: string,
): PeerUrl {
  return buildBaoAiGatewayAdminUrl(
    baoAiGatewayOrigin,
    `/admin/ui/upstreams?provider=${encodeURIComponent(providerKey)}`,
  );
}

/**
 * Build a deep link into the bao-runtime web chat session.
 *
 * @param runtimeOrigin - Resolved bao-runtime origin.
 * @param sessionId - Optional chat session identifier; when omitted, links to the chat session list (`/chat`).
 * @returns Absolute URL or `null` when runtime origin is unconfigured.
 */
export function buildBaoAgentChatUrl(runtimeOrigin: PeerOrigin, sessionId?: string): PeerUrl {
  return composePeerUrl(
    runtimeOrigin,
    typeof sessionId === "string" && sessionId.length > 0
      ? `/chat/${encodeURIComponent(sessionId)}`
      : "/chat",
  );
}

/**
 * Build a peer-app whoami probe URL. Consumed by the cross-app
 * session-indicator partial in `@baohaus/happydumpling/server/partials/ecosystem-session-indicator`.
 *
 * @param origin - Resolved peer origin.
 * @returns Absolute whoami URL or `null` when origin is unconfigured.
 */
export function buildPeerWhoamiUrl(origin: PeerOrigin): PeerUrl {
  return composePeerUrl(origin, "/api/v1/account/whoami");
}

/**
 * Build a peer-app sign-in URL. Composed for the anonymous branch of the
 * cross-app session-indicator partial so an unauthenticated chip links the
 * user to the peer's sign-in flow (SSO when the cookie domain is shared).
 *
 * @param origin - Resolved peer origin.
 * @returns Absolute sign-in URL or `null` when origin is unconfigured.
 */
export function buildPeerSignInUrl(origin: PeerOrigin): PeerUrl {
  return composePeerUrl(origin, "/sign-in");
}
