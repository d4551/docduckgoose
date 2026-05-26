/**
 * Graph and connection validation for the native BaoDown editor.
 *
 * @shared/baodown/native-editor (validation)
 */

import type { BaoDownEdge, BaoDownGraph } from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import { edgeConflicts, edgeMatches } from "./native-editor-graph.ts";
import type {
  BaoDownEditorConnectionValidation,
  BaoDownEditorValidationIssue,
  BaoDownEditorValidationResult,
  BaoDownGraphInspectionResult,
} from "./native-editor-types.ts";
import {
  collectGraphSemanticIssues,
  createNodeLookup,
  findBaoDownPort,
} from "./native-editor-validation-semantic.ts";
import {
  collectBaoDownGraphStructuralIssues,
  createSchemaIssue,
} from "./native-editor-validation-structural.ts";

function buildValidationResult(
  schemaValid: boolean,
  issues: BaoDownEditorValidationIssue[],
): BaoDownEditorValidationResult {
  let errorCount = 0;
  let warningCount = 0;

  for (const issue of issues) {
    if (issue.severity === "error") {
      errorCount += 1;
      continue;
    }
    warningCount += 1;
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

function isBaoDownGraphValue(value: unknown): value is BaoDownGraph {
  return collectBaoDownGraphStructuralIssues(value).length === 0;
}

function validateBaoDownGraphCandidate(value: unknown): BaoDownGraphInspectionResult {
  const structuralIssues = collectBaoDownGraphStructuralIssues(value);
  if (structuralIssues.length > 0) {
    return {
      ...buildValidationResult(false, structuralIssues),
      graph: null,
    };
  }

  if (!isBaoDownGraphValue(value)) {
    return {
      ...buildValidationResult(false, [createSchemaIssue("/")]),
      graph: null,
    };
  }

  const issues = collectGraphSemanticIssues(value);

  return {
    ...buildValidationResult(true, issues),
    graph: value,
  };
}

/**
 * Guard for the persisted BaoDown graph contract.
 *
 * @param value - Candidate value.
 * @returns True when the value satisfies the BaoDown graph schema.
 */
export function isBaoDownGraph(value: unknown): value is BaoDownGraph {
  return validateBaoDownGraphCandidate(value).valid;
}

/**
 * Inspect an arbitrary graph candidate with structural and semantic validation.
 *
 * This follows the TypeBox recommendation of using `Errors(...)` only
 * after a failed `Check(...)`.
 *
 * @param value - Candidate graph payload.
 * @returns Structured validation result and validated graph when available.
 */
export function inspectBaoDownGraphCandidate(value: unknown): BaoDownGraphInspectionResult {
  return validateBaoDownGraphCandidate(value);
}

/**
 * Validate a prospective edge connection against the current graph.
 *
 * When the candidate targets an already-occupied `{toNode,toPort,kind}` slot,
 * the result remains valid and emits a `replaces-incoming-edge` warning because
 * `upsertBaoDownEditorEdge(...)` will replace the previous incoming edge.
 *
 * @param graph - Persisted BaoDown graph.
 * @param edge - Candidate edge payload.
 * @returns Structured validation result for the candidate connection.
 */
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

  return {
    ...buildValidationResult(true, issues),
    edge,
  };
}

/**
 * Determine whether a validation result contains blocking issues.
 *
 * @param result - Validation result returned by the native editor.
 * @returns True when the result is not ready for persistence or execution.
 */
export function hasBaoDownEditorBlockingIssues(result: BaoDownEditorValidationResult): boolean {
  return !result.ready;
}
