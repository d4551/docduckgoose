/**
 * Robotics-training integration defaults.
 *
 * Provides typed default values for robotics training data sources and model
 * deployments. These are consumed by the unified config system via
 * `getSection('roboticsTraining')` and can be overridden per-environment in
 * `config/config.json`.
 *
 * @shared/config/robotics-training-defaults
 */

import type {
  RoboticsTrainingDataSource,
  RoboticsTrainingModelDeployment,
} from "@baohaus/bao-schemas/robotics-training-integration.schemas";

/**
 * Typed configuration shape for the robotics-training integration section.
 */
export interface RoboticsTrainingConfigDefaults {
  /** Registered robotics training data sources. */
  dataSources: RoboticsTrainingDataSource[];
  /** Registered model deployments to robotics devices/stages. */
  modelDeployments: RoboticsTrainingModelDeployment[];
}

/**
 * Default robotics training data sources.
 *
 * Each entry represents a data capture pipeline from a specific robotics
 * device that feeds into the training subsystem.
 */
export const ROBOTICS_TRAINING_DATA_SOURCE_DEFAULTS: readonly RoboticsTrainingDataSource[] = [
  {
    sourceId: "rds-joint-trajectory-01",
    roboticsDeviceId: "robotics-arm-alpha",
    dataType: "joint-trajectory",
    captureMode: "demonstration",
    jointCount: 6,
    sampleRate: 250,
    frameCount: 48_000,
    sizeBytes: 12_582_912,
  },
  {
    sourceId: "rds-force-torque-01",
    roboticsDeviceId: "robotics-arm-alpha",
    dataType: "force-torque",
    captureMode: "teleoperation",
    jointCount: 6,
    sampleRate: 1_000,
    frameCount: 120_000,
    sizeBytes: 30_720_000,
  },
  {
    sourceId: "rds-camera-rgbd-01",
    roboticsDeviceId: "robotics-cell-beta",
    dataType: "camera-rgbd",
    captureMode: "autonomous",
    sampleRate: 30,
    frameCount: 9_000,
    sizeBytes: 2_764_800_000,
  },
] as const;

/**
 * Default model deployments to robotics devices.
 */
export const ROBOTICS_TRAINING_MODEL_DEPLOYMENT_DEFAULTS: readonly RoboticsTrainingModelDeployment[] =
  [
    {
      deploymentId: "rdeploy-motion-01",
      modelId: "model-motion-planning-v3",
      trainingJobId: "tj-motion-20260115",
      targetRoboticsDeviceId: "robotics-arm-alpha",
      pipelineStage: "motion-planning",
      status: "active",
      deployedAt: "2026-01-15T14:30:00.000Z",
      accuracy: 0.94,
    },
    {
      deploymentId: "rdeploy-grasp-01",
      modelId: "model-grasp-planning-v1",
      trainingJobId: "tj-grasp-20260201",
      targetRoboticsDeviceId: "robotics-cell-beta",
      pipelineStage: "grasp-planning",
      status: "pending",
    },
  ] as const;

/**
 * Combined default configuration for the `roboticsTraining` config section.
 */
export const ROBOTICS_TRAINING_DEFAULTS: RoboticsTrainingConfigDefaults = {
  dataSources: [...ROBOTICS_TRAINING_DATA_SOURCE_DEFAULTS],
  modelDeployments: [...ROBOTICS_TRAINING_MODEL_DEPLOYMENT_DEFAULTS],
};
