/**
 * Device assignment schemas.
 *
 * Shared TypeBox schema for device assignment payloads.
 *
 * @shared/schemas/device-assignment
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

const DeviceAssignmentMetadataSchema = Type.Object(
  {},
  {
    additionalProperties: Type.Unknown(),
    description: "Optional assignment metadata payload.",
  },
);

/**
 * Device assignment request schema.
 */
export const DeviceAssignmentBodySchema: Type.TObject<
  {
    readonly type: Type.TOptional<Type.TString>;
    readonly role: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly type: Type.TOptional<Type.TString>;
    readonly role: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
  }>
> = Type.Object(
  {
    type: Type.Optional(Type.String()),
    role: Type.Optional(Type.String()),
    metadata: Type.Optional(DeviceAssignmentMetadataSchema),
  },
  {
    description: "Request body for creating/updating a device assignment.",
  },
);

/** Inferred type from the DeviceAssignmentBody schema. */
export type DeviceAssignmentBody = Static<typeof DeviceAssignmentBodySchema>;
