/**
 * ONNX integration summary schemas.
 *
 * Defines contract-first schemas for ONNX integration summaries used by
 * hardware, AI, and XR clients.
 *
 * @shared/schemas/onnx-integration
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { OnnxRuntimeStatusSchema } from "./onnx.schemas.ts";

/**
 * ONNX WASM backend status schema.
 */
export const OnnxWasmStatusSchema: Type.TObject<
  {
    readonly available: Type.TBoolean;
    readonly supported: Type.TBoolean;
    readonly module: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "module" | "available" | "supported",
  never
> = Type.Object(
  {
    available: Type.Boolean(),
    supported: Type.Boolean(),
    module: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * WebGPU status schema.
 */
export const WebGpuStatusSchema: Type.TObject<
  {
    readonly available: Type.TBoolean;
    readonly supported: Type.TBoolean;
    readonly module: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly message: Type.TOptional<Type.TString>;
  },
  "module" | "available" | "supported",
  "message"
> = Type.Object(
  {
    available: Type.Boolean(),
    supported: Type.Boolean(),
    module: Type.Union([Type.String(), Type.Null()]),
    message: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * WebGPU model availability schema.
 */
export const WebGpuModelsStatusSchema: Type.TObject<
  { readonly available: Type.TBoolean },
  "available",
  never
> = Type.Object(
  {
    available: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * ONNX status snapshot schema.
 */
export const OnnxStatusDataSchema = Type.Object(
  {
    onnx: OnnxRuntimeStatusSchema,
    webgpu: WebGpuStatusSchema,
    onnxWasm: OnnxWasmStatusSchema,
    webgpuModels: WebGpuModelsStatusSchema,
    environment: Type.String({ minLength: 1 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * ONNX model summary schema.
 */
export const OnnxIntegrationModelSummarySchema: Type.TObject<
  {
    readonly count: Type.TInteger;
    readonly tags: Type.TArray<Type.TString>;
    readonly providers: Type.TArray<Type.TString>;
    readonly types: Type.TArray<Type.TString>;
  },
  "tags" | "providers" | "types" | "count",
  never
> = Type.Object(
  {
    count: Type.Integer({ minimum: 0 }),
    tags: Type.Array(Type.String()),
    providers: Type.Array(Type.String()),
    types: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * ONNX integration capabilities schema.
 */
export const OnnxIntegrationCapabilitiesSchema = Type.Object(
  {
    inference: Type.Object(
      {
        supported: Type.Boolean(),
        backends: Type.Array(Type.String()),
        formats: Type.Array(Type.String()),
      },
      { additionalProperties: false },
    ),
    operations: Type.Object(
      {
        supported: Type.Array(Type.String()),
        performance: Type.String(),
      },
      { additionalProperties: false },
    ),
    devices: Type.Object(
      {
        cpu: Type.Boolean(),
        gpu: Type.Boolean(),
        webgpu: Type.Boolean(),
      },
      { additionalProperties: false },
    ),
    modelCount: Type.Integer({ minimum: 0 }),
    availableModels: Type.Array(
      Type.Object(
        {
          id: Type.String({ minLength: 1 }),
          name: Type.String({ minLength: 1 }),
          type: Type.String({ minLength: 1 }),
          capabilities: Type.Object(
            {
              cpu: Type.Boolean(),
              webgpu: Type.Boolean(),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * ONNX integration summary schema.
 */
export const OnnxIntegrationSummarySchema = Type.Object(
  {
    enabled: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    endpoints: Type.Object(
      {
        base: Type.String(),
        health: Type.String(),
        status: Type.String(),
        models: Type.String(),
        metrics: Type.String(),
        infer: Type.String(),
        cache: Type.String(),
        cacheClear: Type.String(),
        capabilities: Type.String(),
      },
      { additionalProperties: false },
    ),
    rateLimit: Type.Object(
      {
        requestsPerWindow: Type.Integer({ minimum: 0 }),
        windowSeconds: Type.Integer({ minimum: 0 }),
        burstCapacity: Type.Integer({ minimum: 0 }),
        maxConcurrent: Type.Integer({ minimum: 0 }),
        tokensPerDay: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    models: OnnxIntegrationModelSummarySchema,
    status: Type.Optional(OnnxStatusDataSchema),
    capabilities: Type.Optional(OnnxIntegrationCapabilitiesSchema),
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
