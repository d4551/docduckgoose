/**
 * .bao Runtime shared policy constants.
 *
 * Centralizes runtime probe error classification/redaction policy and
 * runtime-specific baseline values so server + client surfaces do not drift.
 *
 * @shared/constants/bao-runtime
 */
/**
 * Minimum timeout accepted by .bao Runtime probes.
 */
export const BAO_RUNTIME_MIN_TIMEOUT_MS = 1;

/**
 * Minimum in-memory cache TTL accepted by BaoControlPlane runtime snapshots.
 */
export const BAO_RUNTIME_MIN_CACHE_TTL_MS = 0;

/**
 * Minimum Redis cache TTL (seconds) accepted by BaoControlPlane runtime snapshots.
 */
export const BAO_RUNTIME_MIN_CACHE_TTL_SECONDS = 1;

/**
 * Minimum timeout buffer accepted by BaoControlPlane runtime request guards.
 */
export const BAO_RUNTIME_MIN_TIMEOUT_BUFFER_MS = 0;

/**
 * Redis key prefix used for .bao Runtime snapshot entries.
 */
export const BAO_RUNTIME_CACHE_KEY_PREFIX: "bao-runtime" = "bao-runtime" as const;

/**
 * Redis pub/sub channel used to invalidate .bao Runtime snapshots.
 */
export const BAO_RUNTIME_CACHE_INVALIDATION_CHANNEL: "bao-runtime:invalidate" =
  "bao-runtime:invalidate" as const;

/**
 * Canonical fallback timestamp used by synthetic .bao Runtime snapshots.
 */
export const BAO_RUNTIME_FALLBACK_TIMESTAMP: "1970-01-01T00:00:00.000Z" =
  "1970-01-01T00:00:00.000Z" as const;

/**
 * Canonical runtime ensure/probe check names.
 *
 * Kube, namespace, and secrets checks are mandatory today.
 * Package/GitOps/BunBuddy/Registry checks are included for hard-cut migration.
 */
export const BAO_RUNTIME_CHECKS: {
  readonly kube: "kube";
  readonly namespace: "namespace";
  readonly package: "package";
  readonly gitops: "gitops";
  readonly bunbuddyFleet: "bunbuddyFleet";
  readonly registry: "registry";
  readonly secrets: "secrets";
} = {
  kube: "kube",
  namespace: "namespace",
  package: "package",
  gitops: "gitops",
  bunbuddyFleet: "bunbuddyFleet",
  registry: "registry",
  secrets: "secrets",
} as const;

/**
 * Ordered check list used by runtime ensure/probe flows.
 *
 * kube/namespace/secrets remain default, with migration-aware checks added.
 */
export const BAO_RUNTIME_CHECK_ORDER: readonly [
  "kube",
  "namespace",
  "secrets",
  "package",
  "gitops",
  "bunbuddyFleet",
  "registry",
] = [
  BAO_RUNTIME_CHECKS.kube,
  BAO_RUNTIME_CHECKS.namespace,
  BAO_RUNTIME_CHECKS.secrets,
  BAO_RUNTIME_CHECKS.package,
  BAO_RUNTIME_CHECKS.gitops,
  BAO_RUNTIME_CHECKS.bunbuddyFleet,
  BAO_RUNTIME_CHECKS.registry,
] as const;

/**
 * Union type for canonical runtime check names.
 */
export type BaoRuntimeCheckName = (typeof BAO_RUNTIME_CHECK_ORDER)[number];

/**
 * Canonical .bao Runtime probe error categories.
 */
export const BAO_RUNTIME_PROBE_ERROR_CATEGORIES: {
  readonly timeout: "probe_timeout";
  readonly unreachable: "probe_unreachable";
  readonly auth: "probe_auth";
  readonly tls: "probe_tls";
  readonly internal: "probe_internal";
} = {
  timeout: "probe_timeout",
  unreachable: "probe_unreachable",
  auth: "probe_auth",
  tls: "probe_tls",
  internal: "probe_internal",
} as const;

/**
 * Union type for .bao Runtime probe error categories.
 */
export type BaoRuntimeProbeErrorCategory =
  (typeof BAO_RUNTIME_PROBE_ERROR_CATEGORIES)[keyof typeof BAO_RUNTIME_PROBE_ERROR_CATEGORIES];

/**
 * Ordered classifier rules for probe error categorization.
 */
export const BAO_RUNTIME_PROBE_ERROR_CLASSIFIERS: ReadonlyArray<{
  /** Category emitted when one of the terms matches. */
  category: BaoRuntimeProbeErrorCategory;
  /** Case-insensitive terms evaluated against the error message. */
  terms: readonly string[];
}> = [
  {
    category: BAO_RUNTIME_PROBE_ERROR_CATEGORIES.timeout,
    terms: ["timeout", "abort"],
  },
  {
    category: BAO_RUNTIME_PROBE_ERROR_CATEGORIES.unreachable,
    terms: ["econnrefused", "enotfound"],
  },
  {
    category: BAO_RUNTIME_PROBE_ERROR_CATEGORIES.auth,
    terms: ["401", "403", "unauthorized"],
  },
  {
    category: BAO_RUNTIME_PROBE_ERROR_CATEGORIES.tls,
    terms: ["certificate", "tls", "ssl"],
  },
] as const;

/**
 * Redaction rule used before emitting runtime probe messages to clients/logs.
 */
export interface BaoRuntimeProbeRedactionRule {
  /** RegExp pattern to sanitize. */
  pattern: RegExp;
  /** Replacement text for sensitive segments. */
  replacement: string;
}

/**
 * Ordered redaction rules for BaoControlPlane runtime probe errors.
 */
export const BAO_RUNTIME_PROBE_REDACTION_RULES: readonly BaoRuntimeProbeRedactionRule[] = [
  { pattern: /Bearer\s+[A-Za-z0-9\-._~+/]+=*/g, replacement: "Bearer [REDACTED]" },
  { pattern: /https?:\/\/\d{1,3}(?:\.\d{1,3}){3}:\d+/g, replacement: "[CLUSTER_ENDPOINT]" },
  {
    pattern: /\/var\/run\/secrets\/kubernetes\.io\/[^\s"]*/g,
    replacement: "[SA_TOKEN_PATH]",
  },
  { pattern: /token=[A-Za-z0-9\-._~+/]+/g, replacement: "token=[REDACTED]" },
] as const;
