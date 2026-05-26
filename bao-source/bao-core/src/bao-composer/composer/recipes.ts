import type { BaoComposerBuildRequest } from "../bao-composer-drafts-messages";
import type {
  BaoComposerMergeConflictV1,
  BaoComposerRecipeV1,
  BaoComposerSourceFragmentV1,
  BaoComposerValidationIssue,
} from "../bao-composer-fragments-catalog";
import {
  BAO_COMPOSER_FEATURE_IDS,
  type BaoComposerFeatureId,
  type BaoComposerRecipeId,
  type BaoComposerResolvedConfig,
} from "../bao-composer-identity";
import {
  buildBaoComposerPublicRecipeCatalog,
  canonicalizeBaoComposerJson,
  resolveBaoComposerFeatureRecipeIds,
  resolveBaoComposerRecipe,
} from "../bao-composer-registry";
import { BAO_COMPOSER_PRESET_RECIPES } from "./constants";
import type {
  BaoComposerGeneratedTargets,
  BaoComposerManifestTarget,
  BaoComposerResolvedEntry,
  BaoComposerResolvedRecipe,
} from "./types";
import { isBaoComposerManifestTarget } from "./utils";

function firstNonEmptyString(...candidates: readonly (string | null | undefined)[]): string | null {
  for (const candidate of candidates) {
    const normalized = candidate?.trim() ?? "";
    if (normalized.length > 0) {
      return normalized;
    }
  }
  return null;
}

export function resolveSelectedFeatures(
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
): readonly BaoComposerFeatureId[] {
  const presetKey = request.preset ?? config.defaultPreset;
  const selected = new Set<BaoComposerFeatureId>(BAO_COMPOSER_PRESET_RECIPES[presetKey].features);
  for (const feature of request.features ?? []) {
    selected.add(feature);
  }
  return BAO_COMPOSER_FEATURE_IDS.filter((featureId) => selected.has(featureId));
}

export function resolveSelectedRecipeIds(
  request: BaoComposerBuildRequest,
  selectedFeatures: readonly BaoComposerFeatureId[],
): readonly BaoComposerRecipeId[] {
  const selected = new Set<BaoComposerRecipeId>();
  for (const featureId of selectedFeatures) {
    for (const recipeId of resolveBaoComposerFeatureRecipeIds(featureId)) {
      selected.add(recipeId);
    }
  }
  for (const recipeId of request.recipeIds ?? []) {
    selected.add(recipeId);
  }
  const knownOrder = buildBaoComposerPublicRecipeCatalog().map((recipe) => recipe.id);
  return [
    ...knownOrder.filter((recipeId) => selected.has(recipeId)),
    ...[...selected].filter((recipeId) => !knownOrder.includes(recipeId)),
  ];
}

export function resolveSelectedRecipes(recipeIds: readonly BaoComposerRecipeId[]): {
  readonly recipes: readonly BaoComposerResolvedRecipe[];
  readonly issues: readonly BaoComposerValidationIssue[];
} {
  const issues: BaoComposerValidationIssue[] = [];
  const recipes: BaoComposerResolvedRecipe[] = [];
  const catalogIds = buildBaoComposerPublicRecipeCatalog()
    .map((recipe) => recipe.id)
    .sort((left, right) => left.localeCompare(right));
  for (const recipeId of recipeIds) {
    const recipe = resolveBaoComposerRecipe(recipeId);
    if (!recipe) {
      issues.push({
        path: "/recipeIds",
        message: `Unknown BaoComposer recipe "${recipeId}". Known recipes: ${catalogIds.join(", ")}`,
        severity: "error",
      });
      continue;
    }
    recipes.push(recipe);
  }
  return { recipes, issues };
}

export function buildBaoComposerDescription(recipes: readonly BaoComposerRecipeV1[]): string {
  if (recipes.length === 0) {
    return "BaoComposer custom .bao control-plane manifest.";
  }
  const labels = recipes.map((recipe) => recipe.label.toLowerCase().replace(/\s+/g, "-"));
  return `BaoComposer composes ${labels.join(", ")} into a first-party .bao control-plane manifest.`;
}

export function partitionSelectedRecipes(recipes: readonly BaoComposerResolvedRecipe[]): {
  readonly primary: readonly BaoComposerResolvedRecipe[];
  readonly deferred: readonly BaoComposerResolvedRecipe[];
} {
  const primary: BaoComposerResolvedRecipe[] = [];
  const deferred: BaoComposerResolvedRecipe[] = [];

  for (const recipe of recipes) {
    if (recipe.id === "addon:baodown-flow") {
      deferred.push(recipe);
      continue;
    }
    primary.push(recipe);
  }

  return { primary, deferred };
}

