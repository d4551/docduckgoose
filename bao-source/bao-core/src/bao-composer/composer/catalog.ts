import type { BaoComposerCatalogV1 } from "../bao-composer-fragments-catalog";
import {
  BAO_COMPOSER_AI_PROVIDERS,
  BAO_COMPOSER_OUTPUT_MODES,
  type BaoComposerFeatureId,
  type BaoComposerPresetId,
} from "../bao-composer-identity";
import {
  buildBaoComposerPublicRecipeCatalog,
  resolveBaoComposerFeatureRecipeIds,
} from "../bao-composer-registry";
import { BAO_COMPOSER_PRESET_RECIPES, FEATURE_DEFINITIONS } from "./constants";
import { cloneBaoComposerRecipe } from "./utils";

export function resolveFeaturePresetMembership(
  featureId: BaoComposerFeatureId,
): readonly BaoComposerPresetId[] {
  return Object.entries(BAO_COMPOSER_PRESET_RECIPES)
    .filter(([, recipe]) => recipe.features.includes(featureId))
    .map(([presetId]) => presetId as BaoComposerPresetId);
}

export function buildFeatureCapabilityTags(featureId: BaoComposerFeatureId): readonly string[] {
  const tags = new Set<string>();
  for (const recipeId of resolveBaoComposerFeatureRecipeIds(featureId)) {
    const recipe = buildBaoComposerPublicRecipeCatalog().find((entry) => entry.id === recipeId);
    for (const tag of recipe?.capabilityTags ?? []) {
      tags.add(tag);
    }
  }
  return [...tags].sort((left, right) => left.localeCompare(right));
}

/**
 * Build the public BaoComposer catalog from preset, feature, and recipe metadata.
 *
 * @returns Catalog consumed by API and UI surfaces.
 */
export function buildBaoComposerCatalog(): BaoComposerCatalogV1 {
  const recipes = buildBaoComposerPublicRecipeCatalog().map((recipe) =>
    cloneBaoComposerRecipe(recipe),
  );
  return {
    presets: Object.entries(BAO_COMPOSER_PRESET_RECIPES).map(([id, recipe]) => ({
      id: id as BaoComposerPresetId,
      features: [...recipe.features],
      recipeIds: recipe.features.flatMap((featureId) => [
        ...resolveBaoComposerFeatureRecipeIds(featureId),
      ]),
    })),
    features: FEATURE_DEFINITIONS.map((feature) => ({
      id: feature.id,
      section: feature.section,
      aliases: [...feature.aliases],
      presetMembership: [...resolveFeaturePresetMembership(feature.id)],
      capabilityTags: [...buildFeatureCapabilityTags(feature.id)],
      defaultRecipeIds: [...resolveBaoComposerFeatureRecipeIds(feature.id)],
    })),
    recipes,
    outputModes: [...BAO_COMPOSER_OUTPUT_MODES],
    aiProviders: [...BAO_COMPOSER_AI_PROVIDERS],
  };
}
