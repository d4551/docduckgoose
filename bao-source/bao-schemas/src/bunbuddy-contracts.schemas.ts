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

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
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
export const BunBuddyContractMethodSchema: TUnion<
  [
    TLiteral<"GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS">,
    ...TLiteral<"GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS">[],
  ]
> = stringEnum(BUNBUDDY_CONTRACT_METHODS, {
  description: "Supported bunbuddy contract methods.",
});

/**
 * BunBuddy contract Kubernetes distribution schema.
 */
export const BunBuddyContractKubernetesDistributionSchema: TUnion<
  [TLiteral<"k0" | "k3" | "k8">, ...TLiteral<"k0" | "k3" | "k8">[]]
> = stringEnum(BUNBUDDY_CONTRACT_KUBERNETES_DISTRIBUTIONS, {
  description: "Supported Kubernetes distributions for bunbuddy platform targets.",
});

/**
 * Contract definition for a single bunbuddy endpoint.
 */
export const BunBuddyContractDefinitionSchema: TObject<
  {
    readonly method: TUnion<
      [
        TLiteral<"GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS">,
        ...TLiteral<"GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS">[],
      ]
    >;
    readonly path: TString;
  },
  "method" | "path",
  never
> = TypeExports.Object(
  {
    method: BunBuddyContractMethodSchema,
    path: TypeExports.String({ minLength: 1 }),
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
export const BunBuddyContractsDiscoverySchema: TObject<
  {
    readonly listContractKey: TOptional<TString>;
    readonly listResponseKeys: TOptional<TArray<TString>>;
  },
  never,
  InferOptionalKeys<{
    readonly listContractKey: TOptional<TString>;
    readonly listResponseKeys: TOptional<TArray<TString>>;
  }>
> = TypeExports.Object(
  {
    listContractKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    listResponseKeys: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy contracts timeout configuration schema.
 */
export const BunBuddyContractsTimeoutsSchema: TObject<
  { readonly defaultSec: TOptional<TNumber> },
  never,
  "defaultSec"
> = TypeExports.Object(
  {
    defaultSec: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy contracts docs metadata schema.
 *
 * `title` and `description` are required contract fields so docs presentation
 * metadata is owned by contracts (not bunbuddy runtime constants).
 */
export const BunBuddyContractsDocsMetadataSchema: TObject<
  {
    readonly title: TString;
    readonly description: TString;
    readonly readmePath: TString;
    readonly systemDocPath: TString;
    readonly notes: TOptional<TArray<TString>>;
  },
  "title" | "description" | "readmePath" | "systemDocPath",
  "notes"
> = TypeExports.Object(
  {
    title: TypeExports.String({ minLength: 1 }),
    description: TypeExports.String({ minLength: 1 }),
    readmePath: TypeExports.String({
      minLength: 1,
      pattern: "^bao-source/bunbuddy-shared/src/bunbuddies/.+/README\\.md$",
    }),
    systemDocPath: TypeExports.String({
      minLength: 1,
      pattern: "^docs/.+\\.md$",
    }),
    notes: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
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
export const BunBuddyContractsEntrySchema = TypeExports.Object(
  {
    openapiFile: TypeExports.String({
      minLength: 1,
      pattern: "^bao-source/bunbuddy-shared/src/bunbuddies/.+/openapi\\.yaml$",
    }),
    discovery: TypeExports.Optional(BunBuddyContractsDiscoverySchema),
    operations: TypeExports.Optional(
      TypeExports.Record(
        TypeExports.String({ minLength: 1 }),
        TypeExports.String({ minLength: 1 }),
      ),
    ),
    timeouts: TypeExports.Optional(BunBuddyContractsTimeoutsSchema),
    docsMetadata: BunBuddyContractsDocsMetadataSchema,
    mcpMetadata: TypeExports.Optional(McpProviderMetadataSchema),
    contracts: TypeExports.Record(
      TypeExports.String({ minLength: 1 }),
      BunBuddyContractDefinitionSchema,
    ),
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
export const BunBuddyContractsConfigSchema = TypeExports.Object(
  {
    version: TypeExports.String({ minLength: 1 }),
    versionPolicy: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    bunbuddies: TypeExports.Record(
      TypeExports.String({ minLength: 1 }),
      BunBuddyContractsEntrySchema,
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for the bunbuddy contracts registry payload.
 */
export type BunBuddyContractsConfig = Static<typeof BunBuddyContractsConfigSchema>;
