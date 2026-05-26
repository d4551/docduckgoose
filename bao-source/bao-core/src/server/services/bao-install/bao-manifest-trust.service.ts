import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { SignatureAlgorithm } from "@baohaus/bao-schemas/bao-install-primitives.schemas";
import { encodeBaoManifestSignaturePayload } from "@baohaus/bao-utils/canonical/bao-manifest-bin";
import { verifyBaoManifestChecksum } from "@baohaus/bao-utils/canonical/bao-manifest-checksum";
import {
  base64ToBytes,
  importEd25519PublicKey,
  narrowJsonWebKeyToEd25519,
  verifyManifestBinEd25519,
} from "@baohaus/bao-utils/canonical/bao-manifest-signer";

export interface TrustPolicy {
  readonly requireManifestChecksum: boolean;
  readonly requireManifestSignature: boolean;
  readonly requireTransparencyLog: boolean;
  readonly requireCompleteAttestations: boolean;
  readonly allowedSignatureAlgorithms: readonly SignatureAlgorithm[];
  readonly allowedKeyIds: readonly string[];
  readonly trustedPublicKeysJwk: Readonly<Record<string, JsonWebKey>>;
}

export function getDefaultTrustPolicy(): TrustPolicy {
  return {
    requireManifestChecksum: true,
    requireManifestSignature: false,
    requireTransparencyLog: false,
    requireCompleteAttestations: true,
    allowedSignatureAlgorithms: ["ed25519", "cosign"],
    allowedKeyIds: [],
    trustedPublicKeysJwk: {},
  };
}

export interface TrustVerificationResult {
  readonly valid: boolean;
  readonly issues: readonly string[];
  readonly manifestChecksumVerified: boolean;
  readonly manifestSignatureVerified: boolean;
  readonly transparencyLogPresent: boolean;
  readonly attestationsComplete: boolean;
  readonly totalTargets: number;
}

export interface TrustVerificationInput {
  readonly manifest: BaoManifest;
  readonly manifestBin?: Uint8Array | undefined;
  readonly manifestSignatureBytes?: Uint8Array | undefined;
}

function verifyManifestChecksumTrust(
  manifest: BaoManifest,
  policy: TrustPolicy,
): { verified: boolean; issue?: string } {
  if (!manifest.metadata.checksum) {
    return policy.requireManifestChecksum
      ? { verified: false, issue: "metadata.checksum is required but not present" }
      : { verified: false };
  }
  const ok = verifyBaoManifestChecksum(manifest, manifest.metadata.checksum);
  return ok
    ? { verified: true }
    : {
        verified: false,
        issue: `Manifest checksum recomputation does not match: expected ${manifest.metadata.checksum.value}`,
      };
}

function checkSignaturePresence(
  manifest: BaoManifest,
  policy: TrustPolicy,
): { signature?: NonNullable<BaoManifest["metadata"]["signature"]>; issue?: string } {
  const signature = manifest.metadata.signature;

  if (signature) {
    return { signature };
  }

  return policy.requireManifestSignature
    ? { issue: "metadata.signature is required but not present" }
    : {};
}

function checkSignaturePolicy(
  signature: NonNullable<BaoManifest["metadata"]["signature"]>,
  policy: TrustPolicy,
): { issue?: string } {
  const algorithm = signature.algorithm;

  if (!policy.allowedSignatureAlgorithms.includes(algorithm)) {
    return {
      issue: `signature algorithm ${algorithm} is not in the trust policy allow list`,
    };
  }

  if (
    signature.keyId &&
    policy.allowedKeyIds.length > 0 &&
    !policy.allowedKeyIds.includes(signature.keyId)
  ) {
    return {
      issue: `signature keyId ${signature.keyId} is not in the trust policy allow list`,
    };
  }

  if (
    policy.requireTransparencyLog &&
    (!signature.transparencyLog || signature.transparencyLog.length === 0)
  ) {
    return {
      issue: "trust policy requires signature.transparencyLog",
    };
  }

  return {};
}

function checkManifestSignatureInputs(input: TrustVerificationInput): { issue?: string } {
  if (input.manifestSignatureBytes) {
    return {};
  }

  return {
    issue: "manifestSignatureBytes are required to verify an ed25519 signature",
  };
}

