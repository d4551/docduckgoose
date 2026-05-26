/**
 * Imager capture schemas.
 *
 * Contract-first schemas for sync trigger capabilities, focus stacking,
 * low-latency streaming, HDR multi-exposure, and synchronized capture.
 *
 * @shared/schemas/imager-capture.schemas.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

import { ImagerCaptureOptionsSchema } from "./imager-source.schemas";

// SYNCHRONIZED CAPTURE

/**
 * Capability flag for sync/trigger support (used when surfacing device capabilities).
 */
export const ImagerSyncTriggerCapabilitySchema: Type.TObject<
  {
    readonly hardwareTrigger: Type.TOptional<Type.TBoolean>;
    readonly multiCamera: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly hardwareTrigger: Type.TOptional<Type.TBoolean>;
    readonly multiCamera: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    hardwareTrigger: Type.Optional(Type.Boolean()),
    multiCamera: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerSyncTriggerCapability schema. */
export type ImagerSyncTriggerCapability = Static<typeof ImagerSyncTriggerCapabilitySchema>;

// FOCUS STACKING (P2 – Microscopy)

/**
 * Focus stacking capture request (N focal planes → fused image).
 */
export const FocusStackCaptureRequestSchema = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
    /** Number of focal planes to capture (default from policy). */
    planeCount: Type.Optional(Type.Integer({ minimum: 2 })),
    /** Optional focus positions (relative steps); when omitted, auto-bracketing. */
    focusPositions: Type.Optional(Type.Array(Type.Number())),
    capture: Type.Optional(ImagerCaptureOptionsSchema),
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
export const FocusStackCaptureResponseSchema: Type.TObject<
  {
    readonly image: Type.TString;
    readonly format: Type.TString;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly planeCount: Type.TInteger;
    readonly focusZones: Type.TOptional<
      Type.TArray<
        Type.TObject<
          { readonly index: Type.TInteger; readonly score: Type.TOptional<Type.TNumber> },
          "index",
          "score"
        >
      >
    >;
  },
  "format" | "width" | "height" | "image" | "planeCount",
  "focusZones"
> = Type.Object(
  {
    image: Type.String(),
    format: Type.String(),
    width: Type.Integer(),
    height: Type.Integer(),
    planeCount: Type.Integer(),
    focusZones: Type.Optional(
      Type.Array(
        Type.Object(
          {
            index: Type.Integer(),
            score: Type.Optional(Type.Number()),
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
export const ImagerStreamingModeSchema: Type.TUnion<
  (Type.TLiteral<"mjpeg"> | Type.TLiteral<"webrtc"> | Type.TLiteral<"websocket">)[]
> = Type.Union([Type.Literal("mjpeg"), Type.Literal("webrtc"), Type.Literal("websocket")], {});

/** Inferred type from the ImagerStreamingMode schema. */
export type ImagerStreamingMode = Static<typeof ImagerStreamingModeSchema>;

/**
 * Low-latency streaming config (FPS/quality tradeoff).
 */
export const ImagerStreamingConfigSchema: Type.TObject<
  {
    readonly mode: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"mjpeg"> | Type.TLiteral<"webrtc"> | Type.TLiteral<"websocket">)[]>
    >;
    readonly fps: Type.TOptional<Type.TInteger>;
    readonly quality: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly mode: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"mjpeg"> | Type.TLiteral<"webrtc"> | Type.TLiteral<"websocket">)[]>
    >;
    readonly fps: Type.TOptional<Type.TInteger>;
    readonly quality: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    mode: Type.Optional(ImagerStreamingModeSchema),
    fps: Type.Optional(Type.Integer({ minimum: 1, maximum: 60 })),
    quality: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerStreamingConfig schema. */
export type ImagerStreamingConfig = Static<typeof ImagerStreamingConfigSchema>;

// HDR / MULTI-EXPOSURE (P2)

/**
 * Multi-exposure capture request (exposure bracketing → HDR fusion).
 */
export const HdrCaptureRequestSchema = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
    /** EV steps for bracketing (e.g. [-2, 0, 2]). */
    exposureStops: Type.Optional(Type.Array(Type.Number())),
    /** Or number of exposures with auto spacing. */
    exposureCount: Type.Optional(Type.Integer({ minimum: 2 })),
    capture: Type.Optional(ImagerCaptureOptionsSchema),
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
export const HdrCaptureResponseSchema: Type.TObject<
  {
    readonly image: Type.TString;
    readonly format: Type.TString;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly exposureCount: Type.TInteger;
  },
  "exposureCount" | "width" | "height" | "format" | "image",
  never
> = Type.Object(
  {
    image: Type.String(),
    format: Type.String(),
    width: Type.Integer(),
    height: Type.Integer(),
    exposureCount: Type.Integer(),
  },
  { additionalProperties: false },
);

/** Inferred type from the HdrCaptureResponse schema. */
export type HdrCaptureResponse = Static<typeof HdrCaptureResponseSchema>;

// SYNCHRONIZED CAPTURE (continued)

/** TypeBox schema for ImagerSyncCaptureRequestSchema. */
export const ImagerSyncCaptureRequestSchema = Type.Object(
  {
    deviceIds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    capture: Type.Optional(ImagerCaptureOptionsSchema),
    /** Correlation ID for traceability and replay. */
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    /** Idempotency key for deduplication; repeated requests with same key return cached result. */
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  {
    description: "Synchronized capture request payload for imagers",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerSyncCaptureRequest schema. */
export type ImagerSyncCaptureRequest = Static<typeof ImagerSyncCaptureRequestSchema>;

/** TypeBox schema for ImagerSyncCaptureResultSchema. */
export const ImagerSyncCaptureResultSchema: Type.TObject<
  {
    readonly deviceId: Type.TString;
    readonly success: Type.TBoolean;
    readonly image: Type.TOptional<Type.TString>;
    readonly width: Type.TOptional<Type.TNumber>;
    readonly height: Type.TOptional<Type.TNumber>;
    readonly format: Type.TOptional<Type.TString>;
    readonly timestamp: Type.TOptional<Type.TString>;
    readonly error: Type.TOptional<Type.TString>;
  },
  "deviceId" | "success",
  Type.InferOptionalKeys<{
    readonly deviceId: Type.TString;
    readonly success: Type.TBoolean;
    readonly image: Type.TOptional<Type.TString>;
    readonly width: Type.TOptional<Type.TNumber>;
    readonly height: Type.TOptional<Type.TNumber>;
    readonly format: Type.TOptional<Type.TString>;
    readonly timestamp: Type.TOptional<Type.TString>;
    readonly error: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    deviceId: Type.String(),
    success: Type.Boolean(),
    image: Type.Optional(Type.String()),
    width: Type.Optional(Type.Number()),
    height: Type.Optional(Type.Number()),
    format: Type.Optional(Type.String()),
    timestamp: Type.Optional(Type.String()),
    error: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerSyncCaptureResult schema. */
export type ImagerSyncCaptureResult = Static<typeof ImagerSyncCaptureResultSchema>;

/** TypeBox schema for ImagerSyncCaptureResponseSchema. */
export const ImagerSyncCaptureResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        results: Type.Array(ImagerSyncCaptureResultSchema),
        /** Correlation ID when provided in request (for traceability). */
        correlationId: Type.Optional(Type.String()),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerSyncCaptureResponse schema. */
export type ImagerSyncCaptureResponse = Static<typeof ImagerSyncCaptureResponseSchema>;
