import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTarget } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type { BaoComposerBuildRequest } from "./bao-composer-drafts-messages";
import type {
  BaoComposerBaoImportProvenanceV1,
  BaoComposerCatalogFeatureV1,
  BaoComposerCatalogPresetV1,
  BaoComposerCatalogV1,
  BaoComposerMergeConflictV1,
  BaoComposerRecipeV1,
  BaoComposerSourceFragmentV1,
  BaoComposerValidationIssue,
} from "./bao-composer-fragments-catalog";
import type {
  BaoComposerFeatureId,
  BaoComposerOutputMode,
  BaoComposerResolvedConfig,
} from "./bao-composer-identity";
import { buildBaoComposerCatalog as buildCatalog } from "./composer/catalog";
import { composeBaoComposerManifest, validateBaoComposerBuildRequest } from "./composer/compose";
import { BAO_COMPOSER_PRESET_RECIPES } from "./composer/constants";
import type {
  BaoComposerBuildFailureDetails,
  BaoComposerManifestComposition as BaoComposerManifestCompositionResult,
  BaoComposerPresetRecipe,
  BaoComposerResult,
} from "./composer/types";
import { deriveBaoComposerManifestName } from "./composer/utils";

/**
 * Public preset alias exposed by the BaoComposer builder facade.
 */
export type BaoComposerCatalogPreset = BaoComposerCatalogPresetV1;
/**
 * Public feature alias exposed by the BaoComposer builder facade.
 */
export type BaoComposerCatalogFeature = BaoComposerCatalogFeatureV1;
/**
 * Public catalog alias exposed by the BaoComposer builder facade.
 */
export type BaoComposerCatalog = BaoComposerCatalogV1;
/**
 * Re-exported BaoComposer builder/composer result helpers.
 */
export type {
  BaoComposerBuildFailureDetails,
  BaoComposerManifestCompositionResult as BaoComposerManifestComposition,
  BaoComposerPresetRecipe,
  BaoComposerResult,
};

/**
 * Validation summary produced by the BaoComposer builder facade.
 */
export interface BaoComposerBuildValidationSummary {
  readonly valid: boolean;
  readonly issues: readonly BaoComposerValidationIssue[];
  readonly warnings: readonly BaoComposerValidationIssue[];
  readonly mergeConflicts: readonly BaoComposerMergeConflictV1[];
  readonly targetCount: number;
  readonly checksum: string;
}

/**
 * Successful BaoComposer build payload returned by the builder facade.
 */
export interface BaoComposerBuildOutput {
  readonly manifest: BaoManifest;
  readonly outputPath: string;
  readonly outputMode: BaoComposerOutputMode;
  readonly catalog: BaoComposerCatalog;
  readonly selectedFeatures: readonly BaoComposerFeatureId[];
  readonly selectedRecipes: readonly BaoComposerRecipeV1[];
  readonly sourceFragments: readonly BaoComposerSourceFragmentV1[];
  readonly importedTargets: readonly BaoInstallTarget[];
  readonly baoImportProvenance: BaoComposerBaoImportProvenanceV1 | null;
  readonly validation: BaoComposerBuildValidationSummary;
}

/**
 * Re-exported composer helpers and constants surfaced through the builder API.
 */
export {
  BAO_COMPOSER_PRESET_RECIPES,
  composeBaoComposerManifest,
  deriveBaoComposerManifestName,
  validateBaoComposerBuildRequest,
};

/**
 * Build the public BaoComposer catalog from the composer-backed recipe registry.
 *
 * @returns Catalog metadata for presets, features, and recipes.
 */
export function buildBaoComposerCatalog(): BaoComposerCatalog {
  return buildCatalog();
}

/**
 * Build and validate a BaoComposer manifest using the higher-level builder facade.
 *
 * @param request - Requested BaoComposer composition input.
 * @param config - Resolved BaoComposer runtime configuration.
 * @returns Success payload with manifest metadata or a structured failure.
 */
export function buildBaoComposerManifest(
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
): BaoComposerResult<BaoComposerBuildOutput> {
  const requestIssues = validateBaoComposerBuildRequest(request);
  if (requestIssues.length > 0) {
    return {
      ok: false,
      message: "BaoComposer request failed schema validation.",
      details: {
        issues: requestIssues,
      },
    };
  }

  const compositionResult = composeBaoComposerManifest(request, config);
  if (!compositionResult.ok) {
    return compositionResult;
  }

  const blockingIssues = compositionResult.value.validationErrors.filter(
    (issue) => issue.severity === "error",
  );
  if (compositionResult.value.mergeConflicts.length > 0) {
    return {
      ok: false,
      message: "BaoComposer manifest has merge conflicts.",
      details: {
        issues: blockingIssues,
        mergeConflicts: compositionResult.value.mergeConflicts,
        outputPath: compositionResult.value.outputPolicy.outputPath,
      },
    };
  }

  if (blockingIssues.length > 0) {
    return {
      ok: false,
      message: blockingIssues.some((issue) =>
        issue.message.includes("at least one target is required"),
      )
        ? "BaoComposer manifest requires at least one target."
        : "BaoComposer manifest validation failed.",
      details: {
        issues: compositionResult.value.validationErrors,
        outputPath: compositionResult.value.outputPolicy.outputPath,
      },
    };
  }

  return {
    ok: true,
    value: {
      manifest: compositionResult.value.manifest,
      outputPath: compositionResult.value.outputPolicy.outputPath,
      outputMode: compositionResult.value.outputPolicy.outputMode,
      catalog: compositionResult.value.catalog,
      selectedFeatures: compositionResult.value.selectedFeatures,
      selectedRecipes: compositionResult.value.selectedRecipes,
      sourceFragments: compositionResult.value.sourceFragments,
      importedTargets: compositionResult.value.importedTargets,
      baoImportProvenance: compositionResult.value.baoImportProvenance,
      validation: {
        valid: true,
        issues: compositionResult.value.validationErrors,
        warnings: compositionResult.value.warnings,
        mergeConflicts: compositionResult.value.mergeConflicts,
        targetCount: compositionResult.value.manifest.targets.length,
        checksum: compositionResult.value.manifest.metadata.checksum?.value ?? "",
      },
    },
  };
}

/**
 * Serialize a BaoComposer manifest with stable trailing newline output.
 *
 * @param manifest - Manifest to serialize.
 * @returns Pretty-printed manifest JSON text.
 */
export function serializeBaoComposerManifest(manifest: BaoManifest): string {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}
