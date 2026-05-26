/**
 * Hardware configuration schemas.
 *
 * Defines the TypeBox schema for config/hardware-config.json used by
 * hardware-config.service.ts.
 *
 * @shared/schemas/hardware-config
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

const HardwareSerialSchema = Type.Object(
  {
    port: Type.Optional(Type.String()),
    baudRate: Type.Optional(Type.Number()),
  },
  { additionalProperties: true },
);

const HardwareNetworkCameraSchema = Type.Object(
  {
    ip: Type.Optional(Type.String()),
    port: Type.Optional(Type.Number()),
  },
  { additionalProperties: true },
);

const HardwareNetworkSchema = Type.Object(
  {
    camera: Type.Optional(HardwareNetworkCameraSchema),
  },
  { additionalProperties: true },
);

const HardwareCaptureSchema = Type.Object(
  {
    defaultResolution: Type.Optional(Type.String()),
    defaultQuality: Type.Optional(Type.Number()),
    defaultFPS: Type.Optional(Type.Number()),
    defaultFormat: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

const HardwareFirmwareSchema = Type.Object(
  {
    defaultVersion: Type.Optional(Type.String()),
    latestVersion: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

const HardwarePathsSchema = Type.Object(
  {
    captures: Type.Optional(Type.String()),
    settings: Type.Optional(Type.String()),
    firmware: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

const HardwareRtspSchema = Type.Object(
  {
    transport: Type.Optional(Type.String()),
    enabled: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: true },
);

const HardwareFirmwareUpdateSchema = Type.Object(
  {
    progressSteps: Type.Optional(Type.Array(Type.Number())),
    stepInterval: Type.Optional(Type.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionCacheRedisSchema = Type.Object(
  {
    enabled: Type.Optional(Type.Boolean()),
    url: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

const HardwareDetectionCacheSchema = Type.Object(
  {
    enabled: Type.Optional(Type.Boolean()),
    redis: Type.Optional(HardwareDetectionCacheRedisSchema),
    ttl: Type.Optional(Type.Record(Type.String(), Type.Number())),
  },
  { additionalProperties: true },
);

const HardwareDetectionEnrichmentSchema = Type.Object(
  {
    enabled: Type.Optional(Type.Boolean()),
    systeminformation: Type.Optional(Type.Boolean()),
    deviceDatabase: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: true },
);

const HardwareDetectionHotplugSchema = Type.Object(
  {
    enabled: Type.Optional(Type.Boolean()),
    debounce: Type.Optional(Type.Number()),
    serialPolling: Type.Optional(Type.Boolean()),
    serialInterval: Type.Optional(Type.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionHealthThresholdsSchema = Type.Object(
  {
    cpuTemp: Type.Optional(Type.Number()),
    memoryPercent: Type.Optional(Type.Number()),
    diskPercent: Type.Optional(Type.Number()),
    networkLatency: Type.Optional(Type.Number()),
    loadAverage: Type.Optional(Type.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionHealthSchema = Type.Object(
  {
    enabled: Type.Optional(Type.Boolean()),
    interval: Type.Optional(Type.Number()),
    thresholds: Type.Optional(HardwareDetectionHealthThresholdsSchema),
    maxHistorySize: Type.Optional(Type.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionErrorRecoverySchema = Type.Object(
  {
    maxRetries: Type.Optional(Type.Number()),
    backoffMs: Type.Optional(Type.Number()),
    fallbackToCache: Type.Optional(Type.Boolean()),
    circuitBreakerThreshold: Type.Optional(Type.Number()),
    circuitBreakerTimeout: Type.Optional(Type.Number()),
  },
  { additionalProperties: true },
);

const HardwareDetectionSchema = Type.Object(
  {
    cache: Type.Optional(HardwareDetectionCacheSchema),
    enrichment: Type.Optional(HardwareDetectionEnrichmentSchema),
    hotplug: Type.Optional(HardwareDetectionHotplugSchema),
    health: Type.Optional(HardwareDetectionHealthSchema),
    errorRecovery: Type.Optional(HardwareDetectionErrorRecoverySchema),
  },
  { additionalProperties: true },
);

/**
 * Hardware configuration schema (config/hardware-config.json).
 */
export const HardwareConfigSchema = Type.Object(
  {
    serial: Type.Optional(HardwareSerialSchema),
    network: Type.Optional(HardwareNetworkSchema),
    capture: Type.Optional(HardwareCaptureSchema),
    firmware: Type.Optional(HardwareFirmwareSchema),
    paths: Type.Optional(HardwarePathsSchema),
    rtsp: Type.Optional(HardwareRtspSchema),
    firmwareUpdate: Type.Optional(HardwareFirmwareUpdateSchema),
    detection: Type.Optional(HardwareDetectionSchema),
  },
  {
    description: "Hardware configuration (config/hardware-config.json)",
    additionalProperties: true,
  },
);

/** Inferred TypeScript type for the hardware configuration schema (config/hardware-config.json). */
export type HardwareConfig = Static<typeof HardwareConfigSchema>;
