/**
 * Health probe schemas.
 *
 * Defines shared TypeBox schemas for lightweight service health endpoints
 * such as `/api/v1/health` (API runtime).
 *
 * @shared/schemas/health.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * API runtime health probe response schema.
 */
export const HealthResponseSchema: Type.TObject<
  {
    readonly ok: Type.TBoolean;
    readonly status: Type.TString;
    readonly service: Type.TOptional<Type.TString>;
    readonly bunVersion: Type.TOptional<Type.TString>;
    readonly timestamp: Type.TOptional<Type.TString>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "status" | "ok",
  Type.InferOptionalKeys<{
    readonly ok: Type.TBoolean;
    readonly status: Type.TString;
    readonly service: Type.TOptional<Type.TString>;
    readonly bunVersion: Type.TOptional<Type.TString>;
    readonly timestamp: Type.TOptional<Type.TString>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  }>
> = Type.Object(
  {
    ok: Type.Boolean(),
    status: Type.String(),
    service: Type.Optional(Type.String()),
    bunVersion: Type.Optional(Type.String()),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
    details: Type.Optional(Type.Record(Type.String(), JsonValueSchema)),
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
