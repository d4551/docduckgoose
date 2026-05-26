/**
 * SplatBao steamer pipeline schemas.
 *
 * Request/response contracts for the steamer pipeline (detection, depth,
 * zero-shot, future SAM). Kept separate from SplatbaoLocalDetectionRequestSchema
 * to allow SAM prompt fields (points, boxes, text) without breaking changes.
 *
 * @shared/schemas/splatbao-steamer
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  type SplatbaoLocalDetectionResponse,
  SplatbaoLocalDetectionResponseSchema,
} from "./splatbao-perception.schemas.ts";

// Detect

/**
 * Steamer detect request (object detection via DETR/OWL-ViT).
 */
export const SplatbaoSteamerDetectRequestSchema: Type.TObject<
  { readonly image: Type.TString; readonly threshold: Type.TOptional<Type.TNumber> },
  "image",
  "threshold"
> = Type.Object(
  {
    image: Type.String({ minLength: 1, description: "Base64-encoded image" }),
    threshold: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
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
export const SplatbaoSteamerDepthRequestSchema: Type.TObject<
  { readonly image: Type.TString },
  "image",
  never
> = Type.Object(
  {
    image: Type.String({ minLength: 1, description: "Base64-encoded image" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoSteamerDepthRequest. */
export type SplatbaoSteamerDepthRequest = Static<typeof SplatbaoSteamerDepthRequestSchema>;

/**
 * Steamer depth response (depth map + metadata).
 */
export const SplatbaoSteamerDepthResponseSchema: Type.TObject<
  {
    readonly depthImage: Type.TString;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly inferenceMs: Type.TNumber;
  },
  "depthImage" | "width" | "height" | "inferenceMs",
  never
> = Type.Object(
  {
    depthImage: Type.String({ minLength: 1, description: "Base64-encoded Float32 depth image" }),
    width: Type.Integer({ minimum: 1 }),
    height: Type.Integer({ minimum: 1 }),
    inferenceMs: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoSteamerDepthResponse. */
export type SplatbaoSteamerDepthResponse = Static<typeof SplatbaoSteamerDepthResponseSchema>;

// Zero-shot

/**
 * Steamer zero-shot detect request (OWL-ViT with text labels).
 */
export const SplatbaoSteamerZeroShotRequestSchema: Type.TObject<
  {
    readonly image: Type.TString;
    readonly candidateLabels: Type.TArray<Type.TString>;
    readonly threshold: Type.TOptional<Type.TNumber>;
  },
  "candidateLabels" | "image",
  "threshold"
> = Type.Object(
  {
    image: Type.String({ minLength: 1, description: "Base64-encoded image" }),
    candidateLabels: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    threshold: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
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
