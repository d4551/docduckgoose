/**
 * BaoDown selection primitives — editor state, node CRUD, connection helpers.
 *
 * @shared/baodown/editor-selection
 */

import type {
  BaoDownEdge,
  BaoDownEdgeKind,
  BaoDownGraph,
  BaoDownNode,
  BaoDownNodePosition,
} from "../schemas/baodown/baodown-flow.schemas.ts";
import type { BaoDownEditorConnectionValidation } from "./editor-validation.ts";
import {
  edgeConflicts,
  edgeMatches,
  hasBaoDownEditorBlockingIssues,
  validateBaoDownEditorConnection,
} from "./editor-validation.ts";

/**
 * Pointer coordinates in editor space.
 */
export interface BaoDownEditorPointer {
  x: number;
  y: number;
}

/**
 * Optional editor movement bounds.
 */
export interface BaoDownEditorBounds {
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
}

/**
 * Position normalization settings.
 */
export interface BaoDownEditorPositionOptions {
  snapToGrid?: number | null;
  bounds?: BaoDownEditorBounds | null;
}

/**
 * Active node drag session.
 */
export interface BaoDownEditorDragSession {
  nodeId: string;
  pointerStart: BaoDownEditorPointer;
  origin: BaoDownNodePosition;
}

/**
 * Native BaoDown editor state.
 */
export interface BaoDownNativeEditorState {
  graph: BaoDownGraph;
  selectedNodeId: string | null;
  dragSession: BaoDownEditorDragSession | null;
  dirty: boolean;
  lastMutation:
    | "move-node"
    | "remove-node"
    | "remove-edge"
    | "select-node"
    | "upsert-edge"
    | "upsert-node"
    | null;
}

/**
 * Pending edge connection being drawn by the user.
 */
export interface BaoDownEditorPendingConnection {
  fromNode: string;
  fromPort: string;
  kind: BaoDownEdgeKind;
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

/**
 * Format a persisted BaoDown node position for the inspector UI.
 */
export function formatBaoDownNodePosition(position: BaoDownNodePosition): string {
  return `x:${String(position.x)} y:${String(position.y)}`;
}

/**
 * Create native editor state from a BaoDown graph.
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
 */
export function selectBaoDownEditorNode(
  state: BaoDownNativeEditorState,
  nodeId: string | null,
): BaoDownNativeEditorState {
  const selectedNodeId =
    nodeId && state.graph.nodes.some((node: BaoDownNode) => node.id === nodeId) ? nodeId : null;
  return { ...state, selectedNodeId, lastMutation: "select-node" };
}

/**
 * List edges connected to a node.
 */
export function listBaoDownNodeConnections(graph: BaoDownGraph, nodeId: string): BaoDownEdge[] {
  return graph.edges.filter(
    (edge: BaoDownEdge) => edge.fromNode === nodeId || edge.toNode === nodeId,
  );
}

/**
 * Insert or replace a node in editor state.
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
 * Insert or replace an edge while enforcing a single incoming edge per
 * `{toNode,toPort,kind}` target.
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
 */
export function serializeBaoDownNativeEditor(state: BaoDownNativeEditorState): BaoDownGraph {
  return cloneBaoDownGraph(state.graph);
}

/**
 * Begin a pending edge connection from an output port.
 */
export function beginBaoDownEditorConnection(
  fromNode: string,
  fromPort: string,
  kind: BaoDownEdgeKind,
): BaoDownEditorPendingConnection {
  return { fromNode, fromPort, kind };
}

/**
 * Complete a pending edge connection to a target input port.
 */
export function completeBaoDownEditorConnection(
  state: BaoDownNativeEditorState,
  pending: BaoDownEditorPendingConnection,
  toNode: string,
  toPort: string,
): {
  state: BaoDownNativeEditorState;
  validation: BaoDownEditorConnectionValidation;
} {
  const edge = buildBaoDownEditorEdge(
    pending.fromNode,
    pending.fromPort,
    toNode,
    toPort,
    pending.kind,
  );
  const validation = validateBaoDownEditorConnection(state.graph, edge);
  if (hasBaoDownEditorBlockingIssues(validation)) {
    return { state, validation };
  }
  return { state: upsertBaoDownEditorEdge(state, edge), validation };
}
