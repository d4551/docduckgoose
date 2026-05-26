/**
 * Hardware configuration schemas.
 *
 * Defines the TypeBox schema for config/hardware-config.json used by
 * hardware-config.service.ts.
 *
 * @shared/schemas/hardware-config
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

const HardwareSerialSchema = TypeExports.Object(
  {
    port: TypeExports.Optional(TypeExports.String()),
    baudRate: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: true },
);

const HardwareNetworkCameraSchema = TypeExports.Object(
  {
    ip: TypeExports.Optional(TypeExports.String()),
    port: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: true },
);

const HardwareNetworkSchema = TypeExports.Object(
  {
    camera: TypeExports.Optional(HardwareNetworkCameraSchema),
  },
  { additionalProperties: true },
);

const HardwareCaptureSchema = TypeExports.Object(
  {
    defaultResolution: TypeExports.Optional(TypeExports.String()),
    defaultQuality: TypeExports.Optional(TypeExports.Number()),
    defaultFPS: TypeExports.Optional(TypeExports.Number()),
    defaultFormat: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

const HardwareFirmwareSchema = TypeExports.Object(
  {
    defaultVersion: TypeExports.Optional(TypeExports.String()),
    latestVersion: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

const HardwarePathsSchema = TypeExports.Object(
  {
    captures: TypeExports.Optional(TypeExports.String()),
    settings: TypeExports.Optional(TypeExports.String()),
    firmware: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

const HardwareRtspSchema = TypeExports.Object(
  {
    transport: TypeExports.Optional(TypeExports.String()),
    enabled: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: true },
);

const HardwareFirmwareUpdateSchema = TypeExports.Object(
  {
    progressSteps: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    stepInterval: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionCacheRedisSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(TypeExports.Boolean()),
    url: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

const HardwareDetectionCacheSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(TypeExports.Boolean()),
    redis: TypeExports.Optional(HardwareDetectionCacheRedisSchema),
    ttl: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Number())),
  },
  { additionalProperties: true },
);

const HardwareDetectionEnrichmentSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(TypeExports.Boolean()),
    systeminformation: TypeExports.Optional(TypeExports.Boolean()),
    deviceDatabase: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: true },
);

const HardwareDetectionHotplugSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(TypeExports.Boolean()),
    debounce: TypeExports.Optional(TypeExports.Number()),
    serialPolling: TypeExports.Optional(TypeExports.Boolean()),
    serialInterval: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionHealthThresholdsSchema = TypeExports.Object(
  {
    cpuTemp: TypeExports.Optional(TypeExports.Number()),
    memoryPercent: TypeExports.Optional(TypeExports.Number()),
    diskPercent: TypeExports.Optional(TypeExports.Number()),
    networkLatency: TypeExports.Optional(TypeExports.Number()),
    loadAverage: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionHealthSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(TypeExports.Boolean()),
    interval: TypeExports.Optional(TypeExports.Number()),
    thresholds: TypeExports.Optional(HardwareDetectionHealthThresholdsSchema),
    maxHistorySize: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionErrorRecoverySchema = TypeExports.Object(
  {
    maxRetries: TypeExports.Optional(TypeExports.Number()),
    backoffMs: TypeExports.Optional(TypeExports.Number()),
    fallbackToCache: TypeExports.Optional(TypeExports.Boolean()),
    circuitBreakerThreshold: TypeExports.Optional(TypeExports.Number()),
    circuitBreakerTimeout: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionSchema = TypeExports.Object(
  {
    cache: TypeExports.Optional(HardwareDetectionCacheSchema),
    enrichment: TypeExports.Optional(HardwareDetectionEnrichmentSchema),
    hotplug: TypeExports.Optional(HardwareDetectionHotplugSchema),
    health: TypeExports.Optional(HardwareDetectionHealthSchema),
    errorRecovery: TypeExports.Optional(HardwareDetectionErrorRecoverySchema),
  },
  { additionalProperties: true },
);

/**
 * Hardware configuration schema (config/hardware-config.json).
 */
export const HardwareConfigSchema = TypeExports.Object(
  {
    serial: TypeExports.Optional(HardwareSerialSchema),
    network: TypeExports.Optional(HardwareNetworkSchema),
    capture: TypeExports.Optional(HardwareCaptureSchema),
    firmware: TypeExports.Optional(HardwareFirmwareSchema),
    paths: TypeExports.Optional(HardwarePathsSchema),
    rtsp: TypeExports.Optional(HardwareRtspSchema),
    firmwareUpdate: TypeExports.Optional(HardwareFirmwareUpdateSchema),
    detection: TypeExports.Optional(HardwareDetectionSchema),
  },
  {
    description: "Hardware configuration (config/hardware-config.json)",
    additionalProperties: true,
  },
);

/** Inferred TypeScript type for the hardware configuration schema (config/hardware-config.json). */
export type HardwareConfig = Static<typeof HardwareConfigSchema>;
