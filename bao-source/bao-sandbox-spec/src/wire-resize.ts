/**
 * Pure encoder/validator for the `POST /v1/sessions/:id/resize` payload
 * exchanged between the `bao-sandbox` CLI and the `baosandboxd` UDS
 * daemon. Wire shape: `{ "cols": <int>, "rows": <int> }`. Both must be
 * finite positive integers within 16-bit range — POSIX `winsize.ws_col`
 * and `ws_row` are `unsigned short`.
 *
 * Lives in `bao-sandbox-spec` (consumed by both CLI and daemon) so the
 * shape is defined exactly once across the request/response boundary.
 *
 * @module @baohaus/bao-sandbox-spec/wire-resize
 */

const MIN_DIMENSION = 1 as const;
const MAX_DIMENSION = 0xffff as const;

export interface ResizePayload {
  readonly cols: number;
  readonly rows: number;
}

export type EncodeOutcome =
  | { readonly ok: true; readonly body: string }
  | { readonly ok: false; readonly reason: string };

export type DecodeOutcome =
  | { readonly ok: true; readonly value: ResizePayload }
  | { readonly ok: false; readonly reason: string };

function isValidDimension(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= MIN_DIMENSION &&
    value <= MAX_DIMENSION
  );
}

export function encodeResizePayload(input: ResizePayload): EncodeOutcome {
  if (!isValidDimension(input.cols)) {
    return { ok: false, reason: `cols must be int in [${MIN_DIMENSION}, ${MAX_DIMENSION}]` };
  }
  if (!isValidDimension(input.rows)) {
    return { ok: false, reason: `rows must be int in [${MIN_DIMENSION}, ${MAX_DIMENSION}]` };
  }
  return { ok: true, body: JSON.stringify({ cols: input.cols, rows: input.rows }) };
}

export function decodeResizePayload(value: unknown): DecodeOutcome {
  if (typeof value !== "object" || value === null) {
    return { ok: false, reason: "body must be object" };
  }
  const cols = Reflect.get(value, "cols");
  const rows = Reflect.get(value, "rows");
  if (!isValidDimension(cols)) {
    return { ok: false, reason: "cols must be positive 16-bit integer" };
  }
  if (!isValidDimension(rows)) {
    return { ok: false, reason: "rows must be positive 16-bit integer" };
  }
  return { ok: true, value: { cols, rows } };
}

export const RESIZE_DIMENSION_RANGE = {
  min: MIN_DIMENSION,
  max: MAX_DIMENSION,
} as const;
