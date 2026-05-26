/**
 * v1 contract snapshot registry.
 *
 * Centralizes the list of v1 contracts that must be snapshotted and regression-tested.
 * This avoids drift between:
 * - `scripts/generate-contract-snapshots.ts`
 * - `tests/contracts/snapshot-regression.test.ts`
 *
 * Individual contract modules are imported directly to avoid a barrel file.
 *
 * @shared/contracts/snapshots/v1.contracts
 */

import type { TSchema } from "@baohaus/baobox/elysia";
import { isJsonGuardRecord } from "../../types/json-guard.ts";
import * as AiDeviceAssistContracts from "../versions/v1/ai-device-assist.contract";
import * as AiDeviceAssistConfigContracts from "../versions/v1/ai-device-assist-config.contract";
import * as AiServiceAlignmentContracts from "../versions/v1/ai-service-alignment.contract";
import * as AiTextContracts from "../versions/v1/ai-text.contract";
import * as AnnotationAlignmentContracts from "../versions/v1/annotation-alignment.contract";
import * as AnnotationAutoIngestContracts from "../versions/v1/annotation-auto-ingest.contract";
import * as AutonomyIntegrationContracts from "../versions/v1/autonomy-integration.contract";
import * as BaoInstallContracts from "../versions/v1/bao-install.contract";
import * as BaoObservabilityContracts from "../versions/v1/bao-observability.contract";
import * as BaodownDefinitionsContracts from "../versions/v1/baodown/definitions";
import * as BaodownIntegrationContracts from "../versions/v1/baodown/integration";
import * as BaodownRunsContracts from "../versions/v1/baodown/runs";
import * as BaodownSchedulesContracts from "../versions/v1/baodown/schedules";
import * as BaodownTriggersContracts from "../versions/v1/baodown/triggers";
import * as BaodownVersionsContracts from "../versions/v1/baodown/versions";
import * as BaodownWebhooksContracts from "../versions/v1/baodown/webhooks";
import * as BaodownMcpContracts from "../versions/v1/baodown-mcp.contract";
import * as BunbuddyCapabilitiesContracts from "../versions/v1/bunbuddy-capabilities.contract";
import * as BunbuddyDevicesContracts from "../versions/v1/bunbuddy-devices.contract";
import * as BunbuddyHealthContracts from "../versions/v1/bunbuddy-health.contract";
import * as BunbuddyRoutingContracts from "../versions/v1/bunbuddy-routing.contract";
import * as CalibrationContracts from "../versions/v1/calibration.contract";
import * as CapabilityDomainMapContracts from "@baohaus/bao-contracts/versions/v1/capability-domain-map.contract";
import * as CapabilityImpactContracts from "../versions/v1/capability-impact.contract";
import * as CapabilityOwnershipContracts from "../versions/v1/capability-ownership.contract";
import * as CapabilityRegistryListContracts from "../versions/v1/capability-registry-list.contract";
import * as ChatRunContracts from "../versions/v1/chat-run.contract";
import * as ChatToolsContracts from "../versions/v1/chat-tools.contract";
import * as DeviceInventoryRefreshContracts from "../versions/v1/device-inventory-refresh.contract";
import * as DriverRegistryContracts from "../versions/v1/driver-registry.contract";
import * as DroneCapabilityContracts from "../versions/v1/drone-capability.contract";
import * as DroneCommandsContracts from "../versions/v1/drone-commands.contract";
import * as DroneHistoryContracts from "../versions/v1/drone-history.contract";
import * as DroneMissionPlannerContracts from "../versions/v1/drone-mission-planner.contract";
import * as DroneRealtimeContracts from "../versions/v1/drone-realtime.contract";
import * as DroneSummaryContracts from "../versions/v1/drone-summary.contract";
import * as DroneTrainingContracts from "../versions/v1/drone-training-integration.contract";
import * as FleetContracts from "../versions/v1/fleet.contract";
import * as HardwareIntegrationContracts from "../versions/v1/hardware-integration.contract";
import * as HardwareSummaryContracts from "../versions/v1/hardware-summary.contract";
import * as ImagerStatusContracts from "../versions/v1/imager-status.contract";
import * as LibraryRegistryContracts from "../versions/v1/library-registry.contract";
import * as McpContracts from "../versions/v1/mcp.contract";
import * as NetworkDiscoveryContracts from "../versions/v1/network-discovery.contract";
import * as BaoRuntimeContracts from "../versions/v1/bao-runtime.contract";
import * as RagContracts from "../versions/v1/rag.contract";
import * as ReportsContracts from "../versions/v1/reports.contract";
import * as RoboticsCapabilityContracts from "../versions/v1/robotics-capability.contract";
import * as RoboticsCommandsContracts from "../versions/v1/robotics-commands.contract";
import * as RoboticsDevicesContracts from "../versions/v1/robotics-devices.contract";
import * as RoboticsLocalizationContracts from "../versions/v1/robotics-localization.contract";
import * as RoboticsMissionContracts from "../versions/v1/robotics-mission.contract";
import * as RoboticsMotionContracts from "../versions/v1/robotics-motion.contract";
import * as RoboticsPolicyContracts from "../versions/v1/robotics-policy.contract";
import * as RoboticsSummaryContracts from "../versions/v1/robotics-summary.contract";
import * as RoboticsTelemetryContracts from "../versions/v1/robotics-telemetry.contract";
import * as RoboticsTrainingContracts from "../versions/v1/robotics-training-integration.contract";
import * as RpaTrainingContracts from "../versions/v1/rpa-training.contract";
import * as SetupWizardContracts from "../versions/v1/setup-wizard.contract";
import * as TrainingJobsContracts from "../versions/v1/training-jobs.contract";
import * as UsdAnnotationsContracts from "../versions/v1/usd-annotations.contract";
import * as UsdAssetsContracts from "../versions/v1/usd-assets.contract";
import * as UserSelfServiceContracts from "../versions/v1/user-self-service.contract";
import * as UsersContracts from "../versions/v1/users.contract";
import * as XrContracts from "../versions/v1/xr.contract";

