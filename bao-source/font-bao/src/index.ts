/**
 * @baohaus/font-bao
 *
 * BAO parity clean-room implementation for upstream: @fontsource packages
 * Domain: ui
 */

export const PACKAGE_NAME = "@baohaus/font-bao" as const;
export const UPSTREAM_PACKAGE = "@fontsource packages" as const;

export interface FontFace {
  readonly family: string;
  readonly src: readonly { readonly url: string; readonly format: string }[];
  readonly weight?: string;
  readonly style?: string;
  readonly display?: string;
}

export interface FontPackage {
  readonly name: string;
  readonly family: string;
  readonly weights: readonly number[];
  readonly styles: readonly string[];
}

export const INTER: FontPackage = {
  name: "inter",
  family: "Inter",
  weights: [400, 500, 600, 700],
  styles: ["normal"],
};

export const JETBRAINS_MONO: FontPackage = {
  name: "jetbrains-mono",
  family: "JetBrains Mono",
  weights: [400, 500, 600, 700],
  styles: ["normal", "italic"],
};

export function generateFontFaceCSS(font: FontPackage, baseUrl = "/fonts"): string {
  return font.weights
    .flatMap((weight) =>
      font.styles.map((style) => {
        const url = `${baseUrl}/${font.name}-${weight}-${style}.woff2`;
        return `@font-face {\n  font-family: "${font.family}";\n  src: url("${url}") format("woff2");\n  font-weight: ${weight};\n  font-style: ${style};\n  font-display: swap;\n}`;
      }),
    )
    .join("\n\n");
}
