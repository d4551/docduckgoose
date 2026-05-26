import type { Builder, Offset } from "@baohaus/flatbuf-bao/builder";
/**
 * Wrapture BaoDown protocol.
 *
 * Encode/decode BaoDown run events for Redis full-event pub/sub.
 * When WRAPTURE_BAODOWN_REDIS_FULL_EVENT=true, enables cross-replica SSE without DB poll.
 *
 * Performance: uses pooled builders, shared-string dedup, and zero-copy slice output.
 *
 * @shared/wrapture
 */

import {
  BaoDownPayloadUnion,
  unionToBaoDownPayloadUnion,
} from "@baohaus/bao-core/generated/flatbuffers/baohaus/baodown/v1/bao-down-payload-union";
import { BaoDownRunEventKindV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baodown/v1/bao-down-run-event-kind-v1";
import { BaoDownRunEventV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baodown/v1/bao-down-run-event-v1";
import { LogPayload } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baodown/v1/log-payload";
import { NodeOutputPayload } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baodown/v1/node-output-payload";
import { RunMetadataPayload } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baodown/v1/run-metadata-payload";
import { toResultSync } from "@baohaus/bao-utils/async-result";
import { isRecord } from "@baohaus/bao-utils/type-guards";

import { withPooledBuilder, withPooledByteBuffer } from "../builder-pool";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "../defaults";
import { recordDecode, recordDecodeError, recordEncode, startTiming } from "../metrics";

const BUILDER_CAPACITY = 512;

/** Typed payload inputs for encoding. */
export type BaoDownTypedPayloadInput =
  | { type: "LogPayload"; level: string; message: string }
  | { type: "NodeOutputPayload"; outputJson: string }
  | { type: "RunMetadataPayload"; code: string; message: string; detailsJson?: string };

/** Input for encoding a BaoDown run event. */
export interface BaoDownRunEventEncodeInput {
  runId: string;
  seq: number;
  kind: BaoDownRunEventKindV1;
  timestamp: string;
  nodeId?: string | null;
  /** Typed payload encoded into the FlatBuffers union field. */
  payloadTyped?: BaoDownTypedPayloadInput | null;
}

/** Decoded BaoDown run event. */
export interface BaoDownRunEventDecoded {
  runId: string;
  seq: number;
  kind: BaoDownRunEventKindV1;
  timestamp: string;
  nodeId: string | null;
  /** Canonical structured payload. */
  payload: unknown | null;
}

/**
 * Build typed payload table and return (payloadType, offset).
 */
function buildTypedPayload(
  builder: Builder,
  input: BaoDownTypedPayloadInput,
): [BaoDownPayloadUnion, Offset] {
  switch (input.type) {
    case "LogPayload": {
      const levelOffset = builder.createString(input.level);
      const messageOffset = builder.createString(input.message);
      const offset = LogPayload.createLogPayload(builder, levelOffset, messageOffset);
      return [BaoDownPayloadUnion.LogPayload, offset];
    }
    case "NodeOutputPayload": {
      const outputJsonOffset = builder.createString(input.outputJson);
      const offset = NodeOutputPayload.createNodeOutputPayload(builder, outputJsonOffset);
      return [BaoDownPayloadUnion.NodeOutputPayload, offset];
    }
    case "RunMetadataPayload": {
      const codeOffset = builder.createString(input.code);
      const messageOffset = builder.createString(input.message);
      const detailsJsonOffset = builder.createString(input.detailsJson ?? "");
      const offset = RunMetadataPayload.createRunMetadataPayload(
        builder,
        codeOffset,
        messageOffset,
        detailsJsonOffset,
      );
      return [BaoDownPayloadUnion.RunMetadataPayload, offset];
    }
  }
}

/**
 * Encode a BaoDown run event to FlatBuffers bytes.
 *
 * Uses pooled builder with shared-string dedup for recurring run IDs.
 *
 * @param input - Event fields.
 * @returns Encoded bytes.
 */
export function encodeBaoDownRunEvent(input: BaoDownRunEventEncodeInput): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(BUILDER_CAPACITY, (builder) => {
    const runIdOffset = builder.createSharedString(input.runId);
    const timestampOffset = builder.createString(input.timestamp);
    const nodeIdOffset = builder.createString(input.nodeId ?? "");

    let payloadType = BaoDownPayloadUnion.NONE;
    let payloadOffset: Offset = 0;
    if (input.payloadTyped) {
      [payloadType, payloadOffset] = buildTypedPayload(builder, input.payloadTyped);
    }

    const root = BaoDownRunEventV1.createBaoDownRunEventV1(
      builder,
      runIdOffset,
      input.seq,
      input.kind,
      timestampOffset,
      nodeIdOffset,
      payloadType,
      payloadOffset,
    );

    BaoDownRunEventV1.finishBaoDownRunEventV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("baodown", result.byteLength, t);
  return result;
}

/**
 * Convert a JSON string field to a structured payload value when possible.
 *
 * @param value - JSON string input.
 * @returns Parsed payload or raw string when not valid JSON.
 */
function parseStructuredPayload(value: string | null): unknown | null {
  if (typeof value !== "string") {
    return null;
  }
  const result = toResultSync(() => JSON.parse(value));
  return result.ok ? result.value : value;
}

/**
 * Convert decoded typed payload to a structured payload object.
 *
 * @param payloadType - FlatBuffers union discriminator.
 * @param root - FlatBuffers root table.
 * @returns Structured payload object.
 */
function typedPayloadToObject(
  payloadType: BaoDownPayloadUnion,
  root: BaoDownRunEventV1,
): unknown | null {
  const p = unionToBaoDownPayloadUnion(payloadType, (obj) => root.payload(obj as never) as never);
  if (!p) {
    return null;
  }
  if (p instanceof LogPayload) {
    return { level: p.level(), message: p.message() };
  }
  if (p instanceof NodeOutputPayload) {
    return parseStructuredPayload(p.outputJson() ?? null);
  }
  if (p instanceof RunMetadataPayload) {
    const details = parseStructuredPayload(p.detailsJson() ?? null);
    return {
      code: p.code(),
      message: p.message(),
      ...(details === null ? {} : { details }),
    };
  }
  return null;
}

/**
 * Decode a BaoDown run event from FlatBuffers bytes.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded event or null when invalid.
 */
export function decodeBaoDownRunEvent(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): BaoDownRunEventDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("baodown");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    if (!BaoDownRunEventV1.bufferHasIdentifier(bb)) {
      return null;
    }

    const root = BaoDownRunEventV1.getRootAsBaoDownRunEventV1(bb);
    const pt = root.payloadType();
    const payload = pt === BaoDownPayloadUnion.NONE ? null : typedPayloadToObject(pt, root);
    return {
      runId: root.runId() ?? "",
      seq: root.seq(),
      kind: root.kind(),
      timestamp: root.timestamp() ?? "",
      nodeId: root.nodeId() ?? null,
      payload,
    } satisfies BaoDownRunEventDecoded;
  });

  if (!result) {
    recordDecodeError("baodown");
    return null;
  }
  recordDecode("baodown", uint8.byteLength, t);
  return result;
}

