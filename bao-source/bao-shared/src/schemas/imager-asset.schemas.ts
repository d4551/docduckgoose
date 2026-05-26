/**
 * Imager asset ingestion schemas.
 *
 * Contract-first schemas for asset lineage, capture provenance, and
 * imager asset ingestion request/response envelopes.
 *
 * @shared/schemas/imager-asset.schemas.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

import { ImagerSourceSchema } from "./imager-source.schemas";

/**
 * Asset lineage for capture provenance and regulatory traceability.
 */
export const ImagerAssetLineageSchema = Type.Object(
  {
    /** Correlation ID linking to capture or pipeline stage. */
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    /** Calibration artifact version applied (if any). */
    calibrationVersion: Type.Optional(Type.String({ minLength: 1 })),
    /** Capture settings snapshot (format, resolution, quality). */
    captureSettings: Type.Optional(
      Type.Object(
        {
          format: Type.Optional(Type.String()),
          width: Type.Optional(Type.Integer()),
          height: Type.Optional(Type.Integer()),
          quality: Type.Optional(Type.Integer()),
        },
        { additionalProperties: false },
      ),
    ),
    /** Device assignment at capture time. */
    deviceAssignment: Type.Optional(Type.String({ minLength: 1 })),
    /** Policy snapshot identifier or summary (e.g. quality thresholds). */
    policySnapshot: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerAssetLineage schema. */
export type ImagerAssetLineage = Static<typeof ImagerAssetLineageSchema>;

/** TypeBox schema for ImagerAssetIngestRequestSchema. */
export const ImagerAssetIngestRequestSchema = Type.Object(
  {
    source: ImagerSourceSchema,
    caseId: Type.Optional(Type.String({ minLength: 1 })),
    name: Type.Optional(Type.String({ minLength: 1 })),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
    pipelineId: Type.Optional(Type.String({ minLength: 1 })),
    /** Data provenance and correlation for regulatory and replay. */
    lineage: Type.Optional(ImagerAssetLineageSchema),
  },
  {
    description: "Imager asset ingestion payload",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerAssetIngestRequest schema. */
export type ImagerAssetIngestRequest = Static<typeof ImagerAssetIngestRequestSchema>;

/** TypeBox schema for ImagerAssetIngestResponseSchema. */
export const ImagerAssetIngestResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<
      {
        readonly queued: Type.TBoolean;
        readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly imageId: Type.TUnion<(Type.TString | Type.TNull)[]>;
      },
      "jobId" | "imageId" | "queued",
      never
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "data" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        queued: Type.Boolean(),
        jobId: Type.Union([Type.String(), Type.Null()]),
        imageId: Type.Union([Type.String(), Type.Null()]),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerAssetIngestResponse schema. */
export type ImagerAssetIngestResponse = Static<typeof ImagerAssetIngestResponseSchema>;
