/**
 * Device and gimbal event binary encoders.
 *
 * @internal
 */

import { withPooledBuilder } from "@baohaus/bao-wrapture/builder-pool";
import { recordEncode, startTiming } from "@baohaus/bao-wrapture/metrics";
import { DeviceEventV1 } from "../generated/flatbuffers/baohaus/realtime/v1/device-event-v1.js";
import { GimbalEventV1 } from "../generated/flatbuffers/baohaus/realtime/v1/gimbal-event-v1.js";

const FB_BUILDER_SMALL = 256;

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

/** Input for encoding a gimbal event. */
export interface GimbalEventEncodeInput {
  pitch: number;
  yaw: number;
  roll: number;
  mode: number;
  timestamp: string;
}

/**
 * Encode a gimbal event to FlatBuffers bytes.
 *
 * @param input - Gimbal event fields.
 * @returns Encoded bytes.
 */
export function encodeGimbalEventBinary(input: GimbalEventEncodeInput): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(FB_BUILDER_SMALL, (builder) => {
    const timestampOffset = builder.createString(input.timestamp);
    GimbalEventV1.startGimbalEventV1(builder);
    GimbalEventV1.addPitch(builder, input.pitch);
    GimbalEventV1.addYaw(builder, input.yaw);
    GimbalEventV1.addRoll(builder, input.roll);
    GimbalEventV1.addMode(builder, input.mode);
    GimbalEventV1.addTimestamp(builder, timestampOffset);
    const root = GimbalEventV1.endGimbalEventV1(builder);
    GimbalEventV1.finishGimbalEventV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("realtime.gimbal", result.byteLength, t);
  return result;
}
