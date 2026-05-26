/**
 * ONNX health schemas.
 *
 * Defines shared TypeBox schemas for ONNX runtime and Transformers.js
 * health responses used across API boundaries and contract tests.
 *
 * @shared/schemas/onnx.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * CPU vendor source schema.
 */
const CpuVendorSourceSchema: Type.TUnion<
  [Type.TLiteral<"proc">, Type.TLiteral<"os">, Type.TLiteral<"unknown">]
> = Type.Union([Type.Literal("proc"), Type.Literal("os"), Type.Literal("unknown")], {});

/**
 * CPU vendor detection payload schema.
 */
const CpuVendorStatusSchema: Type.TObject<
  {
    readonly vendor: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly raw: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly source: typeof CpuVendorSourceSchema;
    readonly isUnknown: Type.TBoolean;
    readonly message: Type.TOptional<Type.TString>;
  },
  "vendor" | "raw" | "source" | "isUnknown",
  "message"
> = Type.Object(
  {
    vendor: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    raw: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    source: CpuVendorSourceSchema,
    isUnknown: Type.Boolean(),
    message: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * ONNX runtime module identifier schema.
 */
export const OnnxRuntimeModuleSchema: Type.TUnion<
  (Type.TLiteral<"onnx-node-bao"> | Type.TLiteral<"onnx-web-bao"> | Type.TNull)[]
> = Type.Union([Type.Literal("onnx-node-bao"), Type.Literal("onnx-web-bao"), Type.Null()], {});

/**
 * ONNX runtime status schema.
 */
export const OnnxRuntimeStatusSchema: Type.TObject<
  {
    readonly available: Type.TBoolean;
    readonly supported: Type.TBoolean;
    readonly module: Type.TUnion<
      (Type.TLiteral<"onnx-node-bao"> | Type.TLiteral<"onnx-web-bao"> | Type.TNull)[]
    >;
    readonly version: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly message: Type.TOptional<Type.TString>;
    readonly cpuVendor: Type.TObject<
      {
        readonly vendor: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly raw: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly source: Type.TUnion<
          (Type.TLiteral<"proc"> | Type.TLiteral<"os"> | Type.TLiteral<"unknown">)[]
        >;
        readonly isUnknown: Type.TBoolean;
        readonly message: Type.TOptional<Type.TString>;
      },
      "vendor" | "raw" | "source" | "isUnknown",
      "message"
    >;
  },
  "version" | "available" | "supported" | "module" | "cpuVendor",
  "message"
> = Type.Object(
  {
    available: Type.Boolean(),
    supported: Type.Boolean(),
    module: OnnxRuntimeModuleSchema,
    version: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    message: Type.Optional(Type.String()),
    cpuVendor: CpuVendorStatusSchema,
  },
  { additionalProperties: false },
);

/**
 * Transformers.js health check schema.
 */
export const TransformersJsCheckResultSchema: Type.TObject<
  {
    readonly ok: Type.TBoolean;
    readonly available: Type.TBoolean;
    readonly version: Type.TOptional<Type.TString>;
    readonly cacheDir: Type.TOptional<Type.TString>;
    readonly allowRemoteModels: Type.TOptional<Type.TBoolean>;
    readonly error: Type.TOptional<Type.TString>;
  },
  "ok" | "available",
  Type.InferOptionalKeys<{
    readonly ok: Type.TBoolean;
    readonly available: Type.TBoolean;
    readonly version: Type.TOptional<Type.TString>;
    readonly cacheDir: Type.TOptional<Type.TString>;
    readonly allowRemoteModels: Type.TOptional<Type.TBoolean>;
    readonly error: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    ok: Type.Boolean(),
    available: Type.Boolean(),
    version: Type.Optional(Type.String()),
    cacheDir: Type.Optional(Type.String()),
    allowRemoteModels: Type.Optional(Type.Boolean()),
    error: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * ONNX runtime health service status schema.
 */
export const OnnxRuntimeHealthStatusSchema: Type.TUnion<
  (Type.TLiteral<"ready"> | Type.TLiteral<"missing">)[]
> = Type.Union([Type.Literal("ready"), Type.Literal("missing")], {});

/**
 * Transformers.js health service status schema.
 */
export const TransformersHealthStatusSchema: Type.TUnion<
  (Type.TLiteral<"ready"> | Type.TLiteral<"degraded"> | Type.TLiteral<"missing">)[]
> = Type.Union([Type.Literal("ready"), Type.Literal("degraded"), Type.Literal("missing")], {});

/**
 * ONNX service health response schema.
 */
export const OnnxHealthResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    services: Type.Object(
      {
        onnxRuntime: OnnxRuntimeHealthStatusSchema,
        transformersJs: TransformersHealthStatusSchema,
      },
      { additionalProperties: false },
    ),
    runtime: OnnxRuntimeStatusSchema,
    transformersJs: TransformersJsCheckResultSchema,
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for CPU vendor detection payload.
 */
export type CpuVendorStatus = Static<typeof CpuVendorStatusSchema>;

/**
 * TypeScript type for ONNX runtime status payload.
 */
export type OnnxRuntimeStatus = Static<typeof OnnxRuntimeStatusSchema>;

/**
 * TypeScript type for Transformers.js health payload.
 */
export type TransformersJsCheckResult = Static<typeof TransformersJsCheckResultSchema>;

/**
 * TypeScript type for ONNX health response payload.
 */
export type OnnxHealthResponse = Static<typeof OnnxHealthResponseSchema>;
