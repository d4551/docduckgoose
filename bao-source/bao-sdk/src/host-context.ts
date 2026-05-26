/**
 * Host context contracts for self-contained `.bao` extension modules.
 *
 * Extension modules receive a typed host context at factory invocation instead
 * of importing shared packages directly. This enables `.bao` archives to
 * bundle all their own code while receiving runtime services from the host
 * via dependency injection.
 *
 * Each extension scope has a typed context variant extending
 * {@link BaoHostContextBase}.
 *
 * OpenTelemetry types flow through the canonical Bao-namespaced re-export
 * surface (`@baohaus/otel-api-bao`); impl-path code must not bypass this
 * seam (see workspace root CLAUDE.md governance allowlist).
 *
 * @module @baohaus/bao-sdk/host-context
 */

import type { Context as BaoOtelContextValue } from "@baohaus/otel-api-bao/context";
import type {
  Span as BaoOtelSpanValue,
  Tracer as BaoOtelTracerValue,
} from "@baohaus/otel-api-bao/trace";

// JSON-compatible values + structured-log metadata

/** JSON-compatible value used for free-form node I/O and metadata payloads. */
export type BaoJsonValue =
  | string
  | number
  | boolean
  | null
  | readonly BaoJsonValue[]
  | { readonly [key: string]: BaoJsonValue };

/** Structured-log metadata payload (JSON-compatible). */
export type BaoLogMeta = Readonly<Record<string, BaoJsonValue>>;

/**
 * Redis primitive reply union.
 *
 * Mirrors the subset of RESP reply shapes returned by the Bun-native Redis
 * driver: bulk-string, integer, null, and arrays thereof. Binary payloads
 * (Uint8Array) are not used by the consumers of this SDK surface.
 */
export type BaoRedisReply = string | number | null | readonly BaoRedisReply[];

// Base context — available to ALL extension types

/** Structured logger interface injected by the host. */
export interface BaoHostLogger {
  info(message: string, meta?: BaoLogMeta): void;
  warn(message: string, meta?: BaoLogMeta): void;
  error(message: string, meta?: BaoLogMeta): void;
  debug(message: string, meta?: BaoLogMeta): void;
}

/** Extension descriptor metadata passed to the extension at load time. */
export interface BaoHostExtensionDescriptor {
  extensionId: string;
  moduleId: string;
  targetKind: string;
  targetId: string;
}

/** Base context shared by all `.bao` extension scopes. */
export interface BaoHostContextBase {
  /** Structured logger scoped to this extension. */
  logger: BaoHostLogger;
  /** Extension descriptor metadata. */
  descriptor: BaoHostExtensionDescriptor;
  /** Abort signal for graceful shutdown. */
  signal: AbortSignal;
}

// Auth policy plugin context

/** Auth policy hook context. */
export interface BaoAuthHookContext {
  request?: Request;
}

/** Auth matcher function signature. */
export type BaoAuthMatcher = (context: BaoAuthHookContext) => boolean;

/** Auth before-hook handler signature. */
export type BaoAuthBeforeHandler = (context: BaoAuthHookContext) => Promise<Response | undefined>;

/** Auth before-hook shape. */
export interface BaoAuthBeforeHook {
  matcher: BaoAuthMatcher;
  handler: BaoAuthBeforeHandler;
}

/** Canonical auth policy plugin return shape used by `.bao` runtime loading. */
export interface BaoAuthPolicyPluginShape {
  id: string;
  hooks: {
    before: BaoAuthBeforeHook[];
  };
}

/** Auth policy failure envelope. */
export interface BaoAuthPolicyFailureEnvelope {
  ok: false;
  message: string;
  retryable: boolean;
  phase: string;
  details?: BaoLogMeta;
}

/** Parameters for building a policy failure response. */
export interface BaoAuthPolicyFailureParams {
  status: number;
  message: string;
  phase: string;
  retryable?: boolean;
  details?: BaoLogMeta;
  headers?: Readonly<Record<string, string>>;
}

/** Parameters for building a JSON-RPC error response. */
export interface BaoAuthJsonRpcErrorParams {
  status: number;
  code: number;
  message: string;
}

