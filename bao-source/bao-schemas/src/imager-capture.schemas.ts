/**
 * Imager capture schemas.
 *
 * Contract-first schemas for sync trigger capabilities, focus stacking,
 * low-latency streaming, HDR multi-exposure, and synchronized capture.
 *
 * @shared/schemas/imager-capture.schemas.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

import { ImagerCaptureOptionsSchema } from "./imager-source.schemas";

// SYNCHRONIZED CAPTURE

/**
 * Capability flag for sync/trigger support (used when surfacing device capabilities).
 */
export const ImagerSyncTriggerCapabilitySchema: TObject<
  {
    readonly hardwareTrigger: TOptional<TBoolean>;
    readonly multiCamera: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly hardwareTrigger: TOptional<TBoolean>;
    readonly multiCamera: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    hardwareTrigger: TypeExports.Optional(TypeExports.Boolean()),
    multiCamera: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerSyncTriggerCapability schema. */
export type ImagerSyncTriggerCapability = Static<typeof ImagerSyncTriggerCapabilitySchema>;

// FOCUS STACKING (P2 – Microscopy)

/**
 * Focus stacking capture request (N focal planes → fused image).
 */
export const FocusStackCaptureRequestSchema = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1 }),
    /** Number of focal planes to capture (default from policy). */
    planeCount: TypeExports.Optional(TypeExports.Integer({ minimum: 2 })),
    /** Optional focus positions (relative steps); when omitted, auto-bracketing. */
    focusPositions: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    capture: TypeExports.Optional(ImagerCaptureOptionsSchema),
  },
  {
    description: "Multi-focus capture for focus stacking",
    additionalProperties: false,
  },
);

/** Inferred type from the FocusStackCaptureRequest schema. */
export type FocusStackCaptureRequest = Static<typeof FocusStackCaptureRequestSchema>;

/**
 * Focus stacking capture response.
 */
export const FocusStackCaptureResponseSchema: TObject<
  {
    readonly image: TString;
    readonly format: TString;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly planeCount: TInteger;
    readonly focusZones: TOptional<
      TArray<
        TObject<{ readonly index: TInteger; readonly score: TOptional<TNumber> }, "index", "score">
      >
    >;
  },
  "format" | "width" | "height" | "image" | "planeCount",
  "focusZones"
> = TypeExports.Object(
  {
    image: TypeExports.String(),
    format: TypeExports.String(),
    width: TypeExports.Integer(),
    height: TypeExports.Integer(),
    planeCount: TypeExports.Integer(),
    focusZones: TypeExports.Optional(
      TypeExports.Array(
        TypeExports.Object(
          {
            index: TypeExports.Integer(),
            score: TypeExports.Optional(TypeExports.Number()),
          },
          { additionalProperties: false },
        ),
      ),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the FocusStackCaptureResponse schema. */
export type FocusStackCaptureResponse = Static<typeof FocusStackCaptureResponseSchema>;

// LOW-LATENCY STREAMING (P2)

/**
 * Streaming mode for imager preview.
 */
export const ImagerStreamingModeSchema: TUnion<
  (TLiteral<"mjpeg"> | TLiteral<"webrtc"> | TLiteral<"websocket">)[]
> = TypeExports.Union(
  [TypeExports.Literal("mjpeg"), TypeExports.Literal("webrtc"), TypeExports.Literal("websocket")],
  {},
);

/** Inferred type from the ImagerStreamingMode schema. */
export type ImagerStreamingMode = Static<typeof ImagerStreamingModeSchema>;

/**
 * Low-latency streaming config (FPS/quality tradeoff).
 */
export const ImagerStreamingConfigSchema: TObject<
  {
    readonly mode: TOptional<
      TUnion<(TLiteral<"mjpeg"> | TLiteral<"webrtc"> | TLiteral<"websocket">)[]>
    >;
    readonly fps: TOptional<TInteger>;
    readonly quality: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly mode: TOptional<
      TUnion<(TLiteral<"mjpeg"> | TLiteral<"webrtc"> | TLiteral<"websocket">)[]>
    >;
    readonly fps: TOptional<TInteger>;
    readonly quality: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    mode: TypeExports.Optional(ImagerStreamingModeSchema),
    fps: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 60 })),
    quality: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 100 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerStreamingConfig schema. */
export type ImagerStreamingConfig = Static<typeof ImagerStreamingConfigSchema>;

// HDR / MULTI-EXPOSURE (P2)

/**
 * Multi-exposure capture request (exposure bracketing → HDR fusion).
 */
export const HdrCaptureRequestSchema = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1 }),
    /** EV steps for bracketing (e.g. [-2, 0, 2]). */
    exposureStops: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    /** Or number of exposures with auto spacing. */
    exposureCount: TypeExports.Optional(TypeExports.Integer({ minimum: 2 })),
    capture: TypeExports.Optional(ImagerCaptureOptionsSchema),
  },
  {
    description: "Multi-exposure capture for HDR fusion",
    additionalProperties: false,
  },
);

