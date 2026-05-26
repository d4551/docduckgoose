import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallValidationIssue as CanonicalBaoInstallValidationIssue } from "@baohaus/bao-types/bao-install-validation";
import { validateBaoManifestSchema } from "@baohaus/bao-types/bao-install-validation";
import { computeBaoManifestChecksum } from "@baohaus/bao-utils/canonical/bao-manifest-checksum";
import { isRecord } from "@baohaus/bao-utils/type-guards";
import { Check, Errors } from "@baohaus/baobox/value";
import {
  type BaoComposerBuildRequest,
  BaoComposerBuildRequestSchema,
} from "../bao-composer-drafts-messages";
import type { BaoComposerValidationIssue } from "../bao-composer-fragments-catalog";
import type { BaoComposerResolvedConfig } from "../bao-composer-identity";
import { buildBaoComposerCatalog } from "./catalog";
import { resolveOutputPolicy } from "./output-policy";
import {
  partitionSelectedRecipes,
  resolveSelectedFeatures,
  resolveSelectedRecipeIds,
  resolveSelectedRecipes,
} from "./recipes";
import {
  appendImportedTargets,
  appendRecipeGroup,
  buildManifestDraft,
  buildManifestTargets,
  cloneImportedTargets,
  createBaoComposerCompositionState,
} from "./state";
import type { BaoComposerManifestComposition, BaoComposerResult } from "./types";
import { cloneBaoComposerRecipe } from "./utils";
import { validateManifestRelations } from "./validate-relations";
import { buildWarnings } from "./warnings";

/**
 * Compose a Bao manifest and validation surface from a BaoComposer build request.
 *
 * @param request - Requested BaoComposer composition input.
 * @param config - Resolved BaoComposer runtime configuration.
 * @returns Structured composition result or failure details.
 */
export function composeBaoComposerManifest(
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
): BaoComposerResult<BaoComposerManifestComposition> {
  const outputPolicyResult = resolveOutputPolicy(request, config);
  if (!outputPolicyResult.ok) {
    return outputPolicyResult;
  }

  const selectedFeatures = resolveSelectedFeatures(request, config);
  const selectedRecipeIds = resolveSelectedRecipeIds(request, selectedFeatures);
  const recipeSelection = resolveSelectedRecipes(selectedRecipeIds);
  const state = createBaoComposerCompositionState(recipeSelection.issues);
  const importedTargets = cloneImportedTargets(request);
  const recipeBatches = partitionSelectedRecipes(recipeSelection.recipes);

  appendRecipeGroup(recipeBatches.primary, request, config, state);
  appendRecipeGroup(recipeBatches.deferred, request, config, state);
  appendImportedTargets(importedTargets, state);

  const manifestTargets = buildManifestTargets(state);

  const publicRecipes = recipeSelection.recipes.map(({ manifest: _, ...recipe }) =>
    cloneBaoComposerRecipe(recipe),
  );
  const manifestWithoutChecksum = buildManifestDraft(
    request,
    config,
    outputPolicyResult.value,
    manifestTargets,
    publicRecipes,
  );
  if (!isRecord(manifestWithoutChecksum)) {
    return {
      ok: false,
      message: "BaoComposer manifest serialization produced an invalid root payload.",
    };
  }
  const checksum = computeBaoManifestChecksum(manifestWithoutChecksum);
  const manifest: BaoManifest = {
    ...manifestWithoutChecksum,
    metadata: {
      ...manifestWithoutChecksum.metadata,
      checksum: { algorithm: "sha256", value: checksum },
    },
  };

  state.validationErrors.push(
    ...validateBaoManifestSchema(manifest).issues.map(
      (issue: CanonicalBaoInstallValidationIssue) => ({
        path: issue.path,
        message: issue.message,
        severity: issue.severity,
      }),
    ),
  );
  state.validationErrors.push(...validateManifestRelations(manifest));

  return {
    ok: true,
    value: {
      manifest,
      catalog: buildBaoComposerCatalog(),
      selectedFeatures,
      selectedRecipeIds,
      selectedRecipes: publicRecipes,
      sourceFragments: state.sourceFragments,
      importedTargets,
      outputPolicy: outputPolicyResult.value,
      validationErrors: state.validationErrors,
      warnings: buildWarnings(manifest),
      mergeConflicts: state.mergeConflicts,
      baoImportProvenance: request.baoImportProvenance ?? null,
    },
  };
}

/**
 * Validate a raw BaoComposer build request against the canonical schema.
 *
 * @param request - Raw request payload.
 * @returns Validation issues describing schema or semantic problems.
 */
export function validateBaoComposerBuildRequest(
  request: BaoComposerBuildRequest,
): readonly BaoComposerValidationIssue[] {
  if (Check(BaoComposerBuildRequestSchema, request)) {
    return [];
  }
  return [...Errors(BaoComposerBuildRequestSchema, request)].map((error) => ({
    path: error.path,
    message: error.message,
    severity: "error",
  }));
}
