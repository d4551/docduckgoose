/**
 * @baohaus/baohaus-design-tokens-aurora-bao
 *
 * Apple HIG 2026 aligned design-tokens bundle paired with the
 * baohaus-aurora-light theme-pack. Spacing, radius, shadow and
 * typography tokens scoped to `[data-bao-ui-tokens="baohaus-aurora"]`
 * so the shell applies them when this token set is the active selection.
 */

export const BAOHAUS_AURORA_DESIGN_TOKENS = {
  tokenSetId: "baohaus-aurora",
  categories: ["spacing", "radius", "shadow", "typography"] as const,
  stylesheet: "assets/baohaus-aurora-tokens.css",
} as const;

export type BaohausAuroraDesignTokens = typeof BAOHAUS_AURORA_DESIGN_TOKENS;
