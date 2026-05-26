import type {
  ApiEnvelope,
  AppBuildFailureCode,
  BuildKind,
  CapabilityJobState,
  FlowCommand,
  FlowRunResult,
  FlowRunTarget,
  FlowRuntimeError,
} from "./flow-contracts-1";

/** Chat request result surfaced by `/api/ai/chat` for deterministic tests and UX state. */
export interface ChatAudioPayload {
  /** MIME type of the speech payload. */
  mimeType: string;
  /** Base64-encoded PCM/encoded audio bytes. */
  data: string;
}

/** Speech text extracted from STT input when chat requests include `speechInput`. */
export interface ChatSpeechResolution {
  /** Transcript of input speech provided by STT, if available. */
  transcript: string;
  /** Optional detected language from STT provider metadata. */
  language?: string;
}

/** Text or speech content returned by chat completion responses. */
export interface ChatSpeechReply {
  /** MIME type requested by server (defaults to MP3 in OpenAI-compatible responses). */
  mimeType: string;
  /** Base64 audio payload returned for speech output. */
  data: string;
}

/** Canonical list of supported OpenAI-style chat TTS output formats. */
export const CHAT_TTS_OUTPUT_MIME_TYPES = ["mp3", "opus", "aac", "flac", "wav", "pcm"] as const;

/** Default chat TTS output format used when request is enabled but no override is provided. */
export const CHAT_TTS_DEFAULT_OUTPUT_MIME_TYPE: ChatTtsOutputMimeType = "mp3";

/** Supported output format type for `/api/ai/chat` text-to-speech requests. */
export type ChatTtsOutputMimeType = (typeof CHAT_TTS_OUTPUT_MIME_TYPES)[number];

/** Runtime guard for chat TTS output format values. */
export function isChatTtsOutputMimeType(value: string): value is ChatTtsOutputMimeType {
  return CHAT_TTS_OUTPUT_MIME_TYPES.includes(value as ChatTtsOutputMimeType);
}

/** Canonical request payload consumed by `/api/ai/chat` for text/audio input and optional TTS output. */
export interface ChatRequest {
  /** Provider identifier for the cloud completion endpoint. */
  provider: string;
  /** Model identifier selected for the chat request. */
  model?: string;
  /** Input text message for chat completion. */
  message?: string;
  /** Optional provider API key for direct provider calls. */
  apiKey?: string;
  /** Optional provider base URL override. */
  baseUrl?: string;
  /** Optional STT audio payload; set `message` to empty when using only speech input. */
  speechInput?: ChatAudioPayload;
  /** Request server-side text-to-speech output for the assistant reply. */
  requestTts?: boolean;
  /** Optional speech output MIME type override. */
  ttsOutputMimeType?: ChatTtsOutputMimeType;
  /** Optional TTS voice request for providers that support voice selection. */
  ttsVoice?: string;
}

export interface ChatResolution {
  /** Provider used for request completion. */
  provider: string;
  /** Model requested by the user. */
  requestedModel: string | null;
  /** Model resolved after policy and preferences. */
  effectiveModel: string;
  /** Final assistant response when available. */
  reply: string;
  /** STT transcript when `speechInput` was provided. */
  speech?: ChatSpeechResolution;
  /** Text-to-speech audio data for the assistant response. */
  tts?: ChatSpeechReply;
}

/** Supported workflow modes for local-first creative assistant tasks. */
export const AI_WORKFLOW_MODES = [
  "chat",
  "typography",
  "presentation",
  "social",
  "image",
  "flow_generation",
  "agent",
] as const;

export type AiWorkflowMode = (typeof AI_WORKFLOW_MODES)[number];

/** Canonical image size presets supported by workflow image generation. */
export const AI_WORKFLOW_IMAGE_SIZES = ["1024x1024", "1024x1536", "1536x1024"] as const;

/** Allowed aspect-ratio/size presets for image generation requests. */
export type AiWorkflowImageSize = (typeof AI_WORKFLOW_IMAGE_SIZES)[number];

