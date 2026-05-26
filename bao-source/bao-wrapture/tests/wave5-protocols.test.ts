/**
 * Unit tests for Wave 5 Wrapture protocol modules.
 *
 * Tests observability batch and bao-manifest encode/decode round-trips
 * with size guard validation.
 */

import { describe, expect, it } from "bun:test";
import {
  type BaoManifestEncodeInput,
  decodeBaoManifest,
  encodeBaoManifest,
} from "../src/protocols/bao-manifest";
import {
  decodeObservabilityBatch,
  encodeObservabilityBatch,
  type ObservabilityBatchEncodeInput,
  SpanKind,
  SpanStatusCode,
} from "../src/protocols/observability";

const TRACE_ID_LENGTH = 32;
const SPAN_ID_LENGTH = 16;
const SERVER_SPAN_START_NANO: bigint = BigInt(1000000000);
const SERVER_SPAN_END_NANO: bigint = BigInt(2000000000);
const CLIENT_SPAN_START_NANO: bigint = BigInt(1100000000);
const CLIENT_SPAN_END_NANO: bigint = BigInt(1500000000);
const EXPECTED_DROPPED_COUNT = 3;
const EXPECTED_SPAN_COUNT = 2;

describe("ObservabilityBatch protocol", () => {
  const sampleBatch: ObservabilityBatchEncodeInput = {
    serviceName: "bao-api",
    batchId: "batch-001",
    timestamp: "2026-03-01T00:00:00Z",
    spans: [
      {
        traceId: "a".repeat(TRACE_ID_LENGTH),
        spanId: "b".repeat(SPAN_ID_LENGTH),
        parentSpanId: "c".repeat(SPAN_ID_LENGTH),
        name: "POST /api/install",
        kind: SpanKind.SERVER,
        startTimeUnixNano: SERVER_SPAN_START_NANO,
        endTimeUnixNano: SERVER_SPAN_END_NANO,
        statusCode: SpanStatusCode.OK,
        statusMessage: "",
        attributesJson: '{"http.method":"POST"}',
      },
      {
        traceId: "a".repeat(TRACE_ID_LENGTH),
        spanId: "d".repeat(SPAN_ID_LENGTH),
        name: "db.query",
        kind: SpanKind.CLIENT,
        startTimeUnixNano: CLIENT_SPAN_START_NANO,
        endTimeUnixNano: CLIENT_SPAN_END_NANO,
        statusCode: SpanStatusCode.UNSET,
      },
    ],
    droppedCount: EXPECTED_DROPPED_COUNT,
  };

  it("round-trips a batch with spans", () => {
    const encoded = encodeObservabilityBatch(sampleBatch);
    expect(encoded).toBeInstanceOf(Uint8Array);
    expect(encoded.byteLength).toBeGreaterThan(0);

    const decoded = decodeObservabilityBatch(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.serviceName).toBe("bao-api");
    expect(decoded?.batchId).toBe("batch-001");
    expect(decoded?.timestamp).toBe("2026-03-01T00:00:00Z");
    expect(decoded?.droppedCount).toBe(EXPECTED_DROPPED_COUNT);
    expect(decoded?.spans).toHaveLength(EXPECTED_SPAN_COUNT);
  });

  it("preserves span fields", () => {
    const encoded = encodeObservabilityBatch(sampleBatch);
    const decoded = decodeObservabilityBatch(encoded);
    expect(decoded).not.toBeNull();
    if (!decoded) {
      return;
    }
    const span = decoded.spans[0];

    expect(span.traceId).toBe("a".repeat(TRACE_ID_LENGTH));
    expect(span.spanId).toBe("b".repeat(SPAN_ID_LENGTH));
    expect(span.parentSpanId).toBe("c".repeat(SPAN_ID_LENGTH));
    expect(span.name).toBe("POST /api/install");
    expect(span.kind).toBe(SpanKind.SERVER);
    expect(span.statusCode).toBe(SpanStatusCode.OK);
    expect(span.attributesJson).toBe('{"http.method":"POST"}');
  });

  it("handles empty spans array", () => {
    const encoded = encodeObservabilityBatch({
      serviceName: "test-svc",
      batchId: "empty-batch",
      timestamp: "2026-01-01T00:00:00Z",
      spans: [],
    });
    const decoded = decodeObservabilityBatch(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.spans).toHaveLength(0);
    expect(decoded?.droppedCount).toBe(0);
  });

  it("returns null when bytes exceed maxBytes", () => {
    const encoded = encodeObservabilityBatch(sampleBatch);
    expect(decodeObservabilityBatch(encoded, 1)).toBeNull();
  });
});

