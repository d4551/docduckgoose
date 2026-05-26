/**
 * Fleet alert and incident schemas.
 *
 * Shared schemas for fleet alert listing and acknowledgements.
 *
 * @shared/schemas/fleet-alerts
 */

import type {
  InferOptionalKeys,
  Static,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Fleet incident severity schema.
 */
export const FleetIncidentSeveritySchema: TUnion<
  (TLiteral<"critical"> | TLiteral<"warning"> | TLiteral<"info">)[]
> = TypeExports.Union(
  [TypeExports.Literal("critical"), TypeExports.Literal("warning"), TypeExports.Literal("info")],
  {},
);

/**
 * Fleet incident lifecycle state schema.
 */
export const FleetIncidentStateSchema: TUnion<
  (TLiteral<"open"> | TLiteral<"acknowledged"> | TLiteral<"resolved">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("open"),
    TypeExports.Literal("acknowledged"),
    TypeExports.Literal("resolved"),
  ],
  {},
);

/**
 * Fleet incident schema.
 */
export const FleetIncidentSchema: TObject<
  {
    readonly incidentId: TString;
    readonly runId: TUnion<(TString | TNull)[]>;
    readonly key: TString;
    readonly severity: TUnion<(TLiteral<"critical"> | TLiteral<"warning"> | TLiteral<"info">)[]>;
    readonly state: TUnion<(TLiteral<"open"> | TLiteral<"acknowledged"> | TLiteral<"resolved">)[]>;
    readonly message: TString;
    readonly dedupeWindowSec: TInteger;
    readonly raisedAt: TString;
    readonly escalatedAt: TUnion<(TString | TNull)[]>;
    readonly resolvedAt: TUnion<(TString | TNull)[]>;
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
> = TypeExports.Object(
  {
    incidentId: TypeExports.String({ minLength: 1 }),
    runId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    key: TypeExports.String({ minLength: 1 }),
    severity: FleetIncidentSeveritySchema,
    state: FleetIncidentStateSchema,
    message: TypeExports.String({ minLength: 1 }),
    dedupeWindowSec: TypeExports.Integer({ minimum: 0 }),
    raisedAt: TypeExports.String({ format: "date-time" }),
    escalatedAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    resolvedAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
  },
  { additionalProperties: false },
);

/**
 * Fleet alerts list response schema.
 */
export const FleetIncidentListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    incidents: TypeExports.Array(FleetIncidentSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet incident acknowledgement request schema.
 */
export const FleetIncidentAckRequestSchema: TObject<
  { readonly note: TOptional<TString>; readonly actorId: TOptional<TString> },
  never,
  InferOptionalKeys<{
    readonly note: TOptional<TString>;
    readonly actorId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    note: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    actorId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Fleet incident acknowledgement response schema.
 */
export const FleetIncidentAckResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly incidentId: TString;
    readonly state: TUnion<(TLiteral<"open"> | TLiteral<"acknowledged"> | TLiteral<"resolved">)[]>;
    readonly ackedAt: TString;
    readonly timestamp: TString;
  },
  "ok" | "incidentId" | "state" | "timestamp" | "ackedAt",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    incidentId: TypeExports.String({ minLength: 1 }),
    state: FleetIncidentStateSchema,
    ackedAt: TypeExports.String({ format: "date-time" }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet incident type.
 */
export type FleetIncident = Static<typeof FleetIncidentSchema>;
