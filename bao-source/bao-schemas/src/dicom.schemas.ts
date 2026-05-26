/**
 * DICOM archive/export schemas.
 *
 * Typed contract for storing and retrieving whole DICOM objects plus the
 * canonical metadata identifiers derived from those objects.
 *
 * @shared/schemas/dicom
 */

import type {
  InferOptionalKeys,
  Static,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/** DICOM standard bits-allocated values. */
const DICOM_BITS_8 = 8;
const DICOM_BITS_16 = 16;
/** DICOM samples per pixel: monochrome=1, RGB=3. */
const DICOM_SAMPLES_MONO = 1;
const DICOM_SAMPLES_RGB = 3;
/** DICOM pixel representation: unsigned=0, signed=1. */
const DICOM_PIXEL_UNSIGNED = 0;
const DICOM_PIXEL_SIGNED = 1;

/**
 * DICOM pixel data metadata (Pydicom-compatible).
 */
function buildDicomPixelMetadataSchema() {
  return TypeExports.Object(
    {
      rows: TypeExports.Integer({ minimum: 1 }),
      columns: TypeExports.Integer({ minimum: 1 }),
      bitsAllocated: TypeExports.Union([
        TypeExports.Literal(DICOM_BITS_8),
        TypeExports.Literal(DICOM_BITS_16),
      ]),
      bitsStored: TypeExports.Integer({ minimum: 1, maximum: DICOM_BITS_16 }),
      samplesPerPixel: TypeExports.Union([
        TypeExports.Literal(DICOM_SAMPLES_MONO),
        TypeExports.Literal(DICOM_SAMPLES_RGB),
      ]),
      photometricInterpretation: TypeExports.Union([
        TypeExports.Literal("MONOCHROME1"),
        TypeExports.Literal("MONOCHROME2"),
        TypeExports.Literal("RGB"),
        TypeExports.Literal("YBR_FULL_422"),
      ]),
      pixelRepresentation: TypeExports.Union([
        TypeExports.Literal(DICOM_PIXEL_UNSIGNED),
        TypeExports.Literal(DICOM_PIXEL_SIGNED),
      ]),
    },
    { additionalProperties: false },
  );
}
/** Pixel metadata schema for DICOM instance frame decoding and validation. */
export const DicomPixelMetadataSchema = buildDicomPixelMetadataSchema();

/** Inferred type from the DicomPixelMetadata schema. */
export type DicomPixelMetadata = Static<typeof DicomPixelMetadataSchema>;

/**
 * Canonical DICOM instance identifiers.
 */
export const DicomInstanceIdentifiersSchema: TObject<
  {
    readonly sopInstanceUid: TOptional<TString>;
    readonly studyInstanceUid: TOptional<TString>;
    readonly seriesInstanceUid: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly sopInstanceUid: TOptional<TString>;
    readonly studyInstanceUid: TOptional<TString>;
    readonly seriesInstanceUid: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    sopInstanceUid: TypeExports.Optional(TypeExports.String()),
    studyInstanceUid: TypeExports.Optional(TypeExports.String()),
    seriesInstanceUid: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomInstanceIdentifiers schema. */
export type DicomInstanceIdentifiers = Static<typeof DicomInstanceIdentifiersSchema>;

/**
 * Public DICOM instance metadata returned by archive APIs.
 */
export const DicomInstanceMetadataSchema: TObject<
  {
    readonly sopInstanceUid: TString;
    readonly studyInstanceUid: TString;
    readonly seriesInstanceUid: TString;
    readonly patientId: TUnion<(TString | TNull)[]>;
    readonly modality: TUnion<(TString | TNull)[]>;
    readonly contentType: TString;
    readonly byteLength: TNumber;
    readonly sha256: TString;
    readonly tags: TRecord<TString, TString>;
  },
  | "patientId"
  | "modality"
  | "tags"
  | "sopInstanceUid"
  | "studyInstanceUid"
  | "seriesInstanceUid"
  | "contentType"
  | "byteLength"
  | "sha256",
  never
> = TypeExports.Object(
  {
    sopInstanceUid: TypeExports.String({ minLength: 1 }),
    studyInstanceUid: TypeExports.String({ minLength: 1 }),
    seriesInstanceUid: TypeExports.String({ minLength: 1 }),
    patientId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    modality: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    contentType: TypeExports.String({ minLength: 1 }),
    byteLength: TypeExports.Number({ minimum: 0 }),
    sha256: TypeExports.String({ minLength: 1 }),
    tags: TypeExports.Record(TypeExports.String(), TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomInstanceMetadata schema. */
export type DicomInstanceMetadata = Static<typeof DicomInstanceMetadataSchema>;

/**
 * DICOM export request (store a complete DICOM object).
 */
export const DicomExportRequestSchema = TypeExports.Object(
  {
    /** Base64-encoded DICOM object bytes. */
    dicomBase64: TypeExports.String({ minLength: 1 }),
    /** Optional caller-supplied identifiers that must match the DICOM dataset. */
    identifiers: TypeExports.Optional(DicomInstanceIdentifiersSchema),
    /** Optional caller-supplied Patient ID that must match the DICOM dataset when present. */
    patientId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Optional caller-supplied modality that must match the DICOM dataset when present. */
    modality: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Optional indexable tags. */
    tags: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.String())),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomExportRequest schema. */
export type DicomExportRequest = Static<typeof DicomExportRequestSchema>;

/**
 * DICOM export response.
 */
export const DicomExportResponseSchema: TObject<
  {
    readonly metadata: TObject<
      {
        readonly sopInstanceUid: TString;
        readonly studyInstanceUid: TString;
        readonly seriesInstanceUid: TString;
        readonly patientId: TUnion<(TString | TNull)[]>;
        readonly modality: TUnion<(TString | TNull)[]>;
        readonly contentType: TString;
        readonly byteLength: TNumber;
        readonly sha256: TString;
        readonly tags: TRecord<TString, TString>;
      },
      | "sopInstanceUid"
      | "studyInstanceUid"
      | "seriesInstanceUid"
      | "patientId"
      | "modality"
      | "tags"
      | "contentType"
      | "byteLength"
      | "sha256",
      never
    >;
    readonly wadoUri: TOptional<TString>;
  },
  "metadata",
  "wadoUri"
> = TypeExports.Object(
  {
    /** Stored DICOM object metadata. */
    metadata: DicomInstanceMetadataSchema,
    /** Optional WADO-URI retrieval target for the stored instance. */
    wadoUri: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomExportResponse schema. */
export type DicomExportResponse = Static<typeof DicomExportResponseSchema>;

/**
 * DICOM ingest request (store a complete DICOM object).
 */
export const DicomIngestRequestSchema = TypeExports.Object(
  {
    /** Base64-encoded DICOM object bytes. */
    dicomBase64: TypeExports.String({ minLength: 1 }),
    /** Optional caller-supplied identifiers that must match the DICOM dataset. */
    identifiers: TypeExports.Optional(DicomInstanceIdentifiersSchema),
    /** Optional caller-supplied Patient ID that must match the DICOM dataset when present. */
    patientId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Optional caller-supplied modality that must match the DICOM dataset when present. */
    modality: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Optional indexable tags. */
    tags: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.String())),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomIngestRequest schema. */
export type DicomIngestRequest = Static<typeof DicomIngestRequestSchema>;
