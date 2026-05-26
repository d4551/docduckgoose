/**
 * Pending edge connection (rubber-band) helpers.
 *
 * @shared/baodown/native-editor (pending-connection)
 */

import type { BaoDownEdgeKind } from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import { buildBaoDownEditorEdge, upsertBaoDownEditorEdge } from "./native-editor-state.ts";
import type {
  BaoDownEditorConnectionValidation,
  BaoDownEditorPendingConnection,
  BaoDownNativeEditorState,
} from "./native-editor-types.ts";
import {
  hasBaoDownEditorBlockingIssues,
  validateBaoDownEditorConnection,
} from "./native-editor-validation.ts";

/**
 * Begin a pending edge connection from an output port.
 *
 * @param fromNode - Source node id.
 * @param fromPort - Source output port id.
 * @param kind - Edge kind.
 * @returns Pending connection descriptor.
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
 *
 * Validates the connection and upserts the edge if valid.
 *
 * @param state - Current editor state.
 * @param pending - Pending connection from `beginBaoDownEditorConnection`.
 * @param toNode - Target node id.
 * @param toPort - Target input port id.
 * @returns Object with updated state and validation result.
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

  return {
    state: upsertBaoDownEditorEdge(state, edge),
    validation,
  };
}
