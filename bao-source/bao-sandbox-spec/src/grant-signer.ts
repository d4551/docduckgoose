/**
 * Ed25519 signing + verification for {@link CapabilityGrant}.
 *
 * Cohesion plan §3.4 — the orchestrator's grant issuer holds the Ed25519
 * private key and signs canonical-JSON serializations of grant bodies;
 * sandbox controllers hold the public key and verify before honouring a
 * grant. Both sides use the same canonical-JSON encoding (no `signature`
 * field on the body that is signed).
 *
 * The actual key material is opaque to this module — callers pass in
 * `CryptoKey` handles produced by `crypto.subtle.importKey` (the runtime
 * config seam manages JWK import). This module knows only how to encode,
 * sign, and verify.
 *
 * @module @baohaus/bao-sandbox-spec/grant-signer
 */

import { type CanonicalJsonValue, canonicalJsonStringify } from "./canonical-json.ts";
import type { CapabilityGrant } from "./grants.ts";
import type { CapabilityGrantBody } from "./negotiate.ts";

export interface GrantSignInput {
  readonly body: CapabilityGrantBody;
  readonly issuedAt: string;
  readonly expiresAt: string;
  readonly signingKey: CryptoKey;
  readonly fs: CapabilityGrant["fs"];
  readonly net: CapabilityGrant["net"];
}

export interface GrantSignError {
  readonly ok: false;
  readonly reason: "canonical-encoding-failed";
  readonly detail: string;
}

export interface GrantSignOk {
  readonly ok: true;
  readonly grant: CapabilityGrant;
}

export type GrantSignResult = GrantSignOk | GrantSignError;

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  return copy;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function quotaToJson(quota: CapabilityGrantBody["resources"]["cpuMilli"]): CanonicalJsonValue {
  const base: { [key: string]: CanonicalJsonValue } = {
    limit: quota.limit,
    request: quota.request,
  };
  if (quota.burst !== undefined) {
    base.burst = quota.burst;
  }
  if (quota.eviction !== undefined) {
    base.eviction = quota.eviction;
  }
  return base;
}

function resourcesToJson(resources: CapabilityGrantBody["resources"]): CanonicalJsonValue {
  const base: { [key: string]: CanonicalJsonValue } = {
    concurrencyLimit: quotaToJson(resources.concurrencyLimit),
    cpuMilli: quotaToJson(resources.cpuMilli),
    diskMiB: quotaToJson(resources.diskMiB),
    memMiB: quotaToJson(resources.memMiB),
    pidLimit: quotaToJson(resources.pidLimit),
    requestsPerSecond: quotaToJson(resources.requestsPerSecond),
    wallClockMs: quotaToJson(resources.wallClockMs),
  };
  if (resources.gpuMilli !== undefined) {
    base.gpuMilli = quotaToJson(resources.gpuMilli);
  }
  if (resources.bandwidthKbps !== undefined) {
    base.bandwidthKbps = quotaToJson(resources.bandwidthKbps);
  }
  return base;
}

function netToJson(net: CapabilityGrant["net"]): CanonicalJsonValue {
  if (net.mode === "egress-allowlist") {
    return {
      egress: net.egress.map((entry) => ({
        host: entry.host,
        port: entry.port,
        protocol: entry.protocol,
      })),
      mode: net.mode,
    };
  }
  return { mode: net.mode };
}

function grantBodyForSigning(
  body: CapabilityGrantBody,
  issuedAt: string,
  expiresAt: string,
): CanonicalJsonValue {
  return {
    expiresAt,
    fs: body.fs.map((rule) => ({
      access: [...rule.access],
      path: rule.path,
    })),
    id: body.id,
    issuedAt,
    net: netToJson(body.net),
    packageId: body.packageId,
    resources: resourcesToJson(body.resources),
    syscalls: [...body.syscalls],
    tenantId: body.tenantId,
    tier: body.tier,
  };
}

/** Sign a grant body, producing a wire-stable {@link CapabilityGrant}. */
export async function signCapabilityGrant(input: GrantSignInput): Promise<GrantSignResult> {
  const canonical = canonicalJsonStringify(
    grantBodyForSigning(input.body, input.issuedAt, input.expiresAt),
  );
  if (!canonical.ok) {
    return {
      ok: false,
      reason: "canonical-encoding-failed",
      detail: `${canonical.path}:${canonical.reason}`,
    };
  }
  const bytes = new TextEncoder().encode(canonical.value);
  const signatureBuffer = await crypto.subtle.sign(
    { name: "Ed25519" },
    input.signingKey,
    toArrayBuffer(bytes),
  );
  const signatureBytes = new Uint8Array(signatureBuffer);
  return {
    ok: true,
    grant: {
      id: input.body.id,
      packageId: input.body.packageId,
      tier: input.body.tier,
      resources: input.body.resources,
      fs: input.fs,
      net: input.net,
      syscalls: input.body.syscalls,
      signature: bytesToBase64(signatureBytes),
      issuedAt: input.issuedAt,
      expiresAt: input.expiresAt,
    },
  };
}

export interface GrantVerifyOk {
  readonly ok: true;
}

export interface GrantVerifyError {
  readonly ok: false;
  readonly reason:
    | "canonical-encoding-failed"
    | "signature-invalid"
    | "expired"
    | "issued-in-future";
  readonly detail?: string;
}

export type GrantVerifyResult = GrantVerifyOk | GrantVerifyError;

export interface GrantVerifyInput {
  readonly grant: CapabilityGrant;
  readonly tenantId: string;
  readonly verifyingKey: CryptoKey;
  readonly now: Date;
  readonly clockSkewMs?: number;
}

/** Verify a grant's signature + expiration + tenant binding. */
export async function verifyCapabilityGrant(input: GrantVerifyInput): Promise<GrantVerifyResult> {
  const skew = input.clockSkewMs ?? 5_000;
  const issuedAt = Date.parse(input.grant.issuedAt);
  const expiresAt = Date.parse(input.grant.expiresAt);
  if (Number.isNaN(issuedAt) || Number.isNaN(expiresAt)) {
    return {
      ok: false,
      reason: "canonical-encoding-failed",
      detail: "issuedAt/expiresAt not ISO-8601",
    };
  }
  const nowMs = input.now.getTime();
  if (nowMs + skew < issuedAt) {
    return { ok: false, reason: "issued-in-future" };
  }
  if (nowMs > expiresAt + skew) {
    return { ok: false, reason: "expired" };
  }
  const canonical = canonicalJsonStringify(
    grantBodyForSigning(
      {
        id: input.grant.id,
        packageId: input.grant.packageId,
        tenantId: input.tenantId,
        tier: input.grant.tier,
        resources: input.grant.resources,
        fs: input.grant.fs,
        net: input.grant.net,
        syscalls: input.grant.syscalls,
      },
      input.grant.issuedAt,
      input.grant.expiresAt,
    ),
  );
  if (!canonical.ok) {
    return {
      ok: false,
      reason: "canonical-encoding-failed",
      detail: `${canonical.path}:${canonical.reason}`,
    };
  }
  const signatureBytes = base64ToBytes(input.grant.signature);
  const bytes = new TextEncoder().encode(canonical.value);
  const valid = await crypto.subtle.verify(
    { name: "Ed25519" },
    input.verifyingKey,
    toArrayBuffer(signatureBytes),
    toArrayBuffer(bytes),
  );
  return valid ? { ok: true } : { ok: false, reason: "signature-invalid" };
}
