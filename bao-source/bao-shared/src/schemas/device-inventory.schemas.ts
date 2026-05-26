/**
 * Device inventory refresh schemas.
 *
 * Defines TypeBox schemas for device inventory refresh requests and responses.
 *
 * @shared/schemas/device-inventory
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";

// Device Inventory Refresh Requests

/**
 * Schema for device inventory refresh requests.
 */
export const DeviceInventoryRefreshRequestSchema: Type.TObject<
  {
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly persist: Type.TOptional<Type.TBoolean>;
    readonly updateName: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly persist: Type.TOptional<Type.TBoolean>;
    readonly updateName: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
    ),
    refresh: Type.Optional(Type.Boolean({ description: "Force bunbuddy cache refresh" })),
    persist: Type.Optional(Type.Boolean({ description: "Persist devices to the registry" })),
    updateName: Type.Optional(Type.Boolean({ description: "Update device names when persisting" })),
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
export const DeviceInventoryRefreshSourceSchema: Type.TUnion<
  [
    Type.TLiteral<"bunbuddy" | "cache" | "disabled">,
    ...Type.TLiteral<"bunbuddy" | "cache" | "disabled">[],
  ]
> = stringEnum(DEVICE_INVENTORY_REFRESH_SOURCES, {
  description: "Inventory refresh source",
});

/**
 * Schema for per-run device detection metrics.
 */
export const DeviceInventoryDetectionSummarySchema: Type.TObject<
  {
    readonly camerasTotal: Type.TNumber;
    readonly usbDevicesTotal: Type.TNumber;
    readonly serialDevicesTotal: Type.TNumber;
    readonly bleDevicesTotal: Type.TNumber;
    readonly lightingDevicesTotal: Type.TNumber;
    readonly printerDevicesTotal: Type.TNumber;
    readonly industrialDevicesTotal: Type.TNumber;
    readonly iotDevicesTotal: Type.TNumber;
    readonly audioDevicesTotal: Type.TNumber;
    readonly errorCount: Type.TNumber;
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
> = Type.Object(
  {
    camerasTotal: Type.Number({ minimum: 0 }),
    usbDevicesTotal: Type.Number({ minimum: 0 }),
    serialDevicesTotal: Type.Number({ minimum: 0 }),
    bleDevicesTotal: Type.Number({ minimum: 0 }),
    lightingDevicesTotal: Type.Number({ minimum: 0 }),
    printerDevicesTotal: Type.Number({ minimum: 0 }),
    industrialDevicesTotal: Type.Number({ minimum: 0 }),
    iotDevicesTotal: Type.Number({ minimum: 0 }),
    audioDevicesTotal: Type.Number({ minimum: 0 }),
    errorCount: Type.Number({ minimum: 0 }),
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
export const DeviceInventoryRefreshSummarySchema = Type.Object(
  {
    detectedCount: Type.Number({ minimum: 0 }),
    persistedCount: Type.Number({ minimum: 0 }),
    errorCount: Type.Number({ minimum: 0 }),
    durationMs: Type.Number({ minimum: 0 }),
    source: DeviceInventoryRefreshSourceSchema,
    detection: Type.Optional(DeviceInventoryDetectionSummarySchema),
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
export const DeviceInventoryRefreshResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    refreshed: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    summary: Type.Optional(DeviceInventoryRefreshSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for device inventory refresh responses.
 */
export type DeviceInventoryRefreshResponse = Static<typeof DeviceInventoryRefreshResponseSchema>;
