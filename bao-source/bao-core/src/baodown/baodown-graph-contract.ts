/**
 * Runtime constants for the persisted BaoDown graph contract.
 *
 * Keep these values free of schema-builder imports so browser islands can guard
 * server-provided graphs without bundling server validation diagnostics.
 */

/**
 * Current persisted graph schema version supported by this build.
 */
export const BAODOWN_GRAPH_SCHEMA_VERSION: 1 = 1 as const;

/**
 * Control-flow edge kind.
 */
export const BAODOWN_CONTROL_EDGE_KIND: "control" = "control" as const;

/**
 * Data-dependency edge kind.
 */
export const BAODOWN_DATA_EDGE_KIND: "data" = "data" as const;
