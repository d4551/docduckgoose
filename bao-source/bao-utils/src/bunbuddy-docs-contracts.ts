/**
 * BunBuddy docs/spec contract resolution helpers.
 *
 * Provides a single contract-first resolution algorithm for interactive docs
 * and OpenAPI spec routes to avoid drift across server/runtime/tooling layers.
 *
 * @baohaus/bao-utils/bunbuddy-docs-contracts
 */

import type {
  BunBuddyContractMethod,
  BunBuddyContractsEntry,
} from "@baohaus/bao-schemas/bunbuddy-contracts.schemas";
import { isNonEmptyString } from "./type-guards.js";

/**
 * Resolved docs/spec contract paths and methods for a bunbuddy entry.
 */
export type BunBuddyDocsSpecContractResolution = {
  docsPath: string | null;
  docsMethod: BunBuddyContractMethod | null;
  specPath: string | null;
  specMethod: BunBuddyContractMethod | null;
};

/**
 * Determine whether a contract path points to a JSON OpenAPI spec endpoint.
 *
 * @param value - Contract path.
 * @returns True when the path is a JSON spec route.
 */
export function isJsonSpecPath(value: string): boolean {
  const normalized = value.toLowerCase();
  return normalized.endsWith(".json") || normalized.endsWith("/json");
}

/**
 * Resolve interactive docs and OpenAPI spec contracts for a bunbuddy entry.
 *
 * Contract key precedence:
 * - Docs: `docs`, then non-JSON `openapi`
 * - Spec: `openapiJson`, then `docsJson`, then JSON `openapi`
 *
 * @param entry - BunBuddy contracts entry.
 * @returns Resolved docs/spec paths and methods.
 */
export function resolveBunBuddyDocsAndSpecContracts(
  entry: Pick<BunBuddyContractsEntry, "contracts">,
): BunBuddyDocsSpecContractResolution {
  const docs = entry.contracts.docs;
  const docsJson = entry.contracts.docsJson;
  const openapi = entry.contracts.openapi;
  const openapiJson = entry.contracts.openapiJson;

  const docsPath = docs?.path ?? (openapi && !isJsonSpecPath(openapi.path) ? openapi.path : null);
  const docsMethod =
    docs?.method ?? (openapi && !isJsonSpecPath(openapi.path) ? openapi.method : null);

  const specPath =
    openapiJson?.path ??
    docsJson?.path ??
    (openapi && isJsonSpecPath(openapi.path) ? openapi.path : null);
  const specMethod =
    openapiJson?.method ??
    docsJson?.method ??
    (openapi && isJsonSpecPath(openapi.path) ? openapi.method : null);

  return {
    docsPath,
    docsMethod,
    specPath,
    specMethod,
  };
}

/**
 * Canonical OpenAPI operation defaults for BunBuddy docs and spec routes.
 *
 * Shared across exporters and CI verifiers to keep docs route contracts
 * deterministic and free from cross-file wording drift.
 */
export const BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS: {
  readonly tag: "Docs";
  readonly docs: {
    readonly summary: "Interactive API docs";
    readonly description: "Returns the interactive API documentation UI.";
  };
  readonly spec: {
    readonly summary: "OpenAPI specification";
    readonly description: "Returns the OpenAPI specification document.";
  };
} = {
  tag: "Docs",
  docs: {
    summary: "Interactive API docs",
    description: "Returns the interactive API documentation UI.",
  },
  spec: {
    summary: "OpenAPI specification",
    description: "Returns the OpenAPI specification document.",
  },
} as const;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getOrCreateRecord(parent: UnknownRecord, key: string): UnknownRecord {
  const current = parent[key];
  if (isRecord(current)) {
    return current;
  }
  const created: UnknownRecord = {};
  parent[key] = created;
  return created;
}

function readOperationTags(operation: UnknownRecord): unknown[] | null {
  const tags = operation.tags;
  return Array.isArray(tags) ? tags : null;
}

function isOperationResponseValid(
  operation: UnknownRecord,
): operation is UnknownRecord & { responses: UnknownRecord; "200": UnknownRecord } {
  const responses = operation.responses;
  if (!isRecord(responses)) {
    return false;
  }
  const successResponse = responses["200"];
  return (
    isRecord(successResponse) &&
    typeof successResponse.description === "string" &&
    successResponse.description.trim().length > 0
  );
}

