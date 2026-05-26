/**
 * Canonical app-owned verification report contract shared by mobile apps and control-plane readers.
 */

/** Current schema version for operator verification reports. */
export const OPERATOR_VERIFICATION_REPORT_SCHEMA_VERSION = "1.0" as const;

/** Platforms that emit operator verification reports. */
export type OperatorVerificationPlatform = "android" | "ios";

/** JSON-like input accepted at the report boundary before contract normalization. */
type JsonInput =
  | JsonScalar
  | { readonly [key: string]: JsonInput | undefined }
  | readonly JsonInput[];

/** Stable workflow scenarios covered by app-owned verification reports. */
export type OperatorVerificationScenario =
  | "cloud_chat"
  | "local_device_ai"
  | "calendar_native_action"
  | "web_research_rpa"
  | "automation_schedule";

/** Trigger source for one verification report run. */
export type OperatorVerificationTriggerSource =
  | "user"
  | "launch_injection"
  | "background_schedule"
  | "device_ai_protocol"
  | "native_intent";

/** Capability usage resolved for one verification run. */
export type OperatorVerificationUsage =
  | "chat"
  | "automation"
  | "research_rpa"
  | "native_action"
  | "speech_input"
  | "speech_output"
  | "local_device_ai";

/** Runtime transport used for one verification run. */
export type OperatorVerificationRuntimeTransport = "local" | "cloud";

/** Terminal state written into verification reports. */
export type OperatorVerificationTerminalState =
  | "idle"
  | "loading"
  | "success"
  | "empty"
  | "error-retryable"
  | "error-non-retryable"
  | "unauthorized";

/** Structured provenance for one runtime binding used during verification. */
export interface OperatorVerificationRuntimeBinding {
  /** Capability usage requested by the app for this run. */
  usage: OperatorVerificationUsage;
  /** Whether the app resolved to local or cloud execution. */
  transport: OperatorVerificationRuntimeTransport;
  /** Optional provider identifier for cloud-backed execution. */
  provider?: string;
  /** Optional model identifier for the resolved runtime. */
  model?: string;
  /** Optional model source or inventory family. */
  source?: string;
  /** Optional local model identifier when the run used a native model. */
  localModelName?: string;
  /** Optional target platform when the runtime dispatches remote agent work. */
  targetPlatform?: "android" | "ios";
}

/** Human-readable request summary emitted by the app. */
export interface OperatorVerificationRequestSummary {
  /** Prompt or high-level intent summary for the run. */
  prompt: string;
  /** Optional machine-readable metadata attached to the request. */
  metadata?: Record<string, string>;
}

/** Human-readable terminal reply summary emitted by the app. */
export interface OperatorVerificationReplySummary {
  /** Final user-visible reply or status summary. */
  message: string;
  /** Terminal state surfaced by the app. */
  state: OperatorVerificationTerminalState;
  /** Provenance of the reply content. */
  provenance: "cloud" | "local" | "native" | "xctest" | "rpa";
  /** Optional live source URLs used to produce the reply. */
  sources?: string[];
}

/** Structured evidence row proving one part of the verified workflow. */
export interface OperatorVerificationEvidence {
  /** Stable evidence category. */
  kind:
    | "url_visit"
    | "screenshot"
    | "ui_hierarchy"
    | "calendar_event"
    | "device_ai_report"
    | "flow_report"
    | "conversation_persisted";
  /** Outcome for this evidence row. */
  status: "success" | "failed" | "partial";
  /** Human-readable summary. */
  summary: string;
  /** Optional primary value associated with this evidence row. */
  value?: string;
  /** Optional absolute artifact path. */
  artifactPath?: string;
  /** Optional structured metadata emitted by the app. */
  metadata?: Record<string, string>;
}

/** Persisted entity identifiers created or touched by the run. */
export interface OperatorVerificationTargetIds {
  /** Optional application identifier under test. */
  appId?: string;
  /** Optional schedule identifier for durable automations. */
  scheduleId?: string;
  /** Optional calendar event identifier. */
  eventId?: string;
  /** Optional calendar identifier/title. */
  calendarId?: string;
  /** Optional conversation/thread identifier. */
  conversationId?: string;
  /** Optional emulator/simulator device identifier. */
  deviceId?: string;
}

