/**
 * Bun subprocess guardrails utility.
 *
 * Provides bounded command execution with timeout, cancellation, and output
 * limits for external-process boundaries.
 *
 * @packageDocumentation
 */

import {
  getErrorMessage,
  type ResultErrorInput,
  toResultAsync,
  toResultSync,
} from "@baohaus/bao-utils/async-result";

const SURROGATE_PAIR_THRESHOLD: number = 0xffff;
const SURROGATE_PAIR_WIDTH = 2;

/**
 * Input options for guarded Bun subprocess execution.
 */
type BunSpawnOptions = Exclude<Parameters<typeof Bun.spawn>[1], undefined>;
type BunProcessStdOption = BunSpawnOptions["stdout"];
type BunProcessStdinOption = BunSpawnOptions["stdin"] | string;
type BunProcessStreamChunkHandler = (chunk: string) => void;
type BunSpawnStdinOption = BunSpawnOptions["stdin"];
type BoundedTextBuffer = { chunks: string[]; byteLength: number };
type BunSpawnContext = Readonly<{
  hasTimeout: boolean;
  timeoutMs: number | undefined;
  timeoutSignal: AbortSignal | undefined;
  signal: AbortSignal | undefined;
}>;

/**
 * Input options for guarded Bun subprocess execution.
 */
export interface BunExecOptions {
  /** Command vector including executable and arguments. */
  cmd: readonly string[];
  /** Optional working directory. */
  cwd?: string;
  /** Optional environment overrides. */
  env?: Record<string, string | undefined>;
  /** Optional timeout in milliseconds. Omit to let process manage its own lifetime. */
  timeoutMs?: number;
  /** Optional parent abort signal. */
  signal?: AbortSignal;
  /** Optional process kill signal override. */
  killSignal?: string | number;
  /** Maximum captured output bytes (stdout+stderr). */
  maxBufferBytes?: number;
  /** Optional stdin configuration for the spawned process. */
  stdin?: BunProcessStdinOption;
  /** Optional stdout configuration for the spawned process. */
  stdout?: BunProcessStdOption;
  /** Optional stderr configuration for the spawned process. */
  stderr?: BunProcessStdOption;
  /** Optional detached flag for long-lived subprocesses. */
  detached?: boolean;
  /** Optional stdout chunk callback for streaming consumers. */
  onStdoutChunk?: BunProcessStreamChunkHandler;
  /** Optional stderr chunk callback for streaming consumers. */
  onStderrChunk?: BunProcessStreamChunkHandler;
}

/**
 * Guarded Bun subprocess result envelope.
 */
export interface BunExecResult {
  /** Process exit code (`-1` when spawn fails before execution). */
  exitCode: number;
  /** Captured standard output (bounded). */
  stdout: string;
  /** Captured standard error (bounded). */
  stderr: string;
  /** True when timeout elapsed before completion. */
  timedOut: boolean;
  /** True when process was aborted by signal. */
  aborted: boolean;
}

/**
 * Guarded Bun spawn return type for long-lived subprocess use cases.
 */
export type SpawnBunCommandResult =
  | {
      /** Spawned process is available. */
      ok: true;
      /** The spawned subprocess handle. */
      process: ReturnType<typeof Bun.spawn>;
      /** True when timeout behavior is active for this subprocess. */
      hasTimeout: boolean;
      /** Timeout signal used for this subprocess. */
      timeoutSignal: AbortSignal | undefined;
      /** Effective abort signal attached to this subprocess. */
      signal: AbortSignal | undefined;
    }
  | {
      /** Spawn failed before process creation. */
      ok: false;
      /** Deterministic failure envelope for consistency. */
      result: BunExecResult;
    };

const sharedTextEncoder: TextEncoder = new TextEncoder();

/**
 * Append text into a bounded rolling buffer.
 *
 * Keeps only the most recent `maxBufferBytes` of UTF-8 text while preserving
 * stream order for later concatenation.
 *
 * @param buffer - Mutable rolling text buffer.
 * @param chunk - Text chunk to append.
 * @param maxBufferBytes - Maximum UTF-8 byte length to retain.
 */
