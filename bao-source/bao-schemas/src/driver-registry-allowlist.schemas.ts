/**
 * Driver registry allowlist schemas.
 *
 * Defines the contract-first schema for `config/drivers/*.json` allowlists used by the
 * server driver manager (installation gating and inventory surfaces).
 *
 * @shared/schemas/driver-registry-allowlist
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  DriverRegistryInstallSchema,
  DriverRegistryScopeSchema,
} from "./driver-registry.schemas.ts";

const DriverRegistryAllowlistEntryShape = {
  packageName: TypeExports.String({ minLength: 1 }),
  scope: TypeExports.Optional(DriverRegistryScopeSchema),
  install: TypeExports.Optional(
    TypeExports.Union([DriverRegistryInstallSchema, TypeExports.Null()]),
  ),
  notes: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
} as const;

/**
 * Driver registry allowlist entry schema.
 */
export const DriverRegistryAllowlistEntrySchema = TypeExports.Object(
  {
    ...DriverRegistryAllowlistEntryShape,
  },
  {
    additionalProperties: false,
  },
);

/**
 * TypeScript type for {@link DriverRegistryAllowlistEntrySchema}.
 */
export type DriverRegistryAllowlistEntry = Static<typeof DriverRegistryAllowlistEntrySchema>;

/**
 * Driver registry allowlist file schema (`config/drivers/*.json`).
 */
export const DriverRegistryAllowlistConfigSchema = TypeExports.Record(
  TypeExports.String({ minLength: 1 }),
  DriverRegistryAllowlistEntrySchema,
  {},
);

/**
 * TypeScript type for {@link DriverRegistryAllowlistConfigSchema}.
 */
export type DriverRegistryAllowlistConfig = Static<typeof DriverRegistryAllowlistConfigSchema>;