/** Optional text generation tuning for workflow modes. */
export interface AiWorkflowTextOptions {
  /** Human/audience target (for example: "design team", "B2C founders"). */
  audience?: string;
  /** Style/tone instructions (for example: "minimal", "executive"). */
  tone?: string;
  /** Output format target (for example: "bullet list", "thread", "slide outline"). */
  format?: string;
  /** Additional constraints applied to generation. */
  constraints?: string;
}

/** Optional image-generation tuning values. */
export interface AiWorkflowImageOptions {
  /** Resolution preset for generated images. */
  size?: AiWorkflowImageSize;
  /** Optional random seed for reproducible output. */
  seed?: number;
  /** Optional generation step count when the backend supports it. */
  steps?: number;
  /** Optional stylistic preset or adapter-specific style label. */
  stylePreset?: string;
}

/** Canonical request payload for `/api/ai/workflows/run`. */
export interface AiWorkflowRequest {
  /** Workflow execution mode. */
  mode: AiWorkflowMode;
  /** Provider identifier override for workflow execution. */
  provider?: string;
  /** Model identifier selected by operator. */
  model?: string;
  /** Primary user prompt/instruction. */
  message: string;
  /** Optional provider credential override. */
  apiKey?: string;
  /** Optional provider base URL override. */
  baseUrl?: string;
  /** Optional external correlation id for observability. */
  correlationId?: string;
  /** Optional conversation id for multi-turn chat persistence. */
  conversationId?: string;
  /** Optional text-workflow tuning settings. */
  textOptions?: AiWorkflowTextOptions;
  /** Optional image workflow tuning settings. */
  imageOptions?: AiWorkflowImageOptions;
  /** Optional STT audio payload; when set the transcript replaces message. */
  speechInput?: ChatAudioPayload;
  /** Optional image inputs for vision models (base64 per image). */
  imageInput?: Array<{ mimeType: string; data: string }>;
  /** Request server-side TTS for the assistant reply. */
  requestTts?: boolean;
  /** TTS output format override. */
  ttsOutputMimeType?: ChatTtsOutputMimeType;
  /** TTS voice identifier. */
  ttsVoice?: string;
  /** Target app identifier for agent mode RPA execution. */
  agentAppId?: string;
  /** Target platform for agent mode (android, ios, osx, windows, linux). */
  agentTarget?: string;
}

/** Persisted artifact metadata for AI workflow outputs. */
export interface AiArtifactRecord {
  /** Stable artifact id. */
  id: string;
  /** Owning job id. */
  jobId: string;
  /** Workflow mode that produced this artifact. */
  mode: AiWorkflowMode;
  /** Execution provider path (`local:ollama`, `remote:huggingface`, etc). */
  providerPath: string;
  /** Sanitized prompt summary persisted for auditability. */
  promptSummary: string;
  /** Absolute output path for the artifact file. */
  artifactPath: string;
  /** MIME type of the stored artifact. */
  mimeType: string;
  /** SHA-256 checksum in lowercase hex. */
  sha256: string;
  /** Artifact size in bytes. */
  sizeBytes: number;
  /** Artifact creation timestamp in ISO8601. */
  createdAt: string;
  /** Correlation id attached to this output. */
  correlationId: string;
}

/** Workflow execution result payload for creative assistant tasks. */
export interface AiWorkflowResult {
  /** Executed mode. */
  mode: AiWorkflowMode;
  /** User-requested provider identifier (if any). */
  requestedProvider: string | null;
  /** Provider path that produced the final result. */
  providerPath: string;
  /** User-requested model identifier (if any). */
  requestedModel: string | null;
  /** Model actually used for completion/generation. */
  effectiveModel: string;
  /** Final textual output (or caption/summary for image mode). */
  reply: string;
  /** Optional persisted artifact for generated outputs. */
  artifact?: AiArtifactRecord;
  /** Optional mode-specific notes and fallback details. */
  details?: string[];
  /** Conversation id for multi-turn chat persistence. */
  conversationId?: string;
  /** Extracted YAML from flow_generation mode responses. */
  extractedYaml?: string;
  /** TTS audio reply when requestTts was set. */
  ttsReply?: ChatSpeechReply;
}

