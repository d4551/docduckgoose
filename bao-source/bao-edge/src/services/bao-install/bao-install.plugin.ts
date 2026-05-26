/**
 * Elysia HTTP plugin for the .bao install API.
 *
 * Prefix: /api/v1/bao
 * Routes: POST /validate, POST /install, GET /:id/status, POST /mount
 */

import path from "node:path";
import { BAO_INSTALL_API_PATHS } from "@baohaus/bao-config/bao-install-routes";
import { type BaoManifest, isBaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { toResultSync } from "@baohaus/bao-utils/async-result";
import { Elysia, t } from "elysia";
import {
  BAO_ARCHIVE_MEDIA_TYPE,
  BAO_MANIFEST_ENTRY,
} from "../../shared/bao/bao-archive.contract.ts";
import { readBaoArchiveFiles } from "../../shared/bao/bao-archive.ts";
import {
  type BaoInstallConfig,
  createDefaultBaoInstallConfig,
} from "./bao-install-config.service.ts";
import { validateBaoManifest } from "./bao-install-validator.service.ts";
import { resolveBaoManifestFileReferences } from "./bao-manifest-paths.service.ts";
import "./target-handlers/register-all.ts";

// Install State

interface BaoInstallRecord {
  readonly id: string;
  readonly status: "pending" | "installing" | "installed" | "failed";
  readonly manifest: BaoManifest;
  readonly createdAt: string;
  readonly error?: string;
}

const BAO_INSTALL_HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_CONTENT: 422,
} as const;

function generateInstallId(): string {
  return crypto.randomUUID();
}

function firstInstallRecordId(records: ReadonlyMap<string, BaoInstallRecord>): string | undefined {
  for (const id of records.keys()) {
    return id;
  }
  return undefined;
}

// Request Body Schema

const manifestBodySchema = t.Object({
  manifest: t.Optional(t.Record(t.String(), t.Unknown())),
  manifestPath: t.Optional(t.String()),
  manifestUrl: t.Optional(t.String()),
  archivePath: t.Optional(t.String()),
  archiveUrl: t.Optional(t.String()),
  registryNamespace: t.Optional(t.String()),
  registryName: t.Optional(t.String()),
  registryVersion: t.Optional(t.String()),
  idempotencyKey: t.Optional(t.String()),
  correlationId: t.Optional(t.String()),
});

// Helpers

async function resolveManifest(
  body: {
    manifest?: unknown;
    manifestPath?: string;
    manifestUrl?: string;
    archivePath?: string;
    archiveUrl?: string;
    registryNamespace?: string;
    registryName?: string;
    registryVersion?: string;
  },
  config: BaoInstallConfig,
): Promise<{ manifest: BaoManifest; basePath: string } | { error: string }> {
  if (body.manifest !== undefined) {
    return isBaoManifest(body.manifest)
      ? { manifest: body.manifest, basePath: process.cwd() }
      : { error: "Inline manifest does not match the .bao manifest schema" };
  }

  if (body.manifestPath !== undefined) {
    const resolved = await readManifestJsonFile(body.manifestPath);
    if ("error" in resolved) {
      return resolved;
    }
    return resolved;
  }

  if (body.archivePath !== undefined) {
    const resolved = await readManifestArchiveFile(body.archivePath, config);
    if ("error" in resolved) {
      return resolved;
    }
    return resolved;
  }

  if (body.archiveUrl !== undefined) {
    const resolved = await readManifestArchiveUrl(body.archiveUrl, config);
    if ("error" in resolved) {
      return resolved;
    }
    return resolved;
  }

  if (body.manifestUrl !== undefined) {
    const resolved = await readManifestJsonUrl(body.manifestUrl, config);
    if ("error" in resolved) {
      return resolved;
    }
    return resolved;
  }

  if (body.registryName !== undefined) {
    const resolved = await readManifestFromRegistry(body, config);
    if ("error" in resolved) {
      return resolved;
    }
    return resolved;
  }

  return {
    error:
      "No manifest source provided. Supply archivePath, archiveUrl, registryName+registryVersion, manifest, manifestPath, or manifestUrl",
  };
}

function resolveWorkspacePath(
  candidatePath: string,
): { ok: true; resolvedPath: string } | { error: string } {
  const cwd = path.resolve(process.cwd());
  const resolvedPath = path.resolve(cwd, candidatePath);
  if (resolvedPath !== cwd && !resolvedPath.startsWith(`${cwd}${path.sep}`)) {
    return { error: "Path must resolve within the server working directory" };
  }
  return { ok: true, resolvedPath };
}

function parseManifestJson(
  text: string,
  label: string,
): { ok: true; manifest: BaoManifest } | { error: string } {
  const parsedResult = toResultSync(() => JSON.parse(text));
  if (!parsedResult.ok) {
    return { error: `${label} is not valid JSON` };
  }
  if (!isBaoManifest(parsedResult.value)) {
    return { error: `${label} does not match the .bao manifest schema` };
  }
  return { ok: true, manifest: parsedResult.value };
}

