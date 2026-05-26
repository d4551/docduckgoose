/**
 * @baohaus/baohaus-theme-aurora-light-bao
 *
 * Apple HIG 2026 aurora-tinted light daisyUI 5 theme variant. Ships as
 * a runtime-installable `.bao` theme-pack alongside the boot-zero
 * `baohaus-light` default declared in
 * `@baohaus/happydumpling/assets/styles/daisyui.css`. Selecting this
 * theme through the Settings Workbench Appearance card swaps
 * `<html data-theme>` to `baohaus-aurora-light`.
 */

export const BAOHAUS_AURORA_LIGHT_THEME = {
  themeId: "baohaus-aurora-light",
  colorScheme: "light",
  daisyUiVersionRange: ">=5.0.0 <6.0.0",
  stylesheet: "assets/baohaus-aurora-light.css",
} as const;

export type BaohausAuroraLightTheme = typeof BAOHAUS_AURORA_LIGHT_THEME;
