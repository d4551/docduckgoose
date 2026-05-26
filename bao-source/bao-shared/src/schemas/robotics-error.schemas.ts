/**
 * Robotics error response schema.
 *
 * Defines a shared error payload for robotics endpoints.
 *
 * @shared/schemas/robotics-error.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Robotics error response schema.
 */
export const RoboticsErrorResponseSchema: Type.TObject<
  {
    readonly ok: Type.TBoolean;
    readonly error: Type.TString;
    readonly code: Type.TString;
    readonly details: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly timestamp: Type.TString;
  },
  "ok" | "code" | "timestamp" | "error",
  "details"
> = Type.Object(
  {
    ok: Type.Boolean({
      description:
        "Always false for robotics error responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    error: Type.String(),
    code: Type.String(),
    details: Type.Optional(
      Type.Object(
        {},
        { additionalProperties: true, description: "Optional machine-readable error context." },
      ),
    ),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsErrorResponse schema. */
export type RoboticsErrorResponse = Static<typeof RoboticsErrorResponseSchema>;