/** Auth policy utility functions injected by the host. */
export interface BaoAuthPolicyHelpers {
  buildFailureResponse(params: BaoAuthPolicyFailureParams): Response;
  buildJsonRpcErrorResponse(params: BaoAuthJsonRpcErrorParams): Response;
  normalizeRoleHeader(request: Request, fallback?: string): string;
  normalizeUserIdHeader(request: Request, fallback?: string): string;
  isReadOnlyMethod(method: string): boolean;
}

/** MCP session service interface for auth plugins that validate MCP sessions. */
export interface BaoMcpSessionService {
  isActive(sessionId: string): Promise<boolean>;
  touch(sessionId: string): Promise<void>;
}

/** MCP tool source resolver for auth plugins that check tool provenance. */
export type BaoMcpToolSourceResolver = (toolName: string) => string | undefined;

/**
 * Minimal Redis client surface for quota plugins.
 *
 * `send` returns the raw {@link BaoRedisReply} union; callers narrow with
 * helpers like `parseRedisInteger`. There is no `unknown` escape hatch.
 */
export interface BaoRedisClientLike {
  send(command: string, args: string[]): Promise<BaoRedisReply>;
}

/** Host context for auth policy plugins. */
export interface BaoAuthPolicyHostContext extends BaoHostContextBase {
  /** API path constants map. */
  apiPaths: Readonly<Record<string, string>>;
  /** Auth policy helper utilities. */
  authPolicy: BaoAuthPolicyHelpers;
  /** MCP session service (available to MCP-related auth plugins). */
  mcpSession?: BaoMcpSessionService;
  /** MCP tool source resolver (available to hardware-related auth plugins). */
  mcpToolSource?: BaoMcpToolSourceResolver;
  /** Redis client accessor (available to quota-based auth plugins). */
  redis?: {
    getClient(): Promise<BaoRedisClientLike | null>;
  };
  /** Schedule fire-and-forget async work. */
  scheduleAsync?(promise: Promise<void>, label: string): void;
  /** Configuration accessor keyed by config section. */
  getConfig?<T>(section: string): T;
}

// OpenTelemetry surface (canonical Bao-namespaced via @baohaus/otel-api-bao)

/** Re-named OTel context handle exposed to extension code (no widening). */
export type BaoOtelContext = BaoOtelContextValue;

/** Re-named OTel tracer exposed to extension code. */
export type BaoOtelTracer = BaoOtelTracerValue;

/** Re-named OTel span exposed to extension code. */
export type BaoOtelSpan = BaoOtelSpanValue;

/** OpenTelemetry API surface injected by the host for Prisma extensions. */
export interface BaoOtelApi {
  getTracer(name: string): BaoOtelTracer;
  getSpan(context: BaoOtelContext): BaoOtelSpan | undefined;
  context: { active(): BaoOtelContext };
  SpanKind: Readonly<Record<string, number>>;
  SpanStatusCode: Readonly<Record<string, number>>;
}

/** Request context snapshot for Prisma traceability. */
export interface BaoRequestContextSnapshot {
  requestId?: string;
  userId?: string;
  tenantId?: string | null;
  sessionId?: string;
  method?: string;
  path?: string;
}

/** Structured Bao log entry payload (observability ingestion). */
export interface BaoLogEntry {
  level: string;
  message: string;
  service?: string;
  traceId?: string;
  spanId?: string;
  correlationId?: string;
  timestamp?: string | number;
  metadata?: BaoLogMeta;
}

/**
 * Prisma-flavored host context contract.
 *
 * Lives in the consumer app (bao-runtime) — see
 * `bao-runtime/src/platform/database/prisma-extension.types.ts`. Prisma's
 * `Prisma.defineExtension` is an `ExtendsHook` whose call signature is a
 * generic overload set; portable expression in this SDK without importing
 * Prisma internals is structurally impossible (see TS issue #1356). The
 * canonical types `BaoPrismaExtensionHostContext`,
 * `BaoPrismaDefineExtension`, and `BaoPrismaExtensionFactory` are declared
 * in the only consumer app that materializes a generated Prisma client.
 * The optional observability fields (`otel`, `requestContext`,
 * `observability`, `scheduleAsync`) shared with that context are
 * surfaced via {@link BaoOtelApi}, {@link BaoRequestContextSnapshot}, and
 * {@link BaoLogEntry} below so consumers can re-compose them on the local
 * host-context interface without re-declaring the underlying shapes.
 */

// BaoDown node context

