/**
 * Devices list response schemas.
 *
 * Shared TypeBox schemas for the devices list API response. Keeps a stable
 * contract for SSR data hydration and Eden client validation.
 *
 * @shared/schemas/devices-list.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Minimal device summary schema for list responses.
 *
 * Allows additional properties to preserve compatibility with evolving Prisma models.
 */
export const DeviceListDeviceSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly name: Type.TOptional<Type.TString>;
    readonly deviceType: Type.TOptional<Type.TString>;
    readonly status: Type.TOptional<Type.TString>;
    readonly serialNumber: Type.TOptional<Type.TString>;
    readonly lastSeen: Type.TOptional<Type.TString>;
  },
  "id",
  Type.InferOptionalKeys<{
    readonly id: Type.TString;
    readonly name: Type.TOptional<Type.TString>;
    readonly deviceType: Type.TOptional<Type.TString>;
    readonly status: Type.TOptional<Type.TString>;
    readonly serialNumber: Type.TOptional<Type.TString>;
    readonly lastSeen: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    id: Type.String(),
    name: Type.Optional(Type.String()),
    deviceType: Type.Optional(Type.String()),
    status: Type.Optional(Type.String()),
    serialNumber: Type.Optional(Type.String()),
    lastSeen: Type.Optional(Type.String()),
  },
  { additionalProperties: JsonValueSchema },
);

/**
 * Response schema for `GET /api/v1/devices`.
 */
export const DevicesListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(DeviceListDeviceSchema),
    pagination: Type.Object({
      page: Type.Number(),
      limit: Type.Number(),
      total: Type.Number(),
      pages: Type.Number(),
    }),
    assignments: Type.Array(JsonValueSchema),
    imagers: Type.Array(DeviceListDeviceSchema),
    lights: Type.Array(DeviceListDeviceSchema),
    footpedals: Type.Array(DeviceListDeviceSchema),
    audio: Type.Array(DeviceListDeviceSchema),
    metadata: Type.Record(Type.String(), JsonValueSchema),
    timestamp: Type.String(),
  },
  { additionalProperties: JsonValueSchema },
);

/**
 * TypeScript type for list devices.
 */
export type DeviceListDevice = Static<typeof DeviceListDeviceSchema>;

/**
 * TypeScript type for the devices list response.
 */
export type DevicesListResponse = Static<typeof DevicesListResponseSchema>;
