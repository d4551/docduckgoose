/**
 * Shared plugin registry contracts.
 *
 * Defines the canonical plugin registry payload contract used by runtime APIs,
 * build tooling, and integration-context projections.
 *
 * Includes:
 * - TypeBox JSON Schemas for API contracts
 * - Valibot schemas for runtime-safe parsing
 * - TypeScript types inferred from schemas
 *
 * @shared/schemas/plugin-contract
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import * as v from "valibot";
import { stringEnum } from "./baobox-enum";

const NonEmptyString = Type.String({ minLength: 1 });
const NullableString = Type.Union([Type.Null(), NonEmptyString]);

/**
 * Plugin scope enumeration.
 */
export const SERVER_PLUGIN_SCOPES: readonly ["public", "db-backed"] = [
  "public",
  "db-backed",
] as const;

/**
 * Plugin kind enumeration.
 */
export const SERVER_PLUGIN_KINDS: readonly ["core", "api", "extension"] = [
  "core",
  "api",
  "extension",
] as const;

/**
 * Plugin position enumeration.
 */
export const SERVER_PLUGIN_POSITIONS: readonly ["before", "after"] = ["before", "after"] as const;

/**
 * Plugin source classification enumeration.
 */
export const SERVER_PLUGIN_SOURCES: readonly ["api-group", "core-group", "extension"] = [
  "api-group",
  "core-group",
  "extension",
] as const;

/**
 * Plugin registry source enumeration for trust-boundary evaluation.
 */
export const SERVER_PLUGIN_REGISTRY_SOURCES: readonly ["static", "db", "extensible"] = [
  "static",
  "db",
  "extensible",
] as const;

/**
 * Plugin manifest source enumeration.
 */
export const SERVER_PLUGIN_MANIFEST_SOURCES: readonly ["runtime", "build"] = [
  "runtime",
  "build",
] as const;

/**
 * Plugin trust-boundary enumeration.
 */
export const SERVER_PLUGIN_TRUST_BOUNDARIES: readonly ["internal", "extension", "external"] = [
  "internal",
  "extension",
  "external",
] as const;

/**
 * Plugin scope schema.
 */
export const ServerPluginScopeSchema: Type.TUnion<
  [Type.TLiteral<"public" | "db-backed">, ...Type.TLiteral<"public" | "db-backed">[]]
> = stringEnum(SERVER_PLUGIN_SCOPES, {});

/**
 * Plugin scope type.
 */
export type ServerPluginScope = Static<typeof ServerPluginScopeSchema>;

/**
 * Plugin kind schema.
 */
export const ServerPluginKindSchema: Type.TUnion<
  [Type.TLiteral<"core" | "api" | "extension">, ...Type.TLiteral<"core" | "api" | "extension">[]]
> = stringEnum(SERVER_PLUGIN_KINDS, {});

/**
 * Plugin kind type.
 */
export type ServerPluginKind = Static<typeof ServerPluginKindSchema>;

/**
 * Plugin position schema.
 */
export const ServerPluginPositionSchema: Type.TUnion<
  [Type.TLiteral<"before" | "after">, ...Type.TLiteral<"before" | "after">[]]
> = stringEnum(SERVER_PLUGIN_POSITIONS, {});

/**
 * Plugin position type.
 */
export type ServerPluginPosition = Static<typeof ServerPluginPositionSchema>;

/**
 * Plugin source schema.
 */
export const ServerPluginSourceSchema: Type.TUnion<
  [
    Type.TLiteral<"api-group" | "core-group" | "extension">,
    ...Type.TLiteral<"api-group" | "core-group" | "extension">[],
  ]
> = stringEnum(SERVER_PLUGIN_SOURCES, {});

/**
 * Plugin source type.
 */
export type ServerPluginSource = Static<typeof ServerPluginSourceSchema>;

/**
 * Plugin registry source schema.
 */
export const ServerPluginRegistrySourceSchema: Type.TUnion<
  [
    Type.TLiteral<"static" | "db" | "extensible">,
    ...Type.TLiteral<"static" | "db" | "extensible">[],
  ]
> = stringEnum(SERVER_PLUGIN_REGISTRY_SOURCES, {});

/**
 * Plugin registry source type.
 */
