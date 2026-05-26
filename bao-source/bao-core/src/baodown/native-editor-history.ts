/**
 * Undo/redo history for the native BaoDown editor.
 *
 * @shared/baodown/native-editor (history)
 */

import { cloneBaoDownGraph } from "./native-editor-graph.ts";
import { createBaoDownNativeEditorState } from "./native-editor-state.ts";
import {
  BAODOWN_EDITOR_DEFAULT_HISTORY_LIMIT,
  type BaoDownEditorHistory,
  type BaoDownNativeEditorState,
} from "./native-editor-types.ts";

/**
 * Create a history-wrapped editor state.
 *
 * @param state - Initial native editor state.
 * @param options - Optional history limit.
 * @returns Fresh history instance.
 */
export function createBaoDownEditorHistory(
  state: import("./native-editor-types.ts").BaoDownNativeEditorState,
  options?: { limit?: number },
): BaoDownEditorHistory {
  const limit =
    typeof options?.limit === "number" && Number.isFinite(options.limit) && options.limit > 0
      ? options.limit
      : BAODOWN_EDITOR_DEFAULT_HISTORY_LIMIT;

  return {
    past: [],
    present: state,
    future: [],
    limit,
  };
}

/**
 * Push the current graph state onto the undo stack and replace present.
 *
 * Clears the redo stack because the timeline has diverged.
 *
 * @param history - Current history.
 * @param next - Next editor state after a mutation.
 * @returns Updated history.
 */
export function pushBaoDownEditorHistory(
  history: BaoDownEditorHistory,
  next: BaoDownNativeEditorState,
): BaoDownEditorHistory {
  const past = [...history.past, cloneBaoDownGraph(history.present.graph)];
  if (past.length > history.limit) {
    past.splice(0, past.length - history.limit);
  }

  return {
    past,
    present: next,
    future: [],
    limit: history.limit,
  };
}

/**
 * Undo the last mutation by restoring the most recent past snapshot.
 *
 * @param history - Current history.
 * @returns Updated history, or unchanged if nothing to undo.
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
 *
 * @param history - Current history.
 * @returns Updated history, or unchanged if nothing to redo.
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
 *
 * @param history - Current history.
 * @returns True when past contains at least one snapshot.
 */
export function canUndoBaoDownEditor(history: BaoDownEditorHistory): boolean {
  return history.past.length > 0;
}

/**
 * Check whether a redo operation is available.
 *
 * @param history - Current history.
 * @returns True when future contains at least one snapshot.
 */
export function canRedoBaoDownEditor(history: BaoDownEditorHistory): boolean {
  return history.future.length > 0;
}
