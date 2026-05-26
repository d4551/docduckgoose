/**
 * Native BaoDown editor state: selection, nodes, edges, drag.
 *
 * @shared/baodown/native-editor (state)
 */

import type {
  BaoDownEdge,
  BaoDownEdgeKind,
  BaoDownGraph,
  BaoDownNode,
  BaoDownNodePosition,
} from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import {
  cloneBaoDownGraph,
  cloneEditorState,
  edgeConflicts,
  edgeMatches,
  findBaoDownNodeIndex,
} from "./native-editor-graph.ts";
import { normalizeBaoDownNodePosition } from "./native-editor-position.ts";
import {
  BAODOWN_EDITOR_DEFAULT_GRID_SIZE,
  type BaoDownEditorPointer,
  type BaoDownEditorPositionOptions,
  type BaoDownNativeEditorState,
} from "./native-editor-types.ts";

/**
 * Create native editor state from a BaoDown graph.
 *
 * @param graph - Persisted BaoDown graph.
 * @param options - Optional initial selection.
 * @returns Fresh editor state.
 */
export function createBaoDownNativeEditorState(
  graph: BaoDownGraph,
  options?: { selectedNodeId?: string | null },
): BaoDownNativeEditorState {
  const selectedNodeId =
    typeof options?.selectedNodeId === "string" &&
    graph.nodes.some((node: BaoDownNode) => node.id === options.selectedNodeId)
      ? options.selectedNodeId
      : (graph.nodes[0]?.id ?? null);

  return {
    graph: cloneBaoDownGraph(graph),
    selectedNodeId,
    dragSession: null,
    dirty: false,
    lastMutation: null,
  };
}

/**
 * Resolve a node from the persisted graph.
 *
 * @param graph - Persisted BaoDown graph.
 * @param nodeId - Node identifier.
 * @returns Node when found.
 */
export function getBaoDownEditorNode(
  graph: BaoDownGraph,
  nodeId: string | null,
): BaoDownNode | null {
  if (!nodeId) {
    return null;
  }
  return graph.nodes.find((node: BaoDownNode) => node.id === nodeId) ?? null;
}

/**
 * Select a BaoDown node in editor state.
 *
 * @param state - Current editor state.
 * @param nodeId - Target node identifier.
 * @returns Updated editor state.
 */
export function selectBaoDownEditorNode(
  state: BaoDownNativeEditorState,
  nodeId: string | null,
): BaoDownNativeEditorState {
  const selectedNodeId =
    nodeId && state.graph.nodes.some((node: BaoDownNode) => node.id === nodeId) ? nodeId : null;
  return {
    ...state,
    selectedNodeId,
    lastMutation: "select-node",
  };
}

/**
 * List edges connected to a node.
 *
 * @param graph - Persisted BaoDown graph.
 * @param nodeId - Node identifier.
 * @returns Connected edges.
 */
export function listBaoDownNodeConnections(graph: BaoDownGraph, nodeId: string): BaoDownEdge[] {
  return graph.edges.filter(
    (edge: BaoDownEdge) => edge.fromNode === nodeId || edge.toNode === nodeId,
  );
}

/**
 * Insert or replace a node in editor state.
 *
 * @param state - Current editor state.
 * @param node - Node payload.
 * @returns Updated editor state.
 */
export function upsertBaoDownEditorNode(
  state: BaoDownNativeEditorState,
  node: BaoDownNode,
): BaoDownNativeEditorState {
  const nextState = cloneEditorState(state);
  const nodeIndex = findBaoDownNodeIndex(nextState.graph, node.id);
  if (nodeIndex >= 0) {
    nextState.graph.nodes[nodeIndex] = structuredClone(node);
  } else {
    nextState.graph.nodes.push(structuredClone(node));
  }
  nextState.selectedNodeId = node.id;
  nextState.dirty = true;
  nextState.lastMutation = "upsert-node";
  return nextState;
}

/**
 * Remove a node and all connected edges.
 *
 * @param state - Current editor state.
 * @param nodeId - Node identifier.
 * @returns Updated editor state.
 */
