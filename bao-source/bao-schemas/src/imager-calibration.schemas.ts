/**
 * Imager calibration and rectification schemas.
 *
 * Contract-first schemas for OpenCV-compatible camera calibration artifacts,
 * calibration request/response envelopes, and rectification pipelines.
 *
 * @shared/schemas/imager-calibration.schemas.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TInteger,
  TNumber,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

import {
  ImagerCaptureOptionsSchema,
  ImagerImageFormatSchema,
  ImagerSourceSchema,
} from "./imager-source.schemas";

/**
 * Calibration artifact schema for optical correction (OpenCV-compatible).
 * Used by rectification pipelines and downstream consumers (scanner, XR, perception).
 */
export const ImagerCalibrationSchema: TObject<
  {
    readonly cameraMatrix: TArray<TArray<TNumber>>;
    readonly distCoeffs: TArray<TNumber>;
    readonly imageSize: TObject<
      { readonly width: TInteger; readonly height: TInteger },
      "width" | "height",
      never
    >;
    readonly reprojectionError: TOptional<TNumber>;
    readonly version: TOptional<TString>;
  },
  "cameraMatrix" | "distCoeffs" | "imageSize",
  InferOptionalKeys<{
    readonly cameraMatrix: TArray<TArray<TNumber>>;
    readonly distCoeffs: TArray<TNumber>;
    readonly imageSize: TObject<
      { readonly width: TInteger; readonly height: TInteger },
      "width" | "height",
      never
    >;
    readonly reprojectionError: TOptional<TNumber>;
    readonly version: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    cameraMatrix: TypeExports.Array(TypeExports.Array(TypeExports.Number())),
    distCoeffs: TypeExports.Array(TypeExports.Number()),
    imageSize: TypeExports.Object(
      {
        width: TypeExports.Integer({ minimum: 1 }),
        height: TypeExports.Integer({ minimum: 1 }),
      },
      { additionalProperties: false },
    ),
    reprojectionError: TypeExports.Optional(TypeExports.Number()),
    /** Artifact version for downstream pipeline consumers and replay. */
    version: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerCalibration schema. */
export type ImagerCalibration = Static<typeof ImagerCalibrationSchema>;

/** TypeBox schema for ImagerCalibrationRequestSchema. */
export const ImagerCalibrationRequestSchema = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1 }),
    images: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    capture: TypeExports.Optional(ImagerCaptureOptionsSchema),
    samples: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    pattern: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    patternSize: TypeExports.Optional(
      TypeExports.Object(
        {
          width: TypeExports.Integer({ minimum: 1 }),
          height: TypeExports.Integer({ minimum: 1 }),
        },
        { additionalProperties: false },
      ),
    ),
    squareSizeMm: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    expiresAt: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Number()]),
    ),
    validForDays: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    validForHours: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  {
    description: "Calibration request payload for imager devices",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerCalibrationRequest schema. */
export type ImagerCalibrationRequest = Static<typeof ImagerCalibrationRequestSchema>;

/** TypeBox schema for ImagerCalibrationPayloadSchema. */
export const ImagerCalibrationPayloadSchema = TypeExports.Object(
  {
    deviceId: TypeExports.String(),
    calibrationId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    imagesUsed: TypeExports.Integer({ minimum: 0 }),
    calibration: ImagerCalibrationSchema,
    reprojectionError: TypeExports.Optional(TypeExports.Number()),
    source: TypeExports.Optional(
      TypeExports.Object(
        {
          baseUrl: TypeExports.Optional(TypeExports.String()),
          captured: TypeExports.Boolean(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerCalibrationPayload schema. */
export type ImagerCalibrationPayload = Static<typeof ImagerCalibrationPayloadSchema>;

/** TypeBox schema for ImagerCalibrationResponseSchema. */
export const ImagerCalibrationResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: ImagerCalibrationPayloadSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerCalibrationResponse schema. */
export type ImagerCalibrationResponse = Static<typeof ImagerCalibrationResponseSchema>;

/** TypeBox schema for ImagerRectifyOptionsSchema. */
export const ImagerRectifyOptionsSchema: TObject<
  { readonly alpha: TOptional<TNumber> },
  never,
  "alpha"
> = TypeExports.Object(
  {
    alpha: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerRectifyRequestSchema. */
export const ImagerRectifyRequestSchema = TypeExports.Object(
  {
    source: ImagerSourceSchema,
    calibrationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    calibration: TypeExports.Optional(ImagerCalibrationSchema),
    options: TypeExports.Optional(ImagerRectifyOptionsSchema),
    output: TypeExports.Optional(
      TypeExports.Object(
        {
          format: TypeExports.Optional(ImagerImageFormatSchema),
          quality: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 100 })),
        },
        { additionalProperties: false },
      ),
    ),
  },
  {
    description: "Rectification request payload for imagers",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerRectifyRequest schema. */
export type ImagerRectifyRequest = Static<typeof ImagerRectifyRequestSchema>;

/** TypeBox schema for ImagerRectifyPayloadSchema. */
export const ImagerRectifyPayloadSchema = TypeExports.Object(
  {
    image: TypeExports.String({ minLength: 1 }),
    format: TypeExports.String(),
    width: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    height: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    calibrationId: TypeExports.Optional(TypeExports.String()),
    calibration: TypeExports.Optional(ImagerCalibrationSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerRectifyPayload schema. */
export type ImagerRectifyPayload = Static<typeof ImagerRectifyPayloadSchema>;

/** TypeBox schema for ImagerRectifyResponseSchema. */
export const ImagerRectifyResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: ImagerRectifyPayloadSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerRectifyResponse schema. */
export type ImagerRectifyResponse = Static<typeof ImagerRectifyResponseSchema>;
