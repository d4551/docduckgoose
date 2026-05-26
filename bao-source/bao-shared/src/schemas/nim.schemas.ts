/**
 * NVIDIA NIM API schemas.
 *
 * Shared TypeBox schemas for the NVIDIA NIM integration endpoints.
 * These schemas are used across server routes, contract tests, and HTML UI types
 * to prevent drift between backend responses and frontend expectations.
 *
 * @shared/schemas/nim.schemas
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * NVIDIA NIM service health status.
 *
 * - `ready`: Service is healthy and accepting requests
 * - `unreachable`: Cannot connect to the NIM endpoint
 * - `not_configured`: NIM endpoint URL is not set
 * - `missing_endpoint`: Endpoint configuration is incomplete
 * - `disabled`: NIM integration is explicitly disabled
 * - `auth_required`: Valid API key is required but not provided
 */
export const NimHealthStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"ready">
    | Type.TLiteral<"unreachable">
    | Type.TLiteral<"not_configured">
    | Type.TLiteral<"missing_endpoint">
    | Type.TLiteral<"disabled">
    | Type.TLiteral<"auth_required">
  )[]
> = Type.Union(
  [
    Type.Literal("ready"),
    Type.Literal("unreachable"),
    Type.Literal("not_configured"),
    Type.Literal("missing_endpoint"),
    Type.Literal("disabled"),
    Type.Literal("auth_required"),
  ],
  {},
);

/**
 * TypeScript type for the NVIDIA NIM health status.
 */
export type NimHealthStatus = Static<typeof NimHealthStatusSchema>;

/**
 * Result of probing a NIM endpoint for health.
 */
