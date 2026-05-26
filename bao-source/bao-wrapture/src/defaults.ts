/**
 * Wrapture centralized defaults.
 *
 * Safe defaults for the binary serialization layer when config overrides are missing.
 *
 * @shared/wrapture
 */

/**
 * Default maximum buffer size (bytes) for decode operations to prevent DoS.
 */
export const WRAPTURE_DEFAULT_MAX_DECODE_BYTES = 1_048_576;

/**
 * Builder capacity constants for different payload types (bytes).
 *
 * Tuned for the pooled builder system: capacities align with pool tier boundaries
 * to maximize pool hit rates. Oversized payloads (perception) use dynamic sizing.
 */
export const WRAPTURE_BUILDER_CAPACITIES: {
  readonly scannerProgress: 256;
  readonly cacheEnvelope: 512;
  readonly baodownEvent: 512;
  readonly droneRealtime: 1024;
  readonly deviceEvent: 256;
  readonly hardwareStateEvent: 512;
  readonly telemetry: 2048;
  readonly pointCloud: 4096;
  readonly mesh: 8192;
  readonly controlPlaneEvent: 256;
} = {
  /** Scanner progress payloads (small). */
  scannerProgress: 256,
  /** Cache envelope payloads (small–medium). */
  cacheEnvelope: 512,
  /** BaoDown run event payloads (medium). */
  baodownEvent: 512,
  /** Drone realtime envelope (medium). */
  droneRealtime: 1024,
  /** Device/gimbal event payloads (small). */
  deviceEvent: 256,
  /** Hardware state event payloads (medium — 16 fields including strings). */
  hardwareStateEvent: 512,
  /** Typed telemetry payloads (larger). */
  telemetry: 2048,
  /** Point cloud payloads (Nx3 floats; baseline for ~1k points). */
  pointCloud: 4096,
  /** Mesh payloads (vertices + faces; baseline for moderate meshes). */
  mesh: 8192,
  /** Control-plane event payloads (small). */
  controlPlaneEvent: 256,
} as const;
