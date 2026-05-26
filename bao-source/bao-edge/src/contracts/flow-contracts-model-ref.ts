import type { ModelRefValidationPolicy, ModelSource } from "./flow-contracts-1";
import { createFlowCapabilityError } from "./flow-contracts-errors";

/** Canonical reason when a model reference fails normalization. */
export const MODEL_REFERENCE_INVALID_REASON = "Invalid model reference.";

/** Default model-ref policy when source metadata is intentionally omitted by caller context. */
const DEFAULT_OPAQUE_MODEL_REF_POLICY: ModelRefValidationPolicy = { mode: "opaque" };
const MODEL_REF_PATH_PART_COUNT = 2 as const;
const MODEL_REF_WWW_PREFIX = "www." as const;
const MODEL_REF_HTTP_PROTOCOL = "http://" as const;
const MODEL_REF_HTTPS_PROTOCOL = "https://" as const;
const MODEL_REF_INVALID_CHARACTERS_RE = /\r|\n|\0/u;
const MODEL_REF_TOKEN_RE = /^[a-zA-Z0-9][\w.-]{0,127}$/u;
const MODEL_REF_PATHNAME_PREFIX_RE = /^\/+/u;
const MODEL_REF_EMPTY_REASON = "Model reference is empty.";
const MODEL_REF_INVALID_CHARACTERS_REASON = "Model reference contains invalid characters.";
const MODEL_REF_SPACES_REASON = "Model reference must not contain spaces.";
const MODEL_REF_CANONICAL_HOST_REQUIRED_REASON =
  "Model reference validation requires a canonical host for this source mode.";
const MODEL_REF_URL_PARSE_REASON = "Could not parse model URL.";
const MODEL_REF_QUERY_FRAGMENT_REASON = "Model reference must not include query or fragment.";
const MODEL_REF_OWNER_REPO_REASON =
  "Model reference must include owner and repo (for example owner/repo).";
const MODEL_REF_OWNER_REPO_FORMAT_REASON = "Model reference must match owner/repo format.";

/** Normalize a raw model ref to a source-specific canonical format, typically `host/owner/repo`. */
export function normalizeModelRef(
  input: string,
  source: ModelSource,
  policy?: ModelRefValidationPolicy,
): string {
  const normalized = validateModelRefWithSource(input, source, policy);
  if (!(normalized.ok && normalized.normalized)) {
    throw createFlowCapabilityError({
      commandIndex: -1,
      command: "modelRef",
      reason: normalized.reason ?? MODEL_REFERENCE_INVALID_REASON,
      retryable: false,
      surface: "model_pull",
      resource: input,
    });
  }
  return normalized.normalized;
}

/** Validate model refs in a non-throwing way for callers needing pre-validation. */
export function validateModelRef(input: string): {
  ok: boolean;
  normalized?: string;
  reason?: string;
} {
  return validateModelRefWithPolicy(input, DEFAULT_OPAQUE_MODEL_REF_POLICY);
}

/** Validate model refs with explicit source semantics for source-specific formats. */
export function validateModelRefWithSource(
  input: string,
  source: ModelSource,
  policy?: ModelRefValidationPolicy,
): { ok: boolean; normalized?: string; reason?: string } {
  const normalizedSource = source?.trim().toLowerCase();
  const resolvedPolicy = resolveModelRefValidationPolicy(normalizedSource, policy);
  return validateModelRefWithPolicy(input, resolvedPolicy);
}

function hasInvalidModelRefCharacters(value: string): boolean {
  return (
    value.includes("..") || value.includes("\\") || MODEL_REF_INVALID_CHARACTERS_RE.test(value)
  );
}

function validateOpaqueModelRef(trimmed: string): {
  ok: boolean;
  normalized?: string;
  reason?: string;
} {
  if (hasInvalidModelRefCharacters(trimmed)) {
    return { ok: false, reason: MODEL_REF_INVALID_CHARACTERS_REASON };
  }
  if (trimmed.includes(" ")) {
    return { ok: false, reason: MODEL_REF_SPACES_REASON };
  }
  return { ok: true, normalized: trimmed };
}

function resolveCanonicalModelHost(policy: ModelRefValidationPolicy): string | null {
  const canonicalHost = (policy.canonicalHost ?? "").trim().toLowerCase();
  return canonicalHost.length > 0 ? canonicalHost : null;
}

function resolveAlternateCanonicalHost(canonicalHost: string): string {
  return canonicalHost.startsWith(MODEL_REF_WWW_PREFIX)
    ? canonicalHost.slice(MODEL_REF_WWW_PREFIX.length)
    : `${MODEL_REF_WWW_PREFIX}${canonicalHost}`;
}

