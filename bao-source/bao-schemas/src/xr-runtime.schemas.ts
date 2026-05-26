/**
 * Shared XR runtime schemas.
 *
 * Provides TypeBox schemas for XR render modes, device classes, and transforms
 * used across XR session and ingest contracts.
 *
 * @shared/schemas/xr-runtime.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TTuple,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * XR render modes for WebXR sessions.
 */
export const XrRenderModeSchema: TUnion<
  (TLiteral<"inline"> | TLiteral<"immersive-vr"> | TLiteral<"immersive-ar">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("inline"),
    TypeExports.Literal("immersive-vr"),
    TypeExports.Literal("immersive-ar"),
  ],
  { description: "XR render mode" },
);

/** Inferred type from the XrRenderMode schema. */
export type XrRenderMode = Static<typeof XrRenderModeSchema>;

/**
 * XR device class targets.
 */
export const XrDeviceClassSchema: TUnion<
  (TLiteral<"desktop"> | TLiteral<"mobile"> | TLiteral<"headset">)[]
> = TypeExports.Union(
  [TypeExports.Literal("desktop"), TypeExports.Literal("mobile"), TypeExports.Literal("headset")],
  {
    description: "XR device class target",
  },
);

/** Inferred type from the XrDeviceClass schema. */
export type XrDeviceClass = Static<typeof XrDeviceClassSchema>;

/**
 * XR transform payload for spatial positioning.
 */
export const XrTransformSchema: TObject<
  {
    readonly position: TOptional<TTuple<[]>>;
    readonly rotation: TOptional<TUnion<TTuple<[]>[]>>;
    readonly scale: TOptional<TUnion<(TNumber | TTuple<[]>)[]>>;
  },
  never,
  InferOptionalKeys<{
    readonly position: TOptional<TTuple<[]>>;
    readonly rotation: TOptional<TUnion<TTuple<[]>[]>>;
    readonly scale: TOptional<TUnion<(TNumber | TTuple<[]>)[]>>;
  }>
> = TypeExports.Object(
  {
    position: TypeExports.Optional(
      TypeExports.Tuple([TypeExports.Number(), TypeExports.Number(), TypeExports.Number()]),
    ),
    rotation: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Tuple([TypeExports.Number(), TypeExports.Number(), TypeExports.Number()]),
        TypeExports.Tuple([
          TypeExports.Number(),
          TypeExports.Number(),
          TypeExports.Number(),
          TypeExports.Number(),
        ]),
      ]),
    ),
    scale: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Number(),
        TypeExports.Tuple([TypeExports.Number(), TypeExports.Number(), TypeExports.Number()]),
      ]),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrTransform schema. */
export type XrTransform = Static<typeof XrTransformSchema>;
