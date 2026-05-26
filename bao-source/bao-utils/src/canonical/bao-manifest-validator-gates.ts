import {
  ARCHIVE_ENTRIES,
  BAO_MANIFEST_SCHEMA_VERSION,
} from "@baohaus/bao-contracts/bao/bao-archive.contract";
import {
  BAO_INSTALL_TARGET_KINDS,
  type BaoInstallTargetKind as TargetKind,
} from "@baohaus/bao-schemas/bao-install/core.schemas";
import {
  type BaoManifest,
  BaoManifestSchema as baoManifestSchema,
} from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTargetBase as Target } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { TARGET_PAYLOAD_SCHEMAS } from "@baohaus/bao-schemas/bao-target-payloads.schemas";
import { decodeBaoManifestBin, serializeBaoManifestCanonical } from "./bao-manifest-bin.ts";
import {
  computeArchiveContentMerkleRoot,
  computeBaoManifestChecksum,
} from "./bao-manifest-checksum.ts";
import {
  DEFAULT_TRUST_POLICY,
  type TrustPolicy,
  validateSignaturePolicy,
} from "./bao-manifest-signer.ts";
import type { ValidationContext, ValidationGateResult } from "./bao-manifest-validator.types.ts";
import { appendManifestPayloadIssues } from "./bao-manifest-validator-payload.ts";
import { buildDependencyGraph, getStringList } from "./bao-target-graph.ts";
import { extractTargetPayload } from "./bao-target-payload.ts";
import { getTypeBoxChecker, getTypeBoxErrorIterator } from "./typebox-runtime.ts";

export const BAO_VALIDATION_GATE_IDS = {
  archiveLayout: 1,
  manifestJsonParse: 2,
  manifestBinHeader: 3,
  signatureVerify: 4,
  jsonSchema: 6,
  binJsonParity: 7,
  perFileSha256: 8,
  merkleRoot: 9,
  targetKindPayloads: 10,
  targetIdUniqueness: 11,
  dependencyGraph: 12,
  beforeAfterReferences: 13,
  runtimeMatrix: 14,
  lifecycleHookPaths: 15,
  trustPolicy: 16,
  complianceTags: 17,
  sbomIntegrity: 18,
} as const;

function gateResult(
  gate: number,
  name: string,
  issues: readonly string[] = [],
): ValidationGateResult {
  return { gate, name, valid: issues.length === 0, issues };
}

export function checkJsonSchema(manifest: BaoManifest): ValidationGateResult {
  const issues: string[] = [];
  const checker = getTypeBoxChecker(baoManifestSchema);

  if (checker && !checker(manifest)) {
    issues.push("manifest failed TypeBox schema check");
  }
  if (manifest.schemaVersion !== BAO_MANIFEST_SCHEMA_VERSION) {
    issues.push(`schemaVersion must be ${BAO_MANIFEST_SCHEMA_VERSION}`);
  }
  if (
    manifest.metadata.minSchemaVersion !== undefined &&
    manifest.metadata.minSchemaVersion > BAO_MANIFEST_SCHEMA_VERSION
  ) {
    issues.push(
      `metadata.minSchemaVersion ${manifest.metadata.minSchemaVersion} exceeds supported schemaVersion ${BAO_MANIFEST_SCHEMA_VERSION}`,
    );
  }

  return gateResult(BAO_VALIDATION_GATE_IDS.jsonSchema, "json-schema", issues);
}

