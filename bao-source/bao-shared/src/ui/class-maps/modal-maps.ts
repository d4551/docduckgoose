/**
 * DaisyUI 5 Modal Class Maps
 *
 * Single source of truth for all modal-related DaisyUI component class mappings.
 * Covers modal sizes and placements.
 *
 * @module class-maps/modal-maps
 */

/** DaisyUI class mapping for MODAL_PLACEMENT_MAP. */
export const MODAL_PLACEMENT_MAP: {
  readonly top: "modal-top";
  readonly middle: "modal-middle";
  readonly bottom: "modal-bottom";
  readonly start: "modal-start";
  readonly end: "modal-end";
} = {
  top: "modal-top",
  middle: "modal-middle",
  bottom: "modal-bottom",
  start: "modal-start",
  end: "modal-end",
} as const;

/** Type alias for ModalPlacement keys. */
export type ModalPlacement = keyof typeof MODAL_PLACEMENT_MAP;

/**
 * Get modal placement class from placement token.
 *
 * @param placement - Modal placement token.
 * @returns DaisyUI class for the requested placement.
 */
export function getModalPlacementClass(placement: ModalPlacement | string): string {
  return MODAL_PLACEMENT_MAP[placement as ModalPlacement] || "";
}
