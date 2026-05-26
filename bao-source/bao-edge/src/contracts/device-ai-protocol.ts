/**
 * Canonical contract types for the local-first device AI build protocol.
 */

/** Supported capability flags required by device AI protocol runs. */
export type DeviceAiCapability = "mobile_actions" | "rpa_controls" | "flow_commands";

/** Stable pass/fail/skip status for protocol stages and platform summaries. */
export type DeviceAiStageStatus = "pass" | "fail" | "skip";

/** Supported mobile platform identifiers covered by the protocol. */
export type DeviceAiPlatform = "android" | "ios";

/** Runtime requirement declaration for local and remote AI provider availability. */
export interface DeviceAiRuntimeRequirements {
  /** Require local Ollama reachability for protocol pass. */
  localOllama: boolean;
  /** Require Hugging Face cloud API reachability for protocol pass. */
  cloudHuggingFace: boolean;
}

/** Platform requirement declaration. */
export interface DeviceAiPlatformRequirement {
  /** Whether this platform must pass for overall protocol success. */
  required: boolean;
}

/** Per-platform requirement map for protocol profiles. */
export interface DeviceAiPlatformRequirements {
  /** Android platform requirement declaration. */
  android: DeviceAiPlatformRequirement;
  /** iOS platform requirement declaration. */
  ios: DeviceAiPlatformRequirement;
}

/** Canonical protocol profile loaded from config and env overrides. */
export interface DeviceAiProtocolProfile {
  /** Schema/profile version for compatibility checks. */
  profileVersion: string;
  /** Required Hugging Face model reference to validate and stage. */
  requiredModelRef: string;
  /** Required revision pin (branch/tag/commit) for deterministic pulls. */
  revision: string;
  /** Required model file to download from the repository revision. */
  requiredModelFile: string;
  /** Required SHA-256 digest for the exact model artifact. */
  requiredModelSha256: string;
  /** Required capability flags expected from the staged model/runtime path. */
  requiredCapabilities: DeviceAiCapability[];
  /** Runtime provider availability requirements. */
  runtimeRequirements: DeviceAiRuntimeRequirements;
  /** Platform pass/fail requirements. */
  platforms: DeviceAiPlatformRequirements;
  /** Default timeout budget for protocol execution stages (ms). */
  protocolTimeoutMs: number;
  /** Maximum allowed age for protocol reports (minutes). */
  reportMaxAgeMinutes: number;
}

/** Runtime probe result row for one external dependency boundary. */
export interface DeviceAiRuntimeProbe {
  /** Whether this probe is required by profile policy. */
  required: boolean;
  /** Whether the probe succeeded. */
  available: boolean;
  /** Human-readable probe summary. */
  message: string;
}

/** Runtime probe summary set attached to protocol reports. */
export interface DeviceAiRuntimeProbeResult {
  /** Local Ollama probe result. */
  localOllama: DeviceAiRuntimeProbe;
  /** Hugging Face cloud probe result. */
  cloudHuggingFace: DeviceAiRuntimeProbe;
}

/** Per-stage trace row for deterministic execution reporting. */
export interface DeviceAiStageReport {
  /** Stable stage identifier. */
  stage: string;
  /** Stage status value. */
  status: DeviceAiStageStatus;
  /** Per-stage correlation id for traceability. */
  correlationId: string;
  /** ISO8601 start timestamp. */
  startedAt: string;
  /** ISO8601 end timestamp. */
  endedAt: string;
  /** Human-readable stage details. */
  message: string;
  /** Whether a failure in this stage can be retried. */
  retryable: boolean;
}

/** Stable progress summary for a completed or in-flight protocol surface. */
export interface DeviceAiProgressSummary {
  /** Total number of stages expected for the surface. */
  totalStages: number;
  /** Number of stages completed so far. */
  completedStages: number;
  /** Last completed stage identifier. */
  lastCompletedStage: string;
}

/** Provenance/fingerprint fields used to reject stale reports from older logic. */
export interface DeviceAiReportProvenance {
  /** SHA-256 fingerprint of the effective protocol profile. */
  profileHash: string;
  /** Correlation fingerprint for the latest app-build matrix consumed by the run. */
  appBuildCorrelation: string;
  /** SHA-256 fingerprint of the runtime probe result set. */
  runtimeProbeSignature: string;
}

