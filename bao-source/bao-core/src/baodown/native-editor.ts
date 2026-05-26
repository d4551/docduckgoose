/**
 * Native TypeScript editor core for BaoDown graphs.
 *
 * Provides pure graph-editing primitives for selection, drag/move, and edge
 * mutation without depending on a browser UI framework or third-party node
 * editor runtime.
 *
 * @shared/baodown/native-editor
 */

export {
  inferBaodownCatalogCategorySlugFromTypeId,
  resolveBaodownCatalogCategorySlug,
} from "./catalog-category.ts";
export {
  type BaodownCatalogAccentToken,
  resolveBaodownCatalogAccentToken,
} from "./catalog-presentation.ts";
export {
  calculateBaoDownEdgePath,
  calculateBaoDownInputPortPosition,
  calculateBaoDownNodeHeight,
  calculateBaoDownOutputPortPosition,
} from "./native-editor-canvas.ts";
export {
  canRedoBaoDownEditor,
  canUndoBaoDownEditor,
  createBaoDownEditorHistory,
  pushBaoDownEditorHistory,
  redoBaoDownEditorHistory,
  undoBaoDownEditorHistory,
} from "./native-editor-history.ts";
export {
  beginBaoDownEditorConnection,
  completeBaoDownEditorConnection,
} from "./native-editor-pending-connection.ts";
export { formatBaoDownNodePosition } from "./native-editor-position.ts";
export {
  beginBaoDownEditorNodeDrag,
  buildBaoDownEditorEdge,
  createBaoDownNativeEditorState,
  endBaoDownEditorNodeDrag,
  getBaoDownEditorNode,
  listBaoDownNodeConnections,
  removeBaoDownEditorEdge,
  removeBaoDownEditorNode,
  selectBaoDownEditorNode,
  serializeBaoDownNativeEditor,
  setBaoDownEditorNodePosition,
  updateBaoDownEditorNodeDrag,
  upsertBaoDownEditorEdge,
  upsertBaoDownEditorNode,
} from "./native-editor-state.ts";
export {
  BAODOWN_CANVAS_NODE_ACCENT_HEIGHT,
  BAODOWN_CANVAS_NODE_BODY_PADDING_BOTTOM,
  BAODOWN_CANVAS_NODE_BODY_PADDING_TOP,
  BAODOWN_CANVAS_NODE_HEADER_HEIGHT,
  BAODOWN_CANVAS_NODE_HEIGHT_BASE,
  BAODOWN_CANVAS_NODE_WIDTH,
  BAODOWN_CANVAS_PORT_RADIUS,
  BAODOWN_CANVAS_PORT_SPACING,
  BAODOWN_EDITOR_DEFAULT_GRID_SIZE,
  BAODOWN_EDITOR_DEFAULT_HISTORY_LIMIT,
  type BaoDownEditorBounds,
  type BaoDownEditorConnectionValidation,
  type BaoDownEditorDragSession,
  type BaoDownEditorHistory,
  type BaoDownEditorPendingConnection,
  type BaoDownEditorPointer,
  type BaoDownEditorPositionOptions,
  type BaoDownEditorValidationCode,
  type BaoDownEditorValidationIssue,
  type BaoDownEditorValidationResult,
  type BaoDownEditorValidationSeverity,
  type BaoDownGraphInspectionResult,
  type BaoDownNativeEditorState,
} from "./native-editor-types.ts";
export {
  hasBaoDownEditorBlockingIssues,
  inspectBaoDownGraphCandidate,
  isBaoDownGraph,
  validateBaoDownEditorConnection,
} from "./native-editor-validation.ts";