async function readManifestJsonFile(
  manifestPath: string,
): Promise<{ manifest: BaoManifest; basePath: string } | { error: string }> {
  const resolved = resolveWorkspacePath(manifestPath);
  if ("error" in resolved) {
    return { error: "manifestPath must resolve within the server working directory" };
  }
  const file = Bun.file(resolved.resolvedPath);
  const exists = await file.exists();
  if (!exists) {
    return { error: `Manifest file not found: ${manifestPath}` };
  }
  const parsed = parseManifestJson(await file.text(), "Manifest file");
  if ("error" in parsed) {
    return parsed;
  }
  return { manifest: parsed.manifest, basePath: path.dirname(resolved.resolvedPath) };
}

function parseArchiveManifest(
  archiveBytes: Uint8Array,
  label: string,
): { ok: true; manifest: BaoManifest } | { error: string } {
  const files = readBaoArchiveFiles(archiveBytes);
  const manifestBytes = files.get(BAO_MANIFEST_ENTRY);
  if (manifestBytes === undefined) {
    return { error: `${label} does not contain ${BAO_MANIFEST_ENTRY}` };
  }
  return parseManifestJson(new TextDecoder().decode(manifestBytes), `${label} manifest`);
}

async function readManifestArchiveFile(
  archivePath: string,
  config: BaoInstallConfig,
): Promise<{ manifest: BaoManifest; basePath: string } | { error: string }> {
  if (
    config.sourcePolicy.requireBaoExtensionForLocalPath &&
    !archivePath.toLowerCase().endsWith(".bao")
  ) {
    return { error: "archivePath must point to a .bao archive" };
  }
  const resolved = resolveWorkspacePath(archivePath);
  if ("error" in resolved) {
    return { error: "archivePath must resolve within the server working directory" };
  }
  const file = Bun.file(resolved.resolvedPath);
  const exists = await file.exists();
  if (!exists) {
    return { error: `Archive file not found: ${archivePath}` };
  }
  const parsed = parseArchiveManifest(new Uint8Array(await file.arrayBuffer()), "Archive file");
  if ("error" in parsed) {
    return parsed;
  }
  return { manifest: parsed.manifest, basePath: path.dirname(resolved.resolvedPath) };
}

function hostAllowed(url: URL, hosts: readonly string[]): boolean {
  if (hosts.length === 0) {
    return true;
  }
  return hosts.some((host) => {
    const normalized = host.trim().toLowerCase();
    return (
      normalized === "*" ||
      normalized === url.host.toLowerCase() ||
      normalized === url.hostname.toLowerCase()
    );
  });
}

type FetchFailureReason = object | string | number | boolean | null | undefined;

function describeFetchFailure(reason: FetchFailureReason): string {
  if (reason && typeof reason === "object" && "message" in reason) {
    const message = reason.message;
    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }
  return String(reason);
}

async function fetchBytes(url: URL): Promise<{ bytes: Uint8Array } | { error: string }> {
  const response = await fetch(url).then(
    (value) => ({ ok: true as const, value }),
    (reason: FetchFailureReason) => ({
      ok: false as const,
      error: describeFetchFailure(reason),
    }),
  );
  if (!response.ok) {
    return { error: `Failed to fetch ${url.toString()}: ${response.error}` };
  }
  if (!response.value.ok) {
    return { error: `${url.toString()} returned HTTP ${response.value.status}` };
  }
  return { bytes: new Uint8Array(await response.value.arrayBuffer()) };
}

async function readManifestJsonUrl(
  manifestUrl: string,
  config: BaoInstallConfig,
): Promise<{ manifest: BaoManifest; basePath: string } | { error: string }> {
  const urlResult = validateRemoteSourceUrl(manifestUrl, config, false);
  if ("error" in urlResult) {
    return urlResult;
  }
  const fetched = await fetchBytes(urlResult.url);
  if ("error" in fetched) {
    return fetched;
  }
  const parsed = parseManifestJson(new TextDecoder().decode(fetched.bytes), "Remote manifest");
  if ("error" in parsed) {
    return parsed;
  }
  return { manifest: parsed.manifest, basePath: process.cwd() };
}

async function readManifestArchiveUrl(
  archiveUrl: string,
  config: BaoInstallConfig,
): Promise<{ manifest: BaoManifest; basePath: string } | { error: string }> {
  const urlResult = validateRemoteSourceUrl(archiveUrl, config, true);
  if ("error" in urlResult) {
    return urlResult;
  }
  const fetched = await fetchBytes(urlResult.url);
  if ("error" in fetched) {
    return fetched;
  }
  const parsed = parseArchiveManifest(fetched.bytes, "Remote archive");
  if ("error" in parsed) {
    return parsed;
  }
  return { manifest: parsed.manifest, basePath: process.cwd() };
}

