/**
 * Imager source schemas.
 *
 * Foundational image format, capture options, and pipeline source payloads
 * shared across imager quality, preprocess, calibration, and capture stages.
 *
 * @shared/schemas/imager-source.schemas.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Supported image formats for imager operations.
 */
export const ImagerImageFormatSchema: TUnion<
  (TLiteral<"jpeg"> | TLiteral<"png"> | TLiteral<"raw">)[]
> = TypeExports.Union(
  [TypeExports.Literal("jpeg"), TypeExports.Literal("png"), TypeExports.Literal("raw")],
  {
    description: "Supported image formats",
  },
);

/** Inferred type from the ImagerImageFormat schema. */
export type ImagerImageFormat = Static<typeof ImagerImageFormatSchema>;

/**
 * Capture options for imager devices.
 */
export const ImagerCaptureOptionsSchema: TObject<
  {
    readonly resolution: TOptional<
      TObject<{ readonly width: TInteger; readonly height: TInteger }, "width" | "height", never>
    >;
    readonly format: TOptional<TUnion<(TLiteral<"jpeg"> | TLiteral<"png"> | TLiteral<"raw">)[]>>;
    readonly quality: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly resolution: TOptional<
      TObject<{ readonly width: TInteger; readonly height: TInteger }, "width" | "height", never>
    >;
    readonly format: TOptional<TUnion<(TLiteral<"jpeg"> | TLiteral<"png"> | TLiteral<"raw">)[]>>;
    readonly quality: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    resolution: TypeExports.Optional(
      TypeExports.Object(
        {
          width: TypeExports.Integer({ minimum: 1 }),
          height: TypeExports.Integer({ minimum: 1 }),
        },
        { additionalProperties: false },
      ),
    ),
    format: TypeExports.Optional(ImagerImageFormatSchema),
    quality: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 100 })),
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
export const ImagerSourceSchema = TypeExports.Object(
  {
    deviceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    image: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    capture: TypeExports.Optional(ImagerCaptureOptionsSchema),
  },
  {
    description: "Image source for imager pipeline operations",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerSource schema. */
export type ImagerSource = Static<typeof ImagerSourceSchema>;
