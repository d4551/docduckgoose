/**
 * ONNX integration summary schemas.
 *
 * Defines contract-first schemas for ONNX integration summaries used by
 * hardware, AI, and XR clients.
 *
 * @shared/schemas/onnx-integration
 */

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { OnnxRuntimeStatusSchema } from "./onnx.schemas.ts";

/**
 * ONNX WASM backend status schema.
 */
export const OnnxWasmStatusSchema: TObject<
  {
    readonly available: TBoolean;
    readonly supported: TBoolean;
    readonly module: TUnion<(TString | TNull)[]>;
  },
  "module" | "available" | "supported",
  never
> = TypeExports.Object(
  {
    available: TypeExports.Boolean(),
    supported: TypeExports.Boolean(),
    module: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * WebGPU status schema.
 */
export const WebGpuStatusSchema: TObject<
  {
    readonly available: TBoolean;
    readonly supported: TBoolean;
    readonly module: TUnion<(TString | TNull)[]>;
    readonly message: TOptional<TString>;
  },
  "module" | "available" | "supported",
  "message"
> = TypeExports.Object(
  {
    available: TypeExports.Boolean(),
    supported: TypeExports.Boolean(),
    module: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    message: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * WebGPU model availability schema.
 */
export const WebGpuModelsStatusSchema: TObject<
  { readonly available: TBoolean },
  "available",
  never
> = TypeExports.Object(
  {
    available: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * ONNX runtime capability matrix schema.
 */
export const OnnxRuntimeCapabilityMatrixSchema = TypeExports.Object(
  {
    host: TypeExports.Union([
      TypeExports.Literal("bun"),
      TypeExports.Literal("browser"),
      TypeExports.Literal("node"),
    ]),
    crossOriginIsolated: TypeExports.Boolean(),
    serverWebInference: TypeExports.Boolean(),
    browserClientInference: TypeExports.Boolean(),
    executionProviderChains: TypeExports.Object(
      {
        webgpu: TypeExports.Array(TypeExports.String()),
        wasm: TypeExports.Array(TypeExports.String()),
        native: TypeExports.Array(TypeExports.String()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * ONNX status snapshot schema.
 */
export const OnnxStatusDataSchema = TypeExports.Object(
  {
    onnx: OnnxRuntimeStatusSchema,
    webgpu: WebGpuStatusSchema,
    onnxWasm: OnnxWasmStatusSchema,
    webgpuModels: WebGpuModelsStatusSchema,
    capabilities: OnnxRuntimeCapabilityMatrixSchema,
    environment: TypeExports.String({ minLength: 1 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * ONNX model summary schema.
 */
export const OnnxIntegrationModelSummarySchema: TObject<
  {
    readonly count: TInteger;
    readonly tags: TArray<TString>;
    readonly providers: TArray<TString>;
    readonly types: TArray<TString>;
  },
  "tags" | "providers" | "types" | "count",
  never
> = TypeExports.Object(
  {
    count: TypeExports.Integer({ minimum: 0 }),
    tags: TypeExports.Array(TypeExports.String()),
    providers: TypeExports.Array(TypeExports.String()),
    types: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * ONNX integration capabilities schema.
 */
export const OnnxIntegrationCapabilitiesSchema = TypeExports.Object(
  {
    inference: TypeExports.Object(
      {
        supported: TypeExports.Boolean(),
        backends: TypeExports.Array(TypeExports.String()),
        formats: TypeExports.Array(TypeExports.String()),
      },
      { additionalProperties: false },
    ),
    operations: TypeExports.Object(
      {
        supported: TypeExports.Array(TypeExports.String()),
        performance: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    devices: TypeExports.Object(
      {
        cpu: TypeExports.Boolean(),
        gpu: TypeExports.Boolean(),
        webgpu: TypeExports.Boolean(),
      },
      { additionalProperties: false },
    ),
    modelCount: TypeExports.Integer({ minimum: 0 }),
    availableModels: TypeExports.Array(
      TypeExports.Object(
        {
          id: TypeExports.String({ minLength: 1 }),
          name: TypeExports.String({ minLength: 1 }),
          type: TypeExports.String({ minLength: 1 }),
          capabilities: TypeExports.Object(
            {
              cpu: TypeExports.Boolean(),
              webgpu: TypeExports.Boolean(),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * ONNX integration summary schema.
 */
export const OnnxIntegrationSummarySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    endpoints: TypeExports.Object(
      {
        base: TypeExports.String(),
        health: TypeExports.String(),
        status: TypeExports.String(),
        models: TypeExports.String(),
        metrics: TypeExports.String(),
        infer: TypeExports.String(),
        cache: TypeExports.String(),
        cacheClear: TypeExports.String(),
        capabilities: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    rateLimit: TypeExports.Object(
      {
        requestsPerWindow: TypeExports.Integer({ minimum: 0 }),
        windowSeconds: TypeExports.Integer({ minimum: 0 }),
        burstCapacity: TypeExports.Integer({ minimum: 0 }),
        maxConcurrent: TypeExports.Integer({ minimum: 0 }),
        tokensPerDay: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    models: OnnxIntegrationModelSummarySchema,
    status: TypeExports.Optional(OnnxStatusDataSchema),
    capabilities: TypeExports.Optional(OnnxIntegrationCapabilitiesSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript types for ONNX integration schemas.
 */
export type OnnxWasmStatus = Static<typeof OnnxWasmStatusSchema>;
/** Inferred type from the WebGpuStatus schema. */
export type WebGpuStatus = Static<typeof WebGpuStatusSchema>;
/** Inferred type from the WebGpuModelsStatus schema. */
export type WebGpuModelsStatus = Static<typeof WebGpuModelsStatusSchema>;
/** Inferred type from the OnnxStatusData schema. */
export type OnnxStatusData = Static<typeof OnnxStatusDataSchema>;
/** Inferred type from the OnnxIntegrationModelSummary schema. */
export type OnnxIntegrationModelSummary = Static<typeof OnnxIntegrationModelSummarySchema>;
/** Inferred type from the OnnxIntegrationCapabilities schema. */
export type OnnxIntegrationCapabilities = Static<typeof OnnxIntegrationCapabilitiesSchema>;
/** Inferred type from the OnnxIntegrationSummary schema. */
export type OnnxIntegrationSummary = Static<typeof OnnxIntegrationSummarySchema>;
