/**
 * BaoDown connection-validation codes.
 *
 * Shared between server-side connection validation, API schemas, and UI diagnostics.
 *
 * @shared/constants/baodown-connection-validation
 */

/**
 * Stable rejection/diagnostic codes for validating a proposed BaoDown edge.
 */
export const BAODOWN_CONNECTION_VALIDATION_CODES: readonly [
  "SELF_CONNECTION",
  "EDGE_FROM_NODE_MISSING",
  "EDGE_TO_NODE_MISSING",
  "EDGE_FROM_PORT_MISSING",
  "EDGE_TO_PORT_MISSING",
  "EDGE_KIND_MISMATCH",
  "EDGE_DUPLICATE",
  "EDGE_INPUT_MULTIPLE_SOURCES",
  "DEPENDENCY_CYCLE_DETECTED",
] = [
  "SELF_CONNECTION",
  "EDGE_FROM_NODE_MISSING",
  "EDGE_TO_NODE_MISSING",
  "EDGE_FROM_PORT_MISSING",
  "EDGE_TO_PORT_MISSING",
  "EDGE_KIND_MISMATCH",
  "EDGE_DUPLICATE",
  "EDGE_INPUT_MULTIPLE_SOURCES",
  "DEPENDENCY_CYCLE_DETECTED",
] as const;

/**
 * Union type for {@link BAODOWN_CONNECTION_VALIDATION_CODES}.
 */
export type BaoDownConnectionValidationCode = (typeof BAODOWN_CONNECTION_VALIDATION_CODES)[number];
