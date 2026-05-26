/**
 * Pipeline input schema identifiers.
 *
 * Shared schema ids for pipeline run input payloads to keep UI and API aligned.
 *
 * @packageDocumentation
 */

/** Pipeline-level input schema identifiers. */
export const PIPELINE_INPUT_SCHEMA_IDS: {
  readonly bluetoothImagerVision: "pipeline.bluetooth-imager-vision.input";
  readonly bluetoothImagerVisionSummary: "pipeline.bluetooth-imager-vision-summary.input";
  readonly bleBaslerVision: "pipeline.ble-basler-vision.input";
  readonly dronePerceptionRobotics: "pipeline.drone-perception-robotics.input";
  readonly visionLightningTrain: "pipeline.vision-lightning-train.input";
  readonly gaussianPytorch3d: "pipeline.gaussian-pytorch3d.input";
  readonly scannerGaussian: "pipeline.scanner-gaussian.input";
} = {
  bluetoothImagerVision: "pipeline.bluetooth-imager-vision.input",
  bluetoothImagerVisionSummary: "pipeline.bluetooth-imager-vision-summary.input",
  bleBaslerVision: "pipeline.ble-basler-vision.input",
  dronePerceptionRobotics: "pipeline.drone-perception-robotics.input",
  visionLightningTrain: "pipeline.vision-lightning-train.input",
  gaussianPytorch3d: "pipeline.gaussian-pytorch3d.input",
  scannerGaussian: "pipeline.scanner-gaussian.input",
} as const;

/** Inferred type from the PipelineInputSchemaId schema. */
export type PipelineInputSchemaId =
  (typeof PIPELINE_INPUT_SCHEMA_IDS)[keyof typeof PIPELINE_INPUT_SCHEMA_IDS];
