/**
 * Pipeline resource cleanup constants.
 *
 * Centralized list of pipeline cleanup resource tokens shared between:
 * - Server TypeBox schemas (OpenAPI + Eden narrowing)
 * - Shared integration context types (AI/XR/USD clients)
 *
 * @shared/constants/pipeline-resources
 */

/**
 * Canonical cleanup resource types emitted by pipeline stages.
 */
export const PIPELINE_RESOURCE_TYPES: readonly [
  "bluetooth_handles",
  "scanner_connections",
  "turntable_connections",
  "camera_streams",
  "temp_files",
  "ros_nodes",
  "mavlink_connections",
  "modbus_connections",
  "websocket_connections",
  "gpu_memory",
] = [
  "bluetooth_handles",
  "scanner_connections",
  "turntable_connections",
  "camera_streams",
  "temp_files",
  "ros_nodes",
  "mavlink_connections",
  "modbus_connections",
  "websocket_connections",
  "gpu_memory",
] as const;

/**
 * Type-safe pipeline cleanup resource token.
 */
export type PipelineResourceType = (typeof PIPELINE_RESOURCE_TYPES)[number];

const PIPELINE_RESOURCE_TYPE_SET: ReadonlySet<PipelineResourceType> = new Set(
  PIPELINE_RESOURCE_TYPES,
);

/**
 * Determine whether a string is a valid {@link PipelineResourceType}.
 *
 * @param value - Candidate value to validate.
 * @returns True when the value is a supported pipeline resource type.
 */
export function isPipelineResourceType(
  value: string | null | undefined,
): value is PipelineResourceType {
  if (!value) {
    return false;
  }
  return PIPELINE_RESOURCE_TYPE_SET.has(value as PipelineResourceType);
}