function startsWithModelRefUrlProtocol(value: string): boolean {
  const lower = value.toLowerCase();
  return lower.startsWith(MODEL_REF_HTTPS_PROTOCOL) || lower.startsWith(MODEL_REF_HTTP_PROTOCOL);
}

function resolveHostedModelRefCandidate(
  trimmed: string,
  canonicalHost: string,
): { ok: true; candidate: string } | { ok: false; reason: string } {
  if (!startsWithModelRefUrlProtocol(trimmed)) {
    return { ok: true, candidate: trimmed };
  }
  if (!URL.canParse(trimmed)) {
    return { ok: false, reason: MODEL_REF_URL_PARSE_REASON };
  }

  const parsed = new URL(trimmed);
  const hostname = parsed.hostname.toLowerCase();
  const alternateCanonicalHost = resolveAlternateCanonicalHost(canonicalHost);
  if (hostname !== canonicalHost && hostname !== alternateCanonicalHost) {
    return {
      ok: false,
      reason: `Only ${canonicalHost} is supported as model source.`,
    };
  }
  if (parsed.search || parsed.hash) {
    return { ok: false, reason: MODEL_REF_QUERY_FRAGMENT_REASON };
  }

  return {
    ok: true,
    candidate: parsed.pathname.replace(MODEL_REF_PATHNAME_PREFIX_RE, ""),
  };
}

function stripCanonicalModelHostPrefix(candidate: string, canonicalHost: string): string {
  if (candidate.startsWith(`${canonicalHost}/`)) {
    return candidate.slice(`${canonicalHost}/`.length);
  }

  const wwwPrefixedCanonicalHost = `${MODEL_REF_WWW_PREFIX}${canonicalHost}/`;
  if (candidate.startsWith(wwwPrefixedCanonicalHost)) {
    return candidate.slice(wwwPrefixedCanonicalHost.length);
  }

  return candidate;
}

function resolveHostedModelRefPath(
  candidate: string,
): { ok: true; owner: string; repo: string } | { ok: false; reason: string } {
  const pathParts = candidate.split("/").filter((part) => part.length > 0);
  if (pathParts.length !== MODEL_REF_PATH_PART_COUNT) {
    return { ok: false, reason: MODEL_REF_OWNER_REPO_REASON };
  }

  const [owner, repo] = pathParts;
  if (!(owner && repo)) {
    return { ok: false, reason: MODEL_REF_OWNER_REPO_REASON };
  }

  return { ok: true, owner, repo };
}

function isModelRefToken(value: string): boolean {
  return value.length > 0 && MODEL_REF_TOKEN_RE.test(value);
}

function validateHostedModelRef(
  trimmed: string,
  canonicalHost: string,
): { ok: boolean; normalized?: string; reason?: string } {
  if (hasInvalidModelRefCharacters(trimmed)) {
    return { ok: false, reason: MODEL_REF_INVALID_CHARACTERS_REASON };
  }

  const candidateResult = resolveHostedModelRefCandidate(trimmed, canonicalHost);
  if (!candidateResult.ok) {
    return candidateResult;
  }

  const pathResult = resolveHostedModelRefPath(
    stripCanonicalModelHostPrefix(candidateResult.candidate, canonicalHost),
  );
  if (!pathResult.ok) {
    return pathResult;
  }

  if (!(isModelRefToken(pathResult.owner) && isModelRefToken(pathResult.repo))) {
    return { ok: false, reason: MODEL_REF_OWNER_REPO_FORMAT_REASON };
  }

  return {
    ok: true,
    normalized: `${canonicalHost}/${pathResult.owner}/${pathResult.repo}`,
  };
}

/** Validate model refs using explicit policy configuration. */
export function validateModelRefWithPolicy(
  input: string,
  policy: ModelRefValidationPolicy,
): { ok: boolean; normalized?: string; reason?: string } {
  const trimmed = input?.trim() ?? "";
  if (trimmed.length === 0) {
    return { ok: false, reason: MODEL_REF_EMPTY_REASON };
  }

  if (policy.mode === "opaque") {
    return validateOpaqueModelRef(trimmed);
  }

  const canonicalHost = resolveCanonicalModelHost(policy);
  if (canonicalHost === null) {
    return { ok: false, reason: MODEL_REF_CANONICAL_HOST_REQUIRED_REASON };
  }

  return validateHostedModelRef(trimmed, canonicalHost);
}

function resolveModelRefValidationPolicy(
  source: ModelSource,
  policy?: ModelRefValidationPolicy,
): ModelRefValidationPolicy {
  if (policy) {
    return policy;
  }

  if (source) {
    const normalizedSource = source.trim().toLowerCase();
    if (normalizedSource === "") {
      return DEFAULT_OPAQUE_MODEL_REF_POLICY;
    }
  }
  return DEFAULT_OPAQUE_MODEL_REF_POLICY;
}