/** Capability row for a single creative workflow mode. */
export interface AiWorkflowCapability {
  /** Capability mode identifier. */
  mode: AiWorkflowMode;
  /** Whether local execution path is currently available. */
  localAvailable: boolean;
  /** Whether remote fallback path is currently available. */
  remoteAvailable: boolean;
  /** Optional reason when the mode is currently unavailable. */
  reason?: string;
}

/** Capability matrix payload for `/api/ai/workflows/capabilities`. */
export interface AiWorkflowCapabilityResult {
  /** Ordered per-mode capability rows. */
  modes: AiWorkflowCapability[];
}

/** Response envelope for creative workflow capability checks. */
export interface AiWorkflowCapabilityEnvelope
  extends ApiEnvelope<AiWorkflowCapabilityResult, FlowRuntimeError> {
  /** Runtime path handling workflow capability checks. */
  route: "/api/ai/workflows/capabilities";
}

/** Pollable workflow job payload returned by `/api/ai/workflows/jobs/:jobId`. */
export interface AiWorkflowJobResult {
  /** Stable workflow job id. */
  jobId: string;
  /** Lifecycle state for the workflow job. */
  status: CapabilityJobState;
  /** Correlation id used across logs and artifacts. */
  correlationId: string;
  /** Optional resolved workflow result after completion. */
  result?: AiWorkflowResult;
  /** Bounded stdout summary for diagnostics. */
  stdout: string;
  /** Bounded stderr summary for diagnostics. */
  stderr: string;
  /** Elapsed wall-clock time in milliseconds. */
  elapsedMs: number;
  /** Optional terminal reason for failed/cancelled states. */
  reason?: string;
}

/** Response envelope for workflow execution job APIs. */
export interface AiWorkflowJobEnvelope extends ApiEnvelope<AiWorkflowJobResult, FlowRuntimeError> {
  /** Runtime path handling workflow job APIs. */
  route: "/api/ai/workflows/jobs";
  /** Stable workflow job identifier. */
  jobId: string;
}

/** Conversation orchestration: metadata, runtime binding, messages, execution events. */
export interface ConversationOrchestration {
  /** Stable conversation id. */
  id: string;
  /** Human-readable title. */
  title?: string;
  /** Active runtime/model binding for this conversation. */
  activeRuntime?: RuntimeBinding;
  /** Ordered messages in the thread. */
  messages: ConversationMessage[];
  /** Execution events (runs) attached to this conversation. */
  executionEvents: ExecutionEvent[];
  /** Pending approval requests. */
  approvalRequests?: ApprovalRequest[];
  /** Voice input/output payload references. */
  voicePayloads?: VoicePayloadRef[];
  /** Artifacts and result summaries. */
  artifacts?: ArtifactSummary[];
}

/** Summary row used by conversation history selectors across operator surfaces. */
export interface ConversationThreadSummary {
  /** Stable conversation id. */
  id: string;
  /** Human-readable title. */
  title?: string;
  /** Active runtime/model binding for this conversation, when known. */
  activeRuntime?: RuntimeBinding;
  /** Last update timestamp ISO8601. */
  updatedAt?: string;
}

/** Conversation history page used by operator thread pickers. */
export interface ConversationThreadIndex {
  /** Ordered conversation summaries. */
  conversations: ConversationThreadSummary[];
  /** Total number of persisted conversations. */
  total: number;
}

/** Runtime binding for a conversation or task. */
export interface RuntimeBinding {
  /** Local vs cloud. */
  source: "local" | "cloud";
  /** Provider/source id (e.g. "ollama", "openai"). */
  provider: string;
  /** Model identifier. */
  model: string;
  /** Voice input supported. */
  voiceInput?: boolean;
  /** Voice output (TTS) supported. */
  voiceOutput?: boolean;
  /** RPA/automation supported. */
  automation?: boolean;
}

/** Canonical runtime-capability usage identifiers shared across platforms. */
export type OperatorRuntimeUsage =
  | "chat"
  | "automation"
  | "image"
  | "flow_generation"
  | "speech_input"
  | "speech_output";