function appendBoundedText(buffer: BoundedTextBuffer, chunk: string, maxBufferBytes: number): void {
  if (!chunk) {
    return;
  }

  buffer.chunks.push(chunk);
  buffer.byteLength += sharedTextEncoder.encode(chunk).byteLength;

  while (buffer.byteLength > maxBufferBytes && buffer.chunks.length > 0) {
    const firstChunk = buffer.chunks[0];
    if (firstChunk === undefined) {
      break;
    }

    const firstChunkBytes = sharedTextEncoder.encode(firstChunk).byteLength;
    if (buffer.byteLength - firstChunkBytes >= maxBufferBytes) {
      buffer.chunks.shift();
      buffer.byteLength -= firstChunkBytes;
      continue;
    }

    let sliceIndex = 0;
    while (sliceIndex < firstChunk.length && buffer.byteLength > maxBufferBytes) {
      const codePoint = firstChunk.codePointAt(sliceIndex);
      const nextIndex =
        codePoint !== undefined && codePoint > SURROGATE_PAIR_THRESHOLD
          ? sliceIndex + SURROGATE_PAIR_WIDTH
          : sliceIndex + 1;
      const removedSegment = firstChunk.slice(sliceIndex, nextIndex);
      buffer.byteLength -= sharedTextEncoder.encode(removedSegment).byteLength;
      sliceIndex = nextIndex;
    }

    buffer.chunks[0] = firstChunk.slice(sliceIndex);
    break;
  }
}

function toReadableText(
  stream: ReadableStream<Uint8Array> | null | undefined | number,
  maxBufferBytes: number,
  onChunk?: BunProcessStreamChunkHandler,
): Promise<string> {
  if (stream === undefined || stream === null || typeof stream === "number") {
    return Promise.resolve("");
  }

  const reader = stream.getReader();
  const decoder = new TextDecoder();

  const consumeStream = async (): Promise<string> => {
    const buffer: BoundedTextBuffer = { chunks: [], byteLength: 0 };
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (!value) {
        continue;
      }
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) {
        appendBoundedText(buffer, chunk, maxBufferBytes);
        onChunk?.(chunk);
      }
    }

    const trailingChunk = decoder.decode();
    if (trailingChunk) {
      appendBoundedText(buffer, trailingChunk, maxBufferBytes);
      onChunk?.(trailingChunk);
    }

    return buffer.chunks.join("");
  };

  return consumeStream().finally(() => {
    reader.releaseLock();
  });
}

/**
 * Normalize high-level stdin options to Bun.spawn-compatible stdin payloads.
 *
 * @param stdin - Raw stdin option.
 * @returns Spawn-compatible stdin value.
 */
function normalizeSpawnStdinOption(
  stdin: BunProcessStdinOption | undefined,
): BunSpawnStdinOption | undefined {
  if (stdin === null) {
    return "ignore";
  }
  if (stdin === "pipe" || stdin === "inherit" || stdin === "ignore") {
    return stdin;
  }
  if (typeof stdin === "string") {
    return new TextEncoder().encode(stdin);
  }
  return stdin;
}

/**
 * Normalize stdout/stderr options so `null` matches Bun's ignore semantics.
 *
 * @param stream - Raw stdout/stderr option.
 * @param fallback - Default option when stream is undefined.
 * @returns Spawn-compatible stdout/stderr option.
 */
function normalizeSpawnStdOption(
  stream: BunProcessStdOption | undefined,
  fallback: "pipe",
): Exclude<BunProcessStdOption, undefined> {
  if (stream === undefined) {
    return fallback;
  }
  if (stream === null) {
    return "ignore";
  }
  return stream;
}

function resolveSpawnSignal(
  signal: AbortSignal | undefined,
  timeoutSignal: AbortSignal | undefined,
): AbortSignal | undefined {
  if (signal) {
    return timeoutSignal ? AbortSignal.any([signal, timeoutSignal]) : signal;
  }
  return timeoutSignal;
}

function resolveSpawnContext(options: BunExecOptions): BunSpawnContext {
  const hasTimeout = typeof options.timeoutMs === "number" && options.timeoutMs > 0;
  const timeoutMs = hasTimeout ? Math.max(1, Math.trunc(options.timeoutMs ?? 1)) : undefined;
  const timeoutSignal =
    hasTimeout && timeoutMs !== undefined ? AbortSignal.timeout(timeoutMs) : undefined;

  return {
    hasTimeout,
    timeoutMs,
    timeoutSignal,
    signal: resolveSpawnSignal(options.signal, timeoutSignal),
  };
}