export function checkBinJsonParity(
  entries: ReadonlyMap<string, Uint8Array>,
  manifest: BaoManifest,
): ValidationGateResult {
  const bin = entries.get(ARCHIVE_ENTRIES.MANIFEST_BIN);
  const json = entries.get(ARCHIVE_ENTRIES.MANIFEST_JSON);

  if (!json) {
    return gateResult(BAO_VALIDATION_GATE_IDS.binJsonParity, "bin-json-parity", [
      "manifest.json missing",
    ]);
  }

  if (!bin) {
    return gateResult(BAO_VALIDATION_GATE_IDS.binJsonParity, "bin-json-parity", [
      "manifest.bin missing",
    ]);
  }

  const decodedManifest = decodeBaoManifestBin(bin);
  if (!decodedManifest) {
    return gateResult(BAO_VALIDATION_GATE_IDS.binJsonParity, "bin-json-parity", [
      "manifest.bin is not a canonical BMv1 envelope",
    ]);
  }

  const canonicalManifest = serializeBaoManifestCanonical(manifest);
  const canonicalBinManifest = serializeBaoManifestCanonical(decodedManifest);
  if (canonicalBinManifest !== canonicalManifest) {
    return gateResult(BAO_VALIDATION_GATE_IDS.binJsonParity, "bin-json-parity", [
      "manifest.bin does not match manifest.json",
    ]);
  }

  if (new TextDecoder().decode(json) !== canonicalManifest) {
    return gateResult(BAO_VALIDATION_GATE_IDS.binJsonParity, "bin-json-parity", [
      "manifest.json is not canonically encoded",
    ]);
  }

  const expectedChecksum = computeBaoManifestChecksum(manifest);
  const declaredChecksum = manifest.metadata.checksum;
  if (!declaredChecksum) {
    return gateResult(BAO_VALIDATION_GATE_IDS.binJsonParity, "bin-json-parity", [
      "metadata.checksum is required for canonical manifest parity validation",
    ]);
  }
  if (expectedChecksum !== declaredChecksum.value) {
    return gateResult(BAO_VALIDATION_GATE_IDS.binJsonParity, "bin-json-parity", [
      "metadata.checksum.value does not match recomputed value",
    ]);
  }

  return gateResult(BAO_VALIDATION_GATE_IDS.binJsonParity, "bin-json-parity");
}

export function checkPerFileSha256(
  entries: ReadonlyMap<string, Uint8Array>,
  manifest: BaoManifest,
): ValidationGateResult {
  const issues: string[] = [];
  appendManifestPayloadIssues(entries, manifest, issues);

  return gateResult(BAO_VALIDATION_GATE_IDS.perFileSha256, "per-file-sha256", issues);
}

export function checkMerkleRoot(entries: ReadonlyMap<string, Uint8Array>): ValidationGateResult {
  const computed = computeArchiveContentMerkleRoot(entries);
  if (computed.length === 0) {
    return gateResult(BAO_VALIDATION_GATE_IDS.merkleRoot, "merkle-root", [
      "archive content merkle root could not be computed",
    ]);
  }
  return gateResult(BAO_VALIDATION_GATE_IDS.merkleRoot, "merkle-root");
}

function appendTargetSchemaIssues(issues: string[], target: Target, schema: object): void {
  const checker = getTypeBoxChecker(schema);
  if (!checker) {
    return;
  }

  const payload = extractTargetPayload(target);
  if (checker(payload)) {
    return;
  }

  const errors = getTypeBoxErrorIterator(schema);
  if (errors) {
    for (const error of errors(payload)) {
      issues.push(
        `target ${target.target} (${target.kind}) payload invalid${error.path ? ` at ${error.path}` : ""}: ${error.message ?? "unknown"}`,
      );
    }
    return;
  }

  issues.push(`target ${target.target} (${target.kind}) payload failed schema check`);
}

export function checkTargetKindPayloads(manifest: BaoManifest): ValidationGateResult {
  const issues: string[] = [];
  const knownKinds = new Set<TargetKind>(Object.values(BAO_INSTALL_TARGET_KINDS));

  for (const target of manifest.targets) {
    const kind = target.kind;
    if (knownKinds.has(kind)) {
      appendTargetSchemaIssues(issues, target, TARGET_PAYLOAD_SCHEMAS[kind]);
    } else {
      issues.push(`unknown target kind: ${target.kind}`);
    }
  }

  return gateResult(BAO_VALIDATION_GATE_IDS.targetKindPayloads, "target-kind-payloads", issues);
}

export function checkTargetIdUniqueness(manifest: BaoManifest): ValidationGateResult {
  const ids = new Set<string>();
  const issues: string[] = [];

  for (const target of manifest.targets) {
    if (ids.has(target.target)) {
      issues.push(`duplicate target id: ${target.target}`);
    }
    ids.add(target.target);
  }

  return gateResult(BAO_VALIDATION_GATE_IDS.targetIdUniqueness, "target-id-uniqueness", issues);
}

export function checkDependencyGraph(manifest: BaoManifest): ValidationGateResult {
  const { cyclicTargets } = buildDependencyGraph(manifest);
  return gateResult(
    BAO_VALIDATION_GATE_IDS.dependencyGraph,
    "dependency-graph",
    cyclicTargets.length > 0
      ? [`dependency cycle detected across targets: ${cyclicTargets.join(", ")}`]
      : [],
  );
}

