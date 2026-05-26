/**
 * Imager source schemas.
 *
 * Foundational image format, capture options, and pipeline source payloads
 * shared across imager quality, preprocess, calibration, and capture stages.
 *
 * @shared/schemas/imager-source.schemas.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Supported image formats for imager operations.
 */
export const ImagerImageFormatSchema: Type.TUnion<
  (Type.TLiteral<"jpeg"> | Type.TLiteral<"png"> | Type.TLiteral<"raw">)[]
> = Type.Union([Type.Literal("jpeg"), Type.Literal("png"), Type.Literal("raw")], {
  description: "Supported image formats",
});

/** Inferred type from the ImagerImageFormat schema. */
export type ImagerImageFormat = Static<typeof ImagerImageFormatSchema>;

/**
 * Capture options for imager devices.
 */
export const ImagerCaptureOptionsSchema: Type.TObject<
  {
    readonly resolution: Type.TOptional<
      Type.TObject<
        { readonly width: Type.TInteger; readonly height: Type.TInteger },
        "width" | "height",
        never
      >
    >;
    readonly format: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"jpeg"> | Type.TLiteral<"png"> | Type.TLiteral<"raw">)[]>
    >;
    readonly quality: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly resolution: Type.TOptional<
      Type.TObject<
        { readonly width: Type.TInteger; readonly height: Type.TInteger },
        "width" | "height",
        never
      >
    >;
    readonly format: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"jpeg"> | Type.TLiteral<"png"> | Type.TLiteral<"raw">)[]>
    >;
    readonly quality: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    resolution: Type.Optional(
      Type.Object(
        {
          width: Type.Integer({ minimum: 1 }),
          height: Type.Integer({ minimum: 1 }),
        },
        { additionalProperties: false },
      ),
    ),
    format: Type.Optional(ImagerImageFormatSchema),
    quality: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
  },
  {
    description: "Capture parameters for imager devices",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerCaptureOptions schema. */
export type ImagerCaptureOptions = Static<typeof ImagerCaptureOptionsSchema>;

/**
 * Imager source payload used by pipeline requests.
 */
export const ImagerSourceSchema = Type.Object(
  {
    deviceId: Type.Optional(Type.String({ minLength: 1 })),
    image: Type.Optional(Type.String({ minLength: 1 })),
    capture: Type.Optional(ImagerCaptureOptionsSchema),
  },
  {
    description: "Image source for imager pipeline operations",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerSource schema. */
export type ImagerSource = Static<typeof ImagerSourceSchema>;