function ensureDocsGetOperation(params: {
  pathItem: UnknownRecord;
  summary: string;
  description: string;
}): void {
  const getOperation = getOrCreateRecord(params.pathItem, "get");
  const existingTags = getOperation.tags;
  if (!Array.isArray(existingTags)) {
    getOperation.tags = [BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.tag];
  } else if (!existingTags.includes(BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.tag)) {
    getOperation.tags = [...existingTags, BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.tag];
  }

  if (typeof getOperation.summary !== "string" || getOperation.summary.trim().length === 0) {
    getOperation.summary = params.summary;
  }
  if (
    typeof getOperation.description !== "string" ||
    getOperation.description.trim().length === 0
  ) {
    getOperation.description = params.description;
  }

  const responses = getOrCreateRecord(getOperation, "responses");
  const successResponse = getOrCreateRecord(responses, "200");
  if (
    typeof successResponse.description !== "string" ||
    successResponse.description.trim().length === 0
  ) {
    successResponse.description = params.description;
  }
}

function ensureTopLevelDocsTag(openApiDocument: UnknownRecord): void {
  const currentTags = openApiDocument.tags;
  if (!Array.isArray(currentTags)) {
    openApiDocument.tags = [{ name: BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.tag }];
    return;
  }
  const hasDocsTag = currentTags.some(
    (entry) => isRecord(entry) && entry.name === BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.tag,
  );
  if (hasDocsTag) {
    return;
  }
  openApiDocument.tags = [
    ...currentTags,
    {
      name: BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.tag,
    },
  ];
}

/**
 * Normalize OpenAPI docs/spec routes to include complete operation metadata.
 *
 * @param params - Normalization parameters.
 * @param params.openApiDocument - Parsed OpenAPI document.
 * @param params.docsPath - Interactive docs route path from contracts.
 * @param params.specPath - OpenAPI JSON route path from contracts.
 */
export function ensureBunBuddyOpenApiDocsOperations(params: {
  openApiDocument: unknown;
  docsPath: string | null;
  specPath: string | null;
}): void {
  if (!isRecord(params.openApiDocument)) {
    return;
  }
  ensureTopLevelDocsTag(params.openApiDocument);
  const paths = getOrCreateRecord(params.openApiDocument, "paths");

  if (params.docsPath) {
    const docsPathItem = getOrCreateRecord(paths, params.docsPath);
    ensureDocsGetOperation({
      pathItem: docsPathItem,
      summary: BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.docs.summary,
      description: BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.docs.description,
    });
  }

  if (params.specPath) {
    const specPathItem = getOrCreateRecord(paths, params.specPath);
    ensureDocsGetOperation({
      pathItem: specPathItem,
      summary: BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.spec.summary,
      description: BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.spec.description,
    });
  }
}

/**
 * Validate that a BunBuddy OpenAPI path operation is present and complete.
 *
 * @param params - Validation parameters.
 * @param params.openApiDocument - Parsed OpenAPI document.
 * @param params.routePath - Contract route path.
 * @param params.method - Contract HTTP method.
 * @param params.requireResponses - Require a non-empty `responses` object with a `200` response.
 * @param params.requireDocsTag - Require `Docs` tag on the operation.
 * @param params.requireSummaryDescription - Require non-empty summary and description.
 * @returns True when operation satisfies requested checks.
 */
export function hasBunBuddyOpenApiOperation(params: {
  openApiDocument: unknown;
  routePath: string;
  method: BunBuddyContractMethod;
  requireResponses?: boolean;
  requireDocsTag?: boolean;
  requireSummaryDescription?: boolean;
}): boolean {
  if (!isRecord(params.openApiDocument)) {
    return false;
  }
  const paths = params.openApiDocument.paths;
  if (!isRecord(paths)) {
    return false;
  }
  const pathItem = paths[params.routePath];
  if (!isRecord(pathItem)) {
    return false;
  }
  const methodKey = params.method.toLowerCase();
  const operation = pathItem[methodKey];
  if (!isRecord(operation)) {
    return false;
  }

  if (params.requireDocsTag) {
    const tags = readOperationTags(operation);
    if (!tags?.includes(BUNBUDDY_OPENAPI_DOCS_OPERATION_DEFAULTS.tag)) {
      return false;
    }
  }

  if (params.requireSummaryDescription) {
    if (!(isNonEmptyString(operation.summary) && isNonEmptyString(operation.description))) {
      return false;
    }
  }

  if (params.requireResponses) {
    return isOperationResponseValid(operation);
  }

  return true;
}
