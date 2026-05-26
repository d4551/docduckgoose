/**
 * Drone realtime websocket envelope helpers.
 *
 * @shared/protocols/realtime-flatbuffers/drone-envelope
 */

import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "@baohaus/bao-wrapture/defaults";
import { RealtimePayloadKindV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";
import { decodeRealtimeWsEnvelopeBinary } from "./envelope";
import {
  isVehicleTelemetryShape,
  telemetryToPlainObject,
  vehicleTelemetryToEncodeInput,
} from "./internals";
import { decodeTelemetryPayloadBinary, encodeTelemetryWsEnvelopeBinary } from "./telemetry";
import type { DroneRealtimeWsEnvelopeBinary } from "./types";

/**
 * Encode a full drone websocket envelope for internal binary transport.
 *
 * The binary realtime channel is telemetry-only. Device/event fanout stays on
 * the JSON websocket topic until a closed typed event schema exists for those
 * payloads.
 *
 * @param payload - Drone envelope payload.
 * @returns Encoded bytes or null when serialization fails.
 */
export function encodeDroneRealtimeWsEnvelopeBinary(
  payload: Omit<DroneRealtimeWsEnvelopeBinary, "data"> & { data: unknown },
): Uint8Array | null {
  if (payload.channel !== "telemetry" || payload.event !== "telemetry") {
    return null;
  }
  if (!isVehicleTelemetryShape(payload.data)) {
    return null;
  }
  const telemetryInput = vehicleTelemetryToEncodeInput(payload.data);
  return encodeTelemetryWsEnvelopeBinary(telemetryInput);
}

/**
 * Decode a full drone websocket envelope from internal binary transport.
 *
 * Only TELEMETRY_TYPED envelopes are supported.
 *
 * @param bytes - Envelope bytes.
 * @returns Decoded payload or null when invalid.
 */
export function decodeDroneRealtimeWsEnvelopeBinary(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): DroneRealtimeWsEnvelopeBinary | null {
  const envelope = decodeRealtimeWsEnvelopeBinary(bytes, maxBytes);
  if (!envelope) {
    return null;
  }

  if (envelope.kind === RealtimePayloadKindV1.TELEMETRY_TYPED) {
    const telemetry = decodeTelemetryPayloadBinary(envelope.payload, maxBytes);
    if (!telemetry) {
      return null;
    }
    return {
      channel: "telemetry",
      event: "telemetry",
      data: telemetryToPlainObject(telemetry),
      timestamp: telemetry.timestamp,
      baseUrl: null,
    };
  }

  return null;
}
