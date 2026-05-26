import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { sha256Hex } from "./bao-manifest-checksum.ts";

type PayloadFileDescriptor = {
  path: string;
  sha256: string;
  sizeBytes?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPayloadFileDescriptor(value: unknown): value is PayloadFileDescriptor {
  return (
    isRecord(value) &&
    typeof value.path === "string" &&
    value.path.length > 0 &&
    typeof value.sha256 === "string" &&
    value.sha256.length > 0 &&
    (value.sizeBytes === undefined || typeof value.sizeBytes === "number")
  );
}

function payloadFiles(value: unknown): PayloadFileDescriptor[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(isPayloadFileDescriptor);
}

function appendPayloadFileIssues(params: {
  entries: ReadonlyMap<string, Uint8Array>;
  issues: string[];
  file: PayloadFileDescriptor;
  fullPath: string;
  requireSize: boolean;
}): void {
  const { entries, issues, file, fullPath, requireSize } = params;
  const actual = entries.get(fullPath);

  if (!actual) {
    issues.push(`missing payload file: ${fullPath}`);
    return;
  }

  if (requireSize && file.sizeBytes !== undefined && actual.byteLength !== file.sizeBytes) {
    issues.push(`size mismatch ${fullPath}: expected ${file.sizeBytes}, got ${actual.byteLength}`);
  }

  if (sha256Hex(actual) !== file.sha256) {
    issues.push(`sha256 mismatch ${fullPath}`);
  }
}

function appendSharedPayloadIssues(
  entries: ReadonlyMap<string, Uint8Array>,
  files: readonly PayloadFileDescriptor[],
  issues: string[],
): void {
  for (const file of files) {
    appendPayloadFileIssues({
      entries,
      issues,
      file,
      fullPath: `payload/shared/${file.path}`,
      requireSize: true,
    });
  }
}

function appendPlatformPayloadIssues(
  entries: ReadonlyMap<string, Uint8Array>,
  platformPayloads: readonly unknown[],
  issues: string[],
): void {
  for (const platform of platformPayloads) {
    if (!isRecord(platform) || typeof platform.platformId !== "string") {
      continue;
    }
    for (const file of payloadFiles(platform.files)) {
      appendPayloadFileIssues({
        entries,
        issues,
        file,
        fullPath: `payload/platforms/${platform.platformId}/${file.path}`,
        requireSize: true,
      });
    }
  }
}

function appendOptionalPayloadIssues(
  entries: ReadonlyMap<string, Uint8Array>,
  issues: string[],
  prefix: string,
  files: readonly PayloadFileDescriptor[] | undefined,
): void {
  for (const file of files ?? []) {
    appendPayloadFileIssues({
      entries,
      issues,
      file,
      fullPath: `${prefix}/${file.path}`,
      requireSize: false,
    });
  }
}

export function appendManifestPayloadIssues(
  entries: ReadonlyMap<string, Uint8Array>,
  manifest: BaoManifest,
  issues: string[],
): void {
  for (const target of manifest.targets) {
    const sharedPayload = isRecord(target.sharedPayload) ? target.sharedPayload : undefined;
    appendSharedPayloadIssues(entries, payloadFiles(sharedPayload?.files), issues);

    const platformPayloads = Array.isArray(target.platformPayloads) ? target.platformPayloads : [];
    appendPlatformPayloadIssues(entries, platformPayloads, issues);

    const bytecodePayload = isRecord(target.bytecodePayload) ? target.bytecodePayload : undefined;
    appendOptionalPayloadIssues(
      entries,
      issues,
      "payload/bytecode",
      payloadFiles(bytecodePayload?.files),
    );

    const wasmPayload = isRecord(target.wasmPayload) ? target.wasmPayload : undefined;
    appendOptionalPayloadIssues(entries, issues, "payload/wasm", payloadFiles(wasmPayload?.files));
  }
}
