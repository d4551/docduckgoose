/**
 * Canonical UI asset-pack install target kinds. Used by boot-time
 * asset-pack auto-install paths to filter `.bao` manifest targets
 * that should be routed through the four asset-pack handlers
 * (ThemePack / DesignTokens / MotionPreset / DensityPreset).
 */

export const ASSET_PACK_TARGET_KINDS = {
  themePack: "theme-pack",
  designTokens: "design-tokens",
  motionPreset: "motion-preset",
  densityPreset: "density-preset",
} as const;

export type AssetPackTargetKind =
  (typeof ASSET_PACK_TARGET_KINDS)[keyof typeof ASSET_PACK_TARGET_KINDS];

const ASSET_PACK_KIND_SET: ReadonlySet<string> = new Set<string>(
  Object.values(ASSET_PACK_TARGET_KINDS),
);

/** Type guard: returns true when `kind` is one of the 4 canonical asset-pack kinds. */
export function isAssetPackKind(kind: string): kind is AssetPackTargetKind {
  return ASSET_PACK_KIND_SET.has(kind);
}