/** Single provider+model assignment for one runtime capability. */
export interface OperatorRuntimeAssignment {
  /** Provider identifier (e.g. "openai", "ollama"). */
  provider: string;
  /** Model identifier (e.g. "gpt-4o", "llama3"). */
  model: string;
  /** Source label for UI rendering (e.g. "local", "cloud"). */
  source?: string;
}

/** Per-capability runtime assignments mirroring mobile-side preferences. */
export interface OperatorRuntimeAssignments {
  chat: OperatorRuntimeAssignment;
  automation: OperatorRuntimeAssignment;
  image: OperatorRuntimeAssignment;
  flowGeneration: OperatorRuntimeAssignment;
  speechInput: OperatorRuntimeAssignment;
  speechOutput: OperatorRuntimeAssignment;
}

/** Single message in a conversation thread. */
export interface ConversationMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  /** Optional run id when message is tied to execution. */
  runId?: string;
  /** Timestamp ISO8601. */
  timestamp?: string;
}

/** Execution event in conversation thread (planning, running, completed, etc.). */
export interface ExecutionEvent {
  id: string;
  runId: string;
  state: RunSessionState;
  /** Human-readable summary. */
  summary?: string;
  /** Step stream for progress. */
  steps?: RunStep[];
  /** Timestamp ISO8601. */
  timestamp?: string;
}

/** Run session state for UI state machine. */
export type RunSessionState =
  | "planning"
  | "waiting_approval"
  | "running"
  | "needs_input"
  | "completed"
  | "failed";

/** Single step in a run's progress stream. */
export interface RunStep {
  index: number;
  commandType: string;
  status: "pending" | "running" | "success" | "failed";
  message?: string;
}

/** Approval request from assistant. */
export interface ApprovalRequest {
  id: string;
  runId: string;
  summary: string;
  /** Timestamp ISO8601. */
  requestedAt?: string;
}

/** Voice payload reference. */
export interface VoicePayloadRef {
  type: "input" | "output";
  mimeType: string;
  /** Reference to stored payload. */
  ref: string;
}

/** Artifact summary for conversation. */
export interface ArtifactSummary {
  id: string;
  runId?: string;
  mimeType: string;
  summary?: string;
}

/** Runtime inventory: local runtimes, cloud providers, model capabilities. */
export interface RuntimeInventory {
  /** Local runtimes including Ollama. */
  local: RuntimeDescriptor[];
  /** Cloud providers. */
  cloud: RuntimeDescriptor[];
}

/** Single runtime descriptor. */
export interface RuntimeDescriptor {
  id: string;
  displayName: string;
  /** Local vs cloud. */
  source: "local" | "cloud";
  /** Chat capability. */
  chat: boolean;
  /** RPA/automation capability. */
  automation?: boolean;
  /** Voice input. */
  voiceInput?: boolean;
  /** Voice output (TTS). */
  voiceOutput?: boolean;
  /** Availability: ready, unreachable, auth_required, etc. */
  availability:
    | "ready"
    | "unreachable"
    | "auth_required"
    | "not_installed"
    | "downloading"
    | "verifying"
    | "failed";
  /** Model readiness when applicable. */
  modelReadiness?: ModelReadinessState;
}

/** Model readiness for local models. */
export type ModelReadinessState =
  | "not_installed"
  | "downloading"
  | "verifying"
  | "ready"
  | "in_use"
  | "failed";

/** Run session: automation task attached to conversation. */
export interface RunSession {
  runId: string;
  conversationId: string;
  target?: FlowRunTarget;
  state: RunSessionState;
  steps?: RunStep[];
  outputArtifacts?: ArtifactSummary[];
  retryable?: boolean;
  /** Cancellation and resume rules. */
  cancellationSupported?: boolean;
  resumeSupported?: boolean;
}

/** Parse-only flow validation summary surfaced by `/api/flows/validate`. */
export interface FlowValidationResult {
  /** App package identifier declared in the flow. */
  appId: string;
  /** Number of parsed commands. */
  commandCount: number;
  /** Ordered command types found in YAML. */
  commandTypes: FlowCommand["type"][];
}

