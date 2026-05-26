/**
 * Signed capability grant token shape.
 *
 * Cohesion plan §3.4 — a {@link CapabilityGrant} is the wire-stable,
 * signed assertion that authority X granted package Y the listed
 * capability surface. Issuers (registry admission, escalation broker)
 * sign; verifiers (runtime spawner, sandbox controller) check the
 * signature, validate the `expiresAt` window, and use the embedded
 * surface to bound a sandbox tier's resource / fs / net / syscall
 * posture.
 *
 * The grant intentionally re-uses the canonical capability primitives:
 *   - {@link BaoIsolationTier}        — declared sandbox tier
 *   - {@link CapabilityResourceSchema} — resource envelope
 *   - {@link BaoSandboxLandlockFsRule} — filesystem rules
 *   - {@link BaoSandboxNet}            — network policy
 *
 * Syscalls are referenced by name; the runtime resolves them against the
 * tier's seccomp-BPF profile.
 *
 * @module @baohaus/bao-sandbox-spec/grants
 */

import type { BaoIsolationTier } from "./capabilities.ts";
import type { CapabilityResourceSchema } from "./resources.ts";
import type { BaoSandboxLandlockFsRule, BaoSandboxNet } from "./schema.ts";

/**
 * Signed capability grant.
 *
 * Wire-stable shape — additive evolution only. Every field is required
 * unless explicitly modeled as optional. The `signature` is a detached
 * signature over the canonical-JSON serialization of the grant with the
 * `signature` field omitted; validation MUST reconstruct the canonical
 * form before verifying.
 */
export interface CapabilityGrant {
  /** Unique grant identifier (uuid v7 recommended). */
  readonly id: string;
  /** Package coordinate the grant authorizes (`name@version` form). */
  readonly packageId: string;
  /** Sandbox tier the grant authorizes. */
  readonly tier: BaoIsolationTier;
  /** Resource envelope authorized for the package. */
  readonly resources: CapabilityResourceSchema;
  /** Landlock filesystem rules authorized for the package. */
  readonly fs: readonly BaoSandboxLandlockFsRule[];
  /** Network policy authorized for the package. */
  readonly net: BaoSandboxNet;
  /** Allowlisted syscalls (names resolved against tier seccomp profile). */
  readonly syscalls: readonly string[];
  /** Detached signature over the canonical-JSON grant body. */
  readonly signature: string;
  /** Issue time (ISO-8601). */
  readonly issuedAt: string;
  /** Expiration time (ISO-8601); verifiers MUST refuse after this instant. */
  readonly expiresAt: string;
}
