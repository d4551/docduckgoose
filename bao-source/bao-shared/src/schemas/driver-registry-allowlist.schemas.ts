/**
 * Driver registry allowlist schemas.
 *
 * Defines the contract-first schema for `config/drivers/*.json` allowlists used by the
 * server driver manager (installation gating and inventory surfaces).
 *
 * @shared/schemas/driver-registry-allowlist
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  DriverRegistryInstallSchema,
  DriverRegistryScopeSchema,
} from "./driver-registry.schemas.ts";

const DriverRegistryAllowlistEntryShape = {
  packageName: Type.String({ minLength: 1 }),
  scope: Type.Optional(DriverRegistryScopeSchema),
  install: Type.Optional(Type.Union([DriverRegistryInstallSchema, Type.Null()])),
  notes: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
} as const;

/**
 * Driver registry allowlist entry schema.
 */
export const DriverRegistryAllowlistEntrySchema = Type.Object(
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
export const DriverRegistryAllowlistConfigSchema = Type.Record(
  Type.String({ minLength: 1 }),
  DriverRegistryAllowlistEntrySchema,
  {},
);

/**
 * TypeScript type for {@link DriverRegistryAllowlistConfigSchema}.
 */
export type DriverRegistryAllowlistConfig = Static<typeof DriverRegistryAllowlistConfigSchema>;
