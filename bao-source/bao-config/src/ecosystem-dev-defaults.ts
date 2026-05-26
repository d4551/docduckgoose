/**
 * Canonical local-development ports and origins for the Baohaus ecosystem.
 *
 * Implementation paths must import from this module (or helpers that delegate here)
 * instead of repeating `http://localhost:…` literals. Production URLs remain env-driven
 * per app config seams.
 *
 * @packageDocumentation
 */

/** Ecosystem app identifiers with stable local dev ports. */
export type EcosystemDevServiceId =
  | "registry"
  | "forge"
  | "baoRuntime"
  | "baoAiGateway"
  | "commandBao"
  | "baoAgent"
  | "baoDesktop"
  | "fhir"
  | "ollama";

/** Default loopback host used for local dev origin composition. */
export const ECOSYSTEM_DEV_LOOPBACK_HOST = "127.0.0.1" as const;

/** Default localhost hostname alias for browser-facing dev origins. */
export const ECOSYSTEM_DEV_LOCALHOST_HOST = "localhost" as const;

/** Default HTTP port per ecosystem service in local development. */
export const ECOSYSTEM_DEV_PORTS: Readonly<Record<EcosystemDevServiceId, number>> = {
  registry: 3000,
  forge: 3002,
  baoRuntime: 3010,
  baoAiGateway: 11435,
  commandBao: 3080,
  baoAgent: 9741,
  baoDesktop: 1420,
  fhir: 8080,
  ollama: 11434,
};

/**
 * Build an `http://host:port` origin without a trailing slash.
 *
 * @param host - Loopback or localhost hostname.
 * @param port - TCP port for the service.
 */
export function buildEcosystemDevOrigin(host: string, port: number): string {
  return `http://${host}:${port}`;
}

/**
 * Default dev origin for a service using the canonical localhost hostname.
 *
 * @param serviceId - Ecosystem service identifier.
 */
export function ecosystemDevOrigin(serviceId: EcosystemDevServiceId): string {
  return buildEcosystemDevOrigin(ECOSYSTEM_DEV_LOCALHOST_HOST, ECOSYSTEM_DEV_PORTS[serviceId]);
}

/**
 * Default dev origin for a service using the loopback IP (127.0.0.1).
 *
 * @param serviceId - Ecosystem service identifier.
 */
export function ecosystemDevLoopbackOrigin(serviceId: EcosystemDevServiceId): string {
  return buildEcosystemDevOrigin(ECOSYSTEM_DEV_LOOPBACK_HOST, ECOSYSTEM_DEV_PORTS[serviceId]);
}

/** Default OpenAI-compatible base URL for the local Bao AI Gateway (`/v1` suffix). */
export const ECOSYSTEM_DEV_BAO_AI_GATEWAY_BASE_URL =
  `${ecosystemDevOrigin("baoAiGateway")}/v1` as const;

/**
 * Trusted local dev origins for cross-app SSO return navigation (localhost + loopback).
 * Includes registry, forge, and bao-runtime defaults.
 */
export const ECOSYSTEM_DEV_SSO_TRUSTED_ORIGINS: readonly string[] = [
  ecosystemDevOrigin("registry"),
  ecosystemDevLoopbackOrigin("registry"),
  ecosystemDevOrigin("forge"),
  ecosystemDevLoopbackOrigin("forge"),
  ecosystemDevOrigin("baoRuntime"),
  ecosystemDevLoopbackOrigin("baoRuntime"),
] as const;

/**
 * Trusted local dev origins for bao-runtime CORS / Better Auth trustedOrigins in dev.
 */
export const ECOSYSTEM_DEV_RUNTIME_TRUSTED_ORIGINS: readonly string[] =
  ECOSYSTEM_DEV_SSO_TRUSTED_ORIGINS;

/** OAuth redirect URI paths keyed by ecosystem service (local dev bootstrap only). */
export const ECOSYSTEM_DEV_OAUTH_CALLBACK_PATHS: Readonly<
  Record<"registry" | "forge" | "baoAiGateway" | "commandBao" | "baoAgent" | "fhir", string>
> = {
  registry: "/api/auth/callback/oidc",
  forge: "/oauth/callback",
  baoAiGateway: "/auth/callback",
  commandBao: "/api/auth/callback/oidc",
  baoAgent: "/auth/callback",
  fhir: "/fhir",
};

export type EcosystemDevOAuthServiceId = keyof typeof ECOSYSTEM_DEV_OAUTH_CALLBACK_PATHS;

/**
 * Default OAuth redirect URI for a service in local development.
 *
 * @param serviceId - OAuth client service identifier.
 * @param host - Optional host override (defaults to localhost).
 */
export function ecosystemDevOAuthRedirectUri(
  serviceId: EcosystemDevOAuthServiceId,
  host: string = ECOSYSTEM_DEV_LOCALHOST_HOST,
): string {
  const portByService: Readonly<Record<EcosystemDevOAuthServiceId, number>> = {
    registry: ECOSYSTEM_DEV_PORTS.registry,
    forge: ECOSYSTEM_DEV_PORTS.forge,
    baoAiGateway: ECOSYSTEM_DEV_PORTS.baoAiGateway,
    commandBao: ECOSYSTEM_DEV_PORTS.commandBao,
    baoAgent: ECOSYSTEM_DEV_PORTS.baoAgent,
    fhir: ECOSYSTEM_DEV_PORTS.fhir,
  };
  const path = ECOSYSTEM_DEV_OAUTH_CALLBACK_PATHS[serviceId];
  const port = portByService[serviceId];
  return `${buildEcosystemDevOrigin(host, port)}${path}`;
}
