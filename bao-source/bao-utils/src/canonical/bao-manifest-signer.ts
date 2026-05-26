import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { SignatureAlgorithm } from "@baohaus/bao-schemas/bao-install-primitives.schemas";
import { encodeBaoManifestSignaturePayload } from "./bao-manifest-bin.ts";
import { computeBaoManifestChecksum, sha256Hex } from "./bao-manifest-checksum.ts";

export interface Ed25519Jwk {
  readonly alg?: string;
  readonly crv: string;
  readonly d?: string;
  readonly ext?: boolean;
  key_ops?: string[];
  readonly kid?: string;
  readonly kty: string;
  readonly use?: string;
  readonly x?: string;
  readonly y?: string;
}

export interface Ed25519KeyPair {
  readonly publicKey: CryptoKey;
  readonly privateKey: CryptoKey;
}

export interface ExportedEd25519KeyPair {
  readonly publicKeyJwk: Ed25519Jwk;
  readonly privateKeyJwk: Ed25519Jwk;
  readonly keyId: string;
}

export interface SignResult {
  readonly signature: Uint8Array;
  readonly signatureBase64: string;
  readonly keyId: string;
  readonly algorithm: SignatureAlgorithm;
  readonly inputSha256: string;
}

export interface VerifyResult {
  readonly valid: boolean;
  readonly reason?: string;
  readonly inputSha256: string;
}

export interface ValidateResponse {
  readonly valid: boolean;
  readonly issues?: readonly string[];
}

export interface TrustPolicy {
  readonly allowedKeyIds: readonly string[];
  readonly allowedSignatureAlgorithms: readonly SignatureAlgorithm[];
  readonly requireManifestSignature: boolean;
  readonly requireTransparencyLog: boolean;
  readonly allowedCosignIssuers?: readonly string[];
  readonly allowedCosignSubjects?: readonly string[];
}

export const DEFAULT_TRUST_POLICY: TrustPolicy = {
  allowedKeyIds: [],
  allowedSignatureAlgorithms: ["ed25519", "cosign"],
  requireManifestSignature: true,
  requireTransparencyLog: false,
};

export async function generateEd25519KeyPair(): Promise<Ed25519KeyPair> {
  const pair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]);
  return { publicKey: pair.publicKey, privateKey: pair.privateKey };
}

export function narrowJsonWebKeyToEd25519(jwk: JsonWebKey): Ed25519Jwk {
  if (jwk.crv === undefined || jwk.kty === undefined) {
    throw new Error("Exported key missing crv or kty — not a valid Ed25519 JWK");
  }
  return {
    crv: jwk.crv,
    kty: jwk.kty,
    ...(jwk.alg !== undefined ? { alg: jwk.alg } : {}),
    ...(jwk.d !== undefined ? { d: jwk.d } : {}),
    ...(jwk.ext !== undefined ? { ext: jwk.ext } : {}),
    ...(jwk.key_ops !== undefined ? { key_ops: jwk.key_ops } : {}),
    ...(jwk.use !== undefined ? { use: jwk.use } : {}),
    ...(jwk.x !== undefined ? { x: jwk.x } : {}),
    ...(jwk.y !== undefined ? { y: jwk.y } : {}),
  };
}

export async function exportEd25519KeyPair(pair: Ed25519KeyPair): Promise<ExportedEd25519KeyPair> {
  const rawPublic = await crypto.subtle.exportKey("jwk", pair.publicKey);
  const rawPrivate = await crypto.subtle.exportKey("jwk", pair.privateKey);
  const publicKeyJwk = narrowJsonWebKeyToEd25519(rawPublic);
  const privateKeyJwk = narrowJsonWebKeyToEd25519(rawPrivate);
  const keyId = deriveKeyIdFromJwk(publicKeyJwk);
  return { publicKeyJwk, privateKeyJwk, keyId };
}

export async function importEd25519PublicKey(jwk: Ed25519Jwk): Promise<CryptoKey> {
  return await crypto.subtle.importKey("jwk", jwk, { name: "Ed25519" }, true, ["verify"]);
}

export async function importEd25519PrivateKey(jwk: Ed25519Jwk): Promise<CryptoKey> {
  return await crypto.subtle.importKey("jwk", jwk, { name: "Ed25519" }, true, ["sign"]);
}

export function deriveKeyIdFromJwk(jwk: Ed25519Jwk): string {
  const ordered: Record<string, unknown> = {};
  for (const key of Object.keys(jwk).sort()) {
    ordered[key] = jwk[key as keyof Ed25519Jwk];
  }
  return sha256Hex(JSON.stringify(ordered));
}

