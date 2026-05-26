type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}

import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { BAO_ARCHIVE_AUTHORING_DEFAULT_PROFILE } from "@baohaus/bao-schemas/bao-archive-authoring-profile.schemas";
import {
  type Ed25519Jwk,
  exportEd25519KeyPair,
  generateEd25519KeyPair,
} from "@baohaus/bao-utils/canonical/bao-manifest-signer";

const PRIVATE_JWK_ENV = "BAO_ARCHIVE_SIGNING_PRIVATE_JWK";
const PRIVATE_JWK_PATH_ENV = "BAO_ARCHIVE_SIGNING_PRIVATE_JWK_PATH";
const SIGNATURE_TRANSPARENCY_LOG_ENV = "BAO_ARCHIVE_SIGNATURE_TRANSPARENCY_LOG";
const LOCAL_PRIVATE_JWK_URL = new URL(
  "../../.bao-local/archive-signing-private.jwk",
  import.meta.url,
);

function isJsonObject(value: JsonField): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertEd25519PrivateJwk(value: JsonField, source: string): Ed25519Jwk {
  if (!isJsonObject(value)) {
    throw new Error(`${source} must contain an Ed25519 private JWK`);
  }
  const { alg, crv, d, ext, kid, kty, use, x, y } = value;
  const keyOps = value.key_ops;
  if (!(kty === "OKP" && crv === "Ed25519" && typeof x === "string" && typeof d === "string")) {
    throw new Error(`${source} must contain an Ed25519 private JWK`);
  }
  return {
    ...(typeof alg === "string" ? { alg } : {}),
    crv,
    d,
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

async function createLocalPrivateJwk(path: string): Promise<Ed25519Jwk> {
  const pair = await generateEd25519KeyPair();
  const exported = await exportEd25519KeyPair(pair);
  mkdirSync(dirname(path), { recursive: true });
  await Bun.write(path, `${JSON.stringify(exported.privateKeyJwk, null, 2)}\n`);
  return exported.privateKeyJwk;
}

export async function readArchiveSigningPrivateJwk(): Promise<Ed25519Jwk> {
  const inlineJwk = Bun.env[PRIVATE_JWK_ENV]?.trim();
  if (inlineJwk !== undefined && inlineJwk.length > 0) {
    return assertEd25519PrivateJwk(JSON.parse(inlineJwk), PRIVATE_JWK_ENV);
  }

  const configuredPath = Bun.env[PRIVATE_JWK_PATH_ENV]?.trim();
  const keyPath =
    configuredPath !== undefined && configuredPath.length > 0
      ? configuredPath
      : Bun.fileURLToPath(LOCAL_PRIVATE_JWK_URL);

  const keyFile = Bun.file(keyPath);
  if (await keyFile.exists()) {
    return assertEd25519PrivateJwk(await keyFile.json(), keyPath);
  }

  return await createLocalPrivateJwk(keyPath);
}

export function readArchiveSignatureTransparencyLog(): string {
  const configuredTransparencyLog = Bun.env[SIGNATURE_TRANSPARENCY_LOG_ENV]?.trim();
  return configuredTransparencyLog !== undefined && configuredTransparencyLog.length > 0
    ? configuredTransparencyLog
    : BAO_ARCHIVE_AUTHORING_DEFAULT_PROFILE.transparencyLogUrl;
}
