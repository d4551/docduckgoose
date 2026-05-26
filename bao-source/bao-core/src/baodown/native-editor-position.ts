/**
 * Node position formatting and grid/bounds normalization.
 *
 * @shared/baodown/native-editor (position)
 */

import type { BaoDownNodePosition } from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import type { BaoDownEditorPositionOptions } from "./native-editor-types.ts";

function resolveSnapToGrid(options?: BaoDownEditorPositionOptions): number | null {
  const snapToGrid = options?.snapToGrid;
  if (typeof snapToGrid !== "number" || !Number.isFinite(snapToGrid) || snapToGrid <= 0) {
    return null;
  }
  return snapToGrid;
}

function normalizeBaoDownNodePosition(
  position: BaoDownNodePosition,
  options?: BaoDownEditorPositionOptions,
): BaoDownNodePosition {
  let x = position.x;
  let y = position.y;

  const snapToGrid = resolveSnapToGrid(options);
  if (snapToGrid !== null) {
    x = Math.round(x / snapToGrid) * snapToGrid;
    y = Math.round(y / snapToGrid) * snapToGrid;
  }

  const bounds = options?.bounds;
  if (bounds) {
    if (typeof bounds.minX === "number") {
      x = Math.max(bounds.minX, x);
    }
    if (typeof bounds.minY === "number") {
      y = Math.max(bounds.minY, y);
    }
    if (typeof bounds.maxX === "number") {
      x = Math.min(bounds.maxX, x);
    }
    if (typeof bounds.maxY === "number") {
      y = Math.min(bounds.maxY, y);
    }
  }

  return { x, y };
}

/**
 * Format a persisted BaoDown node position for the inspector UI.
 *
 * @param position - Node position.
 * @returns Human-readable coordinate label.
 */
export function formatBaoDownNodePosition(position: BaoDownNodePosition): string {
  return `x:${String(position.x)} y:${String(position.y)}`;
}

export { normalizeBaoDownNodePosition };
