/**
 * Shared XR runtime schemas.
 *
 * Provides TypeBox schemas for XR render modes, device classes, and transforms
 * used across XR session and ingest contracts.
 *
 * @shared/schemas/xr-runtime.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * XR render modes for WebXR sessions.
 */
export const XrRenderModeSchema: Type.TUnion<
  (Type.TLiteral<"inline"> | Type.TLiteral<"immersive-vr"> | Type.TLiteral<"immersive-ar">)[]
> = Type.Union(
  [Type.Literal("inline"), Type.Literal("immersive-vr"), Type.Literal("immersive-ar")],
  { description: "XR render mode" },
);

/** Inferred type from the XrRenderMode schema. */
export type XrRenderMode = Static<typeof XrRenderModeSchema>;

/**
 * XR device class targets.
 */
export const XrDeviceClassSchema: Type.TUnion<
  (Type.TLiteral<"desktop"> | Type.TLiteral<"mobile"> | Type.TLiteral<"headset">)[]
> = Type.Union([Type.Literal("desktop"), Type.Literal("mobile"), Type.Literal("headset")], {
  description: "XR device class target",
});

/** Inferred type from the XrDeviceClass schema. */
export type XrDeviceClass = Static<typeof XrDeviceClassSchema>;

/**
 * XR transform payload for spatial positioning.
 */
export const XrTransformSchema: Type.TObject<
  {
    readonly position: Type.TOptional<Type.TTuple<[]>>;
    readonly rotation: Type.TOptional<Type.TUnion<Type.TTuple<[]>[]>>;
    readonly scale: Type.TOptional<Type.TUnion<(Type.TNumber | Type.TTuple<[]>)[]>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly position: Type.TOptional<Type.TTuple<[]>>;
    readonly rotation: Type.TOptional<Type.TUnion<Type.TTuple<[]>[]>>;
    readonly scale: Type.TOptional<Type.TUnion<(Type.TNumber | Type.TTuple<[]>)[]>>;
  }>
> = Type.Object(
  {
    position: Type.Optional(Type.Tuple([Type.Number(), Type.Number(), Type.Number()])),
    rotation: Type.Optional(
      Type.Union([
        Type.Tuple([Type.Number(), Type.Number(), Type.Number()]),
        Type.Tuple([Type.Number(), Type.Number(), Type.Number(), Type.Number()]),
      ]),
    ),
    scale: Type.Optional(
      Type.Union([Type.Number(), Type.Tuple([Type.Number(), Type.Number(), Type.Number()])]),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrTransform schema. */
export type XrTransform = Static<typeof XrTransformSchema>;
