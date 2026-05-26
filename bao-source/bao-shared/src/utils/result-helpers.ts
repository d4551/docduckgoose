/**
 * Result helpers re-export.
 *
 * Previously a byte-identical parallel of `@baohaus/bao-utils/result-helpers`.
 * Now a thin re-export so `@shared/utils/result-helpers` consumers resolve to
 * the canonical bao-utils implementation. Single source of truth: bao-utils.
 *
 * @shared/utils/result-helpers
 */

export {
  mapAsyncResult,
  mapSyncResult,
  matchResult,
  type Result,
  type ResultFallback,
  resultOrDefault,
  resultOrThrow,
} from "@baohaus/bao-utils/result-helpers";
