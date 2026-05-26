/** Supported FlowV1 schema version. */
export const FLOW_VERSION = "1.0" as const;

/** Selector target for Maestro-style UI automation commands. */
export interface CommandTarget {
  /** Android resource identifier selector. */
  resourceId?: string;
  /** Visible text selector (exact match). */
  text?: string;
  /** Accessibility description selector (exact match). */
  contentDescription?: string;
  /** Partial text match: element text contains this substring. */
  textContains?: string;
  /** Partial text match: element text starts with this prefix. */
  textStartsWith?: string;
  /** Partial content-description match: element contentDescription contains this substring. */
  contentDescriptionContains?: string;
  /** Horizontal coordinate on screen. */
  x?: number;
  /** Vertical coordinate on screen. */
  y?: number;
}

/** Window focus target for desktop automation surfaces. */
export interface WindowTarget {
  /** Optional application identifier/bundle id. */
  appId?: string;
  /** Optional human-readable title. */
  title?: string;
}

/** Cardinal directions supported by movement commands. */
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

/** Canonical flow commands supported by the platform. */
export type FlowCommand =
  | { type: "launchApp" }
  | { type: "tapOn"; target: CommandTarget }
  | { type: "inputText"; value: string }
  | { type: "assertVisible"; target: CommandTarget }
  | { type: "assertNotVisible"; target: CommandTarget }
  | { type: "assertText"; target: CommandTarget; value: string }
  | { type: "selectOption"; target: CommandTarget; option: string }
  | { type: "scroll"; direction: Direction; steps?: number }
  | { type: "swipe"; direction: Direction; distanceFraction?: number }
  | { type: "screenshot" }
  | { type: "readVisibleState" }
  | { type: "clipboardRead" }
  | { type: "clipboardWrite"; value: string }
  | { type: "windowFocus"; target: WindowTarget }
  | { type: "hideKeyboard" }
  | { type: "waitForAnimation"; timeoutMs?: number };

/** Canonical FlowV1 payload after normalization. */
export interface FlowV1 {
  /** Contract version. */
  version: typeof FLOW_VERSION;
  /** Target app identifier used by Maestro automation runtime. */
  appId: string;
  /** Ordered list of normalized flow steps. */
  steps: FlowCommand[];
}

/** Supported flow execution targets. */
export type FlowRunTarget = "android" | "ios" | "osx" | "windows" | "linux";

/** Canonical FlowExecutionState for cross-platform alignment.
 * Wire format: kebab-case (e.g., "error-retryable")
 * KMP: UPPER_SNAKE_CASE enum names with @SerialName kebab-case
 * iOS: camelCase enum cases with explicit raw values in kebab-case
 * TypeScript: kebab-case string literals
 */

/** Canonical step-level execution report for cross-platform telemetry. */
export interface FlowStepReport {
  /** Zero-based step index. */
  index: number;
  /** camelCase command type name (e.g., "tapOn", "inputText"). */
  commandType: string;
  /** Step execution status. */
  status: "success" | "failed" | "skipped" | "unsupported";
  /** Duration in milliseconds. */
  durationMs: number;
  /** Human-readable message. */
  message?: string;
  /** ISO 8601 start timestamp. */
  startedAt?: string;
  /** ISO 8601 end timestamp. */
  endedAt?: string;
}

/** Canonical driver execution report for cross-platform telemetry. */
export interface FlowDriverReport {
  /** Total steps in the flow. */
  totalSteps: number;
  /** Number of successfully completed steps. */
  completedSteps: number;
  /** Overall execution state. */
  state: ControlPlaneState;
  /** Human-readable summary. */
  message: string;
  /** Per-step reports. */
  steps: FlowStepReport[];
  /** Correlation ID for tracing. */
  correlationId: string;
}

/** Runtime state for control-plane capabilities that drive UI envelope rendering.
 *
 * Values aligned with KMP `FlowExecutionState` and iOS `FlowExecutionState`:
 *   KMP SCREAMING_SNAKE → TS kebab-case mapping:
 *     ERROR_RETRYABLE     → "error-retryable"
 *     ERROR_NON_RETRYABLE → "error-non-retryable"
 */
export type ControlPlaneState =
  | "idle"
  | "loading"
  | "success"
  | "empty"
  | "error-retryable"
  | "error-non-retryable"
  | "unauthorized";

/** Runtime state for flow execution envelopes. */
export type FlowRunState = "success" | "error-retryable" | "error-non-retryable";