/**
 * Aggregated v1 contract exports from all individual contract modules.
 * Used by snapshot tooling to enumerate all contract definitions.
 */
export const V1_ALL_CONTRACT_EXPORTS: Record<string, unknown> = {
  ...AiDeviceAssistConfigContracts,
  ...AiDeviceAssistContracts,
  ...AiServiceAlignmentContracts,
  ...AiTextContracts,
  ...AnnotationAlignmentContracts,
  ...AnnotationAutoIngestContracts,
  ...AutonomyIntegrationContracts,
  ...BaoInstallContracts,
  ...BaoObservabilityContracts,
  ...BaodownDefinitionsContracts,
  ...BaodownIntegrationContracts,
  ...BaodownRunsContracts,
  ...BaodownSchedulesContracts,
  ...BaodownTriggersContracts,
  ...BaodownVersionsContracts,
  ...BaodownWebhooksContracts,
  ...BaodownMcpContracts,
  ...BunbuddyCapabilitiesContracts,
  ...BunbuddyDevicesContracts,
  ...BunbuddyHealthContracts,
  ...BunbuddyRoutingContracts,
  ...CalibrationContracts,
  ...CapabilityDomainMapContracts,
  ...CapabilityImpactContracts,
  ...CapabilityOwnershipContracts,
  ...CapabilityRegistryListContracts,
  ...ChatRunContracts,
  ...ChatToolsContracts,
  ...DeviceInventoryRefreshContracts,
  ...DriverRegistryContracts,
  ...DroneCapabilityContracts,
  ...DroneCommandsContracts,
  ...DroneHistoryContracts,
  ...DroneMissionPlannerContracts,
  ...DroneRealtimeContracts,
  ...DroneSummaryContracts,
  ...DroneTrainingContracts,
  ...FleetContracts,
  ...HardwareIntegrationContracts,
  ...HardwareSummaryContracts,
  ...ImagerStatusContracts,
  ...LibraryRegistryContracts,
  ...McpContracts,
  ...NetworkDiscoveryContracts,
  ...BaoRuntimeContracts,
  ...RagContracts,
  ...ReportsContracts,
  ...RoboticsCapabilityContracts,
  ...RoboticsCommandsContracts,
  ...RoboticsDevicesContracts,
  ...RoboticsLocalizationContracts,
  ...RoboticsMissionContracts,
  ...RoboticsMotionContracts,
  ...RoboticsPolicyContracts,
  ...RoboticsSummaryContracts,
  ...RoboticsTelemetryContracts,
  ...RoboticsTrainingContracts,
  ...RpaTrainingContracts,
  ...SetupWizardContracts,
  ...TrainingJobsContracts,
  ...UsdAnnotationsContracts,
  ...UsdAssetsContracts,
  ...UserSelfServiceContracts,
  ...UsersContracts,
  ...XrContracts,
};

/**
 * Minimal contract shape required for snapshotting.
 */
export interface SnapshotContractV1 {
  /** Stable contract name (used as snapshot key). */
  name: string;
  /** Semver contract version. */
  version: string;
  /** Request schema. */
  request: TSchema;
  /** Response schema. */
  response: TSchema;
}

/**
 * Narrow an unknown value to a snapshot-ready v1 contract.
 *
 * @param value - Candidate export to inspect.
 * @returns True when the value matches the snapshot contract shape.
 */
function isSnapshotContractV1(value: unknown): value is SnapshotContractV1 {
  if (!isJsonGuardRecord(value)) {
    return false;
  }
  return (
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    typeof value.version === "string" &&
    value.version.trim().length > 0 &&
    typeof value.request === "object" &&
    value.request !== null &&
    typeof value.response === "object" &&
    value.response !== null
  );
}

/**
 * Resolve all v1 contracts that should be snapshotted.
 *
 * @returns Sorted snapshot contract list.
 */
function resolveV1SnapshotContracts(): SnapshotContractV1[] {
  const entries = Object.entries(V1_ALL_CONTRACT_EXPORTS) as [string, unknown][];

  const isSnapshotEntry = (entry: [string, unknown]): entry is [string, SnapshotContractV1] => {
    const [key, value] = entry;
    return key.endsWith("ContractV1") && isSnapshotContractV1(value);
  };

  return entries
    .filter(isSnapshotEntry)
    .map(([_key, value]) => value)
    .sort((left, right) => left.name.localeCompare(right.name));
}

/**
 * v1 contracts that must be included in `v1.snapshot.json`.
 */
export const V1_CONTRACT_SNAPSHOT_TARGETS: readonly SnapshotContractV1[] =
  resolveV1SnapshotContracts();

/**
 * Export keys from all v1 contract modules that end with `ContractV1`.
 */
export const V1_CONTRACT_EXPORT_KEYS: readonly string[] = Object.keys(
  V1_ALL_CONTRACT_EXPORTS,
).filter((key) => key.endsWith("ContractV1"));

/**
 * Map from export key to contract name for all v1 ContractV1 exports.
 */
export const V1_CONTRACT_EXPORT_NAME_BY_KEY: ReadonlyMap<string, string> = new Map(
  Object.entries(V1_ALL_CONTRACT_EXPORTS)
    .filter(
      (entry): entry is [string, SnapshotContractV1] =>
        entry[0].endsWith("ContractV1") && isSnapshotContractV1(entry[1]),
    )
    .map(([key, contract]) => [key, contract.name]),
);
