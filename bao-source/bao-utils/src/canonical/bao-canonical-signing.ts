import {
  deriveKeyIdFromJwk,
  type Ed25519Jwk,
  exportEd25519KeyPair,
  generateEd25519KeyPair,
  importEd25519PrivateKey,
  importEd25519PublicKey,
} from "./bao-manifest-signer.ts";

export interface CanonicalEd25519SigningKey {
  readonly keyId: string;
  readonly publicKey: CryptoKey;
  readonly privateKey: CryptoKey;
  readonly publicKeyJwk: Ed25519Jwk;
}

export interface CanonicalArchiveSigningKeyOptions {
  readonly allowEphemeralPrivateKey?: boolean;
}

let generatedArchiveSigningKeyPromise: Promise<Ed25519Jwk> | undefined;

function cloneEd25519Jwk(jwk: Ed25519Jwk): Ed25519Jwk {
  if (jwk.key_ops !== undefined) {
    return { ...jwk, key_ops: [...jwk.key_ops] };
  }
  return { ...jwk };
}

function toPublicJwk(privateKeyJwk: Ed25519Jwk): Ed25519Jwk {
  const { crv, kty, x } = privateKeyJwk;
  if (crv !== "Ed25519" || kty !== "OKP" || typeof x !== "string") {
    throw new Error("Archive signing private key must be an Ed25519 OKP JWK");
  }
  return {
    crv,
    ext: true,
    key_ops: ["verify"],
    kty,
    x,
  };
}

async function generateArchiveSigningPrivateJwk(): Promise<Ed25519Jwk> {
  generatedArchiveSigningKeyPromise ??= generateEd25519KeyPair().then((pair) =>
    exportEd25519KeyPair(pair).then((exported) => exported.privateKeyJwk),
  );
  return await generatedArchiveSigningKeyPromise;
}

export function getCanonicalArchiveSigningKeyId(privateKeyJwk: Ed25519Jwk): string {
  return deriveKeyIdFromJwk(toPublicJwk(privateKeyJwk));
}

export async function loadCanonicalArchiveSigningKey(
  privateKeyJwk?: Ed25519Jwk,
  options: CanonicalArchiveSigningKeyOptions = {},
): Promise<CanonicalEd25519SigningKey> {
  const allowEphemeralPrivateKey = options.allowEphemeralPrivateKey ?? true;
  if (privateKeyJwk === undefined && !allowEphemeralPrivateKey) {
    throw new Error("Archive signing requires a configured Ed25519 private JWK");
  }
  const resolvedPrivateKeyJwk = privateKeyJwk ?? (await generateArchiveSigningPrivateJwk());
  const publicKeyJwk = toPublicJwk(resolvedPrivateKeyJwk);
  const [publicKey, privateKey] = await Promise.all([
    importEd25519PublicKey(publicKeyJwk),
    importEd25519PrivateKey(resolvedPrivateKeyJwk),
  ]);

  return {
    keyId: getCanonicalArchiveSigningKeyId(resolvedPrivateKeyJwk),
    publicKey,
    privateKey,
    publicKeyJwk: cloneEd25519Jwk(publicKeyJwk),
  };
}
