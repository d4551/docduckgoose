/**
 * Devices list response schemas.
 *
 * Shared TypeBox schemas for the devices list API response. Keeps a stable
 * contract for SSR data hydration and Eden client validation.
 *
 * @shared/schemas/devices-list.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Minimal device summary schema for list responses.
 *
 * Allows additional properties to preserve compatibility with evolving Prisma models.
 */
export const DeviceListDeviceSchema: TObject<
  {
    readonly id: TString;
    readonly name: TOptional<TString>;
    readonly deviceType: TOptional<TString>;
    readonly status: TOptional<TString>;
    readonly serialNumber: TOptional<TString>;
    readonly lastSeen: TOptional<TString>;
  },
  "id",
  InferOptionalKeys<{
    readonly id: TString;
    readonly name: TOptional<TString>;
    readonly deviceType: TOptional<TString>;
    readonly status: TOptional<TString>;
    readonly serialNumber: TOptional<TString>;
    readonly lastSeen: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    id: TypeExports.String(),
    name: TypeExports.Optional(TypeExports.String()),
    deviceType: TypeExports.Optional(TypeExports.String()),
    status: TypeExports.Optional(TypeExports.String()),
    serialNumber: TypeExports.Optional(TypeExports.String()),
    lastSeen: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: JsonValueSchema },
);

/**
 * Response schema for `GET /api/v1/devices`.
 */
export const DevicesListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(DeviceListDeviceSchema),
    pagination: TypeExports.Object({
      page: TypeExports.Number(),
      limit: TypeExports.Number(),
      total: TypeExports.Number(),
      pages: TypeExports.Number(),
    }),
    assignments: TypeExports.Array(JsonValueSchema),
    imagers: TypeExports.Array(DeviceListDeviceSchema),
    lights: TypeExports.Array(DeviceListDeviceSchema),
    footpedals: TypeExports.Array(DeviceListDeviceSchema),
    audio: TypeExports.Array(DeviceListDeviceSchema),
    metadata: TypeExports.Record(TypeExports.String(), JsonValueSchema),
    timestamp: TypeExports.String(),
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
