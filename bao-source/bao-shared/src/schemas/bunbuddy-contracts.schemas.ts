/**
 * BunBuddy contracts registry schemas.
 *
 * Defines TypeBox schemas for the bunbuddy contracts registry JSON used to route
 * requests across bunbuddy runtimes. This is the contract-first boundary for
 * bunbuddy endpoint metadata (method/path), operation aliases, and defaults.
 * Each bunbuddy entry may also declare a checked-in `openapiFile` fallback path.
 *
 * @shared/schemas/bunbuddy-contracts.schemas
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { McpProviderMetadataSchema } from "./mcp.schemas.ts";

/**
 * Supported HTTP/WebSocket methods in bunbuddy contracts.
 */
export const BUNBUDDY_CONTRACT_METHODS: readonly ["GET", "POST", "PATCH", "PUT", "DELETE", "WS"] = [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "WS",
] as const;

/**
 * Type-safe bunbuddy contract HTTP method.
 */
export type BunBuddyContractMethod = (typeof BUNBUDDY_CONTRACT_METHODS)[number];

/**
 * Supported Kubernetes distributions for bunbuddy platform targets.
 */
export const BUNBUDDY_CONTRACT_KUBERNETES_DISTRIBUTIONS: readonly ["k0", "k3", "k8"] = [
  "k0",
  "k3",
  "k8",
] as const;

/**
 * Type-safe bunbuddy Kubernetes distribution target.
 */
export type BunBuddyContractKubernetesDistribution =
  (typeof BUNBUDDY_CONTRACT_KUBERNETES_DISTRIBUTIONS)[number];

/**
 * BunBuddy contract HTTP method schema.
 */
export const BunBuddyContractMethodSchema: Type.TUnion<
  [
    Type.TLiteral<"GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS">,
    ...Type.TLiteral<"GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS">[],
  ]
> = stringEnum(BUNBUDDY_CONTRACT_METHODS, {
  description: "Supported bunbuddy contract methods.",
});

/**
 * BunBuddy contract Kubernetes distribution schema.
 */
export const BunBuddyContractKubernetesDistributionSchema: Type.TUnion<
  [Type.TLiteral<"k0" | "k3" | "k8">, ...Type.TLiteral<"k0" | "k3" | "k8">[]]
> = stringEnum(BUNBUDDY_CONTRACT_KUBERNETES_DISTRIBUTIONS, {
  description: "Supported Kubernetes distributions for bunbuddy platform targets.",
});

/**
 * Contract definition for a single bunbuddy endpoint.
 */
export const BunBuddyContractDefinitionSchema: Type.TObject<
  {
    readonly method: Type.TUnion<
      [
        Type.TLiteral<"GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS">,
        ...Type.TLiteral<"GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS">[],
      ]
    >;
    readonly path: Type.TString;
  },
  "method" | "path",
  never
> = Type.Object(
  {
    method: BunBuddyContractMethodSchema,
    path: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for a bunbuddy contract definition.
 */
export type BunBuddyContractDefinition = Static<typeof BunBuddyContractDefinitionSchema>;

/**
 * BunBuddy contracts discovery metadata schema.
 */
export const BunBuddyContractsDiscoverySchema: Type.TObject<
  {
    readonly listContractKey: Type.TOptional<Type.TString>;
    readonly listResponseKeys: Type.TOptional<Type.TArray<Type.TString>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly listContractKey: Type.TOptional<Type.TString>;
    readonly listResponseKeys: Type.TOptional<Type.TArray<Type.TString>>;
  }>
> = Type.Object(
  {
    listContractKey: Type.Optional(Type.String({ minLength: 1 })),
    listResponseKeys: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy contracts timeout configuration schema.
 */
export const BunBuddyContractsTimeoutsSchema: Type.TObject<
  { readonly defaultSec: Type.TOptional<Type.TNumber> },
  never,
  "defaultSec"
> = Type.Object(
  {
    defaultSec: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy contracts docs metadata schema.
 *
 * `title` and `description` are required contract fields so docs presentation
 * metadata is owned by contracts (not bunbuddy runtime constants).
 */
export const BunBuddyContractsDocsMetadataSchema: Type.TObject<
  {
    readonly title: Type.TString;
    readonly description: Type.TString;
    readonly readmePath: Type.TString;
    readonly systemDocPath: Type.TString;
    readonly notes: Type.TOptional<Type.TArray<Type.TString>>;
  },
  "title" | "description" | "readmePath" | "systemDocPath",
  "notes"
> = Type.Object(
  {
    title: Type.String({ minLength: 1 }),
    description: Type.String({ minLength: 1 }),
    readmePath: Type.String({
      minLength: 1,
      pattern: "^bao-source/bunbuddy-shared/src/bunbuddies/.+/README\\.md$",
    }),
    systemDocPath: Type.String({
      minLength: 1,
      pattern: "^docs/.+\\.md$",
    }),
    notes: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy contracts docs metadata.
 */
export type BunBuddyContractsDocsMetadata = Static<typeof BunBuddyContractsDocsMetadataSchema>;

/**
 * BunBuddy contracts entry schema.
 */
export const BunBuddyContractsEntrySchema = Type.Object(
  {
    openapiFile: Type.String({
      minLength: 1,
      pattern: "^bao-source/bunbuddy-shared/src/bunbuddies/.+/openapi\\.yaml$",
    }),
    discovery: Type.Optional(BunBuddyContractsDiscoverySchema),
    operations: Type.Optional(
      Type.Record(Type.String({ minLength: 1 }), Type.String({ minLength: 1 })),
    ),
    timeouts: Type.Optional(BunBuddyContractsTimeoutsSchema),
    docsMetadata: BunBuddyContractsDocsMetadataSchema,
    mcpMetadata: Type.Optional(McpProviderMetadataSchema),
    contracts: Type.Record(Type.String({ minLength: 1 }), BunBuddyContractDefinitionSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for a bunbuddy contracts entry.
 */
export type BunBuddyContractsEntry = Static<typeof BunBuddyContractsEntrySchema>;

/**
 * BunBuddy contracts registry schema.
 */
export const BunBuddyContractsConfigSchema = Type.Object(
  {
    version: Type.String({ minLength: 1 }),
    versionPolicy: Type.Optional(Type.String({ minLength: 1 })),
    bunbuddies: Type.Record(Type.String({ minLength: 1 }), BunBuddyContractsEntrySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for the bunbuddy contracts registry payload.
 */
export type BunBuddyContractsConfig = Static<typeof BunBuddyContractsConfigSchema>;