export const NimProbeResultSchema: Type.TObject<
  {
    readonly ok: Type.TBoolean;
    readonly latencyMs: Type.TOptional<Type.TNumber>;
    readonly statusCode: Type.TOptional<Type.TNumber>;
    readonly message: Type.TOptional<Type.TString>;
  },
  "ok",
  Type.InferOptionalKeys<{
    readonly ok: Type.TBoolean;
    readonly latencyMs: Type.TOptional<Type.TNumber>;
    readonly statusCode: Type.TOptional<Type.TNumber>;
    readonly message: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    /** Whether the probe succeeded. */
    ok: Type.Boolean(),
    /** Round-trip latency in milliseconds. */
    latencyMs: Type.Optional(Type.Number()),
    /** HTTP status code from the probe request. */
    statusCode: Type.Optional(Type.Number()),
    /** Error or status message. */
    message: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for the NVIDIA NIM probe result.
 */
export type NimProbeResult = Static<typeof NimProbeResultSchema>;

/**
 * NIM health check response payload schema.
 */
export const NimHealthResponseSchema = Type.Union(
  [
    Type.Object(
      {
        ok: Type.Literal(true),
        status: NimHealthStatusSchema,
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        healthPath: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        model: Type.Union([Type.String(), Type.Null()]),
        latencyMs: Type.Optional(Type.Number()),
        live: Type.Optional(NimProbeResultSchema),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
    Type.Object(
      {
        ok: Type.Literal(false),
        error: Type.String(),
        status: NimHealthStatusSchema,
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        healthPath: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        model: Type.Union([Type.String(), Type.Null()]),
        latencyMs: Type.Optional(Type.Number()),
        live: Type.Optional(NimProbeResultSchema),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM health response.
 */
export type NimHealthResponse = Static<typeof NimHealthResponseSchema>;

/**
 * NIM models list response payload schema.
 */
export const NimModelsResponseSchema = Type.Union(
  [
    Type.Object(
      {
        ok: Type.Literal(true),
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        models: Type.Array(Type.Unknown()),
        count: Type.Number(),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
    Type.Object(
      {
        ok: Type.Literal(false),
        error: Type.String(),
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        models: Type.Array(Type.Unknown()),
        count: Type.Number(),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM models response.
 */
export type NimModelsResponse = Static<typeof NimModelsResponseSchema>;

/**
 * NIM metadata response payload schema.
 */
export const NimMetadataResponseSchema = Type.Union(
  [
    Type.Object(
      {
        ok: Type.Literal(true),
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        metadata: Type.Union([Type.Unknown(), Type.Null()]),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
    Type.Object(
      {
        ok: Type.Literal(false),
        error: Type.String(),
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        metadata: Type.Null(),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM metadata response.
 */
export type NimMetadataResponse = Static<typeof NimMetadataResponseSchema>;

/**
 * NIM version response payload schema.
 */
export const NimVersionResponseSchema = Type.Union(
  [
    Type.Object(
      {
        ok: Type.Literal(true),
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        version: Type.Union([Type.String(), Type.Null()]),
        payload: Type.Union([Type.Unknown(), Type.Null()]),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
    Type.Object(
      {
        ok: Type.Literal(false),
        error: Type.String(),
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        version: Type.Null(),
        payload: Type.Null(),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM version response.
 */
export type NimVersionResponse = Static<typeof NimVersionResponseSchema>;

/**
 * NIM metrics response payload schema.
 */
export const NimMetricsResponseSchema = Type.Union(
  [
    Type.Object(
      {
        ok: Type.Literal(true),
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        payload: Type.Union([Type.Unknown(), Type.Null()]),
        contentType: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
    Type.Object(
      {
        ok: Type.Literal(false),
        error: Type.String(),
        baseUrl: Type.Union([Type.String(), Type.Null()]),
        endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        payload: Type.Null(),
        contentType: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        checkedAt: Type.String(),
        statusCode: Type.Optional(Type.Number()),
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM metrics response.
 */
export type NimMetricsResponse = Static<typeof NimMetricsResponseSchema>;

/**
 * NIM endpoints source schema.
 */
export const NimEndpointsSourceSchema: Type.TUnion<
  (Type.TLiteral<"settings"> | Type.TLiteral<"env">)[]
> = Type.Union([Type.Literal("settings"), Type.Literal("env")], {});

/**
 * TypeScript type for the NIM endpoints source.
 */
export type NimEndpointsSource = Static<typeof NimEndpointsSourceSchema>;

/**
 * NIM endpoint list response payload schema.
 */
export const NimEndpointsResponseSchema = Type.Union(
  [
    Type.Object(
      {
        ok: Type.Literal(true),
        endpoints: Type.Array(Type.String()),
        activeEndpoint: Type.Union([Type.String(), Type.Null()]),
        source: NimEndpointsSourceSchema,
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
    Type.Object(
      {
        ok: Type.Literal(false),
        endpoints: Type.Array(Type.String()),
        activeEndpoint: Type.Union([Type.String(), Type.Null()]),
        source: NimEndpointsSourceSchema,
        message: Type.Optional(Type.String()),
        error: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM endpoints response.
 */
export type NimEndpointsResponse = Static<typeof NimEndpointsResponseSchema>;

/**
 * NIM credential source schema.
 */
export const NimCredentialSourceSchema: Type.TUnion<
  (Type.TLiteral<"env"> | Type.TLiteral<"db"> | Type.TLiteral<"none">)[]
> = Type.Union([Type.Literal("env"), Type.Literal("db"), Type.Literal("none")], {});

/**
 * TypeScript type for the NIM credential source.
 */
export type NimCredentialSource = Static<typeof NimCredentialSourceSchema>;

/**
 * NIM credential status response payload schema.
 */
export const NimCredentialsResponseSchema = Type.Union(
  [
    Type.Object(
      {
        ok: Type.Literal(true),
        configured: Type.Boolean(),
        source: NimCredentialSourceSchema,
        message: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
    Type.Object(
      {
        ok: Type.Literal(false),
        configured: Type.Boolean(),
        source: NimCredentialSourceSchema,
        message: Type.Optional(Type.String()),
        error: Type.Optional(Type.String()),
      },
      { additionalProperties: Type.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM credentials response.
 */
export type NimCredentialsResponse = Static<typeof NimCredentialsResponseSchema>;
