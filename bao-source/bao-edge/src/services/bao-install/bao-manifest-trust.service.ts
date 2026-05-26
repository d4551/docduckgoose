/**
 * Source policy and trust verification for .bao manifests.
 *
 * Validates manifest source fields against source policies and verifies
 * cryptographic checksums and signatures using WebCrypto.
 */

import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import {
  computeBaoManifestChecksum,
  serializeBaoManifestForChecksum,
} from "@baohaus/bao-schemas/bao-install/manifest-checksum";
import type { BaoInstallTarget } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type { BaoSourcePolicy, BaoTrustPolicy } from "./bao-install-config.service.ts";

// Result Type

export interface BaoTrustResult {
  valid: boolean;
  issues: string[];
}

// Host Allowlist Matching

function matchesHostPattern(host: string, pattern: string): boolean {
  if (pattern === "*") {
    return true;
  }
  if (pattern.startsWith("*.")) {
    const suffix = pattern.slice(1);
    return host.endsWith(suffix) || host === pattern.slice(2);
  }
  return host === pattern;
}

function isHostAllowed(host: string, allowedHosts: readonly string[]): boolean {
  if (allowedHosts.length === 0) {
    return false;
  }
  return allowedHosts.some((pattern) => matchesHostPattern(host, pattern));
}

// Source Validation

function validateRemoteSource(
  source: string,
  sourcePolicy: BaoSourcePolicy,
  issues: string[],
): void {
  if (!sourcePolicy.allowRemoteUrls) {
    issues.push(`Remote URLs are not allowed by source policy, got "${source}"`);
    return;
  }
  const host = new URL(source).hostname;
  if (!isHostAllowed(host, sourcePolicy.allowedRemoteHosts)) {
    issues.push(
      `Remote host "${host}" is not in the allowed hosts list: [${sourcePolicy.allowedRemoteHosts.join(", ")}]`,
    );
  }
}

function validateLocalSource(
  source: string,
  sourcePolicy: BaoSourcePolicy,
  issues: string[],
): void {
  if (sourcePolicy.requireBaoExtensionForLocalPath && !source.endsWith(".bao")) {
    issues.push(`Local source path must have .bao extension, got "${source}"`);
  }
  const withinRoots = sourcePolicy.allowedLocalRoots.some((root) => {
    const normalizedRoot = root.endsWith("/") ? root : `${root}/`;
    return source === root || source.startsWith(normalizedRoot);
  });
  if (!withinRoots) {
    issues.push(
      `Local source path "${source}" is not within allowed roots: [${sourcePolicy.allowedLocalRoots.join(", ")}]`,
    );
  }
}

export function validateBaoManifestSource(
  manifest: BaoManifest,
  config: { sourcePolicy: BaoSourcePolicy },
): BaoTrustResult {
  const issues: string[] = [];
  const source = manifest.metadata.source;

  if (source === undefined) {
    return { valid: true, issues };
  }

  const isRemote = source.startsWith("http://") || source.startsWith("https://");
  if (isRemote) {
    validateRemoteSource(source, config.sourcePolicy, issues);
  } else {
    validateLocalSource(source, config.sourcePolicy, issues);
  }

  return { valid: issues.length === 0, issues };
}

// Crypto Helpers

const BASE64_PADDING_BLOCK_SIZE = 4;

