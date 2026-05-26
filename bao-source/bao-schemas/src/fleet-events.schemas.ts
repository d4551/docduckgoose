/**
 * Fleet event stream schemas.
 *
 * Shared schemas for run-scoped event replay endpoints.
 *
 * @shared/schemas/fleet-events
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Fleet event type schema.
 */
export const FleetEventTypeSchema: TString = TypeExports.String({
  minLength: 1,
});

/**
 * Persisted fleet event schema.
 */
export const FleetRunEventSchema: TObject<
  {
    readonly runId: TString;
    readonly sequence: TInteger;
    readonly type: TString;
    readonly payload: TRecord<TString, TUnknown>;
    readonly createdAt: TString;
  },
  "payload" | "runId" | "sequence" | "type" | "createdAt",
  never
> = TypeExports.Object(
  {
    runId: TypeExports.String({ minLength: 1 }),
    sequence: TypeExports.Integer({ minimum: 1 }),
    type: FleetEventTypeSchema,
    payload: TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet event list query schema.
 */
export const FleetRunEventsQuerySchema: TObject<
  { readonly cursor: TOptional<TInteger>; readonly limit: TOptional<TInteger> },
  never,
  InferOptionalKeys<{
    readonly cursor: TOptional<TInteger>;
    readonly limit: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    cursor: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Fleet event list response schema.
 */
export const FleetRunEventsResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly runId: TString;
    readonly events: TArray<
      TObject<
        {
          readonly runId: TString;
          readonly sequence: TInteger;
          readonly type: TString;
          readonly payload: TRecord<TString, TUnknown>;
          readonly createdAt: TString;
        },
        "payload" | "runId" | "sequence" | "type" | "createdAt",
        never
      >
    >;
    readonly nextCursor: TInteger;
    readonly timestamp: TString;
  },
  "ok" | "events" | "runId" | "nextCursor" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    runId: TypeExports.String({ minLength: 1 }),
    events: TypeExports.Array(FleetRunEventSchema),
    nextCursor: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet run event type.
 */
export type FleetRunEvent = Static<typeof FleetRunEventSchema>;