/** BaoDown node control output. */
export interface BaoDownControlOutput {
  nextNodeId?: string;
  branch?: string;
  skip?: boolean;
}

/** BaoDown node execution result. */
export interface BaoDownNodeResult {
  ok: boolean;
  output?: BaoJsonValue;
  error?: { code: string; message: string; details?: BaoJsonValue; retryable?: boolean };
  control?: BaoDownControlOutput;
}

/** BaoDown node result constructors. */
export interface BaoDownResultBuilders {
  ok(output?: BaoJsonValue, control?: BaoDownControlOutput): BaoDownNodeResult;
  err(
    code: string,
    message: string,
    options?: { details?: BaoJsonValue; retryable?: boolean },
  ): BaoDownNodeResult;
}

/** BaoDown executor tunable configuration consumed by node handlers. */
export interface BaoDownExecutionConfig {
  maxRetries: number;
  defaultTimeoutMs: number;
  maxNodeDelayMs?: number;
}

/** HTTP fetch options for BaoDown HTTP nodes. */
export interface BaoDownHttpFetchOptions {
  method?: string;
  headers?: Readonly<Record<string, string>>;
  body?: string;
  signal?: AbortSignal;
  timeoutMs?: number;
}

/** HTTP fetch result. */
export interface BaoDownHttpFetchResult {
  ok: boolean;
  status: number;
  headers: Readonly<Record<string, string>>;
  body: string;
}

/** RPA workflow execution request. */
export interface BaoDownRpaExecutionRequest {
  workflowId: string;
  triggeredBy: string;
  triggerType: string;
  inputs?: Readonly<Record<string, BaoJsonValue>>;
  idempotencyKey?: string;
}

/** RPA workflow execution result. */
export interface BaoDownRpaExecutionResult {
  ok: boolean;
  executionId?: string;
  error?: string;
}

/** AI completion request for BaoDown AI nodes. */
export interface BaoDownAiCompletionRequest {
  provider?: string;
  model?: string;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
}

/** AI completion result. */
export interface BaoDownAiCompletionResult {
  ok: boolean;
  text?: string;
  error?: string;
  retryable?: boolean;
}

/** Services injected into BaoDown nodes via host context. */
export interface BaoDownNodeServices {
  /** HTTP fetch with policy enforcement (timeouts, retries, allowed hosts). */
  httpFetch?(url: string, options?: BaoDownHttpFetchOptions): Promise<BaoDownHttpFetchResult>;
  /** Queue an RPA workflow execution. */
  queueRpaExecution?(request: BaoDownRpaExecutionRequest): Promise<BaoDownRpaExecutionResult>;
  /** Run an AI text completion. */
  aiComplete?(request: BaoDownAiCompletionRequest): Promise<BaoDownAiCompletionResult>;
  /** Resolve a BaoDown graph/flow by ID. */
  resolveGraph?(graphId: string): Promise<BaoJsonValue>;
  /** Compile a BaoDown graph. */
  compileGraph?(graph: BaoJsonValue): Promise<BaoJsonValue>;
}

/** Configuration values injected into BaoDown nodes. */
export interface BaoDownNodeConfig {
  /** AI automation prompt templates. */
  aiPrompts?: Readonly<Record<string, string>>;
  /** RPA triggeredBy identifier for this BaoDown context. */
  rpaTriggeredBy?: string;
}

/**
 * Generic database client accessor.
 *
 * The host injects a Prisma / Bun-SQL / Redis client. The concrete client
 * type is declared on the host-context type parameter `TClient` (default
 * `never`) so the implementation returns a fully-typed instance and the
 * caller observes the same concrete type without `as`/`unknown` escape
 * hatches. Consumers that do not need a database client can omit the
 * parameter; the default `never` ensures the contract surface remains
 * type-safe.
 *
 * @typeParam TClient - Concrete database client instance type the host injects.
 */
export interface BaoHostDatabaseAccessor<TClient = unknown> {
  getClient(): TClient;
}

/** Host context for BaoDown node definitions. */
export interface BaoDownNodeHostContext<TDbClient = unknown> extends BaoHostContextBase {
  /** Node result constructors. */
  results: BaoDownResultBuilders;
  /** Cryptographic hash utility. */
  hash(input: string | Uint8Array, algorithm?: string): string;
  /** BaoDown execution configuration. */
  executionConfig: BaoDownExecutionConfig;
  /** Database client for node handlers that need DB access. */
  db?: BaoHostDatabaseAccessor<TDbClient>;
  /** Runtime services available to node handlers. */
  services?: BaoDownNodeServices;
  /** Configuration values for node handlers. */
  config?: BaoDownNodeConfig;
}

