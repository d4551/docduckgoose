import { normalizePath } from "@baohaus/bao-contracts/bao/bao-archive.contract";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type {
  BaoArchiveFileContent,
  BaoArchiveInput,
  BaoArchivePayloadInputs,
} from "./bao-archive.types.ts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeEntrypointPath(value: unknown): string {
  if (!isNonEmptyString(value)) {
    return "index.js";
  }

  const normalized = normalizePath(value).replace(/^\.?\//u, "");
  return normalized.length > 0 ? normalized : "index.js";
}

function toModuleRelativePath(filePath: string): string {
  return filePath.startsWith("./") ? filePath : `./${filePath}`;
}

function isMaterializablePackagePath(path: string): boolean {
  return !path.includes("*");
}

function appendBinPaths(value: unknown, referencedPaths: Set<string>, binPaths: Set<string>): void {
  if (isNonEmptyString(value)) {
    const normalized = normalizeEntrypointPath(value);
    if (isMaterializablePackagePath(normalized)) {
      referencedPaths.add(normalized);
      binPaths.add(normalized);
    }
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  for (const binPath of Object.values(value)) {
    appendBinPaths(binPath, referencedPaths, binPaths);
  }
}

function appendExportPaths(value: unknown, referencedPaths: Set<string>): void {
  if (isNonEmptyString(value)) {
    const normalized = normalizeEntrypointPath(value);
    if (isMaterializablePackagePath(normalized)) {
      referencedPaths.add(normalized);
    }
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  for (const exportValue of Object.values(value)) {
    appendExportPaths(exportValue, referencedPaths);
  }
}

function addIfMaterializable(candidate: string, referencedPaths: Set<string>): void {
  const normalized = normalizeEntrypointPath(candidate);
  if (isMaterializablePackagePath(normalized)) {
    referencedPaths.add(normalized);
  }
}

function appendPayloadFilePathsFromArray(
  value: readonly unknown[],
  referencedPaths: Set<string>,
): void {
  for (const entry of value) {
    if (isRecord(entry) && isNonEmptyString(entry.path)) {
      addIfMaterializable(entry.path, referencedPaths);
    }
  }
}

function appendPayloadFilePathsFromRecord(
  value: Record<string, unknown>,
  referencedPaths: Set<string>,
): void {
  for (const filePath of Object.keys(value)) {
    addIfMaterializable(filePath, referencedPaths);
  }
}

function appendPayloadFilePaths(value: unknown, referencedPaths: Set<string>): void {
  if (Array.isArray(value)) {
    appendPayloadFilePathsFromArray(value, referencedPaths);
    return;
  }
  if (isRecord(value)) {
    appendPayloadFilePathsFromRecord(value, referencedPaths);
  }
}

function appendTargetPayloadPaths(
  target: Record<string, unknown>,
  referencedPaths: Set<string>,
): void {
  const sharedPayload = isRecord(target.sharedPayload) ? target.sharedPayload : undefined;
  appendPayloadFilePaths(sharedPayload?.files, referencedPaths);

  const platformPayloads = Array.isArray(target.platformPayloads) ? target.platformPayloads : [];
  for (const platformPayload of platformPayloads) {
    if (isRecord(platformPayload)) {
      appendPayloadFilePaths(platformPayload.files, referencedPaths);
      const nestedPayload = isRecord(platformPayload.payload) ? platformPayload.payload : undefined;
      appendPayloadFilePaths(nestedPayload?.files, referencedPaths);
    }
  }
}

function createFallbackFileContent(path: string, isBinPath: boolean): BaoArchiveFileContent {
  if (path.endsWith(".d.ts")) {
    return "declare const _default: Record<string, never>;\nexport default _default;\n";
  }

  if (isBinPath) {
    return "#!/usr/bin/env bun\nexport default {};\n";
  }

  if (path.endsWith(".cjs")) {
    return "module.exports = {};\n";
  }

  return "export default {};\n";
}

function resolveBaoPackageTarget(manifest: BaoManifest): Record<string, unknown> | null {
  const candidate = manifest.targets.find(
    (target) => isRecord(target) && target.kind === "bao-package",
  );

  return candidate && isRecord(candidate) ? candidate : null;
}

function resolveBaoPackageEntrypoint(target: Record<string, unknown>): string {
  const sharedPayload = isRecord(target.sharedPayload) ? target.sharedPayload : undefined;
  const entrypoints = Array.isArray(sharedPayload?.entrypoints)
    ? sharedPayload.entrypoints.filter(isNonEmptyString)
    : [];

  return normalizeEntrypointPath(entrypoints[0]);
}

function buildFallbackSharedPayload(
  manifest: BaoManifest,
): Record<string, BaoArchiveFileContent> | undefined {
  const baoPackageTarget = resolveBaoPackageTarget(manifest);
  if (!baoPackageTarget) {
    return;
  }

  const entrypoint = resolveBaoPackageEntrypoint(baoPackageTarget);
  const modulePath = toModuleRelativePath(entrypoint);
  const packageJson: Record<string, unknown> = {
    name: isNonEmptyString(baoPackageTarget.packageName)
      ? baoPackageTarget.packageName
      : manifest.metadata.name,
    version: isNonEmptyString(baoPackageTarget.packageVersion)
      ? baoPackageTarget.packageVersion
      : manifest.metadata.version,
    type: "module",
    main: modulePath,
    exports: { ".": modulePath },
  };
  const referencedPaths = new Set<string>([entrypoint]);
  const binPaths = new Set<string>();
  appendTargetPayloadPaths(baoPackageTarget, referencedPaths);

  if (typeof baoPackageTarget.bin === "string" || isRecord(baoPackageTarget.bin)) {
    packageJson.bin = baoPackageTarget.bin;
    appendBinPaths(baoPackageTarget.bin, referencedPaths, binPaths);
  }

  if (isRecord(baoPackageTarget.exports)) {
    packageJson.exports = baoPackageTarget.exports;
    appendExportPaths(baoPackageTarget.exports, referencedPaths);
  }

  const files: Record<string, BaoArchiveFileContent> = {
    "package.json": `${JSON.stringify(packageJson, null, 2)}\n`,
  };

  for (const referencedPath of referencedPaths) {
    files[referencedPath] = createFallbackFileContent(referencedPath, binPaths.has(referencedPath));
  }

  return files;
}

export function resolvePayloadInput(input: BaoArchiveInput): BaoArchivePayloadInputs | undefined {
  if (input.payload !== undefined) {
    return input.payload;
  }

  const fallbackShared = buildFallbackSharedPayload(input.manifest);
  if (!fallbackShared) {
    return undefined;
  }

  return {
    shared: {
      ...fallbackShared,
    },
  };
}
