/**
 * Canonical Result-shaped URI decoder.
 *
 * Wraps `decodeURIComponent` so callers never throw on malformed escape
 * sequences. Iteratively unescapes nested encodings (up to 3 passes) so
 * double-encoded inputs decode fully, but refuses to loop indefinitely.
 *
 * Returns `null` for any URIError (malformed `%xx`) — the caller treats null
 * as a hard reject (e.g. path-traversal guards in static-file servers).
 *
 * Pure helper; safe to call from any runtime. No try/catch escapes — uses the
 * canonical `toResultSync` wrapper from `@baohaus/bao-utils/async-result`.
 *
 * @baohaus/bao-utils/safe-decode-uri
 */

import { toResultSync } from "./async-result";

const PERCENT_ESCAPE = /%[0-9a-fA-F]{2}/;

/**
 * Iteratively decodes a URI-component-encoded string until no further `%xx`
 * sequences remain (cap: 3 passes). Returns `null` for malformed encodings.
 *
 * @param input Possibly URI-encoded string.
 * @returns Fully decoded string, or `null` when the input is malformed.
 */
export const safeDecodeUri = (input: string): string | null => {
  let current = input;
  for (let pass = 0; pass < 3; pass += 1) {
    if (!PERCENT_ESCAPE.test(current)) {
      return current;
    }
    const decoded = toResultSync(() => decodeURIComponent(current));
    if (!decoded.ok) {
      return null;
    }
    if (decoded.value === current) {
      return current;
    }
    current = decoded.value;
  }
  return current;
};
