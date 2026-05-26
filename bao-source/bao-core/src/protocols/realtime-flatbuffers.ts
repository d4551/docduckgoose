/**
 * Internal FlatBuffers protocol helpers for realtime transport.
 *
 * This module is intentionally internal-facing for high-frequency bunbuddy ↔ server
 * channels. Browser-facing HTMX and public API contracts remain JSON/HTML.
 *
 * @shared/protocols/realtime-flatbuffers
 */

export {
  type DeviceEventEncodeInput,
  encodeDeviceEventBinary,
  encodeGimbalEventBinary,
  type GimbalEventEncodeInput,
} from "./realtime-flatbuffers-device-gimbal.internal";
export {
  type DecodedRealtimeWsEnvelopeBinary,
  decodeRealtimeWsEnvelopeBinary,
  decodeRealtimeWsEnvelopeBinarySizePrefixed,
  encodeRealtimeWsEnvelopeBinary,
} from "./realtime-flatbuffers-envelope-core.internal";
export {
  decodeHardwareStateEventBinary,
  encodeHardwareStateEventBinary,
  HardwareEventKindV1,
  type HardwareStateEventRealtimeDecoded,
  type HardwareStateEventRealtimeInput,
} from "./realtime-flatbuffers-hardware.internal";
export {
  isBinaryMessagePayload,
  parseWebSocketSubprotocolHeader,
  REALTIME_FLATBUFFERS_PROTOCOL_VERSION,
  REALTIME_FLATBUFFERS_TOPIC_SUFFIX,
  REALTIME_FLATBUFFERS_WS_SUBPROTOCOL,
  type RealtimeBinaryChannel,
  resolveFlatBuffersTopic,
  wantsRealtimeFlatBuffersSubprotocol,
} from "./realtime-flatbuffers-protocol-surface.internal";
export {
  decodeScannerProgressPayloadBinary,
  decodeScannerProgressWsEnvelopeBinary,
  encodeScannerProgressPayloadBinary,
  encodeScannerProgressWsEnvelopeBinary,
  type ScannerProgressBinaryPayload,
} from "./realtime-flatbuffers-scanner.internal";
export {
  type DroneRealtimeWsEnvelopeBinary,
  decodeDroneRealtimeWsEnvelopeBinary,
  decodeTelemetryPayloadBinary,
  decodeTelemetryWsEnvelopeBinary,
  encodeDroneRealtimeWsEnvelopeBinary,
  encodeTelemetryPayloadBinary,
  encodeTelemetryWsEnvelopeBinary,
  type TelemetryAttitude,
  type TelemetryBatteryStatus,
  type TelemetryPayloadDecoded,
  type TelemetryPayloadEncodeInput,
  type TelemetryPosition3D,
  type TelemetryVelocity3D,
} from "./realtime-flatbuffers-telemetry.internal";
