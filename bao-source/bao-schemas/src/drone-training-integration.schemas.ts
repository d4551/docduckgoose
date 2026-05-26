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
import { TypeExports } from "@baohaus/baobox/elysia";

// Drone Training Data Source

/**
 * Describes a single drone data source used for training.
 *
 * Each source represents a captured dataset (aerial imagery, LiDAR point
 * clouds, thermal scans, multispectral bands, or telemetry logs) collected
 * by a specific drone device.
 */
export const DroneTrainingDataSourceSchema = TypeExports.Object(
  {
    /** Unique identifier for this data source. */
    sourceId: TypeExports.String({ minLength: 1 }),
    /** Identifier of the drone device that captured the data. */
    droneDeviceId: TypeExports.String({ minLength: 1 }),
    /** Type of training data captured by the drone. */
    dataType: TypeExports.Union([
      TypeExports.Literal("aerial-imagery"),
      TypeExports.Literal("lidar-pointcloud"),
      TypeExports.Literal("thermal-scan"),
      TypeExports.Literal("multispectral"),
      TypeExports.Literal("telemetry-log"),
    ]),
    /** How the data capture was initiated. */
    captureMode: TypeExports.Union([
      TypeExports.Literal("autonomous"),
      TypeExports.Literal("manual"),
      TypeExports.Literal("scheduled"),
    ]),
    /** Resolution of captured imagery (width x height in pixels). */
    resolution: TypeExports.Optional(
      TypeExports.Object(
        {
          width: TypeExports.Number(),
          height: TypeExports.Number(),
        },
        { additionalProperties: false },
      ),
    ),
    /** Whether captured frames include geo-tag metadata. */
    geoTagged: TypeExports.Boolean(),
    /** Number of frames or images in this data source. */
    frameCount: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    /** Total size of the data source in bytes. */
    sizeBytes: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
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
export const DroneTrainingModelDeploymentSchema = TypeExports.Object(
  {
    /** Unique deployment identifier. */
    deploymentId: TypeExports.String({ minLength: 1 }),
    /** Identifier of the trained model artifact. */
    modelId: TypeExports.String({ minLength: 1 }),
    /** Identifier of the training job that produced the model. */
    trainingJobId: TypeExports.String({ minLength: 1 }),
    /** Specific drone target for deployment (`undefined` targets all drones). */
    targetDroneId: TypeExports.Optional(TypeExports.String()),
    /** Stage in the drone inference pipeline where the model is deployed. */
    pipelineStage: TypeExports.Union([
      TypeExports.Literal("perception"),
      TypeExports.Literal("detection"),
      TypeExports.Literal("classification"),
      TypeExports.Literal("segmentation"),
      TypeExports.Literal("tracking"),
    ]),
    /** Current deployment lifecycle status. */
    status: TypeExports.Union([
      TypeExports.Literal("pending"),
      TypeExports.Literal("deploying"),
      TypeExports.Literal("active"),
      TypeExports.Literal("failed"),
      TypeExports.Literal("rollback"),
    ]),
    /** ISO 8601 timestamp of when the model was deployed. */
    deployedAt: TypeExports.Optional(TypeExports.String()),
    /** Model accuracy metric (0..1 range). */
    accuracy: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
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
export const DroneTrainingIntegrationSnapshotSchema = TypeExports.Object(
  {
    /** Discriminator indicating a successful response. */
    ok: TypeExports.Literal(true),
    /** ISO 8601 timestamp of when the snapshot was generated. */
    timestamp: TypeExports.String(),
    /** All registered drone data sources. */
    dataSources: TypeExports.Array(DroneTrainingDataSourceSchema),
    /** All model deployments across drone pipelines. */
    modelDeployments: TypeExports.Array(DroneTrainingModelDeploymentSchema),
    /** Aggregated summary counters for the integration. */
    summary: TypeExports.Object(
      {
        /** Total number of registered data sources. */
        totalDataSources: TypeExports.Integer({ minimum: 0 }),
        /** Number of deployments in `active` status. */
        activeDeployments: TypeExports.Integer({ minimum: 0 }),
        /** Number of deployments in `pending` or `deploying` status. */
        pendingDeployments: TypeExports.Integer({ minimum: 0 }),
        /** Average accuracy across active deployments (0..1). */
        avgModelAccuracy: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
        /** Identifier of the most recent training job. */
        lastTrainingJobId: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: false },
    ),
    /** Optional correlation ID for request tracing. */
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link DroneTrainingIntegrationSnapshotSchema}. */
export type DroneTrainingIntegrationSnapshot = Static<
  typeof DroneTrainingIntegrationSnapshotSchema
>;
