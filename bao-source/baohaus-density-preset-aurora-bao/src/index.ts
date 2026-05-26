/**
 * @baohaus/baohaus-density-preset-aurora-bao
 *
 * Apple HIG 2026 aligned density preset. Row-height + control-size
 * token overrides scoped to
 * `[data-bao-ui-density="baohaus-aurora"]` so the shell applies them
 * when this preset is the active selection. Ships the
 * `comfortable` profile as the canonical default; the stylesheet
 * also exposes `compact` and `spacious` overrides selectable via
 * `[data-bao-ui-density-profile="compact|spacious"]` so the user
 * can switch density without re-installing the preset.
 */

export const BAOHAUS_AURORA_DENSITY_PRESET = {
  presetId: "baohaus-aurora",
  density: "comfortable" as const,
  stylesheet: "assets/baohaus-aurora-density.css",
} as const;

export type BaohausAuroraDensityPreset = typeof BAOHAUS_AURORA_DENSITY_PRESET;