/** Per-run execution policy for flow commands. */
export interface FlowRunPolicy {
  /** Maximum attempts per command, including the first try. */
  maxAttempts: number;
  /** Timeout in milliseconds for each command execution call. */
  commandTimeoutMs: number;
  /** Initial delay in milliseconds before retrying retryable command failures. */
  retryDelayMs: number;
}

/** Command execution state for individual command results. */
export type FlowCommandExecutionState = "success" | "error" | "unsupported";

/** Attempt-level trace emitted during command execution. */
export interface FlowRunAttempt {
  /** Zero-based command index in the parsed flow. */
  commandIndex: number;
  /** One-based attempt number for the command. */
  attempt: number;
  /** Command execution state for this attempt. */
  state: FlowCommandExecutionState;
  /** Human-readable attempt summary. */
  message: string;
  /** Wall-clock start timestamp for this attempt (ISO 8601). */
  startedAt: string;
  /** Wall-clock end timestamp for this attempt (ISO 8601). */
  endedAt: string;
  /** Attempt duration in milliseconds. */
  durationMs: number;
  /** Optional structured error detail for failed attempts. */
  error?: FlowCapabilityError;
}

/** Command-level execution telemetry used by automation action auditing. */
export interface FlowRunAction {
  /** Zero-based command index in the parsed flow. */
  commandIndex: number;
  /** Command type executed by the flow step. */
  commandType: FlowCommand["type"];
  /** Execution surface used for this command. */
  target: FlowRunTarget;
  /** Ordered attempt traces for this command. */
  attempts: FlowRunAttempt[];
}

/** Supported model source for local model ingestion. */
export type ModelSource = string;

/** Validation mode used to normalize model references per source policy. */
export type ModelRefValidationMode = "huggingface" | "opaque";

/** Source-specific model reference validation policy. */
export interface ModelRefValidationPolicy {
  /** Validation mode used by model reference parsing. */
  mode: ModelRefValidationMode;
  /** Canonical host used by host-validated sources (for example huggingface.co). */
  canonicalHost?: string;
}

/** Supported surface names for runtime capability errors. */
export type FlowCapabilitySurface =
  | "flow"
  | "model_pull"
  | "app_build"
  | "chat"
  | "flow_validate"
  | "flow_automation"
  | "flow_capabilities";

/** Job lifecycle state for async model/build workflows. */
export type CapabilityJobState =
  | "queued"
  | "running"
  | "paused"
  | "succeeded"
  | "failed"
  | "cancelled";

/** Supported app build platforms. */
export type BuildKind = "android" | "ios" | "desktop";

/** Supported app build variant types. */
export type BuildType = "debug" | "release";

/** Variant input mode exposed by app-build capability metadata. */
export type AppBuildVariantControl = "none" | "select";

/** Supported build type constants for deterministic validation across tooling and UI. */
export const SUPPORTED_BUILD_TYPES = ["debug", "release"] as const satisfies readonly BuildType[];

/** Stable app-build failure codes surfaced by orchestration, API envelopes, and SSR dashboards. */
export const APP_BUILD_FAILURE_CODES = [
  "app_build_unsupported_platform",
  "app_build_unsupported_build_type",
  "app_build_android_java_missing",
  "app_build_desktop_bun_missing",
  "app_build_desktop_variant_unsupported",
  "app_build_ios_mac_only",
  "app_build_ios_tooling_missing",
  "app_build_ios_scheme_missing",
  "app_build_ios_scheme_not_found",
  "app_build_output_dir_invalid",
  "app_build_script_missing",
  "app_build_execution_failed",
  "ios_platform_support_missing",
  "ios_required_destination_missing",
  "ios_showdestinations_failed",
] as const;

/** Machine-readable app-build failure codes carried across CLI, reports, and UI state. */
export type AppBuildFailureCode = (typeof APP_BUILD_FAILURE_CODES)[number];

/** Runtime guard for app-build failure codes emitted by typed build orchestration. */
export function isAppBuildFailureCode(value: string): value is AppBuildFailureCode {
  return (APP_BUILD_FAILURE_CODES as readonly string[]).includes(value);
}

/** Supported desktop build target variants. */
export type DesktopBuildVariant =
  | "linux-x64"
  | "linux-arm64"
  | "darwin-arm64"
  | "darwin-x64"
  | "windows-x64";

