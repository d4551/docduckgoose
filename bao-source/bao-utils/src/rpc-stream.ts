/**
 * Shared RPC transport stream helpers.
 *
 * Provides Bun-native UTF-8 line consumption and request queue resolution for
 * JSON-RPC style subprocess transports.
 *
 * @baohaus/bao-utils/rpc-stream
 */

import { toResult } from "./async-result";

/**
 * Pending request handler stored in an RPC queue.
 *
 * TResponse - RPC response payload type.
 */
export interface RpcPendingRequest<TResponse> {
  /** Resolve callback for the pending RPC response. */
  resolve: (value: TResponse) => void;
  /** Timeout ID for the pending request. */
  timeoutId: ReturnType<typeof setTimeout>;
}

/**
 * Request queue keyed by RPC request ID.
 *
 * TResponse - RPC response payload type.
 */
export type RpcPendingRequestQueue<TResponse> = Map<string, RpcPendingRequest<TResponse>>;

/**
 * Consume a UTF-8 readable stream as newline-delimited records.
 *
 * Empty lines are skipped. A trailing line without a newline terminator is
 * emitted when the stream closes.
 *
 * @param reader - Stream reader to consume.
 * @param onLine - Callback for each non-empty line.
 * @param onReadError - Optional callback invoked on read failure.
 * @returns Resolves when stream consumption completes.
 */
export async function consumeUtf8LineStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onLine: (line: string) => void,
  onReadError?: (error: unknown) => void,
): Promise<void> {
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const readResult = await toResult(() => reader.read());
    if (!readResult.ok) {
      onReadError?.(readResult.error);
      return;
    }

    const { done, value } = readResult.value;
    if (done) {
      emitBufferedLine(buffer, onLine);
      return;
    }

    buffer += decoder.decode(value, { stream: true });
    buffer = emitBufferedLines(buffer, onLine);
  }
}

/**
 * Resolve and clear a pending RPC request from a queue.
 *
 * @param queue - Pending request queue.
 * @param requestId - Request identifier.
 * @param response - Response payload.
 * @returns True when a pending request was resolved.
 */
export function resolvePendingRpcResponse<TResponse>(
  queue: RpcPendingRequestQueue<TResponse>,
  requestId: string,
  response: TResponse,
): boolean {
  const handler = queue.get(requestId);
  if (!handler) {
    return false;
  }

  queue.delete(requestId);
  clearTimeout(handler.timeoutId);
  handler.resolve(response);
  return true;
}

function emitBufferedLines(buffer: string, onLine: (line: string) => void): string {
  const lines = buffer.split("\n");
  const trailing = lines.pop() ?? "";
  for (const line of lines) {
    emitBufferedLine(line, onLine);
  }
  return trailing;
}

function emitBufferedLine(line: string, onLine: (emittedLine: string) => void): void {
  if (!line.trim()) {
    return;
  }
  onLine(line);
}