/** Evidence record proving model acquisition and verification outcomes. */
export interface DeviceAiModelEvidence {
  /** Model reference validated by the protocol run. */
  modelRef: string;
  /** Required revision pin used during pull/download. */
  revision: string;
  /** Required model file name validated by the run. */
  fileName: string;
  /** Whether the model was downloaded successfully. */
  downloaded: boolean;
  /** Whether checksum/integrity verification passed. */
  verified: boolean;
  /** Optional absolute local artifact path for downloaded content. */
  artifactPath?: string;
  /** Required SHA-256 digest of the downloaded artifact. */
  sha256: string;
  /** Required size in bytes of downloaded artifact. */
  sizeBytes: number;
  /** Capability flags associated with the resolved model. */
  capabilities: DeviceAiCapability[];
}

/** Per-platform execution result row for staging + smoke checks. */
export interface DeviceAiPlatformReport {
  /** Platform identifier. */
  platform: DeviceAiPlatform;
  /** Whether platform pass is mandatory by policy. */
  required: boolean;
  /** Terminal platform status. */
  status: DeviceAiStageStatus;
  /** Whether device/simulator runtime was ready. */
  deviceReady: boolean;
  /** Whether model staging completed for this platform. */
  stagingReady: boolean;
  /** Whether smoke automation succeeded. */
  smokeReady: boolean;
  /** Ordered stage trace for this platform. */
  stages: DeviceAiStageReport[];
  /** Explicit progress summary for this platform. */
  progress: DeviceAiProgressSummary;
}

/** Full protocol run report persisted by the canonical `bao-flow device-ai run-protocol` owner. */
export interface DeviceAiProtocolRunReport {
  /** Report schema version. */
  schemaVersion: string;
  /** ISO8601 report generation timestamp. */
  generatedAt: string;
  /** Global correlation id for this protocol run. */
  correlationId: string;
  /** Effective profile used by the run. */
  profile: DeviceAiProtocolProfile;
  /** Runtime local/cloud probe result set. */
  runtime: DeviceAiRuntimeProbeResult;
  /** Provenance/fingerprint fields for stale-report rejection. */
  provenance: DeviceAiReportProvenance;
  /** Model evidence for the required model reference. */
  model: DeviceAiModelEvidence;
  /** Explicit overall progress summary for the report. */
  progress: DeviceAiProgressSummary;
  /** Platform report map for Android and iOS. */
  platforms: {
    /** Android platform report. */
    android: DeviceAiPlatformReport;
    /** iOS platform report. */
    ios: DeviceAiPlatformReport;
  };
  /** Terminal protocol status. */
  status: Exclude<DeviceAiStageStatus, "skip">;
  /** Flat list of terminal failure reasons. */
  failures: string[];
}

/** JSON scalar value accepted by protocol parser helpers. */
export type DeviceAiJsonScalar = string | number | boolean | null;

/** JSON object value accepted by protocol parser helpers. */
export type DeviceAiJsonRecord = { [key: string]: DeviceAiJsonValue };

/** JSON value accepted by protocol parser helpers. */
export type DeviceAiJsonValue = DeviceAiJsonScalar | DeviceAiJsonRecord | DeviceAiJsonValue[];

function isRecord(
  value: DeviceAiJsonValue | DeviceAiProtocolRunReport | undefined,
): value is DeviceAiJsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asTrimmedString(value: DeviceAiJsonValue | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function asPositiveInteger(value: DeviceAiJsonValue | undefined): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number.parseInt(value.trim(), 10);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return null;
}

function parseCapability(value: string): DeviceAiCapability | null {
  if (value === "mobile_actions" || value === "rpa_controls" || value === "flow_commands") {
    return value;
  }
  return null;
}

type DeviceAiProtocolProfileCoreFields = Readonly<{
  profileVersion: string;
  requiredModelRef: string;
  revision: string;
  requiredModelFile: string;
  requiredModelSha256: string;
  protocolTimeoutMs: number;
  reportMaxAgeMinutes: number;
}>;

