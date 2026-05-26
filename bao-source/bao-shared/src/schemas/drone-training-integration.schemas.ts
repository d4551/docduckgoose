/**
 * Drone-training deep integration schemas.
 *
 * Defines contract-first TypeBox schemas for the drone-training integration
 * surface: data sources from drone captures, model deployments to drone
 * pipelines, and aggregated integration snapshots shared across API responses
 * and UI hydration.
 *
 * @shared/schemas/drone-training-integration
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

// Drone Training Data Source

/**
 * Describes a single drone data source used for training.
 *
 * Each source represents a captured dataset (aerial imagery, LiDAR point
 * clouds, thermal scans, multispectral bands, or telemetry logs) collected
 * by a specific drone device.
 */
export const DroneTrainingDataSourceSchema = Type.Object(
  {
    /** Unique identifier for this data source. */
    sourceId: Type.String({ minLength: 1 }),
    /** Identifier of the drone device that captured the data. */
    droneDeviceId: Type.String({ minLength: 1 }),
    /** Type of training data captured by the drone. */
    dataType: Type.Union([
      Type.Literal("aerial-imagery"),
      Type.Literal("lidar-pointcloud"),
      Type.Literal("thermal-scan"),
      Type.Literal("multispectral"),
      Type.Literal("telemetry-log"),
    ]),
    /** How the data capture was initiated. */
    captureMode: Type.Union([
      Type.Literal("autonomous"),
      Type.Literal("manual"),
      Type.Literal("scheduled"),
    ]),
    /** Resolution of captured imagery (width x height in pixels). */
    resolution: Type.Optional(
      Type.Object(
        {
          width: Type.Number(),
          height: Type.Number(),
        },
        { additionalProperties: false },
      ),
    ),
    /** Whether captured frames include geo-tag metadata. */
    geoTagged: Type.Boolean(),
    /** Number of frames or images in this data source. */
    frameCount: Type.Optional(Type.Number({ minimum: 0 })),
    /** Total size of the data source in bytes. */
    sizeBytes: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link DroneTrainingDataSourceSchema}. */
export type DroneTrainingDataSource = Static<typeof DroneTrainingDataSourceSchema>;

// Drone Training Model Deployment

/**
 * Describes a trained model deployed (or pending deployment) to a drone
 * inference pipeline.
 *
 * Tracks the lifecycle from pending through active or rollback, including
 * the target pipeline stage and optional accuracy metrics.
 */
export const DroneTrainingModelDeploymentSchema = Type.Object(
  {
    /** Unique deployment identifier. */
    deploymentId: Type.String({ minLength: 1 }),
    /** Identifier of the trained model artifact. */
    modelId: Type.String({ minLength: 1 }),
    /** Identifier of the training job that produced the model. */
    trainingJobId: Type.String({ minLength: 1 }),
    /** Specific drone target for deployment (`undefined` targets all drones). */
    targetDroneId: Type.Optional(Type.String()),
    /** Stage in the drone inference pipeline where the model is deployed. */
    pipelineStage: Type.Union([
      Type.Literal("perception"),
      Type.Literal("detection"),
      Type.Literal("classification"),
      Type.Literal("segmentation"),
      Type.Literal("tracking"),
    ]),
    /** Current deployment lifecycle status. */
    status: Type.Union([
      Type.Literal("pending"),
      Type.Literal("deploying"),
      Type.Literal("active"),
      Type.Literal("failed"),
      Type.Literal("rollback"),
    ]),
    /** ISO 8601 timestamp of when the model was deployed. */
    deployedAt: Type.Optional(Type.String()),
    /** Model accuracy metric (0..1 range). */
    accuracy: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link DroneTrainingModelDeploymentSchema}. */
export type DroneTrainingModelDeployment = Static<typeof DroneTrainingModelDeploymentSchema>;

// Drone Training Integration Snapshot

/**
 * Full integration snapshot combining drone data sources, model deployments,
 * and an aggregated summary.
 *
 * Returned by the GET snapshot endpoint and used for UI hydration.
 */
export const DroneTrainingIntegrationSnapshotSchema = Type.Object(
  {
    /** Discriminator indicating a successful response. */
    ok: Type.Literal(true),
    /** ISO 8601 timestamp of when the snapshot was generated. */
    timestamp: Type.String(),
    /** All registered drone data sources. */
    dataSources: Type.Array(DroneTrainingDataSourceSchema),
    /** All model deployments across drone pipelines. */
    modelDeployments: Type.Array(DroneTrainingModelDeploymentSchema),
    /** Aggregated summary counters for the integration. */
    summary: Type.Object(
      {
        /** Total number of registered data sources. */
        totalDataSources: Type.Integer({ minimum: 0 }),
        /** Number of deployments in `active` status. */
        activeDeployments: Type.Integer({ minimum: 0 }),
        /** Number of deployments in `pending` or `deploying` status. */
        pendingDeployments: Type.Integer({ minimum: 0 }),
        /** Average accuracy across active deployments (0..1). */
        avgModelAccuracy: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
        /** Identifier of the most recent training job. */
        lastTrainingJobId: Type.Optional(Type.String()),
      },
      { additionalProperties: false },
    ),
    /** Optional correlation ID for request tracing. */
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link DroneTrainingIntegrationSnapshotSchema}. */
export type DroneTrainingIntegrationSnapshot = Static<
  typeof DroneTrainingIntegrationSnapshotSchema
>;