/** Response envelope for parse-only flow validation requests. */
export interface FlowValidateEnvelope extends ApiEnvelope<FlowValidationResult, FlowRuntimeError> {
  /** Runtime path handling flow validation. */
  route: "/api/flows/validate";
}

/** Per-step validation details for flow automation readiness checks. */
export interface FlowAutomationValidationStep {
  /** Zero-based index of the step in the parsed flow. */
  index: number;
  /** Parsed command type for this step. */
  commandType: string;
  /** Whether the command is currently supported by this control-plane. */
  supported: boolean;
  /** Optional reason when the command is unsupported or malformed. */
  reason?: string;
}

/** Automation validation result surfaced by `/api/flows/validate/automation`. */
export interface FlowAutomationValidationResult {
  /** Parsed `appId`. */
  appId: string;
  /** Number of parsed commands. */
  commandCount: number;
  /** Count of commands currently supported. */
  supportedCommandCount: number;
  /** Per-step support breakdown for UI inspection. */
  steps: FlowAutomationValidationStep[];
}

/** Response envelope for `/api/flows/validate/automation`. */
export interface FlowAutomationValidateEnvelope
  extends ApiEnvelope<FlowAutomationValidationResult, FlowRuntimeError> {
  /** Runtime path handling automation validation. */
  route: "/api/flows/validate/automation";
}

/** Host/runtime dependency requirement for a target capability matrix. */
export interface FlowCapabilityRequirement {
  /** Stable requirement key. */
  id: string;
  /** Human-readable requirement description. */
  description: string;
  /** Whether this requirement is mandatory. */
  required: boolean;
  /** Whether requirement is currently satisfied. */
  installed: boolean;
}

/** Capability status for a single flow command on a target. */
export interface FlowCommandCapability {
  /** Command type being reported. */
  commandType: FlowCommand["type"];
  /** Whether the target currently supports this command. */
  supported: boolean;
  /** Optional unsupported reason. */
  reason?: string;
}

/** Capability matrix returned for preflight validation and UI gating. */
export interface FlowCapabilityMatrix {
  /** Target runtime reported by the control-plane. */
  target: FlowRunTarget;
  /** Whether target is ready for command execution. */
  ready: boolean;
  /** Command-level support breakdown. */
  commands: FlowCommandCapability[];
  /** Host dependencies used to compute readiness. */
  requirements: FlowCapabilityRequirement[];
}

/** Response envelope for flow target capability checks. */
export interface FlowCapabilityMatrixEnvelope
  extends ApiEnvelope<FlowCapabilityMatrix, FlowRuntimeError> {
  /** Runtime path handling capability checks. */
  route: "/api/flows/capabilities";
}

/** Provider validation row returned by `/api/ai/providers/validate`. */
export interface ProviderValidationItem {
  /** Provider identifier from the static registry. */
  provider: string;
  /** Whether required credentials/config are present. */
  configured: boolean;
  /** Reachability result when connectivity checks are requested. */
  reachable: boolean;
  /** Human-readable summary for UI reporting. */
  message: string;
}

/** Provider validation summary envelope payload. */
export interface ProviderValidationResult {
  /** Number of providers inspected. */
  total: number;
  /** Number of providers with complete required config. */
  configuredCount: number;
  /** Number of providers marked reachable. */
  reachableCount: number;
  /** Row-level details for each provider. */
  providers: ProviderValidationItem[];
}

/** Response envelope for provider validation checks. */
export interface ProviderValidationEnvelope
  extends ApiEnvelope<ProviderValidationResult, FlowRuntimeError> {
  /** Runtime path handling provider validation. */
  route: "/api/ai/providers/validate";
}

/** Response envelope for `/api/flows/run` and `/api/flows/trigger`. */
export interface FlowRunEnvelope extends ApiEnvelope<FlowRunResult, FlowRuntimeError> {
  /** Runtime path handling the flow request. */
  route: "/api/flows/run" | "/api/flows/trigger";
}

