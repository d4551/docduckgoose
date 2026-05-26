/** FNV-1a hash of a value's deep structure, returning a bigint */
import { isPlainRecord, recordKeys, recordValue } from "../shared/runtime-guards.js";

const FNV_64_OFFSET_BASIS = 0xcbf29ce484222325n;
const FNV_64_PRIME = 0x100000001b3n;
const FNV_64_BITS = 64;
const HASH_BYTE_MASK = 0xffn;

const HASH_TAG = {
  Null: 0n,
  Undefined: 1n,
  BooleanTrue: 2n,
  BooleanFalse: 3n,
  Number: 4n,
  BigInt: 5n,
  String: 6n,
  Symbol: 7n,
  Array: 8n,
  Date: 9n,
  Uint8Array: 10n,
  Object: 11n,
  Other: 12n,
  Reference: 13n,
} as const;

interface HashState {
  current: bigint;
  seen: WeakMap<object, number>;
  seenCount: number;
}

function mixHash(state: HashState, value: bigint): void {
  state.current ^= value & HASH_BYTE_MASK;
  state.current = BigInt.asUintN(FNV_64_BITS, state.current * FNV_64_PRIME);
}

function hashString(state: HashState, value: string): void {
  for (let index = 0; index < value.length; index += 1) {
    mixHash(state, BigInt(value.charCodeAt(index)));
  }
}

function hashTextValue(state: HashState, tag: bigint, value: string): void {
  mixHash(state, tag);
  hashString(state, value);
}

function hashTypedValue(state: HashState, value: unknown): boolean {
  switch (typeof value) {
    case "boolean":
      mixHash(state, value ? HASH_TAG.BooleanTrue : HASH_TAG.BooleanFalse);
      return true;
    case "number":
      hashTextValue(state, HASH_TAG.Number, value.toString());
      return true;
    case "bigint":
      hashTextValue(state, HASH_TAG.BigInt, value.toString());
      return true;
    case "string":
      hashTextValue(state, HASH_TAG.String, value);
      return true;
    case "symbol":
      hashTextValue(state, HASH_TAG.Symbol, value.toString());
      return true;
    default:
      return false;
  }
}

function hashArrayValue(state: HashState, value: readonly unknown[]): void {
  mixHash(state, HASH_TAG.Array);
  for (const item of value) {
    hashValue(state, item);
  }
}

function hashRecordValue(state: HashState, value: Record<string, unknown>): void {
  mixHash(state, HASH_TAG.Object);
  const keys = recordKeys(value).sort();
  for (const key of keys) {
    hashString(state, key);
    hashValue(state, recordValue(value, key));
  }
}

function hashSeenObject(state: HashState, value: object): boolean {
  const seenIndex = state.seen.get(value);
  if (seenIndex !== undefined) {
    hashTextValue(state, HASH_TAG.Reference, seenIndex.toString());
    return true;
  }
  state.seen.set(value, state.seenCount);
  state.seenCount += 1;
  return false;
}

function hashObjectValue(state: HashState, value: object): void {
  if (hashSeenObject(state, value)) {
    return;
  }
  if (Array.isArray(value)) {
    hashArrayValue(state, value);
    return;
  }
  if (value instanceof globalThis.Date) {
    hashTextValue(state, HASH_TAG.Date, value.toISOString());
    return;
  }
  if (value instanceof globalThis.Uint8Array) {
    mixHash(state, HASH_TAG.Uint8Array);
    for (const byte of value) {
      mixHash(state, BigInt(byte));
    }
    return;
  }
  if (isPlainRecord(value)) {
    hashRecordValue(state, value);
    return;
  }
  mixHash(state, HASH_TAG.Other);
}

function hashValue(state: HashState, value: unknown): void {
  if (value === null) {
    mixHash(state, HASH_TAG.Null);
    return;
  }
  if (value === undefined) {
    mixHash(state, HASH_TAG.Undefined);
    return;
  }
  if (hashTypedValue(state, value)) {
    return;
  }
  if (typeof value === "object") {
    hashObjectValue(state, value);
    return;
  }
  mixHash(state, HASH_TAG.Other);
}

export function Hash(value: unknown): bigint {
  const state: HashState = {
    current: FNV_64_OFFSET_BASIS,
    seen: new WeakMap(),
    seenCount: 0,
  };
  hashValue(state, value);
  return state.current;
}