export type ServerPluginRegistrySource = Static<typeof ServerPluginRegistrySourceSchema>;

/**
 * Plugin manifest source schema.
 */
export const ServerPluginManifestSourceSchema: Type.TUnion<
  [Type.TLiteral<"runtime" | "build">, ...Type.TLiteral<"runtime" | "build">[]]
> = stringEnum(SERVER_PLUGIN_MANIFEST_SOURCES, {});

/**
 * Plugin manifest source type.
 */
export type ServerPluginManifestSource = Static<typeof ServerPluginManifestSourceSchema>;

/**
 * Plugin trust-boundary schema.
 */
export const ServerPluginTrustBoundarySchema: Type.TUnion<
  [
    Type.TLiteral<"internal" | "extension" | "external">,
    ...Type.TLiteral<"internal" | "extension" | "external">[],
  ]
> = stringEnum(SERVER_PLUGIN_TRUST_BOUNDARIES, {});

/**
 * Plugin trust-boundary type.
 */
export type ServerPluginTrustBoundary = Static<typeof ServerPluginTrustBoundarySchema>;

/**
 * Canonical plugin registry item schema.
 */
export const ServerPluginRegistryItemSchema = Type.Object(
  {
    name: NonEmptyString,
    scope: ServerPluginScopeSchema,
    kind: ServerPluginKindSchema,
    source: ServerPluginSourceSchema,
    group: NonEmptyString,
    index: Type.Integer({ minimum: 0 }),
    position: Type.Optional(ServerPluginPositionSchema),
    enabled: Type.Boolean(),
    ownerTeam: NonEmptyString,
    responsibility: NonEmptyString,
    domain: NonEmptyString,
    interfaceContractVersion: NonEmptyString,
    stableId: NonEmptyString,
    contractKey: NullableString,
    capabilityContractVersion: NonEmptyString,
    registrySource: ServerPluginRegistrySourceSchema,
    dependsOn: Type.Array(NonEmptyString),
    conflictsWith: Type.Array(NonEmptyString),
    extends: Type.Array(NonEmptyString),
    provides: Type.Array(NonEmptyString),
    requires: Type.Array(NonEmptyString),
    signature: NonEmptyString,
    fingerprint: NonEmptyString,
    trustBoundary: ServerPluginTrustBoundarySchema,
    trusted: Type.Boolean(),
    interfaceCompatible: Type.Boolean(),
    capabilityCompatible: Type.Boolean(),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Canonical plugin registry item type.
 */
export type ServerPluginRegistryItem = Static<typeof ServerPluginRegistryItemSchema>;

/**
 * Read plugin registry item schema.
 *
 * Uses canonical plugin fields while allowing unknown future fields.
 */
export const ReadServerPluginRegistryItemSchema = Type.Object(
  {
    ...ServerPluginRegistryItemSchema.properties,
  },
  {
    additionalProperties: true,
  },
);

/**
 * Read plugin registry item type.
 */
export type ReadServerPluginRegistryItem = Static<typeof ReadServerPluginRegistryItemSchema>;

/**
 * Plugin manifest schema.
 */
export const ServerPluginManifestSchema: Type.TObject<
  {
    readonly registryHash: Type.TString;
    readonly version: Type.TString;
    readonly createdAt: Type.TString;
    readonly routeCount: Type.TInteger;
    readonly pluginCount: Type.TInteger;
    readonly source: Type.TUnion<
      [Type.TLiteral<"runtime" | "build">, ...Type.TLiteral<"runtime" | "build">[]]
    >;
    readonly manifestHash: Type.TString;
    readonly manifestSignature: Type.TString;
  },
  | "source"
  | "version"
  | "registryHash"
  | "createdAt"
  | "routeCount"
  | "pluginCount"
  | "manifestHash"
  | "manifestSignature",
  never
> = Type.Object(
  {
    registryHash: NonEmptyString,
    version: NonEmptyString,
    createdAt: Type.String({ format: "date-time" }),
    routeCount: Type.Integer({ minimum: 0 }),
    pluginCount: Type.Integer({ minimum: 0 }),
    source: ServerPluginManifestSourceSchema,
    manifestHash: NonEmptyString,
    manifestSignature: NonEmptyString,
  },
  {
    additionalProperties: false,
  },
);

/**
 * Plugin manifest type.
 */
export type ServerPluginManifest = Static<typeof ServerPluginManifestSchema>;

/**
 * Forward-compatible plugin registry item schema for public API responses.
 */
export const ForwardCompatibleServerPluginRegistryItemSchema = Type.Object(
  {
    ...ServerPluginRegistryItemSchema.properties,
  },
  {
    additionalProperties: true,
  },
);

/**
 * Stable `/system/plugins` response schema.
 */
export const SystemPluginsResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    count: Type.Integer({ minimum: 0 }),
    updatedAt: Type.String({ format: "date-time" }),
    manifest: ServerPluginManifestSchema,
    plugins: Type.Array(ForwardCompatibleServerPluginRegistryItemSchema),
  },
  {
    additionalProperties: true,
  },
);

