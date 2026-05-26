/**
 * ONNX health schemas.
 *
 * Defines shared TypeBox schemas for ONNX runtime and Transformers.js
 * health responses used across API boundaries and contract tests.
 *
 * @shared/schemas/onnx.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * CPU vendor source schema.
 */
const CpuVendorSourceSchema: TUnion<[TLiteral<"proc">, TLiteral<"os">, TLiteral<"unknown">]> =
  TypeExports.Union(
    [TypeExports.Literal("proc"), TypeExports.Literal("os"), TypeExports.Literal("unknown")],
    {},
  );

/**
 * CPU vendor detection payload schema.
 */
const CpuVendorStatusSchema: TObject<
  {
    readonly vendor: TUnion<(TString | TNull)[]>;
    readonly raw: TUnion<(TString | TNull)[]>;
    readonly source: typeof CpuVendorSourceSchema;
    readonly isUnknown: TBoolean;
    readonly message: TOptional<TString>;
  },
  "vendor" | "raw" | "source" | "isUnknown",
  "message"
> = TypeExports.Object(
  {
    vendor: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    raw: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    source: CpuVendorSourceSchema,
    isUnknown: TypeExports.Boolean(),
    message: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * ONNX runtime module identifier schema.
 */
export const OnnxRuntimeModuleSchema: TUnion<
  (TLiteral<"onnx-node-bao"> | TLiteral<"onnx-web-bao"> | TNull)[]
> = TypeExports.Union(
  [TypeExports.Literal("onnx-node-bao"), TypeExports.Literal("onnx-web-bao"), TypeExports.Null()],
  {},
);

/**
 * ONNX runtime status schema.
 */
export const OnnxRuntimeStatusSchema: TObject<
  {
    readonly available: TBoolean;
    readonly supported: TBoolean;
    readonly module: TUnion<(TLiteral<"onnx-node-bao"> | TLiteral<"onnx-web-bao"> | TNull)[]>;
    readonly version: TUnion<(TString | TNull)[]>;
    readonly message: TOptional<TString>;
    readonly cpuVendor: TObject<
      {
        readonly vendor: TUnion<(TString | TNull)[]>;
        readonly raw: TUnion<(TString | TNull)[]>;
        readonly source: TUnion<(TLiteral<"proc"> | TLiteral<"os"> | TLiteral<"unknown">)[]>;
        readonly isUnknown: TBoolean;
        readonly message: TOptional<TString>;
      },
      "vendor" | "raw" | "source" | "isUnknown",
      "message"
    >;
  },
  "version" | "available" | "supported" | "module" | "cpuVendor",
  "message"
> = TypeExports.Object(
  {
    available: TypeExports.Boolean(),
    supported: TypeExports.Boolean(),
    module: OnnxRuntimeModuleSchema,
    version: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    message: TypeExports.Optional(TypeExports.String()),
    cpuVendor: CpuVendorStatusSchema,
  },
  { additionalProperties: false },
);

/**
 * Transformers.js health check schema.
 */
export const TransformersJsCheckResultSchema: TObject<
  {
    readonly ok: TBoolean;
    readonly available: TBoolean;
    readonly version: TOptional<TString>;
    readonly cacheDir: TOptional<TString>;
    readonly allowRemoteModels: TOptional<TBoolean>;
    readonly error: TOptional<TString>;
  },
  "ok" | "available",
  InferOptionalKeys<{
    readonly ok: TBoolean;
    readonly available: TBoolean;
    readonly version: TOptional<TString>;
    readonly cacheDir: TOptional<TString>;
    readonly allowRemoteModels: TOptional<TBoolean>;
    readonly error: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    available: TypeExports.Boolean(),
    version: TypeExports.Optional(TypeExports.String()),
    cacheDir: TypeExports.Optional(TypeExports.String()),
    allowRemoteModels: TypeExports.Optional(TypeExports.Boolean()),
    error: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * ONNX runtime health service status schema.
 */
export const OnnxRuntimeHealthStatusSchema: TUnion<(TLiteral<"ready"> | TLiteral<"missing">)[]> =
  TypeExports.Union([TypeExports.Literal("ready"), TypeExports.Literal("missing")], {});

/**
 * Transformers.js health service status schema.
 */
export const TransformersHealthStatusSchema: TUnion<
  (TLiteral<"ready"> | TLiteral<"degraded"> | TLiteral<"missing">)[]
> = TypeExports.Union(
  [TypeExports.Literal("ready"), TypeExports.Literal("degraded"), TypeExports.Literal("missing")],
  {},
);

/**
 * ONNX service health response schema.
 */
export const OnnxHealthResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    services: TypeExports.Object(
      {
        onnxRuntime: OnnxRuntimeHealthStatusSchema,
        transformersJs: TransformersHealthStatusSchema,
      },
      { additionalProperties: false },
    ),
    runtime: OnnxRuntimeStatusSchema,
    transformersJs: TransformersJsCheckResultSchema,
    timestamp: TypeExports.String({ minLength: 1 }),
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
