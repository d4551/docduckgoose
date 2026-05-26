import type { FlowCapabilityError, FlowCommand, FlowErrorCategory } from "./flow-contracts-1";
import type {
  OperatorVerificationReport,
  OperatorVerificationScenario,
  OperatorVerificationTerminalState,
} from "./operator-verification-report";

/** Build a canonical capability error from parser/runtime details. */
export function createFlowCapabilityError(params: {
  commandIndex: number;
  command: string;
  commandType?: FlowCommand["type"];
  code?: string;
  category?: FlowErrorCategory;
  reason: string;
  retryable: boolean;
  correlationId?: string;
  surface?: FlowCapabilityError["surface"];
  resource?: string;
}): FlowCapabilityError {
  const generatedCorrelationId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `flow-${Date.now()}`;
  const error: FlowCapabilityError = {
    commandIndex: params.commandIndex,
    code: params.code ?? "FLOW_CAPABILITY_ERROR",
    category: params.category ?? "runtime",
    command: params.command,
    reason: params.reason,
    retryable: params.retryable,
    correlationId: params.correlationId ?? generatedCorrelationId,
  };

  if (params.commandType !== undefined) {
    error.commandType = params.commandType;
  }
  if (params.surface !== undefined) {
    error.surface = params.surface;
  }
  if (params.resource !== undefined) {
    error.resource = params.resource;
  }

  return error;
}

type FlowCapabilityErrorCandidate = {
  readonly commandIndex?: number | null;
  readonly code?: string | null;
  readonly category?: string | null;
  readonly command?: string | null;
  readonly reason?: string | null;
  readonly retryable?: boolean | null;
  readonly correlationId?: string | null;
};

/** Check if a capability error value includes the required structure. */
export function isFlowCapabilityError(
  value: FlowCapabilityErrorCandidate | Error | string | number | boolean | null | undefined,
): value is FlowCapabilityError {
  if (value === null || typeof value !== "object" || value instanceof Error) {
    return false;
  }

  return (
    typeof value.commandIndex === "number" &&
    value.commandIndex >= -1 &&
    Number.isInteger(value.commandIndex) &&
    typeof value.code === "string" &&
    typeof value.category === "string" &&
    typeof value.command === "string" &&
    typeof value.reason === "string" &&
    typeof value.retryable === "boolean" &&
    typeof value.correlationId === "string"
  );
}

/** Status of app-owned verification report availability for one platform. */
export type OperatorVerificationPlatformStatus =
  | "verified"
  | "running"
  | "failed"
  | "connected"
  | "missing";

/** Per-platform app-owned verification readiness summary used by the dashboard. */
export interface OperatorVerificationPlatformReadiness {
  /** Target platform. */
  platform: "android" | "ios";
  /** Aggregated verification status. */
  status: OperatorVerificationPlatformStatus;
  /** Human-readable summary. */
  summary: string;
  /** Local path or device path where the report was read from. */
  sourcePath?: string;
  /** Full report when available. */
  report?: OperatorVerificationReport;
  /** Scenario from the report (e.g. "automation_schedule", "cloud_chat"). */
  scenario?: OperatorVerificationScenario;
  /** Terminal state from the report (e.g. "success", "error-non-retryable"). */
  terminalState?: OperatorVerificationTerminalState;
}
