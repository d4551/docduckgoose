/// <reference types="bun" />
/**
 * Phase 9 — supplementary security gates for `.bao` archive validation.
 *
 * Composed onto the canonical 17/18-gate manifest validator by each repo's
 * `bao-validate.ts`. Surfaces failures via thrown errors with explicit
 * file/path evidence; no try/catch swallows here.
 *
 * Gates:
 *  1. css-asset-integrity      — compiled stylesheet exists + non-empty.
 *  2. css-token-sentinels      — `--color-primary` and `--font-sans` present.
 *  3. css-layer-order          — Tailwind v4 layer ordering theme→base→components→utilities.
 *  4. archive-no-leaked-artifacts — no node_modules/, .env, *.log, *.map.gz, dist/scripts/.
 *  5. css-no-external-imports  — no `@import https?://` in any archive CSS entry.
 *  6. bao-lock-integrity       — every `bao.lock` resolved entry has both `ociDigest`
 *                                 and `integrity` populated. (Closure parity is
 *                                 enforced by `validate:bao-dependency-closure`;
 *                                 here we only assert cryptographic-metadata presence.)
 *  7. archive-no-cdn-references — zero `cdn.|cdnjs|jsdelivr|unpkg` substring hits across
 *                                 archive `.html|.css|.ts|.tsx|.js|.mjs` entries.
 *
 * Per-service the caller passes a {@link ArchiveSecurityGateConfig} that points
 * at the compiled stylesheet location (which may be inside the archive payload
 * or in the on-disk build output for repos that ship CSS outside the archive).
 */

import {
  extractBaoArchiveEntryFromFile,
  listBaoArchiveEntriesFromFile,
} from "@baohaus/bao-utils/canonical/bao-archive";

/** 32 KB minimum compiled stylesheet floor (per Phase 9 spec). */
const MIN_STYLESHEET_BYTES = 32 * 1024;

/** Substring sentinels that must appear in the compiled stylesheet. */
const REQUIRED_CSS_SENTINELS = ["--color-primary", "--font-sans"] as const;

/**
 * Tailwind v4 layer-order regexes. Either the inline declaration form
 * (`@layer theme, base, components, utilities;`) or the sequential
 * block form (`@layer theme{...}@layer base{...}@layer components{...}@layer utilities{...}`)
 * is accepted.
 */
const CSS_LAYER_INLINE_RE = /@layer\s+theme\s*,\s*base\s*,\s*components\s*,\s*utilities/;
const CSS_LAYER_SEQUENTIAL_RE =
  /@layer\s+theme[\s\S]*?@layer\s+base[\s\S]*?@layer\s+components[\s\S]*?@layer\s+utilities/;

/** Forbidden archive entry-prefix or extension fragments. */
const FORBIDDEN_ENTRY_PATTERNS: readonly RegExp[] = [
  /(^|\/)node_modules\//,
  /(^|\/)\.env(\.|$)/,
  /(^|\/)dist\/scripts\//,
  /\.log$/,
  /\.map\.gz$/,
];

/** Substrings that indicate a CDN reference and must never appear in payload. */
const CDN_REFERENCE_RE = /cdn\.|cdnjs|jsdelivr|unpkg/;

