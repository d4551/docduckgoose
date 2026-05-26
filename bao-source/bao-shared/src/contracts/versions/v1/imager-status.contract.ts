/**
 * Imager Operational Contracts v1
 *
 * Defines versioned contracts for the imager operational endpoints:
 * - Status: `GET /api/v1/imager/status`
 * - Enumerate: `POST /api/v1/imager/enumerate`
 * - Health: `GET /api/v1/imager/health`
 *
 * @shared/contracts/versions/v1/imager-status
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  ImagerEnumerateRequestSchema,
  ImagerEnumerateResponseSchema,
  ImagerHealthResponseSchema,
  ImagerStatusResponseSchema,
} from "../../../schemas/imager-status.schemas.ts";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const STATUS_CONTRACT_NAME = "imager-status";
/** Contract name for imager device enumeration. */
export const ENUMERATE_CONTRACT_NAME = "imager-enumerate";
/** Contract name for imager health checks. */
export const HEALTH_CONTRACT_NAME = "imager-health";

/** Request schema for imager status queries. */
export const ImagerStatusRequestV1: Type.TObject<Record<string, never>, never, never> = Type.Object(
  {},
  {},
);
/** Response schema for imager status snapshots. */
export const ImagerStatusResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly services: Type.TRecord<Type.TString, Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly errors: Type.TArray<
      Type.TObject<
        { readonly source: Type.TString; readonly error: Type.TString },
        "error" | "source",
        never
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "errors" | "services",
  never
> = ImagerStatusResponseSchema;

/** Request schema for imager device enumeration. */
export const ImagerEnumerateRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = ImagerEnumerateRequestSchema;
/** Response schema for imager device enumeration results. */
export const ImagerEnumerateResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly devices: Type.TArray<Type.TObject<{ readonly source: Type.TString }, "source", never>>;
    readonly count: Type.TInteger;
    readonly errors: Type.TArray<
      Type.TObject<
        { readonly source: Type.TString; readonly error: Type.TString },
        "source" | "error",
        never
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "devices" | "errors" | "count" | "timestamp",
  never
> = ImagerEnumerateResponseSchema;

/** Request schema for imager health probes. */
export const ImagerHealthRequestV1: Type.TObject<Record<string, never>, never, never> = Type.Object(
  {},
  {},
);
/** Response schema for imager health check results. */
export const ImagerHealthResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly baseUrl: Type.TString;
    readonly data: Type.TUnknown;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "baseUrl" | "data",
  never
> = ImagerHealthResponseSchema;

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/** Error response schema covering all standard HTTP error statuses for imager contracts. */
export const ImagerErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/** V1 contract definition for imager status operations. */
export const ImagerStatusContractV1 = {
  version: CONTRACT_VERSION,
  name: STATUS_CONTRACT_NAME,
  request: ImagerStatusRequestV1,
  response: ImagerStatusResponseV1,
  errors: ImagerErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract definition for imager device enumeration. */
export const ImagerEnumerateContractV1 = {
  version: CONTRACT_VERSION,
  name: ENUMERATE_CONTRACT_NAME,
  request: ImagerEnumerateRequestV1,
  response: ImagerEnumerateResponseV1,
  errors: ImagerErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract definition for imager health checks. */
export const ImagerHealthContractV1 = {
  version: CONTRACT_VERSION,
  name: HEALTH_CONTRACT_NAME,
  request: ImagerHealthRequestV1,
  response: ImagerHealthResponseV1,
  errors: ImagerErrorV1,
} as const satisfies VersionedContractV1;
