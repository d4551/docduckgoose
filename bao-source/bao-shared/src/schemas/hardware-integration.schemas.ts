/**
 * Hardware integration summary schemas.
 *
 * Defines contract-first schemas for hardware integration payloads shared
 * across the hardware dashboards and integration views.
 *
 * @shared/schemas/hardware-integration
 */

import type { Static, TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { McpResourceDefinitionSchema, McpResourceTemplateDefinitionSchema } from "./mcp.schemas.ts";
import { OnnxIntegrationSummarySchema } from "./onnx-integration.schemas.ts";
import { TrainingIntegrationSummarySchema } from "./training-integration.schemas.ts";

/**
 * Hardware integration endpoints schema.
 */
export const HardwareIntegrationEndpointsSchema = Type.Object(
  {
    base: Type.String(),
    summary: Type.String(),
    integration: Type.String(),
    calibration: Type.Object(
      {
        list: Type.String(),
        status: Type.String(),
        run: Type.String(),
      },
      { additionalProperties: false },
    ),
    footpedal: Type.Object(
      {
        status: Type.String(),
        actions: Type.String(),
      },
      { additionalProperties: false },
    ),
    devices: Type.Object(
      {
        list: Type.String(),
        detail: Type.String(),
        status: Type.String(),
        diagnostics: Type.String(),
        assignments: Type.String(),
        assignmentOptions: Type.String(),
        assign: Type.String(),
        unassign: Type.String(),
        drivers: Type.String(),
        driverInstall: Type.String(),
      },
      { additionalProperties: false },
    ),
    drivers: Type.Object(
      {
        catalog: Type.String(),
      },
      { additionalProperties: false },
    ),
    bunbuddies: Type.Object(
      {
        capabilities: Type.String(),
        graph: Type.String(),
      },
      { additionalProperties: false },
    ),
    policies: Type.String(),
    lifecycle: Type.Object(
      {
        enroll: Type.String(),
        provision: Type.String(),
      },
      { additionalProperties: false },
    ),
    imager: Type.Object(
      {
        status: Type.String(),
        enumerate: Type.String(),
        health: Type.String(),
        arducam200mpCapabilities: Type.String(),
        arducam200mpConvert: Type.String(),
        autofocus: Type.String(),
        preview: Type.String(),
        snapshot: Type.String(),
        quality: Type.String(),
        preprocess: Type.String(),
        rectify: Type.String(),
        syncCapture: Type.String(),
        assets: Type.String(),
        calibrate: Type.String(),
      },
      { additionalProperties: false },
    ),
    mcp: Type.Object(
      {
        tools: Type.String(),
        toolCall: Type.String(),
        resources: Type.String(),
        resourceRead: Type.String(),
        templates: Type.String(),
        context: Type.String(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * Hardware integration config schema.
 */
export const HardwareIntegrationConfigSchema = Type.Object(
  {
    list: Type.Object(
      {
        calibration: Type.Object(
          {
            defaultLimit: Type.Integer({ minimum: 0 }),
            maxLimit: Type.Integer({ minimum: 0 }),
            minLimit: Type.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
        footpedalActions: Type.Object(
          {
            defaultLimit: Type.Integer({ minimum: 0 }),
            maxLimit: Type.Integer({ minimum: 0 }),
            minLimit: Type.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
        devices: Type.Object(
          {
            defaultLimit: Type.Integer({ minimum: 0 }),
            maxLimit: Type.Integer({ minimum: 0 }),
            minLimit: Type.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    timeouts: Type.Object(
      {
        bunbuddyCapabilities: Type.Object(
          {
            defaultMs: Type.Integer({ minimum: 0 }),
            maxMs: Type.Integer({ minimum: 0 }),
            minMs: Type.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
        mcpEnumerate: Type.Object(
          {
            defaultMs: Type.Integer({ minimum: 0 }),
            maxMs: Type.Integer({ minimum: 0 }),
            minMs: Type.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    assignments: Type.Object(
      {
        defaultRoles: Type.Record(Type.String(), Type.String()),
        roleOptions: Type.Record(Type.String(), Type.Array(Type.String())),
        deviceTypeGroups: Type.Record(Type.String(), Type.Array(Type.String())),
        typeAliases: Type.Record(Type.String(), Type.String()),
      },
      { additionalProperties: false },
    ),
    identifiers: Type.Object(
      {
        typeAliases: Type.Record(Type.String(), Type.String()),
        interfaceClassMap: Type.Record(Type.String(), Type.String()),
        interfaceClassTypeMap: Type.Record(Type.String(), Type.String()),
        identifierTypes: Type.Record(Type.String(), Type.Array(Type.String())),
      },
      { additionalProperties: false },
    ),
    capabilities: Type.Object(
      {
        camera: Type.Object(
          {
            captureKeys: Type.Array(Type.String()),
            previewKeys: Type.Array(Type.String()),
            streamingKeys: Type.Array(Type.String()),
          },
          { additionalProperties: false },
        ),
        audio: Type.Object(
          {
            inputKeys: Type.Array(Type.String()),
            outputKeys: Type.Array(Type.String()),
            headsetKeys: Type.Array(Type.String()),
          },
          { additionalProperties: false },
        ),
        footpedal: Type.Object(
          {
            inputKeys: Type.Array(Type.String()),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    drivers: Type.Object(
      {
        builtinUsb: Type.Array(Type.String()),
        interfaceClass: Type.Record(Type.String(), Type.String()),
        deviceType: Type.Record(Type.String(), Type.String()),
        deviceTypeTransport: Type.Record(Type.String(), Type.Record(Type.String(), Type.String())),
        source: Type.Record(Type.String(), Type.String()),
        sourceTransport: Type.Record(Type.String(), Type.Record(Type.String(), Type.String())),
        transport: Type.Record(Type.String(), Type.String()),
        keywordHints: Type.Array(
          Type.Object(
            {
              driver: Type.String(),
              keywords: Type.Array(Type.String()),
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
export const HardwareRealtimeRelayStatusSchema: Type.TObject<
  {
    readonly activeChannels: Type.TArray<Type.TString>;
    readonly reconnectAttempts: Type.TRecord<Type.TString, Type.TInteger>;
  },
  "activeChannels" | "reconnectAttempts",
  never
> = Type.Object(
  {
    activeChannels: Type.Array(Type.String()),
    reconnectAttempts: Type.Record(Type.String(), Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Hardware integration summary schema.
 */
export const HardwareIntegrationSummarySchema: TSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    endpoints: HardwareIntegrationEndpointsSchema,
    config: HardwareIntegrationConfigSchema,
    realtimeRelay: Type.Object(
      {
        drone: HardwareRealtimeRelayStatusSchema,
        scanner: HardwareRealtimeRelayStatusSchema,
      },
      { additionalProperties: false },
    ),
    onnx: Type.Optional(OnnxIntegrationSummarySchema),
    training: Type.Optional(TrainingIntegrationSummarySchema),
    mcp: Type.Object(
      {
        resources: Type.Array(McpResourceDefinitionSchema),
        templates: Type.Array(McpResourceTemplateDefinitionSchema),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * Hardware integration response schema.
 */
export const HardwareIntegrationResponseSchema: TSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: HardwareIntegrationSummarySchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Hardware integration request schema.
 */
export const HardwareIntegrationRequestSchema: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

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
