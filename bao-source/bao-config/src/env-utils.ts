/**
 * Environment variable utility functions for the bao config layer.
 *
 * First-party home for env resolution helpers consumed by generated BunBuddy
 * servers and bao ecosystem tooling. All reads route through bao-config's own
 * env module so no external runtime deps are required.
 *
 * @packageDocumentation
 */

import { readEnvStringOrNull } from "./env";

/**
 * Resolve the first non-empty string value from an ordered list of environment
 * variable keys.
 *
 * Iterates `envKeys` in order and returns the first trimmed non-empty value
 * found. Falls back to `fallback` when none of the keys resolve to a non-empty
 * string.
 *
 * @param envKeys - Ordered list of environment variable keys to check.
 * @param fallback - Value returned when no key resolves.
 * @returns First non-empty resolved value, or `fallback`.
 *
 * @example
 * ```ts
 * import { resolveFirstEnvString } from '@baohaus/bao-config/env-utils';
 *
 * const port = resolveFirstEnvString(['PORT', 'HTTP_PORT'], '3000');
 * ```
 */
function resolveFirstEnvString(envKeys: readonly string[], fallback: string): string {
  for (const key of envKeys) {
    const raw = readEnvStringOrNull(key);
    if (raw !== null) {
      const trimmed = raw.trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }
  return fallback;
}

export { resolveFirstEnvString };
