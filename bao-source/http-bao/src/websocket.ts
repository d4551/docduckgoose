/**
 * @baohaus/http-bao/websocket
 *
 * WebSocket upgrade and message handling.
 */

import type { Context, ValidationSchema } from "./context.ts";

interface WebSocketLike {
  readonly data: Record<string, unknown>;
  readonly send: (data: string | ArrayBuffer | ArrayBufferView | null) => unknown;
  readonly ping: (data?: string | ArrayBuffer | ArrayBufferView) => unknown;
  readonly pong: (data?: string | ArrayBuffer | ArrayBufferView) => unknown;
  readonly publish: (topic: string, data: string | ArrayBuffer | ArrayBufferView | null) => unknown;
  readonly sendText: (data: string) => unknown;
  readonly sendBinary: (data: ArrayBuffer | ArrayBufferView) => unknown;
  readonly close: (code?: number, reason?: string) => unknown;
}

interface WebSocketContext {
  readonly socket: WebSocketLike;
  readonly data: Record<string, unknown>;
}

interface WebSocketHandler {
  readonly open?: (socket: WebSocketLike) => void;
  readonly message?: (
    socket: WebSocketLike,
    message: string | ArrayBuffer | Buffer<ArrayBuffer>,
  ) => void;
  readonly close?: (socket: WebSocketLike, code: number, reason: string) => void;
  readonly drain?: (socket: WebSocketLike) => void;
  readonly body?: ValidationSchema;
  readonly params?: ValidationSchema;
  readonly query?: ValidationSchema;
  readonly headers?: ValidationSchema;
  readonly cookie?: ValidationSchema;
  readonly response?: ValidationSchema;
  readonly beforeHandle?: (ctx: Context) => Response | undefined;
  readonly afterHandle?: (ctx: Context, response: unknown) => unknown;
  readonly transform?: (ctx: Context) => void;
  readonly error?: (ctx: Context) => Response | undefined;
}

interface WsHandler {
  readonly path: string;
  readonly handler: WebSocketHandler;
}

type WebSocketRoute = WsHandler;

function ws(path: string, handler: WebSocketHandler): WsHandler {
  return { path, handler };
}

export type { WebSocketContext, WebSocketHandler, WebSocketLike, WebSocketRoute, WsHandler };
export { ws };
