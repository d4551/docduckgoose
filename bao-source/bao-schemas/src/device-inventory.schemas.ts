/**
 * Device inventory refresh schemas.
 *
 * Defines TypeBox schemas for device inventory refresh requests and responses.
 *
 * @shared/schemas/device-inventory
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";

// Device Inventory Refresh Requests

/**
 * Schema for device inventory refresh requests.
 */
export const DeviceInventoryRefreshRequestSchema: TObject<
  {
    readonly idempotencyKey: TOptional<TString>;
    readonly refresh: TOptional<TBoolean>;
    readonly persist: TOptional<TBoolean>;
    readonly updateName: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly idempotencyKey: TOptional<TString>;
    readonly refresh: TOptional<TBoolean>;
    readonly persist: TOptional<TBoolean>;
    readonly updateName: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
    ),
    refresh: TypeExports.Optional(
      TypeExports.Boolean({ description: "Force bunbuddy cache refresh" }),
    ),
    persist: TypeExports.Optional(
      TypeExports.Boolean({ description: "Persist devices to the registry" }),
    ),
    updateName: TypeExports.Optional(
      TypeExports.Boolean({ description: "Update device names when persisting" }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for device inventory refresh requests.
 */
export type DeviceInventoryRefreshRequest = Static<typeof DeviceInventoryRefreshRequestSchema>;

// Device Inventory Refresh Responses

/**
 * Supported inventory refresh sources.
 */
export const DEVICE_INVENTORY_REFRESH_SOURCES: readonly ["bunbuddy", "cache", "disabled"] = [
  "bunbuddy",
  "cache",
  "disabled",
] as const;

/**
 * Type-safe inventory refresh source union.
 */
export type DeviceInventoryRefreshSource = (typeof DEVICE_INVENTORY_REFRESH_SOURCES)[number];

/**
 * Device inventory refresh source schema.
 */
export const DeviceInventoryRefreshSourceSchema: TUnion<
  [TLiteral<"bunbuddy" | "cache" | "disabled">, ...TLiteral<"bunbuddy" | "cache" | "disabled">[]]
> = stringEnum(DEVICE_INVENTORY_REFRESH_SOURCES, {
  description: "Inventory refresh source",
});

/**
 * Schema for per-run device detection metrics.
 */
export const DeviceInventoryDetectionSummarySchema: TObject<
  {
    readonly camerasTotal: TNumber;
    readonly usbDevicesTotal: TNumber;
    readonly serialDevicesTotal: TNumber;
    readonly bleDevicesTotal: TNumber;
    readonly lightingDevicesTotal: TNumber;
    readonly printerDevicesTotal: TNumber;
    readonly industrialDevicesTotal: TNumber;
    readonly iotDevicesTotal: TNumber;
    readonly audioDevicesTotal: TNumber;
    readonly errorCount: TNumber;
  },
  | "camerasTotal"
  | "usbDevicesTotal"
  | "serialDevicesTotal"
  | "bleDevicesTotal"
  | "lightingDevicesTotal"
  | "printerDevicesTotal"
  | "industrialDevicesTotal"
  | "iotDevicesTotal"
  | "audioDevicesTotal"
  | "errorCount",
  never
> = TypeExports.Object(
  {
    camerasTotal: TypeExports.Number({ minimum: 0 }),
    usbDevicesTotal: TypeExports.Number({ minimum: 0 }),
    serialDevicesTotal: TypeExports.Number({ minimum: 0 }),
    bleDevicesTotal: TypeExports.Number({ minimum: 0 }),
    lightingDevicesTotal: TypeExports.Number({ minimum: 0 }),
    printerDevicesTotal: TypeExports.Number({ minimum: 0 }),
    industrialDevicesTotal: TypeExports.Number({ minimum: 0 }),
    iotDevicesTotal: TypeExports.Number({ minimum: 0 }),
    audioDevicesTotal: TypeExports.Number({ minimum: 0 }),
    errorCount: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for device detection summaries.
 */
export type DeviceInventoryDetectionSummary = Static<typeof DeviceInventoryDetectionSummarySchema>;

/**
 * Schema for device inventory refresh summary payloads.
 */
export const DeviceInventoryRefreshSummarySchema = TypeExports.Object(
  {
    detectedCount: TypeExports.Number({ minimum: 0 }),
    persistedCount: TypeExports.Number({ minimum: 0 }),
    errorCount: TypeExports.Number({ minimum: 0 }),
    durationMs: TypeExports.Number({ minimum: 0 }),
    source: DeviceInventoryRefreshSourceSchema,
    detection: TypeExports.Optional(DeviceInventoryDetectionSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for device inventory refresh summary payloads.
 */
export type DeviceInventoryRefreshSummary = Static<typeof DeviceInventoryRefreshSummarySchema>;

/**
 * Schema for device inventory refresh responses.
 */
export const DeviceInventoryRefreshResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    refreshed: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    summary: TypeExports.Optional(DeviceInventoryRefreshSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for device inventory refresh responses.
 */
export type DeviceInventoryRefreshResponse = Static<typeof DeviceInventoryRefreshResponseSchema>;
