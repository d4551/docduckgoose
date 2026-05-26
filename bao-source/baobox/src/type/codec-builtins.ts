import { DATETIME_FORMAT, URI_FORMAT } from "../shared/format-constants.js";
import type { URLLike } from "../shared/url-like.js";
import type { TCodec } from "./extensions.js";
import { Codec } from "./extensions.js";
import { String as createStringSchema } from "./primitives.js";
import type { TString } from "./primitives-types.js";

const bigintPattern = "^-?(0|[1-9][0-9]*)$";

export type TBigIntCodec = TCodec<TString, bigint>;
export type TDateCodec = TCodec<TString, Date>;
export type TURLCodec = TCodec<TString, URLLike>;
export type { URLLike };

export function BigIntCodec(): TBigIntCodec {
  return Codec(createStringSchema({ pattern: bigintPattern }))
    .decode((input) => globalThis.BigInt(input))
    .encode((input) => input.toString());
}

export function DateCodec(): TDateCodec {
  return Codec(createStringSchema({ format: DATETIME_FORMAT }))
    .decode((input) => new globalThis.Date(input))
    .encode((input) => input.toISOString());
}

export function URLCodec(): TURLCodec {
  return Codec(createStringSchema({ format: URI_FORMAT }))
    .decode<URLLike>((input) => new URL(input))
    .encode((input) => input.toString());
}
