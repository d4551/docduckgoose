/**
 * SplatBao steamer pipeline schemas.
 *
 * Request/response contracts for the steamer pipeline (detection, depth,
 * zero-shot, future SAM). Kept separate from SplatbaoLocalDetectionRequestSchema
 * to allow SAM prompt fields (points, boxes, text) without breaking changes.
 *
 * @shared/schemas/splatbao-steamer
 */

import type {
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
  type SplatbaoLocalDetectionResponse,
  SplatbaoLocalDetectionResponseSchema,
} from "./splatbao-perception.schemas.ts";

// Detect

/**
 * Steamer detect request (object detection via DETR/OWL-ViT).
 */
export const SplatbaoSteamerDetectRequestSchema: TObject<
  { readonly image: TString; readonly threshold: TOptional<TNumber> },
  "image",
  "threshold"
> = TypeExports.Object(
  {
    image: TypeExports.String({ minLength: 1, description: "Base64-encoded image" }),
    threshold: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoSteamerDetectRequest. */
export type SplatbaoSteamerDetectRequest = Static<typeof SplatbaoSteamerDetectRequestSchema>;

/**
 * Steamer detect response (wraps SplatbaoLocalDetectionResponse).
 */
export const SplatbaoSteamerDetectResponseSchema = SplatbaoLocalDetectionResponseSchema;

/** Type SplatbaoSteamerDetectResponse. */
export type SplatbaoSteamerDetectResponse = SplatbaoLocalDetectionResponse;

// Depth

/**
 * Steamer depth request.
 */
export const SplatbaoSteamerDepthRequestSchema: TObject<
  { readonly image: TString },
  "image",
  never
> = TypeExports.Object(
  {
    image: TypeExports.String({ minLength: 1, description: "Base64-encoded image" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoSteamerDepthRequest. */
export type SplatbaoSteamerDepthRequest = Static<typeof SplatbaoSteamerDepthRequestSchema>;

/**
 * Steamer depth response (depth map + metadata).
 */
export const SplatbaoSteamerDepthResponseSchema: TObject<
  {
    readonly depthImage: TString;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly inferenceMs: TNumber;
  },
  "depthImage" | "width" | "height" | "inferenceMs",
  never
> = TypeExports.Object(
  {
    depthImage: TypeExports.String({
      minLength: 1,
      description: "Base64-encoded Float32 depth image",
    }),
    width: TypeExports.Integer({ minimum: 1 }),
    height: TypeExports.Integer({ minimum: 1 }),
    inferenceMs: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoSteamerDepthResponse. */
export type SplatbaoSteamerDepthResponse = Static<typeof SplatbaoSteamerDepthResponseSchema>;

// Zero-shot

/**
 * Steamer zero-shot detect request (OWL-ViT with text labels).
 */
export const SplatbaoSteamerZeroShotRequestSchema: TObject<
  {
    readonly image: TString;
    readonly candidateLabels: TArray<TString>;
    readonly threshold: TOptional<TNumber>;
  },
  "candidateLabels" | "image",
  "threshold"
> = TypeExports.Object(
  {
    image: TypeExports.String({ minLength: 1, description: "Base64-encoded image" }),
    candidateLabels: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    threshold: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoSteamerZeroShotRequest. */
export type SplatbaoSteamerZeroShotRequest = Static<typeof SplatbaoSteamerZeroShotRequestSchema>;

/**
 * Steamer zero-shot detect response (wraps SplatbaoLocalDetectionResponse).
 */
export const SplatbaoSteamerZeroShotResponseSchema = SplatbaoLocalDetectionResponseSchema;

/** Type SplatbaoSteamerZeroShotResponse. */
export type SplatbaoSteamerZeroShotResponse = SplatbaoLocalDetectionResponse;