/** Canonical app-owned operator verification report. */
export interface OperatorVerificationReport {
  /** Schema version for compatibility checks. */
  schemaVersion: typeof OPERATOR_VERIFICATION_REPORT_SCHEMA_VERSION;
  /** Correlation id for the verification run. */
  correlationId: string;
  /** Platform that emitted the report. */
  platform: OperatorVerificationPlatform;
  /** Stable scenario identifier. */
  scenario: OperatorVerificationScenario;
  /** Runtime binding used by the app for the run. */
  runtime: OperatorVerificationRuntimeBinding;
  /** Trigger source that started the run. */
  triggerSource: OperatorVerificationTriggerSource;
  /** Human-readable request summary. */
  request: OperatorVerificationRequestSummary;
  /** Terminal verification state. */
  terminalState: OperatorVerificationTerminalState;
  /** Human-readable reply summary. */
  reply: OperatorVerificationReplySummary;
  /** Ordered evidence rows captured by the app. */
  evidence: OperatorVerificationEvidence[];
  /** Persisted target identifiers created or touched by the app. */
  targetIds?: OperatorVerificationTargetIds;
  /** Absolute artifact paths produced by the run. */
  artifactPaths?: string[];
  /** ISO8601 start timestamp. */
  startedAt: string;
  /** ISO8601 completion timestamp. */
  completedAt: string;
}

// Parser helpers

type JsonScalar = string | number | boolean | null;
type JsonValue = JsonScalar | JsonRecord | readonly JsonValue[];
type JsonRecord = { readonly [key: string]: JsonValue };

function isJsonRecord(value: JsonInput | undefined): value is JsonRecord {
  return (
    value !== null && value !== undefined && typeof value === "object" && !Array.isArray(value)
  );
}

function asTrimmedString(value: JsonInput | undefined): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function asIsoTimestamp(value: JsonInput | undefined): string | null {
  const normalized = asTrimmedString(value);
  if (!normalized) {
    return null;
  }
  return Number.isNaN(Date.parse(normalized)) ? null : normalized;
}

