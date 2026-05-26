/**
 * MCP Contracts v1
 *
 * Defines versioned contracts for the generic provider-backed MCP endpoints.
 *
 * @shared/contracts/versions/v1/mcp
 */

import {
  McpContextResponseSchema,
  McpContextsListResponseSchema,
  McpPaginationQuerySchema,
  McpProviderQuerySchema,
  McpRegistryResourceReadResponseSchema,
  McpResourcesListResponseSchema,
  McpResourceTemplatesResponseSchema,
  McpToolCallRequestSchema,
  McpToolCallSuccessResponseSchema,
  McpToolsListResponseSchema,
} from "@baohaus/bao-schemas/mcp.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/** Contract name for the MCP resources list endpoint. */
export const MCP_RESOURCES_LIST_CONTRACT_NAME = "mcp-resources-list";
/** Contract name for the MCP resource read endpoint. */
export const MCP_RESOURCE_READ_CONTRACT_NAME = "mcp-resource-read";
/** Contract name for the MCP resource templates endpoint. */
export const MCP_RESOURCE_TEMPLATES_CONTRACT_NAME = "mcp-resource-templates";
/** Contract name for the MCP tools list endpoint. */
export const MCP_TOOLS_LIST_CONTRACT_NAME = "mcp-tools-list";
/** Contract name for the MCP tool call endpoint. */
export const MCP_TOOL_CALL_CONTRACT_NAME = "mcp-tool-call";
/** Contract name for the MCP contexts list endpoint. */
export const MCP_CONTEXTS_LIST_CONTRACT_NAME = "mcp-contexts-list";
/** Contract name for the MCP single-provider context endpoint. */
export const MCP_CONTEXT_CONTRACT_NAME = "mcp-context";

/**
 * Request schema for MCP resources list.
 */
export const McpResourcesListRequestV1: Type.TObject<
  {
    readonly cursor: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly cursor: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  }>
> = McpPaginationQuerySchema;

/**
 * Response schema for MCP resources list.
 */
export const McpResourcesListResponseV1: typeof McpResourcesListResponseSchema =
  McpResourcesListResponseSchema;

/**
 * Request schema for MCP resource read.
 */
export const McpResourceReadRequestV1: Type.TObject<
  { readonly encoded: Type.TString },
  "encoded",
  never
> = Type.Object(
  {
    encoded: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for MCP resource read.
 */
export const McpResourceReadResponseV1: typeof McpRegistryResourceReadResponseSchema =
  McpRegistryResourceReadResponseSchema;

/**
 * Request schema for MCP resource templates list.
 */
export const McpResourceTemplatesRequestV1: Type.TObject<
  {
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  }>
> = McpProviderQuerySchema;

/**
 * Response schema for MCP resource templates list.
 */
export const McpResourceTemplatesResponseV1: typeof McpResourceTemplatesResponseSchema =
  McpResourceTemplatesResponseSchema;

/**
 * Request schema for MCP tools list.
 */
export const McpToolsListRequestV1: Type.TObject<
  {
    readonly cursor: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly cursor: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  }>
> = McpPaginationQuerySchema;

/**
 * Response schema for MCP tools list.
 */
export const McpToolsListResponseV1: typeof McpToolsListResponseSchema = McpToolsListResponseSchema;

/**
 * Request schema for MCP tool call body payloads.
 */
export const McpToolCallRequestV1: Type.TObject<
  {
    readonly arguments: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly arguments: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = McpToolCallRequestSchema;

/**
 * Response schema for MCP tool call endpoints.
 */
export const McpToolCallResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly requestId: Type.TOptional<Type.TString>;
  },
  "timestamp" | "ok",
  Type.InferOptionalKeys<{
    readonly ok: Type.TLiteral<true>;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly requestId: Type.TOptional<Type.TString>;
  }>
> = McpToolCallSuccessResponseSchema;

/**
 * Request schema for MCP context list.
 */
export const McpContextsListRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

/**
 * Response schema for MCP context list.
 */
export const McpContextsListResponseV1: typeof McpContextsListResponseSchema =
  McpContextsListResponseSchema;

/**
 * Request schema for one MCP provider context bundle.
 */
export const McpContextRequestV1: Type.TObject<
  { readonly providerId: Type.TString },
  "providerId",
  never
> = Type.Object(
  {
    providerId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for one MCP provider context bundle.
 */
export const McpContextResponseV1: typeof McpContextResponseSchema = McpContextResponseSchema;

const MCP_ERRORS = Type.Object({
  400: buildErrorEnvelopeSchema(),
  403: buildErrorEnvelopeSchema(),
  404: buildErrorEnvelopeSchema(),
  500: buildErrorEnvelopeSchema(),
});

/**
 * MCP resources list contract.
 */
export const McpResourcesListContractV1 = {
  name: MCP_RESOURCES_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: McpResourcesListRequestV1,
  response: McpResourcesListResponseV1,
  errors: MCP_ERRORS,
} as const satisfies VersionedContractV1;

/**
 * MCP resource read contract.
 */
export const McpResourceReadContractV1 = {
  name: MCP_RESOURCE_READ_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: McpResourceReadRequestV1,
  response: McpResourceReadResponseV1,
  errors: MCP_ERRORS,
} as const satisfies VersionedContractV1;

/**
 * MCP resource templates contract.
 */
export const McpResourceTemplatesContractV1 = {
  name: MCP_RESOURCE_TEMPLATES_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: McpResourceTemplatesRequestV1,
  response: McpResourceTemplatesResponseV1,
  errors: MCP_ERRORS,
} as const satisfies VersionedContractV1;

/**
 * MCP tools list contract.
 */
export const McpToolsListContractV1 = {
  name: MCP_TOOLS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: McpToolsListRequestV1,
  response: McpToolsListResponseV1,
  errors: MCP_ERRORS,
} as const satisfies VersionedContractV1;

/**
 * MCP tool call contract.
 */
export const McpToolCallContractV1 = {
  name: MCP_TOOL_CALL_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: McpToolCallRequestV1,
  response: McpToolCallResponseV1,
  errors: MCP_ERRORS,
} as const satisfies VersionedContractV1;

/**
 * MCP contexts list contract.
 */
export const McpContextsListContractV1 = {
  name: MCP_CONTEXTS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: McpContextsListRequestV1,
  response: McpContextsListResponseV1,
  errors: MCP_ERRORS,
} as const satisfies VersionedContractV1;

/**
 * MCP provider context contract.
 */
export const McpContextContractV1 = {
  name: MCP_CONTEXT_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: McpContextRequestV1,
  response: McpContextResponseV1,
  errors: MCP_ERRORS,
} as const satisfies VersionedContractV1;
