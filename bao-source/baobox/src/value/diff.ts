import { isPlainRecord, recordKeys, recordValue } from "../shared/runtime-guards.js";
import { Equal } from "./equal.js";

/** A structural edit operation */
export interface DiffEdit {
  type: "insert" | "update" | "delete";
  path: string;
  value?: unknown;
}

/** Compute a structural delta between two values */
export function Diff(a: unknown, b: unknown): DiffEdit[] {
  const edits: DiffEdit[] = [];
  diffInternal(a, b, "", edits);
  return edits;
}

function encodePointerSegment(segment: string): string {
  return segment.replaceAll("~", "~0").replaceAll("/", "~1");
}

function joinPointerPath(path: string, segment: string): string {
  const encodedSegment = encodePointerSegment(segment);
  return path ? `${path}/${encodedSegment}` : `/${encodedSegment}`;
}

function getBoundaryEdit(a: unknown, b: unknown, path: string): DiffEdit | undefined {
  let edit: DiffEdit | undefined;
  if (a === undefined && b !== undefined) {
    edit = { type: "insert", path, value: b };
  } else if (a !== undefined && b === undefined) {
    edit = { type: "delete", path };
  } else if (
    typeof a !== typeof b ||
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    edit = { type: "update", path, value: b };
  }
  return edit;
}

function pushArrayDiffs(
  a: readonly unknown[],
  b: readonly unknown[],
  path: string,
  edits: DiffEdit[],
) {
  const sharedLength = Math.min(a.length, b.length);
  for (let index = 0; index < sharedLength; index += 1) {
    diffInternal(a[index], b[index], joinPointerPath(path, index.toString()), edits);
  }
  for (let index = a.length - 1; index >= b.length; index -= 1) {
    edits.push({ type: "delete", path: joinPointerPath(path, index.toString()) });
  }
  for (let index = sharedLength; index < b.length; index += 1) {
    edits.push({ type: "insert", path: joinPointerPath(path, index.toString()), value: b[index] });
  }
}

function pushRecordDiffs(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  path: string,
  edits: DiffEdit[],
): void {
  const allKeys = new Set([...recordKeys(a), ...recordKeys(b)]);
  for (const key of allKeys) {
    const keyPath = joinPointerPath(path, key);
    if (!(key in a)) {
      edits.push({ type: "insert", path: keyPath, value: recordValue(b, key) });
      continue;
    }
    if (!(key in b)) {
      edits.push({ type: "delete", path: keyPath });
      continue;
    }
    diffInternal(recordValue(a, key), recordValue(b, key), keyPath, edits);
  }
}

function diffInternal(a: unknown, b: unknown, path: string, edits: DiffEdit[]): void {
  if (Equal(a, b)) {
    return;
  }

  const boundaryEdit = getBoundaryEdit(a, b, path);
  if (boundaryEdit) {
    edits.push(boundaryEdit);
    return;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    pushArrayDiffs(a, b, path, edits);
    return;
  }

  if (!(isPlainRecord(a) && isPlainRecord(b))) {
    edits.push({ type: "update", path, value: b });
    return;
  }
  pushRecordDiffs(a, b, path, edits);
}
