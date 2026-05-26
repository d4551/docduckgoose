/**
 * First-party OpenAPI surface for the bao ecosystem.
 *
 * Canonical implementation lives in `@baohaus/bunbuddy-shared` until the
 * OpenAPI sanitizer tree relocates into this package. Runtime consumers
 * import `@baohaus/bao-config/openapi` only.
 *
 * @packageDocumentation
 */

export {
  createOpenApiResponseSanitizerPlugin,
  isOpenApiDocument,
  sanitizeOpenApiDocument,
} from "@baohaus/bunbuddy-shared/openapi";

export type {
  OpenApiCodeSample,
  OpenApiContactMetadata,
  OpenApiDetail,
} from "@baohaus/bunbuddy-shared/openapi-types";
