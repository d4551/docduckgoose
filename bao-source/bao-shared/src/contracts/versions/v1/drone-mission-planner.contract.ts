/**
 * Drone mission planner contracts v1.
 *
 * Defines versioned contracts for mission plan compilation and mission artifact
 * export endpoints.
 *
 * @shared/contracts/versions/v1/drone-mission-planner
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  DroneMissionPlannerCompileResponseSchema,
  DroneMissionPlannerExportRequestSchema,
  DroneMissionPlannerExportResponseSchema,
  DroneMissionPlannerRequestSchema,
} from "../../../schemas/drone-mission-planner.schemas.ts";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/** Contract version identifier for mission planner routes. */
export const CONTRACT_VERSION = "1.0.0";

/** Contract name for mission planner compile route. */
export const COMPILE_CONTRACT_NAME = "drone-mission-planner-compile";
/** Contract name for mission planner export route. */
export const EXPORT_CONTRACT_NAME = "drone-mission-planner-export";

/** Request schema for mission planner compile route. */
export const DroneMissionPlannerCompileRequestV1: typeof DroneMissionPlannerRequestSchema =
  DroneMissionPlannerRequestSchema;
/** Response schema for mission planner compile route. */
export const DroneMissionPlannerCompileResponseV1: typeof DroneMissionPlannerCompileResponseSchema =
  DroneMissionPlannerCompileResponseSchema;

/** Request schema for mission planner export route. */
export const DroneMissionPlannerExportRequestV1: typeof DroneMissionPlannerExportRequestSchema =
  DroneMissionPlannerExportRequestSchema;
/** Response schema for mission planner export route. */
export const DroneMissionPlannerExportResponseV1: typeof DroneMissionPlannerExportResponseSchema =
  DroneMissionPlannerExportResponseSchema;

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/** Error map for mission planner compile route. */
export const DroneMissionPlannerCompileErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/** Error map for mission planner export route. */
export const DroneMissionPlannerExportErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/** Full contract definition for mission planner compile route. */
export const DroneMissionPlannerCompileContractV1 = {
  version: CONTRACT_VERSION,
  name: COMPILE_CONTRACT_NAME,
  request: DroneMissionPlannerCompileRequestV1,
  response: DroneMissionPlannerCompileResponseV1,
  errors: DroneMissionPlannerCompileErrorV1,
} as const satisfies VersionedContractV1;

/** Full contract definition for mission planner export route. */
export const DroneMissionPlannerExportContractV1 = {
  version: CONTRACT_VERSION,
  name: EXPORT_CONTRACT_NAME,
  request: DroneMissionPlannerExportRequestV1,
  response: DroneMissionPlannerExportResponseV1,
  errors: DroneMissionPlannerExportErrorV1,
} as const satisfies VersionedContractV1;
