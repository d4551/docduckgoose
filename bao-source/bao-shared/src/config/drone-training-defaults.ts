/**
 * Drone-training integration centralized defaults.
 *
 * Provides typed default values for drone training data sources and model
 * deployments used by the unified config system. Actual entries are configured
 * via `config.json` or runtime overrides rather than hardcoded in service code.
 *
 * @shared/config/drone-training-defaults
 */

import type {
  DroneTrainingDataSource,
  DroneTrainingModelDeployment,
} from "../schemas/drone-training-integration.schemas";

/**
 * Typed drone-training configuration shape used by the config resolver.
 */
export interface DroneTrainingIntegrationDefaults {
  /** Registered drone data sources available for training ingestion. */
  dataSources: readonly DroneTrainingDataSource[];
  /** Known model deployments across drone inference pipelines. */
  modelDeployments: readonly DroneTrainingModelDeployment[];
}

/**
 * Default drone training data sources.
 *
 * Each entry represents a data capture pipeline from a specific drone
 * device that feeds into the training subsystem.
 */
export const DRONE_TRAINING_DATA_SOURCE_DEFAULTS: readonly DroneTrainingDataSource[] = [
  {
    sourceId: "dds-aerial-imagery-01",
    droneDeviceId: "drone-phantom-4-alpha",
    dataType: "aerial-imagery",
    captureMode: "autonomous",
    geoTagged: true,
    resolution: { width: 4000, height: 3000 },
    frameCount: 2_400,
    sizeBytes: 7_340_032_000,
  },
  {
    sourceId: "dds-thermal-scan-01",
    droneDeviceId: "drone-matrice-300-beta",
    dataType: "thermal-scan",
    captureMode: "scheduled",
    geoTagged: true,
    frameCount: 800,
    sizeBytes: 1_073_741_824,
  },
  {
    sourceId: "dds-lidar-01",
    droneDeviceId: "drone-matrice-300-beta",
    dataType: "lidar-pointcloud",
    captureMode: "autonomous",
    geoTagged: true,
    frameCount: 500,
    sizeBytes: 5_368_709_120,
  },
] as const;

/**
 * Default model deployments to drone inference pipelines.
 */
export const DRONE_TRAINING_MODEL_DEPLOYMENT_DEFAULTS: readonly DroneTrainingModelDeployment[] = [
  {
    deploymentId: "ddeploy-detection-01",
    modelId: "model-yolov8-aerial-v2",
    trainingJobId: "tj-detection-20260120",
    targetDroneId: "drone-phantom-4-alpha",
    pipelineStage: "detection",
    status: "active",
    deployedAt: "2026-01-20T10:00:00.000Z",
    accuracy: 0.93,
  },
  {
    deploymentId: "ddeploy-segmentation-01",
    modelId: "model-seg-thermal-v1",
    trainingJobId: "tj-segmentation-20260205",
    targetDroneId: "drone-matrice-300-beta",
    pipelineStage: "segmentation",
    status: "pending",
  },
] as const;

/**
 * Server-side drone-training defaults used when unified config overrides are missing.
 *
 * Falls back to realistic sample data for dev/staging. Override via
 * `config.json` `droneTraining` section or `setSection`/`overrideSection`.
 */
export const DRONE_TRAINING_DEFAULTS: DroneTrainingIntegrationDefaults = {
  dataSources: [...DRONE_TRAINING_DATA_SOURCE_DEFAULTS],
  modelDeployments: [...DRONE_TRAINING_MODEL_DEPLOYMENT_DEFAULTS],
} as const;
