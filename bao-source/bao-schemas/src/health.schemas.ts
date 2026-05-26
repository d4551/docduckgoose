/**
 * Health probe schemas.
 *
 * Defines shared TypeBox schemas for lightweight service health endpoints
 * such as `/api/v1/health` (API runtime).
 *
 * @shared/schemas/health.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * API runtime health probe response schema.
 */
export const HealthResponseSchema: TObject<
  {
    readonly ok: TBoolean;
    readonly status: TString;
    readonly service: TOptional<TString>;
    readonly bunVersion: TOptional<TString>;
    readonly timestamp: TOptional<TString>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  },
  "status" | "ok",
  InferOptionalKeys<{
    readonly ok: TBoolean;
    readonly status: TString;
    readonly service: TOptional<TString>;
    readonly bunVersion: TOptional<TString>;
    readonly timestamp: TOptional<TString>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  }>
> = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    status: TypeExports.String(),
    service: TypeExports.Optional(TypeExports.String()),
    bunVersion: TypeExports.Optional(TypeExports.String()),
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    details: TypeExports.Optional(TypeExports.Record(TypeExports.String(), JsonValueSchema)),
  },
  {
    additionalProperties: false,
    title: "Health Response",
    description: "Service health probe response.",
  },
);

/**
 * TypeScript type for API runtime health probe responses.
 */
export type HealthResponse = Static<typeof HealthResponseSchema>;