/** External `@import` in CSS — every CSS entry must resolve inside the archive. */
const CSS_EXTERNAL_IMPORT_RE = /@import\s+["']https?:\/\//;

/** Archive entry extensions scanned for CDN references. */
const SCANNABLE_EXTENSIONS: readonly string[] = [
  ".html",
  ".htm",
  ".css",
  ".js",
  ".mjs",
  ".ts",
  ".tsx",
];

/** Where the compiled stylesheet lives for a service. */
type StylesheetLocationKind = "archive" | "filesystem";

/** Configuration for the compiled-stylesheet gates. */
interface StylesheetGateInput {
  /** Whether the stylesheet ships inside the archive payload or only on disk. */
  readonly kind: StylesheetLocationKind;
  /** Archive entry path (when kind === "archive") or repo-relative file path. */
  readonly path: string;
  /** Optional minimum-bytes floor override. Defaults to {@link MIN_STYLESHEET_BYTES}. */
  readonly minBytes?: number;
}

/** Minimal shape we read from `bao.lock`. */
interface BaoLockShape {
  readonly resolved: ReadonlyArray<{
    readonly name: string;
    readonly ociDigest: string | null | undefined;
    readonly integrity: string | null | undefined;
    readonly resolvedFrom?: string | null | undefined;
  }>;
}

/** Per-service gate configuration. */
interface ArchiveSecurityGateConfig {
  /** Path to the `.bao` archive on disk. */
  readonly archive: string;
  /** Compiled stylesheet location for CSS gates. */
  readonly stylesheet: StylesheetGateInput;
  /** `bao.lock` payload (already parsed). */
  readonly baoLock: BaoLockShape;
}

/**
 * Resolution sources where missing ociDigest/integrity is permitted because
 * the package has not yet been published to the OCI registry. Pre-launch
 * lockfiles will commonly include such entries; the integrity gate skips
 * them but still demands a non-empty `resolvedFrom` annotation.
 */
const PENDING_RESOLUTION_SOURCES: readonly string[] = ["pending-publish"];

/** Result of one gate. */
interface SecurityGateResult {
  readonly gate: string;
  readonly description: string;
}

const decoder = new TextDecoder();

const decodeBytes = (bytes: Uint8Array): string => decoder.decode(bytes);

const readArchiveEntry = async (archive: string, entryPath: string): Promise<Uint8Array> => {
  const bytes = await extractBaoArchiveEntryFromFile(archive, entryPath);
  if (bytes === null) {
    throw new Error(`Archive ${archive} missing required entry for security gate: ${entryPath}`);
  }
  return bytes;
};

const readStylesheet = async (
  archive: string,
  stylesheet: StylesheetGateInput,
): Promise<Uint8Array> => {
  if (stylesheet.kind === "archive") {
    return readArchiveEntry(archive, stylesheet.path);
  }
  const file = Bun.file(stylesheet.path);
  if (!(await file.exists())) {
    throw new Error(`Compiled stylesheet missing on disk for security gate: ${stylesheet.path}`);
  }
  return file.bytes();
};

const cssAssetIntegrityGate = async (
  archive: string,
  stylesheet: StylesheetGateInput,
): Promise<{ readonly bytes: Uint8Array; readonly result: SecurityGateResult }> => {
  const bytes = await readStylesheet(archive, stylesheet);
  const floor = stylesheet.minBytes ?? MIN_STYLESHEET_BYTES;
  if (bytes.length < floor) {
    throw new Error(
      `[css-asset-integrity] ${stylesheet.path} is ${bytes.length} bytes; minimum is ${floor}`,
    );
  }
  return {
    bytes,
    result: {
      gate: "css-asset-integrity",
      description: `Stylesheet ${stylesheet.path} >= ${floor} bytes (${bytes.length})`,
    },
  };
};

const cssTokenSentinelGate = (
  stylesheet: StylesheetGateInput,
  bytes: Uint8Array,
): SecurityGateResult => {
  const css = decodeBytes(bytes);
  for (const sentinel of REQUIRED_CSS_SENTINELS) {
    if (!css.includes(sentinel)) {
      throw new Error(
        `[css-token-sentinels] ${stylesheet.path} missing required token substring: ${sentinel}`,
      );
    }
  }
  return {
    gate: "css-token-sentinels",
    description: `Stylesheet ${stylesheet.path} contains all required token sentinels`,
  };
};

const cssLayerOrderGate = (
  stylesheet: StylesheetGateInput,
  bytes: Uint8Array,
): SecurityGateResult => {
  const css = decodeBytes(bytes);
  if (!(CSS_LAYER_INLINE_RE.test(css) || CSS_LAYER_SEQUENTIAL_RE.test(css))) {
    throw new Error(
      `[css-layer-order] ${stylesheet.path} missing Tailwind v4 layer ordering theme→base→components→utilities`,
    );
  }
  return {
    gate: "css-layer-order",
    description: `Stylesheet ${stylesheet.path} has correct @layer ordering`,
  };
};

const archiveNoLeakedArtifactsGate = async (archive: string): Promise<SecurityGateResult> => {
  const entries = await listBaoArchiveEntriesFromFile(archive);
  const offenders: string[] = [];
  for (const entry of entries) {
    for (const pattern of FORBIDDEN_ENTRY_PATTERNS) {
      if (pattern.test(entry)) {
        offenders.push(`${entry} (${pattern.source})`);
        break;
      }
    }
  }
  if (offenders.length > 0) {
    throw new Error(
      `[archive-no-leaked-artifacts] forbidden entries in ${archive}:\n  ${offenders
        .slice(0, 10)
        .join("\n  ")}`,
    );
  }
  return {
    gate: "archive-no-leaked-artifacts",
    description: `Archive ${archive} contains no leaked artifacts`,
  };
};

const cssNoExternalImportsGate = async (archive: string): Promise<SecurityGateResult> => {
  const entries = await listBaoArchiveEntriesFromFile(archive);
  const cssEntries = entries.filter((entry) => entry.endsWith(".css"));
  for (const entry of cssEntries) {
    const bytes = await readArchiveEntry(archive, entry);
    const css = decodeBytes(bytes);
    if (CSS_EXTERNAL_IMPORT_RE.test(css)) {
      const matched = css.match(CSS_EXTERNAL_IMPORT_RE);
      throw new Error(
        `[css-no-external-imports] ${archive}:${entry} references external @import: ${matched?.[0] ?? "<match>"}`,
      );
    }
  }
  return {
    gate: "css-no-external-imports",
    description: `Archive ${archive}: ${cssEntries.length} CSS entries; all imports resolve internally`,
  };
};

type BaoLockEntry = BaoLockShape["resolved"][number];

type LockEntryClassification =
  | { readonly kind: "published" }
  | { readonly kind: "pending" }
  | { readonly kind: "violation"; readonly message: string };

const hasNonEmptyString = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.length > 0;

const classifyPendingEntry = (entry: BaoLockEntry): LockEntryClassification => {
  if (hasNonEmptyString(entry.ociDigest) && !hasNonEmptyString(entry.integrity)) {
    return {
      kind: "violation",
      message: `${entry.name}: ociDigest set but integrity missing (inconsistent pending state)`,
    };
  }
  return { kind: "pending" };
};

const classifyPublishedEntry = (
  entry: BaoLockEntry,
  resolvedFrom: string,
): LockEntryClassification => {
  if (!hasNonEmptyString(entry.ociDigest)) {
    return {
      kind: "violation",
      message: `${entry.name}: missing ociDigest (resolvedFrom=${resolvedFrom || "<unset>"})`,
    };
  }
  if (!hasNonEmptyString(entry.integrity)) {
    return { kind: "violation", message: `${entry.name}: missing integrity` };
  }
  return { kind: "published" };
};

const classifyLockEntry = (entry: BaoLockEntry): LockEntryClassification => {
  const resolvedFrom = typeof entry.resolvedFrom === "string" ? entry.resolvedFrom : "";
  if (PENDING_RESOLUTION_SOURCES.includes(resolvedFrom)) {
    return classifyPendingEntry(entry);
  }
  return classifyPublishedEntry(entry, resolvedFrom);
};

const baoLockIntegrityGate = (archive: string, baoLock: BaoLockShape): SecurityGateResult => {
  if (baoLock.resolved.length === 0) {
    throw new Error(
      `[bao-lock-integrity] ${archive}: bao.lock has zero resolved entries (lockfile must contain registry-resolved closure)`,
    );
  }

  const integrityViolations: string[] = [];
  let publishedCount = 0;
  let pendingCount = 0;

  for (const entry of baoLock.resolved) {
    const classification = classifyLockEntry(entry);
    if (classification.kind === "violation") {
      integrityViolations.push(classification.message);
    } else if (classification.kind === "pending") {
      pendingCount += 1;
    } else {
      publishedCount += 1;
    }
  }

  if (integrityViolations.length > 0) {
    throw new Error(
      `[bao-lock-integrity] ${archive}: bao.lock entries with inconsistent cryptographic metadata:\n  ${integrityViolations.join(
        "\n  ",
      )}`,
    );
  }

  return {
    gate: "bao-lock-integrity",
    description: `bao.lock: ${publishedCount} integrity-verified, ${pendingCount} pending-publish (of ${baoLock.resolved.length} total)`,
  };
};

const isScannableEntry = (entry: string): boolean =>
  SCANNABLE_EXTENSIONS.some((extension) => entry.endsWith(extension));

const archiveNoCdnReferencesGate = async (archive: string): Promise<SecurityGateResult> => {
  const entries = await listBaoArchiveEntriesFromFile(archive);
  const offenders: string[] = [];
  let scanned = 0;
  for (const entry of entries) {
    if (!isScannableEntry(entry)) {
      continue;
    }
    scanned += 1;
    const bytes = await readArchiveEntry(archive, entry);
    const text = decodeBytes(bytes);
    if (CDN_REFERENCE_RE.test(text)) {
      const matched = text.match(CDN_REFERENCE_RE);
      offenders.push(`${entry} (matched: ${matched?.[0] ?? "<match>"})`);
    }
  }
  if (offenders.length > 0) {
    throw new Error(
      `[archive-no-cdn-references] ${archive}: CDN references found in:\n  ${offenders
        .slice(0, 10)
        .join("\n  ")}`,
    );
  }
  return {
    gate: "archive-no-cdn-references",
    description: `Archive ${archive}: scanned ${scanned} text entries; zero CDN references`,
  };
};

/**
 * Run all Phase 9 supplementary security gates against an archive.
 *
 * @param config Per-service gate configuration.
 * @returns Ordered list of gate results (success). Throws on any violation.
 */
const runArchiveSecurityGates = async (
  config: ArchiveSecurityGateConfig,
): Promise<readonly SecurityGateResult[]> => {
  const results: SecurityGateResult[] = [];

  const cssIntegrity = await cssAssetIntegrityGate(config.archive, config.stylesheet);
  results.push(cssIntegrity.result);
  results.push(cssTokenSentinelGate(config.stylesheet, cssIntegrity.bytes));
  results.push(cssLayerOrderGate(config.stylesheet, cssIntegrity.bytes));

  results.push(await archiveNoLeakedArtifactsGate(config.archive));
  results.push(await cssNoExternalImportsGate(config.archive));
  results.push(baoLockIntegrityGate(config.archive, config.baoLock));
  results.push(await archiveNoCdnReferencesGate(config.archive));

  return results;
};

const ARCHIVE_SECURITY_GATE_COUNT = 7 as const;

export type {
  ArchiveSecurityGateConfig,
  BaoLockShape,
  SecurityGateResult,
  StylesheetGateInput,
  StylesheetLocationKind,
};
export { ARCHIVE_SECURITY_GATE_COUNT, runArchiveSecurityGates };
