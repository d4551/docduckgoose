/**
 * Gimbal event encode helpers.
 *
 * @shared/protocols/realtime-flatbuffers/gimbal-event
 */

import { withPooledBuilder } from "@baohaus/bao-wrapture/builder-pool";
import { recordEncode, startTiming } from "@baohaus/bao-wrapture/metrics";
import { GimbalEventV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/gimbal-event-v1.js";
import { FB_BUILDER_SMALL } from "./internals";

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
