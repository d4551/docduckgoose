/**
 * Device event encode helpers.
 *
 * @shared/protocols/realtime-flatbuffers/device-event
 */

import { withPooledBuilder } from "@baohaus/bao-wrapture/builder-pool";
import { recordEncode, startTiming } from "@baohaus/bao-wrapture/metrics";
import { DeviceEventV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/device-event-v1.js";
import { FB_BUILDER_SMALL } from "./internals";

/** Input for encoding a device event. */
export interface DeviceEventEncodeInput {
  deviceId: string;
  type: string;
  status: number;
  value: number;
  timestamp: string;
}

/**
 * Encode a device event to FlatBuffers bytes.
 *
 * @param input - Device event fields.
 * @returns Encoded bytes.
 */
export function encodeDeviceEventBinary(input: DeviceEventEncodeInput): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(FB_BUILDER_SMALL, (builder) => {
    const deviceIdOffset = builder.createSharedString(input.deviceId);
    const typeOffset = builder.createSharedString(input.type);
    const timestampOffset = builder.createString(input.timestamp);
    DeviceEventV1.startDeviceEventV1(builder);
    DeviceEventV1.addDeviceId(builder, deviceIdOffset);
    DeviceEventV1.addType(builder, typeOffset);
    DeviceEventV1.addStatus(builder, input.status);
    DeviceEventV1.addValue(builder, input.value);
    DeviceEventV1.addTimestamp(builder, timestampOffset);
    const root = DeviceEventV1.endDeviceEventV1(builder);
    DeviceEventV1.finishDeviceEventV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("realtime.device", result.byteLength, t);
  return result;
}
