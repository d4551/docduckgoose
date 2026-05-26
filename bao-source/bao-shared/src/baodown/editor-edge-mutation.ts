/**
 * BaoDown edge mutation primitives — canvas layout helpers for rendering edges and nodes.
 *
 * @shared/baodown/editor-edge-mutation
 */

import type { BaoDownNode, BaoDownNodePosition } from "../schemas/baodown/baodown-flow.schemas.ts";

/**
 * Default dimensions for rendered nodes in the SVG canvas.
 */
export const BAODOWN_CANVAS_NODE_WIDTH: 200 = 200 as const;
/** Base node height before input and output ports are added. */
export const BAODOWN_CANVAS_NODE_HEIGHT_BASE: 60 = 60 as const;
/** Radius for rendered input and output port anchors. */
export const BAODOWN_CANVAS_PORT_RADIUS: 6 = 6 as const;
/** Vertical spacing between adjacent rendered ports. */
export const BAODOWN_CANVAS_PORT_SPACING: 20 = 20 as const;

/**
 * Calculate the rendered height of a node based on its port count.
 */
export function calculateBaoDownNodeHeight(node: BaoDownNode): number {
  const maxPorts = Math.max(node.ports.inputs.length, node.ports.outputs.length);
  return BAODOWN_CANVAS_NODE_HEIGHT_BASE + maxPorts * BAODOWN_CANVAS_PORT_SPACING;
}

/**
 * Calculate the position of an input port on a node.
 */
export function calculateBaoDownInputPortPosition(
  node: BaoDownNode,
  portIndex: number,
): BaoDownNodePosition {
  return {
    x: node.position.x,
    y:
      node.position.y +
      BAODOWN_CANVAS_NODE_HEIGHT_BASE / 2 +
      portIndex * BAODOWN_CANVAS_PORT_SPACING,
  };
}

/**
 * Calculate the position of an output port on a node.
 */
export function calculateBaoDownOutputPortPosition(
  node: BaoDownNode,
  portIndex: number,
): BaoDownNodePosition {
  return {
    x: node.position.x + BAODOWN_CANVAS_NODE_WIDTH,
    y:
      node.position.y +
      BAODOWN_CANVAS_NODE_HEIGHT_BASE / 2 +
      portIndex * BAODOWN_CANVAS_PORT_SPACING,
  };
}

/**
 * Calculate an SVG cubic bezier path between two port positions.
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
