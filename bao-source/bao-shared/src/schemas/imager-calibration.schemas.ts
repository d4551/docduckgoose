/**
 * Imager calibration and rectification schemas.
 *
 * Contract-first schemas for OpenCV-compatible camera calibration artifacts,
 * calibration request/response envelopes, and rectification pipelines.
 *
 * @shared/schemas/imager-calibration.schemas.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

import {
  ImagerCaptureOptionsSchema,
  ImagerImageFormatSchema,
  ImagerSourceSchema,
} from "./imager-source.schemas";

/**
 * Calibration artifact schema for optical correction (OpenCV-compatible).
 * Used by rectification pipelines and downstream consumers (scanner, XR, perception).
 */
export const ImagerCalibrationSchema: Type.TObject<
  {
    readonly cameraMatrix: Type.TArray<Type.TArray<Type.TNumber>>;
    readonly distCoeffs: Type.TArray<Type.TNumber>;
    readonly imageSize: Type.TObject<
      { readonly width: Type.TInteger; readonly height: Type.TInteger },
      "width" | "height",
      never
    >;
    readonly reprojectionError: Type.TOptional<Type.TNumber>;
    readonly version: Type.TOptional<Type.TString>;
  },
  "cameraMatrix" | "distCoeffs" | "imageSize",
  Type.InferOptionalKeys<{
    readonly cameraMatrix: Type.TArray<Type.TArray<Type.TNumber>>;
    readonly distCoeffs: Type.TArray<Type.TNumber>;
    readonly imageSize: Type.TObject<
      { readonly width: Type.TInteger; readonly height: Type.TInteger },
      "width" | "height",
      never
    >;
    readonly reprojectionError: Type.TOptional<Type.TNumber>;
    readonly version: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    cameraMatrix: Type.Array(Type.Array(Type.Number())),
    distCoeffs: Type.Array(Type.Number()),
    imageSize: Type.Object(
      {
        width: Type.Integer({ minimum: 1 }),
        height: Type.Integer({ minimum: 1 }),
      },
      { additionalProperties: false },
    ),
    reprojectionError: Type.Optional(Type.Number()),
    /** Artifact version for downstream pipeline consumers and replay. */
    version: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerCalibration schema. */
export type ImagerCalibration = Static<typeof ImagerCalibrationSchema>;

/** TypeBox schema for ImagerCalibrationRequestSchema. */
export const ImagerCalibrationRequestSchema = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
    images: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    capture: Type.Optional(ImagerCaptureOptionsSchema),
    samples: Type.Optional(Type.Integer({ minimum: 1 })),
    pattern: Type.Optional(Type.String({ minLength: 1 })),
    patternSize: Type.Optional(
      Type.Object(
        {
          width: Type.Integer({ minimum: 1 }),
          height: Type.Integer({ minimum: 1 }),
        },
        { additionalProperties: false },
      ),
    ),
    squareSizeMm: Type.Optional(Type.Number({ minimum: 0 })),
    expiresAt: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Number()])),
    validForDays: Type.Optional(Type.Number({ minimum: 0 })),
    validForHours: Type.Optional(Type.Number({ minimum: 0 })),
  },
  {
    description: "Calibration request payload for imager devices",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerCalibrationRequest schema. */
export type ImagerCalibrationRequest = Static<typeof ImagerCalibrationRequestSchema>;

/** TypeBox schema for ImagerCalibrationPayloadSchema. */
export const ImagerCalibrationPayloadSchema = Type.Object(
  {
    deviceId: Type.String(),
    calibrationId: Type.Union([Type.String(), Type.Null()]),
    imagesUsed: Type.Integer({ minimum: 0 }),
    calibration: ImagerCalibrationSchema,
    reprojectionError: Type.Optional(Type.Number()),
    source: Type.Optional(
      Type.Object(
        {
          baseUrl: Type.Optional(Type.String()),
          captured: Type.Boolean(),
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
export const ImagerCalibrationResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ImagerCalibrationPayloadSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerCalibrationResponse schema. */
export type ImagerCalibrationResponse = Static<typeof ImagerCalibrationResponseSchema>;

/** TypeBox schema for ImagerRectifyOptionsSchema. */
export const ImagerRectifyOptionsSchema: Type.TObject<
  { readonly alpha: Type.TOptional<Type.TNumber> },
  never,
  "alpha"
> = Type.Object(
  {
    alpha: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerRectifyRequestSchema. */
export const ImagerRectifyRequestSchema = Type.Object(
  {
    source: ImagerSourceSchema,
    calibrationId: Type.Optional(Type.String({ minLength: 1 })),
    calibration: Type.Optional(ImagerCalibrationSchema),
    options: Type.Optional(ImagerRectifyOptionsSchema),
    output: Type.Optional(
      Type.Object(
        {
          format: Type.Optional(ImagerImageFormatSchema),
          quality: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
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
export const ImagerRectifyPayloadSchema = Type.Object(
  {
    image: Type.String({ minLength: 1 }),
    format: Type.String(),
    width: Type.Optional(Type.Integer({ minimum: 1 })),
    height: Type.Optional(Type.Integer({ minimum: 1 })),
    calibrationId: Type.Optional(Type.String()),
    calibration: Type.Optional(ImagerCalibrationSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerRectifyPayload schema. */
export type ImagerRectifyPayload = Static<typeof ImagerRectifyPayloadSchema>;

/** TypeBox schema for ImagerRectifyResponseSchema. */
export const ImagerRectifyResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ImagerRectifyPayloadSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerRectifyResponse schema. */
export type ImagerRectifyResponse = Static<typeof ImagerRectifyResponseSchema>;
