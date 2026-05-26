/**
 * Semantic validation for normalized BaoDown graphs (nodes, ports, edges).
 *
 * @shared/baodown/native-editor (validation-semantic)
 */

import type {
  BaoDownEdge,
  BaoDownGraph,
  BaoDownNode,
  BaoDownPort,
} from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import type { BaoDownEditorValidationIssue } from "./native-editor-types.ts";

type BaoDownEditorPortSide = "inputs" | "outputs";

interface BaoDownEditorNodeLookupEntry {
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
      return;
    }
    seenPortIds.add(port.id);
  });

  return issues;
}

function buildEdgeTargetKey(edge: BaoDownEdge): string {
  return `${edge.toNode}:${edge.toPort}:${edge.kind}`;
}

/** Validate the from-node side of a single edge. */
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

/** Validate the to-node side of a single edge. */
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

export function collectGraphSemanticIssues(graph: BaoDownGraph): BaoDownEditorValidationIssue[] {
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
      if (hasIncomingEdge) {
        return;
      }
      issues.push({
        code: "missing-required-input",
        severity: "error",
        path: `/nodes/${String(nodeIndex)}/ports/inputs/${String(portIndex)}`,
        nodeId: node.id,
        portId: port.id,
        kind: port.kind,
      });
    });
  });

  return issues;
}
