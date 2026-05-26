/**
 * Driver registry schemas for allow-listed driver discovery.
 *
 * Defines TypeBox schemas for driver registry responses.
 *
 * @shared/schemas/driver-registry.ts
 */

import type {
  Static,
  TArray,
  TLiteral,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";

/**
 * Supported driver registry scopes.
 */
export const DRIVER_REGISTRY_SCOPES: readonly ["server", "bunbuddy"] = [
  "server",
  "bunbuddy",
] as const;

/**
 * Type-safe driver registry scope.
 */
export type DriverRegistryScope = (typeof DRIVER_REGISTRY_SCOPES)[number];

/**
 * Driver registry scope schema.
 */
export const DriverRegistryScopeSchema: TUnion<
  [TLiteral<"server" | "bunbuddy">, ...TLiteral<"server" | "bunbuddy">[]]
> = stringEnum(DRIVER_REGISTRY_SCOPES, {
  description: "Driver registry scope",
});

/**
 * Driver registry install command schema.
 */
export const DriverRegistryInstallSchema: TObject<
  { readonly cmd: TArray<TString>; readonly cwd: TOptional<TString> },
  "cmd",
  "cwd"
> = TypeExports.Object(
  {
    cmd: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    cwd: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Driver registry entry schema.
 */
export const DriverRegistryEntrySchema = TypeExports.Object(
  {
    key: TypeExports.String({ minLength: 1 }),
    packageName: TypeExports.String({ minLength: 1 }),
    packageVersion: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    scope: DriverRegistryScopeSchema,
    notes: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    install: TypeExports.Optional(
      TypeExports.Union([DriverRegistryInstallSchema, TypeExports.Null()]),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for driver registry entries.
 */
export type DriverRegistryEntry = Static<typeof DriverRegistryEntrySchema>;

/**
 * Driver registry response schema.
 */
export const DriverRegistryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    installAllowed: TypeExports.Boolean(),
    installBlockedReason: TypeExports.Union([
      TypeExports.String({ minLength: 1 }),
      TypeExports.Null(),
    ]),
    drivers: TypeExports.Array(DriverRegistryEntrySchema),
    count: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    requestId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for driver registry responses.
 */
export type DriverRegistryResponse = Static<typeof DriverRegistryResponseSchema>;
