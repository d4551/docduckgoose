/**
 * BaoDown graph validation primitives.
 *
 * Provides structural and semantic validation for persisted BaoDown graphs,
 * edge connection validation, and shared lookup/matching utilities used
 * across the editor split modules.
 *
 * @shared/baodown/editor-validation
 */

import type {
  BaoDownEdge,
  BaoDownEdgeKind,
  BaoDownGraph,
  BaoDownNode,
  BaoDownPort,
} from "../schemas/baodown/baodown-flow.schemas.ts";
import { BAODOWN_CONTROL_EDGE_KIND, BAODOWN_DATA_EDGE_KIND } from "./baodown-graph-contract.ts";
import {
  collectBaoDownGraphStructuralIssues,
  isBaoDownGraphValue,
} from "./editor-validation-internal.ts";

/**
 * Validation severity for graph/editor diagnostics.
 */
export type BaoDownEditorValidationSeverity = "error" | "warning";

/**
 * Stable machine-readable validation issue codes emitted by the native editor.
 */
export type BaoDownEditorValidationCode =
  | "schema"
  | "duplicate-node-id"
  | "duplicate-input-port"
  | "duplicate-output-port"
  | "missing-edge-from-node"
  | "missing-edge-to-node"
  | "missing-edge-from-port"
  | "missing-edge-to-port"
  | "edge-kind-mismatch"
  | "duplicate-incoming-edge"
  | "replaces-incoming-edge"
  | "missing-required-input";

/**
 * Structured validation issue emitted by the native editor.
 */
export interface BaoDownEditorValidationIssue {
  code: BaoDownEditorValidationCode;
  severity: BaoDownEditorValidationSeverity;
  path: string;
  nodeId?: string;
  portId?: string;
  edgeIndex?: number;
  kind?: BaoDownEdgeKind;
}

/**
 * Result returned by graph and connection validation helpers.
 */
export interface BaoDownEditorValidationResult {
  valid: boolean;
  schemaValid: boolean;
  ready: boolean;
  issues: BaoDownEditorValidationIssue[];
  errorCount: number;
  warningCount: number;
}

/**
 * Result returned when validating an arbitrary graph candidate.
 */
export interface BaoDownGraphInspectionResult extends BaoDownEditorValidationResult {
  graph: BaoDownGraph | null;
}

/**
 * Result returned when validating a prospective edge connection.
 */
export interface BaoDownEditorConnectionValidation extends BaoDownEditorValidationResult {
  edge: BaoDownEdge;
}

export type BaoDownEditorPortSide = "inputs" | "outputs";

export interface BaoDownEditorNodeLookupEntry {
  node: BaoDownNode;
  nodeIndex: number;
}

export function createNodeLookup(graph: BaoDownGraph): Map<string, BaoDownEditorNodeLookupEntry> {
  const lookup = new Map<string, BaoDownEditorNodeLookupEntry>();
  graph.nodes.forEach((node: BaoDownNode, nodeIndex: number) => {
    if (!lookup.has(node.id)) {
      lookup.set(node.id, { node, nodeIndex });
    }
  });
  return lookup;
}