/** Inferred type from the HdrCaptureRequest schema. */
export type HdrCaptureRequest = Static<typeof HdrCaptureRequestSchema>;

/**
 * HDR capture response.
 */
export const HdrCaptureResponseSchema: TObject<
  {
    readonly image: TString;
    readonly format: TString;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly exposureCount: TInteger;
  },
  "exposureCount" | "width" | "height" | "format" | "image",
  never
> = TypeExports.Object(
  {
    image: TypeExports.String(),
    format: TypeExports.String(),
    width: TypeExports.Integer(),
    height: TypeExports.Integer(),
    exposureCount: TypeExports.Integer(),
  },
  { additionalProperties: false },
);

/** Inferred type from the HdrCaptureResponse schema. */
export type HdrCaptureResponse = Static<typeof HdrCaptureResponseSchema>;

// SYNCHRONIZED CAPTURE (continued)

/** TypeBox schema for ImagerSyncCaptureRequestSchema. */
export const ImagerSyncCaptureRequestSchema = TypeExports.Object(
  {
    deviceIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    capture: TypeExports.Optional(ImagerCaptureOptionsSchema),
    /** Correlation ID for traceability and replay. */
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Idempotency key for deduplication; repeated requests with same key return cached result. */
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    description: "Synchronized capture request payload for imagers",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerSyncCaptureRequest schema. */
export type ImagerSyncCaptureRequest = Static<typeof ImagerSyncCaptureRequestSchema>;

/** TypeBox schema for ImagerSyncCaptureResultSchema. */
export const ImagerSyncCaptureResultSchema: TObject<
  {
    readonly deviceId: TString;
    readonly success: TBoolean;
    readonly image: TOptional<TString>;
    readonly width: TOptional<TNumber>;
    readonly height: TOptional<TNumber>;
    readonly format: TOptional<TString>;
    readonly timestamp: TOptional<TString>;
    readonly error: TOptional<TString>;
  },
  "deviceId" | "success",
  InferOptionalKeys<{
    readonly deviceId: TString;
    readonly success: TBoolean;
    readonly image: TOptional<TString>;
    readonly width: TOptional<TNumber>;
    readonly height: TOptional<TNumber>;
    readonly format: TOptional<TString>;
    readonly timestamp: TOptional<TString>;
    readonly error: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    deviceId: TypeExports.String(),
    success: TypeExports.Boolean(),
    image: TypeExports.Optional(TypeExports.String()),
    width: TypeExports.Optional(TypeExports.Number()),
    height: TypeExports.Optional(TypeExports.Number()),
    format: TypeExports.Optional(TypeExports.String()),
    timestamp: TypeExports.Optional(TypeExports.String()),
    error: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerSyncCaptureResult schema. */
export type ImagerSyncCaptureResult = Static<typeof ImagerSyncCaptureResultSchema>;

/** TypeBox schema for ImagerSyncCaptureResponseSchema. */
export const ImagerSyncCaptureResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Object(
      {
        results: TypeExports.Array(ImagerSyncCaptureResultSchema),
        /** Correlation ID when provided in request (for traceability). */
        correlationId: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerSyncCaptureResponse schema. */
export type ImagerSyncCaptureResponse = Static<typeof ImagerSyncCaptureResponseSchema>;
