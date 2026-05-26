/**
 * Robotics-training deep integration contracts v1.
 *
 * Defines the versioned contracts for the robotics-training integration
 * surface: a GET snapshot endpoint and a POST deploy-model endpoint.
 *
 * @shared/contracts/versions/v1/robotics-training-integration
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { RoboticsTrainingIntegrationSnapshotSchema } from "../../../schemas/robotics-training-integration.schemas.ts";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

// Constants

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for the GET snapshot endpoint.
 */
export const SNAPSHOT_CONTRACT_NAME = "robotics-training-integration";

/**
 * Contract name for the POST deploy-model endpoint.
 */
export const DEPLOY_CONTRACT_NAME = "robotics-training-deploy";

// Snapshot contract (GET)

/**
 * Request schema for the robotics-training integration snapshot.
 *
 * Supports optional filtering by device and an opt-out flag for deployments.
 */
export const RoboticsTrainingIntegrationRequestV1: Type.TObject<
  {
    readonly roboticsDeviceId: Type.TOptional<Type.TString>;
    readonly includeDeployments: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly roboticsDeviceId: Type.TOptional<Type.TString>;
    readonly includeDeployments: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    /** Filter data sources and deployments to a specific robotics device. */
    roboticsDeviceId: Type.Optional(Type.String()),
    /** Whether to include model deployments in the response. Defaults to true. */
    includeDeployments: Type.Optional(Type.Boolean({ default: true })),
  },
  { additionalProperties: false },
);

/**
 * Response schema for the robotics-training integration snapshot.
 */
export const RoboticsTrainingIntegrationResponseV1: typeof RoboticsTrainingIntegrationSnapshotSchema =
  RoboticsTrainingIntegrationSnapshotSchema;

/**
 * Standard error envelope for snapshot API responses.
 */
const SnapshotErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/**
 * Error schema for the snapshot endpoint.
 */
export const RoboticsTrainingIntegrationErrorV1 = Type.Object(
  {
    400: SnapshotErrorEnvelopeV1,
    401: SnapshotErrorEnvelopeV1,
    403: SnapshotErrorEnvelopeV1,
    429: SnapshotErrorEnvelopeV1,
    500: SnapshotErrorEnvelopeV1,
    503: SnapshotErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Snapshot (GET) contract definition.
 *
 * Used by Eden client generation and contract tests to enforce
 * request/response shape parity between server and client.
 */
export const RoboticsTrainingIntegrationContractV1 = {
  version: CONTRACT_VERSION,
  name: SNAPSHOT_CONTRACT_NAME,
  request: RoboticsTrainingIntegrationRequestV1,
  response: RoboticsTrainingIntegrationResponseV1,
  errors: RoboticsTrainingIntegrationErrorV1,
} as const satisfies VersionedContractV1;

// Deploy contract (POST)

/**
 * Request schema for deploying a trained model to a robotics pipeline stage.
 */
export const RoboticsTrainingDeployRequestV1: Type.TObject<
  {
    readonly modelId: Type.TString;
    readonly trainingJobId: Type.TString;
    readonly targetRoboticsDeviceId: Type.TOptional<Type.TString>;
    readonly pipelineStage: Type.TUnion<
      (
        | Type.TLiteral<"motion-planning">
        | Type.TLiteral<"grasp-planning">
        | Type.TLiteral<"object-detection">
        | Type.TLiteral<"pose-estimation">
        | Type.TLiteral<"force-control">
        | Type.TLiteral<"path-optimization">
      )[]
    >;
  },
  "pipelineStage" | "modelId" | "trainingJobId",
  "targetRoboticsDeviceId"
> = Type.Object(
  {
    /** Identifier of the model to deploy. */
    modelId: Type.String({ minLength: 1 }),
    /** Training job that produced the model. */
    trainingJobId: Type.String({ minLength: 1 }),
    /** Target robotics device; omit for broadcast to all devices. */
    targetRoboticsDeviceId: Type.Optional(Type.String()),
    /** Pipeline stage where the model should be integrated. */
    pipelineStage: Type.Union([
      Type.Literal("motion-planning"),
      Type.Literal("grasp-planning"),
      Type.Literal("object-detection"),
      Type.Literal("pose-estimation"),
      Type.Literal("force-control"),
      Type.Literal("path-optimization"),
    ]),
  },
  { additionalProperties: false },
);

/**
 * Response schema for the deploy endpoint (returns updated snapshot).
 */
export const RoboticsTrainingDeployResponseV1: typeof RoboticsTrainingIntegrationSnapshotSchema =
  RoboticsTrainingIntegrationSnapshotSchema;

/**
 * Standard error envelope for deploy API responses.
 */
const DeployErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/**
 * Error schema for the deploy endpoint.
 */
export const RoboticsTrainingDeployErrorV1 = Type.Object(
  {
    400: DeployErrorEnvelopeV1,
    401: DeployErrorEnvelopeV1,
    403: DeployErrorEnvelopeV1,
    404: DeployErrorEnvelopeV1,
    409: DeployErrorEnvelopeV1,
    429: DeployErrorEnvelopeV1,
    500: DeployErrorEnvelopeV1,
    503: DeployErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Deploy (POST) contract definition.
 *
 * Used by Eden client generation and contract tests to enforce
 * request/response shape parity between server and client.
 */
export const RoboticsTrainingDeployContractV1 = {
  version: CONTRACT_VERSION,
  name: DEPLOY_CONTRACT_NAME,
  request: RoboticsTrainingDeployRequestV1,
  response: RoboticsTrainingDeployResponseV1,
  errors: RoboticsTrainingDeployErrorV1,
} as const satisfies VersionedContractV1;
