import { BASE64_FORMAT } from "./format-constants.js";
import { validateFormat } from "./format-validators.js";

const BASE64_BLOCK_SIZE = 4;
const BYTE_BLOCK_SIZE = 3;
const BASE64_SINGLE_PADDING = "=";
const BASE64_DOUBLE_PADDING = "==";

/**
 * Attempt to resolve Bun's base64ToBytes at runtime.
 *
 * TypeScript's bun-types does not declare `base64ToBytes` on the `Bun` namespace,
 * so we use Reflect.get for safe property access after verifying the runtime.
 * The 'Bun' in globalThis guard prevents ReferenceError in non-Bun environments.
 */
function runtimeBase64ToBytes(): ((input: string) => Uint8Array) | undefined {
  if (!("Bun" in globalThis)) {
    return;
  }
  const bunNamespace = Reflect.get(globalThis, "Bun");
  if (typeof bunNamespace !== "object" || bunNamespace === null) {
    return;
  }
  const fn = Reflect.get(bunNamespace, "base64ToBytes");
  // Safe: typeof guard above confirms fn is a function. Reflect.get returns unknown so
  // TS cannot narrow the call signature; the cast specifies the runtime decoder shape.
  return typeof fn === "function" ? (fn as (input: string) => Uint8Array) : undefined;
}

function encodeUint8ArrayBase64Fallback(value: Uint8Array): string {
  const chunkSize = 0x8000;
  let binary = "";
  for (let index = 0; index < value.length; index += chunkSize) {
    const chunk = value.subarray(index, index + chunkSize);
    for (const byte of chunk) {
      binary += String.fromCharCode(byte);
    }
  }
  return btoa(binary);
}

function decodeUint8ArrayBase64Fallback(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export function encodeUint8ArrayBase64(value: Uint8Array): string {
  const encoder = Reflect.get(value, "toBase64");
  if (typeof encoder === "function") {
    const encoded = encoder.call(value);
    if (typeof encoded === "string") {
      return encoded;
    }
  }
  return encodeUint8ArrayBase64Fallback(value);
}

export function decodeUint8ArrayBase64(value: string): Uint8Array {
  const bunDecode = runtimeBase64ToBytes();
  if (bunDecode !== undefined) {
    return bunDecode(value);
  }
  const decoder = Reflect.get(Uint8Array, "fromBase64");
  if (typeof decoder === "function") {
    const decoded = decoder.call(Uint8Array, value);
    if (decoded instanceof Uint8Array) {
      return decoded;
    }
  }
  return decodeUint8ArrayBase64Fallback(value);
}

function getBase64DecodedByteLength(value: string): number {
  const padding = value.endsWith(BASE64_DOUBLE_PADDING)
    ? 2
    : value.endsWith(BASE64_SINGLE_PADDING)
      ? 1
      : 0;
  return (value.length / BASE64_BLOCK_SIZE) * BYTE_BLOCK_SIZE - padding;
}

export function areUint8ArraysEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) {
    return false;
  }
  for (let index = 0; index < left.byteLength; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }
  return true;
}

export function isUint8ArrayWithinBounds(
  value: { byteLength: number },
  minByteLength?: number,
  maxByteLength?: number,
): boolean {
  if (minByteLength !== undefined && value.byteLength < minByteLength) {
    return false;
  }
  return maxByteLength === undefined || value.byteLength <= maxByteLength;
}

export function isUint8ArrayBase64String(
  value: unknown,
  minByteLength?: number,
  maxByteLength?: number,
  constBytes?: Uint8Array,
  constBase64?: string,
): boolean {
  if (typeof value !== "string" || !validateFormat(value, BASE64_FORMAT)) {
    return false;
  }
  if (
    !isUint8ArrayWithinBounds(
      { byteLength: getBase64DecodedByteLength(value) },
      minByteLength,
      maxByteLength,
    )
  ) {
    return false;
  }
  return constBytes === undefined
    ? true
    : value === (constBase64 ?? encodeUint8ArrayBase64(constBytes));
}
