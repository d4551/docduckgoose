/**
 * DICOM archive/export schemas.
 *
 * Typed contract for storing and retrieving whole DICOM objects plus the
 * canonical metadata identifiers derived from those objects.
 *
 * @shared/schemas/dicom
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

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
  return Type.Object(
    {
      rows: Type.Integer({ minimum: 1 }),
      columns: Type.Integer({ minimum: 1 }),
      bitsAllocated: Type.Union([Type.Literal(DICOM_BITS_8), Type.Literal(DICOM_BITS_16)]),
      bitsStored: Type.Integer({ minimum: 1, maximum: DICOM_BITS_16 }),
      samplesPerPixel: Type.Union([
        Type.Literal(DICOM_SAMPLES_MONO),
        Type.Literal(DICOM_SAMPLES_RGB),
      ]),
      photometricInterpretation: Type.Union([
        Type.Literal("MONOCHROME1"),
        Type.Literal("MONOCHROME2"),
        Type.Literal("RGB"),
        Type.Literal("YBR_FULL_422"),
      ]),
      pixelRepresentation: Type.Union([
        Type.Literal(DICOM_PIXEL_UNSIGNED),
        Type.Literal(DICOM_PIXEL_SIGNED),
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
export const DicomInstanceIdentifiersSchema: Type.TObject<
  {
    readonly sopInstanceUid: Type.TOptional<Type.TString>;
    readonly studyInstanceUid: Type.TOptional<Type.TString>;
    readonly seriesInstanceUid: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly sopInstanceUid: Type.TOptional<Type.TString>;
    readonly studyInstanceUid: Type.TOptional<Type.TString>;
    readonly seriesInstanceUid: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    sopInstanceUid: Type.Optional(Type.String()),
    studyInstanceUid: Type.Optional(Type.String()),
    seriesInstanceUid: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomInstanceIdentifiers schema. */
export type DicomInstanceIdentifiers = Static<typeof DicomInstanceIdentifiersSchema>;

/**
 * Public DICOM instance metadata returned by archive APIs.
 */
export const DicomInstanceMetadataSchema: Type.TObject<
  {
    readonly sopInstanceUid: Type.TString;
    readonly studyInstanceUid: Type.TString;
    readonly seriesInstanceUid: Type.TString;
    readonly patientId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly modality: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly contentType: Type.TString;
    readonly byteLength: Type.TNumber;
    readonly sha256: Type.TString;
    readonly tags: Type.TRecord<Type.TString, Type.TString>;
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
> = Type.Object(
  {
    sopInstanceUid: Type.String({ minLength: 1 }),
    studyInstanceUid: Type.String({ minLength: 1 }),
    seriesInstanceUid: Type.String({ minLength: 1 }),
    patientId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    modality: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    contentType: Type.String({ minLength: 1 }),
    byteLength: Type.Number({ minimum: 0 }),
    sha256: Type.String({ minLength: 1 }),
    tags: Type.Record(Type.String(), Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomInstanceMetadata schema. */
export type DicomInstanceMetadata = Static<typeof DicomInstanceMetadataSchema>;

/**
 * DICOM export request (store a complete DICOM object).
 */
export const DicomExportRequestSchema = Type.Object(
  {
    /** Base64-encoded DICOM object bytes. */
    dicomBase64: Type.String({ minLength: 1 }),
    /** Optional caller-supplied identifiers that must match the DICOM dataset. */
    identifiers: Type.Optional(DicomInstanceIdentifiersSchema),
    /** Optional caller-supplied Patient ID that must match the DICOM dataset when present. */
    patientId: Type.Optional(Type.String({ minLength: 1 })),
    /** Optional caller-supplied modality that must match the DICOM dataset when present. */
    modality: Type.Optional(Type.String({ minLength: 1 })),
    /** Optional indexable tags. */
    tags: Type.Optional(Type.Record(Type.String(), Type.String())),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomExportRequest schema. */
export type DicomExportRequest = Static<typeof DicomExportRequestSchema>;

/**
 * DICOM export response.
 */
export const DicomExportResponseSchema: Type.TObject<
  {
    readonly metadata: Type.TObject<
      {
        readonly sopInstanceUid: Type.TString;
        readonly studyInstanceUid: Type.TString;
        readonly seriesInstanceUid: Type.TString;
        readonly patientId: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly modality: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly contentType: Type.TString;
        readonly byteLength: Type.TNumber;
        readonly sha256: Type.TString;
        readonly tags: Type.TRecord<Type.TString, Type.TString>;
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
    readonly wadoUri: Type.TOptional<Type.TString>;
  },
  "metadata",
  "wadoUri"
> = Type.Object(
  {
    /** Stored DICOM object metadata. */
    metadata: DicomInstanceMetadataSchema,
    /** Optional WADO-URI retrieval target for the stored instance. */
    wadoUri: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomExportResponse schema. */
export type DicomExportResponse = Static<typeof DicomExportResponseSchema>;

/**
 * DICOM ingest request (store a complete DICOM object).
 */
export const DicomIngestRequestSchema = Type.Object(
  {
    /** Base64-encoded DICOM object bytes. */
    dicomBase64: Type.String({ minLength: 1 }),
    /** Optional caller-supplied identifiers that must match the DICOM dataset. */
    identifiers: Type.Optional(DicomInstanceIdentifiersSchema),
    /** Optional caller-supplied Patient ID that must match the DICOM dataset when present. */
    patientId: Type.Optional(Type.String({ minLength: 1 })),
    /** Optional caller-supplied modality that must match the DICOM dataset when present. */
    modality: Type.Optional(Type.String({ minLength: 1 })),
    /** Optional indexable tags. */
    tags: Type.Optional(Type.Record(Type.String(), Type.String())),
  },
  { additionalProperties: false },
);

/** Inferred type from the DicomIngestRequest schema. */
export type DicomIngestRequest = Static<typeof DicomIngestRequestSchema>;
