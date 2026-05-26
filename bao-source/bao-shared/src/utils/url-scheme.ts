/**
 * URL scheme normalization utilities.
 *
 * Single source of truth for ensuring host/origin strings have an explicit
 * protocol scheme. Used by server env resolution, scripts, and infra config.
 *
 * @packageDocumentation
 */

const URL_SCHEME_RE: RegExp = /^[a-z][a-z0-9+.-]*:\/\//i;

/**
 * Ensure a candidate URL/host string has an explicit protocol scheme.
 *
 * If the string already has a scheme (e.g. `https://example.com`), it is
 * returned trimmed. Otherwise, the default protocol is prepended (e.g.
 * `localhost:3010` → `http://localhost:3010`).
 *
 * @param candidate - Raw URL, origin, or host:port string.
 * @param defaultProtocol - Protocol when missing (default `http`).
 * @returns Normalized string with scheme.
 */
export function ensureUrlWithScheme(candidate: string, defaultProtocol = "http"): string {
  const trimmed = String(candidate ?? "").trim();
  if (!trimmed) {
    return trimmed;
  }
  const hasScheme = URL_SCHEME_RE.test(trimmed);
  return hasScheme ? trimmed : `${defaultProtocol}://${trimmed}`;
}