function buildSpawnOptions(
  options: BunExecOptions,
  context: BunSpawnContext,
  stdin: BunSpawnStdinOption | undefined,
  stdout: Exclude<BunProcessStdOption, undefined>,
  stderr: Exclude<BunProcessStdOption, undefined>,
): BunSpawnOptions {
  return {
    cwd: options.cwd,
    env: options.env,
    stdin,
    stdout,
    stderr,
    ...(options.detached === undefined ? {} : { detached: options.detached }),
    ...(context.signal === undefined ? {} : { signal: context.signal }),
    ...(context.hasTimeout
      ? {
          timeout: context.timeoutMs,
          killSignal: options.killSignal ?? "SIGTERM",
        }
      : {}),
    ...(options.killSignal && !context.hasTimeout ? { killSignal: options.killSignal } : {}),
  };
}

function toSpawnFailureResult(
  error: ResultErrorInput,
  context: BunSpawnContext,
): Extract<SpawnBunCommandResult, { ok: false }> {
  return {
    ok: false,
    result: {
      exitCode: -1,
      stdout: "",
      stderr: getErrorMessage(error),
      timedOut: context.timeoutSignal?.aborted ?? false,
      aborted: context.signal?.aborted ?? false,
    },
  };
}

/**
 * Spawn a Bun subprocess with shared guardrails.
 *
 * Use this for subprocesses that must return immediately with a live handle.
 * For short-lived commands with bounded output collection, prefer `runBunCommand`.
 */
export function spawnBunCommand(options: BunExecOptions): SpawnBunCommandResult {
  const context = resolveSpawnContext(options);
  const stdin = normalizeSpawnStdinOption(options.stdin);
  const stdout = normalizeSpawnStdOption(options.stdout, "pipe");
  const stderr = normalizeSpawnStdOption(options.stderr, "pipe");
  const spawnOptions = buildSpawnOptions(options, context, stdin, stdout, stderr);
  const spawnResult = toResultSync(() => Bun.spawn([...options.cmd], spawnOptions));
  if (!spawnResult.ok) {
    return toSpawnFailureResult(spawnResult.error, context);
  }

  return {
    ok: true,
    process: spawnResult.value,
    hasTimeout: context.hasTimeout,
    timeoutSignal: context.timeoutSignal,
    signal: context.signal,
  };
}

const DEFAULT_MAX_BUFFER_BYTES = 256_000;

/**
 * Execute a guarded Bun subprocess with timeout and bounded output.
 *
 * @param options - Guarded execution options.
 * @returns Structured subprocess result.
 */
export async function runBunCommand(options: BunExecOptions): Promise<BunExecResult> {
  const maxBufferBytes = Math.max(1, options.maxBufferBytes ?? DEFAULT_MAX_BUFFER_BYTES);
  const stdout = normalizeSpawnStdOption(options.stdout, "pipe");
  const stderr = normalizeSpawnStdOption(options.stderr, "pipe");
  const spawnResult = spawnBunCommand(options);
  if (!spawnResult.ok) {
    return spawnResult.result;
  }

  const { process, hasTimeout, timeoutSignal, signal } = spawnResult;
  const stdoutPromise =
    stdout === "pipe"
      ? toResultAsync(toReadableText(process.stdout, maxBufferBytes, options.onStdoutChunk))
      : Promise.resolve({ ok: true as const, value: "" } as const);
  const stderrPromise =
    stderr === "pipe"
      ? toResultAsync(toReadableText(process.stderr, maxBufferBytes, options.onStderrChunk))
      : Promise.resolve({ ok: true as const, value: "" } as const);

  const [stdoutResult, stderrResult, exitCode] = await Promise.all([
    stdoutPromise,
    stderrPromise,
    process.exited,
  ]);

  const stdoutText = stdoutResult.ok ? stdoutResult.value : "";
  const stderrFromPipe = stderrResult.ok ? stderrResult.value : "";
  const stderrReadError = stderrResult.ok
    ? ""
    : `\n[stderr-read-error] ${getErrorMessage(stderrResult.error)}`;

  return {
    exitCode,
    stdout: stdoutText,
    stderr: `${stderrFromPipe}${stderrReadError}`.trim(),
    timedOut: hasTimeout ? (timeoutSignal?.aborted ?? false) : false,
    aborted: signal?.aborted ?? false,
  };
}
