/**
 * Shared `.bao` manifest validation types and schema-level validator.
 *
 * Provides the types and a TypeBox-only validation pass that shared-layer
 * consumers (e.g. Bao Composer) can use without depending on the server-side
 * adapter registry.  Full adapter-aware validation lives in the server's
 * `bao-install-validator.service.ts`.
 *
 * @packageDocumentation
 */

import { BAO_MANIFEST_SCHEMA_VERSION } from "@baohaus/bao-schemas/bao-install/core.schemas";
import {
  BaoManifestSchema,
  isBaoManifest,
} from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { Errors } from "@baohaus/baobox/value";

/**
 * A single validation issue produced by manifest validation.
 */
export interface BaoInstallValidationIssue {
  /** Field or target that caused the issue. */
  path: string;
  /** Human-readable issue description. */
  message: string;
  /** Issue severity. */
  severity: "error" | "warning";
}

/**
 * Aggregated validation result for a `.bao` manifest.
 */
export interface BaoInstallValidationResult {
  /** Whether the manifest passed validation. */
  valid: boolean;
  /** All issues collected during validation. */
  issues: BaoInstallValidationIssue[];
}

/**
 * Validate a `.bao` manifest against the canonical TypeBox schema only.
 *
 * This is the shared-layer subset of the full server-side `validateBaoManifest`
 * function.  It does not require the server adapter registry and is safe to
 * call from shared code.
 *
 * @param manifest - Parsed manifest payload.
 * @returns Validation result with schema-level issues.
 */
export function validateBaoManifestSchema(manifest: unknown): BaoInstallValidationResult {
  const issues: BaoInstallValidationIssue[] = [];

  if (!isBaoManifest(manifest)) {
    const errors = [...Errors(BaoManifestSchema, manifest)];
    for (const error of errors) {
      issues.push({
        path: error.path,
        message: error.message,
        severity: "error",
      });
    }
    return { valid: false, issues };
  }

  // Enforce minSchemaVersion — reject manifests that require a newer schema
  // version than the tooling supports.
  const minVersion = manifest.metadata.minSchemaVersion;
  if (minVersion !== undefined && minVersion > BAO_MANIFEST_SCHEMA_VERSION) {
    issues.push({
      path: "metadata.minSchemaVersion",
      message: `Manifest requires schema version >= ${String(minVersion)}, but this tooling only supports version ${String(BAO_MANIFEST_SCHEMA_VERSION)}`,
      severity: "error",
    });
  }

  // Check for duplicate target identifiers.
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const target of manifest.targets) {
    if (seen.has(target.target)) {
      duplicates.add(target.target);
    }
    seen.add(target.target);
  }
  for (const dup of [...duplicates].sort((a, b) => a.localeCompare(b))) {
    issues.push({
      path: `targets[${dup}]`,
      message: `Duplicate target identifier: ${dup}`,
      severity: "error",
    });
  }

  return { valid: issues.filter((i) => i.severity === "error").length === 0, issues };
}
