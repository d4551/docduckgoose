/**
 * Imager preprocess schemas.
 *
 * Contract-first schemas for GPU preprocessing, model input profiles,
 * preprocessing operations, and preprocess pipeline request/response.
 *
 * @shared/schemas/imager-preprocess.schemas.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

import { ImagerImageFormatSchema, ImagerSourceSchema } from "./imager-source.schemas";

const CHANNELS_GRAYSCALE = 1;
const CHANNELS_RGB = 3;

// GPU PREPROCESSING / MODEL INPUT PROFILES

/**
 * Model input profile for GPU preprocessing and inference.
 *
 * Defines resolution, normalization, and format expected by models.
 */
export const ModelInputProfileSchema = Type.Object(
  {
    /** Target width for resize. */
    width: Type.Integer({ minimum: 1 }),
    /** Target height for resize. */
    height: Type.Integer({ minimum: 1 }),
    /** Per-channel mean for normalization (e.g. ImageNet [0.485, 0.456, 0.406]). */
    mean: Type.Optional(Type.Array(Type.Number())),
    /** Per-channel std for normalization (e.g. ImageNet [0.229, 0.224, 0.225]). */
    std: Type.Optional(Type.Array(Type.Number())),
    /** Output channels: 1 (grayscale) or 3 (RGB). */
    channels: Type.Optional(
      Type.Union([Type.Literal(CHANNELS_GRAYSCALE), Type.Literal(CHANNELS_RGB)]),
    ),
    /** Output format for inference (base64 image or tensor). */
    format: Type.Optional(
      Type.Union([Type.Literal("base64"), Type.Literal("float32"), Type.Literal("uint8")]),
    ),
  },
  {
    description: "Model input profile for GPU preprocessing",
    additionalProperties: false,
  },
);

/** Inferred type from the ModelInputProfile schema. */
export type ModelInputProfile = Static<typeof ModelInputProfileSchema>;

/**
 * GPU preprocess request (typed API for GPU bunbuddy).
 */
