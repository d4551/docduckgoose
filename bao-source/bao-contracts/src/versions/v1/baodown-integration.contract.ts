/**
 * BaoDown integration snapshot contract schemas.
 *
 * Extracted from the main BaoDown contract module to keep integration schema
 * ownership isolated and reduce monolith size for contract maintenance.
 *
 * @shared/contracts/versions/v1/baodown-integration
 */

import { BaoDownPgNotifyStatusSchema } from "@baohaus/bao-schemas/baodown/baodown-pg-notify.schemas";
import { BaoDownRedisNotifyStatusSchema } from "@baohaus/bao-schemas/baodown/baodown-redis-notify.schemas";
import { HardwareIntegrationSummarySchema } from "@baohaus/bao-schemas/hardware-integration.schemas";
import { McpIntegrationSummarySchema } from "@baohaus/bao-schemas/mcp.schemas";
import { TrainingIntegrationSummarySchema } from "@baohaus/bao-schemas/training-integration.schemas";
import { type TSchema, TypeExports as Type } from "@baohaus/baobox/elysia";

/** Contract name for the BaoDown integration snapshot endpoint. */
export const BAODOWN_INTEGRATION_CONTRACT_NAME = "baodown-integration";

/** Request schema for GET /api/v1/baodown/integration. */
export const BaoDownIntegrationRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, {});

const BaoDownIntegrationEndpointsV1 = Type.Object(
  {
    baodown: Type.String(),
    rpa: Type.String(),
    mcp: Type.String(),
    mcpContexts: Type.String(),
    mcpProviderContext: Type.String(),
    hardware: Type.String(),
    training: Type.String(),
    ai: Type.String(),
    aiCapabilities: Type.String(),
    systemIntegration: Type.String(),
    health: Type.String(),
    ready: Type.String(),
    docs: Type.String(),
  },
  { additionalProperties: false },
);

const BaoDownIntegrationServiceStateV1 = Type.Union([
  Type.Literal("online"),
  Type.Literal("auth_required"),
  Type.Literal("unreachable"),
  Type.Literal("not_configured"),
]);

const BaoDownIntegrationBaofireServiceV1 = Type.Object(
  {
    key: Type.Literal("baofire"),
    label: Type.String({ minLength: 1 }),
    url: Type.Union([Type.String(), Type.Null()]),
    publicUrl: Type.Union([Type.String(), Type.Null()]),
    status: BaoDownIntegrationServiceStateV1,
    statusCode: Type.Union([Type.Integer({ minimum: 100, maximum: 599 }), Type.Null()]),
    latencyMs: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    checkedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

const BaoDownIntegrationDimsumServiceV1 = Type.Object(
  {
    key: Type.Literal("dimsum"),
    label: Type.String({ minLength: 1 }),
    url: Type.Union([Type.String(), Type.Null()]),
    publicUrl: Type.Union([Type.String(), Type.Null()]),
    status: BaoDownIntegrationServiceStateV1,
    statusCode: Type.Union([Type.Integer({ minimum: 100, maximum: 599 }), Type.Null()]),
    latencyMs: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    checkedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

const BaoDownIntegrationBaofireHl7PeerV1 = Type.Object(
  {
    endpointId: Type.String({ minLength: 1 }),
    host: Type.String({ minLength: 1 }),
    port: Type.Integer({ minimum: 1, maximum: 65535 }),
    sendingApplication: Type.String({ minLength: 1 }),
    sendingFacility: Type.String({ minLength: 1 }),
    receivingApplication: Type.String({ minLength: 1 }),
    receivingFacility: Type.String({ minLength: 1 }),
    versions: Type.Array(Type.String({ minLength: 1 })),
    triggers: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

const BaoDownIntegrationBaofireHl7V1 = Type.Object(
  {
    available: Type.Boolean(),
    enabled: Type.Boolean(),
    listening: Type.Boolean(),
    bindHost: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    bindPort: Type.Union([Type.Integer({ minimum: 1, maximum: 65535 }), Type.Null()]),
    application: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    facility: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    versions: Type.Array(Type.String({ minLength: 1 })),
    triggers: Type.Array(Type.String({ minLength: 1 })),
    outboundPeers: Type.Array(BaoDownIntegrationBaofireHl7PeerV1),
    lastInboundAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastOutboundAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    error: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
  },
  { additionalProperties: false },
);

const BaoDownIntegrationBaofireV1 = Type.Object(
  {
    service: BaoDownIntegrationBaofireServiceV1,
    provider: Type.Union([Type.Literal("baofire"), Type.Literal("azure")]),
    enabled: Type.Boolean(),
    hl7: BaoDownIntegrationBaofireHl7V1,
  },
  { additionalProperties: false },
);

const BaoDownIntegrationDimsumV1 = Type.Object(
  {
    service: BaoDownIntegrationDimsumServiceV1,
    persistenceBackend: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/** Response schema for GET /api/v1/baodown/integration. */
export const BaoDownIntegrationResponseV1: TSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        timestamp: Type.String({ format: "date-time" }),
        endpoints: BaoDownIntegrationEndpointsV1,
        pgNotify: BaoDownPgNotifyStatusSchema,
        redisNotify: BaoDownRedisNotifyStatusSchema,
        mcp: McpIntegrationSummarySchema,
        hardware: HardwareIntegrationSummarySchema,
        training: TrainingIntegrationSummarySchema,
        usd: Type.Unknown(),
        xr: Type.Unknown(),
        baofire: BaoDownIntegrationBaofireV1,
        dimsum: BaoDownIntegrationDimsumV1,
      },
      { additionalProperties: false },
    ),
    timestamp: Type.String({ format: "date-time" }),
  },
  {
    additionalProperties: false,
    description: "Integration snapshot payload (cross-domain capabilities).",
  },
);
