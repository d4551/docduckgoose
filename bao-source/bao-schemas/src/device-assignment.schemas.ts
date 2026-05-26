/**
 * Device assignment schemas.
 *
 * Shared TypeBox schema for device assignment payloads.
 *
 * @shared/schemas/device-assignment
 */

import type {
  InferOptionalKeys,
  Static,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

const DeviceAssignmentMetadataSchema = TypeExports.Object(
  {},
  {
    additionalProperties: TypeExports.Unknown(),
    description: "Optional assignment metadata payload.",
  },
);

/**
 * Device assignment request schema.
 */
export const DeviceAssignmentBodySchema: TObject<
  {
    readonly type: TOptional<TString>;
    readonly role: TOptional<TString>;
    readonly metadata: TOptional<TObject<Record<string, never>, never, never>>;
  },
  never,
  InferOptionalKeys<{
    readonly type: TOptional<TString>;
    readonly role: TOptional<TString>;
    readonly metadata: TOptional<TObject<Record<string, never>, never, never>>;
  }>
> = TypeExports.Object(
  {
    type: TypeExports.Optional(TypeExports.String()),
    role: TypeExports.Optional(TypeExports.String()),
    metadata: TypeExports.Optional(DeviceAssignmentMetadataSchema),
  },
  {
    description: "Request body for creating/updating a device assignment.",
  },
);

/** Inferred type from the DeviceAssignmentBody schema. */
export type DeviceAssignmentBody = Static<typeof DeviceAssignmentBodySchema>;