export const GpuPreprocessRequestSchema = Type.Object(
  {
    image: Type.String({ minLength: 1 }),
    profileId: Type.Optional(Type.String({ minLength: 1 })),
    profile: Type.Optional(ModelInputProfileSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the GpuPreprocessRequest schema. */
export type GpuPreprocessRequest = Static<typeof GpuPreprocessRequestSchema>;

/**
 * GPU preprocess response (typed API for GPU bunbuddy).
 */
export const GpuPreprocessResponseSchema: Type.TObject<
  {
    readonly image: Type.TString;
    readonly format: Type.TString;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly latencyMs: Type.TOptional<Type.TNumber>;
  },
  "image" | "format" | "width" | "height",
  "latencyMs"
> = Type.Object(
  {
    image: Type.String(),
    format: Type.String(),
    width: Type.Integer(),
    height: Type.Integer(),
    latencyMs: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** Inferred type from the GpuPreprocessResponse schema. */
export type GpuPreprocessResponse = Static<typeof GpuPreprocessResponseSchema>;

// PREPROCESSING

/**
 * Supported preprocessing operation identifiers.
 */
export const IMAGER_PREPROCESS_OP_TYPES: readonly [
  "resize",
  "normalize",
  "grayscale",
  "blur",
  "sharpen",
  "edges",
  "equalizeHist",
  "clahe",
  "denoise",
] = [
  "resize",
  "normalize",
  "grayscale",
  "blur",
  "sharpen",
  "edges",
  "equalizeHist",
  "clahe",
  "denoise",
] as const;

/** TypeBox schema for ImagerResizeOpSchema. */
export const ImagerResizeOpSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"resize">;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly interpolation: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"nearest">
          | Type.TLiteral<"linear">
          | Type.TLiteral<"area">
          | Type.TLiteral<"cubic">
          | Type.TLiteral<"lanczos">
        )[]
      >
    >;
  },
  "width" | "height" | "type",
  "interpolation"
> = Type.Object(
  {
    type: Type.Literal("resize"),
    width: Type.Integer({ minimum: 1 }),
    height: Type.Integer({ minimum: 1 }),
    interpolation: Type.Optional(
      Type.Union([
        Type.Literal("nearest"),
        Type.Literal("linear"),
        Type.Literal("area"),
        Type.Literal("cubic"),
        Type.Literal("lanczos"),
      ]),
    ),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerNormalizeOpSchema. */
export const ImagerNormalizeOpSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"normalize">;
    readonly alpha: Type.TNumber;
    readonly beta: Type.TNumber;
    readonly normType: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"minmax"> | Type.TLiteral<"l1"> | Type.TLiteral<"l2">)[]>
    >;
  },
  "type" | "alpha" | "beta",
  "normType"
> = Type.Object(
  {
    type: Type.Literal("normalize"),
    alpha: Type.Number(),
    beta: Type.Number(),
    normType: Type.Optional(
      Type.Union([Type.Literal("minmax"), Type.Literal("l1"), Type.Literal("l2")]),
    ),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerGrayscaleOpSchema. */
export const ImagerGrayscaleOpSchema: Type.TObject<
  { readonly type: Type.TLiteral<"grayscale"> },
  "type",
  never
> = Type.Object(
  {
    type: Type.Literal("grayscale"),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerBlurOpSchema. */
export const ImagerBlurOpSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"blur">;
    readonly kernelSize: Type.TInteger;
    readonly sigmaX: Type.TOptional<Type.TNumber>;
    readonly sigmaY: Type.TOptional<Type.TNumber>;
  },
  "type" | "kernelSize",
  Type.InferOptionalKeys<{
    readonly type: Type.TLiteral<"blur">;
    readonly kernelSize: Type.TInteger;
    readonly sigmaX: Type.TOptional<Type.TNumber>;
    readonly sigmaY: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    type: Type.Literal("blur"),
    kernelSize: Type.Integer({ minimum: 1 }),
    sigmaX: Type.Optional(Type.Number()),
    sigmaY: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerSharpenOpSchema. */
export const ImagerSharpenOpSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"sharpen">;
    readonly kernel: Type.TArray<Type.TArray<Type.TNumber>>;
    readonly scale: Type.TOptional<Type.TNumber>;
    readonly delta: Type.TOptional<Type.TNumber>;
  },
  "type" | "kernel",
  Type.InferOptionalKeys<{
    readonly type: Type.TLiteral<"sharpen">;
    readonly kernel: Type.TArray<Type.TArray<Type.TNumber>>;
    readonly scale: Type.TOptional<Type.TNumber>;
    readonly delta: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    type: Type.Literal("sharpen"),
    kernel: Type.Array(Type.Array(Type.Number())),
    scale: Type.Optional(Type.Number()),
    delta: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerEdgesOpSchema. */
export const ImagerEdgesOpSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"edges">;
    readonly threshold1: Type.TNumber;
    readonly threshold2: Type.TNumber;
  },
  "type" | "threshold1" | "threshold2",
  never
> = Type.Object(
  {
    type: Type.Literal("edges"),
    threshold1: Type.Number(),
    threshold2: Type.Number(),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerEqualizeOpSchema. */
export const ImagerEqualizeOpSchema: Type.TObject<
  { readonly type: Type.TLiteral<"equalizeHist"> },
  "type",
  never
> = Type.Object(
  {
    type: Type.Literal("equalizeHist"),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerClaheOpSchema. */
export const ImagerClaheOpSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"clahe">;
    readonly clipLimit: Type.TNumber;
    readonly tileGridSize: Type.TInteger;
  },
  "type" | "clipLimit" | "tileGridSize",
  never
> = Type.Object(
  {
    type: Type.Literal("clahe"),
    clipLimit: Type.Number(),
    tileGridSize: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerDenoiseOpSchema. */
export const ImagerDenoiseOpSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"denoise">;
    readonly h: Type.TNumber;
    readonly hColor: Type.TOptional<Type.TNumber>;
    readonly templateWindowSize: Type.TOptional<Type.TInteger>;
    readonly searchWindowSize: Type.TOptional<Type.TInteger>;
  },
  "type" | "h",
  Type.InferOptionalKeys<{
    readonly type: Type.TLiteral<"denoise">;
    readonly h: Type.TNumber;
    readonly hColor: Type.TOptional<Type.TNumber>;
    readonly templateWindowSize: Type.TOptional<Type.TInteger>;
    readonly searchWindowSize: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    type: Type.Literal("denoise"),
    h: Type.Number(),
    hColor: Type.Optional(Type.Number()),
    templateWindowSize: Type.Optional(Type.Integer({ minimum: 1 })),
    searchWindowSize: Type.Optional(Type.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerPreprocessOperationSchema. */
export const ImagerPreprocessOperationSchema = Type.Union(
  [
    ImagerResizeOpSchema,
    ImagerNormalizeOpSchema,
    ImagerGrayscaleOpSchema,
    ImagerBlurOpSchema,
    ImagerSharpenOpSchema,
    ImagerEdgesOpSchema,
    ImagerEqualizeOpSchema,
    ImagerClaheOpSchema,
    ImagerDenoiseOpSchema,
  ],
  {},
);

/** Inferred type from the ImagerPreprocessOperation schema. */
export type ImagerPreprocessOperation = Static<typeof ImagerPreprocessOperationSchema>;

/** TypeBox schema for ImagerPreprocessPipelineSchema. */
export const ImagerPreprocessPipelineSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.Optional(Type.String({ minLength: 1 })),
    operations: Type.Array(ImagerPreprocessOperationSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerPreprocessPipeline schema. */
export type ImagerPreprocessPipeline = Static<typeof ImagerPreprocessPipelineSchema>;

/**
 * Inference-ready preprocess request (model input profile application).
 */
export const InferenceReadyPreprocessRequestSchema = Type.Object(
  {
    source: ImagerSourceSchema,
    profileId: Type.Optional(Type.String({ minLength: 1 })),
    profile: Type.Optional(ModelInputProfileSchema),
  },
  {
    description: "Preprocess to model input format (resolution, normalization)",
    additionalProperties: false,
  },
);

/** Inferred type from the InferenceReadyPreprocessRequest schema. */
export type InferenceReadyPreprocessRequest = Static<typeof InferenceReadyPreprocessRequestSchema>;

/**
 * Inference-ready preprocess response.
 */
export const InferenceReadyPreprocessResponseSchema: Type.TObject<
  {
    readonly image: Type.TString;
    readonly format: Type.TString;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly profileId: Type.TOptional<Type.TString>;
  },
  "width" | "height" | "image" | "format",
  "profileId"
> = Type.Object(
  {
    image: Type.String(),
    format: Type.String(),
    width: Type.Integer(),
    height: Type.Integer(),
    profileId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the InferenceReadyPreprocessResponse schema. */
export type InferenceReadyPreprocessResponse = Static<
  typeof InferenceReadyPreprocessResponseSchema
>;

/** TypeBox schema for ImagerPreprocessRequestSchema. */
export const ImagerPreprocessRequestSchema = Type.Object(
  {
    source: ImagerSourceSchema,
    pipelineId: Type.Optional(Type.String({ minLength: 1 })),
    operations: Type.Optional(Type.Array(ImagerPreprocessOperationSchema)),
    /** When set, apply model input profile for inference-ready output. */
    inferenceProfileId: Type.Optional(Type.String({ minLength: 1 })),
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
    description: "Preprocess pipeline request payload for imagers",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerPreprocessRequest schema. */
export type ImagerPreprocessRequest = Static<typeof ImagerPreprocessRequestSchema>;

/** TypeBox schema for ImagerPreprocessPayloadSchema. */
export const ImagerPreprocessPayloadSchema = Type.Object(
  {
    image: Type.String({ minLength: 1 }),
    format: Type.String(),
    width: Type.Optional(Type.Integer({ minimum: 1 })),
    height: Type.Optional(Type.Integer({ minimum: 1 })),
    operations: Type.Array(ImagerPreprocessOperationSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerPreprocessPayload schema. */
export type ImagerPreprocessPayload = Static<typeof ImagerPreprocessPayloadSchema>;

/** TypeBox schema for ImagerPreprocessResponseSchema. */
export const ImagerPreprocessResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ImagerPreprocessPayloadSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerPreprocessResponse schema. */
export type ImagerPreprocessResponse = Static<typeof ImagerPreprocessResponseSchema>;