/** Canonical request shape for `/api/flows/run` and `/api/flows/trigger`. */
export interface FlowRunRequest {
  /** Flow YAML payload submitted by the user or UI. */
  yaml: string;
  /** Target execution surface for flow runtime. */
  target?: FlowRunTarget;
  /** Maximum attempts per command; defaults to configured policy. */
  maxAttempts?: number;
  /** Timeout in milliseconds per command execution; defaults to configured policy. */
  commandTimeoutMs?: number;
  /** Delay in milliseconds between retry attempts; defaults to configured policy. */
  retryDelayMs?: number;
  /** Optional external correlation id for observability. */
  correlationId?: string;
}

/** Request payload for creating flow run jobs. */
export interface FlowRunJobRequest extends FlowRunRequest {}

/** Per-run command replay request payload. */
export interface FlowReplayStepRequest {
  /** 0-based step index to replay. */
  commandIndex: number;
}

/** Flow run event/log row emitted by runtime and surfaced via SSE/poll. */
export interface FlowRunLogEvent {
  /** Stable event id for cursor replay. */
  id: string;
  /** Log level or event type. */
  level: "debug" | "info" | "warn" | "error";
  /** Event timestamp in ISO8601. */
  timestamp: string;
  /** Human-readable event content. */
  message: string;
  /** Optional command index attribution. */
  commandIndex?: number;
}

/** Artifact metadata for flow/build outputs with integrity fields. */
export interface ArtifactMetadata {
  /** Output artifact path. */
  artifactPath: string;
  /** SHA-256 checksum as lowercase hex. */
  sha256: string;
  /** File size in bytes. */
  sizeBytes: number;
  /** Artifact creation timestamp in ISO8601. */
  createdAt: string;
  /** MIME type when known. */
  contentType: string;
  /** Optional release signature or detached signature path. */
  signature?: string;
  /** Correlation id for traceability. */
  correlationId: string;
}

/** Canonical parser validation error for strict parser failures. */
export interface FlowParseFailure {
  /** Canonical command index where parsing failed. */
  commandIndex: number;
  /** Command name encountered while parsing. */
  command: string;
  /** Human-readable parse reason. */
  reason: string;
  /** Parsing failures are not retryable without user change. */
  retryable: false;
}

/** Canonical error payload for runtime-capability failures. */
export type FlowRuntimeError = FlowCapabilityError | FlowParseFailure;

/** Generic API envelope for control-plane and tooling contracts. */
export interface ApiEnvelope<TData = object, TError = object> {
  /** Endpoint path that emitted this payload. */
  route: string;
  /** State driving deterministic UI transitions. */
  state: ControlPlaneState;
  /** Success payload when state is not an error state. */
  data?: TData;
  /** Error payload when state is an error state. */
  error?: TError;
  /** Matched/requested preference diff metadata. */
  mismatches?: string[];
}

/** Result payload for flow run job polling endpoints. */
export interface FlowRunJobResult {
  /** Stable run id. */
  runId: string;
  /** Lifecycle status. */
  status: CapabilityJobState;
  /** Correlation id for cross-system logs. */
  correlationId: string;
  /** Optional resolved run result. */
  result?: FlowRunResult;
  /** Bounded stdout summary for job-level diagnostics. */
  stdout: string;
  /** Bounded stderr summary for job-level diagnostics. */
  stderr: string;
  /** Job elapsed time in milliseconds. */
  elapsedMs: number;
  /** Optional terminal reason for cancelled/failed jobs. */
  reason?: string;
}

/** Response envelope for flow run job APIs. */
export interface FlowRunJobEnvelope extends ApiEnvelope<FlowRunJobResult, FlowRuntimeError> {
  /** Runtime route handling flow run jobs. */
  route: "/api/flows/runs";
  /** Stable run identifier. */
  runId: string;
}

/** Normalized representation of a model reference. */
export interface ModelReference {
  /** Normalized model ref, for example `huggingface.co/zai-org/AutoGLM-Phone-9B-Multilingual`. */
  normalized: string;
  /** Supported model provider namespace. */
  source: ModelSource;
}

/** Model pull API request. */
export interface ModelPullRequest {
  /** Target model reference to fetch. */
  modelRef?: string;
  /** Source provider namespace. If omitted, resolves to the control-plane registry default. */
  source?: ModelSource;
  /** Optional platform hint for future behavior differentiation. */
  platform?: string;
  /** Force re-download on repeated pull requests. */
  force?: boolean;
  /** Per-job timeout override, in milliseconds. */
  timeoutMs?: number;
  /** Optional external correlation id for observability. */
  correlationId?: string;
}