export function removeBaoDownEditorNode(
  state: BaoDownNativeEditorState,
  nodeId: string,
): BaoDownNativeEditorState {
  const nodeIndex = findBaoDownNodeIndex(state.graph, nodeId);
  if (nodeIndex < 0) {
    return state;
  }

  const nextState = cloneEditorState(state);
  nextState.graph.nodes.splice(nodeIndex, 1);
  nextState.graph.edges = nextState.graph.edges.filter(
    (edge: BaoDownEdge) => edge.fromNode !== nodeId && edge.toNode !== nodeId,
  );
  nextState.selectedNodeId =
    nextState.selectedNodeId === nodeId
      ? (nextState.graph.nodes[0]?.id ?? null)
      : nextState.selectedNodeId;
  nextState.dragSession = nextState.dragSession?.nodeId === nodeId ? null : nextState.dragSession;
  nextState.dirty = true;
  nextState.lastMutation = "remove-node";
  return nextState;
}

/**
 * Set a node position directly.
 *
 * @param state - Current editor state.
 * @param nodeId - Node identifier.
 * @param position - Next node position.
 * @param options - Position normalization settings.
 * @returns Updated editor state.
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
  const node = nextState.graph.nodes[nodeIndex];
  if (!node) {
    return state;
  }
  node.position = normalizeBaoDownNodePosition(position, options);
  nextState.selectedNodeId = nodeId;
  nextState.dirty = true;
  nextState.lastMutation = "move-node";
  return nextState;
}

/**
 * Begin a drag session for a node.
 *
 * @param state - Current editor state.
 * @param nodeId - Node identifier.
 * @param pointerStart - Pointer origin.
 * @returns Updated editor state.
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
 *
 * @param state - Current editor state.
 * @param pointer - Current pointer position.
 * @param options - Position normalization settings.
 * @returns Updated editor state.
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
  return {
    ...nextState,
    dragSession,
  };
}

/**
 * End the active drag session.
 *
 * @param state - Current editor state.
 * @returns Updated editor state.
 */
export function endBaoDownEditorNodeDrag(
  state: BaoDownNativeEditorState,
): BaoDownNativeEditorState {
  if (!state.dragSession) {
    return state;
  }
  return {
    ...state,
    dragSession: null,
  };
}

/**
 * Insert or replace an edge while enforcing a single incoming edge per
 * `{toNode,toPort,kind}` target.
 *
 * @param state - Current editor state.
 * @param edge - Edge payload.
 * @returns Updated editor state.
 */
export function upsertBaoDownEditorEdge(
  state: BaoDownNativeEditorState,
  edge: BaoDownEdge,
): BaoDownNativeEditorState {
  const nextState = cloneEditorState(state);
  nextState.graph.edges = nextState.graph.edges.filter(
    (existingEdge: BaoDownEdge) =>
      !(edgeMatches(existingEdge, edge) || edgeConflicts(existingEdge, edge)),
  );
  nextState.graph.edges.push(structuredClone(edge));
  nextState.dirty = true;
  nextState.lastMutation = "upsert-edge";
  return nextState;
}

/**
 * Remove an edge from editor state.
 *
 * @param state - Current editor state.
 * @param edge - Edge payload.
 * @returns Updated editor state.
 */
export function removeBaoDownEditorEdge(
  state: BaoDownNativeEditorState,
  edge: BaoDownEdge,
): BaoDownNativeEditorState {
  const beforeCount = state.graph.edges.length;
  const nextState = cloneEditorState(state);
  nextState.graph.edges = nextState.graph.edges.filter(
    (existingEdge: BaoDownEdge) => !edgeMatches(existingEdge, edge),
  );
  if (nextState.graph.edges.length === beforeCount) {
    return state;
  }
  nextState.dirty = true;
  nextState.lastMutation = "remove-edge";
  return nextState;
}

/**
 * Create an edge payload from editor selections.
 *
 * @param fromNode - Source node identifier.
 * @param fromPort - Source port identifier.
 * @param toNode - Target node identifier.
 * @param toPort - Target port identifier.
 * @param kind - Edge kind.
 * @returns Typed BaoDown edge payload.
 */
export function buildBaoDownEditorEdge(
  fromNode: string,
  fromPort: string,
  toNode: string,
  toPort: string,
  kind: BaoDownEdgeKind,
): BaoDownEdge {
  return { fromNode, fromPort, toNode, toPort, kind };
}

/**
 * Serialize editor state back to the persisted BaoDown graph contract.
 *
 * @param state - Current editor state.
 * @returns Graph clone safe for persistence.
 */
export function serializeBaoDownNativeEditor(state: BaoDownNativeEditorState): BaoDownGraph {
  return cloneBaoDownGraph(state.graph);
}
