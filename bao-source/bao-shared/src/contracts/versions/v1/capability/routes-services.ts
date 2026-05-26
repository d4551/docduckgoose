/**
 * Capability route definitions for service-style capabilities
 * (perception, gaussian, scanner, drone, robotics, rpa, vision).
 *
 * @shared/contracts/versions/v1/capability/routes-services
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import type { ApiRouteDefinition } from "./core";

export const PERCEPTION_ROUTES_V1: Record<string, ApiRouteDefinition> = {
  health: { method: "GET", path: `${API_PATHS.base}/perception/health` },
  capabilities: { method: "GET", path: `${API_PATHS.base}/perception/capabilities` },
  metrics: { method: "GET", path: `${API_PATHS.base}/perception/metrics` },
  diagnostics: { method: "GET", path: `${API_PATHS.base}/perception/diagnostics` },
  imageCalibrationGet: {
    method: "GET",
    path: `${API_PATHS.base}/perception/image/calibration/:cameraId`,
  },
  imageCalibrationPost: {
    method: "POST",
    path: `${API_PATHS.base}/perception/image/calibration/:cameraId`,
  },
  imageDetect: { method: "POST", path: `${API_PATHS.base}/perception/image/detect` },
  imageSegment: { method: "POST", path: `${API_PATHS.base}/perception/image/segment` },
  imageRectify: { method: "POST", path: `${API_PATHS.base}/perception/image/rectify` },
  depthToLaserscan: { method: "POST", path: `${API_PATHS.base}/perception/depth/to-laserscan` },
  pointcloudFilter: { method: "POST", path: `${API_PATHS.base}/perception/pointcloud/filter` },
  pointcloudDetect: { method: "POST", path: `${API_PATHS.base}/perception/pointcloud/detect` },
  pointcloudRansacPlane: {
    method: "POST",
    path: `${API_PATHS.base}/perception/pointcloud/ransac-plane`,
  },
  pointcloudExtractClusters: {
    method: "POST",
    path: `${API_PATHS.base}/perception/pointcloud/extract-clusters`,
  },
  pointcloudEstimateNormals: {
    method: "POST",
    path: `${API_PATHS.base}/perception/pointcloud/estimate-normals`,
  },
} satisfies Record<string, ApiRouteDefinition>;

export const GAUSSIAN_ROUTES_V1: Record<string, ApiRouteDefinition> = {
  health: { method: "GET", path: `${API_PATHS.base}/gaussian/health` },
  capabilities: { method: "GET", path: `${API_PATHS.base}/gaussian/capabilities` },
  train: { method: "POST", path: `${API_PATHS.base}/gaussian/train` },
  trainStatus: { method: "GET", path: `${API_PATHS.base}/gaussian/train/:jobId` },
  trainCancel: { method: "DELETE", path: `${API_PATHS.base}/gaussian/train/:jobId` },
  trainStream: { method: "GET", path: `${API_PATHS.base}/gaussian/train/:jobId/stream` },
  trainFromScan: { method: "POST", path: `${API_PATHS.base}/gaussian/train/from-scan` },
  scanReady: { method: "GET", path: `${API_PATHS.base}/gaussian/scan/:sessionId/ready` },
  render: { method: "POST", path: `${API_PATHS.base}/gaussian/render` },
  pytorch3dRender: { method: "POST", path: `${API_PATHS.base}/gaussian/pytorch3d/render` },
  pytorch3dMeshSummary: {
    method: "POST",
    path: `${API_PATHS.base}/gaussian/pytorch3d/mesh/summary`,
  },
  export: { method: "POST", path: `${API_PATHS.base}/gaussian/export` },
  models: { method: "GET", path: `${API_PATHS.base}/gaussian/models` },
  registryList: { method: "GET", path: `${API_PATHS.base}/gaussian/registry` },
  registryCreate: { method: "POST", path: `${API_PATHS.base}/gaussian/registry` },
  registryGet: { method: "GET", path: `${API_PATHS.base}/gaussian/registry/:modelId` },
  registryDelete: { method: "DELETE", path: `${API_PATHS.base}/gaussian/registry/:modelId` },
  registryStatus: { method: "PATCH", path: `${API_PATHS.base}/gaussian/registry/:modelId/status` },
  registryUsage: { method: "GET", path: `${API_PATHS.base}/gaussian/registry/:modelId/usage` },
} satisfies Record<string, ApiRouteDefinition>;

export const SCANNER_ROUTES_V1: Record<string, ApiRouteDefinition> = {
  capabilities: { method: "GET", path: `${API_PATHS.base}/scanner/capabilities` },
  metrics: { method: "GET", path: `${API_PATHS.base}/scanner/metrics` },
  status: { method: "GET", path: `${API_PATHS.base}/scanner/status` },
  stats: { method: "GET", path: `${API_PATHS.base}/scanner/stats/:scannerId` },
  devices: { method: "GET", path: `${API_PATHS.base}/scanner/devices` },
  devicesSync: { method: "POST", path: `${API_PATHS.base}/scanner/devices/sync` },
  scanners: { method: "GET", path: `${API_PATHS.base}/scanner/scanners` },
  scannerConnect: { method: "POST", path: `${API_PATHS.base}/scanner/scanners/:deviceId/connect` },
  scannerDisconnect: {
    method: "POST",
    path: `${API_PATHS.base}/scanner/scanners/:deviceId/disconnect`,
  },
  turntables: { method: "GET", path: `${API_PATHS.base}/scanner/turntables` },
  turntableConnect: {
    method: "POST",
    path: `${API_PATHS.base}/scanner/turntables/:deviceId/connect`,
  },
  turntableDisconnect: {
    method: "POST",
    path: `${API_PATHS.base}/scanner/turntables/:deviceId/disconnect`,
  },
  turntableHome: { method: "POST", path: `${API_PATHS.base}/scanner/turntable/home` },
  turntableRotate: { method: "POST", path: `${API_PATHS.base}/scanner/turntable/rotate` },
  turntableStop: { method: "POST", path: `${API_PATHS.base}/scanner/turntable/stop` },
  turntableTilt: { method: "POST", path: `${API_PATHS.base}/scanner/turntable/tilt` },
  scanStart: { method: "POST", path: `${API_PATHS.base}/scanner/start` },
  scanAutomated: { method: "POST", path: `${API_PATHS.base}/scanner/automated` },
  scanGet: { method: "GET", path: `${API_PATHS.base}/scanner/scan/:scanId` },
  scanCapture: { method: "POST", path: `${API_PATHS.base}/scanner/scan/:scanId/capture` },
  scanStop: { method: "POST", path: `${API_PATHS.base}/scanner/scan/:scanId/stop` },
  scanDownload: { method: "GET", path: `${API_PATHS.base}/scanner/scan/:scanId/download` },
  scanStreamConnect: {
    method: "POST",
    path: `${API_PATHS.base}/scanner/scan/:scanId/stream/connect`,
  },
  scanStreamDisconnect: {
    method: "POST",
    path: `${API_PATHS.base}/scanner/scan/:scanId/stream/disconnect`,
  },
  sessions: { method: "GET", path: `${API_PATHS.base}/scanner/sessions` },
  sessionGet: { method: "GET", path: `${API_PATHS.base}/scanner/sessions/:sessionId` },
  sessionDelete: { method: "DELETE", path: `${API_PATHS.base}/scanner/sessions/:sessionId` },
  sessionDownload: {
    method: "GET",
    path: `${API_PATHS.base}/scanner/sessions/:sessionId/download`,
  },
  sessionRestore: { method: "POST", path: `${API_PATHS.base}/scanner/sessions/:sessionId/restore` },
  previewDepth: { method: "GET", path: `${API_PATHS.base}/scanner/preview/depth/:deviceId` },
  previewDepthSnapshot: {
    method: "GET",
    path: `${API_PATHS.base}/scanner/preview/depth/:deviceId/snapshot`,
  },
  process: { method: "POST", path: `${API_PATHS.base}/scanner/process` },
  processAlign: { method: "POST", path: `${API_PATHS.base}/scanner/process/align` },
  processMesh: { method: "POST", path: `${API_PATHS.base}/scanner/process/mesh` },
  processExport: { method: "POST", path: `${API_PATHS.base}/scanner/process/export` },
} satisfies Record<string, ApiRouteDefinition>;

export const DRONE_ROUTES_V1: Record<string, ApiRouteDefinition> = {
  status: { method: "GET", path: `${API_PATHS.base}/drone/status` },
  summary: { method: "GET", path: `${API_PATHS.base}/drone/summary` },
  capabilities: { method: "GET", path: `${API_PATHS.base}/drone/capabilities` },
  capabilityPortfolio: { method: "GET", path: `${API_PATHS.base}/drone/capabilities/portfolio` },
  capabilityPortfolioRefresh: {
    method: "POST",
    path: `${API_PATHS.base}/drone/capabilities/portfolio/refresh`,
  },
  metrics: { method: "GET", path: `${API_PATHS.base}/drone/metrics` },
  realtimeStatus: { method: "GET", path: `${API_PATHS.base}/drone/realtime/status` },
  scan: { method: "POST", path: `${API_PATHS.base}/drone/scan` },
  bunbuddyCapabilities: { method: "GET", path: `${API_PATHS.base}/drone/bunbuddy/capabilities` },
  plannerCompile: { method: "POST", path: API_PATHS.dronePlannerCompile },
  plannerExport: { method: "POST", path: API_PATHS.dronePlannerExport },
  devices: { method: "GET", path: `${API_PATHS.base}/drone/devices` },
  deviceCreate: { method: "POST", path: `${API_PATHS.base}/drone/devices` },
  deviceGet: { method: "GET", path: `${API_PATHS.base}/drone/devices/:deviceId` },
  deviceConnect: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/connect` },
  deviceDisconnect: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/disconnect`,
  },
  deviceArm: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/arm` },
  deviceDisarm: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/disarm` },
  deviceEmergencyStop: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/emergency-stop`,
  },
  deviceTakeoff: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/takeoff` },
  deviceLand: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/land` },
  deviceRtl: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/rtl` },
  deviceHover: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/hover` },
  deviceMove: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/move` },
  deviceGoto: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/goto` },
  deviceVelocity: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/velocity` },
  deviceGimbal: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/gimbal` },
  deviceMode: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/mode` },
  deviceTelemetry: { method: "GET", path: `${API_PATHS.base}/drone/devices/:deviceId/telemetry` },
  deviceVideo: { method: "GET", path: `${API_PATHS.base}/drone/devices/:deviceId/video` },
  deviceHistoryEvents: {
    method: "GET",
    path: `${API_PATHS.base}/drone/devices/:deviceId/history/events`,
  },
  deviceHistoryTelemetry: {
    method: "GET",
    path: `${API_PATHS.base}/drone/devices/:deviceId/history/telemetry`,
  },
  deviceCameraPhoto: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/camera/photo`,
  },
  deviceCameraSnapshot: {
    method: "GET",
    path: `${API_PATHS.base}/drone/devices/:deviceId/camera/snapshot`,
  },
  deviceCameraRecordStart: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/camera/record/start`,
  },
  deviceCameraRecordStop: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/camera/record/stop`,
  },
  deviceMission: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/mission` },
  deviceMissionDelete: {
    method: "DELETE",
    path: `${API_PATHS.base}/drone/devices/:deviceId/mission`,
  },
  deviceMissionStart: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/mission/start`,
  },
  deviceMissionPause: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/mission/pause`,
  },
  deviceMissionResume: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/mission/resume`,
  },
  deviceGeofence: { method: "GET", path: `${API_PATHS.base}/drone/devices/:deviceId/geofence` },
  deviceGeofenceUpdate: {
    method: "PUT",
    path: `${API_PATHS.base}/drone/devices/:deviceId/geofence`,
  },
  deviceGeofenceClear: {
    method: "DELETE",
    path: `${API_PATHS.base}/drone/devices/:deviceId/geofence`,
  },
  deviceRallyPoints: {
    method: "GET",
    path: `${API_PATHS.base}/drone/devices/:deviceId/rally-points`,
  },
  deviceRallyPointsUpdate: {
    method: "PUT",
    path: `${API_PATHS.base}/drone/devices/:deviceId/rally-points`,
  },
  deviceRallyPointsClear: {
    method: "DELETE",
    path: `${API_PATHS.base}/drone/devices/:deviceId/rally-points`,
  },
  deviceRtkStatus: { method: "GET", path: `${API_PATHS.base}/drone/devices/:deviceId/rtk` },
  deviceRtkCorrection: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/rtk/corrections`,
  },
  deviceOffboardStatus: {
    method: "GET",
    path: `${API_PATHS.base}/drone/devices/:deviceId/offboard`,
  },
  deviceOffboardStart: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/offboard/start`,
  },
  deviceOffboardStop: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/offboard/stop`,
  },
  deviceOffboardSetpoint: {
    method: "POST",
    path: `${API_PATHS.base}/drone/devices/:deviceId/offboard/setpoint`,
  },
  deviceVideoFusion: {
    method: "GET",
    path: `${API_PATHS.base}/drone/devices/:deviceId/video-fusion`,
  },
  deviceVideoFusionUpdate: {
    method: "PUT",
    path: `${API_PATHS.base}/drone/devices/:deviceId/video-fusion`,
  },
  deviceLogs: { method: "GET", path: `${API_PATHS.base}/drone/devices/:deviceId/logs` },
  deviceLogsStart: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/logs/start` },
  deviceLogsStop: { method: "POST", path: `${API_PATHS.base}/drone/devices/:deviceId/logs/stop` },
  deviceLogsDownload: {
    method: "GET",
    path: `${API_PATHS.base}/drone/devices/:deviceId/logs/:sessionId/download`,
  },
  logsExport: { method: "POST", path: `${API_PATHS.base}/drone/logs/export` },
  historyEvents: { method: "GET", path: `${API_PATHS.base}/drone/history/events` },
} satisfies Record<string, ApiRouteDefinition>;

export const ROBOTICS_ROUTES_V1: Record<string, ApiRouteDefinition> = {
  summary: { method: "GET", path: `${API_PATHS.base}/robotics/summary` },
  status: { method: "GET", path: `${API_PATHS.base}/robotics/status` },
  capabilities: { method: "GET", path: `${API_PATHS.base}/robotics/capabilities` },
  capabilityPortfolio: { method: "GET", path: `${API_PATHS.base}/robotics/capabilities/portfolio` },
  capabilityPortfolioRefresh: {
    method: "POST",
    path: `${API_PATHS.base}/robotics/capabilities/portfolio/refresh`,
  },
  bunbuddyCapabilities: { method: "GET", path: `${API_PATHS.base}/robotics/bunbuddy/capabilities` },
  devices: { method: "GET", path: `${API_PATHS.base}/robotics/devices` },
  deviceCreate: { method: "POST", path: `${API_PATHS.base}/robotics/devices` },
  deviceGet: { method: "GET", path: `${API_PATHS.base}/robotics/devices/:deviceId` },
  deviceTelemetry: {
    method: "GET",
    path: `${API_PATHS.base}/robotics/devices/:deviceId/telemetry`,
  },
  deviceConnect: { method: "POST", path: `${API_PATHS.base}/robotics/devices/:deviceId/connect` },
  deviceDisconnect: {
    method: "POST",
    path: `${API_PATHS.base}/robotics/devices/:deviceId/disconnect`,
  },
  deviceHome: { method: "POST", path: `${API_PATHS.base}/robotics/devices/:deviceId/home` },
  deviceStop: { method: "POST", path: `${API_PATHS.base}/robotics/devices/:deviceId/stop` },
  deviceJoint: { method: "POST", path: `${API_PATHS.base}/robotics/devices/:deviceId/joint` },
  devicePose: { method: "POST", path: `${API_PATHS.base}/robotics/devices/:deviceId/pose` },
  deviceGripper: { method: "POST", path: `${API_PATHS.base}/robotics/devices/:deviceId/gripper` },
  policyCheck: { method: "POST", path: `${API_PATHS.base}/robotics/policy/check` },
  motionPlan: { method: "POST", path: `${API_PATHS.base}/robotics/motion/plan` },
  localizationStatus: { method: "GET", path: `${API_PATHS.base}/robotics/localization/status` },
  localizationControl: { method: "POST", path: `${API_PATHS.base}/robotics/localization/control` },
  telemetryCapture: { method: "POST", path: `${API_PATHS.base}/robotics/telemetry/capture` },
  telemetryList: { method: "GET", path: `${API_PATHS.base}/robotics/telemetry` },
  telemetryReplay: { method: "POST", path: `${API_PATHS.base}/robotics/telemetry/replay` },
  missionsCreate: { method: "POST", path: `${API_PATHS.base}/robotics/missions` },
  missionsList: { method: "GET", path: `${API_PATHS.base}/robotics/missions` },
  missionsStatus: { method: "GET", path: `${API_PATHS.base}/robotics/missions/:missionId` },
  missionsCancel: { method: "POST", path: `${API_PATHS.base}/robotics/missions/:missionId/cancel` },
  metrics: { method: "GET", path: `${API_PATHS.base}/robotics/metrics` },
  scan: { method: "POST", path: `${API_PATHS.base}/robotics/scan` },
  ros2Graph: { method: "GET", path: `${API_PATHS.base}/robotics/ros2/:deviceId/graph` },
  ros2Topics: { method: "GET", path: `${API_PATHS.base}/robotics/ros2/:deviceId/topics` },
  ros2Services: { method: "GET", path: `${API_PATHS.base}/robotics/ros2/:deviceId/services` },
  ros2Actions: { method: "GET", path: `${API_PATHS.base}/robotics/ros2/:deviceId/actions` },
  ros2Nodes: { method: "GET", path: `${API_PATHS.base}/robotics/ros2/:deviceId/nodes` },
  ros2Params: { method: "GET", path: `${API_PATHS.base}/robotics/ros2/:deviceId/params` },
  ros2Publish: { method: "POST", path: `${API_PATHS.base}/robotics/ros2/:deviceId/publish` },
  ros2Service: { method: "POST", path: `${API_PATHS.base}/robotics/ros2/:deviceId/service` },
  ros2Action: { method: "POST", path: `${API_PATHS.base}/robotics/ros2/:deviceId/action` },
  ros2ParamsQuery: {
    method: "POST",
    path: `${API_PATHS.base}/robotics/ros2/:deviceId/params/query`,
  },
  ros2ParamsSet: { method: "POST", path: `${API_PATHS.base}/robotics/ros2/:deviceId/params/set` },
} satisfies Record<string, ApiRouteDefinition>;

export const RPA_ROUTES_V1: Record<string, ApiRouteDefinition> = {
  health: { method: "GET", path: API_PATHS.rpaHealth },
  libraries: { method: "GET", path: `${API_PATHS.base}/rpa/libraries` },
  libraryGet: { method: "GET", path: `${API_PATHS.base}/rpa/libraries/:libraryName` },
  metrics: { method: "GET", path: `${API_PATHS.base}/rpa/metrics` },
  metricsOpenMetrics: { method: "GET", path: API_PATHS.rpaMetricsOpenMetrics },
  templates: { method: "GET", path: `${API_PATHS.base}/rpa/templates` },
  templateGet: { method: "GET", path: `${API_PATHS.base}/rpa/templates/:id` },
  workflows: { method: "GET", path: `${API_PATHS.base}/rpa/workflows` },
  workflowsCreate: { method: "POST", path: `${API_PATHS.base}/rpa/workflows` },
  workflowsGet: { method: "GET", path: `${API_PATHS.base}/rpa/workflows/:id` },
  workflowsUpdate: { method: "PUT", path: `${API_PATHS.base}/rpa/workflows/:id` },
  workflowsDelete: { method: "DELETE", path: `${API_PATHS.base}/rpa/workflows/:id` },
  workflowsExecute: { method: "POST", path: `${API_PATHS.base}/rpa/workflows/:id/execute` },
  workflowsSchedules: { method: "GET", path: `${API_PATHS.base}/rpa/workflows/:id/schedules` },
  workflowsSchedulesCreate: {
    method: "POST",
    path: `${API_PATHS.base}/rpa/workflows/:id/schedules`,
  },
  workflowsWebhook: { method: "POST", path: `${API_PATHS.base}/rpa/workflows/:id/webhook` },
  scheduleDelete: { method: "DELETE", path: `${API_PATHS.base}/rpa/schedules/:scheduleId` },
  executions: { method: "GET", path: `${API_PATHS.base}/rpa/executions` },
  executionGet: { method: "GET", path: `${API_PATHS.base}/rpa/executions/:id` },
  executionCancel: { method: "POST", path: `${API_PATHS.base}/rpa/executions/:id/cancel` },
  executionStream: { method: "GET", path: `${API_PATHS.base}/rpa/executions/:id/stream` },
  executionTrainingPreview: {
    method: "POST",
    path: `${API_PATHS.base}/rpa/executions/:id/training/preview`,
  },
  executionTrainingStart: { method: "POST", path: `${API_PATHS.base}/rpa/executions/:id/training` },
  generate: { method: "POST", path: `${API_PATHS.base}/rpa/generate` },
  keywordsExecute: { method: "POST", path: `${API_PATHS.base}/rpa/keywords/execute` },
  validate: { method: "POST", path: `${API_PATHS.base}/rpa/validate` },
} satisfies Record<string, ApiRouteDefinition>;

export const VISION_ROUTES_V1: Record<string, ApiRouteDefinition> = {
  health: { method: "GET", path: `${API_PATHS.base}/vision/health` },
  capabilities: { method: "GET", path: `${API_PATHS.base}/vision/capabilities` },
  classify: { method: "POST", path: `${API_PATHS.base}/vision/classify` },
  vitPytorchClassify: { method: "POST", path: `${API_PATHS.base}/vision/vit/pytorch/classify` },
  segment: { method: "POST", path: `${API_PATHS.base}/vision/segment` },
  explain: { method: "POST", path: `${API_PATHS.base}/vision/explain` },
  translatePix2Pix: { method: "POST", path: `${API_PATHS.base}/vision/translate/pix2pix` },
  translateCycleGan: { method: "POST", path: `${API_PATHS.base}/vision/translate/cyclegan` },
  preprocess: { method: "POST", path: `${API_PATHS.base}/vision/preprocess` },
  exportOnnx: { method: "POST", path: `${API_PATHS.base}/vision/export/onnx` },
  memvidIndex: { method: "POST", path: `${API_PATHS.base}/vision/memvid/index` },
  memvidSearch: { method: "POST", path: `${API_PATHS.base}/vision/memvid/search` },
  trainLightning: { method: "POST", path: `${API_PATHS.base}/vision/train/lightning` },
  trainLightningStatus: { method: "GET", path: `${API_PATHS.base}/vision/train/lightning/:jobId` },
} satisfies Record<string, ApiRouteDefinition>;
