/**
 * Browser-safe structured logger.
 *
 * This is a sanctioned console boundary for browser/client-safe logging.
 * Utility packages may depend on this module without pulling server logging
 * concerns from `@baohaus/bao-core`.
 */

import { getEnvVar } from "./env";

export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

const LOG_LEVELS: readonly LogLevel[] = ["fatal", "error", "warn", "info", "debug", "trace"];
const LOG_LEVEL_SET: ReadonlySet<string> = new Set<string>(LOG_LEVELS);

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
  metadata?: Record<string, unknown>;
}

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  fatal: -1,
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4,
};

function isLogLevel(value: string | undefined): value is LogLevel {
  return value !== undefined && LOG_LEVEL_SET.has(value);
}

function resolveLogLevel(override: LogLevel | undefined, envValue: string | undefined): LogLevel {
  if (override) {
    return override;
  }
  if (isLogLevel(envValue)) {
    return envValue;
  }
  return "info";
}

export class SharedLogger {
  private readonly context: string;
  private level: LogLevel;
  private readonly console: Console;
  private readonly enableConsole: boolean;

  constructor(options: LoggerOptions = {}) {
    this.context = options.context ?? "App";
    const envLevelRaw = getEnvVar("LOG_LEVEL");
    const envLevel = typeof envLevelRaw === "string" ? envLevelRaw.trim() || undefined : undefined;
    this.level = resolveLogLevel(options.level, envLevel);
    this.console = options.console ?? console;
    this.enableConsole = options.enableConsole !== false;
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  child(contextSuffix: string, overrides: LoggerOptions = {}): SharedLogger {
    return new SharedLogger({
      ...overrides,
      level: overrides.level ?? this.level,
      enableConsole: overrides.enableConsole ?? this.enableConsole,
      context: `${this.context}:${contextSuffix}`,
    });
  }

  error(message: string, ...args: unknown[]): void {
    this.emit("error", message, args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.emit("warn", message, args);
  }

  info(message: string, ...args: unknown[]): void {
    this.emit("info", message, args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.emit("debug", message, args);
  }

  trace(message: string, ...args: unknown[]): void {
    this.emit("trace", message, args);
  }

  fatal(message: string, ...args: unknown[]): void {
    this.emit("fatal", message, args);
  }

  isLevelEnabled(level: LogLevel): boolean {
    return LEVEL_WEIGHT[level] <= LEVEL_WEIGHT[this.level];
  }

  private emit(level: LogLevel, message: string, args: unknown[]): void {
    if (!(this.enableConsole && this.isLevelEnabled(level))) {
      return;
    }

    const metadata = args.length > 0 ? normalizeMetadata(args) : undefined;
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      ...(metadata ? { metadata } : {}),
    };
    const serialized = JSON.stringify(entry);
    switch (level) {
      case "fatal":
      case "error": {
        this.console.error(serialized);
        return;
      }
      case "warn": {
        this.console.warn(serialized);
        return;
      }
      case "debug":
      case "trace": {
        this.console.debug(serialized);
        return;
      }
      default: {
        this.console.info(serialized);
      }
    }
  }
}

function normalizeMetadata(args: unknown[]): Record<string, unknown> {
  if (args.length === 1) {
    const [value] = args;
    if (isRecord(value)) {
      return value;
    }
    return { value };
  }

  return { args };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function createLogger(context: string, options: LoggerOptions = {}): SharedLogger {
  return new SharedLogger({ ...options, context });
}

export const logger: SharedLogger = createLogger("App");
