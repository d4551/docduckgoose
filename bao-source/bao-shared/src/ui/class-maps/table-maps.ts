/**
 * DaisyUI 5 Table Class Maps
 *
 * Single source of truth for all table-related DaisyUI component class mappings.
 * Covers table sizes and modifiers (zebra, pin rows, pin cols).
 *
 * @module class-maps/table-maps
 */

/** DaisyUI class mapping for TABLE_MODIFIER_MAP. */
export const TABLE_MODIFIER_MAP: {
  readonly zebra: "table-zebra";
  readonly pinRows: "table-pin-rows";
  readonly pinCols: "table-pin-cols";
} = {
  zebra: "table-zebra",
  pinRows: "table-pin-rows",
  pinCols: "table-pin-cols",
} as const;

/** Type alias for TableModifier keys. */
export type TableModifier = keyof typeof TABLE_MODIFIER_MAP;

/**
 * Get table modifier class from modifier token.
 *
 * @param modifier - Table modifier token.
 * @returns DaisyUI class for the requested modifier.
 */
export function getTableModifierClass(modifier: TableModifier | string): string {
  return TABLE_MODIFIER_MAP[modifier as TableModifier] || "";
}

/**
 * Get multiple table modifier classes from an array of modifiers.
 *
 * @param modifiers - Array of table modifier tokens.
 * @returns Space-separated string of DaisyUI classes.
 */
export function getTableModifierClasses(modifiers: (TableModifier | string)[]): string {
  return modifiers.map(getTableModifierClass).filter(Boolean).join(" ");
}
