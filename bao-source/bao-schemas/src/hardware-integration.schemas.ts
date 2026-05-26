/**
 * Hardware integration summary schemas.
 *
 * Defines contract-first schemas for hardware integration payloads shared
 * across the hardware dashboards and integration views.
 *
 * @shared/schemas/hardware-integration
 */

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TRecord,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { McpResourceDefinitionSchema, McpResourceTemplateDefinitionSchema } from "./mcp.schemas.ts";
import { OnnxIntegrationSummarySchema } from "./onnx-integration.schemas.ts";
import { TrainingIntegrationSummarySchema } from "./training-integration.schemas.ts";

/**
 * Hardware integration endpoints schema.
 */
export const HardwareIntegrationEndpointsSchema = TypeExports.Object(
  {
    base: TypeExports.String(),
    summary: TypeExports.String(),
    integration: TypeExports.String(),
    calibration: TypeExports.Object(
      {
        list: TypeExports.String(),
        status: TypeExports.String(),
        run: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    footpedal: TypeExports.Object(
      {
        status: TypeExports.String(),
        actions: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    devices: TypeExports.Object(
      {
        list: TypeExports.String(),
        detail: TypeExports.String(),
        status: TypeExports.String(),
        diagnostics: TypeExports.String(),
        assignments: TypeExports.String(),
        assignmentOptions: TypeExports.String(),
        assign: TypeExports.String(),
        unassign: TypeExports.String(),
        drivers: TypeExports.String(),
        driverInstall: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    drivers: TypeExports.Object(
      {
        catalog: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    bunbuddies: TypeExports.Object(
      {
        capabilities: TypeExports.String(),
        graph: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    policies: TypeExports.String(),
    lifecycle: TypeExports.Object(
      {
        enroll: TypeExports.String(),
        provision: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    imager: TypeExports.Object(
      {
        status: TypeExports.String(),
        enumerate: TypeExports.String(),
        health: TypeExports.String(),
        arducam200mpCapabilities: TypeExports.String(),
        arducam200mpConvert: TypeExports.String(),
        autofocus: TypeExports.String(),
        preview: TypeExports.String(),
        snapshot: TypeExports.String(),
        quality: TypeExports.String(),
        preprocess: TypeExports.String(),
        rectify: TypeExports.String(),
        syncCapture: TypeExports.String(),
        assets: TypeExports.String(),
        calibrate: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    mcp: TypeExports.Object(
      {
        tools: TypeExports.String(),
        toolCall: TypeExports.String(),
        resources: TypeExports.String(),
        resourceRead: TypeExports.String(),
        templates: TypeExports.String(),
        context: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * Hardware integration config schema.
 */
export const HardwareIntegrationConfigSchema = TypeExports.Object(
  {
    list: TypeExports.Object(
      {
        calibration: TypeExports.Object(
          {
            defaultLimit: TypeExports.Integer({ minimum: 0 }),
            maxLimit: TypeExports.Integer({ minimum: 0 }),
            minLimit: TypeExports.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
        footpedalActions: TypeExports.Object(
          {
            defaultLimit: TypeExports.Integer({ minimum: 0 }),
            maxLimit: TypeExports.Integer({ minimum: 0 }),
            minLimit: TypeExports.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
        devices: TypeExports.Object(
          {
            defaultLimit: TypeExports.Integer({ minimum: 0 }),
            maxLimit: TypeExports.Integer({ minimum: 0 }),
            minLimit: TypeExports.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    timeouts: TypeExports.Object(
      {
        bunbuddyCapabilities: TypeExports.Object(
          {
            defaultMs: TypeExports.Integer({ minimum: 0 }),
            maxMs: TypeExports.Integer({ minimum: 0 }),
            minMs: TypeExports.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
        mcpEnumerate: TypeExports.Object(
          {
            defaultMs: TypeExports.Integer({ minimum: 0 }),
            maxMs: TypeExports.Integer({ minimum: 0 }),
            minMs: TypeExports.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    assignments: TypeExports.Object(
      {
        defaultRoles: TypeExports.Record(TypeExports.String(), TypeExports.String()),
        roleOptions: TypeExports.Record(
          TypeExports.String(),
          TypeExports.Array(TypeExports.String()),
        ),
        deviceTypeGroups: TypeExports.Record(
          TypeExports.String(),
          TypeExports.Array(TypeExports.String()),
        ),
        typeAliases: TypeExports.Record(TypeExports.String(), TypeExports.String()),
      },
      { additionalProperties: false },
    ),
    identifiers: TypeExports.Object(
      {
        typeAliases: TypeExports.Record(TypeExports.String(), TypeExports.String()),
        interfaceClassMap: TypeExports.Record(TypeExports.String(), TypeExports.String()),
        interfaceClassTypeMap: TypeExports.Record(TypeExports.String(), TypeExports.String()),
        identifierTypes: TypeExports.Record(
          TypeExports.String(),
          TypeExports.Array(TypeExports.String()),
        ),
      },
      { additionalProperties: false },
    ),
    capabilities: TypeExports.Object(
      {
        camera: TypeExports.Object(
          {
            captureKeys: TypeExports.Array(TypeExports.String()),
            previewKeys: TypeExports.Array(TypeExports.String()),
            streamingKeys: TypeExports.Array(TypeExports.String()),
          },
          { additionalProperties: false },
        ),
        audio: TypeExports.Object(
          {
            inputKeys: TypeExports.Array(TypeExports.String()),
            outputKeys: TypeExports.Array(TypeExports.String()),
            headsetKeys: TypeExports.Array(TypeExports.String()),
          },
          { additionalProperties: false },
        ),
        footpedal: TypeExports.Object(
          {
            inputKeys: TypeExports.Array(TypeExports.String()),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    drivers: TypeExports.Object(
      {
        builtinUsb: TypeExports.Array(TypeExports.String()),
        interfaceClass: TypeExports.Record(TypeExports.String(), TypeExports.String()),
        deviceType: TypeExports.Record(TypeExports.String(), TypeExports.String()),
        deviceTypeTransport: TypeExports.Record(
          TypeExports.String(),
          TypeExports.Record(TypeExports.String(), TypeExports.String()),
        ),
        source: TypeExports.Record(TypeExports.String(), TypeExports.String()),
        sourceTransport: TypeExports.Record(
          TypeExports.String(),
          TypeExports.Record(TypeExports.String(), TypeExports.String()),
        ),
        transport: TypeExports.Record(TypeExports.String(), TypeExports.String()),
        keywordHints: TypeExports.Array(
          TypeExports.Object(
            {
              driver: TypeExports.String(),
              keywords: TypeExports.Array(TypeExports.String()),
            },
            { additionalProperties: false },
          ),
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * Hardware realtime relay status schema.
 */
export const HardwareRealtimeRelayStatusSchema: TObject<
  {
    readonly activeChannels: TArray<TString>;
    readonly reconnectAttempts: TRecord<TString, TInteger>;
  },
  "activeChannels" | "reconnectAttempts",
  never
> = TypeExports.Object(
  {
    activeChannels: TypeExports.Array(TypeExports.String()),
    reconnectAttempts: TypeExports.Record(
      TypeExports.String(),
      TypeExports.Integer({ minimum: 0 }),
    ),
  },
  { additionalProperties: false },
);

/**
 * Hardware integration summary schema.
 */
export const HardwareIntegrationSummarySchema: TObject<
  {
    readonly enabled: TBoolean;
    readonly timestamp: TString;
    readonly endpoints: typeof HardwareIntegrationEndpointsSchema;
    readonly config: typeof HardwareIntegrationConfigSchema;
    readonly realtimeRelay: TObject<
      {
        readonly drone: typeof HardwareRealtimeRelayStatusSchema;
        readonly scanner: typeof HardwareRealtimeRelayStatusSchema;
      },
      "drone" | "scanner",
      never
    >;
    readonly onnx: TOptional<typeof OnnxIntegrationSummarySchema>;
    readonly training: TOptional<typeof TrainingIntegrationSummarySchema>;
    readonly mcp: TObject<
      {
        readonly resources: TArray<typeof McpResourceDefinitionSchema>;
        readonly templates: TArray<typeof McpResourceTemplateDefinitionSchema>;
      },
      "resources" | "templates",
      never
    >;
  },
  "enabled" | "timestamp" | "endpoints" | "config" | "realtimeRelay" | "mcp",
  "onnx" | "training"
> = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    endpoints: HardwareIntegrationEndpointsSchema,
    config: HardwareIntegrationConfigSchema,
    realtimeRelay: TypeExports.Object(
      {
        drone: HardwareRealtimeRelayStatusSchema,
        scanner: HardwareRealtimeRelayStatusSchema,
      },
      { additionalProperties: false },
    ),
    onnx: TypeExports.Optional(OnnxIntegrationSummarySchema),
    training: TypeExports.Optional(TrainingIntegrationSummarySchema),
    mcp: TypeExports.Object(
      {
        resources: TypeExports.Array(McpResourceDefinitionSchema),
        templates: TypeExports.Array(McpResourceTemplateDefinitionSchema),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * Hardware integration response schema.
 */
export const HardwareIntegrationResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: typeof HardwareIntegrationSummarySchema;
    readonly timestamp: TString;
  },
  "ok" | "data" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: HardwareIntegrationSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Hardware integration request schema.
 */
export const HardwareIntegrationRequestSchema: TObject<
  Record<string, never>,
  never,
  never
> = TypeExports.Object({}, { additionalProperties: false });

/**
 * TypeScript types for hardware integration schemas.
 */
export type HardwareIntegrationEndpoints = Static<typeof HardwareIntegrationEndpointsSchema>;
/** Inferred type from the HardwareIntegrationConfig schema. */
export type HardwareIntegrationConfig = Static<typeof HardwareIntegrationConfigSchema>;
/** Inferred type from the HardwareRealtimeRelayStatus schema. */
export type HardwareRealtimeRelayStatus = Static<typeof HardwareRealtimeRelayStatusSchema>;
/** Inferred type from the HardwareIntegrationSummary schema. */
export type HardwareIntegrationSummary = Static<typeof HardwareIntegrationSummarySchema>;
/** Inferred type from the HardwareIntegrationResponse schema. */
export type HardwareIntegrationResponse = Static<typeof HardwareIntegrationResponseSchema>;
/** Inferred type from the HardwareIntegrationRequest schema. */
export type HardwareIntegrationRequest = Static<typeof HardwareIntegrationRequestSchema>;
