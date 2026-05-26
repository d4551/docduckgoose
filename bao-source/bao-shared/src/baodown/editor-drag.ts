/**
 * BaoDown drag/move primitives — position normalization, drag sessions, undo/redo.
 *
 * @shared/baodown/editor-drag
 */

import type {
  BaoDownGraph,
  BaoDownNode,
  BaoDownNodePosition,
} from "../schemas/baodown/baodown-flow.schemas.ts";
import type {
  BaoDownEditorPointer,
  BaoDownEditorPositionOptions,
  BaoDownNativeEditorState,
} from "./editor-selection.ts";
import { createBaoDownNativeEditorState, getBaoDownEditorNode } from "./editor-selection.ts";

/**
 * Default editor grid size used by drag normalization when no explicit grid is supplied.
 */
export const BAODOWN_EDITOR_DEFAULT_GRID_SIZE: 24 = 24 as const;

/**
 * Default maximum number of undo snapshots retained by the history stack.
 */
export const BAODOWN_EDITOR_DEFAULT_HISTORY_LIMIT: 50 = 50 as const;

/**
 * Undo/redo history stack wrapping native editor state.
 */
export interface BaoDownEditorHistory {
  past: BaoDownGraph[];
  present: BaoDownNativeEditorState;
  future: BaoDownGraph[];
  limit: number;
}

function cloneBaoDownGraph(graph: BaoDownGraph): BaoDownGraph {
  return structuredClone(graph);
}

function cloneEditorState(state: BaoDownNativeEditorState): BaoDownNativeEditorState {
  return { ...state, graph: cloneBaoDownGraph(state.graph) };
}

function findBaoDownNodeIndex(graph: BaoDownGraph, nodeId: string): number {
  return graph.nodes.findIndex((node: BaoDownNode) => node.id === nodeId);
}

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
 * Set a node position directly.
 */
export function setBaoDownEditorNodePosition(
  state: BaoDownNativeEditorState,
  nodeId: string,
  position: BaoDownNodePosition,
  options?: BaoDownEditorPositionOptions,
): BaoDownNativeEditorState {
  const nodeIndex = findBaoDownNodeIndex(state.graph, nodeId);
  if (nodeIndex < 0) {
    return state;
  }
  const nextState = cloneEditorState(state);
  nextState.graph.nodes[nodeIndex].position = normalizeBaoDownNodePosition(position, options);
  nextState.selectedNodeId = nodeId;
  nextState.dirty = true;
  nextState.lastMutation = "move-node";
  return nextState;
}

/**
 * Begin a drag session for a node.
 */
export function beginBaoDownEditorNodeDrag(
  state: BaoDownNativeEditorState,
  nodeId: string,
  pointerStart: BaoDownEditorPointer,
): BaoDownNativeEditorState {
  const node = getBaoDownEditorNode(state.graph, nodeId);
  if (!node) {
    return state;
  }
  return {
    ...state,
    selectedNodeId: nodeId,
    dragSession: {
      nodeId,
      pointerStart,
      origin: structuredClone(node.position),
    },
  };
}

/**
 * Update an active drag session.
 */
export function updateBaoDownEditorNodeDrag(
  state: BaoDownNativeEditorState,
  pointer: BaoDownEditorPointer,
  options?: BaoDownEditorPositionOptions,
): BaoDownNativeEditorState {
  if (!state.dragSession) {
    return state;
  }
  const { dragSession } = state;
  const deltaX = pointer.x - dragSession.pointerStart.x;
  const deltaY = pointer.y - dragSession.pointerStart.y;
  const nextPosition = {
    x: dragSession.origin.x + deltaX,
    y: dragSession.origin.y + deltaY,
  };
  const nextState = setBaoDownEditorNodePosition(state, dragSession.nodeId, nextPosition, {
    snapToGrid: options?.snapToGrid ?? BAODOWN_EDITOR_DEFAULT_GRID_SIZE,
    bounds: options?.bounds ?? null,
  });
  return { ...nextState, dragSession };
}

/**
 * End the active drag session.
 */
export function endBaoDownEditorNodeDrag(
  state: BaoDownNativeEditorState,
): BaoDownNativeEditorState {
  if (!state.dragSession) {
    return state;
  }
  return { ...state, dragSession: null };
}

/**
 * Create a history-wrapped editor state.
 */
export function createBaoDownEditorHistory(
  state: BaoDownNativeEditorState,
  options?: { limit?: number },
): BaoDownEditorHistory {
  const limit =
    typeof options?.limit === "number" && Number.isFinite(options.limit) && options.limit > 0
      ? options.limit
      : BAODOWN_EDITOR_DEFAULT_HISTORY_LIMIT;
  return { past: [], present: state, future: [], limit };
}

/**
 * Push the current graph state onto the undo stack and replace present.
 */
export function pushBaoDownEditorHistory(
  history: BaoDownEditorHistory,
  next: BaoDownNativeEditorState,
): BaoDownEditorHistory {
  const past = [...history.past, cloneBaoDownGraph(history.present.graph)];
  if (past.length > history.limit) {
    past.splice(0, past.length - history.limit);
  }
  return { past, present: next, future: [], limit: history.limit };
}

/**
 * Undo the last mutation by restoring the most recent past snapshot.
 */
export function undoBaoDownEditorHistory(history: BaoDownEditorHistory): BaoDownEditorHistory {
  if (history.past.length === 0) {
    return history;
  }
  const past = [...history.past];
  const previousGraph = past.pop();
  if (!previousGraph) {
    return history;
  }
  const future = [cloneBaoDownGraph(history.present.graph), ...history.future];
  return {
    past,
    present: createBaoDownNativeEditorState(previousGraph, {
      selectedNodeId: history.present.selectedNodeId,
    }),
    future,
    limit: history.limit,
  };
}

/**
 * Redo a previously undone mutation.
 */
export function redoBaoDownEditorHistory(history: BaoDownEditorHistory): BaoDownEditorHistory {
  if (history.future.length === 0) {
    return history;
  }
  const future = [...history.future];
  const nextGraph = future.shift();
  if (!nextGraph) {
    return history;
  }
  const past = [...history.past, cloneBaoDownGraph(history.present.graph)];
  return {
    past,
    present: createBaoDownNativeEditorState(nextGraph, {
      selectedNodeId: history.present.selectedNodeId,
    }),
    future,
    limit: history.limit,
  };
}

/**
 * Check whether an undo operation is available.
 */
export function canUndoBaoDownEditor(history: BaoDownEditorHistory): boolean {
  return history.past.length > 0;
}

/**
 * Check whether a redo operation is available.
 */
export function canRedoBaoDownEditor(history: BaoDownEditorHistory): boolean {
  return history.future.length > 0;
}
