/**
 * Devices status aggregate schemas.
 *
 * TypeBox schemas for the `GET /api/v1/devices/status` response payload.
 *
 * Note: Error cases must return non-2xx status codes and use the shared error
 * envelope schemas (see `route-response.schemas` and `DEFAULT_API_V1_RESPONSES`).
 *
 * @shared/schemas/devices-status
 */

import type { Static, TLiteral, TNumber, TObject, TRecord, TString } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Successful devices status response schema.
 */
export const DevicesStatusOkSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: TObject<
      {
        readonly dbReady: TLiteral<true>;
        readonly total: TNumber;
        readonly online: TNumber;
        readonly offline: TNumber;
        readonly error: TNumber;
        readonly byType: TRecord<TString, TNumber>;
        readonly byStatus: TRecord<TString, TNumber>;
      },
      "total" | "dbReady" | "byType" | "byStatus" | "online" | "offline" | "error",
      never
    >;
    readonly timestamp: TString;
  },
  "ok" | "data" | "timestamp",
  never
> = TypeExports.Object({
  ok: TypeExports.Literal(true),
  data: TypeExports.Object({
    dbReady: TypeExports.Literal(true),
    total: TypeExports.Number(),
    online: TypeExports.Number(),
    offline: TypeExports.Number(),
    error: TypeExports.Number(),
    byType: TypeExports.Record(TypeExports.String(), TypeExports.Number()),
    byStatus: TypeExports.Record(TypeExports.String(), TypeExports.Number()),
  }),
  timestamp: TypeExports.String(),
});

/**
 * Response schema for device status aggregates.
 *
 * This schema represents the 200-success payload only.
 */
export const DevicesStatusResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: TObject<
      {
        readonly dbReady: TLiteral<true>;
        readonly total: TNumber;
        readonly online: TNumber;
        readonly offline: TNumber;
        readonly error: TNumber;
        readonly byType: TRecord<TString, TNumber>;
        readonly byStatus: TRecord<TString, TNumber>;
      },
      "total" | "dbReady" | "byType" | "byStatus" | "online" | "offline" | "error",
      never
    >;
    readonly timestamp: TString;
  },
  "ok" | "data" | "timestamp",
  never
> = DevicesStatusOkSchema;

/**
 * TypeScript type for device status responses.
 */
export type DevicesStatusResponse = Static<typeof DevicesStatusResponseSchema>;
