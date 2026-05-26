/**
 * Browser-safe logger implementation.
 *
 * Browser client bundles should never pull Node/Bun-only modules (for example `node:fs`).
 * This module is browser-native and intentionally excludes server-only transport concerns.
 *
 * @shared/logger/browser
 */

import { getEnvVar } from "@baohaus/bao-utils/env";

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
  console?: Console;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  metadata?: LogMetadata;
}

type LogMetadata = { readonly [key: string]: unknown };

function isLogMetadata(value: unknown): value is LogMetadata {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

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
 * SharedLogger provides structured logging with console output only.
 */
export class SharedLogger {
  private readonly context: string;
  private level: LogLevel;
  private readonly console: Console;
  private readonly enableConsole: boolean;

  /**
   * Create a logger instance.
   *
   * @param options - Logger configuration options.
   */
  constructor(options: LoggerOptions = {}) {
    this.context = options.context ?? "App";
    const envLevelRaw = getEnvVar("LOG_LEVEL");
    const envLevel = typeof envLevelRaw === "string" ? envLevelRaw.trim() || undefined : undefined;
    this.level = resolveLogLevel(options.level, envLevel);
    this.console = options.console ?? console;
    this.enableConsole = options.enableConsole !== false;
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
   * @param overrides - Optional override settings.
   * @returns Child logger instance.
   */
  child(contextSuffix: string, overrides: LoggerOptions = {}): SharedLogger {
    return new SharedLogger({
      ...overrides,
      level: overrides.level ?? this.level,
      enableConsole: overrides.enableConsole ?? this.enableConsole,
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
   * Uses `console.debug()` in the browser since `console.trace()` would
   * produce an unwanted stack trace in devtools.
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
   * Uses `console.error()` with a `[FATAL]` prefix for visual prominence
   * in browser devtools.
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
    metadata: LogMetadata | undefined,
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
   * Dispatch a log entry to configured outputs.
   *
   * @param level - Log level.
   * @param message - Log message.
   * @param args - Optional payloads.
   */
  private emit(level: LogLevel, message: string, args: unknown[]): void {
    if (!this.shouldLog(level)) {
      return;
    }
    const metadata = args.length === 1 && isLogMetadata(args[0]) ? args[0] : undefined;
    const entry = this.formatEntry(level, message, metadata);
    this.writeToConsole(entry, args);
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
 * Default logger factory with convenience methods for browser environments.
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