function appendUnknownReferenceIssues(
  issues: string[],
  targetId: string,
  refs: readonly string[],
  relation: "before" | "after",
  ids: Set<string>,
): void {
  for (const ref of refs) {
    if (!ids.has(ref)) {
      issues.push(`target ${targetId}.${relation} references unknown id: ${ref}`);
    }
  }
}

export function checkBeforeAfterReferences(manifest: BaoManifest): ValidationGateResult {
  const ids = new Set(manifest.targets.map((target) => target.target));
  const issues: string[] = [];

  for (const target of manifest.targets) {
    appendUnknownReferenceIssues(
      issues,
      target.target,
      getStringList(target.before),
      "before",
      ids,
    );
    appendUnknownReferenceIssues(issues, target.target, getStringList(target.after), "after", ids);
  }

  return gateResult(BAO_VALIDATION_GATE_IDS.beforeAfterReferences, "before-after-refs", issues);
}

export function checkCompatibilityMatrix(
  manifest: BaoManifest,
  context: ValidationContext,
): ValidationGateResult {
  const issues: string[] = [];
  if (context.installedRuntime && manifest.metadata.minSchemaVersion === undefined) {
    issues.push("metadata.minSchemaVersion is required when runtime compatibility is validated");
  }

  return gateResult(BAO_VALIDATION_GATE_IDS.runtimeMatrix, "runtime-matrix", issues);
}

export function checkLifecycleHookPaths(
  entries: ReadonlyMap<string, Uint8Array>,
  manifest: BaoManifest,
): ValidationGateResult {
  const issues: string[] = [];

  for (const target of manifest.targets) {
    const { lifecycle } = target;
    if (lifecycle) {
      for (const hookPath of Object.values(lifecycle)) {
        if (typeof hookPath === "string" && hookPath.length > 0 && !entries.has(hookPath)) {
          issues.push(`lifecycle hook file missing in archive: ${hookPath}`);
        }
      }
    }
  }

  return gateResult(BAO_VALIDATION_GATE_IDS.lifecycleHookPaths, "lifecycle-hook-paths", issues);
}

export function checkTrustPolicy(
  manifest: BaoManifest,
  context: ValidationContext,
): ValidationGateResult {
  const policy: TrustPolicy = context.trustPolicy ?? DEFAULT_TRUST_POLICY;
  const policyResult = validateSignaturePolicy(manifest, policy);
  return gateResult(BAO_VALIDATION_GATE_IDS.trustPolicy, "trust-policy", policyResult.issues ?? []);
}

export function checkComplianceTagsPresent(manifest: BaoManifest): ValidationGateResult {
  const issues =
    manifest.description === undefined && manifest.metadata.description === undefined
      ? ["manifest description or metadata.description is required for install review"]
      : [];
  return gateResult(BAO_VALIDATION_GATE_IDS.complianceTags, "compliance-tags", issues);
}

export function checkSbomIntegrity(
  entries: ReadonlyMap<string, Uint8Array>,
  manifest: BaoManifest,
): ValidationGateResult {
  if (manifest.metadata.signature === undefined) {
    return gateResult(BAO_VALIDATION_GATE_IDS.sbomIntegrity, "sbom-integrity");
  }

  const requiredAttestationEntries = [
    ARCHIVE_ENTRIES.ATTESTATION_SBOM_CYCLONEDX,
    ARCHIVE_ENTRIES.ATTESTATION_SBOM_SPDX,
    ARCHIVE_ENTRIES.ATTESTATION_VEX,
    ARCHIVE_ENTRIES.ATTESTATION_SLSA,
    ARCHIVE_ENTRIES.ATTESTATION_LICENSE_SCAN,
    ARCHIVE_ENTRIES.ATTESTATION_VULN_SCAN,
  ] as const;
  const issues = requiredAttestationEntries.flatMap((path) =>
    entries.has(path) ? [] : [`attestation file missing: ${path}`],
  );

  return gateResult(BAO_VALIDATION_GATE_IDS.sbomIntegrity, "sbom-integrity", issues);
}

export function resolveInstallOrder(manifest: BaoManifest): string[] {
  const graph = buildDependencyGraph(manifest);
  return graph.cyclicTargets.length > 0
    ? manifest.targets.map((target) => target.target)
    : [...graph.orderedIds];
}
