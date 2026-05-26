import {
  decodeUint8ArrayBase64,
  encodeUint8ArrayBase64,
  isUint8ArrayBase64String,
} from "../shared/bytes.js";
import { BASE64_FORMAT } from "../shared/format-constants.js";
import type { TCodec, TRefine } from "./extensions.js";
import { Codec, Refine } from "./extensions.js";
import type { TUint8Array } from "./higher-order-types.js";
import { String as createStringSchema } from "./primitives.js";
import type { TString } from "./primitives-types.js";

type TUint8ArrayCodec = TRefine<TCodec<TString, Uint8Array>> &
  Pick<TUint8Array, "minByteLength" | "maxByteLength" | "constBytes"> & {
    "~uint8arrayCodec": true;
    constBase64?: string;
  };

export interface Uint8ArrayCodecOptions {
  readonly minByteLength?: number;
  readonly maxByteLength?: number;
  readonly constBytes?: Uint8Array;
  readonly title?: string;
  readonly description?: string;
}

export function Uint8ArrayCodec(options: Uint8ArrayCodecOptions = {}): TUint8ArrayCodec {
  const constBase64 =
    options.constBytes === undefined ? undefined : encodeUint8ArrayBase64(options.constBytes);
  const codec = Codec(
    createStringSchema({
      format: BASE64_FORMAT,
      ...(options.title === undefined ? {} : { title: options.title }),
      ...(options.description === undefined ? {} : { description: options.description }),
    }),
  )
    .decode((input) => decodeUint8ArrayBase64(input))
    .encode((input) => encodeUint8ArrayBase64(input));

  return {
    ...Refine(
      codec,
      (input) =>
        isUint8ArrayBase64String(
          input,
          options.minByteLength,
          options.maxByteLength,
          options.constBytes,
          constBase64,
        ),
      "Expected a base64-encoded Uint8Array value",
    ),
    "~uint8arrayCodec": true,
    ...(options.minByteLength === undefined ? {} : { minByteLength: options.minByteLength }),
    ...(options.maxByteLength === undefined ? {} : { maxByteLength: options.maxByteLength }),
    ...(options.constBytes === undefined ? {} : { constBytes: options.constBytes }),
    ...(constBase64 === undefined ? {} : { constBase64 }),
  };
}
