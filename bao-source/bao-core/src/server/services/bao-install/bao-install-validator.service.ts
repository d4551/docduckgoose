import { BAO_MANIFEST_SCHEMA_VERSION } from "@baohaus/bao-schemas/bao-install/core.schemas";
import { type BaoManifest, isBaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { buildDependencyGraph } from "@baohaus/bao-utils/canonical/bao-target-graph";
import type { ValidationIssue, ValidationResult } from "./bao-install-validation.types.ts";
import {
  appendOrderingIssues,
  appendTargetsStructureIssues,
} from "./bao-install-validator-targets.ts";
import { appendTargetPayloadIssues } from "./target-validators.ts";

const FINAL_VALIDATION_PASS = 9;

function appendManifestShapeIssues(issues: ValidationIssue[], manifest: BaoManifest): void {
  if (!isBaoManifest(manifest)) {
    issues.push({
      pass: 1,
      code: "INVALID_MANIFEST_SCHEMA",
      message: "Manifest does not satisfy canonical .bao manifest schema",
      path: "manifest",
    });
    return;
  }

  if (manifest.schemaVersion !== BAO_MANIFEST_SCHEMA_VERSION) {
    issues.push({
      pass: 1,
      code: "INVALID_SCHEMA_VERSION",
      message: `schemaVersion must be ${BAO_MANIFEST_SCHEMA_VERSION}, got ${manifest.schemaVersion}`,
      path: "schemaVersion",
    });
  }

  if (!manifest.metadata.name) {
    issues.push({
      pass: 1,
      code: "MISSING_METADATA_NAME",
      message: "metadata.name is required",
      path: "metadata.name",
    });
  }

  if (!manifest.metadata.version) {
    issues.push({
      pass: 1,
      code: "MISSING_METADATA_VERSION",
      message: "metadata.version is required",
      path: "metadata.version",
    });
  }
}

function appendChecksumIssues(issues: ValidationIssue[], manifest: BaoManifest): void {
  if (!manifest.metadata.checksum?.value) {
    issues.push({
      pass: 2,
      code: "MISSING_CHECKSUM",
      message: "metadata.checksum.value is required",
      path: "metadata.checksum",
    });
  }
}

function appendCycleIssues(issues: ValidationIssue[], manifest: BaoManifest): void {
  const { cyclicTargets } = buildDependencyGraph(manifest);
  if (cyclicTargets.length === 0) {
    return;
  }

  issues.push({
    pass: 6,
    code: "DEPENDENCY_CYCLE",
    message: `Dependency cycle detected across targets: ${cyclicTargets.join(", ")}`,
    path: "targets",
  });
}

export function validateBaoManifest(manifest: BaoManifest): ValidationResult {
  const issues: ValidationIssue[] = [];

  appendManifestShapeIssues(issues, manifest);
  appendChecksumIssues(issues, manifest);

  const declaredIds = appendTargetsStructureIssues(issues, manifest);
  if (declaredIds.size > 0) {
    appendOrderingIssues(issues, manifest, declaredIds);
    appendTargetPayloadIssues(issues, manifest);
    appendCycleIssues(issues, manifest);
  }

  if (issues.length > 0) {
    const firstPass = issues[0]?.pass ?? FINAL_VALIDATION_PASS;
    return { valid: false, issues, pass: firstPass };
  }

  return { valid: true, issues: [], pass: FINAL_VALIDATION_PASS };
}

export function resolveInstallOrder(manifest: BaoManifest): string[] {
  return [...buildDependencyGraph(manifest).orderedIds];
}