describe("BaoManifest transport protocol", () => {
  const sampleManifest: BaoManifestEncodeInput = {
    name: "my-bao-module",
    version: "1.2.3",
    description: "A test .bao manifest for unit testing.",
    targets: [
      {
        kind: "elysia-plugin",
        id: "plugin-auth",
        moduleId: "@bao/auth-plugin",
        configJson: '{"realm":"vault"}',
      },
      {
        kind: "htmx-extension",
        id: "ext-trace",
        moduleId: "@bao/htmx-traceability",
      },
    ],
    metadataJson: '{"author":"bao-team"}',
    createdAt: "2026-03-01T12:00:00Z",
  };

  it("round-trips a manifest with targets", () => {
    const encoded = encodeBaoManifest(sampleManifest);
    expect(encoded).toBeInstanceOf(Uint8Array);
    expect(encoded.byteLength).toBeGreaterThan(0);

    const decoded = decodeBaoManifest(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.name).toBe("my-bao-module");
    expect(decoded?.version).toBe("1.2.3");
    expect(decoded?.description).toBe("A test .bao manifest for unit testing.");
    expect(decoded?.metadataJson).toBe('{"author":"bao-team"}');
    expect(decoded?.createdAt).toBe("2026-03-01T12:00:00Z");
    expect(decoded?.targets).toHaveLength(2);
  });

  it("preserves transport target fields", () => {
    const encoded = encodeBaoManifest(sampleManifest);
    const decoded = decodeBaoManifest(encoded);
    if (!decoded) {
      throw new Error("decodeBaoManifest returned null");
    }
    const target = decoded.targets[0];

    expect(target.kind).toBe("elysia-plugin");
    expect(target.id).toBe("plugin-auth");
    expect(target.moduleId).toBe("@bao/auth-plugin");
    expect(target.configJson).toBe('{"realm":"vault"}');
  });

  it("handles transport target without configJson", () => {
    const encoded = encodeBaoManifest(sampleManifest);
    const decoded = decodeBaoManifest(encoded);
    if (!decoded) {
      throw new Error("decodeBaoManifest returned null");
    }
    const target = decoded.targets[1];

    expect(target.kind).toBe("htmx-extension");
    expect(target.id).toBe("ext-trace");
    expect(target.moduleId).toBe("@bao/htmx-traceability");
    expect(target.configJson).toBeNull();
  });

  it("handles manifest with no targets", () => {
    const encoded = encodeBaoManifest({
      name: "empty-manifest",
      version: "0.0.1",
      targets: [],
    });
    const decoded = decodeBaoManifest(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.name).toBe("empty-manifest");
    expect(decoded?.targets).toHaveLength(0);
  });

  it("handles minimal manifest (no optional fields)", () => {
    const encoded = encodeBaoManifest({
      name: "minimal",
      version: "1.0.0",
      targets: [{ kind: "bao-package", id: "mod-1", moduleId: "./mod.ts" }],
    });
    const decoded = decodeBaoManifest(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.name).toBe("minimal");
    expect(decoded?.description).toBeNull();
    expect(decoded?.metadataJson).toBeNull();
    expect(decoded?.createdAt).toBeNull();
  });

  it("returns null when bytes exceed maxBytes", () => {
    const encoded = encodeBaoManifest(sampleManifest);
    expect(decodeBaoManifest(encoded, 1)).toBeNull();
  });
});
