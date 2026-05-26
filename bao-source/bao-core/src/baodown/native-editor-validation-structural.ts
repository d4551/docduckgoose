/**
 * Structural shape validation for arbitrary BaoDown graph candidates (pre-schema).
 *
 * @shared/baodown/native-editor (validation-structural)
 */

import type { BaoDownEdgeKind } from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import {
  BAODOWN_CONTROL_EDGE_KIND,
  BAODOWN_DATA_EDGE_KIND,
  BAODOWN_GRAPH_SCHEMA_VERSION,
} from "./baodown-graph-contract.ts";
import type { BaoDownEditorValidationIssue } from "./native-editor-types.ts";

export function createSchemaIssue(path: string): BaoDownEditorValidationIssue {
  return {
    code: "schema",
    severity: "error",
    path,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBaoDownEdgeKindValue(value: unknown): value is BaoDownEdgeKind {
  return value === BAODOWN_CONTROL_EDGE_KIND || value === BAODOWN_DATA_EDGE_KIND;
}

function isJsonValue(value: unknown): boolean {
  if (value === null) {
    return true;
  }

  if (typeof value === "string" || typeof value === "boolean") {
    return true;
  }

  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (Array.isArray(value)) {
    return value.every((item) => isJsonValue(item));
  }

  if (isRecord(value)) {
    return Object.values(value).every((item) => isJsonValue(item));
  }

  return false;
}

function collectBaoDownPortStructuralIssues(
  value: unknown,
  path: string,
): BaoDownEditorValidationIssue[] {
  if (!isRecord(value)) {
    return [createSchemaIssue(path)];
  }

  const issues: BaoDownEditorValidationIssue[] = [];
  if (typeof value.id !== "string" || value.id.length === 0) {
    issues.push(createSchemaIssue(`${path}/id`));
  }
  if ("label" in value && (typeof value.label !== "string" || value.label.length === 0)) {
    issues.push(createSchemaIssue(`${path}/label`));
  }
  if (!isBaoDownEdgeKindValue(value.kind)) {
    issues.push(createSchemaIssue(`${path}/kind`));
  }
  if ("required" in value && typeof value.required !== "boolean") {
    issues.push(createSchemaIssue(`${path}/required`));
  }
  return issues;
}

function collectBaoDownPortsStructuralIssues(
  value: unknown,
  path: string,
): BaoDownEditorValidationIssue[] {
  if (!isRecord(value)) {
    return [createSchemaIssue(path)];
  }

  const issues: BaoDownEditorValidationIssue[] = [];
  if (Array.isArray(value.inputs)) {
    value.inputs.forEach((port, portIndex) => {
      issues.push(
        ...collectBaoDownPortStructuralIssues(port, `${path}/inputs/${String(portIndex)}`),
      );
    });
  } else {
    issues.push(createSchemaIssue(`${path}/inputs`));
  }

  if (Array.isArray(value.outputs)) {
    value.outputs.forEach((port, portIndex) => {
      issues.push(
        ...collectBaoDownPortStructuralIssues(port, `${path}/outputs/${String(portIndex)}`),
      );
    });
  } else {
    issues.push(createSchemaIssue(`${path}/outputs`));
  }

  return issues;
}

function collectBaoDownNodeStructuralIssues(
  value: unknown,
  nodeIndex: number,
): BaoDownEditorValidationIssue[] {
  const path = `/nodes/${String(nodeIndex)}`;
  if (!isRecord(value)) {
    return [createSchemaIssue(path)];
  }

  const issues: BaoDownEditorValidationIssue[] = [];
  if (typeof value.id !== "string" || value.id.length === 0) {
    issues.push(createSchemaIssue(`${path}/id`));
  }
  if (typeof value.type !== "string" || value.type.length === 0) {
    issues.push(createSchemaIssue(`${path}/type`));
  }
  if (isRecord(value.position)) {
    if (typeof value.position.x !== "number" || !Number.isFinite(value.position.x)) {
      issues.push(createSchemaIssue(`${path}/position/x`));
    }
    if (typeof value.position.y !== "number" || !Number.isFinite(value.position.y)) {
      issues.push(createSchemaIssue(`${path}/position/y`));
    }
  } else {
    issues.push(createSchemaIssue(`${path}/position`));
  }
  issues.push(...collectBaoDownPortsStructuralIssues(value.ports, `${path}/ports`));
  if (!(isRecord(value.config) && isJsonValue(value.config))) {
    issues.push(createSchemaIssue(`${path}/config`));
  }
  return issues;
}

function collectBaoDownEdgeStructuralIssues(
  value: unknown,
  edgeIndex: number,
): BaoDownEditorValidationIssue[] {
  const path = `/edges/${String(edgeIndex)}`;
  if (!isRecord(value)) {
    return [createSchemaIssue(path)];
  }

  const issues: BaoDownEditorValidationIssue[] = [];
  if (typeof value.fromNode !== "string" || value.fromNode.length === 0) {
    issues.push(createSchemaIssue(`${path}/fromNode`));
  }
  if (typeof value.fromPort !== "string" || value.fromPort.length === 0) {
    issues.push(createSchemaIssue(`${path}/fromPort`));
  }
  if (typeof value.toNode !== "string" || value.toNode.length === 0) {
    issues.push(createSchemaIssue(`${path}/toNode`));
  }
  if (typeof value.toPort !== "string" || value.toPort.length === 0) {
    issues.push(createSchemaIssue(`${path}/toPort`));
  }
  if (!isBaoDownEdgeKindValue(value.kind)) {
    issues.push(createSchemaIssue(`${path}/kind`));
  }
  return issues;
}

export function collectBaoDownGraphStructuralIssues(
  value: unknown,
): BaoDownEditorValidationIssue[] {
  if (!isRecord(value)) {
    return [createSchemaIssue("/")];
  }

  const issues: BaoDownEditorValidationIssue[] = [];
  if (value.schemaVersion !== BAODOWN_GRAPH_SCHEMA_VERSION) {
    issues.push(createSchemaIssue("/schemaVersion"));
  }
  if (Array.isArray(value.nodes)) {
    value.nodes.forEach((node, nodeIndex) => {
      issues.push(...collectBaoDownNodeStructuralIssues(node, nodeIndex));
    });
  } else {
    issues.push(createSchemaIssue("/nodes"));
  }
  if (Array.isArray(value.edges)) {
    value.edges.forEach((edge, edgeIndex) => {
      issues.push(...collectBaoDownEdgeStructuralIssues(edge, edgeIndex));
    });
  } else {
    issues.push(createSchemaIssue("/edges"));
  }
  return issues;
}
