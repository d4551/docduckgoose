/**
 * Structured logger — sanctioned console boundary per AGENTS.md.
 *
 * Application code must use Logger/createLogger/useClientLogger; raw console.*
 * is forbidden. This module is the only place that invokes console.error,
 * console.warn, console.info, console.debug.
 */

import { mkdir } from "@baohaus/bao-shared/utils/bun-fs";
import { hostname as osHostname } from "@baohaus/bao-shared/utils/bun-os";
import { getErrorMessage, toResultAsync } from "@baohaus/bao-utils/async-result";
import { isJsonGuardRecord, type JsonGuardRecord } from "../types/json-guard.ts";
import { getEnvVar } from "../utils/env";
import { redactLogMetadata } from "../utils/log-redaction";
import { serializeError } from "../utils/log-serializers";

// Module-level cached identity (evaluated once at import time)

/** Cached process ID for inclusion in file log entries. */
const CACHED_PID: number = process.pid;

/** Cached hostname for inclusion in file log entries. */
const CACHED_HOSTNAME: string = osHostname();

/** Inferred type from the LogLevel schema. */
export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

const LOG_LEVELS: LogLevel[] = ["fatal", "error", "warn", "info", "debug", "trace"];

/**
 * Interface LoggerOptions.
 */
export interface LoggerOptions {
  context?: string;
  level?: LogLevel;
  enableConsole?: boolean;
  enableFileTransport?: boolean;
  logDirectory?: string;
  console?: Console;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  metadata?: JsonGuardRecord;
}

type FileLogWriters = {
  log: LogWriter;
  error: LogWriter;
};

/**
 * Severity weight map. Lower weight = more severe.
 *
 * The comparison `LEVEL_WEIGHT[level] <= LEVEL_WEIGHT[this.level]` ensures
 * that more-severe levels always pass through. `fatal` at -1 always passes;
 * `trace` at 4 is the least severe and only passes when the configured
 * level is also `trace`.
 */
const LEVEL_WEIGHT: Record<LogLevel, number> = {
  fatal: -1,
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4,
};

type LogWriter = {
  write: (data: string) => void;
  flush?: () => void;
  end?: () => void;
};

function normalizeOptionalString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function isTruthyFlag(value: string | null): boolean | null {
  if (value === null) {
    return null;
  }
  const normalized = value.toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }
  return null;
}

/**
 * Detect whether the current runtime is containerized.
 *
 * Kubernetes and OCI runtimes default to stdout/stderr logging. File logging is
 * still available when explicitly enabled with `LOG_FILE_TRANSPORT=true`.
 *
 * @returns True when container runtime signals are present.
 */
function isContainerRuntime(): boolean {
  const containerFlag = isTruthyFlag(normalizeOptionalString(getEnvVar("CONTAINER")));
  if (containerFlag === true) {
    return true;
  }
  return normalizeOptionalString(getEnvVar("KUBERNETES_SERVICE_HOST")) !== null;
}

/**
 * Resolve whether file transport should be enabled for this logger instance.
 *
 * @param override - Explicit constructor override.
 * @returns True when file transport should be initialized.
 */
function resolveFileTransportEnabled(override: boolean | undefined): boolean {
  if (override !== undefined) {
    return override;
  }
  const envPreference = isTruthyFlag(normalizeOptionalString(getEnvVar("LOG_FILE_TRANSPORT")));
  if (envPreference !== null) {
    return envPreference;
  }
  return !isContainerRuntime();
}

/**
 * Validate whether a string is a supported log level.
 *
 * @param value - Candidate log level string.
 * @returns True when the value is a valid log level.
 */
function isLogLevel(value: string | undefined): value is LogLevel {
  return value !== undefined && (LOG_LEVELS as readonly string[]).includes(value);
}

/**
 * Resolve the active log level from overrides and environment.
 *
 * @param override - Explicit log level override.
 * @param envValue - Raw environment value.
 * @returns Resolved log level.
 */
function resolveLogLevel(override: LogLevel | undefined, envValue: string | undefined): LogLevel {
  if (override) {
    return override;
  }
  if (isLogLevel(envValue)) {
    return envValue;
  }
  return "info";
}

