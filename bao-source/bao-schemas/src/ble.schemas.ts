/**
 * Shared BLE schemas.
 *
 * Provides canonical payload shapes for BLE (Bluetooth Low Energy) operations shared between
 * the server and the BLE bunbuddy.
 *
 * @shared/schemas/ble.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * BLE connect/disconnect response payload.
 *
 * @remarks
 * Returned by:
 * - BLE bunbuddy: `POST /devices/:deviceId/connect`
 * - BLE bunbuddy: `POST /devices/:deviceId/disconnect`
 * - Server API: `POST /api/v1/bluetooth/devices/:deviceId/connect|disconnect`
 */
export const BleConnectionResultSchema: TObject<
  {
    readonly ok: TBoolean;
    readonly id: TString;
    readonly state: TString;
    readonly error: TOptional<TString>;
    readonly timestamp: TOptional<TString>;
  },
  "id" | "ok" | "state",
  InferOptionalKeys<{
    readonly ok: TBoolean;
    readonly id: TString;
    readonly state: TString;
    readonly error: TOptional<TString>;
    readonly timestamp: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    id: TypeExports.String({ minLength: 1 }),
    state: TypeExports.String({ minLength: 1 }),
    error: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    timestamp: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for BLE connect/disconnect responses.
 */
export type BleConnectionResult = Static<typeof BleConnectionResultSchema>;
