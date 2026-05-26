/**
 * Shared types and constants for the native BaoDown editor.
 *
 * @shared/baodown/native-editor (types)
 */

import type {
  BaoDownEdge,
  BaoDownEdgeKind,
  BaoDownGraph,
  BaoDownNodePosition,
} from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";

/**
 * Default editor grid size used by drag normalization when no explicit grid is supplied.
 */
export const BAODOWN_EDITOR_DEFAULT_GRID_SIZE: 24 = 24 as const;

/**
 * Default maximum number of undo snapshots retained by the history stack.
 */
export const BAODOWN_EDITOR_DEFAULT_HISTORY_LIMIT: 50 = 50 as const;

/**
 * Default dimensions for rendered nodes in the SVG canvas.
 */
export const BAODOWN_CANVAS_NODE_WIDTH: 200 = 200 as const;
/** Accent strip height rendered above each canvas node card. */
export const BAODOWN_CANVAS_NODE_ACCENT_HEIGHT: 4 = 4 as const;
/** Title block height below the accent strip. */
export const BAODOWN_CANVAS_NODE_HEADER_HEIGHT: 40 = 40 as const;
/** Padding between the title block and the first port row. */
export const BAODOWN_CANVAS_NODE_BODY_PADDING_TOP: 10 = 10 as const;
/** Padding below the last port row. */
export const BAODOWN_CANVAS_NODE_BODY_PADDING_BOTTOM: 12 = 12 as const;
/** Base node height before input and output ports are added. */
export const BAODOWN_CANVAS_NODE_HEIGHT_BASE: 60 = 60 as const;
/** Radius for rendered input and output port anchors. */
export const BAODOWN_CANVAS_PORT_RADIUS: 6 = 6 as const;
/** Vertical spacing between adjacent rendered ports. */
export const BAODOWN_CANVAS_PORT_SPACING: 24 = 24 as const;

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
 *
 * The issue code is the canonical key for any UI/i18n mapping. `path` is a
 * persisted-graph-relative location such as `/nodes/0/id` or `/edges/3/toPort`.
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
 * Undo/redo history stack wrapping native editor state.
 *
 * Stores immutable snapshots of the editor graph for each mutation.
 * Drag sessions are NOT tracked individually — only the final position
 * after `endBaoDownEditorNodeDrag` produces a history entry.
 */
export interface BaoDownEditorHistory {
  past: BaoDownGraph[];
  present: BaoDownNativeEditorState;
  future: BaoDownGraph[];
  limit: number;
}

/**
 * Pending edge connection being drawn by the user.
 */
export interface BaoDownEditorPendingConnection {
  fromNode: string;
  fromPort: string;
  kind: BaoDownEdgeKind;
}
