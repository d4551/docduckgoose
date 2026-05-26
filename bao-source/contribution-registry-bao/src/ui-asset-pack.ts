/**
 * Canonical UI asset-pack contribution registration shapes.
 *
 * Owns the four visual asset surfaces contributed by `.bao` install targets:
 * `theme-pack`, `design-tokens`, `motion-preset`, and `density-preset`.
 * Runtime install handlers, Settings rendering, agent context, and federation
 * all consume this module so asset-pack metadata has one type source.
 *
 * @packageDocumentation
 */

import type { BaseContributionRegistration } from "./types.ts";

export const UI_ASSET_PACK_KINDS = {
  themePack: "theme-pack",
  designTokens: "design-tokens",
  motionPreset: "motion-preset",
  densityPreset: "density-preset",
} as const satisfies Record<string, string>;

export type UiAssetPackKind = (typeof UI_ASSET_PACK_KINDS)[keyof typeof UI_ASSET_PACK_KINDS];

export const UI_ASSET_PACK_COLOR_SCHEMES = ["light", "dark"] as const;
export type UiAssetPackColorScheme = (typeof UI_ASSET_PACK_COLOR_SCHEMES)[number];

export const UI_ASSET_PACK_MOTION_PROFILES = ["calm", "standard", "expressive"] as const;
export type UiAssetPackMotionProfile = (typeof UI_ASSET_PACK_MOTION_PROFILES)[number];

export const UI_ASSET_PACK_DENSITY_LEVELS = ["compact", "comfortable", "spacious"] as const;
export type UiAssetPackDensityLevel = (typeof UI_ASSET_PACK_DENSITY_LEVELS)[number];

export const UI_ASSET_PACK_TOKEN_CATEGORIES = [
  "spacing",
  "radius",
  "shadow",
  "motion-curve",
  "typography",
] as const;
export type UiAssetPackTokenCategory = (typeof UI_ASSET_PACK_TOKEN_CATEGORIES)[number];

export type UiAssetPackRegistration =
  | (BaseContributionRegistration & {
      readonly kind: "theme-pack";
      readonly themeId: string;
      readonly colorScheme: UiAssetPackColorScheme;
      readonly daisyUiVersionRange: string;
      readonly stylesheet: string;
      readonly capabilityRef?: string;
    })
  | (BaseContributionRegistration & {
      readonly kind: "design-tokens";
      readonly tokenSetId: string;
      readonly categories: readonly UiAssetPackTokenCategory[];
      readonly stylesheet: string;
      readonly capabilityRef?: string;
    })
  | (BaseContributionRegistration & {
      readonly kind: "motion-preset";
      readonly presetId: string;
      readonly profile: UiAssetPackMotionProfile;
      readonly respectsReducedMotion: true;
      readonly stylesheet: string;
      readonly capabilityRef?: string;
    })
  | (BaseContributionRegistration & {
      readonly kind: "density-preset";
      readonly presetId: string;
      readonly density: UiAssetPackDensityLevel;
      readonly stylesheet: string;
      readonly capabilityRef?: string;
    });

export type UiAssetPackSnapshotByKind = Readonly<{
  readonly [K in UiAssetPackKind]: readonly Extract<
    UiAssetPackRegistration,
    { readonly kind: K }
  >[];
}>;

export function compareUiAssetPackRegistrations(
  a: UiAssetPackRegistration,
  b: UiAssetPackRegistration,
): number {
  if (a.kind !== b.kind) {
    return a.kind.localeCompare(b.kind);
  }
  return a.id.localeCompare(b.id);
}

export function bucketUiAssetPacksByKind(
  registrations: readonly UiAssetPackRegistration[],
): UiAssetPackSnapshotByKind {
  const themePack: Extract<UiAssetPackRegistration, { readonly kind: "theme-pack" }>[] = [];
  const designTokens: Extract<UiAssetPackRegistration, { readonly kind: "design-tokens" }>[] = [];
  const motionPreset: Extract<UiAssetPackRegistration, { readonly kind: "motion-preset" }>[] = [];
  const densityPreset: Extract<UiAssetPackRegistration, { readonly kind: "density-preset" }>[] = [];
  for (const reg of registrations) {
    switch (reg.kind) {
      case UI_ASSET_PACK_KINDS.themePack:
        themePack.push(reg);
        break;
      case UI_ASSET_PACK_KINDS.designTokens:
        designTokens.push(reg);
        break;
      case UI_ASSET_PACK_KINDS.motionPreset:
        motionPreset.push(reg);
        break;
      case UI_ASSET_PACK_KINDS.densityPreset:
        densityPreset.push(reg);
        break;
    }
  }
  return Object.freeze({
    "theme-pack": Object.freeze(themePack),
    "design-tokens": Object.freeze(designTokens),
    "motion-preset": Object.freeze(motionPreset),
    "density-preset": Object.freeze(densityPreset),
  });
}
