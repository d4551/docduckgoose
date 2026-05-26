import type { Builder } from "@baohaus/flatbuf-bao/builder";
/**
 * Wrapture observability batch protocol.
 *
 * Encode/decode observability span batches for binary transport.
 * Uses native FlatBuffers ObservabilityBatchV1 via generated bindings.
 *
 * @packageDocumentation
 */

import { ObservabilityBatchV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/observability/v1/observability-batch-v1";
import { SpanV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/observability/v1/span-v1";

import { withPooledBuilder, withPooledByteBuffer } from "../builder-pool";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "../defaults";
import { recordDecode, recordDecodeError, recordEncode, startTiming } from "../metrics";

const BUILDER_CAPACITY = 1024;

/** OTLP-aligned span kind enumeration. */
export const SpanKind = {
  INTERNAL: 0,
  SERVER: 1,
  CLIENT: 2,
  PRODUCER: 3,
  CONSUMER: 4,
} as const;
export type SpanKind = (typeof SpanKind)[keyof typeof SpanKind];

/** OTLP-aligned status code enumeration. */
export const SpanStatusCode = {
  UNSET: 0,
  OK: 1,
  ERROR: 2,
} as const;
export type SpanStatusCode = (typeof SpanStatusCode)[keyof typeof SpanStatusCode];

/** Input for a single span in a batch. */
export interface SpanEncodeInput {
  /** 32-hex-char trace identifier. */
  traceId: string;
  /** 16-hex-char span identifier. */
  spanId: string;
  /** Parent span identifier (empty string for root spans). */
  parentSpanId?: string;
  /** Span operation name. */
  name: string;
  /** Span kind. */
  kind: SpanKind;
  /** Start time in Unix nanoseconds. */
  startTimeUnixNano: bigint;
  /** End time in Unix nanoseconds. */
  endTimeUnixNano: bigint;
  /** Status code. */
  statusCode: SpanStatusCode;
  /** Status message (populated on error). */
  statusMessage?: string;
  /** JSON-encoded span attributes. */
  attributesJson?: string;
}

/** Input for encoding an observability batch. */
export interface ObservabilityBatchEncodeInput {
  /** Reporting service name. */
  serviceName: string;
  /** Unique batch identifier. */
  batchId: string;
  /** ISO 8601 batch timestamp. */
  timestamp: string;
  /** Spans in this batch. */
  spans: SpanEncodeInput[];
  /** Count of spans dropped before batching. */
  droppedCount?: number;
}

/** Decoded span from a batch. */
export interface SpanDecoded {
  traceId: string | null;
  spanId: string | null;
  parentSpanId: string | null;
  name: string | null;
  kind: number;
  startTimeUnixNano: bigint;
  endTimeUnixNano: bigint;
  statusCode: number;
  statusMessage: string | null;
  attributesJson: string | null;
}

/** Decoded observability batch. */
export interface ObservabilityBatchDecoded {
  serviceName: string | null;
  batchId: string | null;
  timestamp: string | null;
  spans: SpanDecoded[];
  droppedCount: number;
}

/**
 * Encode an observability span batch to FlatBuffers bytes.
 *
 * @param input - Batch fields.
 * @returns Encoded bytes.
 */
/** Encode a single span into the FlatBuffers builder, returning its offset. */
function encodeSpan(builder: Builder, span: SpanEncodeInput): number {
  const traceIdOff = builder.createString(span.traceId);
  const spanIdOff = builder.createString(span.spanId);
  const parentOff = span.parentSpanId ? builder.createString(span.parentSpanId) : 0;
  const nameOff = builder.createString(span.name);
  const statusMsgOff = span.statusMessage ? builder.createString(span.statusMessage) : 0;
  const attrsOff = span.attributesJson ? builder.createString(span.attributesJson) : 0;

  SpanV1.startSpanV1(builder);
  SpanV1.addTraceId(builder, traceIdOff);
  SpanV1.addSpanId(builder, spanIdOff);
  if (parentOff) {
    SpanV1.addParentSpanId(builder, parentOff);
  }
  SpanV1.addName(builder, nameOff);
  SpanV1.addKind(builder, span.kind);
  SpanV1.addStartTimeUnixNano(builder, span.startTimeUnixNano);
  SpanV1.addEndTimeUnixNano(builder, span.endTimeUnixNano);
  SpanV1.addStatusCode(builder, span.statusCode);
  if (statusMsgOff) {
    SpanV1.addStatusMessage(builder, statusMsgOff);
  }
  if (attrsOff) {
    SpanV1.addAttributesJson(builder, attrsOff);
  }
  return SpanV1.endSpanV1(builder);
}

/**
 * Encode an observability batch (traces and spans) into the wrapture flatbuffer
 * binary format, using a pooled builder to avoid per-call allocation pressure.
 *
 * @param input - Batch payload to serialize.
 * @returns The encoded flatbuffer bytes.
 */
export function encodeObservabilityBatch(input: ObservabilityBatchEncodeInput): Uint8Array {
  const t = startTiming();

  const result = withPooledBuilder(BUILDER_CAPACITY, (builder) => {
    const serviceNameOffset = builder.createSharedString(input.serviceName);
    const batchIdOffset = builder.createString(input.batchId);
    const timestampOffset = builder.createString(input.timestamp);

    const spanOffsets = input.spans.map((span) => encodeSpan(builder, span));
    const spansVector = ObservabilityBatchV1.createSpansVector(builder, spanOffsets);

    const root = ObservabilityBatchV1.createObservabilityBatchV1(
      builder,
      serviceNameOffset,
      batchIdOffset,
      timestampOffset,
      spansVector,
      Math.max(0, Math.trunc(input.droppedCount ?? 0)),
    );

    builder.finish(root, "OBS1");
    return builder.asUint8Array().slice();
  });

  recordEncode("observability", result.byteLength, t);
  return result;
}

/**
 * Decode an observability span batch from FlatBuffers bytes.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded batch or null when invalid.
 */
export function decodeObservabilityBatch(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): ObservabilityBatchDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("observability");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    const root = ObservabilityBatchV1.getRootAsObservabilityBatchV1(bb);
    const serviceName = root.serviceName();
    if (serviceName === null) {
      return null;
    }

    const spans: SpanDecoded[] = [];
    const count = root.spansLength();
    for (let i = 0; i < count; i++) {
      const span = root.spans(i);
      if (!span) {
        continue;
      }
      spans.push({
        traceId: span.traceId(),
        spanId: span.spanId(),
        parentSpanId: span.parentSpanId(),
        name: span.name(),
        kind: span.kind(),
        startTimeUnixNano: span.startTimeUnixNano(),
        endTimeUnixNano: span.endTimeUnixNano(),
        statusCode: span.statusCode(),
        statusMessage: span.statusMessage(),
        attributesJson: span.attributesJson(),
      });
    }

    return {
      serviceName,
      batchId: root.batchId() ?? null,
      timestamp: root.timestamp() ?? null,
      spans,
      droppedCount: root.droppedCount(),
    } satisfies ObservabilityBatchDecoded;
  });

  if (!result) {
    recordDecodeError("observability");
    return null;
  }
  recordDecode("observability", uint8.byteLength, t);
  return result;
}
