/**
 * Shared BaoControlPlane SOPS/secrets detection constants.
 *
 * Single source of truth for secret/SOPS markers used by
 * `kubernetes-status.service.ts` and `secrets-validator.ts`.
 *
 * @packageDocumentation
 */

/** Pattern matching a valid age (X25519) public key. */
export const AGE_PUBLIC_KEY_PATTERN: RegExp = /^age1[a-z0-9]{58}$/;

/**
 * Validation sentinel for un-replaced age public keys in SOPS-encrypted files.
 *
 * This is a detection constant, not a config value to be replaced. Used by
 * `scripts/bao-control-plane/secrets-validator.ts` and
 * `bao-runtime/src/domains/orchestration/services/cluster/kubernetes-status.service.ts` to detect when
 * `.sops.yaml` or encrypted manifests still contain the template placeholder
 * instead of a real age public key.
 */
export const SOPS_AGE_PUBLIC_KEY_TEMPLATE = "<REPLACE_WITH_AGE_PUBLIC_KEY>";

/** YAML marker indicating SOPS metadata block. */
export const SOPS_METADATA_MARKER = "sops:";

/** YAML marker indicating SOPS MAC (message authentication code). */
export const SOPS_MAC_MARKER = "mac: ENC";

/** Plaintext leak heuristic patterns for detecting un-encrypted secrets. */
export const SENSITIVE_PATTERNS: readonly RegExp[] = [
  /password:\s*['"]?[a-zA-Z0-9!@#$%^&*]{8,}['"]?\s*$/,
  /secret:\s*['"]?[a-zA-Z0-9!@#$%^&*]{8,}['"]?\s*$/,
  /apiKey:\s*['"]?[a-zA-Z0-9_-]{20,}['"]?\s*$/,
  /token:\s*['"]?[a-zA-Z0-9_-]{20,}['"]?\s*$/,
];
