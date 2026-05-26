/**
 * DaisyUI 5 Card Class Maps
 *
 * Single source of truth for all card-related DaisyUI component class mappings.
 * Covers card sizes and styles.
 *
 * @module class-maps/card-maps
 */

/** DaisyUI class mapping for CARD_STYLE_MAP. */
export const CARD_STYLE_MAP: { readonly border: "card-border"; readonly dash: "card-dash" } = {
  border: "card-border",
  dash: "card-dash",
} as const;

/** Type alias for CardStyle keys. */
export type CardStyle = keyof typeof CARD_STYLE_MAP;

/**
 * Get card style class from style token.
 *
 * @param style - Card style token.
 * @returns DaisyUI class for the requested style.
 */
export function getCardStyleClass(style: CardStyle | string): string {
  return CARD_STYLE_MAP[style as CardStyle] || "";
}
