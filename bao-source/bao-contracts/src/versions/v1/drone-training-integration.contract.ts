/**
 * Drone-training deep integration contracts v1.
 *
 * Defines the versioned contracts for the drone-training integration surface:
 * a GET snapshot endpoint and a POST deploy-model-to-drone endpoint.
 *
 * @shared/contracts/versions/v1/drone-training-integration
 */

import { DroneTrainingIntegrationSnapshotSchema } from "@baohaus/bao-schemas/drone-training-integration.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

// Constants

/**
 * Semantic version for all drone-training integration contracts.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for the GET integration snapshot endpoint.
 */
export const SNAPSHOT_CONTRACT_NAME = "drone-training-integration";

/**
 * Contract name for the POST deploy-model endpoint.
 */
export const DEPLOY_CONTRACT_NAME = "drone-training-deploy";

// Shared error envelope

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

// GET Snapshot Contract

/**
 * Request schema for the drone-training integration snapshot.
 *
 * Optionally filters by drone device and controls whether deployments are
 * included in the response.
 */
export const DroneTrainingIntegrationRequestV1 = Type.Object(
  {
    /** Optional drone device ID to filter results. */
    droneDeviceId: Type.Optional(Type.String()),
    /** Whether to include model deployments in the snapshot (defaults to `true`). */
    includeDeployments: Type.Optional(Type.Boolean({ default: true })),
  },
  { additionalProperties: false },
);

/**
 * Response schema for the drone-training integration snapshot.
 */
export const DroneTrainingIntegrationResponseV1: typeof DroneTrainingIntegrationSnapshotSchema =
  DroneTrainingIntegrationSnapshotSchema;

/**
 * Error schema for the GET snapshot endpoint.
 *
 * Covers standard HTTP error codes relevant to authenticated read operations.
 */
export const DroneTrainingIntegrationErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Full contract definition for the GET snapshot endpoint.
 */
export const DroneTrainingIntegrationContractV1 = {
  version: CONTRACT_VERSION,
  name: SNAPSHOT_CONTRACT_NAME,
  request: DroneTrainingIntegrationRequestV1,
  response: DroneTrainingIntegrationResponseV1,
  errors: DroneTrainingIntegrationErrorV1,
} as const satisfies VersionedContractV1;

// POST Deploy Contract

/**
 * Request schema for deploying a trained model to a drone inference pipeline.
 */
export const DroneTrainingDeployRequestV1: Type.TObject<
  {
    readonly modelId: Type.TString;
    readonly trainingJobId: Type.TString;
    readonly targetDroneId: Type.TOptional<Type.TString>;
    readonly pipelineStage: Type.TUnion<
      (
        | Type.TLiteral<"perception">
        | Type.TLiteral<"detection">
        | Type.TLiteral<"classification">
        | Type.TLiteral<"segmentation">
        | Type.TLiteral<"tracking">
      )[]
    >;
  },
  "pipelineStage" | "modelId" | "trainingJobId",
  "targetDroneId"
> = Type.Object(
  {
    /** Identifier of the trained model artifact to deploy. */
    modelId: Type.String({ minLength: 1 }),
    /** Identifier of the training job that produced the model. */
    trainingJobId: Type.String({ minLength: 1 }),
    /** Specific drone target (`undefined` targets all drones). */
    targetDroneId: Type.Optional(Type.String()),
    /** Pipeline stage where the model should be deployed. */
    pipelineStage: Type.Union([
      Type.Literal("perception"),
      Type.Literal("detection"),
      Type.Literal("classification"),
      Type.Literal("segmentation"),
      Type.Literal("tracking"),
    ]),
  },
  { additionalProperties: false },
);

/**
 * Response schema for the deploy endpoint (returns the updated snapshot).
 */
export const DroneTrainingDeployResponseV1: typeof DroneTrainingIntegrationSnapshotSchema =
  DroneTrainingIntegrationSnapshotSchema;

/**
 * Error schema for the POST deploy endpoint.
 *
 * Includes additional status codes for not-found and conflict scenarios.
 */
export const DroneTrainingDeployErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Full contract definition for the POST deploy endpoint.
 */
export const DroneTrainingDeployContractV1 = {
  version: CONTRACT_VERSION,
  name: DEPLOY_CONTRACT_NAME,
  request: DroneTrainingDeployRequestV1,
  response: DroneTrainingDeployResponseV1,
  errors: DroneTrainingDeployErrorV1,
} as const satisfies VersionedContractV1;