function asMetadataRecord(value: JsonInput | undefined): Record<string, string> | undefined {
  if (!isJsonRecord(value)) {
    return undefined;
  }
  const entries = Object.entries(value)
    .map(([key, metadataValue]) => {
      const normalizedValue = asTrimmedString(metadataValue);
      return normalizedValue ? ([key, normalizedValue] as const) : null;
    })
    .filter((entry): entry is readonly [string, string] => entry !== null);
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

const VALID_PLATFORMS = new Set<string>(["android", "ios"]);
const VALID_SCENARIOS = new Set<string>([
  "cloud_chat",
  "local_device_ai",
  "calendar_native_action",
  "web_research_rpa",
  "automation_schedule",
]);
const VALID_TRIGGER_SOURCES = new Set<string>([
  "user",
  "launch_injection",
  "background_schedule",
  "device_ai_protocol",
  "native_intent",
]);
const VALID_TERMINAL_STATES = new Set<string>([
  "idle",
  "loading",
  "success",
  "empty",
  "error-retryable",
  "error-non-retryable",
  "unauthorized",
]);
const VALID_USAGES = new Set<string>([
  "chat",
  "automation",
  "research_rpa",
  "native_action",
  "speech_input",
  "speech_output",
  "local_device_ai",
]);
const VALID_TRANSPORTS = new Set<string>(["local", "cloud"]);
const VALID_EVIDENCE_KINDS = new Set<string>([
  "url_visit",
  "screenshot",
  "ui_hierarchy",
  "calendar_event",
  "device_ai_report",
  "flow_report",
  "conversation_persisted",
]);
const VALID_EVIDENCE_STATUSES = new Set<string>(["success", "failed", "partial"]);
const VALID_PROVENANCES = new Set<string>(["cloud", "local", "native", "xctest", "rpa"]);

function readOptionalTrimmedString(value: JsonInput | undefined): string | null {
  return asTrimmedString(value);
}

function readRequiredRecord(value: JsonInput | undefined): JsonRecord | null {
  return isJsonRecord(value) ? value : null;
}

function isValidMember<T extends string>(
  value: string | null,
  members: ReadonlySet<string>,
): value is T {
  return value !== null && members.has(value);
}

function buildOperatorVerificationRuntime(
  runtime: JsonRecord,
): OperatorVerificationRuntimeBinding | null {
  const usage = readOptionalTrimmedString(runtime.usage);
  const transport = readOptionalTrimmedString(runtime.transport);
  if (
    !(
      isValidMember<OperatorVerificationUsage>(usage, VALID_USAGES) &&
      isValidMember<OperatorVerificationRuntimeTransport>(transport, VALID_TRANSPORTS)
    )
  ) {
    return null;
  }

  const provider = readOptionalTrimmedString(runtime.provider);
  const model = readOptionalTrimmedString(runtime.model);
  const source = readOptionalTrimmedString(runtime.source);
  const localModelName = readOptionalTrimmedString(runtime.localModelName);
  const targetPlatform = readOptionalTrimmedString(runtime.targetPlatform);

  return {
    usage,
    transport,
    ...(provider ? { provider } : {}),
    ...(model ? { model } : {}),
    ...(source ? { source } : {}),
    ...(localModelName ? { localModelName } : {}),
    ...(targetPlatform && VALID_PLATFORMS.has(targetPlatform)
      ? { targetPlatform: targetPlatform as "android" | "ios" }
      : {}),
  };
}

function buildOperatorVerificationRequest(
  request: JsonRecord,
): OperatorVerificationRequestSummary | null {
  const prompt = readOptionalTrimmedString(request.prompt);
  if (!prompt) {
    return null;
  }
  const metadata = asMetadataRecord(request.metadata);
  return {
    prompt,
    ...(metadata ? { metadata } : {}),
  };
}

function buildOperatorVerificationReply(
  reply: JsonRecord,
): OperatorVerificationReplySummary | null {
  const message = readOptionalTrimmedString(reply.message);
  const state = readOptionalTrimmedString(reply.state);
  const provenance = readOptionalTrimmedString(reply.provenance);
  if (
    !(
      message &&
      state &&
      VALID_TERMINAL_STATES.has(state) &&
      provenance &&
      VALID_PROVENANCES.has(provenance)
    )
  ) {
    return null;
  }

  return {
    message,
    state: state as OperatorVerificationTerminalState,
    provenance: provenance as OperatorVerificationReplySummary["provenance"],
    ...(Array.isArray(reply.sources)
      ? {
          sources: reply.sources.filter(
            (v): v is string => typeof v === "string" && v.trim().length > 0,
          ),
        }
      : {}),
  };
}

function buildOperatorVerificationTargetIds(targetIds: JsonRecord): OperatorVerificationTargetIds {
  const appId = readOptionalTrimmedString(targetIds.appId);
  const scheduleId = readOptionalTrimmedString(targetIds.scheduleId);
  const eventId = readOptionalTrimmedString(targetIds.eventId);
  const calendarId = readOptionalTrimmedString(targetIds.calendarId);
  const conversationId = readOptionalTrimmedString(targetIds.conversationId);
  const deviceId = readOptionalTrimmedString(targetIds.deviceId);

  return {
    ...(appId ? { appId } : {}),
    ...(scheduleId ? { scheduleId } : {}),
    ...(eventId ? { eventId } : {}),
    ...(calendarId ? { calendarId } : {}),
    ...(conversationId ? { conversationId } : {}),
    ...(deviceId ? { deviceId } : {}),
  };
}

function buildOperatorVerificationArtifactPaths(value: JsonInput | undefined): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
    : [];
}