function base64ToBytes(encoded: string): Uint8Array<ArrayBuffer> {
  const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padded =
    normalized.length % BASE64_PADDING_BLOCK_SIZE === 0
      ? normalized
      : `${normalized}${"=".repeat(BASE64_PADDING_BLOCK_SIZE - (normalized.length % BASE64_PADDING_BLOCK_SIZE))}`;
  const binary = atob(padded);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function deriveKeyBytes(raw: string): Uint8Array<ArrayBuffer> {
  const content = raw.includes("-----BEGIN ")
    ? raw
        .replace(/-----BEGIN [A-Z ]+-----/g, "")
        .replace(/-----END [A-Z ]+-----/g, "")
        .replace(/\s+/g, "")
    : raw;
  return base64ToBytes(content);
}

async function importVerifyKey(rawKey: string, algorithm: "ed25519" | "rsa"): Promise<CryptoKey> {
  const keyBuffer = deriveKeyBytes(rawKey);
  const algoConfig =
    algorithm === "ed25519" ? { name: "Ed25519" } : { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" };
  return await crypto.subtle.importKey("spki", keyBuffer, algoConfig, false, ["verify"]);
}

function resolvePublicKey(
  keyId: string | undefined,
  trustedKeys: Record<string, string>,
): { key: string; resolvedId: string } | undefined {
  if (keyId !== undefined) {
    const key = trustedKeys[keyId];
    if (key === undefined) {
      return undefined;
    }
    return { key, resolvedId: keyId };
  }
  const entries = Object.entries(trustedKeys);
  if (entries.length === 1 && entries[0] !== undefined) {
    const [id, key] = entries[0];
    return { key, resolvedId: id };
  }
  return undefined;
}

async function verifySignatureBytes(
  payload: BufferSource,
  signatureValue: string,
  publicKeyRaw: string,
  algorithm: "ed25519" | "rsa",
): Promise<boolean> {
  const cryptoKey = await importVerifyKey(publicKeyRaw, algorithm);
  const sigBuffer = base64ToBytes(signatureValue);
  const algoName = algorithm === "ed25519" ? "Ed25519" : { name: "RSASSA-PKCS1-v1_5" };
  return crypto.subtle.verify(algoName, cryptoKey, sigBuffer, payload);
}

// Manifest Trust Verification (decomposed)

async function verifyManifestChecksum(
  manifest: BaoManifest,
  trustPolicy: BaoTrustPolicy,
  issues: string[],
): Promise<void> {
  const checksum = manifest.metadata.checksum;
  if (trustPolicy.requireManifestChecksum && checksum === undefined) {
    issues.push("Trust policy requires a manifest checksum but none is present");
  }
  if (checksum !== undefined) {
    const computed = await computeBaoManifestChecksum(manifest, checksum.algorithm);
    if (computed !== checksum.value) {
      issues.push(
        `Manifest checksum mismatch: expected "${checksum.value}", computed "${computed}"`,
      );
    }
  }
}

async function verifyManifestSignature(
  manifest: BaoManifest,
  trustPolicy: BaoTrustPolicy,
  issues: string[],
): Promise<void> {
  const signature = manifest.metadata.signature;
  if (trustPolicy.requireManifestSignature && signature === undefined) {
    issues.push("Trust policy requires a manifest signature but none is present");
  }
  if (signature === undefined) {
    return;
  }
  if (signature.algorithm === "cosign") {
    issues.push(
      "Cannot verify manifest signature: cosign signatures require transparency log verification",
    );
    return;
  }
  const resolved = resolvePublicKey(signature.keyId, trustPolicy.trustedPublicKeys);
  if (resolved === undefined) {
    const reason =
      signature.keyId === undefined
        ? "No keyId provided and trusted public keys count is not exactly 1"
        : `Key ID "${signature.keyId}" not found in trusted public keys`;
    issues.push(`Cannot verify manifest signature: ${reason}`);
    return;
  }
  const payload = new TextEncoder().encode(serializeBaoManifestForChecksum(manifest));
  const ok = await verifySignatureBytes(
    payload,
    signature.value,
    resolved.key,
    signature.algorithm,
  );
  if (!ok) {
    issues.push("Manifest signature verification failed");
  }
}

function verifyTargetTrust(
  target: BaoInstallTarget,
  trustPolicy: BaoTrustPolicy,
  issues: string[],
): void {
  const label = target.target;
  if (trustPolicy.requireTargetChecksums && target.checksum === undefined) {
    issues.push(`Trust policy requires a checksum for target "${label}" but none is present`);
  }
  if (trustPolicy.requireTargetSignatures && target.signature === undefined) {
    issues.push(`Trust policy requires a signature for target "${label}" but none is present`);
  }
  if (target.signature !== undefined) {
    const resolved = resolvePublicKey(target.signature.keyId, trustPolicy.trustedPublicKeys);
    if (resolved === undefined) {
      const reason =
        target.signature.keyId === undefined
          ? "No keyId provided and trusted public keys count is not exactly 1"
          : `Key ID "${target.signature.keyId}" not found in trusted public keys`;
      issues.push(`Cannot verify signature for target "${label}": ${reason}`);
    }
  }
}

export async function verifyBaoManifestTrust(
  manifest: BaoManifest,
  trustPolicy: BaoTrustPolicy,
): Promise<BaoTrustResult> {
  const issues: string[] = [];

  await verifyManifestChecksum(manifest, trustPolicy, issues);
  await verifyManifestSignature(manifest, trustPolicy, issues);

  for (const target of manifest.targets) {
    verifyTargetTrust(target as BaoInstallTarget, trustPolicy, issues);
  }

  return { valid: issues.length === 0, issues };
}
