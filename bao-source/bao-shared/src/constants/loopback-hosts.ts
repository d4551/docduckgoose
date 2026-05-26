/**
 * Canonical loopback host registry.
 *
 * @shared/constants/loopback-hosts
 */

/** Canonical loopback host order used for fallback resolution. */
export const LOOPBACK_HOST_PRIORITY: readonly [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "[::1]",
] = ["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"] as const;

/** Primary loopback hostname fallback (browser-friendly). */
export const LOOPBACK_FALLBACK_LOOPBACK_HOST: "localhost" = LOOPBACK_HOST_PRIORITY[0];

/** Secondary loopback fallback (socket-friendly). */
export const LOOPBACK_FALLBACK_HOST: "127.0.0.1" = LOOPBACK_HOST_PRIORITY[1];

/** Canonical loopback host set shared across server and client modules. */
const LOOPBACK_HOSTS_DEFAULT: Set<unknown> = new Set<string>(LOOPBACK_HOST_PRIORITY);

/** Hosts that bind to all interfaces (unbound). Used for normalizeHost fallback detection. */
export const UNBOUND_BINDING_HOSTS: Set<string> = new Set<string>(["0.0.0.0", "::"]);

/** Canonical bind-all-IPv4 host for server listen (default when DIMSUM_HOST etc. unset). */
export const BIND_ALL_IPV4: "0.0.0.0" = "0.0.0.0" as const;

/**
 * Determine whether a host belongs to the canonical loopback set.
 *
 * @param host - Hostname value.
 * @returns True when the host is loopback.
 */
export function isLoopbackHost(host: string): boolean {
  const normalized = host.trim().toLowerCase();
  return normalized ? LOOPBACK_HOSTS_DEFAULT.has(normalized) : false;
}