function buildOperatorVerificationEvidenceRows(
  value: JsonInput | undefined,
): OperatorVerificationEvidence[] {
  return Array.isArray(value)
    ? value
        .map((entry): OperatorVerificationEvidence | null => parseEvidenceRow(entry))
        .filter((row): row is OperatorVerificationEvidence => row !== null)
    : [];
}

function parseEvidenceRow(value: JsonInput | undefined): OperatorVerificationEvidence | null {
  if (!isJsonRecord(value)) {
    return null;
  }
  const kind = asTrimmedString(value.kind);
  const status = asTrimmedString(value.status);
  const summary = asTrimmedString(value.summary);
  const detailValue = asTrimmedString(value.value);
  const artifactPath = asTrimmedString(value.artifactPath);
  const metadata = asMetadataRecord(value.metadata);
  if (
    !(
      kind &&
      status &&
      summary &&
      VALID_EVIDENCE_KINDS.has(kind) &&
      VALID_EVIDENCE_STATUSES.has(status)
    )
  ) {
    return null;
  }
  return {
    kind: kind as OperatorVerificationEvidence["kind"],
    status: status as OperatorVerificationEvidence["status"],
    summary,
    ...(detailValue ? { value: detailValue } : {}),
    ...(artifactPath ? { artifactPath } : {}),
    ...(metadata ? { metadata } : {}),
  };
}

/** Parse and validate a JSON-like payload as a canonical operator verification report. */
export function parseOperatorVerificationReport(
  value: JsonInput | undefined,
): OperatorVerificationReport | null {
  const record = readRequiredRecord(value);
  if (!record) {
    return null;
  }

  const schemaVersion = readOptionalTrimmedString(record.schemaVersion);
  const correlationId = readOptionalTrimmedString(record.correlationId);
  const platform = readOptionalTrimmedString(record.platform);
  const scenario = readOptionalTrimmedString(record.scenario);
  const triggerSource = readOptionalTrimmedString(record.triggerSource);
  const terminalState = readOptionalTrimmedString(record.terminalState);
  const startedAt = asIsoTimestamp(record.startedAt);
  const completedAt = asIsoTimestamp(record.completedAt);
  const runtime = readRequiredRecord(record.runtime);
  const request = readRequiredRecord(record.request);
  const reply = readRequiredRecord(record.reply);

  if (
    schemaVersion !== OPERATOR_VERIFICATION_REPORT_SCHEMA_VERSION ||
    !correlationId ||
    !isValidMember<OperatorVerificationPlatform>(platform, VALID_PLATFORMS) ||
    !isValidMember<OperatorVerificationScenario>(scenario, VALID_SCENARIOS) ||
    !isValidMember<OperatorVerificationTriggerSource>(triggerSource, VALID_TRIGGER_SOURCES) ||
    !isValidMember<OperatorVerificationTerminalState>(terminalState, VALID_TERMINAL_STATES) ||
    !startedAt ||
    !completedAt ||
    !runtime ||
    !request ||
    !reply
  ) {
    return null;
  }

  const parsedRuntime = buildOperatorVerificationRuntime(runtime);
  const parsedRequest = buildOperatorVerificationRequest(request);
  const parsedReply = buildOperatorVerificationReply(reply);
  if (!(parsedRuntime && parsedRequest && parsedReply)) {
    return null;
  }

  const targetIds = readRequiredRecord(record.targetIds);
  const artifactPaths = buildOperatorVerificationArtifactPaths(record.artifactPaths);
  const evidence = buildOperatorVerificationEvidenceRows(record.evidence);

  return {
    schemaVersion: OPERATOR_VERIFICATION_REPORT_SCHEMA_VERSION,
    correlationId,
    platform,
    scenario,
    runtime: parsedRuntime,
    triggerSource,
    request: parsedRequest,
    terminalState,
    reply: parsedReply,
    evidence,
    ...(targetIds ? { targetIds: buildOperatorVerificationTargetIds(targetIds) } : {}),
    ...(artifactPaths.length > 0 ? { artifactPaths } : {}),
    startedAt,
    completedAt,
  };
}
