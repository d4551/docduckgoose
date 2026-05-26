/**
 * Robotics error response schema.
 *
 * Defines a shared error payload for robotics endpoints.
 *
 * @shared/schemas/robotics-error.ts
 */

import type { Static, TBoolean, TObject, TOptional, TString } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Robotics error response schema.
 */
export const RoboticsErrorResponseSchema: TObject<
  {
    readonly ok: TBoolean;
    readonly error: TString;
    readonly code: TString;
    readonly details: TOptional<TObject<Record<string, never>, never, never>>;
    readonly timestamp: TString;
  },
  "ok" | "code" | "timestamp" | "error",
  "details"
> = TypeExports.Object(
  {
    ok: TypeExports.Boolean({
      description:
        "Always false for robotics error responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    error: TypeExports.String(),
    code: TypeExports.String(),
    details: TypeExports.Optional(
      TypeExports.Object(
        {},
        { additionalProperties: true, description: "Optional machine-readable error context." },
      ),
    ),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsErrorResponse schema. */
export type RoboticsErrorResponse = Static<typeof RoboticsErrorResponseSchema>;
