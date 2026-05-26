import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTargetBase } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { TARGET_KINDS, type TargetKind } from "@baohaus/bao-schemas/bao-install-primitives.schemas";
import { TARGET_PAYLOAD_SCHEMAS } from "@baohaus/bao-schemas/bao-target-payloads.schemas";
import { extractTargetPayload } from "@baohaus/bao-utils/canonical/bao-target-payload";
import {
  getTypeBoxChecker,
  getTypeBoxErrorIterator,
} from "@baohaus/bao-utils/canonical/typebox-runtime";
import type { ValidationIssue } from "./bao-install-validation.types.ts";

function buildInvalidPayloadCode(target: BaoInstallTargetBase): string {
  return `KIND_PAYLOAD_INVALID_${target.kind.toUpperCase().replaceAll("-", "_")}`;
}

function appendSchemaPayloadErrors(
  issues: ValidationIssue[],
  target: BaoInstallTargetBase,
  schema: object,
  payload: Record<string, unknown>,
): void {
  const path = `targets.${target.target}`;
  const errors = getTypeBoxErrorIterator(schema);

  if (errors) {
    for (const error of errors(payload)) {
      issues.push({
        pass: 5,
        code: buildInvalidPayloadCode(target),
        message: `${target.kind} target "${target.target}" payload invalid${
          error.path ? ` at ${error.path}` : ""
        }: ${error.message ?? "unknown"}`,
        path: error.path ? `${path}.${error.path.replace(/^\//u, "").replaceAll("/", ".")}` : path,
      });
    }
    return;
  }

  issues.push({
    pass: 5,
    code: buildInvalidPayloadCode(target),
    message: `${target.kind} target "${target.target}" payload failed schema check`,
    path,
  });
}

function validateKindPayload(
  issues: ValidationIssue[],
  target: BaoInstallTargetBase,
  schema: object,
): void {
  const checker = getTypeBoxChecker(schema);
  if (!checker) {
    return;
  }

  const payload = extractTargetPayload(target);
  if (checker(payload)) {
    return;
  }

  appendSchemaPayloadErrors(issues, target, schema, payload);
}

function validateTarget(issues: ValidationIssue[], target: BaoInstallTargetBase): void {
  const kind = target.kind as TargetKind;
  if (!TARGET_KINDS.some((value) => value === kind)) {
    issues.push({
      pass: 5,
      code: "UNKNOWN_TARGET_KIND",
      message: `Unknown target kind: ${target.kind}`,
      path: `targets.${target.target}.kind`,
    });
    return;
  }

  const schema = TARGET_PAYLOAD_SCHEMAS[kind];
  validateKindPayload(issues, target, schema);
}

export function appendTargetPayloadIssues(issues: ValidationIssue[], manifest: BaoManifest): void {
  for (const target of manifest.targets) {
    validateTarget(issues, target);
  }
}
