/**
 * Imager preprocess schemas.
 *
 * Contract-first schemas for GPU preprocessing, model input profiles,
 * preprocessing operations, and preprocess pipeline request/response.
 *
 * @shared/schemas/imager-preprocess.schemas.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TInteger,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

import { ImagerImageFormatSchema, ImagerSourceSchema } from "./imager-source.schemas";

const CHANNELS_GRAYSCALE = 1;
const CHANNELS_RGB = 3;

// GPU PREPROCESSING / MODEL INPUT PROFILES

/**
 * Model input profile for GPU preprocessing and inference.
 *
 * Defines resolution, normalization, and format expected by models.
 */
export const ModelInputProfileSchema = TypeExports.Object(
  {
    /** Target width for resize. */
    width: TypeExports.Integer({ minimum: 1 }),
    /** Target height for resize. */
    height: TypeExports.Integer({ minimum: 1 }),
    /** Per-channel mean for normalization (e.g. ImageNet [0.485, 0.456, 0.406]). */
    mean: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    /** Per-channel std for normalization (e.g. ImageNet [0.229, 0.224, 0.225]). */
    std: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    /** Output channels: 1 (grayscale) or 3 (RGB). */
    channels: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal(CHANNELS_GRAYSCALE),
        TypeExports.Literal(CHANNELS_RGB),
      ]),
    ),
    /** Output format for inference (base64 image or tensor). */
    format: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("base64"),
        TypeExports.Literal("float32"),
        TypeExports.Literal("uint8"),
      ]),
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
export const GpuPreprocessRequestSchema = TypeExports.Object(
  {
    image: TypeExports.String({ minLength: 1 }),
    profileId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    profile: TypeExports.Optional(ModelInputProfileSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the GpuPreprocessRequest schema. */
export type GpuPreprocessRequest = Static<typeof GpuPreprocessRequestSchema>;

/**
 * GPU preprocess response (typed API for GPU bunbuddy).
 */
export const GpuPreprocessResponseSchema: TObject<
  {
    readonly image: TString;
    readonly format: TString;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly latencyMs: TOptional<TNumber>;
  },
  "image" | "format" | "width" | "height",
  "latencyMs"
> = TypeExports.Object(
  {
    image: TypeExports.String(),
    format: TypeExports.String(),
    width: TypeExports.Integer(),
    height: TypeExports.Integer(),
    latencyMs: TypeExports.Optional(TypeExports.Number()),
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
export const ImagerResizeOpSchema: TObject<
  {
    readonly type: TLiteral<"resize">;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly interpolation: TOptional<
      TUnion<
        (
          | TLiteral<"nearest">
          | TLiteral<"linear">
          | TLiteral<"area">
          | TLiteral<"cubic">
          | TLiteral<"lanczos">
        )[]
      >
    >;
  },
  "width" | "height" | "type",
  "interpolation"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("resize"),
    width: TypeExports.Integer({ minimum: 1 }),
    height: TypeExports.Integer({ minimum: 1 }),
    interpolation: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("nearest"),
        TypeExports.Literal("linear"),
        TypeExports.Literal("area"),
        TypeExports.Literal("cubic"),
        TypeExports.Literal("lanczos"),
      ]),
    ),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerNormalizeOpSchema. */
export const ImagerNormalizeOpSchema: TObject<
  {
    readonly type: TLiteral<"normalize">;
    readonly alpha: TNumber;
    readonly beta: TNumber;
    readonly normType: TOptional<TUnion<(TLiteral<"minmax"> | TLiteral<"l1"> | TLiteral<"l2">)[]>>;
  },
  "type" | "alpha" | "beta",
  "normType"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("normalize"),
    alpha: TypeExports.Number(),
    beta: TypeExports.Number(),
    normType: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("minmax"),
        TypeExports.Literal("l1"),
        TypeExports.Literal("l2"),
      ]),
    ),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerGrayscaleOpSchema. */
export const ImagerGrayscaleOpSchema: TObject<
  { readonly type: TLiteral<"grayscale"> },
  "type",
  never