/**
 * Ensure the log directory exists before writing.
 *
 * @param directory - Directory to create if missing.
 */
async function ensureDirectoryExists(directory: string): Promise<void> {
  await mkdir(directory, { recursive: true });
}

async function ensureFileExists(path: string): Promise<void> {
  const target = Bun.file(path);
  if (await target.exists()) {
    return;
  }
  await Bun.write(target, "");
}

/**
 * Create Bun file writers for log and error streams.
 *
 * @param logDirectory - Directory for log files.
 * @returns | null>} Writer handles or null when Bun is unavailable.
 */
async function createFileWriters(logDirectory: string): Promise<{
  log: LogWriter;
  error: LogWriter;
} | null> {
  await ensureDirectoryExists(logDirectory);
  const date = new Date().toISOString().split("T")[0];
  const logPath = `${logDirectory}/app-${date}.log`;
  const errorPath = `${logDirectory}/error-${date}.log`;

  await Promise.all([ensureFileExists(logPath), ensureFileExists(errorPath)]);

  const logFile = Bun.file(logPath);
  const errorFile = Bun.file(errorPath);

  const logWriter = logFile.writer();
  const errorWriter = errorFile.writer();

  return { log: logWriter, error: errorWriter };
}

/**
 * SharedLogger provides structured logging with optional file transport.
 */
export class SharedLogger {
  private readonly context: string;
  private level: LogLevel;
  private readonly console: Console;
  private readonly enableConsole: boolean;
  private readonly pendingFileEntries: LogEntry[] = [];
  private readonly fileTransportEnabled: boolean;
  private fileWriterInitialization: Promise<void> | null = null;
  private fileWriters: FileLogWriters | null = null;

  /**
   * Create a logger instance.
   *
   * @param [options={}] - Logger configuration options.
   */
  constructor(options: LoggerOptions = {}) {
    this.context = options.context ?? "App";
    const envLevelRaw = getEnvVar("LOG_LEVEL");
    const envLevel = typeof envLevelRaw === "string" ? envLevelRaw.trim() || undefined : undefined;
    this.level = resolveLogLevel(options.level, envLevel);
    this.console = options.console ?? console;
    this.enableConsole = options.enableConsole !== false;
    this.fileTransportEnabled = resolveFileTransportEnabled(options.enableFileTransport);

    if (this.fileTransportEnabled) {
      const logDirectoryRaw = getEnvVar("LOG_DIR");
      const logDirectory =
        options.logDirectory ??
        (typeof logDirectoryRaw === "string" ? logDirectoryRaw : undefined) ??
        "./logs";

      if (logDirectory) {
        this.fileWriterInitialization = this.initializeFileWriters(logDirectory);
      }
    }
  }

  /**
   * Update the active log level.
   *
   * @param level - New minimum log level.
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }

  /**
   * Create a child logger with a namespaced context.
   *
   * @param contextSuffix - Context suffix to append.
   * @param [overrides={}] - Optional override settings.
   * @returns Child logger instance.
   */
  child(contextSuffix: string, overrides: LoggerOptions = {}): SharedLogger {
    return new SharedLogger({
      ...overrides,
      level: overrides.level ?? this.level,
      enableConsole: overrides.enableConsole ?? this.enableConsole,
      enableFileTransport: overrides.enableFileTransport ?? this.fileWriters !== null,
      logDirectory: overrides.logDirectory,
      context: `${this.context}:${contextSuffix}`,
    });
  }

  /**
   * Emit an error log entry.
   *
   * @param message - Log message.
   * @param args - Optional metadata payloads.
   */
  error(message: string, ...args: unknown[]): void {
    this.emit("error", message, args);
  }

  /**
   * Emit a warning log entry.
   *
   * @param message - Log message.
   * @param args - Optional metadata payloads.
   */
  warn(message: string, ...args: unknown[]): void {
    this.emit("warn", message, args);
  }

  /**
   * Emit an info log entry.
   *
   * @param message - Log message.
   * @param args - Optional metadata payloads.
   */
  info(message: string, ...args: unknown[]): void {
    this.emit("info", message, args);
  }

