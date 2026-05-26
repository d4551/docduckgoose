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

import type {
  InferOptionalKeys,
  Static,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { QueueJobContextSchema } from "./queue-context.schemas.ts";

const AnnotationAutoIngestIntegrationStartedSchema = TypeExports.Object(
  {
    started: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Supported auto-ingest kinds (device/driver stacks).
 */
export const AnnotationAutoIngestKindSchema: TUnion<
  (TLiteral<"hardware"> | TLiteral<"drone"> | TLiteral<"robotics">)[]
> = TypeExports.Union(
  [TypeExports.Literal("hardware"), TypeExports.Literal("drone"), TypeExports.Literal("robotics")],
  {},
);

/** Inferred type from the AnnotationAutoIngestKind schema. */
export type AnnotationAutoIngestKind = Static<typeof AnnotationAutoIngestKindSchema>;

/**
 * Raw auto-ingest envelope accepted by API/MCP boundaries.
 *
 * The `payload` shape is intentionally loose: hardware/device stacks emit
 * different metadata, and the server hydration layer normalizes these inputs
 * into typed domain requests.
 */
export const AnnotationAutoIngestEnqueueRequestSchema: TObject<
  {
    readonly kind: TUnion<(TLiteral<"hardware"> | TLiteral<"drone"> | TLiteral<"robotics">)[]>;
    readonly payload: TRecord<TString, TUnknown>;
    readonly eventTimestamp: TOptional<TUnion<(TString | TNull)[]>>;
    readonly idempotencyKey: TOptional<TUnion<(TString | TNull)[]>>;
  },
  "payload" | "kind",
  InferOptionalKeys<{
    readonly kind: TUnion<(TLiteral<"hardware"> | TLiteral<"drone"> | TLiteral<"robotics">)[]>;
    readonly payload: TRecord<TString, TUnknown>;
    readonly eventTimestamp: TOptional<TUnion<(TString | TNull)[]>>;
    readonly idempotencyKey: TOptional<TUnion<(TString | TNull)[]>>;
  }>
> = TypeExports.Object(
  {
    kind: AnnotationAutoIngestKindSchema,
    payload: TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    eventTimestamp: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    idempotencyKey: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
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
export const AnnotationAutoIngestEnqueueResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        accepted: TypeExports.Literal(false),
        reason: TypeExports.Union([
          TypeExports.Literal("disabled"),
          TypeExports.Literal("empty"),
          TypeExports.Literal("invalid"),
        ]),
        timestamp: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        accepted: TypeExports.Literal(true),
        queued: TypeExports.Boolean(),
        cached: TypeExports.Boolean(),
        jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
        singletonKey: TypeExports.String({ minLength: 1 }),
        idempotencyKey: TypeExports.Union([
          TypeExports.String({ minLength: 1 }),
          TypeExports.Null(),
        ]),
        timestamp: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(false),
        accepted: TypeExports.Literal(true),
        queued: TypeExports.Boolean(),
        cached: TypeExports.Boolean(),
        jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
        singletonKey: TypeExports.String({ minLength: 1 }),
        idempotencyKey: TypeExports.Union([
          TypeExports.String({ minLength: 1 }),
          TypeExports.Null(),
        ]),
        error: TypeExports.String({ minLength: 1 }),
        status: TypeExports.Optional(TypeExports.Integer({ minimum: 100, maximum: 599 })),
        code: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
        timestamp: TypeExports.String({ minLength: 1 }),
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
export const AnnotationAutoIngestStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    enabled: TypeExports.Boolean(),
    queueActive: TypeExports.Boolean(),
    integrations: TypeExports.Object(
      {
        hardware: AnnotationAutoIngestIntegrationStartedSchema,
        device: AnnotationAutoIngestIntegrationStartedSchema,
      },
      { additionalProperties: false },
    ),
    ingest: TypeExports.Object(
      {
        hardwareAutoAnnotations: TypeExports.Object(
          {
            enabled: TypeExports.Boolean(),
            maxItems: TypeExports.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
        deviceAutoAnnotations: TypeExports.Object(
          {
            enabled: TypeExports.Boolean(),
            maxItems: TypeExports.Integer({ minimum: 0 }),
            kinds: TypeExports.Array(TypeExports.String(), { maxItems: 16 }),
          },
          { additionalProperties: false },
        ),
        autoIngestJob: TypeExports.Object(
          {
            enabled: TypeExports.Boolean(),
            singletonSeconds: TypeExports.Integer({ minimum: 0 }),
            inlineCacheMaxEntries: TypeExports.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.String({ minLength: 1 }),
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
export const AnnotationAutoIngestJobSchema = TypeExports.Object(
  {
    kind: AnnotationAutoIngestKindSchema,
    requestedAt: TypeExports.String({ minLength: 1 }),
    idempotencyKey: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    requestedBy: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    correlationId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    requestId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    eventTimestamp: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    assetId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    imageId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    dataUrl: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    deviceId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    caseId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    metadata: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
        TypeExports.Null(),
      ]),
    ),
    annotations: TypeExports.Array(TypeExports.Unknown(), { minItems: 1 }),
    __context: TypeExports.Optional(QueueJobContextSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the AnnotationAutoIngestJob schema. */
export type AnnotationAutoIngestJob = Static<typeof AnnotationAutoIngestJobSchema>;
