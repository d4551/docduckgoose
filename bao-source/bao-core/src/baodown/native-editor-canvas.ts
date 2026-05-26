/**
 * SVG canvas layout helpers for BaoDown node rendering.
 *
 * @shared/baodown/native-editor (canvas)
 */

import type {
  BaoDownNode,
  BaoDownNodePosition,
} from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import {
  BAODOWN_CANVAS_NODE_ACCENT_HEIGHT,
  BAODOWN_CANVAS_NODE_BODY_PADDING_BOTTOM,
  BAODOWN_CANVAS_NODE_BODY_PADDING_TOP,
  BAODOWN_CANVAS_NODE_HEADER_HEIGHT,
  BAODOWN_CANVAS_NODE_WIDTH,
  BAODOWN_CANVAS_PORT_RADIUS,
  BAODOWN_CANVAS_PORT_SPACING,
} from "./native-editor-types.ts";

/**
 * Calculate the rendered height of a node based on its port count.
 *
 * @param node - BaoDown node.
 * @returns Pixel height for the node rectangle.
 */
function resolvePortRowCount(node: BaoDownNode): number {
  return Math.max(node.ports.inputs.length, node.ports.outputs.length, 1);
}

function resolvePortBandOriginY(node: BaoDownNode): number {
  return (
    node.position.y +
    BAODOWN_CANVAS_NODE_ACCENT_HEIGHT +
    BAODOWN_CANVAS_NODE_HEADER_HEIGHT +
    BAODOWN_CANVAS_NODE_BODY_PADDING_TOP +
    BAODOWN_CANVAS_PORT_RADIUS
  );
}

export function calculateBaoDownNodeHeight(node: BaoDownNode): number {
  const portRows = resolvePortRowCount(node);
  return (
    BAODOWN_CANVAS_NODE_ACCENT_HEIGHT +
    BAODOWN_CANVAS_NODE_HEADER_HEIGHT +
    BAODOWN_CANVAS_NODE_BODY_PADDING_TOP +
    portRows * BAODOWN_CANVAS_PORT_SPACING +
    BAODOWN_CANVAS_NODE_BODY_PADDING_BOTTOM
  );
}

/**
 * Calculate the position of an input port on a node.
 *
 * @param node - BaoDown node.
 * @param portIndex - Index of the input port.
 * @returns Absolute x,y position of the port center.
 */
export function calculateBaoDownInputPortPosition(
  node: BaoDownNode,
  portIndex: number,
): BaoDownNodePosition {
  return {
    x: node.position.x,
    y: resolvePortBandOriginY(node) + portIndex * BAODOWN_CANVAS_PORT_SPACING,
  };
}

/**
 * Calculate the position of an output port on a node.
 *
 * @param node - BaoDown node.
 * @param portIndex - Index of the output port.
 * @returns Absolute x,y position of the port center.
 */
export function calculateBaoDownOutputPortPosition(
  node: BaoDownNode,
  portIndex: number,
): BaoDownNodePosition {
  return {
    x: node.position.x + BAODOWN_CANVAS_NODE_WIDTH,
    y: resolvePortBandOriginY(node) + portIndex * BAODOWN_CANVAS_PORT_SPACING,
  };
}

/**
 * Calculate an SVG cubic bezier path between two port positions.
 *
 * @param from - Source port position.
 * @param to - Target port position.
 * @returns SVG path d attribute string.
 */
export function calculateBaoDownEdgePath(
  from: BaoDownNodePosition,
  to: BaoDownNodePosition,
): string {
  const bezierControlFactor = 0.5;
  const dx = Math.abs(to.x - from.x) * bezierControlFactor;
  const cp1x = from.x + dx;
  const cp2x = to.x - dx;
  return `M ${String(from.x)} ${String(from.y)} C ${String(cp1x)} ${String(from.y)}, ${String(cp2x)} ${String(to.y)}, ${String(to.x)} ${String(to.y)}`;
}
