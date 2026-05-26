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

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Successful devices status response schema.
 */
export const DevicesStatusOkSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<
      {
        readonly dbReady: Type.TLiteral<true>;
        readonly total: Type.TNumber;
        readonly online: Type.TNumber;
        readonly offline: Type.TNumber;
        readonly error: Type.TNumber;
        readonly byType: Type.TRecord<Type.TString, Type.TNumber>;
        readonly byStatus: Type.TRecord<Type.TString, Type.TNumber>;
      },
      "total" | "dbReady" | "byType" | "byStatus" | "online" | "offline" | "error",
      never
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "data" | "timestamp",
  never
> = Type.Object({
  ok: Type.Literal(true),
  data: Type.Object({
    dbReady: Type.Literal(true),
    total: Type.Number(),
    online: Type.Number(),
    offline: Type.Number(),
    error: Type.Number(),
    byType: Type.Record(Type.String(), Type.Number()),
    byStatus: Type.Record(Type.String(), Type.Number()),
  }),
  timestamp: Type.String(),
});

/**
 * Response schema for device status aggregates.
 *
 * This schema represents the 200-success payload only.
 */
export const DevicesStatusResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<
      {
        readonly dbReady: Type.TLiteral<true>;
        readonly total: Type.TNumber;
        readonly online: Type.TNumber;
        readonly offline: Type.TNumber;
        readonly error: Type.TNumber;
        readonly byType: Type.TRecord<Type.TString, Type.TNumber>;
        readonly byStatus: Type.TRecord<Type.TString, Type.TNumber>;
      },
      "total" | "dbReady" | "byType" | "byStatus" | "online" | "offline" | "error",
      never
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "data" | "timestamp",
  never
> = DevicesStatusOkSchema;

/**
 * TypeScript type for device status responses.
 */
export type DevicesStatusResponse = Static<typeof DevicesStatusResponseSchema>;
