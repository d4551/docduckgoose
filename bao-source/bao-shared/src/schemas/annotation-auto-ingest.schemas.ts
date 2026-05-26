/**
 * Annotation auto-ingest schemas.
 *
 * Defines contract-first TypeBox schemas for device/hardware `autoAnnotations`
 * ingestion flows, including:
 * - Enqueue request/response payloads (API + MCP tools)
 * - Queue job payloads (bao-boss worker boundary)
 * - Status snapshot payloads (UI + MCP resources)
 *
 * @shared/schemas/annotation-auto-ingest
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { QueueJobContextSchema } from "./queue-context.schemas.ts";

const AnnotationAutoIngestIntegrationStartedSchema = Type.Object(
  {
    started: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Supported auto-ingest kinds (device/driver stacks).
 */
export const AnnotationAutoIngestKindSchema: Type.TUnion<
  (Type.TLiteral<"hardware"> | Type.TLiteral<"drone"> | Type.TLiteral<"robotics">)[]
> = Type.Union([Type.Literal("hardware"), Type.Literal("drone"), Type.Literal("robotics")], {});

/** Inferred type from the AnnotationAutoIngestKind schema. */
export type AnnotationAutoIngestKind = Static<typeof AnnotationAutoIngestKindSchema>;

/**
 * Raw auto-ingest envelope accepted by API/MCP boundaries.
 *
 * The `payload` shape is intentionally loose: hardware/device stacks emit
 * different metadata, and the server hydration layer normalizes these inputs
 * into typed domain requests.
 */
export const AnnotationAutoIngestEnqueueRequestSchema: Type.TObject<
  {
    readonly kind: Type.TUnion<
      (Type.TLiteral<"hardware"> | Type.TLiteral<"drone"> | Type.TLiteral<"robotics">)[]
    >;
    readonly payload: Type.TRecord<Type.TString, Type.TUnknown>;
    readonly eventTimestamp: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  },
  "payload" | "kind",
  Type.InferOptionalKeys<{
    readonly kind: Type.TUnion<
      (Type.TLiteral<"hardware"> | Type.TLiteral<"drone"> | Type.TLiteral<"robotics">)[]
    >;
    readonly payload: Type.TRecord<Type.TString, Type.TUnknown>;
    readonly eventTimestamp: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  }>
> = Type.Object(
  {
    kind: AnnotationAutoIngestKindSchema,
    payload: Type.Record(Type.String(), Type.Unknown()),
    eventTimestamp: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    idempotencyKey: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
  },
  { additionalProperties: false },
);

/** Inferred type from the AnnotationAutoIngestEnqueueRequest schema. */
export type AnnotationAutoIngestEnqueueRequest = Static<
  typeof AnnotationAutoIngestEnqueueRequestSchema
>;

/**
 * Auto-ingest enqueue response for API/MCP boundaries.
 */
export const AnnotationAutoIngestEnqueueResponseSchema = Type.Union(
  [
    Type.Object(
      {
        ok: Type.Literal(true),
        accepted: Type.Literal(false),
        reason: Type.Union([
          Type.Literal("disabled"),
          Type.Literal("empty"),
          Type.Literal("invalid"),
        ]),
        timestamp: Type.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    Type.Object(
      {
        ok: Type.Literal(true),
        accepted: Type.Literal(true),
        queued: Type.Boolean(),
        cached: Type.Boolean(),
        jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
        singletonKey: Type.String({ minLength: 1 }),
        idempotencyKey: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
        timestamp: Type.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    Type.Object(
      {
        ok: Type.Literal(false),
        accepted: Type.Literal(true),
        queued: Type.Boolean(),
        cached: Type.Boolean(),
        jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
        singletonKey: Type.String({ minLength: 1 }),
        idempotencyKey: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
        error: Type.String({ minLength: 1 }),
        status: Type.Optional(Type.Integer({ minimum: 100, maximum: 599 })),
        code: Type.Optional(Type.String({ minLength: 1 })),
        timestamp: Type.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
  ],
  {},
);

/** Inferred type from the AnnotationAutoIngestEnqueueResponse schema. */
export type AnnotationAutoIngestEnqueueResponse = Static<
  typeof AnnotationAutoIngestEnqueueResponseSchema
>;

/**
 * Status snapshot payload for auto-ingest integration.
 */
export const AnnotationAutoIngestStatusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    enabled: Type.Boolean(),
    queueActive: Type.Boolean(),
    integrations: Type.Object(
      {
        hardware: AnnotationAutoIngestIntegrationStartedSchema,
        device: AnnotationAutoIngestIntegrationStartedSchema,
      },
      { additionalProperties: false },
    ),
    ingest: Type.Object(
      {
        hardwareAutoAnnotations: Type.Object(
          {
            enabled: Type.Boolean(),
            maxItems: Type.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
        deviceAutoAnnotations: Type.Object(
          {
            enabled: Type.Boolean(),
            maxItems: Type.Integer({ minimum: 0 }),
            kinds: Type.Array(Type.String(), { maxItems: 16 }),
          },
          { additionalProperties: false },
        ),
        autoIngestJob: Type.Object(
          {
            enabled: Type.Boolean(),
            singletonSeconds: Type.Integer({ minimum: 0 }),
            inlineCacheMaxEntries: Type.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the AnnotationAutoIngestStatusResponse schema. */
export type AnnotationAutoIngestStatusResponse = Static<
  typeof AnnotationAutoIngestStatusResponseSchema
>;

/**
 * Queue job payload schema for annotation auto-ingest worker boundary.
 */
export const AnnotationAutoIngestJobSchema = Type.Object(
  {
    kind: AnnotationAutoIngestKindSchema,
    requestedAt: Type.String({ minLength: 1 }),
    idempotencyKey: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    requestedBy: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    correlationId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    requestId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    eventTimestamp: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    assetId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    imageId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    dataUrl: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    deviceId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    caseId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    metadata: Type.Optional(Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()])),
    annotations: Type.Array(Type.Unknown(), { minItems: 1 }),
    __context: Type.Optional(QueueJobContextSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the AnnotationAutoIngestJob schema. */
export type AnnotationAutoIngestJob = Static<typeof AnnotationAutoIngestJobSchema>;
