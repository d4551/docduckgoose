/**
 * Imager pipeline response types.
 *
 * Provides shared TypeScript types derived from imager pipeline schemas.
 *
 * @shared/types/imager-pipeline.ts
 */

import type {
  ImagerAssetIngestRequest,
  ImagerAssetIngestResponse,
} from "@baohaus/bao-schemas/imager-asset.schemas";
import type {
  ImagerCalibration,
  ImagerCalibrationRequest,
  ImagerCalibrationResponse,
  ImagerRectifyRequest,
  ImagerRectifyResponse,
} from "@baohaus/bao-schemas/imager-calibration.schemas";
import type {
  ImagerSyncCaptureRequest,
  ImagerSyncCaptureResponse,
} from "@baohaus/bao-schemas/imager-capture.schemas";
import type {
  ImagerPreprocessOperation,
  ImagerPreprocessPipeline,
  ImagerPreprocessRequest,
  ImagerPreprocessResponse,
} from "@baohaus/bao-schemas/imager-preprocess.schemas";
import type {
  ImagerFocusMetrics,
  ImagerQualityRequest,
  ImagerQualityResponse,
} from "@baohaus/bao-schemas/imager-quality.schemas";
import type {
  ImagerCaptureOptions,
  ImagerImageFormat,
  ImagerSource,
} from "@baohaus/bao-schemas/imager-source.schemas";

/** Inferred type from the ImagerImageFormatType schema. */
export type ImagerImageFormatType = ImagerImageFormat;
/** Inferred type from the ImagerCaptureOptionsType schema. */
export type ImagerCaptureOptionsType = ImagerCaptureOptions;
/** Inferred type from the ImagerSourceType schema. */
export type ImagerSourceType = ImagerSource;
/** Inferred type from the ImagerQualityRequestType schema. */
export type ImagerQualityRequestType = ImagerQualityRequest;
/** Inferred type from the ImagerQualityResponseType schema. */
export type ImagerQualityResponseType = ImagerQualityResponse;
/** Inferred type from the ImagerFocusMetricsType schema. */
export type ImagerFocusMetricsType = ImagerFocusMetrics;
/** Inferred type from the ImagerPreprocessOperationType schema. */
export type ImagerPreprocessOperationType = ImagerPreprocessOperation;
/** Inferred type from the ImagerPreprocessPipelineType schema. */
export type ImagerPreprocessPipelineType = ImagerPreprocessPipeline;
/** Inferred type from the ImagerPreprocessRequestType schema. */
export type ImagerPreprocessRequestType = ImagerPreprocessRequest;
/** Inferred type from the ImagerPreprocessResponseType schema. */
export type ImagerPreprocessResponseType = ImagerPreprocessResponse;
/** Inferred type from the ImagerCalibrationType schema. */
export type ImagerCalibrationType = ImagerCalibration;
/** Inferred type from the ImagerCalibrationRequestType schema. */
export type ImagerCalibrationRequestType = ImagerCalibrationRequest;
/** Inferred type from the ImagerCalibrationResponseType schema. */
export type ImagerCalibrationResponseType = ImagerCalibrationResponse;
/** Inferred type from the ImagerRectifyRequestType schema. */
export type ImagerRectifyRequestType = ImagerRectifyRequest;
/** Inferred type from the ImagerRectifyResponseType schema. */
export type ImagerRectifyResponseType = ImagerRectifyResponse;
/** Inferred type from the ImagerSyncCaptureRequestType schema. */
export type ImagerSyncCaptureRequestType = ImagerSyncCaptureRequest;
/** Inferred type from the ImagerSyncCaptureResponseType schema. */
export type ImagerSyncCaptureResponseType = ImagerSyncCaptureResponse;
/** Inferred type from the ImagerAssetIngestRequestType schema. */
export type ImagerAssetIngestRequestType = ImagerAssetIngestRequest;
/** Inferred type from the ImagerAssetIngestResponseType schema. */
export type ImagerAssetIngestResponseType = ImagerAssetIngestResponse;