function parseProfileCoreFields(
  value: DeviceAiJsonRecord,
): DeviceAiProtocolProfileCoreFields | null {
  const profileVersion = asTrimmedString(value.profileVersion);
  const requiredModelRef = asTrimmedString(value.requiredModelRef);
  const revision = asTrimmedString(value.revision);
  const requiredModelFile = asTrimmedString(value.requiredModelFile);
  const requiredModelSha256 = asTrimmedString(value.requiredModelSha256).toLowerCase();
  const protocolTimeoutMs = asPositiveInteger(value.protocolTimeoutMs);
  const reportMaxAgeMinutes = asPositiveInteger(value.reportMaxAgeMinutes);

  if (
    profileVersion.length === 0 ||
    requiredModelRef.length === 0 ||
    revision.length === 0 ||
    requiredModelFile.length === 0 ||
    /^[a-f0-9]{64}$/.test(requiredModelSha256) === false ||
    protocolTimeoutMs === null ||
    reportMaxAgeMinutes === null
  ) {
    return null;
  }

  return {
    profileVersion,
    requiredModelRef,
    revision,
    requiredModelFile,
    requiredModelSha256,
    protocolTimeoutMs,
    reportMaxAgeMinutes,
  };
}

function parseRequiredCapabilities(
  value: DeviceAiJsonValue | undefined,
): DeviceAiCapability[] | null {
  if (Array.isArray(value) === false) {
    return null;
  }

  const requiredCapabilities: DeviceAiCapability[] = [];
  for (const item of value) {
    const capability = parseCapability(typeof item === "string" ? item.trim() : "");
    if (!capability || requiredCapabilities.includes(capability)) {
      continue;
    }
    requiredCapabilities.push(capability);
  }

  return requiredCapabilities.length > 0 ? requiredCapabilities : null;
}

function parseRuntimeRequirements(
  value: DeviceAiJsonValue | undefined,
): DeviceAiRuntimeRequirements | null {
  if (!isRecord(value)) {
    return null;
  }

  return {
    localOllama: value.localOllama === true,
    cloudHuggingFace: value.cloudHuggingFace === true,
  };
}

function parsePlatformRequirement(
  value: DeviceAiJsonValue | undefined,
): DeviceAiPlatformRequirement | null {
  if (!isRecord(value)) {
    return null;
  }

  return { required: value.required === true };
}

function parsePlatformRequirements(
  value: DeviceAiJsonValue | undefined,
): DeviceAiPlatformRequirements | null {
  if (!isRecord(value)) {
    return null;
  }

  const android = parsePlatformRequirement(value.android);
  const ios = parsePlatformRequirement(value.ios);

  if (!(android && ios)) {
    return null;
  }

  return { android, ios };
}

/**
 * Parse and validate a protocol profile object from JSON-like data.
 * Returns `null` when required fields are missing/invalid.
 */
export function parseDeviceAiProtocolProfile(
  value: DeviceAiJsonValue | undefined,
): DeviceAiProtocolProfile | null {
  if (!isRecord(value)) {
    return null;
  }

  const coreFields = parseProfileCoreFields(value);
  const requiredCapabilities = parseRequiredCapabilities(value.requiredCapabilities);
  const runtimeRequirements = parseRuntimeRequirements(value.runtimeRequirements);
  const platforms = parsePlatformRequirements(value.platforms);

  if (!(coreFields && requiredCapabilities)) {
    return null;
  }

  if (!(runtimeRequirements && platforms)) {
    return null;
  }

  return {
    profileVersion: coreFields.profileVersion,
    requiredModelRef: coreFields.requiredModelRef,
    revision: coreFields.revision,
    requiredModelFile: coreFields.requiredModelFile,
    requiredModelSha256: coreFields.requiredModelSha256,
    requiredCapabilities,
    runtimeRequirements,
    platforms,
    protocolTimeoutMs: coreFields.protocolTimeoutMs,
    reportMaxAgeMinutes: coreFields.reportMaxAgeMinutes,
  };
}

/**
 * Runtime guard for device AI protocol run reports.
 */
export function isDeviceAiProtocolRunReport(
  value: DeviceAiJsonValue | DeviceAiProtocolRunReport | undefined,
): value is DeviceAiProtocolRunReport {
  if (!isRecord(value)) {
    return false;
  }
  const status = asTrimmedString(value.status);
  if (status !== "pass" && status !== "fail") {
    return false;
  }
  if (!Array.isArray(value.failures)) {
    return false;
  }
  const profile = parseDeviceAiProtocolProfile(value.profile);
  if (!profile) {
    return false;
  }
  if (!(isRecord(value.provenance) && isRecord(value.progress))) {
    return false;
  }
  return true;
}