async function verifyEd25519ManifestSignature(params: {
  keyId: string | undefined;
  manifest: BaoManifest;
  manifestSignatureBytes: Uint8Array;
  policy: TrustPolicy;
}): Promise<{ verified: boolean; issue?: string }> {
  const { keyId, manifest, manifestSignatureBytes, policy } = params;
  if (!keyId) {
    return {
      verified: false,
      issue: "metadata.signature.keyId is required for ed25519 verification",
    };
  }
  const jwk = policy.trustedPublicKeysJwk[keyId];

  if (!jwk) {
    return {
      verified: false,
      issue: `trust policy has no public key registered for keyId ${keyId}`,
    };
  }

  const publicKey = await importEd25519PublicKey(narrowJsonWebKeyToEd25519(jwk));
  const signaturePayload = encodeBaoManifestSignaturePayload(manifest);
  const verify = await verifyManifestBinEd25519(
    signaturePayload,
    manifestSignatureBytes,
    publicKey,
  );

  return verify.valid
    ? { verified: true }
    : {
        verified: false,
        issue: verify.reason ?? "ed25519 signature verification failed",
      };
}

async function verifyManifestSignatureTrust(
  input: TrustVerificationInput,
  policy: TrustPolicy,
): Promise<{ verified: boolean; issue?: string }> {
  const { manifest, manifestSignatureBytes } = input;
  const presence = checkSignaturePresence(manifest, policy);
  if (presence.issue) {
    return Promise.resolve({ verified: false, issue: presence.issue });
  }

  const { signature } = presence;
  if (!signature) {
    return { verified: false };
  }

  const policyCheck = checkSignaturePolicy(signature, policy);
  if (policyCheck.issue) {
    return Promise.resolve({ verified: false, issue: policyCheck.issue });
  }

  if (!policy.requireManifestSignature) {
    return Promise.resolve({ verified: false });
  }

  const algorithm: SignatureAlgorithm = signature.algorithm;
  if (algorithm === "cosign") {
    return Promise.resolve({
      verified: false,
      issue: "cosign signature verification requires an external sigstore client",
    });
  }
  if (algorithm === "rsa") {
    return Promise.resolve({
      verified: false,
      issue: "rsa signature verification requires an RSA trust verifier",
    });
  }

  const inputs = checkManifestSignatureInputs(input);
  if (inputs.issue) {
    return Promise.resolve({ verified: false, issue: inputs.issue });
  }

  if (!manifestSignatureBytes) {
    return Promise.resolve({
      verified: false,
      issue: "manifest signature bytes are required for signature verification",
    });
  }

  return await verifyEd25519ManifestSignature({
    keyId: signature.keyId,
    manifest,
    manifestSignatureBytes,
    policy,
  });
}

function verifyAttestationsComplete(policy: TrustPolicy): { complete: boolean; issue?: string } {
  if (!policy.requireCompleteAttestations) {
    return { complete: false };
  }
  return { complete: true };
}

function collectTargetIssues(targets: BaoManifest["targets"]): string[] {
  const ids = new Set<string>();
  const issues: string[] = [];
  for (const target of targets) {
    if (ids.has(target.target)) {
      issues.push(`duplicate target id: ${target.target}`);
    }
    ids.add(target.target);
  }
  return issues;
}

export async function verifyBaoManifestTrust(
  input: TrustVerificationInput,
  policy: TrustPolicy = getDefaultTrustPolicy(),
): Promise<TrustVerificationResult> {
  const issues: string[] = [];

  const checksumResult = verifyManifestChecksumTrust(input.manifest, policy);
  if (checksumResult.issue) {
    issues.push(checksumResult.issue);
  }

  const signatureResult = await verifyManifestSignatureTrust(input, policy);
  if (signatureResult.issue) {
    issues.push(signatureResult.issue);
  }

  const attestationResult = verifyAttestationsComplete(policy);
  if (attestationResult.issue) {
    issues.push(attestationResult.issue);
  }

  issues.push(...collectTargetIssues(input.manifest.targets));

  const signature = input.manifest.metadata.signature;
  const transparencyLogPresent = Boolean(
    signature?.transparencyLog && signature.transparencyLog.length > 0,
  );

  return {
    valid: issues.length === 0,
    issues,
    manifestChecksumVerified: checksumResult.verified,
    manifestSignatureVerified: signatureResult.verified,
    transparencyLogPresent,
    attestationsComplete: attestationResult.complete,
    totalTargets: input.manifest.targets.length,
  };
}

export type { SignatureAlgorithm };
export { base64ToBytes };
