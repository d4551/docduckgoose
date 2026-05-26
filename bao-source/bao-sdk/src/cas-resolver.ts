/**
 * Content-addressed storage resolver contract.
 *
 * SDK-level interface every Baohaus consumer (bao-agent CLI, bao-runtime
 * orchestrator, forge git server, .bao AI Gateway model loader) implements when it
 * needs to materialize a `.bao` archive identified by sha256 digest.
 *
 * Concrete implementations live in their respective consumer:
 *   - bao-runtime: `@baohaus/blobao` CAS bridge (local / s3 / azure / seaweedfs)
 *   - bao-agent: filesystem cache + registry HTTP fallback
 *   - forge: git-LFS object store
 *   - .bao AI Gateway: model artifact CAS
 *
 * No throwing — all methods return result envelopes.
 *
 * @module @baohaus/bao-sdk/cas-resolver
 */

/** sha256 digest in canonical `sha256:<64-hex>` form. */
export type BaoArchiveDigest = `sha256:${string}`;

/** Resolved archive — caller MUST invoke `cleanup()` after use. */
export interface BaoResolvedArchive {
  readonly digest: BaoArchiveDigest;
  readonly archivePath: string;
  readonly sizeBytes: number;
  readonly cleanup: () => Promise<void>;
}

/** Resolution result envelope — no thrown errors. */
export type BaoCasResolveResult =
  | { readonly ok: true; readonly archive: BaoResolvedArchive }
  | { readonly ok: false; readonly reason: string };

/** Resolution arguments. */
export interface BaoCasResolveArgs {
  readonly digest: BaoArchiveDigest;
  readonly contentType?: string;
  readonly fileName?: string;
}

/**
 * Content-addressed `.bao` archive resolver.
 *
 * Implementations MUST verify the materialized payload's sha256 against the
 * requested digest before returning `ok: true`.
 */
export interface BaoCasResolver {
  resolve(args: BaoCasResolveArgs): Promise<BaoCasResolveResult>;
}

/**
 * Type-guard for canonical sha256 digest format.
 */
export function isBaoArchiveDigest(value: string): value is BaoArchiveDigest {
  return /^sha256:[a-f0-9]{64}$/u.test(value);
}