function validateRemoteSourceUrl(
  sourceUrl: string,
  config: BaoInstallConfig,
  requireBaoExtension: boolean,
): { url: URL } | { error: string } {
  if (!config.sourcePolicy.allowRemoteUrls) {
    return { error: "Remote URLs are disabled by source policy" };
  }
  if (!URL.canParse(sourceUrl)) {
    return { error: `Invalid URL: ${sourceUrl}` };
  }
  const url = new URL(sourceUrl);
  if (url.protocol !== "https:") {
    return { error: `Unsupported URL protocol: ${url.protocol}` };
  }
  if (requireBaoExtension && !url.pathname.toLowerCase().endsWith(".bao")) {
    return { error: "Remote archive URL must point to a .bao path" };
  }
  if (!hostAllowed(url, config.sourcePolicy.allowedRemoteHosts)) {
    return { error: `Remote URL host "${url.host}" is not in the allowlist` };
  }
  return { url };
}

type RegistryInstallResolution = {
  release?: {
    manifestUrl?: string;
    artifacts?: readonly { url?: string; mediaType?: string }[];
  };
};

function hasLegacyManifestSource(body: {
  manifest?: unknown;
  manifestPath?: string;
  manifestUrl?: string;
}): boolean {
  return (
    body.manifest !== undefined || body.manifestPath !== undefined || body.manifestUrl !== undefined
  );
}

function isRegistryInstallResolution(value: unknown): value is RegistryInstallResolution {
  return typeof value === "object" && value !== null && "release" in value;
}

async function readManifestFromRegistry(
  body: { registryNamespace?: string; registryName?: string; registryVersion?: string },
  config: BaoInstallConfig,
): Promise<{ manifest: BaoManifest; basePath: string } | { error: string }> {
  if (config.registryBaseUrl === undefined) {
    return { error: "registryBaseUrl is required for registry-based manifest resolution" };
  }
  const namespace = body.registryNamespace?.trim() || config.registryDefaultNamespace;
  const name = body.registryName?.trim() ?? "";
  if (name.length === 0) {
    return { error: "registryName is required" };
  }
  const selector = body.registryVersion
    ? `${namespace}/${name}@${body.registryVersion}`
    : `${namespace}/${name}`;
  const installUrl = new URL(BAO_INSTALL_API_PATHS.REGISTRY_INSTALL, config.registryBaseUrl);
  const response = await fetch(installUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ selector }),
  }).then(
    (value) => ({ ok: true as const, value }),
    (reason: FetchFailureReason) => ({
      ok: false as const,
      error: describeFetchFailure(reason),
    }),
  );
  if (!response.ok) {
    return { error: `Failed to resolve registry package "${selector}": ${response.error}` };
  }
  if (!response.value.ok) {
    return { error: `Registry package "${selector}" returned HTTP ${response.value.status}` };
  }
  const responseText = await response.value.text();
  const parsed = toResultSync(() => JSON.parse(responseText));
  if (!parsed.ok || !isRegistryInstallResolution(parsed.value)) {
    return { error: `Registry package "${selector}" returned an invalid install resolution` };
  }
  const archiveArtifact = parsed.value.release?.artifacts?.find(
    (artifact) => artifact.mediaType === BAO_ARCHIVE_MEDIA_TYPE,
  );
  const sourceUrl = archiveArtifact?.url;
  if (sourceUrl === undefined) {
    return { error: `Registry package "${selector}" has no installable artifact URL` };
  }
  const archiveUrl = new URL(sourceUrl, config.registryBaseUrl);
  return await readManifestRegistryArchiveUrl(archiveUrl, config.registryBaseUrl);
}

async function readManifestRegistryArchiveUrl(
  archiveUrl: URL,
  registryBaseUrl: string,
): Promise<{ manifest: BaoManifest; basePath: string } | { error: string }> {
  const registryUrl = new URL(registryBaseUrl);
  if (archiveUrl.host !== registryUrl.host || archiveUrl.protocol !== registryUrl.protocol) {
    return { error: "Registry artifact URL must resolve under registryBaseUrl" };
  }
  const fetched = await fetchBytes(archiveUrl);
  if ("error" in fetched) {
    return fetched;
  }
  const parsed = parseArchiveManifest(fetched.bytes, "Registry archive");
  if ("error" in parsed) {
    return parsed;
  }
  return { manifest: parsed.manifest, basePath: process.cwd() };
}

// Plugin