/** Result row returned while a model pull job is running or complete. */
export interface ModelPullResult {
  /** User-requested model reference. */
  requestedModelRef: string;
  /** Normalized model reference used by ramalama. */
  normalizedModelRef: string;
  /** Final job status. */
  status: CapabilityJobState;
  /** Shell exit code on completion, if available. */
  exitCode: number | null;
  /** Bounded command stdout summary. */
  stdout: string;
  /** Bounded command stderr summary. */
  stderr: string;
  /** Output artifact or cache path, if any. */
  artifactPath: string | null;
  /** Artifact metadata when available. */
  artifact?: ArtifactMetadata;
  /** Time between job creation and latest status change. */
  elapsedMs: number;
  /** Source platform hint from request. */
  platform?: string;
}

/** Response envelope for model pull requests and polling. */
export interface ModelPullEnvelope extends ApiEnvelope<ModelPullResult, FlowCapabilityError> {
  /** Runtime path handling model-pull jobs. */
  route: "/api/models/pull";
  /** Stable job identifier used by polling. */
  jobId: string;
  /** Runtime command surface. */
  surface?: "model_pull";
}

/** Registry descriptor for one model source in the control-plane. */
export interface ModelSourceDescriptor {
  /** Canonical source identifier. */
  id: ModelSource;
  /** Human-readable source label. */
  displayName: string;
  /** Optional source description for clients. */
  description?: string;
  /** Placeholder for model reference entry fields. */
  modelRefPlaceholder: string;
  /** Optional model reference hint. */
  modelRefHint?: string;
  /** Validation mode applied to model refs for this source. */
  modelRefValidation: ModelRefValidationMode;
  /** Canonical host for host-validated source formats. */
  canonicalHost?: string;
  /** Optional ramalama transport prefix for source pulls. */
  ramalamaTransportPrefix?: string;
  /** Optional alias values accepted as this source. */
  aliases: readonly string[];
  /** Whether this source enforces RAMALAMA allow-list checks. */
  enforceAllowlist: boolean;
}

/** Model source registry payload returned by `/api/models/sources`. */
export interface ModelSourceRegistryResult {
  /** Default source id used when requests omit a source. */
  defaultSource: ModelSource;
  /** Source descriptors available for model pull operations. */
  sources: readonly ModelSourceDescriptor[];
}

/** Response envelope for `/api/models/sources`. */
export interface ModelSourceRegistryEnvelope
  extends ApiEnvelope<ModelSourceRegistryResult, FlowCapabilityError> {
  /** Runtime route serving source registry payload. */
  route: "/api/models/sources";
}

/** Single model result from a HuggingFace Hub search. */
export interface HfModelSearchHit {
  /** Repository ID, e.g. "meta-llama/Llama-3-8B". */
  id: string;
  /** Total download count. */
  downloads: number;
  /** Total like count. */
  likes: number;
  /** Primary pipeline tag, e.g. "text-generation". */
  pipelineTag?: string;
  /** ISO-8601 last-modified timestamp. */
  lastModified?: string;
  /** Associated tags. */
  tags?: readonly string[];
}

/** Search result payload for `/api/models/search`. */
export interface ModelSearchResult {
  /** Original search query. */
  query: string;
  /** Number of results returned. */
  totalResults: number;
  /** Matched model descriptors. */
  models: readonly HfModelSearchHit[];
}

/** Response envelope for `/api/models/search`. */
export interface ModelSearchEnvelope extends ApiEnvelope<ModelSearchResult, FlowCapabilityError> {
  /** Runtime route serving model search results. */
  route: "/api/models/search";
}

/** App build request for Android/iOS/Desktop generation. */
export interface AppBuildRequest {
  /** Target platform. */
  platform: BuildKind;
  /** Build variation (defaults to `debug`). */
  buildType?: BuildType;
  /** Build variant for tooling (future extension). */
  variant?: string;
  /** Disable tests to reduce build time. */
  skipTests?: boolean;
  /** Custom artifact output directory override. */
  outputDir?: string;
  /** Clean workspace before build. */
  clean?: boolean;
  /** Optional external correlation id for observability. */
  correlationId?: string;
}

/** Build job result returned by poll and initial submission responses. */
export interface AppBuildResult {
  /** Requested platform. */
  platform: BuildKind;
  /** Requested build type. */
  buildType: BuildType;
  /** Optional variant requested by caller. */
  variant?: string;
  /** Final job status. */
  status: CapabilityJobState;
  /** Shell exit code on completion, if available. */
  exitCode: number | null;
  /** Bounded command stdout summary. */
  stdout: string;
  /** Bounded command stderr summary. */
  stderr: string;
  /** Resolved artifact path. */
  artifactPath: string | null;
  /** Optional typed build failure code when the build terminated with a structured error. */
  failureCode?: AppBuildFailureCode;
  /** Optional typed build failure message emitted by the canonical build owner. */
  failureMessage?: string;
  /** Artifact metadata when available. */
  artifact?: ArtifactMetadata;
  /** Total elapsed duration in ms. */
  elapsedMs: number;
}

