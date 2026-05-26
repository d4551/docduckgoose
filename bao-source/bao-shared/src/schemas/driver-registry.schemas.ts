/**
 * Driver registry schemas for allow-listed driver discovery.
 *
 * Defines TypeBox schemas for driver registry responses.
 *
 * @shared/schemas/driver-registry.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const DriverRegistryScopeSchema: Type.TUnion<
  [Type.TLiteral<"server" | "bunbuddy">, ...Type.TLiteral<"server" | "bunbuddy">[]]
> = stringEnum(DRIVER_REGISTRY_SCOPES, {
  description: "Driver registry scope",
});

/**
 * Driver registry install command schema.
 */
export const DriverRegistryInstallSchema: Type.TObject<
  { readonly cmd: Type.TArray<Type.TString>; readonly cwd: Type.TOptional<Type.TString> },
  "cmd",
  "cwd"
> = Type.Object(
  {
    cmd: Type.Array(Type.String({ minLength: 1 })),
    cwd: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Driver registry entry schema.
 */
export const DriverRegistryEntrySchema = Type.Object(
  {
    key: Type.String({ minLength: 1 }),
    packageName: Type.String({ minLength: 1 }),
    packageVersion: Type.Optional(Type.String({ minLength: 1 })),
    scope: DriverRegistryScopeSchema,
    notes: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    install: Type.Optional(Type.Union([DriverRegistryInstallSchema, Type.Null()])),
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
export const DriverRegistryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    installAllowed: Type.Boolean(),
    installBlockedReason: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    drivers: Type.Array(DriverRegistryEntrySchema),
    count: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    requestId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for driver registry responses.
 */
export type DriverRegistryResponse = Static<typeof DriverRegistryResponseSchema>;
