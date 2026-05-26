import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { getErrorMessage, toResultSync } from "@baohaus/bao-utils/async-result";
import {
  type OperatorVerificationReport,
  parseOperatorVerificationReport,
} from "../contracts/operator-verification-report";

export const OPERATOR_VERIFICATION_REPORT_DIRECTORY = "bao-edge-operator/reports" as const;
export const OPERATOR_VERIFICATION_RUN_DIRECTORY = "runs" as const;
export const OPERATOR_VERIFICATION_LATEST_FILE = "latest.json" as const;

/** Resolve the canonical app-owned verification report directory under a host-managed root. */
export function resolveOperatorVerificationReportDirectory(rootDirectory: string): string {
  return resolve(rootDirectory, OPERATOR_VERIFICATION_REPORT_DIRECTORY);
}

/** Resolve the canonical latest app-owned verification report path. */
export function resolveOperatorVerificationLatestReportPath(rootDirectory: string): string {
  return join(
    resolveOperatorVerificationReportDirectory(rootDirectory),
    OPERATOR_VERIFICATION_LATEST_FILE,
  );
}

/** Resolve the canonical archived run report path for a correlation id. */
export function resolveOperatorVerificationRunReportPath(
  rootDirectory: string,
  correlationId: string,
): string {
  return join(
    resolveOperatorVerificationReportDirectory(rootDirectory),
    OPERATOR_VERIFICATION_RUN_DIRECTORY,
    `${correlationId}.json`,
  );
}

/** Ensure the verification report directory and run archive directory exist. */
export function ensureOperatorVerificationReportDirectories(rootDirectory: string): void {
  const latestPath = resolveOperatorVerificationLatestReportPath(rootDirectory);
  mkdirSync(dirname(latestPath), { recursive: true });
  mkdirSync(dirname(resolveOperatorVerificationRunReportPath(rootDirectory, "placeholder")), {
    recursive: true,
  });
}

/** Read and validate the latest app-owned verification report from disk. */
export function readOperatorVerificationReport(
  reportPath: string,
): { ok: true; data: OperatorVerificationReport } | { ok: false; error: string } {
  if (!existsSync(reportPath)) {
    return { ok: false, error: "Verification report does not exist." };
  }
  const decodeResult = toResultSync(() => JSON.parse(readFileSync(reportPath, "utf8")));
  if (!decodeResult.ok) {
    return {
      ok: false,
      error: getErrorMessage(decodeResult.error),
    };
  }
  const decoded = decodeResult.value;
  const parsed = parseOperatorVerificationReport(decoded as never);
  if (!parsed) {
    return { ok: false, error: "Verification report does not match the canonical schema." };
  }
  return { ok: true, data: parsed };
}
