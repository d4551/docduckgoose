/**
 * BaoDown graph structural diff utility.
 *
 * Computes added/removed/changed nodes and edges between two BaoDown graphs.
 *
 * @shared/utils/baodown-graph-diff
 */

import type {
  BaoDownEdge,
  BaoDownGraph,
  BaoDownNode,
} from "../schemas/baodown/baodown-flow.schemas";

/** Edge key for deduplication. */
function edgeKey(e: BaoDownEdge): string {
  return `${e.fromNode}:${e.fromPort}:${e.toNode}:${e.toPort}:${e.kind}`;
}

/**
 * Structural diff between two BaoDown graphs.
 */
export interface BaoDownGraphDiff {
  /** Node ids added in target (in target, not in source). */
  nodesAdded: BaoDownNode[];
  /** Node ids removed (in source, not in target). */
  nodesRemoved: BaoDownNode[];
  /** Nodes with same id but different properties (type, position, ports, config). */
  nodesChanged: Array<{ nodeId: string; from: BaoDownNode; to: BaoDownNode }>;
  /** Edges added in target. */
  edgesAdded: BaoDownEdge[];
  /** Edges removed. */
  edgesRemoved: BaoDownEdge[];
  /** Edges with same key but different properties (edge key = fromNode:fromPort:toNode:toPort:kind). */
  edgesChanged: Array<{ edgeKey: string; from: BaoDownEdge; to: BaoDownEdge }>;
}

/**
 * Deep equality for JSON-serializable values (used for config comparison).
 */
function jsonEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Node equality excluding editor position (position may drift).
 */
function nodeEqual(a: BaoDownNode, b: BaoDownNode): boolean {
  if (a.id !== b.id) {
    return false;
  }
  if (a.type !== b.type) {
    return false;
  }
  if (!jsonEqual(a.ports, b.ports)) {
    return false;
  }
  if (!jsonEqual(a.config, b.config)) {
    return false;
  }
  return true;
}

/**
 * Edge equality.
 */
function edgeEqual(a: BaoDownEdge, b: BaoDownEdge): boolean {
  return (
    a.fromNode === b.fromNode &&
    a.fromPort === b.fromPort &&
    a.toNode === b.toNode &&
    a.toPort === b.toPort &&
    a.kind === b.kind
  );
}

type EntityDiff<T> = {
  added: T[];
  removed: T[];
  changed: Array<{ id: string; from: T; to: T }>;
};

function buildEntityMap<T>(entities: T[], getId: (entity: T) => string): Map<string, T> {
  const map = new Map<string, T>();
  for (const entity of entities) {
    map.set(getId(entity), entity);
  }
  return map;
}

function buildEntityDiff<T>(
  from: Map<string, T>,
  to: Map<string, T>,
  isChanged: (left: T, right: T) => boolean,
): EntityDiff<T> {
  const added: T[] = [];
  const removed: T[] = [];
  const changed: Array<{ id: string; from: T; to: T }> = [];

  const allIds = new Set([...from.keys(), ...to.keys()]);
  for (const id of allIds) {
    const source = from.get(id);
    const target = to.get(id);
    if (!source && target) {
      added.push(target);
    } else if (source && !target) {
      removed.push(source);
    } else if (source && target && !isChanged(source, target)) {
      changed.push({ id, from: source, to: target });
    }
  }

  return { added, removed, changed };
}

/**
 * Normalize graph-like input to ensure nodes and edges are arrays.
 */
function normalizeGraph(g: unknown): { nodes: BaoDownNode[]; edges: BaoDownEdge[] } {
  if (!g || typeof g !== "object" || Array.isArray(g)) {
    return { nodes: [], edges: [] };
  }
  const nodes = "nodes" in g && Array.isArray(g.nodes) ? (g.nodes as BaoDownNode[]) : [];
  const edges = "edges" in g && Array.isArray(g.edges) ? (g.edges as BaoDownEdge[]) : [];
  return { nodes, edges };
}

/**
 * Compute structural diff between two BaoDown graphs.
 *
 * @param from - Source graph (typically older version).
 * @param to - Target graph (typically newer version).
 * @returns Diff with added/removed/changed nodes and edges.
 */
export function computeBaoDownGraphDiff(
  from: BaoDownGraph | Record<string, unknown>,
  to: BaoDownGraph | Record<string, unknown>,
): BaoDownGraphDiff {
  const fromNorm = normalizeGraph(from);
  const toNorm = normalizeGraph(to);

  const fromNodeMap = buildEntityMap(fromNorm.nodes, (node) => node.id);
  const toNodeMap = buildEntityMap(toNorm.nodes, (node) => node.id);
  const fromEdgeMap = buildEntityMap(fromNorm.edges, edgeKey);
  const toEdgeMap = buildEntityMap(toNorm.edges, edgeKey);

  const nodeDiff = buildEntityDiff(fromNodeMap, toNodeMap, nodeEqual);
  const edgeDiff = buildEntityDiff(fromEdgeMap, toEdgeMap, edgeEqual);

  const nodesChanged: BaoDownGraphDiff["nodesChanged"] = nodeDiff.changed.map(
    ({ id, from: changedFrom, to: changedTo }) => ({
      nodeId: id,
      from: changedFrom,
      to: changedTo,
    }),
  );
  const edgesChanged: BaoDownGraphDiff["edgesChanged"] = edgeDiff.changed.map(
    ({ id, from: changedFrom, to: changedTo }) => ({
      edgeKey: id,
      from: changedFrom,
      to: changedTo,
    }),
  );

  return {
    nodesAdded: nodeDiff.added,
    nodesRemoved: nodeDiff.removed,
    nodesChanged,
    edgesAdded: edgeDiff.added,
    edgesRemoved: edgeDiff.removed,
    edgesChanged,
  };
}