export function baoInstallPlugin(configOverride?: Partial<BaoInstallConfig>) {
  const defaults = createDefaultBaoInstallConfig();
  const config: BaoInstallConfig = {
    ...defaults,
    ...configOverride,
    sourcePolicy: { ...defaults.sourcePolicy, ...configOverride?.sourcePolicy },
    trustPolicy: { ...defaults.trustPolicy, ...configOverride?.trustPolicy },
    targetAllowlist: { ...defaults.targetAllowlist, ...configOverride?.targetAllowlist },
    supportedSchemaVersion:
      configOverride?.supportedSchemaVersion ?? defaults.supportedSchemaVersion,
    registryBaseUrl: configOverride?.registryBaseUrl ?? defaults.registryBaseUrl,
    registryDefaultNamespace:
      configOverride?.registryDefaultNamespace ?? defaults.registryDefaultNamespace,
  };

  const MAX_INSTALL_RECORDS = 512;
  const installRecords = new Map<string, BaoInstallRecord>();

  return new Elysia({ prefix: BAO_INSTALL_API_PATHS.PREFIX })
    .post(
      "/validate",
      async ({ body, set }) => {
        const resolved = await resolveManifest(body, config);
        if ("error" in resolved) {
          set.status = BAO_INSTALL_HTTP_STATUS.BAD_REQUEST;
          return { valid: false, error: resolved.error };
        }

        const manifest = resolveBaoManifestFileReferences(resolved.manifest, resolved.basePath);

        const result = await validateBaoManifest(manifest, config);
        set.status = result.valid
          ? BAO_INSTALL_HTTP_STATUS.OK
          : BAO_INSTALL_HTTP_STATUS.UNPROCESSABLE_CONTENT;
        return result;
      },
      { body: manifestBodySchema },
    )
    .post(
      "/install",
      async ({ body, set }) => {
        if (hasLegacyManifestSource(body)) {
          set.status = BAO_INSTALL_HTTP_STATUS.BAD_REQUEST;
          return {
            error:
              "Install requires archivePath, archiveUrl, or registryName; raw manifest sources are validate-only",
          };
        }

        const resolved = await resolveManifest(body, config);
        if ("error" in resolved) {
          set.status = BAO_INSTALL_HTTP_STATUS.BAD_REQUEST;
          return { error: resolved.error };
        }

        const manifest = resolveBaoManifestFileReferences(resolved.manifest, resolved.basePath);

        const result = await validateBaoManifest(manifest, config);
        if (!result.valid) {
          set.status = BAO_INSTALL_HTTP_STATUS.UNPROCESSABLE_CONTENT;
          return { error: "Manifest validation failed", issues: result.issues };
        }

        const installId = generateInstallId();

        const record: BaoInstallRecord = {
          id: installId,
          status: "installed",
          manifest,
          createdAt: new Date().toISOString(),
        };

        if (installRecords.size >= MAX_INSTALL_RECORDS) {
          const oldest = firstInstallRecordId(installRecords);
          if (oldest !== undefined) {
            installRecords.delete(oldest);
          }
        }
        installRecords.set(installId, record);

        set.status = BAO_INSTALL_HTTP_STATUS.CREATED;
        return {
          id: installId,
          status: record.status,
          plan: result.plan,
          resolvedInstallOrder: result.resolvedInstallOrder,
        };
      },
      { body: manifestBodySchema },
    )
    .get("/:id/status", ({ params, set }) => {
      const record = installRecords.get(params.id);
      if (record === undefined) {
        set.status = BAO_INSTALL_HTTP_STATUS.NOT_FOUND;
        return { error: `Install record "${params.id}" not found` };
      }
      return {
        id: record.id,
        status: record.status,
        createdAt: record.createdAt,
        manifestName: record.manifest.metadata.name,
        manifestVersion: record.manifest.metadata.version,
        error: record.error,
      };
    })
    .post(
      "/mount",
      async ({ body, set }) => {
        if (hasLegacyManifestSource(body)) {
          set.status = BAO_INSTALL_HTTP_STATUS.BAD_REQUEST;
          return {
            error:
              "Mount requires archivePath, archiveUrl, or registryName; raw manifest sources are validate-only",
          };
        }

        const resolved = await resolveManifest(body, config);
        if ("error" in resolved) {
          set.status = BAO_INSTALL_HTTP_STATUS.BAD_REQUEST;
          return { error: resolved.error };
        }

        const manifest = resolveBaoManifestFileReferences(resolved.manifest, resolved.basePath);

        const result = await validateBaoManifest(manifest, config);
        if (!result.valid) {
          set.status = BAO_INSTALL_HTTP_STATUS.UNPROCESSABLE_CONTENT;
          return { error: "Manifest validation failed", issues: result.issues };
        }

        const mountId = generateInstallId();

        set.status = BAO_INSTALL_HTTP_STATUS.OK;
        return {
          id: mountId,
          status: "mounted",
          ephemeral: true,
          plan: result.plan,
          manifestName: manifest.metadata.name,
        };
      },
      { body: manifestBodySchema },
    );
}
