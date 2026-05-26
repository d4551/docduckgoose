/**
 * Fleet API contracts v1.
 *
 * Contract-first TypeBox contract registry for `/api/v1/fleet`.
 *
 * @shared/contracts/versions/v1/fleet
 */

import {
  FleetAdapterListResponseSchema,
  FleetAssignmentPreviewRequestSchema,
  FleetAssignmentPreviewResponseSchema,
  FleetRunCancelResponseSchema,
  FleetRunCreateRequestSchema,
  FleetRunCreateResponseSchema,
  FleetRunSnapshotResponseSchema,
} from "@baohaus/bao-schemas/fleet.schemas";
import {
  FleetIncidentAckRequestSchema,
  FleetIncidentAckResponseSchema,
  FleetIncidentListResponseSchema,
} from "@baohaus/bao-schemas/fleet-alerts.schemas";
import {
  FleetRunEventsQuerySchema,
  FleetRunEventsResponseSchema,
} from "@baohaus/bao-schemas/fleet-events.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Fleet contract semantic version.
 */
export const FLEET_CONTRACT_VERSION = "1.0.0";

/**
 * Fleet route contract names.
 */
export const FLEET_CONTRACT_NAMES: {
  readonly createRun: "fleet-run-create";
  readonly getRun: "fleet-run-get";
  readonly cancelRun: "fleet-run-cancel";
  readonly listEvents: "fleet-run-events";
  readonly listAdapters: "fleet-adapters-list";
  readonly previewAssignments: "fleet-assignments-preview";
  readonly listAlerts: "fleet-alerts-list";
  readonly acknowledgeAlert: "fleet-alert-ack";
} = {
  createRun: "fleet-run-create",
  getRun: "fleet-run-get",
  cancelRun: "fleet-run-cancel",
  listEvents: "fleet-run-events",
  listAdapters: "fleet-adapters-list",
  previewAssignments: "fleet-assignments-preview",
  listAlerts: "fleet-alerts-list",
  acknowledgeAlert: "fleet-alert-ack",
} as const;

const FleetErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/**
 * Shared fleet error contract schema.
 */
export const FleetErrorV1 = Type.Object(
  {
    400: FleetErrorEnvelopeV1,
    401: FleetErrorEnvelopeV1,
    403: FleetErrorEnvelopeV1,
    404: FleetErrorEnvelopeV1,
    409: FleetErrorEnvelopeV1,
    422: FleetErrorEnvelopeV1,
    429: FleetErrorEnvelopeV1,
    500: FleetErrorEnvelopeV1,
    502: FleetErrorEnvelopeV1,
    503: FleetErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Contract for creating a fleet run.
 */
export const FleetRunCreateContractV1 = {
  version: FLEET_CONTRACT_VERSION,
  name: FLEET_CONTRACT_NAMES.createRun,
  request: FleetRunCreateRequestSchema,
  response: FleetRunCreateResponseSchema,
  errors: FleetErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract for fleet run snapshot lookup.
 */
export const FleetRunGetContractV1 = {
  version: FLEET_CONTRACT_VERSION,
  name: FLEET_CONTRACT_NAMES.getRun,
  request: Type.Object({ runId: Type.String({ minLength: 1 }) }, { additionalProperties: false }),
  response: FleetRunSnapshotResponseSchema,
  errors: FleetErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract for fleet run cancellation.
 */
export const FleetRunCancelContractV1 = {
  version: FLEET_CONTRACT_VERSION,
  name: FLEET_CONTRACT_NAMES.cancelRun,
  request: Type.Object({ runId: Type.String({ minLength: 1 }) }, { additionalProperties: false }),
  response: FleetRunCancelResponseSchema,
  errors: FleetErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract for fleet run event replay.
 */
export const FleetRunEventsContractV1 = {
  version: FLEET_CONTRACT_VERSION,
  name: FLEET_CONTRACT_NAMES.listEvents,
  request: FleetRunEventsQuerySchema,
  response: FleetRunEventsResponseSchema,
  errors: FleetErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract for fleet adapters listing.
 */
export const FleetAdaptersContractV1 = {
  version: FLEET_CONTRACT_VERSION,
  name: FLEET_CONTRACT_NAMES.listAdapters,
  request: Type.Object({}, { additionalProperties: false }),
  response: FleetAdapterListResponseSchema,
  errors: FleetErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract for deterministic assignment preview.
 */
export const FleetAssignmentsPreviewContractV1 = {
  version: FLEET_CONTRACT_VERSION,
  name: FLEET_CONTRACT_NAMES.previewAssignments,
  request: FleetAssignmentPreviewRequestSchema,
  response: FleetAssignmentPreviewResponseSchema,
  errors: FleetErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract for fleet alert listing.
 */
export const FleetAlertsListContractV1 = {
  version: FLEET_CONTRACT_VERSION,
  name: FLEET_CONTRACT_NAMES.listAlerts,
  request: Type.Object({}, { additionalProperties: false }),
  response: FleetIncidentListResponseSchema,
  errors: FleetErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract for fleet alert acknowledgement.
 */
export const FleetAlertAckContractV1 = {
  version: FLEET_CONTRACT_VERSION,
  name: FLEET_CONTRACT_NAMES.acknowledgeAlert,
  request: FleetIncidentAckRequestSchema,
  response: FleetIncidentAckResponseSchema,
  errors: FleetErrorV1,
} as const satisfies VersionedContractV1;