> = TypeExports.Object(
  {
    type: TypeExports.Literal("grayscale"),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerBlurOpSchema. */
export const ImagerBlurOpSchema: TObject<
  {
    readonly type: TLiteral<"blur">;
    readonly kernelSize: TInteger;
    readonly sigmaX: TOptional<TNumber>;
    readonly sigmaY: TOptional<TNumber>;
  },
  "type" | "kernelSize",
  InferOptionalKeys<{
    readonly type: TLiteral<"blur">;
    readonly kernelSize: TInteger;
    readonly sigmaX: TOptional<TNumber>;
    readonly sigmaY: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    type: TypeExports.Literal("blur"),
    kernelSize: TypeExports.Integer({ minimum: 1 }),
    sigmaX: TypeExports.Optional(TypeExports.Number()),
    sigmaY: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerSharpenOpSchema. */
export const ImagerSharpenOpSchema: TObject<
  {
    readonly type: TLiteral<"sharpen">;
    readonly kernel: TArray<TArray<TNumber>>;
    readonly scale: TOptional<TNumber>;
    readonly delta: TOptional<TNumber>;
  },
  "type" | "kernel",
  InferOptionalKeys<{
    readonly type: TLiteral<"sharpen">;
    readonly kernel: TArray<TArray<TNumber>>;
    readonly scale: TOptional<TNumber>;
    readonly delta: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    type: TypeExports.Literal("sharpen"),
    kernel: TypeExports.Array(TypeExports.Array(TypeExports.Number())),
    scale: TypeExports.Optional(TypeExports.Number()),
    delta: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerEdgesOpSchema. */
export const ImagerEdgesOpSchema: TObject<
  {
    readonly type: TLiteral<"edges">;
    readonly threshold1: TNumber;
    readonly threshold2: TNumber;
  },
  "type" | "threshold1" | "threshold2",
  never
> = TypeExports.Object(
  {
    type: TypeExports.Literal("edges"),
    threshold1: TypeExports.Number(),
    threshold2: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerEqualizeOpSchema. */
export const ImagerEqualizeOpSchema: TObject<
  { readonly type: TLiteral<"equalizeHist"> },
  "type",
  never
> = TypeExports.Object(
  {
    type: TypeExports.Literal("equalizeHist"),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerClaheOpSchema. */
export const ImagerClaheOpSchema: TObject<
  {
    readonly type: TLiteral<"clahe">;
    readonly clipLimit: TNumber;
    readonly tileGridSize: TInteger;
  },
  "type" | "clipLimit" | "tileGridSize",
  never
> = TypeExports.Object(
  {
    type: TypeExports.Literal("clahe"),
    clipLimit: TypeExports.Number(),
    tileGridSize: TypeExports.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerDenoiseOpSchema. */
export const ImagerDenoiseOpSchema: TObject<
  {
    readonly type: TLiteral<"denoise">;
    readonly h: TNumber;
    readonly hColor: TOptional<TNumber>;
    readonly templateWindowSize: TOptional<TInteger>;
    readonly searchWindowSize: TOptional<TInteger>;
  },
  "type" | "h",
  InferOptionalKeys<{
    readonly type: TLiteral<"denoise">;
    readonly h: TNumber;
    readonly hColor: TOptional<TNumber>;
    readonly templateWindowSize: TOptional<TInteger>;
    readonly searchWindowSize: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    type: TypeExports.Literal("denoise"),
    h: TypeExports.Number(),
    hColor: TypeExports.Optional(TypeExports.Number()),
    templateWindowSize: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    searchWindowSize: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for ImagerPreprocessOperationSchema. */
export const ImagerPreprocessOperationSchema = TypeExports.Union(
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
export const ImagerPreprocessPipelineSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    operations: TypeExports.Array(ImagerPreprocessOperationSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerPreprocessPipeline schema. */
export type ImagerPreprocessPipeline = Static<typeof ImagerPreprocessPipelineSchema>;

/**
 * Inference-ready preprocess request (model input profile application).
 */
export const InferenceReadyPreprocessRequestSchema = TypeExports.Object(
  {
    source: ImagerSourceSchema,
    profileId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    profile: TypeExports.Optional(ModelInputProfileSchema),
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
export const InferenceReadyPreprocessResponseSchema: TObject<
  {
    readonly image: TString;
    readonly format: TString;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly profileId: TOptional<TString>;
  },
  "width" | "height" | "image" | "format",
  "profileId"
> = TypeExports.Object(
  {
    image: TypeExports.String(),
    format: TypeExports.String(),
    width: TypeExports.Integer(),
    height: TypeExports.Integer(),
    profileId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the InferenceReadyPreprocessResponse schema. */
export type InferenceReadyPreprocessResponse = Static<
  typeof InferenceReadyPreprocessResponseSchema
>;

/** TypeBox schema for ImagerPreprocessRequestSchema. */
export const ImagerPreprocessRequestSchema = TypeExports.Object(
  {
    source: ImagerSourceSchema,
    pipelineId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    operations: TypeExports.Optional(TypeExports.Array(ImagerPreprocessOperationSchema)),
    /** When set, apply model input profile for inference-ready output. */
    inferenceProfileId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
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
    description: "Preprocess pipeline request payload for imagers",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerPreprocessRequest schema. */
export type ImagerPreprocessRequest = Static<typeof ImagerPreprocessRequestSchema>;

/** TypeBox schema for ImagerPreprocessPayloadSchema. */
export const ImagerPreprocessPayloadSchema = TypeExports.Object(
  {
    image: TypeExports.String({ minLength: 1 }),
    format: TypeExports.String(),
    width: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    height: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    operations: TypeExports.Array(ImagerPreprocessOperationSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerPreprocessPayload schema. */
export type ImagerPreprocessPayload = Static<typeof ImagerPreprocessPayloadSchema>;

/** TypeBox schema for ImagerPreprocessResponseSchema. */
export const ImagerPreprocessResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: ImagerPreprocessPayloadSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerPreprocessResponse schema. */
export type ImagerPreprocessResponse = Static<typeof ImagerPreprocessResponseSchema>;
