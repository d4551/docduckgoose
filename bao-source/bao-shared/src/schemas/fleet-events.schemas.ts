/**
 * Fleet event stream schemas.
 *
 * Shared schemas for run-scoped event replay endpoints.
 *
 * @shared/schemas/fleet-events
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Fleet event type schema.
 */
export const FleetEventTypeSchema: Type.TString = Type.String({
  minLength: 1,
});

/**
 * Persisted fleet event schema.
 */
export const FleetRunEventSchema: Type.TObject<
  {
    readonly runId: Type.TString;
    readonly sequence: Type.TInteger;
    readonly type: Type.TString;
    readonly payload: Type.TRecord<Type.TString, Type.TUnknown>;
    readonly createdAt: Type.TString;
  },
  "payload" | "runId" | "sequence" | "type" | "createdAt",
  never
> = Type.Object(
  {
    runId: Type.String({ minLength: 1 }),
    sequence: Type.Integer({ minimum: 1 }),
    type: FleetEventTypeSchema,
    payload: Type.Record(Type.String(), Type.Unknown()),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet event list query schema.
 */
export const FleetRunEventsQuerySchema: Type.TObject<
  { readonly cursor: Type.TOptional<Type.TInteger>; readonly limit: Type.TOptional<Type.TInteger> },
  never,
  Type.InferOptionalKeys<{
    readonly cursor: Type.TOptional<Type.TInteger>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    cursor: Type.Optional(Type.Integer({ minimum: 0 })),
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Fleet event list response schema.
 */
export const FleetRunEventsResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly runId: Type.TString;
    readonly events: Type.TArray<
      Type.TObject<
        {
          readonly runId: Type.TString;
          readonly sequence: Type.TInteger;
          readonly type: Type.TString;
          readonly payload: Type.TRecord<Type.TString, Type.TUnknown>;
          readonly createdAt: Type.TString;
        },
        "payload" | "runId" | "sequence" | "type" | "createdAt",
        never
      >
    >;
    readonly nextCursor: Type.TInteger;
    readonly timestamp: Type.TString;
  },
  "ok" | "events" | "runId" | "nextCursor" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    runId: Type.String({ minLength: 1 }),
    events: Type.Array(FleetRunEventSchema),
    nextCursor: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet run event type.
 */
export type FleetRunEvent = Static<typeof FleetRunEventSchema>;
