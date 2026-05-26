import { isPlainRecord, recordKeys, recordValue } from "../shared/runtime-guards.js";

function equalDates(a: unknown, b: unknown): boolean | undefined {
  return a instanceof globalThis.Date && b instanceof globalThis.Date
    ? a.getTime() === b.getTime()
    : undefined;
}

function equalUint8Arrays(a: unknown, b: unknown): boolean | undefined {
  if (!(a instanceof globalThis.Uint8Array && b instanceof globalThis.Uint8Array)) {
    return;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) {
      return false;
    }
  }
  return true;
}

function equalArrays(a: unknown, b: unknown): boolean | undefined {
  if (!(Array.isArray(a) && Array.isArray(b))) {
    return;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let index = 0; index < a.length; index += 1) {
    if (!Equal(a[index], b[index])) {
      return false;
    }
  }
  return true;
}

function equalRecords(a: unknown, b: unknown): boolean | undefined {
  if (!(isPlainRecord(a) && isPlainRecord(b))) {
    return;
  }
  const aKeys = recordKeys(a);
  const bKeys = recordKeys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (const key of aKeys) {
    if (!Equal(recordValue(a, key), recordValue(b, key))) {
      return false;
    }
  }
  return true;
}

/** Deep structural equality comparison */
export function Equal(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "bigint") {
    return a === b;
  }
  return (
    equalDates(a, b) ?? equalUint8Arrays(a, b) ?? equalArrays(a, b) ?? equalRecords(a, b) ?? false
  );
}
