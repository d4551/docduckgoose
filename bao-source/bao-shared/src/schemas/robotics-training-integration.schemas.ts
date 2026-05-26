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
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Describes a robotics data source used for training.
 *
 * Captures the origin device, data modality, capture mode, and
 * optional telemetry metadata (joint count, sample rate, frame count, size).
 */
export const RoboticsTrainingDataSourceSchema = Type.Object(
  {
    /** Unique identifier for this data source. */
    sourceId: Type.String({ minLength: 1 }),
    /** Robotics device that produced the data. */
    roboticsDeviceId: Type.String({ minLength: 1 }),
    /** Modality of the captured training data. */
    dataType: Type.Union([
      Type.Literal("joint-trajectory"),
      Type.Literal("force-torque"),
      Type.Literal("point-cloud"),
      Type.Literal("camera-rgbd"),
      Type.Literal("gripper-force"),
      Type.Literal("mission-telemetry"),
    ]),
    /** How the data was captured. */
    captureMode: Type.Union([
      Type.Literal("demonstration"),
      Type.Literal("autonomous"),
      Type.Literal("teleoperation"),
      Type.Literal("simulation"),
    ]),
    /** Number of robot joints (applicable to joint-trajectory data). */
    jointCount: Type.Optional(Type.Number({ minimum: 1 })),
    /** Samples per second. */
    sampleRate: Type.Optional(Type.Number({ minimum: 0 })),
    /** Total number of frames in the data source. */
    frameCount: Type.Optional(Type.Number({ minimum: 0 })),
    /** Total data size in bytes. */
    sizeBytes: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Describes a trained model deployed to a robotics device or pipeline stage.
 *
 * Tracks deployment lifecycle status, target device, pipeline integration
 * point, and optional accuracy metrics.
 */
export const RoboticsTrainingModelDeploymentSchema = Type.Object(
  {
    /** Unique deployment identifier. */
    deploymentId: Type.String({ minLength: 1 }),
    /** Identifier of the deployed model. */
    modelId: Type.String({ minLength: 1 }),
    /** Training job that produced the model. */
    trainingJobId: Type.String({ minLength: 1 }),
    /** Target robotics device; omit or null for broadcast to all devices. */
    targetRoboticsDeviceId: Type.Optional(Type.String()),
    /** Pipeline stage where the model is integrated. */
    pipelineStage: Type.Union([
      Type.Literal("motion-planning"),
      Type.Literal("grasp-planning"),
      Type.Literal("object-detection"),
      Type.Literal("pose-estimation"),
      Type.Literal("force-control"),
      Type.Literal("path-optimization"),
    ]),
    /** Current deployment lifecycle status. */
    status: Type.Union([
      Type.Literal("pending"),
      Type.Literal("deploying"),
      Type.Literal("active"),
      Type.Literal("failed"),
      Type.Literal("rollback"),
    ]),
    /** ISO-8601 timestamp of when the model was deployed. */
    deployedAt: Type.Optional(Type.String()),
    /** Model accuracy on validation set (0-1 range). */
    accuracy: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
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
export const RoboticsTrainingIntegrationSnapshotSchema = Type.Object(
  {
    /** Always true for successful snapshots. */
    ok: Type.Literal(true),
    /** ISO-8601 timestamp of snapshot generation. */
    timestamp: Type.String(),
    /** All registered robotics training data sources. */
    dataSources: Type.Array(RoboticsTrainingDataSourceSchema),
    /** All model deployments to robotics devices/stages. */
    modelDeployments: Type.Array(RoboticsTrainingModelDeploymentSchema),
    /** Aggregate summary statistics. */
    summary: Type.Object(
      {
        /** Total number of registered data sources. */
        totalDataSources: Type.Integer({ minimum: 0 }),
        /** Number of deployments in 'active' status. */
        activeDeployments: Type.Integer({ minimum: 0 }),
        /** Number of deployments in 'pending' or 'deploying' status. */
        pendingDeployments: Type.Integer({ minimum: 0 }),
        /** Average model accuracy across active deployments (0-1). */
        avgModelAccuracy: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
        /** Most recent training job that produced a deployed model. */
        lastTrainingJobId: Type.Optional(Type.String()),
      },
      { additionalProperties: false },
    ),
    /** Correlation ID for distributed tracing. */
    correlationId: Type.Optional(Type.String()),
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
