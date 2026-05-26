#!/usr/bin/env bun
/**
 * bao:resolve — Resolve .bao lock file from governance manifesto.
 *
 * Reads `bao-governance.json` and `bao.lock`, queries the .bao Registry
 * for @baohaus/* dependencies, and repopulates `ociDigest` / `integrity` /
 * `signature` fields with real content-addressed values.
 *
 * Invocation: `bun run bao:resolve` from any package root.
 */

import { BAO_ARCHIVE_MEDIA_TYPE } from "@baohaus/bao-contracts/bao/bao-archive.contract";
import { BAO_GOVERNANCE_ENTRY, BAO_LOCK_ENTRY } from "./lib/archive-layout.ts";
import { readBaoRegistryConfig } from "./lib/bao-registry-config.ts";
import { buildBaoRegistryBlobUrl, buildBaoRegistryManifestUrl } from "./lib/bao-registry-routes.ts";
import { sha256Hex } from "./lib/fs-io.ts";
import { buildResolvedRegistryPackage } from "./lib/registry-resolution.ts";
import { assertBaoLock, assertBaoManifest, assertPackageIdentity } from "./lib/schema-guards.ts";

const BAOHAUS_PREFIX = "@baohaus/" as const;
const OCI_MANIFEST_MEDIA_TYPE = "application/vnd.oci.image.manifest.v1+json";
const FETCH_TIMEOUT_MS = 30_000;
const RATE_LIMIT_MS = 100;
const registryConfig = readBaoRegistryConfig();

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | readonly JsonValue[];

interface JsonObject {
  readonly [key: string]: JsonValue | undefined;
}

interface OciLayerDescriptor {
  readonly digest: string;
  readonly mediaType: string;
}

const isJsonObject = (value: JsonValue): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const requireJsonObject = (value: JsonValue, path: string): JsonObject => {
  if (isJsonObject(value)) {
    return value;
  }
  throw new Error(`${path} must be object`);
};

const requireString = (value: JsonValue | undefined, path: string): string => {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  throw new Error(`${path} must be non-empty string`);
};

const requireArray = (value: JsonValue | undefined, path: string): readonly JsonValue[] => {
  if (Array.isArray(value)) {
    return value;
  }
  throw new Error(`${path} must be array`);
};

const readOciArchiveLayer = (manifestBytes: Uint8Array): OciLayerDescriptor => {
  const parsed: JsonValue = JSON.parse(new TextDecoder().decode(manifestBytes));
  const manifest = requireJsonObject(parsed, "OCI manifest");
  const layers = requireArray(manifest.layers, "OCI manifest layers");
  for (const layerValue of layers) {
    const layer = requireJsonObject(layerValue, "OCI manifest layer");
    const mediaType = requireString(layer.mediaType, "OCI manifest layer mediaType");
    if (mediaType !== BAO_ARCHIVE_MEDIA_TYPE) {
      continue;
    }
    return {
      digest: requireString(layer.digest, "OCI manifest layer digest"),
      mediaType,
    };
  }
  throw new Error("OCI manifest is missing canonical .bao archive layer");
};

function fetchWithTimeout(url: URL, accept: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, {
    headers: { Accept: accept },
    signal: controller.signal,
  }).finally(() => clearTimeout(timer));
}

async function fetchRegistryDigest(packageName: string, version: string) {
  const packageId = packageName.replace(BAOHAUS_PREFIX, "");
  const manifestUrl = buildBaoRegistryManifestUrl(registryConfig.origin, packageId, version);

  const response = await fetchWithTimeout(manifestUrl, OCI_MANIFEST_MEDIA_TYPE);

  if (!response.ok) {
    throw new Error(`Registry refused ${packageName}@${version}: HTTP ${response.status}`);
  }

  const manifestBytes = new Uint8Array(await response.arrayBuffer());
  const headerDigest = response.headers.get("docker-content-digest");
  const manifestDigest = `sha256:${sha256Hex(manifestBytes)}`;
  if (headerDigest !== null && headerDigest !== manifestDigest) {
    throw new Error(
      `Digest mismatch for ${packageName}@${version}: header=${headerDigest} computed=${manifestDigest}`,
    );
  }
  const archiveLayer = readOciArchiveLayer(manifestBytes);
  const blobUrl = buildBaoRegistryBlobUrl(registryConfig.origin, packageId, archiveLayer.digest);
  const blobResponse = await fetchWithTimeout(blobUrl, BAO_ARCHIVE_MEDIA_TYPE);
  if (!blobResponse.ok) {
    throw new Error(
      `Registry refused ${packageName}@${version} archive blob ${archiveLayer.digest}: HTTP ${blobResponse.status}`,
    );
  }
  const archiveBytes = new Uint8Array(await blobResponse.arrayBuffer());
  const resolved = buildResolvedRegistryPackage(archiveBytes);
  if (resolved.ociDigest !== archiveLayer.digest) {
    throw new Error(
      `Archive digest mismatch for ${packageName}@${version}: manifest=${archiveLayer.digest} computed=${resolved.ociDigest}`,
    );
  }
  return resolved;
}

const packageJson = assertPackageIdentity(await Bun.file("package.json").json());
assertBaoManifest(await Bun.file(BAO_GOVERNANCE_ENTRY).json());
const lockBefore = assertBaoLock(await Bun.file(BAO_LOCK_ENTRY).json());
const packageId = packageJson.name.replace(/^@baohaus\//, "");

Bun.stdout.write(`bao:resolve ${packageId}\n`);

const resolved: typeof lockBefore.resolved = [];
for (const entry of lockBefore.resolved) {
  if (!entry.name.startsWith(BAOHAUS_PREFIX) || entry.resolvedFrom !== "pending-publish") {
    resolved.push(entry);
    continue;
  }

  await Bun.sleep(RATE_LIMIT_MS);
  const remote = await fetchRegistryDigest(entry.name, entry.version);

  Bun.stdout.write(`  ${entry.name}@${entry.version} → ${remote.ociDigest}\n`);
  resolved.push({
    ...entry,
    ociDigest: remote.ociDigest,
    integrity: remote.integrity,
    signature: remote.signature,
    resolvedFrom: "oci-registry" as const,
  });
}

const lockAfter = { ...lockBefore, resolved } satisfies typeof lockBefore;
assertBaoLock(JSON.parse(JSON.stringify(lockAfter)));

const lockJson = JSON.stringify(lockAfter, null, 2);
const lockHash = sha256Hex(lockJson);
await Bun.write(BAO_LOCK_ENTRY, `${lockJson}\n`);

Bun.stdout.write(`  Done — ${lockHash.slice(0, 16)}\n`);