function applyBaoComposerRecipeTargetOverrides(
  recipe: BaoComposerResolvedRecipe,
  targets: readonly BaoComposerManifestTarget[],
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
  currentTargetIds: readonly string[],
): BaoComposerGeneratedTargets {
  if (recipe.id === "addon:secure-mcp-provider") {
    const entrypointOverride = firstNonEmptyString(
      request.mcpProviderModule,
      config.defaultMcpProviderModule,
    );

    return {
      targets: targets.map((target) =>
        target.kind === "mcp-provider" && target.target === "mcp.bao-composer.secure-provider"
          ? {
              ...target,
              ...(entrypointOverride ? { entrypoint: entrypointOverride } : {}),
            }
          : target,
      ),
      issues: [],
    };
  }

  if (recipe.id === "addon:baodown-flow") {
    const definitionOverride = firstNonEmptyString(
      request.automationFlowDefinition,
      config.defaultAutomationFlowDefinition,
    );

    return {
      targets: targets.map((target) =>
        target.kind === "baodown-flow" && target.target === "flow.bao-composer.bootstrap"
          ? {
              ...target,
              ...(definitionOverride ? { definition: definitionOverride } : {}),
              ...(currentTargetIds.length > 0 ? { after: [...currentTargetIds] } : {}),
            }
          : target,
      ),
      issues: [],
    };
  }

  if (recipe.id === "addon:ai-model") {
    const model = request.aiModel ?? config.defaultAiModel;
    if (!model) {
      return {
        targets: [],
        issues: [
          {
            path: "/aiModel",
            message: "BaoComposer ai-model recipes require an aiModel value.",
            severity: "error",
          },
        ],
      };
    }

    const provider = request.aiProvider ?? config.defaultAiProvider;
    return {
      targets: targets.map((target) =>
        target.kind === "ai-model" && target.target === "ai.bao-composer.model"
          ? {
              ...target,
              model,
              ...(provider ? { provider } : {}),
            }
          : target,
      ),
      issues: [],
    };
  }

  return { targets: [...targets], issues: [] };
}

export function resolveRecipeTargets(
  recipe: BaoComposerResolvedRecipe,
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
  currentTargetIds: readonly string[],
): BaoComposerGeneratedTargets {
  if (!recipe.manifest) {
    return {
      targets: [],
      issues: [
        {
          path: "/recipeIds",
          message: `BaoComposer recipe "${recipe.id}" is missing its canonical manifest source.`,
          severity: "error",
        },
      ],
    };
  }
  const targets = recipe.manifest.targets
    .filter(isBaoComposerManifestTarget)
    .map((target) => structuredClone(target));
  if (targets.length !== recipe.manifest.targets.length) {
    return {
      targets,
      issues: [
        {
          path: "/targets",
          message: `BaoComposer recipe "${recipe.id}" contains invalid manifest targets.`,
          severity: "error",
        },
      ],
    };
  }

  return applyBaoComposerRecipeTargetOverrides(recipe, targets, request, config, currentTargetIds);
}

export function buildSourceFragment(
  recipe: BaoComposerResolvedRecipe,
  targets: readonly BaoComposerManifestTarget[],
): BaoComposerSourceFragmentV1 {
  return {
    recipeId: recipe.id,
    sourceKind: recipe.sourceKind,
    sourcePath: recipe.sourcePath,
    ...(recipe.manifestName ? { manifestName: recipe.manifestName } : {}),
    targetIds: targets.map((target) => target.target),
    targetKinds: [...new Set(targets.map((target) => target.kind))].sort((left, right) =>
      left.localeCompare(right),
    ),
  };
}

export function mergeTarget(
  entries: Map<string, BaoComposerResolvedEntry>,
  orderedTargetIds: string[],
  mergeConflicts: BaoComposerMergeConflictV1[],
  recipeId: BaoComposerRecipeId,
  target: BaoComposerManifestTarget,
): void {
  const canonicalPayload = canonicalizeBaoComposerJson(target);
  const existing = entries.get(target.target);
  if (!existing) {
    entries.set(target.target, { recipeId, target, canonicalPayload });
    orderedTargetIds.push(target.target);
    return;
  }
  if (existing.canonicalPayload === canonicalPayload) {
    return;
  }
  mergeConflicts.push({
    target: target.target,
    existingRecipeId: existing.recipeId,
    incomingRecipeId: recipeId,
    message: `Target "${target.target}" is defined differently by "${existing.recipeId}" and "${recipeId}".`,
  });
}
