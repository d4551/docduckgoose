/**
 * TypeBox schema for shared brand-tokens.json — motion, accessibility, compact controls.
 *
 * @shared/schemas/brand-tokens
 */

import { TypeExports } from "@baohaus/baobox/elysia";

const BrandActionIconEntrySchema = TypeExports.Object({
  sfSymbol: TypeExports.String(),
  material: TypeExports.String(),
  web: TypeExports.String(),
});

const BrandSemanticPairSchema = TypeExports.Object({
  light: TypeExports.String(),
  dark: TypeExports.String(),
});

export const BrandTokensSchema = TypeExports.Object(
  {
    colors: TypeExports.Object({
      gold: TypeExports.String(),
      goldDeep: TypeExports.String(),
      goldLight: TypeExports.String(),
      black: TypeExports.String(),
      charcoal: TypeExports.String(),
      cream: TypeExports.String(),
      ivory: TypeExports.String(),
      ruby: TypeExports.String(),
      rubyDeep: TypeExports.String(),
      titanium: TypeExports.String(),
      graphite: TypeExports.String(),
    }),
    semantic: TypeExports.Object({
      success: BrandSemanticPairSchema,
      warning: BrandSemanticPairSchema,
      error: BrandSemanticPairSchema,
      info: BrandSemanticPairSchema,
      accent: BrandSemanticPairSchema,
    }),
    shape: TypeExports.Object({
      panel: TypeExports.Number(),
      input: TypeExports.Number(),
      bubble: TypeExports.Number(),
      button: TypeExports.Number(),
      chip: TypeExports.Number(),
    }),
    spacing: TypeExports.Object({
      panelPadding: TypeExports.Number(),
      panelGap: TypeExports.Number(),
      chipPaddingH: TypeExports.Number(),
      chipPaddingV: TypeExports.Number(),
      buttonPaddingH: TypeExports.Number(),
      buttonPaddingV: TypeExports.Number(),
      iconGap: TypeExports.Number(),
    }),
    typography: TypeExports.Object({
      roles: TypeExports.Array(TypeExports.String()),
      fonts: TypeExports.Object({
        canonical: TypeExports.Object({
          display: TypeExports.String(),
          body: TypeExports.String(),
          code: TypeExports.String(),
        }),
        codebase: TypeExports.Object({
          display: TypeExports.String(),
          body: TypeExports.String(),
          code: TypeExports.String(),
        }),
      }),
      minBodyPx: TypeExports.Number(),
      lineHeightBody: TypeExports.Array(TypeExports.Number()),
    }),
    animation: TypeExports.Object({
      durationFastMs: TypeExports.Number(),
      durationMediumMs: TypeExports.Number(),
      durationSlowMs: TypeExports.Number(),
      pulseIntervalMs: TypeExports.Number(),
      easingDecelerate: TypeExports.String(),
      htmxSettleMs: TypeExports.Number(),
      pressScale: TypeExports.Number(),
    }),
    motion: TypeExports.Object({
      policy: TypeExports.Array(TypeExports.String()),
      defaultPolicy: TypeExports.String(),
      respectPrefersReducedMotion: TypeExports.Boolean(),
    }),
    accessibility: TypeExports.Object({
      minTouchTargetPt: TypeExports.Number(),
      minTouchTargetRem: TypeExports.Number(),
      iconOnlyRequiresAriaLabel: TypeExports.Boolean(),
      hintMustNotDuplicateLabel: TypeExports.Boolean(),
    }),
    components: TypeExports.Object({
      compactAction: TypeExports.Object({
        modes: TypeExports.Array(TypeExports.String()),
        defaultMode: TypeExports.String(),
        iconOnlyMinTouchPt: TypeExports.Number(),
        expandTrigger: TypeExports.Array(TypeExports.String()),
      }),
      chip: TypeExports.Object({
        role: TypeExports.String(),
        maxLabelChars: TypeExports.Number(),
      }),
    }),
    icons: TypeExports.Object({
      actions: TypeExports.Object(
        {},
        {
          additionalProperties: BrandActionIconEntrySchema,
        },
      ),
    }),
  },
  {
    additionalProperties: false,
    description: "Baohaus brand design tokens (shared/brand-tokens.json)",
  },
);
