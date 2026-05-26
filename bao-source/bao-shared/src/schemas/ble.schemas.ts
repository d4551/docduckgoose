/**
 * Shared BLE schemas.
 *
 * Provides canonical payload shapes for BLE (Bluetooth Low Energy) operations shared between
 * the server and the BLE bunbuddy.
 *
 * @shared/schemas/ble.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * BLE connect/disconnect response payload.
 *
 * @remarks
 * Returned by:
 * - BLE bunbuddy: `POST /devices/:deviceId/connect`
 * - BLE bunbuddy: `POST /devices/:deviceId/disconnect`
 * - Server API: `POST /api/v1/bluetooth/devices/:deviceId/connect|disconnect`
 */
export const BleConnectionResultSchema: Type.TObject<
  {
    readonly ok: Type.TBoolean;
    readonly id: Type.TString;
    readonly state: Type.TString;
    readonly error: Type.TOptional<Type.TString>;
    readonly timestamp: Type.TOptional<Type.TString>;
  },
  "id" | "ok" | "state",
  Type.InferOptionalKeys<{
    readonly ok: Type.TBoolean;
    readonly id: Type.TString;
    readonly state: Type.TString;
    readonly error: Type.TOptional<Type.TString>;
    readonly timestamp: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    ok: Type.Boolean(),
    id: Type.String({ minLength: 1 }),
    state: Type.String({ minLength: 1 }),
    error: Type.Optional(Type.String({ minLength: 1 })),
    timestamp: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for BLE connect/disconnect responses.
 */
export type BleConnectionResult = Static<typeof BleConnectionResultSchema>;
