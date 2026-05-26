import type { BaoInstallTargetKind } from "@baohaus/bao-schemas/bao-install/core.schemas";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTarget } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoComposerBaoImportProvenanceV1,
  BaoComposerCatalogV1,
  BaoComposerMergeConflictV1,
  BaoComposerRecipeV1,
  BaoComposerSourceFragmentV1,
  BaoComposerValidationIssue,
} from "../bao-composer-fragments-catalog";
import type {
  BaoComposerFeatureId,
  BaoComposerFeatureSection,
  BaoComposerRecipeId,
} from "../bao-composer-identity";
import type { BaoComposerOutputPolicyV1 } from "../bao-composer-preview-execution";
import type { resolveBaoComposerRecipe } from "../bao-composer-registry";

/**
 * Preset-to-feature mapping used to seed BaoComposer compositions.
 */
export interface BaoComposerPresetRecipe {
  readonly features: readonly BaoComposerFeatureId[];
}

/**
 * Full composition result produced by the BaoComposer composer.
 */
export interface BaoComposerManifestComposition {
  readonly manifest: BaoManifest;
  readonly catalog: BaoComposerCatalogV1;
  readonly selectedFeatures: readonly BaoComposerFeatureId[];
  readonly selectedRecipeIds: readonly BaoComposerRecipeId[];
  readonly selectedRecipes: readonly BaoComposerRecipeV1[];
  readonly sourceFragments: readonly BaoComposerSourceFragmentV1[];
  readonly importedTargets: readonly BaoInstallTarget[];
  readonly outputPolicy: BaoComposerOutputPolicyV1;
  readonly validationErrors: readonly BaoComposerValidationIssue[];
  readonly warnings: readonly BaoComposerValidationIssue[];
  readonly mergeConflicts: readonly BaoComposerMergeConflictV1[];
  readonly baoImportProvenance: BaoComposerBaoImportProvenanceV1 | null;
}

/**
 * Structured failure details returned by BaoComposer build/composition helpers.
 */
export interface BaoComposerBuildFailureDetails {
  readonly issues?: readonly BaoComposerValidationIssue[];
  readonly allowedValues?: readonly string[];
  readonly outputPath?: string;
  readonly mergeConflicts?: readonly BaoComposerMergeConflictV1[];
}

/**
 * Discriminated result envelope used by BaoComposer composition helpers.
 */
export type BaoComposerResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string; details?: BaoComposerBuildFailureDetails };

export type BaoComposerResolvedRecipe = NonNullable<ReturnType<typeof resolveBaoComposerRecipe>>;
export type BaoComposerManifestTarget = BaoInstallTarget & {
  readonly kind: BaoInstallTargetKind;
  readonly target: string;
};
export type BaoComposerResolvedEntry = {
  readonly recipeId: string;
  readonly target: BaoComposerManifestTarget;
  readonly canonicalPayload: string;
};
export type BaoComposerGeneratedTargets = {
  readonly targets: readonly BaoComposerManifestTarget[];
  readonly issues: readonly BaoComposerValidationIssue[];
};
export type BaoComposerCompositionState = {
  readonly validationErrors: BaoComposerValidationIssue[];
  readonly mergeConflicts: BaoComposerMergeConflictV1[];
  readonly sourceFragments: BaoComposerSourceFragmentV1[];
  readonly entries: Map<string, BaoComposerResolvedEntry>;
  readonly orderedTargetIds: string[];
};

export type BaoComposerFeatureDefinition = {
  readonly id: BaoComposerFeatureId;
  readonly section: BaoComposerFeatureSection;
  readonly aliases: readonly string[];
};