  /**
   * Emit a debug log entry.
   *
   * @param message - Log message.
   * @param args - Optional metadata payloads.
   */
  debug(message: string, ...args: unknown[]): void {
    this.emit("debug", message, args);
  }

  /**
   * Emit a trace log entry (most verbose level).
   *
   * Use for fine-grained diagnostic output that is typically only enabled
   * during local debugging (e.g. per-request lifecycle events, cache hit/miss).
   *
   * @param message - Log message.
   * @param args - Optional metadata payloads.
   */
  trace(message: string, ...args: unknown[]): void {
    this.emit("trace", message, args);
  }

  /**
   * Emit a fatal log entry (most severe level).
   *
   * Fatal indicates an unrecoverable error. After logging, callers should
   * typically flush and terminate the process.
   *
   * @param message - Log message.
   * @param args - Optional metadata payloads.
   */
  fatal(message: string, ...args: unknown[]): void {
    this.emit("fatal", message, args);
  }

  /**
   * Check whether messages at the given level would be emitted.
   *
   * Useful for guarding expensive serialization that should be skipped
   * when the result would not be logged.
   *
   * @param level - Log level name to check.
   * @returns True when messages at the given level would be emitted.
   */
  isLevelEnabled(level: LogLevel): boolean {
    return this.shouldLog(level);
  }

  /**
   * Flush buffered file output.
   *
   * Calls `.flush()` on both the log and error file writers when
   * file transport is active. No-op otherwise.
   */
  flush(): void {
    if (!this.fileWriters) {
      return;
    }
    this.fileWriters.log.flush?.();
    this.fileWriters.error.flush?.();
  }

  private flushPendingFileEntries(): void {
    if (!this.fileWriters || this.pendingFileEntries.length === 0) {
      return;
    }

    const pendingEntries = this.pendingFileEntries.splice(0, this.pendingFileEntries.length);
    for (const entry of pendingEntries) {
      this.writeToFileDestination(entry, this.fileWriters);
    }
  }

  /**
   * Determine whether a log level should be emitted.
   *
   * @param level - Log level to check.
   * @returns True when the entry should be logged.
   */
  private shouldLog(level: LogLevel): boolean {
    return LEVEL_WEIGHT[level] <= LEVEL_WEIGHT[this.level];
  }