function toBufferSource(bytes: Uint8Array): ArrayBuffer {
  if (bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength) {
    return bytes.buffer as ArrayBuffer;
  }
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  return copy;
}

export async function signManifestBinEd25519(
  manifestBin: Uint8Array,
  privateKey: CryptoKey,
  keyId: string,
): Promise<SignResult> {
  const signatureBytes = new Uint8Array(
    await crypto.subtle.sign({ name: "Ed25519" }, privateKey, toBufferSource(manifestBin)),
  );
  return {
    signature: signatureBytes,
    signatureBase64: bytesToBase64(signatureBytes),
    keyId,
    algorithm: "ed25519",
    inputSha256: sha256Hex(manifestBin),
  };
}

export interface CanonicalSigningKey {
  readonly privateKey: CryptoKey;
  readonly keyId: string;
}

export interface SignedCanonicalBaoManifest {
  readonly manifest: BaoManifest;
  readonly manifestSignature: Uint8Array;
}

export async function signCanonicalBaoManifest(args: {
  readonly manifest: BaoManifest;
  readonly signingKey: CanonicalSigningKey;
  readonly transparencyLog: string;
}): Promise<SignedCanonicalBaoManifest> {
  const { manifest, signingKey, transparencyLog } = args;
  const checksumSeed: BaoManifest = {
    ...manifest,
    metadata: {
      ...manifest.metadata,
      checksum: { algorithm: "sha256", value: "" },
      signature: {
        algorithm: "ed25519",
        keyId: signingKey.keyId,
        transparencyLog,
        value: "",
      },
    },
  };
  const checksummedManifest: BaoManifest = {
    ...checksumSeed,
    metadata: {
      ...checksumSeed.metadata,
      checksum: {
        algorithm: "sha256",
        value: computeBaoManifestChecksum(checksumSeed),
      },
    },
  };
  const signature = await signManifestBinEd25519(
    encodeBaoManifestSignaturePayload(checksummedManifest),
    signingKey.privateKey,
    signingKey.keyId,
  );
  return {
    manifest: {
      ...checksummedManifest,
      metadata: {
        ...checksummedManifest.metadata,
        signature: {
          algorithm: "ed25519",
          keyId: signingKey.keyId,
          transparencyLog,
          value: signature.signatureBase64,
        },
      },
    },
    manifestSignature: signature.signature,
  };
}

export async function verifyManifestBinEd25519(
  manifestBin: Uint8Array,
  signature: Uint8Array,
  publicKey: CryptoKey,
): Promise<VerifyResult> {
  const valid = await crypto.subtle.verify(
    { name: "Ed25519" },
    publicKey,
    toBufferSource(signature),
    toBufferSource(manifestBin),
  );
  return {
    valid,
    inputSha256: sha256Hex(manifestBin),
    ...(valid ? {} : { reason: "ed25519 signature verification failed" }),
  };
}

function isSignatureAlgorithm(value: unknown): value is SignatureAlgorithm {
  return value === "ed25519" || value === "cosign";
}

export function validateSignaturePolicy(
  manifest: BaoManifest,
  policy: TrustPolicy,
): ValidateResponse {
  const issues: string[] = [];
  const { signature } = manifest.metadata;
  if (!signature) {
    return policy.requireManifestSignature
      ? {
          valid: false,
          issues: ["metadata.signature is required by trust policy"],
        }
      : { valid: true };
  }
  if (!isSignatureAlgorithm(signature.algorithm)) {
    return {
      valid: false,
      issues: [`signature algorithm ${signature.algorithm} is not a recognized SignatureAlgorithm`],
    };
  }
  const algorithm: SignatureAlgorithm = signature.algorithm;
  if (!policy.allowedSignatureAlgorithms.includes(algorithm)) {
    issues.push(`signature algorithm ${signature.algorithm} not in allowedSignatureAlgorithms`);
  }

  if (!signature.keyId) {
    issues.push("metadata.signature.keyId is required by trust policy");
  } else if (policy.allowedKeyIds.length > 0 && !policy.allowedKeyIds.includes(signature.keyId)) {
    issues.push(`signature keyId ${signature.keyId} not in allowedKeyIds`);
  }

  if (
    policy.requireTransparencyLog &&
    !(typeof signature.transparencyLog === "string" && signature.transparencyLog.trim().length > 0)
  ) {
    issues.push("trust policy requires metadata.signature.transparencyLog");
  }

  return issues.length > 0 ? { valid: false, issues } : { valid: true };
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
