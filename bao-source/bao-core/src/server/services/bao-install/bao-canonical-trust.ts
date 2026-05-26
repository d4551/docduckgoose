import { readEnvStringOrNull } from "@baohaus/bao-config/env";
import type { TrustPolicy as ManifestTrustPolicy } from "@baohaus/bao-core/server/services/bao-install/bao-manifest-trust.service";
import {
  type TrustPolicy as ArchiveTrustPolicy,
  deriveKeyIdFromJwk,
  type Ed25519Jwk,
  importEd25519PublicKey,
} from "@baohaus/bao-utils/canonical/bao-manifest-signer";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}

const TRUST_PUBLIC_JWK_ENV = "BAO_ARCHIVE_TRUST_PUBLIC_JWK";
const TRUST_PUBLIC_JWK_PATH_ENV = "BAO_ARCHIVE_TRUST_PUBLIC_JWK_PATH";

export interface CanonicalBaohausArchiveTrustContext {
  readonly archiveValidationTrustPolicy: ArchiveTrustPolicy;
  readonly manifestTrustPolicy: ManifestTrustPolicy;
  readonly publicKeyResolver: (keyId: string) => Promise<CryptoKey | null>;
}

let canonicalBaohausArchiveTrustContextPromise:
  | Promise<CanonicalBaohausArchiveTrustContext>
  | undefined;

function isJsonObject(value: JsonField): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertEd25519PublicJwk(value: JsonField, source: string): Ed25519Jwk {
  if (!isJsonObject(value)) {
    throw new Error(`${source} must contain an Ed25519 public JWK`);
  }

  const { alg, crv, ext, kid, kty, use, x, y } = value;
  const keyOps = value.key_ops;
  if (!(kty === "OKP" && crv === "Ed25519" && typeof x === "string")) {
    throw new Error(`${source} must contain an Ed25519 public JWK`);
  }

  return {
    ...(typeof alg === "string" ? { alg } : {}),
    crv,
    ...(typeof ext === "boolean" ? { ext } : {}),
    ...(Array.isArray(keyOps) && keyOps.every((entry) => typeof entry === "string")
      ? { key_ops: keyOps }
      : {}),
    ...(typeof kid === "string" ? { kid } : {}),
    kty,
    ...(typeof use === "string" ? { use } : {}),
    x,
    ...(typeof y === "string" ? { y } : {}),
  };
}

async function readTrustedPublicJwk(): Promise<Ed25519Jwk> {
  const inlineJwk = readEnvStringOrNull(TRUST_PUBLIC_JWK_ENV);
  if (inlineJwk !== null) {
    return assertEd25519PublicJwk(JSON.parse(inlineJwk), TRUST_PUBLIC_JWK_ENV);
  }

  const configuredPath = readEnvStringOrNull(TRUST_PUBLIC_JWK_PATH_ENV);
  if (configuredPath !== null) {
    return assertEd25519PublicJwk(await Bun.file(configuredPath).json(), configuredPath);
  }

  throw new Error(
    `${TRUST_PUBLIC_JWK_ENV} or ${TRUST_PUBLIC_JWK_PATH_ENV} must configure .bao archive trust`,
  );
}

export async function loadCanonicalBaohausArchiveTrustContext(): Promise<CanonicalBaohausArchiveTrustContext> {
  canonicalBaohausArchiveTrustContextPromise ??= readTrustedPublicJwk().then(
    async (publicKeyJwk) => {
      const publicKey = await importEd25519PublicKey(publicKeyJwk);
      const allowedSignatureAlgorithms = ["ed25519"] as const;
      const keyId = deriveKeyIdFromJwk(publicKeyJwk);
      const allowedKeyIds = [keyId];
      return {
        archiveValidationTrustPolicy: {
          allowedKeyIds,
          allowedSignatureAlgorithms,
          requireManifestSignature: true,
          requireTransparencyLog: true,
        },
        manifestTrustPolicy: {
          requireManifestChecksum: true,
          requireManifestSignature: true,
          requireTransparencyLog: true,
          requireCompleteAttestations: true,
          allowedSignatureAlgorithms,
          allowedKeyIds,
          trustedPublicKeysJwk: {
            [keyId]: publicKeyJwk,
          },
        },
        publicKeyResolver: async (requestedKeyId: string) =>
          requestedKeyId === keyId ? publicKey : null,
      };
    },
  );

  return await canonicalBaohausArchiveTrustContextPromise;
}
