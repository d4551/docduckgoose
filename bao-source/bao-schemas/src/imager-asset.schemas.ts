/**
 * Imager asset ingestion schemas.
 *
 * Contract-first schemas for asset lineage, capture provenance, and
 * imager asset ingestion request/response envelopes.
 *
 * @shared/schemas/imager-asset.schemas.ts
 */

import type {
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

import { ImagerSourceSchema } from "./imager-source.schemas";

/**
 * Asset lineage for capture provenance and regulatory traceability.
 */
export const ImagerAssetLineageSchema = TypeExports.Object(
  {
    /** Correlation ID linking to capture or pipeline stage. */
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Calibration artifact version applied (if any). */
    calibrationVersion: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Capture settings snapshot (format, resolution, quality). */
    captureSettings: TypeExports.Optional(
      TypeExports.Object(
        {
          format: TypeExports.Optional(TypeExports.String()),
          width: TypeExports.Optional(TypeExports.Integer()),
          height: TypeExports.Optional(TypeExports.Integer()),
          quality: TypeExports.Optional(TypeExports.Integer()),
        },
        { additionalProperties: false },
      ),
    ),
    /** Device assignment at capture time. */
    deviceAssignment: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Policy snapshot identifier or summary (e.g. quality thresholds). */
    policySnapshot: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerAssetLineage schema. */
export type ImagerAssetLineage = Static<typeof ImagerAssetLineageSchema>;

/** TypeBox schema for ImagerAssetIngestRequestSchema. */
export const ImagerAssetIngestRequestSchema = TypeExports.Object(
  {
    source: ImagerSourceSchema,
    caseId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    pipelineId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Data provenance and correlation for regulatory and replay. */
    lineage: TypeExports.Optional(ImagerAssetLineageSchema),
  },
  {
    description: "Imager asset ingestion payload",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerAssetIngestRequest schema. */
export type ImagerAssetIngestRequest = Static<typeof ImagerAssetIngestRequestSchema>;

/** TypeBox schema for ImagerAssetIngestResponseSchema. */
export const ImagerAssetIngestResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: TObject<
      {
        readonly queued: TBoolean;
        readonly jobId: TUnion<(TString | TNull)[]>;
        readonly imageId: TUnion<(TString | TNull)[]>;
      },
      "jobId" | "imageId" | "queued",
      never
    >;
    readonly timestamp: TString;
  },
  "ok" | "data" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Object(
      {
        queued: TypeExports.Boolean(),
        jobId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        imageId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerAssetIngestResponse schema. */
export type ImagerAssetIngestResponse = Static<typeof ImagerAssetIngestResponseSchema>;
