/**
 * Graph cloning, indexing, and edge identity helpers for the native BaoDown editor.
 *
 * @shared/baodown/native-editor (graph)
 */

import type {
  BaoDownEdge,
  BaoDownGraph,
  BaoDownNode,
} from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import type { BaoDownNativeEditorState } from "./native-editor-types.ts";

export function cloneBaoDownGraph(graph: BaoDownGraph): BaoDownGraph {
  return structuredClone(graph);
}

export function findBaoDownNodeIndex(graph: BaoDownGraph, nodeId: string): number {
  return graph.nodes.findIndex((node: BaoDownNode) => node.id === nodeId);
}

export function edgeMatches(left: BaoDownEdge, right: BaoDownEdge): boolean {
  return (
    left.fromNode === right.fromNode &&
    left.fromPort === right.fromPort &&
    left.toNode === right.toNode &&
    left.toPort === right.toPort &&
    left.kind === right.kind
  );
}

export function edgeConflicts(left: BaoDownEdge, right: BaoDownEdge): boolean {
  return left.toNode === right.toNode && left.toPort === right.toPort && left.kind === right.kind;
}

export function cloneEditorState(state: BaoDownNativeEditorState): BaoDownNativeEditorState {
  return {
    ...state,
    graph: cloneBaoDownGraph(state.graph),
  };
}