/** Stable readiness requirement identifiers surfaced by the device-AI dashboard. */
export type DeviceAiReadinessRequirementCode =
  | "hf_access"
  | "android_adb"
  | "ios_macos_host"
  | "ios_xcrun"
  | "ios_simctl";

/** Deterministic readiness modes used by the device-AI dashboard and verifier. */
export type DeviceAiReadinessStatus = "ready" | "blocked" | "skipped" | "delegated";

/** One readiness requirement row rendered by the device-AI dashboard surface. */
export interface DeviceAiReadinessRequirement {
  /** Stable requirement identifier. */
  code: DeviceAiReadinessRequirementCode;
  /** Whether the requirement is mandatory for the effective profile. */
  required: boolean;
  /** Whether the current host/runtime satisfies the requirement. */
  satisfied: boolean;
}

/** Latest canonical build artifact state referenced by the device-AI readiness surface. */
export interface DeviceAiBuildArtifactState {
  /** Platform identifier. */
  platform: BuildKind;
  /** Latest canonical build status. */
  status: "pass" | "fail" | "delegated" | "pending" | "missing";
  /** Optional artifact path from the latest build matrix report. */
  artifactPath?: string;
  /** Optional typed build failure code from the latest canonical build report. */
  failureCode?: AppBuildFailureCode;
  /** Optional typed build failure message from the latest canonical build report. */
  failureMessage?: string;
}

/** Result payload used by the device-AI readiness dashboard route. */
export interface DeviceAiReadinessResult {
  /** Current readiness mode for the host. */
  status: DeviceAiReadinessStatus;
  /** Normalized host operating system. */
  hostOs: "Darwin" | "Linux" | "Windows_NT";
  /** Whether the full native device protocol is currently active on this host. */
  shouldRun: boolean;
  /** Whether iOS execution has been explicitly delegated away from the local host. */
  delegated: boolean;
  /** Ordered readiness requirements evaluated for the current host/profile. */
  requirements: DeviceAiReadinessRequirement[];
  /** Fast-fail reasons that block the active native device gate. */
  failures: string[];
  /** Latest canonical build artifact summary by platform. */
  buildArtifacts: {
    /** Android build artifact availability. */
    android: DeviceAiBuildArtifactState;
    /** iOS build artifact availability. */
    ios: DeviceAiBuildArtifactState;
  };
}

/** Response envelope for the device-AI readiness dashboard route. */
export interface DeviceAiReadinessEnvelope
  extends ApiEnvelope<DeviceAiReadinessResult, FlowRuntimeError> {
  /** Runtime path handling device-AI readiness rendering. */
  route: "/api/device-ai/readiness";
}

/** Response envelope for preference persistence and preference-to-runtime drift reporting. */
export interface PreferenceRunEnvelope
  extends ApiEnvelope<PreferenceUpdateResult, FlowRuntimeError> {
  /** Runtime path handling preference mutations. */
  route: "/api/prefs";
}

/** Response envelope for chat completion and chat model resolution mismatches. */
export interface ChatRunEnvelope extends ApiEnvelope<ChatResolution, FlowRuntimeError> {
  /** Runtime path handling chat requests. */
  route: "/api/ai/chat";
}

/** Response envelope for local-first creative workflow execution routes. */
export interface AiWorkflowRunEnvelope extends ApiEnvelope<AiWorkflowResult, FlowRuntimeError> {
  /** Runtime path handling workflow run requests. */
  route: "/api/ai/workflows/run";
}

/** Preference update envelope used by `/api/prefs`. */
export interface PreferenceUpdateResult {
  /** Theme as requested by user. */
  requestedTheme: string | null;
  /** Theme that is currently applied at runtime. */
  effectiveTheme: string;
  /** Model requested by user. */
  requestedModel: string | null;
  /** Model currently selected by runtime and provider policy. */
  effectiveModel: string;
  /** Locale as requested by user. */
  requestedLocale: string | null;
  /** Locale currently applied to server-rendered UI. */
  effectiveLocale: string;
}