/** Response envelope for build requests and polling. */
export interface AppBuildEnvelope extends ApiEnvelope<AppBuildResult, FlowCapabilityError> {
  /** Runtime path handling app-build jobs. */
  route: "/api/apps/build";
  /** Stable job identifier used by polling. */
  jobId: string;
  /** Runtime command surface. */
  surface?: "app_build";
}

/** Capability metadata for a single app-build platform. */
export interface AppBuildPlatformCapabilities {
  /** Target build platform. */
  platform: BuildKind;
  /** Build types supported for this platform. */
  buildTypes: readonly BuildType[];
  /** Named variants exposed by the native build owner. */
  variants: readonly string[];
  /** Default variant preselected by the operator shell, when available. */
  defaultVariant: string | null;
  /** UI control mode for variant entry. */
  variantControl: AppBuildVariantControl;
}

/** Aggregate app-build capabilities surfaced to operator clients. */
export interface AppBuildCapabilities {
  /** Per-platform app-build capability metadata keyed by build platform. */
  platforms: Record<BuildKind, AppBuildPlatformCapabilities>;
}

/** Request model for `/api/prefs`. */
export interface PreferenceUpdateRequest {
  /** Preferred app theme from dashboard selection. */
  theme: string | null;
  /** Preferred model from dashboard selection. */
  defaultModel: string | null;
}

/** Canonical preference persistence request body used by `/api/prefs`. */
export interface PreferenceRunRequest {
  theme: string | null;
  defaultModel: string | null;
}

/** Error detail returned for unsupported or failing execution paths. */
export interface FlowCapabilityError {
  /** Index of command in the sequence. */
  commandIndex: number;
  /** Stable machine-readable error code. */
  code: string;
  /** Error category for deterministic policy mapping. */
  category: FlowErrorCategory;
  /** Command that failed. */
  command: string;
  /** Optional canonical command type alias for command results. */
  commandType?: FlowCommand["type"];
  /** Human-readable reason string. */
  reason: string;
  /** Whether retry may succeed without user input change. */
  retryable: boolean;
  /** Correlation id used for logs and run/build event grouping. */
  correlationId: string;
  /** Optional capability surface where failure was raised. */
  surface?: FlowCapabilitySurface;
  /** Optional resource or command key for failure attribution. */
  resource?: string;
}

/** Error categories used by retry policy taxonomy. */
export type FlowErrorCategory =
  | "validation"
  | "dependency"
  | "connectivity"
  | "authorization"
  | "timeout"
  | "runtime"
  | "unsupported"
  | "internal";

/** Command-level execution result used by flow runtime. */
export interface FlowCommandResult {
  /** Index of command in the flow sequence. */
  commandIndex: number;
  /** Command type executed or rejected. */
  commandType: FlowCommand["type"];
  /** Command execution state. */
  state: FlowCommandExecutionState;
  /** Command execution summary message. */
  message: string;
  /** Error detail for failure cases. */
  error?: FlowCapabilityError;
  /** Optional artifact path produced by the command (for example screenshot output). */
  artifactPath?: string | null;
  /** Artifact metadata when produced by command execution. */
  artifact?: ArtifactMetadata;
  /** Number of attempts used to execute the command. */
  attempts?: number;
}

/** Flow command execution result envelope. */
export interface FlowRunResult {
  /** App package identifier. */
  appId: string;
  /** Flow command count. */
  commandCount: number;
  /** Execution surface selected for this flow run. */
  target?: FlowRunTarget;
  /** Effective execution policy used for this run. */
  policy?: FlowRunPolicy;
  /** Per-command action telemetry produced by execution hooks. */
  actions?: FlowRunAction[];
  /** Command-level artifacts. */
  results: FlowCommandResult[];
  /** Overall execution state. */
  state: FlowRunState;
  /** Optional elapsed time in milliseconds. */
  durationMs: number;
}

/** Publicly documented flow command metadata used for parity checks. */
export interface FlowCommandSpec {
  /** Canonical command type. */
  type: FlowCommand["type"];
  /** Human-readable short description for docs and audits. */
  description: string;
}
