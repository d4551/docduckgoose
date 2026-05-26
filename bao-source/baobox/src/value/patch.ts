import { isPlainRecord, recordValue } from "../shared/runtime-guards.js";
import { Clone } from "./clone.js";
import type { DiffEdit } from "./diff.js";

/** Apply a structural delta (DiffEdit[]) to a value */
export function Patch(value: unknown, edits: readonly DiffEdit[]): unknown {
  let result = Clone(value);
  for (const edit of edits) {
    if (edit.path === "") {
      result = applyRootEdit(edit);
      continue;
    }
    applyEdit(result, edit);
  }
  return result;
}

function applyRootEdit(edit: DiffEdit): unknown {
  return edit.type === "delete" ? undefined : Clone(edit.value);
}

function decodePointerSegment(segment: string): string {
  return segment.replaceAll("~1", "/").replaceAll("~0", "~");
}

function getPointerSegments(path: string): string[] {
  return path
    .split("/")
    .filter((segment) => segment.length > 0)
    .map((segment) => decodePointerSegment(segment));
}

function getArrayIndex(segment: string, length: number): number | undefined {
  const index = Number.parseInt(segment, 10);
  return Number.isInteger(index) && index >= 0 && index <= length ? index : undefined;
}

function applyEdit(root: unknown, edit: DiffEdit): void {
  const segments = getPointerSegments(edit.path);
  if (segments.length === 0) {
    return;
  }

  let current: unknown = root;
  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i];
    if (seg === undefined) {
      return;
    }
    if (Array.isArray(current)) {
      const index = getArrayIndex(seg, current.length - 1);
      if (index === undefined) {
        return;
      }
      current = current[index];
    } else if (isPlainRecord(current)) {
      current = recordValue(current, seg);
    } else {
      return;
    }
  }

  const lastSeg = segments[segments.length - 1];
  if (lastSeg === undefined) {
    return;
  }
  if (Array.isArray(current)) {
    const idx = getArrayIndex(lastSeg, current.length);
    if (idx === undefined) {
      return;
    }
    switch (edit.type) {
      case "insert":
        current.splice(idx, 0, edit.value);
        break;
      case "update":
        current[idx] = edit.value;
        break;
      case "delete":
        current.splice(idx, 1);
        break;
    }
  } else if (isPlainRecord(current)) {
    switch (edit.type) {
      case "insert":
      case "update":
        current[lastSeg] = edit.value;
        break;
      case "delete":
        delete current[lastSeg];
        break;
    }
  }
}