  /**
   * Format a log entry for output.
   *
   * @param level - Log level.
   * @param message - Log message.
   * @param metadata - Optional metadata payload.
   * @returns Structured log entry.
   */
  private formatEntry(
    level: LogLevel,
    message: string,
    metadata: JsonGuardRecord | undefined,
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      metadata,
    };
  }

  /**
   * Write a log entry to the console.
   *
   * @param entry - Log entry to emit.
   * @param args - Additional payloads.
   */
  private writeToConsole(entry: LogEntry, args: unknown[]): void {
    if (!this.enableConsole) {
      return;
    }
    const formattedMessage = `[${entry.level.toUpperCase()}] [${entry.context}] ${entry.message}`;
    const payload = args;

    switch (entry.level) {
      case "fatal":
        this.console.error(`[FATAL] ${formattedMessage}`, ...payload);
        break;
      case "error":
        this.console.error(formattedMessage, ...payload);
        break;
      case "warn":
        this.console.warn(formattedMessage, ...payload);
        break;
      case "trace":
        this.console.debug(formattedMessage, ...payload);
        break;
      case "debug":
        this.console.debug(formattedMessage, ...payload);
        break;
      default:
        this.console.info(formattedMessage, ...payload);
    }
  }

  /**
   * Write a log entry to file outputs when enabled.
   *
   * Metadata is automatically redacted before serialization.
   * Includes `pid` and `hostname` for log aggregation.
   *
   * @param entry - Log entry to write.
   */
  private writeToFile(entry: LogEntry): void {
    if (!this.fileTransportEnabled) {
      return;
    }
    if (!this.fileWriters) {
      if (this.fileWriterInitialization !== null) {
        this.pendingFileEntries.push(entry);
      }
      return;
    }

    this.writeToFileDestination(entry, this.fileWriters);
  }

  private async initializeFileWriters(logDirectory: string): Promise<void> {
    const result = await toResultAsync(createFileWriters(logDirectory));
    this.fileWriterInitialization = null;

    if (!result.ok) {
      this.pendingFileEntries.length = 0;

      const metadata = {
        error: getErrorMessage(result.error),
        logDirectory,
      };
      const entry = this.formatEntry("error", "Failed to initialize file transport", metadata);

      this.writeToConsole(entry, [metadata]);
      return;
    }

    this.fileWriters = result.value;
    this.flushPendingFileEntries();
  }

  private writeToFileDestination(entry: LogEntry, fileWriters: FileLogWriters): void {
    const safeMetadata = entry.metadata ? redactLogMetadata(entry.metadata) : undefined;
    const serialized = `${JSON.stringify(
      {
        timestamp: entry.timestamp,
        level: entry.level,
        pid: CACHED_PID,
        hostname: CACHED_HOSTNAME,
        context: entry.context,
        message: entry.message,
        metadata: safeMetadata,
      },
      null,
      0,
    )}\n`;
    const destination =
      entry.level === "error" || entry.level === "fatal" ? fileWriters.error : fileWriters.log;
    destination.write(serialized);
    destination.flush?.();
  }

  /**
   * Dispatch a log entry to configured outputs.
   *
   * Error instances found in `args` are automatically serialized via
   * {@link serializeError} so that structured file output captures the
   * full cause chain and error code.
   *
   * @param level - Log level.
   * @param message - Log message.
   * @param args - Optional payloads.
   */
  private emit(level: LogLevel, message: string, args: unknown[]): void {
    if (!this.shouldLog(level)) {
      return;
    }

    // Serialize any Error instances found in the args
    const serializedArgs = args.map((arg) => (arg instanceof Error ? serializeError(arg) : arg));

    const metadata =
      serializedArgs.length === 1 && isJsonGuardRecord(serializedArgs[0])
        ? serializedArgs[0]
        : undefined;
    const entry = this.formatEntry(level, message, metadata);
    this.writeToConsole(entry, serializedArgs);
    this.writeToFile(entry);
  }
}

const loggerCache: Map<string, SharedLogger> = new Map<string, SharedLogger>();

/**
 * Create or reuse a cached logger instance.
 *
 * @param context - Logger context name.
 * @param options - Optional logger overrides.
 * @returns Logger instance.
 */
export function createLogger(
  context?: string,
  options?: Omit<LoggerOptions, "context">,
): SharedLogger {
  const cacheKey = context ?? "App";
  const cached = loggerCache.get(cacheKey);
  if (cached && !options) {
    return cached;
  }
  const instance = new SharedLogger({ ...options, context: cacheKey });
  loggerCache.set(cacheKey, instance);
  return instance;
}

/**
 * Default logger factory with convenience methods for server environments.
 */
export const logger: ((context?: string, options?: LoggerOptions) => SharedLogger) & {
  trace: (message: string, ...args: unknown[]) => void;
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
  fatal: (message: string, ...args: unknown[]) => void;
  get: typeof createLogger;
  setLevel: (level: LogLevel) => void;
} = Object.assign((context?: string, options?: LoggerOptions) => createLogger(context, options), {
  trace: (message: string, ...args: unknown[]) => createLogger("App").trace(message, ...args),
  debug: (message: string, ...args: unknown[]) => createLogger("App").debug(message, ...args),
  info: (message: string, ...args: unknown[]) => createLogger("App").info(message, ...args),
  warn: (message: string, ...args: unknown[]) => createLogger("App").warn(message, ...args),
  error: (message: string, ...args: unknown[]) => createLogger("App").error(message, ...args),
  fatal: (message: string, ...args: unknown[]) => createLogger("App").fatal(message, ...args),
  get: createLogger,
  setLevel: (level: LogLevel) => {
    for (const instance of loggerCache.values()) {
      instance.setLevel(level);
    }
  },
});

/** Inferred type from the LoggerFactory schema. */
export type LoggerFactory = typeof logger;