// Canonical BaoDown node definition surface (§1.9 / STANDARDS.md)

/** Trigger kind discriminator for trigger nodes. */
export type BaoDownTriggerKind = "schedule" | "webhook" | "event" | "manual" | string;

/** Single port declaration on a BaoDown node entry. */
export interface BaoDownNodePort {
  id: string;
  kind: string;
  required?: boolean;
}

/** Config-field declaration on a BaoDown node entry. */
export interface BaoDownNodeEntryConfigField {
  key: string;
  kind: "string" | "number" | "boolean" | "enum" | "json";
  required: boolean;
  labelKey: string;
  descriptionKey?: string;
  options?: readonly { readonly labelKey: string; readonly value: string }[];
}

/** Catalog entry shape consumed by the BaoDown node UI/validator. */
export interface BaoDownNodeCatalogEntryShape {
  typeId: string;
  titleKey: string;
  descriptionKey?: string;
  categoryKey: string;
  kind: string;
  ports: {
    inputs: readonly BaoDownNodePort[];
    outputs: readonly BaoDownNodePort[];
  };
  configFields: readonly BaoDownNodeEntryConfigField[];
}

/** Inputs/outputs payload threaded through a node handler invocation. */
export interface BaoDownNodeHandlerContext {
  inputs: Readonly<Record<string, BaoJsonValue>>;
  config?: Readonly<Record<string, BaoJsonValue>>;
  signal?: AbortSignal;
  hostContext?: BaoDownNodeHostContext | undefined;
}

/** Handler signature for an executable BaoDown node. */
export type BaoDownNodeHandler = (
  context: BaoDownNodeHandlerContext,
) => BaoDownNodeResult | Promise<BaoDownNodeResult>;

/**
 * Canonical executable definition for a BaoDown node type.
 *
 * Standalone catalog packages and the bao-runtime extension loader share
 * this single shape — there is no per-package divergence. New definition
 * factories (`createNodeDefinitions`, `definitions`, `createNodeDefinition`,
 * `definition`, `default`, named `*Definition()`) MUST emit instances of
 * this exact interface so the bao-runtime loader admits them.
 */
export interface BaoDownNodeDefinition {
  /** Catalog entry for UI/validation. */
  entry: BaoDownNodeCatalogEntryShape;
  /** Whether this node type is a trigger. */
  isTrigger: boolean;
  /** Optional trigger kind discriminator. */
  triggerKind?: BaoDownTriggerKind;
  /** Execute handler. */
  handler: BaoDownNodeHandler;
}

// Elysia server plugin context

/**
 * Generic auth service accessor.
 *
 * The host injects a Better Auth instance; the concrete instance type is
 * declared on the host-context type parameter `TInstance` so the
 * implementation returns a fully-typed instance and the caller observes the
 * same concrete type without an escape hatch.
 *
 * @typeParam TInstance - Concrete auth-service instance type the host injects.
 */
export interface BaoHostAuthAccessor<TInstance = unknown> {
  getInstance(): TInstance;
}

/**
 * Host context for Elysia server plugin extensions.
 *
 * @typeParam TDbClient - Concrete database client type the host injects.
 * @typeParam TAuthInstance - Concrete auth-service instance type the host injects.
 */
export interface BaoElysiaPluginHostContext<TDbClient = unknown, TAuthInstance = unknown>
  extends BaoHostContextBase {
  /** Database client accessor. */
  db: BaoHostDatabaseAccessor<TDbClient>;
  /** Auth service accessor. */
  auth: BaoHostAuthAccessor<TAuthInstance>;
}

// Disposable extension result

/**
 * Extension factory result that includes an optional dispose callback.
 *
 * When an extension returns this shape, the host tracks the dispose handle
 * and calls it during unload to clean up timers, subscriptions, and caches.
 */
export interface BaoDisposableExtensionResult<T> {
  /** The extension payload (plugin shape, definitions, etc.). */
  value: T;
  /** Optional cleanup callback invoked on unload. */
  dispose?: () => void | Promise<void>;
}
