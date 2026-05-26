/**
 * @baohaus/font-bao/manifest
 */

export const PACKAGE_NAME = "@baohaus/font-bao" as const;
export const FONT_ASSETS_RELATIVE_DIR = "fonts" as const;

export const FONT_ASSET_FAMILIES = [
  "inter",
  "jetbrains-mono",
  "dm-sans",
  "ibm-plex-mono",
  "instrument-serif",
  "playfair-display",
  "syne",
  "goose-handwriting",
] as const;

export type FontAssetFamily = (typeof FONT_ASSET_FAMILIES)[number];
