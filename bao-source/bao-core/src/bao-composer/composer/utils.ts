import type { BaoInstallTarget } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { BaoInstallTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { Check } from "@baohaus/baobox/value";
import type { BaoComposerBuildRequest } from "../bao-composer-drafts-messages";
import type { BaoComposerRecipeV1 } from "../bao-composer-fragments-catalog";
import type { BaoComposerPresetId } from "../bao-composer-identity";
import type { BaoComposerManifestTarget } from "./types";

type BaoComposerImportedTargetCandidate = NonNullable<
  BaoComposerBuildRequest["importedTargets"]
>[number];

export function isBaoComposerManifestTarget(
  value: BaoComposerImportedTargetCandidate,
): value is BaoComposerManifestTarget {
  return (
    Check(BaoInstallTargetSchema, value) &&
    typeof Reflect.get(value, "kind") === "string" &&
    typeof Reflect.get(value, "target") === "string"
  );
}

export function resolveInstallTargetId(target: BaoInstallTarget): string | null {
  const candidate = Reflect.get(target, "target");
  return typeof candidate === "string" && candidate.length > 0 ? candidate : null;
}

/**
 * Derive the default manifest name for a preset-backed BaoComposer composition.
 *
 * @param preset - Preset identifier.
 * @returns Stable manifest basename for the preset.
 */
export function deriveBaoComposerManifestName(preset: BaoComposerPresetId): string {
  return `bao-composer-${preset}-container`;
}

export function cloneBaoComposerRecipe(recipe: BaoComposerRecipeV1): BaoComposerRecipeV1 {
  return {
    ...recipe,
    featureAliases: [...recipe.featureAliases],
    targetIds: [...recipe.targetIds],
    targetKinds: [...recipe.targetKinds],
    capabilityTags: [...recipe.capabilityTags],
  };
}

export function collectDuplicateValues(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
      continue;
    }
    seen.add(value);
  }
  return [...duplicates].sort((left, right) => left.localeCompare(right));
}

export function normalizeTargetReferenceList(values: readonly string[] | undefined): string[] {
  return (values ?? []).map((entry) => entry.trim()).filter(Boolean);
}
