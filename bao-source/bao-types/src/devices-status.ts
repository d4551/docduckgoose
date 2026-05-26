/**
 * Devices status aggregate API types.
 *
 * Defines the payload returned by `GET /api/v1/devices/status` using the
 * shared TypeBox schema for contract-first alignment.
 *
 * @shared/types/devices-status.ts
 */

import {
  DevicesStatusOkSchema,
  DevicesStatusResponseSchema,
} from "@baohaus/bao-schemas/devices-status.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";

/**
 * Union device status response.
 */
export type DevicesStatusResponse = Static<typeof DevicesStatusResponseSchema>;

/**
 * Successful device status response.
 */
export type DevicesStatusOkResponse = Static<typeof DevicesStatusOkSchema>;

/**
 * Runtime guard for {@link DevicesStatusResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link DevicesStatusResponse}.
 */
export function isDevicesStatusResponse(value: unknown): value is DevicesStatusResponse {
  return Check(DevicesStatusResponseSchema, value);
}

/**
 * Runtime guard for {@link DevicesStatusOkResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link DevicesStatusOkResponse}.
 */
export function isDevicesStatusOkResponse(value: unknown): value is DevicesStatusOkResponse {
  return Check(DevicesStatusOkSchema, value);
}
