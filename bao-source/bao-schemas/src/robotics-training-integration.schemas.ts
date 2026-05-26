/**
 * Robotics-training deep integration schemas.
 *
 * Defines contract-first TypeBox schemas for robotics training data sources,
 * model deployments, and integration snapshots shared across API responses
 * and UI hydration.
 *
 * @shared/schemas/robotics-training-integration
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Describes a robotics data source used for training.
 *
 * Captures the origin device, data modality, capture mode, and
 * optional telemetry metadata (joint count, sample rate, frame count, size).
 */
export const RoboticsTrainingDataSourceSchema = TypeExports.Object(
  {
    /** Unique identifier for this data source. */
    sourceId: TypeExports.String({ minLength: 1 }),
    /** Robotics device that produced the data. */
    roboticsDeviceId: TypeExports.String({ minLength: 1 }),
    /** Modality of the captured training data. */
    dataType: TypeExports.Union([
      TypeExports.Literal("joint-trajectory"),
      TypeExports.Literal("force-torque"),
      TypeExports.Literal("point-cloud"),
      TypeExports.Literal("camera-rgbd"),
      TypeExports.Literal("gripper-force"),
      TypeExports.Literal("mission-telemetry"),
    ]),
    /** How the data was captured. */
    captureMode: TypeExports.Union([
      TypeExports.Literal("demonstration"),
      TypeExports.Literal("autonomous"),
      TypeExports.Literal("teleoperation"),
      TypeExports.Literal("simulation"),
    ]),
    /** Number of robot joints (applicable to joint-trajectory data). */
    jointCount: TypeExports.Optional(TypeExports.Number({ minimum: 1 })),
    /** Samples per second. */
    sampleRate: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    /** Total number of frames in the data source. */
    frameCount: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    /** Total data size in bytes. */
    sizeBytes: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Describes a trained model deployed to a robotics device or pipeline stage.
 *
 * Tracks deployment lifecycle status, target device, pipeline integration
 * point, and optional accuracy metrics.
 */
export const RoboticsTrainingModelDeploymentSchema = TypeExports.Object(
  {
    /** Unique deployment identifier. */
    deploymentId: TypeExports.String({ minLength: 1 }),
    /** Identifier of the deployed model. */
    modelId: TypeExports.String({ minLength: 1 }),
    /** Training job that produced the model. */
    trainingJobId: TypeExports.String({ minLength: 1 }),
    /** Target robotics device; omit or null for broadcast to all devices. */
    targetRoboticsDeviceId: TypeExports.Optional(TypeExports.String()),
    /** Pipeline stage where the model is integrated. */
    pipelineStage: TypeExports.Union([
      TypeExports.Literal("motion-planning"),
      TypeExports.Literal("grasp-planning"),
      TypeExports.Literal("object-detection"),
      TypeExports.Literal("pose-estimation"),
      TypeExports.Literal("force-control"),
      TypeExports.Literal("path-optimization"),
    ]),
    /** Current deployment lifecycle status. */
    status: TypeExports.Union([
      TypeExports.Literal("pending"),
      TypeExports.Literal("deploying"),
      TypeExports.Literal("active"),
      TypeExports.Literal("failed"),
      TypeExports.Literal("rollback"),
    ]),
    /** ISO-8601 timestamp of when the model was deployed. */
    deployedAt: TypeExports.Optional(TypeExports.String()),
    /** Model accuracy on validation set (0-1 range). */
    accuracy: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Full snapshot of the robotics-training integration state.
 *
 * Aggregates all data sources, model deployments, and a summary
 * with counts and accuracy metrics. Used as the canonical response
 * shape for both GET (read) and POST (deploy) contract endpoints.
 */
export const RoboticsTrainingIntegrationSnapshotSchema = TypeExports.Object(
  {
    /** Always true for successful snapshots. */
    ok: TypeExports.Literal(true),
    /** ISO-8601 timestamp of snapshot generation. */
    timestamp: TypeExports.String(),
    /** All registered robotics training data sources. */
    dataSources: TypeExports.Array(RoboticsTrainingDataSourceSchema),
    /** All model deployments to robotics devices/stages. */
    modelDeployments: TypeExports.Array(RoboticsTrainingModelDeploymentSchema),
    /** Aggregate summary statistics. */
    summary: TypeExports.Object(
      {
        /** Total number of registered data sources. */
        totalDataSources: TypeExports.Integer({ minimum: 0 }),
        /** Number of deployments in 'active' status. */
        activeDeployments: TypeExports.Integer({ minimum: 0 }),
        /** Number of deployments in 'pending' or 'deploying' status. */
        pendingDeployments: TypeExports.Integer({ minimum: 0 }),
        /** Average model accuracy across active deployments (0-1). */
        avgModelAccuracy: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
        /** Most recent training job that produced a deployed model. */
        lastTrainingJobId: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: false },
    ),
    /** Correlation ID for distributed tracing. */
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

// Static TypeScript types

/**
 * TypeScript type for a robotics training data source.
 */
export type RoboticsTrainingDataSource = Static<typeof RoboticsTrainingDataSourceSchema>;

/**
 * TypeScript type for a robotics training model deployment.
 */
export type RoboticsTrainingModelDeployment = Static<typeof RoboticsTrainingModelDeploymentSchema>;

/**
 * TypeScript type for the full robotics-training integration snapshot.
 */
export type RoboticsTrainingIntegrationSnapshot = Static<
  typeof RoboticsTrainingIntegrationSnapshotSchema
>;