export function findBaoDownPort(
  node: BaoDownNode,
  side: BaoDownEditorPortSide,
  portId: string,
): BaoDownPort | null {
  const ports = side === "inputs" ? node.ports.inputs : node.ports.outputs;
  return ports.find((port: BaoDownPort) => port.id === portId) ?? null;
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

function _isBaoDownEdgeKindValue(value: unknown): value is BaoDownEdgeKind {
  return value === BAODOWN_CONTROL_EDGE_KIND || value === BAODOWN_DATA_EDGE_KIND;
}

function createSchemaIssue(path: string): BaoDownEditorValidationIssue {
  return { code: "schema", severity: "error", path };
}

function buildValidationResult(
  schemaValid: boolean,
  issues: BaoDownEditorValidationIssue[],
): BaoDownEditorValidationResult {
  let errorCount = 0;
  let warningCount = 0;
  for (const issue of issues) {
    if (issue.severity === "error") {
      errorCount += 1;
    } else {
      warningCount += 1;
    }
  }
  return {
    valid: schemaValid && errorCount === 0,
    schemaValid,
    ready: schemaValid && errorCount === 0,
    issues,
    errorCount,
    warningCount,
  };
}

function collectDuplicatePortIssues(
  node: BaoDownNode,
  nodeIndex: number,
  side: BaoDownEditorPortSide,
): BaoDownEditorValidationIssue[] {
  const issues: BaoDownEditorValidationIssue[] = [];
  const seenPortIds = new Set<string>();
  const ports = side === "inputs" ? node.ports.inputs : node.ports.outputs;
  const code = side === "inputs" ? "duplicate-input-port" : "duplicate-output-port";
  ports.forEach((port: BaoDownPort, portIndex: number) => {
    if (seenPortIds.has(port.id)) {
      issues.push({
        code,
        severity: "error",
        path: `/nodes/${String(nodeIndex)}/ports/${side}/${String(portIndex)}/id`,
        nodeId: node.id,
        portId: port.id,
        kind: port.kind,
      });
    } else {
      seenPortIds.add(port.id);
    }
  });
  return issues;
}

function buildEdgeTargetKey(edge: BaoDownEdge): string {
  return `${edge.toNode}:${edge.toPort}:${edge.kind}`;
}

function collectEdgeFromIssues(
  edge: BaoDownEdge,
  edgeIndex: number,
  nodeLookup: Map<string, BaoDownEditorNodeLookupEntry>,
): BaoDownEditorValidationIssue[] {
  const fromEntry = nodeLookup.get(edge.fromNode);
  if (!fromEntry) {
    return [
      {
        code: "missing-edge-from-node",
        severity: "error",
        path: `/edges/${String(edgeIndex)}/fromNode`,
        edgeIndex,
        nodeId: edge.fromNode,
        kind: edge.kind,
      },
    ];
  }
  const sourcePort = findBaoDownPort(fromEntry.node, "outputs", edge.fromPort);
  if (!sourcePort) {
    return [
      {
        code: "missing-edge-from-port",
        severity: "error",
        path: `/edges/${String(edgeIndex)}/fromPort`,
        edgeIndex,
        nodeId: edge.fromNode,
        portId: edge.fromPort,
        kind: edge.kind,
      },
    ];
  }
  if (sourcePort.kind !== edge.kind) {
    return [
      {
        code: "edge-kind-mismatch",
        severity: "error",
        path: `/edges/${String(edgeIndex)}/kind`,
        edgeIndex,
        nodeId: edge.fromNode,
        portId: edge.fromPort,
        kind: edge.kind,
      },
    ];
  }
  return [];
}

function collectEdgeToIssues(
  edge: BaoDownEdge,
  edgeIndex: number,
  nodeLookup: Map<string, BaoDownEditorNodeLookupEntry>,
): BaoDownEditorValidationIssue[] {
  const toEntry = nodeLookup.get(edge.toNode);
  if (!toEntry) {
    return [
      {
        code: "missing-edge-to-node",
        severity: "error",
        path: `/edges/${String(edgeIndex)}/toNode`,
        edgeIndex,
        nodeId: edge.toNode,
        kind: edge.kind,
      },
    ];
  }
  const targetPort = findBaoDownPort(toEntry.node, "inputs", edge.toPort);
  if (!targetPort) {
    return [
      {
        code: "missing-edge-to-port",
        severity: "error",
        path: `/edges/${String(edgeIndex)}/toPort`,
        edgeIndex,
        nodeId: edge.toNode,
        portId: edge.toPort,
        kind: edge.kind,
      },
    ];
  }
  if (targetPort.kind !== edge.kind) {
    return [
      {
        code: "edge-kind-mismatch",
        severity: "error",
        path: `/edges/${String(edgeIndex)}/kind`,
        edgeIndex,
        nodeId: edge.toNode,
        portId: edge.toPort,
        kind: edge.kind,
      },
    ];
  }
  return [];
}

function collectGraphSemanticIssues(graph: BaoDownGraph): BaoDownEditorValidationIssue[] {
  const issues: BaoDownEditorValidationIssue[] = [];
  const nodeLookup = createNodeLookup(graph);
  const seenNodeIds = new Set<string>();
  const seenIncomingTargets = new Set<string>();

  graph.nodes.forEach((node: BaoDownNode, nodeIndex: number) => {
    if (seenNodeIds.has(node.id)) {
      issues.push({
        code: "duplicate-node-id",
        severity: "error",
        path: `/nodes/${String(nodeIndex)}/id`,
        nodeId: node.id,
      });
    } else {
      seenNodeIds.add(node.id);
    }
    issues.push(...collectDuplicatePortIssues(node, nodeIndex, "inputs"));
    issues.push(...collectDuplicatePortIssues(node, nodeIndex, "outputs"));
  });

  graph.edges.forEach((edge: BaoDownEdge, edgeIndex: number) => {
    issues.push(...collectEdgeFromIssues(edge, edgeIndex, nodeLookup));
    issues.push(...collectEdgeToIssues(edge, edgeIndex, nodeLookup));
    const incomingTargetKey = buildEdgeTargetKey(edge);
    if (seenIncomingTargets.has(incomingTargetKey)) {
      issues.push({
        code: "duplicate-incoming-edge",
        severity: "error",
        path: `/edges/${String(edgeIndex)}`,
        edgeIndex,
        nodeId: edge.toNode,
        portId: edge.toPort,
        kind: edge.kind,
      });
    } else {
      seenIncomingTargets.add(incomingTargetKey);
    }
  });

  graph.nodes.forEach((node: BaoDownNode, nodeIndex: number) => {
    node.ports.inputs.forEach((port: BaoDownPort, portIndex: number) => {
      if (!port.required) {
        return;
      }
      const hasIncomingEdge = graph.edges.some((edge: BaoDownEdge) => {
        if (edge.toNode !== node.id || edge.toPort !== port.id || edge.kind !== port.kind) {
          return false;
        }
        const sourceEntry = nodeLookup.get(edge.fromNode);
        if (!sourceEntry) {
          return false;
        }
        const sourcePort = findBaoDownPort(sourceEntry.node, "outputs", edge.fromPort);
        return sourcePort?.kind === edge.kind;
      });
      if (!hasIncomingEdge) {
        issues.push({
          code: "missing-required-input",
          severity: "error",
          path: `/nodes/${String(nodeIndex)}/ports/inputs/${String(portIndex)}`,
          nodeId: node.id,
          portId: port.id,
          kind: port.kind,
        });
      }
    });
  });

  return issues;
}

function validateBaoDownGraphCandidate(value: unknown): BaoDownGraphInspectionResult {
  const structuralIssues = collectBaoDownGraphStructuralIssues(value);
  if (structuralIssues.length > 0) {
    return { ...buildValidationResult(false, structuralIssues), graph: null };
  }
  if (!isBaoDownGraphValue(value)) {
    return { ...buildValidationResult(false, [createSchemaIssue("/")]), graph: null };
  }
  const issues = collectGraphSemanticIssues(value);
  return { ...buildValidationResult(true, issues), graph: value };
}

export function isBaoDownGraph(value: unknown): value is BaoDownGraph {
  return validateBaoDownGraphCandidate(value).valid;
}

export function inspectBaoDownGraphCandidate(value: unknown): BaoDownGraphInspectionResult {
  return validateBaoDownGraphCandidate(value);
}

export function validateBaoDownEditorConnection(
  graph: BaoDownGraph,
  edge: BaoDownEdge,
): BaoDownEditorConnectionValidation {
  const issues: BaoDownEditorValidationIssue[] = [];
  const nodeLookup = createNodeLookup(graph);
  const fromEntry = nodeLookup.get(edge.fromNode);
  const toEntry = nodeLookup.get(edge.toNode);

  if (fromEntry) {
    const sourcePort = findBaoDownPort(fromEntry.node, "outputs", edge.fromPort);
    if (!sourcePort) {
      issues.push({
        code: "missing-edge-from-port",
        severity: "error",
        path: "/edge/fromPort",
        nodeId: edge.fromNode,
        portId: edge.fromPort,
        kind: edge.kind,
      });
    } else if (sourcePort.kind !== edge.kind) {
      issues.push({
        code: "edge-kind-mismatch",
        severity: "error",
        path: "/edge/kind",
        nodeId: edge.fromNode,
        portId: edge.fromPort,
        kind: edge.kind,
      });
    }
  } else {
    issues.push({
      code: "missing-edge-from-node",
      severity: "error",
      path: "/edge/fromNode",
      nodeId: edge.fromNode,
      kind: edge.kind,
    });
  }

  if (toEntry) {
    const targetPort = findBaoDownPort(toEntry.node, "inputs", edge.toPort);
    if (!targetPort) {
      issues.push({
        code: "missing-edge-to-port",
        severity: "error",
        path: "/edge/toPort",
        nodeId: edge.toNode,
        portId: edge.toPort,
        kind: edge.kind,
      });
    } else if (targetPort.kind !== edge.kind) {
      issues.push({
        code: "edge-kind-mismatch",
        severity: "error",
        path: "/edge/kind",
        nodeId: edge.toNode,
        portId: edge.toPort,
        kind: edge.kind,
      });
    }
  } else {
    issues.push({
      code: "missing-edge-to-node",
      severity: "error",
      path: "/edge/toNode",
      nodeId: edge.toNode,
      kind: edge.kind,
    });
  }

  const conflictsWithIncomingEdge = graph.edges.some(
    (existingEdge: BaoDownEdge) =>
      !edgeMatches(existingEdge, edge) && edgeConflicts(existingEdge, edge),
  );
  if (conflictsWithIncomingEdge) {
    issues.push({
      code: "replaces-incoming-edge",
      severity: "warning",
      path: "/edge",
      nodeId: edge.toNode,
      portId: edge.toPort,
      kind: edge.kind,
    });
  }

  return { ...buildValidationResult(true, issues), edge };
}

export function hasBaoDownEditorBlockingIssues(result: BaoDownEditorValidationResult): boolean {
  return !result.ready;
}