/**
 * Stable `/system/plugins` response type.
 */
export type SystemPluginsResponse = Static<typeof SystemPluginsResponseSchema>;

/**
 * Read `/system/plugins` schema.
 */
export const ReadSystemPluginsResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    count: Type.Integer({ minimum: 0 }),
    updatedAt: Type.String({ format: "date-time" }),
    manifest: ServerPluginManifestSchema,
    plugins: Type.Array(ReadServerPluginRegistryItemSchema),
  },
  {
    additionalProperties: true,
  },
);

/**
 * Read `/system/plugins` type.
 */
export type ReadSystemPluginsResponse = Static<typeof ReadSystemPluginsResponseSchema>;

/**
 * Error code enum for plugin registry lookup failures.
 */
export const SERVER_PLUGIN_LOOKUP_ERROR_CODES: readonly [
  "PLUGIN_LOOKUP_FAILED",
  "PLUGIN_MANIFEST_INVALID",
  "PLUGIN_MANIFEST_VERIFICATION_FAILED",
] = [
  "PLUGIN_LOOKUP_FAILED",
  "PLUGIN_MANIFEST_INVALID",
  "PLUGIN_MANIFEST_VERIFICATION_FAILED",
] as const;

/**
 * Plugin lookup error-code schema.
 */
export const ServerPluginLookupErrorCodeSchema: Type.TUnion<
  [
    Type.TLiteral<
      "PLUGIN_LOOKUP_FAILED" | "PLUGIN_MANIFEST_INVALID" | "PLUGIN_MANIFEST_VERIFICATION_FAILED"
    >,
    ...Type.TLiteral<
      "PLUGIN_LOOKUP_FAILED" | "PLUGIN_MANIFEST_INVALID" | "PLUGIN_MANIFEST_VERIFICATION_FAILED"
    >[],
  ]
> = stringEnum(SERVER_PLUGIN_LOOKUP_ERROR_CODES, {});

/**
 * Structured plugin lookup error envelope schema.
 */
export const ServerPluginLookupErrorEnvelopeSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<false>;
    readonly error: Type.TObject<
      {
        readonly code: Type.TUnion<
          [
            Type.TLiteral<
              | "PLUGIN_LOOKUP_FAILED"
              | "PLUGIN_MANIFEST_INVALID"
              | "PLUGIN_MANIFEST_VERIFICATION_FAILED"
            >,
            ...Type.TLiteral<
              | "PLUGIN_LOOKUP_FAILED"
              | "PLUGIN_MANIFEST_INVALID"
              | "PLUGIN_MANIFEST_VERIFICATION_FAILED"
            >[],
          ]
        >;
        readonly message: Type.TString;
        readonly retryable: Type.TBoolean;
        readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
      },
      "code" | "message" | "retryable",
      "details"
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "error" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(false),
    error: Type.Object(
      {
        code: ServerPluginLookupErrorCodeSchema,
        message: NonEmptyString,
        retryable: Type.Boolean(),
        details: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.String({ format: "date-time" }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Structured plugin lookup error envelope type.
 */
export type ServerPluginLookupErrorEnvelope = Static<typeof ServerPluginLookupErrorEnvelopeSchema>;

/**
 * Valibot schema for canonical plugin registry items.
 */
export const ServerPluginRegistryItemValibotSchema = v.strictObject({
  name: v.string(),
  scope: v.picklist(SERVER_PLUGIN_SCOPES),
  kind: v.picklist(SERVER_PLUGIN_KINDS),
  source: v.picklist(SERVER_PLUGIN_SOURCES),
  group: v.string(),
  index: v.number(),
  position: v.optional(v.picklist(SERVER_PLUGIN_POSITIONS)),
  enabled: v.boolean(),
  ownerTeam: v.string(),
  responsibility: v.string(),
  domain: v.string(),
  interfaceContractVersion: v.string(),
  stableId: v.string(),
  contractKey: v.nullable(v.string()),
  capabilityContractVersion: v.string(),
  registrySource: v.picklist(SERVER_PLUGIN_REGISTRY_SOURCES),
  dependsOn: v.array(v.string()),
  conflictsWith: v.array(v.string()),
  extends: v.array(v.string()),
  provides: v.array(v.string()),
  requires: v.array(v.string()),
  signature: v.string(),
  fingerprint: v.string(),
  trustBoundary: v.picklist(SERVER_PLUGIN_TRUST_BOUNDARIES),
  trusted: v.boolean(),
  interfaceCompatible: v.boolean(),
  capabilityCompatible: v.boolean(),
});

/**
 * Valibot output type for canonical plugin registry items.
 */
export type ServerPluginRegistryItemValibot = v.InferOutput<
  typeof ServerPluginRegistryItemValibotSchema
>;

/**
 * Valibot schema for plugin registry reads.
 *
 * Uses canonical plugin fields while allowing unknown future fields.
 */
export const ReadServerPluginRegistryItemValibotSchema = v.looseObject(
  ServerPluginRegistryItemValibotSchema.entries,
);

/**
 * Valibot output type for plugin registry reads.
 */
export type ReadServerPluginRegistryItemValibot = v.InferOutput<
  typeof ReadServerPluginRegistryItemValibotSchema
>;

/**
 * Valibot schema for plugin manifest payloads.
 */
export const ServerPluginManifestValibotSchema: v.StrictObjectSchema<
  {
    readonly registryHash: v.StringSchema<undefined>;
    readonly version: v.StringSchema<undefined>;
    readonly createdAt: v.StringSchema<undefined>;
    readonly routeCount: v.NumberSchema<undefined>;
    readonly pluginCount: v.NumberSchema<undefined>;
    readonly source: v.PicklistSchema<readonly ["runtime", "build"], undefined>;
    readonly manifestHash: v.StringSchema<undefined>;
    readonly manifestSignature: v.StringSchema<undefined>;
  },
  undefined
> = v.strictObject({
  registryHash: v.string(),
  version: v.string(),
  createdAt: v.string(),
  routeCount: v.number(),
  pluginCount: v.number(),
  source: v.picklist(SERVER_PLUGIN_MANIFEST_SOURCES),
  manifestHash: v.string(),
  manifestSignature: v.string(),
});

/**
 * Valibot output type for plugin manifest payloads.
 */
export type ServerPluginManifestValibot = v.InferOutput<typeof ServerPluginManifestValibotSchema>;

/**
 * Valibot schema for `/system/plugins` responses.
 */
export const SystemPluginsResponseValibotSchema = v.looseObject({
  ok: v.literal(true),
  count: v.number(),
  updatedAt: v.string(),
  manifest: ServerPluginManifestValibotSchema,
  plugins: v.array(v.looseObject(ServerPluginRegistryItemValibotSchema.entries)),
});

/**
 * Valibot output type for `/system/plugins` responses.
 */
export type SystemPluginsResponseValibot = v.InferOutput<typeof SystemPluginsResponseValibotSchema>;

/**
 * Valibot schema for `/system/plugins` reads.
 */
export const ReadSystemPluginsResponseValibotSchema = v.looseObject({
  ok: v.literal(true),
  count: v.number(),
  updatedAt: v.string(),
  manifest: ServerPluginManifestValibotSchema,
  plugins: v.array(ReadServerPluginRegistryItemValibotSchema),
});

/**
 * Output type for `/system/plugins` reads.
 */
export type ReadSystemPluginsResponseValibot = v.InferOutput<
  typeof ReadSystemPluginsResponseValibotSchema
>;
