/**
 * BaoControlPlane control-plane failure detection helpers.
 *
 * Extracts actionable classifications from `kubectl`/Kubernetes API errors so
 * BaoControlPlane tooling can surface deterministic recovery hints without duplicating
 * string-matching logic across scripts.
 *
 * @shared/utils/bao-control-plane-failure
 */

/**
 * Supported failure classifications for Kubernetes control-plane access.
 */
export type BaoControlPlaneControlPlaneFailureKind =
  | "auth"
  | "dns"
  | "network"
  | "timeout"
  | "tls"
  | "unreachable"
  | "unknown";

/**
 * Structured failure hint for Kubernetes control-plane diagnostics.
 */
export interface BaoControlPlaneControlPlaneFailureHint {
  /** Failure classification for recovery decisions. */
  kind: BaoControlPlaneControlPlaneFailureKind;
  /** Short message code describing the detected failure pattern. */
  message: string;
}

type FailurePattern = {
  kind: BaoControlPlaneControlPlaneFailureKind;
  message: string;
  tokens: string[];
};

const FAILURE_PATTERNS: FailurePattern[] = [
  {
    kind: "auth",
    message: "baoControlPlane.failure.kubernetes.auth",
    tokens: [
      "you must be logged in to the server",
      "unauthorized",
      "forbidden",
      "token is invalid",
      "no bearer token",
      "the server has asked for the client to provide credentials",
    ],
  },
  {
    kind: "tls",
    message: "baoControlPlane.failure.kubernetes.tls",
    tokens: [
      "x509:",
      "certificate signed by unknown authority",
      "tls handshake timeout",
      "tls: first record does not look like a tls handshake",
    ],
  },
  {
    kind: "dns",
    message: "baoControlPlane.failure.kubernetes.dns",
    tokens: ["no such host", "temporary failure in name resolution", "server misbehaving"],
  },
  {
    kind: "timeout",
    message: "baoControlPlane.failure.kubernetes.timeout",
    tokens: ["context deadline exceeded", "i/o timeout", "timed out", "deadline exceeded"],
  },
  {
    kind: "unreachable",
    message: "baoControlPlane.failure.kubernetes.unreachable",
    tokens: [
      "unable to connect to the server",
      "connection refused",
      "connection reset by peer",
      "no route to host",
    ],
  },
  {
    kind: "network",
    message: "baoControlPlane.failure.kubernetes.network",
    tokens: ["econnreset", "econnrefused", "enetunreach", "host is down"],
  },
];

/**
 * Detect common Kubernetes control-plane failure patterns.
 *
 * @param output - Raw stdout/stderr/log payload.
 * @returns Failure hint when a known pattern matches.
 */
export function detectBaoControlPlaneControlPlaneFailure(
  output: string,
): BaoControlPlaneControlPlaneFailureHint | null {
  const normalized = output.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  for (const pattern of FAILURE_PATTERNS) {
    if (pattern.tokens.some((token) => normalized.includes(token))) {
      return { kind: pattern.kind, message: pattern.message };
    }
  }

  return null;
}

/**
 * Determine whether a detected failure is likely recoverable via retry/backoff.
 *
 * @param hint - Detected failure hint.
 * @returns True when callers should retry.
 */
export function isRetryableBaoControlPlaneControlPlaneFailure(
  hint: BaoControlPlaneControlPlaneFailureHint | null,
): boolean {
  if (!hint) {
    return false;
  }
  return (
    hint.kind === "dns" ||
    hint.kind === "network" ||
    hint.kind === "timeout" ||
    hint.kind === "unreachable"
  );
}
