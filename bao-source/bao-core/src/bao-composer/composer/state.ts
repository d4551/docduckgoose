import { BAO_MANIFEST_SCHEMA_VERSION } from "@baohaus/bao-schemas/bao-install/core.schemas";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoComposerBuildRequest } from "../bao-composer-drafts-messages";
import type {
  BaoComposerRecipeV1,
  BaoComposerValidationIssue,
} from "../bao-composer-fragments-catalog";
import type { BaoComposerResolvedConfig } from "../bao-composer-identity";
import type { BaoComposerOutputPolicyV1 } from "../bao-composer-preview-execution";
import { canonicalizeBaoComposerJson } from "../bao-composer-registry";
import {
  buildBaoComposerDescription,
  buildSourceFragment,
  mergeTarget,
  resolveRecipeTargets,
} from "./recipes";
import type {
  BaoComposerCompositionState,
  BaoComposerManifestTarget,
  BaoComposerResolvedEntry,
  BaoComposerResolvedRecipe,
} from "./types";
import {
  deriveBaoComposerManifestName,
  isBaoComposerManifestTarget,
  resolveInstallTargetId,
} from "./utils";

export function createBaoComposerCompositionState(
  issues: readonly BaoComposerValidationIssue[],
): BaoComposerCompositionState {
  return {
    validationErrors: [...issues],
    mergeConflicts: [],
    sourceFragments: [],
    entries: new Map<string, BaoComposerResolvedEntry>(),
    orderedTargetIds: [],
  };
}

export function cloneImportedTargets(
  request: BaoComposerBuildRequest,
): BaoComposerManifestTarget[] {
  return Array.isArray(request.importedTargets)
    ? request.importedTargets
        .filter(isBaoComposerManifestTarget)
        .map((target: BaoComposerManifestTarget) => structuredClone(target))
    : [];
}

export function appendRecipeTargets(
  recipe: BaoComposerResolvedRecipe,
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
  state: BaoComposerCompositionState,
): void {
  const targetResult = resolveRecipeTargets(recipe, request, config, state.orderedTargetIds);
  state.validationErrors.push(...targetResult.issues);
  if (targetResult.targets.length === 0) {
    return;
  }

  state.sourceFragments.push(buildSourceFragment(recipe, targetResult.targets));
  for (const target of targetResult.targets) {
    mergeTarget(state.entries, state.orderedTargetIds, state.mergeConflicts, recipe.id, target);
  }
}

export function appendRecipeGroup(
  recipes: readonly BaoComposerResolvedRecipe[],
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
  state: BaoComposerCompositionState,
): void {
  for (const recipe of recipes) {
    appendRecipeTargets(recipe, request, config, state);
  }
}

function registerImportedTarget(
  importedTarget: BaoComposerManifestTarget,
  state: BaoComposerCompositionState,
): void {
  const importedTargetId = resolveInstallTargetId(importedTarget);
  if (!importedTargetId) {
    state.validationErrors.push({
      path: "/importedTargets",
      message: "Imported targets must include a non-empty target identifier.",
      severity: "error",
    });
    return;
  }

  const existing = state.entries.get(importedTargetId);
  if (existing) {
    state.validationErrors.push({
      path: `/importedTargets/${importedTargetId}`,
      message: `Imported target "${importedTargetId}" conflicts with BaoComposer recipe target "${existing.recipeId}".`,
      severity: "error",
    });
    return;
  }

  if (state.orderedTargetIds.includes(importedTargetId)) {
    state.validationErrors.push({
      path: `/importedTargets/${importedTargetId}`,
      message: `Imported target "${importedTargetId}" is duplicated.`,
      severity: "error",
    });
    return;
  }

  state.entries.set(importedTargetId, {
    recipeId: "__imported__",
    target: structuredClone(importedTarget),
    canonicalPayload: canonicalizeBaoComposerJson(importedTarget),
  });
  state.orderedTargetIds.push(importedTargetId);
}

export function appendImportedTargets(
  importedTargets: readonly BaoComposerManifestTarget[],
  state: BaoComposerCompositionState,
): void {
  for (const importedTarget of importedTargets) {
    registerImportedTarget(importedTarget, state);
  }
}

export function buildManifestTargets(
  state: BaoComposerCompositionState,
): BaoComposerManifestTarget[] {
  const manifestTargets = state.orderedTargetIds
    .map((targetId) => state.entries.get(targetId)?.target)
    .filter((target): target is BaoComposerManifestTarget => target !== undefined);

  if (manifestTargets.length === 0) {
    state.validationErrors.push({
      path: "/targets",
      message: "at least one target is required",
      severity: "error",
    });
  }

  return manifestTargets;
}

export function buildManifestDraft(
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
  outputPolicy: BaoComposerOutputPolicyV1,
  manifestTargets: readonly BaoComposerManifestTarget[],
  publicRecipes: readonly BaoComposerRecipeV1[],
): BaoManifest {
  const preset = request.preset ?? config.defaultPreset;
  const description = request.description ?? buildBaoComposerDescription(publicRecipes);

  const manifestDraft: BaoManifest = {
    schemaVersion: BAO_MANIFEST_SCHEMA_VERSION,
    metadata: {
      name: request.name ?? deriveBaoComposerManifestName(preset),
      version: request.version ?? config.defaultManifestVersion,
      description,
      ...(outputPolicy.sourceId ? { source: outputPolicy.sourceId } : {}),
    },
    description,
    targets: [...manifestTargets],
  };

  if (outputPolicy.schemaRef) {
    manifestDraft.$schema = outputPolicy.schemaRef;
  }

  return manifestDraft;
}