/**
 * Convert a raw payload object to typed input for FlatBuffers encoding.
 *
 * Maps event kinds to the appropriate typed payload table. All event kinds
 * are handled — NODE_FAILED uses RunMetadataPayload for error context;
 * remaining kinds use NodeOutputPayload as a generic JSON envelope.
 *
 * @param payload - Raw payload from BaoDownRunEvent.
 * @param kind - Event kind for shape hint.
 * @returns Typed input for encoding.
 */
function toPayloadRecord(payload: unknown): Record<string, unknown> | null {
  return isRecord(payload) ? { ...payload } : null;
}

function toLogPayloadInput(payload: Record<string, unknown>): BaoDownTypedPayloadInput {
  const level = typeof payload.level === "string" ? payload.level : "info";
  const message = typeof payload.message === "string" ? payload.message : JSON.stringify(payload);
  return { type: "LogPayload", level, message };
}

function toNodeOutputPayloadInput(payload: Record<string, unknown>): BaoDownTypedPayloadInput {
  return { type: "NodeOutputPayload", outputJson: JSON.stringify(payload) };
}

function toRunMetadataPayloadInput(payload: Record<string, unknown>): BaoDownTypedPayloadInput {
  const code = typeof payload.code === "string" ? payload.code : "UNKNOWN";
  const message = typeof payload.message === "string" ? payload.message : JSON.stringify(payload);
  const detailsJson = payload.details == null ? "" : JSON.stringify(payload.details);
  return { type: "RunMetadataPayload", code, message, detailsJson };
}

/**
 * Normalize a raw BaoDown payload into the typed FlatBuffers union input.
 *
 * @param payload - Raw payload object from a BaoDown event.
 * @param kind - Event kind used to pick the union member.
 * @returns Typed FlatBuffers payload input or null when payload is not object-like.
 */
export function payloadToTypedInput(
  payload: unknown,
  kind: BaoDownRunEventKindV1,
): BaoDownTypedPayloadInput | null {
  const record = toPayloadRecord(payload);
  if (!record) {
    return null;
  }

  switch (kind) {
    case BaoDownRunEventKindV1.NODE_LOG:
      return toLogPayloadInput(record);
    case BaoDownRunEventKindV1.RUN_FAILED:
    case BaoDownRunEventKindV1.RUN_CANCELLED:
    case BaoDownRunEventKindV1.NODE_FAILED:
      return toRunMetadataPayloadInput(record);
    default:
      // RUN_STARTED, NODE_STARTED, NODE_COMPLETED, RUN_COMPLETED:
      // generic JSON envelope via NodeOutputPayload.
      return toNodeOutputPayloadInput(record);
  }
}

/**
 * Re-export block named-re-exports.
 */
export { BaoDownRunEventKindV1 };
