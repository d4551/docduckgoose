/**
 * Fleet alert and incident schemas.
 *
 * Shared schemas for fleet alert listing and acknowledgements.
 *
 * @shared/schemas/fleet-alerts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Fleet incident severity schema.
 */
export const FleetIncidentSeveritySchema: Type.TUnion<
  (Type.TLiteral<"critical"> | Type.TLiteral<"warning"> | Type.TLiteral<"info">)[]
> = Type.Union([Type.Literal("critical"), Type.Literal("warning"), Type.Literal("info")], {});

/**
 * Fleet incident lifecycle state schema.
 */
export const FleetIncidentStateSchema: Type.TUnion<
  (Type.TLiteral<"open"> | Type.TLiteral<"acknowledged"> | Type.TLiteral<"resolved">)[]
> = Type.Union([Type.Literal("open"), Type.Literal("acknowledged"), Type.Literal("resolved")], {});

/**
 * Fleet incident schema.
 */
export const FleetIncidentSchema: Type.TObject<
  {
    readonly incidentId: Type.TString;
    readonly runId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly key: Type.TString;
    readonly severity: Type.TUnion<
      (Type.TLiteral<"critical"> | Type.TLiteral<"warning"> | Type.TLiteral<"info">)[]
    >;
    readonly state: Type.TUnion<
      (Type.TLiteral<"open"> | Type.TLiteral<"acknowledged"> | Type.TLiteral<"resolved">)[]
    >;
    readonly message: Type.TString;
    readonly dedupeWindowSec: Type.TInteger;
    readonly raisedAt: Type.TString;
    readonly escalatedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly resolvedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  | "runId"
  | "escalatedAt"
  | "resolvedAt"
  | "incidentId"
  | "key"
  | "severity"
  | "state"
  | "message"
  | "dedupeWindowSec"
  | "raisedAt",
  never
> = Type.Object(
  {
    incidentId: Type.String({ minLength: 1 }),
    runId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    key: Type.String({ minLength: 1 }),
    severity: FleetIncidentSeveritySchema,
    state: FleetIncidentStateSchema,
    message: Type.String({ minLength: 1 }),
    dedupeWindowSec: Type.Integer({ minimum: 0 }),
    raisedAt: Type.String({ format: "date-time" }),
    escalatedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    resolvedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Fleet alerts list response schema.
 */
export const FleetIncidentListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    incidents: Type.Array(FleetIncidentSchema),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet incident acknowledgement request schema.
 */
export const FleetIncidentAckRequestSchema: Type.TObject<
  { readonly note: Type.TOptional<Type.TString>; readonly actorId: Type.TOptional<Type.TString> },
  never,
  Type.InferOptionalKeys<{
    readonly note: Type.TOptional<Type.TString>;
    readonly actorId: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    note: Type.Optional(Type.String({ minLength: 1 })),
    actorId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Fleet incident acknowledgement response schema.
 */
export const FleetIncidentAckResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly incidentId: Type.TString;
    readonly state: Type.TUnion<
      (Type.TLiteral<"open"> | Type.TLiteral<"acknowledged"> | Type.TLiteral<"resolved">)[]
    >;
    readonly ackedAt: Type.TString;
    readonly timestamp: Type.TString;
  },
  "ok" | "incidentId" | "state" | "timestamp" | "ackedAt",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    incidentId: Type.String({ minLength: 1 }),
    state: FleetIncidentStateSchema,
    ackedAt: Type.String({ format: "date-time" }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet incident type.
 */
export type FleetIncident = Static<typeof FleetIncidentSchema>;
